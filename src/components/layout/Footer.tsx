
import Container from '@/components/ui/Container';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 py-8">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/fd5814f5-d978-4ef6-baea-2a54f0c00ca8.png" 
              alt="LandingVille Logo" 
              className="w-8 h-8"
            />
            <span className="text-xl font-bold">
              <span className="text-gray-800">Landing</span>
              <span style={{ color: '#5e9e4c' }}>Ville</span>
            </span>
          </div>
          
          {/* Copyright */}
          <p className="text-gray-600 text-sm">
            © {currentYear} LandingVille. Todos os direitos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}
