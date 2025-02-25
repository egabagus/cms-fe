import { useEffect, useState } from "react";
import ApiConnectionService from "../../../services/auth/ApiConnectionService";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export default function TablePortfolio() {
  const [row, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [rowCount, setRowCount] = useState(0);

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
        console.log(response);
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
  ];

  return (
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
  );
}
