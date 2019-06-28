import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Company from "./components/company";
import OptimizeButton from "./components/optimizeButton";
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
        <div
          style={{
            height: "90px",
            background: "#466368",
            background:
              "linear-gradient(to right bottom, rgb(63, 81, 181), rgb(54, 63, 117))"
          }}
        >
          <div
            style={{
              textAlign: "center",
              fontSize: "200%",
              fontFamily: "Barlow, sans-serif",
              color: "#dddeff",
              height: "100%",
              display: "flex"
            }}
          >
            <div style={{ margin: "auto" }}>Interview Scheduler</div>
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
        <div style={{ display: "flex", width: "30%", margin: "auto" }}>
          <Button
            onClick={() => this.props.addCompany()}
            variant="contained"
            color="primary"
            style={{ margin: "1rem auto" }}
          >
            Add Company
            <Icon style={{ marginLeft: "5px" }}>add</Icon>
            {/* <DeleteIcon className={classes.rightIcon} /> */}
          </Button>

          <OptimizeButton />
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
