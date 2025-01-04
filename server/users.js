const triStr = require('./fun')

let users = []

const addUser = (user)=>{
    const userName = triStr(user.name);
    const userRoom = triStr(user.room);
    const isEx = users.find((u) => triStr(u.name) === userName && triStr(u.room) === userRoom);
    !isEx && users.push(user)

    const curUser = isEx || user;

    return { isEx: !!isEx, user: curUser}
}

module.exports = {addUser}