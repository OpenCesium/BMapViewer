---
outline: deep
---

# Data 坐标数据规范格式

主要参考地理信息格式数据，可视化图层的数据格式需要具有geometry字段来定义坐标信息，同时也可能会需要properties字段来携带一些和该坐标绑定的属性，geometry和properties字段的内容统一使用GeoJSON的规范。

## 数据格式
### 点
```js
// 点数据
[{
    geometry: {
        type: 'Point',
        coordinates: [116.400219, 39.898231]
    },
    properties: {
        id: 1,
        name: '北京'
    }
}]
```

### 线
```js
// 线数据
[{
    geometry: {
        type: 'LineString',
        coordinates: [
            [116.400219, 39.898231],
            [121.473701, 31.230401]
        ]
    },
    properties: {
        id: 2,
        name: '京沪线'
    }
}]
```

### 面
```js
// 面数据
[{
    geometry: {
        type: 'Polygon',
        coordinates: [
            [
                [116.35, 39.95],
                [116.45, 39.95],
                [116.45, 39.85],
                [116.35, 39.85],
            ]
        ]
    },
    properties: {
        id: 3,
        name: '区域范围'
    }
}]
```

## 坐标规范
- **经纬度顺序**：统一使用 `[经度, 纬度]` (Longitude, Latitude) 的顺序。
- **海拔高度**：如需携带高度信息，坐标数组格式为 `[经度, 纬度, 高度]`。
- **单位**：经纬度使用十进制角度值（Decimal Degrees），高度单位为米（Meters）。

## 使用示例
```js
const iconGroup = new MapLayers.IconGroupLayer(viewer, {
    icon: './icon.png',
    width: 60,
    height: 60 ,
})
iconGroup.setData([
    {
        geometry: {
            type: 'Point',
            coordinates: [116.400219, 39.898231]
        },
        properties: {
            id: 1,
            name: '北京'
        }
    }
])
```