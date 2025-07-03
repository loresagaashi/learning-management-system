import React, { useState, useMemo } from 'react';
import { useTheme } from "@material-ui/core";
import { useMutation, useQuery } from "react-query";
import Typography from "@material-ui/core/Typography";
import { Paper, Box, IconButton, Tooltip, Chip, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, Switch, Divider, Button, TextField, InputAdornment, makeStyles, useMediaQuery, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem, CircularProgress, Grid } from '@material-ui/core';
import {
  ViewColumn as ViewColumnIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@material-ui/icons';
import AlertDialog from '../AlertDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1em",
    height: 'calc(100vh - 120px)',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    fontWeight: 600,
    // color: theme.palette.primary.main,
  },
  controls: {
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  tableContainer: {
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  tableWrapper: {
    height: '100%',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      height: 8,
      width: 8,
    },
    '&::-webkit-scrollbar-track': {
      background: theme.palette.grey[100],
      borderRadius: 4,
    },
    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.grey[400],
      borderRadius: 4,
      '&:hover': {
        background: theme.palette.grey[500],
      },
    },
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: theme.palette.background.paper,
  },
  tableHead: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  tableHeaderCell: {
    padding: theme.spacing(1.5, 2),
    fontWeight: 600,
    textAlign: 'left',
    borderBottom: `2px solid ${theme.palette.primary.dark}`,
    whiteSpace: 'nowrap',
    minWidth: 120,
  },
  tableRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.selected,
    },
    transition: 'background-color 0.2s ease',
  },
  tableCell: {
    padding: theme.spacing(1.5, 2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 200,
  },
  actionsCell: {
    padding: theme.spacing(1),
    width: 120,
    textAlign: 'center',
  },
  actionButton: {
    margin: theme.spacing(0, 0.5),
    padding: theme.spacing(0.5),
  },
  drawer: {
    width: 320,
  },
  drawerHeader: {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  searchField: {
    marginBottom: theme.spacing(2),
  },
  columnList: {
    maxHeight: 'calc(100vh - 200px)',
    overflow: 'auto',
  },
  columnItem: {
    padding: theme.spacing(1, 2),
  },
  statusChip: {
    margin: theme.spacing(0.5),
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: theme.palette.text.secondary,
  },
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
    borderTop: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
}));

