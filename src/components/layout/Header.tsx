
import { useState } from 'react';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
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

  const handleCallClick = () => {
    window.open(`tel:${siteData.contact.phone}`, '_self');
    metrics.phoneClick('header');
  };

  return (
    <header 
      className={`w-full z-50 transition-all duration-300 ${
        sticky ? 'sticky top-0' : 'relative'
      } ${
        variant === 'transparent' ? 'bg-white/95 backdrop-blur-sm border-b border-white/20' :
        variant === 'solid' ? 'bg-white border-b border-gray-200 shadow-sm' :
        'bg-white/98 backdrop-blur-md border-b border-gray-100'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">LP</span>
              </div>
              <span className="text-xl font-bold text-foreground">{siteData.title}</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-brand-primary transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCallClick}
              className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
            >
              <Phone className="w-4 h-4 mr-2" />
              Ligar
            </Button>
            <Button
              onClick={handleWhatsAppClick}
              className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary-700 hover:to-brand-secondary-700 text-white"
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
                  className="block px-3 py-2 text-muted-foreground hover:text-brand-primary hover:bg-brand-primary-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200 mt-4">
                <Button
                  variant="outline"
                  onClick={handleCallClick}
                  className="w-full border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Ligar
                </Button>
                <Button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary-700 hover:to-brand-secondary-700 text-white"
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
