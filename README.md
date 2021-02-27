# ammo-debug-drawer
A helper class to debug draw Ammo physics world state in PlayCanvas.

[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](LICENSE)

Live Demo: https://playcanv.as/p/OEVC2poo/

Project: https://playcanvas.com/project/744419/overview/ammo-debug-draw

### API:

Create new renderer and enabling it:
```js
const renderer = new AmmoDebugDrawer();
renderer.enable();
```

Change drawing mode:
```js
// Following modes supported:
//      0: hide
//      1: wireframe mode
//      2: bounding boxes
//      3: wireframe + AABB
//      8: contact points
const mode = 2;
renderer.setMode(mode);
```

Update the drawer state (should be in your `update` method to run every frame):
```js
renderer.update();
```

Disable drawer:
```js
renderer.disable();
```
