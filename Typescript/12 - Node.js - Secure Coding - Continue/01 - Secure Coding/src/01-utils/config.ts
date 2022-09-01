class Config {}

class DevelopmentConfig extends Config {
  public isDevelopment = true;
  public mysql = {
    host: "localhost",
    user: "root",
    password: "",
    database: "Northwind",
  };
}

class ProductionConfig extends Config {
  public isDevelopment = false;
  public mysql = {
    host: "eu-cdbr-west-02.cleardb.net",
    user: "bf522cc5beaebf",
    password: "e1bf371e",
    database: "heroku_a1c0029d93e3e8c",
  };
}

const config =
  process.env.NODE_ENV === "production"
    ? new ProductionConfig()
    : new DevelopmentConfig();

export default config;
