import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";
import cors from "cors";
import { MainApi } from "./routes";
import { DbMongo } from "./config/MongoDbConn";

//Passport for user session
import passport from 'passport';
const health = require('@cloudnative/health-connect');
let healthcheck = new health.HealthChecker();

//AppConstants contain mongoDB login details
import * as constants from "./utills/AppConstants";

const PORT = process.env.PORT || 5000;

//Initialize system
function initApplication(): express.Application {
    new DbMongo().connect(constants.host, constants.database, constants.user, constants.pass, constants.port);
    const app = express();
    app.use(express.json());
    app.use(morgan("tiny"));
    app.use(express.static("public"));

    //Use Swagger UI on /swagger
    app.use("/swagger", swaggerUi.serve, swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
        }
    }));
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(passport.initialize());
    app.use(passport.session());

    //MainApi from routes/index. Contains all APIS
    app.use(MainApi);

    //Custom Error Handler
    app.use(
        (err: any, req: Request, res: Response, next: NextFunction) => {
            res.locals.message = err.message;
            const status = err.status || 500;
            res.locals.status = status;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            res.status(status).json({
                error: {
                    status: err.status,
                    message: err.message,
                    type: err.type
                }
            });
        }
    );
    app.use('/health', health.LivenessEndpoint(healthcheck))
    app.use('/ready', health.ReadinessEndpoint(healthcheck));
    return app;
}
function start() {
    const app = initApplication();

    app.listen(process.env.PORT || PORT, () => {
        console.log(`Server started on PORT:` + PORT);
        console.log(`Documentation at: localhost:${PORT}/swagger`);
    });
}
// Start the application
start();