import React, { Component, useState } from "react";

import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { connect } from "react-redux";
import { updateOptimizedState } from "../actions";

const getInSchema = (data, preferenceData) => {
  const newData = [];
  const candidatesMapping = {};
  const statusMapping = { 1: "PENDING", 2: "ONGOING", 3: "DONE" };
  const timeTransformer = time => {
    const [hour, minutes] = time.split(":");
    const finalTime = parseInt(hour) * 60 + parseInt(minutes);
    return finalTime;
  };
  Object.keys(data).map(companyId => {
    const company = data[companyId];
    const newCompanyData = {};
    newCompanyData.shortlisted_candidates = company.candidates.map(
      candidate => {
        const newCandidateData = {};
        const prev = candidatesMapping[[candidate.candidateName]] || [];
        prev.push(companyId);
        candidatesMapping[[candidate.candidateName]] = prev;
        newCandidateData.candidate_id = candidate.candidateName;
        newCandidateData.start_time = timeTransformer(candidate.startTime);
        newCandidateData.end_time = timeTransformer(candidate.endTime);
        newCandidateData.status = statusMapping[[candidate.status]];
        return newCandidateData;
      }
    );
    newCompanyData.profile_id = companyId;
    newCompanyData.profile_name = companyId;
    newCompanyData.interview_start_time = timeTransformer(
      company.companyStartTime
    );

    newData.push(newCompanyData);
  });
  const candidatePreference = [];
  // const isNullPreferenceData =
  //   Object.keys(preferenceData ? preferenceData : {}).length === 0;
  // const iteratableData = isNullPreferenceData
  //   ? candidatesMapping
  //   : preferenceData;
  // console.log("iteratableData", candidatesMapping);
  // console.log(
  //   "iteratableData",
  //   iteratableData,
  //   preferenceData,
  //   preferenceData != {}
  // );

  Object.keys(candidatesMapping).map(candidateName => {
    candidatePreference.push({
      candidate_id: candidateName,
      profile_preference: preferenceData[candidateName]
        ? preferenceData[candidateName]
        : candidatesMapping[candidateName]
    });
  });
  return { profiles: newData, candidates: candidatePreference };
};

const getOutSchema = data => {
  const newData = {};
  const timeTransformer = time => {
    const hour = ("0" + parseInt(time / 60)).slice(-2);
    const minutes = ((time % 60) + "00").slice(0, 2);
    const finalTime = hour + ":" + minutes;
    return finalTime;
  };
  console.log(data);
  data.profiles.forEach(profileData => {
    const profileId = profileData["profile_id"];
    const schedule = profileData["schedule"];
    const newCompanyData = {};
    schedule.map(newSchedule => {
      const candidateId = newSchedule["candidate_id"];
      newCompanyData[candidateId] = {
        endTime: timeTransformer(newSchedule.end_time),
        startTime: timeTransformer(newSchedule.start_time)
      };
    });

    newData[profileId] = newCompanyData;
  });
  return newData;
};

const OptimizeButton = props => {
  const [state, setState] = useState([]);

  const clickHandler = event => {
    const newData = getInSchema(props.companyData, props.candidatePreferences);
    const outputData = {};
    fetch(
      "http://localhost:5000/optimize",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(newData)
      }
    )
      .then(response => response.json())
      .then(data => {
        console.log(getOutSchema(data));
        props.dispatch(updateOptimizedState(getOutSchema(data)));
      });
  };

  return (
    <Button
      variant="contained"
      color="primary"
      style={{ margin: "1rem auto" }}
      onClick={clickHandler}
    >
      Optimize
      <Icon style={{ marginLeft: "8px" }}>brightness_low</Icon>
      {/* <DeleteIcon className={classes.rightIcon} /> */}
    </Button>
  );
};

const mapStateToProps = store => {
  return {
    companyData: store.companies,
    candidatePreferences: store.candidates
  };
};

export default connect(mapStateToProps)(OptimizeButton);
