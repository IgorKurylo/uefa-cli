"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const chalk_1 = __importDefault(require("chalk"));
const api_service_1 = __importDefault(require("../network/api_service"));
const console_table_printer_1 = require("console-table-printer");
exports.command = 'group <group_name>';
exports.desc = 'show group standing (groups naming A,B,C,D,E,F,H)';
const builder = (yargs) => yargs.positional('name', { type: 'string', demandOption: true });
exports.builder = builder;
const handler = (argv) => {
    const { group_name } = argv;
    const groupName = chalk_1.default.red(`Group ${group_name} standing`);
    const table = new console_table_printer_1.Table({
        columns: [
            {
                name: 'team',
                alignment: 'left',
            },
        ],
    });
    api_service_1.default.groups(group_name)
        .then((response) => {
        console.info(groupName);
        const result = response.data.data.table;
        result.forEach((element) => {
            table.addRow({
                rank: element.rank,
                team: element.name,
                points: element.points,
                matches: element.matches,
                drawn: element.drawn,
                goals: element.goals_scored,
                won: element.won,
                lost: element.lost,
            }, { color: 'green' });
        });
        table.printTable();
    })
        .catch((e) => {
        console.error(e);
    });
};
exports.handler = handler;
