import { Box, Button, Modal, Grid, TextField } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";


function OrderModal() {
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

    const { openOrderModal } = useSelector((reduxData) => reduxData.modal);
    const handleModalClose = () => {
        dispatch({
            type: "ORDER_MODAL",
            payload: {
                openOrderModal: false
            }
        })
    }


    return (
        <>
            <Modal open={openOrderModal} onClose={handleModalClose}>
                <Box style={style}>
                    <Grid container>
                        <Grid item xs={10} sx={{ margin: "0 auto", paddingBottom: "7px" }} textAlign="center">
                            <h2>THÔNG TIN ĐƠN HÀNG</h2>
                        </Grid>
                        <Grid item xs={10} sx={{ margin: "0 auto", paddingBottom: "7px" }} textAlign="center">
                            <TextField id="outlined-basic" label="Tên khách hàng" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={10} sx={{ margin: "0 auto", paddingBottom: "7px" }} textAlign="center">
                            <TextField id="outlined-basic" label="Số điện thoại" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={10} sx={{ margin: "0 auto", paddingBottom: "7px" }} textAlign="center">
                            <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={10} sx={{ margin: "0 auto", paddingBottom: "7px" }} textAlign="center">
                            <TextField id="outlined-basic" label="Địa chỉ" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={10} sx={{ margin: "0 auto", paddingBottom: "7px" }} textAlign="center">
                            <TextField id="outlined-basic" label="Thành phố" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={10} sx={{ margin: "0 auto", paddingBottom: "7px" }} textAlign="center">
                            <TextField id="outlined-basic" label="Quốc gia" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={10} sx={{ margin: "0 auto", paddingBottom: "7px" }} textAlign="center">
                            <TextField id="outlined-basic" label="Lời nhắn" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={10} sx={{ margin: "0 auto", paddingBottom: "7px" }} textAlign="center">
                            <h3>Giá thanh toán:</h3>
                        </Grid>
                        <Grid item xs={10} sx={{ margin: "0 auto", paddingBottom: "7px" }} justifyContent="space-between" container>
                            <Grid item xs={4} textAlign>
                                <Button variant="contained" color="success" fullWidth>
                                    Success
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button variant="contained" color="error" fullWidth>
                                    Error
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