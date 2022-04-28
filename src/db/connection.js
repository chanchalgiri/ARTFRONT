const mongoose =  require("mongoose");
mongoose.connect("mongodb://localhost:27017/register",{
    useNewUrlParser : true,
    useUnifiedTopology:true,
}).then(() => {
    console.log("CONNECTION SUCCESSFUL");
}).catch((e) => {
    console.log("NO CONNECTION");
    console.log(e);
})
