import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { connect } from "react-redux";

const getInSchema = data => {
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
  Object.keys(candidatesMapping).map(candidateName => {
    candidatePreference.push({
      candidate_id: candidateName,
      profile_preference: candidatesMapping[[candidateName]]
    });
  });
  return { profiles: newData, candidates: candidatePreference };
};

export const OptimizeButton = props => {
  const clickHandler = event => {
    const newData = getInSchema(props.companyData);
    fetch(
      "http://scheduleoptimizer-dev.us-east-1.elasticbeanstalk.com/optimize",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify(newData)
      }
    ).then(response => {
      console.log(response.json());
    });
    console.log(newData);
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
    companyData: store.companies
  };
};

export default connect(mapStateToProps)(OptimizeButton);
