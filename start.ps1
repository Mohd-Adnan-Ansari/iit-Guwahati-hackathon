<#
.SYNOPSIS
    Start the CarbonLens application (Backend + Frontend) with one command.

.DESCRIPTION
    Launches the Flask backend (port 5000) and the Vite dev server (port 5173)
    in separate windows and opens the app in your default browser.

.EXAMPLE
    .\start.ps1
#>

$ErrorActionPreference = "Stop"
$Root = $PSScriptRoot

Write-Host ""
Write-Host "  🌿 CarbonLens — Starting application..." -ForegroundColor Green
Write-Host "  ──────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host "  Backend  → http://localhost:5000" -ForegroundColor Cyan
Write-Host "  Frontend → http://localhost:5173" -ForegroundColor Cyan
Write-Host "  ──────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host ""

# ── 1. Start Flask backend in a new terminal window ──────────────────────────
$backendCmd = @"
cd '$Root'; `$env:FLASK_ENV='development'; `$env:FLASK_DEBUG='True'; `$env:PYTHONPATH='$Root\backend'; python '$Root\backend\app.py'
"@

Start-Process powershell -ArgumentList "-NoExit", "-Command", $backendCmd -WindowStyle Normal

Write-Host "  ✅ Backend process started." -ForegroundColor Green

# ── 2. Wait briefly so Flask can initialise the DB before the frontend loads ─
Start-Sleep -Seconds 2

# ── 3. Start Vite frontend in a new terminal window ───────────────────────────
$frontendCmd = @"
cd '$Root\frontend'; cmd /c npm run dev
"@

Start-Process powershell -ArgumentList "-NoExit", "-Command", $frontendCmd -WindowStyle Normal

Write-Host "  ✅ Frontend process started." -ForegroundColor Green

# ── 4. Wait for Vite to be ready, then open the browser ───────────────────────
Write-Host ""
Write-Host "  ⏳ Waiting for Vite dev server to be ready..." -ForegroundColor Yellow

$maxWait = 30   # seconds
$elapsed = 0
$ready   = $false

while ($elapsed -lt $maxWait) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:5173" -UseBasicParsing -TimeoutSec 2 -ErrorAction Stop
        if ($response.StatusCode -eq 200) {
            $ready = $true
            break
        }
    } catch {
        # Not ready yet — keep waiting
    }
    Start-Sleep -Seconds 1
    $elapsed++
}

if ($ready) {
    Write-Host "  🚀 Opening http://localhost:5173 in your browser..." -ForegroundColor Green
    Start-Process "http://localhost:5173"
} else {
    Write-Host "  ⚠️  Vite didn't respond in time. Open http://localhost:5173 manually." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "  CarbonLens is running! Press Ctrl+C in each terminal to stop." -ForegroundColor DarkGray
Write-Host ""
