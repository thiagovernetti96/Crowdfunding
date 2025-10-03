// src/repositories/ApoioRepository.ts
// src/repositories/ApoioRepository.ts
import { AppDataSource } from "../data-source";
import { Apoio } from "../Model/apoio";

export const ApoioRepository = AppDataSource.getRepository(Apoio);

