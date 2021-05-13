import React, { useEffect } from "react";
import { connect } from "react-redux";
import Articles from "../articles/Articles";
import FilterArticles from "../articles/FilterArticles";
import { getArticles } from "../../store/actions/articles";
import { loadUser } from "../../store/actions/auth";

function Home(props) {
  useEffect(() => {
    props.loadUser();
    props.getArticles();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="grid-2">
      <Articles />
      <div>
        <FilterArticles />
      </div>
    </div>
  );
}

export default connect(null, { loadUser, getArticles })(Home);
