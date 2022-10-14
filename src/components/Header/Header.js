
import './Header.css';
import Logo from "../../app/image/Logo.jfif"
import { Button, Grid,  Link, Menu, MenuItem, Avatar } from "@mui/material";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PersonIcon from '@mui/icons-material/Person';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState, useEffect } from "react";
import LogInModal from "../Content/LogInModal/LoginModal";
import { auth, googleProvider } from "../../firebase";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function Header() {
    const dispatch = useDispatch();
    const { cartSize } = useSelector((reduxData) => reduxData.cart);
    const [openModalLogin, setOpenModalLogin] = useState(false);
    const [user, setUser] = useState(null);
    const handleClose = () => setOpenModalLogin(false);
    const handleCloseItem = () => setAnchorEl(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [itemList, setItemList] = useState(0);
    const open = Boolean(anchorEl);




    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const onLogInClick = () => {
        dispatch({
            type:"OPEN_LOGIN_MODAL",
            payload:{
                openModalLogin: true
            }
        })
        setAnchorEl(null)
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
    useEffect(() =>{
        const listOrder = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : [];
        setItemList(listOrder.length);
    })
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
        setItemList(listOrder.length);
        
    }, [])


    return (
        <div className='headerPosition'>
            <Grid container >
                <Grid item xs={5} pl={15}>
                    <Link href="/">
                        <img src={Logo}  alt={"logo"} className="imgResponsive"/>
                    </Link>
                </Grid>
                <Grid item xs={7} textAlign="center" rowSpacing={2} sx={{margin:"auto"}} className="test">

                    {
                        user ? <>
                            <Button sx={{ color: "white" }} className="iconResp"><NotificationsActiveIcon /></Button>
                            <Button sx={{ width: "20%", color: "white" }} className="cart" href="/cart" ><AddShoppingCartIcon />Giỏ hàng <code style={{ marginBottom: "5px", borderRadius: "15px", backgroundColor: "red", padding: "0px 8px" }}>{itemList !== 0 ? itemList : null}</code></Button>
                            <Button onClick={handleClick} sx={{ marginTop: "-5px", color: "white" }} textAlign="left" className="userResp"><Avatar alt="avatar" src={user.photoURL} sx={{ width: "20%", height: "20%" }} /><span>{"\u00a0"}{user.displayName}</span></Button>
                            <Menu
                                sx={{ marginLeft: "60px" }}
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
                        </>
                            :
                            <>
                                <Button onClick={onLogInClick} sx={{ color: "white" }} ><PersonIcon />Đăng nhập</Button>
                                <Button href="/cart" sx={{ color: "white" }}><AddShoppingCartIcon />Giỏ hàng <code style={{ marginBottom: "5px", borderRadius: "15px", backgroundColor: "red", padding: "0px 8px" }}>{itemList !== 0 ? itemList : null}</code></Button>
                            </>
                    }
                </Grid>
            </Grid>
            <LogInModal  />
        </div>
    )
}
export default Header;