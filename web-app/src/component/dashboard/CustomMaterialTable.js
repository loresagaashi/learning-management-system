import React, { useState } from 'react';
import { useTheme } from "@material-ui/core";
import { useMutation, useQuery } from "react-query";
import Typography from "@material-ui/core/Typography";
import MaterialTable from "@material-table/core";
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import AlertDialog from '../AlertDialog';

export default function CustomMaterialTable({
  title,
  queryKey,
  service,
  columns,
  errorRef,
  disableDeleteAction,
  onError,
}) {
  const theme = useTheme();
  const { isLoading, data, refetch } = useQuery(queryKey, () => service.findAll());

  const { mutateAsync: createRecord } = useMutation(
    (payload) => service.create(payload),
    {
      onSuccess: onSuccessReset,
      onError: (error) => {
        if (errorRef) errorRef.current = error;
        if (onError) onError(error);
      },
    }
  );
  const { mutateAsync: updateRecord } = useMutation(
    (payload) => service.update(payload),
    {
      onSuccess: onSuccessReset,
      onError: (error) => {
        if (errorRef) errorRef.current = error;
        if (onError) onError(error);
      },
    }
  );

  const { mutateAsync: deleteRecord } = useMutation(
    (payload) => service.delete(payload),
    {
      onSuccess: onSuccessReset,
      onError: (error) => {
        if (errorRef) errorRef.current = error;
        if (onError) onError(error);
      },
    }
  );

  const [selectedItemId, setSelectedItemId] = useState(null);

  function onSuccessReset() {
    refetch();
    resetErrors();
  }

  function resetErrors() {
    if (errorRef) errorRef.current = null;
  }

  const handleRowAdd = async (newData) => {
    try {
      await createRecord(newData);
    } catch (error) {
      if (onError) onError(error);
      return Promise.reject(error);
    }
  };

  const handleRowUpdate = async (newData, oldData) => {
    try {
      await updateRecord(newData);
    } catch (error) {
      if (onError) onError(error);
      return Promise.reject(error);
    }
  };

  const handleDelete = (id) => {
    setSelectedItemId(id);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteRecord(selectedItemId);
      setSelectedItemId(null);
      return true;
    } catch (error) {
      if (onError) onError(error);
      return false;
    }
  };

  const handleCloseDialog = () => {
    setSelectedItemId(null);
  };

  const actions = disableDeleteAction
    ? []
    : [
        {
          icon: DeleteIcon,
          tooltip: "Delete",
          onClick: (event, rowData) => handleDelete(rowData.id),
        },
      ];

  return (
    <>
      <MaterialTable
        style={{ margin: "2em" }}
        isLoading={isLoading}
        localization={{ header: { actions: "" } }}
        title={
          <Typography
            variant={"h4"}
            style={{
              whiteSpace: "normal",
              overflow: "hidden",
              textOverflow: "ellipsis",
              padding: "0.5em",
            }}
          >
            {title}
          </Typography>
        }
        columns={columns}
        data={data}
        options={{
          actionsColumnIndex: -1,
          pageSize: 10,
          headerStyle: { backgroundColor: "transparent" },
          paginationType: "stepped",
        }}
        editable={{
          onRowAdd: handleRowAdd,
          onRowUpdate: handleRowUpdate,
          onRowUpdateCancelled: resetErrors,
          onRowAddCancelled: resetErrors,
        }}
        actions={actions}
      />
      <AlertDialog
        open={Boolean(selectedItemId)}
        onClose={handleCloseDialog}
        onConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}
