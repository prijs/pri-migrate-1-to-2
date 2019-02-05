import * as fs from 'fs-extra';
import * as ts from 'typescript';

export function execTsByPath(filePath: string) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath).toString();
  const jsTransferContent = ts.transpile(fileContent);

  try {
    // tslint:disable-next-line:no-eval
    return eval(jsTransferContent);
  } catch (error) {
    throw Error(`Parse file ${error.toString()} in ${filePath}`);
  }
}

export function updateDeps(deps: any) {
  Object.keys(deps).forEach((depName: string) => {
    switch (depName) {
      case 'pri':
        deps[depName] = '~2.0.17';
        break;
      case '@ali/pri-plugin-dt':
        deps[depName] = '~3.0.2';
        break;
      case '@ali/pri-plugin-card':
        deps[depName] = '~3.0.0';
        break;
      case 'pri-plugin-dob':
        deps[depName] = '~2.0.4';
        break;
      case '@ali/pri-plugin-track':
        deps[depName] = '~3.0.1';
        break;
      case '@ali/pri-plugin-sycm-dev':
        deps[depName] = '~2.0.0';
        break;
      case '@ali/pri-plugin-op-ebase':
        deps[depName] = '~2.0.0';
        break;
      case '@ali/pri-plugin-publish':
        deps[depName] = '~4.0.2';
        break;
      case 'pri-plugin-rematch':
        deps[depName] = '~2.0.0';
        break;
      case '@ali/pri-plugin-spm':
        deps[depName] = '~2.0.1';
        break;
      case '@ali/pri-plugin-locale':
        deps[depName] = '~2.0.1';
        break;
      case '@ali/pri-plugin-clue':
        deps[depName] = '~2.0.5';
        break;
      case '@ali/pri-plugin-color':
        deps[depName] = '~2.0.1';
        break;
      case '@ali/pri-plugin-fbi':
        deps[depName] = '~1.0.5';
        break;
      default:
    }
  });
}
