import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import BreadCrumbComponent from "../components/breadCrumb/BreadCrumb ";
import { Container, Grid, Stack, Pagination } from "@mui/material";

import ProductFilter from "../components/breadCrumb/ProductFilter";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function DanhMuc() {
    const { maxPrice, minPrice, isClick, name } = useSelector((reduxData) => reduxData.filter);
    const dispatch = useDispatch();
    const [varRefeshPage, setVarRefeshPage] = useState(0);
    const [users, setUsers] = useState([]);
    const nameSearch = name.charAt(0).toUpperCase() + name.slice(1);


    const getData = async (param, paramOption = {}) => {
        const response = await fetch(param, paramOption);
        const data = await response.json();
        return data;
    }
    const limitPage = 6;
    const [page, setPage] = useState(1);
    const [noPage, setNoPage] = useState(0);

    const changePageHandler = (event, value) => {
        setPage(value);
    }



    if (isClick) {
        getData("https://shop24h-nodejs.herokuapp.com/product?min=" + minPrice + "&max=" + maxPrice + `&name=${nameSearch}`)
            .then((result) => {
                setNoPage(Math.ceil(result.data.length / limitPage));

                setUsers(result.data.slice((page - 1) * limitPage, page * limitPage));
                
                dispatch({
                    type: "CLICK_CHANGE",
                    isClick: false
                })
            })
            .catch((err) => {

            })
    }



    useEffect(() => {
        getData("https://shop24h-nodejs.herokuapp.com/product")
            .then((result) => {
                setNoPage(Math.ceil(result.data.length / limitPage));

                setUsers(result.data.slice((page - 1) * limitPage, page * limitPage));

            })
            .catch((err) => {
                console.error(err.message);
            })
    }, [varRefeshPage, page])


    return (
        <>
            <Header />
            <BreadCrumbComponent />
            <Container>
                <Grid container pt={4}>
                    <Grid item xs={3}>
                        < ProductFilter />
                    </Grid>
                    <Grid item xs={9} textAlign="center" container  spacing={1} rowSpacing={2}>
                        {
                            !(users.length === 0) ? users.map((row, index) => {
                                return <Grid item xs={4} key={index}  >
                                    <a href={`/product/` + row._id}>
                                        <img src={row.imageUrl} style={{ width: "80%" }} loading="lazy" alt="" />
                                    </a>
                                    <p style={{ fontWeight: "bold" }}>{row.name}</p>
                                    <span style={{ textDecoration: "line-through", fontWeight: "bold" }}>{"$" + row.buyPrice}</span > <span style={{ color: "red", fontWeight: "bold" }}>{"$" + row.promotionPrice}</span>
                                </Grid>
                            })
                                : <div textAlign="center" style={{ width:"100%"} } >
                                    <h3 >Không tìm thấy kết quả</h3>
                                </div>
                        }
                        <Grid item xs={12} justifyContent="flex-end" mt={4} mb={6}>
                            <Stack spacing={2} >
                                <Pagination count={noPage} color="primary" sx={{ marginLeft: "250px" }} defaultPage={page} onChange={changePageHandler} />
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    )
}
export default DanhMuc;