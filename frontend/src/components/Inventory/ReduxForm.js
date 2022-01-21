import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const ReduxForm = () => {
  const inventoryData = useSelector((state) => state.inventory.dataObjTotal);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setPrice(inventoryData.item_data.replacement_cost);
  }, [inventoryData]);

  const onSubmit = (event) => {
    event.prevenDefault();
    // gather local state
    // attach to inventoryData
    // bring in the dispatch process you want
    // declate dispatch
    // submit data to dispatch
    // set up action type
    // set up action
    // thunk to back end
    // when data comes back sent to reducer
    // set up reducer
  };

  const dispatch = useDispatch();
  return (
    <div>
      {/* {JSON.stringify(inventoryData)} */}
      {/* {console.log(inventoryData.item_data.replacement_cost)} */}
      <h5>Update Item Information</h5>
      <form onSubmit={onSubmit}>
        <label>
          Price:
          <input type="text" value={price} onChange={(event) => setPrice(event.target.value)} />
        </label>
        <button type="submit">Submit Form Data</button>
      </form>
    </div>
  );
};

export default ReduxForm;
