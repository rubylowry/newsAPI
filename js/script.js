console.log('json & ajax'); //testing script.js


//to test jquery
$(document).ready(function(){
   // $('body').click(function(){
   //  $(this).css('color','blue');

    //accessing key from json file
var myKey = JSON.parse(apiKey);
console.log(myKey[0]);
myKey = myKey[0].key;
console.log(myKey);

//reading users choice
	document.getElementById('submit').addEventListener('click', function(){
	endPoint = document.getElementById('endpoints').value;
	size = document.getElementById('sizes').value;
  console.log(endPoint,size); //actual parameter
  var apiUser ='harleydavidson';
  displayData(endPoint, size, apiUser);//actual parameter
  });

// Javascript data - array of objects
// var jsData = [
//   {
//     name : "Peter",
//     age  : 50
//   },
//   {
//     name : "John",
//       age  : 25
//   }
//
// ];
//
// console.log(jsData);
//
// //displaying js objects in the browser window
// var i;
// for(i =0; i < jsData.length; i++) {
// document.getElementById('result').innerHTML +=
//     '<h1>' + jsData[i].name +' is ' +
//      jsData[i].age + ' years old</h1>';
// };
//
//
// //json data
// var jsonData = [
//   {
//     "name" : "Lucy",
//     "age" : 12
//   },
//   {
//     "name" : "Mark",
//       "age" : 77
//   }
// ];
//
// console.log(jsonData);

//displaying json objects in the browser window
// var j;
// for(j =0; j < jsonData.length; j++) {
// document.getElementById('result').innerHTML +=
//     '<h1>' + jsonData[j].name +' is ' +
//      jsonData[j].age + ' years old</h1>';
// };

// retrieving json data from an external file
// var person = JSON.parse(myData);
// console.log(person);

//displaying json objects in the browser window
// var k;
// for(k =0; k < person.length; k++) {
// document.getElementById('result').innerHTML +=
//     '<h1>' + person[k].name +' is ' +
//      person[k].age + ' years old</h1>';
// };

function displayData(ep, si, au){
  if (ep === 'users') {
  var url = `https://api.unsplash.com/users/${au}/?client_id=${myKey}`;
  } else {
   var url =  `https://api.unsplash.com/${ep}/?client_id=${myKey}`;
  }
  console.log(ep, si, url);

//ajax method
$.ajax({
  url:url,
  type:'GET',
  data:'json',
  success: function(data){
    console.log(data);
    if (ep === 'collections'){
      collections(data,ep, si);
    } else if (ep === 'photos'){
      photos(data, ep, si);
    } else if (ep === 'users') {
      users(data, ep, si);
    }

      //collections
      function collections(d, e,s){
        var k;
        var userSize;

        document.getElementById('result').innerHTML = '';

        for(k = 0; k < d.length; k++ ){
          if (s === 'full') {
            userSize = d[k].cover_photo.urls.full;
          } else if (s === 'raw') {
            userSize = d[k].cover_photo.urls.raw;
          } else if (s === 'regular') {
            userSize = d[k].cover_photo.urls.regular;
          }else if (s === 'small') {
            userSize = d[k].cover_photo.urls.small;
          } else if (s === 'thumb') {
            userSize = d[k].cover_photo.urls.thumb;
          }


          document.getElementById('result').innerHTML +=
          '<div class="col-6 my-3">' +

            '<img class="img-thumbnail" alt="Image" src="' + userSize + '">' +
          '</div>' +
          '<div class="col-6 my-3">' +

          '<h1 class="my2">' + d[k].title + ' ' + d[k].user.first_name +'</h1> <h2 class="my-3">' +
          d[k].description + '<br><br> Published at: ' + d[k].published_at + '</h2> <h3> ' + d[k].user.bio +' </h3>' +

          '</div>';
        }//for
      }//collections function



      //Photos
        function photos(d, e,s){
          var j;
          var photoSize;
          document.getElementById('result').innerHTML = '';

          for(j = 0; j < d.length; j++ ){
            if (s === 'full') {
              photoSize = d[j].urls.full;
            } else if (s === 'raw') {
              photoSize = d[j].urls.raw;
            } else if (s === 'regular') {
              photoSize = d[j].urls.regular;
            }else if (s === 'small') {
              photoSize = d[j].urls.small;
            } else if (s === 'thumb') {
              photoSize = d[j].urls.thumb;
            }


          document.getElementById('result').innerHTML +=
          '<div class="col-6">' +
            '<img class="img-thumbnail" alt="Image" src="' + photoSize + '">' +
          '</div>';
        } //for
      }//photos function


      //Users
      function users(d, e, s) {
        console.log(d,e,s)
        document.getElementById('result').innerHTML = '';
        var p;
        var userPhoto;
        console.log(d.photos[0].urls.full);




           document.getElementById('result').innerHTML +=
          '<div class="row border border-success">';

          for(p = 0; p < d.photos.length; p++) {
              if (s === 'full') {
                userPhoto = d.photos[p].urls.full;
              } else if (s === 'raw') {
                userPhoto = d.photos[p].urls.raw;
              } else if (s === 'regular') {
                userPhoto = d.photos[p].urls.regular;
              }else if (s === 'small') {
                userPhoto = d.photos[p].urls.small;
              } else if (s === 'thumb') {
                userPhoto = d.photos[p].urls.thumb;
              }
              document.getElementById('result').innerHTML +=

              '<img class="col-4 img-thumbnail" alt="Image" src="' + userPhoto + '">'

           }//for



         document.getElementById('result').innerHTML +=
         '</div>'+
          '<div class="mt-5 text-primary bg-info px-5 py-5">' +
            '<h1 class="my2">' + d.first_name + ' ' + d.last_name +'</h1> <h2 class="my-3">' +
            d.location + ' Total likes:' +d.total_likes + '</h2> <h3> ' + d.portfolio_url +' </h3>' +
            '<img class="img-thumbnail" alt="Profile Image" src="' + d.profile_image.small + '">' +
          '</div>'  + '<br>' ;

      } //users function






      },//success
      error:function(){
        console.log('error');
      }//error

     });//ajax
  }; // functione displayData ends here

});//document.ready
