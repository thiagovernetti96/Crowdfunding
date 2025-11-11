import { AppDataSource } from './data-source';
import { Categoria } from './Model/categoria';

async function seedDatabase() {
  await AppDataSource.initialize();
  
  const categoriaRepository = AppDataSource.getRepository(Categoria);
  
  const categorias = [
    { nome: 'Tecnologia' },
    { nome: 'Arte' },
    { nome: 'Games' },
    {nome: 'Esportes'},
    {nome: 'Limpeza'}
  ];
  
  for (const catData of categorias) {
    const exists = await categoriaRepository.findOne({ where: { nome: catData.nome } });
    if (!exists) {
      const categoria = categoriaRepository.create(catData);
      await categoriaRepository.save(categoria);
      console.log(`Categoria criada: ${catData.nome}`);
    }
  }
  
  console.log('Seed completed!');
  process.exit(0);
}

seedDatabase().catch(console.error);