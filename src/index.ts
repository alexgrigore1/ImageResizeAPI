import express from 'express';
import {PORT} from './config/constants';
import {imageRouter, reportRouter} from './routes';
import {LocalImageCacheService} from "./services/Image/LocalImageCacheService";

const app = express();
app.use(express.json());

app.use('/image', imageRouter);
app.use('/report', reportRouter);
app.get('/favicon.ico', (req, res) => res.sendStatus(204));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

LocalImageCacheService.init();