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
const config = process.env.NODE_ENV === `development` ? dev : prod;

module.exports = config;
