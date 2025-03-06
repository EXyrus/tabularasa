import { ErrorBoundary } from "@sentry/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute, PublicRoute } from "./utils/routeGuard";
import UpdateNotification from "./components/UpdateNotification";
import LandingPage from "./pages/LandingPage";
import InstitutionSignup from "./pages/InstitutionSignup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VendorDashboard from "./pages/vendor/Dashboard";
import VendorProfile from "./pages/vendor/Profile";
import VendorSettings from "./pages/vendor/Settings";
import CreateInstitution from "./pages/vendor/CreateInstitution";
import InstitutionsList from "./pages/vendor/InstitutionsList";
import InstitutionDetails from "./pages/vendor/InstitutionDetails";
import InstitutionLogin from "./pages/InstitutionLogin";
import InstitutionDashboard from "./pages/institution/Dashboard";
import InstitutionProfile from "./pages/institution/Profile";
import InstitutionSettings from "./pages/institution/Settings";
import InstitutionStudents from "./pages/institution/Students";
import InstitutionEmployees from "./pages/institution/Employees";
import EmployeeProfile from "./pages/institution/EmployeeProfile";
import StudentProfile from "./pages/institution/StudentProfile";
import AttendancePage from "./pages/institution/Attendance";
import OrganizationChartPage from "./pages/institution/OrganizationChart";
import InstitutionControlPanel from "./pages/institution/InstitutionControlPanel";
import ManageRoles from "./pages/institution/ManageRoles";
import ManageFees from "./pages/institution/ManageFees";
import ManagePayments from "./pages/institution/ManagePayments";
import ViewTransactions from "./pages/institution/ViewTransactions";
import ManagePayrolls from "./pages/institution/ManagePayrolls";
import ManageBankAccounts from "./pages/institution/ManageBankAccounts";
import GuardianDashboard from "./pages/guardian/Dashboard";
import GuardianProfile from "./pages/guardian/Profile";
import GuardianSettings from "./pages/guardian/Settings";
import GuardianFinances from "./pages/guardian/Finances";
import GuardianStudents from "./pages/guardian/Students";
import GuardianStudentProfile from "./pages/guardian/StudentProfile";
import GuardianNotifications from "./pages/guardian/Notifications";
import GuardianAccount from "./pages/guardian/Account";
import NotFound from "./pages/NotFound";

