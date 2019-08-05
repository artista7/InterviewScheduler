import { UPDATE_CANDIDATE_PREFERENCE } from "../actions";

export const candidates = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_CANDIDATE_PREFERENCE: {
      // Add a new company
      const { candidateId, candidatePreference } = action;
      console.log("candidatePreferences", candidatePreference);
      return {
        ...state,
        [candidateId]: candidatePreference
      };
    }
    default:
      return state;
  }
};

export default candidates;
