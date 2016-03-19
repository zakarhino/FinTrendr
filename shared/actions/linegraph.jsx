import axios from 'axios';

export const LINEGRAPH_DATA = 'LINEGRAPH_DATA';

export function putToGraph() {
  console.log('triggered');
  const test = [ {x: new Date("Feb 2014"), y:50},
  {x: new Date("Mar 2014"), y:90},
  {x: new Date("Apr 2014"), y:90},
  {x: new Date("May 2014"), y:90},
  {x: new Date("Jun 2014"), y:90},
  {x: new Date("Jul 2014"), y:100},
  {x: new Date("Aug 2014"), y:90},
  {x: new Date("Sep 2014"), y:100},
  {x: new Date("Oct 2014"), y:90},
  {x: new Date("Nov 2014"), y:90},
  {x: new Date("Dec 2014"), y:90},
  {x: new Date("Jan 2015"), y:90},
  {x: new Date("Feb 2015"), y:90},
  {x: new Date("Mar 2015"), y:90},
  {x: new Date("Apr 2015"), y:90},
  {x: new Date("May 2015"), y:90},
  {x: new Date("Jun 2015"), y:90},
  {x: new Date("Jul 2015"), y:90},
  {x: new Date("Aug 2015"), y:90},
  {x: new Date("Sep 2015"), y:90},
  {x: new Date("Oct 2015"), y:90},
  {x: new Date("Nov 2015"), y:90},
  {x: new Date("Dec 2015"), y:90},
  {x: new Date("Jan 2016"), y:90}];

  const result =  [
      {
        values: test,
        key: 'test graph',
        color: '#ff7f0e'
      }
    ];
  return {
    type: LINEGRAPH_DATA,
    payload: result
  };
};
