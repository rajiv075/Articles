import axios from "axios";
import {
  FILTER_ARTICLE,
  ARTICLE_ERROR,
  GET_ARTICLES,
  SET_SELECTED,
  CLEAR_SELECTED,
} from "../../types";

export const getArticles = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/articles/");
    dispatch({ type: GET_ARTICLES, payload: res.data });
  } catch (err) {
    dispatch({ type: ARTICLE_ERROR, payload: err.response.msg });
  }
};

export const filterArticles = (text) => {
  return { type: FILTER_ARTICLE, payload: text };
};
