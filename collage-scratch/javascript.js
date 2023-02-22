const canvas = document.getElementById("collage");

const context = canvas.getContext("2d");

const img = new Image();
img.src = "./example1.jpg";

const images = document.querySelectorAll("img");
console.log(images);

images.forEach(image => image.addEventListener("load", displayImage))

function displayImage() {
    context.drawImage(this, 0, 0);
};