'use strict';
import * as express from 'express';

export class ApiRouter {
  static test = 'hehe';

  constructor() {
    console.log('Router constructor', this.getRoot.toString());
    this.router = express.Router();
    this.router.get('/*', this.getRoot);

    this.router.get('/404', (req, res) => {
      res.sendStatus(500);
    });
  }

  getRoot(req, res) {
    res.set('etag', new Date().toTimeString());
    console.log('working');
    res.json({success: 27});
  }
}


var replaceMap = {
  'а': () => ['a', '4']
  ,'б': () => ['б', 'b']
  ,'в': () => ['в', '8']
  ,'г': () => ['г', 'g']
  ,'д': () => ['д', 'd']
  ,'е': () => ['е', '3']
  ,'ё': () => ['ё', '3']
  ,'ж': () => ['ж', 'zh', '>|<']
  ,'з': () => ['з', '3', 'z']
  ,'и': () => ['и']
  ,'к': () => ['к', 'k', '|<']
  ,'л': () => ['л', 'l', '1']
  ,'м': () => ['м', 'm']
  ,'н': () => ['н']
  ,'о': () => ['о', '0']
  ,'п': () => ['п', 'n']
  ,'р': () => ['р', 'r']
  ,'с': () => ['с', 's']
  ,'т': () => ['т', 't']
  ,'у': () => ['у', 'u']
  ,'ф': () => ['ф', 'f']
  ,'х': () => ['х', '><']
  ,'ц': () => ['ц']
  ,'ч': () => ['ч', 'ch', '4']
  ,'ш': () => ['ш', 'iii']
  ,'щ': () => ['щ', 'iij']
  ,'ь': () => ['ь', 'b']
  ,'ы': () => ['ы', 'bl']
  ,'ъ': () => ['ъ']
  ,'э': () => ['э', '3']
  ,'ю': () => ['ю', '|-0']
  ,'я': () => ['я', 'ya', 'ja']
};