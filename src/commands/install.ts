import { Command, Flags, CliUx } from '@oclif/core';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as fse from 'fs-extra';

export default class Install extends Command {
  static description = 'Replaces tailwind with chakra in a fresh installation';

  static examples = ['$ laravel-breeze-chakra install'];

  static flags = {
    force: Flags.boolean({ default: false }),
  };

  static args = [];

  private devDeps = {
    '@prettier/plugin-php': '^0.19.1',
    '@types/react': '^18.0.21',
    '@types/react-dom': '^18.0.6',
    '@types/ziggy-js': '^1.3.2',
    '@typescript-eslint/eslint-plugin': '^5.39.0',
    '@typescript-eslint/parser': '^5.39.0',
    '@vitejs/plugin-react': '^2.0.0',
    eslint: '^8.24.0',
    'eslint-config-prettier': '^8.5.0',
    'eslint-plugin-prettier': '^4.2.1',
    'eslint-plugin-react': '^7.31.8',
    'laravel-vite-plugin': '^0.6.0',
    prettier: '^2.7.1',
    react: '^18.2.0',
    'react-dom': '^18.2.0',
    typescript: '^4.8.4',
    vite: '^3.0.0',
  };

  private deps = {
    '@inertiajs/inertia': '^0.11.0',
    '@inertiajs/inertia-react': '^0.8.0',
    '@inertiajs/progress': '^0.2.6',
    '@chakra-ui/react': '^2.3.5',
    '@emotion/react': '^11.10.4',
    '@emotion/styled': '^11.10.4',
    '@heroicons/react': '^2.0.11',
    'framer-motion': '^7.5.2',
    'ziggy-js': '^1.5.0',
  };

  private oldDeps = [
    '@headlessui/react',
    '@tailwindcss/forms',
    'autoprefixer',
    'lodash',
    'postcss',
    'tailwindcss',
  ];

  private prettierConfig = {
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'all',
    printWidth: 80,
    arrowParens: 'avoid',
    htmlWhitespaceSensitivity: 'ignore',
  };

  public async run(): Promise<void> {
    const { flags } = await this.parse(Install);

    this.warn(
      'This installer assumes a FRESH install of Laravel Breeze using the Inertia + React option.',
    );

    if (!flags.force) {
      this.warn(
        'This will overwrite multiple files in this project, do you wish to continue?',
      );
      const confirm: string = await CliUx.ux.prompt('Continue? (y/n)');
      if (confirm.toLowerCase() !== 'y' && confirm.toLowerCase() !== 'yes') {
        this.log('Exiting');
        this.exit(0);
      }
    }

    if (fs.existsSync(path.join(process.cwd(), 'node_modules'))) {
      this.log('Clearing node_modules');
      fs.rmSync(path.join(process.cwd(), 'node_modules'), { recursive: true });
    }

    this.log('Removing old dependencies');
    execSync(`npm uninstall -S ${this.oldDeps.join(' ')}`);
    execSync(`npm uninstall -D ${this.oldDeps.join(' ')}`);

    this.log('Installing dev dependencies');
    execSync(`npm install -D ${this.depsForInstall(this.devDeps)}`);

    this.log('Installing dependencies');
    execSync(`npm install -S ${this.depsForInstall(this.deps)}`);

    this.log('Running install again');
    execSync('npm install');

    this.log('Replacing vite.config.js');
    fs.rmSync(path.join(process.cwd(), 'vite.config.js'));
    this.moveStub('vite.config.ts', 'vite.config.ts');

    this.log('Creating tsconfig.json');
    this.moveStub('tsconfig.json', 'tsconfig.json');

    this.log('Creating .eslintrc.js');
    this.moveStub('.eslintrc.js', '.eslintrc.js');

    this.log('Setting prettier config and scripts in package.json');
    const packageJson = JSON.parse(
      fse.readFileSync(path.join(process.cwd(), 'package.json')).toString(),
    );
    packageJson.prettier = this.prettierConfig;
    packageJson.scripts.build = 'tsc && vite build && vite build --ssr';
    packageJson.scripts.lint = 'eslint resources/js && tsc';
    fse.writeFileSync(
      path.join(process.cwd(), 'package.json'),
      JSON.stringify(packageJson, null, 2),
    );

    this.log('Replacing js folder');
    fs.rmSync(path.join(process.cwd(), 'resources', 'js'), {
      recursive: true,
    });
    this.moveStub('resources/js', 'resources/js');

    this.log('Replacing app.blade.php');
    this.moveStub(
      'resources/views/app.blade.php',
      'resources/views/app.blade.php',
    );

    this.log('Installation complete. Enjoy :)');
    this.exit(0);
  }

  private moveStub(stubPath: string, localPath: string) {
    fse.copySync(
      path.join(this.stubPath(), stubPath),
      path.join(process.cwd(), localPath),
    );
  }

  private stubPath() {
    return path.join(__dirname, '..', 'stubs');
  }

  private depsForInstall(obj: { [key: string]: string }) {
    return Object.entries(obj)
      .map(([key, value]) => `"${key}@${value}"`)
      .join(' ');
  }
}
