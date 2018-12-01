'use strict';
const express = require('express');
const customerApi = express.Router();

module.exports = (knex) => {

  customerApi.get('/all', (req, res) => {
    knex('customers')
      .then((customers) => {
        return res.status(200).send({
          customers
        });
      });
  });

  customerApi.get('/:id', (req, res) => {
    let customer_id = req.params.id;

    if (!customer_id) {
      return res.status(400).send({
        message: 'Missing customer ID'
      });
    };

    knex('customers')
      .where('customers.id', customer_id)
      .then((customers) => {
        return res.status(200).send({
          customers
        });
      });
  });

  customerApi.post('/new', (req, res) => {
    let formData = req.body;
     for (const key of Object.keys(formData)) {
       let key = formData[key];
    }
    
    knex('customers')
        .returning('id')
        .insert({
          name,
          address1,
          address2,
          city,
          province,
          zip,
          country,
          phone,
          email
        })
        .then((customer_id) => {
            return res.status(200).send({
                customer_id,
                message: 'Successfully added new customer',
            });
        })
        .catch((e) => {
          console.log(JSON.stringify(e))
            return res.status(500).send({
                message: e
              });
        });
  });

  return customerApi;

}