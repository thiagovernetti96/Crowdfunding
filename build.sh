#!/bin/bash
echo "🔨 INICIANDO BUILD NO RENDER..."

# Compila TypeScript
echo "📦 Compilando TypeScript..."
tsc

# Copia TODOS os arquivos da pasta Config
echo "📁 Copiando arquivos de configuração..."
mkdir -p dist/Config
cp -r src/Config/* dist/Config/

# Lista para debug
echo "✅ BUILD COMPLETO - ARQUIVOS EM DIST/CONFIG:"
ls -la dist/Config/

echo "🔍 VERIFICANDO IMPORTS:"
grep -r "require.*Config" dist/Controller/ || echo "Nenhum import de Config encontrado"