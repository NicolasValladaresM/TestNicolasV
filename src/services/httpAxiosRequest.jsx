import axios from "axios";
import { getUserStorage } from "./auth";

const http = axios.create({
  baseURL: "https://api.qa.vitawallet.io/api",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "app-name": "ANGIE",
  },
});

http.interceptors.request.use(
  async (config) => {
    const { headers } = getUserStorage();   
    if (headers) {
        config.headers["access-token"] = headers.access_token;
        config.headers.uid = headers.uid;
        config.headers.expiry = headers.expiry;
        config.headers.client = headers.client;
        console.log("Headers añadidos:", config.headers); 
      } else {
        console.log("No se encontraron headers de usuario");
      }
      return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );

export default http;

export const signIn = async (email, password) => {
  const parrams = new URLSearchParams();
  parrams.append("email", email);
  parrams.append("password", password);
  parrams.append("dev_mode", "true");

  try {
    const response = await http.post("/auth/sign_in", parrams);
    return {
      data: response.data,
      headers: {
        access_token: response.headers["access-token"],
        uid: response.headers.uid,
        expiry: response.headers.expiry,
        client: response.headers.client,
      },
    };
  } catch (error) {
    console.log("Error al inicio de sesión", error);
  }
};


