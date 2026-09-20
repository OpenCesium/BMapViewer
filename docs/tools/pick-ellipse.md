# pickEllipse 椭圆绘制

`pickEllipse` 第一次单击确定中心，第二次单击确定局部东西与南北方向半径。请沿斜向移动鼠标，以同时获得有效的长轴和短轴。

## 组件案例

<SdkExamplePreview category="pick" example="pick-ellipse" title="pickEllipse 椭圆绘制" />

## 方法签名

```js
tools.pickEllipse(callback, data?)
```

回调包含 `eastRadius`、`northRadius`、`semiMajorAxis`、`semiMinorAxis`、`rotation`、`center` 和 `control`。半轴单位为米，`rotation` 单位为弧度。

```js
const tools = new PickTools(viewer, {
  color: '#c89bff',
  fillOpacity: 0.28,
  isReserve: true
})

tools.pickEllipse((result) => {
  console.log(result.semiMajorAxis, result.semiMinorAxis)
})
```
