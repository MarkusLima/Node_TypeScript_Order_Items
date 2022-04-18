import express, { Request, Response } from "express";
import * as ProductModel from "../models/product";
import { Product } from "../interface/products";

const ProductRouter = express.Router();

ProductRouter.get("/", async (req: Request, res: Response) => {
  ProductModel.findAll((err: Error, Products: Product[]) => {
    if (err) {
      return res.status(500).json({ "errorMessage": err.message });
    }

    res.status(200).json({ "data": Products });
  });
});

ProductRouter.post("/", async (req: Request, res: Response) => {
  const newProduct: Product = req.body;
  ProductModel.create(newProduct, (err: Error) => {
    if (err) {
      return res.status(500).json({ "message": err.message });
    }

    res.status(200).json({ "Product": newProduct });
  });
});

ProductRouter.get("/:id", async (req: Request, res: Response) => {
  try {

    const ProductId: number = Number(req.params.id);
    ProductModel.findOne(ProductId, (err: Error, Product: Product) => {
      if (err) {
        return res.status(500).json({ "message": err.message });
      }
      res.status(200).json({ "data": Product });
    })

  } catch (error) {
    console.log(error);
  }

});

ProductRouter.put("/:id", async (req: Request, res: Response) => {
  const Product: Product = req.body;
  const ProductId: Number = Number(req.params.id);
  ProductModel.update(Product, ProductId, (err: Error) => {
    if (err) {
      return res.status(500).json({ "message": err.message });
    }

    res.status(200).send({ "message": "updated" });
  })
});

ProductRouter.delete("/:id", async (req: Request, res: Response) => {

  const CustomerId: Number = Number(req.params.id);
  ProductModel.destroy(CustomerId, (err: Error) => {
    if (err) {
      return res.status(500).json({ "message": err.message });
    }

    res.status(200).send({ "message": "Deleted success!" });
  })
});

export { ProductRouter };