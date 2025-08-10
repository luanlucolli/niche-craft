
import Container from '@/components/ui/Container';
import { site } from '@/content/site.json';
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  variant?: 'simple' | 'detailed' | 'minimal';
}

export default function Footer({ variant = 'detailed' }: FooterProps) {
  const currentYear = new Date().getFullYear();
  
  const socialIcons = {
    facebook: Facebook,
    instagram: Instagram,
    linkedin: Linkedin,
    twitter: Twitter,
    youtube: Youtube,
  };

  if (variant === 'minimal') {
    return (
      <footer className="bg-foreground text-white py-8">
        <Container>
          <div className="text-center">
            <p className="text-white/80">
              © {currentYear} {site.title}. Todos os direitos reservados.
            </p>
          </div>
        </Container>
      </footer>
    );
  }

  if (variant === 'simple') {
    return (
      <footer className="bg-foreground text-white py-12">
        <Container>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold mb-2">{site.title}</h3>
              <p className="text-white/80">{site.description}</p>
            </div>
            
            <div className="flex justify-end space-x-4">
              {Object.entries(site.social).map(([platform, url]) => {
                if (!url) return null;
                const Icon = socialIcons[platform as keyof typeof socialIcons];
                if (!Icon) return null;
                
                return (
                  <a
                    key={platform}
                    href={url}
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
              © {currentYear} {site.title}. Todos os direitos reservados.
            </p>
          </div>
        </Container>
      </footer>
    );
  }

  return (
    <footer className="bg-foreground text-white py-16">
      <Container>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">{site.title}</h3>
            <p className="text-white/80 mb-6 max-w-md">
              {site.description}
            </p>
            
            <div className="flex space-x-4">
              {Object.entries(site.social).map(([platform, url]) => {
                if (!url) return null;
                const Icon = socialIcons[platform as keyof typeof socialIcons];
                if (!Icon) return null;
                
                return (
                  <a
                    key={platform}
                    href={url}
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
                  href={`tel:${site.contact.phone}`}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {site.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-white/60" />
                <a 
                  href={`mailto:${site.contact.email}`}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-white/60 mt-1" />
                <address className="text-white/80 not-italic">
                  {site.contact.address.street}<br />
                  {site.contact.address.neighborhood}<br />
                  {site.contact.address.city}, {site.contact.address.state}<br />
                  {site.contact.address.zipCode}
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
              © {currentYear} {site.title}. Todos os direitos reservados.
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
