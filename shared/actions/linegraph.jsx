import axios from 'axios';

export const LINEGRAPH_DATA = 'LINEGRAPH_DATA';
export const REMOVE_GRAPH = 'REMOVE_GRAPH';

export function putToGraph(keywordItem) {
  const resultSet = []
  keywordItem.data.forEach(function(item){
    for(var key in item){
      resultSet.push({x:new Date(key),y:item[key]})
    }
  })
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

export function removeGraph(){
  return {
    type : REMOVE_GRAPH,
    payload : []
  }
}
