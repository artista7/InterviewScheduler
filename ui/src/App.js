import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Company from "./components/company";
import OptimizeButton from "./components/optimizeButton";
import TimelineChart from "./components/timelineChart";
import CandidatePrioritySelector from "./components/candidatesTab";
import { addCompany } from "./actions";

import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import AddIcon from "@material-ui/icons/Add";
import reducer from "./reducers";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { connect } from "react-redux";

class App extends Component {
  constructor(props) {
    super(props);

    // Maintain data needed for the app
    this.state = {
      companies: []
    };
  }

  render() {
    const createCompany = (companyId, company) => {
      return (
        <Company
          {...company}
          candidateBarVisibility={
            this.props.companiesCandidateVisbility[companyId]
          }
          key={company.companyId}
        />
      );
    };

    return (
      <div>
        <div className="top-nav-bar">
          <div className="header-text-box">
            <div style={{ margin: "auto" }}>Interview Scheduler</div>
          </div>
        </div>
        <div style={{ width: "70%", margin: "auto" }}>
          <div
            style={{
              display: "block",
              fontFamily: "Barlow",
              fontSize: "25px",
              marginTop: "1.5rem",
              color: "#795548d9",
              fontWeight: "550"
            }}
          >
            <div>Company Section</div>
            <div style={{ width: "100%" }}>
              <hr
                style={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  color: "#795548d9"
                }}
              />
            </div>
          </div>
        </div>
        <div>
          {/* {Object.entries(this.props.companies).forEach(
            ([companyId, company]) => createCompany(companyId, company)
          )} */}
          {Object.keys(this.props.companies).map(companyId =>
            createCompany(companyId, this.props.companies[companyId])
          )}
        </div>
        <div className="button-bar">
          <Button
            onClick={() => this.props.addCompany()}
            variant="contained"
            color="primary"
            style={{ margin: "1rem auto" }}
          >
            Add Company
            <Icon style={{ marginLeft: "5px" }}>add</Icon>
          </Button>
          <OptimizeButton />
        </div>
        <div style={{ width: "70%", margin: "auto" }}>
          <div
            style={{
              display: "block",
              fontFamily: "Barlow",
              fontSize: "25px",
              marginTop: "1.5rem",
              color: "#795548d9",
              fontWeight: "550"
            }}
          >
            <div> Candidate Section</div>
            <div style={{ width: "100%" }}>
              <hr
                style={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  color: "#795548d9"
                }}
              />
            </div>
          </div>
        </div>
        <div style={{ width: "70%", display: "block", margin: "auto" }}>
          <CandidatePrioritySelector />
        </div>
        <div style={{ width: "80%", display: "block", margin: "auto" }}>
          <TimelineChart />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.companies,
  companiesCandidateVisbility: state.companiesCandidateVisibility
});

const mapDispachToProps = { addCompany };
// ReactDOM.render(<App />, document.getElementById("app"));
export default connect(
  mapStateToProps,
  mapDispachToProps
)(App);
