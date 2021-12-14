const replacementCost = (price) => {
  let newPrice = Number(price);
  if (!newPrice || newPrice < 150) {
    newPrice = 150;
  }

  return String(newPrice);
};

module.exports = replacementCost;
