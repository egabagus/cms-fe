import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  useGridApiRef,
} from "@mui/x-data-grid";
import { useSkillContext } from "../SkillContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import ApiConnectionService from "../../../services/ApiConnectionService";

export default function ListSkill() {
  const { fetchSkill } = useSkillContext();
  const { skill, rowCount, paginationModel, setPaginationModel } =
    useSkillContext();
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const mySaveOnServerFunction = (updatedRow) => {
    // const updatedRow = { ...newRow, isNew: false };
    console.log(updatedRow);
    ApiConnectionService.post(`skill/${updatedRow.id}/update`, updatedRow).then(
      (response) => {
        console.log(response);
        fetchSkill();
      }
    );
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleProcessRowUpdateError = (error: Error) => {
    console.log(error);
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
    { field: "name", headerName: "Name", flex: 2, editable: true },
    {
      field: "description",
      headerName: "Description",
      flex: 6,
      editable: true,
    },
    {
      field: "level",
      headerName: "Level",
      flex: 4,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Beginner", "Competent", "Proficient", "Expert"],
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={skill}
        // loading={loading}
        rowModesModel={rowModesModel}
        rowCount={rowCount}
        pageSizeOptions={[10, 20, 50]}
        paginationMode="server"
        editMode="row"
        paginationModel={paginationModel}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={(updatedRow, originalRow) => {
          console.log(updatedRow);
          return mySaveOnServerFunction(updatedRow);
        }}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        onPaginationModelChange={setPaginationModel}
      />
    </div>
  );
}
