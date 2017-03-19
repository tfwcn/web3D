function TDCameraHelper(camera, position, target, up) {
    var cameraObj = camera;
    var upDownRotation = 0;//垂直旋转角度
    var leftRightRotation = 0;//水平旋转角度
    var nowTarget = target;//焦点
    var nowUpVector = up;//上方向
    var nowPosition = position;//视点
    var nowRotationMatrix = new THREE.Matrix4();//旋转矩阵
    cameraObj.matrixAutoUpdate = false;//关闭自动更新
    //旋转矩阵，矩阵、轴、弧度
    function rotationMatrix(oldMatrix, axis, rotation) {
        var rotMatrix = new THREE.Matrix4();
        rotMatrix.makeRotationAxis(axis.normalize(), rotation);
        oldMatrix.multiply(rotMatrix);                // pre-multiply
    }

    // 第一人称视觉旋转，x,y变换值(角度)
    this.rotationViewMatrix = function (x, y) {
        leftRightRotation -= Math.PI / 180 * x;
        upDownRotation -= Math.PI / 180 * y;
        if (upDownRotation >= Math.PI * 2 || upDownRotation <= -Math.PI * 2) {
            upDownRotation -= upDownRotation / Math.abs(upDownRotation) * Math.PI * 2;
        }
        if (leftRightRotation >= Math.PI * 2 || leftRightRotation <= -Math.PI * 2) {
            leftRightRotation -= leftRightRotation / Math.abs(leftRightRotation) * Math.PI * 2;
        }
        nowRotationMatrix = new THREE.Matrix4();//旋转矩阵
        rotationMatrix(nowRotationMatrix, new THREE.Vector3(0, 1, 0), leftRightRotation);//旋转Y轴
        rotationMatrix(nowRotationMatrix, new THREE.Vector3(1, 0, 0), upDownRotation);//旋转X轴


        var cameraRotatedTarget = nowTarget.clone();
        cameraRotatedTarget.applyMatrix4(nowRotationMatrix);
        cameraRotatedTarget.add(nowPosition);

        var cameraRotatedUpVector = nowUpVector.clone();
        cameraRotatedUpVector.applyMatrix4(nowRotationMatrix);

        var nowMatrix = new THREE.Matrix4();//旋转矩阵
        nowMatrix.lookAt(nowPosition, cameraRotatedTarget, cameraRotatedUpVector);
        nowMatrix.setPosition(nowPosition);
        cameraObj.matrixWorld.copy(nowMatrix);
    }
    this.moveViewMatrix = function (x, y, z) {
        if (x != 0 || y != 0 || z != 0) {
            var rotatedVector = new THREE.Vector3(-x, y, z);
            rotatedVector.applyMatrix4(nowRotationMatrix);
            nowPosition.add(rotatedVector);
            this.rotationViewMatrix(0, 0);
        }
    }
    this.rotationViewMatrix(0, 0);//初始化视图
}