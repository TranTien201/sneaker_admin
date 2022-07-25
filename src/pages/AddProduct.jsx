import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import { get, post } from "../service/apiServices";
import { margin } from "@mui/system";

const AddProduct = () => {
  const d = new Date();
  const [brands, setBrand] = useState([]);
  const [products, setProducts] = useState({
    name: "",
    purchase_price: 0,
    description: "",
    brand_id: 0,
    status: 1,
    staff_id: 1,
    price: 0,    
    created_at: d.toLocaleString(),
    updated_at: d.toLocaleString()
  });

  useEffect(() => {
    const fetchBrandApi = async () => {
      const result = await get("brand/data");
      console.log(result);
      setBrand(result);
    };
    fetchBrandApi();
  }, []);
  const status = [
    {
      id: 1,
      status: "Mới",
    },
    {
      id: 2,
      status: "Giảm giá",
    },
  ];
  const handelAddProduct = () => {
    const addProductApi = async () => {
      const result = await post("product/save", products);
      console.log(result);
    };
    addProductApi();
    setProducts({
      name: "",
      purchase_price: 0,
      description: "",
      brand_id: 0,
      status: 1,
      staff_id: 1,
      price: 0,    
      created_at: d.toLocaleString(),
      updated_at: d.toLocaleString()
    })
  };
  return (
    <div>
      <h2 className="page-header">Add Product</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      value={products.name}
                      onChange={(e) =>
                        setProducts({
                          ...products,
                          name: e.target.value,
                        })
                      }
                      style={{ width: "100%" }}
                      sx={{ input: { color: "black", background: "#fff" } }}
                      id="filled-basic"
                      label="Product Name"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Autocomplete
                      onChange={(event, newValue) => {
                        setProducts({
                          ...products,
                          brand_id: newValue === null ? 0 : newValue.id,
                        });
                      }}
                      id="controllable-states-demo"
                      getOptionLabel={(brands) => `${brands.name}`}
                      options={brands}
                      sx={{ width: "100%", background: "#fff" }}
                      isOptionEqualToValue={(option, value) =>
                        option.name === value.name
                      }
                      noOptionsText={"NO BRAND"}
                      renderOption={(props, brands) => (
                        <Box component="li" {...props} key={brands.id}>
                          {brands.name}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField {...params} label="Search Brands" />
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ marginTop: "10px" }}>
                  <Grid item xs={6}>
                    <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                      <InputLabel htmlFor="standard-adornment-amount">
                        Purchase Price
                      </InputLabel>
                      <Input
                        type="number"
                        value={products.purchase_price}
                        onChange={(e) =>
                          setProducts({
                            ...products,
                            purchase_price: e.target.value,
                          })
                        }
                        id="standard-adornment-amount"
                        startAdornment={
                          <InputAdornment position="start">$</InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                      <InputLabel htmlFor="standard-adornment-amount">
                        Price
                      </InputLabel>
                      <Input
                        type="number"
                        value={products.price}
                        onChange={(e) =>
                          setProducts({
                            ...products,
                            price: e.target.value,
                          })
                        }
                        id="standard-adornment-amount"
                        startAdornment={
                          <InputAdornment position="start">$</InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ marginTop: "10px" }}>
                  <Grid item xs={6}>
                    <TextareaAutosize
                      value={products.description}
                      onChange={(e) =>
                        setProducts({
                          ...products,
                          description: e.target.value,
                        })
                      }
                      aria-label="empty textarea"
                      placeholder="Descrpition"
                      style={{ width: "100%", height: "55px" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Autocomplete
                      onChange={(event, newValue) => {
                        setProducts({
                          ...products,
                          status: newValue === null ? 0 : newValue.id,
                        });
                      }}
                      // inputValue={inputValue}
                      // onInputChange={(event, newInputValue) => {
                      //   setInputValue(newInputValue);
                      // }}
                      id="controllable-states-demo"
                      getOptionLabel={(status) => `${status.status}`}
                      options={status}
                      sx={{ width: "100%", background: "#fff" }}
                      isOptionEqualToValue={(option, value) =>
                        option.status === value.status
                      }
                      noOptionsText={"NO STATUS"}
                      renderOption={(props, status) => (
                        <Box component="li" {...props} key={status.id}>
                          {status.status}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField {...params} label="Status" />
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ marginTop: "10px" }}>
                  <Grid item xs={6}>
                    <Button variant="outlined" onClick={handelAddProduct}>
                      Add Product
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddProduct;
