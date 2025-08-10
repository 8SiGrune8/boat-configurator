let boat = null;
let motor = null;
let tent = null;
let steer = null;

function createBoat(model, color) {
  // Удаляем старые объекты
  [boat, motor, tent, steer].forEach(obj => {
    if (obj) scene.remove(obj);
  });
  boat = motor = tent = steer = null;

  // Лодка
  let geometry;
  if (model === "A") geometry = new THREE.BoxGeometry(2, 0.5, 1);
  if (model === "B") geometry = new THREE.CylinderGeometry(0.5, 1, 2, 16);
  if (model === "C") geometry = new THREE.ConeGeometry(1, 2, 16);

  const material = new THREE.MeshStandardMaterial({ color });
  boat = new THREE.Mesh(geometry, material);
  scene.add(boat);

  // Модули
  addMotor(document.getElementById("motorType").value);
  if (document.getElementById("tentModule").checked) addTent();
  if (document.getElementById("rightSteer").checked) addSteer();
}

function addMotor(type) {
  if (!type) return;
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const material = new THREE.MeshStandardMaterial({ color: type === "X" ? "gray" : type === "Y" ? "silver" : "black" });
  motor = new THREE.Mesh(geometry, material);
  motor.position.set(0, -0.25, -0.75);
  scene.add(motor);
}

function addTent() {
  const geometry = new THREE.ConeGeometry(1, 0.8, 8);
  const material = new THREE.MeshStandardMaterial({ color: "red" });
  tent = new THREE.Mesh(geometry, material);
  tent.position.set(0, 0.65, 0);
  scene.add(tent);
}

function addSteer() {
  const geometry = new THREE.TorusGeometry(0.2, 0.05, 8, 16);
  const material = new THREE.MeshStandardMaterial({ color: "brown" });
  steer = new THREE.Mesh(geometry, material);
  steer.position.set(0.5, 0, 0.3);
  steer.rotation.x = Math.PI / 2;
  scene.add(steer);
}

// Слушатели изменений
["boatModel", "boatColor", "motorType", "tentModule", "rightSteer"].forEach(id => {
  document.getElementById(id).addEventListener("change", () => {
    const model = document.getElementById("boatModel").value;
    const color = document.getElementById("boatColor").value;
    createBoat(model, color);
  });
});

// Первичная отрисовка
createBoat("A", "white");

// Анимация
function animate() {
  requestAnimationFrame(animate);
  if (boat) boat.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
