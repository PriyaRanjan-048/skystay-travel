#!/bin/bash

# Setup and start the SkyStay Travel booking website

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Setting up SkyStay Travel Booking Website...${NC}"

# Navigate to project directory
cd "$(dirname "$0")"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js version 16 or higher."
    exit 1
fi

echo -e "${GREEN}Installing dependencies...${NC}"
npm install

echo -e "${GREEN}Creating .env.local file with Duffel API token...${NC}"
cat > .env.local << EOL
DUFFEL_ACCESS_TOKEN=your_duffel_access_token_here
EOL

echo -e "${GREEN}Starting development server...${NC}"
echo -e "${YELLOW}Once started, open your browser and navigate to: http://localhost:3000${NC}"
npm run dev
