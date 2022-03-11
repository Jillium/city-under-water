var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
export const collections = {};
export function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        dotenv.config();
        const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
        yield client.connect();
        const db = client.db(process.env.DB_NAME);
        const invoicesCollection = db.collection(process.env.COLLECTION_NAME);
        collections.invoices = invoicesCollection;
        console.log(`Successfully connected to database: ${db.databaseName} and collection: ${invoicesCollection.collectionName}`);
    });
}
//# sourceMappingURL=database.service.js.map