import React, { useState } from "react";
import { url } from "../../utils/request";
const List = (props) => {

  return (
    <td style={{width:"100%", display:"flex"}}>
      {props.bodyData.map((item, index) => {
        if (item.product_id === props.id) {
          return (
            <span style={{ width: "50px", height: "50px", border: "1px solid #ccc", marginLeft: "5px", borderRadius: "5px"}}>
              <img
                src={url + item.image_color}
                alt="product desc"
                style={{ width: "100%" }}
              />
            </span>
          );
        }
      })}
    </td>
  );
};

export default List;
