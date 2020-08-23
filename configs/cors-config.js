const corsConfig = (app, origins) => {
    
    const cors = require("cors");
    const corsSetting = cors({
        origin : origins,
        optionsSuccessStatus : 200,
        credentials : true,
        allowedHeaders : [
            "Origin",
            "X-Requested-With",
            "Content-Type",
            "Authorization"
        ],
        methods : [
            "GET",
            "POST",
            "DELETE",
            "PUT"
        ]
    });

    app.use(corsSetting);

    // app.use((req,res,next) => {
    //     res.header('Access-Control-Allow-Credentials', true);
    //     res.header('Access-Control-Allow-Origin', origins[3]);
    //     res.header('Access-Control-Allow-Methods', 'GET, POST');
    //     res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    //     next();
    // });

}
module.exports = corsConfig;