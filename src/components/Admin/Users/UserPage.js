import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { saveUserDetails } from "../../../store/reducers/AdminReducers";
import { getUserDetails } from "../../../store/actions/AdminActions";
import { LoadingPage } from "../../Loading/Loading";
import { Container, Grid } from "@mui/material";
import UserProfilePage from "./UserProfilePage";


const UserPage = () => {

  const location = useLocation();
  const { userId } = location.state || {};
  const userDetails = useSelector((state) => state.admin.value.userDetails);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserDetails(userId);
        dispatch(saveUserDetails(response));
        setIsLoading(false);
      } catch (error) {
        console.error("Error : ", error);
        setIsLoading(true);
      }
    };
    if (isLoading) {
      fetchUser();
    }
  }, [isLoading, userId])


  return isLoading ? <LoadingPage /> : (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <UserProfilePage
            user={userDetails}
          />
        </Grid>
        
      </Grid>
    </Container>
  )


}

export default UserPage;