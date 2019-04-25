
const Clarifai = require('clarifai')
const app = new Clarifai.App({
    apiKey: 'f575150b5fc94575a0de76eb18b34162'
});
const handleImage = (req, res, db)=> {
    const {id} = req.body;
    db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries)
    })
    .catch(err => {
        res.status(404).json('error');
    })
}

const handleImageAPI = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        console.log(err)
    })
}

module.exports ={
    handleImage : handleImage,
    handleImageAPI : handleImageAPI
}