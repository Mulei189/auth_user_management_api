import sanitizeHTML from "sanitize-html";

export const sanitizeInput = (input) => {
    if(typeof input === "string"){
        return sanitizeHTML(input, {
            allowedAttributes: {},
            allowedTags: []
        });
    }

    if(typeof input === "object" && input!== null){
        const sanitized = {};
        for(const key in input){
            sanitized[key] = sanitizeInput(input[key]);
        }
        return sanitized;
    }

    return input;
};