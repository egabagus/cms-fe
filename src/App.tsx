import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./dashboard/Dashboard.tsx";
import ListPortfolios from "./dashboard/pages/portfolio/ListPortfolios.tsx";
import MainLayout from "./dashboard/layout/MainLayout.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/portfolio" element={<ListPortfolios />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
