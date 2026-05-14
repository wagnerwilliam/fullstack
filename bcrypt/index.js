import bcrypt from "bcrypt";

let hash = await bcrypt.hash("*order66", 10);

// william_97
// william54321

// obi_wan
// *order66

console.log(hash);

let passwordIsvalid = await bcrypt.compare("william54321", hash)

console.log(hash);
