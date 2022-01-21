import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateItemFormQuery } from "../../redux/actions";
import { Button } from "react-bootstrap";

const buttonStyle = {
  borderRadius: "5px",
  paddingTop: "7px",
  paddingBottom: "7px",
  marginBottom: "5px",
  fontSize: "15px",
};

const ReduxForm = () => {
  const inventoryData = useSelector((state) => state.inventory.dataObjTotal);
  const [price, setPrice] = useState(0);
  const [note, setNote] = useState(0);

  useEffect(() => {
    setNote(inventoryData.item_data.internal_note_3);
    setPrice(inventoryData.item_data.replacement_cost);
  }, [inventoryData]);

  const onSubmit = (event) => {
    console.log("inside onSubmit");
    console.log("inventoryData in onSubmit before the price change", inventoryData);
    event.preventDefault();

    inventoryData.item_data.replacement_cost = price;
    inventoryData.item_data.internal_note_3 = note;
    dispatch(updateItemFormQuery(inventoryData));
    // gather local state
    // attach to inventoryData
    // bring in the dispatch process you want
    // declate dispatch
    // submit data to dispatch
    // set up action type
    // set up action d
    // thunk to back end
    // when data comes back sent to reducer
    // set up reducer to update data or choose an existing reducer
    // once price passes data successfully, set up the other 3 datatypes in inventory default state of dataObjTotal
    // implement other 3 useState items
    // implement other 3 states in useEffect
    // implement other 3 local states in onSubmit
    // implement other 3 inputs on the form
  };

  const dispatch = useDispatch();
  return (
    <div>
      {/* {JSON.stringify(inventoryData)} */}
      {/* {console.log(inventoryData.item_data.replacement_cost)} */}
      <h5>Update Item Information</h5>
      <form onSubmit={onSubmit}>
        <label>
          Price:{" "}
          <input type="text" value={price} onChange={(event) => setPrice(event.target.value)} />
        </label>
        <br />
        <br />
        <label>
          Note: <input type="text" value={note} onChange={(event) => setNote(event.target.value)} />
        </label>
        <br />
        <br />
        <Button
          type="submit"
          value="Submit"
          style={buttonStyle}
          size="sm"
          className={"btn-min btn-primary"}>
          Submit Form Updates
        </Button>
      </form>
    </div>
  );
};

export default ReduxForm;
