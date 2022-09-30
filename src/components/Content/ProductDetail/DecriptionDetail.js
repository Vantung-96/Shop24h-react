import { Button, Container, Grid } from "@mui/material";


function DescriptionDetail() {
    return (
        <Container>
            <Grid container mt={4} justifyContent="center">
                <h1>Description</h1>
                <p>
                    Có nhiều loại tai nghe Bluetooth ở phân khúc giá khác nhau để bạn thoải mái lựa chọn.
                    Tuy nhiên kích thước tai của mỗi người là khác nhau nên bạn cần lựa chọn loại tai nghe phù hợp nhất.
                    Cùng Nguyễn Kim khám phá ngay các loại tai nghe Bluetooth hiện nay và cách đeo tai nghe Bluetooth đúng nhất nhé!

                    Chống ồn vượt trội
                    Sony WH-XB910N/LZE sử dụng công nghệ cảm biến giảm ồn kép hạn chế tối đa tiếng ồn từ bên ngoài,
                    giúp bạn đắm chìm trong không gian riêng, thưởng thức trọn vẹn các bản nhạc,
                    thoải mái trò chuyện cùng bạn bè mà không sợ bị tạp âm bên ngoài ảnh hưởng.

                </p>
                <img src="https://cdn.cellphones.com.vn/media/wysiwyg/accessories/earphone/sony-wh-1000xm4-3.jpg" alt="img" width="100%" />
                <Grid item  mt={5} mb={5}>
                    <Button variant="contained" color="success" sx={{width: "200px"}} >Xem thêm</Button>
                </Grid>
            </Grid>
        </Container>
    )
}
export default DescriptionDetail;