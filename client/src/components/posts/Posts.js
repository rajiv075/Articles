import React, { Fragment, useEffect } from "react";
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

  const handleSearch = (e) => {};

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Articles</h1>
      {/* <Form onSubmit={handleSearch}>
        <InputGroup className="mb-3 mt-3">
          <FormControl
            placeholder="Search articles by tags (Type a tag and Click Search)..."
            aria-label="search"
            aria-describedby="search"
            // onChange={onSearchType}
          />
          <InputGroup.Append>
            <Button type="submit" variant="outline-primary">
              Search
            </Button>
            <Button variant="outline-secondary">Reset</Button>
          </InputGroup.Append>
        </InputGroup>
      </Form> */}

      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
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
