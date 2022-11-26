import { RequestHandler } from "express";
import { Product } from "../models/prodcut";
import { Productimage } from "../models/productimages";
import { Review } from "../models/review";
export const createproduct: RequestHandler = async (req, res, next) => {
  try {
    const {
      name,
      price,
      description,
      category,
      seller,
      stock,
      image,
      url,
      productid,
    } = req.body;
    console.log(name, price, description, category, seller, stock);

    let saveimage = await Productimage.create({
      url: url,
      productid: productid,
    });
    // const product = await Product.create({
    //   name: name,
    //   price: price,
    //   description: description,
    //   category: category,
    //   seller: seller,
    //   stock: stock,
    // });
    // let saveimage: any;
    // if (product) {
    //   saveimage = await Productimage.create({
    //     url: image,
    //     productid: product.productid,
    //   });
    // }
    res.status(200).json({
      status: true,
      saveimage: saveimage,
      msg: "Product added successfully",
      // product: product,
    });
  } catch (error) {
    next(error);
  }
};
//
export const getproduct: RequestHandler = async (req, res, next) => {
  try {
    const produts = await Product.findAll({
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
      produts: produts,
      msg: "Product added successfully",
    });
  } catch (error) {
    next(error);
  }
};
