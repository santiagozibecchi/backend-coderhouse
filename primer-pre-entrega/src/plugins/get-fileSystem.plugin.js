import { readFile, access } from 'node:fs/promises';


export const getAllFromFileSystem = async (path) => {

    try {
        // Para verificar si un archivo o directorio existe o si tienes permiso para acceder a él.
        await access(path);

    } catch (error) {
        console.log(`No tiene acceso o la ruta ${error.path} es incorrecta.`);
        return [];
    };
    
    try {

        const content =  await readFile(path);

        return JSON.parse(content);

    } catch (error) {
        throw new Error(`El archivo ${path} no tiene un formato valido`);
    };
};