import React from "react";
import Listitem from "./Listitem.js";

export default function List(props) {
  const items = (e) => {
    return props.data.map((el) => {
      return (
        <Listitem
          key={el._id}
          subject={el.subject}
          to={el.to}
          from={el.from}
          date={el.date}
          delete={props.delete}
          mailId={el._id}
          selected={props.selected}
          content={el.content}
          toggleReadOn={props.toggleReadOn}
          toggleComposeOff={props.toggleComposeOff}
          sent={props.sent}
        ></Listitem>
      );
    });
  };
  return (
    <div className="table-wrapper-scroll-y my-custom-scrollbar">
      {" "}
      <table className="table table-light table-hover table-responsive">
        <thead>
          <tr>
            <th>Subject.</th>
            {props.sent === false && <th>From.</th>}
            {props.sent === true && <th>To:</th>}
            <th>Date</th>
            {props.sent === false && <th>Delete</th>}
          </tr>
        </thead>
        <tbody>{items()}</tbody>
      </table>
    </div>
  );
}
