//step 1, create new stage
const stage = new Konva.Stage({
    container: "canvas", //container: "id of container div"
    width: 800,
    height: 800,
})

//step 2, create new layer and add it to stage
const layer = new Konva.Layer();
stage.add(layer);

//step 3, add images
const image1 = new Image();
image1.onload = function () {
    const dress = new Konva.Image({
        x: 0,
        y: 0,
        image: image1,
        width: 300,
        height: 450,
        draggable: true, //allow drag & drop
    });
    layer.add(dress);
};
image1.src = "./example1.jpg";

const image2 = new Image();
image2.onload = function() {
    const shirt = new Konva.Image({
        x: 300,
        y: 0,
        image: image2,
        width: 300,
        height: 300,
        draggable: true,
    });
    layer.add(shirt);
};
image2.src = "./example2.jpg";