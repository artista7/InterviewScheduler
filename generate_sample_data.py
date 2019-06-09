import pickle
import random
import json
import numpy as np
from itertools import chain
from collections import defaultdict

def get_current_timestamp():
    pass

SIGMA = 0.2
THRESHOLD = 0.5
def generate_data(num_candidates, num_profiles, profile_allocated_time):
    """
    Generate Sample data for candidates and profiles,
    :params:
        - num_candidates: (int) Total Number of candidates
        - num_profiles: (int) Total Number of profiles
        - profile_allocated_time: (list of floats/float) Allocated time for each profile
        - prob_success: (list of floats/float) Probability of success for
                         any candidate
    """
    candidate_preferences = []
    profile_preferences = []

    # Generate pobability of selection for each candidate
    candidate_probility = np.random.normal(0.2, 0.05, num_candidates)
    candidate_probility = [i if i > 0.15 else 0.15 for i in candidate_probility]
    top_candidates = sorted(zip(range(0, num_candidates), candidate_probility), key=lambda x: -x[1])[:10]
    print(top_candidates)
    candidate_profiles = defaultdict(list)
    # Iterate for each profile
    for profile in range(num_profiles):
        all_selections = []
        scores = []
        for candidate in range(num_candidates):
            p = candidate_probility[candidate]

            # Check if candidate is selected
            score = np.random.normal(p, SIGMA, 1)[0]
            if score > THRESHOLD:
                temp = {'candidate_id' : candidate,
                        'start_time': None,
                        'end_time': None,
                        'status': 'PENDING'}
                all_selections.append(temp)
                scores.append(round(score, 2))
                candidate_profiles[candidate].append(profile)

        all_selections = [i[0] for i in sorted(zip(all_selections, scores),
                                key=lambda x : -x[1])]

        profile_preferences.append({
                                     "profile_name":  "profile #{}".format(profile),
                                     "profile_id" : profile,
                                     "interview_start_time" : 0,
                                     "shortlisted_candidates" : all_selections,
                                    })

    # Iterate for each candidate to assign preference
    profile_probility = np.random.normal(0.1, 0.15, num_candidates)

    for candidate_id in range(num_candidates):
        shortilisted_in = candidate_profiles[candidate_id]
        scores = []
        for profile_id in shortilisted_in:
            p = profile_probility[profile_id]

            # Check if candidate is selected
            score = np.random.normal(p, SIGMA, 1)[0]
            scores.append(score)

        preference = [i[0] for i in sorted(zip(shortilisted_in, scores),
                                key=lambda x : -x[1])]
        candidate_preferences.append({
                                     "candidate_id" : candidate_id,
                                     "profile_preference" : preference,
                                    })
    data = {
                "profiles": profile_preferences,
                "candidates":  candidate_preferences
            }
    json.dump(data, open('data/sample_data.json', "w"), indent=4)

if __name__ == '__main__':
    generate_data(10, 3 , 15)
