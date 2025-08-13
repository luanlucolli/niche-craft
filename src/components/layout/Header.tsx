
import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/Container';
import siteData from '@/content/site.json';
import { formatWhatsAppUrl } from '@/lib/forms';
import { metrics } from '@/lib/metrics';

export default function Header() {
  const handleWhatsAppClick = () => {
    const whatsappUrl = formatWhatsAppUrl(
      siteData.contact.whatsapp,
      siteData.contact.prefill
    );
    metrics.whatsappClick('header');
    window.open(whatsappUrl, '_blank');
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <Container>
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/fd5814f5-d978-4ef6-baea-2a54f0c00ca8.png" 
                alt="LandingVille Logo" 
                className="w-10 h-10"
              />
              <span className="text-2xl font-bold">
                <span className="text-gray-800">Landing</span>
                <span style={{ color: '#5e9e4c' }}>Ville</span>
              </span>
            </a>
          </div>

          {/* WhatsApp Button */}
          <Button
            onClick={handleWhatsAppClick}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp
          </Button>
        </div>
      </Container>
    </header>
  );
}
