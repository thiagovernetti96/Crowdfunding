import { Repository } from "typeorm";
import { Usuario } from "../Model/usuario";
import { sign, verify } from "jsonwebtoken";

const SECRET = "Sen@c2025";

export class LoginService {
  private repository: Repository<Usuario>;

  constructor(repository: Repository<Usuario>) {
    this.repository = repository;
  }

  async verificarLogin(email: string, senha: string): Promise<{ token: string; nome: string }> {
    const usuario = await this.repository.findOneBy({ email });

    if (usuario && usuario.senha === senha) {
      const token = sign(
        {
          usuarioId: usuario.id,
          usuarioEmail: usuario.email,
        },
        SECRET,
        { expiresIn: "1h" }
      );

      // 🔹 agora retornamos também o nome do usuário
      const nome = usuario.nome ?? "";
      return { token, nome };
    }

    throw { id: 401, msg: "Usuário ou senha inválidos" };
  }

  async validarToken(token: string): Promise<void> {
    try {
      const payload = verify(token, SECRET);
      if (!payload) {
        throw { id: 401, msg: "Token inválido" };
      }
      return;
    } catch (err) {
      console.log(err);
      throw { id: 401, msg: "Token inválido" };
    }
  }
}


  