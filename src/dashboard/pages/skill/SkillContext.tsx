import { createContext, useContext, useEffect, useState } from "react";
import { Skill } from "../../../types/skill.types";
import ApiConnectionService from "../../services/ApiConnectionService";

interface SkillContextType {
  skill: Skill[];
  rowCount: number;
  paginationModel: {
    page: number;
    pageSize: number;
  };
  setPaginationModel: (model: { page: number; pageSize: number }) => void;
  fetchSkill: () => void;
}

const SkillContext = createContext<SkillContextType | undefined>(undefined);

export const SkillProvider = ({ children }: { children: React.ReactNode }) => {
  const [skill, setSkill] = useState<Skill[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const fetchSkill = () => {
    ApiConnectionService.get("skill/data", {
      params: {
        page: paginationModel.page + 1,
        per_page: paginationModel.pageSize,
      },
    }).then((response) => {
      setSkill(response.data.data);
      setRowCount(response.data.data.total);
    });
  };

  useEffect(() => {
    fetchSkill();
  }, [paginationModel]);

  return (
    <SkillContext.Provider
      value={{
        skill,
        rowCount,
        paginationModel,
        setPaginationModel,
        fetchSkill,
      }}
    >
      {children}
    </SkillContext.Provider>
  );
};

// Custom hook untuk menggunakan context
export const useSkillContext = () => {
  const context = useContext(SkillContext);
  if (!context) {
    throw new Error("useTechContext must be used within a TechProvider");
  }
  return context;
};
