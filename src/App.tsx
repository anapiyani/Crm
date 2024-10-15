import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/login.page";
import { ROUTES } from "./router/routes";
import MainLayout from "./layout/main.layout";
import ProtectedRoute from "./utils/protected-route";
import { NotFound, Report, ReportClients } from "./pages";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorBoundary";
import ReportsLayout from "./layout/reportsLayout/reports.layout";

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
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

          <Route
            path="/analytics/reports/"
            element={
              <ProtectedRoute>
                <ReportsLayout />
              </ProtectedRoute>
            }
          >
            <Route path="search" element={<Report />} />
            <Route path="clients" element={<ReportClients />} />
          </Route> 
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
