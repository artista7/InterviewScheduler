import { combineReducers } from "redux";
import { companies, companiesCandidateVisibility } from "./company";
import { candidates } from "./candidate";

export default combineReducers({
  companies,
  companiesCandidateVisibility,
  candidates
});
