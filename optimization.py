from __future__ import print_function

import collections
import pickle
from ortools.sat.python import cp_model

from helper import JobProfile, Interview, Candidate, ScheduleManager
from config import INTERVIEW_INTERVAL, TIME_HORIZON,\
                    PENDING_STATUS, ONGOING_STATUS, DONE_STATUS


def optimize_schedule(schedule_data, interview_interval=INTERVIEW_INTERVAL):
    # Create the model.
    model = cp_model.CpModel()

    profiles = schedule_data['profiles']
    candidates = schedule_data['candidates']

    manager = ScheduleManager()

    for candidate_info in candidates:
        candidate_id = candidate_info['candidate_id']
        candidate_preference = candidate_info['profile_preference']
        manager.add_candidate(Candidate(candidate_id, preference=candidate_preference))

    for profile_info in profiles:
        profile_id = profile_info['profile_id']
        shortlisted_candidates = profile_info['shortlisted_candidates']
        interview_start_time = profile_info['interview_start_time']

        profile = JobProfile(profile_id=profile_id,
                             candidates=shortlisted_candidates, \
                             interview_start_time=interview_start_time)
        manager.add_profile(profile)

        # Get the latest start time
        for candidate_info in shortlisted_candidates:
            if candidate_info['status'] == ONGOING_STATUS:
                interview_start_time = candidate_info['end_time']
                break
            elif candidate_info['status'] == DONE_STATUS:
                if interview_start_time < candidate_info['end_time']:
                    interview_start_time = candidate_info['end_time']

        rank = 0
        for candidate_info in shortlisted_candidates:
            candidate_id = candidate_info['candidate_id']
            candidate_status = candidate_info['status']

            if candidate_status == PENDING_STATUS:

                unique_id = '%s_%s' % (profile_id, candidate_id)

                start_time = model.NewIntVar(interview_start_time,
                                        TIME_HORIZON,
                                        'start_' + unique_id
                                        )
                end_time = model.NewIntVar(interview_start_time,
                                      TIME_HORIZON,
                                      'end_' +  unique_id
                                      )
                interval = model.NewIntervalVar(
                            start_time, interview_interval, end_time,
                            'interval_' +  unique_id
                        )
                interview = Interview(candidate_id=candidate_id,
                                      profile_id=profile_id,
                                      start_time=start_time,
                                      end_time=end_time,
                                      interval=interval,
                                      status=candidate_status,
                                      rank=rank
                                      )
                manager.add_interview(interview)
                rank += 1

    # The idea is we assume that the interval for all the companies remain same
    # and that is x unit (1 unit is basically 1 minute)  and let's say
    # start of the day is 0 unit, end is 720 Unit
    horizon = 720


    # Add no overlap constraints (for interviews of a company )
    for profile_id in manager.profiles:
        profile = manager.profiles[profile_id]
        intervals = [interview.interval for interview in profile.get_all_interviews()]
        model.AddNoOverlap(intervals)

    # Add no overlap constraints (for interviews of a company )
    for candidate_id in manager.candidates:
        candidate = manager.candidates[candidate_id]
        intervals = [interview.interval for interview in candidate.get_all_interviews()]
        model.AddNoOverlap(intervals)


    # Optimization value (for difference between expected start time and real start time)
    maxloss = 0
    all_scores = []
    interval_constant = model.NewIntVar(interview_interval,
                                        interview_interval,
                                        name='interval')

    loss = []
    for profile_id, candidate_id, interview in manager.iterate_over_interviews():
        maxloss += TIME_HORIZON
        unique_id = '%s_%s' %(profile_id, candidate_id)
        task_var = model.NewIntVar(-TIME_HORIZON, TIME_HORIZON,
                                   'task_var_' + unique_id
                                   )
        model.Add(task_var == interview.start_time - (interview.rank) * interval_constant)

        task_var_abs = model.NewIntVar(0, TIME_HORIZON,
                                   'task_var_' + unique_id
                                   )
        model.AddAbsEquality(task_var_abs, task_var)
        task_var_final = model.NewIntVar(0, 2 * TIME_HORIZON,
                                   'task_var_' + unique_id
                                   )
        model.Add(task_var_final == task_var_abs + task_var)

        task_var_final_2 = model.NewIntVar(0, TIME_HORIZON,
                                   'task_var_final_2_' + unique_id
                                   )

        model.AddDivisionEquality(task_var_final_2, task_var_final, 2)
        loss.append(task_var_final_2)


    # # Add optimization for total time for a company
    # for company_id in all_company_interviews:
    #     # Iterate over all the interviews of company
    #     interviews = all_company_interviews[company_id]
    #     max_error = len(interviews) * interview_interval # Check this
    #     maxloss += max_error
    #
    #     # Getting the start and end time of interview for a company
    #     start_time = model.NewIntVar(0, horizon,
    #                                  'start_time_%s' %(company_id))
    #     end_time = model.NewIntVar(0, horizon,
    #                                  'end_time_%s' %(company_id))
    #     model.AddMinEquality(start_time, [i.start for i in interviews])
    #     model.AddMaxEquality(end_time, [i.end for i in interviews])
    #
    #     ideal_start_time = company_preferences_dict[company_id]['start_time']
    #     ideal_end_time = company_preferences_dict[company_id]['start_time'] + \
    #                         (  (interview_interval) * \
    #                             len(company_preferences_dict[company_id]['student_preference'])
    #                         )
    #     # Define cost for this company
    #     error = 0
    #     cost = model.NewIntVar(0, error*max_error,
    #                                  'total_time_cost_%s' %(company_id))
    #     model.Add(cost == error *((start_time - ideal_start_time) +
    #                           (end_time - ideal_end_time)))
    #     all_scores.append(cost)


    # Add additional constraints if a students has same ranking for two companies
    # First, extract rank of students of different companies
    student_ranks = {}
    for candidate_id in manager.candidates:
        candidate = manager.candidates[candidate_id]
        candidate_rank_dict = candidate.get_same_rank_interviews()
        for rank in candidate_rank_dict:
            interviews = candidate_rank_dict[rank]
            if len(interviews) == 1:
                continue
            print(candidate_id, rank)
            last_interview = interviews[0]
            for current_interview in interviews[1:]:
                model.Add(last_interview.start_time < current_interview.start_time)
                last_interview = current_interview

    obj_var = model.NewIntVar(0, maxloss, 'loss')
    model.Add(obj_var == sum(loss))
    model.Minimize(obj_var)



    # Solve model.
    solver = cp_model.CpSolver()
    solver.parameters.max_time_in_seconds = 10.0
    # status = solver.Solve(model)
    status = solver.SolveWithSolutionCallback(model, cp_model.ObjectiveSolutionPrinter())

    if status == cp_model.FEASIBLE or status == cp_model.OPTIMAL:
        schedule = []
        for profile_id in manager.profiles:
            profile = manager.profiles[profile_id]
            profile_schedule = {"profile_id": profile_id, "schedule": []}
            for interview in profile.get_all_interviews():
                start_time = solver.Value(interview.start_time)
                end_time = solver.Value(interview.end_time)
                candidate_id = interview.candidate_id
                profile_schedule["schedule"].append({"candidate_id": candidate_id,
                                                 "start_time": start_time,
                                                 "end_time": end_time})
            schedule.append(profile_schedule)
        return schedule
    else:
        return {}

if __name__ == '__main__':

    import json
    data = json.load(open("data/sample_data.json"))
    optimize_schedule(data)
