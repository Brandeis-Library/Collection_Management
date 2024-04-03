const prod = {
    url: {
        API_URL: process.env.SERVER_IP
    }
};
const dev = {
    url: {
        API_URL: `http://localhost`
    }

};

console.log("process.env.SERVER_IP inside config.js", process.env.SERVER_IP);
export const config = process.env.NODE_ENV === `development` ? dev : prod;