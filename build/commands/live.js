"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const chalk_1 = __importDefault(require("chalk"));
const api_service_1 = __importDefault(require("../network/api_service"));
const mapper_1 = require("../utils/mapper");
const today = new Date().toDateString();
const supported_leagues = Object.keys(mapper_1.COUNTRY_COMPTETION_CODE_MAP).join(',');
exports.command = 'live <country_name>';
exports.desc = `show live scores by country name, ex: ${supported_leagues}`;
const builder = (yargs) => yargs.positional('name', { type: 'string', demandOption: true });
exports.builder = builder;
const handler = (argv) => {
    const { country_name } = argv;
    const competitionId = mapper_1.COUNTRY_COMPTETION_CODE_MAP[country_name];
    console.log(competitionId);
    api_service_1.default.live(competitionId).then((response) => {
        const result = response.data.data.match;
        if (result.length > 0) {
            console.info(chalk_1.default.green(`Live score ${today}`));
        }
        else {
            console.info(chalk_1.default.red(`No result found  live score ${today}`));
        }
    });
};
exports.handler = handler;
