(function(){
    $(document).ready(function(){
        var map;
        var infowindow;
        
        
        var pyrmont = {lat: -33.867, lng: 151.195};

        map = new google.maps.Map(document.getElementById('map'), {
            center: pyrmont,
            zoom: 15
        });
        
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: pyrmont,
            radius: 500,
            types: ['store']
        }, function(results, status){
            console.log(results);
        });
    });
})();