import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllWorkshops } from '../../store/actions/WorkshopActions';
import { saveAllWorkshops } from '../../store/reducers/WorkshopReducers';
import { LoadingPage } from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';
import HomeAppContent from './HomeAppContent';
import { Card, Carousel, Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LocationOn, AccessTime, Code } from '@mui/icons-material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Groups3Icon from '@mui/icons-material/Groups3';
import { displayName } from '../../utils/Common';

const HomePage = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const allWorkshops = useSelector((state) => state?.workshop?.value?.upComingWorkshops);
    const navigate = useNavigate();

    useEffect(() => {
        const getWorkshops = async () => {
            try {
                const workshops = await getAllWorkshops();
                dispatch(saveAllWorkshops(workshops));
                setIsLoading(false);
            } catch (error) {
                console.error("Error : ", error);
                setIsLoading(false);
            }
        };
        if (isLoading) {
            getWorkshops();
        }
    }, []);

    const handleCardClick = (workshopData) => {
        navigate('/view-workshop', { state: { workshopId: workshopData.workshopId } });
    };

    const sortedWorkshops = isLoading ? [] : [...allWorkshops].sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

    return (
        <div>
            <HomeAppContent />
            {isLoading ? (
                <LoadingPage />
            ) : (
                <Container className="mt-4" style={{ padding: '10px', marginBottom: '20px', borderTopColor: '#CC0000', borderTopStyle: 'solid' }}>
                    <h5 automationId="home_page_upcmg_wrkshp_title">Upcoming Workshops</h5>
                    <Carousel interval={null} style={{ color: 'black' }} controls={true}  >
                        {sortedWorkshops.map((workshop, index) => (
                            index % 3 === 0 ? (
                                <Carousel.Item key={workshop.workshopId}>
                                    <Row className="d-flex justify-content-around">
                                        {sortedWorkshops.slice(index, index + 3).map((item, ind) => (
                                            <Col key={item.workshopId} md={4}>
                                                <Card style={{ cursor: 'pointer', width: '100%', height: '250px' }} onClick={() => handleCardClick(item)}>
                                                    <Card.Body>
                                                        <Card.Title style={{ padding: '10px', justifyContent: 'space-between' }}>
                                                            <div style={{ justifyContent: 'space-between', display: 'flex', width: '100%' }}>
                                                                <div automationId={'home_upcmg_wrkshp_name_' + (index + ind)}>{displayName(item.workshopName)}</div>
                                                                <div> {item.isUserEnrolled && <HowToRegIcon automationId={'home_upcmg_wrkshp_enrl_' + (index + ind)} style={{ color: 'green' }} />}</div>
                                                            </div>
                                                        </Card.Title>

                                                        <Card.Text automationId={'home_upcmg_wrkshp_skills_' + (index + ind)}><Code className="mr-2" /> {item.selectedSkills.map(skill => skill.skillName).join(', ')}</Card.Text>
                                                        <Card.Text automationId={'home_upcmg_wrkshp_time_' + (index + ind)}>
                                                            <AccessTime className="mr-2" />
                                                            {new Date(item.startTime).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                            })} @ {new Date(item.startTime).toLocaleTimeString('en-US', {
                                                                hour: 'numeric',
                                                                minute: 'numeric',
                                                            })}
                                                        </Card.Text>
                                                        <Card.Text automationId={'home_upcmg_wrkshp_venue_' + (index + ind)}>
                                                            <LocationOn className="mr-2" /> {item.venue}</Card.Text>
                                                        <Card.Text automationId={'home_upcmg_wrkshp_cap_' + (index + ind)}>
                                                            <Groups3Icon className="mr-2" /> {item.capacity - item.enrollCount}
                                                        </Card.Text>

                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </Carousel.Item>
                            ) : null
                        ))}
                    </Carousel>
                </Container>
            )}
        </div>
    );
};

export default HomePage;
