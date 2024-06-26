import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/login.page";
import EmployeePage from "@/components/navigation/drawer/drawer.component";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/employee-page" element={<EmployeePage />}/>
      </Routes>
    </div>
  );
};

export default App;
