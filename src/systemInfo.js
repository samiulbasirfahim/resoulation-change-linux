import os from "os"
import screen from "screenz"

const info = {}
info.resoultion = screen.width + "x" + screen.height
info.os = os.platform()
info.arch = os.arch()
info.node = process.version
info.memory = parseFloat(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)
info.freemem = parseFloat(os.freemem() / 1024 / 1024 / 1024).toFixed(2)
info.usedmem = parseFloat(info.memory - info.freemem).toFixed(2)
info.cpu = os.cpus()[0].model
info.cpuCount = os.cpus().length
info.cpuSpeed = os.cpus()[0].speed
info.cpuLoad = os.loadavg()[0]

export default info
