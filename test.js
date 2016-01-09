(function(){
    $(document).ready(function(){

       //Get Places
        var getPlaces = function(cords){
            var map;
            var placeCords = { lat:cords.lat, lng:cords.lng };
            var fakemap = document.createElement("div");
            
            map = new google.maps.Map(fakemap, {
                center: placeCords,
                zoom: 15
            });
            
            var service = new google.maps.places.PlacesService(map);
            
            service.nearbySearch({
                location: placeCords,
                radius: 50000
            }, getPlacesCallback);
        };
        
        //Callback for GetPlaces
        var getPlacesCallback = function(results, status, pagination){
            if(status === google.maps.places.PlacesServiceStatus.OK){
                //var lat = results[0].geometry.location.lat();
                
                //Save the places retrieved
                processPlaces(results);
                
                if(pagination.hasNextPage){
                    pagination.nextPage();
                }
            }
        };
        
        //Start Save Process
        var processPlaces = function(places){
            _.each(places, function(place){
                //Get lat and lng values
                place.location = {
                    lat: place.geometry.location.lat(),
                    lon: place.geometry.location.lng()
                }
                
                //check for any duplicates within elastic search
                var query = {
                    "query": { 
                        "bool": { 
                            "must": [
                                { "match": { "lat": place.location.lat }}, 
                                { "match": { "lon": place.location.lon }}  
                            ]
                        }
                    }
                };
                
                $.ajax({
                    url: 'http://localhost:9200/places',
                    type: 'GET',
                    cache: false,
                    data: query,
                    dataType: 'json',
                    success: function (results) {
                        if(!results || !results.hits || results.hits.total <= 0){
                            //add the place to elastic search
                            addPlace(place);
                        }
                    },
                    error: function (err) {
                        console.log('ERROR: At processPlaces()');
                    }
                });
            });
        };
        
        //Save Place
        var addPlace = function(place){
            var placeJSON = JSON.stringify(place);
            
            $.ajax({
                    url: 'http://localhost:9200/places/place',
                    type: 'POST',
                    cache: false,
                    data: placeJSON,
                    dataType: 'json',
                    success: function (res) {
                        if(res && res.ok){
                            console.log('Added: ' + place.name);
                        }
                    },
                    error: function (err) {
                        //alert('ERROR: At addPlace()');
                        console.log('ERROR: At addPlace()');
                    }
                });
        };
        
        //---START HERE---
        var increment = 0; var length = window.zipCodes.length;
        var zips = window.zipCodes ? window.zipCodes : [];
        
        var startProcessing = function(){
            getPlaces({ lng: zips[increment].loc[0], lat: zips[increment].loc[1] });
            
            increment++;
            if(increment < (length - 1)){
                setTimeout( startProcessing, 1000 );
            }
        };
        
        startProcessing();
        
        var placeTypes = [
                "accounting",
                "airport",
                "amusement_park",
                "aquarium",
                "art_gallery",
                "atm",
                "bakery",
                "bank",
                "bar",
                "beauty_salon",
                "bicycle_store",
                "book_store",
                "bowling_alley",
                "bus_station",
                "cafe",
                "campground",
                "car_dealer",
                "car_rental",
                "car_repair",
                "car_wash",
                "casino",
                "cemetery",
                "church",
                "city_hall",
                "clothing_store",
                "convenience_store",
                "courthouse",
                "dentist",
                "department_store",
                "doctor",
                "electrician",
                "electronics_store",
                "embassy",
                "establishment",
                "finance",
                "fire_station",
                "florist",
                "food",
                "funeral_home",
                "furniture_store",
                "gas_station",
                "general_contractor",
                "grocery_or_supermarket",
                "gym",
                "hair_care",
                "hardware_store",
                "health",
                "hindu_temple",
                "home_goods_store",
                "hospital",
                "insurance_agency",
                "jewelry_store",
                "laundry",
                "lawyer",
                "library",
                "liquor_store",
                "local_government_office",
                "locksmith",
                "lodging",
                "meal_delivery",
                "meal_takeaway",
                "mosque",
                "movie_rental",
                "movie_theater",
                "moving_company",
                "museum",
                "night_club",
                "painter",
                "park",
                "parking",
                "pet_store",
                "pharmacy",
                "physiotherapist",
                "place_of_worship",
                "plumber",
                "police",
                "post_office",
                "real_estate_agency",
                "restaurant",
                "roofing_contractor",
                "rv_park",
                "school",
                "shoe_store",
                "shopping_mall",
                "spa",
                "stadium",
                "storage",
                "store",
                "subway_station",
                "synagogue",
                "taxi_stand",
                "train_station",
                "travel_agency",
                "university",
                "veterinary_care",
                "zoo"
            ]
    });
})();