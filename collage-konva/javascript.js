//adding images to konva

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
    let dress = new Konva.Image({
        x: 0,
        y: 0,
        image: image1,
        width: 300,
        height: 450,
        name: "fashion",
        draggable: true, //allow drag & drop
    });
    layer.add(dress);
    tr.nodes([dress]); //add to transformer instance after it loads
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
    tr.nodes([shirt]);
};
image2.src = "./example2.jpg";

/*
//allowing image select/transform

//step 1, create new instance of transformer and add it to layer
let transformer = new Konva.transformer();
layer.add(transformer);

transformer.nodes([dress, shirt]); //by default select all shapes

//step 2, add ability to draw selection rectangle
let selectionRectangle = new Konva.Rect({
    fill: "rgba(0,0,255,0.25)",
    visible: false,
});
layer.add(selectionRectangle);


//step 3, set up select/transform
let x1, y1, x2, y2;

stage.on("mousedown touchstart", (e) => {
    if (e.target !== stage) {
        return; //do nothing if we mousedown on any shape
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
    transformer.nodes(selected);
});

//clicks should select/deselect shapes
stage.on("click tap", function (e) {
    if (selectionRectangle.visible()) {
        return; //if we are selecting with rect, do nothing
    }
    if (e.target === stage) {
        tr.nodes([]); // if click on empty area - remove all selections
        return;
    }
    if (!e.target.hasName("fashion")) {
        return; //do nothing if clicked NOT on our images
    }

    //did we press shift or ctrl?
    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
    const isSelected = transformer.nodes().indexOf(e.target) >= 0;

    if (!metaPressed && !isSelected) {
        // if no key pressed and the node is not selected
        // select just one
        transformer.nodes([e.target]);
    } else if (metaPressed && isSelected) {
        // if we pressed keys and node was selected
        // we need to remove it from selection:
        const nodes = tr.nodes().slice(); // use slice to have new copy of array
        // remove node from array
        nodes.splice(nodes.indexOf(e.target), 1);
        transformer.nodes(nodes);
    } else if (metaPressed && !isSelected) {
        // add the node into selection
        const nodes = transformer.nodes().concat([e.target]);
        transformer.nodes(nodes);
    }
});

*/

var tr = new Konva.Transformer();
layer.add(tr);

  // add a new feature, lets add ability to draw selection rectangle
  var selectionRectangle = new Konva.Rect({
    fill: 'rgba(0,0,255,0.5)',
    visible: false,
  });
  layer.add(selectionRectangle);

  var x1, y1, x2, y2;
  stage.on('mousedown touchstart', (e) => {
    // do nothing if we mousedown on any shape
    if (e.target !== stage) {
      return;
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

  stage.on('mousemove touchmove', (e) => {
    // do nothing if we didn't start selection
    if (!selectionRectangle.visible()) {
      return;
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

  stage.on('mouseup touchend', (e) => {
    // do nothing if we didn't start selection
    if (!selectionRectangle.visible()) {
      return;
    }
    e.evt.preventDefault();
    // update visibility in timeout, so we can check it in click event
    setTimeout(() => {
      selectionRectangle.visible(false);
    });

    var shapes = stage.find('.fashion');
    var box = selectionRectangle.getClientRect();
    var selected = shapes.filter((shape) =>
      Konva.Util.haveIntersection(box, shape.getClientRect())
    );
    tr.nodes(selected);
  });

  // clicks should select/deselect shapes
  stage.on('click tap', function (e) {
    // if we are selecting with rect, do nothing
    if (selectionRectangle.visible()) {
      return;
    }

    // if click on empty area - remove all selections
    if (e.target === stage) {
      tr.nodes([]);
      return;
    }

    // do nothing if clicked NOT on our rectangles
    if (!e.target.hasName('fashion')) {
      return;
    }

    // do we pressed shift or ctrl?
    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
    const isSelected = tr.nodes().indexOf(e.target) >= 0;

    if (!metaPressed && !isSelected) {
      // if no key pressed and the node is not selected
      // select just one
      tr.nodes([e.target]);
    } else if (metaPressed && isSelected) {
      // if we pressed keys and node was selected
      // we need to remove it from selection:
      const nodes = tr.nodes().slice(); // use slice to have new copy of array
      // remove node from array
      nodes.splice(nodes.indexOf(e.target), 1);
      tr.nodes(nodes);
    } else if (metaPressed && !isSelected) {
      // add the node into selection
      const nodes = tr.nodes().concat([e.target]);
      tr.nodes(nodes);
    }
  });