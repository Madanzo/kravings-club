import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      title: "Ordering & Delivery",
      items: [
        {
          question: "What is the minimum order amount?",
          answer: "Our minimum order amount is $50 before taxes and fees. This helps us maintain efficient delivery operations across Southern California."
        },
        {
          question: "How long does delivery take?",
          answer: "We offer fast delivery within 20-45 minutes during business hours. Delivery times may vary based on your location and current demand."
        },
        {
          question: "What areas do you deliver to?",
          answer: "We deliver throughout Southern California including Los Angeles, Long Beach, Downey, South Gate, Lynwood, Hawthorne, Inglewood, Torrance, and the South Bay area."
        },
        {
          question: "Do you offer scheduled deliveries?",
          answer: "Yes! You can schedule deliveries up to 24 hours in advance during our business hours. Same-day scheduling is also available based on availability."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept cash, debit cards, and digital payments. Credit cards are not accepted due to federal banking regulations. ATM fee reimbursement available for cash orders."
        }
      ]
    },
    {
      title: "Products & Quality",
      items: [
        {
          question: "Are your products lab tested?",
          answer: "Yes, all our cannabis products are lab tested for potency, pesticides, heavy metals, and microbials. Lab results are available upon request for any product."
        },
        {
          question: "Do you have organic options?",
          answer: "We carry a selection of organically grown cannabis products. Look for the 'Organic' label in our menu or ask your delivery driver about organic options."
        },
        {
          question: "Can I return products if I'm not satisfied?",
          answer: "Due to California cannabis regulations, we cannot accept returns of cannabis products. However, if you receive damaged or incorrect items, please contact us immediately for resolution."
        },
        {
          question: "Do you offer product recommendations?",
          answer: "Our knowledgeable team can provide general information about products, but we cannot provide medical advice. Consult with a healthcare professional for medical cannabis guidance."
        }
      ]
    },
    {
      title: "Account & Legal",
      items: [
        {
          question: "What do I need to place an order?",
          answer: "You must be 21+ with valid government-issued photo ID. We accept California driver's licenses, state IDs, passports, and military IDs. Expired IDs cannot be accepted."
        },
        {
          question: "Do you keep my information private?",
          answer: "Yes, we maintain strict privacy standards. Your personal information is protected and only used for order fulfillment and regulatory compliance as required by California law."
        },
        {
          question: "Can I order for someone else?",
          answer: "No, the person placing the order must be present to receive it and show valid ID. We cannot deliver to anyone other than the account holder for legal compliance reasons."
        },
        {
          question: "What is your license information?",
          answer: "Kravings Club is a licensed cannabis retailer in California. Our license number is C9-000555-LIC issued by the Department of Cannabis Control (DCC)."
        }
      ]
    },
    {
      title: "Troubleshooting",
      items: [
        {
          question: "My order is taking longer than expected. What should I do?",
          answer: "Please call us at (213) 531-5291 if your order is delayed beyond the estimated delivery time. We'll provide real-time updates and resolve any delivery issues immediately."
        },
        {
          question: "I received the wrong items. How do I get this fixed?",
          answer: "Contact us immediately at (213) 531-5291 or info@kravings.club. We'll arrange for the correct items to be delivered and handle the incorrect items according to regulations."
        },
        {
          question: "Can I modify my order after it's placed?",
          answer: "Order modifications may be possible if the order hasn't been prepared yet. Call us immediately at (213) 531-5291 to request changes. Additional charges may apply."
        },
        {
          question: "What if I'm not home when the driver arrives?",
          answer: "The delivery driver will attempt to contact you via phone. If you're unavailable, we may reschedule delivery for later the same day or the next business day based on availability."
        }
      ]
    }
  ];

  let itemIndex = 0;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-hero font-black mb-8 text-center font-barlow text-kravings-500">
              Frequently Asked Questions
            </h1>
            
            <div className="text-center mb-12">
              <p className="text-xl font-barlow text-gray-700 mb-6">
                Find answers to common questions about ordering, delivery, and our cannabis products
              </p>
              <div className="bg-kravings-50 p-6 rounded-lg inline-block">
                <p className="font-barlow text-kravings-700">
                  <strong>Can't find what you're looking for?</strong><br />
                  Contact us at (213) 531-5291 or info@kravings.club
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-kravings-500 text-white p-6">
                    <h2 className="text-h2 font-bold font-barlow">{category.title}</h2>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {category.items.map((item) => {
                      const currentIndex = itemIndex++;
                      const isOpen = openItems.includes(currentIndex);
                      
                      return (
                        <div key={currentIndex} className="p-6">
                          <button
                            onClick={() => toggleItem(currentIndex)}
                            className="w-full flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-kravings-500 focus:ring-offset-2 rounded"
                          >
                            <h3 className="text-lg font-barlow font-bold text-gray-900 pr-4">
                              {item.question}
                            </h3>
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 text-kravings-500 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-kravings-500 flex-shrink-0" />
                            )}
                          </button>
                          
                          {isOpen && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <p className="font-barlow text-gray-700 leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Section */}
            <div className="mt-12 bg-kravings-500 text-white p-8 rounded-lg text-center">
              <h2 className="text-h2 font-bold font-barlow mb-4">
                Still Have Questions?
              </h2>
              <p className="text-lg font-barlow mb-6">
                Our customer service team is here to help with any questions not covered above.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:2135315291"
                  className="bg-white text-kravings-500 px-6 py-3 rounded font-barlow font-bold hover:bg-gray-100 transition-colors"
                >
                  Call (213) 531-5291
                </a>
                <a 
                  href="mailto:info@kravings.club"
                  className="border-2 border-white text-white px-6 py-3 rounded font-barlow font-bold hover:bg-white hover:text-kravings-500 transition-colors"
                >
                  Email Us
                </a>
              </div>
            </div>

            {/* Legal Notice */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg text-center">
              <p className="font-barlow text-gray-700 text-sm">
                <strong>Important:</strong> This information is for general guidance only and does not constitute 
                legal or medical advice. Cannabis laws and regulations may change. Must be 21+ to purchase cannabis products. 
                Please consume responsibly.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;