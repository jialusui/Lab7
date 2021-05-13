// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

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
          console.log(my_ind);
          // CODE HERE
          var url_str = "http://127.0.0.1:5500/#entry" + newPost.id;
          var entry_str = "entry"+newPost.id;
          var entry_url = new URL(url_str);
          document.location.href = entry_url;
          history.pushState({page:entry_str},entry_str,entry_url);
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
  window.history.back();

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

