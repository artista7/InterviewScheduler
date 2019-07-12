import produce from "immer";

import {
  ADD_COMPANY,
  TOGGLE_CANDIDATE_DISPLAY,
  ADD_CANDIDATE,
  CHANGE_COMPANY_START_TIME,
  CHANGE_CANDIDATE_START_TIME,
  CHANGE_CANDIDATE_END_TIME,
  CHANGE_CANDIDATE_STATUS,
  CHANGE_CANDIDATE_NAME
} from "../actions";

const initialState = {
  companies: {},
  toggleCandidateDisplay: {},
  candidatePreferenceData: {}
};

const initialCompanyState = {
  candidates: [],
  companyStartTime: "06:00",
  comapanyName: "",
  companyId: ""
};

const initialCandidateState = {
  startTime: "06:00",
  endTime: "06:00",
  status: 3,
  candidateName: ""
};

const extractCandidate = (companyId, candidateId, state) => {
  const candidate = state[companyId].candidates[candidateId];
  return { ...candidate };
};

const updateCandidate = (companyId, candidateId, updatedCandidate, state) => {
  // extract the company first
  const company = state[companyId];
  //   const candidates = [...company["candidates"]];
  state[companyId]["candidates"][candidateId] = updatedCandidate;

  //   candidates[candidateId] = updatedCandidate;
  //   company.candidates = candidates;
  const newState = { ...state, [companyId]: company };
  return newState;
};

export const companies = (state = initialState.companies, action) => {
  switch (action.type) {
    case ADD_COMPANY: {
      // Add a new company
      const companiesCount = Object.keys(state).length;
      const companyId = "Company #" + companiesCount;
      const newCompany = { ...initialCompanyState };
      newCompany.name = companyId;
      newCompany.companyId = companyId;
      const newState = {
        ...state,
        [companyId]: newCompany
      };
      return {
        ...state,
        [companyId]: newCompany
      };
    }
    case ADD_CANDIDATE: {
      const { companyId } = action;

      // Create a copy of the comapny Id
      const company = {
        ...state[companyId],
        candidates: [...state[companyId].candidates]
      };
      const newCandidate = initialCandidateState;
      company.candidates.push({ ...newCandidate });
      return {
        ...state,
        [companyId]: company
      };
    }
    case CHANGE_COMPANY_START_TIME: {
      const { companyId, newCompanyStartTime } = action;
      const company = { ...state[companyId], startTime: newCompanyStartTime };
      return {
        ...state,
        [companyId]: company
      };
    }

    case CHANGE_CANDIDATE_START_TIME: {
      const { companyId, candidateId, startTime } = action;
      const candidate = extractCandidate(companyId, candidateId, state);
      candidate.startTime = startTime;
      const newState = updateCandidate(companyId, candidateId, candidate, {
        ...state
      });

      return newState;
    }
    case CHANGE_CANDIDATE_END_TIME: {
      const { companyId, candidateId, endTime } = action;
      const candidate = extractCandidate(companyId, candidateId, state);
      candidate.endTime = endTime;
      const newState = updateCandidate(companyId, candidateId, candidate, {
        ...state
      });

      return newState;
    }
    case CHANGE_CANDIDATE_STATUS: {
      const { companyId, candidateId, status } = action;
      const candidate = extractCandidate(companyId, candidateId, state);
      const newCandidate = { ...candidate, status: status };
      const newState = updateCandidate(companyId, candidateId, newCandidate, {
        ...state
      });

      return newState;
    }
    case CHANGE_CANDIDATE_NAME: {
      const { companyId, candidateId, candidateName } = action;
      const candidate = extractCandidate(companyId, candidateId, state);
      const newCandidate = { ...candidate, candidateName: candidateName };
      const newState = updateCandidate(companyId, candidateId, newCandidate, {
        ...state
      });

      return newState;
    }
    default:
      return state;
  }
};

// export const companies = (state = initialState.companies, action) =>
//   produce(state, draft => {
//     switch (action.type) {
//       case ADD_COMPANY: {
//         // Add a new company
//         const companiesCount = Object.keys(state).length;
//         const companyId = "Company #" + companiesCount;
//         const newCompany = { ...initialCompanyState };
//         newCompany.name = companyId;
//         newCompany.companyId = companyId;
//         const newState = {
//           ...state,
//           [companyId]: newCompany
//         };
//         return {
//           ...state,
//           [companyId]: newCompany
//         };
//       }
//       case ADD_CANDIDATE: {
//         const { companyId } = action;
//         draft[companyId].candidates.push({ ...initialCandidateState });
//       }
//       case CHANGE_CANDIDATE_START_TIME: {
//         const { companyId, candidateId, startTime } = action;
//         console.log(startTime);
//         if (candidateId != null) {
//           const candidate = draft[companyId].candidates[candidateId];
//           console.log(candidate);
//           draft[companyId].candidates[candidateId] = {
//             ...candidate,
//             startTime: startTime
//           };
//         }
//         console.log(draft);
//       }
//       case CHANGE_CANDIDATE_END_TIME: {
//         const { companyId, candidateId, endTime } = action;
//         if (candidateId != null) {
//           draft[companyId].candidates[candidateId].endTime = endTime;
//         }
//       }
//       case CHANGE_CANDIDATE_STATUS: {
//         const { companyId, candidateId, status } = action;
//         if (candidateId != null) {
//           draft[companyId].candidates[candidateId]["status"] = status;
//         }
//       }
//     }
//   });

export const companiesCandidateVisibility = (
  state = initialState.toggleCandidateDisplay,
  action
) => {
  switch (action.type) {
    case TOGGLE_CANDIDATE_DISPLAY:
      const { companyId } = action;
      const newState = { ...state, [companyId]: !(state[companyId] || false) };
      return newState;
    default:
      return state;
  }
};

export const candidate = {};
export default companies;
