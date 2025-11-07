"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApoioRepository = void 0;
// src/repositories/ApoioRepository.ts
// src/repositories/ApoioRepository.ts
const data_source_1 = require("../data-source");
const apoio_1 = require("../Model/apoio");
exports.ApoioRepository = data_source_1.AppDataSource.getRepository(apoio_1.Apoio);
