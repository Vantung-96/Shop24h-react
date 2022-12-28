import { Box, Button, Modal, Grid, TextField } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";


function OrderModal({ user, itemTotal, selectItems }) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        border: '0px solid #000',
        borderRadius: '5px',
        backgroundColor: "white",
        padding: "3%",
        width: "40%"
    };
    const dispatch = useDispatch();

    const { openOrderModal , selectItem } = useSelector((reduxData) => reduxData.modal);
    const handleModalClose = () => {
        dispatch({
            type: "ORDER_MODAL",
            payload: {
                openOrderModal: false
            }
        })
    }

    const [customerInfo, setCustomerInfo] = useState({
        fullName: user.displayName,
        phone: user.phone,
        email: user.email,
        address: user.address,
        city: user.city,
        country: user.country,
        orderItems: selectItem
    })
    const [newOrder, setNewOrder] = useState({
        note: "",
        orderDetail: customerInfo,
        cost: itemTotal
    })
    const onInputNameChange = (event) => {
        customerInfo.fullName = event.target.value
    }
    const onInputPhoneChange = (event) => {
        customerInfo.phone = event.target.value
    }
    const onInputEmailChange = (event) => {
        customerInfo.email = event.target.value
    }

    const onInputAddressChange = (event) => {
        customerInfo.address = event.target.value
    }
    const onInputCityChange = (event) => {
        customerInfo.city = event.target.value
    }
    const onInputCountryChange = (event) => {
        customerInfo.country = event.target.value
    }

    const onNoteInput = (event) => {
        newOrder.note = event.target.value
    }
    // fetch Api
    const fetchApi = async (param, paramOption = {}) => {
        const response = await fetch(param, paramOption);
        const data = await response.json();
        return data;
    }

    // Tao order
    const onConfirmCreateOrderClick = () => {
        //validate
        let validUser = validateOrder(customerInfo);
        if (validUser) {
            let content = {
                method: "POST",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(customerInfo)
            };
            fetchApi("https://shop-api24h.onrender.com/customer", content)
                .then((data) => {
                    console.log(data)
                    let body = {
                        note: newOrder.note,
                        orderDetail: data.data,
                        cost: newOrder.cost
                    }
                    //tạo content update customer
                    let content1 = {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(body)
                    }
                    fetchApi("https://shop-api24h.onrender.com/order", content1)
                        .then((data) => console.log(data))

                    dispatch({
                        type: "OPEN_SNACKBAR",
                        payload: {
                            openSnackbar: true,
                            alertString: "Đặt hàng thành công !!"
                        }
                    })
                    dispatch({
                        type: "ALERT_SEVERITY",
                        payload: {
                            alertSeverity: "success"
                        }
                    });
                    handleModalClose();

                    let localItem = JSON.parse(localStorage.getItem("order")) || [];
                    console.log(localItem)
                    console.log(selectItems)
                    localItem.map((element2, index2) => {
                        selectItems.map((element, index) => {
                            if (element.id === element2.id) {
                                localItem.splice(index2, 1)
                            }
                        })
                    })
                    localStorage.setItem("order", JSON.stringify(localItem));
                    window.location.reload();
                })

        }
    }

    // validate
    const validateOrder = (paramUser) => {
        if (paramUser.fullName === "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Tên người dùng đang trống"
                }
            })
            return false;
        }
        if (paramUser.phone === "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Số điện thoại đang trống"
                }
            })
            return false;
        }
        if (paramUser.email === "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Email đang trống"
                }
            })
            return false;
        }
        if (paramUser.address === "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Địa chỉ đang trống"
                }
            })
            return false;
        }

        if (paramUser.city === "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Thành phố đang trống"
                }
            })
            return false;
        }
        if (paramUser.country === "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Quốc gia đang trống"
                }
            })
            return false;
        }
        return true;
    }


    return (
        <>
            <Modal open={openOrderModal} onClose={handleModalClose}>
                <Box style={style}>
                    <Grid container>
                        <Grid item xs={10} sx={{ margin: "0 auto", paddingBottom: "7px" }} textAlign="center">
                            <h2>THÔNG TIN ĐƠN HÀNG</h2>
                        </Grid>
                        <Grid item xs={10} sx={{ margin: "0 auto", paddingBottom: "7px" }}  >
                            <TextField id="outlined-basic" label="Tên khách hàng" variant="outlined" fullWidth defaultValue={user.displayName} onChange={onInputNameChange} />
                        </Grid>
                        <Grid item xs={10} sx={{ margin: "0 auto", paddingBottom: "7px" }} >
                            <TextField id="outlined-basic" label="Số điện thoại" variant="outlined" fullWidth onChange={onInputPhoneChange} />
                        </Grid>
                        <Grid item xs={10} sx={{ margin: "0 auto", paddingBottom: "7px" }} >
                            <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth defaultValue={user.email} onChange={onInputEmailChange} />
                        </Grid>
                        <Grid item xs={10} sx={{ margin: "0 auto", paddingBottom: "7px" }} >
                            <TextField id="outlined-basic" label="Địa chỉ" variant="outlined" fullWidth onChange={onInputAddressChange} />
                        </Grid>
                        <Grid item xs={10} sx={{ margin: "0 auto", paddingBottom: "7px" }} >
                            <TextField id="outlined-basic" label="Thành phố" variant="outlined" fullWidth onChange={onInputCityChange} />
                        </Grid>
                        <Grid item xs={10} sx={{ margin: "0 auto", paddingBottom: "7px" }} >
                            <TextField id="outlined-basic" label="Quốc gia" variant="outlined" fullWidth onChange={onInputCountryChange} />
                        </Grid>
                        <Grid item xs={10} sx={{ margin: "0 auto", paddingBottom: "7px" }} >
                            <TextField
                                id="outlined-multiline-static"
                                label="Lời nhắn"
                                multiline
                                rows={4}
                                fullWidth
                                onChange={onNoteInput}
                            />
                        </Grid>
                        <Grid item xs={10} sx={{ margin: "0 auto", paddingBottom: "7px" }} >
                            <h3>Giá thanh toán: {itemTotal} $</h3>
                        </Grid>
                        <Grid item xs={10} sx={{ margin: "0 auto", paddingBottom: "7px" }} justifyContent="space-between" container>
                            <Grid item xs={4} textAlign>
                                <Button variant="contained" color="success" fullWidth onClick={onConfirmCreateOrderClick}>
                                    Dồng ý
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button variant="contained" color="error" fullWidth onClick={handleModalClose}>
                                    Hủy bỏ
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </>
    )
}

export default OrderModal;