# pickCircle 圆形绘制

`pickCircle` 第一次单击确定圆心，第二次单击确定圆周控制点，并按椭球表面距离计算半径。

## 组件案例

<SdkExamplePreview category="pick" example="pick-circle" title="pickCircle 圆形绘制" />

## 方法签名

```js
tools.pickCircle(callback, data?)
```

回调格式为 `{ type, center, control, radius }`。`center` 与 `control` 为 WGS84 坐标，`radius` 单位为米。

```js
const tools = new PickTools(viewer, {
  color: '#56e8e2',
  fillOpacity: 0.25,
  isReserve: true
})

tools.pickCircle((result) => {
  console.log(result.center, result.radius)
})
```
