import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { UserPlus, Eye, Mail, Edit, Check, X } from 'lucide-react';
import { toast } from 'sonner';

const mockSuppliers = [
  { id: 1, name: 'Lanka Building Supplies', type: 'Cement & Steel', email: 'lanka@supplies.lk', contact: '+94 11 234 5678', status: 'Active' },
  { id: 2, name: 'Perera Hardware', type: 'Electrical Items', email: 'perera@hardware.lk', contact: '+94 11 345 6789', status: 'Active' },
  { id: 3, name: 'Silva Traders', type: 'Plumbing & Fittings', email: 'silva@traders.lk', contact: '+94 11 456 7890', status: 'Active' },
  { id: 4, name: 'Fernando Paints', type: 'Paint & Finishing', email: 'fernando@paints.lk', contact: '+94 11 567 8901', status: 'Active' }
];

interface Material {
  id: number;
  material: string;
  supplier: string;
  unit: string;
  price: number;
  lastUpdated: string;
  status: 'approved' | 'pending' | 'rejected';
}

const mockMaterials: Material[] = [
  { id: 1, material: 'Bricks (Standard)', supplier: 'Lanka Building Supplies', unit: '1 brick', price: 15, lastUpdated: '2025-10-15', status: 'approved' },
  { id: 2, material: 'Cement (50kg)', supplier: 'Lanka Building Supplies', unit: '1 bag', price: 1850, lastUpdated: '2025-10-15', status: 'approved' },
  { id: 3, material: 'Steel TMT Bars', supplier: 'Lanka Building Supplies', unit: '1 kg', price: 285, lastUpdated: '2025-10-16', status: 'approved' },
  { id: 4, material: 'Floor Tiles (2x2 ft)', supplier: 'Silva Traders', unit: '1 sq.ft', price: 150, lastUpdated: '2025-10-14', status: 'approved' },
  { id: 5, material: 'Sand (River)', supplier: 'Perera Hardware', unit: '1 cube', price: 4500, lastUpdated: '2025-10-17', status: 'pending' },
  { id: 6, material: 'Wood Window Frame', supplier: 'Fernando Paints', unit: '1 sq.ft', price: 3500, lastUpdated: '2025-10-10', status: 'approved' },
  { id: 7, material: 'Aluminium Window', supplier: 'Fernando Paints', unit: '1 sq.ft', price: 4500, lastUpdated: '2025-10-10', status: 'approved' },
];

