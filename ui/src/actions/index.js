export const ADD_COMPANY = "ADD_COMPANY";
export const TOGGLE_CANDIDATE_DISPLAY = "TOGGLE_CANDIDATE_DISPLAY";
export const CHANGE_COMPANY_START_TIME = "CHANGE_COMPANY_START_TIME";
export const CHANGE_CANDIDATE_START_TIME = "CHANGE_CANDIDATE_START_TIME";
export const CHANGE_CANDIDATE_END_TIME = "CHANGE_CANDIDATE_END_TIME";
export const CHANGE_CANDIDATE_NAME = "CHANGE_CANDIDATE_NAME";
export const CHANGE_CANDIDATE_STATUS = "CHANGE_CANDIDATE_STATUS";
export const ADD_CANDIDATE = "ADD_CANDIDATE";
export const UPDATE_OPTIMIZED_STATE = "UPDATE_OPTIMIZED_STATE";
export const UPDATE_CANDIDATE_PREFERENCE = "UPDATE_CANDIDATE_PREFERENCE";

export const addCompany = () => ({ type: ADD_COMPANY });

export const addCandidate = companyId => ({
  type: ADD_CANDIDATE,
  companyId: companyId
});

export const changeCompanyStartTime = (companyId, companyStartTime) => ({
  type: CHANGE_COMPANY_START_TIME,
  companyId: companyId,
  companyStartTime: companyStartTime
});

export const changeCandidateStartTime = (
  companyId,
  candidateId,
  startTime
) => ({
  type: CHANGE_CANDIDATE_START_TIME,
  companyId: companyId,
  candidateId: candidateId,
  startTime: startTime
});

export const changeCandidateEndTime = (companyId, candidateId, endTime) => ({
  type: CHANGE_CANDIDATE_END_TIME,
  companyId: companyId,
  candidateId: candidateId,
  endTime: endTime
});

export const changeCandidateStatus = (companyId, candidateId, status) => ({
  type: CHANGE_CANDIDATE_STATUS,
  companyId: companyId,
  candidateId: candidateId,
  status: status
});

export const changeCandidateName = (companyId, candidateId, candidateName) => ({
  type: CHANGE_CANDIDATE_NAME,
  companyId: companyId,
  candidateId: candidateId,
  candidateName: candidateName
});

export const toggleCandidateDisplay = companyId => ({
  type: TOGGLE_CANDIDATE_DISPLAY,
  companyId: companyId
});

export const updateOptimizedState = optimizedState => ({
  type: UPDATE_OPTIMIZED_STATE,
  optimizedState: optimizedState
});

export const updateCandidatePreferences = (
  candidateId,
  candidatePreference
) => ({
  type: UPDATE_CANDIDATE_PREFERENCE,
  candidateId: candidateId,
  candidatePreference: candidatePreference
});
