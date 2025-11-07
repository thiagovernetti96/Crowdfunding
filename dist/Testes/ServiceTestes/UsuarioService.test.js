"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const UsuarioService_1 = require("../../Service/UsuarioService");
const mockUsuarioRepository = {
    save: globals_1.jest.fn(),
    find: globals_1.jest.fn(),
    findOne: globals_1.jest.fn(),
    remove: globals_1.jest.fn()
};
(0, globals_1.describe)('UsuarioService', () => {
    let usuarioService;
    let usuarioRepository;
    (0, globals_1.beforeEach)(() => {
        usuarioRepository = mockUsuarioRepository;
        usuarioService = new UsuarioService_1.UsuarioService(usuarioRepository);
        globals_1.jest.clearAllMocks();
    });
    (0, globals_1.describe)('inserir', () => {
        (0, globals_1.it)('deve inserir uma pessoa física com sucesso', async () => {
            const pessoa_fisica = { id: 1, nome: 'João', email: 'joao@example.com' };
            mockUsuarioRepository.save.mockReturnValueOnce(pessoa_fisica);
            const result = await usuarioService.inserir(pessoa_fisica);
            (0, globals_1.expect)(result).toEqual(pessoa_fisica);
            (0, globals_1.expect)(mockUsuarioRepository.save).toHaveBeenCalledWith(pessoa_fisica);
        });
        (0, globals_1.it)('deve lançar erro quando dados obrigatórios não são fornecidos', async () => {
            const pessoa_fisica = { id: 1, nome: '', email: '' };
            await (0, globals_1.expect)(usuarioService.inserir(pessoa_fisica))
                .rejects.toEqual({ id: 400, msg: "Todos os dados são obrigatórios" });
            (0, globals_1.expect)(mockUsuarioRepository.save).not.toHaveBeenCalled();
        });
        (0, globals_1.it)('deve lançar erro quando nome é undefined', async () => {
            const pessoa_fisica = { id: 1, nome: undefined, cpf: '12345678900',
                data_nascimento: new Date('1990-01-01'), email: 'joao@example.com' };
            await (0, globals_1.expect)(usuarioService.inserir(pessoa_fisica))
                .rejects.toEqual({ id: 400, msg: "Todos os dados são obrigatórios" });
            (0, globals_1.expect)(mockUsuarioRepository.save).not.toHaveBeenCalled();
        });
        (0, globals_1.it)('deve lançar erro quando nome é null', async () => {
            const pessoa_fisica = { id: 1, nome: null, cpf: '12345678900',
                data_nascimento: new Date('1990-01-01'), email: 'joao@example.com' };
            await (0, globals_1.expect)(usuarioService.inserir(pessoa_fisica))
                .rejects.toEqual({ id: 400, msg: "Todos os dados são obrigatórios" });
            (0, globals_1.expect)(mockUsuarioRepository.save).not.toHaveBeenCalled();
        });
    });
    (0, globals_1.describe)('atualizar', () => {
        (0, globals_1.it)('deve atualizar uma pessoa física existente', async () => {
            const pessoa_fisica_existente = { id: 1, nome: 'João', email: 'joao@example.com' };
            mockUsuarioRepository.findOne.mockReturnValueOnce(pessoa_fisica_existente);
            const pessoa_fisica_atualizada = { id: 1, nome: 'João Silva', email: 'joao.silva@example.com' };
            mockUsuarioRepository.save.mockReturnValueOnce(pessoa_fisica_atualizada);
            const result = await usuarioService.atualizar(1, pessoa_fisica_atualizada);
            (0, globals_1.expect)(result).toEqual(pessoa_fisica_atualizada);
            (0, globals_1.expect)(mockUsuarioRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
        });
        (0, globals_1.it)('deve lançar erro quando pessoa física não é encontrada para atualização', async () => {
            mockUsuarioRepository.findOne.mockReturnValueOnce(undefined);
            const pessoa_fisica_atualizada = { id: 1, nome: 'João Silva', email: 'joao.silva@example.com' };
            await (0, globals_1.expect)(usuarioService.atualizar(1, pessoa_fisica_atualizada))
                .rejects.toEqual({ id: 404, msg: "Pessoa não encontrada" });
            (0, globals_1.expect)(mockUsuarioRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
            (0, globals_1.expect)(mockUsuarioRepository.save).not.toHaveBeenCalled();
        });
    });
    (0, globals_1.describe)('listar', () => {
        (0, globals_1.it)('deve retornar lista de pessoas físicas', async () => {
            const pessoas_fisicas = [
                { id: 1, nome: 'João', email: 'joao@example.com' },
                { id: 2, nome: 'Maria', email: 'maria@example.com' }
            ];
            mockUsuarioRepository.find.mockReturnValueOnce(pessoas_fisicas);
            const result = await usuarioService.listar();
            (0, globals_1.expect)(result).toEqual(pessoas_fisicas);
            (0, globals_1.expect)(mockUsuarioRepository.find).toHaveBeenCalled();
        });
        (0, globals_1.it)('deve retornar array vazio quando não há pessoas físicas', async () => {
            mockUsuarioRepository.find.mockReturnValueOnce([]);
            const result = await usuarioService.listar();
            (0, globals_1.expect)(result).toEqual([]);
            (0, globals_1.expect)(mockUsuarioRepository.find).toHaveBeenCalled();
        });
    });
    (0, globals_1.describe)('Buscar por Id', () => {
        (0, globals_1.it)('deve encontrar pessoa física por id existente', async () => {
            const pessoa_fisica = { id: 1, nome: 'João', email: 'joao@example.com' };
            mockUsuarioRepository.findOne.mockReturnValueOnce(pessoa_fisica);
            const result = await usuarioService.buscarporId(1);
            (0, globals_1.expect)(result).toEqual(pessoa_fisica);
            (0, globals_1.expect)(mockUsuarioRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
        });
        (0, globals_1.it)('deve lançar erro para id não existente', async () => {
            mockUsuarioRepository.findOne.mockReturnValueOnce(undefined);
            await (0, globals_1.expect)(usuarioService.buscarporId(999))
                .rejects.toEqual({ id: 404, msg: "Pessoa não encontrada" });
            (0, globals_1.expect)(mockUsuarioRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
        });
    });
    (0, globals_1.describe)('Buscar por Nome', () => {
        (0, globals_1.it)('deve encontrar pessoa física por nome existente', async () => {
            const pessoa_fisica = { id: 1, nome: 'João', email: 'joao@example.com' };
            mockUsuarioRepository.findOne.mockReturnValueOnce(pessoa_fisica);
            const result = await usuarioService.buscarporNome('João');
            (0, globals_1.expect)(result).toEqual(pessoa_fisica);
            (0, globals_1.expect)(mockUsuarioRepository.findOne).toHaveBeenCalledWith({ where: { nome: 'João' } });
        });
        (0, globals_1.it)('deve lançar erro para nome não existente', async () => {
            mockUsuarioRepository.findOne.mockReturnValueOnce(undefined);
            await (0, globals_1.expect)(usuarioService.buscarporNome('Inexistente'))
                .rejects.toEqual({ id: 404, msg: "Pessoa não encontrada" });
            (0, globals_1.expect)(mockUsuarioRepository.findOne).toHaveBeenCalledWith({ where: { nome: 'Inexistente' } });
        });
    });
    (0, globals_1.describe)('deletar', () => {
        (0, globals_1.it)('deve deletar pessoa física existente', async () => {
            const pessoa_fisica = { id: 1, nome: 'João', email: 'joao@example.com' };
            mockUsuarioRepository.findOne.mockReturnValueOnce(pessoa_fisica);
            await usuarioService.deletar(1);
            (0, globals_1.expect)(mockUsuarioRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
            (0, globals_1.expect)(mockUsuarioRepository.remove).toHaveBeenCalledWith(pessoa_fisica);
        });
        (0, globals_1.it)('deve lançar erro ao tentar deletar pessoa física não existente', async () => {
            mockUsuarioRepository.findOne.mockReturnValueOnce(undefined);
            await (0, globals_1.expect)(usuarioService.deletar(999))
                .rejects.toEqual({ id: 404, msg: "Pessoa não encontrada" });
            (0, globals_1.expect)(mockUsuarioRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
            (0, globals_1.expect)(mockUsuarioRepository.remove).not.toHaveBeenCalled();
        });
    });
});
