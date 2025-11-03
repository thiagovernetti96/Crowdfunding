import { Request, Response } from "express";
import { LoginService } from "../Service/LoginService";

export class LoginController {
    private service: LoginService;
  
    constructor(service: LoginService) {
      this.service = service;
    }
  
    realizarLogin = async (req: Request, res: Response): Promise<void> => {
      const { email, senha } = req.body;
      try{ 
          const {token,nome} = await this.service.verificarLogin(email, senha);
          res.status(201).json({token,nome});
      }
      catch(err:any) {
          res.status(err.id).json({ error: err.msg });
      }
    };
}