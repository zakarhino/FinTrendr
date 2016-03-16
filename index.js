'use strict';

require('babel-core/register')({});
require('babel-polyfill');

var request = require('request');


const server = require('./server/server').default;
const loadcsv = require('./utility/csvtojson');
const db = require('./server/db/db-model');

const PORT = process.env.PORT || 3000;


// loadcsv.loadCSV('goldenticket.csv')
//   .then((data) => {
//     for(var i =0; i<data.length; i++) {
//       db.saveKeyword(data[i]).then((node)=> {console.log('done!');}).catch((err)=> {console.log(err);});
//     }
//   })
//   .catch(() => {
//     console.log('failed to parse data');
//   });
// 

let etfList = ["AAPL", "MSFT", "XOM", "JNJ", "GE", "FB", "T", "WFC", "PG", "AMZN", "JPM", "GOOGL", "GOOG", "VZ", "PFE", "CVX", "KO", "HD", "INTC", "PM", "DIS", "MRK", "PEP", "CMCSA", "BAC", "CSCO", "V", "C", "IBM", "ORCL", "GILD", "MO", "UNH", "AGN", "MCD", "CVS", "AMGN", "MDT", "BMY", "WMT", "MMM", "SLB", "ABBV", "MA", "SBUX", "HON", "NKE", "CELG", "BA", "QCOM", "UTX", "LLY", "WBA", "UPS", "UNP", "MDLZ", "COST", "USB", "ACN", "PCLN", "LOW", "SPG", "CL", "GS", "AIG", "ABT", "BIIB", "AVGO", "LMT", "DOW", "TXN", "TWX", "TMO", "DD", "TWC", "CB", "DHR", "DUK", "OXY", "NEE", "F", "EMC", "TJX", "TGT", "COP", "AXP", "MET", "KMB", "ESRX", "KHC", "SO", "CRM", "GM", "PYPL", "PNC", "D", "ADBE", "BLK", "CAT", "RAI", "NFLX", "AMT", "EOG", "BK", "PSX", "GD", "ADP", "MON", "AET", "MS", "MCK", "PSA", "COF", "FDX", "DAL", "KR", "CI", "ANTM", "RTN", "GIS", "CTSH", "NOC", "TRV", "KMI", "SCHW", "EMR", "SYK", "PRU", "FOXA", "ITW", "CME", "YUM", "EXC", "PX", "BDX", "AEP", "VLO", "LYB", "ALXN", "HAL", "MMC", "YHOO", "HPE", "REGN", "CCI", "PPG", "ECL", "PCG", "LUV", "ICE", "ETN", "HUM", "CAH", "AON", "ORLY", "BBT", "AFL", "AAL", "EQR", "EBAY", "APD", "INTU", "DE", "MHFI", "CSX", "ALL", "AVB", "DG", "STZ", "PPL", "AZO", "BSX", "JCI", "WM", "SYF", "SYY", "NSC", "HCN", "HCA", "ROST", "STT", "APC", "SRE", "ILMN", "TEL", "CBS", "AMAT", "BXLT", "EIX", "WY", "VFC", "PEG", "SHW", "FISV", "PLD", "PXD", "CCL", "LB", "BAX", "ADM", "UAL", "EQIX", "ISRG", "GLW", "ED", "VRTX", "HPQ", "DFS", "EL", "SE", "XEL", "MPC", "MYL", "EA", "MNST", "TSN", "PRGO", "VTR", "BHI", "DLPH", "PGR", "K", "OMC", "ZTS", "CAG", "STI", "ZBH", "DLTR", "EW", "BXP", "APA", "NLSN", "PCAR", "HIG", "TROW", "WEC", "ES", "MTB", "ROP", "CTL", "ABC", "FIS", "ADI", "DPS", "APH", "CMI", "PAYX", "TAP", "GGP", "WLTW", "IP", "CERN", "NVDA", "MCO", "VNO", "CLX", "AMP", "STJ", "CMG", "ATVI", "DTE", "SNDK", "SJM", "IR", "XRAY", "HCP", "TYC", "FE", "SWK", "LVLT", "UA", "O", "PH", "ESS", "BEN", "GPC", "NUE", "BCR", "NTRS", "NBL", "HSIC", "ROK", "MJN", "NEM", "M", "FITB", "SWKS", "VMC", "VIAB", "FAST", "ETR", "HES", "EXPE", "HSY", "MAR", "CXO", "A", "RHT", "ADS", "CAM", "EFX", "WHR", "IVZ", "ADSK", "DVN", "GWW", "NOV", "RCL", "SYMC", "MU", "AA", "HST", "AWK", "TSCO", "FOX", "XLNX", "HOT", "LRCX", "FCX", "DVA", "COL", "HRL", "CHD", "VRSK", "CTXS", "AEE", "MHK", "LH", "CFG", "AAP", "HBI", "MSI", "WDC", "AME", "KIM", "RSG", "WFM", "CPB", "CMS", "COH", "NWL", "MAT", "PFG", "WMB", "STX", "MKC", "KORS", "KLAC", "RF", "TSO", "MAC", "XL", "EXR", "WAT", "FRT", "L", "CCE", "LLTC", "KMX", "EMN", "UHS", "MLM", "CHRW", "XRX", "BBY", "DGX", "COG", "HRS", "MAS", "AKAM", "LNC", "MCHP", "DOV", "SRCL", "WU", "DHI", "MOS", "WRK", "UDR", "CINF", "SCG", "BLL", "HOG", "SLG", "KEY", "LLL", "TXT", "KSS", "SEE", "KSU", "JNPR", "MRO", "ARG", "EQT", "PNR", "EXPD", "CA", "GT", "SIG", "CPGX", "WYN", "HAS", "ENDP", "IFF", "XEC", "SNA", "IPG", "VRSN", "CNP", "BBBY", "AMG", "LEN", "CF", "BWA", "TIF", "CBG", "NTAP", "MNK", "HBAN", "CTAS", "GAS", "UNM", "VAR", "JWN", "PNW", "DRI", "NDAQ", "TSS", "JBHT", "AES", "ETFC", "FLR", "CVC", "NI", "FFIV", "PVH", "TRIP", "DISCK", "XYL", "GPS", "WYNN", "ADT", "HP", "CMA", "HRB", "TMK", "TE", "AVY", "QRVO", "FTI", "LEG", "SPLS", "FTR", "AIV", "IRM", "SNI", "ALLE", "FLS", "PHM", "OKE", "RL", "HAR", "RHI", "URI", "POM", "TGNA", "PKI", "FMC", "FSLR", "RRC", "AIZ", "JEC", "LUK", "NFX", "ZION", "PBCT", "GRMN", "FLIR", "NWSA", "NAVI", "NRG", "DISCA", "PBI", "AN", "MUR", "RIG", "PWR", "PDCO", "LM", "TDC", "DNB", "CSRA", "GME", "R", "SWN", "URBN", "THC", "ESV", "CHK", "OI", "DO", "NWS", "GMCR"];
let etfData = [];
etfList.forEach((symbol) => {
  console.log('hey hey');
  var promise = new Promise((resolve, reject) => {

    request.get('https://www.quandl.com/api/v3/datasets/WIKI/' + symbol + '/data.json?column_index=4&api_key=fiuzUjysoMY6y1FMEbBE&start_date=2014-02-28&end_date=2016-01-31&order=asc&collapse=monthly',
      (err, response, body) => {

        var parsedBody = JSON.parse(body);
        if (err) {
          reject(err);
        } else {
          let returnObj = {};
          returnObj.data = parsedBody['dataset_data'].data.map((closingPrice) => {
            return closingPrice[1];
          });
          returnObj.Stock = symbol;
          resolve(returnObj);
        }
      });

  });

  etfData.push(promise);
});

Promise.all(etfData).then((results) => {
  results.forEach((stock) => {
    stock.data = JSON.stringify(stock.data);

    db.saveStock( stock ).then((node) => {
        console.log('done!');
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

server.listen(PORT, () => {
  console.log(`Server established on port ${PORT}.`);
});
