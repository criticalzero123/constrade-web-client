import { Route, Routes } from "react-router";
import DiscoverPage from "./pages/discover/DiscoverPage";
import LandingPage from "./pages/landing-page/LandingPage";
import SignIn from "./pages/signin-and-signup/sign-in/SignIn";
import SignUp from "./pages/signin-and-signup/sign-up/SignUp";
import UserProfile from "./pages/user/UserProfile";
import Favorites from "./pages/favorites/FavoritePage";
import ProductDetails from "./pages/product/product-details/ProductDetails";
import ProductList from "./pages/product/product-list/ProductList";
import ProductEdit from "./pages/product/product-edit/ProductEdit";

import ProductMessagesList from "./pages/messages/product/ProductMessagesList";
import ProductMessageBox from "./pages/messages/product/ProductMessageBox";

import PersonalMessagesList from "./pages/messages/personal/PersonalMessagesList";
import PersonalMessageBox from "./pages/messages/personal/PersonalMessageBox";
import { useUserInfo } from "./hooks/useUserInfo";
import NavbarNotAuthenticated from "./components/navbars/NavbarNotAuthenticated";
import NavbarAuthenticated from "./components/navbars/NavbarAuthenticated";
function App() {
  const { user } = useUserInfo();

  return user ? (
    <>
      <NavbarAuthenticated />
      <Routes>
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/users/:uid" element={<UserProfile />} />
        <Route path="/favorites" element={<Favorites />} />

        <Route path="/products/details/:pid" element={<ProductDetails />} />
        <Route path="/products/list/:uid" element={<ProductList />} />
        <Route path="/products/edit/:pid" element={<ProductEdit />} />

        <Route path="/messages/p" element={<ProductMessagesList />}>
          <Route path=":pid" element={<ProductMessageBox />} />
        </Route>

        <Route path="/messages/u" element={<PersonalMessagesList />}>
          <Route path=":uid" element={<PersonalMessageBox />} />
        </Route>

        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </>
  ) : (
    <>
      <NavbarNotAuthenticated />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />

        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </>
  );
}

export default App;
