require('./todo-backend12/node_modules/dotenv').config();



const server = require('./todo-backend12/api/server')

const port = process.env.PORT;


server.listen(port, () => console.log(`\n ** Listening on Port ${port}! ** \ `))