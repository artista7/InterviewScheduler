from collections import defaultdict
import datetime as dt
import fire
import json
import randomcolor
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import matplotlib.patches as mpatches
from matplotlib.collections import PolyCollection

SPAN = 5
COMPLETE_SPAN = 10
def plot_schedule_data(data):

    fig, ax = plt.subplots()
    candidates = defaultdict(list)
    profile_ids = []
    for profile in data["profiles"]:
        for candidate in profile["schedule"]:
            candidate["profile"] = profile["profile_id"]
            candidates[candidate["candidate_id"]].append(candidate)
            profile_ids.append(profile["profile_id"])

    # Attach random color to each profile
    rand_color = randomcolor.RandomColor()
    profile2color = {k: rand_color.generate()[0] for k in profile_ids}

    candidate_ids = []
    start = (COMPLETE_SPAN - SPAN) /2
    for idx, candidate_data in enumerate(candidates.items()):
        candidate_id, interviews = candidate_data
        candidate_ids.append(candidate_id)
        x_range = [(interview["start_time"], interview["end_time"] - interview["start_time"]) \
                        for interview in interviews]
        colors = [profile2color[interview["profile"]] for interview in interviews]

        y_range = (COMPLETE_SPAN*(idx ) + start, SPAN )
        ax.broken_barh(x_range, y_range, facecolors=colors)

    ax.set_xlabel('minutes since start')

    ax.set_yticks(list(range(int(COMPLETE_SPAN/2),
                             COMPLETE_SPAN*len(candidate_ids),
                             COMPLETE_SPAN)
                       )
                 )

    ax.set_yticklabels(["Candidate {}".format(i) for i in candidate_ids])
    ax.grid(True)
    plt.legend(loc='lower center', bbox_to_anchor=(0, 1.02, 1, 0.2), ncol=5,
               handles=[mpatches.Patch(color=profile2color[profile],
                                        label="Profile {}".format(profile))
                            for profile in set(profile_ids)])
    plt.show()

def main(file_path):
    json_data = None
    with open(file_path, "r") as file_:
        json_data = json.loads(file_.read())
    plot_schedule_data(json_data)

if __name__ == '__main__':
    fire.Fire(main)
