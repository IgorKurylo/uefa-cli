"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const chalk_1 = __importDefault(require("chalk"));
const groups_1 = __importDefault(require("../network/groups"));
const groupsTable = new Array();
exports.command = 'group <group_name>';
exports.desc = 'show group standing';
const builder = (yargs) => yargs.positional('name', { type: 'string', demandOption: true });
exports.builder = builder;
const handler = (argv) => {
    const { group_name } = argv;
    const groupName = chalk_1.default.red(`Group Name ${group_name}`);
    groups_1.default.get(group_name)
        .then((response) => {
        console.info(groupName);
        const result = response.data.data.table;
        result.forEach((element) => {
            groupsTable.push({
                team: element.name,
                drawn: element.drawn,
                rank: element.rank,
                goals: element.goals_scored,
                lost: element.lost,
                won: element.won,
                matches: element.matches,
                points: element.points,
            });
        });
        console.table(groupsTable);
    })
        .catch((e) => {
        console.error(e);
    });
};
exports.handler = handler;
