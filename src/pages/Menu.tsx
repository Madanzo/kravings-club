
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const products = [
  {
    id: 1,
    name: 'OG Kush',
    category: 'Flower',
    thc: '24%',
    price: 45,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=300&fit=crop',
    description: 'Classic strain with earthy pine flavors',
    effects: ['Relaxing', 'Euphoric', 'Happy']
  },
  {
    id: 2,
    name: 'Blue Dream Cart',
    category: 'Vape Cartridge',
    thc: '89%',
    price: 55,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=300&fit=crop',
    description: 'Smooth vaping experience with berry notes',
    effects: ['Creative', 'Uplifting', 'Focused']
  },
  {
    id: 3,
    name: 'Mixed Berry Gummies',
    category: 'Edibles',
    thc: '10mg each',
    price: 25,
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=300&fit=crop',
    description: 'Delicious gummies with precise dosing',
    effects: ['Relaxing', 'Body High', 'Sleepy']
  }
];

const Menu = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our Menu
              </h1>
              <p className="text-xl text-gray-600">
                Premium cannabis products delivered fast
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold">{product.name}</h3>
                        <Badge variant="secondary">{product.category}</Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{product.description}</p>
                      
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="font-semibold text-pink-600">THC: {product.thc}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {product.effects.map((effect) => (
                          <Badge key={effect} variant="outline" className="text-xs">
                            {effect}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-pink-600">
                          ${product.price}
                        </span>
                        <Button className="brand-gradient text-white">
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Menu;
