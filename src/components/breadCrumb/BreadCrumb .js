import { Container, Grid, Stack, Link, Breadcrumbs } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';



function BreadCrumbComponent(){
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" style={{fontWeight:"bold"}} >
            Trang chủ
        </Link>,
        <Link
            underline="hover"
            key="2"
            color="inherit"
            href="/product"
            style={{fontWeight:"bold"}}
        >
            All Products
        </Link>,

    ];
    return(
        <Container>
                <Grid sx={{ paddingTop: "6rem"  , paddingLeft:"5rem"}}>
                    <Stack spacing={2}>

                        <Breadcrumbs
                            separator={<NavigateNextIcon fontSize="small" />}
                            aria-label="breadcrumb"
                        >
                            {breadcrumbs}
                        </Breadcrumbs>
                    </Stack>
                </Grid>
                
            </Container>
    )
}
export default BreadCrumbComponent;