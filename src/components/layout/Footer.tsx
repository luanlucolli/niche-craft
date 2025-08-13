
import Container from '@/components/ui/Container';
import siteData from '@/content/site.json';

interface FooterProps {
  variant?: 'simple' | 'detailed' | 'minimal';
  showWhatsAppCTA?: boolean;
}

export default function Footer({ variant = 'detailed', showWhatsAppCTA = true }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <Container>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img 
              src="/lovable-uploads/6b86929d-6de2-4d48-9fdb-724d81a21539.png" 
              alt="LandingVille Logo" 
              className="h-8 w-auto"
            />
            <div className="text-xl">
              <span className="font-bold text-[#333]">landing</span>
              <span className="font-medium text-[#5e9e4c]">ville</span>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            {siteData.description}
          </p>
          <p className="text-gray-500 text-sm">
            © {currentYear} LandingVille. Todos os direitos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}
