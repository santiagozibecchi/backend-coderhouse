

const validateProductTypes = (fields) => {

    const productTypes = {
        title: typeof fields.title === "string",
        description: typeof fields.description === "string", 
        code: typeof fields.code === "string", 
        price: typeof fields.price === "number", 
        stock: typeof fields.stock === "number", 
        category: typeof fields.category === "string", 
        thumbnails: Array.isArray(fields.thumbnails), 
    };

    for (const field in productTypes) {
        if (!productTypes[field]){
            return false;
        };
    };

    return true;
};

const validateCartTypes = () => {

};

export const validateTypes = (fields, type) => {

    const Product = "product";
    const Cart = "cart";

    const validateMap = {
        [Product]: validateProductTypes(fields),
        [Cart]: validateCartTypes(fields),
    }

    return validateMap[type];
};

// fields => type object
export const validateRequireFields = (fields) => {
        
    const fieldsToValidate = Object.keys(fields);

    for (const field of fieldsToValidate) {
        if (!field) {
            return false;
        }; 
    };

    return true;
};

export const setTextsCorrectly = (texts) => {

    const referenceTextToFormat = Object.entries(texts);
    const cleanText = {};

    for (const [key, value] of referenceTextToFormat) {
        const firstClean = value.trim().split(" ");

        let scapeText = "";

        for (let i = 0; i < firstClean.length; i++) {
            const word = firstClean[i];

            if (word === "") {
                continue;
            } else {
                scapeText += word + " "; 
            };
        };
        cleanText[key] = scapeText.trim();
    };

    return cleanText;
};

