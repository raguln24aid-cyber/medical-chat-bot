@echo off
REM Quick Installation Script for Windows

echo.
echo ============================================
echo E-Commerce Recommendation System Setup
echo ============================================
echo.

echo [1/4] Installing backend dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo Error installing backend dependencies
    exit /b 1
)
echo Backend dependencies installed successfully!
echo.

echo [2/4] Seeding sample products to MongoDB...
call node seed.js
if errorlevel 1 (
    echo Warning: Seed script failed. Check MongoDB connection.
    echo You can run "node seed.js" manually later.
) else (
    echo Sample products seeded successfully!
)
echo.

echo [3/4] Installing frontend dependencies...
cd ..\frontend
call npm install
if errorlevel 1 (
    echo Error installing frontend dependencies
    exit /b 1
)
echo Frontend dependencies installed successfully!
echo.

cd ..
echo ============================================
echo Installation Complete!
echo ============================================
echo.
echo Next Steps:
echo.
echo 1. Open Terminal/PowerShell #1 and run:
echo    cd backend
echo    npm run dev
echo.
echo 2. Open Terminal/PowerShell #2 and run:
echo    cd frontend
echo    npm start
echo.
echo 3. Browser will open at: http://localhost:3000
echo.
echo Happy coding! 🚀
echo.
pause
