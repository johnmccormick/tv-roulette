const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

const https = require('https');

app.listen(port, () => console.log(`Listening on port ${port}`));

const API_KEY = '***REMOVED***';

app.get('/api/search', (req, res) => {
    const showToSearch = req.query.name;
    https.get('https://api.themoviedb.org/3/search/tv?api_key='+API_KEY+'&language=en-US&query='+showToSearch+'&page=1', (api_response) => {
        let data = '';

        api_response.on('data', (chunk) => {
          data += chunk;
        });
      
        api_response.on('end', () => {
            res.send(JSON.parse(data));
        });
    })
    .on("error", (err) => {
        console.log("Error: " + err.message);
    });
});

app.get('/api/show', (req, res) => {
    const showID = req.query.id;
    https.get('https://api.themoviedb.org/3/tv/'+showID+'?api_key='+API_KEY+'&language=en-US', (api_response) => {
        let data = '';

        api_response.on('data', (chunk) => {
          data += chunk;
        });
      
        api_response.on('end', () => {
            res.send(JSON.parse(data));
        });
    })
    .on("error", (err) => {
        console.log("Error: " + err.message);
    });
});

app.get('/api/season', (req, res) => {
    const showID = req.query.showid;
    const pickedSeason = req.query.season;
    https.get('https://api.themoviedb.org/3/tv/'+showID+'/season/'+pickedSeason+'?api_key='+API_KEY+'&language=en-US', (api_response) => {
        let data = '';

        api_response.on('data', (chunk) => {
          data += chunk;
        });
      
        api_response.on('end', () => {
            res.send(JSON.parse(data));
        });
    })
    .on("error", (err) => {
        console.log("Error: " + err.message);
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });
