import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const projects = [
  {
    id: 1,
    name: 'Luxury Villa Complex',
    location: 'colombo',
    image: 'https://images.unsplash.com/photo-1548513911-04b11713e7ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NjA2NzQ3MTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'ongoing',
    description: '15 luxury villas with modern amenities',
    area: '25,000 sq.ft'
  },
  {
    id: 2,
    name: 'Commercial Plaza',
    location: 'Kandy',
    image: 'https://images.unsplash.com/photo-1618843312876-afbe4c91736d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYwNjE3NjM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'ongoing',
    description: 'Multi-story commercial complex',
    area: '50,000 sq.ft'
  },
  {
    id: 3,
    name: 'Residential Apartments',
    location: 'Jaffna',
    image: 'https://images.unsplash.com/photo-1729551610640-e8adee1172e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBibHVlcHJpbnQlMjBwbGFuc3xlbnwxfHx8fDE3NjA2MDY0OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'completed',
    description: '100 unit residential complex',
    area: '80,000 sq.ft'
  },
  {
    id: 4,
    name: 'Tech Park Development',
    location: 'Trincomale',
    image: 'https://images.unsplash.com/photo-1548513911-04b11713e7ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NjA2NzQ3MTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'completed',
    description: 'State-of-the-art IT park',
    area: '120,000 sq.ft'
  }
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState('all');

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.status === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl mb-8 text-[#1F2937]">Our Projects</h1>
        
        <Tabs defaultValue="all" className="mb-8" onValueChange={setFilter}>
          <TabsList>
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-56">
                <ImageWithFallback
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm text-white ${
                  project.status === 'ongoing' ? 'bg-blue-500' : 'bg-green-500'
                }`}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="mb-2">{project.name}</h3>
                <p className="text-gray-600 mb-2">{project.location}</p>
                <p className="text-gray-700 mb-2">{project.description}</p>
                <p className="text-sm text-gray-500 mb-4">Area: {project.area}</p>
                <Link to="/customer/login">
                  <Button className="w-full bg-[#FF6B35] hover:bg-[#E55A2B]">
                    Login to View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
