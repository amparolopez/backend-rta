import axios from 'axios';

const API_URL = 'https://echo-serv.tbxnet.com/v1/secret';
const API_KEY = 'Bearer aSuperSecretKey';

export const fetchFileList = async () => {
    try {
        const response = await axios.get(`${API_URL}/files`, {
            headers: { authorization: API_KEY }
        });
        return response.data.files;
    } catch (error) {
        console.error(`Error fetching file list: ${error.message}`);
        return [];
    }
};

export const fetchFileData = async (fileName) => {
    try {
        const response = await axios.get(`${API_URL}/file/${fileName}`, {
            headers: { authorization: API_KEY }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching data for file ${fileName}: ${error.message}`);
        return null;
    }
};

export const processFileData = (fileData) => {
    const lines = fileData.trim().split('\n').slice(1);
    return lines.reduce((acc, line) => {
        const [file, text, number, hex] = line.split(',');
        if (file && text && number && hex) {
            acc.push({ text, number: parseInt(number, 10), hex });
        }
        return acc;
    }, []);
};

export const fetchAndFormatFiles = async () => {
    console.log("Fetching files...");
    const fileList = await fetchFileList();
    console.log("File list here:", fileList);

    const filesData = await Promise.all(
        fileList.map(async (fileName) => {
            const fileContent = await fetchFileData(fileName);
            if (fileContent) {
                const formattedData = processFileData(fileContent);
                return { file: fileName, lines: formattedData };
            }
            console.warn(`Skipping file ${fileName} due to fetch error.`);
            return null;
        })
    );

    console.log("Files data formatted:", filesData);
    return filesData.filter(Boolean);
};
