import React from "react";

function ContactItem({ contact }) {
  const {
    _id,
    Article_Link,
    Title,
    Date,
    Author,
    Description,
    Topic,
  } = contact;
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
export default ContactItem;
