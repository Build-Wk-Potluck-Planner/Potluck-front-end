import React from "react";

export default function Form(props) {
  const { formValues, change, submit } = props;
  return (
    <div>
      <form onSubmit={submit}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={change}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={change}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}