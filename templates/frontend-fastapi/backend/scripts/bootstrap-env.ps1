$projectRoot = Split-Path -Parent $PSScriptRoot
$backendRoot = Join-Path $projectRoot "backend"
$envName = "__PROJECT_NAME__-backend"

Write-Host "Preparing Python environment for $envName"

if (Get-Command conda -ErrorAction SilentlyContinue) {
    Write-Host "Using conda to create the environment"
    conda create -y -n $envName python=3.11
    Write-Host "Activate with: conda activate $envName"
    exit 0
}

if (Get-Command uv -ErrorAction SilentlyContinue) {
    Write-Host "Conda not found, using uv instead"
    Push-Location $backendRoot
    try {
        uv venv
        uv pip install -e ".[dev]"
    } finally {
        Pop-Location
    }
    Write-Host "Activate with: .\\.venv\\Scripts\\Activate.ps1"
    exit 0
}

Write-Warning "Neither conda nor uv is available. Record the environment setup as 待确认."
