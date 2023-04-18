const credentials = require('../credentials.js');

//Helper vars for querying the Clarifai REST API, different from the clarifai node package used by ZTM which is now deprecated
//loaded from an external, .gitignored file for now
const APP_ID = 'rekoni';
const API_PAT = credentials.clarifaiPAT;
const USER_ID = credentials.clarifaiUserID;
const MODEL_ID = credentials.clarifaiModelID;
const MODEL_VERSION_ID = credentials.clarifaiModelVersion;

const handleApiCall = (req,res) => {
    const clarifaiCredentials = JSON.stringify({
        "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": req.body.input
                  }
              }
          }
      ]});
    
      const reqOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + API_PAT
        },
        body: clarifaiCredentials
      };

      fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", reqOptions)
      .then(response => response.json())
      .then(result => res.json(result))
      .catch(err => res.status(400).json("error accessing API"));
}







const handleImage = (req,res,db) => {
    const { id } = req.body;
    db('users').where('id','=',id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries)
    })
    .catch(err => res.status(400).json('unable to get entries count'))
}


module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}