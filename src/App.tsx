import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./dashboard/Dashboard.tsx";
import ListPortfolios from "./dashboard/pages/portfolio/IndexPortfolio.tsx";
import MainLayout from "./dashboard/layout/MainLayout.tsx";
import Login from "./dashboard/pages/auth/Login.tsx";
import ProtectedRoute from "./dashboard/services/auth/ProtectedRoute.tsx";
import RedirectToAdmin from "./dashboard/services/auth/RedirectToAdmin.tsx";
import IndexTechnology from "./dashboard/pages/technology/IndexTechnology.tsx";
import CreatePortfolio from "./dashboard/pages/portfolio/components/CreatePortfolio.tsx";
import IndexSkill from "./dashboard/pages/skill/IndexSkill.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <RedirectToAdmin>
                <Login />
              </RedirectToAdmin>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="portfolio" element={<ListPortfolios />} />
            <Route path="portfolio/create" element={<CreatePortfolio />} />
            <Route path="tech" element={<IndexTechnology />} />
            <Route path="skill" element={<IndexSkill />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
