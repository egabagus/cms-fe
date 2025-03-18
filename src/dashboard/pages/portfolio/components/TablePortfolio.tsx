import React, { useEffect, useState } from "react";
import ApiConnectionService from "../../../services/auth/ApiConnectionService";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, IconButton, Stack } from "@mui/material";
import DetailPortfolio from "./DetailPortfolio";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TablePortfolio() {
  const [row, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [rowCount, setRowCount] = useState(0);
  const [detailOpen, setDetailOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<any>(null);

  const handleOpen = (rowData: any) => {
    setSelectedRow(rowData);
    setDetailOpen(true);
  };

  const handleClose = () => {
    setDetailOpen(false);
  };

  useEffect(() => {
    dataPortfolio();
  }, [paginationModel]);

  const dataPortfolio = () => {
    setLoading(true);
    ApiConnectionService.get("/portfolio/data", {
      params: {
        page: paginationModel.page + 1,
        per_page: paginationModel.pageSize,
      },
    })
      .then((response) => {
        setRows(response.data.data);
        setRowCount(response.data.meta.total);
      })
      .catch((response) => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
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
    { field: "title", headerName: "Title", flex: 5 },
    { field: "link", headerName: "Link", flex: 4 },
    {
      field: "actions",
      headerName: "Aksi",
      flex: 2,
      renderCell: (params) => (
        <Stack direction={row} spacing={2}>
          <Button
            onClick={() => handleOpen(params.row)}
            startIcon={<VisibilityIcon />}
            size="small"
            color="info"
            variant="contained"
          >
            Detail
          </Button>
          <Button
            type="button"
            startIcon={<EditIcon />}
            size="small"
            color="warning"
            variant="contained"
          >
            Edit
          </Button>
          <Button
            type="button"
            startIcon={<DeleteIcon />}
            size="small"
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <>
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={row}
          loading={loading}
          rowCount={rowCount}
          pageSizeOptions={[10, 20, 50]}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
      </div>
      <DetailPortfolio data={selectedRow} detailClose={handleClose} />
    </>
  );
}
