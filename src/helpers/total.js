// Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

const total = async (body) => {
  try {
    const { histories, tax } = body;

    /*Developer is able to create reducer function without an initial value
      const reducer = (accum, currentval, idx) => {
        const result = accum + currentval.quantity
        return result;
      }

    const quantities = histories.reduce(reducer)
    console.log(quantities);
    */

    const quantities = await histories.reduce(
      (accumulator, currentvalue) => accumulator + currentvalue.quantity,
      0
    );

    const subtotal = await histories.reduce(
      (accumulator, currentvalue) =>
        accumulator + currentvalue.price * currentvalue.quantity,
      0
    );

    const result = {
      quantity_total: quantities,
      subtotal: subtotal,
      tax: tax,
      total: subtotal + tax,
    };

    return result;
  } catch (error) {
    return error;
  }
};

module.exports = total;
