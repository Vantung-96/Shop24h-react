import { Button, Grid } from "@mui/material";
import React, { Component } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './Carousel.css';

export default class Carousel extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2500,

    };
    return (
      <div style={{ padding: "5rem 0", position: "relative" }}>

        <Slider {...settings} style={{}} >

          <div>
            <Grid container >
              <Grid item xs={7} textAlign="left" pl={8} pt={13}>
                <p className="slide-text">DareU EH416 RGB</p>
                <p className="slide-title">DareU EH416 RGB</p>
                <p className="slide-info">AKG là hãng âm thanh có tên tuổi gắn liền với nhiều dòng tai nghe kiểm âm, trong đó, AKG N90Q nhận được nhiều sự yêu thích từ người dùng và gây ấn tượng với chất lượng hoạt động. Bài viết ngày hôm nay sẽ đem đến cho các bạn độc giả đôi điều về sản phẩm này cũng như địa chỉ mà độc giả có nhu cầu mua sắm có thể tin tưởng khi mua. </p>
                <Button variant="contained" sx={{ backgroundColor: "#96D6FF" }}>Xem thêm</Button>
              </Grid>
              <Grid item xs={5}>
                <img src="https://lh3.googleusercontent.com/Ov-36ktIyuTLRbOLQwcD9rCUc44fMhNMowoeWOWVV33kJ4A9LTcuODVMyRcHNIjy9OoNnaWX8gp3-_rXs8EN=w500-rw" style={{ width: "100%", display: "inline" }} loading="lazy" alt="1" />
              </Grid>
            </Grid>
          </div>

          <div>
            <Grid container >
              <Grid item xs={7} textAlign="left" pl={8} pt={13}>
                <p className="slide-text">Olufsen Beoplay H7</p>
                <p className="slide-title">Tai Nghe Bang & Olufsen Beoplay H7</p>
                <p className="slide-info">BeoPlay H7 là mẫu tai nghe Bluetooth là thành quả của sự hợp tác giữa nhà sản xuất thiết bị âm thanh hàng hiệu Đan Mạch Bang & Olufsen (B&O) và nhà thiết kế Jakob Wagner.
                  Về ngoại hình, BeoPlay H7 trông khá sang trọng nhưng cũng không kém phần trẻ trung với thiết kế vòm chụp đầu đơn giản, củ tai dùng vật liệu nhôm kết hợp cùng các tùy chọn đệm mút da thuộc nhiều màu sắc.</p>
                <Button variant="contained" sx={{ backgroundColor: "#96D6FF" }}>Xem thêm</Button>
              </Grid>
              <Grid item xs={5}>
                <img src="https://bizweb.dktcdn.net/thumb/large/100/451/485/products/tai-nghe-beoplay-h7-11.jpg?v=1654254492000" style={{ width: "100%", display: "inline" }} loading="lazy" alt="1" />
              </Grid>
            </Grid>
          </div>
          <div>
            <Grid container >
              <Grid item xs={7} textAlign="left" pl={8} pt={13}>
                <p className="slide-text">Sam sung</p>
                <p className="slide-title">Samsung Galaxy Buds Pro</p>
                <p className="slide-info">Chất lượng âm thanh mà Galaxy Buds Pro thể hiện đã trải qua tinh chỉnh từ các chuyên gia tới từ thương hiệu AKG. Nhờ đó, mọi âm sắc của chiếc tai nghe đều đem tới trải nghiệm trọn vẹn và sâu sắc.</p>
                <Button variant="contained" sx={{ backgroundColor: "#96D6FF" }}>Xem thêm</Button>
              </Grid>
              <Grid item xs={5}>
                <img src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcScdOUo2PpX3WCi5cD8PCB3BPx_6mt6xHY8Nv1LiEECxF5p93e2OiNao6_r5O7o2JcnxZonQFEmSQ&usqp=CAc" style={{ width: "100%", display: "inline" }} loading="lazy" alt="1" />
              </Grid>
            </Grid>
          </div>
          <div>
            <Grid container >
              <Grid item xs={7} textAlign="left" pl={8} pt={13}>
                <p className="slide-text">Sony</p>
                <p className="slide-title">Sony IER M9</p>
                <p className="slide-info">

                  Tai nghe Sony IER M9 là 1 trong 2 dòng tai nghe in-ear cao cấp, chất lượng âm thanh cân bằng trong trẻo, chính xác đến từng nốt nhạc để phục vụ cho nhu cầu nghe nhạc và kiểm âm.</p>
                <Button variant="contained" sx={{ backgroundColor: "#96D6FF" }}>Xem thêm</Button>
              </Grid>
              <Grid item xs={5}>
                <img src="https://fitgearshop.vn/files/product/tai-nghe-sony-ier-m9-r6z7vxfd.jpg" style={{ width: "100%", display: "inline" }} loading="lazy" alt="1" />
              </Grid>
            </Grid>
          </div>

        </Slider>
      </div>
    );
  }
}