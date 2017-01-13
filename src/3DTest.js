//开启Three.js渲染器
var renderer;//声明全局变量（对象）
function initThree() {
    width = document.getElementById('canvas3d').clientWidth;//获取画布「canvas3d」的宽
    height = document.getElementById('canvas3d').clientHeight;//获取画布「canvas3d」的高
    renderer=new THREE.WebGLRenderer({antialias:true});//生成渲染器对象（属性：抗锯齿效果为设置有效）
    renderer.setSize(width, height );//指定渲染器的高宽（和画布框大小一致）
    document.getElementById('canvas3d').appendChild(renderer.domElement);//追加 【canvas】 元素到 【canvas3d】 元素中。
    renderer.setClearColor(0xFFFFFF, 1.0);//设置canvas背景色(clearColor)
    renderer.shadowMap.type = THREE.BasicShadowMap;//阴影样式
    renderer.shadowMap.enabled = true;//显示阴影
}
//设置相机
var camera;
function initCamera() {
    camera = new THREE.PerspectiveCamera( 45, width / height , 1 , 5000 );//设置透视投影的相机,默认情况下相机的上方向为Y轴，右方向为X轴，沿着Z轴朝里（视野角：fov 纵横比：aspect 相机离视体积最近的距离：near 相机离视体积最远的距离：far）
    camera.position.set( 60, 50, 100 );//设置相机的位置坐标
    camera.up.x = 0;//设置相机的上为「x」轴方向
    camera.up.y = 1;//设置相机的上为「y」轴方向
    camera.up.z = 0;//设置相机的上为「z」轴方向
    camera.lookAt( {x:0, y:0, z:0 } );//设置视野的中心坐标
}
//设置场景
var scene;
function initScene() {
    scene = new THREE.Scene();
}

//设置光源
var light;
var light2;
function initLight() {
    light = new THREE.PointLight(0xFFFFFF, 1.0, 0);//设置平行光源
    light.position.set( 100, 200, 100 );//设置光源向量
    light.castShadow=true;//显示阴影
    light.shadow.mapSize.width=2000;//阴影颗粒大小，影响锯齿
    light.shadow.mapSize.height=2000;//阴影颗粒大小，影响锯齿
    scene.add(light);// 追加光源到场景
    light2 = new THREE.AmbientLight(0x222222);//设置全局光源
    scene.add(light2);// 追加光源到场景
}
//设置物体
var sphere;
var cylinder;
function initObject(){
    sphere = new THREE.Mesh(
        new THREE.SphereGeometry(20,20),                //球width,height,depth
        //new THREE.MeshLambertMaterial({color: 0xffaaaa}) //材质设定（线性材质）
        new THREE.MeshPhongMaterial({
            color: 0x2194ce,//颜色
            specular:0x111111,//高光反射颜色
            shininess:40//
        }) //材质设定（高光材质）
    );
    sphere.position.set(0,0,0);
    sphere.castShadow = true;//产生阴影
    //sphere.receiveShadow = true;//接收阴影
    scene.add(sphere);
    cylinder = new THREE.Mesh(
        new THREE.CylinderGeometry(50,50,3,30),//圆柱(上半径，下半径，高，侧面段数)
        //new THREE.MeshLambertMaterial({color: 0xffaaaa}) //材质设定（线性材质）
        new THREE.MeshPhongMaterial({
            color: 0x2194ce,//颜色
            specular:0x111111,//高光反射颜色
            shininess:40//
        }) //材质设定（高光材质）
    );
    cylinder.position.set(0,-20,0);
    //cylinder.castShadow = true;//产生阴影
    cylinder.receiveShadow = true;//接收阴影
    scene.add(cylinder);
}
//创建盒子
function CreateBlock(type,x,y,z){
    var texture = new THREE.TextureLoader().load('./minecraft/textures/blocks/grass_side.png',
        function ( texture ) {
            //刷新视图
            renderer.clear();
            renderer.render(scene, camera);
        });
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 1, 1 );//纵横重复数
    var texture2 = new THREE.TextureLoader().load('./minecraft/textures/blocks/grass_top.png',
        function ( texture ) {
            //刷新视图
            renderer.clear();
            renderer.render(scene, camera);
        });
    texture2.wrapS = THREE.RepeatWrapping;
    texture2.wrapT = THREE.RepeatWrapping;
    texture2.repeat.set( 1, 1 );//纵横重复数
    var materials = [];//右左上下后前
    for (var i = 0; i < 6; ++i) {
        if(i==2){
            materials.push(new THREE.MeshLambertMaterial({
                map: texture2,
                color:0x559000
            }));
        }else{
            materials.push(new THREE.MeshLambertMaterial({
                map: texture
            }));
        }
    }
    var box = new THREE.Mesh(
        new THREE.BoxGeometry(20,20,20),                //盒子width,height,depth
        new THREE.MultiMaterial(materials) //材质设定（线性材质）
    );
    box.position.set(0,0,0);
    box.castShadow = true;//产生阴影
    box.receiveShadow = true;//接收阴影
    scene.add(box);
}
//执行
function threeStart() {
    initThree();
    initCamera();
    initScene();
    initLight();
    //initObject();
    CreateBlock();
    var run= function(){
        //刷新画面
        renderer.clear();
        renderer.render(scene, camera);
        setTimeout(33,run);
    }
    run();
}