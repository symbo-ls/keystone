import esbuild, { BuildOptions } from 'esbuild';
import { KeystoneConfig } from '../../types';
import { getBuiltConfigPath } from '../../scripts/utils';
import { initConfig } from './initConfig';

export function getEsbuildConfig(cwd: string): BuildOptions {
  return {
    entryPoints: ['./keystone'],
    absWorkingDir: cwd,
    bundle: true,
    outfile: '.keystone/config.js',
    format: 'cjs',
    plugins: [
      {
        name: 'external-node_modules',
        setup(build) {
          build.onResolve({ filter: /(?:^[^.][^/])|(?:^[^.][^.][^/])|(?:^.{0,2}$)/ }, args => {
            return { external: true, path: args.path };
          });
        },
      },
    ],
  };
}

export function loadBuiltConfig(cwd: string): KeystoneConfig {
  return initConfig(require(getBuiltConfigPath(cwd)).default);
}

export async function loadConfigOnce(cwd: string): Promise<KeystoneConfig> {
  await esbuild.build(getEsbuildConfig(cwd));
  return loadBuiltConfig(cwd);
}
