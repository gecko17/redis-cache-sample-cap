const cds = require("@sap/cds");

class SampleService extends cds.ApplicationService {
    async init(){
        const redisService = await cds.connect.to("redis-cache-sample-redis");
        const {Sample} = this.entities;
        
        this.on("READ", Sample, async req => {
            if (req.params) {
                console.log(req.params);
                const key = req.params[0];
                const val = await redisService.send("getByKey", {key})
                return req.reply({
                    "ID": key,
                    "Name": val
                })
            }
        })

        this.on("CREATE", Sample, async req => {
            if (req.data) {
                console.log(req.data);
                const key = req.data.key;
                const val = req.data.value;
                await redisService.send("setByKey", {key, val})
                return req.reply({
                    "ID": key,
                    "Name": val
                })
            }
        })
    }
}

module.exports = SampleService