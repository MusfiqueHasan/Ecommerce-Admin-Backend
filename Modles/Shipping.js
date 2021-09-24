const ShippingClassModel = item => {
  return {
    shipping_class_id: item.shipping_class_id,
    shipping_class_name: item.shipping_class_name,
    shipping_type: item.shipping_type,
    shipping_zone: JSON.parse(item.shipping_zone),
    shipping_rate: item.shipping_rate,
  };
};

const ProductShippingClassModel = item => {
  return {
    shipping_id: item.id,
    shipping_class_id: item.shipping_class_id,
    shipping_class_name: item.shipping_class_name,
  };
};

module.exports = { ShippingClassModel, ProductShippingClassModel };
