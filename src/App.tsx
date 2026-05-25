import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import About from "./pages/About";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import { useMenuItems } from "./Hooks/MenuItems";
import "./App.css";

function App() {

  const { menuItems, loading, error } = useMenuItems();

  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={<Home menuItems={menuItems} loading={loading} error={error} />}
        />
        <Route
          path="/menu"
          element={<Menu menuItems={menuItems} loading={loading} error={error} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
