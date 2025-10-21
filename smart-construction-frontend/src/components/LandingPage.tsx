import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { Building2, Clock, Shield, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const featuredProjects = [
  {
    id: 1,
    name: 'Luxury Villa Complex',
    location: 'Bangalore',
    image: 'https://images.unsplash.com/photo-1548513911-04b11713e7ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NjA2NzQ3MTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'Ongoing'
  },
  {
    id: 2,
    name: 'Commercial Plaza',
    location: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1618843312876-afbe4c91736d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYwNjE3NjM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'Ongoing'
  },
  {
    id: 3,
    name: 'Residential Apartments',
    location: 'Hyderabad',
    image: 'https://images.unsplash.com/photo-1729551610640-e8adee1172e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBibHVlcHJpbnQlMjBwbGFuc3xlbnwxfHx8fDE3NjA2MDY0OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'Completed'
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[600px] bg-cover bg-center" style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1618843312876-afbe4c91736d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYwNjE3NjM5fDA&ixlib=rb-4.1.0&q=80&w=1080)'
      }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-5xl mb-6">Building Trust with Technology</h1>
            <p className="text-xl mb-8 text-gray-200">
              Smart Construction Cost Estimation & Quotation System
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/customer/login">
                <Button className="bg-[#FF6B35] hover:bg-[#E55A2B]">
                  Customer Login
                </Button>
              </Link>
              <Link to="/supplier/login">
                <Button className="bg-white text-[#1F2937] hover:bg-gray-100">
                  Supplier Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-center text-3xl mb-12 text-[#1F2937]">Why Choose A.G.V Builders</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="bg-[#FF6B35]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="size-8 text-[#FF6B35]" />
              </div>
              <h3 className="mb-2">On-Time Delivery</h3>
              <p className="text-gray-600">Projects completed within deadline with quality assurance</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="bg-[#FF6B35]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="size-8 text-[#FF6B35]" />
              </div>
              <h3 className="mb-2">Transparent Pricing</h3>
              <p className="text-gray-600">Clear quotations with detailed cost breakdowns</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="bg-[#FF6B35]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="size-8 text-[#FF6B35]" />
              </div>
              <h3 className="mb-2">Expert Team</h3>
              <p className="text-gray-600">Skilled professionals with years of experience</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="bg-[#FF6B35]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="size-8 text-[#FF6B35]" />
              </div>
              <h3 className="mb-2">Quality Materials</h3>
              <p className="text-gray-600">Premium materials from trusted suppliers</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl mb-12 text-[#1F2937]">Featured Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-[#FF6B35] text-white px-3 py-1 rounded-full text-sm">
                    {project.status}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-2">{project.name}</h3>
                  <p className="text-gray-600 mb-4">{project.location}</p>
                  <Link to="/projects">
                    <Button variant="outline" className="w-full border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white">
                      Explore
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1F2937] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 A.G.V Builders. All rights reserved.</p>
          <div className="mt-4">
            <Link to="/admin/login" className="text-gray-400 hover:text-white text-sm">
              Admin Login
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
