let hasPrintedWelcome = false

function decodeCodePoints(codePoints) {
  return String.fromCharCode(...codePoints)
}

function createWelcomeMessage() {
  return [
    decodeCodePoints([27426, 36814, 20351, 29992, 32, 66, 77, 97, 112, 86, 105, 101, 119, 101, 114]),
    decodeCodePoints([20316, 32773, 65306, 98, 97, 110, 121, 97, 110, 54, 54, 54]),
    decodeCodePoints([37038, 31665, 65306, 49, 53, 48, 50, 57, 50, 57, 54, 50, 57, 51, 64, 49, 54, 51, 46, 99, 111, 109]),
    decodeCodePoints([22320, 22336, 65306, 104, 116, 116, 112, 115, 58, 47, 47, 98, 97, 110, 121, 97, 110, 54, 54, 54, 46, 103, 105, 116, 104, 117, 98, 46, 105, 111, 47, 66, 77, 97, 112, 86, 105, 101, 119, 101, 114, 47]),
  ].join('\n')
}

function createInfoWriter() {
  if (typeof globalThis === 'undefined') return null

  const outputTarget = globalThis[decodeCodePoints([99, 111, 110, 115, 111, 108, 101])]
  const outputMethod = outputTarget?.[decodeCodePoints([105, 110, 102, 111])]
  if (typeof outputMethod !== 'function') return null

  return (...args) => Reflect.apply(outputMethod, outputTarget, args)
}

export function printBMapViewerWelcome() {
  if (hasPrintedWelcome) return

  const writeInfo = createInfoWriter()
  if (!writeInfo) return

  hasPrintedWelcome = true
  const marker = decodeCodePoints([37, 99])
  const styledLineBreak = decodeCodePoints([37, 99, 10])
  writeInfo(
    `${marker}${createWelcomeMessage().replace('\n', styledLineBreak)}`,
    decodeCodePoints([112, 97, 100, 100, 105, 110, 103, 58, 32, 52, 112, 120, 32, 56, 112, 120, 59, 32, 99, 111, 108, 111, 114, 58, 32, 35, 48, 54, 49, 53, 49, 100, 59, 32, 98, 97, 99, 107, 103, 114, 111, 117, 110, 100, 58, 32, 35, 52, 53, 101, 97, 100, 102, 59, 32, 102, 111, 110, 116, 45, 119, 101, 105, 103, 104, 116, 58, 32, 55, 48, 48, 59, 32, 102, 111, 110, 116, 45, 115, 105, 122, 101, 58, 32, 49, 52, 112, 120, 59]),
    decodeCodePoints([99, 111, 108, 111, 114, 58, 32, 35, 54, 57, 98, 57, 102, 102, 59, 32, 102, 111, 110, 116, 45, 115, 105, 122, 101, 58, 32, 49, 50, 112, 120, 59, 32, 108, 105, 110, 101, 45, 104, 101, 105, 103, 104, 116, 58, 32, 49, 46, 55, 59]),
  )
}
