# 🛒 Modern E-commerce Store

A modern, responsive e-commerce application built with Next.js 16, TypeScript, and Tailwind CSS. Features a complete shopping experience with product browsing, cart management, and checkout flow.

## ✨ Features

- 🏪 **Product Catalog** - Browse products with categories and search
- 🛍️ **Shopping Cart** - Add/remove items with persistent storage
- 💳 **Checkout Flow** - Complete order process with customer info
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🎨 **Modern UI** - Clean, intuitive interface with Tailwind CSS
- ⚡ **Fast Performance** - Built with Next.js App Router
- 🔒 **Type Safety** - Full TypeScript implementation

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Icons**: Lucide React
- **Animations**: Canvas Confetti

## 📁 Project Structure

```
ecommerce-app/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── cart/              # Shopping cart
│   ├── categories/        # Product categories
│   ├── checkout/          # Checkout flow
│   ├── products/          # Product pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── cart/             # Cart components
│   ├── home/             # Homepage components
│   ├── layout/           # Layout components
│   ├── product/          # Product components
│   ├── providers/        # Context providers
│   ├── search/           # Search components
│   └── ui/               # UI components
├── config/               # Configuration files
├── features/             # Feature modules
├── lib/                  # Utility functions
├── services/             # API services
├── store/                # Zustand stores
└── types/                # TypeScript definitions
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:4000](http://localhost:4000)

## 📜 Available Scripts

- `npm run dev` - Start development server on port 4000
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🏗️ Key Components

### State Management
- **Cart Store** - Manages shopping cart state with persistence
- **Customer Store** - Handles customer information

### Core Features
- **Product Catalog** - Dynamic product listing with filtering
- **Search & Categories** - Advanced product discovery
- **Cart Management** - Add, remove, update quantities
- **Checkout Process** - Customer info collection and order processing

### UI Components
- Reusable UI components in `components/ui/`
- Layout components for consistent structure
- Feature-specific components organized by domain

## 🎨 Styling

- **Tailwind CSS v4** for utility-first styling
- **Responsive design** with mobile-first approach
- **Custom color palette** and design system
- **Dark mode ready** (can be easily implemented)

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Optimized for all screen sizes

## 🔧 Configuration

- **TypeScript** - Strict type checking enabled
- **ESLint** - Code quality and consistency
- **Tailwind CSS** - Utility-first styling
- **Next.js Config** - Optimized for performance

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Other Platforms
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first approach
- Zustand for simple state management
- Lucide React for beautiful icons

---

**Built with ❤️ using Next.js 16 and TypeScript**