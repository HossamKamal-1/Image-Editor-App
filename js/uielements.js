class UICommonElements {
  constructor() {
    this._defaultUploadBtn = document.getElementById("defaultInputFile");
    this._imageEl = document.getElementById("userImage");
    this._uploadAreaEl = document.querySelector(".upload-area");
    this._actionsEl = document.querySelector(".actions");
    this._canvasImg = document.querySelector(".canvasImg");
    this._ctx = this._canvasImg.getContext("2d");
  }
  get defaultUploadBtn() {
    return this._defaultUploadBtn;
  }
  get imageEl() {
    return this._imageEl;
  }
  get uploadAreaEl() {
    return this._uploadAreaEl;
  }
  get actionsEl() {
    return this._actionsEl;
  }
  get canvasImg() {
    return this._canvasImg;
  }
  get ctx() {
    return this._ctx;
  }
}
export default UICommonElements;
