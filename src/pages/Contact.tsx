import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, Clock, MapPin, MessageCircle } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-hero font-black mb-8 text-center font-barlow text-kravings-500">
              Contact Kravings Club
            </h1>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-h2 font-bold font-barlow text-kravings-500 mb-6">
                  Send Us a Message
                </h2>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-barlow font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <Input 
                        type="text" 
                        required 
                        className="font-barlow"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-barlow font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <Input 
                        type="text" 
                        required 
                        className="font-barlow"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-barlow font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input 
                      type="email" 
                      required 
                      className="font-barlow"
                      placeholder="Enter your email address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-barlow font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <Input 
                      type="tel" 
                      className="font-barlow"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-barlow font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <Input 
                      type="text" 
                      required 
                      className="font-barlow"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-barlow font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea 
                      required 
                      rows={5}
                      className="font-barlow"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-kravings-500 hover:bg-kravings-600 text-white font-barlow font-bold py-3"
                  >
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div className="bg-kravings-50 p-8 rounded-lg">
                  <h2 className="text-h2 font-bold font-barlow text-kravings-500 mb-6">
                    Get In Touch
                  </h2>
                  <p className="font-barlow text-gray-700 mb-6">
                    Have questions about our products, delivery, or need help with your order? 
                    We're here to help! Reach out to us using any of the methods below.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-kravings-500 p-3 rounded-full">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-barlow font-bold text-gray-900">Phone</h3>
                        <p className="font-barlow text-gray-700">(213) 531-5291</p>
                        <p className="font-barlow text-sm text-gray-600">Call or text us anytime</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="bg-kravings-500 p-3 rounded-full">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-barlow font-bold text-gray-900">Email</h3>
                        <p className="font-barlow text-gray-700">info@kravings.club</p>
                        <p className="font-barlow text-sm text-gray-600">We respond within 24 hours</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="bg-kravings-500 p-3 rounded-full">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-barlow font-bold text-gray-900">Business Hours</h3>
                        <div className="font-barlow text-gray-700">
                          <p>Monday - Friday: 9am - 8pm</p>
                          <p>Saturday: 10am - 4pm</p>
                          <p>Sunday: Closed</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="bg-kravings-500 p-3 rounded-full">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-barlow font-bold text-gray-900">Service Areas</h3>
                        <p className="font-barlow text-gray-700">Southern California</p>
                        <p className="font-barlow text-sm text-gray-600">20-45 minute delivery</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="bg-kravings-500 text-white p-6 rounded-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <MessageCircle className="w-6 h-6" />
                    <h3 className="text-xl font-barlow font-bold">Need Immediate Help?</h3>
                  </div>
                  <p className="font-barlow mb-4">
                    For urgent delivery issues or order problems, call us directly at (213) 531-5291. 
                    We're available during business hours for immediate assistance.
                  </p>
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-kravings-500 font-barlow"
                  >
                    Call Now
                  </Button>
                </div>

                {/* FAQ Link */}
                <div className="bg-gray-100 p-6 rounded-lg text-center">
                  <h3 className="text-xl font-barlow font-bold text-gray-900 mb-2">
                    Looking for Quick Answers?
                  </h3>
                  <p className="font-barlow text-gray-700 mb-4">
                    Check out our FAQ section for answers to common questions about delivery, 
                    products, and ordering.
                  </p>
                  <Button 
                    variant="outline" 
                    className="font-barlow"
                  >
                    View FAQ
                  </Button>
                </div>
              </div>
            </div>

            {/* Legal Notice */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg text-center">
              <p className="font-barlow text-gray-700 text-sm">
                <strong>Privacy Notice:</strong> Your personal information is protected and will only be used 
                to respond to your inquiry. We do not share customer information with third parties. 
                Must be 21+ to contact regarding cannabis products.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;