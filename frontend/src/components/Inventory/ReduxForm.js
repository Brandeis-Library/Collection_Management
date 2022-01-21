import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const ReduxForm = () => {
  const inventoryData = useSelector((state) => state.inventory.dataObjTotal);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setPrice(inventoryData.item_data.replacement_cost);
  }, [inventoryData]);

  const dispatch = useDispatch();
  return (
    <div>
      {/* {JSON.stringify(inventoryData)} */}
      {/* {console.log(inventoryData.item_data.replacement_cost)} */}
      <h5>Update Item Information</h5>
      <form>
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
