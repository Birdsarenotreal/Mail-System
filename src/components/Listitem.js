import React from "react";

export default function Listitem(props) {
  const mail = {
    to: props.to,
    subject: props.subject,
    from: props.from,
    date: props.date,
    content: props.content,
  };
  return (
    <tr
      onClick={() => {
        props.selected(mail);
        props.toggleReadOn(true);
        props.toggleComposeOff(false);
      }}
    >
      <td>{props.subject}</td>
      <td>{props.from}</td>
      <td>{props.to}</td>
      <td>{props.date}</td>
      {!props.sent && (
        <td>
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => {
              props.delete(props.mailId);
            }}
          >
            Delete
          </button>
        </td>
      )}
    </tr>
  );
}
