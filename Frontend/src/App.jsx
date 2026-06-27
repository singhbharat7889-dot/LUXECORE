import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./NavBar/Navbar";
import Cart from "./Pages/Cart";
import Home from "./Pages/Home";
import UserLogin from "./Pages/UserLogin";
import UserRegister from "./Pages/UserRegister";
import Footer from "./Pages/Footer";
import BeautyPersonalCare from "./Category/BeautyPersonalCare";
import FashionApparel from "./Category/FashionApparel";
import ElectronicsGadgets from "./Category/ElectronicsGadgets";
import HomeKitchen from "./Category/HomeKitchen";
import HealthFitness from "./Category/HealthFitness";
import Shop from "./Pages/Shop";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchData } from "./Slice/ProductSlice";
import { fetchCartData } from "./Slice/CartSlice";
import ProductPage from "./Pages/ProductPage";
import ProductForm from "./Admin/ProductForm";
import Product from "./Admin/Product";
import EditProduct from "./Admin/EditProduct";
import AdminRoute from "./Admin/AdminRoutes";
import UserProfile from "./Pages/UserProfile";
import UserLayout from "./Layout/UserLayout";
import AdminLayout from "./Layout/AdminLayout";
import AdminNavbar from "./Admin/AdminNavbar";
import AdminDashboard from "./Admin/AdminDashboard";
import About from "./Pages/About";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch(fetchCartData());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/shop" element={<Shop />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/UserLogin" element={<UserLogin />} />
          <Route path="/UserRegister" element={<UserRegister />} />
          <Route path="/BeautyPersonalCare" element={<BeautyPersonalCare />} />
          <Route path="/FashionApparel" element={<FashionApparel />} />
          <Route path="/ElectronicsGadgets" element={<ElectronicsGadgets />} />
          <Route path="/HomeKitchen" element={<HomeKitchen />} />
          <Route path="/HealthFitness" element={<HealthFitness />} />
          <Route path="/ProductPage/:id" element={<ProductPage />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/Aboutus" element={<About />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route
            path="/ProductForm"
            element={
              <AdminRoute>
                {" "}
                <ProductForm />
              </AdminRoute>
            }
          />
          <Route
            path="/EditProduct/:id"
            element={
              <AdminRoute>
                {" "}
                <EditProduct />
              </AdminRoute>
            }
          />
          <Route
            path="/Product"
            element={
              <AdminRoute>
                {" "}
                <Product />
              </AdminRoute>
            }
          />
          <Route
            path="/AdminNavbar"
            element={
              <AdminRoute>
                {" "}
                <AdminNavbar />
              </AdminRoute>
            }
          />
          <Route
            path="/AdminDashboard"
            element={
              <AdminRoute>
                {" "}
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
