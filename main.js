window.URL = window.URL || window.webkitURL || window.mozURL;
var file = document.querySelector("#choose-file-button");
var DeletePost = document.querySelector("#article-button-delete");
var favoritePost = document.querySelector("#article-button-favorite");
var titleInput = document.querySelector("#post-title");
var captionInput = document.querySelector("#post-caption");
var favoriteButton = document.querySelector("#view-favorite-button");
var submitButton = document.querySelector("#add-album-button");
var searchInput = document.querySelector("#search");
var postSection = document.querySelector("#post-section");
var array = [];

submitButton.addEventListener("click", createPost);
// favoriteButton.addeventListener("click", changefavorite);
// contentedit.addeventListener("click", editPost)

function createPost(e) {
  var fileBlob = URL.createObjectURL(file.files[0])
  console.log("image url " + fileBlob);
  var post = new Photo(titleInput.value, fileBlob, captionInput.value);
  array.push(post);
  post.saveToStorage();
  postHTML(post);
  clearInputs();
  console.log("createPost works");
  e.preventDefault();
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
    console.log("postHTML works");
}

