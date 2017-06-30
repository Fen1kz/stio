'use strict';
import * as express from 'express';
import jwt from 'jsonwebtoken';

export class ApiRouter {
  constructor() {
    this.router = express.Router();


    this.router.post('/login', (req, res) => {
      const {login} = req.body;
      const tokenData = {
        login
      };
      const token = jwt.sign(tokenData, process.env.JWT_SECRET);
      res.json(Object.assign({}, tokenData, {token}));
    });

    this.router.get('/*', this.getRoot);

    this.router.get('/405', (req, res) => {
      res.sendStatus(500);
    });
  }

  getRoot(req, res) {
    res.set('etag', new Date().toTimeString());
    res.json({success: 49});
  }
}