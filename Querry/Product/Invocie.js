const PromiseModule = require("../../helpers/Promise/PromiseModule");

const getInvoices = () =>{
  const sqlSearch =  `Select invoice.invoice_id,invoice.total,invoice.reference ,invoice.invoice_date, invoice_client.invoice_client_id,invoice_client.customer_name, invoice_client.customer_email,invoice_client.customer_contact from invoice_client, invoice where invoice.invoice_client_id = invoice_client.invoice_client_id`
  return PromiseModule.readData(sqlSearch)
}
const getInvoicesUsers = () => {
  const sqlSearch =
    "Select invoice_client_id,customer_name, customer_email, customer_address, customer_country, customer_contact from invoice_client";
  return PromiseModule.readData(sqlSearch);
};

const getInvoiceById = invoiceId => {
  const sqlSearch = `Select invoice.invoice_id,invoice.total,invoice.reference ,invoice_data,invoice.invoice_date, invoice_client.invoice_client_id,invoice_client.customer_name, invoice_client.customer_email,invoice_client.customer_contact,invoice_client.customer_address,invoice_client.user_id,invoice_client.customer_country from invoice_client, invoice where invoice.invoice_client_id = invoice_client.invoice_client_id And invoice.invoice_id= ${invoiceId}`;
  return PromiseModule.readData(sqlSearch);
};

const addInvoice = invoicesData => {
  const sqlInsert = `INSERT INTO invoice(invoice_data,	inserted_at,	updated_at,	invoice_client_id,	invoice_date,	reference,total) Values ?`;

  return PromiseModule.createUpdateDelete(sqlInsert, invoicesData);
};

const addInvoiceClientInfo = invoicesClientData => {
  const sqlInsert = `INSERT INTO invoice_client(customer_name, customer_email, customer_address, customer_country, customer_contact, inserted_at, updated_at) Values ?`;

  return PromiseModule.createUpdateDelete(sqlInsert, invoicesClientData);
};

const getLastInvoiceId = () => {
  const sqlSearch = `SELECT invoice_id FROM invoice ORDER BY invoice_id DESC LIMIT 1`;

  return PromiseModule.readData(sqlSearch);
};
const updateInvoiceById = (id,updatedInvoiceData) =>{
  const sqlUpdate = `UPDATE invoice
  SET invoice_data =  ?, updated_at= ?,invoice_date = ?,reference = ?,total = ?
  WHERE invoice_id = ${id}`

  return PromiseModule.createUpdateDelete(sqlUpdate,updatedInvoiceData)
}

const removeInvoiceById = (invoiceId) =>{
  const sqlDelete = `Delete From invoice where invoice_id = (?)`
  return PromiseModule.createUpdateDelete(sqlDelete,[invoiceId])
}

const Invoice = {
  getInvoicesUsers,
  addInvoice,
  getInvoiceById,
  addInvoiceClientInfo,
  getLastInvoiceId,
  getInvoices,
  removeInvoiceById,
  updateInvoiceById
};
module.exports = Invoice;
