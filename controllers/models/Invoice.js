const { Schema, model} = require('mongoose');

// creates schema for invoice
const InvoiceSchema = new Schema({
    invoiceTo: {
        type: String,
        required: "Who the invoice is going to is required",
        trim: true
    },
    invoiceFor: {
        type: String,
        required: "What the invoice is for is required",
        trim: true
    },
    invoiceAmount: {
        type: Number,
        required: "Invoice amount is required",
        trim: true
    }
},
{
    toJSON: {
        virtuals: true
    }
});

const Invoice = model('Invoice', InvoiceSchema);

module.exports = Invoice;