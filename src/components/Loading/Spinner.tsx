import { Box, CircularProgress, styled } from "@mui/material"
import { Color } from "../../themes/color";

const StyledFlexWrapper = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
});

const StyledCircularProgress = styled(CircularProgress)({
    color: Color.THEME_PINK,
});

const LoadingSpinner = () => {
    return (
        <StyledFlexWrapper>
            <StyledCircularProgress size={128} />
        </StyledFlexWrapper>
    );
};

export default LoadingSpinner;
