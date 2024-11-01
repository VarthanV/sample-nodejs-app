// app.js
const express = require('express');
const todoRoutes = require('./routes/todo');

const app = express();
app.use(express.json());
app.use('/todos', todoRoutes);

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
