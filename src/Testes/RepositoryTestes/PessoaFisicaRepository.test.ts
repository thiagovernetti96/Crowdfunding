import {describe, expect, test,it,beforeEach} from '@jest/globals';
import { PessoaFisica } from '../../Model/pessoa_fisica';
import { PessoaFisicaRepository } from '../../Repository/PessoaFisicaRepository';

describe('PessoaFisicaRepository', () => {
  let repository: PessoaFisicaRepository;

  beforeEach(() => {
    repository = new PessoaFisicaRepository();
  });
  describe('inserir', () => {
    it('deve inserir uma nova pessoa física com id autoincrement', () => {
      const pessoaFisicaData = { nome: 'João Silva', cpf: '123.456.789-00', email: 'joao.silva@example.com',data_nascimento:new Date('1990-01-01'),senha:'senha123' };
      const result = repository.inserir(pessoaFisicaData)
      expect(result).toEqual({...pessoaFisicaData,id:1});      
    });

    it('deve incrementar o id para cada nova pessoa fisica', () => {
      const pessoa1 = repository.inserir({ nome: 'Eletrônicos' });
      const pessoa2 = repository.inserir({ nome: 'Livros' });
      const pessoa3 = repository.inserir({ nome: 'Roupas' });

      expect(pessoa1.id).toBe(1);
      expect(pessoa2.id).toBe(2);
      expect(pessoa3.id).toBe(3);
    });
  })

  describe('listar',()=>{
    it('deve retornar array vazio quando não há pessoas físicas', () => {
      expect(repository.listar()).toEqual([]);
    });
    it('Deve retornar uma lista de pessoas físicas',() =>{
      const pessoa1 =  repository.inserir({ nome: 'João Silva', cpf: '123.456.789-00', email: 'joao.silva@example.com',data_nascimento:new Date('1990-01-01'),senha:'senha123' });
      const pessoa2 = repository.inserir({nome: 'Joana Silva', cpf: '123.456.789-01', email: 'joana.silva@example.com',data_nascimento:new Date('1992-01-01'),senha:'senha124' });
      const pessoa3 = repository.inserir({ nome: 'Caio Castro', cpf: '120.900.789-00', email: 'Caio.Castro@example.com',data_nascimento:new Date('2005-10-05'),senha:'senha783' });
      const lista = repository.listar()
      expect(lista).toHaveLength(3);
      expect(lista).toContainEqual(pessoa1);
      expect(lista).toContainEqual(pessoa2);
      expect(lista).toContainEqual(pessoa3)
    })
  })

  describe('Buscar por Id',()=>{
    beforeEach(()=> {
      repository.inserir({ nome: 'João Silva', cpf: '123.456.789-00',email: 'joao.silva@example.com',data_nascimento:new Date('1990-01-01'),senha:'senha123' }),
      repository.inserir({nome: 'Joana Grog', cpf: '920.890.456-00',
      email: 'JoanaGrog@example.com',data_nascimento:new Date('2007-10-20'),senha:'senha890'})
    })
  })
   it('deve encontrar pessoa física por id existente', () => {
      const pessoafisica = repository.buscarporId(1);
      
      expect(pessoafisica).toEqual({
      id: 1,
      nome: 'João Silva', cpf: '123.456.789-00',
      email: 'joao.silva@example.com',
      data_nascimento:new Date('1990-01-01'),
      senha:'senha123' 
      });
    });

    it('deve retornar undefined para id não existente', () => {
      const pessoafisica = repository.buscarporId(999);
      
      expect(pessoafisica).toBeUndefined();
    });

    describe('Buscar por Nome',()=>{
      beforeEach(()=> {
        repository.inserir({ nome: 'João Silva', cpf: '123.456.789-00',
        email: 'joao.silva@example.com',data_nascimento:new Date('1990-01-01'),senha:'senha123' }),
        repository.inserir({nome: 'Joana Grog', cpf: '920.890.456-00',
        email: 'JoanaGrog@example.com',data_nascimento:new Date('2007-10-20'),senha:'senha890'})
      })
      it('deve encontrar pessoa física por nome existente', () => {
        const pessoafisica = repository.buscarporNome('João Silva');
        
        expect(pessoafisica).toEqual({
        id: 1,
        nome: 'João Silva', cpf: '123.456.789-00',
        email: 'joao.silva@example.com',
        data_nascimento:new Date('1990-01-01'),
        senha:'senha123' 
        });
      });

      it('deve retornar undefined para nome não existente', () => {
        const pessoafisica = repository.buscarporNome('Inexistente');
        
        expect(pessoafisica).toBeUndefined();
      });
    })

    describe('Atualizar',()=>{
      beforeEach(()=>{
        repository.inserir({ nome: 'João Silva', cpf: '123.456.789-00',
        email: 'joao.silva@example.com',data_nascimento:new Date('1990-01-01'),senha:'senha123' })
        repository.inserir({ nome: 'Thiago Neves', cpf: '990.456.789-00',
        email: 'thiagoneves@example.com',data_nascimento:new Date('1986-01-01'),senha:'senha120' })
      })
      it('Deve Atualizar a pessoa física',()=>{
        const result = repository.atualizar(1,{nome:'João Silva Atualizado',cpf:'126.457.790-01',
          data_nascimento:new Date('2002-08-22'),senha:'senha221' })
        expect(result).toEqual({
          nome:'João Silva Atualizado',cpf:'126.457.790-01',
          data_nascimento:new Date('2002-08-22'),senha:'senha221'
        })
      })
       it('deve retornar undefined ao tentar atualizar pessoa física não existente', () => {
        const result = repository.atualizar(999, { nome: 'Inexistente' });
        
        expect(result).toBeUndefined();
      });
    it('não deve afetar outras pessoas ao atualizar', () => {
      repository.atualizar(1, { nome: 'Eletrônicos Atualizado',cpf:'126.457.790-01',
        data_nascimento:new Date('2000-08-22'),senha:'senha221'  });
      
      const outraCategoria = repository.buscarporId(2);
      expect(outraCategoria).toEqual({
        id: 2,
        nome: 'Thiago Neves', cpf: '990.456.789-00',
        email: 'thiagoneves@example.com',data_nascimento:new Date('1986-01-01'),senha:'senha120'
      });
    });
    })
    describe('deletar', () => {
    beforeEach(() => {
       repository.inserir({ nome: 'João Silva', cpf: '123.456.789-00',
        email: 'joao.silva@example.com',data_nascimento:new Date('1990-01-01'),senha:'senha123' })
        repository.inserir({ nome: 'Thiago Neves', cpf: '990.456.789-00',
        email: 'thiagoneves@example.com',data_nascimento:new Date('1986-01-01'),senha:'senha120' })
         repository.inserir({ nome: 'Naiara Santos', cpf: '780.456.789-00',
        email: 'naiarasantos@example.com',data_nascimento:new Date('1979-08-01'),senha:'senha330' })

    });

    it('deve deletar pessoa física existente e retornar true', () => {
      const result = repository.deletar(2);
      
      expect(result).toBe(true);
      expect(repository.listar()).toHaveLength(2);
      expect(repository.buscarporId(2)).toBeUndefined();
    });

    it('deve retornar false ao tentar deletar pessoa física não existente', () => {
      const result = repository.deletar(999);
      
      expect(result).toBe(false);
      expect(repository.listar()).toHaveLength(3);
    });

    it('deve manter os ids das pessoas físicas restantes após deleção', () => {
      repository.deletar(2);
      
      const pessoasfisicas = repository.listar();
      expect(pessoasfisicas[0].id).toBe(1);
      expect(pessoasfisicas[1].id).toBe(3);
    });
  });

})
