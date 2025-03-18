import { createContext, useContext, useEffect, useState } from "react";
import ApiConnectionService from "../../services/auth/ApiConnectionService";

interface Tech {
  id: number;
  name: string;
  description: string;
}

interface TechContextType {
  tech: Tech[];
  rowCount: number;
  paginationModel: {
    page: number;
    pageSize: number;
  };
  setPaginationModel: (model: { page: number; pageSize: number }) => void;
  fetchTech: () => void;
}

const TechContext = createContext<TechContextType | undefined>(undefined);

export const TechProvider = ({ children }: { children: React.ReactNode }) => {
  const [tech, setTech] = useState<Tech[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const fetchTech = () => {
    ApiConnectionService.get("/technology/data", {
      params: {
        page: paginationModel.page + 1,
        per_page: paginationModel.pageSize,
      },
    })
      .then((response) => {
        setTech(response.data.data);
        setRowCount(response.data.meta.total);
      })
      .catch((error) => {
        console.error("Error fetching tech data:", error);
      });
  };

  useEffect(() => {
    fetchTech();
  }, [paginationModel]);

  return (
    <TechContext.Provider
      value={{ tech, rowCount, paginationModel, setPaginationModel, fetchTech }}
    >
      {children}
    </TechContext.Provider>
  );
};

// Custom hook untuk menggunakan context
export const useTechContext = () => {
  const context = useContext(TechContext);
  if (!context) {
    throw new Error("useTechContext must be used within a TechProvider");
  }
  return context;
};
