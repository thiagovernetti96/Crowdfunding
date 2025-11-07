"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
describe('RecompensaRepository', () => {
  let repository: RecompensaRepository;
  beforeEach(() => {
    repository = new RecompensaRepository();
  });
  describe('inserir', () => {
    it('deve inserir uma nova recompensa com id autoincrement', () => {
      const recompensaData = { nome: 'Recompensa X', descricao: 'Descrição X', produto: { nome: 'Produto X' }, valor_minimo: 100, quantidade_maxima: 10 };
      const resultado = repository.inserir(1, recompensaData);
      expect(resultado).toBeTruthy();
      expect(resultado.id).toBeDefined();
    });
    it('deve incrementar o id para cada nova recompensa', () => {
      const recompensa1 = repository.inserir(1, { nome: 'Recompensa A', descricao: 'Descrição A', produto: { nome: 'Produto A' }, valor_minimo: 50, quantidade_maxima: 5 });
      const recompensa2 = repository.inserir(1, { nome: 'Recompensa B', descricao: 'Descrição B', produto: { nome: 'Produto B' }, valor_minimo: 75, quantidade_maxima: 7 });
      const recompensa3 = repository.inserir(1, { nome: 'Recompensa C', descricao: 'Descrição C', produto: { nome: 'Produto C' }, valor_minimo: 150, quantidade_maxima: 15 });
      expect(recompensa1.id).toBe(1);
      expect(recompensa2.id).toBe(2);
      expect(recompensa3.id).toBe(3);
    });
  })

  describe('listar',()=>{
    it('deve retornar array vazio quando não há recompensas', () => {
      expect(repository.listar()).toEqual([]);
    });
    it('Deve retornar uma lista de recompensas',() =>{
      const recompensa1 =  repository.inserir(1, { nome: 'Recompensa X', descricao: 'Descrição X', produto: { nome: 'Produto X' }, valor_minimo: 100, quantidade_maxima: 10 });
      const recompensa2 = repository.inserir(1, { nome: 'Recompensa Y', descricao: 'Descrição Y', produto: { nome: 'Produto Y' }, valor_minimo: 200, quantidade_maxima: 20 });
      const recompensa3 = repository.inserir(1, { nome: 'Recompensa Z', descricao: 'Descrição Z', produto: { nome: 'Produto Z' }, valor_minimo: 300, quantidade_maxima: 30 });
      const lista = repository.listar()
      expect(lista).toHaveLength(3);
      expect(lista).toContainEqual(recompensa1);
      expect(lista).toContainEqual(recompensa2);
      expect(lista).toContainEqual(recompensa3)
    })
  })

  describe('Buscar por Id',()=>{
    beforeEach(()=> {
      repository.inserir(1, { nome: 'Recompensa X', descricao: 'Descrição X', produto: { nome: 'Produto X' }, valor_minimo: 100, quantidade_maxima: 10 });
    });
    it('deve encontrar recompensa por id existente', () => {
      const recompensa = repository.buscarporId(1);
      expect(recompensa).toEqual({
        id: 1,
        nome: 'Recompensa X',
        descricao: 'Descrição X',
        produto: { nome: 'Produto X' },
        valor_minimo: 100,
        quantidade_maxima: 10
      });
    });

    it('deve retornar undefined para id não existente', () => {
      const recompensa = repository.buscarporId(999);
      expect(recompensa).toBeUndefined();
    });
  })
  describe('atualizar', () => {
    beforeEach(() => {
      repository.inserir(1, { nome: 'Recompensa X', descricao: 'Descrição X', produto: { nome: 'Produto X' }, valor_minimo: 100, quantidade_maxima: 10 });
    });
    it('deve atualizar uma recompensa existente', () => {
      const recompensaAtualizada = repository.atualizar(1, {
        nome: 'Recompensa X Atualizada',
        descricao: 'Descrição X Atualizada',
        produto: { nome: 'Produto X Atualizado' },
        valor_minimo: 150,
        quantidade_maxima: 15
      });
      expect(recompensaAtualizada).toEqual({
        id: 1,
        nome: 'Recompensa X Atualizada',
        descricao: 'Descrição X Atualizada',
        produto: { nome: 'Produto X Atualizado' },
        valor_minimo: 150,
        quantidade_maxima: 15
      });
    });
    it('deve retornar undefined ao tentar atualizar recompensa não existente', () => {
      const resultado = repository.atualizar(999, {
        nome: 'Recompensa Inexistente',
        descricao: 'Descrição Inexistente',
        produto: { nome: 'Produto Inexistente' },
        valor_minimo: 0,
        quantidade_maxima: 0
      });
      expect(resultado).toBeUndefined();
    });
  })

  describe('deletar', () => {
    beforeEach(() => {
      repository.inserir(1, { nome: 'Recompensa X', descricao: 'Descrição X', produto: { nome: 'Produto X' }, valor_minimo: 100, quantidade_maxima: 10 });
      repository.inserir(1, { nome: 'Recompensa Y', descricao: 'Descrição Y', produto: { nome: 'Produto Y' }, valor_minimo: 200, quantidade_maxima: 20 });
    });
    it('deve deletar uma recompensa existente', () => {
      repository.deletar(1);
      const lista = repository.listar();
      expect(lista).toHaveLength(1);
      expect(lista[0].id).toBe(2);
    });

    it('deve retornar false ao tentar deletar recompensa não existente', () => {
      const resultado = repository.deletar(999);
      expect(resultado).toBe(false);
      expect(repository.listar()).toHaveLength(2);
    });
  });
  describe('Buscar por Nome',()=>{
    beforeEach(()=> {
      repository.inserir(1, { nome: 'Recompensa X', descricao: 'Descrição X', produto: { nome: 'Produto X' }, valor_minimo: 100, quantidade_maxima: 10 });
      repository.inserir(2, { nome: 'Recompensa Y', descricao: 'Descrição Y', produto: { nome: 'Produto Y' }, valor_minimo: 200, quantidade_maxima: 20 });
      repository.inserir(3, { nome: 'Recompensa Z', descricao: 'Descrição Z', produto: { nome: 'Produto Z' }, valor_minimo: 300, quantidade_maxima: 30 });
    });
    it('deve encontrar recompensa por nome existente', () => {
      const recompensa = repository.buscarporNome('Recompensa Y');
      expect(recompensa).toEqual({
          id: 2,
          nome: 'Recompensa Y',
          descricao: 'Descrição Y',
          produto: { nome: 'Produto Y' },
          valor_minimo: 200,
          quantidade_maxima: 20
      });
    });
    it('deve retornar undefined para nome não existente', () => {
      const recompensa = repository.buscarporNome('Recompensa Inexistente');
      expect(recompensa).toBeUndefined();
    });
  })
});*/ 
