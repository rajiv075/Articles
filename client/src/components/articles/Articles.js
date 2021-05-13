import React, { useState } from "react";
import { connect } from "react-redux";
import ArticleItem from "./ArticleItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { getArticles } from "../../store/actions/articles";
import ReactPaginate from "react-paginate";
import "./pagenation.css";

function Articles(props) {
  const { articles } = props;
  const [Articles, setArticles] = useState(articles.articles.slice(0, 300));
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  const displayArticles = Articles.slice(
    pagesVisited,
    pagesVisited + usersPerPage
  ).map((article) => {
    return (
      <CSSTransition key={article._id} timeout={200} classNames="item">
        <ArticleItem article={article} />
      </CSSTransition>
    );
  });
  const pageCount = Math.ceil(articles.length / usersPerPage);

  return (
    <React.Fragment>
      <TransitionGroup>
        {articles.filtered !== null
          ? articles.filtered.map((article) => (
              <CSSTransition key={article._id} timeout={200} classNames="item">
                <ArticleItem article={article} />
              </CSSTransition>
            ))
          : articles.articles.map((article) => (
              <CSSTransition key={article._id} timeout={500} classNames="item">
                <ArticleItem article={article} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </React.Fragment>
  );
}
const mapStatesToProps = (state) => {
  return { articles: state.articles };
};

export default connect(mapStatesToProps, {
  getArticles,
})(Articles);
