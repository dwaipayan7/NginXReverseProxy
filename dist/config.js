"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseYamlConfig = parseYamlConfig;
exports.validateConfig = validateConfig;
const fs_1 = __importDefault(require("fs"));
const yaml_1 = require("yaml");
const config_schema_1 = require("./config-schema");
function parseYamlConfig(filepath) {
    return __awaiter(this, void 0, void 0, function* () {
        const configFileContent = fs_1.default.readFileSync(filepath, 'utf8');
        const configParse = (0, yaml_1.parse)(configFileContent);
        return JSON.stringify(configParse);
    });
}
function validateConfig(config) {
    return __awaiter(this, void 0, void 0, function* () {
        const validatedConfig = yield config_schema_1.rootConfigSchema.parseAsync(JSON.parse(config));
        return validatedConfig;
    });
}
