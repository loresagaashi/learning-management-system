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
  const { isLoading, data, refetch, error } = useQuery(queryKey, () => service.findAll());
  const [selectedItemId, setSelectedItemId] = useState(null);

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

  // Debug logging to see what data contains
  console.log('CustomMaterialTable - queryKey:', queryKey);
  console.log('CustomMaterialTable - data:', data);
  console.log('CustomMaterialTable - data type:', typeof data);
  console.log('CustomMaterialTable - isArray:', Array.isArray(data));
  console.log('CustomMaterialTable - error:', error);
  console.log('CustomMaterialTable - isLoading:', isLoading);
  
  if (data && typeof data === 'object') {
    console.log('CustomMaterialTable - data keys:', Object.keys(data));
    if (Array.isArray(data)) {
      console.log('CustomMaterialTable - data length:', data.length);
      if (data.length > 0) {
        console.log('CustomMaterialTable - first item:', data[0]);
        console.log('CustomMaterialTable - first item keys:', Object.keys(data[0]));
      }
    }
  }

  // Parse data if it's a string, otherwise use as-is
  let parsedData = data;
  if (typeof data === 'string') {
    try {
      parsedData = JSON.parse(data);
      console.log('CustomMaterialTable - parsed data type:', typeof parsedData);
      console.log('CustomMaterialTable - parsed data isArray:', Array.isArray(parsedData));
    } catch (parseError) {
      console.error('CustomMaterialTable - failed to parse data:', parseError);
      console.error('CustomMaterialTable - data string length:', data.length);
      console.error('CustomMaterialTable - data string preview:', data.substring(0, 200));
      // If parsing fails, set to empty array instead of trying regex extraction
      parsedData = [];
    }
  }

  // Ensure data is always an array
  let tableData = [];
  
  if (Array.isArray(parsedData)) {
    tableData = parsedData;
  } else if (parsedData && typeof parsedData === 'object') {
    // Check if data is nested in a response object
    if (parsedData.content && Array.isArray(parsedData.content)) {
      tableData = parsedData.content;
    } else if (parsedData.data && Array.isArray(parsedData.data)) {
      tableData = parsedData.data;
    } else if (parsedData.items && Array.isArray(parsedData.items)) {
      tableData = parsedData.items;
    } else if (parsedData.results && Array.isArray(parsedData.results)) {
      tableData = parsedData.results;
    }
  }
  
  console.log('CustomMaterialTable - final tableData:', tableData);

  // Don't render the table if we're still loading and don't have data
  if (isLoading && !Array.isArray(parsedData)) {
    return (
      <div style={{ margin: "2em", textAlign: "center" }}>
        <Typography variant="h4">Loading...</Typography>
      </div>
    );
  }

  // Show error state if there's an error
  if (error) {
    return (
      <div style={{ margin: "2em", textAlign: "center" }}>
        <Typography variant="h4" color="error">Error loading data</Typography>
        <Typography variant="body1">{error.message}</Typography>
      </div>
    );
  }

  function onSuccessReset() {
    refetch();
    resetErrors();
  }

  function resetErrors() {
    if (errorRef) errorRef.current = null;
  }

  const handleRowAdd = async (newData) => {
    try {
      console.log('CustomMaterialTable - handleRowAdd - newData:', newData);
      console.log('CustomMaterialTable - handleRowAdd - newData type:', typeof newData);
      console.log('CustomMaterialTable - handleRowAdd - newData keys:', Object.keys(newData));
      
      // Log specific fields that might be causing issues
      if (newData.professor) {
        console.log('CustomMaterialTable - handleRowAdd - professor:', newData.professor);
        console.log('CustomMaterialTable - handleRowAdd - professor type:', typeof newData.professor);
        console.log('CustomMaterialTable - handleRowAdd - professor isArray:', Array.isArray(newData.professor));
      }
      if (newData.orientation) {
        console.log('CustomMaterialTable - handleRowAdd - orientation:', newData.orientation);
      }
      if (newData.semester) {
        console.log('CustomMaterialTable - handleRowAdd - semester:', newData.semester);
      }
      
      await createRecord(newData);
    } catch (error) {
      console.error('CustomMaterialTable - handleRowAdd - error:', error);
      if (onError) onError(error);
      return Promise.reject(error);
    }
  };

  const handleRowUpdate = async (newData, oldData) => {
    try {
      console.log('CustomMaterialTable - handleRowUpdate - newData:', newData);
      console.log('CustomMaterialTable - handleRowUpdate - oldData:', oldData);
      console.log('CustomMaterialTable - handleRowUpdate - newData type:', typeof newData);
      console.log('CustomMaterialTable - handleRowUpdate - newData keys:', Object.keys(newData));
      
      // Log specific fields that might be causing issues
      if (newData.professor) {
        console.log('CustomMaterialTable - handleRowUpdate - professor:', newData.professor);
        console.log('CustomMaterialTable - handleRowUpdate - professor type:', typeof newData.professor);
        console.log('CustomMaterialTable - handleRowUpdate - professor isArray:', Array.isArray(newData.professor));
      }
      if (newData.orientation) {
        console.log('CustomMaterialTable - handleRowUpdate - orientation:', newData.orientation);
      }
      if (newData.semester) {
        console.log('CustomMaterialTable - handleRowUpdate - semester:', newData.semester);
      }
      
      await updateRecord(newData);
    } catch (error) {
      console.error('CustomMaterialTable - handleRowUpdate - error:', error);
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
      {(() => {
        try {
          return (
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
              data={tableData}
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
          );
        } catch (error) {
          console.error('Error rendering MaterialTable:', error);
          return (
            <div style={{ margin: "2em", textAlign: "center" }}>
              <Typography variant="h4" color="error">Error rendering table</Typography>
              <Typography variant="body1">{error.message}</Typography>
            </div>
          );
        }
      })()}
      <AlertDialog
        open={Boolean(selectedItemId)}
        onClose={handleCloseDialog}
        onConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}
