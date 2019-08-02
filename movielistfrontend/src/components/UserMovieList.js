import React from "react";
import { Link } from "react-router-dom";

export default function List(props) {
  return (
    <div>
      <h3>Movies</h3>
      <table>
        <tr>
          <th>Movie Name</th>
          <th>Release Date</th>
          <th>IMDB Rating</th>
          <th>Duration</th>
          <th>Genre</th>
          <th />
          <th />
        </tr>

        {props.table.map(item => (
          <tr>
            <td>{item.name}</td>
            <td>{item.releaseDate}</td>
            <td>{item.imdbRating}</td>
            <td>{item.duration}</td>
            <td>{item.genre}</td>
            <td>
              <input type="button" value="Add to Watchlist" />
            </td>
            <td>
              <input type="button" value="Add to Favorites" />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
