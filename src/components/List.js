import React from "react";
import Listitem from "./Listitem.js";

export default function List() {
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
      <tbody>
        <Listitem subject={"asd"} to={"asfas"} from={"test"}></Listitem>
        <Listitem subject={"asd"} to={"asfas"} from={"test"}></Listitem>
        <Listitem subject={"asd"} to={"asfas"} from={"test"}></Listitem>
      </tbody>
    </table>
  );
}
