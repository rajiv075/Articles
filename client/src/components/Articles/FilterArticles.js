import React, { useRef } from "react";
import { connect } from "react-redux";
import { filterContacts } from "../../store/actions/articles";

function FilterContacts({ filterContacts }) {
  const text = useRef("");

  const handleChange = (e) => {
    e.preventDefault();
    filterContacts(text.current.value);
  };
  return (
    <form>
      <br />

      <p>
        <b>Filter Artices By Author or Topic</b>{" "}
      </p>
      <input
        ref={text}
        type="text"
        placeholder="Filter Articles by Topic or Author....."
        onChange={handleChange}
      />
      {/* <button type="submit" onSubmit={handleChange}>
        search
      </button> */}
    </form>
  );
}
export default connect(null, { filterContacts })(FilterContacts);
