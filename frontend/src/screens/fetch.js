// const IPFS = require('ipfs');
const OrbitDB = require('orbit-db');
// const Identities = require('orbit-db-identity-provider');

const {create} = require('ipfs-http-client')

const fetch = async () => {
    const ipfs = create()

    const orbitdb = await OrbitDB.createInstance(ipfs)
const db = await orbitdb.keyvalue("/orbitdb/zdpuArNcZBygSgw21NS4jbDouWdRxXi6eaqtJ9ymaqMDWA1nL/ox21test1")
db.load()
console.log(db.get("videourl"))
}
fetch()

export default fetch


// async function main() {

// const ipfs = create()


// const orbitdb = await OrbitDB.createInstance(ipfs)
// const db = await orbitdb.keyvalue("/orbitdb/zdpuArNcZBygSgw21NS4jbDouWdRxXi6eaqtJ9ymaqMDWA1nL/ox21test1")
// db.load()
// console.log(db.get("videourl"))
		
    
// }

// main();

