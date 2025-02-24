import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useLogout() {
  const navigate = useNavigate();
  const url = "http://egabagus-be.test/api/logout";

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        await axios.post(
          url,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      localStorage.removeItem("token");

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return handleLogout;
}
