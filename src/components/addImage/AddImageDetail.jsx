import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import DropFileInput from "../drop-file-input/DropFileInput";
import { useState, useEffect, memo, useCallback, useRef } from "react";
import { get, post, postFile } from "../../service/apiServices";
import { url } from "../../utils/request";
import Table from "../table/Table";
const AddImageDetail = (props) => {
  const { product } = props;
  const [images_color, setImageColors] = useState([]);
  const [images_details, setImageDetail] = useState([]);
  const customerTableHead = useRef(["", "Image Details", "Image Product"]);
  const renderBody = useCallback((item, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td style={{ display: "" }}>
          <span
            style={{
              width: "50px",
              height: "50px",
              border: "1px solid #ccc",
              marginLeft: "5px",
              borderRadius: "5px",
              display: "block",
            }}
          >
            <img
              src={url + item.image_detail}
              alt="product_image_color"
              style={{ width: "100%" }}
            />
          </span>
        </td>
        <td style={{ display: "" }}>
          <span
            style={{
              width: "50px",
              height: "50px",
              border: "1px solid #ccc",
              marginLeft: "5px",
              borderRadius: "5px",
              display: "block",
            }}
          >
            <img
              src={url + item.image_color}
              alt="product_image_color"
              style={{ width: "100%" }}
            />
          </span>
        </td>
      </tr>
    );
  }, []);
  useEffect(() => {
    const fetchBrandApi = async () => {
      const result = await get("product/color/data");
      console.log(result);
      setImageColors(result);
    };
    fetchBrandApi();
  }, []);
  useEffect(() => {
    const fetchBrandApi = async () => {
      const result = await get("product/colorDetail/data");
      console.log(result);
      setImageDetail(result);
    };
    fetchBrandApi();
  }, []);
  const [image_color, setImagePath] = useState("");
  console.log(image_color);
  const onImageSubmit = (files) => {
    let formData = new FormData();
    files.map((file) => {
      let image_detail = file.name;
      const data = { image_color, image_detail };
      console.log(file);
      formData.append("file", file);
      const addFileApi = async () => {
        const result = await postFile(formData);
        console.log(result);
      };
      addFileApi();
      // Fetch API
      console.log(data);
      const addProductImage = async () => {
        const result = await post("product/colorDetail/save", data);
        console.log(result);
      };
      addProductImage();
    });
  };
  return (
    <div>
      <h2 className="page-header">Add Image Detail</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <div className="box">
                      <DropFileInput
                        onImageSubmit={onImageSubmit}
                        name={"Add Image Detail"}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <Autocomplete
                      onChange={(event, newValue) => {
                        setImagePath(
                          newValue === null ? null : newValue.image_color
                        );
                      }}
                      id="image_color"
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
                          component="div"
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
                        <TextField {...params} label="Image Name" />
                      )}
                    />
                  </Grid>
                </Grid>
              </Box>
            </div>
          </div>
          <div className="card">
            <div className="card__body">
              <Table
                limit="10"
                headData={customerTableHead.current}
                bodyData={images_details}
                renderBody={renderBody}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(AddImageDetail);
