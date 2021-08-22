const redis= require('redis')

const client = redis.createClient({
    port:6379,
    host:"127.0.0.1"
})

client.on('connect',()=>[
    console.log("client connect to redis...")

])

client.on('ready',()=>{
    console.log('clinet connect to redis and ready to go')

})

client.on('error',(err)=>{
    console.log(err.message)
})

client.on('end',()=>[
    console.log('client disconneccted from server')
])

// stop  redis when press ctrl+c np
process.on('SIGINT',()=>[
    client.quit()
])

module.exports= client