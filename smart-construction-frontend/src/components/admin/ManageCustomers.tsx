import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { UserPlus, Mail, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

const mockCustomers = [
  { id: 1, name: 'Nimal Perera', username: 'nimal_p', email: 'nimal@email.lk', address: 'Colombo 07', phone: '+94 77 123 4567', status: 'Active' },
  { id: 2, name: 'Kavindu Silva', username: 'kavindu_s', email: 'kavindu@email.lk', address: 'Kandy', phone: '+94 71 234 5678', status: 'Active' },
  { id: 3, name: 'Tharushi Fernando', username: 'tharushi_f', email: 'tharushi@email.lk', address: 'Galle', phone: '+94 76 345 6789', status: 'Active' },
  { id: 4, name: 'Dilshan Jayawardena', username: 'dilshan_j', email: 'dilshan@email.lk', address: 'Negombo', phone: '+94 75 456 7890', status: 'Active' }
];

export default function ManageCustomers() {
  const [customers, setCustomers] = useState(mockCustomers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    address: '',
    phone: ''
  });

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const password = 'temp' + Math.random().toString(36).slice(-8);
    
    toast.success(`Customer created! Username: ${formData.username}, Password: ${password} (sent via email)`);
    setIsDialogOpen(false);
    setFormData({ name: '', email: '', username: '', address: '', phone: '' });
  };

  const handleSendLogin = (customer: any) => {
    toast.success(`Login credentials sent to ${customer.email}`);
  };

  const handleResetPassword = (customer: any) => {
    const newPassword = 'reset' + Math.random().toString(36).slice(-6);
    toast.success(`Password reset for ${customer.name}. New password: ${newPassword} (sent via email)`);
  };

  const handleDeactivate = (customer: any) => {
    setCustomers(customers.map(c => 
      c.id === customer.id ? { ...c, status: 'Inactive' } : c
    ));
    toast.info(`${customer.name} has been deactivated`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl text-[#1F2937] mb-2">Manage Customers</h1>
              <p className="text-gray-600">View and manage customer accounts</p>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#FF6B35] hover:bg-[#E55A2B]">
                  <UserPlus className="size-4 mr-2" />
                  Create Customer Login
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Customer</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateCustomer} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Customer Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="e.g., Nimal Perera"
                    />
                  </div>
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      required
                      placeholder="e.g., nimal_p (must be unique)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder="e.g., nimal@email.lk"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                      placeholder="e.g., Colombo 07"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone (+94 format)</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      placeholder="e.g., +94 77 123 4567"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#FF6B35] hover:bg-[#E55A2B]">
                    Create & Send Credentials
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Customer List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.username}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.address}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>
                        <Badge variant={customer.status === 'Active' ? 'default' : 'secondary'}>
                          {customer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleSendLogin(customer)}
                            title="Send Login Details"
                          >
                            <Mail className="size-4 mr-1" />
                            Send
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-blue-600"
                            onClick={() => handleResetPassword(customer)}
                            title="Reset Password"
                          >
                            <RotateCcw className="size-4 mr-1" />
                            Reset
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDeactivate(customer)}
                          >
                            Deactivate
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="mt-4 text-xs text-gray-500 text-right">
            Last Updated: {new Date().toLocaleString('en-GB', { 
              day: '2-digit', 
              month: 'short', 
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
