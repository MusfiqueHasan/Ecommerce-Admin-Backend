const express = require("express");
const routes = express.Router();
const Utils = require("../../../Utils/Utils");
const InvoiceQuery = require("../../../Querry/Product/Invocie");

routes.get("/invoices/lastId", async (req, res) => {
  try {
    const response = await InvoiceQuery.getLastInvoiceId();
    const invoice_id = response.length > 0 ? response[0].invoice_id : 0;
    const jsonObject = {
      massage: "Success",
      results: {
        invoice_id: invoice_id,
      },
    };
    res.status(200).json(jsonObject);
  } catch (error) {
    res.status(500).json({ massage: "Internal Server Error!" });
  }
});

routes.get("/invoices", async (req, res) => {
  try {
    const response = await InvoiceQuery.getInvoices();
    console.log(response);
    const jsonObject = {
      massage: "Success",
      results: [...response],
    };
    res.status(200).json(jsonObject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "Internal Server Error!" });
  }
});

routes.get("/invoices/clients", async (req, res) => {
  try {
    const response = await InvoiceQuery.getInvoicesUsers();
    const jsonObject = {
      massage: "Success",
      results: [...response],
    };
    res.status(200).json(jsonObject);
  } catch (error) {
    res.status(500).json({ massage: "Internal Server Error!" });
  }
});

routes.get("/invoices/:id", async (req, res) => {
  console.log(req.params)
  const id = req.params.id;
  try {
    const response = await InvoiceQuery.getInvoiceById(id);
    console.log(response)

    if (response.length === 0)
      return res.status(404).json({ massage: "No invoice found" });
    const jsonObject = {
      massage: "Success",
      results: {
        ...response[0],
      },
    };
    res.status(200).json(jsonObject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "Internal Server Error!" });
  }
});
routes.put("/invoices/update/:id", async (req, res) => {
  const id = req.params.id;
  const invoice_data = req.body.invoice_data;
  const reference = req.body.reference || "";
  const invoice_date = Utils.stringToTimeStamp(req.body.invoice_date);
  const updated_at = req.body.updated_at || Utils.getTimeStamp();
  const total = req.body.total;
  const invoiceData = [
    invoice_data,
    updated_at,
    invoice_date,
    reference,
    total,
  ];
  try {
    const response = await InvoiceQuery.updateInvoiceById(id, invoiceData);
    if (response.length === 0)
      return res.status(404).status({ massage: "No invoice found" });
    const jsonObject = {
      massage: "Success",
      results: {
        ...response[0],
      },
    };
    res.status(200).json(jsonObject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "Internal Server Error!" });
  }
});

routes.post("/invoice", async (req, res) => {
  const invoice_data = req.body.invoice_data;
  const reference = req.body.reference || "";
  const invoice_client_id = req.body.invoice_client_id;
  const invoice_date = Utils.stringToTimeStamp(req.body.invoice_date);
  const inserted_at = req.body.inserted_at || Utils.getTimeStamp();
  const updated_at = req.body.updated_at || Utils.getTimeStamp();
  const total = req.body.total;

  if (!invoice_client_id)
    return res.status(400).json({ massage: "Client Information is empty." });

  const invoiceData = [
    [
      invoice_data,
      inserted_at,
      updated_at,
      invoice_client_id,
      invoice_date,
      reference,
      total,
    ],
  ];

  try {
    const response = await InvoiceQuery.addInvoice([invoiceData]);
    const jsonObject = {
      massage: "Success",
      results: {
        invoice_id: response.insertId,
      },
    };
    res.status(201).json(jsonObject);
  } catch (error) {
    res.status(500).json({ massage: "Internal Server Error!" });
  }
});

routes.post("/invoices/client", async (req, res) => {
  const customer_name = req.body.customer_name;
  const customer_email = req.body.customer_email;
  const customer_address = req.body.customer_address;
  const customer_country = req.body.customer_country;
  const customer_contact = req.body.customer_contact;
  //   const invoice_data = req.body.invoice_data || [];
  //   const invoice_date = req.body.invoice_date || Utils.getTimeStamp();
  //   const due_date = req.body.due_date || Utils.getTimeStamp();
  const inserted_at = req.body.inserted_at || Utils.getTimeStamp();
  const updated_at = req.body.updated_at || Utils.getTimeStamp();

  if (!customer_name || customer_name.length === 0)
    return res.status(400).json({ massage: "Customer name is empty." });
  if (!customer_email || customer_email.length === 0)
    return res.status(400).json({ massage: "Customer email is empty." });
  if (!customer_contact || customer_contact.length === 0)
    return res.status(400).json({ massage: "Customer contact is empty." });
  if (!customer_address || customer_address.length === 0)
    return res.status(400).json({ massage: "Customer address is empty." });
  if (!customer_country || customer_country.length === 0)
    return res.status(400).json({ massage: "Customer country is empty." });
  if (!Utils.validateEmail(customer_email))
    return res.status(400).json({ massage: "Email is not valid." });

  const invoiceCustomerInfo = [
    [
      customer_name,
      customer_email,
      customer_address,
      customer_country,
      customer_contact,
      inserted_at,
      updated_at,
    ],
  ];
  try {
    const response = await InvoiceQuery.addInvoiceClientInfo([
      invoiceCustomerInfo,
    ]);

    const jsonObject = {
      massage: "Success",
      result: {
        invoice_client_id: response.insertId,
        customer_name: customer_name,
        customer_address: customer_address,
        customer_contact: customer_contact,
        customer_country: customer_country,
      },
    };

    res.status(201).json(jsonObject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "Internal Server Error!" });
  }
});

routes.delete("/invoices/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await InvoiceQuery.removeInvoiceById(id);
    const jsonObject = {
      massage: "Invoice has been removed",
    };
    if (response.affectedRows < 1) {
      return res.status(404).json({ massage: "Invoice is not found" });
    }
    res.status(200).json(jsonObject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "Internal Server Error!" });
  }
});

module.exports = routes;
