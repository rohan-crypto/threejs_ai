import express from 'express';
import * as dotenv from 'dotenv'
import {Configuration, OpenAIApi} from 'openai';
// migrating from openai version 4.2.1 to version 3.2.1 
//because it was not allowing to use environment variable as well as it was
//not supporting createImage function of openai

dotenv.config();
const router = express.Router();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

router.route('/').get((req,res) => {
    res.status(200).json({message: "Hello from Developer Routes"})
})

router.route('/').post(async (req,res) => {
    try {
        const {prompt} = req.body;

        // this createImage function creates image based on prompt
        const response = await openai.createImage({
            prompt,
            n: 1,//num of img generated
            size: '1024x1024',
            response_format: 'b64_json'//format in which we want our image
        })

        //to get image from response
        const image = response.data.data[0].b64_json;

        res.status(200).json({photo: image});
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong"})
    }
})

export default router;