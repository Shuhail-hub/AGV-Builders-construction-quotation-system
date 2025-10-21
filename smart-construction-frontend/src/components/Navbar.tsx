import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <Building2 className="size-8 text-[#FF6B35]" />
            <span className="text-xl text-[#1F2937]">A.G.V Builders</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-[#4B5563] hover:text-[#FF6B35] transition-colors">
              Home
            </Link>
            <Link to="/projects" className="text-[#4B5563] hover:text-[#FF6B35] transition-colors">
              Projects
            </Link>
            <Link to="/gallery" className="text-[#4B5563] hover:text-[#FF6B35] transition-colors">
              Gallery
            </Link>
            <Link to="/about" className="text-[#4B5563] hover:text-[#FF6B35] transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="text-[#4B5563] hover:text-[#FF6B35] transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
