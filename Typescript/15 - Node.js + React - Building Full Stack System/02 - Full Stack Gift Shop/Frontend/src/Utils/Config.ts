class Config {}

class DevelopmentConfig extends Config {
  public targetsUrl = "http://localhost:3001/api/targets/";
  public giftsByTargetUrl = "http://localhost:3001/api/gifts-by-target/";
  public giftsUrl = "http://localhost:3001/api/gifts/";
}

class ProductionConfig extends Config {
  public targetsUrl = "http://localhost:3001/api/targets/";
  public giftsByTargetUrl = "http://localhost:3001/api/gifts-by-target/";
  public giftsUrl = "http://localhost:3001/api/gifts/";
}

const config =
  process.env.NODE_ENV === "development"
    ? new DevelopmentConfig()
    : new ProductionConfig();

export default config;
