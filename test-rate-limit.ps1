# Test 1: Aggressive Rate Limiting Test (NO DELAY)
Write-Host "`n=== ARCJET AGGRESSIVE RATE LIMITING TEST ===" -ForegroundColor Cyan
Write-Host "Sending 15 requests as fast as possible..." -ForegroundColor Yellow
Write-Host "Expected: First ~5 succeed, rest get 429 Too Many Requests`n" -ForegroundColor Yellow

$successCount = 0
$rateLimitedCount = 0

for ($i=1; $i -le 15; $i++) {
    Write-Host "Request #$i - $(Get-Date -Format 'HH:mm:ss.fff')" -NoNewline
    
    try {
        $response = Invoke-WebRequest -Uri "https://my-digital-portfolio-kohl.vercel.app/api/journal?userId=test123" -UseBasicParsing -ErrorAction Stop -TimeoutSec 5
        $successCount++
        Write-Host " -> ✅ Status: $($response.StatusCode) OK" -ForegroundColor Green
    } 
    catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        
        if ($statusCode -eq 429) {
            $rateLimitedCount++
            Write-Host " -> ⚠️  Status: 429 RATE LIMITED!" -ForegroundColor Yellow
        }
        elseif ($statusCode -eq 403) {
            Write-Host " -> 🛡️  Status: 403 BLOCKED (Shield/Bot)" -ForegroundColor Red
        }
        else {
            Write-Host " -> ❌ Status: $statusCode" -ForegroundColor Red
        }
    }
    
    # NO SLEEP - Send requests as fast as possible!
}

Write-Host "`n=== RESULTS ===" -ForegroundColor Cyan
Write-Host "✅ Successful: $successCount" -ForegroundColor Green
Write-Host "⚠️  Rate Limited: $rateLimitedCount" -ForegroundColor Yellow
Write-Host "`nCheck Arcjet Dashboard: https://app.arcjet.com/sites/site_01ke1tq5wcec39cdtza2nwq2r7/requests" -ForegroundColor Magenta
