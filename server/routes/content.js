import express from 'express';
import verifyJWT from '../middleware/authMiddleware.js';
import search from '../utils/search.js';
import Content from '../models/content.js'

const router = express.Router();

router.post("/search", verifyJWT, async (req, res) => {
  try {
    const searchText = req.body.search;
    const username = req.user.username;
    const results = await search(searchText, username);
    let cleanedString = results.slice(7, -3);
    const contentString = JSON.parse(cleanedString);
    const searchResults = await Content.find({
        user: username,
        url: { $in: contentString.related_urls },
    })
    res.status(200).json({ result: searchResults });
  } catch (err) {
    console.error("Search route error:", err);
    res.status(500).json({ message: "Server error" });
  }
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