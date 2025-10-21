import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Truck, 
  FolderPlus, 
  FileText, 
  ShoppingCart,
  PackagePlus,
  Receipt,
  Bell,
  BarChart,
  Building2,
  LogOut
} from 'lucide-react';
import { Button } from '../ui/button';

const menuItems = [
  { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/customers', icon: Users, label: 'Manage Customers' },
  { path: '/admin/suppliers', icon: Truck, label: 'Manage Suppliers' },
  { path: '/admin/projects/new', icon: FolderPlus, label: 'Create Project' },
  { path: '/admin/quotations', icon: FileText, label: 'Quotations' },
  { path: '/admin/orders', icon: ShoppingCart, label: 'Material Orders' },
  { path: '/admin/excess-shortage', icon: PackagePlus, label: 'Excess & Shortage' },
  { path: '/admin/invoices', icon: Receipt, label: 'Invoices' },
  { path: '/admin/reports', icon: BarChart, label: 'Reports' }
];

export default function AdminSidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-[#1F2937] min-h-screen text-white flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <Building2 className="size-6 text-[#FF6B35]" />
          <span className="text-lg">A.G.V Builders</span>
        </div>
        <p className="text-sm text-gray-400">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link key={item.path} to={item.path}>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-[#FF6B35] text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}>
                <Icon className="size-5" />
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <Link to="/">
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white">
            <LogOut className="size-5 mr-3" />
            Logout
          </Button>
        </Link>
      </div>
    </div>
  );
}
