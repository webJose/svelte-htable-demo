import wjConfig, { type ICoreConfig } from "wj-config";
import mainConfig from './config.json';
import { type Config } from './config';

const config = await wjConfig()
    .addObject(mainConfig as ICoreConfig)
    .createUrlFunctions("sourceCode")
    .build();

export default config as Config;
