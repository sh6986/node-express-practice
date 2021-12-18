const express = require('express');
const router = express.Router();
const db = require('../lib/db');

// 리스트 조회
router.get('/', (req, res) => {
    db.query(`SELECT * FROM todo`, (err, result) => {
        console.log(result);
        res.send(result);
    });
});

// todo항목 추가 (생성)
router.post('/create', (req, res) => {
    const todo = req.body;

    db.query(`INSERT INTO todo(CONTENT, CHECK_YN, DEL_YN, REG_DATE, UDT_DATE) VALUES (?, 'N', 'N', NOW(), NOW())`, [todo.content], (err, result) => {
        console.log(result);
        res.end();
    });
});


// todo내용 수정
router.post('/modify', (req, res) => {
    const todo = req.body;

    db.query(`UPDATE todo SET CONTENT = ?, UDT_DATE = NOW() WHERE id = ?`, [todo.content, todo.id], (err, result) => {
        console.log(result);
        res.end();
    });
});


// todo항목 삭제
router.post('/remove', (req, res) => {
    const todo = req.body;

    db.query(`DELETE FROM todo WHERE id = ?`, [todo.id], (err, result) => {
        console.log(result);
        res.end();
    });
});


module.exports = router;