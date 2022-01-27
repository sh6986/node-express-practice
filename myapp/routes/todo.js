const express = require('express');
const router = express.Router();
const {Todo} = require('../models');
const {isNotLoggedIn, isLoggedIn} = require('./middlewares');

// 리스트 조회
router.get('/:userEmail', isLoggedIn, async (req, res, next) => {
    try {
        const result = await Todo.findAll({
            where: {
                user_email: req.params.user_email
            }
        });
        res.json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// todo항목 추가 (생성)
router.post('/', isLoggedIn, async (req, res, next) => {
    try {
        const todo = await Todo.create({
            content: req.body.content,
            user_email: req.body.user_email
        });
        console.log(todo);
        res.status(201).json(todo);
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