// 设置场景
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 添加环境光
const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);

// 添加方向光
const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);

// 加载OBJ模型
const loader = new THREE.OBJLoader();
loader.load('基础算盘.obj', object => {
    scene.add(object);
    model = object; // 将模型保存到一个变量中
    animate();
}, undefined, error => {
    console.error(error);
});

// 设置相机位置
camera.position.z = 5;

// 鼠标移动事件
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', onDocumentMouseMove, false);

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / 2;
    mouseY = (event.clientY - windowHalfY) / 2;
}

// 渲染循环
function animate() {
    requestAnimationFrame(animate);
    targetX = mouseX * 0.05;
    targetY = mouseY * 0.05;
    if (model) {
        model.rotation.y += 0.05 * (targetX - model.rotation.y);
        model.rotation.x += 0.05 * (targetY - model.rotation.x);
    }
    renderer.render(scene, camera);
}

// 监听窗口大小变化
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}