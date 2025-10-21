import AdminSidebar from './AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Eye, Bell, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

const mockOrders = [
  { id: 1, supplier: 'Lanka Building Supplies', material: 'Cement (50kg bags)', quantity: 100, status: 'Pending', date: '2025-10-15', project: 'Modern Villa' },
  { id: 2, supplier: 'Lanka Building Supplies', material: 'Steel TMT Bars', quantity: 5000, status: 'Accepted', date: '2025-10-14', project: 'Modern Villa' },
  { id: 3, supplier: 'Perera Hardware', material: 'Electrical Wiring', quantity: 500, status: 'Delivered', date: '2025-10-12', project: 'Commercial Plaza' },
  { id: 4, supplier: 'Silva Traders', material: 'PVC Pipes', quantity: 200, status: 'Rejected', date: '2025-10-13', project: 'Apartment Building' },
  { id: 5, supplier: 'Fernando Paints', material: 'Paint (Liters)', quantity: 150, status: 'Accepted', date: '2025-10-16', project: 'Commercial Plaza' }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Pending': return 'bg-yellow-500';
    case 'Accepted': return 'bg-blue-500';
    case 'Delivered': return 'bg-green-500';
    case 'Rejected': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

export default function MaterialOrders() {
  const [selectedProject, setSelectedProject] = useState('all');
  
  const filteredOrders = selectedProject === 'all' 
    ? mockOrders 
    : mockOrders.filter(order => order.project === selectedProject);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl text-[#1F2937] mb-2">Material Orders</h1>
              <p className="text-gray-600">Track and manage supplier orders</p>
            </div>
            <div className="flex gap-3 items-center">
              <div className="w-64">
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    <SelectItem value="Modern Villa">Modern Villa</SelectItem>
                    <SelectItem value="Commercial Plaza">Commercial Plaza</SelectItem>
                    <SelectItem value="Apartment Building">Apartment Building</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="bg-[#FF6B35] hover:bg-[#E55A2B]" onClick={() => toast.info('Opening shortage order form...')}>
                <Plus className="size-4 mr-2" />
                Create Additional Order
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                    <p className="text-3xl">12</p>
                  </div>
                  <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center">
                    <Bell className="size-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Pending</p>
                    <p className="text-3xl text-yellow-600">3</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Accepted</p>
                    <p className="text-3xl text-blue-600">5</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Delivered</p>
                    <p className="text-3xl text-green-600">4</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Order List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Supplier Name</TableHead>
                    <TableHead>Material</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>#{order.id.toString().padStart(4, '0')}</TableCell>
                      <TableCell>{order.supplier}</TableCell>
                      <TableCell>{order.material}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => toast.info('Viewing order details for Order #' + order.id)}
                          >
                            <Eye className="size-4 mr-1" />
                            View
                          </Button>
                          {order.status === 'Pending' && (
                            <Button 
                              size="sm" 
                              className="bg-[#FF6B35] hover:bg-[#E55A2B]"
                              onClick={() => toast.success('Alert sent to ' + order.supplier)}
                            >
                              <Bell className="size-4 mr-1" />
                              Alert
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}