const con = require('../database');

async function findById(userId) {
    const user = await where({ id: userId });

    console.log("後であるべき", Date(Date.now()));

    if(userId === null ){
        throw new Error("User not found");
    }
    console.log('findById');
    console.log('user', user);
    return {...user}; //ここも怪しい
}


async function where(condition) {
    const select = `select * from users where id='${condition.id}';`;

    try {
        return await con.query(select, function(err, results){
            if(err)throw err;
            
            if (results.length === 0) {
                console.log('sqlの結果ないよ');
                  return null;
                }
                console.log('動作してる');
                console.log(results[0]);
                console.log("先であるべき",Date(Date.now()));
                // console.log("とれれば問題ないはず", user);
                return results[0];
        });

    } catch (err) {
        console.log(err);            
    }
}


module.exports = {
    findById,
};