import { Repository } from "typeorm";
import { Usuario } from "../Model/usuario";
import { PessoaFisica } from "../Model/pessoa_fisica";
import { sign, verify } from "jsonwebtoken";

const SECRET = "Sen@c2025";
export class LoginService {
    private repository: Repository<Usuario>;

    constructor(repository: Repository<Usuario>) {
        this.repository = repository;
    }
    
    async verificarLogin(email: string, senha: string): Promise<string> {
        const usuario = await this.repository.findOne({ 
            where: { email }
        });

        if(usuario && usuario.senha === senha) {            
            const tipo = usuario instanceof PessoaFisica ? 'fisica' : 'juridica';
            
            const token = sign({
                usuarioId: usuario.id,
                usuarioEmail: usuario.email,
                tipoUsuario: tipo
            }, SECRET, { expiresIn: '1h' });
            
            return token;            
        }
        
        throw ({ id: 401, msg: "Usuário ou senha inválidos" });    
    }
    
    async validarToken(token: string): Promise<{ id: number, email: string, tipo: string }> {
        try {
            const payload = verify(token, SECRET) as any;
            
            if(!payload || !payload.usuarioId) {
                throw ({ id: 401, msg: "Token Inválido" });    
            }
            
            return {
                id: payload.usuarioId,
                email: payload.usuarioEmail,
                tipo: payload.tipoUsuario
            };
        } catch (err) {
            console.log(err);
            throw ({ id: 401, msg: "Token Inválido" });    
        }
    }
}

  