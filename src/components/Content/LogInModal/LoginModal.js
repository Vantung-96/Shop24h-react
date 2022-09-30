import { Modal, Box, Typography, Grid, Button, TextField } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';



function LogInModal({ openModalLogin, setOpenModalLogin, handleClose ,onLogInGoogle}) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
   
    return (

        <Modal
            open={openModalLogin}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid container>
                    <Grid item xs={12} textAlign="center">LOG IN</Grid>
                    <Grid item xs={12} mt={2} textAlign="center">
                        <Button variant="contained" fullWidth style={{ borderRadius: "20px", backgroundColor: "#ff0000ad" }} onClick={onLogInGoogle}><GoogleIcon /> Sign In with <b style={{ paddingLeft: "2px" }}>Google</b></Button>
                    </Grid>
                    <Grid item xs={12} textAlign="center" mt={5}>
                        <span style={{ border: "1px solid gray", padding: "10px", borderRadius: "50px" }}>OR</span>
                    </Grid>
                    <Grid item xs={12} mt={5}>
                        <TextField label="User Name" fullWidth style={{borderRadius:"20px"}} />
                    </Grid>
                    <Grid item xs={12} mt={2}>
                        <TextField label="User Name" fullWidth style={{borderRadius:"20px"}} />
                    </Grid>
                    <Grid item xs={12} mt={3} mb={5}>
                    <Button variant="contained" fullWidth style={{ borderRadius: "20px", backgroundColor: "green" }}> Sign In </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}
export default LogInModal;