module.exports = {
  parseKeywordDataToObject: function (stringArray){
    let result = [];
    for (var item of stringArray) {
      result.push(JSON.parse(item));
    }
    return result;
  }
}
