import { Route, Routes } from "react-router";
import DiscoverPage from "./pages/discover/DiscoverPage";
import LandingPage from "./pages/landing-page/LandingPage";
import SignIn from "./pages/signin-and-signup/sign-in/SignIn";
import SignUp from "./pages/signin-and-signup/sign-up/SignUp";
import MyUserProfile from "./pages/user/MyUserProfile";
import Favorites from "./pages/favorites/FavoritePage";
import ProductDetails from "./pages/product/product-details/ProductDetails";
import ProductEdit from "./pages/product/product-edit/ProductEdit";
import MyProductList from "./pages/product/product-list/MyProductList";

import ProductMessagesList from "./pages/messages/product/ProductMessagesList";
import ProductMessageBox from "./pages/messages/product/ProductMessageBox";

import PersonalMessagesList from "./pages/messages/personal/PersonalMessagesList";
import PersonalMessageBox from "./pages/messages/personal/PersonalMessageBox";
import { useUserInfo } from "./hooks/useUserInfo";
import NavbarNotAuthenticated from "./components/navbars/NavbarNotAuthenticated";
import NavbarAuthenticated from "./components/navbars/NavbarAuthenticated";
import CommunityPage from "./pages/community/CommunityPage";
import WalletPage from "./pages/wallet/WalletPage";
import WishListPage from "./pages/wishlist/WishListPage";
import ProductAdd from "./pages/product/product-add/ProductAdd";
import ProductAddDetails from "./pages/product/product-add/ProductAddDetails";
import OtherUserProfile from "./pages/user/OtherUserProfile";
import SearchMethodResult from "./pages/search/method/SearchMethodResult";
import CommunitySearch from "./pages/search/community/CommunitySearch";
import ProductsSearch from "./pages/search/products/ProductsSearch";
import ProductsSearchGenre from "./pages/search/products/ProductsSearchGenre";
import ProductsSearchPlatform from "./pages/search/products/ProductsSearchPlatform";
import AddCommunity from "./pages/community/AddCommunity";
import ProductBoost from "./pages/product/product-boost/ProductBoost";
import EditMyUserProfile from "./pages/user/EditMyUserProfile";
import CommunityDetails from "./pages/community/CommunityDetails";
import EditCommunity from "./pages/community/EditCommunity";
function App() {
  const { user } = useUserInfo();

  return user ? (
    <>
      <NavbarAuthenticated />
      <Routes>
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/search/method/:method" element={<SearchMethodResult />} />
        <Route path="/search/community/:query" element={<CommunitySearch />} />
        <Route path="/search/products/:query" element={<ProductsSearch />} />
        <Route
          path="/search/products/genre/:query"
          element={<ProductsSearchGenre />}
        />
        <Route
          path="/search/products/platform/:query"
          element={<ProductsSearchPlatform />}
        />

        <Route path="/users/my" element={<MyUserProfile />} />
        <Route path="/users/my/edit" element={<EditMyUserProfile />} />
        <Route path="/users/o/:uid" element={<OtherUserProfile />} />
        {/* <Route path="/users/:uid" element={<MyUserProfile />} /> */}
        <Route path="/favorites" element={<Favorites />} />

        <Route path="/products/list/my" element={<MyProductList />} />
        <Route path="/products/add/search" element={<ProductAdd />} />
        <Route
          path="/products/add/search/:productName"
          element={<ProductAddDetails />}
        />
        <Route path="/products/details/:pid" element={<ProductDetails />} />
        <Route path="/products/details/:pid/boost" element={<ProductBoost />} />
        <Route path="/products/edit/:pid" element={<ProductEdit />} />

        <Route path="/community" element={<CommunityPage />} />
        <Route path="/community/details/:cid" element={<CommunityDetails />} />
        <Route
          path="/community/details/:cid/edit"
          element={<EditCommunity />}
        />
        <Route path="/community/add" element={<AddCommunity />} />

        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/wishlist" element={<WishListPage />} />

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
