
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah M.',
    location: 'Long Beach',
    rating: 5,
    text: 'Amazing service! Order arrived in 25 minutes and the quality is top-notch. Will definitely order again.',
  },
  {
    name: 'Mike R.',
    location: 'Torrance',
    rating: 5,
    text: 'Best cannabis delivery service in LA County. Professional drivers and great product selection.',
  },
  {
    name: 'Jessica L.',
    location: 'Downey',
    rating: 5,
    text: 'Fast delivery, excellent customer service, and amazing BOGO deals. Highly recommend Kravings Club!',
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600">
            Join 1,000+ happy customers across LA County
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.name} 
              className="hover:shadow-lg transition-shadow duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-coral-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-pink-700">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-sm">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-coral-500 fill-current" />
              ))}
            </div>
            <span className="text-lg font-semibold text-gray-900">4.9 out of 5</span>
            <span className="text-gray-600">from 1,000+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
