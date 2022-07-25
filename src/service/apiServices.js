import * as request from "../utils/request";

export const get = async (path) => {
  try {
    const res = await request.get(path);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const post = async (path, value) => {
  try {
    const res = await request
      .post(path, value)
      return res;
  }
  catch(error) {
    console.log(error);
  }
}

export const postFile = async (formData) => {
  const res = await fetch("http://localhost:8080/File/upload", {
    method: "POST",
    body: formData,
  })
  return res
}