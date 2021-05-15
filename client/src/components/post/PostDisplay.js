import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";

const PostDisplay = ({
  post: {
    _id,
    Article_Link,
    Author,
    Topic,
    Description,
    Title,
    likes,
    comments,
    Date,
    user,
  },
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      {/* <div>
        <Link to={`/profile/${user}`}>
          <img src={avatar} alt='Profile' className='round-img' />
          <h4>{name}</h4>
        </Link>
      </div> */}
      <div>
        <a href={Article_Link} target="_blank">
          <h3>{Title}</h3>
        </a>
        <p>{Description}</p>

        <p className="post-date">
          Posted on <Moment format="DD/MM/YYYY">{Date}</Moment>
        </p>
        <p>{Topic}</p>
        <p>{Author}</p>
      </div>
    </div>
  );
};

PostDisplay.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostDisplay;
