import express from 'express';
import cors from 'cors';
import getFilesData from './controllers/filesController.js';
import { getFileList } from './controllers/fileListController.js';

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/files/data', getFilesData);
app.get('/files/list', getFileList);


app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
});

console.log(`Running on Node.js version: ${process.version}`);

export default app;
