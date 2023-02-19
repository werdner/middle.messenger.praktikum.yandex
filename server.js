const express = require('express');
const app = express();
const history = require('connect-history-api-fallback');
const PORT = process.env.PORT ?? 3000;

app.use(history())
app.use(express.static('./dist/'));

app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}/ `);
});
