#!/bin/bash
echo "🎯 INICIANDO APLICAÇÃO NO RENDER"
echo "📁 Diretório atual: $(pwd)"
echo "📁 Listando arquivos:"
ls -la
echo "📁 Conteúdo da dist:"
ls -la dist/ || echo "❌ Pasta dist não existe"
echo "🔍 Procurando app.js:"
find . -name "app.js" -type f
echo "🚀 Executando aplicação..."
node dist/app.js