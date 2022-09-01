import { UploadedFile } from "express-fileupload";
import Joi from "joi";

class MovieModel {
  public id: number;
  public name: string;
  public year: number;
  public image: UploadedFile; // The file itself. File we're saving in a folder.
  public imageName: string; // The file name only. Name we're saving in the database.

  public constructor(movie: MovieModel) {
    // Copy Constructor
    this.id = movie.id;
    this.name = movie.name;
    this.year = movie.year;
    this.image = movie.image;
    this.imageName = movie.imageName;
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
    image: Joi.object().optional(),
    imageName: Joi.string().optional(),
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
    image: Joi.object().optional(),
    imageName: Joi.string().optional(),
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
