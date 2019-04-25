const handleRegister = (req, res, db, bcrypt) => {
    const { email, password, name } = req.body;
    const hash = bcrypt.hashSync(password);
    if(email !== '' && password !== '' & name !== ''){
        db.transaction(trx => {
            trx.insert({
                email : email,
                hash :hash
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return db('users')
                .returning('*')
                .insert({
                    email : loginEmail[0],
                    name : name,
                    entries : 0,
                    joined : new Date()
                }).then(user => {
                    res.json(user[0]);
                })
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        
    }else{
        res.status(400).json('Not registered')
    }
}

module.exports = {
    handleRegister : handleRegister
}