function validate(){
    var place =document.getElementById('placeInput').value || document.getElementById('place').value;
    
    if(place == null ){
        console.log('place'+place);
        console.log('place val'+place.value);
        alert('...'+place + place.value);
        window.location.href = '/index.ejs';
        window.location.href = '/index.ejs';

    }
   else{
        window.location.href = 'index.ejs';
    }
}