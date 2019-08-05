import React, { Component } from "react";
import { toggleCandidateDisplay } from "../actions";
import CandidateList from "./candidate";
import { CHANGE_COMPANY_START_TIME, changeCompanyStartTime } from "../actions";

import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { connect } from "react-redux";

class CompanyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: props.startTime,
      candidateBarVisibility: props.candidateBarVisibility
    };
  }

  render() {
    const divStyle = {
      display: "inline-block",
      margin: "auto 0px",
      marginLeft: "1rem",
      verticalAlign: "top" //To Align the inline blocks to top,
    };

    const expandClickHandler = event => {
      this.setState(prevState => ({
        check: !prevState.check
      }));
    };

    const boxShadowWithoutCandidateBarOpen =
      "1px 1px 1px -3px rgba(0, 0, 0, 0.3), 5px 5px 15px 0px rgba(0, 0, 0, 0.5)";
    const boxShadowWithCandidateBarOpen =
      "1px 1px 1px -3px rgba(0, 0, 0, 0.3), 1px 1px 1px 0px rgba(0, 0, 0, 0.2)";
    const shadowStyle = this.props.candidateBarVisibility
      ? boxShadowWithCandidateBarOpen
      : boxShadowWithoutCandidateBarOpen;

    return (
      <div
        style={{
          boxSizing: "border-box",
          display: "flex",
          width: "100%",
          height: "75px"
        }}
      >
        <div
          style={{
            boxSizing: "border-box",
            margin: "0 auto",
            width: "70%",
            display: "flex",
            zIndex: "0",
            boxShadow: this.props.candidateBarVisibility
              ? boxShadowWithCandidateBarOpen
              : boxShadowWithoutCandidateBarOpen,
            borderRadius: "5px",
            backgroundColor: "#ffffff"
          }}
        >
          <div
            style={{
              boxSizing: "border-box",
              margin: "auto",
              width: "80%",
              display: "flex"
            }}
          >
            <img
              src="https://via.placeholder.com/50px"
              alt="Company Image"
              width="50px"
              height="50px"
              style={{ margin: "auto 12.5px" }}
            />
            <div style={divStyle}>
              <div
                style={{
                  fontSize: "125%",
                  marginBottom: "5px",
                  fontFamily: "Barlow, sans-serif"
                }}
              >
                Company Name
              </div>
              <div
                style={{
                  marginBottom: "5px",
                  fontFamily: "Barlow, sans-serif"
                }}
              >
                Job Profile
              </div>
            </div>
            <div
              style={{
                display: "flex",
                margin: "auto 5px",
                verticalAlign: "top",
                width: "40%"
              }}
            >
              <div
                style={{
                  width: "30%",
                  display: "inline-block",
                  margin: "auto",
                  marginTop: "5px"
                }}
              >
                <TextField
                  id="time"
                  label="Start Time"
                  type="time"
                  style={{ textAlign: "left" }}
                  fullWidth
                  value={this.props.companyStartTime}
                  onChange={event =>
                    this.props.dispatch(
                      changeCompanyStartTime(
                        this.props.companyId,
                        event.target.value
                      )
                    )
                  }
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
          <div
            style={{
              display: "flex",
              verticalAlign: "top",
              float: "right",
              width: "20%"
            }}
          >
            <div
              style={{
                display: "inline-block",
                verticalAlign: "middle",
                margin: "auto",
                float: "right"
              }}
            >
              <Fab
                size="medium"
                color="primary"
                aria-label="Add"
                onClick={event => {
                  this.props.updateCandidateVisibility();
                }}
              >
                <Icon>
                  {this.props.candidateBarVisibility && "expand_less"}
                  {!this.props.candidateBarVisibility && "expand_more"}
                </Icon>
              </Fab>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const MappedCompanyInfo = connect()(CompanyInfo);

class Company extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        style={{
          margin: "10px auto"
        }}
      >
        <MappedCompanyInfo
          companyId={this.props.companyId}
          companyStartTime={this.props.companyStartTime}
          candidateBarVisibility={this.props.candidateBarVisibility}
          updateCandidateVisibility={() =>
            this.props.dispatch(toggleCandidateDisplay(this.props.companyId))
          }
        />
        <CandidateList companyId={this.props.companyId} />
      </div>
    );
  }
}

export default connect()(Company);
