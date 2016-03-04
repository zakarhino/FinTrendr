const fs = require('fs');
const path = require('path');
// Source: http://www.bennadel.com/blog/1504-Ask-Ben-Parsing-CSV-Strings-With-Javascript-Exec-Regular-Expression-Command.htm
// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.

function CSVToArray(strData, strDelimiter) {
  // Check to see if the delimiter is defined. If not,
  // then default to comma.
  strDelimiter = (strDelimiter || ",");
  // Create a regular expression to parse the CSV values.
  var objPattern = new RegExp((
    // Delimiters.
    "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
    // Quoted fields.
    "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
    // Standard fields.
    "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
  // Create an array to hold our data. Give the array
  // a default empty first row.
  var arrData = [
    []
  ];
  // Create an array to hold our individual pattern
  // matching groups.
  var arrMatches = null;
  // Keep looping over the regular expression matches
  // until we can no longer find a match.
  while (arrMatches = objPattern.exec(strData)) {
    // Get the delimiter that was found.
    var strMatchedDelimiter = arrMatches[1];
    // Check to see if the given delimiter has a length
    // (is not the start of string) and if it matches
    // field delimiter. If id does not, then we know
    // that this delimiter is a row delimiter.
    if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
      // Since we have reached a new row of data,
      // add an empty row to our data array.
      arrData.push([]);
    }
    // Now that we have our delimiter out of the way,
    // let's check to see which kind of value we
    // captured (quoted or unquoted).
    if (arrMatches[2]) {
      // We found a quoted value. When we capture
      // this value, unescape any double quotes.
      var strMatchedValue = arrMatches[2].replace(
        new RegExp("\"\"", "g"), "\"");
    } else {
      // We found a non-quoted value.
      var strMatchedValue = arrMatches[3];
    }
    // Now that we have our value string, let's add
    // it to the data array.
    arrData[arrData.length - 1].push(strMatchedValue);
  }
  // Return the parsed data.
  return (arrData);
}


/**
 * convert a csv string to json string
 * @param  {string} csv the csv string
 * @return {string}     the converted json
 */
function csvtojson(csv) {
  var array = CSVToArray(csv);
  var objArray = [];
  for (var h = 0; h < array[0].length; h++) {
    array[0][h] = array[0][h].replace('Searches: ', '');
  }
  for (var i = 1; i < array.length; i++) {
    if (array[i][0] !== '') {
      objArray[i - 1] = {};
      dateObj = [];
      for (var k = 0; k < array[0].length && k < array[i].length; k++) {
        var key = array[0][k];
        //keyword attribute
        if (k === 0) {
          objArray[i - 1][key] = array[i][k].toLowerCase();
        } else {
          //the date object;
          var temp = {};
          temp[key] = array[i][k];
          temp = JSON.stringify(temp);
          dateObj.push(temp);
        }
      }
      objArray[i - 1].date = dateObj;
    }
  }
  return objArray;
}

/**
 * loadCSV and parse to json base on filepath name
 * @param  {string} filename filepath to the file
 * @return {promise}         resovle when file convert successfully
 */
function loadCSV(filename) {
  return new Promise((resolve, reject) => {
    console.log('Promise is being called');
    fs.open(filename, 'r', (error, file) => {
      console.log('file is being called');
      if (error) return reject();
      if (file) {
        fs.readFile(filename, (err, data) => {
          if (err) return reject();
          return resolve(csvtojson(data));
        });
      }
    });
  });
}

module.exports = loadCSV;
