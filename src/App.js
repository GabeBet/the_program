import Projects from "./Projects";
import Customers from "./Customers";
import SqFt from "./SqFt";
import Estimate from "./Estimate";
import Invoice from "./Invoice";
import ErrorPage from "./ErrorPage";
import Layout from "./Layout";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Projects />} />
        <Route path="customers">
          <Route index element={<Customers />} />
        </Route>
        <Route path="sqft">
          <Route index element={<SqFt />} />
        </Route>
        <Route path="estimate">
          <Route index element={<Estimate />} />
        </Route>
        <Route path="invoice">
          <Route index element={<Invoice />} />
        </Route>
          <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
