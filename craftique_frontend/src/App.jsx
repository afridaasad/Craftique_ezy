import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ROUTES from "./routes/routes";
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPassword from "./pages/ForgotPassword";
import ForgotPasswordSecurity from "./pages/ForgotPasswordSecurity";
import RoleRedirect from "./routes/RoleRedirect";

import BuyerDashboard from "./pages/buyer/Dashboard";
import AllProducts from "./pages/buyer/AllProducts";
import BuyerOrders from "./pages/buyer/Orders";
import WishlistPage from "./pages/buyer/Wishlist";
import CartPage from "./pages/buyer/Cart";
import BuyerProfile from "./pages/buyer/Profile";
import ProductDetailsPage from "./pages/buyer/ProductDetailsPage";
import ArtisanDashboard from "./pages/artisan/Dashboard";
import AddProduct from "./pages/artisan/AddProduct";
import ListingGuidelines from "./pages/artisan/ListingGuidelines";
import ArtisanProducts from "./pages/artisan/Products";
import ArtisanOrders from "./pages/artisan/Orders";
import ArtisanPayments from "./pages/artisan/Payments";
import ArtisanAnalytics from "./pages/artisan/Analytics";


import ArtisanProfile from "./pages/artisan/Profile";
import AdminDashboard from "./pages/admin/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoutes";

function App() {
  return (
    <Router>
      <Routes>

        {/* ✅ Public Routes */}
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTES.FORGOT_PASSWORD_SECURITY} element={<ForgotPasswordSecurity />} />
        <Route path={ROUTES.ROLE_REDIRECT} element={<RoleRedirect />} />
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ABOUT} element={<AboutUs />} />
        <Route path={ROUTES.CONTACT} element={<ContactUs />} />

        {/* ✅ Buyer Protected Routes */}
        <Route
          path={ROUTES.BUYER.DASHBOARD}
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <BuyerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.BUYER.PRODUCTS}
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <AllProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.BUYER.ORDERS}
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <BuyerOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.BUYER.WISHLIST}
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <WishlistPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.BUYER.CART}
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.BUYER.PROFILE}
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <BuyerProfile />
            </ProtectedRoute>
          }
        />
        <Route
  path="/buyer/product/:id"
  element={
    <ProtectedRoute allowedRoles={["buyer"]}>
      <ProductDetailsPage />
    </ProtectedRoute>
  }
/>

        {/* ✅ Artisan Protected Route */}
        <Route
          path={ROUTES.ARTISAN.DASHBOARD}
          element={
            <ProtectedRoute allowedRoles={["artisan"]}>
              <ArtisanDashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path={ROUTES.ARTISAN.PROFILE}
  element={
    <ProtectedRoute allowedRoles={["artisan"]}>
      <ArtisanProfile />
    </ProtectedRoute>
  }
/>
<Route
  path= {ROUTES.ARTISAN.ADD_PRODUCT}
  element={
    <ProtectedRoute allowedRoles={["artisan"]}>
      <AddProduct />
    </ProtectedRoute>
  }
/>
<Route
  path= {ROUTES.ARTISAN.LISTING_GUIDELINES}
  element={
    <ProtectedRoute allowedRoles={["artisan"]}>
      <ListingGuidelines />
    </ProtectedRoute>
  }
/>
<Route
  path={ROUTES.ARTISAN.PRODUCTS}
  element={
    <ProtectedRoute allowedRoles={["artisan"]}>
      <ArtisanProducts />
    </ProtectedRoute>
  }
/>

<Route
  path={ROUTES.ARTISAN.ORDERS}
  element={
    <ProtectedRoute allowedRoles={["artisan"]}>
      <ArtisanOrders />
    </ProtectedRoute>
  }
/>
<Route
  path= {ROUTES.ARTISAN.PAYMENTS}
  element={
    <ProtectedRoute allowedRoles={["artisan"]}>
      <ArtisanPayments />
    </ProtectedRoute>
  }
/>
<Route
  path={ROUTES.ARTISAN.ANALYTICS}
  element={
    <ProtectedRoute allowedRoles={["artisan"]}>
      <ArtisanAnalytics />
    </ProtectedRoute>
  }
/>    



        {/* ✅ Admin Protected Route */}
        <Route
          path={ROUTES.ADMIN.DASHBOARD}
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
