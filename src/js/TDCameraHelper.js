function TDCameraHelper(camera) {
    var cameraObj = camera;
    var upDownRotation = 0;//垂直旋转角度
    var leftRightRotation = 0;//水平旋转角度
    //cameraObj.matrixAutoUpdate=false;//关闭自动更新
    // 第一人称视觉旋转，x,y变换值(角度)
    this.rotationViewMatrix = function (x, y) {
        leftRightRotation += Math.PI / 180 * x;
        upDownRotation += Math.PI / 180 * y;
        if (upDownRotation >= Math.PI * 2 || upDownRotation <= -Math.PI * 2) {
            upDownRotation -= upDownRotation / Math.abs(upDownRotation) * Math.PI * 2;
        }
        if (leftRightRotation >= Math.PI * 2 || leftRightRotation <= -Math.PI * 2) {
            leftRightRotation -= leftRightRotation / Math.abs(leftRightRotation) * Math.PI * 2;
        }
        var axis = new THREE.Vector3(0, 1, 0);
        var axis2 = new THREE.Vector3(1, 0, 0);
        var rotWorldMatrix = new THREE.Matrix4();
        var rotMatrixLeftRight = new THREE.Matrix4();
        var rotMatrixUpdown = new THREE.Matrix4();
        rotMatrixLeftRight.makeRotationAxis(axis.normalize(), leftRightRotation);
        rotMatrixUpdown.makeRotationAxis(axis2.normalize(), upDownRotation);
        rotWorldMatrix.multiply(rotMatrixLeftRight);                // pre-multiply
        rotWorldMatrix.multiply(rotMatrixUpdown);                // pre-multiply
        //cameraObj.position.set( 0, 0, 0 );//设置相机的位置坐标
        //cameraObj.matrix.multiply(rotWorldMatrix);
        //cameraObj.position.set( 60, 50, 100 );//设置相机的位置坐标
        cameraObj.rotation.y -= Math.PI / 180 * x;
        cameraObj.rotation.x += Math.PI / 180 * y;
    }
    this.moveViewMatrix = function (x, y, z) {
        cameraObj.position.x += x;
        cameraObj.position.y += y;
        cameraObj.position.z += z;
    }
}