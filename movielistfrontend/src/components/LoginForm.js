import React from "react";

export default function Form(props) {
  return (
    <div>
      <form action={props.action} method={props.method} className={props.class}>
        <label>
          Username:
          <input type="text" name="username" value={props.username} />
        </label>{" "}
        <label>
          Password:
          <input type="password" name="password" value={props.password} />
        </label>
        <input type="submit" value="Login" onClick={props.onClick} />
      </form>
    </div>
  );
}
