const { server } = require('./src/websocket');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const port = process.env.PORT;

server.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
