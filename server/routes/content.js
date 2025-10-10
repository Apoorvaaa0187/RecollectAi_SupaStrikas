import express from 'express';
import verifyJWT from '../middleware/authMiddleware.js';
import search from '../utils/search.js';

const router = express.Router();

router.get('/search', verifyJWT, async (req, res) => {
    const searchText = req.body.search;
    const results = search(searchText);
    res.status(200).json({
        result: results
    })
});

router.get('/tags', verifyJWT, async (req, res) => {
    const searchText = req.body.emotion;
    const results = search(searchText);
    res.status(200).json({
        result: results
    })
});

router.get('/emotion', verifyJWT, async (req, res) => {
    const searchText = req.body.emotion;
    const results = search(searchText);
    res.status(200).json({
        result: results
    })
});

export default router;