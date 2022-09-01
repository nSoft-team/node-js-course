import fastifyCors from "@fastify/cors";
import logic from "../logic/logic";
import config from "../utils/config";
import ErrorModel from "../models/error-model";
import MovieModel from "../models/movie-model";

export default async function controllers(fastify) {
  if (config.isDevelopment) {
    fastify.register(fastifyCors, { origin: true });
  }

  const paramsSchema = {
    params: {
      cinemaId: { type: "integer" },
    },
  };

  const optsPost = {
    schema: {
      body: {
        type: "object",
      },
      response: {
        201: {
          data: {
            type: "object",
          },
        },
      },
    },
  };

  // https://www.fastify.io/docs/latest/Reference/Routes/#full-declaration

  fastify.get(
    "/cinemas",
    {
      response: {
        200: {
          type: "object",
          properties: {
            data: {
              type: "array",
            },
          },
        },
      },
    },
    async function (request, reply) {
      try {
        const cinemas = await logic.getAllCinemas();
        // reply.send({ data: cinemas });
        return { data: cinemas };
      } catch (err: any) {
        throw err;
      }
    }
  );

  fastify.get(
    "/movies-per-cinema/:cinemaId",
    {
      schema: {
        params: {
          cinemaId: { type: "number" },
        },
      },
    },
    async function (request, reply) {
      try {
        const cinemaId = +request.params.cinemaId;
        const movies = await logic.getMoviesByCinema(cinemaId);
        reply.send({ data: movies });
      } catch (err: any) {
        throw err;
      }
    }
  );

  fastify.post("/movies", optsPost, async function (request, reply) {
    try {
      const movie = new MovieModel(request.body);
      const addedMovie = await logic.addMovie(movie);
      reply.send(addedMovie);
    } catch (err: any) {
      throw err;
    }
  });

  fastify.delete("/movies/:movieId", async function (request, reply) {
    try {
      const movieId = +request.params.movieId;
      await logic.deleteMovie(movieId);
      reply.status(204);
    } catch (err: any) {
      throw err;
    }
  });

  fastify.get("*", async function (request, reply) {
    const error = new ErrorModel(404, "Route not found.");
    reply.send(error);
  });
}
