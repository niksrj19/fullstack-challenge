import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Brief } from "@/pages/Brief";

import CarPage from "@/features/cars/components/CarPage/CarPage";

import CarsHomePage from "@/features/cars/page/CarHomePage";

import AddCar from '@/features/cars/components/AddCar/AddCar';

/**
 * Add routes for your own pages here. `/` is the brief; you are free to move
 * it to `/brief` and put your work on `/`.
 */
export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Brief />} />
      <Route path="/carHomePage" element={<CarsHomePage />} />
      <Route path="/cars/:id" element={<CarPage />} />
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      <Route path="/cars/new" element={<AddCar />} />
    </Routes>
  </BrowserRouter>
);
