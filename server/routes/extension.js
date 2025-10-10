import express from 'express';
import Content from '../models/content.js';
import generate from '../utils/generateSummary.js'
import verifyJWT from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/content', verifyJWT, async (req, res) => {
    const { title, url} = req.body;
    console.log(req.user.username);
    const response = await generate(title,url);
    let cleanedString = response.slice(7, -3);
    const contentString = JSON.parse(cleanedString);
    const contentData =  {
        user: req.user.username,
        title: title,
        url: url,
        summary: contentString.summary,
        tags: contentString.tags,
        emotions: contentString.emotions
    }
    const data = await Content.insertMany(contentData);
    res.status(200).json({
        message: "Successful",
        data: data
    })
});

router.get('/all', verifyJWT, async (req,res) => {
    const data = await Content.find({user: req.user.username})
    res.json({
        user: req.user.username,
        data: data
    })
})

export default router;