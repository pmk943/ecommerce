export const convertfromBpsToDollars = (priceinBPS) => {
    const priceInDollars = window.zilPay.utils.units.fromQa(
      priceinBPS,
      window.zilPay.utils.units.Units.Zil
    );
    return priceInDollars;
  };