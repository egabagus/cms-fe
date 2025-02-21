import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./dashboard/Dashboard.tsx";
import ListPortfolios from "./dashboard/pages/portfolio/ListPortfolios.tsx";
import MainLayout from "./dashboard/layout/MainLayout.tsx";
import Login from "./dashboard/pages/auth/Login.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="portfolio" element={<ListPortfolios />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
