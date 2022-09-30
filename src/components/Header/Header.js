import { Button, Container, Grid, Typography, Link, Menu, MenuItem, Avatar } from "@mui/material";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PersonIcon from '@mui/icons-material/Person';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState, useEffect } from "react";
import LogInModal from "../Content/LogInModal/LoginModal";
import { auth, googleProvider } from "../../firebase";
import { headerPosition, logo, textDecoration, styleButon, buttonSpace } from './Headercss.js';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function Header() {
    const dispatch = useDispatch();
    const {cartSize} = useSelector((reduxData) => reduxData.cart);
    const [openModalLogin, setOpenModalLogin] = useState(false);
    const [user, setUser] = useState(null);
    const handleClose = () => setOpenModalLogin(false);
    const handleCloseItem = () => setAnchorEl(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
   
   
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const onLogInClick = () => {
        setOpenModalLogin(true);
    }
    
    const onLogInGoogle = () => {
        auth.signInWithPopup(googleProvider)
            .then((result) => {
                setUser(result.user);
                handleClose();
                setAnchorEl(null)
            })
            .catch((error) => {
                console.log(error);
            })

    }
    const logoutGoogle = () => {
        auth.signOut()
            .then(() => {
                setUser(null);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    useEffect(() => {
        auth.onAuthStateChanged((result) => {
            console.log(result);

            setUser(result);
        })
        const listOrder = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : [];    
        dispatch({
            type: "ADD_TO_CART",
            size: listOrder.length
        })   
    }, [])


    return (
        <div >
            <Grid container style={headerPosition}>
                <Grid item xs={6} pl={15}>
                    <Typography style={logo} ml={6}><Link style={textDecoration} href="/">Shop24h</Link></Typography>
                    <Button variant="outline" style={buttonSpace} ><Link href="/product" style={textDecoration}>Tất cả sản phẩm</Link></Button>
                </Grid>
                <Grid item xs={6} textAlign="center"  rowSpacing={2} sx={{marginTop:"10px"}} >

                    {
                        user ? <>
                            <Button style={styleButon}  ><NotificationsActiveIcon /></Button>
                            <Button style={styleButon} sx={{width:"20%"}} href="/cart"><AddShoppingCartIcon />Giỏ hàng <code style={{color:"red", marginBottom:"5px"}}>{cartSize !== 0 ? "("+cartSize+")": null }</code></Button>
                            <Button onClick={handleClick} sx={{ marginTop: "-5px" }} textAlign="left" ><Avatar alt="avatar" src={user.photoURL} sx={{ width: "17%", height: "17%" }} /><span>{"\u00a0"}{user.displayName}</span></Button>
                            <Menu
                                
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleCloseItem}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={logoutGoogle}>Logout</MenuItem>
                            </Menu>
                        </> : <>
                            <Button style={styleButon} onClick={() => { onLogInClick() }} ><PersonIcon />Đăng nhập</Button>
                            <Button style={styleButon} href="/cart"><AddShoppingCartIcon />Giỏ hàng <code style={{ marginBottom:"5px" , border:"1px solid", borderRadius:"15px", backgroundColor:"red" , padding:"0px 8px"}}>{cartSize !== 0 ? cartSize: null }</code></Button>
                        </>
                    }
                </Grid>
            </Grid>
            <LogInModal openModalLogin={openModalLogin} setOpenModalLogin={setOpenModalLogin} handleClose={handleClose} onLogInGoogle={onLogInGoogle} />
        </div>
    )
}
export default Header;