import { Container, Grid ,Button } from "@mui/material";
import { useDispatch } from "react-redux";
import '../Footer/Footer.css'

function ProductFilter() {
    const dispatch = useDispatch();  
    const minInputChange = (e) =>{
        dispatch({
            type:"MIN_INPUT_CHANGE",
            minInput:  e.target.value
        })
    }
    const maxInputChange = (event) =>{
        dispatch({
            type:"MAX_INPUT_CHANGE",
            maxInput: event.target.value
        })
    }
    const nameFilterChange = (event) =>{
        dispatch({
            type:"NAME_INPUT_CHANGE",
            nameInput: event.target.value
        })
    }
    
    const onFilterClick = () =>{
        dispatch({
            type:"FILTER_CLICK",
            check: true
        })
    }



    return (
        <Container>
            <Grid container pb={2}>
                <Grid item xs={12} textAlign="center">
                   <h3>Tìm kiếm</h3>
                </Grid>
                <Grid item xs={12} mt={3}>
                    <ul>
                        <li className="text-type">Tìm theo giá</li>
                        <li ><input placeholder="Min Price" onChange={minInputChange} type="number" />  <input placeholder="Max Price" onChange={maxInputChange} type="number" /></li>
                        
                    </ul>
                </Grid>
                <Grid item xs={12} mt={3}>
                    <ul>
                        <li className="text-type">Tìm theo tên</li>
                        <li ><input placeholder="Search name" onChange={nameFilterChange}/> </li>
                        
                    </ul>
                </Grid>
                
                <Grid item xs={12} mt={3} textAlign="center">
                    <Button variant="contained" onClick={onFilterClick}>Tìm kiếm</Button>
                </Grid>
            </Grid>
        </Container>
    )
}
export default ProductFilter;