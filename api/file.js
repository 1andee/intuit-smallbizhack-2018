'use strict';
const express = require('express');
const fileApi = express.Router();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = new aws.S3();

module.exports = (knex) => {

    aws.config.update({
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        accessKeyId: process.env.AWS_SECRET_ACCESS_KEY_ID,
        region: process.env.AWS_REGION
    });

    const upload = multer({
        storage: multerS3({
            s3: s3,
            acl: 'public-read',
            bucket: 'smallbizhack2018',
            metadata: function (req, file, cb) {
                cb(null, { fieldName: file.fieldname });
            },
            key: function (req, file, cb) {
                cb(null, `${Date.now().toString()}${file.originalname}`)
            }
        })
    });

    fileApi.post('/upload', upload.single('file'), (req, res) => {
        knex('loginattempt')
            .returning('id')
            .insert({
                video_path: req.file.location,
            })
            .then((report_id) => {
                return res.status(200).send({
                    report_id,
                    message: 'Upload successful',
                });
            })
            .catch((e) => {
                console.log(JSON.stringify(e))
                return res.status(500).send({
                    message: e
                });
            });
    });

    return fileApi;

}