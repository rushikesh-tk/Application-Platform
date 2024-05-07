import {
  JOB_DATA_LIST_FAIL,
  JOB_DATA_LIST_REQUEST,
  JOB_DATA_LIST_SUCCESS,
} from "../constants/jobConstants";
import { fetchJobs } from "../utils/utils";

export const listJobs = (offset) => async (dispatch, getState) => {
  try {
    dispatch({ type: JOB_DATA_LIST_REQUEST });

    const data = await fetchJobs(offset);

    dispatch({
      type: JOB_DATA_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: JOB_DATA_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
