const app = require("./index");
const connect = require("./configs/db");

app.listen(5060, async function () {
    try{
        await connect();
        console.log("Listening on port 5060");
    }catch(err){
        console.log(err.message);
    }
});