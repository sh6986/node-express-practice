const express = require('express');
const router = express.Router();
const db = require('../lib/db');

router.get('/', (request, response) => {

    let html = '';

    db.query(`SELECT * FROM topic`, (error, result) => {

        result.forEach((v, i) => {
            html += v.title + ' ';
            html += v.description + ' ';
            html += v.created + ' ';
            html += v.author_id + ' <br>';
        });

        response.send(html);
    });
});

module.exports = router;