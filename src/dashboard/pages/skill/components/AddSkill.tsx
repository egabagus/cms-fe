import React, { useState } from "react";
import { useSkillContext } from "../SkillContext";
import {
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CustomModal from "../../../components/CustomModal";
import ApiConnectionService from "../../../services/ApiConnectionService";

enum SkillLevel {
  Beginner = "Beginner",
  Competent = "Competent",
  Proficient = "Proficient",
  Expert = "Expert",
}

export default function AddSkill() {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    level: "" as SkillLevel | "",
  });
  const { fetchSkill } = useSkillContext();

  const handleChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    ApiConnectionService.post("skill/store", formData)
      .then(() => {
        fetchSkill();
      })
      .catch((response) => {
        console.log(response.response.data);
      });
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpenModal}>
        Create New
      </Button>

      <CustomModal
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
        modalHeading="Create New Skill"
        width={500}
      >
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth>
            <FormLabel htmlFor="name">Name</FormLabel>
            <TextField
              id="name"
              type="text"
              name="name"
              variant="standard"
              placeholder="Insert Name"
              required
              autoFocus
              onChange={handleChange}
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginTop: 4 }}>
            <FormLabel htmlFor="description">Desctiption</FormLabel>
            <TextField
              id="description"
              type="text"
              name="description"
              variant="standard"
              placeholder="Insert Description"
              required
              autoFocus
              onChange={handleChange}
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginTop: 4 }}>
            <FormLabel>Status</FormLabel>
            <Select
              name="level"
              value={formData.level}
              label="Status"
              onChange={handleChange}
            >
              {Object.values(SkillLevel).map((level) => (
                <MenuItem key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" sx={{ marginTop: 4 }}>
            Submit
          </Button>
        </form>
      </CustomModal>
    </>
  );
}
