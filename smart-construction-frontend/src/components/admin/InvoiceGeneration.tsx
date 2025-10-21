import AdminSidebar from './AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { FileDown, Send } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

export default function InvoiceGeneration() {
  const [selectedProject, setSelectedProject] = useState('');
  const [additionalCharges, setAdditionalCharges] = useState({
    labour: 135000,
    electricity: 25000,
    water: 15000,
    transport: 30000
  });

  const [excessMaterialRefund, setExcessMaterialRefund] = useState(25000);

  const invoiceData = {
    initialQuotation: 850000,
    supplierBills: 920000,
    additionalOrders: 45000,
    excessRefund: excessMaterialRefund,
    labourCharges: additionalCharges.labour,
    electricityCharges: additionalCharges.electricity,
    waterCharges: additionalCharges.water,
    transportCharges: additionalCharges.transport
  };

  const totalAmount = 
    invoiceData.initialQuotation + 
    invoiceData.supplierBills + 
    invoiceData.additionalOrders + 
    invoiceData.labourCharges + 
    invoiceData.electricityCharges + 
    invoiceData.waterCharges + 
    invoiceData.transportCharges - 
    invoiceData.excessRefund;

  const handleGenerateInvoice = () => {
    toast.success('Invoice generated and downloaded!', {
      description: 'PDF file has been saved to your downloads'
    });
  };

  const handleSendToCustomer = () => {
    toast.success('Invoice sent to customer!', {
      description: 'Customer will receive the invoice via email'
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl text-[#1F2937] mb-2">Invoice Generation</h1>
            <p className="text-gray-600">Generate final invoices for completed projects</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Select Project</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={selectedProject} onValueChange={setSelectedProject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="villa">Modern Villa - Nimal Perera</SelectItem>
                      <SelectItem value="plaza">Commercial Complex - Kavindu Silva</SelectItem>
                      <SelectItem value="apartment">Apartment Building - Tharushi Fernando</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Labour & Fixed Charges</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="labour">Labour Charges (Rs)</Label>
                    <Input
                      id="labour"
                      type="number"
                      value={additionalCharges.labour}
                      onChange={(e) => setAdditionalCharges({ ...additionalCharges, labour: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="electricity">Electricity (Rs)</Label>
                    <Input
                      id="electricity"
                      type="number"
                      value={additionalCharges.electricity}
                      onChange={(e) => setAdditionalCharges({ ...additionalCharges, electricity: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="water">Water (Rs)</Label>
                    <Input
                      id="water"
                      type="number"
                      value={additionalCharges.water}
                      onChange={(e) => setAdditionalCharges({ ...additionalCharges, water: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="transport">Transport (Rs)</Label>
                    <Input
                      id="transport"
                      type="number"
                      value={additionalCharges.transport}
                      onChange={(e) => setAdditionalCharges({ ...additionalCharges, transport: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Excess Material Refund</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label htmlFor="excessRefund">Refund Amount (Rs)</Label>
                    <Input
                      id="excessRefund"
                      type="number"
                      value={excessMaterialRefund}
                      onChange={(e) => setExcessMaterialRefund(parseFloat(e.target.value) || 0)}
                    />
                    <p className="text-xs text-gray-500 mt-2">This amount will be deducted from the final total</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Invoice Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Initial Quotation</span>
                    <span>Rs. {invoiceData.initialQuotation.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Supplier Bills</span>
                    <span>Rs. {invoiceData.supplierBills.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Additional Orders</span>
                    <span>Rs. {invoiceData.additionalOrders.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-red-600">
                    <span>Excess Material Refund</span>
                    <span>- Rs. {excessMaterialRefund.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Labour Charges</span>
                    <span>Rs. {additionalCharges.labour.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Electricity</span>
                    <span>Rs. {additionalCharges.electricity.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Water</span>
                    <span>Rs. {additionalCharges.water.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Transport</span>
                    <span>Rs. {additionalCharges.transport.toLocaleString()}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-xl text-[#FF6B35]">
                    <span>Final Total</span>
                    <span>Rs. {totalAmount.toLocaleString()}</span>
                  </div>

                  <div className="space-y-2 pt-4">
                    <Button 
                      className="w-full bg-green-500 hover:bg-green-600"
                      onClick={handleGenerateInvoice}
                    >
                      <FileDown className="size-4 mr-2" />
                      Generate & Download PDF
                    </Button>
                    <Button 
                      className="w-full bg-[#FF6B35] hover:bg-[#E55A2B]"
                      onClick={handleSendToCustomer}
                    >
                      <Send className="size-4 mr-2" />
                      Send to Customer
                    </Button>
                  </div>

                  <p className="text-xs text-gray-500 mt-4">
                    Last Updated: {new Date().toLocaleString('en-GB', { 
                      day: '2-digit', 
                      month: 'short', 
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}