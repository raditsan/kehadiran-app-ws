const crypto = require("crypto");
module.exports = {
  encription: (value) => {
    return crypto.createHash("sha256").update(value).digest("hex")
  }
}
