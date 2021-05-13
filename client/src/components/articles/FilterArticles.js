import React, { useRef } from "react";
import { connect } from "react-redux";
import { filterArticles } from "../../store/actions/articles";

function FilterArticles({ filterArticles }) {
  const text = useRef("");

  const handleChange = (e) => {
    e.preventDefault();
    filterArticles(text.current.value);
  };
  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Filter Articles by Topic or Author....."
        onChange={handleChange}
      />
    </form>
  );
}
export default connect(null, { filterArticles })(FilterArticles);
