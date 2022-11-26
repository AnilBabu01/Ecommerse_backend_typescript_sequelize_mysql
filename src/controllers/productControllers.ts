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

//http://localhost:8080/api/admin/product/create
export const getproduct: RequestHandler = async (req, res, next) => {
  try {
    const products = await Product.findAll({
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
//http://localhost:8080/api/admin/product/create

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

      console.log(images[0].dataValues.url);
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
