AFRAME.registerComponent("followcamera", {
  init: function () {
    this.cameraEl = document.querySelector("[camera]");
    this.offset = new THREE.Vector3(-.5, .5, -3);
    this.speed = 0.02;
    this.stopDistance = 0.01;
    this.yMin = 1.5;
    this.yMax = 3;
    this.circleCenter = new THREE.Vector3(0, 0, -9);
    this.radius = 5;
  },

  tick: function (time, timeDelta) {
    if (!this.cameraEl) {
      return;
    }

    var cameraEl = this.cameraEl.object3D;
    var entityEl = this.el.object3D;
    var cameraPosition = new THREE.Vector3();
    cameraEl.getWorldPosition(cameraPosition);

    var targetPosition = cameraPosition
      .clone()
      .add(this.offset.clone().applyQuaternion(cameraEl.quaternion));

    var entityPosition = entityEl.position;
    var distance = targetPosition.distanceTo(entityPosition);

    if (distance > this.stopDistance) {
      var direction = targetPosition.clone().sub(entityPosition).normalize();
      entityPosition.addScaledVector(direction, (this.speed * timeDelta) / 16);
    }

    var dx = entityPosition.x - this.circleCenter.x;
    var dz = entityPosition.z - this.circleCenter.z;
    var distanceXZ = Math.sqrt(dx * dx + dz * dz);

    if (distanceXZ > this.radius) {
      var factor = this.radius / distanceXZ;
      entityPosition.x = this.circleCenter.x + dx * factor;
      entityPosition.z = this.circleCenter.z + dz * factor;
    }

    if (entityPosition.y < this.yMin) {
      entityPosition.y = this.yMin;
    } else if (entityPosition.y > this.yMax) {
      entityPosition.y = this.yMax;
    }

    entityEl.quaternion.copy(cameraEl.quaternion);
  },
});
