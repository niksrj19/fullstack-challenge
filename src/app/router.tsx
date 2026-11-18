import { BrowserRouter, Route, Routes } from "react-router-dom";

import CarPage from "@/features/cars/components/CarPage/CarPage";

import CarsHomePage from "@/features/cars/page/CarHomePage";


export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
     
      <Route path="/" element={<CarsHomePage />} />
      <Route path="/cars/:id" element={<CarPage />} />
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
  
    </Routes>
  </BrowserRouter>
);
