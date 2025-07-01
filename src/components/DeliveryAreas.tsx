
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, DollarSign } from 'lucide-react';

const deliveryAreas = [
  'Cerritos', 'Downey', 'Long Beach', 'Lynwood', 
  'South Bay', 'Torrance', 'Los Alamitos', 'Inglewood'
];

const DeliveryAreas = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Fast Delivery Across LA County
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We deliver premium cannabis products to your door in 20-45 minutes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {deliveryAreas.map((area, index) => (
                <div 
                  key={area}
                  className="bg-pink-50 text-pink-700 px-4 py-2 rounded-lg text-center font-medium hover:bg-pink-100 transition-colors cursor-pointer"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {area}
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <Card className="border-l-4 border-l-pink-500">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Clock className="w-8 h-8 text-pink-600" />
                    <div>
                      <h3 className="font-semibold text-lg">Quick Delivery</h3>
                      <p className="text-gray-600">20-45 minute delivery window</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-coral-500">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <DollarSign className="w-8 h-8 text-coral-600" />
                    <div>
                      <h3 className="font-semibold text-lg">Low Minimum</h3>
                      <p className="text-gray-600">$30 minimum order for delivery</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-tropical-500">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <MapPin className="w-8 h-8 text-tropical-600" />
                    <div>
                      <h3 className="font-semibold text-lg">Wide Coverage</h3>
                      <p className="text-gray-600">Serving 8+ cities across LA County</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-pink-100 to-coral-100 rounded-xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-pink-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Check Your Area
                </h3>
                <p className="text-gray-600 mb-6">
                  Enter your address to see if we deliver to you
                </p>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <input
                    type="text"
                    placeholder="Enter your zip code"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryAreas;
