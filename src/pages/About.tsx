import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-hero font-black mb-8 text-center font-barlow text-kravings-500">
              About Kravings Club
            </h1>
            
            <div className="prose max-w-none">
              <div className="text-center mb-12">
                <p className="text-xl font-barlow text-gray-700 mb-6">
                  Your premier cannabis delivery service in Southern California
                </p>
                <div className="bg-kravings-500 text-white p-6 rounded-lg inline-block">
                  <p className="font-barlow font-bold text-lg">
                    Licensed Cannabis Retailer<br />
                    License #C9-000555-LIC<br />
                    DCC State CA Retail
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h2 className="text-h2 font-bold font-barlow text-kravings-500 mb-4">Our Story</h2>
                  <p className="font-barlow text-gray-700 mb-4">
                    Kravings Club was founded with a simple mission: to provide the highest quality cannabis products 
                    with unmatched convenience and service. We understand that our customers deserve premium products 
                    delivered quickly and discreetly to their doorstep.
                  </p>
                  <p className="font-barlow text-gray-700">
                    As a fully licensed cannabis delivery service, we pride ourselves on maintaining the highest 
                    standards of compliance, quality, and customer satisfaction in Southern California.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-h2 font-bold font-barlow text-kravings-500 mb-4">Our Promise</h2>
                  <ul className="space-y-3 font-barlow text-gray-700">
                    <li className="flex items-start">
                      <span className="text-kravings-500 mr-2">•</span>
                      Premium quality cannabis products from trusted sources
                    </li>
                    <li className="flex items-start">
                      <span className="text-kravings-500 mr-2">•</span>
                      Fast 20-45 minute delivery across our service areas
                    </li>
                    <li className="flex items-start">
                      <span className="text-kravings-500 mr-2">•</span>
                      Discreet and professional delivery service
                    </li>
                    <li className="flex items-start">
                      <span className="text-kravings-500 mr-2">•</span>
                      Competitive pricing and exclusive deals
                    </li>
                    <li className="flex items-start">
                      <span className="text-kravings-500 mr-2">•</span>
                      Full compliance with California cannabis regulations
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-100 p-8 rounded-lg mb-12">
                <h2 className="text-h2 font-bold font-barlow text-kravings-500 mb-6 text-center">
                  Contact Information
                </h2>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <h3 className="font-barlow font-bold text-gray-900 mb-2">Phone</h3>
                    <p className="font-barlow text-gray-700">(213) 531-5291</p>
                  </div>
                  <div>
                    <h3 className="font-barlow font-bold text-gray-900 mb-2">Email</h3>
                    <p className="font-barlow text-gray-700">info@kravings.club</p>
                  </div>
                  <div>
                    <h3 className="font-barlow font-bold text-gray-900 mb-2">Hours</h3>
                    <p className="font-barlow text-gray-700">
                      Mon-Fri: 9am-8pm<br />
                      Sat: 10am-4pm<br />
                      Sun: Closed
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-h2 font-bold font-barlow text-kravings-500 mb-4">
                  Service Areas
                </h2>
                <p className="font-barlow text-gray-700 mb-6">
                  We proudly serve the following areas in Southern California:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                  {[
                    'Los Angeles', 'Long Beach', 'Downey', 'South Gate', 
                    'Lynwood', 'Hawthorne', 'Inglewood', 'Torrance', 'South Bay'
                  ].map((city) => (
                    <div key={city} className="bg-kravings-50 p-3 rounded font-barlow font-medium text-kravings-700">
                      {city}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 p-6 bg-kravings-50 rounded-lg text-center">
                <p className="font-barlow text-gray-700 text-sm">
                  <strong>Important:</strong> You must be 21 years or older to purchase cannabis products. 
                  Valid government-issued ID required. Cannabis products have not been analyzed or approved 
                  by the FDA. For use only by adults 21 years of age and older. Keep out of reach of children.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;