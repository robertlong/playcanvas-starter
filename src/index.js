import {
  Application,
  Entity,
  FILLMODE_FILL_WINDOW,
  RESOLUTION_AUTO,
  Color,
  PhongMaterial,
} from 'playcanvas';

const canvas = document.getElementById('canvas');

// Create the application and start the update loop
const app = new Application(canvas);
app.start();

// Set the canvas to fill the window
// and automatically change resolution to be the same as the canvas size
app.setCanvasFillMode(FILLMODE_FILL_WINDOW);
app.setCanvasResolution(RESOLUTION_AUTO);
app.scene.ambientLight = new Color(0.2, 0.2, 0.2);

// Create a Entity with a Box model component
const box = new Entity();
box.addComponent('model', {
  type: 'box',
});

// Create an Entity with a point light component and a sphere model component.
const light = new Entity();
light.addComponent('light', {
  type: 'point',
  color: new Color(1, 0, 0),
  radius: 10,
});
light.addComponent('model', {
  type: 'sphere',
});

// Scale the sphere down to 0.1m
light.setLocalScale(0.1, 0.1, 0.1);

// Create an Entity with a camera component
const camera = new Entity();
camera.addComponent('camera', {
  clearColor: new Color(0.4, 0.45, 0.5),
});

// Add the new Entities to the hierarchy
app.root.addChild(box);
app.root.addChild(light);
app.root.addChild(camera);

// Move the camera 10m along the z-axis
camera.translate(0, 0, 10);

// Set an update function on the app's update event
let angle = 0;
app.on('update', (dt) => {
  angle += dt;
  if (angle > 360) {
    angle = 0;
  }

  // Move the light in a circle
  light.setLocalPosition(3 * Math.sin(angle), 0, 3 * Math.cos(angle));

  // Rotate the box
  box.setEulerAngles(angle * 2, angle * 4, angle * 8);
});

// load a texture, create material and apply to box
app.assets.loadFromUrl('/assets/clouds.jpg', 'texture', (err, asset) => {
  const material = new PhongMaterial();
  material.diffuseMap = asset.resource;
  material.update();
  box.model.model.meshInstances[0].material = material;
});
