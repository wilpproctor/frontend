importScripts("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs");
importScripts("https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd");

let model;

cocoSsd.load().then((m) => {
  model = m;
});

const illegal = new Set(["cell phone", "tv", "remote"]);

function isStudentCheating(detected) {
  let peopleCount = 0;

  for (const item of detected) {
    if (item.class == "person") peopleCount += 1;
    else if (illegal.has(item.class)) {
      return "Illegal Object Detected";
    }
  }

  if (peopleCount == 0) return "Student could not be found";
  else if (peopleCount > 1) return "Multiple people seen by webcam";

  return false;
}

const canvas = new OffscreenCanvas(320, 240);
const ctx = canvas.getContext("2d");
ctx.strokeStyle = "#FF0000";

const blobToBase64 = (blob) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};

self.onmessage = (e) => {
  ctx.putImageData(e.data, 0, 0);
  model.detect(e.data).then((predictions) => {
    ctx.beginPath();
    for (const item of predictions) {
      ctx.rect(...item.bbox);
    }
    ctx.stroke();
    const cheating = isStudentCheating(predictions);
    canvas
      .convertToBlob({ type: "image/jpeg", quality: 0.5 })
      .then(blobToBase64)
      .then((rawImage) => {
        const image = rawImage.slice("data:image/jpeg;base64,".length);
        self.postMessage({ image, cheating });
      });
  });
};
