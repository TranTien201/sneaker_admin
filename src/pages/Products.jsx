import React from "react";

import Table from "../components/table/Table";
import List from "../components/list_img/List";
import customerList from "../assets/JsonData/customers-list.json";
import { get } from "../service/apiServices";
import { url } from "../utils/request";
import { useState, useEffect, useRef } from "react";

const Products = () => {
  const [products, setProduct] = useState([]);
  const [images_color, setImageColors] = useState([]);
  const [brands, setBrands] = useState([])
  // list product
  useEffect(() => {
    const fetchProductApi = async () => {
      const result = await get("product/data");
      setProduct(result);
    };
    fetchProductApi();
  }, []);
  // list image product
  useEffect(() => {
    const fetchImageColorApi = async () => {
      const result = await get("product/color/data");
      setImageColors(result);
    };
    fetchImageColorApi();
  }, []);
  useEffect(() => {
    const fetchBrandApi = async () => {
      const result = await get("brand/data");
      setBrands(result);
    };
    fetchBrandApi();
  }, []);
  const customerTableHead = useRef([
    "",
    "name",
    "image",
    "brand",
    "Staff Name",
    "Create At",
    "Update At",
    "Purchase Price",
    "Price",
    "Status",
    "Total order",
    "",
    "",
  ]);
  const renderBody = (item, index) => {
    console.log(brands);
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{item.name}</td>
        <List id={item.id} bodyData={images_color} />
        <td>{brands.find(f => f.id === item.brand_id).name}</td>
        <td>{item.staff_id}</td>
        <td>{item.created_at}</td>
        <td>{item.updated_at}</td>
        <td>{item.purchase_price}</td>
        <td>{item.price}</td>
        <td>{item.status}</td>
        <td>{item.total_orders}</td>
        <td style={{ cursor: "pointer" }}>
          <i class="bx bx-pencil"></i>
        </td>
        <td style={{ cursor: "pointer" }}>
          <i class="bx bx-trash-alt"></i>
        </td>
      </tr>
    );
  };
  return (
    <div>
      <h2 className="page-header">Products</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit="10"
                headData={customerTableHead.current}
                bodyData={products}
                renderBody={(item, index) => renderBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
