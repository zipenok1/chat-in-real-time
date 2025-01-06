const {trimStr} = require('./fun')

let users = []

const findUser = (user)=>{
    console.log('user', user);
    
    const userName = trimStr(user.name);
    const userRoom = trimStr(user.room);
    return users.find((u) => trimStr(u.name) === userName && trimStr(u.room) === userRoom);
}

const addUser = (user)=>{
    const isEx = findUser(user);

    !isEx && users.push(user);

    const curUser = isEx || user;

    return { isEx: !!isEx, user: curUser}
}

module.exports = {addUser, findUser}