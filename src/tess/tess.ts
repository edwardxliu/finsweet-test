import './styles/style.css';
import './features/popupVideoControl';

import { init, observe_animate } from './features/airConditioner.js';

init();
observe_animate();

// const mysql = require('mysql');

// const con = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '123456',
// });

// console.log(mysql, con);
// con.connect(function (err) {
//   if (err) throw err;
//   console.log('Connected!');
// });
