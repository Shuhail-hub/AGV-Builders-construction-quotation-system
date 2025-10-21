import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Plus, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const shortageItems = [
  { id: 1, project: 'Villa Complex', material: 'Cement bags', required: 50, status: 'Pending Order' },
  { id: 2, project: 'Commercial Plaza', material: 'Steel bars', required: 1000, status: 'Order Placed' }
];

const excessItems = [
  { id: 1, project: 'Apartment Building', material: 'Bricks', quantity: 500, value: 4000 },
  { id: 2, project: 'Office Complex', material: 'Paint (Liters)', quantity: 20, value: 3000 },
  { id: 3, project: 'Villa Complex', material: 'Tiles (sq.ft)', quantity: 100, value: 8000 }
];

export default function ExcessShortage() {
  const [newShortage, setNewShortage] = useState({
    project: '',
    material: '',
    quantity: 0
  });

  const [newExcess, setNewExcess] = useState({
    project: '',
    material: '',
    quantity: 0,
    unitPrice: 0
  });

  const handleAddShortage = () => {
    if (newShortage.project && newShortage.material && newShortage.quantity) {
      toast.success('Shortage order created and sent to supplier');
      setNewShortage({ project: '', material: '', quantity: 0 });
    }
  };

  const handleAddExcess = () => {
    if (newExcess.project && newExcess.material && newExcess.quantity && newExcess.unitPrice) {
      const total = newExcess.quantity * newExcess.unitPrice;
      toast.success(`Excess material recorded - Total value: Rs. ${total.toLocaleString()}`);
      setNewExcess({ project: '', material: '', quantity: 0, unitPrice: 0 });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl text-[#1F2937] mb-2">Excess & Shortage Management</h1>
            <p className="text-gray-600">Handle material shortages and excess returns</p>
          </div>

          <Tabs defaultValue="shortage" className="space-y-6">
            <TabsList>
              <TabsTrigger value="shortage">Material Shortage</TabsTrigger>
              <TabsTrigger value="excess">Excess Materials</TabsTrigger>
            </TabsList>

            <TabsContent value="shortage" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add Shortage Order</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label>Project Name</Label>
                      <Input
                        value={newShortage.project}
                        onChange={(e) => setNewShortage({ ...newShortage, project: e.target.value })}
                        placeholder="Select project"
                      />
                    </div>
                    <div>
                      <Label>Material Name</Label>
                      <Input
                        value={newShortage.material}
                        onChange={(e) => setNewShortage({ ...newShortage, material: e.target.value })}
                        placeholder="e.g., Cement"
                      />
                    </div>
                    <div>
                      <Label>Quantity Needed</Label>
                      <Input
                        type="number"
                        value={newShortage.quantity || ''}
                        onChange={(e) => setNewShortage({ ...newShortage, quantity: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="flex items-end">
                      <Button onClick={handleAddShortage} className="w-full bg-[#FF6B35] hover:bg-[#E55A2B]">
                        <Plus className="size-4 mr-2" />
                        Create Order
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Shortage Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project</TableHead>
                        <TableHead>Material</TableHead>
                        <TableHead>Quantity Required</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {shortageItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.project}</TableCell>
                          <TableCell>{item.material}</TableCell>
                          <TableCell>{item.required}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              item.status === 'Order Placed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {item.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline" onClick={() => toast.info('Viewing order details')}>
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="excess" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add Excess Material</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label>Project Name</Label>
                      <Input
                        value={newExcess.project}
                        onChange={(e) => setNewExcess({ ...newExcess, project: e.target.value })}
                        placeholder="Select project"
                      />
                    </div>
                    <div>
                      <Label>Material Name</Label>
                      <Input
                        value={newExcess.material}
                        onChange={(e) => setNewExcess({ ...newExcess, material: e.target.value })}
                        placeholder="e.g., Cement"
                      />
                    </div>
                    <div>
                      <Label>Quantity</Label>
                      <Input
                        type="number"
                        value={newExcess.quantity || ''}
                        onChange={(e) => setNewExcess({ ...newExcess, quantity: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                    <div>
                      <Label>Unit Price (Rs)</Label>
                      <Input
                        type="number"
                        value={newExcess.unitPrice || ''}
                        onChange={(e) => setNewExcess({ ...newExcess, unitPrice: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="flex items-end">
                      <Button onClick={handleAddExcess} className="w-full bg-[#FF6B35] hover:bg-[#E55A2B]">
                        <Plus className="size-4 mr-2" />
                        Record Excess
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Excess Materials</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project</TableHead>
                        <TableHead>Material</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Est. Value (Rs)</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {excessItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.project}</TableCell>
                          <TableCell>{item.material}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>Rs. {item.value.toLocaleString()}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => toast.success('Refund initiated to customer')}
                              >
                                <RefreshCw className="size-4 mr-1" />
                                Refund Customer
                              </Button>
                              <Button 
                                size="sm" 
                                className="bg-blue-500 hover:bg-blue-600"
                                onClick={() => toast.success('Material allocated to another project')}
                              >
                                Allocate to Project
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}