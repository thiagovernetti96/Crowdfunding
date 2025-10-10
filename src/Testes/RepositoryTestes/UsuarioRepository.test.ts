import {describe, expect, test,it,beforeEach} from '@jest/globals';
import { Usuario} from '../../Model/usuario';
import { UsuarioRepository } from '../../Repository/UsuarioRepository';

describe('UsuarioRepository', () => {
  let repository: UsuarioRepository;

  beforeEach(() => {
    repository = new UsuarioRepository();
  });
  describe('inserir', () => {
    it('deve inserir uma novo usuario com id autoincrement', () => {
      const pessoaFisicaData = { nome: 'João Silva', email: 'joao.silva@example.com',senha:'senha123' };
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
      const pessoa1 =  repository.inserir({ nome: 'João Silva', email: 'joao.silva@example.com',senha:'senha123' });
      const pessoa2 = repository.inserir({nome: 'Joana Silva', email: 'joana.silva@example.com',senha:'senha124' });
      const pessoa3 = repository.inserir({ nome: 'Caio Castro', email: 'Caio.Castro@example.com',senha:'senha783' });
      const lista = repository.listar()
      expect(lista).toHaveLength(3);
      expect(lista).toContainEqual(pessoa1);
      expect(lista).toContainEqual(pessoa2);
      expect(lista).toContainEqual(pessoa3)
    })
  })

  describe('Buscar por Id',()=>{
    beforeEach(()=> {
      repository.inserir({ nome: 'João Silva', email: 'joao.silva@example.com',senha:'senha123' }),
      repository.inserir({nome: 'Joana Grog',email: 'JoanaGrog@example.com',senha:'senha890'})
    })
  })
   it('deve encontrar pessoa física por id existente', () => {
      const pessoafisica = repository.buscarporId(1);
      
      expect(pessoafisica).toEqual({
      id: 1,
      nome: 'João Silva',
      email: 'joao.silva@example.com',    
      senha:'senha123' 
      });
    });

    it('deve retornar undefined para id não existente', () => {
      const pessoafisica = repository.buscarporId(999);
      
      expect(pessoafisica).toBeUndefined();
    });

    describe('Buscar por Nome',()=>{
      beforeEach(()=> {
        repository.inserir({ nome: 'João Silva', 
        email: 'joao.silva@example.com',senha:'senha123' }),
        repository.inserir({nome: 'Joana Grog',
        email: 'JoanaGrog@example.com',senha:'senha890'})
      })
      it('deve encontrar pessoa física por nome existente', () => {
        const pessoafisica = repository.buscarporNome('João Silva');
        
        expect(pessoafisica).toEqual({
        id: 1,
        nome: 'João Silva',
        email: 'joao.silva@example.com',
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
        repository.inserir({ nome: 'João Silva',
        email: 'joao.silva@example.com',senha:'senha123' })
        repository.inserir({ nome: 'Thiago Neves',email: 'thiagoneves@example.com',senha:'senha120' })
      })
      it('Deve Atualizar a pessoa física',()=>{
        const result = repository.atualizar(1,{nome:'João Silva Atualizado',senha:'senha221' })
        expect(result).toEqual({
          nome:'João Silva Atualizado',senha:'senha221'
        })
      })
       it('deve retornar undefined ao tentar atualizar pessoa física não existente', () => {
        const result = repository.atualizar(999, { nome: 'Inexistente' });
        
        expect(result).toBeUndefined();
      });
    it('não deve afetar outras pessoas ao atualizar', () => {
      repository.atualizar(1, { nome: 'Eletrônicos Atualizado',senha:'senha221'  });
      
      const outraCategoria = repository.buscarporId(2);
      expect(outraCategoria).toEqual({
        id: 2,
        nome: 'Thiago Neves',email: 'thiagoneves@example.com',senha:'senha120'
      });
    });
    })
    describe('deletar', () => {
    beforeEach(() => {
       repository.inserir({ nome: 'João Silva',email: 'joao.silva@example.com',senha:'senha123' })
       repository.inserir({ nome: 'Thiago Neves', email: 'thiagoneves@example.com',senha:'senha120' })
       repository.inserir({ nome: 'Naiara Santos',email: 'naiarasantos@example.com',senha:'senha330' })

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
