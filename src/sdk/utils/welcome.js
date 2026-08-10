let hasPrintedWelcome = false

export function printBMapViewerWelcome() {
  if (hasPrintedWelcome || typeof console === 'undefined') return

  hasPrintedWelcome = true
  console.info(
    '%c欢迎使用 BMapViewer%c\n作者：banyan666\n邮箱：15029296293@163.com',
    'padding: 4px 8px; color: #06151d; background: #45eadf; font-weight: 700; font-size: 14px;',
    'color: #69b9ff; font-size: 12px; line-height: 1.7;',
  )
}
