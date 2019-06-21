import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import AddIcon from "@material-ui/icons/Add";

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
            boxShadow:
              "1px 1px 5px -3px rgba(0, 0, 0, 0.3), 5px 5px 15px 0px rgba(0, 0, 0, 0.5)",
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
                  fontWeight: "bold",
                  fontSize: "125%",
                  marginBottom: "5px"
                }}
              >
                {" "}
                Company Name{" "}
              </div>
              <div style={{ marginBottom: "5px" }}> Job Profile </div>
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
                  marginTop: "10px"
                }}
              >
                <TextField
                  id="time"
                  label="Start Time"
                  type="time"
                  style={{ textAlign: "left" }}
                  fullWidth
                  value={this.state.startTime}
                  onChange={event =>
                    this.setState({ startTime: event.target.value })
                  }
                  defaultValue="07:30"
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
                  {this.props.candidateBarVisibility && "expand_more"}
                  {!this.props.candidateBarVisibility && "expand_less"}
                </Icon>
              </Fab>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: props.status
    };
  }

  render() {
    return <div> </div>;
  }
}

class Candidate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidateId: props.candidateId,
      status: props.status,
      startTime: props.startTime,
      endTime: props.endTime
    };
    this.stateOptions = [
      { key: "DONE", value: 3 },
      { key: "ONGOING", value: 2 },
      { key: "PENDING", value: 1 }
    ];
  }

  render() {
    const divStyle = { margin: "1rem" };

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
          <TextField id="standard-name" label="Name" />
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
              id="standard-select-currency"
              select
              label="Interview Status"
              // helperText="Status of the interview"
              value={this.state.status}
              style={{ textAlign: "left" }}
              fullWidth
              // onChange={handleChange("currency")}
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
              label="Start Time"
              type="time"
              style={{ textAlign: "left" }}
              fullWidth
              value={this.state.startTime}
              defaultValue="07:30"
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
              label="End Time"
              type="time"
              style={{ textAlign: "left" }}
              fullWidth
              value={this.state.endTime}
              defaultValue="07:30"
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

class CandidateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // candidates: props.candidates
      candidateBarVisibility: props.candidateBarVisibility,
      candidates: [{ candidateId: 0, status: 1 }, { candidateId: 1, status: 1 }]
    };
  }

  render() {
    return (
      <div
        style={{
          display: this.props.candidateBarVisibility ? "block" : "None",
          width: "70%",
          dispay: "flex",
          margin: "auto",
          boxShadow:
            "1px 1px 5px -3px rgba(0, 0, 0, 0.3), 3px 3px 15px 0px rgba(0, 0, 0, 0.5)",
          borderRadius: "5px",
          backgroundColor: "#ffffff"
        }}
      >
        <div style={{ display: "table", margin: "auto", width: "100%" }} />
        {this.state.candidates.map(candidate => (
          <div>
            <Candidate {...candidate} />
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

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: [],
      startTime: 0,
      candidateBarVisibility: true
    };
  }

  render() {
    const updateCandidateVisibility = () => {
      this.setState({
        candidateBarVisibility: !this.state.candidateBarVisibility
      });
    };
    return (
      <div>
        <CompanyInfo
          candidateBarVisibility={this.state.candidateBarVisibility}
          updateCandidateVisibility={updateCandidateVisibility}
        />
        <CandidateList
          candidates={this.state.candidates}
          candidateBarVisibility={this.state.candidateBarVisibility}
          updateCandidateVisibility={updateCandidateVisibility}
        />
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    // Maintain data needed for the app
    this.state = {
      companies: []
    };
  }

  render() {
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <h1>Interview Scheduler</h1>
        </div>
        <Company />
        <Button variant="contained" color="primary" style={{ margin: "1rem" }}>
          Add Company
          <Icon style={{ marginLeft: "5px" }}>add</Icon>
          {/* <DeleteIcon className={classes.rightIcon} /> */}
        </Button>
      </div>
    );
  }
}

// ReactDOM.render(<App />, document.getElementById("app"));
export default App;
