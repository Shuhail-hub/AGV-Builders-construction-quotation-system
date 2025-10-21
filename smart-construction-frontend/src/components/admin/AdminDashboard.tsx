import AdminSidebar from './AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { 
  Building2, 
  Clock, 
  CheckCircle, 
  ShoppingCart, 
  AlertTriangle 
} from 'lucide-react';
import { Badge } from '../ui/badge';

const summaryData = [
  { 
    title: 'Total Projects', 
    value: 24, 
    icon: Building2, 
    color: 'bg-blue-500',
    textColor: 'text-blue-500'
  },
  { 
    title: 'Ongoing Projects', 
    value: 8, 
    icon: Clock, 
    color: 'bg-[#FF6B35]',
    textColor: 'text-[#FF6B35]'
  },
  { 
    title: 'Completed Projects', 
    value: 16, 
    icon: CheckCircle, 
    color: 'bg-green-500',
    textColor: 'text-green-500'
  },
  { 
    title: 'Pending Orders', 
    value: 12, 
    icon: ShoppingCart, 
    color: 'bg-yellow-500',
    textColor: 'text-yellow-500'
  },
  { 
    title: 'Alerts', 
    value: 3, 
    icon: AlertTriangle, 
    color: 'bg-red-500',
    textColor: 'text-red-500'
  }
];

const recentActivities = [
  { id: 1, text: 'New quotation sent to Ramesh Kumar', time: '10 min ago', type: 'quotation' },
  { id: 2, text: 'Material order accepted by Supplier ABC', time: '1 hour ago', type: 'order' },
  { id: 3, text: 'Project "Villa Complex" updated', time: '2 hours ago', type: 'project' },
  { id: 4, text: 'Invoice generated for Customer XYZ', time: '3 hours ago', type: 'invoice' },
  { id: 5, text: 'New customer complaint received', time: '5 hours ago', type: 'alert' }
];

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl text-[#1F2937] mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome to A.G.V Builders Admin Panel</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {summaryData.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{item.title}</p>
                        <p className="text-3xl">{item.value}</p>
                      </div>
                      <div className={`${item.color} w-12 h-12 rounded-full flex items-center justify-center`}>
                        <Icon className="size-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-0">
                      <div className="w-2 h-2 bg-[#FF6B35] rounded-full mt-2" />
                      <div className="flex-1">
                        <p className="text-gray-700">{activity.text}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                      <Badge variant="outline">
                        {activity.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-gray-600">Active Customers</span>
                    <span className="text-xl">32</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-gray-600">Active Suppliers</span>
                    <span className="text-xl">15</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-gray-600">Pending Quotations</span>
                    <span className="text-xl text-[#FF6B35]">5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Complaints Pending</span>
                    <span className="text-xl text-red-500">2</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}