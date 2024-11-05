const { fetchFileList, fetchFileData } = require('../services/filesService');

const getFilesData = async (req, res) => {
    try {
        const { fileName } = req.query;
        
        if (fileName) {
         
            const fileContent = await fetchFileData(fileName);
            if (fileContent) {
                const formattedData = processFileData(fileContent);
                return res.json([{ file: fileName, lines: formattedData }]);
            } else {
                return res.status(404).json({ error: `File ${fileName} not found` });
            }
        }

        const fileList = await fetchFileList();
        const filesData = await Promise.all(
            fileList.map(async (name) => {
                const content = await fetchFileData(name);
                return content ? { file: name, lines: processFileData(content) } : null;
            })
        );
        res.json(filesData.filter(Boolean));
    } catch (error) {
        console.error("Error in getFilesData:", error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getFilesData };
