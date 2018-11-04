class Photo {
  constructor(title, file, caption) {
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
    localStorage.removeItem(this.id);
  }
  updatePhoto() {

  }
}