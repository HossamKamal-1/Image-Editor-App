class FilterController {
  static filterControls = [
    "saturateControl",
    "contrastControl",
    "brightnessControl",
    "sepiaControl",
    "grayscaleControl",
    "blurControl",
    "hueControl",
  ]
    .map((id) => document.getElementById(id))
    .reduce((acc, current) => {
      return { ...acc, [current.id]: current };
    }, {});
  static inputElements = Object.values(FilterController.filterControls);
  // Static functions [soon]
  static applyFilter(ctx, imageEl, canvasImg) {
    console.log(this, "from input");
    ctx.filter = `saturate(${this.filterControls.saturateControl.value}%) 
      contrast(${this.filterControls.contrastControl.value}%) 
      brightness(${this.filterControls.brightnessControl.value}%) 
      sepia(${this.filterControls.sepiaControl.value}%) 
      grayscale(${this.filterControls.grayscaleControl.value}%) 
      blur(${this.filterControls.blurControl.value}px) 
      hue-rotate(${this.filterControls.hueControl.value}deg)
      `;
    console.log(ctx);
    // no need to run this using imageEL.onload because it is already loaded when the uploader class worked
    ctx.drawImage(imageEl, 0, 0, canvasImg.width, canvasImg.height);
  }
  static resetFilter() {
    this.inputElements.forEach((inputElement) => {
      inputElement.value = inputElement.getAttribute("value");
    });
    // firing input event manuallly
    this.inputElements[0].dispatchEvent(new Event("input"));
  }
  static disableFilterControls() {
    console.log("im the this", this);
    this.inputElements.forEach((inputElement) => {
      inputElement.disabled = true;
    });
  }
  static enableFilterControls() {
    this.inputElements.forEach((inputElement) => {
      inputElement.disabled = false;
    });
  }
}
export default FilterController;
