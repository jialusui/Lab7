// script.js
//questions:
// delete old one, add new one...
//error: Maximum call stack size exceeded.
// sw.js
// url issue
import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}


document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      let index = 0;
      entries.forEach(entry => {
        index += 1;
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        newPost.id = index;
        newPost.addEventListener('click',() =>{
          
          // unable to solve index issue
          let my_ind = index;
          
          // CODE HERE
          //var url_str = "http://127.0.0.1:5500/#entry" + newPost.id;
          var url_str = "https://jialusui.github.io/Lab7/"+"#entry" + newPost.id;
          var entry_str = "entry"+newPost.id;
          //var entry_url = new URL(url_str);
          document.location = url_str;
          history.pushState({page:entry_str},entry_str,url_str);
          document.querySelector("body").className = "single-entry";
          document.querySelector('h1').innerHTML = "Entry "+newPost.id;
          document.querySelector("entry-page").entry = newPost.entry;

          
        });
        document.querySelector('main').appendChild(newPost);

       
      });
    });
});

// back
window.addEventListener('popstate',() =>{
  var back_url = new URL(location);
  document.location.href = back_url;

});

//setting
const setting = document.querySelector("img");
setting.addEventListener("click",() => {
  setState('setting');
  

});
const main_entry = document.querySelector("h1");
main_entry.addEventListener('click',() =>{
  setState('home_page');

});

