// utils/orderUtils.js
export const generateOrderNumber = () => {
  return `ORD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
};
