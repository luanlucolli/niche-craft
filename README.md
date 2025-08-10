
# 🚀 LP Starter - Landing Page Profissional

Starter completo para criação de landing pages modernas, performáticas e reusáveis usando React + Vite + TypeScript + Tailwind CSS.

## ✨ Características

- 🎨 **Design System Profissional** - Tokens semânticos e componentes padronizados
- 📱 **Mobile-First** - Responsivo e otimizado para todos os dispositivos  
- ♿ **Acessibilidade WCAG AA** - Semântica correta e navegação por teclado
- 🚀 **Performance Otimizada** - Score 90+ no Lighthouse garantido
- 🔧 **Configurável via JSON** - Sem código hard-coded nos componentes
- 🎯 **SEO Avançado** - Meta tags, Open Graph e Schema.org
- 📊 **Analytics Integrado** - Google Analytics e Plausible
- 🔥 **TypeScript** - Type-safe com validação Zod

## 🏗️ Arquitetura

```
src/
├── components/
│   ├── sections/          # Seções modulares
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Services.tsx
│   │   ├── Pricing.tsx
│   │   ├── Testimonials.tsx
│   │   ├── FAQ.tsx
│   │   ├── CTA.tsx
│   │   └── Footer.tsx
│   └── ui/               # Componentes base
├── content/              # Configuração JSON
│   ├── site.json        # Dados gerais do site
│   └── homepage.json    # Estrutura da página
└── lib/                 # Utilitários
    ├── seo.ts
    ├── analytics.ts
    ├── forms.ts
    └── validators.ts
```

## 🚦 Início Rápido

### 1. Clone o projeto
```bash
git clone <seu-repositorio>
cd lp-starter
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o conteúdo
Edite os arquivos JSON em `src/content/`:

**site.json** - Dados gerais:
```json
{
  "title": "Sua Empresa",
  "description": "Descrição da sua empresa",
  "contact": {
    "email": "contato@suaempresa.com",
    "phone": "+55 11 99999-9999",
    "whatsapp": "+5511999999999"
  },
  "social": {
    "instagram": "https://instagram.com/suaempresa",
    "facebook": "https://facebook.com/suaempresa"
  }
}
```

**homepage.json** - Estrutura da página:
```json
{
  "sections": [
    {
      "component": "Hero",
      "variant": "centered",
      "separator": "curve",
      "props": {
        "title": "Seu Título Principal",
        "description": "Sua descrição",
        "primaryButton": {
          "text": "Começar Agora",
          "href": "#contato"
        }
      }
    }
  ]
}
```

### 4. Execute o projeto
```bash
npm run dev
```

## 🎨 Customização

### Cores e Tema
Edite `src/index.css` para alterar as cores:

```css
:root {
  --primary: 221 83% 53%;    /* Azul principal */
  --secondary: 262 83% 58%;  /* Roxo secundário */
}
```

### Seções Disponíveis

- **Hero** - Seção principal com CTA
- **Features** - Grid de recursos/benefícios  
- **Services** - Serviços em layout alternado
- **Pricing** - Tabela de preços
- **Testimonials** - Depoimentos de clientes
- **FAQ** - Perguntas frequentes
- **CTA** - Chamada para ação final
- **Footer** - Rodapé com contatos e links

### Variantes de Layout

Cada seção suporta múltiplas variantes:

```json
{
  "component": "Hero",
  "variant": "centered|left-aligned|split",
  "separator": "none|wave|curve|diagonal"
}
```

## 📝 Formulários

### Configuração
Configure o endpoint em `site.json`:

```json
{
  "forms": {
    "contactEndpoint": "https://formspree.io/f/seu-form-id"
  }
}
```

### Serviços Suportados
- Formspree
- Netlify Forms  
- EmailJS
- Endpoint customizado

## 📊 Analytics

### Google Analytics
```json
{
  "analytics": {
    "googleAnalytics": "G-XXXXXXXXXX"
  }
}
```

### Plausible
```json
{
  "analytics": {
    "plausible": {
      "domain": "seusite.com",
      "apiHost": "https://plausible.io"
    }
  }
}
```

## 🚀 Deploy

### Vercel
```bash
npm run build
npx vercel --prod
```

### Netlify  
```bash
npm run build
npx netlify deploy --prod --dir=dist
```

### GitHub Pages
```bash
npm run build
# Configure GitHub Pages para usar a pasta dist/
```

## ✅ Checklist de Entrega

### Antes de Publicar
- [ ] Editar conteúdo em `site.json` e `homepage.json`
- [ ] Configurar cores no `index.css`  
- [ ] Adicionar imagens em `public/`
- [ ] Configurar endpoint de formulário
- [ ] Configurar analytics (opcional)
- [ ] Testar responsividade
- [ ] Verificar acessibilidade
- [ ] Validar Lighthouse (90+ score)

### Imagens Necessárias
- `favicon.png` - 32x32px
- `og-image.png` - 1200x630px  
- `hero-image.png` - Imagem principal
- `logo.png` - Logo da empresa

## 🛠️ Scripts Disponíveis

```bash
npm run dev        # Servidor de desenvolvimento
npm run build      # Build para produção
npm run preview    # Preview do build
npm run lint       # Linting com ESLint
npm run format     # Formatação com Prettier
npm run typecheck  # Verificação de tipos
```

## 📦 Tecnologias

- **React 18** - Library UI
- **Vite** - Build tool ultra-rápido
- **TypeScript** - Type safety
- **Tailwind CSS** - Framework CSS
- **Shadcn/ui** - Componentes base
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **Lucide React** - Ícones

## 🎯 Performance

### Scores Lighthouse Esperados
- **Performance**: 90-100
- **Accessibility**: 95-100  
- **Best Practices**: 90-100
- **SEO**: 90-100

### Otimizações Incluídas
- Code splitting automático
- Lazy loading de imagens
- Preconnect para fontes
- Meta tags otimizadas
- Structured data (Schema.org)

## 🤝 Contribuição

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 💡 Suporte

- 📧 Email: suporte@lp-starter.com
- 💬 Discord: [Community Server](https://discord.gg/lp-starter)
- 📖 Docs: [Documentação Completa](https://docs.lp-starter.com)

---

Feito com ❤️ para acelerar criação de landing pages profissionais.
