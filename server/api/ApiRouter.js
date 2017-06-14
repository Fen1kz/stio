'use strict';
import * as express from 'express';

export class ApiRouter {
  static test = 'hehe';

  constructor() {
    this.router = express.Router();
    this.router.get('/*', this.getRoot);

    this.router.get('/404', (req, res) => {
      res.sendStatus(500);
    });
  }

  getRoot(req, res) {
    res.set('etag', new Date().toTimeString());
    res.json({success: 49});
  }
}