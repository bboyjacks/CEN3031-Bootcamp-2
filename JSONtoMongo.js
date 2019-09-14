'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connect to your database using mongoose - remember to keep your key secret*/
//see https://mongoosejs.com/docs/connections.html
//See https://docs.atlas.mongodb.com/driver-connection/

/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
  //see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach


  Remember that we needed to read in a file like we did in Bootcamp Assignment #1.
 */

function initMongoose() {
  mongoose.connect(config.db.uri);
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useUnifiedTopology', true);
}

function saveDone(err, entry) {
  if (err)
    console.log(err);
  else
    console.log(`Success saving ${entry}`);
}

function save(entry) {
  new Listing(entry).save(saveDone);
}

function saveEntries(entries) {
  entries.forEach(function(entry) {
    save(entry);
  });
}

fs.readFile('./listings.json', 'utf8', function(err, data) {
  if (err) {
    console.log(err);
  } else {
    initMongoose();

    var jsonData = JSON.parse(data);
    saveEntries(jsonData.entries);
  }
});



/*  
  Check to see if it works: Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */