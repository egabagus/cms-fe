import { useContext, useEffect, useState } from "react";
import ApiConnectionService from "../../../services/auth/ApiConnectionService";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { useTechContext } from "../TechContext";

export default function ListTechnology() {
  const { tech, rowCount, paginationModel, setPaginationModel, fetchTech } =
    useTechContext();

  const handleDelete = (id: number) => {
    ApiConnectionService.post("/technology/delete", { id }).then(() => {
      fetchTech();
    });
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
        <IconButton
          aria-label="delete"
          onClick={() => handleDelete(params.row.id)}
        >
          <DeleteIcon />
        </IconButton>
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
    </div>
  );
}
