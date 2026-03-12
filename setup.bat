@echo off
REM Setup and start the SkyStay Travel booking website

echo Setting up SkyStay Travel Booking Website...

REM Navigate to project directory
cd /d "%~dp0"

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Node.js is not installed. Please install Node.js version 16 or higher.
    exit /b 1
)

echo Installing dependencies...
call npm install

echo Creating .env.local file with Duffel API token...
(
echo DUFFEL_ACCESS_TOKEN=your_duffel_access_token_here
) > .env.local

echo Starting development server...
echo Once started, open your browser and navigate to: http://localhost:3000
call npm run dev
