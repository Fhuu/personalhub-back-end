const corsConfig = (app) => {
    const origins = [
        'https://fhuu.github.io',
        'http://fhuu.github.io',
        'http://localhost:3001',
        'http://localhost:3000'
    ];
    const cors = require("cors");
    app.use(cors({
        origin : origins,
        optionsSuccessStatus : 200
    }));

}
module.exports = corsConfig;