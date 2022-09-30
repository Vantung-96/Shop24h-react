import { Container, Grid,  } from "@mui/material";
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import './Footer.css';



function Footer() {
    return (
        <div className="bg-footer" >
            <Container>
                <Grid container sx={{paddingTop:"3rem"}}>
                    <Grid item xs={3} md={3}>
                        <ul>
                            <li className="text-type">PRODUCTS</li>
                            <li>Help Center</li>
                            <li>Contact Us</li>
                            <li>Product Help</li>
                            <li>Warranty</li>
                            <li>Order Status</li>
                        </ul>
                    </Grid>
                    <Grid item xs={3} md={3}>
                        <ul>
                            <li className="text-type">SERVICES</li>
                            <li>Help Center</li>
                            <li>Contact Us</li>
                            <li>Product Help</li>
                            <li>Warranty</li>
                            <li>Order Status</li>
                        </ul>
                    </Grid>
                    <Grid item xs={3} md={3}>
                        <ul>
                            <li className="text-type">SUPPORT</li>
                            <li>Help Center</li>
                            <li>Contact Us</li>
                            <li>Product Help</li>
                            <li>Warranty</li>
                            <li>Order Status</li>
                        </ul>
                    </Grid>
                    <Grid item container xs={3} md={3}>
                        <Grid item xs={12} md={12} textAlign="center" sx={{margin:"0"}} >
                             <h1 style={{paddingTop:"20px"}}>Devcamp</h1>   
                        </Grid>
                        <Grid item xs={12} md={12} textAlign="center">
                            <FacebookRoundedIcon sx={{paddingLeft:"10px"}}/>
                            <InstagramIcon sx={{paddingLeft:"15px"}}/>
                            <YouTubeIcon sx={{paddingLeft:"15px"}}/>
                            <TwitterIcon sx={{paddingLeft:"15px"}}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
export default Footer;