import { Container } from "@mui/material";
import CarouselComponent from "./Carousel/Carousel";
import LastestProduct from "./LastestProducts/LastestProduct";
import ViewAll from "./ViewAll/ViewAll";


function Content() {
    return(
        <Container>
            <CarouselComponent />
            <LastestProduct />
            <ViewAll />
        </Container>
    )
}
export default Content;