import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEnrolledWorkshop, saveRegisteredWorkshops } from '../../../store/reducers/WorkshopReducers';
import { LoadingPage } from '../../Loading/Loading';
import WorkshopTable from '../WorkshopTable';
import { getRegisteredWorkshops, unEnrollWorkshop } from '../../../store/actions/WorkshopActions';
import { DefaultColumnFilter, getTimelineStatus, sessionUnAuthCheck } from '../../../utils/Common';
import { Container } from 'react-bootstrap';
import { Button, Dialog, DialogActions, DialogContentText, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { DialogContent, DialogTitle } from '@material-ui/core';

export default function RegisteredWorkshops() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [enrolledWorkshops, setEnrolledWorkshops] = useState(undefined);
  const [openUnEnrollDialog, setOpenUnEnrollDialog] = useState(false);
  const [unEnrollingWorkshop, setUnEnrollingWorkshop] = useState();

  useEffect(() => {
    const getWorkshops = async () => {
      try {
        const workshops = await getRegisteredWorkshops();
        dispatch(saveRegisteredWorkshops(workshops));
        const allWorkshops = [
          ...workshops.data.pastWorkshops,
          ...workshops.data.onGoingWorkshops,
          ...workshops.data.upComingWorkshops
        ];
        setEnrolledWorkshops(allWorkshops);
        setIsLoading(false)
      } catch (error) {
        console.error("Error : ", error);
        setIsLoading(false);
      }
    };
    if (isLoading) {
      getWorkshops();
    }
  }, [isLoading])

  const handleDeleteWorkshop = (workshop) => {
    console.log(workshop);
    setUnEnrollingWorkshop(workshop);
    setOpenUnEnrollDialog(true);
  };

  const handleUnEnrollConfirmation = async () => {
    
    try {
      const response = await unEnrollWorkshop(unEnrollingWorkshop);
      dispatch(deleteEnrolledWorkshop(unEnrollingWorkshop.workshopId));
      if (response.data === true) {
        toast.success('Workshop UnEnrolled Successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          closeButton: false,
          draggable: false
        });
        setOpenUnEnrollDialog(false);
        setIsLoading(true);
      } else {
        toast.error('Failed to Enroll', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          closeButton: false,
          pauseOnHover: true,
          draggable: false
        });
        setOpenUnEnrollDialog(false);
      }
    } catch (error) {
      console.error('Error enrolling Workshop :', error);
      sessionUnAuthCheck(error) && navigate('/logout');
      toast.error(error?.response?.data?.message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: false
      });
      setOpenUnEnrollDialog(false);
    }
  };

  const handleCancel = () => {
    setOpenUnEnrollDialog(false);
  };

  const columns = useMemo(
    () => [
      { Header: 'Workshop Title', accessor: 'workshopName', Filter: DefaultColumnFilter, width: '200px' },
      {
        Header: 'Skills',
        accessor: (row) => row.selectedSkills.map(skill => skill.skillName).join(', '),
        Filter: DefaultColumnFilter,
        width: '150px',
      },
      { Header: 'Instructor', accessor: 'createdUser', Filter: DefaultColumnFilter, width: '140px' },
      {
        Header: 'Workshop Time',
        accessor: 'startTime',
        Cell: ({ value }) => new Date(value).toLocaleString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }),
        Filter: DefaultColumnFilter,
        width: '150px',
      },
      {
        Header: 'Duration',
        accessor: (row) => `${Math.floor((new Date(row.endTime) - new Date(row.startTime)) / 3600000)} hr ${Math.floor(((new Date(row.endTime) - new Date(row.startTime)) % 3600000) / 60000)} min`,
        Filter: DefaultColumnFilter,
        width: '80px',
      },
      {
        Header: 'Status',
        accessor: (row) => getTimelineStatus(new Date(row.startTime), new Date(row.endTime)),
        Filter: DefaultColumnFilter, width: '80px'
      },
      {
        Header: 'Actions',
        accessor: 'workshopId',
        Cell: ({ row }) => (
          <IconButton
            aria-label="delete"
            onClick={() => handleDeleteWorkshop(row.original)}
          >
            <DeleteIcon sx={{ color: 'red' }} />
          </IconButton>
        ),
        width: '80px',
      },
    ],
    []
  );

  return isLoading ? <LoadingPage /> : (
    <Container className='workshop_page'>
      <Typography variant="h6" className='workshop_title_page'>
        Enrolled Workshops
      </Typography>
      <WorkshopTable data={enrolledWorkshops} columns={columns} forwardUrl={'/view-workshop'}/>
      <Dialog open={openUnEnrollDialog} onClose={handleCancel}>
        <DialogTitle align='center'>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the workshop?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUnEnrollConfirmation} color="primary">
            Yes
          </Button>
          <Button onClick={handleCancel} color="error">
            No
          </Button>

        </DialogActions>
      </Dialog>
      <ToastContainer />
    </Container>
  );
}
