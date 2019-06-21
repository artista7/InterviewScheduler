import React, { Component } from "react";
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
      marginLeft: "1rem",
      verticalAlign: "top", //To Align the inline blocks to top,
      marginLeft: "5px"
    };

    const expandClickHandler = event => {
      this.setState(prevState => ({
        check: !prevState.check
      }));
    };
    return (
      <div style={{ boxSizing: "border-box", margin: "1rem" }}>
        <img
          src="https://via.placeholder.com/75"
          alt="Company Image"
          width="75px"
        />
        <div style={divStyle}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "125%"
            }}
          >
            {" "}
            Company Name{" "}
          </div>
          <div style={{ margin: "5px" }}> Job Profile </div>
          <div style={{ margin: "5px" }}>
            {" "}
            <strong>Start Time: {}</strong>{" "}
            <input
              type="text"
              value={this.state.startTime}
              onChange={event =>
                this.setState({ startTime: event.target.value })
              }
              placeholder="Start Time"
              size={7}
            />
          </div>
          <div>
            <Fab
              size="medium"
              color="primary"
              aria-label="Add"
              onClick={event => {
                this.setState({
                  candidateBarVisibility: !this.state.candidateBarVisibility
                });
              }}
            >
              <Icon>
                {this.state.candidateBarVisibility && "expand_more"}
                {!this.state.candidateBarVisibility && "expand_less"}
              </Icon>
            </Fab>
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

    const handleChange = name => event => {
      setValues({ ...values, [name]: event.target.value });
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
          display: this.state.candidateBarVisibility ? "block" : "hidden"
        }}
      >
        <div style={{ display: "table", margin: "auto", width: "100%" }} />
        <hr />
        {this.state.candidates.map(candidate => (
          <Candidate {...candidate} />
        ))}
        <Button variant="contained" color="primary" style={{ margin: "1rem" }}>
          Add Candidate
          <Icon style={{ marginLeft: "5px" }}>add</Icon>
          {/* <DeleteIcon className={classes.rightIcon} /> */}
        </Button>
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
    const clickHandler = event => {};
    return (
      <div>
        <CompanyInfo
          candidateBarVisibility={this.state.candidateBarVisibility}
        />
        <CandidateList
          candidates={this.state.candidates}
          candidateBarVisibility={this.state.candidateBarVisibility}
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

ReactDOM.render(<App />, document.getElementById("app"));
