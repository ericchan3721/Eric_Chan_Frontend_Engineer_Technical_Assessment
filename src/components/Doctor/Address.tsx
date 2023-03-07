import { Box, Typography, styled } from "@mui/material";
import { Children } from "react";
import { Address } from "../../types/doctor";

interface DoctorAddressProps {
    address: Address
}

const StyledAddressBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
});

const StyledDistrict = styled(Typography)({
    fontSize: '36px',
});

const StyledAddressLine = styled(Typography)({
    fontSize: '24px',
});

const DoctorAddress = ({ address }: DoctorAddressProps) => {
    const { district, line_1, line_2 } = address;

    return (
        <StyledAddressBox>
            <StyledDistrict variant="h3" sx={{ fontSize: '36px' }}>{district}</StyledDistrict>
            <StyledAddressLine variant="h4">{line_1}</StyledAddressLine>
            <StyledAddressLine variant="h4">{line_2}</StyledAddressLine>
        </StyledAddressBox>
    )
}

export default DoctorAddress;
