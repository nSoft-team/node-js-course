class Config {}

class DevelopmentConfig extends Config {}

class ProductionConfig extends Config {}

const config =
  process.env.NODE_ENV === "development"
    ? new DevelopmentConfig()
    : new ProductionConfig();

export default config;