// Helper function to chunk an array into rows of two
function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export default function AdvancedWideTable({
  title,
  queryKey,
  service,
  columns,
  errorRef,
  disableDeleteAction = false,
  disableAddAction = false,
  onError,
  defaultVisibleColumns = null,
  maxColumnsBeforeScroll = 8,
  pageSize = 25,
}) {
  const theme = useTheme();
  const classes = useStyles();
  
  const { isLoading, data, refetch, error } = useQuery(queryKey, () => service.findAll());
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [columnDrawerOpen, setColumnDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [editingRow, setEditingRow] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [editLoading, setEditLoading] = useState(false);
  const [addingRow, setAddingRow] = useState(false);
  const [addFormData, setAddFormData] = useState({});
  const [addLoading, setAddLoading] = useState(false);
  
  const [visibleColumns, setVisibleColumns] = useState(() => {
    if (defaultVisibleColumns) {
      return defaultVisibleColumns;
    }
    if (maxColumnsBeforeScroll && columns.length > maxColumnsBeforeScroll) {
      return columns.slice(0, maxColumnsBeforeScroll).map(col => col.field);
    }
    return columns.map(col => col.field);
  });

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

  const filteredColumns = useMemo(() => {
    return columns.filter(col => visibleColumns.includes(col.field));
  }, [columns, visibleColumns]);

  const processedData = useMemo(() => {
    let parsedData = data;
    if (typeof data === 'string') {
      try {
        parsedData = JSON.parse(data);
      } catch (parseError) {
        console.error('Failed to parse data:', parseError);
        parsedData = [];
      }
    }

    let tableData = [];
    if (Array.isArray(parsedData)) {
      tableData = parsedData;
    } else if (parsedData && typeof parsedData === 'object') {
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

    if (searchTerm) {
      tableData = tableData.filter(row => 
        Object.values(row).some(value => 
          value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    return tableData;
  }, [data, searchTerm]);

  const totalPages = Math.ceil(processedData.length / pageSize);
  const paginatedData = processedData.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  function onSuccessReset() {
    refetch();
    resetErrors();
  }

  function resetErrors() {
    if (errorRef) errorRef.current = null;
  }

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

  const handleColumnToggle = (field) => {
    setVisibleColumns(prev => 
      prev.includes(field) 
        ? prev.filter(col => col !== field)
        : [...prev, field]
    );
  };

  const handleShowAllColumns = () => {
    setVisibleColumns(columns.map(col => col.field));
  };

  const handleHideAllColumns = () => {
    setVisibleColumns([]);
  };

  const handleEdit = (row) => {
    setEditingRow(row);
    setEditFormData({ ...row });
  };

  const handleEditClose = () => {
    setEditingRow(null);
    setEditFormData({});
  };

  const handleEditSave = async () => {
    setEditLoading(true);
    try {
      await updateRecord(editFormData);
      handleEditClose();
    } catch (error) {
      if (onError) onError(error);
    } finally {
      setEditLoading(false);
    }
  };

  const handleEditFormChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAdd = () => {
    console.log('Opening add dialog');
    setAddingRow(true);
    setAddFormData({});
    console.log('addDialog state after set:', true);
  };

  const handleAddClose = () => {
    console.log('Closing add dialog');
    setAddingRow(false);
    setAddFormData({});
  };

  const handleAddSave = async () => {
    console.log('Saving add data:', addFormData);
    setAddLoading(true);
    try {
      await createRecord(addFormData);
      console.log('Add successful');
      handleAddClose();
    } catch (error) {
      console.error('Add failed:', error);
      if (onError) onError(error);
    } finally {
      setAddLoading(false);
    }
  };

  const handleAddFormChange = (field, value) => {
    console.log('Add form change:', field, value);
    setAddFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderEditField = (column) => {
    const value = editFormData[column.field] || '';
        const autoGeneratedFields = ['createdOn', 'updatedOn', 'createdAt', 'updatedAt', 'id'];
    if (autoGeneratedFields.includes(column.field) || column.editable === 'never') {
      return null;
    }
    if (column.editComponent) {
      return column.editComponent({
        value: value,
        onChange: (newValue) => handleEditFormChange(column.field, newValue),
        rowData: editingRow,
        columnDef: column
      });
    }
    
    if (column.type === 'date') {
      return (
        <TextField
          fullWidth
          label={column.title}
          type="date"
          value={value ? new Date(value).toISOString().split('T')[0] : ''}
          onChange={(e) => handleEditFormChange(column.field, e.target.value)}
          InputLabelProps={{ shrink: true }}
          margin="normal"
        />
      );
    }
    
    if (column.type === 'boolean') {
      return (
        <FormControl fullWidth margin="normal">
          <InputLabel>{column.title}</InputLabel>
          <Select
            value={value ? 'true' : 'false'}
            onChange={(e) => handleEditFormChange(column.field, e.target.value === 'true')}
            label={column.title}
          >
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </Select>
        </FormControl>
      );
    }
    
    if (column.field === 'status') {
      return (
        <FormControl fullWidth margin="normal">
          <InputLabel>{column.title}</InputLabel>
          <Select
            value={value}
            onChange={(e) => handleEditFormChange(column.field, e.target.value)}
            label={column.title}
          >
            <MenuItem value="ACTIVE">Active</MenuItem>
            <MenuItem value="INACTIVE">Inactive</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
          </Select>
        </FormControl>
      );
    }
    
    return (
      <TextField
        fullWidth
        label={column.title}
        value={value}
        onChange={(e) => handleEditFormChange(column.field, e.target.value)}
        margin="normal"
        disabled={column.field === 'id'}
        multiline={column.type === 'text' || column.field.includes('description')}
        rows={column.type === 'text' || column.field.includes('description') ? 3 : 1}
      />
    );
  };

  const renderCellValue = (row, column) => {
    const value = row[column.field];
    
    if (column.render) {
      return column.render(row);
    }
    
    if (column.type === 'date' && value) {
      return new Date(value).toLocaleDateString();
    }
    
    if (column.type === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    
    if (column.field === 'status') {
      return (
        <Chip
          label={value}
          size="small"
          color={value === 'ACTIVE' ? 'primary' : value === 'INACTIVE' ? 'default' : 'secondary'}
          className={classes.statusChip}
        />
      );
    }
    
    return value || '';
  };

  const renderAddField = (column) => {
    const value = addFormData[column.field] || '';
    
    const autoGeneratedFields = ['createdOn', 'updatedOn', 'createdAt', 'updatedAt', 'id'];
    if (autoGeneratedFields.includes(column.field) || column.editable === 'never') {
      console.log('Skipping field in add dialog:', column.field, 'reason:', autoGeneratedFields.includes(column.field) ? 'auto-generated' : 'editable=never');
      return null;
    }
    
    if (column.editComponent) {
      return column.editComponent({
        value: value,
        onChange: (newValue) => handleAddFormChange(column.field, newValue),
        rowData: null,
        columnDef: column
      });
    }

    if (column.type === 'date') {
      return (
        <TextField
          fullWidth
          label={column.title}
          type="date"
          value={value ? new Date(value).toISOString().split('T')[0] : ''}
          onChange={(e) => handleAddFormChange(column.field, e.target.value)}
          InputLabelProps={{ shrink: true }}
          margin="normal"
        />
      );
    }
    
    if (column.type === 'boolean') {
      return (
        <FormControl fullWidth margin="normal">
          <InputLabel>{column.title}</InputLabel>
          <Select
            value={value ? 'true' : 'false'}
            onChange={(e) => handleAddFormChange(column.field, e.target.value === 'true')}
            label={column.title}
          >
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </Select>
        </FormControl>
      );
    }
    
    if (column.field === 'status') {
      return (
        <FormControl fullWidth margin="normal">
          <InputLabel>{column.title}</InputLabel>
          <Select
            value={value}
            onChange={(e) => handleAddFormChange(column.field, e.target.value)}
            label={column.title}
          >
            <MenuItem value="ACTIVE">Active</MenuItem>
            <MenuItem value="INACTIVE">Inactive</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
          </Select>
        </FormControl>
      );
    }
    
    return (
      <TextField
        fullWidth
        label={column.title}
        value={value}
        onChange={(e) => handleAddFormChange(column.field, e.target.value)}
        margin="normal"
        disabled={column.field === 'id'}
        multiline={column.type === 'text' || column.field.includes('description')}
        rows={column.type === 'text' || column.field.includes('description') ? 3 : 1}
      />
    );
  };

  if (error) {
    return (
      <div className={classes.root}>
        <Box className={classes.emptyState}>
          <Typography variant="h6" color="error">Error loading data</Typography>
          <Typography variant="body2">{error.message}</Typography>
        </Box>
      </div>
    );
  }

  return (
    <Paper className={classes.root} elevation={2}>
      <Box className={classes.header}>
        <Typography variant="h5" className={classes.title}>
          {title}
        </Typography>
        
        <Box className={classes.controls}>
          {!disableAddAction && (
            <Tooltip title="Add New">
              <IconButton 
                onClick={handleAdd}
                color="primary"
                style={{ marginRight: 8 }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          )}
          
          <TextField
            size="small"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            style={{ width: 200 }}
          />
          
          <Tooltip title="Column Visibility">
            <IconButton 
              onClick={() => setColumnDrawerOpen(true)}
              color="primary"
            >
              <ViewColumnIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Refresh">
            <IconButton onClick={refetch} color="primary">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box className={classes.tableContainer}>
        {isLoading && (
          <Box className={classes.loadingOverlay}>
            <Typography>Loading...</Typography>
          </Box>
        )}
        
        <Box className={classes.tableWrapper}>
          <table className={classes.table}>
            <thead className={classes.tableHead}>
              <tr>
                {filteredColumns.map((column) => (
                  <th key={column.field} className={classes.tableHeaderCell}>
                    {column.title}
                  </th>
                ))}
                {!disableDeleteAction && (
                  <th className={classes.tableHeaderCell} style={{ width: 120 }}>
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td 
                    colSpan={filteredColumns.length + (disableDeleteAction ? 0 : 1)}
                    className={classes.tableCell}
                    style={{ textAlign: 'center' }}
                  >
                    <Box className={classes.emptyState}>
                      <Typography variant="body1">
                        {searchTerm ? 'No results found' : 'No data available'}
                      </Typography>
                    </Box>
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, index) => (
                  <tr key={row.id || index} className={classes.tableRow}>
                    {filteredColumns.map((column) => (
                      <td key={column.field} className={classes.tableCell}>
                        {renderCellValue(row, column)}
                      </td>
                    ))}
                    {!disableDeleteAction && (
                      <td className={classes.actionsCell}>
                        <Tooltip title="Edit">
                          <IconButton 
                            size="small" 
                            className={classes.actionButton}
                            onClick={() => handleEdit(row)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton 
                            size="small" 
                            className={classes.actionButton}
                            onClick={() => handleDelete(row.id)}
                            style={{ color: 'black' }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Box>
      </Box>

      {totalPages > 1 && (
        <Box className={classes.pagination}>
          <Typography variant="body2">
            Showing {currentPage * pageSize + 1} to {Math.min((currentPage + 1) * pageSize, processedData.length)} of {processedData.length} results
          </Typography>
          <Box>
            <Button
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              Previous
            </Button>
            <Typography variant="body2" component="span" style={{ margin: '0 16px' }}>
              Page {currentPage + 1} of {totalPages}
            </Typography>
            <Button
              disabled={currentPage === totalPages - 1}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              Next
            </Button>
          </Box>
        </Box>
      )}

      <Drawer
        anchor="right"
        open={columnDrawerOpen}
        onClose={() => setColumnDrawerOpen(false)}
        classes={{ paper: classes.drawer }}
      >
        <Box className={classes.drawerHeader}>
          <Typography variant="h6">Column Visibility</Typography>
          <Typography variant="body2" color="textSecondary">
            {visibleColumns.length} of {columns.length} columns visible
          </Typography>
        </Box>
        
        <Box p={2}>
          <Button
            variant="outlined"
            size="small"
            onClick={handleShowAllColumns}
            style={{ marginRight: 8 }}
          >
            Show All
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={handleHideAllColumns}
          >
            Hide All
          </Button>
        </Box>
        
        <Divider />
        
        <List className={classes.columnList}>
          {columns.map((column) => (
            <ListItem key={column.field} className={classes.columnItem}>
              <ListItemIcon>
                {visibleColumns.includes(column.field) ? (
                  <VisibilityIcon color="primary" />
                ) : (
                  <VisibilityOffIcon color="disabled" />
                )}
              </ListItemIcon>
              <ListItemText 
                primary={column.title}
                secondary={column.field}
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={visibleColumns.includes(column.field)}
                  onChange={() => handleColumnToggle(column.field)}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Dialog
        open={Boolean(editingRow)}
        onClose={handleEditClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Edit {title?.slice(0, -1) || 'Record'}
        </DialogTitle>
        <DialogContent>
          <Box style={{ marginTop: '16px' }}>
            {chunkArray(
              columns.filter((column) => renderEditField(column) !== null),
              2
            ).map((row, rowIndex) => (
              <Grid container spacing={2} key={rowIndex}>
                {row.map((column) => (
                  <Grid item xs={12} sm={6} key={column.field}>
                    {renderEditField(column)}
                  </Grid>
                ))}
              </Grid>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} disabled={editLoading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleEditSave}
            disabled={editLoading}
            color="primary"
          >
            {editLoading ? <CircularProgress size={20} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={addingRow}
        onClose={handleAddClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Add New {title?.slice(0, -1) || 'Record'}
        </DialogTitle>
        <DialogContent>
          <Box style={{ marginTop: '16px' }}>
            {chunkArray(
              columns.filter((column) => renderAddField(column) !== null),
              2
            ).map((row, rowIndex) => (
              <Grid container spacing={2} key={rowIndex}>
                {row.map((column) => {
                  const fieldComponent = renderAddField(column);
                  return (
                    <Grid item xs={12} sm={6} key={column.field}>
                      {fieldComponent}
                    </Grid>
                  );
                })}
              </Grid>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose} disabled={addLoading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddSave}
            disabled={addLoading}
            color="primary"
          >
            {addLoading ? <CircularProgress size={20} /> : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <AlertDialog
        open={Boolean(selectedItemId)}
        onClose={handleCloseDialog}
        onConfirmDelete={handleConfirmDelete}
      />
    </Paper>
  );
} 