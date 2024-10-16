import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Bounce } from "react-toastify";

const useApiErrorHandler = () => {
  const navigate = useNavigate();

  const handleApiResponse = async (response) => {
    if (response.status === 401) {
      toast.error("Sesión expirada. Redirigiendo hacia login...", {
        transition: Bounce,
      });
      navigate("/login");
      throw new Error("Error 401: Sesión expirada");
    }
    return response;
  };

  return { handleApiResponse };
};

export default useApiErrorHandler;
