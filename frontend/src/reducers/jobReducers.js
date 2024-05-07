import {
  JOB_DATA_LIST_REQUEST,
  JOB_DATA_LIST_SUCCESS,
  JOB_DATA_LIST_FAIL,
} from "../constants/jobConstants";

export const jobDataListReducer = (state = { jobDataList: [] }, action) => {
  switch (action.type) {
    case JOB_DATA_LIST_REQUEST:
      return { loading: true, jobDataList: state.jobDataList };
    case JOB_DATA_LIST_SUCCESS:
      return {
        loading: false,
        jobDataList: [...state.jobDataList, ...action.payload],
      };
    case JOB_DATA_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
        jobDataList: state.jobDataList,
      };
    default:
      return state;
  }
};
