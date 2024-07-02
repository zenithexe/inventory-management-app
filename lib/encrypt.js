const bcrypt = require('bcrypt')

export async function hashPassword(value){
    const salt = await bcrypt.genSalt(10)

    return await bcrypt.hash(value,salt)
}