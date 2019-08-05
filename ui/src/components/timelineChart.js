import React from "react";
import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import { connect } from "react-redux";

// Reference : https://developers.google.com/chart/interactive/docs/gallery/timeline
const columns = [
  { type: "string", id: "Candidate" },
  { type: "string", id: "Profile" },
  { type: "date", id: "Start" },
  { type: "date", id: "End" }
];

const rows = [
  [
    "Candidate 0",
    "Profile #1",
    new Date(0, 0, 0, 7, 0, 0),
    new Date(0, 0, 0, 7, 30, 0)
  ],
  [
    "Candidate 0",
    "Profile #1",
    new Date(0, 0, 0, 11, 0, 0),
    new Date(0, 0, 0, 11, 30, 0)
  ],
  [
    "Candidate 1",
    "Profile #1",
    new Date(0, 0, 0, 7, 0, 0),
    new Date(0, 0, 0, 7, 30, 0)
  ],
  [
    "Candidate 1",
    "Profile #1",
    new Date(0, 0, 0, 8, 0, 0),
    new Date(0, 0, 0, 8, 30, 0)
  ],
  [
    "Candidate 2",
    "Profile #1",
    new Date(0, 0, 0, 7, 0, 0),
    new Date(0, 0, 0, 7, 30, 0)
  ],
  [
    "Candidate 2",
    "Profile #1",
    new Date(0, 0, 0, 9, 0, 0),
    new Date(0, 0, 0, 9, 30, 0)
  ]
];

class TimelineChart extends React.Component {
  constructor(props) {
    super(props);
    this.data = [];
    for (let i = 0, len = props.companyData; i < len; i++) {
      const candidates = props.companyData[i].candidates;
      const companyName = props.companyData.companyName;
      for (let j = 0, len = props.candidates; j < len; j++) {
        const candidate = candidates[j];
        if (candidate.candidateName) {
          const startTime = candidate.startTime;
          const startTimeNewFmt = new Date(
            0,
            0,
            0,
            parseInt(startTime.split(":")[0]),
            parseInt(startTime.split(":")[1])
          );
          const endTime = candidate.endTime;
          const endTimeNewFmt = new Date(
            0,
            0,
            0,
            parseInt(endTime.split(":")[0]),
            parseInt(endTime.split(":")[1])
          );
          const candidateName = candidate.candidateName;
          this.data.append([
            candidateName,
            companyName,
            startTimeNewFmt,
            endTimeNewFmt
          ]);
        }
      }
    }
  }

  render() {
    const parseDataInFormat = companyData => {
      const data = [];
      //   console.log(companyData);
      //   console.log(Object.keys(companyData));
      const companyIds = Object.keys(companyData);
      for (let i = 0, len = companyIds.length; i < len; i++) {
        const companyId = companyIds[i];
        // console.log(companyId);
        // console.log(companyData[companyId]);
        const candidates = companyData[companyId].candidates;
        const companyName = companyId;
        for (let j = 0, len = candidates.length; j < len; j++) {
          const candidate = candidates[j];
          if (candidate.candidateName) {
            const startTime = candidate.startTime;
            const startTimeNewFmt = new Date(
              0,
              0,
              0,
              parseInt(startTime.split(":")[0]),
              parseInt(startTime.split(":")[1])
            );
            const endTime = candidate.endTime;
            const endTimeNewFmt = new Date(
              0,
              0,
              0,
              parseInt(endTime.split(":")[0]),
              parseInt(endTime.split(":")[1])
            );
            const candidateName = candidate.candidateName;
            if (endTimeNewFmt > startTimeNewFmt && candidateName != "") {
              data.push([
                candidateName,
                companyName,
                startTimeNewFmt,
                endTimeNewFmt
              ]);
            }
          }
        }
      }
      console.log("data", data);
      return data;
    };

    const parsedData = parseDataInFormat(this.props.companyData);
    return (
      <div>
        {parsedData.length > 0 ? (
          <Chart
            chartType="Timeline"
            data={[columns, ...parsedData]}
            height="400px"
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    companyData: store.companies
  };
};

export default connect(mapStateToProps)(TimelineChart);
