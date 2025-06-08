import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import ErrorOutlineSharpIcon from '@material-ui/icons/ErrorOutlineSharp';

const useStyles = makeStyles((theme) => ({
  alertIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  alertIcon: {
    color: 'red',
    fontSize: 90,
  },
  dialogActions: {
    justifyContent: 'space-evenly',
  },
  cancelButton: {
    '&:hover': {
      backgroundColor: '#B03A2E',
    },
    backgroundColor: '#E9967A', 
    color: 'white',
  },
  confirmButton: {
    '&:hover': {
      backgroundColor: '#388E3C',
    },
    backgroundColor: '#17B169', 
    color: 'white',
  },
}));

function AlertDialog({ open, onClose, onConfirmDelete }) {
  const classes = useStyles();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleConfirmDelete = async () => {
    try {
      const deletionSuccessful = await onConfirmDelete();
      if (deletionSuccessful) {
        setShowSuccess(true);
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      setShowError(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSuccess(false);
    setShowError(false);
    onClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth={false}
        PaperProps={{
          style: {
            width: 400,
          },
        }}
      >
        <DialogContent>
          <div className={classes.alertIconContainer}>
            <ErrorOutlineSharpIcon className={classes.alertIcon} />
          </div>
          <DialogContentText id="alert-dialog-description" style={{ textAlign: 'center' }}>
            Are you sure you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={handleClose} color="primary" variant="outlined" className={classes.cancelButton}>
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" variant="outlined" className={classes.confirmButton} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showSuccess}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="success"
        >
          Delete was successful!
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={showError}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="error"
        >
          Cannot delete because it is referenced by other entities!
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default AlertDialog;