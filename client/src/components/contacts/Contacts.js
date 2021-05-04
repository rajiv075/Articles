import React, { useState } from "react";
import { connect } from "react-redux";
import ContactItem from "./ContactItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { getContacts } from "../../store/actions/contacts";
import ReactPaginate from "react-paginate";
import "./pagenation.css";

function Contacts(props) {
  const { contacts } = props;
  console.log(contacts.contacts);
  const [articles, setArticles] = useState(contacts.contacts.slice(0, 300));
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;

  const displayArticles = articles
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((article) => {
      return (
        <CSSTransition key={article._id} timeout={500} classNames="item">
          <ContactItem contact={article} />
        </CSSTransition>
      );
    });

  const pageCount = Math.ceil(articles.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <React.Fragment>
      <TransitionGroup>
        {displayArticles}
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </TransitionGroup>
    </React.Fragment>
  );
}
const mapStatesToProps = (state) => {
  return { contacts: state.contacts };
};

export default connect(mapStatesToProps, {
  getContacts,
  // deleteContact,
  // setSelected,
})(Contacts);
