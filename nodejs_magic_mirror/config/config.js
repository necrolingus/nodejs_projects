/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information how you can configurate this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

var config = {
  address: "0.0.0.0", // Address to listen on, can be:
  // - "localhost", "127.0.0.1", "::1" to listen on loopback interface
  // - another specific IPv4/6 to listen on a specific interface
  // - "0.0.0.0" to listen on any interface
  // Default, when address config is left out, is "localhost"
  port: 8080,
  ipWhitelist: [], // Set [] to allow all IP addresses
  // or add a specific IPv4 of 192.168.1.5 :
  // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
  // or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
  // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

  language: "en",
  timeFormat: 24,
  units: "metric",

  modules: [
    {
      module: "alert",
    },
    {
      module: "updatenotification",
      position: "top_bar"
    },
    {
      module: "clock",
      position: "top_left"
    },
    {
      module: "calendar",
      header: "SA Holidays",
      position: "top_left",
      config: {
        calendars: [
          {
            symbol: "calendar-check",
            url: "https://www.calendarlabs.com/ical-calendar/ics/68/South_Africa_Holidays.ics"
          }
        ]
      }
    },
    //{
    //  module: "compliments",
    //  position: "lower_third"
    //},
    {
      module: "currentweather",
      position: "top_right",
      config: {
        location: "",
        locationID: "xxxxxxxxx",  //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
        appid: "xxxxxxxxx"
      }
    },
    {
      module: "weatherforecast",
      position: "top_right",
      header: "Weather Forecast",
      config: {
        location: "xxxxxxxxx",
        locationID: "",  //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
        appid: "xxxxxxxxxxxx"
      }
    },
    {
      module: "newsfeed",
      position: "bottom_bar",
      config: {
        feeds: [
          {
            title: "News24",
            url: "http://feeds.news24.com/articles/News24/TopStories/rss"
          }
        ],
        showSourceTitle: true,
        showPublishDate: true,
        broadcastNewsFeeds: true,
        broadcastNewsUpdates: true
      }
    },
//    {
//	module: 'MMM-GoogleMapsTraffic',
//	position: 'top_center',
//	config: {
//		key: 'Axxxxx',
//		lat: -26.2885659,
//		lng: 28.0890136,
//		height: '200px',
//		width: '200px',
//		zoom:15,
//		styledMapType: "transparent",
//		disableDefaultUI: true,
//		backgroundColor: 'rbga(0, 0%, 0%, 0)',
//		markers: [
//			{
//				lat: -26.2885659,
//				lng: 28.0890136,
//				fillColor: '#9966ff'
//			}
//		]
//	}
//  },
    
	{
	  //need google API directions, geolocation, and maps javascript
	  module: 'MMM-MyCommute',
	  position: 'top_center',
	  config: {
		apikey: 'xxxxxxxxxxxxxx',
		origin: 'YOUR HOME ADDRES HERE (obvisouly not your real address)',
		startTime: '00:00',
		endTime: '23:59',
		hideDays: [],
		showSummary: true,
		pollFrequency: 900000,
		destinations: [
						  {
							destination: 'WORK HERE',
							label: 'Work',
							mode: 'driving',
							color: '#82E5AA'
						  },
						  {
							destination: 'SOMETHING ELSE HERE.',
							label: 'SASOL',
							mode: 'driving',
							color: '#82d9e5'
						  }
					]
	  }
	},
	{
	  module: "MMM-AVStock",
	  position: "top_center", //"bottom_bar" is better for `mode:ticker`
	  config: {
		apiKey : "xxxxxxxxxx", // https://www.alphavantage.co/
		timeFormat: "YYYY-MM-DD HH:mm:ss",
		symbols : ["SOL.JO", "FNB.JO", "CPI.JO", "ABG.JO", "SBK.JO", "NBKP.JO", "OMU.JO", "AGL.JO","JSE.JO", "TCP.JO"],
		alias: ["Sasol","FNB","Capitec","ABSA","Std Bank","Nedbank","Old Mutual","Anglo American","JSE","Transcap"], //Easy name of each symbol. When you use `alias`, the number of symbols and alias s$
		tickerDuration: 60, // Ticker will be cycled once per this second.
		chartDays: 90, //For `mode:series`, how much daily data will be taken. (max. 90)
		poolInterval : 1000*15, // (Changed in ver 1.1.0) - Only For Premium Account
		mode : "table", // "table", "ticker", "series"
		decimals: 2, // number o decimals for all values including decimals (prices, price changes, change%...)
		candleSticks : true, //show candle sticks if mode is Series
		coloredCandles : false, //colored bars: red and green for negative and positive candles
		premiumAccount: false, // To change poolInterval, set this to true - Only For Premium Account
		}
	},
	{
  	  module: 'MMM-CurrencyExchange',
	  position: 'top_right',
	  config: {
		    base: 'USD',
		    symbols: ['ZAR'],
		    layoutStyle: 'table',
		    showCustomHeader: true,
  		}
	},
	{
	  module: 'MMM-CurrencyExchange',
	  position: 'top_right',
	  config: {
			base: 'EUR',
			symbols: ['ZAR'],
			layoutStyle: 'table',
			showCustomHeader: true,
		}
	},
	{
	  module: 'MMM-CurrencyExchange',
	  position: 'top_right',
	  config: {
			base: 'GBP',
			symbols: ['ZAR'],
			layoutStyle: 'table',
			showCustomHeader: true,
		}
	},
   ]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") { module.exports = config; }