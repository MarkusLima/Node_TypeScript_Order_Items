import { BasicCustomer, Customer } from "../interface/customer";
import { db } from "../config/db";
import { OkPacket, RowDataPacket } from "mysql2";

export const create = (customer: Customer, callback: Function) => {
    const queryString = "INSERT INTO Customer (name, password, email) VALUES (?, ?, ?)";
    db.query(
        queryString,
        [customer.name, customer.password, customer.email],
        (err, result) => {
            if (err) { callback(err) };

            const insertId = (<OkPacket>result).insertId;
            callback(null, insertId);
        }
    );
};

export const findOne = (CustomerId: number, callback: Function) => {

    const queryString = `SELECT * FROM customer WHERE id = ?`;
    db.query(queryString, CustomerId, (err, result) => {
        if (err) { callback(err) }

        const row = (<RowDataPacket>result)[0];
        const customer: Customer = {
            id: row.id,
            name: row.name,
            email: row.email
        }
        callback(null, customer);
    })
};

export const findAll = (callback: Function) => {
    const queryString = `SELECT * FROM customer`
    db.query(queryString, (err, result) => {
        if (err) { callback(err) }

        const rows = <RowDataPacket[]>result;
        const Customers: Customer[] = [];

        rows.forEach(row => {
            const customer: Customer = {
                id: row.customer_id,
                name: row.name,
                email: row.email
            }
            Customers.push(customer);
        });
        callback(null, Customers);
    });

}

export const update = (customer: Customer, id: Number, callback: Function) => {
    const queryString = `UPDATE customer SET name=?, email=?, password=? WHERE id=?`;
    db.query(
        queryString,
        [customer.name, customer.email, customer.password, id],
        (err, result) => {
            if (err) { callback(err) };

            const insertId = (<OkPacket>result).insertId;
            callback(null, insertId);
        }
    );
}

export const destroy = (id: Number, callback: Function) => {
    const queryString = `DELETE FROM customer WHERE id = ?;`;
    db.query(
        queryString,
        [id],
        (err, result) => {
            if (err) { callback(err) };
            
            const insertId = (<OkPacket>result).insertId;
            callback(null, insertId);
        }
    );
}