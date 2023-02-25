//------------------//
// Create new stage //
//------------------//
const stage = new Konva.Stage({
    container: "canvas", //container: "id of container div"
    width: 800,
    height: 800,
});

//--------------------------------------//
// Create new layer and add it to stage //
//--------------------------------------//
const layer = new Konva.Layer();
stage.add(layer);

//--------------------//
// Create transformer //
//--------------------//
let tr = new Konva.Transformer({
    anchorStroke: "rgba(119, 208, 238, 1)",
    borderStroke: "rgba(119, 208, 238, 1)",
    borderStrokeWidth: "2",
    anchorStrokeWidth: "2",
});
layer.add(tr);

//----------------------//
// Add images to canvas //
//----------------------//
let images = document.querySelectorAll("img");
images.forEach(image => image.addEventListener("click", addImage));

function addImage() {

const image = new Image();
image.onload = function () {
    poly.fillPatternImage(image)
};
image.src = `${this.src}`;

var poly = new Konva.Line({
    points: [0, 0,
             this.naturalWidth, 0,
             this.naturalWidth, this.naturalHeight,
             0, this.naturalHeight],
    fillPatternImage: images.image,
    closed: true,
    name: "fashion",
    draggable: true,
  });
layer.add(poly);
}

//-----------------------------------------------------------//
// Manipulate images on canvas:                              //
// select, resize, rotate, delete, duplicate, change z-level //
//-----------------------------------------------------------//
const canvasActions = (() => {

// Create selection rectangle
    let selectionRectangle = new Konva.Rect({
        fill: "rgba(119, 208, 238, 0.5)",
        visible: false,
    });
    layer.add(selectionRectangle);

// Functionality of selection rectangle
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
        selectionRectangle.moveToTop();
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
        tr.moveToTop();
    });

// Click to select/deselect images
    stage.on("click tap dragstart", function (e) {
    if (selectionRectangle.visible()) {
        return; //if we are selecting with rect, do nothing
    }
    if (e.target === stage) {
        tr.nodes([]); //if click on empty area, remove all selections
        return;
    }
    if (!e.target.hasName("fashion")) {
        return; //do nothing if clicked NOT on our images
    }

// Press shift or ctrl to select multiple images
    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
    const isSelected = tr.nodes().indexOf(e.target) >= 0;

    if (!metaPressed && !isSelected) { //if no key pressed and the node is not selected, select just one
        tr.nodes([e.target]);
    } else if (metaPressed && isSelected) { //if key pressed and node was already selected, remove it from selection
        const nodes = tr.nodes().slice(); //use slice to have new copy of array, remove node from array
        nodes.splice(nodes.indexOf(e.target), 1);
        tr.nodes(nodes);
    } else if (metaPressed && !isSelected) {
        const nodes = tr.nodes().concat([e.target]); //if key pressed and node was not already selected, add the node into selection
        tr.nodes(nodes);
    }
    tr.moveToTop();
    });

// Delete image(s)
    document.getElementById("delete").addEventListener("click", removeImage);

    function removeImage() {
        (tr.nodes()).forEach(node => node.destroy());
        tr.nodes([]);
    }

// Duplicate image(s)
    document.getElementById("duplicate").addEventListener("click", duplicateImage);

    function duplicateImage() {
        (tr.nodes()).forEach(node => {

            let newX, newY
            if (node._lastPos !== null) {
                newX = node._lastPos.x + 20;
                newY = node._lastPos.y + 20;
            } else {
                newX = 20;
                newY = 20;
            }

            const image = new Image();
            image.onload = function () {
                poly.fillPatternImage(image)
            };
            image.src = `${node.attrs.fillPatternImage.currentSrc}`;
                
            var poly = new Konva.Line({
                x: newX,
                y: newY,
                points: node.attrs.points,
                fillPatternImage: images.image,
                closed: true,
                name: "fashion",
                draggable: true,
            });
            layer.add(poly);
        });
    };

// Change z-level
    document.getElementById("forward").addEventListener("click", moveForward);
    document.getElementById("backward").addEventListener("click", moveBackward);

    function moveForward() {
        (tr.nodes()).forEach(node => {
            node.zIndex(node.zIndex() + 1);
        })
    };
    function moveBackward() {
        (tr.nodes()).forEach(node => {
            node.zIndex(node.zIndex() - 1);
        })
    };

// Crop


})();

// figuring out how to custom crop images

const image1 = new Image();
image1.onload = function () {
    poly2.fillPatternImage(image1)
};
image1.src = "./example1.jpg";

var poly2 = new Konva.Line({
    points: [23, 20, 23, 160, 70, 93, 150, 109, 290, 139, 270, 93],
    fillPatternImage: images.image1,
    closed: true,
    name: "fashion",
    draggable: true,
  });
layer.add(poly2);

document.getElementById("crop").addEventListener("click", cropImage);

function cropImage() {
    if (tr.nodes().length !== 1) {
        return; //only work if 1 item is selected at a time
    }
    console.log(tr.nodes().length);
}
