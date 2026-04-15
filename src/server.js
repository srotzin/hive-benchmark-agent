'use strict';
const express=require('express');const cors=require('cors');const app=express();const PORT=process.env.PORT||3034;
app.use(cors());app.use(express.json());app.use('/',require('./routes/health'));app.use('/',require('./routes/benchmark'));
app.get('/',(_,r)=>r.json({service:'hive-benchmark-agent',version:'1.0.0',description:'Performance benchmarking — latency testing, throughput measurement, reliability scoring',endpoints:{execute:'POST /v1/benchmark/execute',record:'GET /v1/benchmark/record/:id',stats:'GET /v1/benchmark/stats',records:'GET /v1/benchmark/records',health:'GET /health',pulse:'GET /.well-known/hive-pulse.json',ai:'GET /.well-known/ai.json'}}));
const hc=require('./services/hive-client');
app.listen(PORT,async()=>{console.log(`[hive-benchmark-agent] Listening on port ${PORT}`);try{await hc.registerWithHiveTrust()}catch(e){}try{await hc.registerWithHiveGate()}catch(e){}});
module.exports=app;
