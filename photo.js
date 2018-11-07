class Photo {
  constructor(title, file, caption, id) {
    this.id = id || "id" + Date.now();
    this.title = title;
    this.file = file;
    this.caption = caption;
    this.favorite = false;
  }
  saveToStorage() {
    localStorage.setItem(this.id, JSON.stringify(this));
  }
  deleteFromStorage() {
    localStorage.removeItem(this.id);
  }
  updatePhoto(newText, type) {
    if (type === "title") {
      this.title = newText;
    } else if (type === "caption") {
      this.caption = newText;
    }
  }
  updateFavorite() {

  }
}