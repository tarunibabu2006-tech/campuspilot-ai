@echo off
color 0A
title CampusPilot AI - One Click Launcher

echo ===================================================
echo     CampusPilot AI - Automated Setup ^& Launcher
echo ===================================================
echo.

:: 1. Check if Node.js is installed
node -v >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is NOT installed on this system!
    echo Please download and install Node.js from https://nodejs.org/
    echo Once installed, double-click this file again.
    pause
    exit /b
)
echo [OK] Node.js is installed.

:: 2. Check if MongoDB is installed (Optional but recommended)
mongod --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo [WARNING] MongoDB is not detected locally.
    echo The platform will still work, but some features (like Leaderboard) may use fallback mock data.
    echo.
) ELSE (
    echo [OK] MongoDB is installed.
)

:: 3. Install Backend Dependencies
echo.
echo [1/4] Installing Backend Dependencies... (This might take a minute)
cd backend
call npm install --silent
cd ..

:: 4. Install Frontend Dependencies
echo.
echo [2/4] Installing Frontend Dependencies... (This might take a minute)
cd frontend
call npm install --silent
cd ..

:: 5. Create basic .env file if it doesn't exist
IF NOT EXIST backend\.env (
    echo.
    echo [3/4] Creating default configuration (.env)...
    echo PORT=5000> backend\.env
    echo MONGODB_URI=mongodb://localhost:27017/campuspilot>> backend\.env
    echo JWT_SECRET=campuspilot_super_secret_jwt_key_2026>> backend\.env
    echo ADMIN_EMAIL=tarunibabu2006@gmail.com>> backend\.env
    echo ADMIN_PASSWORD=prawinkumar_0704>> backend\.env
)

:: 6. Launch Servers
echo.
echo [4/4] Starting the servers...
echo.
echo The backend server will open in a new window.
echo The frontend server will open in a new window and launch your browser.
echo.
echo Please wait 5 seconds...
timeout /t 5 >nul

:: Open backend in new window
start "CampusPilot Backend" cmd /c "cd backend && npm run dev"

:: Open frontend in new window and wait 3 seconds before opening browser
start "CampusPilot Frontend" cmd /c "cd frontend && npm run dev"

timeout /t 3 >nul
start http://localhost:5173

echo.
echo ===================================================
echo ✅ Success! CampusPilot AI is now running.
echo ===================================================
echo - Student Login: Click "Continue with Google"
echo - Admin Login: tarunibabu2006@gmail.com / prawinkumar_0704
echo ===================================================
pause
