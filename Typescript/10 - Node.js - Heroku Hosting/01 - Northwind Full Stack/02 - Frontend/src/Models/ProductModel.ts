class ProductModel {
  public id: number = 0;
  public name: string = "";
  public price: number = 0;
  public stock: number = 0;
  public imageName: string = ""; // The image name on the backend ("1.jpg")
  public image: FileList = null; // The image file to send to backend
}

export default ProductModel;
