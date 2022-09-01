class Config {}

class DevelopmentConfig extends Config {
  public isDevelopment = true;
  public connectionString = "mongodb://localhost:27017/northwind";
}

class ProductionConfig extends Config {
  public isDevelopment = false;
  public connectionString = "mongodb://localhost:27017/northwind";
  // public connectionString = "mongodb://user:password@localhost:27017/northwind";
}

const config =
  process.env.NODE_ENV === "production"
    ? new ProductionConfig()
    : new DevelopmentConfig();

export default config;
