import scene from ".ghostlight/scenes/scene.json"

document.body.style.backgroundColor = scene.config.background
document.body.style.imageRendering = "pixelated"
document.body.style.zoom = 2
document.body.style.position = "relative"

function update() {
  let html = ""
  for (const actor of scene.actors) {
    html += `<div style="
      position: absolute;
      top: ${actor.y + "px"};
      left: ${actor.x + "px"};
      width: ${actor.width + "px"};
      height: ${actor.height + "px"};
      background-image: url('/assets/${actor.texture}');
    "></div>`
  }
  document.body.innerHTML = html
  requestAnimationFrame(update)
}
update()

const player = scene.actors.find(a => a.type === "Player")
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") player.x++
  if (e.key === "ArrowLeft") player.x--
  if (e.key === "ArrowDown") player.y++
  if (e.key === "ArrowUp") player.y--
})