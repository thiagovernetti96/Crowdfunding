// test-app.js - TESTE SIMPLES
console.log('🎯 TEST-APP.JS EXECUTADO');

// Teste básico do Node.js
console.log('Node.js version:', process.version);

// Teste se consegue carregar o app.js
try {
  console.log('🔍 Tentando carregar dist/app.js...');
  const app = require('./dist/app.js');
  console.log('✅ dist/app.js carregado com sucesso!');
  
  // Se o app.js exporta algo, tente usar
  if (app && typeof app === 'object') {
    console.log('📦 app.js exports:', Object.keys(app));
  }
} catch (error) {
  console.log('❌ ERRO ao carregar dist/app.js:');
  console.log('Mensagem:', error.message);
  console.log('Stack:', error.stack);
  
  // Debug mais detalhado
  console.log('🔍 Debug detalhado:');
  const fs = require('fs');
  const appContent = fs.readFileSync('./dist/app.js', 'utf8');
  console.log('Primeiras 500 caracteres do app.js:');
  console.log(appContent.substring(0, 500));
}