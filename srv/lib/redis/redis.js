const createClient = require("redis").createClient;
const cds = require("@sap/cds");

class RedisService extends cds.Service {
    async init() {
        
        const credentials = this.options.credentials;
        const client = createClient({
            url: credentials.uri
        });
        client.on('error', err => console.log('Redis Client Error', err));

        await client.connect();

        this.on("setByKey", req => {
            console.log("Redis set by key: "+req.data.key)
            return client.set(req.data.key, req.data.value);
        })

        this.on("getByKey", req => {
            console.log("Redis get by key: "+req.data.key)
            return client.get(req.data.key);
        })

        await super.init();
    }
}

module.exports = RedisService;