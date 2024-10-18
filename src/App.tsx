import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/login.page";
import { ROUTES } from "./router/routes";
import MainLayout from "./layout/main.layout";
import ProtectedRoute from "./utils/protected-route";
import { NotFound, Report, ReportClients } from "./pages";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorBoundary";
import ReportsLayout from "./layout/reportsLayout/reports.layout";
import GeneralReports from "./pages/reports/general-reports/generalReports.page";
import RecordsReport from "./pages/reports/general-reports/records-report/recordsReport.page";
import VisitsReport from "./pages/reports/general-reports/paid-visits-report/visitsReport.page";
import ProvidedServicesReport from "./pages/reports/services/provided-services-report/providedServicesReport.page";
import RatingProceduresReport from "./pages/reports/services/procedures-rating-report/ratingProceduresReport.page";
import ServicesGoodsReport from "./pages/reports/services/services-and-goods-report/servicesGoodsReport.page";

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
            <Route path="general-reports/clients" element={<ReportClients />} />
            <Route
              path="general-reports/cabinets-load-report"
              element={<GeneralReports />}
            />
            <Route
              path="general-reports/full-report"
              element={<GeneralReports />}
            />
            <Route
              path="general-reports/admin-functions-report"
              element={<GeneralReports />}
            />
            <Route
              path="general-reports/records-report"
              element={<RecordsReport />}
            />
            <Route
              path="general-reports/paid-visits-report"
              element={<VisitsReport />}
            />
            <Route
              path="services/provided-services-report"
              element={<ProvidedServicesReport />}
            />
            <Route
              path="services/procedures-rating-report"
              element={<RatingProceduresReport />}
            />
            <Route
              path="services/services-and-goods-month-report"
              element={<ProvidedServicesReport />}
            />
              <Route
              path="services/services-and-goods-report"
              element={<ServicesGoodsReport />}
            />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
