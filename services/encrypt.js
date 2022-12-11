const crypto = require('crypto')
//  const crypto = require('crypto').createHash("md5").update("nikhil123").digest("hex") 
// var hash = cryptojs.createHash("md5").update("example").digest("hex");

const algorithm = 'aes-256-ctr'
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3'

module.exports= {
    encrypt : async(text) => {
        const iv = crypto.randomBytes(16)
      
        const cipher = crypto.createCipheriv(algorithm, secretKey, iv)
      
        const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
      
        return {
          iv: iv.toString('hex'),
          content: encrypted.toString('hex')
        }
      },
      
      decrypt : async(hash) => {
        const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'))
      
        const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()])
      
        return decrpyted.toString()
      }
      
}


