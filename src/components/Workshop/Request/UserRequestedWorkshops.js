import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingPage } from '../../Loading/Loading';
import WorkshopTable from '../WorkshopTable';
import { DefaultColumnFilter } from '../../../utils/Common';
import { Container } from 'react-bootstrap';
import { Typography } from '@mui/material';
import { getAllUserRequestedWorkshops } from '../../../store/actions/AdminActions';
import { saveAllUserRequestedSkills } from '../../../store/reducers/AdminReducers';

export default function UserRequestedWorkshops() {

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const requestedSkills = useSelector((state) => state?.admin?.value?.allRequestedWorkshops);

  useEffect(() => {
    const getSkills = async () => {
      try {
        const skills = await getAllUserRequestedWorkshops();
        dispatch(saveAllUserRequestedSkills(skills));
        setIsLoading(false);
      } catch (error) {
        console.error("Error : ", error);
        setIsLoading(false);
      }
    };
    if (isLoading) {
      getSkills();
    }
  }, [])

  const columns = useMemo(
    () => [
      { Header: 'Technology', accessor: 'skillName', Filter: DefaultColumnFilter, width: '200px' },
      { Header: 'Requested User', accessor: 'requestedUser', Filter: DefaultColumnFilter, width: '160px' },
      {
        Header: 'Requested Time',
        accessor: 'requestedDate',
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
      }
    ],
    []
  );

  return isLoading ? <LoadingPage /> : (
    <Container className='workshop_page'>
      <Typography automationId='requested_workshop_title_page' className='workshop_title_page' id='request_workshop_title_page' variant="h6" >
        Requested Skills
      </Typography>
      <WorkshopTable data={requestedSkills} columns={columns}  />
    </Container>
  );
}
