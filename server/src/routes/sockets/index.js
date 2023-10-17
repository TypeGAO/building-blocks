"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerSocketConnection = exports.hostSocketConnection = void 0;
var host_1 = require("./host");
Object.defineProperty(exports, "hostSocketConnection", { enumerable: true, get: function () { return __importDefault(host_1).default; } });
var player_1 = require("./player");
Object.defineProperty(exports, "playerSocketConnection", { enumerable: true, get: function () { return __importDefault(player_1).default; } });
