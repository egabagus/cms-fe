import { useNavigate } from "react-router-dom";
import ApiConnectionService from "./ApiConnectionService";

export default function useLogout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = sessionStorage.getItem("authToken");

    if (token) {
      ApiConnectionService.post("/logout", {})
        .then((response) => {
          console.log(response.data.message);
          sessionStorage.removeItem("authToken");
          navigate("/login");
        })
        .catch((response) => {
          console.log(response);
        });
    }
  };

  return handleLogout;
}
