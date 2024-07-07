const bcrypt = require('bcrypt')

export default async function hashPassword(value){
    const salt = await bcrypt.genSalt(10)

    return await bcrypt.hash(value,salt)
}