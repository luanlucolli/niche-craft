
import Container from '@/components/ui/Container';
import { Button } from '@/components/ui/button';
import siteData from '@/content/site.json';
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { formatWhatsAppUrl } from '@/lib/forms';
import { metrics } from '@/lib/metrics';

interface SiteFooterProps {
  variant?: 'simple' | 'detailed' | 'minimal';
  showWhatsAppCTA?: boolean;
}

export default function SiteFooter({ variant = 'detailed', showWhatsAppCTA = true }: SiteFooterProps) {
  const currentYear = new Date().getFullYear();
  
  const socialIcons = {
    facebook: Facebook,
    instagram: Instagram,
    linkedin: Linkedin,
    twitter: Twitter,
    youtube: Youtube,
  };

  const handleWhatsAppClick = () => {
    const whatsappUrl = formatWhatsAppUrl(
      siteData.contact.whatsapp,
      "Olá! Gostaria de saber mais sobre os serviços."
    );
    metrics.whatsappClick('footer');
    window.open(whatsappUrl, '_blank');
  };

  if (variant === 'minimal') {
    return (
      <footer className="bg-foreground text-white py-8">
        <Container>
          <div className="text-center">
            <p className="text-white/80">
              © {currentYear} {siteData.title}. Todos os direitos reservados.
            </p>
          </div>
        </Container>
      </footer>
    );
  }

  if (variant === 'simple') {
    return (
      <footer className="bg-gradient-to-br from-brand-primary-900 to-brand-secondary-800 text-white py-12">
        <Container>
          {showWhatsAppCTA && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 text-center border border-white/20">
              <h3 className="text-xl font-bold mb-2">Pronto para começar?</h3>
              <p className="text-white/80 mb-4">Entre em contato conosco pelo WhatsApp</p>
              <Button
                onClick={handleWhatsAppClick}
                className="bg-green-500 hover:bg-green-600 text-white border-0"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Conversar no WhatsApp
              </Button>
            </div>
          )}
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold mb-2">{siteData.title}</h3>
              <p className="text-white/80">{siteData.description}</p>
            </div>
            
            <div className="flex justify-end space-x-4">
              {Object.entries(siteData.social).map(([platform, url]) => {
                if (!url) return null;
                const Icon = socialIcons[platform as keyof typeof socialIcons];
                if (!Icon) return null;
                
                return (
                  <a
                    key={platform}
                    href={url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label={`Siga-nos no ${platform}`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-white/80">
              © {currentYear} {siteData.title}. Todos os direitos reservados.
            </p>
          </div>
        </Container>
      </footer>
    );
  }

  return (
    <footer className="bg-gradient-to-br from-brand-primary-900 via-brand-primary-800 to-brand-secondary-700 text-white py-16">
      <Container>
        {showWhatsAppCTA && (
          <div className="bg-gradient-to-r from-green-500/20 to-green-400/20 backdrop-blur-sm rounded-3xl p-8 mb-12 text-center border border-green-300/20">
            <h3 className="text-2xl font-bold mb-3">Vamos conversar sobre seu projeto?</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Entre em contato conosco pelo WhatsApp e tire todas as suas dúvidas. 
              Estamos prontos para ajudar você a alcançar seus objetivos.
            </p>
            <Button
              onClick={handleWhatsAppClick}
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-all"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Conversar no WhatsApp
            </Button>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/10 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">LP</span>
              </div>
              <h3 className="text-2xl font-bold">{siteData.title}</h3>
            </div>
            <p className="text-white/80 mb-6 max-w-md">
              {siteData.description}
            </p>
            
            <div className="flex space-x-4">
              {Object.entries(siteData.social).map(([platform, url]) => {
                if (!url) return null;
                const Icon = socialIcons[platform as keyof typeof socialIcons];
                if (!Icon) return null;
                
                return (
                  <a
                    key={platform}
                    href={url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label={`Siga-nos no ${platform}`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-white/60" />
                <a 
                  href={`tel:${siteData.contact.phone}`}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {siteData.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-white/60" />
                <a 
                  href={`mailto:${siteData.contact.email}`}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {siteData.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-white/60 mt-1" />
                <address className="text-white/80 not-italic">
                  {siteData.contact.address.street}<br />
                  {siteData.contact.address.neighborhood}<br />
                  {siteData.contact.address.city}, {siteData.contact.address.state}<br />
                  {siteData.contact.address.zipCode}
                </address>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-white/80 hover:text-white transition-colors">
                  Recursos
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/80 hover:text-white transition-colors">
                  Serviços
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-white/80 hover:text-white transition-colors">
                  Preços
                </a>
              </li>
              <li>
                <a href="#contato" className="text-white/80 hover:text-white transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/80 text-sm">
              © {currentYear} {siteData.title}. Todos os direitos reservados.
            </p>
            
            <div className="flex gap-6 text-sm">
              <a href="/privacy" className="text-white/80 hover:text-white transition-colors">
                Política de Privacidade
              </a>
              <a href="/terms" className="text-white/80 hover:text-white transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
