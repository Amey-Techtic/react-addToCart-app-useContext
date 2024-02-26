
import { Image, Typography} from "antd";

import React from "react";
const {Paragraph} = Typography;
const CartProfile = ({ itemArray }) => {
  console.log("itemArray", itemArray);
  return (
    <>
      <Paragraph className="text-2xl text-zinc-500 font-bold mt-4 text-center">Checkout Items</Paragraph>
        { itemArray?.filter((items) => items.quantitySelected  > 0).map(items => items).length>0 ? 
        
        itemArray?.filter((items) => items.quantitySelected  > 0)
          .map((items) => (
            <div className="flex flex-row justify-around w-[94%] p-4 mt-2 mx-auto rounded-lg shadow-xl">
            <Image src={items.image} preview={false} width={200}
            height={200}/>
            <div className="my-auto w-[60%]">
            <Paragraph className="text-lg font-semibold">{items.title}</Paragraph>
            <Paragraph className="text-lg font-bold text-gray-500">Price: &#8377;{items.price}</Paragraph>
            </div>
            <Paragraph className="mt-20 text-2xl font-semibold">Quantity: {items.quantitySelected}</Paragraph>
        </div>
        ))
        :
        <Paragraph className="text-2xl text-red-500 font-semibold text-center mt-[20vh]"> No checkout items found! </Paragraph>
    
    }
        
   
    </>
  );
};

export default CartProfile;
