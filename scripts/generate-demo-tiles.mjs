import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const outputDir = resolve(scriptDir, '../public/demo-3d-tiles')

const faces = [
  [[0, 0, 1], [[-0.5, -0.5, 0.5], [0.5, -0.5, 0.5], [0.5, 0.5, 0.5], [-0.5, 0.5, 0.5]]],
  [[0, 0, -1], [[0.5, -0.5, -0.5], [-0.5, -0.5, -0.5], [-0.5, 0.5, -0.5], [0.5, 0.5, -0.5]]],
  [[1, 0, 0], [[0.5, -0.5, 0.5], [0.5, -0.5, -0.5], [0.5, 0.5, -0.5], [0.5, 0.5, 0.5]]],
  [[-1, 0, 0], [[-0.5, -0.5, -0.5], [-0.5, -0.5, 0.5], [-0.5, 0.5, 0.5], [-0.5, 0.5, -0.5]]],
  [[0, 1, 0], [[-0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [0.5, 0.5, -0.5], [-0.5, 0.5, -0.5]]],
  [[0, -1, 0], [[-0.5, -0.5, -0.5], [0.5, -0.5, -0.5], [0.5, -0.5, 0.5], [-0.5, -0.5, 0.5]]],
]

const positions = []
const normals = []
const indices = []
faces.forEach(([normal, points], faceIndex) => {
  const offset = faceIndex * 4
  points.forEach((point) => {
    positions.push(...point)
    normals.push(...normal)
  })
  indices.push(offset, offset + 1, offset + 2, offset, offset + 2, offset + 3)
})

const positionBytes = Buffer.from(new Float32Array(positions).buffer)
const normalBytes = Buffer.from(new Float32Array(normals).buffer)
const indexBytes = Buffer.from(new Uint16Array(indices).buffer)
const binaryChunk = Buffer.concat([positionBytes, normalBytes, indexBytes])
const buildings = [
  { translation: [-80, -55, 31], scale: [32, 34, 62] },
  { translation: [-22, -18, 48], scale: [40, 44, 96] },
  { translation: [50, -42, 37], scale: [34, 38, 74] },
  { translation: [68, 38, 56], scale: [44, 40, 112] },
  { translation: [-48, 55, 27], scale: [38, 32, 54] },
]

const gltf = {
  asset: { version: '2.0', generator: 'BMapViewer demo tile generator' },
  scene: 0,
  scenes: [{ nodes: buildings.map((_, index) => index) }],
  nodes: buildings.map((building) => ({ mesh: 0, ...building })),
  meshes: [{ primitives: [{ attributes: { POSITION: 0, NORMAL: 1 }, indices: 2, material: 0 }] }],
  materials: [{ pbrMetallicRoughness: { baseColorFactor: [0.06, 0.62, 0.78, 1], metallicFactor: 0.15, roughnessFactor: 0.52 } }],
  accessors: [
    { bufferView: 0, componentType: 5126, count: positions.length / 3, type: 'VEC3', min: [-0.5, -0.5, -0.5], max: [0.5, 0.5, 0.5] },
    { bufferView: 1, componentType: 5126, count: normals.length / 3, type: 'VEC3' },
    { bufferView: 2, componentType: 5123, count: indices.length, type: 'SCALAR', min: [0], max: [23] },
  ],
  bufferViews: [
    { buffer: 0, byteOffset: 0, byteLength: positionBytes.length, target: 34962 },
    { buffer: 0, byteOffset: positionBytes.length, byteLength: normalBytes.length, target: 34962 },
    { buffer: 0, byteOffset: positionBytes.length + normalBytes.length, byteLength: indexBytes.length, target: 34963 },
  ],
  buffers: [{ byteLength: binaryChunk.length }],
}

function pad(buffer, alignment, byte = 0x20) {
  const length = (alignment - (buffer.length % alignment)) % alignment
  return length ? Buffer.concat([buffer, Buffer.alloc(length, byte)]) : buffer
}

const jsonChunk = pad(Buffer.from(JSON.stringify(gltf)), 4)
const binChunk = pad(binaryChunk, 4, 0)
const glbLength = 12 + 8 + jsonChunk.length + 8 + binChunk.length
const glbHeader = Buffer.alloc(12)
glbHeader.writeUInt32LE(0x46546c67, 0)
glbHeader.writeUInt32LE(2, 4)
glbHeader.writeUInt32LE(glbLength, 8)
const jsonHeader = Buffer.alloc(8)
jsonHeader.writeUInt32LE(jsonChunk.length, 0)
jsonHeader.writeUInt32LE(0x4e4f534a, 4)
const binHeader = Buffer.alloc(8)
binHeader.writeUInt32LE(binChunk.length, 0)
binHeader.writeUInt32LE(0x004e4942, 4)
const glb = Buffer.concat([glbHeader, jsonHeader, jsonChunk, binHeader, binChunk])

const featureSource = Buffer.from(JSON.stringify({ BATCH_LENGTH: 0 }))
const featurePadding = (8 - ((28 + featureSource.length) % 8)) % 8
const featureJson = Buffer.concat([featureSource, Buffer.alloc(featurePadding, 0x20)])
const b3dmHeader = Buffer.alloc(28)
b3dmHeader.write('b3dm', 0)
b3dmHeader.writeUInt32LE(1, 4)
b3dmHeader.writeUInt32LE(28 + featureJson.length + glb.length, 8)
b3dmHeader.writeUInt32LE(featureJson.length, 12)
const b3dm = Buffer.concat([b3dmHeader, featureJson, glb])

const longitude = 125.83372000975274 * Math.PI / 180
const latitude = 44.14712267403385 * Math.PI / 180
const axis = 6378137
const eccentricity = 6.69437999014e-3
const sinLat = Math.sin(latitude)
const cosLat = Math.cos(latitude)
const sinLon = Math.sin(longitude)
const cosLon = Math.cos(longitude)
const radius = axis / Math.sqrt(1 - eccentricity * sinLat ** 2)
const origin = [radius * cosLat * cosLon, radius * cosLat * sinLon, radius * (1 - eccentricity) * sinLat]
const east = [-sinLon, cosLon, 0]
const north = [-sinLat * cosLon, -sinLat * sinLon, cosLat]
const up = [cosLat * cosLon, cosLat * sinLon, sinLat]

const tileset = {
  asset: { version: '1.1', gltfUpAxis: 'Z' },
  geometricError: 500,
  root: {
    transform: [...east, 0, ...north, 0, ...up, 0, ...origin, 1],
    boundingVolume: { box: [0, 0, 48, 180, 0, 0, 0, 180, 0, 0, 0, 120] },
    geometricError: 500,
    refine: 'ADD',
    children: [{
      boundingVolume: { box: [0, 0, 48, 130, 0, 0, 0, 130, 0, 0, 0, 90] },
      geometricError: 0,
      content: { uri: 'buildings.b3dm' },
    }],
  },
}

await mkdir(outputDir, { recursive: true })
await writeFile(resolve(outputDir, 'buildings.b3dm'), b3dm)
await writeFile(resolve(outputDir, 'tileset.json'), `${JSON.stringify(tileset, null, 2)}\n`)
console.log(`Generated demo 3D Tiles in ${outputDir}`)
