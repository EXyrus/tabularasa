
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute, PublicRoute } from "./utils/routeGuard";
import ErrorBoundary from "./components/ErrorBoundary";
import UpdateNotification from "./components/UpdateNotification";

// Landing Page
import LandingPage from "./pages/LandingPage";
import InstitutionSignup from "./pages/InstitutionSignup";

// Auth pages
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// Vendor pages
import VendorDashboard from "./pages/vendor/Dashboard";
import CreateInstitution from "./pages/vendor/CreateInstitution";

// Institution pages
import InstitutionDashboard from "./pages/institution/Dashboard";
import InstitutionStudents from "./pages/institution/Students";
import InstitutionEmployees from "./pages/institution/Employees";
import AttendancePage from "./pages/institution/Attendance";

// Guardian pages
import GuardianDashboard from "./pages/guardian/Dashboard";
import GuardianFinances from "./pages/guardian/Finances";
import GuardianStudents from "./pages/guardian/Students";
import GuardianNotifications from "./pages/guardian/Notifications";
import GuardianAccount from "./pages/guardian/Account";

// Not Found page
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ErrorBoundary>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <UpdateNotification />
          <BrowserRouter>
            <Routes>
              {/* Landing page */}
              <Route path="/" element={<LandingPage />} />
              
              {/* Institution Signup */}
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
              <Route path="/vendor/create-institution" element={
                <ProtectedRoute appType="vendor">
                  <CreateInstitution />
                </ProtectedRoute>
              } />
              
              {/* Institution Routes */}
              <Route path="/institution/login" element={
                <PublicRoute appType="institution" restricted>
                  <Login />
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
              <Route path="/institution/students" element={
                <ProtectedRoute appType="institution">
                  <InstitutionStudents />
                </ProtectedRoute>
              } />
              <Route path="/institution/employees" element={
                <ProtectedRoute appType="institution">
                  <InstitutionEmployees />
                </ProtectedRoute>
              } />
              <Route path="/institution/attendance" element={
                <ProtectedRoute appType="institution">
                  <AttendancePage />
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
              
              {/* Catchall route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ErrorBoundary>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
