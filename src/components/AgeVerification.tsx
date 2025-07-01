
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AgeVerificationProps {
  onVerified: () => void;
}

const AgeVerification = ({ onVerified }: AgeVerificationProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleVerify = (isOfAge: boolean) => {
    if (isOfAge) {
      localStorage.setItem('ageVerified', 'true');
      setIsVisible(false);
      onVerified();
    } else {
      window.location.href = 'https://www.google.com';
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <Card className="max-w-md mx-4">
        <CardHeader className="text-center">
          <div className="text-4xl mb-4">🌺</div>
          <CardTitle className="text-2xl font-bold text-pink-600">
            Age Verification Required
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600 mb-6">
            You must be 21 years or older to access this site and purchase cannabis products.
          </p>
          
          <div className="space-y-4">
            <Button 
              onClick={() => handleVerify(true)}
              className="w-full brand-gradient text-white"
              size="lg"
            >
              I am 21 or older
            </Button>
            <Button 
              onClick={() => handleVerify(false)}
              variant="outline"
              className="w-full"
              size="lg"
            >
              I am under 21
            </Button>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            By entering this site, you agree to our Terms of Service and Privacy Policy.
            Cannabis products have not been evaluated by the FDA.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgeVerification;
