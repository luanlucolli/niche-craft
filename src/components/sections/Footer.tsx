
import SiteFooter from './SiteFooter';

interface FooterProps {
  variant?: 'simple' | 'detailed' | 'minimal';
  showWhatsAppCTA?: boolean;
}

export default function Footer({ variant = 'detailed', showWhatsAppCTA = true }: FooterProps) {
  return <SiteFooter variant={variant} showWhatsAppCTA={showWhatsAppCTA} />;
}
