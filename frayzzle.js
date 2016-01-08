export class Frayzzle {
    constructor(config){
        this.config = {
            location:{
                cords : {lat: '', long: ''},
                address:{
                    street:'',
                    city:'',
                    state:'',
                    zip:'',
                    country:''
                },
                distance: ''
            },
        }
    }
    
    init(){
        
    }
    
    loadZipCodes(){
        let fakemap = document.createElement("div");
        
        $.getJSON('zips.json', (zipCodes) => {
            _.each(zipCodes, (code) => {
                
            });
        });
    }
    
    search(cords){
        let map;
        let fakeMapElem = document.createElement("div");
        
        map = new google.maps.Map(fakeMapElem, {
            center: cords,
            zoom: 15
        });
        
        let service = new google.maps.places.PlacesService(map);
        
        service.nearbySearch({
            location: cords,
            radius: 50000
        }, (results, status) => {
            /*console.log(results);
            var lat = results[0].geometry.location.lat();
            alert(lat);*/
            
            if(results){
                _.each(results, (result) => {
                    let cords = {
                        lat: geometry.location.lat(),
                        lng: geometry.location.lng()
                    }
                    
                    //create GeoJSON from result
                });
            }
        });
    }
}