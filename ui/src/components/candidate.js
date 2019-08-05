import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { connect } from "react-redux";
import {
  addCandidate,
  changeCandidateEndTime,
  changeCandidateStartTime,
  changeCandidateStatus,
  changeCandidateName
} from "../actions";

class Candidate extends Component {
  constructor(props) {
    super(props);
    this.candidateState = 1;
    this.stateOptions = [
      { key: "DONE", value: 3 },
      { key: "ONGOING", value: 2 },
      { key: "PENDING", value: 1 }
    ];
  }

  render() {
    const divStyle = { margin: "1rem" };
    const handleStatusChange = event => {
      this.props.dispatch(
        changeCandidateStatus(
          this.props.companyId,
          this.props.candidateId,
          event.target.value
        )
      );
    };
    return (
      <div style={{ display: "table", margin: "1rem", width: "100%" }}>
        {/* <div
            style={{
              display: "table-cell",
              margin: "auto",
              width: "25%",
              textAlign: "center"
            }}
          >
            {" "}
            CandidateId #{this.state.candidateId}
          </div> */}
        <div
          style={{
            display: "table-cell",
            margin: "auto",
            width: "25%",
            textAlign: "center"
          }}
        >
          <TextField
            value={this.props.candidateName}
            id="standard-name"
            label="Name"
            onChange={event => {
              this.props.dispatch(
                changeCandidateName(
                  this.props.companyId,
                  this.props.candidateId,
                  event.target.value
                )
              );
            }}
          />
        </div>
        <div
          style={{
            display: "table-cell",
            margin: "auto",
            width: "25%",
            textAlign: "center"
          }}
        >
          <div
            style={{
              margin: "auto",
              display: "inline-block",
              width: "60%"
            }}
          >
            <TextField
              select
              label="Interview Status"
              style={{ textAlign: "left" }}
              value={this.props.status}
              fullWidth
              /* onChange={event =>
                this.props.dispatch(
                  changeCandidateStatus(
                    this.props.companyId,
                    this.props.candidateId,
                    event.target.value
                  )
                )
              } */
              onChange={handleStatusChange}
            >
              {this.stateOptions.map(option => (
                <MenuItem key={option.key} value={option.value}>
                  {option.key}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>
        <div
          style={{
            display: "table-cell",
            margin: "auto",
            width: "25%",
            textAlign: "center"
          }}
        >
          <div
            style={{
              margin: "auto",
              display: "inline-block",
              width: "50%"
            }}
          >
            <TextField
              id="time"
              value={this.props.startTime}
              onChange={event =>
                this.props.dispatch(
                  changeCandidateStartTime(
                    this.props.companyId,
                    this.props.candidateId,
                    event.target.value
                  )
                )
              }
              label="Start Time"
              type="time"
              style={{ textAlign: "left" }}
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                step: 300 // 5 min
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: "table-cell",
            margin: "auto",
            width: "25%",
            textAlign: "center"
          }}
        >
          <div
            style={{
              margin: "auto",
              display: "inline-block",
              width: "50%"
            }}
          >
            <TextField
              id="time"
              value={this.props.endTime}
              onChange={event => {
                this.props.dispatch(
                  changeCandidateEndTime(
                    this.props.companyId,
                    this.props.candidateId,
                    event.target.value
                  )
                );
              }}
              label="End Time"
              type="time"
              style={{ textAlign: "left" }}
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                step: 300 // 5 min
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetoPropsCandidate = (state, ownProps) => {
  const { companyId, candidateId } = ownProps;
  const candidate = state.companies[companyId]["candidates"][candidateId];
  return { ...candidate };
};

const CandidateWithDispatch = connect(mapStatetoPropsCandidate)(Candidate);

class CandidateList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        style={{
          visibility: this.props.candidateBarVisibility ? "visible" : "hidden",
          display: this.props.candidateBarVisibility ? "block" : "None",

          width: "70%",
          margin: "auto",
          marginTop: "5px",
          zIndex: "1",
          boxShadow:
            "1px 1px 5px -3px rgba(0, 0, 0, 0.3), 3px 3px 15px 0px rgba(0, 0, 0, 0.5)",
          borderRadius: "5px",
          backgroundColor: "#ffffff",
          opacity: 1,
          transition: "opacity 2s linear",
          animationFillMode: "forwards"
        }}
      >
        <div style={{ display: "table", margin: "auto", width: "100%" }} />
        {this.props.candidates.map((candidate, candidateId) => (
          <div key={candidateId}>
            {/* <CandidateWithDispatch
              {...candidate}
              candidate={candidate}
              candidateId={candidateId}
              companyId={this.props.companyId}
            /> */}
            <CandidateWithDispatch
              candidateId={candidateId}
              companyId={this.props.companyId}
            />
            <hr
              style={{
                width: "95%",
                opacity: "0.5",
                boxShadow: "0px 2px 25px 0px rgba(0, 0, 0, 0.3)"
              }}
            />
          </div>
        ))}

        <div style={{ margin: "auto", display: "flex" }}>
          <Button
            onClick={() =>
              this.props.dispatch(addCandidate(this.props.companyId))
            }
            variant="contained"
            color="primary"
            style={{ margin: "15px auto" }}
          >
            Add Candidate
            <Icon style={{ marginLeft: "5px" }}>add</Icon>
            {/* <DeleteIcon className={classes.rightIcon} /> */}
          </Button>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state, ownProps) => {
  const { companyId } = ownProps;
  const candidates = state.companies[companyId]["candidates"];
  const candidateBarVisibility = state.companiesCandidateVisibility[companyId];
  return { candidates, candidateBarVisibility };
};
export default connect(mapStatetoProps)(CandidateList);
