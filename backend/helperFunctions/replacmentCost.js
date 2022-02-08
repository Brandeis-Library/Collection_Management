const replacementCost = (price) => {
  let newPrice = Number(price);
  if (!newPrice || newPrice < 100) {
    newPrice = 100;
  }

  return String(newPrice);
};

module.exports = replacementCost;
