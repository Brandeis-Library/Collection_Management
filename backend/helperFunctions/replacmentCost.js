// function checks to make sure the  replacement cost is @ least $100
// when an item is inventoried

const replacementCost = (price) => {
  let newPrice = Number(price);
  if (!newPrice || newPrice < 100) {
    newPrice = 100;
  }

  return String(newPrice);
};

module.exports = replacementCost;
