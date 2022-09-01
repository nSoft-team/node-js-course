import fastifyCors from "@fastify/cors";
import ErrorModel from "../models/error-model";
import config from "../utils/config";

export default async function routes(fastify) {

    if(config.isDevelopment){
        fastify.register(fastifyCors, { origin: true })
    }

    fastify.get('/', async function (request, reply){
        try{
            
        }catch (err: any){
            throw err;
        }

        reply.send();
    })

    fastify.get('*', async function (request, reply){
        const error = new ErrorModel(404, 'Route not found.');
        reply.send(error);
    })
}