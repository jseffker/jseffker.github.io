echo const files = [ > "manifest.js"

for /f "tokens=*" %%i in ('dir ".\posts\published" /b') do (
  echo "%%i", >> "manifest.js"
)

echo ]; >> "manifest.js"