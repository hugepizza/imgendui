import axios from "axios";
import { error } from "console";
import { useRouter } from "next/navigation";

export const useAxios = () => {
  const router = useRouter();
  const instance = axios.create({
    baseURL: "",
  });
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
