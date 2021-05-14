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
          
          setState("entry"+newPost.id);
          

          
        });
        document.querySelector('main').appendChild(newPost);

       
      });
    });
});

// back
window.addEventListener('popstate',() =>{
  
  if (location == "https://jialusui.github.io/Lab7/"){
    setState("home_page");
  }
  if (location.startWith('https://jialusui.github.io/Lab7/#entry')){
    let leng = 'https://jialusui.github.io/Lab7/#'.length;
    let start = leng;
    var substr = location.substring(start);
    setState(substr);

  }
  if (locationn == 'https://jialusui.github.io/Lab7/#settings'){
    setState('setting');
  }


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

