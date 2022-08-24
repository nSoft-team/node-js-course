# Config

- Node.js doesn't come with any built-in config files.
We can create one config.json file containing all config data,
- We can create one config.json file containing development and production config data,
- We can create `config-dev.json` and `config-prod.json` files containing suitable config data. They can also import a `baseConfig.json` for shared config data.
- The config file can be loaded into global.config object which can be accessed from anywhere.
