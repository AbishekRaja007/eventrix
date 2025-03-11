import { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./components/common_components/AuthContext";
import PrivateRoutes from "./components/auth_components/PrivateRoutes";

import Homepage from "./pages/common_pages/Homepage";
import Header from "./components/header_components/Header";
import Footer from "./components/footer_components/Footer";
import PageNotFound from "./pages/common_pages/PageNotFound";
import ContactUs from "./pages/contact_pages/ContactUs";
import TopHeader from "./components/header_components/TopHeader";
import AboutUs from "./pages/common_pages/AboutUs";

// user pages.
import Login from "./pages/user_pages/Login";
import Register from "./pages/user_pages/Register";
import UserDashboard from "./pages/user_pages/UserDashboard";
import ForgotPassword from "./pages/user_pages/ForgotPassword";
import ResetPassword from "./pages/user_pages/ResetPassword";
import Profile from "./pages/user_pages/Profile";
import UpdateProfile from "./pages/user_pages/UpdateProfile";

// blog pages.
import AllBlogs from "./pages/blog_pages/AllBlogs";
import SingleBlog from "./pages/blog_pages/SingleBlog";

// newsletter
import NewsLetter from "./components/common_components/NewsLetter";

// ✅ Function to dynamically update the page title based on the current route
const TitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const getPageTitle = (pathname) => {
      if (pathname === "/" || pathname === "/home" || pathname === "/homepage")
        return "Homepage";
      if (pathname === "/contact-us") return "Contact Us";
      if (pathname === "/about-us") return "About Us";
      if (pathname === "/register") return "Register";
      if (pathname === "/login") return "Login";
      if (pathname.startsWith("/user-dashboard/")) return "User Dashboard";
      if (pathname.startsWith("/forgot-password/")) return "Forgot Password";
      if (pathname.startsWith("/reset-password/")) return "Reset Password";
      if (pathname.startsWith("/profile/")) return "Profile";
      if (pathname.startsWith("/all-blogs")) return "All Blogs";
      if (pathname.startsWith("/single-blog/")) return "Single Blog";
      return "Page Not Found";
    };

    document.title = `${getPageTitle(location.pathname)} - Allora`;
  }, [location.pathname]); // ✅ Runs only when pathname changes

  return null;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <TitleUpdater /> {/* ✅ Ensures the title updates dynamically */}
        <ToastContainer />
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/all-blogs" element={<AllBlogs />} />
          <Route path="/single-blog/:id" element={<SingleBlog />} />
          <Route path="/page-not-found" element={<PageNotFound />} />
          <Route path="/*" element={<PageNotFound />} />

          {/* Private Routes with Role-Based Access */}
          <Route
            path="/dashboard/:id"
            element={
              <PrivateRoutes>
                <UserDashboard />
              </PrivateRoutes>
            }
          />
          <Route
            path="/user-dashboard/:id"
            element={
              <PrivateRoutes>
                <UserDashboard />
              </PrivateRoutes>
            }
          />

          {/* user pages */}
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/reset-password" element={<ResetPassword />} />

          <Route
            path="/profile/:id"
            element={
              <PrivateRoutes>
                <Profile />
              </PrivateRoutes>
            }
          />

          <Route
            path="/update-profile/:id"
            element={
              <PrivateRoutes>
                <UpdateProfile />
              </PrivateRoutes>
            }
          />
        </Routes>
        <NewsLetter />
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
