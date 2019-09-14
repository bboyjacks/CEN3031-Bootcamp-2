/* Add all the required libraries*/
var mongoose = require('mongoose'),
  Listing = require('./ListingSchema.js'),
  config = require('./config');

function initMongoose() {
  mongoose.connect(config.db.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
}

/* Connect to your database using mongoose - remember to keep your key secret*/

/* Fill out these functions using Mongoose queries*/
//Check out - https://mongoosejs.com/docs/queries.html

var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */
  var queryString = 'Library West';
  Listing.findOne({ name: queryString }, function(err, listing) {
    if (err)
      console.log(`Could not find ${queryString}`);
    else
      console.log(listing);
  });
};
var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */
  var queryString = 'CABL';
  Listing.findOneAndDelete( { code: queryString }, function(listing) {
    if (listing === null)
      console.log('Found nothing to delete.');
    else
      console.log(listing);
  });
};
var updatePhelpsLab = function() {
  /*
    Phelps Lab address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
    
    Correct Address: 1953 Museum Rd, Gainesville, FL 32603
   */

   Listing.updateOne({ code: 'PHL' }, { address: '1953 Museum Rd, Gainesville, FL 32603' });
};
var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */
  Listing.find().exec(function (err, docs) {
    if (err)
      console.log(err);
    else
      console.log(docs);
  });
};

initMongoose();

findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();
