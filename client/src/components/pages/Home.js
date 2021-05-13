import React, { useEffect } from "react";
import { connect } from "react-redux";
import Contacts from "../Articles/Articles";
// import ContactForm from "../contacts/ContactForm";
import FilterContacts from "../Articles/FilterArticles";
import { getContacts } from "../../store/actions/articles";
import { loadUser } from "../../store/actions/auth";

function Home(props) {
  useEffect(() => {
    props.loadUser();
    props.getContacts();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="grid-2">
      {/* <ContactForm /> */}
      <Contacts />
      <div>
        {/* <FilterContacts /> */}

        <FilterContacts />
      </div>
    </div>
  );
}

export default connect(null, { loadUser, getContacts })(Home);
