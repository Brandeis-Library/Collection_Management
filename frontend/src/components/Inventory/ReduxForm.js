import React from "react";
import { reduxForm, Field } from "redux-form";

const renderInput = ({ input, meta }) => (
  <input {...input} type="text" errorMessage={meta.touched && meta.error} />
);

const onSubmit = (values) => {
  alert(JSON.stringify(values));
};

const required = (v) => {
  if (!v || v === "") {
    return "This field is required";
  }
  return undefined;
};

const allowedEntries = (v) => {
  if (v === "Not Approved Name") {
    return "Not Approved Name is not a proper response.";
  }
};

const ReduxForm = ({ handleSubmit, valid }) => (
  <div>
    <h5>Update Item Information</h5>
    <form onSubmit={handleSubmit}>
      {" "}
      <label>Price: </label>
      <Field name="price" component={renderInput} validate={[required, allowedEntries]} />
      <button disabled={!valid} type="submit">
        Submit
      </button>
    </form>
  </div>
);

export default reduxForm({
  form: "user-update-form",
  onSubmit,
})(ReduxForm);
