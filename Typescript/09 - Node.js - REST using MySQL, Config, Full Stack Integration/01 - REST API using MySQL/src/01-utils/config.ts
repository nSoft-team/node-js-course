class Config {}

class DevelopmentConfig extends Config {
  public mysql = {
    host: "localhost",
    user: "root",
    password: "",
    database: "Northwind",
  };
}

class ProductionConfig extends Config {
  public mysql = {
    host: "localhost",
    user: "root",
    password: "",
    database: "Northwind",
  };
}

const config =
  process.env.NODE_ENV === "production"
    ? new ProductionConfig()
    : new DevelopmentConfig();

export default config;
