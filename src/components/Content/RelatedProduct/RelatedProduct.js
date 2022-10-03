import { Container, Grid } from "@mui/material";
import {useEffect , useState} from "react";


function RelatedProduct() {
    const hoverEffect = {
        "&:hover" :{
            border: "1px solid black",
            boxShadow: "1px 1px",
            
        }
    }

    const limit = 6;
    const [varRefeshPage, setVarRefeshPage] = useState(0);
    const [data, setData] = useState([]);

    const getData = async (param, paramOption = {}) => {
        const response = await fetch(param, paramOption);
        const data = await response.json();
        return data;
    }



    useEffect(() => {
        getData("https://shop24h-nodejs.herokuapp.com/product?limit=" + limit)
            .then((result) => {
                setData(result.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [varRefeshPage])
    return (
        <Container>
            <Grid container mt={7} mb={10}>
                <Grid item xs={12} pb={4} >
                    <h1>Related Product</h1>
                </Grid>
                <Grid item container textAlign="center" pt={4}>

                    {
                        data.map((row, index) => {
                            return <Grid item xs={4} key={index} pb={2} sx={hoverEffect}>
                                 <a href={`/product/` + row._id}>
                                    <img src={row.imageUrl} style={{ width: "80%" }} loading="lazy" alt="" />
                                    </a>
                                <p style={{ fontWeight:"bold"}}>{row.name}</p>
                                <span style={{textDecoration:"line-through", fontWeight:"bold"}}>{"$"+ row.buyPrice}</span > <span style={{color:"red" , fontWeight:"bold"}}> { "$"+ row.promotionPrice}</span>
                            </Grid>
                        })
                    }
                </Grid>
            </Grid>
        </Container>
    )
}
export default RelatedProduct;