import { Routes, Route, useLocation } from "react-router-dom";
import HeaderRow from "./components/header/HeaderRow";
import Home from "./pages/Home";
import OurStory from "./pages/OurStory";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import { useMenuItems } from "./hooks/useMenuItems";
import { useIsWideViewport } from "./hooks/useIsWideViewport";

function App() {
  const { menuItems, loading, error } = useMenuItems();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isWideViewport = useIsWideViewport();
  const showSiteHeader = !isHome || !isWideViewport;

  return (
    <>
      {showSiteHeader && <HeaderRow />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/menu"
          element={
            <Menu menuItems={menuItems} loading={loading} error={error} />
          }
        />
        <Route path="/about" element={<OurStory />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
