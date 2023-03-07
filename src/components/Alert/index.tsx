import { Alert, AlertTitle, Snackbar, Typography } from "@mui/material";
import { useGlobalContext } from "../../hooks/context.hook";
import { SetAlertBoxOptions } from "../../types/components";

const AlertBox = ({
    isOpen,
    title,
    message,
    autoHideDuration = 6000,
    severity = 'error',
}: SetAlertBoxOptions) => {
    const { setAlertBox } = useGlobalContext();

    const handleClose = () => {
        setAlertBox((prevOptions: SetAlertBoxOptions) => ({
            ...prevOptions,
            isOpen: false,
        }));
    }

    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={autoHideDuration}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            onClose={handleClose}
        >
            <Alert severity={severity}>
                <AlertTitle>{title}</AlertTitle>
                {message && <Typography>{message}</Typography>}
            </Alert>
        </Snackbar>
    )
};

export default AlertBox;
