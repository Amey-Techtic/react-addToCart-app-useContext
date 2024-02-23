import { Typography, Button, Modal } from "antd";
import React, { useContext, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { CartItemLengthContext, CartItemHandleQuantity } from "../App";
const { Paragraph } = Typography;

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const cartItemArrayLength = useContext(CartItemLengthContext);
  const handleItemQuantity = useContext(CartItemHandleQuantity);
  const { handleQuantity } = handleItemQuantity;

  console.log("header: ", cartItemArrayLength);
  return (
    <>
      <div className="flex flex-row justify-between p-4 bg-zinc-500 text-white">
        <Button type="link" className="text-4xl mt-[-7px] text-white">
          Shopping App
        </Button>

        <Button
          type="link"
          className="text-2xl text-white h-auto"
          onClick={showModal}
        >
          Cart <FaShoppingCart className="inline-block ml-2 mr-1" />
          <Paragraph className="inline-block text-white text-lg">
            {cartItemArrayLength.length > 0 ? cartItemArrayLength.length : ""}
          </Paragraph>
        </Button>
      </div>

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
            onClick={() => handleCancel()}
          >
            Checkout
          </Button>,
        ]}
        onCancel={handleCancel}
      >
        {cartItemArrayLength?.length == 0 && (
          <Paragraph className="text-red-500 text-xl font-bold text-center">
            No products listed in your cart list yet..
          </Paragraph>
        )}

        {cartItemArrayLength?.map((items) => {
          console.log("items.quanity", items?.quantity);
          return (
            <div className="flex flex-row justify-between">
              <Paragraph className="font-medium">
                {items.title} &#8377;{items.price}
              </Paragraph>
              <div className="flex flex-row w-auto">
                <Paragraph
                  className="mr-2 text-2xl h-auto text-green-500 border-none -mt-1 cursor-pointer"
                  onClick={() => handleQuantity("+", items.id, items)}
                >
                  +
                </Paragraph>
                <Paragraph className="text-lg">{items?.quantity}</Paragraph>
                <Paragraph
                  className="text-2xl ml-2 h-auto text-red-500 -mt-1 cursor-pointer"
                  onClick={() => handleQuantity("-", items.id, items)}
                >
                  -
                </Paragraph>
              </div>
            </div>
          );
        })}
      </Modal>
    </>
  );
};

export default Header;
