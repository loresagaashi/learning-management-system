// import React, { useState } from 'react';
// import axios from 'axios';
// import { useQuery } from 'react-query';
// import { QueryKeys } from '../../../service/QueryKeys';
// import { StudentGroupService } from '../../../service/StudentGroupService';
// import useUser from '../../../hooks/useUser';
// import { makeStyles } from '@material-ui/core/styles';
// import { Button, Select, MenuItem, InputLabel, FormControl, Typography, CircularProgress, Box } from '@material-ui/core';

// const studentGroupService = new StudentGroupService();

// const useStyles = makeStyles((theme) => ({
//   formContainer: {
//     maxWidth: 400,
//     margin: '4rem auto',
//     padding: theme.spacing(4),
//     backgroundColor: theme.palette.background.paper,
//     boxShadow: theme.shadows[5],
//     borderRadius: theme.shape.borderRadius,
//   },
//   title: {
//     fontWeight: 600,
//     marginBottom: theme.spacing(3),
//     textAlign: 'center',
//     color: theme.palette.text.primary,
//   },
//   formControl: {
//     marginBottom: theme.spacing(3),
//     minWidth: '100%',
//   },
//   selectInput: {
//     minWidth: '100%',
//   },
//   button: {
//     width: '100%',
//     padding: theme.spacing(1.5),
//     fontWeight: 600,
//   },
//   messageSuccess: {
//     color: theme.palette.success.main,
//     marginTop: theme.spacing(2),
//     textAlign: 'center',
//     fontWeight: 600,
//   },
//   messageError: {
//     color: theme.palette.error.main,
//     marginTop: theme.spacing(2),
//     textAlign: 'center',
//     fontWeight: 600,
//   },
//   loadingText: {
//     textAlign: 'center',
//     marginTop: theme.spacing(2),
//     color: theme.palette.text.secondary,
//   },
// }));

// function GroupRegister() {
//   const classes = useStyles();
//   const { user } = useUser();
//   const [groupId, setGroupId] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const { data: groups = [], isLoading, isError } = useQuery(QueryKeys.STUDENT_GROUPS,
//     () => studentGroupService.findAll()
//   );

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${process.env.REACT_APP_API_BASE_URL}/students/assign-to-group`, {
//         studentId: user?.user?.id,
//         groupId: parseInt(groupId),
//       });
//       setSuccessMessage('Student registered to group successfully!');
//       setErrorMessage('');
//     } catch (error) {
//       setErrorMessage('Failed to register to group.');
//       setSuccessMessage('');
//     }
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} className={classes.formContainer}>
//       <Typography variant="h5" className={classes.title}>
//          Group Register
//       </Typography>

//       <FormControl variant="outlined" className={classes.formControl} required>
//         <InputLabel id="group-select-label">Select Group</InputLabel>
//         <Select
//           labelId="group-select-label"
//           id="group-select"
//           value={groupId}
//           onChange={(e) => setGroupId(e.target.value)}
//           label="Select Group"
//           className={classes.selectInput}
//           disabled={isLoading || isError}
//         >
//           {groups.map((group) => (
//             <MenuItem key={group.id} value={group.id}>
//               {group.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <Button
//         type="submit"
//         variant="contained"
//         color="primary"
//         className={classes.button}
//         disabled={isLoading || !groupId}
//       >
//         {isLoading ? 'Assigning...' : 'Register'}
//       </Button>

//       {isLoading && <Typography className={classes.loadingText}>Loading groups...</Typography>}
//       {isError && <Typography className={classes.messageError}>Failed to load groups.</Typography>}
//       {successMessage && <Typography className={classes.messageSuccess}> {successMessage}</Typography>}
//       {errorMessage && <Typography className={classes.messageError}> {errorMessage}</Typography>}
//     </Box>
//   );
// }

// export default GroupRegister;
