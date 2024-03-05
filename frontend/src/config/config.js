const prod = {
    url: {
        API_URL: `https://3.142.44.149`
    }
};
const dev = {
    url: {
        API_URL: `http://localhost`
    }
};
export const config = process.env.NODE_ENV === `development` ? dev : prod;
