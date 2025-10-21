import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Building2, CheckCircle, XCircle, Upload, LogOut, FileText, Plus, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { toast } from 'sonner';

interface SupplierDashboardProps {
  supplier: {
    name: string;
    type: string;
    username: string;
  };
}

interface Order {
  id: number;
  orderId: string;
  material: string;
  quantity: number;
  unit: string;
  price: number;
  date: string;
  project: string;
  status: 'pending' | 'accepted' | 'delivered' | 'rejected';
}

interface Material {
  id: number;
  material: string;
  unit: string;
  price: number;
  lastUpdated: string;
}

export default function SupplierDashboard({ supplier }: SupplierDashboardProps) {
  const [orders, setOrders] = useState<Order[]>([
    { id: 1, orderId: 'ORD-001', material: 'Cement (50kg bags)', quantity: 100, unit: 'bags', price: 185000, date: '2025-10-15', project: 'Modern Villa', status: 'pending' },
    { id: 2, orderId: 'ORD-002', material: 'Steel TMT Bars', quantity: 5000, unit: 'kg', price: 1425000, date: '2025-10-14', project: 'Modern Villa', status: 'accepted' },
    { id: 3, orderId: 'ORD-003', material: 'Cement (50kg bags)', quantity: 200, unit: 'bags', price: 370000, date: '2025-10-12', project: 'Commercial Complex', status: 'delivered' },
    { id: 4, orderId: 'ORD-004', material: 'Steel Rods', quantity: 2000, unit: 'kg', price: 570000, date: '2025-10-10', project: 'Apartment Building', status: 'delivered' }
  ]);

  const [materials, setMaterials] = useState<Material[]>([
    { id: 1, material: 'Cement (50kg)', unit: '1 bag', price: 1850, lastUpdated: '2025-10-15' },
    { id: 2, material: 'Steel TMT Bars', unit: '1 kg', price: 285, lastUpdated: '2025-10-15' },
    { id: 3, material: 'Bricks (Standard)', unit: '1 brick', price: 15, lastUpdated: '2025-10-14' },
  ]);

  const [partialQuantity, setPartialQuantity] = useState<{ [key: number]: number }>({});
  const [deliveryFile, setDeliveryFile] = useState<File | null>(null);
  const [isAddMaterialOpen, setIsAddMaterialOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<number | null>(null);
  
  const [newMaterial, setNewMaterial] = useState({
    material: '',
    unit: '',
    price: 0
  });

  const handleAcceptFull = (orderId: number) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'accepted' } : order
    ));
    toast.success('Order accepted successfully!');
  };

  const handleAcceptPartial = (orderId: number) => {
    const quantity = partialQuantity[orderId];
    if (quantity && quantity > 0) {
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: 'accepted', quantity } : order
      ));
      toast.success(`Partial order accepted for ${quantity} units`);
    }
  };

  const handleReject = (orderId: number) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'rejected' } : order
    ));
    toast.error('Order rejected');
  };

  const handleDeliveryConfirmation = (orderId: number) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'delivered' } : order
    ));
    toast.success('Delivery confirmation sent with invoice!', {
      description: 'Admin has been notified'
    });
    setDeliveryFile(null);
  };

  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    const newMat: Material = {
      id: Date.now(),
      material: newMaterial.material,
      unit: newMaterial.unit,
      price: newMaterial.price,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setMaterials([...materials, newMat]);
    setNewMaterial({ material: '', unit: '', price: 0 });
    setIsAddMaterialOpen(false);
    toast.success('Material added successfully', {
      description: 'Price will be sent to admin for approval'
    });
  };

  const handleUpdateMaterial = (id: number, price: number) => {
    setMaterials(materials.map(m => 
      m.id === id ? { ...m, price, lastUpdated: new Date().toISOString().split('T')[0] } : m
    ));
    setEditingMaterial(null);
    toast.success('Price updated successfully', {
      description: 'Change sent to admin for approval'
    });
  };

  const handleDeleteMaterial = (id: number) => {
    setMaterials(materials.filter(m => m.id !== id));
    toast.info('Material removed from your list');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'accepted': return 'bg-blue-500';
      case 'delivered': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const acceptedOrders = orders.filter(o => o.status === 'accepted');
  const deliveredOrders = orders.filter(o => o.status === 'delivered');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1F2937] text-white py-4 px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Building2 className="size-8 text-[#FF6B35]" />
            <div>
              <h1 className="text-xl">A.G.V Builders</h1>
              <p className="text-sm text-gray-400">Supplier Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">Welcome,</p>
              <p>{supplier.name}</p>
            </div>
            <Link to="/">
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                <LogOut className="size-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600 mb-1">Pending Orders</p>
              <p className="text-3xl text-yellow-600">{pendingOrders.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600 mb-1">Accepted Orders</p>
              <p className="text-3xl text-blue-600">{acceptedOrders.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600 mb-1">Delivered Orders</p>
              <p className="text-3xl text-green-600">{deliveredOrders.length}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingOrders.length})</TabsTrigger>
            <TabsTrigger value="accepted">Accepted ({acceptedOrders.length})</TabsTrigger>
            <TabsTrigger value="delivered">Delivered ({deliveredOrders.length})</TabsTrigger>
            <TabsTrigger value="materials">Available Materials</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Material</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.orderId}</TableCell>
                        <TableCell>{order.material}</TableCell>
                        <TableCell>{order.quantity} {order.unit}</TableCell>
                        <TableCell>Rs. {order.price.toLocaleString()}</TableCell>
                        <TableCell>{order.project}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {order.status === 'pending' && (
                            <div className="flex gap-2">
                              <Button size="sm" className="bg-green-500 hover:bg-green-600" onClick={() => handleAcceptFull(order.id)}>
                                <CheckCircle className="size-4 mr-1" />
                                Accept
                              </Button>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm" variant="outline">
                                    Partial
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Accept Partial Order</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <Label>Enter Quantity</Label>
                                      <Input
                                        type="number"
                                        max={order.quantity}
                                        placeholder={`Max: ${order.quantity}`}
                                        onChange={(e) => setPartialQuantity({ ...partialQuantity, [order.id]: parseInt(e.target.value) })}
                                      />
                                    </div>
                                    <Button className="w-full" onClick={() => handleAcceptPartial(order.id)}>
                                      Confirm Partial
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <Button size="sm" variant="destructive" onClick={() => handleReject(order.id)}>
                                <XCircle className="size-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          )}
                          {order.status === 'accepted' && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" className="bg-[#FF6B35] hover:bg-[#E55A2B]">
                                  <Upload className="size-4 mr-1" />
                                  Send Delivery
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Delivery Confirmation</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label>Upload Invoice/Bill</Label>
                                    <Input
                                      type="file"
                                      accept=".pdf,.jpg,.jpeg,.png"
                                      onChange={(e) => setDeliveryFile(e.target.files?.[0] || null)}
                                    />
                                  </div>
                                  <Button 
                                    className="w-full bg-green-500 hover:bg-green-600" 
                                    onClick={() => handleDeliveryConfirmation(order.id)}
                                  >
                                    Confirm Delivery
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                          {order.status === 'delivered' && (
                            <Badge className="bg-green-500">Completed</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Orders - Action Required</CardTitle>
              </CardHeader>
              <CardContent>
                {pendingOrders.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No pending orders</p>
                ) : (
                  <div className="space-y-4">
                    {pendingOrders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="mb-1">{order.material}</h3>
                            <p className="text-sm text-gray-600">Order ID: {order.orderId}</p>
                            <p className="text-sm text-gray-600">Project: {order.project}</p>
                            <p className="text-sm text-gray-600">Quantity: {order.quantity} {order.unit}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl text-[#FF6B35]">Rs. {order.price.toLocaleString()}</p>
                            <p className="text-sm text-gray-600">{order.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-green-500 hover:bg-green-600" onClick={() => handleAcceptFull(order.id)}>
                            <CheckCircle className="size-4 mr-1" />
                            Accept Full Order
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                Accept Partial Order
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Accept Partial Order</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label>Enter Quantity (Max: {order.quantity})</Label>
                                  <Input
                                    type="number"
                                    max={order.quantity}
                                    onChange={(e) => setPartialQuantity({ ...partialQuantity, [order.id]: parseInt(e.target.value) })}
                                  />
                                </div>
                                <Button className="w-full" onClick={() => handleAcceptPartial(order.id)}>
                                  Confirm Partial
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button size="sm" variant="destructive" onClick={() => handleReject(order.id)}>
                            <XCircle className="size-4 mr-1" />
                            Reject Order
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accepted">
            <Card>
              <CardHeader>
                <CardTitle>Accepted Orders - Ready for Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                {acceptedOrders.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No accepted orders</p>
                ) : (
                  <div className="space-y-4">
                    {acceptedOrders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4 bg-blue-50">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="mb-1">{order.material}</h3>
                            <p className="text-sm text-gray-600">Order ID: {order.orderId}</p>
                            <p className="text-sm text-gray-600">Project: {order.project}</p>
                            <p className="text-sm text-gray-600">Quantity: {order.quantity} {order.unit}</p>
                          </div>
                          <Badge className="bg-blue-500">Accepted</Badge>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" className="bg-[#FF6B35] hover:bg-[#E55A2B]">
                              <Upload className="size-4 mr-1" />
                              Send Delivery Confirmation
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Delivery Confirmation</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <p className="text-sm text-gray-600">
                                Order: {order.material} - {order.quantity} {order.unit}
                              </p>
                              <div>
                                <Label>Upload Invoice/Bill (PDF or Image)</Label>
                                <Input
                                  type="file"
                                  accept=".pdf,.jpg,.jpeg,.png"
                                  onChange={(e) => setDeliveryFile(e.target.files?.[0] || null)}
                                />
                              </div>
                              <Button 
                                className="w-full bg-green-500 hover:bg-green-600" 
                                onClick={() => handleDeliveryConfirmation(order.id)}
                              >
                                <FileText className="size-4 mr-2" />
                                Confirm Delivery & Send Invoice
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="delivered">
            <Card>
              <CardHeader>
                <CardTitle>Delivered Orders</CardTitle>
              </CardHeader>
              <CardContent>
                {deliveredOrders.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No delivered orders</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Material</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {deliveredOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>{order.orderId}</TableCell>
                          <TableCell>{order.material}</TableCell>
                          <TableCell>{order.quantity} {order.unit}</TableCell>
                          <TableCell>Rs. {order.price.toLocaleString()}</TableCell>
                          <TableCell>{order.project}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>
                            <Badge className="bg-green-500">Delivered</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="materials">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Available Materials</CardTitle>
                    <p className="text-sm text-gray-600 mt-2">
                      Manage your material prices. All changes require admin approval.
                    </p>
                  </div>
                  <Dialog open={isAddMaterialOpen} onOpenChange={setIsAddMaterialOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-[#FF6B35] hover:bg-[#E55A2B]">
                        <Plus className="size-4 mr-2" />
                        Add Material
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Material</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleAddMaterial} className="space-y-4">
                        <div>
                          <Label>Material Type</Label>
                          <Select 
                            value={newMaterial.material}
                            onValueChange={(value) => setNewMaterial({ ...newMaterial, material: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select material type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Bricks (Standard)">Bricks (Standard)</SelectItem>
                              <SelectItem value="Cement (50kg)">Cement (50kg)</SelectItem>
                              <SelectItem value="Steel TMT Bars">Steel TMT Bars</SelectItem>
                              <SelectItem value="Sand (River)">Sand (River)</SelectItem>
                              <SelectItem value="Stone (Crushed)">Stone (Crushed)</SelectItem>
                              <SelectItem value="Floor Tiles">Floor Tiles</SelectItem>
                              <SelectItem value="Wall Paint">Wall Paint</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Unit</Label>
                          <Input
                            value={newMaterial.unit}
                            onChange={(e) => setNewMaterial({ ...newMaterial, unit: e.target.value })}
                            required
                            placeholder="e.g., 1 bag, 1 brick, 1 sq.ft"
                          />
                        </div>
                        <div>
                          <Label>Unit Price (Rs)</Label>
                          <Input
                            type="number"
                            value={newMaterial.price}
                            onChange={(e) => setNewMaterial({ ...newMaterial, price: parseFloat(e.target.value) || 0 })}
                            required
                            placeholder="Enter price in Rupees"
                          />
                        </div>
                        <Button type="submit" className="w-full bg-[#FF6B35] hover:bg-[#E55A2B]">
                          Add Material
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {materials.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No materials added yet</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Material</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Unit Price (Rs)</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {materials.map((material) => (
                        <TableRow key={material.id}>
                          <TableCell>{material.material}</TableCell>
                          <TableCell>{material.unit}</TableCell>
                          <TableCell>
                            {editingMaterial === material.id ? (
                              <Input
                                type="number"
                                defaultValue={material.price}
                                className="w-32"
                                onBlur={(e) => handleUpdateMaterial(material.id, parseFloat(e.target.value) || material.price)}
                              />
                            ) : (
                              <span>Rs. {material.price.toLocaleString()}</span>
                            )}
                          </TableCell>
                          <TableCell>{material.lastUpdated}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => setEditingMaterial(material.id)}
                              >
                                <Edit className="size-4 mr-1" />
                                Edit
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleDeleteMaterial(material.id)}
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

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
  );
}