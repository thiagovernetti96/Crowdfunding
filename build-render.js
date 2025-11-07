const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚨 BUILD DE EMERGÊNCIA PARA RENDER');

// Limpa dist anterior
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true });
}

// Compila TypeScript
console.log('📦 Compilando TypeScript...');
execSync('tsc', { stdio: 'inherit' });

// Verifica se os arquivos críticos existem
console.log('🔍 Verificando arquivos críticos...');
const criticalFiles = [
  'dist/app.js',
  'dist/Config/multer.js',
  'dist/Controller/ProdutoController.js'
];

criticalFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} - OK`);
  } else {
    console.log(`❌ ${file} - FALTANDO`);
  }
});

console.log('✅ BUILD COMPLETO');