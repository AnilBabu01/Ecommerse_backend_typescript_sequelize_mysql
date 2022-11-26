import { RequestHandler } from "express";
import { Product } from "../models/prodcut";
import { Productimage } from "../models/productimages";
import { Review } from "../models/review";
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

////http://localhost:8080/api/admin/product/create
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
