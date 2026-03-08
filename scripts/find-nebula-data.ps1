# Find Nebula API data for testing
# Usage: .\scripts\find-nebula-data.ps1
# Requires EXPO_PUBLIC_NEBULA_API_KEY in .env (or set $env:EXPO_PUBLIC_NEBULA_API_KEY)

$apiKey = $env:EXPO_PUBLIC_NEBULA_API_KEY
if (-not $apiKey) {
  $envFile = Join-Path $PSScriptRoot ".." ".env"
  if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
      if ($_ -match 'EXPO_PUBLIC_NEBULA_API_KEY="(.+)"') { $apiKey = $matches[1] }
    }
  }
}
if (-not $apiKey) { Write-Host "Set EXPO_PUBLIC_NEBULA_API_KEY"; exit 1 }

$headers = @{ "x-api-key" = $apiKey }
$base = "https://api.utdnebula.com"

Write-Host "`n=== Calendar events (dates with events) ===" -ForegroundColor Cyan
$dates = @("2026-03-11","2026-03-12","2026-04-01","2026-04-15","2025-03-07","2025-03-10")
foreach ($d in $dates) {
  try {
    $r = Invoke-RestMethod -Uri "$base/calendar/$d" -Headers $headers
    $b = $r.data.buildings
    if ($b -and $b.Count -gt 0) { Write-Host "  $d : $($b.Count) buildings" -ForegroundColor Green }
    else { Write-Host "  $d : empty" }
  } catch { Write-Host "  $d : error" }
}

Write-Host "`n=== Course combos that return data (subject + class_level) ===" -ForegroundColor Cyan
$combos = @(
  @{s="CS";c="Undergraduate"},
  @{s="CS";c="Graduate"},
  @{s="MATH";c="Undergraduate"},
  @{s="MATH";c="Graduate"},
  @{s="EE";c="Undergraduate"},
  @{s="EE";c="Graduate"}
)
foreach ($x in $combos) {
  try {
    $r = Invoke-RestMethod -Uri "$base/course?subject_prefix=$($x.s)&class_level=$($x.c)" -Headers $headers
    $n = if ($r.data) { $r.data.Count } else { 0 }
    if ($n -gt 0) { Write-Host "  $($x.s) + $($x.c) : $n courses" -ForegroundColor Green }
    else { Write-Host "  $($x.s) + $($x.c) : 0 courses" }
  } catch { Write-Host "  $($x.s) + $($x.c) : error" }
}

Write-Host "`nNote: Nebula API uses class_level='Undergraduate' or 'Graduate', not 1000/2000/etc." -ForegroundColor Yellow
Write-Host "Note: Calendar endpoint often returns empty buildings; event data may be sparse." -ForegroundColor Yellow
