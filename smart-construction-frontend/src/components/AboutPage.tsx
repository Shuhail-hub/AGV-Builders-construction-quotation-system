import Navbar from './Navbar';
import { Building2, Award, Users, Target } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl mb-8 text-[#1F2937]">About A.G.V Builders</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl mb-4 text-[#1F2937]">Our Story</h2>
          <p className="text-gray-700 mb-4">
            A.G.V Builders was founded with a vision to revolutionize the construction industry through 
            technology and transparency. We combine traditional craftsmanship with modern digital tools 
            to deliver exceptional construction projects.
          </p>
          <p className="text-gray-700 mb-4">
            Our Smart Construction Cost Estimation & Quotation System ensures complete transparency in 
            pricing, material sourcing, and project management. We believe in building not just structures, 
            but lasting relationships with our customers and suppliers.
          </p>
          <p className="text-gray-700">
            With years of experience and hundreds of successful projects, we have become a trusted name 
            in the construction industry across India.
          </p>
        </div>

        <h2 className="text-2xl mb-8 text-[#1F2937]">Our Values</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="bg-[#FF6B35]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="size-8 text-[#FF6B35]" />
              </div>
              <h3 className="mb-2">Quality</h3>
              <p className="text-gray-600">
                We never compromise on quality of materials and workmanship
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="bg-[#FF6B35]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="size-8 text-[#FF6B35]" />
              </div>
              <h3 className="mb-2">Excellence</h3>
              <p className="text-gray-600">
                Striving for excellence in every project we undertake
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="bg-[#FF6B35]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="size-8 text-[#FF6B35]" />
              </div>
              <h3 className="mb-2">Integrity</h3>
              <p className="text-gray-600">
                Honest and transparent in all our dealings
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="bg-[#FF6B35]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="size-8 text-[#FF6B35]" />
              </div>
              <h3 className="mb-2">Innovation</h3>
              <p className="text-gray-600">
                Embracing technology to improve our services
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl mb-4 text-[#1F2937]">Contact Information</h2>
          <div className="space-y-2 text-gray-700">
            <p><strong>Address:</strong> WARD NO 06, KUMBURUPITTY, Trincomale</p>
            <p><strong>Phone:</strong> +94 98765 43210</p>
            <p><strong>Email:</strong> info@agvbuilders.com</p>
            <p><strong>Hours:</strong> Monday - Saturday, 9:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
