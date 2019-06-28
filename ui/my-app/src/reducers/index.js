import { combineReducers } from "redux";
import { companies, companiesCandidateVisibility } from "./company";

export default combineReducers({
  companies,
  companiesCandidateVisibility
});
