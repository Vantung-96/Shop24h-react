import { Container, Table, TableHead, TableRow, TableCell, TableContainer, Paper, Grid, TableBody, Button, } from "@mui/material";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

import { useEffect, useState } from "react";

function Cart() {
    const [order, setOrder] = useState([]);
    const [itemTotal, setItemTotal] = useState(0);
    const [selectItem, setSelectItem] = useState([])


    // Add/Remove checked item from list
    const onSelectAllItem = (e) => {
        let total = 0;
        let arraySelectedItem = [];
        if (e.target.checked) {
            order.forEach((element, index) => {
                total += element.price * element.amout
                arraySelectedItem.push(element)
                document.getElementById(element.id).checked = true
            })
        }
        else {
            order.forEach((element, index) => {
                document.getElementById(element.id).checked = false
            })
            total = 0;
            arraySelectedItem = []
        }
        setItemTotal(total);
        setSelectItem(arraySelectedItem);
    };

    const onSelectItem = (event) => {
        let total = itemTotal;
        let arraySelectedItem = selectItem;
        order.forEach((element, index) => {
            if (element.id === event.target.value) {
                if (event.target.checked) {
                    total += element.price * element.amout;
                    arraySelectedItem.push(element);
                }
                if (!event.target.checked) {
                    total -= element.price * element.amout;
                    arraySelectedItem.splice(index, 1);
                    document.getElementById("select-all-item").checked = false
                }
            }
        })
        setItemTotal(total);
        setSelectItem(arraySelectedItem);
    }

    const onBtnMinusAmountClick = (param) => {

        order.forEach((element, index) => {
            if (element.id === param.id) {
                element.amout = param.amout - 1;
                if (itemTotal > 0 && element.amout >= 0 && Boolean(selectItem.find(item => item.id === element.id)) === true) {
                    let newTotal = itemTotal - param.info.promotionPrice;
                    setItemTotal(newTotal);
                }
                if (element.amout <= 0) {
                    order.splice(index, 1);
                }
            }

        })
        localStorage.setItem("order", JSON.stringify(order));
    }
    const onBtnAddAmountClick = (param) => {
        order.forEach((element, index) => {
            if(element.id === param.id) {
                if (itemTotal > 0 && element.amount <= param.amount && Boolean(selectItem.find(item => item.id === element.id)) === true) {
                    let newTotal = itemTotal + param.promotionPrice;
                    setItemTotal(newTotal);
                }
                if (element.amout >= param.amount) {
                    element.amout = param.amount
                }
                else {
                    element.amout = param.amout + 1;
                }
            }
        })
        localStorage.setItem("order", JSON.stringify(order));
    }




    const onDeleteOrderClick = (id) => {
        var newOrder = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [];
        newOrder.splice(id, 1);
        localStorage.setItem("order", JSON.stringify(newOrder));
        setOrder(newOrder);
    }

   

    useEffect(() => {
        setOrder(localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [])

    })

    return (
        < >
            <Header />
            <Container sx={{ paddingTop: "5rem", paddingBottom: "30rem" }}>
                <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 650 }} aria-label=" table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="allSelect"
                                        id="select-all-item"
                                        onChange={onSelectAllItem}
                                    />
                                </TableCell>
                                <TableCell sx={{ width: "35%" }}>Sản Phẩm</TableCell>
                                <TableCell textAlign="center"sx={{ width: "15%" }}>Đơn Giá</TableCell>
                                <TableCell textAlign="center" sx={{ width: "15%" }}>Số Lượng</TableCell>
                                <TableCell textAlign="center" sx={{ width: "20%" }}>Số Tiền</TableCell>
                                <TableCell textAlign="center" sx={{ width: "15%" }}>Thao Tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                order.map((row, index) => {
                                    return <TableRow key={index}>
                                        <TableCell>
                                            <input
                                                type="checkbox"
                                                name={row.id}
                                                value={row.id}
                                                id={row.id}
                                                onChange={onSelectItem}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ width: "35%" }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={4}>
                                                    <img src={row.url} alt={index} style={{ maxWidth: "40%" }} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <h4>{row.name}</h4>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell textAlign="center" >{row.price} $</TableCell>
                                        <TableCell textAlign="center" style={{ display: "flex", border: "none", paddingTop: "30px", alignItems: "center" }}>
                                            <button onClick={() => onBtnMinusAmountClick(row)}>-</button>{"\u00a0"}{row.amout}{"\u00a0"}<button onClick={() => onBtnAddAmountClick(row)}>+</button>
                                        </TableCell>
                                        <TableCell textAlign="center" sx={{ width: "20%" }}>{row.price * row.amout} $</TableCell>
                                        <TableCell textAlign="center"><Button onClick={() => { onDeleteOrderClick(index) }}>Xóa</Button></TableCell>
                                    </TableRow>

                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container mt={4}>
                    <Grid item xs={2} pl={2}>
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="allSelect"
                            id="select-all-item"
                            onChange={onSelectAllItem}
                        />
                        Chọn tất cả ({order.length})
                    </Grid>
                    <Grid item xs={7} textAlign="center" style={{ marginTop: "2px" }}>
                        <h2>Tổng thanh toán ({itemTotal} $):</h2>
                    </Grid>
                    <Grid item xs={3} textAlign="right">
                        <Button variant="contained" fullWidth>ĐẶT HÀNG</Button>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}
export default Cart;