export default function ManageSuppliers() {
  const [suppliers, setSuppliers] = useState(mockSuppliers);
  const [materials, setMaterials] = useState(mockMaterials);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<number | null>(null);
  const [editedPrice, setEditedPrice] = useState<number>(0);
  
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    email: '',
    contact: ''
  });

  const handleCreateSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    const username = formData.name.toLowerCase().replace(/\s+/g, '_');
    const password = 'supp' + Math.random().toString(36).slice(-8);
    
    toast.success(`Supplier created! Username: ${username}, Password: ${password} (sent via email)`);
    setIsDialogOpen(false);
    setFormData({ name: '', type: '', email: '', contact: '' });
  };

  const handleEditPrice = (materialId: number, currentPrice: number) => {
    setEditingMaterial(materialId);
    setEditedPrice(currentPrice);
  };

  const handleSavePrice = (materialId: number) => {
    setMaterials(materials.map(m => 
      m.id === materialId 
        ? { ...m, price: editedPrice, lastUpdated: new Date().toISOString().split('T')[0], status: 'approved' }
        : m
    ));
    setEditingMaterial(null);
    toast.success('Price updated successfully');
  };

  const handleCancelEdit = () => {
    setEditingMaterial(null);
  };

  const handleApprovePrice = (materialId: number) => {
    setMaterials(materials.map(m => 
      m.id === materialId ? { ...m, status: 'approved' } : m
    ));
    toast.success('Price change approved', {
      description: 'Supplier has been notified'
    });
  };

  const handleRejectPrice = (materialId: number) => {
    setMaterials(materials.map(m => 
      m.id === materialId ? { ...m, status: 'rejected' } : m
    ));
    toast.error('Price change rejected', {
      description: 'Supplier will be notified'
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl text-[#1F2937] mb-2">Manage Suppliers</h1>
              <p className="text-gray-600">View and manage supplier accounts & material prices</p>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#FF6B35] hover:bg-[#E55A2B]">
                  <UserPlus className="size-4 mr-2" />
                  Create Supplier Login
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Supplier</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateSupplier} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Supplier Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="e.g., Lanka Building Supplies"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Material Type</Label>
                    <Input
                      id="type"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      required
                      placeholder="e.g., Cement & Steel"
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
                      placeholder="e.g., supplier@email.lk"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact">Contact Number (+94 format)</Label>
                    <Input
                      id="contact"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      required
                      placeholder="e.g., +94 11 234 5678"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#FF6B35] hover:bg-[#E55A2B]">
                    Create & Send Credentials
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs defaultValue="suppliers" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="suppliers">Supplier Accounts</TabsTrigger>
              <TabsTrigger value="materials">
                Material Price List
                {materials.filter(m => m.status === 'pending').length > 0 && (
                  <Badge className="ml-2 bg-yellow-500">
                    {materials.filter(m => m.status === 'pending').length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="suppliers">
              <Card>
                <CardHeader>
                  <CardTitle>Supplier List</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Supplier Name</TableHead>
                        <TableHead>Material Type</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {suppliers.map((supplier) => (
                        <TableRow key={supplier.id}>
                          <TableCell>{supplier.name}</TableCell>
                          <TableCell>{supplier.type}</TableCell>
                          <TableCell>{supplier.email}</TableCell>
                          <TableCell>{supplier.contact}</TableCell>
                          <TableCell>
                            <Badge>{supplier.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => toast.info('Viewing orders for ' + supplier.name)}
                              >
                                <Eye className="size-4 mr-1" />
                                View Orders
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => toast.success('Credentials sent to ' + supplier.email)}
                              >
                                <Mail className="size-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => toast.success('Supplier deactivated')}
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
            </TabsContent>

            <TabsContent value="materials">
              <Card>
                <CardHeader>
                  <CardTitle>Material Price List</CardTitle>
                  <p className="text-sm text-gray-600 mt-2">
                    Manage all material prices. Pending changes require admin approval.
                  </p>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Material</TableHead>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Price (Rs)</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {materials.map((material) => (
                        <TableRow 
                          key={material.id}
                          className={material.status === 'pending' ? 'bg-yellow-50' : ''}
                        >
                          <TableCell>{material.material}</TableCell>
                          <TableCell>{material.supplier}</TableCell>
                          <TableCell>{material.unit}</TableCell>
                          <TableCell>
                            {editingMaterial === material.id ? (
                              <Input
                                type="number"
                                value={editedPrice}
                                onChange={(e) => setEditedPrice(parseFloat(e.target.value) || 0)}
                                className="w-32"
                              />
                            ) : (
                              <span>Rs. {material.price.toLocaleString()}</span>
                            )}
                          </TableCell>
                          <TableCell>{material.lastUpdated}</TableCell>
                          <TableCell>
                            <Badge 
                              className={
                                material.status === 'approved' ? 'bg-green-500' :
                                material.status === 'pending' ? 'bg-yellow-500' :
                                'bg-red-500'
                              }
                            >
                              {material.status.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {editingMaterial === material.id ? (
                                <>
                                  <Button 
                                    size="sm" 
                                    className="bg-green-500 hover:bg-green-600"
                                    onClick={() => handleSavePrice(material.id)}
                                  >
                                    <Check className="size-4" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={handleCancelEdit}
                                  >
                                    <X className="size-4" />
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleEditPrice(material.id, material.price)}
                                  >
                                    <Edit className="size-4 mr-1" />
                                    Edit
                                  </Button>
                                  {material.status === 'pending' && (
                                    <>
                                      <Button 
                                        size="sm" 
                                        className="bg-green-500 hover:bg-green-600"
                                        onClick={() => handleApprovePrice(material.id)}
                                      >
                                        <Check className="size-4 mr-1" />
                                        Approve
                                      </Button>
                                      <Button 
                                        size="sm" 
                                        variant="destructive"
                                        onClick={() => handleRejectPrice(material.id)}
                                      >
                                        <X className="size-4 mr-1" />
                                        Reject
                                      </Button>
                                    </>
                                  )}
                                </>
                              )}
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
