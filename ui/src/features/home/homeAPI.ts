import axios from 'axios';

export const login = async (credentials: object) => {
  console.log(import.meta.env.VITE_API_BASE_URL);
  const apiResponse = await axios.post(import.meta.env.VITE_API_BASE_URL + '/login', credentials);
  console.log("api:"+JSON.stringify(apiResponse.data));
  return apiResponse.data;
}
