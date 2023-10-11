import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Homepage from "./pages/Homepage";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import City from "./components/City";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import { CityProvider } from "./Contexts/CityContext";

function App() {
  return (
    <CityProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="App" element={<AppLayout />}>
            <Route index element={<Navigate replace to="Cities" />} />
            <Route path="Cities" element={<CityList />} />
            <Route path="Cities/:id" element={<City />} />
            <Route path="Countries" element={<CountryList />} />
            <Route path="Form" element={<Form />} />
          </Route>

          <Route path="App/cities"></Route>
          <Route path="Login" element={<Login />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="product" element={<Product />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CityProvider>
  );
}

export default App;
