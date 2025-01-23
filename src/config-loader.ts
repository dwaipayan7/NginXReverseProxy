import fs from 'fs';
import { parse } from 'yaml';
import { rootConfigSchema } from './config-schema';

export async function parseYamlConfig(filepath: string) {
  try {
    const configFileContent = fs.readFileSync(filepath, 'utf8');
    const parsedConfig = parse(configFileContent);
    return parsedConfig;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Failed to parse YAML file at ${filepath}: ${err.message}`);
    } else {
      throw new Error(`Failed to parse YAML file at ${filepath}: ${String(err)}`);
    }
  }
}

export async function validateConfig(config: object) {
  try {
    const validatedConfig = await rootConfigSchema.parseAsync(config);
    return validatedConfig;
  } catch (err) {
    if (err instanceof Error && 'errors' in err) {
      throw new Error(`Validation failed: ${err.errors}`);
    } else {
      throw new Error('Validation failed with an unknown error');
    }
  }
}
