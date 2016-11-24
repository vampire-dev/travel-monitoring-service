"use strict";
const env = require('./env.json');
const node_env = process.env.NODE_ENV || 'development';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (key) => {
    return env[node_env][key];
};
//# sourceMappingURL=Setting.js.map