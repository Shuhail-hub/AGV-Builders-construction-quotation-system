import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Building2, FileText, Receipt, AlertCircle, Download, LogOut, Edit2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface CustomerDashboardProps {
  customer: {
    name: string;
    project: string;
    username: string;
  };
}

export default function CustomerDashboard({ customer }: CustomerDashboardProps) {
  const [complaint, setComplaint] = useState({
    subject: '',
    description: '',
    file: null as File | null
  });

  const [windowType, setWindowType] = useState<{ [key: string]: string }>({
    groundFloorLiving: 'Wood',
    firstFloorBedroom: 'Aluminium'
  });

  const projectData = {
    budget: 2020000,
    progress: 65,
    status: 'In Progress'
  };

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Complaint/Report submitted successfully! Admin will review it soon.');
    setComplaint({ subject: '', description: '', file: null });
  };

  const handleSaveChanges = () => {
    toast.success('Changes saved and sent to admin for review!', {
      description: 'Admin will finalize the updated quotation'
    });
  };

  const handleApproveQuotation = () => {
    toast.success('Quotation approved successfully!', {
      description: 'Work will commence as per the approved quotation'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1F2937] text-white py-4 px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Building2 className="size-8 text-[#FF6B35]" />
            <div>
              <h1 className="text-xl">A.G.V Builders</h1>
              <p className="text-sm text-gray-400">Customer Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">Welcome,</p>
              <p>{customer.name}</p>
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
        {/* Project Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600 mb-1">Project Name</p>
              <p className="text-lg">{customer.project}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600 mb-1">Budget</p>
              <p className="text-lg text-[#FF6B35]">Rs. {projectData.budget.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600 mb-1">Status</p>
              <Badge className="bg-blue-500">{projectData.status}</Badge>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="quotation" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="quotation">Quotation</TabsTrigger>
            <TabsTrigger value="bills">Supplier Bills</TabsTrigger>
            <TabsTrigger value="invoice">Final Invoice</TabsTrigger>
            <TabsTrigger value="complaint">Report Issue</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="quotation">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Detailed Quotation Breakdown</CardTitle>
                  <Button variant="outline">
                    <Download className="size-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Ground Floor */}
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <h3 className="mb-4 text-lg text-[#FF6B35]">Ground Floor</h3>
                    
                    {/* Living Room */}
                    <div className="border rounded-lg bg-white p-4 mb-3">
                      <h4 className="mb-3">Living Room</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                          <p className="text-gray-600">Bricks</p>
                          <p>2000 units × Rs. 15</p>
                          <p className="text-[#FF6B35]">Rs. 30,000</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Floor Tiles</p>
                          <p>350 sq.ft × Rs. 120</p>
                          <p className="text-[#FF6B35]">Rs. 42,000</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Windows</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Select 
                              value={windowType.groundFloorLiving} 
                              onValueChange={(val) => setWindowType({...windowType, groundFloorLiving: val})}
                            >
                              <SelectTrigger className="w-32 h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Wood">Wood</SelectItem>
                                <SelectItem value="Aluminium">Aluminium</SelectItem>
                              </SelectContent>
                            </Select>
                            <Edit2 className="size-4 text-gray-400" />
                          </div>
                          <p className="text-[#FF6B35] mt-1">Rs. 25,000</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Paint</p>
                          <p>30 liters × Rs. 450</p>
                          <p className="text-[#FF6B35]">Rs. 13,500</p>
                        </div>
                      </div>
                    </div>

                    {/* Kitchen */}
                    <div className="border rounded-lg bg-white p-4 mb-3">
                      <h4 className="mb-3">Kitchen</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                          <p className="text-gray-600">Wall Tiles</p>
                          <p>200 sq.ft × Rs. 180</p>
                          <p className="text-[#FF6B35]">Rs. 36,000</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Granite Counter</p>
                          <p>25 sq.ft × Rs. 800</p>
                          <p className="text-[#FF6B35]">Rs. 20,000</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Cabinets</p>
                          <p>8 ft × Rs. 3,500</p>
                          <p className="text-[#FF6B35]">Rs. 28,000</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Sink & Fixtures</p>
                          <p>1 set</p>
                          <p className="text-[#FF6B35]">Rs. 18,000</p>
                        </div>
                      </div>
                    </div>

                    {/* Bathroom */}
                    <div className="border rounded-lg bg-white p-4">
                      <h4 className="mb-3">Bathroom</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                          <p className="text-gray-600">Ceramic Tiles</p>
                          <p>150 sq.ft × Rs. 150</p>
                          <p className="text-[#FF6B35]">Rs. 22,500</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Sanitary Ware</p>
                          <p>1 set</p>
                          <p className="text-[#FF6B35]">Rs. 35,000</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Fittings</p>
                          <p>Complete set</p>
                          <p className="text-[#FF6B35]">Rs. 15,000</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Shower & Tap</p>
                          <p>Premium quality</p>
                          <p className="text-[#FF6B35]">Rs. 12,000</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* First Floor */}
                  <div className="border rounded-lg p-4 bg-blue-50">
                    <h3 className="mb-4 text-lg text-blue-700">First Floor</h3>
                    
                    {/* Bedroom */}
                    <div className="border rounded-lg bg-white p-4 mb-3">
                      <h4 className="mb-3">Master Bedroom</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                          <p className="text-gray-600">Bricks</p>
                          <p>1800 units × Rs. 15</p>
                          <p className="text-[#FF6B35]">Rs. 27,000</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Wooden Flooring</p>
                          <p>400 sq.ft × Rs. 250</p>
                          <p className="text-[#FF6B35]">Rs. 100,000</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Windows</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Select 
                              value={windowType.firstFloorBedroom} 
                              onValueChange={(val) => setWindowType({...windowType, firstFloorBedroom: val})}
                            >
                              <SelectTrigger className="w-32 h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Wood">Wood</SelectItem>
                                <SelectItem value="Aluminium">Aluminium</SelectItem>
                              </SelectContent>
                            </Select>
                            <Edit2 className="size-4 text-gray-400" />
                          </div>
                          <p className="text-[#FF6B35] mt-1">Rs. 30,000</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Paint & Finish</p>
                          <p>40 liters × Rs. 500</p>
                          <p className="text-[#FF6B35]">Rs. 20,000</p>
                        </div>
                      </div>
                    </div>

                    {/* Attached Bathroom */}
                    <div className="border rounded-lg bg-white p-4">
                      <h4 className="mb-3">Attached Bathroom</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                          <p className="text-gray-600">Premium Tiles</p>
                          <p>120 sq.ft × Rs. 200</p>
                          <p className="text-[#FF6B35]">Rs. 24,000</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Sanitary Items</p>
                          <p>Luxury set</p>
                          <p className="text-[#FF6B35]">Rs. 45,000</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Bathtub</p>
                          <p>Acrylic 5ft</p>
                          <p className="text-[#FF6B35]">Rs. 55,000</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Mirror & Lights</p>
                          <p>Complete set</p>
                          <p className="text-[#FF6B35]">Rs. 18,000</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="border rounded-lg p-4 bg-green-50">
                    <div className="flex justify-between items-center mb-2">
                      <span>Total Materials Cost</span>
                      <span className="text-xl text-[#FF6B35]">Rs. 850,000</span>
                    </div>
                    <div className="flex justify-between items-center mb-2 text-sm">
                      <span className="text-gray-600">Labour & Charges</span>
                      <span>Rs. 205,000</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-lg">Grand Total</span>
                      <span className="text-2xl text-[#FF6B35]">Rs. 1,055,000</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button onClick={handleSaveChanges} variant="outline" className="flex-1">
                      <Edit2 className="size-4 mr-2" />
                      Save Changes & Send for Review
                    </Button>
                    <Button onClick={handleApproveQuotation} className="flex-1 bg-green-500 hover:bg-green-600">
                      <CheckCircle className="size-4 mr-2" />
                      Approve Quotation
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bills">
            <Card>
              <CardHeader>
                <CardTitle>Supplier Bills & Additional Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="border rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <p className="mb-1">Lanka Building Supplies - Cement & Steel</p>
                      <p className="text-sm text-gray-600">Bill Date: Oct 12, 2025</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg">Rs. 740,000</p>
                      <Button size="sm" variant="outline" className="mt-2">
                        <FileText className="size-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <p className="mb-1">Perera Hardware - Electrical Items</p>
                      <p className="text-sm text-gray-600">Bill Date: Oct 14, 2025</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg">Rs. 180,000</p>
                      <Button size="sm" variant="outline" className="mt-2">
                        <FileText className="size-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 flex justify-between items-center bg-yellow-50">
                    <div>
                      <p className="mb-1">Additional Order - Shortage Materials</p>
                      <p className="text-sm text-gray-600">Order Date: Oct 15, 2025</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg">Rs. 45,000</p>
                      <Badge className="bg-yellow-500 mt-1">Additional</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoice">
            <Card>
              <CardHeader>
                <CardTitle>Final Invoice</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="mb-2">Invoice #INV-2025-001</h3>
                      <p className="text-sm text-gray-600">Date: October 17, 2025</p>
                      <p className="text-sm text-gray-600">Project: {customer.project}</p>
                    </div>
                    <Button className="bg-[#FF6B35] hover:bg-[#E55A2B]">
                      <Download className="size-4 mr-2" />
                      Download Invoice
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm pb-2 border-b">
                      <span className="text-gray-600">Initial Quotation</span>
                      <span>Rs. 850,000</span>
                    </div>
                    <div className="flex justify-between text-sm pb-2 border-b">
                      <span className="text-gray-600">Supplier Bills</span>
                      <span>Rs. 920,000</span>
                    </div>
                    <div className="flex justify-between text-sm pb-2 border-b">
                      <span className="text-gray-600">Additional Orders</span>
                      <span>Rs. 45,000</span>
                    </div>
                    <div className="flex justify-between text-sm pb-2 border-b text-red-600">
                      <span>Excess Material Refund</span>
                      <span>- Rs. 25,000</span>
                    </div>
                    <div className="flex justify-between text-sm pb-2 border-b">
                      <span className="text-gray-600">Electricity, Water & Labour</span>
                      <span>Rs. 135,000</span>
                    </div>
                    <div className="flex justify-between text-sm pb-2 border-b">
                      <span className="text-gray-600">Transport</span>
                      <span>Rs. 70,000</span>
                    </div>
                    
                    <div className="flex justify-between pt-3">
                      <span className="text-xl">Final Total</span>
                      <span className="text-xl text-[#FF6B35]">Rs. 1,995,000</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="complaint">
            <Card>
              <CardHeader>
                <CardTitle>Report Issue / Submit Complaint</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleComplaintSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="subject">Subject / Title</Label>
                    <Input
                      id="subject"
                      value={complaint.subject}
                      onChange={(e) => setComplaint({ ...complaint, subject: e.target.value })}
                      required
                      placeholder="Brief description of the issue"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description / Details</Label>
                    <Textarea
                      id="description"
                      value={complaint.description}
                      onChange={(e) => setComplaint({ ...complaint, description: e.target.value })}
                      required
                      rows={6}
                      placeholder="Provide detailed information about the issue..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="file">Upload Image/Document (Optional)</Label>
                    <Input
                      id="file"
                      type="file"
                      onChange={(e) => setComplaint({ ...complaint, file: e.target.files?.[0] || null })}
                      accept="image/*,.pdf"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-[#FF6B35] hover:bg-[#E55A2B]">
                    <AlertCircle className="size-4 mr-2" />
                    Submit Report
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>System Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded">
                    <p className="mb-1">Quotation Approved</p>
                    <p className="text-sm text-gray-600">Your quotation has been approved. Work will commence soon.</p>
                    <p className="text-xs text-gray-500 mt-2">Oct 11, 2025 - 10:30 AM</p>
                  </div>

                  <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
                    <p className="mb-1">Invoice Generated</p>
                    <p className="text-sm text-gray-600">Your final invoice has been generated and is ready for download.</p>
                    <p className="text-xs text-gray-500 mt-2">Oct 17, 2025 - 2:15 PM</p>
                  </div>

                  <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded">
                    <p className="mb-1">Additional Order Created</p>
                    <p className="text-sm text-gray-600">An additional order for shortage materials has been placed.</p>
                    <p className="text-xs text-gray-500 mt-2">Oct 15, 2025 - 4:00 PM</p>
                  </div>

                  <div className="border-l-4 border-[#FF6B35] bg-orange-50 p-4 rounded">
                    <p className="mb-1">Project Progress Update</p>
                    <p className="text-sm text-gray-600">Your project is now 65% complete. Estimated completion: Nov 30, 2025</p>
                    <p className="text-xs text-gray-500 mt-2">Oct 16, 2025 - 11:00 AM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}