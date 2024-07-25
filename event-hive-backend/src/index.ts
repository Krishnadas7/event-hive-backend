// server.ts
import { app } from './infrastructureLayer/config/app';
import dbConnection from './infrastructureLayer/config/db';
import initSocketServer from './infrastructureLayer/config/socketIoServer';
import http from 'http';
import { Req, Res } from './infrastructureLayer/types/expressTypes';
import {redisClient} from './infrastructureLayer/config/redis' 

// redisClient.get('companyData')
const PORT = process.env.PORT || 3003; // Ensure the port is correctly set here
const server = http.createServer(app);

// Initialize the Socket.io server
initSocketServer(server);

const start = () => {
    app.get('/', (req: Req, res: Res) => {
        res.send('Project started');
    });

    server.listen(PORT, async () => {
        console.log(`Service connected on http://localhost:${PORT}`);
        dbConnection();
    });
}

start();
