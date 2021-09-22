const EmailModel = email => {
  return {
    template_id: email.email_template_id,
    emails: JSON.parse(email.emails),
    template_name:email.template_name
  };
};

module.exports = { EmailModel };
