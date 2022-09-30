import { Button, Container, Grid } from "@mui/material";


function ViewAll() {
    return(
        <Container >
            <Grid textAlign="center" pt={4} pb={8}>

             <Button variant="contained" color="success"> <a href="/product">Xem thêm</a></Button>
            </Grid>
        </Container>
    )
}

export default ViewAll;