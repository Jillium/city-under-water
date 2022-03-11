import express, { Request, Response } from "express";
import { ObjectId } from 'mongodb';
import { collections } from "../services/database.service";
import Invoice from "../models/invoice";

export const invoiceRouter = express.Router();

invoiceRouter.use(express.json());

// get
invoiceRouter.get("/", async (_req: Request, res: Response) => {
    try {
       const invoices = (await collections.invoices.find({}).toArray()) as unknown as Invoice[];

        res.status(200).send(invoices);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// get by ID
invoiceRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        
        const query = { _id: new ObjectId(id) };
        const invoice = (await collections.invoices.findOne(query)) as unknown as Invoice;

        if (invoice) {
            res.status(200).send(invoice);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

// post
invoiceRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newInvoice = req.body as Invoice;
        const result = await collections.invoices.insertOne(newInvoice);

        result
            ? res.status(201).send(`Successfully created a new invoice with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new invoice.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

//put
invoiceRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedInvoice: Invoice = req.body as Invoice;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.invoices.updateOne(query, { $set: updatedInvoice });

        result
            ? res.status(200).send(`Successfully updated invoice with id ${id}`)
            : res.status(304).send(`invoice with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

//delete
invoiceRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.invoices.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed invoice with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove invoice with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Invoice with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});