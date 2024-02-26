import React, { useContext } from "react";
import Header from "./Header";
import { productArray } from "../products-data";
import { Button, Image, Typography, Space } from "antd";
import { CartItemContext } from "../App";

const { Title, Paragraph } = Typography;

const Dashboard = () => {
  const cartItemAddFunction = useContext(CartItemContext);

  return (
    <div className="grid grid-cols-4 mt-10 gap-7 w-[90%] ml-[70px]">
      {productArray?.map((item, index) => (
        <div key={index} className="flex flex-col w-[100%]  p-4  shadow-xl justify-between align-center rounded-lg">
          <Image
            className="flex justify-center ml-[32px]"
            width={200}
            height={200}
            src={`${item.image}`}
            preview={false}
          />

          <Paragraph className="text-center text-lg mt-4 h-[33%]">
            {item.title}
          </Paragraph>

          <Paragraph className="text-xl text-center h-fit !mb-1.5">
            &#8377;{item.price}
          </Paragraph>

          <Space>
            <Button
              className="bg-red-500 text-white font-semibold text-lg p-2 h-auto ml-[76px] w-fit "
              onClick={() => cartItemAddFunction(item)}
            >
              Add To Cart
            </Button>
          </Space>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
