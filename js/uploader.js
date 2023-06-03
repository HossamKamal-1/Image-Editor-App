import FilterController from "./filtercontrol.js";
import UICommonElements from "./uielements.js";
class ImageUploader extends UICommonElements {
  // Private Properties
  #uploadBtn;
  constructor() {
    super();
    this.#uploadBtn = document.querySelector(".uploadFileBtn");
    this.#uploadBtn.addEventListener("click", () => {
      this.defaultUploadBtn.click();
    });
    this.defaultUploadBtn.addEventListener("change", (e) => {
      this.uploadImage(e.target.files);
    });
    this.handleDrag();
  }
  handleDrag() {
    this.uploadAreaEl.addEventListener("dragenter", (e) => {
      console.log("dragenter");
      this.uploadAreaEl.classList.add("dragenter");
    });
    this.uploadAreaEl.addEventListener("dragleave", (e) => {
      this.uploadAreaEl.classList.remove("dragenter");
    });
    this.uploadAreaEl.addEventListener("dragover", (e) => {
      e.preventDefault(); // to be able to drop inside it
    });
    this.uploadAreaEl.addEventListener("drop", (e) => {
      e.preventDefault(); // turn off default behavior of dropping elements
      e.stopPropagation(); // to stop drop event from bubbling to the document drop event
      this.uploadAreaEl.classList.remove("dragenter");
      this.defaultUploadBtn.files = e.dataTransfer.files;
      this.uploadImage(this.defaultUploadBtn.files);
      console.log(e.dataTransfer.files);
    });
  }
  uploadImage(files) {
    if (!files.length) return; // if the user selected an image and then choose another one and press cancel
    console.log("file list is not empty");
    const imageFile = files[0];
    const { type: imageType, size: imageSize } = imageFile;
    const acceptTypeList = ["image/jpg", "image/png", "image/jpeg"];
    if (!acceptTypeList.some((type) => imageType === type)) {
      console.log("invalid image type");
      return;
    }
    if (imageSize / 10 ** 6 > 4) {
      // greater than 4mb
      console.log("file size is invalid");
      return;
    }
    console.log("valid image continue");
    const file = new FileReader();
    file.readAsDataURL(imageFile);
    file.onload = () => {
      this.actionsEl.style.display = "flex";
      this.imageEl.src = file.result;
    };

    // onload to ensure that the image downloaded(loaded into browser memory) by the broswer from the server then we can draw it into canvas
    this.imageEl.onload = () => {
      this.canvasImg.width = this.imageEl.width;
      this.canvasImg.height = this.imageEl.height;
      // draw the image without filter in canvas
      this.ctx.drawImage(
        this.imageEl,
        0,
        0,
        this.canvasImg.width,
        this.canvasImg.height
      );
      this.uploadAreaEl.classList.add("image-uploaded");
      // static methods---------------------------------------
      FilterController.enableFilterControls();
    };
  }
}
export default ImageUploader;
