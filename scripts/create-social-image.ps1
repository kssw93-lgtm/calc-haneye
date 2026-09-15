Add-Type -AssemblyName System.Drawing
$bitmap = New-Object System.Drawing.Bitmap 1200,630
$canvas = [System.Drawing.Graphics]::FromImage($bitmap)
$canvas.SmoothingMode = 'AntiAlias'
$canvas.TextRenderingHint = 'AntiAliasGridFit'
$canvas.Clear([System.Drawing.ColorTranslator]::FromHtml('#F5F7FF'))
$blue = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#2447FF'))
$ink = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#14213D'))
$muted = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#52617A'))
$white = [System.Drawing.Brushes]::White
$title = New-Object System.Drawing.Font 'Malgun Gothic',64,([System.Drawing.FontStyle]::Bold),([System.Drawing.GraphicsUnit]::Pixel)
$subtitle = New-Object System.Drawing.Font 'Malgun Gothic',30,([System.Drawing.FontStyle]::Regular),([System.Drawing.GraphicsUnit]::Pixel)
$small = New-Object System.Drawing.Font 'Malgun Gothic',25,([System.Drawing.FontStyle]::Regular),([System.Drawing.GraphicsUnit]::Pixel)
$canvas.FillRectangle($blue,0,0,1200,14)
$canvas.DrawString('계산한눈에',$title,$ink,70,145)
$canvas.DrawString('복잡한 생활 계산, 한눈에',$subtitle,$muted,74,245)
$canvas.DrawString('금융 · 급여 · 부동산 계산기와 지원정책',$small,$muted,74,315)
$canvas.FillRectangle($blue,900,145,220,270)
$canvas.FillRectangle($white,925,175,170,55)
foreach ($x in @(925,987,1049)) {
  foreach ($y in @(258,312,366)) { $canvas.FillEllipse($white,$x,$y,36,30) }
}
$canvas.DrawString('calc-haneye.kr',$small,$blue,74,510)
$bitmap.Save((Join-Path $PSScriptRoot '../public/social-preview.png'),[System.Drawing.Imaging.ImageFormat]::Png)
$canvas.Dispose()
$bitmap.Dispose()
foreach ($item in @($blue,$ink,$muted,$title,$subtitle,$small)) { $item.Dispose() }
