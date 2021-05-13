import React from "react";

function ArticleItem({ article }) {
  const { _id, Article_Link, Title, Date, Author, Description, Topic } =
    article;
  return (
    <div className="card bg-light">
      <a href={Article_Link} target="_blank">
        <h3>{Title}</h3>
      </a>
      {/* <p>{Description}</p> */}
      <p>
        <b>{Date}</b> <b>{Author}</b> <b>{Topic}</b>{" "}
      </p>
    </div>
  );
}
export default ArticleItem;
