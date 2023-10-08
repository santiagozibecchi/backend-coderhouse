import { writeFile } from 'node:fs/promises';


export const saveToFileSystem = async (path, data) => {

    const content = JSON.stringify(data, null, "\t");

    try {

        await writeFile(path, content, "utf-8");

    } catch (error) {
        throw new Error(`El archivo ${path} no tiene un formato valido`);
    };
};