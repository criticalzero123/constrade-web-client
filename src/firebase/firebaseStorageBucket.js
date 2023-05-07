import { storage } from "./firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

export const saveImagesProduct = async (imageList, title) => {
  const imagesUrlArray = [];
  for (let i = 0; i < imageList.length; i++) {
    const imageRef = ref(
      storage,
      `product_images/${title + "_" + imageList[i].name + "_" + v4()}`
    );

    const upload = await uploadBytes(imageRef, imageList[i]);
    const imageUrl = await getDownloadURL(upload.ref);

    imagesUrlArray.push(imageUrl);
  }

  return imagesUrlArray;
};
