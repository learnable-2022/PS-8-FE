import request from "./axios";

const fetcher = async (url) => {
  const res = await request.get(url);
  return res.data;
};

export default fetcher;
