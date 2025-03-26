import { useContext, useEffect, useState } from "react";
import ApiConnectionService from "../../../services/ApiConnectionService";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useTechContext } from "../TechContext";
import EditTechnology from "./EditTechnology";
import { Tech } from "../../../../types/tech.types";

export default function ListTechnology() {
  const { tech, rowCount, paginationModel, setPaginationModel, fetchTech } =
    useTechContext();

  const handleDelete = (id: number) => {
    ApiConnectionService.post("/technology/delete", { id }).then(() => {
      fetchTech();
    });
  };

  const [openEdit, setOpenEdit] = useState(false);
  const [selectedData, setSelectedData] = useState<Tech | null>(null);

  const handleEdit = (data: {
    id: number;
    name: string;
    description: string;
  }) => {
    setSelectedData(data);
    setOpenEdit(true);
  };

  const columns: GridColDef[] = [
    {
      field: "no",
      headerName: "No",
      flex: 1,
      renderCell: (params) =>
        params.api.getRowIndexRelativeToVisibleRows(params.id) +
        1 +
        paginationModel.page * paginationModel.pageSize,
    },
    { field: "name", headerName: "Name", flex: 2 },
    { field: "description", headerName: "Description", flex: 6 },
    {
      field: "action",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => handleEdit(params.row)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(params.row.id)}
            size="small"
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={tech}
        // loading={loading}
        rowCount={rowCount}
        pageSizeOptions={[10, 20, 50]}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
      <EditTechnology
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        data={selectedData}
      />
    </div>
  );
}
