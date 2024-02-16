import { cart } from "Type/Type";

export const orderValue = (order : cart[]) => {
    const value = order.reduce((total, item) => {
        return total + item.product.price*item.quantity;
    }, 0);
    return value;
};