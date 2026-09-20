# useCesium hooks

useCesium 是一个用于 初始化和管理 Cesium Viewer 的 Hook 工具函数，用于在项目中统一管理 Cesium 实例，提供常用地图操作方法，例如：

- 初始化 Cesium
- 销毁 Cesium
- 获取 Cesium 实例
- 更新 Cesium 实例
- 相机飞行
- 相机高度限制
- ......

## 示例

详细可参考[方式 2：Hook 方式](/introduction/hello#方式-2-hook-方式)。

```js
import {useCesium} from "b-map-viewer";
import 'b-map-viewer/style.css'

const {
  initCesium,
  setMapCenter,
  setViewer,
  setCameraHeightRange,
  getCameraHeightRange,
} = useCesium()

```

## 注意

如果选择useCesium加载地图，请在mounted中调用initCesium方法，并传入地图容器的id，并且需要调用useCesium中的setViewer方法，更新useCesium中的viewer对象；
这样useCesium中的其他方法才能正常使用。

## 使用

```js
import {useCesium} from "b-map-viewer";

const {
    initCesium,
    setViewer,
    setCameraHeightRange,
    getCameraHeightRange,
    // ...
} = useCesium()
```

## 方法说明

## initCesium - 初始化Cesium Viewer

- initCesium(container, props)
- 参数

    |    参数     |   类型   |   描述   |
    |:---------:|:------:|:------:|
    | container | string |  容器id  |
    |   props   | object | 初始化配置项 |

- props 参数

    |    参数     |   类型   |         描述         |
    |:---------:|:------:|:------------------:|
    | sceneMode | number | 场景模式 (0=2D / 1=3D) |
    | mapConfig | object |     相机初始视角位置配置     |
    | baseColor | string |        地球底色        |

  - mapConfig 参数

      |    参数     |   类型   |         描述         |
      |:---------:|:------:|:------------------:|
      |  longitude   | number | 经度 |
      |  latitude   | number |     纬度     |
      |  height  | number |        相机高度        |
      |  pitch  | number |        相机俯仰角        |
      | minHeight     | number |    相机最小高度  | 1 |
      | maxHeight     | number |    相机最大高度  | 1500000 |
**示例**
```js
const viewer = await initCesium("map-box", {
  sceneMode: 1,
  baseColor: "#001f3f",
  mapConfig: {
    longitude: 125.834,
    latitude: 44.147,
    height: 10000,
    pitch: -45，
    minHeight:1,
    maxHeight:1500000
  }
})
```

## destroyCesium - 销毁Cesium实例

- destroyCesium()
- 无参数
- 描述：销毁当前 `viewer` 实例，释放相关资源。

**示例**
```js
destroyCesium()
```

## getViewer - 获取Cesium实例

- getViewer()
- 返回值：`Viewer`
- 描述：获取当前 `useCesium` Hook 中保存的 Cesium `viewer` 实例。

**示例**
```js
const viewer = getViewer()
```

## setViewer - 设置Cesium实例

- setViewer(view)
- 参数：

    |    参数   |   类型   |   描述   |
    |:-------:|:------:|:------:|
    |   view  | object | 传入需要全局托管的 `viewer` 实例 |

- 描述：当外部初始化了 Viewer，或者需要更新当前 Hook 管理的 Viewer 实例时调用。

**示例**
```js
setViewer(myViewerInstance)
```

## setMapCenter - 设置地图中心点（视角位置）

- setMapCenter(config)
- 参数：

    |    参数    |   类型   |   描述   | 默认值 |
    |:--------:|:------:|:------:|:----:|
    | config | object | 相机视角位置配置 | - |

  - config 参数

      |    参数    |   类型   |      描述      | 默认值 |
      |:--------:|:------:|:------------:|:----:|
      | longitude | number |       经度     | 125.83372000975274 |
      | latitude  | number |       纬度     | 44.14712267403385  |
      | height    | number |     相机高度   | 10000 |
      | pitch     | number |    相机俯仰角  | 0 |

- 描述：瞬间改变相机的视角位置，跳转到指定地点。

**示例**
```js
setMapCenter({
  longitude: 125.834,
  latitude: 44.147,
  height: 5000,
  pitch: -30
})
```

## flyTo - 相机飞行

- flyTo(destination, duration)
- 参数：

    |     参数    |   类型   |     描述     | 默认值 |
    |:---------:|:------:|:----------:|:----:|
    | destination | object | 目标位置及视角配置 | - |
    | duration | number |  飞行时间（秒） | 3 |

  - destination 参数

      |    参数    |   类型   |   描述   | 默认值 |
      |:--------:|:------:|:------:|:----:|
      | longitude | number |   经度   | - |
      | latitude  | number |   纬度   | - |
      | height    | number | 相机高度 | 800 |
      | pitch     | number | 相机俯仰角 | -90 |
      | orientation | object | 视角方向 | { heading: 0, pitch: 俯仰角的弧度, roll: 0 } |

- 描述：控制相机平滑飞行到指定的目的位置（支持使用经纬度和高度）。

**示例**
```js
flyTo({
  longitude: 125.834,
  latitude: 44.147,
  height: 2000,
  pitch: -45
}, 2.5)
```

## setCameraHeightRange - 动态修改相机高度范围

- `setCameraHeightRange(config)`
- 初始化完成后可随时调用，只传 `minHeight` 或 `maxHeight` 时会保留另一项当前值。
- 修改后会立即执行一次高度约束；如果当前相机超出新范围，会直接调整到对应边界。
- 返回当前完整范围 `{ minHeight, maxHeight }`。

```js
// 同时更新上下限
setCameraHeightRange({
  minHeight: 100,
  maxHeight: 80000,
})

// 只修改最大高度
setCameraHeightRange({ maxHeight: 120000 })
```

当 `minHeight` 大于 `maxHeight` 时会抛出 `RangeError`；传入非有限数值时会抛出 `TypeError`。

## getCameraHeightRange - 获取当前高度范围

```js
const range = getCameraHeightRange()
// { minHeight: 100, maxHeight: 120000 }
```

## restrictMaxiHeight - 立即执行相机高度约束

- restrictMaxiHeight()
- 无参
- 描述：根据当前高度范围立即约束相机，通常由渲染循环自动调用；手动修改相机位置后也可以主动调用。

##  getOffsetLat - 获取纬度偏移

- getOffsetLat(config)
- 返回值：`number`
- 描述：暴露出的由工具类引入的函数，用于通过经纬度、高度及俯仰角计算补偿后的纬度。

