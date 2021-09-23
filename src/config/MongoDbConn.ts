import { connect, connection } from 'mongoose';
export class DbMongo {
    constructor() {
    }
    //Connect to MongoDb
    connect(host: string, dbName: string, user?: string, pass?: string, port?: number) {
        let connectionuri = `mongodb://${host}:${port}/${dbName}`;
        if (user != undefined && pass != undefined) {
            connectionuri = `mongodb+srv://${user}:${pass}@${host}/${dbName}?retryWrites=true&w=majority`
        }
        connect(connectionuri, (err: any) => {
            if (err) {
                console.log(err);
                console.log('DataBase Connection Falied');
            } else {
                console.log('connected with database');
            }
        });
    }
}
export const MonStatConnection = connection.readyState;