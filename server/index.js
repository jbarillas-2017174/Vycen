'use strict'

const mongoConfig = require('./configs/mongoConfig');
const app = require('./configs/app');
const port = 3200 || process.env.PORT ;

mongoConfig.init();

app.listen(port,()=>{
    console.log(`Server start in port ${port}`);
});