var file                = document.querySelector("#choose-file-button");
var titleInput          = document.querySelector("#post-title");
var captionInput        = document.querySelector("#post-caption");
var viewFavoriteButton  = document.querySelector("#view-favorite-button");
var searchInput         = document.querySelector("#search-input");
var post                = document.querySelector("article");
var reader              = new FileReader();
var numCounter          = 10;
var tenPost             = true;
var array               = [];

document.querySelector('#the-show-button').addEventListener('click', showthepost);
document.querySelector("#add-album-button").addEventListener("click", createElement);
document.addEventListener("DOMContentLoaded", reloadPost);
searchInput.addEventListener("keyup", liveSearch);
document.querySelector("#post-section").addEventListener("click", event => {
  if (event.target.classList.contains("article-button-delete")) {
    deletePost(event);
  }else if (event.target.classList.contains("article-button-favorite")) {
    favoriteButton();
}
})
document.querySelector("#post-section").addEventListener("dblclick", event => {
  if (event.target.classList.contains("post-title")) {
    editTitleText(event);
  }else if (event.target.classList.contains("post-caption")) {
    editCaptionText(event);
}
})

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
  updateShownArray()
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
  updateShownArray()
}

function deletePost(e) {
  var index = findIndexNumber(e.target.parentElement.parentElement.dataset.id);
  console.log(index)
  array[index].deleteFromStorage();
  array.splice(index, 1);
  e.target.parentElement.parentElement.remove();
  updateShownArray();
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

function showthepost() {
  if (tenPost === true) {
  numCounter = array.length;
  tenPost = false;
  document.querySelector("#the-show-button").innerText = "Show less";
  updateShownArray();
}else {
  numCounter = 10;
  tenPost = true;
  document.querySelector("#the-show-button").innerText = "Show More";
  updateShownArray();
}
};

function updateShownArray() {
  var postArray = Array.from(document.querySelectorAll('.placeholder'));
  postArray.forEach(function(post, index) {
    if(index < numCounter) {
      post.style.display = 'grid';
    } else {
      post.style.display = 'none';
    }
  });
};

function favoriteButton() {
  console.log("favorite")
  var index = findIndexNumber(event.target.parentElement.parentElement.dataset.id);
  console.log(array[index].favorite)
  if (array[index].favorite === false) {
    array[index].favorite = true;
    event.target.src = "icons/favorite-active.svg";
  } else{
    array[index].favorite = false;
    event.target.src = "icons/favorite.svg";
  }
  array[index].saveToStorage();
};

function postHTML(post, favorite) {
  var favoritesvg;
  if(post.favorite == true){
    favoritesvg = "icons/favorite-active.svg"
  } else {
    favoritesvg = "icons/favorite.svg"
  }
  var htmlcontent = `
    <article class="placeholder" data-id=${post.id}>
      <h2 class="post-title ediable-text" contentEditable = "false">${post.title}</h2>
        <img id="post-image" src="${post.file}">
      <div id="middle-article">
        <p class="post-caption ediable-text" contentEditable = "false">${post.caption}</p>
      </div>
      <div id="bottom-article">
        <img class="article-button-delete post-button" src="icons/delete.svg">
        <img class="article-button-favorite post-button" src="${favoritesvg}">
      </div>
    </article>`;
    document.querySelector("#post-section").insertAdjacentHTML("afterbegin", htmlcontent);
    console.log("postHTML works");
}

function editText() {
 event.target.contentEditable = true;
};

function setUneditable() {
 event.target.contentEditable = false;
};

function editTitleText(event) {
 if (event.target.classList.contains('ediable-text')) {
   editText();
   document.body.addEventListener('keypress', saveTitleOnEnter);
   event.target.addEventListener('blur', saveTitleOnClick);
 }
};

function updatetitle() {
   var index = findIndexNumber(event.target.parentElement.dataset.id);
   if (event.target.classList.contains('post-title')) {
      console.log(array[index])
     array[index].updatePhoto(event.target.innerText, 'title');
   } else {
    console.log("caption got update")
     array[index].updatePhoto(event.target.innerText, 'caption');
   };

   array[index].saveToStorage();
  };

function saveTitleOnClick(event) {
 updatetitle();
 setUneditable();
 document.body.removeEventListener('keypress', saveTextOnEnter);
 event.target.removeEventListener('blur', saveTextOnClick);
};

function saveTitleOnEnter(event) {
 if (event.code === 'Enter') {
   updatetitle();
   setUneditable();
   document.body.removeEventListener('keypress', saveTextOnEnter);
   event.target.removeEventListener('blur', saveTextOnClick);
 }
};

function editCaptionText(event) {
 if (event.target.classList.contains('ediable-text')) {
   editText();
   document.body.addEventListener('keypress', saveTextOnEnter);
   event.target.addEventListener('blur', saveTextOnClick);
 }
};

function updateCaption() {
   var index = findIndexNumber(event.target.parentElement.parentElement.dataset.id);
   if (event.target.classList.contains('post-title')) {
      console.log(array[index])
     array[index].updatePhoto(event.target.innerText, 'title');
   } else {
    console.log("caption got update")
     array[index].updatePhoto(event.target.innerText, 'caption');
   };

   array[index].saveToStorage();
  };

function saveTextOnClick(event) {
 updateCaption();
 setUneditable();
 document.body.removeEventListener('keypress', saveTextOnEnter);
 event.target.removeEventListener('blur', saveTextOnClick);
};

function saveTextOnEnter(event) {
 if (event.code === 'Enter') {
   updateCaption();
   setUneditable();
   document.body.removeEventListener('keypress', saveTextOnEnter);
   event.target.removeEventListener('blur', saveTextOnClick);
 }
};
//=================================================
function favoriteNumCheck() {
  var favoriteAmount = 0;
  array.forEach(function(check){
    if(check.favorite === true) {
      console.log(check.favorite)
      favoriteAmount++
      return document.querySelector("#favorite-num").innerText = favoriteAmount;
    }
    console.log(favoriteAmount)
  })
}









