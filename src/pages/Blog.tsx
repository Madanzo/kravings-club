import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Ultimate Guide to Cannabis Delivery in Southern California",
      excerpt: "Everything you need to know about cannabis delivery services, from legal requirements to choosing the right products for your needs.",
      author: "Kravings Team",
      date: "June 28, 2025",
      category: "Education",
      image: "/api/placeholder/400/250",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Understanding Cannabis Potency: THC vs CBD Explained",
      excerpt: "Learn the difference between THC and CBD, how potency affects your experience, and how to choose products that match your tolerance level.",
      author: "Dr. Sarah Martinez",
      date: "June 25, 2025",
      category: "Education",
      image: "/api/placeholder/400/250",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "New Product Alert: Premium Indoor Flower Collection",
      excerpt: "Discover our latest collection of premium indoor-grown flower featuring top-shelf strains with exceptional quality and potency.",
      author: "Product Team",
      date: "June 22, 2025",
      category: "Products",
      image: "/api/placeholder/400/250",
      readTime: "3 min read"
    },
    {
      id: 4,
      title: "Cannabis Storage Tips: Keeping Your Products Fresh",
      excerpt: "Proper storage is crucial for maintaining the quality and potency of your cannabis products. Learn the best practices for storage at home.",
      author: "Kravings Team",
      date: "June 20, 2025",
      category: "Tips",
      image: "/api/placeholder/400/250",
      readTime: "4 min read"
    },
    {
      id: 5,
      title: "Exploring Cannabis Edibles: Dosage and Effects Guide",
      excerpt: "A comprehensive guide to cannabis edibles, including proper dosing, onset times, and what to expect from different types of edible products.",
      author: "Dr. Michael Chen",
      date: "June 18, 2025",
      category: "Education",
      image: "/api/placeholder/400/250",
      readTime: "8 min read"
    },
    {
      id: 6,
      title: "Kravings Club Expansion: Now Serving More Areas",
      excerpt: "We're excited to announce our service expansion to additional areas in Southern California, bringing fast delivery to more customers.",
      author: "Kravings Team",
      date: "June 15, 2025",
      category: "News",
      image: "/api/placeholder/400/250",
      readTime: "2 min read"
    }
  ];

  const categories = ["All", "Education", "Products", "Tips", "News"];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-hero font-black mb-8 text-center font-barlow text-kravings-500">
              Kravings Club Blog
            </h1>
            
            <div className="text-center mb-12">
              <p className="text-xl font-barlow text-gray-700 mb-6">
                Stay informed with the latest cannabis news, product updates, and educational content
              </p>
              
              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={category === "All" ? "default" : "outline"}
                    className={`font-barlow text-sm ${
                      category === "All" 
                        ? "bg-kravings-500 hover:bg-kravings-600 text-white" 
                        : "text-gray-700 hover:text-kravings-500 border-gray-300"
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Featured Post */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="h-64 md:h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 font-barlow">Featured Image</span>
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="bg-kravings-500 text-white px-3 py-1 rounded-full text-sm font-barlow font-medium">
                      Featured
                    </span>
                    <span className="text-kravings-500 text-sm font-barlow font-medium">
                      {blogPosts[0].category}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-barlow font-black text-gray-900 mb-4">
                    {blogPosts[0].title}
                  </h2>
                  <p className="font-barlow text-gray-700 mb-6">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span className="font-barlow">{blogPosts[0].author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span className="font-barlow">{blogPosts[0].date}</span>
                      </div>
                      <span className="font-barlow">{blogPosts[0].readTime}</span>
                    </div>
                    <Button className="bg-kravings-500 hover:bg-kravings-600 text-white font-barlow">
                      Read More <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(1).map((post) => (
                <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 font-barlow">Article Image</span>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Tag className="w-4 h-4 text-kravings-500" />
                      <span className="text-kravings-500 text-sm font-barlow font-medium">
                        {post.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-barlow font-bold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="font-barlow text-gray-700 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span className="font-barlow">{post.author}</span>
                      </div>
                      <span className="font-barlow">{post.readTime}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="font-barlow">{post.date}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="font-barlow text-kravings-500 border-kravings-500 hover:bg-kravings-500 hover:text-white"
                      >
                        Read More
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="mt-16 bg-kravings-500 text-white p-8 rounded-lg text-center">
              <h2 className="text-h2 font-bold font-barlow mb-4">
                Stay Updated with Kravings Club
              </h2>
              <p className="text-lg font-barlow mb-6">
                Subscribe to our newsletter for the latest product updates, cannabis education, and exclusive deals.
              </p>
              <div className="max-w-md mx-auto flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded font-barlow text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <Button className="bg-white text-kravings-500 hover:bg-gray-100 px-6 py-3 font-barlow font-bold">
                  Subscribe
                </Button>
              </div>
              <p className="text-sm font-barlow mt-4 text-white/80">
                By subscribing, you agree to receive marketing emails. You can unsubscribe at any time.
              </p>
            </div>

            {/* Legal Notice */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg text-center">
              <p className="font-barlow text-gray-700 text-sm">
                <strong>Disclaimer:</strong> The content on this blog is for informational purposes only and does not 
                constitute medical advice. Consult with a healthcare professional before using cannabis products. 
                Must be 21+ to view cannabis-related content.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;