const PromiseModule = require("../../helpers/Promise/PromiseModule");

const EmailQuery = {
  addEmailTemplate,
  addEmails,
  getEmailTemplates,
  updateEmailTemplates,
  deleteEmailTemplates,
  getTemplatesById,
};

async function addEmailTemplate(emailTemplateData) {
  const sqlInsert = `Insert into email_address_template (template_name,emails,inserted_at,updated_at) values ?`;
  return PromiseModule.createUpdateDelete(sqlInsert, emailTemplateData);
}

async function addEmails(emails) {
  const sqlInsert = `Insert Into emails (email) values ?`;
  return PromiseModule.createUpdateDelete(sqlInsert, emails);
}

async function getEmailTemplates() {
  const sqlSearch = `Select * from email_address_template order by email_address_template.email_template_id desc`;
  return PromiseModule.readData(sqlSearch);
}

async function getTemplatesById(id) {
  const sqlSearch = `Select * from email_address_template where email_template_id = ${id}`;
  return PromiseModule.readData(sqlSearch);
}
async function updateEmailTemplates(updatedEmailTemplateData) {
  const sqlUpdate = `Update email_address_template set template_name = ?, emails=?, updated_at = ? where email_template_id = ?`;
  return PromiseModule.createUpdateDelete(sqlUpdate, updatedEmailTemplateData);
}

async function deleteEmailTemplates(id) {
  const sqlDelete = `Delete from email_address_template where email_template_id = ?`;
  return PromiseModule.createUpdateDelete(sqlDelete, id);
}
module.exports = EmailQuery;
