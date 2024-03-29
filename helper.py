from collections import defaultdict

class ScheduleManager():
    def __init__(self):
        self.profiles = {}
        self.candidates = {}
        self.interviews = {}

    def add_profile(self, job_profile):
        self.profiles[job_profile.profile_id] = job_profile

    def add_candidate(self, candidate):
        self.candidates[candidate.candidate_id] = candidate

    def add_interview(self, interview):
        profile_id = interview.profile_id
        candidate_id = interview.candidate_id

        # Add interviews to profiles and candidates
        self.profiles[profile_id].add_interview(interview)
        self.candidates[candidate_id].add_interview(interview)
        self.interviews[profile_id, candidate_id] = interview

    def iterate_over_interviews(self):
        for (profile_id, candidate_id), interview in self.interviews.items():
            yield profile_id, candidate_id, interview


class JobProfile():
    def __init__(self, profile_id, candidates, interview_start_time):
        self.profile_id = profile_id
        self.candidates = candidates
        self.interviews = {}
        self.interview_start_time = interview_start_time
        self.rank = {}

    def add_interview(self, interview):
        self.interviews[interview.candidate_id] = interview

    def get_all_interviews(self):
        return self.interviews.values()

    def get_interview(self, candidate_id):
        return self.interviews[candidate_id]

    # def get_rank(self, candidate_id ):
    #     # Count the number of high ranking candidate before him
    #     candidate_rank = self.get_interview(candidate_id).rank
    #     count = 0
    #     for interview in self.interviews.values():
    #         if interview.rank < candidate_rank:
    #             count += 1
    #     return count



class Interview():
    def __init__(self, profile_id, candidate_id,
                 start_time, end_time, interval, status, rank):
        """
        :params:
        # TODO Add description
        """
        self.profile_id = profile_id
        self.candidate_id = candidate_id
        self.end_time = end_time
        self.start_time = start_time
        self.status = status
        self.rank = rank
        self.interval = interval


class Candidate():
    def __init__(self, candidate_id, preference=[]):
        # Add the companies in which the candidate
        # is shortisted in and preference oders
        self.candidate_id = candidate_id
        self.interviews = {}
        self.preference = {profile_id:idx for idx, profile_id in enumerate(preference)}

    def get_interview(self, profile_id):
        return self.interviews.get(profile_id)

    def get_preference(self, profile_id):
        return self.interviews.get(profile_id)

    def get_all_interviews(self):
        return self.interviews.values()

    def add_interview(self, interview):
        assert interview.profile_id not in self.interviews, "Interview already \
                                                scheduleded for the job id"
        if interview.profile_id not in self.preference:
            self.preference[interview.profile_id] = len(self.interviews)
        self.interviews[interview.profile_id] = interview

    def get_same_rank_interviews(self):
        """
            Return all the interviews where candidate has a same rank.
        """
        #Aggregate by rank, and then retun a dict with key as rank
        rank_interview_dict = defaultdict(list)
        for interview in self.interviews.values():
            rank_interview_dict[interview.rank].append(interview)

        # Sort the interviews in order of preference
        for rank in rank_interview_dict:
            rank_interview_dict[rank] = sorted(rank_interview_dict[rank],
                            key=lambda x: self.preference[x.profile_id])

        return rank_interview_dict
