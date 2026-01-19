# Test 1: Rate Limiting Test
Write-Host "`n=== ARCJET RATE LIMITING TEST ===" -ForegroundColor Cyan
Write-Host "Testing: https://my-digital-portfolio-kohl.vercel.app/api/journal" -ForegroundColor Yellow
Write-Host "Rate Limit: 5 requests per 10 seconds`n" -ForegroundColor Yellow

for ($i=1; $i -le 10; $i++) {
    Write-Host "Request #$i - $(Get-Date -Format 'HH:mm:ss')" -NoNewline
    
    try {
        $response = Invoke-WebRequest -Uri "https://my-digital-portfolio-kohl.vercel.app/api/journal?userId=test123" -UseBasicParsing -ErrorAction Stop
        Write-Host " -> Status: $($response.StatusCode)" -ForegroundColor Green
        $content = $response.Content | ConvertFrom-Json
        Write-Host "   Response: $($content.error)" -ForegroundColor Gray
    } 
    catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host " -> Status: $statusCode" -ForegroundColor Red
        
        if ($statusCode -eq 429) {
            Write-Host "   RATE LIMITED! ⚠️ Arcjet is working!" -ForegroundColor Yellow
        }
        elseif ($statusCode -eq 403) {
            Write-Host "   FORBIDDEN! 🛡️ Shield or Bot protection triggered" -ForegroundColor Yellow
        }
    }
    
    Start-Sleep -Milliseconds 800
}

Write-Host "`n=== TEST COMPLETE ===" -ForegroundColor Cyan
Write-Host "Check your Arcjet dashboard: https://app.arcjet.com" -ForegroundColor Green
