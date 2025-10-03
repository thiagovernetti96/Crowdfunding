import {Router} from "express"
import { ApoioController } from "../Controller/ApoioController"
export const ApoioRouter = (controller:ApoioController): Router=>{
  const router = Router();
  router.post('/', (req, res) => controller.criar(req,res));
  router.get('/:id/status', (req, res) => controller.status(req, res));
  return router
}