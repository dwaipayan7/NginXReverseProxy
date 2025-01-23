import { program } from 'commander';
import { parseYamlConfig, validateConfig } from './config-loader';

async function main() {
  program
    .option('--config <path>', 'Path to the configuration file')
    .parse();

  const options = program.opts();
  if (!options.config) {
    console.error('Error: --config option is required.');
    process.exit(1);
  }

  try {
    const parsedConfig = await parseYamlConfig(options.config);
    const validatedConfig = await validateConfig(parsedConfig);
    console.log('Validated Configuration:', JSON.stringify(validatedConfig, null, 2));
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error: ${err.message}`);
    } else {
      console.error('Error: An unknown error occurred.');
    }
    process.exit(1);
  }
}

main();
