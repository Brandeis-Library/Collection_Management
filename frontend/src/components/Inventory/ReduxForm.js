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
  const [note, setNote] = useState("");
  const [provenance, setProvenance] = useState("");
  const [condition, setCondition] = useState("");

  useEffect(() => {
    setNote(inventoryData.item_data.internal_note_3);
    setPrice(inventoryData.item_data.replacement_cost);
    setProvenance(inventoryData.item_data.provenance.value);
    setCondition(inventoryData.item_data.physical_condition.value);
  }, [inventoryData]);

  const onSubmit = (event) => {
    event.preventDefault();
    inventoryData.item_data.replacement_cost = price;
    inventoryData.item_data.internal_note_3 = note;
    inventoryData.item_data.provenance.value = provenance;
    inventoryData.item_data.physical_condition.value = condition;
    dispatch(updateItemFormQuery(inventoryData));
  };

  const dispatch = useDispatch();
  return (
    <div>
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
        <label>
          Provenance:{" "}
          <select
            name="provenance"
            value={provenance}
            onChange={(event) => setProvenance(event.target.value)}
            type="text">
            <option value="">None</option>
            <option value="JCR">Jewish Cultural Reconstruction</option>
          </select>
        </label>
        <br />
        <br />
        <label>
          Condition:{" "}
          <select
            name="condition"
            value={condition}
            onChange={(event) => setCondition(event.target.value)}
            type="text">
            <option value="">None</option>
            <option value="BRITTLE">Brittle</option>
            <option value="DAMAGED">Damaged</option>
            <option value="DETERIORATING">Deteriorating</option>
            <option value="FRAGILE">Fragile</option>
          </select>
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
