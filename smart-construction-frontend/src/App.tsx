import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "./components/ui/sonner";

// Public Pages
import LandingPage from "./components/LandingPage";
import GalleryPage from "./components/GalleryPage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import ProjectsPage from "./components/ProjectsPage";

// Auth Pages
import AdminLogin from "./components/admin/AdminLogin";
import CustomerLogin from "./components/customer/CustomerLogin";
import SupplierLogin from "./components/Supplier/SupplierLogin"; // ✅ Capital "S"

// Admin Pages
import AdminDashboard from "./components/admin/AdminDashboard";
import ManageCustomers from "./components/admin/ManageCustomers";
import ManageSuppliers from "./components/admin/ManageSuppliers";
import CreateProject from "./components/admin/CreateProject";
import QuotationManagement from "./components/admin/QuotationManagement";
import MaterialOrders from "./components/admin/MaterialOrders";
import ExcessShortage from "./components/admin/ExcessShortage";
import InvoiceGeneration from "./components/admin/InvoiceGeneration";
import AdminReports from "./components/admin/AdminReports";

// Customer Pages
import CustomerDashboard from "./components/customer/CustomerDashboard";

// Supplier Pages
import SupplierDashboard from "./components/Supplier/SupplierDashboard"; // ✅ Capital "S"

export default function App() {
  const [adminAuth, setAdminAuth] = useState(false);
  const [customerAuth, setCustomerAuth] = useState<any>(null);
  const [supplierAuth, setSupplierAuth] = useState<any>(null);

  return (
    <Router>
      <div className="w-full min-h-screen bg-gray-50 text-gray-800">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Auth Routes */}
          <Route
            path="/admin/login"
            element={<AdminLogin onLogin={() => setAdminAuth(true)} />}
          />
          <Route
            path="/customer/login"
            element={<CustomerLogin onLogin={setCustomerAuth} />}
          />
          <Route
            path="/supplier/login"
            element={<SupplierLogin onLogin={setSupplierAuth} />}
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              adminAuth ? <AdminDashboard /> : <Navigate to="/admin/login" />
            }
          />
          <Route
            path="/admin/customers"
            element={
              adminAuth ? <ManageCustomers /> : <Navigate to="/admin/login" />
            }
          />
          <Route
            path="/admin/suppliers"
            element={
              adminAuth ? <ManageSuppliers /> : <Navigate to="/admin/login" />
            }
          />
          <Route
            path="/admin/projects/new"
            element={
              adminAuth ? <CreateProject /> : <Navigate to="/admin/login" />
            }
          />
          <Route
            path="/admin/quotations"
            element={
              adminAuth ? (
                <QuotationManagement />
              ) : (
                <Navigate to="/admin/login" />
              )
            }
          />
          <Route
            path="/admin/orders"
            element={
              adminAuth ? <MaterialOrders /> : <Navigate to="/admin/login" />
            }
          />
          <Route
            path="/admin/excess-shortage"
            element={
              adminAuth ? <ExcessShortage /> : <Navigate to="/admin/login" />
            }
          />
          <Route
            path="/admin/invoices"
            element={
              adminAuth ? <InvoiceGeneration /> : <Navigate to="/admin/login" />
            }
          />
          <Route
            path="/admin/reports"
            element={
              adminAuth ? <AdminReports /> : <Navigate to="/admin/login" />
            }
          />

          {/* Customer Routes */}
          <Route
            path="/customer/dashboard"
            element={
              customerAuth ? (
                <CustomerDashboard customer={customerAuth} />
              ) : (
                <Navigate to="/customer/login" />
              )
            }
          />

          {/* Supplier Routes */}
          <Route
            path="/supplier/dashboard"
            element={
              supplierAuth ? (
                <SupplierDashboard supplier={supplierAuth} />
              ) : (
                <Navigate to="/supplier/login" />
              )
            }
          />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Global Toaster */}
        <Toaster />
      </div>
    </Router>
  );
}
