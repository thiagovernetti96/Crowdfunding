import {describe, expect,it,beforeEach} from '@jest/globals';
import { PessoaJuridica } from '../../Model/pessoa_juridica';
import { PessoaJuridicaRepository } from '../../Repository/PessoaJuridicaRepository';

describe('PessoaJuridicaRepository', () => {
  let repository: PessoaJuridicaRepository;

  beforeEach(() => {
    repository = new PessoaJuridicaRepository();
  });
  describe('inserir', () => {
    it('deve inserir uma nova pessoa jurídica com id autoincrement', () => {
      const pessoaJuridicaData = { nome: 'Empresa X', cnpj: '12.345.678/0001-00', email: 'empresa.x@example.com',senha:'senha123', };
      const resultado = repository.inserir(1, pessoaJuridicaData);
      expect(resultado).toBeTruthy();
      expect(resultado.id).toBeDefined();
    }); 
    it('deve incrementar o id para cada nova pessoa jurídica', () => {
      const pessoa1 = repository.inserir(1, { nome: 'Empresa A', cnpj: '12.345.678/0001-00', email: 'empresa.a@example.com',senha:'senha123', }); 
      const pessoa2 = repository.inserir(2, { nome: 'Empresa B', cnpj: '98.765.432/0001-00', email: 'empresa.b@example.com',senha:'senha123', });
      const pessoa3 = repository.inserir(3, { nome: 'Empresa C', cnpj: '11.222.333/0001-00', email: 'empresa.c@example.com',senha:'senha123', });
      expect(pessoa1.id).toBe(1);
      expect(pessoa2.id).toBe(2);
      expect(pessoa3.id).toBe(3);
    });
  })

  describe('listar',()=>{
    it('deve retornar array vazio quando não há pessoas jurídicas', () => {
      expect(repository.listar()).toEqual([]);
    });
    it('Deve retornar uma lista de pessoas jurídicas',() =>{
      const pessoa1 =  repository.inserir(1, { nome: 'Empresa X', cnpj: '12.345.678/0001-00', email: 'empresa.x@example.com',senha:'senha123', });  
      const pessoa2 = repository.inserir(2, { nome: 'Empresa Y', cnpj: '98.765.432/0001-00', email: 'empresa.y@example.com',senha:'senha123', });
      const pessoa3 = repository.inserir(3, { nome: 'Empresa Z', cnpj: '11.222.333/0001-00', email: 'empresa.z@example.com',senha:'senha123', });
      const lista = repository.listar()
      expect(lista).toHaveLength(3);
      expect(lista).toContainEqual(pessoa1);
      expect(lista).toContainEqual(pessoa2);
      expect(lista).toContainEqual(pessoa3)
    })
  })

  describe('Buscar por Id',()=>{
    beforeEach(()=> {
      repository.inserir(1, { nome: 'Empresa X', cnpj: '12.345.678/0001-00', email: 'empresa.x@example.com',senha:'senha123', });
    }); 
    it('deve encontrar pessoa jurídica por id existente', () => {
      const pessoajuridica = repository.buscarporId(1);
      expect(pessoajuridica).toEqual({
        id: 1,
        nome: 'Empresa X', cnpj: '12.345.678/0001-00',
        email: 'empresa.x@example.com',senha:'senha123',
      });
    });

    it('deve retornar undefined para id não existente', () => {
      const pessoajuridica = repository.buscarporId(999);
      expect(pessoajuridica).toBeUndefined();
    });
  })

  describe('Buscar por Nome',()=>{
    beforeEach(()=> {
      repository.inserir(1, { nome: 'Empresa X', cnpj: '12.345.678/0001-00', email: 'empresa.x@example.com',senha:'senha123', });
    });
    it('deve encontrar pessoa jurídica por nome existente', () => {
      const pessoajuridica = repository.buscarporNome('Empresa X');
      expect(pessoajuridica).toEqual({
        id: 1,
        nome: 'Empresa X', cnpj: '12.345.678/0001-00',
        email: 'empresa.x@example.com',senha:'senha123',
      });
    });

    it('deve retornar undefined para nome não existente', () => {
      const pessoajuridica = repository.buscarporNome('Empresa Y');
      expect(pessoajuridica).toBeUndefined();
    });
  })
  describe('Atualizar',()=>{
    beforeEach(()=> {
      repository.inserir(1, { nome: 'Empresa X', cnpj: '12.345.678/0001-00', email: 'empresa.x@example.com',senha:'senha123', });
    });
    it('deve atualizar uma pessoa jurídica existente', () => {
      const resultado = repository.atualizar(1, { nome: 'Empresa X Atualizada', cnpj: '12.345.678/0001-00', email: 'empresa.x@example.com',senha:'senha123', });
      expect(resultado).toBeTruthy();
      expect(resultado).toEqual({
        id: 1,
        nome: 'Empresa X Atualizada',
        cnpj: '12.345.678/0001-00',
        email: 'empresa.x@example.com',senha:'senha123',
      });
    });

    it('deve retornar undefined ao tentar atualizar uma pessoa jurídica não existente', () => {
      const resultado = repository.atualizar(999, { nome: 'Empresa Inexistente', cnpj: '00.000.000/0001-00', email: 'empresa.inexistente@example.com',senha:'senha123', });
      expect(resultado).toBeUndefined();
    });
  }) 
  describe('Deletar',()=>{
    beforeEach(()=> {
      repository.inserir(1, { nome: 'Empresa X', cnpj: '12.345.678/0001-00', email: 'empresa.x@example.com',senha:'senha123', });
      repository.inserir(2, { nome: 'Empresa Y', cnpj: '98.765.432/0001-00', email: 'empresa.y@example.com',senha:'senha123', });
    });
    it('deve deletar uma pessoa jurídica existente', () => {
      const resultado = repository.deletar(1);
      expect(resultado).toBeTruthy();
      expect(repository.buscarporId(1)).toBeUndefined();
    });

    it('deve retornar false ao tentar deletar uma pessoa jurídica não existente', () => {
      const resultado = repository.deletar(999);
      expect(resultado).toBe(false);
      expect(repository.listar()).toHaveLength(2);
    });
  })
});