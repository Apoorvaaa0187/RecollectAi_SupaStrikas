import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt';
import Users from '../models/users.js'

const router = express.Router();
router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/signup', async (req, res) => {
  const data = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }
  const existingMail = await Users.findOne({ email: data.email });
  if (existingMail) {
    res.json({
        status: "exists"
    });
  }
  else
  {
    const saltRounds=10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    data.password = hashedPassword;
    const userdata = await Users.insertMany(data);
    res.json({
        status: "ok"
    });
  }
});

router.post('/login', async (req, res) => {
  const check = await Users.findOne({ email: req.body.email });
  if(!check)
  {
    res.json({
        status: "not found"
    });
  }
  const isMatch = await bcrypt.compare(req.body.password, check.password);
  if(isMatch)
  {
    res.json({
        status: "ok"
    });
  }
  else
  {
    res.json({
        status: "not found"
    });
  }
});

export default router;