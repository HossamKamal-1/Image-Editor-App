import ImageUploader from "./uploader.js";
import FilterController from "./filtercontrol.js";
import UICommonElements from "./uielements.js";
class App extends UICommonElements {
  // private properties
  #closeImageBtn;
  #resetBtn;
  #downloadBtn;
  constructor() {
    super();
    // Start Image Uploader   // this.uploader
    const imageUploader = new ImageUploader();
    // pass imageuploader instance to t he filet controller
    console.log(imageUploader);
    // this.filterControls = new FilterController();
    // console.log(filterControls);
    FilterController.inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        FilterController.applyFilter(this.ctx, this.imageEl, this.canvasImg);
      });
    });
    this.#closeImageBtn = document.querySelector(".closeImageBtn");
    this.#closeImageBtn.addEventListener("click", this.closeImage.bind(this));
    this.#downloadBtn = document.querySelector(".download-filered-img-btn");
    this.#downloadBtn.addEventListener("click", () => {
      //this line of code converts canvas elementt to dataurl (base64 string)
      this.#downloadBtn.href = this.canvasImg.toDataURL();
    });
    this.#resetBtn = document.querySelector(".reset-filter-btn");
    this.#resetBtn.addEventListener(
      "click",
      FilterController.resetFilter.bind(FilterController)
    );
  }
  closeImage() {
    const { files } = new DataTransfer();
    /* 
      to handle same image upload issue
      [when x uploaded image get closed the default uploadbtn fileslist is still the same]
    */
    this.defaultUploadBtn.files = files;
    this.imageEl.src = "";
    this.uploadAreaEl.classList.remove("image-uploaded");
    this.actionsEl.style.display = null;
    // reset filter
    this.#resetBtn.click();
    FilterController.disableFilterControls();
  }
}
export default App;
