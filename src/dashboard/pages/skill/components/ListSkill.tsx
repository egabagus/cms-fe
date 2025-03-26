import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useSkillContext } from "../SkillContext";

export default function ListSkill() {
  const { skill, rowCount, paginationModel, setPaginationModel } =
    useSkillContext();

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
    { field: "level", headerName: "Level", flex: 4 },
  ];

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={skill}
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
