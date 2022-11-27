import { RequestHandler } from "express";
import { Product } from "../models/prodcut";
import { Productimage } from "../models/productimages";
import { Review } from "../models/review";
import fs from "fs";
//http://localhost:8080/api/admin/product/create
export const createproduct: RequestHandler = async (req, res, next) => {
  try {
    const { name, price, description, category, seller, stock } = req.body;

    const files = req.files;

    const product = await Product.create({
      name: name,
      price: price,
      description: description,
      category: category,
      seller: seller,
      stock: stock,
    });

    if (product) {
      if (files) {
        const url = req.protocol + "://" + req.get("host");
        for (let i = 0; i < files.length; i++) {
          await Productimage.create({
            url: url + "/images/" + files[i].filename,
            productid: product.productid,
          });
        }
      }
    }

    const images = await Productimage.findAll({
      where: { productid: product.productid },
    });

    res.status(200).json({
      status: true,
      images: images,
      msg: "Product added successfully",
      product: product,
    });
  } catch (error) {
    next(error);
  }
};

//http://localhost:8080/api/admin/product/getproducts
export const getproduct: RequestHandler = async (req, res, next) => {
  try {
    console.log(typeof req.query.category);
    let products: any;
    if (req.query.category) {
      products = await Product.findAll({
        attributes: [
          "productid",
          "name",
          "price",
          "description",
          "ratings",
          "category",
          "seller",
          "stock",
          "numOfReviews",
        ],
        where: { category: req.query.category },
        include: [
          { model: Productimage, attributes: ["imageid", "url"] },
          { model: Review },
        ],
      });
    } else {
      products = await Product.findAll({
        attributes: [
          "productid",
          "name",
          "price",
          "description",
          "ratings",
          "category",
          "seller",
          "stock",
          "numOfReviews",
        ],
        include: [
          { model: Productimage, attributes: ["imageid", "url"] },
          { model: Review },
        ],
      });
    }

    res.status(200).json({
      status: true,
      productsCount: products.length,
      products: products,
      msg: "Product added successfully",
    });
  } catch (error) {
    next(error);
  }
};
//http://localhost:8080/api/admin/product/delete/12

export const deleteproduct: RequestHandler = async (req, res, next) => {
  try {
    let product = await Product.findOne({
      where: { Productid: req.params.id },
      include: [{ model: Productimage, attributes: ["imageid", "url"] }],
    });
    if (!product) {
      return res.status(404).json({ status: false, msg: "Product not fund" });
    }

    if (product) {
      const images = await Productimage.findAll({
        attributes: ["url"],
        where: { productid: product.productid },
      });

      for (var i = 0; i < images.length; i++) {
        console.log(images[i].dataValues.url);
        var str = images[i].dataValues.url.substring(22);
        fs.unlinkSync(str);
      }
    }
    await Product.destroy({
      where: {
        productid: req.params.id,
      },
    });

    res.status(201).json({
      status: true,
      msg: "Product deleted Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

//http://localhost:8080/api/product/getSingleProduct/13
export const getSingleProduct: RequestHandler = async (req, res, next) => {
  try {
    let product = await Product.findOne({
      attributes: [
        "productid",
        "name",
        "price",
        "description",
        "ratings",
        "category",
        "seller",
        "stock",
        "numOfReviews",
      ],
      where: { Productid: req.params.id },
      include: [
        { model: Productimage, attributes: ["imageid", "url"] },
        { model: Review },
      ],
    });
    if (!product) {
      return res.status(404).json({ status: false, msg: "Product not fund" });
    } else {
      res.status(201).json({
        status: true,
        product,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//http://localhost:8080/api/admin/product/13

export const updateProduct: RequestHandler = async (req, res, next) => {
  try {
    let id = req.params.id;
    let product: any;
    const files = req.files;
    console.log(files);
    product = await Product.findOne({
      attributes: ["productid"],
      where: { Productid: req.params.id },
      include: [
        { model: Productimage, attributes: ["imageid", "url"] },
        { model: Review },
      ],
    });

    if (!product) {
      return res.status(404).json({
        status: false,
        msg: "not found",
      });
    }
    let updatedproduct: any;
    if (product) {
      updatedproduct = await Product.update(req.body, {
        where: { productid: id },
      });
      product = await Product.findOne({
        where: { Productid: req.params.id },
        include: [
          { model: Productimage, attributes: ["imageid", "url"] },
          { model: Review },
        ],
      });

      const images = await Productimage.findAll({
        attributes: ["url", "imageid"],
        where: { productid: product.productid },
      });

      for (var i = 0; i < images.length; i++) {
        console.log(images[i].dataValues.url);
        var str = images[i].dataValues.url.substring(22);
        fs.unlinkSync(str);

        await Productimage.destroy({
          where: {
            imageid: images[i].dataValues.imageid,
          },
        });
      }

      if (files) {
        const url = req.protocol + "://" + req.get("host");
        for (let i = 0; i < files.length; i++) {
          await Productimage.create({
            url: url + "/images/" + files[i].filename,
            productid: product.productid,
          });
        }
      }
    }

    res.status(200).json({
      success: true,
      updatedproduct,
      product: product,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createProductReview: RequestHandler = async (req, res, next) => {
  try {
    const { rating, comment, productId } = req.body;
    let product: any;
    let review: any;
    product = await Product.findOne({
      where: { Productid: productId },
    });

    if (product) {
      if (req.user) {
        let isReviewed: any;
        if (req.user) {
          isReviewed = await Review.findOne({
            where: { userid: req.user.userid },
          });
        }
        if (isReviewed) {
          if (isReviewed.userid === req.user.userid) {
            await Review.update(req.body, {
              where: { where: { userid: req.user.userid } },
            });

            console.log(isReviewed);
          }
        } else {
          review = await Review.create({
            userid: req.user.userid,
            name: req.user.name,
            rating: Number(rating),
            comment: comment,
            productid: productId,
          });

          product = await Product.findOne({
            attributes: [
              "productid",
              "name",
              "price",
              "description",
              "ratings",
              "category",
              "seller",
              "stock",
              "numOfReviews",
            ],
            where: { Productid: productId },
            include: [
              { model: Productimage, attributes: ["imageid", "url"] },
              { model: Review },
            ],
          });
        }
      }
    }

    // product.ratings =
    //   product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    //   product.reviews.length;

    // await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      product: product,
      msg: "Rating added Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
