import React from "react";
import { Link } from "react-router-dom";

export default function List(props) {
  return (
    <div>
      <div>
        <Link to="/admin/directors/add">Director Add</Link>
      </div>
      <h3>Directors</h3>
      <table>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Birth Date</th>
          <th>Birth Place</th>
          <th />
          <th />
        </tr>

        {props.table.map(item => (
          <tr>
            <td>{item.name}</td>
            <td>{item.surName}</td>
            <td>{item.birthDate}</td>
            <td>{item.birthPlace}</td>
            <td>
              <input type="button" value="DELETE" />
            </td>
            <td>
              <input type="button" value="UPDATE" />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
