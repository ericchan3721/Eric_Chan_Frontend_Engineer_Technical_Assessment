import { Box, styled } from "@mui/material";
import { Doctor } from "../../types/doctor";
import DoctorProfile from "./Profile";

const StyledList = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '20px',
})

interface DoctorProfileListProps {
    doctors: Doctor[],
}

const DoctorProfileList = ({ doctors }: DoctorProfileListProps) => {

    return (
        <StyledList>
            {doctors.map((d: Doctor) => (
                <DoctorProfile key={`doctor-${d.id}`} doctor={d} />
            ))}
        </StyledList>
    );
    
}

export default DoctorProfileList;
