import Navbar from './Navbar';
import { ImageWithFallback } from './figma/ImageWithFallback';

const galleryImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1618843312876-afbe4c91736d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYwNjE3NjM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Construction Site',
    category: 'Site Work'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1548513911-04b11713e7ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NjA2NzQ3MTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Completed Building',
    category: 'Completed'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1729551610640-e8adee1172e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBibHVlcHJpbnQlMjBwbGFuc3xlbnwxfHx8fDE3NjA2MDY0OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Blueprint Planning',
    category: 'Planning'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1718209962486-4f91ce71886b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjB3b3JrZXJzJTIwdGVhbXxlbnwxfHx8fDE3NjA2NDMyNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Our Team',
    category: 'Team'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1618843312876-afbe4c91736d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYwNjE3NjM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Foundation Work',
    category: 'Site Work'
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1548513911-04b11713e7ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NjA2NzQ3MTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Modern Architecture',
    category: 'Completed'
  }
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl mb-4 text-[#1F2937]">Project Gallery</h1>
        <p className="text-gray-600 mb-8">
          Explore our construction sites, completed projects, and the skilled team behind them
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <div key={image.id} className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <ImageWithFallback
                src={image.url}
                alt={image.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="mb-1">{image.title}</h3>
                  <p className="text-sm text-gray-200">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
