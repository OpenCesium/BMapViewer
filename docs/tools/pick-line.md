# pickLine 线绘制

`pickLine` 用于连续拾取折点并生成贴地折线。绘制过程中会显示跟随鼠标的临时线段，完成后可以拖拽任意折点编辑路径。

## 组件案例

左键依次添加折点，双击结束绘制；至少需要两个点。

<SdkExamplePreview category="pick" example="pick-line" title="pickLine 线绘制" />

## 方法签名

```js
tools.pickLine(callback, data?)
```

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `callback` | `(coordinates) => void` | 完成绘制或节点编辑后触发 |
| `data` | `Array<[number, number]>` | 可选初始折点数组 |

回调结果为 WGS84 坐标数组：

```js
[
  [125.82, 44.14],
  [125.84, 44.15],
  [125.86, 44.13],
]
```

## 使用示例

```js
const tools = new PickTools(viewer, {
  color: '#69b9ff',
  lineWidth: 3,
  pointSize: 10,
  isReserve: true,
  mouseHints: {
    show: true,
    text: '左键添加折点，双击结束',
  },
})

tools.pickLine((coordinates) => {
  console.log('折线坐标：', coordinates)
})
```

## 注意事项

- 折线使用 `clampToGround` 贴地显示。
- 双击结束时至少需要两个有效折点。
- 保留模式下，拖拽折点会重新触发回调。
