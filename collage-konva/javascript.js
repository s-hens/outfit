//create new stage
const stage = new Konva.Stage({
    container: "canvas", //container: "id of container div"
    width: 800,
    height: 800,
})

//create new layer and add it to stage
const layer = new Konva.Layer();
stage.add(layer);

/*
//add images
const image1 = new Image();
image1.onload = function () {
    let dress = new Konva.Image({
        x: 0,
        y: 0,
        image: image1,
        width: 300,
        height: 450,
        name: "fashion",
        draggable: true, //allow drag & drop
    });
    layer.add(dress); //add to layer after it loads
    //tr.nodes([dress]); //optional: add to transformer instance after it loads: this makes the image selected on load
};
image1.src = "./example1.jpg";

const image2 = new Image();
image2.onload = function() {
    let shirt = new Konva.Image({
        x: 300,
        y: 0,
        image: image2,
        width: 300,
        height: 300,
        name: "fashion",
        draggable: true,
    });
    layer.add(shirt);
};
image2.src = "./example2.jpg";
*/

// create transformer instance
let tr = new Konva.Transformer();
layer.add(tr);

//add images on konva on click
let images = document.querySelectorAll("img");
images.forEach(image => image.addEventListener("click", addToKonva));

function addToKonva() {
    const image = new Image();
    image.onload = function() {
    let shirt = new Konva.Image({
        x: 0,
        y: 0,
        image: image,
        width: this.width,
        height: this.height,
        name: "fashion",
        draggable: true,
    });
    layer.add(shirt);
};
image.src = `${this.src}`;
};

//handle select, resize and rotate
const selectResizeRotate = (() => {

    //create selection rectangle
    let selectionRectangle = new Konva.Rect({
        fill: "rgba(0,0,255,0.25)",
        visible: false,
    });
    layer.add(selectionRectangle);

    //how selection rectangle works
    let x1, y1, x2, y2;
    stage.on("mousedown touchstart", (e) => {
        if (e.target !== stage) {
            return; //do nothing if we click image instead of stage
        }
        e.evt.preventDefault();
        x1 = stage.getPointerPosition().x;
        y1 = stage.getPointerPosition().y;
        x2 = stage.getPointerPosition().x;
        y2 = stage.getPointerPosition().y;

        selectionRectangle.visible(true);
        selectionRectangle.width(0);
        selectionRectangle.height(0);
    });
    stage.on("mousemove touchmove", (e) => {
        if (!selectionRectangle.visible()) {
            return; //do nothing if we didn't start selection
        }
        e.evt.preventDefault();
        x2 = stage.getPointerPosition().x;
        y2 = stage.getPointerPosition().y;

        selectionRectangle.setAttrs({
            x: Math.min(x1, x2),
            y: Math.min(y1, y2),
            width: Math.abs(x2 - x1),
            height: Math.abs(y2 - y1),
        });
    });
    stage.on("mouseup touchend", (e) => {
        if (!selectionRectangle.visible()) {
            return; //do nothing if we didn't start selection
        }
        e.evt.preventDefault();
        setTimeout(() => {
            selectionRectangle.visible(false); //update visibility in timeout, so we can check it in click event
        });

        let shapes = stage.find(".fashion");
        let box = selectionRectangle.getClientRect();
        let selected = shapes.filter((shape) =>
            Konva.Util.haveIntersection(box, shape.getClientRect())
        );
        tr.nodes(selected);
    });

    // clicks select/deselect images
    stage.on("click tap dragstart", function (e) {
    if (selectionRectangle.visible()) {
        return; // if we are selecting with rect, do nothing
    }
    if (e.target === stage) {
        tr.nodes([]); // if click on empty area - remove all selections
        return;
    }
    if (!e.target.hasName("fashion")) {
        return; // do nothing if clicked NOT on our images
    }

    // press shift or ctrl to select multiple images
    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
    const isSelected = tr.nodes().indexOf(e.target) >= 0;

    if (!metaPressed && !isSelected) {
        tr.nodes([e.target]); //if no key pressed and the node is not selected, select just one
    } else if (metaPressed && isSelected) {
        //if we pressed keys and node was selected, remove it from selection
        //use slice to have new copy of array, remove node from array
        const nodes = tr.nodes().slice();
        nodes.splice(nodes.indexOf(e.target), 1);
        tr.nodes(nodes);
    } else if (metaPressed && !isSelected) {
        const nodes = tr.nodes().concat([e.target]); //add the node into selection
        tr.nodes(nodes);
    }
});

})();