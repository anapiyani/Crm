import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/login.page";
import { ROUTES } from "./router/routes";
import MainLayout from "./layout/main.layout";
import ProtectedRoute from "./utils/protected-route";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainLayout />}>
          {ROUTES.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<ProtectedRoute>{route.component}</ProtectedRoute>}
            />
          ))}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
