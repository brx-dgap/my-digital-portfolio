Write-Host "`n=== TESTING AFTER FIX ===" -ForegroundColor Cyan
Write-Host "Waiting for Vercel to finish deployment..." -ForegroundColor Yellow
Write-Host "Check: https://vercel.com/brx-dgaps-projects/my-digital-portfolio/deployments`n" -ForegroundColor Gray

Start-Sleep -Seconds 60

Write-Host "Sending test request..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "https://my-digital-portfolio-kohl.vercel.app/api/journal?userId=test123" -UseBasicParsing -ErrorAction Stop
    Write-Host "✅ Status: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n📊 NOW CHECK YOUR ARCJET DASHBOARD:" -ForegroundColor Magenta
Write-Host "https://app.arcjet.com/sites/site_01ke1tq5wcec39cdtza2nwq2r7/requests" -ForegroundColor Cyan
Write-Host "`nLook for the latest request - it should show:" -ForegroundColor Yellow
Write-Host "  ✅ ALLOW (green) instead of ERROR (orange)" -ForegroundColor Green
Write-Host "  ✅ Shield protection active" -ForegroundColor Green
Write-Host "  ✅ Rate limit rules applied" -ForegroundColor Green
