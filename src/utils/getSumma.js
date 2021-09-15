export const getSumma = (delivery, _price, address) => {
  const price = Number(_price)

  if (!address || !Number(delivery.SHOPUSEDELIVERY)) return price

  return price > Number(delivery.SHOPFREEDELIVERYCOST)
    ? price
    : price + Number(delivery.SHOPDELIVERYCOST)
}
