import { Route, Routes } from "react-router";
import DiscoverPage from "./pages/discover/DiscoverPage";
import LandingPage from "./pages/landingpage/LandingPage";

function App() {
  return (
    <Routes>
      <Route element={<LandingPage />} path="/" />
      <Route element={<DiscoverPage />} path="/discover" />
    </Routes>
  );
}

export default App;
