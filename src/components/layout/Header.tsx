
import { useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/Container';
import siteData from '@/content/site.json';
import { formatWhatsAppUrl } from '@/lib/forms';
import { metrics } from '@/lib/metrics';

interface HeaderProps {
  variant?: 'default' | 'transparent' | 'solid';
  sticky?: boolean;
}

export default function Header({ variant = 'default', sticky = true }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Recursos', href: '#features' },
    { name: 'Serviços', href: '#services' },
    { name: 'Preços', href: '#pricing' },
    { name: 'Contato', href: '#contato' },
  ];

  const handleWhatsAppClick = () => {
    const whatsappUrl = formatWhatsAppUrl(
      siteData.contact.whatsapp,
      siteData.contact.prefill
    );
    metrics.whatsappClick('header');
    window.open(whatsappUrl, '_blank');
  };

  return (
    <header 
      className={`w-full z-50 transition-all duration-300 ${
        sticky ? 'sticky top-0' : 'relative'
      } bg-white border-b border-gray-200 shadow-sm`}
    >
      <Container>
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/6b86929d-6de2-4d48-9fdb-724d81a21539.png" 
                alt="LandingVille Logo" 
                className="h-10 w-auto"
              />
              <div className="text-2xl">
                <span className="font-bold text-[#333]">landing</span>
                <span className="font-medium text-[#5e9e4c]">ville</span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-[#5e9e4c] transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center">
            <Button
              onClick={handleWhatsAppClick}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-600 hover:text-[#5e9e4c] hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-200 mt-4">
                <Button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
