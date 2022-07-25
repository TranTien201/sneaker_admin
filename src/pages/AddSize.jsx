import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState, useEffect, useRef, useCallback } from "react";
import { get, post } from "../service/apiServices";
import { url } from "../utils/request";
import { Button } from "@mui/material";
import Table from "../components/table/Table";
const AddSize = () => {
  const [product, setProduct] = useState([]);
  const [images_color, setImageColors] = useState([]);
  const [sizes, setSizes] = useState([])
  const [load, setLoad] = useState("");
  const customerTableHead = useRef(["", "Image Product", "Size", "Quantity", "Sell"]);
  // list product
  useEffect(() => {
    const fetchProductApi = async () => {
      const result = await get("product/data");
      setProduct(result);
    };
    fetchProductApi();
  }, []);
  console.log(product);
  // list image product
  useEffect(() => {
    const fetchImageColorApi = async () => {
      const result = await get("product/color/data");
      setImageColors(result);
    };
    fetchImageColorApi();
  }, []);
  // list size
  useEffect(() => {
    const fetchSizeApi = async () => {
      const result = await get("product/size/data");
      setSizes(result);
    };
    fetchSizeApi();
  }, [load]);
  console.log(sizes);
  const renderBody = useCallback((item, index, product) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td style={{ display: "flex" }}>
          <span
            style={{
              width: "50px",
              height: "50px",
              border: "1px solid #ccc",
              marginLeft: "5px",
              borderRadius: "5px",
            }}
          >
            <img
              src={url + item.image_color}
              alt="product_image_color"
              style={{ width: "100%" }}
            />
          </span>
        </td>
        <td>{item.size_id}</td>
        <td>{item.quantity}</td>
        <td>{item.sell}</td>
      </tr>
    );
  }, []);
  const [size, setSize] = useState({
    image_color: "",
    size_id: 0,
    quantity: 0,
    sell: 0,
  });
  const handelAddSize = () => {
    const addSizeAPI = async () => {
      const result = await post("product/size/save", size);
      setLoad((prev) => [...prev, size]);
      console.log(result);
    };
    addSizeAPI();
  }
  console.log(size);
  return (
    <>
      <div>
        <h2 className="page-header">Add Size Product</h2>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card__body">
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Autocomplete
                        onChange={(event, newValue) => {
                          setSize({
                            ...size,
                            image_color: newValue === null ? null : newValue.image_color
                          })
                        }}
                        id="controllable-states-demo"
                        getOptionLabel={(images_color) =>
                          product.find((f) => f.id === images_color.product_id)
                            .name
                        }
                        options={images_color}
                        sx={{ width: "100%", background: "#fff" }}
                        isOptionEqualToValue={(option, value) =>
                          option.image_color === value.image_color
                        }
                        noOptionsText={"NO IMAGE"}
                        renderOption={(props, images_color) => (
                          <Box
                            component="li"
                            {...props}
                            key={images_color.image_color}
                          >
                            <img
                              style={{
                                border: "1px solid #ccc",
                                height: "50px",
                                width: "50px",
                                marginRight: "10px",
                              }}
                              src={url + images_color.image_color}
                              alt=""
                            />
                            <li>
                              {
                                product.find(
                                  (f) => f.id === images_color.product_id
                                ).name
                              }
                            </li>
                          </Box>
                        )}
                        renderInput={(params) => (
                          <TextField {...params} label="Image Color" />
                        )}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        value={size.size_id}
                        onChange={(e) =>
                          setSize({
                            ...size,
                            size_id: e.target.value,
                          })
                        }
                        style={{ width: "100%" }}
                        sx={{ input: { color: "black", background: "#fff" } }}
                        id="filled-basic"
                        label="Size Name"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        value={size.quantity}
                        onChange={(e) =>
                          setSize({
                            ...size,
                            quantity: e.target.value,
                          })
                        }
                        style={{ width: "100%" }}
                        sx={{ input: { color: "black", background: "#fff" } }}
                        id="filled-basic"
                        label="Quantity"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ marginTop: "10px" }}>
                  <Grid item xs={6}>
                    <Button variant="outlined" onClick={handelAddSize}>
                      Add Size
                    </Button>
                  </Grid>
                </Grid>
                </Box>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
            <div className="card__body">
              <Table
                limit="10"
                headData={customerTableHead.current}
                bodyData={sizes}
                renderBody={renderBody}
                data={product}
              />
            </div>
          </div>
      </div>
    </>
  );
};
export default AddSize;
/*
Trang chủ 
  Hiển thị sản phẩm ở trang chủ (sản phẩm mới nhất, giảm giá, bán chạy) (Hiếu)
  Hiển thị slide (Hiếu)
  Hiển thị contact của website (Hiếu)
  Hiển thị thông tin cá nhân (Hiếu)
  Hiển thị đơn hàng đã mua(Thông tin mua hàng, tình trạng đơn hàng) (Hiếu)
  Hiển thị mã quà tặng cá nhân (Hiếu)
  Thêm, sửa, xóa sản phẩm trong giỏ hàng (Hiếu)
  Hiển thị sản phẩm ở trang sản phẩm (Tiến)
  Lọc sản phẩm ( theo tiền, thương hiệu, size) (Tiến)
  Phân trang sản phẩm (Tiến)
  Tìm kiếm sản phẩm (Tiến)
  Xử lý đăng nhập phân quyền(Người dùng, nhân viên, quản lý) (Hiếu)
  Đánh giá, bình luận sản phẩm (Tiến)
  Hiển thị sản phẩm ở trang thanh toán (Hiếu)
  Hiếu 9 Tiến 5
Trang admin
  Hiển thị thông tin khách hàng (Tiến)
  Hiển thị sản phẩm (Tiến)
  Lọc sản phẩm (Tiến)
  Hiển thị size của sản phẩm (Tiến)
  Hiển thị ảnh sản phẩm (Tiến)
  Hiển thị ảnh sản phẩm chi tiết (Tiến)
  Hiển thị giảm giá (Tiến)
  Hiển thị đơn hàng (Tiến)
  Lọc đơn hàng (Tiến)
  Hiển thị thông tin nhân viên (Hiếu)
  Hiển thị tổng đơn hàng, số tiền bán, số tiền lãi (Hiếu)
  Hiển thị nhãn hàng (Hiếu)
*/
