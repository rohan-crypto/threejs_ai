//On server end, other than normal dependencies we installed,
//cloudianry to store images
//cors for cross origin requests
//dotenv for .env files 
//openai to use openAI

import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

// need to specify file extension here
import dalleRoutes from './routes/dalle.routes.js'

dotenv.config();

// setting some middleware
const app = express();
app.use(cors());
app.use(express.json({limig: "50mb"}));

// if we go to the specified path we will be redirected to dalleRoutes
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', (req,res) => {
    res.status(200).json({message: 'Hello from Developer'})
})

app.listen(8080, () => console.log('Server has started on port 8080'))
