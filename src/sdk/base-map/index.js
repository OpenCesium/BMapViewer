import BaseMap from './BaseMap.js'
import { createImageryProvider, imageryProviderTypes } from './createImageryProvider.js'
import AMapImageryProvider from './imagery/amap/AMapImageryProvider.js'
import ArcGISImageryProvider, { arcgisWorldImageryUrl } from './imagery/arcgis/ArcGISImageryProvider.js'
import BaiduImageryProvider, { baiduImageryStyles } from './imagery/baidu/BaiduImageryProvider.js'
import GeoVisImageryProvider from './imagery/geovis/GeoVisImageryProvider.js'
import GoogleImageryProvider, { googleImageryStyles } from './imagery/google/GoogleImageryProvider.js'
import TdtImageryProvider from './imagery/tdt/TdtImageryProvider.js'
import TencentImageryProvider from './imagery/tencent/TencentImageryProvider.js'
import BD09TilingScheme from './imagery/tiling-scheme/BD09TilingScheme.js'
import CustomGeographicTilingScheme from './imagery/tiling-scheme/CustomGeographicTilingScheme.js'
import CustomMercatorTilingScheme from './imagery/tiling-scheme/CustomMercatorTilingScheme.js'
import GCJ02TilingScheme from './imagery/tiling-scheme/GCJ02TilingScheme.js'
import BD09Projection from './imagery/projection/BD09Projection.js'
import CoordTransform from './transform/CoordTransform.js'

const BaseMaps = {
  BaseMap,
  createImageryProvider,
  imageryProviderTypes,
  AMapImageryProvider,
  ArcGISImageryProvider,
  arcgisWorldImageryUrl,
  BaiduImageryProvider,
  baiduImageryStyles,
  TencentImageryProvider,
  TdtImageryProvider,
  GoogleImageryProvider,
  googleImageryStyles,
  GeoVisImageryProvider,
  GCJ02TilingScheme,
  BD09TilingScheme,
  CustomGeographicTilingScheme,
  CustomMercatorTilingScheme,
  BD09Projection,
  CoordTransform,
}

export {
  BaseMap,
  createImageryProvider,
  imageryProviderTypes,
  AMapImageryProvider,
  ArcGISImageryProvider,
  arcgisWorldImageryUrl,
  BaiduImageryProvider,
  baiduImageryStyles,
  TencentImageryProvider,
  TdtImageryProvider,
  GoogleImageryProvider,
  googleImageryStyles,
  GeoVisImageryProvider,
  GCJ02TilingScheme,
  BD09TilingScheme,
  CustomGeographicTilingScheme,
  CustomMercatorTilingScheme,
  BD09Projection,
  CoordTransform,
}

export default BaseMaps
