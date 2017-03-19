function TDBoxHelper(scene) {
    var sceneObj = scene;//场景
    var texture = new THREE.TextureLoader().load('../static/minecraft/textures/blocks/grass_side.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);//纵横重复数
    var texture2 = new THREE.TextureLoader().load('../static/minecraft/textures/blocks/grass_top.png');
    texture2.wrapS = THREE.RepeatWrapping;
    texture2.wrapT = THREE.RepeatWrapping;
    texture2.repeat.set(1, 1);//纵横重复数

    //创建盒子
    this.CreateBlock = function CreateBlock(type, x, y, z, width) {
        var materials = [];//右左上下后前
        for (var i = 0; i < 6; ++i) {
            if (i == 2) {
                materials.push(new THREE.MeshLambertMaterial({
                    map: texture2,
                    color: 0x559000
                }));
            } else {
                materials.push(new THREE.MeshLambertMaterial({
                    map: texture
                }));
            }
        }
        var box = new THREE.Mesh(
            new THREE.BoxGeometry(width, width, width),                //盒子width,height,depth
            new THREE.MultiMaterial(materials) //材质设定（线性材质）
        );
        box.position.set(x, y, z);
        box.castShadow = true;//产生阴影
        box.receiveShadow = true;//接收阴影
        sceneObj.add(box);
    }
}