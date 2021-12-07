import React from "react";

export default function Listitem(props) {
  return (
    <tr>
      <td>{props.subject}</td>
      <td>{props.to}</td>
      <td>{props.from}</td>
      <td>{props.date}</td>
      <td>
        <button
          className="btn btn-danger"
          type="button"
          // onClick={() => {
          //   props.deleteMail(props.mail._id);
          // }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
