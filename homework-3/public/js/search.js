var latitude, longitude;
var timeZoneId, timeZoneName;
let map;

function initMap() {

  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat:parsedLatitude, lng:parsedLongitude},
    zoom: 15,
  });
}

function SetLatLong() {

   latitude= document.getElementById("placeLatitude");
   longitude= document.getElementById("placeLongitude");
  // if (latitude===null)
  //  alert(`${latitude} and ${longitude}`);

    //apelez Timezone API
    let request = new XMLHttpRequest();
    request.open("GET","https://maps.googleapis.com/maps/api/timezone/json?location="+latitude.innerText+","+longitude.innerText+"&timestamp=1331161200&key=AIzaSyAJnzDmfp27eI8CE2Ucu_AR8IyNaxGF4cw");
    request.send();
    request.onload = ()=>{
        console.log(request);
       if (request.status===200)
       {
           var r = JSON.parse(request.response);
           
           timeZoneId = r.timeZoneId;
           timeZoneName = r.timeZoneName;
           localStorage.setItem("timeZoneId",timeZoneId);
           localStorage.setItem("timeZoneName",timeZoneName);
           var timeCard = document.getElementById('placeTimezone');
           timeCard.innerText = timeZoneId + ' ' + timeZoneName;
       }
       else {
           console.log(`error ${request.status} with ${request.statusText}`);
           alert(`error ${request.status} with ${request.statusText}`);
       }
    }
    let request1 = new XMLHttpRequest();
    request1.open("GET","https://maps.googleapis.com/maps/api/elevation/json?locations="+latitude.innerText+","+longitude.innerText+"&key=AIzaSyAJnzDmfp27eI8CE2Ucu_AR8IyNaxGF4cw");
    request1.send();
    request1.onload = ()=>{
        console.log(request1);
       if (request1.status===200)
       {
           var r = JSON.parse(request1.response);
           
           let elevation = r.results[0].elevation;
           localStorage.setItem("elevation",elevation);
           var elevationCard = document.getElementById('placeElevation');
           elevationCard.innerText = elevation + ' meters';
       }
       else {
           console.log(`error ${request1.status} with ${request1.statusText}`);
           alert(`error ${request1.status} with ${request1.statusText}`);
       }
    }

    let request3 = new XMLHttpRequest();
    request3.open("GET","https://maps.googleapis.com/maps/api/distancematrix/json?origins=47.1741614,27.57225721&destinations="+latitude.innerText+","+longitude.innerText+"&key=AIzaSyAJnzDmfp27eI8CE2Ucu_AR8IyNaxGF4cw");
    request3.send();
    request3.onload = ()=>{
        console.log(request3);
       if (request3.status===200)
       {
           var r = JSON.parse(request3.response);
           let distance = r.rows[0].elements[0].distance.text;
           localStorage.setItem("distance",distance);
           var distanceCard = document.getElementById('placeDistance');
           distanceCard.innerText = distance;
       }
       else {
           console.log(`error ${request3.status} with ${request3.statusText}`);
           alert(`error ${request3.status} with ${request3.statusText}`);
       }
    }
    let request2 = new XMLHttpRequest();
    request2.open("GET","https://europe-west3-totemic-program-308313.cloudfunctions.net/function-1");
    request2.send();
    request2.onload = ()=>{
        console.log(request2);
       if (request2.status===200)
       {
           var r = request2.response;
          
           var servertzCard = document.getElementById('serverTimeZone');
           servertzCard.innerText = 'The server\'s time zone is: '+ r ;
       }
       else {
           console.log(`error ${request2.status} with ${request2.statusText}`);
           alert(`error ${request2.status} with ${request2.statusText}`);
       }

    }
}

window.onload = SetLatLong;

function validate(){
    var place =document.getElementById('placeText') || document.getElementById('place');
    
    if(place == null ){


        alert('Please enter your name. Do not leave it blank before proceed to the next field.');
    }
   else{
       if (place.value)
       {
           var r;
         console.log(place.value);
         let request = new XMLHttpRequest();
         request.open("GET","https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input="+place.value+"&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyAJnzDmfp27eI8CE2Ucu_AR8IyNaxGF4cw");
         request.send();
         request.onload = ()=>{
             console.log(request);
            if (request.status===200)
            {
                var r = JSON.parse(request.response);
                
                latitude= r.candidates[0].geometry.location.lat;
                longitude =r.candidates[0].geometry.location.lng;
                window.location.href = './statistics.ejs';
                localStorage.setItem("latitude",latitude);
                localStorage.setItem("longitude",longitude);
                
               
            }
            else {
                console.log(`error ${request.status} with ${request.statusText}`);
                alert(`error ${request.status} with ${request.statusText}`);
            }
         }
       
                  
       }
       else  alert('Please enter your name. Do not leave it blank before proceed to the next field.');

    }
    }