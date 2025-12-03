@echo off
echo Converting HOW_KIRO_WAS_USED.md to PDF...

pandoc HOW_KIRO_WAS_USED.md -o HOW_KIRO_WAS_USED.pdf --pdf-engine=xelatex -V geometry:margin=1in -V fontsize=11pt -V colorlinks=true -V linkcolor=blue -V urlcolor=blue

if %ERRORLEVEL% EQU 0 (
    echo Success! PDF created: HOW_KIRO_WAS_USED.pdf
) else (
    echo Error: Pandoc conversion failed
    echo Make sure Pandoc and XeLaTeX are installed
)

pause
