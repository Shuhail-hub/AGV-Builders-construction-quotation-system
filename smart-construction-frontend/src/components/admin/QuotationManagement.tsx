import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Plus, Send, FileCheck, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface MaterialItem {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
}

export default function QuotationManagement() {
  const [selectedProject, setSelectedProject] = useState('');
  const [materials, setMaterials] = useState<MaterialItem[]>([
    { id: 1, name: 'Cement (50kg bags)', quantity: 100, unit: 'bags', unitPrice: 400, total: 40000 },
    { id: 2, name: 'Steel TMT Bars', quantity: 5000, unit: 'kg', unitPrice: 65, total: 325000 },
    { id: 3, name: 'Bricks', quantity: 10000, unit: 'pieces', unitPrice: 8, total: 80000 }
  ]);
  
  const [newMaterial, setNewMaterial] = useState({
    name: '',
    quantity: 0,
    unit: '',
    unitPrice: 0
  });

  const totalAmount = materials.reduce((sum, item) => sum + item.total, 0);

  const handleAddMaterial = () => {
    if (newMaterial.name && newMaterial.quantity && newMaterial.unitPrice) {
      const material: MaterialItem = {
        id: materials.length + 1,
        ...newMaterial,
        total: newMaterial.quantity * newMaterial.unitPrice
      };
      setMaterials([...materials, material]);
      setNewMaterial({ name: '', quantity: 0, unit: '', unitPrice: 0 });
      toast.success('Material added to quotation');
    }
  };

  const handleRemoveMaterial = (id: number) => {
    setMaterials(materials.filter(m => m.id !== id));
    toast.success('Material removed');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl text-[#1F2937] mb-2">Quotation Management</h1>
            <p className="text-gray-600">Create and manage project quotations</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Select Project</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="villa">Luxury Villa Complex - Ramesh Kumar</SelectItem>
                    <SelectItem value="plaza">Commercial Plaza - Priya Sharma</SelectItem>
                    <SelectItem value="apartment">Apartment Building - Amit Patel</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Amount</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl text-[#FF6B35]">Rs. {totalAmount.toLocaleString()}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add Material</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <Label>Material Name</Label>
                  <Input
                    value={newMaterial.name}
                    onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
                    placeholder="e.g., Cement"
                  />
                </div>
                <div>
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    value={newMaterial.quantity || ''}
                    onChange={(e) => setNewMaterial({ ...newMaterial, quantity: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label>Unit</Label>
                  <Input
                    value={newMaterial.unit}
                    onChange={(e) => setNewMaterial({ ...newMaterial, unit: e.target.value })}
                    placeholder="kg, bags, etc."
                  />
                </div>
                <div>
                  <Label>Unit Price (Rs)</Label>
                  <Input
                    type="number"
                    value={newMaterial.unitPrice || ''}
                    onChange={(e) => setNewMaterial({ ...newMaterial, unitPrice: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleAddMaterial} className="w-full bg-[#FF6B35] hover:bg-[#E55A2B]">
                    <Plus className="size-4 mr-2" />
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Material List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Material Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {materials.map((material) => (
                    <TableRow key={material.id}>
                      <TableCell>{material.name}</TableCell>
                      <TableCell>{material.quantity}</TableCell>
                      <TableCell>{material.unit}</TableCell>
                      <TableCell>Rs. {material.unitPrice.toLocaleString()}</TableCell>
                      <TableCell>Rs. {material.total.toLocaleString()}</TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleRemoveMaterial(material.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => toast.success('Quotation sent to customer for review')}>
              <Send className="size-4 mr-2" />
              Send to Customer for Review
            </Button>
            <Button className="bg-green-500 hover:bg-green-600" onClick={() => toast.success('Quotation finalized and orders sent to suppliers')}>
              <FileCheck className="size-4 mr-2" />
              Finalize Quotation & Send Orders
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
