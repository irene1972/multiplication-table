import { yarg } from '../config/plugins/args.plugin';
import { ServerApp } from './presentation/server-app';
//const {yarg} = require('../config/plugins/args.plugin')

//console.log(process.argv);
//
(async()=>{
    await main();
})()

async function main(){
    console.log(yarg);
    const {b:base,l:limit,s:showTable,n:fileName,d:fileDestination}=yarg;
    ServerApp.run({base,limit,showTable,fileName,fileDestination});
}