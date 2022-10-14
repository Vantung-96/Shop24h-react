import { Container, Table, TableHead, TableRow, TableCell, TableContainer, Paper, Grid, TableBody, Button, } from "@mui/material";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import LogInModal from "../components/Content/LogInModal/LoginModal";
import { useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase";
import { useDispatch } from 'react-redux';
import SnackbarAlert from "../components/Snackbar/SnackBarAlert";
import OrderModal from "../components/OrderModal/OrderModal";

function Cart() {
    const [order, setOrder] = useState([]);
    const [itemTotal, setItemTotal] = useState(0);
    const [selectItem, setSelectItem] = useState([])
    const [user, setUsers] = useState([]);
    const dispatch = useDispatch();

    // Add/Remove checked item from list
    // Choose All
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
    // Choose One item
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
    // Minus Amount
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
    // Add Mount
    const onBtnAddAmountClick = (param) => {
        order.forEach((element, index) => {
            if (element.id === param.id) {
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
    // Delete Order
    const onDeleteOrderClick = (id) => {
        var newOrder = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [];
        newOrder.splice(id, 1);
        localStorage.setItem("order", JSON.stringify(newOrder));
        setOrder(newOrder);
    }

    // BTn Order Click
    const onBtnOrderClick = () => {
        if (itemTotal > 0) {
            if (user) {
                dispatch({
                    type: "ORDER_MODAL",
                    payload:{
                        openOrderModal: true
                    }
                })
            }
            else {
                dispatch({
                    type: "OPEN_LOGIN_MODAL",
                    payload: {
                        openModalLogin: true
                    }
                })
            }
        }
        else {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString:"Vui lòng chọn vật phẩm muốn thanh toán !!!"
                }
            })
        }

    }



    useEffect(() => {
        setOrder(localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [])
        auth.onAuthStateChanged((result) => {
            setUsers(result);
        })
    }, [])

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
                                <TableCell textAlign="center" sx={{ width: "15%" }}>Đơn Giá</TableCell>
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
                    <Grid item xs={7} textAlign="center" >
                        <h2>Tổng thanh toán ({itemTotal} $):</h2>
                    </Grid>
                    <Grid item xs={3} textAlign="right">
                        <Button variant="contained" fullWidth onClick={onBtnOrderClick}>ĐẶT HÀNG</Button>
                    </Grid>
                </Grid>
                <LogInModal />
                <SnackbarAlert/>
                <OrderModal/>
            </Container>
            <Footer />
        </>
    );
}
export default Cart;