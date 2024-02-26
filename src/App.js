import React, { createContext, useState } from "react";
import Dashboard from "../src/components/Dashboard";

import { notification } from "antd";
import Header from "./components/Header";

const CartItemContext = createContext();
const CartItemLengthContext = createContext();
const CartItemHandleQuantity = createContext();

function App() {
  const [cartArray, setCartArray] = useState([]);
  const [cartArrayLength, setCartArrayLength] = useState(cartArray);
  const [totalPrice, setTotalPrice] = useState(0);
  // console.log("cartArray :>> ", cartArray);
  const [api, contextHolder] = notification.useNotification();
  // const [quanity, setQuantity] = useState(1);

  const openNotification = (placement, cartMessage) => {
    api.success({
      message: cartMessage,
      placement,
    
    });
  };

  const addToCart = (item) => {
    console.log("added cart item: ", item);
    if (!cartArray.includes(item)) {
      //to check if an item is added twice
      setCartArray([...cartArray, {...item, quantitySelected: 1}]);
      console.log("ite.price", item.price);
      setTotalPrice((prevPrice) => prevPrice + item.price);
      console.log("total price", totalPrice);

      let addMessage = ` ${item.title} was added to your cart successfully!`;
      openNotification("bottomRight", addMessage);
      console.log("Item added successfully");
    } else {
      let errorMessage = `${item.title} already exists in your cart!`;

      openNotification("bottomRight", errorMessage);
      console.log("Item already exists");
    }
  };
  // console.log("price: ", totalPrice);
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

  const handleQuantity = (action, id, i, totalQuantity) => {

    console.log("action, id ", action, id);
    // return false;
    // console.log("id: ", id);
    setCartArray((prevCartArray) => {
      const updatedCartArray = prevCartArray.map((singleProduct) => {
        if (singleProduct?.id === id) {
          if (action === "+"&& singleProduct?.quantitySelected < singleProduct?.quantity) {
            // console.log('singleProduct.quantity =!:>> ', singleProduct.quantity);
            const tempQuantity = singleProduct.quantitySelected + 1;
            // console.log("tempQuantity :>> ", tempQuantity);
            // console.log("singleProduct.price :>> ", singleProduct.price);
            // console.log("singleProduct.quantity :>> ", singleProduct.quantity);
            const tempPrice = totalPrice + singleProduct.price
            setTotalPrice(tempPrice);
            // console.log("totalPrice in :>> ", totalPrice);
            return { ...singleProduct, quantitySelected: tempQuantity };
          }
          if (action === "-") {
            // console.log("{{{{{{{{{{{{{{{{{");
            // if (singleProduct.quantitySelected  <= 0) {
            //   cartArray.splice(cartArray.indexOf(singleProduct), 1);
            // }
            const tempQuantity = singleProduct.quantitySelected - 1;
            let tempPrice = totalPrice - singleProduct.price
            setTotalPrice((tempPrice));
            return { ...singleProduct, quantitySelected: tempQuantity };
          }
        }
        return singleProduct;
      });

      return updatedCartArray;
    });
  };
  console.log("totalPrice out :>> ", totalPrice);
  console.log("added item state: ", cartArray);
  return (
    <>
      {contextHolder}
      <CartItemContext.Provider value={addToCart}>
        <CartItemLengthContext.Provider value={cartArray}>
          <CartItemHandleQuantity.Provider
            value={{ handleQuantity, totalPrice, openNotification }}
          >
            <Header />
          </CartItemHandleQuantity.Provider>
        </CartItemLengthContext.Provider>
      </CartItemContext.Provider>
    </>
  );
}

export default App;

export { CartItemContext, CartItemLengthContext, CartItemHandleQuantity };
