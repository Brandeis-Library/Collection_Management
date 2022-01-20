import React from "react";
import { useSelector, useDispatch } from "react-redux";

const ReduxForm = () => {
  const inventoryData = useSelector((state) => state.inventory);

  const dispatch = useDispatch();
  return (
    <div>
      <h5>Update Item Information</h5>
    </div>
  );
};

export default ReduxForm;
