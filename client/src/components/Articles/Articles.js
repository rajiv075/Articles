import React, { useState } from "react";
import { connect } from "react-redux";
import ContactItem from "./ArticleItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { getContacts } from "../../store/actions/articles";
import ReactPaginate from "react-paginate";
import "./pagenation.css";

function Contacts(props) {
  const { contacts } = props;
  const [articles, setArticles] = useState(contacts.contacts.slice(0, 300));
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  const displayArticles = articles
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((article) => {
      return (
        <CSSTransition key={article._id} timeout={200} classNames="item">
          <ContactItem contact={article} />
        </CSSTransition>
      );
    });
  const pageCount = Math.ceil(articles.length / usersPerPage);

  return (
    <React.Fragment>
      <TransitionGroup>
        {contacts.filtered !== null
          ? contacts.filtered.map((contact) => (
              <CSSTransition key={contact._id} timeout={200} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))
          : contacts.contacts.map((contact) => (
              <CSSTransition key={contact._id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </React.Fragment>
  );
}
const mapStatesToProps = (state) => {
  return { contacts: state.contacts };
};

export default connect(mapStatesToProps, {
  getContacts,
})(Contacts);
