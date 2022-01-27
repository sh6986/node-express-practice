const express = require('express');
const router = express.Router();
const {Todo} = require('../models');
const {isNotLoggedIn, isLoggedIn} = require('./middlewares');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

// 리스트 조회
router.get('/list/:user_id', isLoggedIn, async (req, res, next) => {
    try {
        const result = await Todo.findAll({
            where: {
                user_id: req.params.user_id
            }
        });
        res.json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성');
    fs.mkdirSync('uploads');
}

// todo추가 화면
router.get('/create', (req, res) => {
    res.send(`
        <form action="/todo/create_process" method="post" enctype="multipart/form-data">
            내용:<input type="text" name="id">
            <input type="file" name="img" accept="image/*">
<!--            <img src="">-->
            <button type="submit">추가</button>
        </form>
    `);
});

const upload = multer({
    storage: multer.diskStorage({
        destination(req, res, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: {fileSize: 5 * 1024 * 1024},
});

// todo항목 추가 (생성)
router.post('/create_process', isLoggedIn, upload.single('img'), async (req, res, next) => {
    try {
        const todo = await Todo.create({
            content: req.body.content,
            img: req.file.filename,
            user_id: req.user.id
        });
        res.redirect('/');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// todo내용 수정
router.put('/', isLoggedIn, async (req, res, next) => {
    const today = new Date();
    try {
        const todo = await Todo.update({
            content: req.body.content,
            udt_date: today
        }, {
            where: {id: req.body.id}
        });
        console.log(todo);
        res.status(201).json(todo);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// todo항목 삭제
router.delete('/', isLoggedIn, async(req, res, next) => {
    try {
        const todo = await Todo.destroy({
            where: {id: req.body.id}
        });
        console.log(todo);
        res.status(201).json(todo);
    } catch (err) {
        console.error(err);
        next(err);
    }
});


module.exports = router;