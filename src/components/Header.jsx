import { Typography, Button, Modal } from "antd";
import React, { useContext, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { CartItemLengthContext, CartItemHandleQuantity } from "../App";
import CartProfile from "./CartProfile";
import Dashboard from "./Dashboard";
const { Paragraph } = Typography;

const Header = () => {
  const cartItemArrayLength = useContext(CartItemLengthContext);
  const handleItemQuantity = useContext(CartItemHandleQuantity);

  const { handleQuantity, totalPrice, openNotification } = handleItemQuantity;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [active, setActive] = useState(1);
  const [isCheckOut, setIsCheckOut] = useState(false);

  const pages = {
    1: <Dashboard />,
    2: <CartProfile itemArray={isCheckOut && cartItemArrayLength} />,
  };

 

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    // setCheckOutArray([]);
    setIsModalOpen(false);
  };

  const handleCheckOut = () => {
    // setCheckOutArray((prevArray)=>[...prevArray, cartItemArrayLength]);
    openNotification("bottomRight", 'Items are checkedout please check in Cart Items!');
    setIsCheckOut(true);
    setIsModalOpen(false);
  };

  // console.log("header: ", cartItemArrayLength);
  return (
    <>
      <div className="flex flex-row justify-between p-4 bg-zinc-500 text-white">
        <Button
          type="link"
          className="text-4xl mt-[-7px] text-white"
          onClick={() => {
            setActive(1);
          }}
        >
          Shopping App
        </Button>

        <div>
          <Button
            type="link"
            className="text-2xl text-white h-auto"
            onClick={() => {
              setActive(2);
            }}
          >
            Cart Items
          </Button>
          <Button
            type="link"
            className="text-2xl text-white h-auto"
            onClick={() => {
              showModal();
            }}
          >
            Cart <FaShoppingCart className="inline-block ml-1 mr-1" />
            <Paragraph className="inline-block text-white text-lg">
              {cartItemArrayLength
                ?.filter((items) => items.quantitySelected > 0)
                ?.map((items) => {
                  return items;
                }).length > 0
                ? cartItemArrayLength
                    ?.filter((items) => items.quantitySelected > 0)
                    ?.map((items) => {
                      return items;
                    }).length
                : ""}
            </Paragraph>
          </Button>
        </div>

        {/* <Dashboard /> */}
      </div>

      {pages[active]}

      <Modal
        title={
          <Paragraph className="text-2xl font-bold text-zinc-500">
            Your Cart
          </Paragraph>
        }
        visible={isModalOpen}
        footer={[
          <Button key="back" size="large" onClick={() => handleCancel()}>
            Cancel
          </Button>,

          <Button
            className="bg-red-500"
            key="submit"
            type="primary"
            size="large"
            onClick={() => handleCheckOut()}
          >
            Checkout
          </Button>,
        ]}
        onCancel={handleCancel}
      >
        {cartItemArrayLength
          ?.filter((items) => items.quantitySelected  > 0)
          ?.map((items) => {
            return items;
          }).length === 0 && (
          <Paragraph className="text-center text-xl font-semibold text-red-500">
            No items added yet!
          </Paragraph>
        )}

        {cartItemArrayLength
          ?.filter((items) => items.quantitySelected  > 0)
          .map((items, index) => (
            <div key={index} className="flex flex-row justify-between">
              <Paragraph className="font-medium">
                {items.title} &#8377;{items.price}
              </Paragraph>
              <div className="flex flex-row w-auto">
                <Paragraph
                  className="mr-2 text-2xl h-auto text-green-500 border-none -mt-1 cursor-pointer"
                  onClick={() => {
                    handleQuantity("+", items.id, items, items?.quantitySelected )
                  }}
                >
                  +
                </Paragraph>
                <Paragraph className="text-lg">{items?.quantitySelected}</Paragraph>
                <Paragraph
                  className="text-2xl ml-2 h-auto text-red-500 -mt-1 cursor-pointer"
                  onClick={() => handleQuantity("-", items.id, items)}
                >
                  -
                </Paragraph>
              </div>
            </div>
          ))}
        <Paragraph>Total &#8377;{totalPrice}</Paragraph>
      </Modal>

      {/* {IscheckOut && <CartProfile itemArray ={checkOutArray} />} */}
    </>
  );
};

export default Header;
