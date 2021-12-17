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
        ></Listitem>
      );
    });
  };
  return (
    <table className="table table-dark">
      <thead>
        <tr>
          <th>Subject.</th>
          <th>To:</th>
          <th>From:</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>{items()}</tbody>
    </table>
  );
}
