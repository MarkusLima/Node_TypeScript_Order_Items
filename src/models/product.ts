//file models/Product.ts

import { BasicProduct, Product } from "../interface/products";
import { db } from "../config/db";
import { OkPacket, RowDataPacket } from "mysql2";

export const create = (product: Product, callback: Function) => {
    const queryString = "INSERT INTO Product (name, description, instock_quantity, price) VALUES (?, ?, ?, ?)";

    db.query(
        queryString,
        [product.name, product.description, product.instockQuantity, product.price],
        (err, result) => {
            if (err) { callback(err) };

            const insertId = (<OkPacket>result).insertId;
            callback(null, insertId);
        }
    );
};

export const findOne = (ProductId: number, callback: Function) => {

    const queryString = `SELECT * FROM product WHERE id = ?`;
    db.query(queryString, ProductId, (err, result) => {
        if (err) { callback(err) }

        const row = (<RowDataPacket>result)[0];
        const product: Product = {
            id: row.id,
            name: row.name,
            description: row.description,
            instockQuantity: row.instock_quantity,
            price: row.price
        }
        callback(null, product);
    })

};

export const findAll = (callback: Function) => {
    const queryString = `SELECT * FROM product`;

    db.query(queryString, (err, result) => {
        if (err) { callback(err) }

        const rows = <RowDataPacket[]>result;
        const products: Product[] = [];

        rows.forEach(row => {
            const customer: Product = {
                id: row.product_id,
                name: row.name,
                description: row.description,
                instockQuantity: row.instock_quantity,
                price: row.price
            }
            products.push(customer);
        });
        callback(null, products);
    });

}

export const update = (product: Product, id: Number, callback: Function) => {
    const queryString = `UPDATE product SET name=?, description=?, instock_quantity =?, price=? WHERE id=?`;

    db.query(
        queryString,
        [product.name, product.description, product.instockQuantity, product.price, id],
        (err, result) => {
            if (err) { callback(err) }
            callback(null);
        }
    );
}

export const destroy = (id: Number, callback: Function) => {
    const queryString = `DELETE FROM product WHERE id = ?;`;

    db.query(
        queryString,
        [id],
        (err, result) => {
            if (err) { callback(err) }
            callback(null);
        }
    );
}