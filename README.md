# Frontier Tower London

A sophisticated single-page application for Frontier Tower London - a vertical village concept featuring premium residential living in the heart of London.

## Features

- 🏗️ **Modern Architecture**: Built with Vite, React, TypeScript, and Tailwind CSS
- ✨ **Smooth Animations**: Framer Motion animations with smooth scrolling via Lenis
- 💳 **Stripe Integration**: Multi-step payment flow for subscription-based membership
- 📱 **Responsive Design**: Desktop-first with mobile-optimized navigation
- 🎨 **Editorial Design**: Clean, sophisticated typography with Google Fonts

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Payments**: Stripe Elements
- **Build Tool**: Vite
- **Smooth Scroll**: Lenis

## Design System

### Typography
- **Headings**: Fraunces (Variable serif with soft styling)
- **Body**: Inter Tight (Condensed modern sans-serif)

### Colors
- **Canvas**: `#F9F8F4` (Warm Paper)
- **Ink**: `#1C1C1E` (Soft Black)
- **Night**: `#0F0F11` (Almost Black)
- **Accent**: `#7C3AED` (Digital Violet)

## Getting Started

### Prerequisites
- Node.js 20.19+ or 22.12+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Update the following variables:
   - `VITE_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
   - `VITE_API_URL`: Your backend API URL

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building

Build for production:
```bash
npm run build
```

### Deployment

The built files will be in the `dist` directory. Deploy to any static hosting service.

## Architecture

### Layout Structure
- **Left Sidebar**: Fixed navigation (260px wide)
- **Main Content**: Scrollable sections with responsive margins
- **Right Sidebar**: Visual element container (300px wide, hidden on mobile)

### Sections
1. **Hero**: Introduction with animated text reveals
2. **Manifesto**: Editorial-style content about the vision
3. **London**: Location-focused section with parallax background
4. **Get Involved**: Call-to-action with Stripe payment modal

### Payment Flow
1. User fills form with personal details
2. Backend creates subscription intent
3. Stripe Elements renders payment form
4. Payment confirmation and success state

## API Integration

The payment modal expects a backend endpoint:
```
POST /next/pre-signup-requests/
```

**Request Body:**
```json
{
  "email": "string",
  "phone": "string",
  "firstName": "string",
  "lastName": "string",
  "location": 0,
  "subscriptionInterval": "monthly",
  "whatAreYouWorkingOn": "string",
  "whatIsYourExpertise": "string"
}
```

**Expected Response:**
```json
{
  "subscriptionUuid": "string",
  "clientSecret": "pi_...secret_..."
}
```

## Customization

### Adding New Sections
1. Create component in `src/sections/`
2. Import and add to `App.tsx`
3. Update navigation in `Layout.tsx`

### Styling Changes
- Update colors in `tailwind.config.js`
- Modify typography in `src/index.css`
- Customize animations in individual components

## License

© 2024 Frontier Tower London. All rights reserved.