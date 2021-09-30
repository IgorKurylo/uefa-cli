"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("./constant");
const http_client_1 = __importDefault(require("./http_client"));
class ApiService {
    groups(name) {
        return http_client_1.default.get(`/leagues/table.json?${constant_1.SECRETS}&competition_id=${constant_1.COMPTETITION_ID}&group=${name}`);
    }
    live(comptetionId) {
        return http_client_1.default.get(`scores/live.json?${constant_1.SECRETS}&competition_id=${comptetionId}`);
    }
}
exports.default = new ApiService();
