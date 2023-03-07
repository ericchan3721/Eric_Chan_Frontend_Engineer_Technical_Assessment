import { styled, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DoctorProfileList from "../components/Doctor/ProfileList";
import LoadingSpinner from "../components/Loading/Spinner";
import { necktieHttpClient } from "../services/httpClient";
import { Doctor } from "../types/doctor";
import { useGlobalContext } from "../hooks/context.hook";
import { SetAlertBoxOptions } from "../types/components";

const StyledDiv = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
});

const Homepage = () => {
    const { setAlertBox } = useGlobalContext();
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [isGettingDoctors, setIsGettingDoctors] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            try {
                await necktieHttpClient
                        .get('/doctor')
                        .then(res => {
                            setDoctors(res.data);
                        })
                        .catch(e => {
                            setTimeout(() => {
                                setAlertBox((prevOptions: SetAlertBoxOptions) => ({
                                    ...prevOptions,
                                    isOpen: true,
                                    severity: 'error',
                                    title: 'Failed to get doctors list!',
                                    message: 'Please try again later!',
                                }));
                            }, 0);
                        });
            } finally {
                setIsGettingDoctors(false);
            }
        })();
    }, []);

    return (
        <StyledDiv>
            <Typography variant="h1" sx={{ marginBottom: '18px' }}>Looking for a doctor?</Typography>
            {isGettingDoctors ? <LoadingSpinner /> : <DoctorProfileList doctors={doctors} />}
        </StyledDiv>
    );
};

export default Homepage;
