(function(){
    $(document).ready(function(){
        /*--------- test ---------------------------------------*/
        var map;
        var pyrmont = {lat:33.752504, lng:-84.388846};
        var fakemap = document.createElement("div");
        
        map = new google.maps.Map(fakemap, {
            center: pyrmont,
            zoom: 15
        });
        
        var service = new google.maps.places.PlacesService(map);
        
        service.nearbySearch({
            location: pyrmont,
            radius: 20000,
            types: ['store']
        }, function(results, status){
            console.log(results);
            var lat = results[0].geometry.location.lat();
            
            alert(lat);
        });
        /*-----------------------------------------------------*/
        
        
        
        /*--------- library -----------------------------------*/
        
        //Constructor
        function Frayzzle(options){
            this.config = {
                location:{
                    cords : {lat: '', long: ''},
                    address:{
                        street:'',
                        city:'',
                        state:'',
                        zip:'',
                        country:''
                    }
                },
                range: ''
            }
        }
        
        //Definitions
        Frayzzle.prototype.search = function(query){
            
        }
    });
})();