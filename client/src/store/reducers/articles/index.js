import {
  FILTER_ARTICLE,
  ARTICLE_ERROR,
  GET_ARTICLES,
  SET_SELECTED,
  CLEAR_SELECTED,
} from "../../types";
const initialState = {
  articles: [],
  filtered: null,
  error: null,
  loading: true,
  selected: {},
};

function articleReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ARTICLES:
      return { ...state, articles: action.payload, loading: false };

    case FILTER_ARTICLE:
      return {
        ...state,
        filtered: state.articles.filter((article) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return (
            article.Topic.match(regex) ||
            article.Author.match(regex) ||
            article.Date.match(regex)
          );
        }),
      };
    case SET_SELECTED:
      return { ...state, selected: action.payload };

    case CLEAR_SELECTED:
      return { ...state, selected: {} };

    case ARTICLE_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
}

export default articleReducer;
