const Product = require('../models/product');

exports.getAddProduct = async (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  try {
    const product = new Product({
      title: title,
      price: price,
      description: description,
      imageUrl: imageUrl,
      userId: req.user._id
    });

    await product.save();
    console.log('Created Product');
    res.redirect('/admin/products');
  } catch (err) {
    console.error(err);
  }
};


exports.getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }

  try {
    const prodId = req.params.productId;
    const product = await Product.findById(prodId);

    if (!product) {
      return res.redirect('/');
    }

    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  } catch (err) {
    console.error(err);
  }
};


exports.postEditProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  try {
    const product = await Product.findById(prodId);

    product.title = updatedTitle;
    product.price = updatedPrice;
    product.description = updatedDesc;
    product.imageUrl = updatedImageUrl;

    await product.save();
    console.log('Updated Product', product._id);
    res.redirect('/admin/products');
  } catch (err) {
    console.error(err);
  }

};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
    // .select('title price -_id')
    // .populate('userId', 'name');
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });


  } catch (error) {
    console.log(error);
  }
};

exports.postDeleteProduct = async (req, res, next) => {

  try {
    const prodId = req.body.productId;
    await Product.deleteOne({ _id: prodId });
    console.log('DESTROYED PRODUCT');
    res.redirect('/admin/products');
  } catch (error) {
    console.log(error);
  }



};
