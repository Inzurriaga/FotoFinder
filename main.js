window.URL = window.URL || window.webkitURL || window.mozURL;
var file = document.querySelector("#choose-file-button");
var titleInput = document.querySelector("#post-title");
var captionInput = document.querySelector("#post-caption");
var viewFavoriteButton = document.querySelector("#view-favorite-button");
var searchInput = document.querySelector("#search");
var postSection = document.querySelector("#post-section");
var reader = new FileReader();
var array = [];

document.querySelector("#add-album-button").addEventListener("click", createElement);
document.addEventListener("DOMContentLoaded", reloadPost)
// favoriteButton.addeventListener("click", changefavorite);
// contentedit.addeventListener("click", editPost)
function itworks() {
  alert("hello");
}

function createElement(e) {
  if (file.files[0]) {
    reader.readAsDataURL(file.files[0]); 
    reader.onload = createPost
  }
  e.preventDefault();
}

function createPost(e) {
  var post = new Photo(titleInput.value, e.target.result, captionInput.value);
  console.log(reader.result)
  array.push(post);
  post.saveToStorage();
  postHTML(post);
  clearInputs();
  console.log("createPost works");
  e.preventDefault();
}

function reloadPost() {
  for(var key in localStorage) {
    if(localStorage.hasOwnProperty(key)) {
      var parsedPost = JSON.parse(localStorage.getItem(key));
      var post = new Photo(parsedPost.title, parsedPost.file, parsedPost.caption, parsedPost.id);
      array.push(post);
      postHTML(parsedPost);
    }
  }
}

// function deletePost() {
  
// }

function favoritePost() {
  if (Photo.favorite === false) {
      Photo.favorite = true;
      favoriteButton.style.fill = "red";
  } else {
      Photo.favorite = false;
      favoriteButton.style.fill = "gray";
  }
}

// function editPost() {

// }

function clearInputs() {
  titleInput.value = "";
  captionInput.value = "";
  console.log("clearInputs works")
}

function postHTML(post) {
  var htmlcontent = `
    <article class="placeholder" id="${post.id}">
      <h2>${post.title}</h2>
        <img id="post-image" src="${post.file}">
      <div id="middle-article">
        <p>${post.caption}</p>
      </div>
      <div id="bottom-article">
        <img id="article-button-delete" class="post-button" src="icons/delete.svg">
        <img id="article-button-favorite" class="post-button" src="icons/favorite.svg">
      </div>
    </article>`;
    postSection.insertAdjacentHTML("afterbegin", htmlcontent);
    document.querySelector("#article-button-delete").addEventListener("click", itworks);
    document.querySelector("#article-button-favorite").addEventListener("click", itworks);
    console.log("postHTML works");
}

