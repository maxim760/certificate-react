export const normalizeUser = ({
  email,
  phone,
  name,
  withDelivery,
  address,
}) => {
  return {
    Email: email,
    Phone: phone,
    FullName: name,
    UseDelivery: withDelivery ? '1' : '0',
    DeliveryAddress: withDelivery ? address : '',
  }
}
