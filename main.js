var file                = document.querySelector("#choose-file-button");
var titleInput          = document.querySelector("#post-title");
var captionInput        = document.querySelector("#post-caption");
var viewFavoriteButton  = document.querySelector("#view-favorite-button");
var searchInput         = document.querySelector("#search-input");
var post                = document.querySelector("article");
var reader              = new FileReader();
var array               = [];

document.querySelector("#add-album-button").addEventListener("click", createElement);
document.addEventListener("DOMContentLoaded", reloadPost);
document.querySelector("#post-section").addEventListener("click", event => {
  if (event.target.classList.contains("article-button-delete")) {
    deletePost(event);
  }
})
// document.querySelector("#article-button-favorite").addEventListener("click", favoritePost);

searchInput.addEventListener("keyup", liveSearch);
// contentedit.addEventListener("click", editPost)

function createElement(e) {
  e.preventDefault();
  if (file.files[0]) {
    reader.readAsDataURL(file.files[0]); 
    reader.onload = createPost
  }
}

function createPost(e) {
  e.preventDefault();
  var post = new Photo(titleInput.value, e.target.result, captionInput.value);
  console.log(reader.result)
  array.push(post);
  post.saveToStorage();
  postHTML(post);
  clearInputs();
  console.log("createPost works");
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

function deletePost(e) {
  var index = findIndexNumber(e.target.parentElement.parentElement.dataset.id);
  console.log(index)
  array[index].deleteFromStorage();
  array.splice(index, 1);
  e.target.parentElement.parentElement.remove(); 
};

function findIndexNumber(objId) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].id === objId) {
      return i
    }
  }
};

function clearInputs() {
  titleInput.value = "";
  captionInput.value = "";
  console.log("clearInputs works")
}


function liveSearch() {
  var searchinput = this.value;
  var searchTitle = document.querySelectorAll("h2");
  var searchCaption = document.querySelector("p")
  searchTitle.forEach(input => {
    if (input.innerText.indexOf(searchinput) != -1) { 
      input.parentElement.style.display = 'grid';
    } else if (input.innerText.indexOf(searchinput) <= -1) {
      input.parentElement.style.display = 'none';
    }
  })
};

function postHTML(post) {
  var htmlcontent = `
    <article class="placeholder" data-id=${post.id}>
      <h2 class="post-title ediable-text" contentEditable = "false">${post.title}</h2>
        <img id="post-image" src="${post.file}">
      <div id="middle-article">
        <p class="ediable-text" contentEditable = "false">${post.caption}</p>
      </div>
      <div id="bottom-article">
        <img class="article-button-delete" class="post-button" src="icons/delete.svg">
        <img class="article-button-favorite" class="post-button" src="icons/favorite.svg">
      </div>
    </article>`;
    document.querySelector("#post-section").insertAdjacentHTML("afterbegin", htmlcontent);
    console.log("postHTML works");
}















document.querySelector("#post-section").addEventListener('dblclick', updateCard);


function editText() {
  event.target.contentEditable = true;
};

function setUneditable() {
  event.target.contentEditable = false;
};

function updateCard(event) {
  if (event.target.classList.contains('ediable-text')) {
    editText();
    document.body.addEventListener('keypress', saveTextOnEnter);
    event.target.addEventListener('blur', saveTextOnClick);
  }
};

function updateIdea() {
  var index = findIndexNumber(event.target.parentElement.dataset.id);
  console.log(index +" this is to see if the update works")
  if (event.target.classList.contains('post-title')) {
    array[index].updatePhoto(event.target.innerText, 'title');
  } else {
    array[index].updatePhoto(event.target.innerText, 'caption');
  };

  array[index].saveToStorage();
};

function saveTextOnClick(event) {
  updateIdea();    
  setUneditable(); 
  document.body.removeEventListener('keypress', saveTextOnEnter);
  event.target.removeEventListener('blur', saveTextOnClick);
};

function saveTextOnEnter(event) {
  if (event.code === 'Enter') {
    updateIdea();    
    setUneditable(); 
    document.body.removeEventListener('keypress', saveTextOnEnter);
    event.target.removeEventListener('blur', saveTextOnClick);
  }
}; 