/* jshint esversion: 6 */

/**
 * Copyright 2021 LeXXik
 * License: MIT
 * 
 * A helper class that allows to draw the current state of the physics world in Ammo.
 * 
 * */
class AmmoDebugDrawer {
    
    constructor(layer) {
        const drawer = new Ammo.DebugDrawer();
        drawer.drawLine = this.drawLine.bind(this);
        drawer.drawContactPoint = this.drawContactPoint.bind(this);
        drawer.reportErrorWarning = this.reportErrorWarning.bind(this);
        drawer.draw3dText = this.draw3dText.bind(this);
        drawer.setDebugMode = this.setDebugMode.bind(this);
        drawer.getDebugMode = this.getDebugMode.bind(this);
        drawer.enable = this.enable.bind(this);
        drawer.disable = this.disable.bind(this);
        drawer.update = this.update.bind(this);
        
        this.app = pc.Application.getApplication();
        
        const world = this.app.systems.rigidbody.dynamicsWorld;
        world.setDebugDrawer(drawer);
        this.world = world;
        
        this._v1 = new pc.Vec3();
        this._v2 = new pc.Vec3();
        this._v3 = new pc.Vec3();
        this.color = new pc.Color(1, 1, 0, 1);
        
        this._debugDrawMode = 1;
        this._enabled = false;
        
        this.layer = layer || this.app.scene.layers.getLayerByName('Debug Draw') || this.app.scene.layers.getLayerById(pc.LAYERID_UI);
        this.setDebugMode(this._debugDrawMode);
    }
    
    setMode(mode) {
        this.setDebugMode(mode);
    }
    
    enable() {
        this._enabled = true;
    }
    
    disable() {
        this._enabled = false;
    }
    
    drawContactPoint(pointOnB, normalOnB, distance, lifeTime, color) {
        const p = Ammo.wrapPointer(pointOnB, Ammo.btVector3);
        const n = Ammo.wrapPointer(normalOnB, Ammo.btVector3);
        const c = Ammo.wrapPointer(color, Ammo.btVector3);
        this.color.set(c.x(), c.y(), c.z(), 1);
        
        const from = this._v1;
        const to = this._v2;
        const dir = this._v3;
        
        from.set(p.x(), p.y(), p.z());
        dir.set(n.x(), n.y(), n.z()).scale(0.5);
        to.copy(from).add(dir);
        
        this.app.renderLine(from, to, this.color, {
            layer: this.layer
        });
    }
    
    reportErrorWarning(warningString) {}
    
    draw3dText(location, textString) {}
    
    update() {
        if (this._enabled)
            this.world.debugDrawWorld();
    }
    
    setDebugMode(debugMode) {
        this._debugDrawMode = debugMode;
    }
    
    getDebugMode() {
        return this._debugDrawMode;
    }
    
    drawLine(from, to, color) {
        const f = Ammo.wrapPointer(from, Ammo.btVector3);
        const t = Ammo.wrapPointer(to, Ammo.btVector3);
        const c = Ammo.wrapPointer(color, Ammo.btVector3);
        this.color.set(c.x(), c.y(), c.z(), 1);
        
        this._v1.set(f.x(), f.y(), f.z());
        this._v2.set(t.x(), t.y(), t.z());
        
        this.app.renderLine(this._v1, this._v2, this.color, {
            layer: this.layer
        });
    }
    
}