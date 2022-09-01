import Joi from "joi";

class MovieModel {
  public id: number;
  public name: string;
  public year: number;

  public constructor(movie: MovieModel) {
    // Copy Constructor
    this.id = movie.id;
    this.name = movie.name;
    this.year = movie.year;
  }

  // Create schema for POST:
  private static schemaPost = Joi.object({
    id: Joi.forbidden(),
    name: Joi.string().required().min(2).max(100),
    year: Joi.number()
      .required()
      .integer()
      .min(1950)
      .max(new Date().getFullYear() + 1),
  });

  // Validate post request:
  public validatePost(): string {
    // Validate current object:
    const result = MovieModel.schemaPost.validate(this, { abortEarly: false });

    // Return error message if validate failed or undefined if validate succeeds:
    return result.error?.message;
  }

  // Create schema for PUT:
  private static schemaPut = Joi.object({
    id: Joi.forbidden(),
    name: Joi.string().required().min(2).max(100),
    year: Joi.number()
      .required()
      .integer()
      .min(1950)
      .max(new Date().getFullYear() + 1),
  });

  // Validate put request:
  public validatePut(): string {
    // Validate current object:
    const result = MovieModel.schemaPut.validate(this);

    // Return error message if validate failed or undefined if validate succeeds:
    return result.error?.message;
  }
}

export default MovieModel;
