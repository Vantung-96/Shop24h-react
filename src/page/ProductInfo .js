
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import BreadCrumbComponent from "../components/breadCrumb/BreadCrumb ";
import ProductDetail from "../components/Content/ProductDetail/ProductDetail";

function ProductInfo() {
    return (
        <>
            <Header />
            <BreadCrumbComponent />
            <ProductDetail />
            <Footer />
        </>
    )
}
export default ProductInfo;