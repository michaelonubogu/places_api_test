$(document).ready(function(){
	var config = {
		"mappings": {
			"place": {
				"properties": {
					"location": {
						"type": "geo_point"
					}
				}
			}
		}
	};
	
	$.ajax({
		url: 'http://localhost:9200/places',
		type: 'PUT',
		cache: false,
		data: config,
		dataType: 'json',
		success: function (result) {
			if(result){ alert('Elastic Search Store Configured!'); }
		},
		error: function (err) {
			alert('Something went wrong!');
		}
	});
});