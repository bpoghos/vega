import { AWS } from 'aws-sdk';

export const generateYears = () => {
    const start = 1960
    const current = new Date().getFullYear()
    const years = []

    for (let i = current; i >= start; i--) {
        years.push({ label: i, value: i })
    }
    return years
}

export const createImageUrl = (data) => {
    const imageBlob = new Blob([new Uint8Array(data)]);
    const image = URL.createObjectURL(imageBlob);
    return image
}

export const bufferToFile = (buffer, filename) => {
    const blob = new Blob([new Uint8Array(buffer)], { type: 'image/png' });
    return new File([blob], filename, { type: 'image/png' });
};

export  const generateSignedImageUrls = (imageArray) => {
    const s3 = new AWS.S3();
  
    return imageArray.map((image) => {
      return {
        url: s3.getSignedUrl('getObject', {
          Bucket: 'new-vega-server',
          Key: image,
          Expires: 60,
        }),
        fileName: image,
      };
    });
  };


export const appendPhotosToFormData = (formData, photoArray, photoCategory, isEditPostPage, photoChange) => {
    for (const img of photoArray) {
      if (isEditPostPage) {
        if (img instanceof File) {
          formData.append(photoCategory, img);
        } else if (photoChange[photoCategory] === true) {
          formData.append(photoCategory, img.fileName);
        } else {
          formData.append(photoCategory, img.fileName);
        }
      } else {
        formData.append(photoCategory, img);
      }
    }
  };
  