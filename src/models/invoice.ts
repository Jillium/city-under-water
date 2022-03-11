import { ObjectId } from "mongodb";

export default class Invoice {
    constructor(public to: string, public service: string, public amount: number, public id?: ObjectId) {}
}