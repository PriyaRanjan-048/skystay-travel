# SkyStay - Flight, Hotel, and Package Booking Platform

SkyStay is a modern web application for booking flights, hotels, and travel packages. This platform integrates with the Amadeus API to provide real-time travel information and booking capabilities.

## Features

- Flight search and booking
- Hotel search and booking
- Flight + Hotel package deals
- User account management
- Responsive design for all devices
- Real-time API integration with Amadeus

## Tech Stack

- **Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS
- **API Integration**: Axios for Amadeus API
- **State Management**: React Hooks
- **Animation**: Framer Motion
- **Form Handling**: React DatePicker

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   # or
   yarn
   ```

3. Create a `.env.local` file in the project root and add your Amadeus API credentials:
   ```
   NEXT_PUBLIC_AMADEUS_API_KEY=your_api_key
   NEXT_PUBLIC_AMADEUS_API_SECRET=your_api_secret
   ```

4. Start the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the application

## Project Structure

- `/app` - Next.js App Router pages and layouts
- `/components` - React components
  - `/home` - Home page components
  - `/layout` - Layout components (navbar, footer, etc.)
  - `/search` - Search-related components 
  - `/ui` - Reusable UI components
- `/lib` - Utility functions and API service
- `/public` - Static assets

## Amadeus API Integration

This project integrates with the Amadeus Travel API for:
- Flight search
- Hotel search
- Location autocomplete
- Pricing and availability

## Deployment

The application can be deployed on Vercel or any other platform that supports Next.js:

```bash
npm run build
npm start
```

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Amadeus API](https://developers.amadeus.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
