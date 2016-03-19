import axios from 'axios';

export const LINEGRAPH_DATA = 'LINEGRAPH_DATA';

export function putToGraph(keywordItem) {
  console.log('triggered');
  const resultSet = []
  keywordItem.data.forEach(function(item){
    for(var key in item){
      resultSet.push({x:new Date(key),y:item[key]})
    }
  })
  console.log(resultSet);
  const result =  [
      {
        values: resultSet,
        key: keywordItem.Keyword,
        color: '#ff7f0e'
      }
    ];
  return {
    type: LINEGRAPH_DATA,
    payload: result
  };
};
