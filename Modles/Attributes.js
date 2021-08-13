const AttributeModel = attributeObject => {
  const newAttributeObject = attributeObject;

  delete newAttributeObject.option_id;
  delete newAttributeObject.option_name;

  return newAttributeObject;
};

const AttributeOptionModel = data => {
  const options = [];
  if (!data[0].option_id) return AttributeModel({ ...data[0], options:[] });
  data.map(item =>
    options.push({
      option_name: item.option_name,
      option_id: item.option_id,
    })
  );
  // console.log(options);

  return AttributeModel({ ...data[0], options: options });
};

module.exports = { AttributeOptionModel };
