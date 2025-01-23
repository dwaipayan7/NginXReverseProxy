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
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const config_loader_1 = require("./config-loader");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        commander_1.program
            .option('--config <path>', 'Path to the configuration file')
            .parse();
        const options = commander_1.program.opts();
        if (!options.config) {
            console.error('Error: --config option is required.');
            process.exit(1);
        }
        try {
            const parsedConfig = yield (0, config_loader_1.parseYamlConfig)(options.config);
            const validatedConfig = yield (0, config_loader_1.validateConfig)(parsedConfig);
            console.log('Validated Configuration:', JSON.stringify(validatedConfig, null, 2));
        }
        catch (err) {
            if (err instanceof Error) {
                console.error(`Error: ${err.message}`);
            }
            else {
                console.error('Error: An unknown error occurred.');
            }
            process.exit(1);
        }
    });
}
main();
