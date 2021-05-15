 // script.js
 
import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;
 
// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
 window.addEventListener('load', function() {
   navigator.serviceWorker.register('./sw.js').then(function(registration) {
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
       newPost.addEventListener('click',() => {
         setState({page: "entry" + newPost.id}, false)
       });
       document.querySelector('main').appendChild(newPost);
     });
   });
});
 
// back
window.addEventListener('popstate', (event) => {
 if (event.state == null) {
   setState({page: 'home_page'}, true)
 }
 else {
   setState(event.state, true)
 }
 
});
 
//setting
const setting = document.querySelector("header img");
setting.addEventListener("click",() => {
 setState({page: 'settings'}, false);
});
 
 
const header = document.querySelector("h1");
header.addEventListener('click', () => {
 // console.log(location.href)
 // console.log(location.origin)
 if (location.href != location.origin){
   setState({page: 'home_page'}, false);
 }
});


