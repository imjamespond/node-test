const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
// const dbPromise = sqlite.open('./database.sqlite', { Promise });


// app.get('/post/:id', async (req, res, next) => {
//     try {
//         const db = await dbPromise;
//         const [post, categories] = await Promise.all([
//             db.get('SELECT * FROM Post WHERE id = ?', req.params.id),
//             db.all('SELECT * FROM Category')
//         ]);
//         res.render('post', { post, categories });
//     } catch (err) {
//         next(err);
//     }
// });

app.listen(port);