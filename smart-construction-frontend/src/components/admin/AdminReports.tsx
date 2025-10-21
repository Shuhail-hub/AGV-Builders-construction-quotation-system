import AdminSidebar from './AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { FileDown } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

const reportTypes = [
  { value: 'material', label: 'Material Usage Report', description: 'Track material consumption across projects' },
  { value: 'cost', label: 'Cost Summary Report', description: 'Detailed cost breakdown and analysis' },
  { value: 'supplier', label: 'Supplier Delivery Report', description: 'Supplier performance and delivery tracking' },
  { value: 'project', label: 'Project Status Report', description: 'Overall project progress and status' }
];

export default function AdminReports() {
  const [selectedReport, setSelectedReport] = useState('');
  const [dateRange, setDateRange] = useState('month');

  const handleGenerateReport = () => {
    if (selectedReport) {
      toast.success('Report generated and ready for download');
    } else {
      toast.error('Please select a report type');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl text-[#1F2937] mb-2">Reports & Analytics</h1>
            <p className="text-gray-600">Generate detailed reports for analysis</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Report Type</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedReport} onValueChange={setSelectedReport}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose report type" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map((report) => (
                      <SelectItem key={report.value} value={report.value}>
                        {report.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Date Range</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Last Week</SelectItem>
                    <SelectItem value="month">Last Month</SelectItem>
                    <SelectItem value="quarter">Last Quarter</SelectItem>
                    <SelectItem value="year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-[#FF6B35] hover:bg-[#E55A2B]"
                  onClick={handleGenerateReport}
                >
                  <FileDown className="size-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reportTypes.map((report) => (
              <Card key={report.value} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedReport(report.value)}>
                <CardHeader>
                  <CardTitle>{report.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{report.description}</p>
                  <Button variant="outline" className="w-full">
                    Select Report
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
