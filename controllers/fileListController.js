import { fetchFileList } from '../services/filesService.js'; 

export const getFileList = async (req, res) => {
    try {
        const fileList = await fetchFileList();
        res.status(200).json(fileList);
    } catch (error) {
        console.error("Error fetching file list:", error);
        res.status(500).json({ error: 'An error occurred while fetching the file list.' });
    }
};
