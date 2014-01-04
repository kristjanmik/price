var request = require('request');

exports.kronan = function (barcode, callback) {

	if (barcode) {
		callback(new Error('You must supply a barcode parameter!'))
	}

	request.get({
		url: 'http://appservice.kronan.is/KrAppVerdPerVoruJSON.ashx?BarcodeOrItem=' + barcode
	}, function (err, response, body) {
		if (err || response.statusCode !== 200)
			return callback(new Error('The Krónan price api is down or refuses to respond'));

		var obj;
		try {
			obj = JSON.parse(body);
		} catch (error) {
			return callback(new Error('Something is wrong with the data provided from the data source'));
		}

		return callback(null, {
			results: [obj]
		})
	});
};