const App = () => (
  <AuthProvider>
    <ErrorBoundary fallback={<div>An error has occurred</div>}>
      <UpdateNotification />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/institution-signup" element={<InstitutionSignup />} />
          
          {/* Vendor Routes */}
          <Route path="/vendor/login" element={
            <PublicRoute appType="vendor" restricted>
              <Login />
            </PublicRoute>
          } />
          <Route path="/vendor/forgot-password" element={
            <PublicRoute appType="vendor" restricted>
              <ForgotPassword />
            </PublicRoute>
          } />
          <Route path="/vendor/reset-password" element={
            <PublicRoute appType="vendor" restricted>
              <ResetPassword />
            </PublicRoute>
          } />
          <Route path="/vendor/dashboard" element={
            <ProtectedRoute appType="vendor">
              <VendorDashboard />
            </ProtectedRoute>
          } />
          <Route path="/vendor/profile" element={
            <ProtectedRoute appType="vendor">
              <VendorProfile />
            </ProtectedRoute>
          } />
          <Route path="/vendor/settings" element={
            <ProtectedRoute appType="vendor">
              <VendorSettings />
            </ProtectedRoute>
          } />
          <Route path="/vendor/create-institution" element={
            <ProtectedRoute appType="vendor">
              <CreateInstitution />
            </ProtectedRoute>
          } />
          <Route path="/vendor/institutions" element={
            <ProtectedRoute appType="vendor">
              <InstitutionsList />
            </ProtectedRoute>
          } />
          <Route path="/vendor/institutions/:id" element={
            <ProtectedRoute appType="vendor">
              <InstitutionDetails />
            </ProtectedRoute>
          } />
          
          {/* Institution Routes */}
          <Route path="/institution/login" element={
            <PublicRoute appType="institution" restricted>
              <InstitutionLogin />
            </PublicRoute>
          } />
          <Route path="/institution/forgot-password" element={
            <PublicRoute appType="institution" restricted>
              <ForgotPassword />
            </PublicRoute>
          } />
          <Route path="/institution/reset-password" element={
            <PublicRoute appType="institution" restricted>
              <ResetPassword />
            </PublicRoute>
          } />
          <Route path="/institution/dashboard" element={
            <ProtectedRoute appType="institution">
              <InstitutionDashboard />
            </ProtectedRoute>
          } />
          <Route path="/institution/profile" element={
            <ProtectedRoute appType="institution">
              <InstitutionProfile />
            </ProtectedRoute>
          } />
          <Route path="/institution/settings" element={
            <ProtectedRoute appType="institution">
              <InstitutionSettings />
            </ProtectedRoute>
          } />
          <Route path="/institution/students" element={
            <ProtectedRoute appType="institution">
              <InstitutionStudents />
            </ProtectedRoute>
          } />
          <Route path="/institution/students/:studentId" element={
            <ProtectedRoute appType="institution">
              <StudentProfile />
            </ProtectedRoute>
          } />
          <Route path="/institution/employees" element={
            <ProtectedRoute appType="institution">
              <InstitutionEmployees />
            </ProtectedRoute>
          } />
          <Route path="/institution/employees/:employeeId" element={
            <ProtectedRoute appType="institution">
              <EmployeeProfile />
            </ProtectedRoute>
          } />
          <Route path="/institution/attendance" element={
            <ProtectedRoute appType="institution">
              <AttendancePage />
            </ProtectedRoute>
          } />
          <Route path="/institution/organization-chart" element={
            <ProtectedRoute appType="institution">
              <OrganizationChartPage />
            </ProtectedRoute>
          } />
          <Route path="/institution/control-panel" element={
            <ProtectedRoute appType="institution">
              <InstitutionControlPanel />
            </ProtectedRoute>
          } />
          <Route path="/institution/control-panel/roles" element={
            <ProtectedRoute appType="institution">
              <ManageRoles />
            </ProtectedRoute>
          } />
          <Route path="/institution/control-panel/fees" element={
            <ProtectedRoute appType="institution">
              <ManageFees />
            </ProtectedRoute>
          } />
          <Route path="/institution/control-panel/payments" element={
            <ProtectedRoute appType="institution">
              <ManagePayments />
            </ProtectedRoute>
          } />
          <Route path="/institution/control-panel/transactions" element={
            <ProtectedRoute appType="institution">
              <ViewTransactions />
            </ProtectedRoute>
          } />
          <Route path="/institution/control-panel/payrolls" element={
            <ProtectedRoute appType="institution">
              <ManagePayrolls />
            </ProtectedRoute>
          } />
          <Route path="/institution/control-panel/bank-accounts" element={
            <ProtectedRoute appType="institution">
              <ManageBankAccounts />
            </ProtectedRoute>
          } />
          
          {/* Guardian Routes */}
          <Route path="/guardian/login" element={
            <PublicRoute appType="guardian" restricted>
              <Login />
            </PublicRoute>
          } />
          <Route path="/guardian/forgot-password" element={
            <PublicRoute appType="guardian" restricted>
              <ForgotPassword />
            </PublicRoute>
          } />
          <Route path="/guardian/reset-password" element={
            <PublicRoute appType="guardian" restricted>
              <ResetPassword />
            </PublicRoute>
          } />
          <Route path="/guardian/dashboard" element={
            <ProtectedRoute appType="guardian">
              <GuardianDashboard />
            </ProtectedRoute>
          } />
          <Route path="/guardian/profile" element={
            <ProtectedRoute appType="guardian">
              <GuardianProfile />
            </ProtectedRoute>
          } />
          <Route path="/guardian/settings" element={
            <ProtectedRoute appType="guardian">
              <GuardianSettings />
            </ProtectedRoute>
          } />
          <Route path="/guardian/finances" element={
            <ProtectedRoute appType="guardian">
              <GuardianFinances />
            </ProtectedRoute>
          } />
          <Route path="/guardian/students" element={
            <ProtectedRoute appType="guardian">
              <GuardianStudents />
            </ProtectedRoute>
          } />
          <Route path="/guardian/students/:studentId" element={
            <ProtectedRoute appType="guardian">
              <GuardianStudentProfile />
            </ProtectedRoute>
          } />
          <Route path="/guardian/notifications" element={
            <ProtectedRoute appType="guardian">
              <GuardianNotifications />
            </ProtectedRoute>
          } />
          <Route path="/guardian/account" element={
            <ProtectedRoute appType="guardian">
              <GuardianAccount />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </AuthProvider>
);

export default App;
