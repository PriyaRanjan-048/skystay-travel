# SkyStay - Flight, Hotel, and Package Booking Platform

SkyStay is a modern web application for booking flights, hotels, and travel packages. This platform integrates with the Duffel API to provide real-time flight search capabilities.

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
- **API Integration**: Duffel API (`@duffel/api`)
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

3. Create a `.env.local` file in the project root and add your Duffel API token:
   ```
   DUFFEL_ACCESS_TOKEN=your_duffel_access_token
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

## Duffel API Integration

This project integrates with the Duffel API for:
- Flight search
- Location autocomplete

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
- [Duffel API](https://duffel.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
