import express from "express";
import { connectToDatabase } from "./services/database.service";
import { invoiceRouter } from "./routes/invoices.router";

const app = express();
const PORT = 7002;

connectToDatabase()
    .then(() => {
        app.use("/invoices", invoiceRouter);

        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });