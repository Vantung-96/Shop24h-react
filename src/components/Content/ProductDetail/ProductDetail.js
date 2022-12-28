import { Button, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RelatedProduct from "../RelatedProduct/RelatedProduct";
import DescriptionDetail from "./DecriptionDetail";
import { useDispatch } from "react-redux";

function ProductDetail() {
    const dispatch = useDispatch();

    const [varRefeshPage, setVarRefeshPage] = useState(0);
    const [dataDetail, setDataDetail] = useState([]);

    const [count, setCount] = useState(1);
    const [noitice , setNoitice] = useState(false);
    const onSubtractionClick = () => {
        if (count > 1) {
            setCount(count - 1);
            setNoitice(false)
        }
        else {
            setCount(1);
        }
    }
    const onAdditionClick = () => {
        let maxAmount = dataDetail.amount;
        let addCount = count +1;
        if(addCount <= maxAmount){
            setCount(addCount);
            setNoitice(false);
        }
        else {
            setCount(maxAmount);
            setNoitice(true);

        }

    }
    const addCartClick = () => {
        const listOrder = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : [];
        const duplicate = listOrder.filter(cartItem => cartItem.id === dataDetail._id);
        if ((duplicate.length === 0 && listOrder.length === 0) || (duplicate.length === 0 && listOrder.length !== 0)) {
           
            var productAdd = {
                id: dataDetail._id,
                url: dataDetail.imageUrl,
                name: dataDetail.name,
                price: dataDetail.promotionPrice,
                amout: count
            }
            listOrder.push(productAdd)
            localStorage.setItem("order", JSON.stringify(listOrder));
        }

        if (duplicate.length !== 0 && listOrder.length !== 0) {
            const product = {
                id: duplicate[0].id,
                url: duplicate[0].url,
                name: duplicate[0].name,
                price: duplicate[0].price,
                amout: count + duplicate[0].amout
            }
            let number = listOrder.indexOf(duplicate[0]);

            listOrder.splice(number, 1);
            listOrder.push(product);
            localStorage.removeItem('order');
            localStorage.setItem("order", JSON.stringify(listOrder));
        }
        dispatch({
            type: "ADD_TO_CART",
            size: listOrder.length
        })

    }


    const getData = async (url, body = {}) => {
        const response = await fetch(url, body);
        const data = await response.json();
        return data;
    }

    const { productId } = useParams();

    useEffect(() => {
        getData("https://shop-api24h.onrender.com/product/" + productId)
            .then((data) => {
                setDataDetail(data.data);

            })
        
        

    }, [varRefeshPage])

    return (
        <Container>
            <Grid container>
                <Grid item xs={5}>
                    <img src={dataDetail.imageUrl} alt="1" width="90%" />
                </Grid>
                <Grid item xs={7} pl={3}>
                    <h1>{dataDetail.name}</h1>

                    <p>✔️Chất liệu nhựa cao cấp tổng hợp ABS + PC + SILLICON bền bỉ và an toàn<br />
                        ✔️ Kết nối Bluetooth nhanh chóng, tiện lợi, dễ dàng<br />
                        ✔️ Thiết kế gọn nhẹ, thông minh, thời trang<br />
                    </p>
                    <p>Số lượng: {dataDetail.amount}</p>
                    <span style={{ textDecoration: "line-through", fontWeight: "bold" }}>{"$" + dataDetail.buyPrice}</span > <span style={{ color: "red", fontWeight: "bold" }}>{"$" + dataDetail.promotionPrice}</span>
                    <div style={{ margin: "20px 0px" }}>
                        <Button onClick={onSubtractionClick}>-</Button>{' '}<span>{count}</span>{' '}<Button onClick={onAdditionClick} >+</Button>
                        {
                            noitice
                            ?
                            <p style={{color:"red"}}> Giới hạn : {dataDetail.amount}</p>
                            :
                            null

                        }

                    </div>
                    <div>
                        <Button variant="contained" onClick={addCartClick}>ADD TO CART</Button>
                    </div>
                </Grid>
            </Grid>
            <DescriptionDetail />

            <RelatedProduct />
        </Container>
    )
}
export default ProductDetail;