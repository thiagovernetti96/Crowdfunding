"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
class UsuarioRepository {
    constructor() {
        this.usuarios = [];
        this.idCounter = 1;
    }
    inserir(usuario) {
        const newUsuario = {
            id: this.idCounter++,
            ...usuario
        };
        this.usuarios.push(newUsuario);
        return newUsuario;
    }
    listar() {
        return this.usuarios;
    }
    buscarporId(id) {
        return this.usuarios.find(u => u.id === id);
    }
    buscarporNome(nome) {
        return this.usuarios.find(u => u.nome === nome);
    }
    atualizar(id, usuario) {
        const index = this.usuarios.findIndex(u => u.id === id);
        if (index === -1)
            return undefined;
        const usuarioAtualizado = {
            id,
            ...usuario
        };
        this.usuarios[index] = usuarioAtualizado;
        return usuarioAtualizado;
    }
    deletar(id) {
        const index = this.usuarios.findIndex(pf => pf.id === id);
        if (index !== -1) {
            this.usuarios.splice(index, 1);
            return true;
        }
        return false;
    }
}
exports.UsuarioRepository = UsuarioRepository;
