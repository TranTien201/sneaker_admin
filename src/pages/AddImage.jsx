import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState, useEffect, useRef , useCallback } from "react";
import DropFileInput from "../components/drop-file-input/DropFileInput";
import AddImageDetail from "../components/addImage/AddImageDetail";
import { get, post, postFile } from "../service/apiServices";
import Table from "../components/table/Table";
import { url } from "../utils/request";
const AddImage = () => {
  const [product, setProduct] = useState([]);
  const [images_color, setImageColors] = useState([]);
  const [product_id, setProductID] = useState("");
  const [file, setFiles] = useState();

  const customerTableHead = useRef(["", "Product Name", "Image"]);
  useEffect(() => {
    const fetchProductApi = async () => {
      const result = await get("product/data");
      setProduct(result);
    };
    fetchProductApi();
  }, []);
  useEffect(() => {
    const fetchImageColorApi = async () => {
      const result = await get("product/color/data");
      setImageColors(result);
    };
    fetchImageColorApi();
  }, []);
  const renderBody = useCallback((item, index, product) => {
    const name = product.find((f) => f.id === item.product_id).name
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{name}</td>
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
      </tr>
    );
  }, []);

  const onImageSubmit = (files) => {
    let formData = new FormData();
    setFiles(files);
    files.map((file) => {
      let image_color = file.name;
      const data = { product_id, image_color };
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
        const result = await post("product/color/save", data);
        console.log(result);
      };
      addProductImage();
    });
  };
  return (
    <>
      <div>
        <h2 className="page-header">Add Image</h2>
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
                          name={"Add Image Product"}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <Autocomplete
                        onChange={(event, newValue) => {
                          setProductID(newValue === null ? null : newValue.id);
                        }}
                        id="controllable-states-demo"
                        getOptionLabel={(product) => `${product.name}`}
                        options={product}
                        sx={{ width: "100%", background: "#fff" }}
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.AddImageDetail
                        }
                        noOptionsText={"NO BRAND"}
                        renderOption={(props, product) => (
                          <Box component="li" {...props} key={product.id}>
                            {product.name}
                          </Box>
                        )}
                        renderInput={(params) => (
                          <TextField {...params} label="Products" />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card__body">
          <Table
            limit="10"
            headData={customerTableHead.current}
            bodyData={images_color}
            renderBody={renderBody}
            data={product}
          />
        </div>
      </div>
      <AddImageDetail product={product} file={file} />
    </>
  );
};
export default AddImage;
