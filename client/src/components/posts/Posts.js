import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import { connect } from "react-redux";
import { getPosts } from "../../redux/actions/post";

import {
  Card,
  Badge,
  InputGroup,
  FormControl,
  Button,
  Form,
  // Spinner,
} from "react-bootstrap";

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  var Articles = posts;

  var [search, setSearch] = useState(null);

  const searchSpace = (event) => {
    let keyword = event.target.value;
    setSearch(keyword);
  };

  const elementStyle = {
    height: "8vh",
    width: "100%",
  };

  const displayposts = posts
    .filter((data) => {
      if (search == null) return data;
      else if (
        data.Author.toLowerCase().includes(search.toLowerCase()) ||
        data.Topic.toLowerCase().includes(search.toLowerCase())
      ) {
        return data;
      }
    })
    .map((data) => <PostItem key={data._id} post={data} />);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Articles</h1>
      <div className="posts">
        {/* {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))} */}
        <input
          type="text"
          placeholder="Enter Author or Topic to search Articles"
          style={elementStyle}
          onChange={(e) => searchSpace(e)}
        />
        <br />
        {displayposts}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
