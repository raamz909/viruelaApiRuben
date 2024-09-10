import 'dotenv/config'
import * as env from 'env-var'
console.log(process.env.PORT)

export const envs = {
    PORT: env.get("PORT").required().asPortNumber(),
    MONGO_URL: env.get("MONGO_URL").required().asString(),
    MONGO_URL_DOCKER: env.get("MONGO_URL_DOCKER").required().asString(),
    MAILER_ACCESS_TOKEN: env.get("MAILER_ACCESS_TOKEN").required().asString(),
    MAILER_SERVICE: env.get("MAILER_SERVICE").required().asString(),
    MAILER_EMAIL: env.get("MAILER_EMAIL").required().asString(),
    MAPBOX_ACCESS_TOKEN: env.get("MAPBOX_ACCESS_TOKEN").required().asString()
    



}