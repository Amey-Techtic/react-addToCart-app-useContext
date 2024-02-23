import React, { createContext, useState } from "react";
import Dashboard from "../src/components/Dashboard";

import { notification } from "antd";

const CartItemContext = createContext();
const CartItemLengthContext = createContext();
const CartItemHandleQuantity = createContext();

function App() {
  const [cartArray, setCartArray] = useState([]);
  console.log("cartArray :>> ", cartArray);
  const [api, contextHolder] = notification.useNotification();
  // const [quanity, setQuantity] = useState(1);

  const openNotification = (placement, cartMessage) => {
    api.info({
      message: cartMessage,
      placement,
    });
  };

  const addToCart = (item) => {
    console.log("added cart item: ", item);
    if (!cartArray.includes(item)) {
      //to check if an item is added twice
      setCartArray([...cartArray, item]);
      let addMessage = ` ${item.title} was added to your cart successfully!`;
      openNotification("bottomRight", addMessage);
      console.log("Item added successfully");
    } else {
      let errorMessage = `${item.title} already exists in your cart!`;
      openNotification("bottomRight", errorMessage);
      console.log("Item already exists");
    }
  };

  // const handleQuantity = (action, id, i) => {
  //   console.log("i :>> ", i);
  //   // return false;
  //   console.log("id: ", id);
  //   if (action == "+") {
  //     // setQuantity(quanity + 1);
  //     let cartArrayTemp = cartArray;
  //     cartArray.map((singleProduct) => {
  //       if (singleProduct?.id == id) {
  //         singleProduct.quantity = singleProduct.quantity + 1;
  //       }
  //     });
  //     setCartArray(cartArrayTemp);
  //   }
  //   if (action == "-") {
  //     let cartArrayTemp = cartArray;
  //     cartArray.map((singleProduct) => {
  //       if (singleProduct?.id == id) {
  //         singleProduct.quantity = singleProduct.quantity - 1;
  //       }
  //     });
  //     console.log("cartArrayTemp :>> ", cartArrayTemp);
  //     setCartArray(cartArrayTemp);
  //   }
  //   if (action == "-") {
  //   }
  // };
  const handleQuantity = (action, id, i) => {
    console.log("i :>> ", i);
    // return false;
    console.log("id: ", id);
    if (action === "+") {
      setCartArray((prevCartArray) => {
        const updatedCartArray = prevCartArray.map((singleProduct) => {
          if (singleProduct?.id === id) {
            return { ...singleProduct, quantity: singleProduct.quantity + 1 };
          }
          return singleProduct;
        });
        return updatedCartArray;
      });
    }
    if (action === "-") {
      setCartArray((prevCartArray) => {
        const updatedCartArray = prevCartArray.map((singleProduct) => {
          if (singleProduct?.id === id && singleProduct?.quantity > 1) {
            return { ...singleProduct, quantity: singleProduct.quantity - 1 };
          }
          return singleProduct;
        });
        return updatedCartArray;
      });
    }
  };

  console.log("added item state: ", cartArray);
  return (
    <>
      {contextHolder}
      <CartItemContext.Provider value={addToCart}>
        <CartItemLengthContext.Provider value={cartArray}>
          <CartItemHandleQuantity.Provider value={{ handleQuantity }}>
            <Dashboard />
          </CartItemHandleQuantity.Provider>
        </CartItemLengthContext.Provider>
      </CartItemContext.Provider>
    </>
  );
}

export default App;

export { CartItemContext, CartItemLengthContext, CartItemHandleQuantity };
