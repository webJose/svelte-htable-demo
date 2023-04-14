export interface Config {
  sourceCode: SourceCode;
}
export interface SourceCode {
  host: string;
  scheme: string;
  rootPath: string;
  demos: Demos;
}
export interface Demos {
  rootPath: string;
  demo: string;
}
