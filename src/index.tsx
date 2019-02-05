import * as fs from 'fs-extra';
import * as _ from 'lodash';
import * as path from 'path';
import { execTsByPath, updateDeps } from './utils';

async function main() {
  const projectRootPath = process.cwd();
  const packageJsonPath = path.join(projectRootPath, 'package.json');
  const priConfigOldPath = path.join(projectRootPath, 'pri.config.ts');
  const priConfigNewPath = path.join(projectRootPath, 'priconfig.json');

  if (!fs.existsSync(packageJsonPath)) {
    throw Error(`current project hasn't package.json`);
  }

  if (fs.existsSync(priConfigOldPath)) {
    let projectOldConfig: any = execTsByPath(priConfigOldPath) || {};

    if (typeof projectOldConfig === 'function') {
      projectOldConfig = projectOldConfig(true);
    }

    fs.writeFileSync(priConfigNewPath, JSON.stringify(projectOldConfig, null, 2) + '\n');
    fs.removeSync(priConfigOldPath);
  }

  const packageJson = fs.readJSONSync(packageJsonPath);

  if (_.has(packageJson, 'dependencies')) {
    const dependencies = _.get(packageJson, 'dependencies', {});
    updateDeps(dependencies);
    _.set(packageJson, 'dependencies', dependencies);
  }

  if (_.has(packageJson, 'devDependencies')) {
    const devDependencies = _.get(packageJson, 'devDependencies', {});
    updateDeps(devDependencies);
    _.set(packageJson, 'devDependencies', devDependencies);
  }

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
}

main();
