import express, {Request, Response} from "express";
import * as customerModel from "../models/customer";
import {Customer} from "../interface/customer";

const CustomerRouter = express.Router();

CustomerRouter.get("/", async (req: Request, res: Response) => {
  customerModel.findAll((err: Error, Customers: Customer[]) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }

    res.status(200).json({"data": Customers});
  });
});

CustomerRouter.post("/", async (req: Request, res: Response) => {
  const newCustomer: Customer = req.body;
  customerModel.create(newCustomer, (err: Error) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }

    res.status(200).json({"customer": newCustomer});
  });
});

CustomerRouter.get("/:id", async (req: Request, res: Response) => {
  const CustomerId: number = Number(req.params.id);
  customerModel.findOne(CustomerId, (err: Error, Customer: Customer) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"data": Customer});
  })
});

CustomerRouter.put("/:id", async (req: Request, res: Response) => {
  const Customer: Customer = req.body;
  const CustomerId: Number = Number(req.params.id);
  customerModel.update(Customer, CustomerId, (err: Error) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }

    res.status(200).send({"message": "updated"});
  })
});

CustomerRouter.delete("/:id", async (req: Request, res: Response) => {
  const id: Number = Number(req.params.id);
  customerModel.destroy(id, (err: Error) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }

    res.status(200).send({"message": "Deleted success!"});
  })
});

export {CustomerRouter};