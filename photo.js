class Photo {
  constructor(title, file, caption, id) {
    this.id = new Date();
    this.title = title;
    this.file = file;
    this.caption = caption;
    this.favorite = false;
  }
  saveToStorage() {
    var postString = JSON.stringify(this);
    localStorage.setItem(this.id, postString);
  }
  deleteFromStorage() {
    alert("delete works")
    localStorage.removeItem("id", this.id);
  }
  updatePhoto() {

  }
}