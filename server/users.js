const {trimStr} = require('./fun')

let users = []

const addUser = (user)=>{
    const userName = trimStr(user.name);
    const userRoom = trimStr(user.room);
    const isEx = users.find((u) => trimStr(u.name) === userName && trimStr(u.room) === userRoom);
    !isEx && users.push(user)

    const curUser = isEx || user;

    return { isEx: !!isEx, user: curUser}
}

module.exports = {addUser}