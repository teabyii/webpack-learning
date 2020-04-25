import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { foo, log } from './foo.js';
import './index.less';

log(foo);

$(document.body).append(
  '<div class="container"><div class="box">hello webpack</div><div class="tuts"></div></>'
);
