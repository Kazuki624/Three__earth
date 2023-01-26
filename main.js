import * as THREE from "./build/three.module.js";
import { OrbitControls } from "./controls/OrbitControls.js";

// シーンの追加
let scene, camera, renderer, pointLight, controls;
window.addEventListener("load", init)

function init(){

     scene = new THREE.Scene();
     
     // カメラの追加
     camera = new THREE.PerspectiveCamera(
          50,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
          );
          camera.position.set(0,0, +500)
          
          // レンダラーを追加
          renderer = new THREE.WebGLRenderer({alpha : true});
          // レンダラーを表示する場所を記述
          renderer.setSize(window.innerWidth, window.innerHeight)
          renderer.setPixelRatio(window.devicePixelRatio);
          document.body.appendChild(renderer.domElement);
          renderer.render(scene, camera);
          
          // テクスチャを貼り付ける
          let texture = new THREE.TextureLoader().load("./textures/earth.jpg")
          
          // ジオメトリの作成
          let ballGeometry = new THREE.SphereGeometry(100,64,32);
          
          // マテリアルの作成
          let ballMaterial = new THREE.MeshPhysicalMaterial({map : texture});
          
          // メッシュ化
          let ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
          // シーンに追加する
          scene.add(ballMesh);
          
          // 並行光源の追加
          let directionalLight = new THREE.DirectionalLight(0xffffff, 2);
          directionalLight.position.set(1,1,1)
          scene.add(directionalLight);
          
          // ポイント光源の設置
          pointLight = new THREE.PointLight(0xffffff, 1);
          pointLight.position.set(-200, -200, -200);
          scene.add(pointLight);
          
          // ポイント光源の場所の特定
          let pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
          scene.add(pointLightHelper);

          // マウス操作の設定
          controls = new OrbitControls(camera, renderer.domElement);
          
          window.addEventListener('resize', onWindowResize);
          animate() 

}
// ブラウザのリサイズに対応する
function onWindowResize(){
     // レンダラーのサイズを随時更新する
     renderer.setSize(window.innerWidth, window.innerHeight);
     // カメラのアスペクト比を調整する
     camera.aspect = window.innerWidth / window.innerHeight;
     camera.updateProjectionMatrix();
}

// ポイント光源を動かす
function animate(){
     pointLight.position.set(
          200 * Math.sin(Date.now() / 500),
          200 * Math.sin(Date.now() / 1000),
          200 * Math.cos(Date.now() / 500),
     );
     // レンダリング
     renderer.render(scene,camera);
     requestAnimationFrame(animate);
}
