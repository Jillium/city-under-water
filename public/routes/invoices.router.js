var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import { ObjectId } from 'mongodb';
import { collections } from "../services/database.service";
export const invoiceRouter = express.Router();
invoiceRouter.use(express.json());
// get
invoiceRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invoices = (yield collections.invoices.find({}).toArray());
        res.status(200).send(invoices);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// get by ID
invoiceRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const query = { _id: new ObjectId(id) };
        const invoice = (yield collections.invoices.findOne(query));
        if (invoice) {
            res.status(200).send(invoice);
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
}));
// post
invoiceRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newInvoice = req.body;
        const result = yield collections.invoices.insertOne(newInvoice);
        result
            ? res.status(201).send(`Successfully created a new invoice with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new invoice.");
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}));
//put
invoiceRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id;
    try {
        const updatedInvoice = req.body;
        const query = { _id: new ObjectId(id) };
        const result = yield collections.invoices.updateOne(query, { $set: updatedInvoice });
        result
            ? res.status(200).send(`Successfully updated invoice with id ${id}`)
            : res.status(304).send(`invoice with id: ${id} not updated`);
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
}));
//delete
invoiceRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const id = (_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.id;
    try {
        const query = { _id: new ObjectId(id) };
        const result = yield collections.invoices.deleteOne(query);
        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed invoice with id ${id}`);
        }
        else if (!result) {
            res.status(400).send(`Failed to remove invoice with id ${id}`);
        }
        else if (!result.deletedCount) {
            res.status(404).send(`Invoice with id ${id} does not exist`);
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
}));
//# sourceMappingURL=invoices.router.js.map