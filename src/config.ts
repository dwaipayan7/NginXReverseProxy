import fs from 'fs';
import {parse} from 'yaml';
import {rootConfigSchema} from './config-schema';


export async function parseYamlConfig(filepath: string){

    const configFileContent = fs.readFileSync(filepath, 'utf8');

    const configParse = parse(configFileContent);

    return JSON.stringify(configParse);

}

export async function validateConfig(config: string){

    const validatedConfig = await rootConfigSchema.parseAsync(JSON.parse(config));

    return validatedConfig;
    
}