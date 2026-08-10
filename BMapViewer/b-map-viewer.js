var fg = Object.defineProperty;
var gg = (n, e, t) => e in n ? fg(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var le = (n, e, t) => gg(n, typeof e != "symbol" ? e + "" : e, t);
import { ref as dg, onMounted as vg, nextTick as mg, onUnmounted as yg, openBlock as pg, createElementBlock as _g, createElementVNode as wg, renderSlot as xg } from "vue";
import * as P from "cesium";
const ot = [];
for (let n = 0; n < 256; ++n)
  ot.push((n + 256).toString(16).slice(1));
function Eg(n, e = 0) {
  return (ot[n[e + 0]] + ot[n[e + 1]] + ot[n[e + 2]] + ot[n[e + 3]] + "-" + ot[n[e + 4]] + ot[n[e + 5]] + "-" + ot[n[e + 6]] + ot[n[e + 7]] + "-" + ot[n[e + 8]] + ot[n[e + 9]] + "-" + ot[n[e + 10]] + ot[n[e + 11]] + ot[n[e + 12]] + ot[n[e + 13]] + ot[n[e + 14]] + ot[n[e + 15]]).toLowerCase();
}
let Gs;
const kg = new Uint8Array(16);
function Cg() {
  if (!Gs) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    Gs = crypto.getRandomValues.bind(crypto);
  }
  return Gs(kg);
}
const Ig = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), au = { randomUUID: Ig };
function Sg(n, e, t) {
  var o;
  n = n || {};
  const i = n.random ?? ((o = n.rng) == null ? void 0 : o.call(n)) ?? Cg();
  if (i.length < 16)
    throw new Error("Random bytes length must be >= 16");
  return i[6] = i[6] & 15 | 64, i[8] = i[8] & 63 | 128, Eg(i);
}
function Mg(n, e, t) {
  return au.randomUUID && !n ? au.randomUUID() : Sg(n);
}
const uu = (n) => {
  if (window.Math.abs(n.pitch % 90) === 0)
    return n.lat;
  const t = n.height / Math.tan(n.pitch * Math.PI / 180), i = Number(t / 111e3);
  return n.lat + i;
}, Ft = () => Mg();
function lu(n) {
  const {
    title: e = "",
    content: t = [],
    baseColor: i = "#40aee2",
    bodyColor: o = "#11374c",
    showTitle: a = !0,
    headerOpacity: u = 0.8,
    bodyOpacity: h = 0.5,
    scale: f = 1,
    align: g = "left",
    titleFontSize: m = 14,
    contentFontSize: v = 12
  } = n, _ = (Array.isArray(t) ? t : [t]).map((te) => {
    if (te && typeof te == "object") {
      const se = te.label ?? te.name ?? "", fe = te.value ?? te.content ?? "";
      return {
        text: `${se}${se && fe !== "" ? "：" : ""}${fe}` || JSON.stringify(te),
        color: te.color || "#ffffff"
      };
    }
    return {
      text: String(te ?? ""),
      color: "#ffffff"
    };
  }), w = 10 * f, C = a ? 30 * f : 0, b = 8 * f, S = m * f, I = v * f, N = 6 * f, A = 20 * f, U = document.createElement("canvas").getContext("2d");
  let V = 0;
  if (a) {
    U.font = `bold ${S}px Arial, sans-serif`;
    const te = U.measureText(e).width;
    V = Math.max(V, te);
  }
  U.font = `${I}px Arial, sans-serif`, _.forEach((te) => {
    const se = U.measureText(te.text).width;
    V = Math.max(V, se);
  });
  const k = V + w * 2.5, M = I + b, T = _.length * M - b + w * 2, D = 20, B = 20 * f, q = k + B * 2, X = C + T + A + B * 2, O = document.createElement("canvas"), Y = window.devicePixelRatio || 1;
  O.width = q * Y, O.height = X * Y, O.style.width = `${q}px`, O.style.height = `${X}px`;
  const G = O.getContext("2d");
  G.scale(Y, Y);
  const H = q / 2, Q = X - B, W = B, j = B, J = (te, se) => {
    let fe = te;
    te.length === 4 && (fe = `#${te[1]}${te[1]}${te[2]}${te[2]}${te[3]}${te[3]}`);
    const Z = parseInt(fe.slice(1, 3), 16), Fe = parseInt(fe.slice(3, 5), 16), _e = parseInt(fe.slice(5, 7), 16);
    return `rgba(${Z}, ${Fe}, ${_e}, ${se})`;
  };
  G.shadowBlur = 10 * f, G.shadowColor = i, G.lineWidth = 2 * f, G.strokeStyle = J(i, 0.8), G.beginPath(), G.moveTo(H, j + C + T), G.lineTo(H, Q), G.stroke(), G.shadowBlur = D * f, G.shadowColor = i, G.lineWidth = 2 * f, G.strokeStyle = J(i, 0.9), G.beginPath(), G.roundRect(W, j, k, C + T, N), G.stroke(), G.shadowBlur = 0, G.shadowColor = "transparent", G.save(), G.beginPath(), G.roundRect(W, j, k, C + T, N), G.clip(), a ? (G.fillStyle = J(i, u), G.fillRect(W, j, k, C), G.fillStyle = J(o, h), G.fillRect(W, j + C, k, T)) : (G.fillStyle = J(o, h), G.fillRect(W, j, k, T)), G.restore(), G.shadowBlur = 0, G.shadowColor = "transparent", G.textBaseline = "middle", G.fillStyle = "#ffffff", G.textAlign = g === "center" ? "center" : "left";
  const re = g === "center" ? W + k / 2 : W + w;
  a && (G.shadowBlur = 1 * f, G.shadowColor = "rgba(0, 0, 0, 0.3)", G.shadowOffsetX = 0, G.shadowOffsetY = 0, G.font = `bold ${S}px Arial, sans-serif`, G.fillText(e, re, j + C / 2), G.shadowBlur = 0, G.shadowColor = "transparent"), G.font = `${I}px Arial, sans-serif`;
  const ee = a ? j + C : j;
  return _.forEach((te, se) => {
    G.shadowBlur = 0;
    const fe = ee + w + I / 2 + se * M;
    G.fillStyle = te.color, G.fillText(te.text, re, fe), G.shadowBlur = 0, G.shadowColor = "transparent";
  }), O;
}
let cu = !1;
function bg() {
  cu || typeof console > "u" || (cu = !0, console.info(
    `%c欢迎使用 BMapViewer%c
作者：banyan666
邮箱：15029296293@163.com`,
    "padding: 4px 8px; color: #06151d; background: #45eadf; font-weight: 700; font-size: 14px;",
    "color: #69b9ff; font-size: 12px; line-height: 1.7;"
  ));
}
function Pg() {
  let n = null, e = 1, t = 15e5;
  const i = async (m, v) => {
    var p, _;
    bg();
    try {
      n = new P.Viewer(m, {
        animation: !1,
        //是否创建动画小器件，左下角仪表
        baseLayerPicker: !1,
        //是否显示图层选择器，右上角图层选择按钮
        fullscreenButton: !1,
        //是否显示全屏按钮，右下角全屏选择按钮
        geocoder: !1,
        //是否显示geocoder小器件，右上角查询按钮
        homeButton: !1,
        //是否显示Home按钮，右上角home按钮
        sceneMode: (v == null ? void 0 : v.sceneMode) === 0 ? P.SceneMode.SCENE2D : P.SceneMode.SCENE3D,
        //初始场景模式
        sceneModePicker: !1,
        //是否显示3D/2D选择器，右上角按钮
        navigationHelpButton: !1,
        //是否显示右上角的帮助按钮
        selectionIndicator: !1,
        //是否显示选取指示器组件
        timeline: !1,
        //是否显示时间轴
        infoBox: !1,
        //是否显示信息框
        scene3DOnly: (v == null ? void 0 : v.sceneMode) !== 0,
        //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
        orderIndependentTranslucency: !1,
        //是否启用无序透明
        contextOptions: { webgl: { alpha: !0 } },
        skyBox: new P.SkyBox({ show: !1 }),
        baseLayer: !1,
        // 不显示默认图层
        showRenderLoopErrors: !1
      }), v.mapConfig && (console.log("mapConfig", v), e = ((p = v.mapConfig) == null ? void 0 : p.minHeight) || 1, t = ((_ = v.mapConfig) == null ? void 0 : _.maxHeight) || 15e5, a(v.mapConfig)), n.scene.preRender.addEventListener(g), v.baseColor && (n.scene.globe.baseColor = P.Color.fromCssColorString(v.baseColor));
      let w = n.scene.screenSpaceCameraController;
      return w.tiltEventTypes = [
        P.CameraEventType.RIGHT_DRAG,
        // 右键拖动旋转
        P.CameraEventType.PINCH,
        // 保留多点触控旋转
        {
          eventType: P.CameraEventType.LEFT_DRAG,
          modifier: P.KeyboardEventModifier.CTRL
          // 保留Ctrl+左键拖动旋转
        },
        {
          eventType: P.CameraEventType.RIGHT_DRAG,
          modifier: P.KeyboardEventModifier.CTRL
          // 保留Ctrl+右键拖动旋转
        }
      ], w.zoomEventTypes = [
        P.CameraEventType.WHEEL,
        // 保留滚轮缩放
        P.CameraEventType.PINCH
        // 保留多点触控缩放
        // {
        //     eventType: Cesium.CameraEventType.LEFT_DRAG,
        //     modifier: Cesium.KeyboardEventModifier.CTRL  // 保留Ctrl+左键缩放
        // }
        // 不包含 RIGHT_DRAG，这样右键就不会缩放了
      ], n;
    } catch (w) {
      throw console.error("Failed to initialize Cesium:", w), w;
    }
  }, o = () => {
    n && !n.isDestroyed() && (n.scene.preRender.removeEventListener(g), n.destroy(), n = null);
  }, a = (m) => {
    let {
      longitude: v = 116.40021930621751,
      latitude: p = 39.89823173640466,
      height: _ = 1e4,
      pitch: w = 0
    } = m;
    n.scene.camera.setView({
      destination: P.Cartesian3.fromDegrees(v, uu({ lat: p, pitch: w, height: _ }), _),
      orientation: {
        heading: P.Math.toRadians(0),
        pitch: P.Math.toRadians(w),
        roll: 0
      }
    });
  }, u = (m, v = 3) => {
    if (!n || (m == null ? void 0 : m.longitude) == null || (m == null ? void 0 : m.latitude) == null) return;
    let p = {
      lon: m.longitude,
      lat: m.latitude,
      height: m.height || 800,
      pitch: m.pitch || -90
    };
    n.camera.flyTo({
      destination: P.Cartesian3.fromDegrees(
        m.longitude,
        uu(p),
        m.height || 800
      ),
      duration: v,
      orientation: m.orientation || {
        heading: P.Math.toRadians(0),
        pitch: P.Math.toRadians(p.pitch),
        roll: 0
      }
    });
  }, h = () => n, f = (m) => {
    n = m;
  }, g = () => {
    let m = n.camera.positionCartographic;
    m.height < e && n.camera.setView({
      destination: P.Cartesian3.fromRadians(m.longitude, m.latitude, e),
      orientation: {
        direction: n.camera.direction,
        up: n.camera.up
      }
    }), m.height >= t && n.camera.setView({
      destination: P.Cartesian3.fromRadians(m.longitude, m.latitude, t),
      orientation: {
        direction: n.camera.direction,
        up: n.camera.up
      }
    });
  };
  return {
    getViewer: h,
    setViewer: f,
    setMapCenter: a,
    initCesium: i,
    destroyCesium: o,
    flyTo: u
  };
}
const Lg = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [i, o] of e)
    t[i] = o;
  return t;
}, Ng = { class: "cesium-container" }, Tg = ["id"], Og = {
  __name: "BMapViewer",
  props: {
    id: {
      type: String,
      default: void 0
    },
    camera: {
      type: Object,
      default: () => ({})
    },
    sceneMode: {
      type: Number,
      default: 0
    },
    baseColor: {
      type: String,
      default: "#112441"
    }
  },
  emits: ["ready", "error", "click"],
  setup(n, { expose: e, emit: t }) {
    const i = n, o = t, a = dg(null);
    let u = null, h = null;
    const {
      initCesium: f,
      destroyCesium: g,
      flyTo: m,
      getViewer: v
    } = Pg();
    vg(async () => {
      await p(i.camera);
    });
    const p = async (b) => {
      try {
        await mg(), C(), g(), h = await f(a.value, { ...i, mapConfig: b }), u = new P.ScreenSpaceEventHandler(h.scene.canvas), h.scene.moon.show = !1, h.scene.fog.enabled = !1, h.scene.sun.show = !1, P.FeatureDetection.supportsImageRenderingPixelated() && (h.resolutionScale = window.devicePixelRatio), _(), o("ready", h);
      } catch (S) {
        o("error", S);
      }
    }, _ = () => {
      !u || u.isDestroyed() || u.setInputAction((b) => {
        const S = h.scene.camera.pickEllipsoid(
          b.position,
          h.scene.globe.ellipsoid
        );
        if (!S) return;
        const I = P.Cartographic.fromCartesian(S), N = h.scene.pick(b.position);
        P.defined(N) ? o("click", {
          lon: P.Math.toDegrees(I.longitude),
          lat: P.Math.toDegrees(I.latitude),
          feature: N
        }) : o("click", { lon: P.Math.toDegrees(I.longitude), lat: P.Math.toDegrees(I.latitude) });
      }, P.ScreenSpaceEventType.LEFT_CLICK);
    }, w = () => {
      !u || u.isDestroyed() || u.removeInputAction(P.ScreenSpaceEventType.LEFT_CLICK);
    }, C = () => {
      u && !u.isDestroyed() && u.destroy(), u = null;
    };
    return yg(() => {
      C(), g(), h = null;
    }), e({
      initMap: p,
      flyTo: m,
      getViewer: v,
      startClick: _,
      stopClick: w
    }), (b, S) => (pg(), _g("div", Ng, [
      wg("div", {
        ref_key: "cesiumContainer",
        ref: a,
        class: "cesium-viewer",
        id: n.id
      }, null, 8, Tg),
      xg(b.$slots, "tool", {}, void 0, !0)
    ]));
  }
}, ao = /* @__PURE__ */ Lg(Og, [["__scopeId", "data-v-83150b8b"]]), Ag = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAHdElEQVR4Aexbe2wURRj/5o67QoyJCog87iDKowUCoRIx8R8M1RDkYQgqIg+pwSrFlmL6UpRG0IbWBJtILY0EKcQWG/+AlhIEaU0oQgoSwXJXa4A+ACMa5ZHWu/Zu/M0VynG9u+7M7hYMXObb/Wa+929nZ6d7Vwvd45/7ANzjE4Duz4D7M6APEagfYZvmHmnf4B4ZU9jgtJe5nLYDbqd9D/jtbqftM5fTnuN22Kb2YUrm3wKNI23xDU77OhR62mphR4nT+8T525zoFUYsAcXOAb+UiKUyonXEWB10m90j7VtdjpjnyeSPaWvAaUfME26nbZOPs2MoMAd1TARpbQ7ilMgY3+92xhSdGREzRquhrJ4pAIipbGP8GBFbTUT9QDoaT7JaqbbBYVupw0lEU0tEiaLAjXuaialMNFDRRQ8zzvlgzthmt8O+tYdQ54ChAKD4C8hnDsicxigRt9VBI50bBsCN4ocZmVx4X2wGbrHs8DL5UUMAQPF7ELoPikcUNNxin7gcttfB6m66AUDx3yAL86Y9nIdrjLFtDSNsT4WTyYzpAuCMs794jr8kE9BIXW5hq/T60wWAhfzL9Cag036J7GYpNJ4yADe2rItDHWrpY2MUUBNnQaJz8yx4GcJmSdcsUAYAW9YFMokG62IRC3TFWZDo3DwLXpLmNDrt4yVtutXVASCa3+3lDjOdRC+rpqAEgGtEv+kIaNr+HL6lGopQno2wlYoVUGbMIlb/AH83HLB+TDg5ih4ihY8SAET8YYVY0iYoTLONnWyjNCsHKSoBwIn1CQAyCyPzsb4DgBHddQAQY30HAEnMGxY03cxkGfH+Kv4lSrnlHkX9c6sXnePRxVGl/qjS24WMc805BVsqAcA5UwoWHFgLL5Ocn9RykonRnTOmm2YAWLeVPMMlTCyKF0UJAM7oF625iSL0gKA1jpVbNOcU7FMJAGun9YdgJ73xAoTedHTJGZ0ac6G9VcWHEgAiGGOEt76SIbk5UHDi30tm0q2uBICw9hM/Is5SBNSk9DUqM85+jKTa27gyABYLbYdzD+iONizIB2KbveWqSSgDMO5cx8+c8c2qgY2y85ElX48vZQBE0A5uBQDsT8HfCcLm5/PxzZ4DemLrAmBS879nsQABBD0pqNni0fqb1dcvT836lpUuAISbuGZvDpL5SvB9Sdj5pY2+2N6iN6ZuAEQC1zq9yXhHUC34viDOWHpcs6fSiFiGADD1IrVZGAMIdM6IpKL5YMS+jGvyfBpNR0ZmCAAi4Ngmr8vXBYJf9M0hdriz3ZNmpG/DABBJTWjy7CPOxUwQXYMJTxvuT5twma4b6dhQAERisS0dRdjw5greSOKcp8D3cSN9Cl+GAyCc4snwHjHaJngjCFvdNXEt3lIjfIX6MAUAESS2yZtInPYJXiflj2vxbNLpI6K5aQCIiLEt3lmM6KTgFWlHbLM3Q9FWk5mpAIgMxjV747Em/C54SapA8UslbaTVTQUgPz//gY0bN86tWLVBaqd4beCQS7uT1/8E+2nSFUkaGA5Abm7udBSdk5eXV42V+zpjbDdyyqpY+RF12Oxgo7eLoydS9avvDGWMrYP9Ufj5C7QTYCSBev2tYXTvPaWGAYAk3wQdt1qt1SJ5hBJfoOLU1TheIHyXmEWeBx7sGghzPDvpaTo+c2Go5BEMvAYwikCnAcIexJmNMUOaIQAgIfE7oS3I6ElQxObDDDj2RiZ5Bj/WQ+dSwov0a8L8HuOhAwBB/B6pAkAUh8pU+roBwHT/A4F7/Z3QlClTaPny5bTi3XQav/co9Z84BWZdbeDqtTR96y5KTU2lRYsW0dixY7sEUY4AYgWA1/0HmC4AkMBhTPfBUfIMiGbMmEEJCQk0aNCgQL/fkKE0rKiM7OMmkCh+UNoHgXFxGD58OM2bN48mT54sur1RYL3pTSmaXBkALHaPw/EzoF5bfHx8Dx2bYxQNK/yagosPVoqLiwvuRuRxARZHFGoQKANgs9k0f0N85Ej4F8gxo2PDptje3k4nTpwIKwsdBABDQsdk+soAdHR0nNUaqLa2lkpLS8ntdpPP54toduXKlUDhJSUl1NjYGFEvRHAqpC/VVQYgOzv7b0TSvBK3trZSRUUFFRQUUHl5OVVVVVFNTU2AKisrqaysjIqLi+nQoUN09epVuNbWAGimNs3wWsoACHcZGRlJOEu9nUHCdP78eaqvr6e6uroAuVwuamlRer2XmZWVdRg5KDddAIioACEd50UgbTctFPU23PcVfr9/JmLn6fWlGwCRABIpBYl/dkpCckb8CSzc3kZ47l/GQAloTnp6+lxc+f3gdTdDALiZBUAoRnKzkKwDYysNAOMyfBXias8eMGCAA/6XgQx5G4z8As1QAAIeccjMzGxFol8IMNra2mIAxHMYXohiksF/CL4AtBN9MVuqMLYD/U3orwX/FvgFWCuehY9H4SsZV3tvSkqKKd9DmgIACuhuOTk5XgBxEMXsQjGF4NeDXw1agv4snF/A2FKc16D/Mfgt4L/FU6am24mJjOkAmJi7Ia7/9wDoReE/AAAA///JCpxeAAAABklEQVQDAOWoOZ/unNXTAAAAAElFTkSuQmCC";
class p1 {
  constructor(e, t) {
    var i, o, a, u, h;
    this.viewer = e, this.config = {
      // 几何-边框宽度
      lineWidth: (t == null ? void 0 : t.lineWidth) || 2,
      color: (t == null ? void 0 : t.color) || "#00ffff",
      mouseHints: {
        show: ((i = t == null ? void 0 : t.mouseHints) == null ? void 0 : i.show) || !1,
        text: ((o = t == null ? void 0 : t.mouseHints) == null ? void 0 : o.text) || "左键拾取,双击结束"
      },
      isReserve: (t == null ? void 0 : t.isReserve) || !1,
      pointSize: (t == null ? void 0 : t.pointSize) || 10,
      icon: {
        url: ((a = t == null ? void 0 : t.icon) == null ? void 0 : a.url) || Ag,
        width: ((u = t == null ? void 0 : t.icon) == null ? void 0 : u.width) || 32,
        height: ((h = t == null ? void 0 : t.icon) == null ? void 0 : h.height) || 32
      }
    }, this.handler = null, this.label = null, this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(P.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  }
  moveLabel() {
    this.handler && this.config.mouseHints.show && this.handler.setInputAction((e) => {
      const t = this.viewer.scene.camera.pickEllipsoid(e.endPosition), i = P.Cartographic.fromCartesian(t), o = P.Math.toDegrees(i.longitude), a = P.Math.toDegrees(i.latitude);
      this.addLabel(t, [o, a]);
    }, P.ScreenSpaceEventType.MOUSE_MOVE);
  }
  /**
   * 拾取点
   * @param callback
   */
  pickPoint(e, t = []) {
    let i = null, o = t;
    const a = () => {
      i ? i.position = P.Cartesian3.fromDegrees(o[0], o[1]) : i = this.viewer.entities.add({
        position: P.Cartesian3.fromDegrees(o[0], o[1]),
        point: {
          pixelSize: this.config.pointSize,
          color: P.Color.fromCssColorString(this.config.color),
          outlineColor: P.Color.WHITE,
          outlineWidth: 2
        }
      });
    }, u = () => {
      this.handler = new P.ScreenSpaceEventHandler(this.viewer.scene.canvas), this.handler.setInputAction((h) => {
        const f = this.viewer.scene.pick(h.position);
        P.defined(f) && f.id === i && (document.body.style.cursor = "move", this.viewer.scene.screenSpaceCameraController.enableRotate = !1, this.viewer.scene.screenSpaceCameraController.enableTranslate = !1, this.viewer.scene.screenSpaceCameraController.enableZoom = !1, this.handler.setInputAction((g) => {
          const m = this.viewer.scene.camera.pickEllipsoid(g.endPosition);
          if (!m) return;
          const v = P.Cartographic.fromCartesian(m), p = P.Math.toDegrees(v.longitude), _ = P.Math.toDegrees(v.latitude);
          o = [p, _], i.position = P.Cartesian3.fromDegrees(o[0], o[1]);
        }, P.ScreenSpaceEventType.MOUSE_MOVE));
      }, P.ScreenSpaceEventType.LEFT_DOWN), this.handler.setInputAction((h) => {
        this.viewer.scene.screenSpaceCameraController.enableRotate = !0, this.viewer.scene.screenSpaceCameraController.enableTranslate = !0, this.viewer.scene.screenSpaceCameraController.enableZoom = !0, document.body.style.cursor = "default", this.handler.removeInputAction(P.ScreenSpaceEventType.MOUSE_MOVE);
        const f = this.viewer.scene.pick(h.position);
        P.defined(f) && f.id === i && e && e(o);
      }, P.ScreenSpaceEventType.LEFT_UP);
    };
    if (o && o.length) {
      a(), u();
      return;
    }
    this.handler = new P.ScreenSpaceEventHandler(this.viewer.scene.canvas), this.moveLabel(), this.handler.setInputAction((h) => {
      const f = this.viewer.scene.camera.pickEllipsoid(h.position), g = P.Cartographic.fromCartesian(f);
      let m = P.Math.toDegrees(g.longitude), v = P.Math.toDegrees(g.latitude);
      o = [m, v], a(), !this.config.isReserve && this.viewer.entities.remove(i), this.destroy(), this.removeLabel(), m && v && (this.config.isReserve && u(), e && e(o));
    }, P.ScreenSpaceEventType.LEFT_CLICK);
  }
  /**
   * 拾取图标点
   */
  pickPointIcon(e, t = []) {
    let i = null, o = t, a = null;
    const u = () => {
      i ? i.position = P.Cartesian3.fromDegrees(o[0], o[1]) : i = this.viewer.entities.add({
        position: P.Cartesian3.fromDegrees(o[0], o[1]),
        billboard: {
          image: this.config.icon.url,
          scaleByDistance: new P.NearFarScalar(5e5, 1, 1e6, 0.5),
          show: !0,
          horizontalOrigin: P.HorizontalOrigin.CENTER,
          verticalOrigin: P.VerticalOrigin.BOTTOM,
          width: this.config.icon.width,
          height: this.config.icon.height
        }
      });
    }, h = () => {
      this.handler = new P.ScreenSpaceEventHandler(this.viewer.scene.canvas), this.handler.setInputAction((f) => {
        const g = this.viewer.scene.pick(f.position);
        P.defined(g) && g.id === i && (a = g.id, document.body.style.cursor = "move", this.viewer.scene.screenSpaceCameraController.enableRotate = !1, this.viewer.scene.screenSpaceCameraController.enableTranslate = !1, this.viewer.scene.screenSpaceCameraController.enableZoom = !1, this.handler.setInputAction((m) => {
          const v = this.viewer.scene.camera.pickEllipsoid(m.endPosition);
          if (!v) return;
          const p = P.Cartographic.fromCartesian(v), _ = P.Math.toDegrees(p.longitude), w = P.Math.toDegrees(p.latitude);
          o = [_, w], i.position = P.Cartesian3.fromDegrees(o[0], o[1]);
        }, P.ScreenSpaceEventType.MOUSE_MOVE));
      }, P.ScreenSpaceEventType.LEFT_DOWN), this.handler.setInputAction((f) => {
        this.viewer.scene.screenSpaceCameraController.enableRotate = !0, this.viewer.scene.screenSpaceCameraController.enableTranslate = !0, this.viewer.scene.screenSpaceCameraController.enableZoom = !0, document.body.style.cursor = "default", this.handler.removeInputAction(P.ScreenSpaceEventType.MOUSE_MOVE), a === i && e && e(o);
      }, P.ScreenSpaceEventType.LEFT_UP);
    };
    if (o && o.length) {
      u(), h();
      return;
    }
    this.handler = new P.ScreenSpaceEventHandler(this.viewer.scene.canvas), this.moveLabel(), this.handler.setInputAction((f) => {
      const g = this.viewer.scene.camera.pickEllipsoid(f.position), m = P.Cartographic.fromCartesian(g);
      let v = P.Math.toDegrees(m.longitude), p = P.Math.toDegrees(m.latitude);
      o = [v, p], u(), !this.config.isReserve && this.viewer.entities.remove(i), this.destroy(), this.removeLabel(), v && p && (this.config.isReserve && h(), e && e(o));
    }, P.ScreenSpaceEventType.LEFT_CLICK);
  }
  /**
   * 拾取线
   * @param callback
   * @param data
   */
  pickLine(e, t = []) {
    let i = t, o = null, a = null, u = [], h = -1;
    const f = () => {
      i.length > 1 && (o ? o.polyline.positions = new P.CallbackProperty(() => i.map((v) => P.Cartesian3.fromDegrees(v[0], v[1])), !1) : o = this.viewer.entities.add({
        polyline: {
          positions: new P.CallbackProperty(() => i.map((v) => P.Cartesian3.fromDegrees(v[0], v[1])), !1),
          width: this.config.lineWidth,
          material: P.Color.fromCssColorString(this.config.color),
          clampToGround: !0,
          zIndex: 1
        }
      }));
    }, g = (v) => {
      u.push(this.viewer.entities.add({
        position: P.Cartesian3.fromDegrees(v[0], v[1]),
        point: {
          pixelSize: this.config.pointSize,
          color: P.Color.fromCssColorString(this.config.color),
          outlineColor: P.Color.WHITE,
          outlineWidth: 2,
          zIndex: 2,
          disableDepthTestDistance: Number.POSITIVE_INFINITY
        }
      }));
    }, m = () => {
      this.handler = new P.ScreenSpaceEventHandler(this.viewer.scene.canvas), this.handler.setInputAction((v) => {
        const p = this.viewer.scene.pick(v.position);
        if (h = -1, P.defined(p)) {
          let _ = u.findIndex((w) => w === p.id);
          _ !== -1 && (h = _, document.body.style.cursor = "move", this.viewer.scene.screenSpaceCameraController.enableRotate = !1, this.viewer.scene.screenSpaceCameraController.enableTranslate = !1, this.viewer.scene.screenSpaceCameraController.enableZoom = !1, this.handler.setInputAction((w) => {
            const C = this.viewer.scene.camera.pickEllipsoid(w.endPosition);
            if (!C) return;
            const b = P.Cartographic.fromCartesian(C), S = P.Math.toDegrees(b.longitude), I = P.Math.toDegrees(b.latitude);
            i[_] = [S, I], o.polyline.positions = new P.CallbackProperty(() => i.map((N) => P.Cartesian3.fromDegrees(N[0], N[1])), !1), u[_].position.setValue(P.Cartesian3.fromDegrees(S, I));
          }, P.ScreenSpaceEventType.MOUSE_MOVE));
        }
      }, P.ScreenSpaceEventType.LEFT_DOWN), this.handler.setInputAction((v) => {
        this.viewer.scene.screenSpaceCameraController.enableRotate = !0, this.viewer.scene.screenSpaceCameraController.enableTranslate = !0, this.viewer.scene.screenSpaceCameraController.enableZoom = !0, document.body.style.cursor = "default", this.handler.removeInputAction(P.ScreenSpaceEventType.MOUSE_MOVE);
        const p = this.viewer.scene.pick(v.position);
        P.defined(p) && h > -1 && e && e(i);
      }, P.ScreenSpaceEventType.LEFT_UP);
    };
    if (i.length > 1) {
      f(), i.forEach((v) => {
        g(v);
      }), m();
      return;
    }
    this.handler = new P.ScreenSpaceEventHandler(this.viewer.scene.canvas), this.handler.setInputAction((v) => {
      const p = this.viewer.scene.camera.pickEllipsoid(v.endPosition);
      if (!p) return;
      const _ = P.Cartographic.fromCartesian(p), w = P.Math.toDegrees(_.longitude), C = P.Math.toDegrees(_.latitude);
      this.addLabel(p, [w, C]), i.length > 0 && (a ? a.polyline.positions = new P.CallbackProperty(() => {
        let b = i[i.length - 1];
        return [
          P.Cartesian3.fromDegrees(b[0], b[1]),
          P.Cartesian3.fromDegrees(w, C)
        ];
      }, !1) : a = this.viewer.entities.add({
        polyline: {
          positions: new P.CallbackProperty(() => {
            let b = i[i.length - 1];
            return [
              P.Cartesian3.fromDegrees(b[0], b[1]),
              P.Cartesian3.fromDegrees(w, C)
            ];
          }, !1),
          width: this.config.lineWidth,
          material: new P.PolylineDashMaterialProperty({
            color: P.Color.fromCssColorString(this.config.color).withAlpha(0.5),
            // 虚线颜色及透明度
            dashLength: 20
            //短划线长度
          })
        }
      }));
    }, P.ScreenSpaceEventType.MOUSE_MOVE), this.handler.setInputAction((v) => {
      const p = this.viewer.scene.camera.pickEllipsoid(v.position);
      if (!p) return;
      const _ = P.Cartographic.fromCartesian(p), w = P.Math.toDegrees(_.longitude), C = P.Math.toDegrees(_.latitude);
      if (i.length > 0) {
        let b = i[i.length - 1][0], S = i[i.length - 1][1];
        if (b === w && S === C)
          return;
      }
      i.push([w, C]), f(), g([w, C]);
    }, P.ScreenSpaceEventType.LEFT_CLICK), this.handler.setInputAction((v) => {
      this.viewer.entities.remove(a), this.destroy(), i.length < 2 ? (this.viewer.entities.remove(u[0]), console.warn("请至少选择两个点")) : (this.config.isReserve ? m() : (this.viewer.entities.remove(o), u.forEach((p) => {
        this.viewer.entities.remove(p);
      })), e && e(i));
    }, P.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  }
  /**
   * 拾取面
   * @param callback
   */
  pickPolygon(e, t = []) {
    let i = t, o = null, a = null, u = null, h = [], f = -1;
    const g = (_) => {
      _.length > 1 && (o ? o.polyline.positions = new P.CallbackProperty(() => _.map((w) => P.Cartesian3.fromDegrees(w[0], w[1])), !1) : o = this.viewer.entities.add({
        polyline: {
          positions: new P.CallbackProperty(() => _.map((w) => P.Cartesian3.fromDegrees(w[0], w[1])), !1),
          width: this.config.lineWidth,
          material: P.Color.fromCssColorString(this.config.color),
          clampToGround: !0,
          zIndex: 1
        }
      }));
    }, m = () => {
      if (i.length > 2) {
        let _ = [];
        i.forEach((w) => {
          _.push(w[0], w[1]);
        }), a ? a.polygon.hierarchy = new P.CallbackProperty(() => new P.PolygonHierarchy(P.Cartesian3.fromDegreesArray(_)), !1) : a = this.viewer.entities.add({
          polygon: {
            hierarchy: new P.CallbackProperty(() => new P.PolygonHierarchy(P.Cartesian3.fromDegreesArray(_)), !1),
            material: P.Color.fromCssColorString(this.config.color).withAlpha(0.5),
            outline: !1
          }
        });
      }
    }, v = (_) => {
      h.push(this.viewer.entities.add({
        position: P.Cartesian3.fromDegrees(_[0], _[1]),
        point: {
          pixelSize: this.config.pointSize,
          color: P.Color.fromCssColorString(this.config.color),
          outlineColor: P.Color.WHITE,
          outlineWidth: 2,
          zIndex: 2,
          disableDepthTestDistance: Number.POSITIVE_INFINITY
        }
      }));
    }, p = () => {
      this.handler = new P.ScreenSpaceEventHandler(this.viewer.scene.canvas), this.handler.setInputAction((_) => {
        const w = this.viewer.scene.pick(_.position);
        if (f = -1, P.defined(w)) {
          let C = h.findIndex((b) => b === w.id);
          C !== -1 && (f = C, document.body.style.cursor = "move", this.viewer.scene.screenSpaceCameraController.enableRotate = !1, this.viewer.scene.screenSpaceCameraController.enableTranslate = !1, this.viewer.scene.screenSpaceCameraController.enableZoom = !1, this.handler.setInputAction((b) => {
            const S = this.viewer.scene.camera.pickEllipsoid(b.endPosition);
            if (!S) return;
            const I = P.Cartographic.fromCartesian(S), N = P.Math.toDegrees(I.longitude), A = P.Math.toDegrees(I.latitude);
            i[C] = [N, A];
            let R = [...i, i[0]];
            g(R);
            let U = [];
            i.forEach((V) => {
              U.push(V[0], V[1]);
            }), a.polygon.hierarchy = new P.CallbackProperty(() => new P.PolygonHierarchy(P.Cartesian3.fromDegreesArray(U)), !1), h[C].position.setValue(P.Cartesian3.fromDegrees(N, A));
          }, P.ScreenSpaceEventType.MOUSE_MOVE));
        }
      }, P.ScreenSpaceEventType.LEFT_DOWN), this.handler.setInputAction((_) => {
        this.viewer.scene.screenSpaceCameraController.enableRotate = !0, this.viewer.scene.screenSpaceCameraController.enableTranslate = !0, this.viewer.scene.screenSpaceCameraController.enableZoom = !0, document.body.style.cursor = "default", this.handler.removeInputAction(P.ScreenSpaceEventType.MOUSE_MOVE);
        const w = this.viewer.scene.pick(_.position);
        P.defined(w) && f > -1 && e && e(i);
      }, P.ScreenSpaceEventType.LEFT_UP);
    };
    if (i.length > 1) {
      let _ = [...i, i[0]];
      g(_), m(), i.forEach((w) => {
        v(w);
      }), p();
      return;
    }
    this.handler = new P.ScreenSpaceEventHandler(this.viewer.scene.canvas), this.handler.setInputAction((_) => {
      const w = this.viewer.scene.camera.pickEllipsoid(_.endPosition);
      if (!w) return;
      const C = P.Cartographic.fromCartesian(w), b = P.Math.toDegrees(C.longitude), S = P.Math.toDegrees(C.latitude);
      if (this.addLabel(w, [b, S]), i.length > 0 && (u ? u.polyline.positions = new P.CallbackProperty(() => {
        let I = i[i.length - 1], N = i[0];
        return [
          P.Cartesian3.fromDegrees(I[0], I[1]),
          P.Cartesian3.fromDegrees(b, S),
          P.Cartesian3.fromDegrees(N[0], N[1])
        ];
      }, !1) : u = this.viewer.entities.add({
        polyline: {
          positions: new P.CallbackProperty(() => {
            let I = i[0], N = i[i.length - 1];
            return [
              P.Cartesian3.fromDegrees(N[0], N[1]),
              P.Cartesian3.fromDegrees(b, S),
              P.Cartesian3.fromDegrees(I[0], I[1])
            ];
          }, !1),
          width: this.config.lineWidth,
          material: new P.PolylineDashMaterialProperty({
            color: P.Color.fromCssColorString(this.config.color).withAlpha(0.5),
            // 虚线颜色及透明度
            dashLength: 20
            //短划线长度
          })
        }
      })), i.length > 1) {
        let I = [];
        i.forEach((N) => {
          I.push(N[0], N[1]);
        }), a ? a.polygon.hierarchy = new P.CallbackProperty(() => {
          let N = I[I.length - 2], A = I[I.length - 1];
          return N !== b && A !== S && I.push(b, S), new P.PolygonHierarchy(P.Cartesian3.fromDegreesArray(I));
        }, !1) : a = this.viewer.entities.add({
          polygon: {
            hierarchy: new P.CallbackProperty(() => {
              let N = I[I.length - 2], A = I[I.length - 1];
              return N !== b && A !== S && I.push(b, S), new P.PolygonHierarchy(P.Cartesian3.fromDegreesArray(I));
            }, !1),
            material: P.Color.fromCssColorString(this.config.color).withAlpha(0.5),
            outline: !1
          }
        });
      }
    }, P.ScreenSpaceEventType.MOUSE_MOVE), this.handler.setInputAction((_) => {
      const w = this.viewer.scene.camera.pickEllipsoid(_.position);
      if (!w) return;
      const C = P.Cartographic.fromCartesian(w), b = P.Math.toDegrees(C.longitude), S = P.Math.toDegrees(C.latitude);
      if (i.length > 0) {
        let I = i[i.length - 1][0], N = i[i.length - 1][1];
        if (I === b && N === S)
          return;
      }
      i.push([b, S]), g(i), v([b, S]);
    }, P.ScreenSpaceEventType.LEFT_CLICK), this.handler.setInputAction((_) => {
      if (this.viewer.entities.remove(u), this.destroy(), i.length < 3)
        h.forEach((w) => {
          this.viewer.entities.remove(w);
        }), this.viewer.entities.remove(o), console.warn("请至少选择三个点");
      else {
        if (!this.config.isReserve)
          this.viewer.entities.remove(o), this.viewer.entities.remove(a), h.forEach((w) => {
            this.viewer.entities.remove(w);
          });
        else {
          let w = [];
          i.forEach((C) => {
            w.push([C[0], C[1]]);
          }), w.push([i[0][0], i[0][1]]), g(w), p();
        }
        e && e(i);
      }
    }, P.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  }
  addLabel(e, t) {
    this.label || (this.label = this.viewer.entities.add({
      label: {
        text: "",
        showBackground: !0,
        font: "14px sans-serif",
        horizontalOrigin: P.HorizontalOrigin.LEFT,
        verticalOrigin: P.VerticalOrigin.TOP,
        pixelOffset: new P.Cartesian2(10, 10),
        fillColor: P.Color.WHITE,
        outlineColor: P.Color.BLACK,
        disableDepthTestDistance: Number.POSITIVE_INFINITY
      }
    })), this.label.position = e, this.label.label.text = this.config.mouseHints.text + `
经度：${t[0]}°
纬度：${t[1]}°`;
  }
  removeLabel() {
    this.label && this.viewer.entities.remove(this.label);
  }
  clear() {
    this.destroy(), this.viewer.entities.removeAll();
  }
  destroy() {
    this.removeLabel(), this.handler && this.handler.destroy(), this.handler = null;
  }
}
class Rg {
  constructor(e) {
    this.viewModelBefore = {}, this.beforeColorStr = [], this.viewer = e;
  }
  addColor(e) {
    const t = this.viewer.imageryLayers.get(0);
    this.viewModelBefore.brightness = t.brightness, this.viewModelBefore.contrast = t.contrast, this.viewModelBefore.hue = t.hue, this.viewModelBefore.saturation = t.saturation, this.viewModelBefore.gamma = t.gamma, t.brightness = e.brightness || 0.6, t.contrast = e.contrast || 1.8, t.gamma = e.gamma || 0.3, t.hue = e.hue || 1, t.saturation = e.saturation || 0;
    const i = this.viewer.scene.globe._surfaceShaderSet.baseFragmentShaderSource.sources, o = this.hexColorToRgba(e.filterRGB);
    for (let a = 0; a < i.length; a++) {
      const u = `color = czm_saturation(color, textureSaturation);
#endif
`;
      let h = `color = czm_saturation(color, textureSaturation);
#endif
`;
      e.invertColor && (h += `
                    color.r = 1.0 - color.r;
                    color.g = 1.0 - color.g;
                    color.b = 1.0 - color.b;
                    `), e.filterRGB.length > 0 && (h += `
                    color.r = color.r * ${o.red}.0/255.0;
                    color.g = color.g * ${o.green}.0/255.0;
                    color.b = color.b * ${o.blue}.0/255.0;
                    `), this.beforeColorStr.push(i[a]), i[a] = i[a].replace(u, h);
    }
  }
  restore() {
    const e = this.viewer.scene.globe._surfaceShaderSet.baseFragmentShaderSource.sources, t = this.viewer.imageryLayers.get(0);
    for (let i = 0; i < e.length; i++)
      e[i] = this.beforeColorStr[i], t.brightness = this.viewModelBefore.brightness, t.contrast = this.viewModelBefore.contrast, t.gamma = this.viewModelBefore.gamma, t.hue = this.viewModelBefore.hue, t.saturation = this.viewModelBefore.saturation;
  }
  hexColorToRgba(e) {
    if (!e.startsWith("#"))
      throw new Error('Invalid hex color format. Color should start with "#".');
    const t = e.slice(1), i = t.length === 8;
    if (t.length !== 6 && t.length !== 8)
      throw new Error(`Invalid hex color length. Expected 6 or 8 characters, got ${t.length}.`);
    const o = (p) => parseInt(p, 16), a = t.substring(0, 2), u = t.substring(2, 4), h = t.substring(4, 6), f = o(a), g = o(u), m = o(h);
    let v = 1;
    if (i) {
      const p = t.substring(6, 8);
      v = o(p);
    }
    return {
      red: f,
      green: g,
      blue: m,
      alpha: v
    };
  }
}
class Dg {
  constructor(e, t) {
    this.viewer = e, this.config = {
      width: 60,
      height: 60,
      ...t
    }, this.billboardCollection = new P.BillboardCollection(), this.layer = this.viewer.scene.primitives.add(this.billboardCollection), this.data = [];
  }
  /**
   * 新增数据
   */
  setData(e) {
    if (this.clearLayer(), !Array.isArray(e)) {
      console.error("data must be an array.");
      return;
    }
    this.data = e, e.forEach((t) => {
      this.addLayer(t);
    });
  }
  /**
   * 添加图标图层
   * @param {Object} options 图标配置参数
   */
  addLayer(e) {
    if (!e || !e.geometry || !e.geometry.coordinates) {
      console.error("缺少coordinates字段");
      return;
    }
    let t = e.geometry.coordinates[0], i = e.geometry.coordinates[1], o = e.geometry.coordinates[2] || 0;
    const a = {
      ...this.config,
      scaleByDistance: new P.NearFarScalar(15e4, 1, 4e5, 0.5),
      position: P.Cartesian3.fromDegrees(t, i, o),
      image: e.properties.icon || e.icon || this.config.icon,
      width: this.config.width || 60,
      // 默认宽度
      height: this.config.height || 60,
      // 默认高度
      verticalOrigin: P.VerticalOrigin.BOTTOM,
      // 从底部锚定
      id: e.properties.id || Ft(),
      // 确保有唯一的标识符
      disableDepthTestDistance: this.config.disableDepthTestDistance || 100,
      // 在相机100米时进行深度测试
      color: e.properties.color ? new P.Color.fromCssColorString(e.properties.color) : this.config.color ? new P.Color.fromCssColorString(this.config.color) : new P.Color.fromCssColorString("#ffffff")
    }, u = this.billboardCollection.add(a);
    return u.properties = {
      ...e.properties
    }, u;
  }
  /**
   * 移除指定的图标
   * @param {Object} billboard Billboard对象
   */
  removeLayer(e) {
    if (!e) {
      console.error("Billboard is required to remove.");
      return;
    }
    this.billboardCollection.remove(e);
  }
  /**
   * 清空所有图标
   */
  clearLayer() {
    this.billboardCollection.removeAll();
  }
  /**
   * 显示
   */
  show() {
    this.billboardCollection && (this.billboardCollection.show = !0);
  }
  /**
   * 隐藏
   */
  hide() {
    this.billboardCollection && (this.billboardCollection.show = !1);
  }
  /**
   * 根据ID获取图标
   * @param {string | symbol} id 图标的唯一标识符
   */
  getLayerById(e) {
    if (!e) {
      console.error("ID is required to get.");
      return;
    }
    for (let t = 0; t < this.billboardCollection.length; t++) {
      const i = this.billboardCollection.get(t);
      if (i.id === e)
        return i;
    }
    return null;
  }
  /**
   * 根据ID移除图标
   * @param {string | symbol} id 图标的唯一标识符
   */
  removeLayerById(e) {
    if (!e) {
      console.error("ID is required to remove.");
      return;
    }
    for (let t = 0; t < this.billboardCollection.length; t++) {
      const i = this.billboardCollection.get(t);
      if (i.id === e) {
        this.billboardCollection.remove(i);
        break;
      }
    }
  }
  /**
   * 销毁
   */
  destroy() {
    this.billboardCollection.removeAll(), this.viewer.scene.primitives.remove(this.billboardCollection), this.billboardCollection = null, this.viewer = null, this.data = null;
  }
}
class Fg {
  constructor(e, t) {
    this.viewer = e, this.config = {
      text: "label",
      fontSize: "12px",
      color: "#ffffff",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      showBackground: !1,
      offsetZ: 0,
      offsetY: 0,
      ...t
    }, this.labelCollection = new P.LabelCollection(), this.layer = this.viewer.scene.primitives.add(this.labelCollection);
  }
  /**
   * 新增数据
   */
  setData(e) {
    if (this.clearLayer(), !Array.isArray(e)) {
      console.error("data must be an array.");
      return;
    }
    e.forEach((t) => {
      this.addLayer(t);
    });
  }
  /**
   * 添加label图层
   * @param {Object} options 图标配置参数
   */
  addLayer(e) {
    if (!e || !e.geometry || !e.geometry.coordinates) {
      console.error("缺少coordinates字段");
      return;
    }
    let t = e.geometry.coordinates[0], i = e.geometry.coordinates[1], o = e.geometry.coordinates[2] || 0;
    const a = {
      scaleByDistance: new P.NearFarScalar(5e5, 1, 1e6, 0.5),
      position: P.Cartesian3.fromDegrees(t, i, o),
      text: e.properties.text || e.text || this.config.text,
      font: this.config.fontSize || "12px",
      horizontalOrigin: P.HorizontalOrigin.CENTER,
      verticalOrigin: P.VerticalOrigin.BOTTOM,
      // 从底部锚定
      pixelOffset: new P.Cartesian2(this.config.offsetZ || 0, this.config.offsetY || 0),
      backgroundColor: this.config.backgroundColor ? new P.Color.fromCssColorString(this.config.backgroundColor) : P.Color(0, 0, 0, 0.5),
      showBackground: this.config.showBackground || !1,
      fillColor: this.config.color ? new P.Color.fromCssColorString(this.config.color) : P.Color.WHITE,
      id: e.properties.id || Ft()
      // 确保有唯一的标识符
    }, u = this.labelCollection.add(a);
    return u.properties = {
      ...e.properties
    }, u;
  }
  /**
   * 移除指定的label
   * @param {Object} label label对象
   */
  removeLayer(e) {
    if (!e) {
      console.error("Billboard is required to remove.");
      return;
    }
    this.labelCollection.remove(e);
  }
  /**
   * 清空所有label
   */
  clearLayer() {
    this.labelCollection.removeAll();
  }
  /**
   * 显示
   */
  show() {
    this.labelCollection && (this.labelCollection.show = !0);
  }
  /**
   * 隐藏
   */
  hide() {
    this.labelCollection && (this.labelCollection.show = !1);
  }
  /**
   * 根据ID获取label实例
   * @param {string | symbol} id label的唯一标识符
   * @returns {Object | null} label实例，如果没有找到则返回null
   */
  getLayerById(e) {
    if (!e) {
      console.error("ID is required to get.");
      return;
    }
    for (let t = 0; t < this.labelCollection.length; t++) {
      const i = this.labelCollection.get(t);
      if (i.id === e)
        return i;
    }
    return null;
  }
  /**
   * 根据ID移除label
   * @param {string | symbol} id label的唯一标识符
   */
  removeLayerById(e) {
    if (!e) {
      console.error("ID is required to remove.");
      return;
    }
    for (let t = 0; t < this.labelCollection.length; t++) {
      const i = this.labelCollection.get(t);
      if (i.id === e) {
        this.labelCollection.remove(i);
        break;
      }
    }
  }
  /**
   * 销毁
   */
  destroy() {
    this.labelCollection.removeAll(), this.viewer.scene.primitives.remove(this.layer), this.layer = null, this.labelCollection = null;
  }
}
class Bg {
  constructor(e, t) {
    this.viewer = e, this.config = {
      type: "default",
      color: "#ffffff",
      width: 2,
      ...t
    }, this.polylineCollection = new P.PolylineCollection(), this.layer = this.viewer.scene.primitives.add(this.polylineCollection);
  }
  /**
   * 设置数据
   */
  setData(e) {
    if (this.clearLayer(), !Array.isArray(e)) {
      console.error("data must be an array.");
      return;
    }
    e.forEach((t) => this.addLayer(t));
  }
  /**
   * 根据type获取材质
   */
  getMaterial(e, t = {}) {
    var o, a, u, h, f, g, m, v;
    const i = t.color ? P.Color.fromCssColorString(t.color) : P.Color.fromCssColorString(this.config.color);
    switch (e) {
      case "default":
        return P.Material.fromType("Color", {
          color: i
        });
      case "dash":
        return P.Material.fromType("PolylineDash", {
          color: i,
          dashLength: (t == null ? void 0 : t.dashLength) || ((o = this.config) == null ? void 0 : o.dashLength) || 16,
          gapColor: t != null && t.gapColor ? new P.Color.fromCssColorString(t == null ? void 0 : t.gapColor) : (a = this.config) != null && a.gapColor ? new P.Color.fromCssColorString((u = this.config) == null ? void 0 : u.gapColor) : P.Color.TRANSPARENT
        });
      case "glow":
        return P.Material.fromType("PolylineGlow", {
          glowPower: t.glowPower || ((h = this.config) == null ? void 0 : h.glowPower) || 0.25,
          taperPower: t.taperPower || ((f = this.config) == null ? void 0 : f.taperPower) || 1,
          color: i
        });
      case "outline":
        return P.Material.fromType("PolylineOutline", {
          color: i,
          outlineColor: t.outlineColor ? P.Color.fromCssColorString(t.outlineColor) : (g = this.config) != null && g.outlineColor ? new P.Color.fromCssColorString((m = this.config) == null ? void 0 : m.outlineColor) : new P.Color.fromCssColorString("#ff0000"),
          outlineWidth: t.outlineWidth || ((v = this.config) == null ? void 0 : v.outlineWidth) || 1
        });
      case "arrow":
        return P.Material.fromType("PolylineArrow", {
          color: i
        });
      default:
        return P.Material.fromType("Color", {
          color: i
        });
    }
  }
  /**
   * 添加线
   */
  addLayer(e) {
    var h, f, g, m;
    if (!((h = e == null ? void 0 : e.geometry) != null && h.coordinates)) {
      console.error("缺少coordinates字段");
      return;
    }
    const t = e.geometry.coordinates, i = [];
    t.forEach((v) => {
      i.push(v[0], v[1]);
    });
    const o = ((f = e.properties) == null ? void 0 : f.type) || this.config.type, a = this.getMaterial(o, e.properties), u = this.polylineCollection.add({
      positions: P.Cartesian3.fromDegreesArray(i),
      width: ((g = e == null ? void 0 : e.properties) == null ? void 0 : g.width) || this.config.width,
      material: a,
      id: ((m = e.properties) == null ? void 0 : m.id) || Ft()
    });
    return u.properties = {
      ...e.properties
    }, u;
  }
  /**
   * 移除
   */
  removeLayer(e) {
    e && this.polylineCollection.remove(e);
  }
  /**
   * 清空
   */
  clearLayer() {
    this.polylineCollection.removeAll();
  }
  /**
   * 显示
   */
  show() {
    this.polylineCollection && (this.polylineCollection.show = !0);
  }
  /**
   * 隐藏
   */
  hide() {
    this.polylineCollection && (this.polylineCollection.show = !1);
  }
  /**
   * 根据ID删除
   */
  removeLayerById(e) {
    const t = this.polylineCollection._polylines;
    for (let i = 0; i < t.length; i++)
      if (t[i].id === e) {
        this.polylineCollection.remove(t[i]);
        break;
      }
  }
  /**
   * 销毁
   */
  destroy() {
    this.viewer.scene.primitives.remove(this.layer), this.polylineCollection = null, this.layer = null;
  }
}
class Gg {
  constructor(e, t) {
    this.viewer = e, this.config = {
      width: 2,
      color: "#ffffff",
      ...t
    }, this.linePrimitive = null, this.data = [];
  }
  /**
   * 新增数据
   */
  setData(e) {
    if (!Array.isArray(e)) {
      console.error("data must be an array.");
      return;
    }
    this.data = e, this.clearLayer();
    let t = [];
    e.forEach((a) => {
      var g;
      let u = a.geometry.coordinates, h = [];
      u.forEach((m) => {
        h.push(m[0], m[1]);
      });
      const f = new P.PolylineGeometry({
        positions: P.Cartesian3.fromDegreesArray(h),
        width: ((g = a == null ? void 0 : a.properties) == null ? void 0 : g.width) || this.config.width,
        vertexFormat: P.PolylineMaterialAppearance.VERTEX_FORMAT
      });
      f.properties = {
        ...a.properties
      }, t.push(
        new P.GeometryInstance({
          geometry: f,
          id: a.properties.id || Ft(),
          attributes: {
            color: P.ColorGeometryInstanceAttribute.fromColor(
              a.properties.color ? new P.Color.fromCssColorString(a.properties.color) : new P.Color.fromCssColorString(this.config.color)
            )
          }
        })
      );
    });
    const i = new P.PolylineColorAppearance(
      {
        translucent: !1,
        renderState: P.RenderState.fromCache({
          depthTest: { enabled: !0 },
          depthMask: !0,
          //写入深度，防止颜色污染
          blending: P.BlendingState.ALPHA_BLEND
        })
      }
    ), o = new P.Primitive({
      geometryInstances: t,
      appearance: i,
      asynchronous: !1,
      // 设置较低的绘制顺序，让线先绘制
      depthFailAppearance: void 0
    });
    this.linePrimitive = this.viewer.scene.primitives.add(o, 0), console.log(this.linePrimitive, "linePrimitive");
  }
  /**
   * 清空所有线
   */
  clearLayer() {
    this.linePrimitive && (this.viewer.scene.primitives.remove(this.linePrimitive), this.linePrimitive = null);
  }
  /**
   * 显示
   */
  show() {
    this.linePrimitive && (this.linePrimitive.show = !0);
  }
  /**
   * 隐藏
   */
  hide() {
    this.linePrimitive && (this.linePrimitive.show = !1);
  }
  /**
   * 根据ID获取线对象
   * @param {string | symbol} id 线的唯一标识符
   */
  getLayerById(e) {
    return this.linePrimitive.getGeometryInstanceAttributes(e);
  }
  /**
   * 根据Id获取线数据
   */
  getLayerDataById(e) {
    let t = null;
    return t = this.data.find((i) => i.properties.id === e), t;
  }
  /**
   * 销毁
   */
  destroy() {
    this.clearLayer();
  }
}
let vi = 3.141592653589793 * 3e3 / 180, vt = 3.141592653589793, hu = 6378245, fu = 0.006693421622965943;
class gu {
  /**
   * BD-09 To GCJ-02
   * @param lng
   * @param lat
   * @returns {number[]}
   */
  static BD09ToGCJ02(e, t) {
    let i = +e - 65e-4, o = +t - 6e-3, a = window.Math.sqrt(i * i + o * o) - 2e-5 * window.Math.sin(o * vi), u = window.Math.atan2(o, i) - 3e-6 * window.Math.cos(i * vi), h = a * window.Math.cos(u), f = a * window.Math.sin(u);
    return [h, f];
  }
  /**
   * GCJ-02 To BD-09
   * @param lng
   * @param lat
   * @returns {number[]}
   * @constructor
   */
  static GCJ02ToBD09(e, t) {
    t = +t, e = +e;
    let i = window.Math.sqrt(e * e + t * t) + 2e-5 * window.Math.sin(t * vi), o = window.Math.atan2(t, e) + 3e-6 * window.Math.cos(e * vi), a = i * window.Math.cos(o) + 65e-4, u = i * window.Math.sin(o) + 6e-3;
    return [a, u];
  }
  /**
   * WGS-84 To GCJ-02
   * @param lng
   * @param lat
   * @returns {number[]}
   */
  static WGS84ToGCJ02(e, t) {
    if (t = +t, e = +e, this.out_of_china(e, t))
      return [e, t];
    {
      let i = this.delta(e, t);
      return [e + i[0], t + i[1]];
    }
  }
  /**
   * GCJ-02 To WGS-84
   * @param lng
   * @param lat
   * @returns {number[]}
   * @constructor
   */
  static GCJ02ToWGS84(e, t) {
    if (t = +t, e = +e, this.out_of_china(e, t))
      return [e, t];
    {
      let i = this.delta(e, t), o = e + i[0], a = t + i[1];
      return [e * 2 - o, t * 2 - a];
    }
  }
  /**
   *
   * @param lng
   * @param lat
   * @returns {number[]}
   */
  static delta(e, t) {
    let i = this.transformLng(e - 105, t - 35), o = this.transformLat(e - 105, t - 35);
    const a = t / 180 * vt;
    let u = window.Math.sin(a);
    u = 1 - fu * u * u;
    const h = window.Math.sqrt(u);
    return i = i * 180 / (hu / h * window.Math.cos(a) * vt), o = o * 180 / (hu * (1 - fu) / (u * h) * vt), [i, o];
  }
  /**
   *
   * @param lng
   * @param lat
   * @returns {number}
   */
  static transformLng(e, t) {
    t = +t, e = +e;
    let i = 300 + e + 2 * t + 0.1 * e * e + 0.1 * e * t + 0.1 * window.Math.sqrt(window.Math.abs(e));
    return i += (20 * window.Math.sin(6 * e * vt) + 20 * window.Math.sin(2 * e * vt)) * 2 / 3, i += (20 * window.Math.sin(e * vt) + 40 * window.Math.sin(e / 3 * vt)) * 2 / 3, i += (150 * window.Math.sin(e / 12 * vt) + 300 * window.Math.sin(e / 30 * vt)) * 2 / 3, i;
  }
  /**
   *
   * @param lng
   * @param lat
   * @returns {number}
   */
  static transformLat(e, t) {
    t = +t, e = +e;
    let i = -100 + 2 * e + 3 * t + 0.2 * t * t + 0.1 * e * t + 0.2 * window.Math.sqrt(window.Math.abs(e));
    return i += (20 * window.Math.sin(6 * e * vt) + 20 * window.Math.sin(2 * e * vt)) * 2 / 3, i += (20 * window.Math.sin(t * vt) + 40 * window.Math.sin(t / 3 * vt)) * 2 / 3, i += (160 * window.Math.sin(t / 12 * vt) + 320 * window.Math.sin(t * vt / 30)) * 2 / 3, i;
  }
  /**
   *
   * @param lng
   * @param lat
   * @returns {boolean}
   */
  static out_of_china(e, t) {
    return t = +t, e = +e, !(e > 73.66 && e < 135.05 && t > 3.86 && t < 53.55);
  }
}
class qg extends P.WebMercatorTilingScheme {
  constructor(e) {
    super(e);
    let t = new P.WebMercatorProjection();
    this._projection.project = function(i, o) {
      return o = gu.WGS84ToGCJ02(
        P.Math.toDegrees(i.longitude),
        P.Math.toDegrees(i.latitude)
      ), o = t.project(
        new P.Cartographic(
          P.Math.toRadians(o[0]),
          P.Math.toRadians(o[1])
        )
      ), new P.Cartesian2(o.x, o.y);
    }, this._projection.unproject = function(i, o) {
      let a = t.unproject(i);
      return o = gu.GCJ02ToWGS84(
        P.Math.toDegrees(a.longitude),
        P.Math.toDegrees(a.latitude)
      ), new P.Cartographic(
        P.Math.toRadians(o[0]),
        P.Math.toRadians(o[1])
      );
    };
  }
}
class zg {
  constructor(e, t) {
    if (!e) {
      console.error("viewer is required.");
      return;
    }
    if (!t || !t.url) {
      console.error("url is required.");
      return;
    }
    this.viewer = e, this.baseMapLayer = null, this.isDestroyed = !1, this.theme = null, this.config = {
      url: t == null ? void 0 : t.url,
      token: (t == null ? void 0 : t.token) || "",
      maximumLevel: (t == null ? void 0 : t.maximumLevel) || 18,
      minimumLevel: (t == null ? void 0 : t.minimumLevel) || 3,
      rectangle: t == null ? void 0 : t.rectangle,
      themeColor: (t == null ? void 0 : t.themeColor) || ""
    };
    let i = this.config.token ? new P.Resource({
      url: this.config.url,
      headers: {
        Authorization: this.config.token
      }
    }) : this.config.url;
    this.baseMapLayer = new P.ImageryLayer(
      new P.UrlTemplateImageryProvider({
        url: i,
        maximumLevel: this.config.maximumLevel,
        minimumLevel: this.config.minimumLevel,
        rectangle: this.config.rectangle,
        tilingScheme: new qg()
      })
    ), console.log(this.baseMapLayer, "this.baseMapLayer"), e.imageryLayers.add(this.baseMapLayer, 0), this.config.themeColor && (this.theme = new Rg(e), this.theme.addColor({
      invertColor: !0,
      filterRGB: this.config.themeColor
    }));
  }
  getBaseMapLayer() {
    return this.isDestroyed ? (console.error("Layer has been destroyed."), null) : this.baseMapLayer;
  }
  removeColor() {
    this.theme && this.theme.restore(), this.theme = null;
  }
  removeLayer() {
    if (!this.viewer || this.viewer.isDestroyed()) {
      this.theme = null, this.baseMapLayer = null;
      return;
    }
    this.removeColor(), this.viewer.scene.imageryLayers.remove(this.baseMapLayer), this.baseMapLayer = null;
  }
}
class Yg {
  /**
   * 创建3D楼宇图层实例
   * @param {Cesium.Viewer} viewer - Cesium Viewer实例
   * @param {Object} config - 图层配置
   * @param {string} config.url - 3D Tileset的URL
   * @param {boolean} [config.show=true] - 是否显示图层
   */
  constructor(e, t) {
    if (!e)
      throw new Error("Viewer is required.");
    if (!t || !t.url)
      throw new Error("URL is required in config.");
    this.viewer = e, this.config = {
      ...t
    }, this.tileset = null, this.name = this.config.name || "Build3DLayer";
  }
  /**
   * 加载3D Tileset
   * @returns {Promise<Cesium.Cesium3DTileset>}
   */
  async load(e) {
    try {
      this.tileset = await P.Cesium3DTileset.fromUrl(e || this.config.url, {
        show: this.config.show || !0,
        ...this.config.options
        // 允许传入其他Cesium3DTileset选项
      }), this.tileset.tileLoad.addEventListener((i) => {
        var u;
        const o = (u = i.content) == null ? void 0 : u.batchTable;
        if (!o) return;
        const a = o.featuresLength;
        for (let h = 0; h < a; h++) {
          const f = o.getProperty(h, "id");
          if (this.config.alertList && this.config.alertList.length > 0 && this.config.alertKey) {
            let g = {};
            this.config.alertList.some((m) => {
              if (f === String(m.id))
                return g = m, !0;
            }) && o.setProperty(h, this.config.alertKey, g[this.config.alertKey]);
          }
        }
      }), console.log(this.tileset, "this.tileset"), this.viewer.scene.primitives.add(this.tileset);
      let t = new P.CustomShader({
        // 不考虑光照模型
        lightingModel: P.LightingModel.UNLIT,
        fragmentShaderText: `
        void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
            float _baseHeight = 20.0; // 物体的基础高度
            float _heightRange = 100.0; // 高亮的范围
            float _glowRange = 50.0; // 光环的移动范围(高度)
            
            float vtxf_height = fsInput.attributes.positionMC.z - _baseHeight;

            // 计算高亮强度，移除动态时间因素
            float vtxf_h = clamp(vtxf_height / _glowRange, 0.0, 1.0);
            float staticGlowIntensity = 0.5; // 固定的光强度（可以根据需要调整）

            // 根据高度计算 diffuse 值
            material.diffuse *= vec3(vtxf_h * staticGlowIntensity);

            // 确保高于一定高度的对象显示光环效果
            if (vtxf_h > 0.01) {
                material.diffuse += material.diffuse * (1.0 - step(0.01, vtxf_h));
            }
        }
    `
      });
      return this.tileset.customShader = t, console.log("loaded successfully."), this.tileset;
    } catch (t) {
      throw console.error("Failed to load:", t), t;
    }
  }
  setStyle(e) {
    let t = e || [];
    this.tileset && (this.tileset.style = new P.Cesium3DTileStyle({
      color: {
        conditions: t
      }
    }));
  }
  /**
   * 设置3D Tileset的着色器
   * @param obj
   */
  setShader(e) {
    const t = {
      sweepColor: (e == null ? void 0 : e.sweepColor) || "#00aeeb",
      minColor: (e == null ? void 0 : e.minColor) || "#09090EFF",
      maxColor: (e == null ? void 0 : e.maxColor) || "#0080FFFF",
      sweepWidth: (e == null ? void 0 : e.sweepWidth) || 0.02,
      modelHeight: (e == null ? void 0 : e.modelHeight) || 100,
      heightOffset: (e == null ? void 0 : e.heightOffset) || 0,
      minInterval: (e == null ? void 0 : e.minInterval) || 0,
      maxInterval: (e == null ? void 0 : e.maxInterval) || 1,
      speed: (e == null ? void 0 : e.speed) || 2,
      active: (e == null ? void 0 : e.active) || !0
    }, i = {
      u_sweep_color: { value: P.Color.fromCssColorString(t.sweepColor), type: P.UniformType.VEC3 },
      u_mix_color1: { value: P.Color.fromCssColorString(t.minColor), type: P.UniformType.VEC3 },
      u_mix_color2: { value: P.Color.fromCssColorString(t.maxColor), type: P.UniformType.VEC3 },
      u_sweep_width: { value: t.sweepWidth, type: P.UniformType.FLOAT },
      u_time: { value: 0, type: P.UniformType.FLOAT },
      u_model_height: { value: t.modelHeight, type: P.UniformType.FLOAT },
      u_height_offset: { value: t.heightOffset, type: P.UniformType.FLOAT },
      u_min_interval: { value: t.minInterval, type: P.UniformType.FLOAT },
      u_max_interval: { value: t.maxInterval, type: P.UniformType.FLOAT },
      u_speed: { value: t.speed, type: P.UniformType.FLOAT }
    }, o = new P.CustomShader({
      //不考虑光照模型
      // lightingModel: Cesium.LightingModel.PBR,
      vertexShaderText: `void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
            float adjustedZ = vsInput.attributes.positionMC.z + u_height_offset;
            float normalizedHeight = clamp(adjustedZ / u_model_height, u_min_interval, u_max_interval);
            float enhancedHeight = sqrt(normalizedHeight);
            v_uv = vec2(enhancedHeight, enhancedHeight);
        }`,
      fragmentShaderText: `float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
        }
        
        void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
            float gradientFactor = smoothstep(0.0, 1.0, v_uv.y);
            vec3 originColor = mix(u_mix_color1, u_mix_color2, gradientFactor);
            float t = fract(u_time * u_speed) * 2.;
            vec2 absUv = abs(v_uv - t);
            
            vec2 st = v_uv * 15.;
            vec2 ipos = floor(st + u_time * 5.);
            float r = random(ipos) + .2;
            
            float d = clamp(distance(0., absUv.y) / u_sweep_width, 0., 1.);
            float diffuse = clamp(-dot(czm_sunDirectionEC, fsInput.attributes.normalEC), 0., .45);
            
            vec3 color = mix(u_sweep_color * r + u_sweep_color * .8, originColor, d);
            material.diffuse = color;
            material.emissive = vec3(diffuse) * (1. - d);
        }`,
      uniforms: i,
      varyings: { v_uv: P.VaryingType.VEC2 }
    });
    console.log(performance.now(), "performance.now()"), this.viewer.scene.preRender.addEventListener(function(a, u) {
      o.setUniform("u_time", performance.now() * 1e-4);
    }), this.tileset.customShader = o;
  }
  /**
   * 显示图层
   */
  show() {
    this.tileset && (this.tileset.show = !0), this.config.show = !0;
  }
  /**
   * 隐藏图层
   */
  hide() {
    this.tileset && (this.tileset.show = !1), this.config.show = !1;
  }
  /**
   * 销毁图层，释放资源
   */
  clearLayer() {
    this.tileset && (this.viewer.scene.primitives.remove(this.tileset), this.tileset = null), console.log("Build3DLayer destroyed.");
  }
  /**
   * 销毁
   */
  destroy() {
    this.clearLayer(), this.viewer = null, this.config = null, this.tileset = null;
  }
}
class Ug {
  constructor(e, t = {}) {
    this.options = t, this.viewer = e, this.className = t == null ? void 0 : t.className, this.html = (t == null ? void 0 : t.html) || null, this.ctnList = {}, this.allVisible = !0, this.eventListener = null, this.collisionThreshold = Number.isFinite(t == null ? void 0 : t.collisionThreshold) ? Math.max(0, Math.min(1, t.collisionThreshold)) : 0.3;
  }
  setData(e) {
    if (this.clearLayer(), !Array.isArray(e)) {
      console.error("data must be an array.");
      return;
    }
    this.data = e, e.forEach((t) => {
      this.addLayer(t);
    });
  }
  addLayer(e) {
    var f, g, m;
    const t = (f = e.geometry) == null ? void 0 : f.coordinates;
    if (!t) {
      console.error("coordinates is required.");
      return;
    }
    const i = P.Cartesian3.fromDegrees(t[0], t[1]), o = ((g = e == null ? void 0 : e.properties) == null ? void 0 : g.id) || Ft(), a = document.createElement("div");
    a.className = e.className || this.className || "bx-popup-ctn0", a.id = o, document.getElementById(this.viewer.container.id).appendChild(a);
    let u = e.content || ((m = e == null ? void 0 : e.properties) == null ? void 0 : m.content);
    const h = (v) => {
      if (u = v, a.innerHTML = this.createHtml(u.header, u.body, e.isClose), e.isClose === !0) {
        const p = a.querySelector(".bx-popup-close");
        p && (p.onclick = () => this.close(o));
      }
      this.render();
    };
    if (h(u), this.ctnList[o] = {
      geometry: i,
      dom: a,
      visible: !0,
      updateContent: h
    }, e.isClose === !0) {
      const v = a.querySelector(".bx-popup-close");
      v && (v.onclick = () => this.close(o));
    }
    return typeof this.eventListener != "function" && (this.eventListener = () => this.render(), this.viewer.clock.onTick.addEventListener(this.eventListener)), { id: o, element: a, updateContent: h };
  }
  render() {
    const e = [];
    if (Object.keys(this.ctnList).forEach((i) => {
      const o = this.ctnList[i], a = P.SceneTransforms.wgs84ToWindowCoordinates(
        this.viewer.scene,
        o.geometry
      );
      if (!a) {
        o.dom.style.display = "none";
        return;
      }
      o.dom.style.left = a.x + "px", o.dom.style.top = a.y + "px", o.dom.style.display = o.visible && this.allVisible ? "" : "none", o.visible && this.allVisible && e.push({
        id: i,
        dom: o.dom,
        rect: o.dom.getBoundingClientRect()
      });
    }), !e.length) return;
    const t = [];
    e.forEach((i) => {
      let o = !1;
      for (const a of t)
        if (this.checkOverlap(i.rect, a.rect, this.collisionThreshold)) {
          o = !0;
          break;
        }
      i.dom.style.display = o ? "none" : "", o || t.push(i);
    });
  }
  checkOverlap(e, t, i = 0.5) {
    const o = Math.max(
      0,
      Math.min(e.right, t.right) - Math.max(e.left, t.left)
    ), a = Math.max(
      0,
      Math.min(e.bottom, t.bottom) - Math.max(e.top, t.top)
    ), u = o * a, h = Math.min(e.width * e.height, t.width * t.height);
    return u / h > i;
  }
  updateContent(e, t) {
    const i = this.ctnList[e];
    i != null && i.updateContent && i.updateContent(t);
  }
  setPopupVisible(e, t) {
    const i = this.ctnList[e];
    i && (i.visible = t, this.render());
  }
  show() {
    this.allVisible = !0, this.render();
  }
  hide() {
    this.allVisible = !1, Object.values(this.ctnList).forEach((e) => {
      e.dom.style.display = "none";
    });
  }
  setAllVisible(e) {
    this.allVisible = e, this.render();
  }
  close(e) {
    const t = this.ctnList[e];
    t && (t.dom.remove(), delete this.ctnList[e], Object.keys(this.ctnList).length === 0 && typeof this.eventListener == "function" && (this.viewer.clock.onTick.removeEventListener(this.eventListener), this.eventListener = null));
  }
  clearLayer() {
    Object.values(this.ctnList).forEach((e) => e.dom.remove()), this.ctnList = {}, typeof this.eventListener == "function" && (this.viewer.clock.onTick.removeEventListener(this.eventListener), this.eventListener = null);
  }
  createHtml(e, t, i) {
    return this.html ? this.html(e, t) : `
            ${i ? '<div class="bx-popup-close">×</div>' : ""}
            <div class="divpoint-wrap">
                <div class="divpoint-border">
                    <div class="divpoint-center">
                        <div class="bx-popup-header-ctn">${e}</div>
                        <div class="bx-popup-content-ctn">
                            <div class="bx-popup-content">${t}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="directional"></div>
        `;
  }
  /**
   * 更新碰撞阈值
   * @param val
   */
  setCollisionThreshold(e) {
    Number.isFinite(e) && (this.collisionThreshold = Math.max(0, Math.min(1, e)), this.render());
  }
  destroy() {
    this.clearLayer(), this.viewer = null;
  }
}
var Be = 63710088e-1, ns = {
  centimeters: Be * 100,
  centimetres: Be * 100,
  cm: Be * 100,
  degrees: 360 / (2 * Math.PI),
  deg: 360 / (2 * Math.PI),
  feet: Be * 3.28084,
  ft: Be * 3.28084,
  inches: Be * 39.37,
  in: Be * 39.37,
  kilometers: Be / 1e3,
  kilometres: Be / 1e3,
  km: Be / 1e3,
  meters: Be,
  metres: Be,
  m: Be,
  miles: Be / 1609.344,
  mi: Be / 1609.344,
  millimeters: Be * 1e3,
  millimetres: Be * 1e3,
  mm: Be * 1e3,
  nauticalmiles: Be / 1852,
  nmi: Be / 1852,
  radians: 1,
  rad: 1,
  yards: Be * 1.0936,
  yd: Be * 1.0936
}, qi = {
  acres: 247105e-9,
  ac: 247105e-9,
  centimeters: 1e4,
  centimetres: 1e4,
  cm: 1e4,
  feet: 10.763910417,
  ft: 10.763910417,
  hectares: 1e-4,
  ha: 1e-4,
  inches: 1550.003100006,
  in: 1550.003100006,
  kilometers: 1e-6,
  kilometres: 1e-6,
  km: 1e-6,
  meters: 1,
  metres: 1,
  m: 1,
  miles: 386e-9,
  mi: 386e-9,
  nauticalmiles: 29155334959812285e-23,
  nmi: 29155334959812285e-23,
  millimeters: 1e6,
  millimetres: 1e6,
  mm: 1e6,
  yards: 1.195990046,
  yd: 1.195990046
};
function Qe(n, e, t = {}) {
  const i = { type: "Feature" };
  return (t.id === 0 || t.id) && (i.id = t.id), t.bbox && (i.bbox = t.bbox), i.properties = e || {}, i.geometry = n, i;
}
function mc(n, e, t = {}) {
  switch (n) {
    case "Point":
      return de(e).geometry;
    case "LineString":
      return Se(e).geometry;
    case "Polygon":
      return ye(e).geometry;
    case "MultiPoint":
      return $r(e).geometry;
    case "MultiLineString":
      return pn(e).geometry;
    case "MultiPolygon":
      return wt(e).geometry;
    default:
      throw new Error(n + " is invalid");
  }
}
function de(n, e, t = {}) {
  if (!n)
    throw new Error("coordinates is required");
  if (!Array.isArray(n))
    throw new Error("coordinates must be an Array");
  if (n.length < 2)
    throw new Error("coordinates must be at least 2 numbers long");
  if (!et(n[0]) || !et(n[1]))
    throw new Error("coordinates must contain numbers");
  return Qe({
    type: "Point",
    coordinates: n
  }, e, t);
}
function yc(n, e, t = {}) {
  return ce(
    n.map((i) => de(i, e)),
    t
  );
}
function ye(n, e, t = {}) {
  for (const o of n) {
    if (o.length < 4)
      throw new Error(
        "Each LinearRing of a Polygon must have 4 or more Positions."
      );
    if (o[o.length - 1].length !== o[0].length)
      throw new Error("First and last Position are not equivalent.");
    for (let a = 0; a < o[o.length - 1].length; a++)
      if (o[o.length - 1][a] !== o[0][a])
        throw new Error("First and last Position are not equivalent.");
  }
  return Qe({
    type: "Polygon",
    coordinates: n
  }, e, t);
}
function pc(n, e, t = {}) {
  return ce(
    n.map((i) => ye(i, e)),
    t
  );
}
function Se(n, e, t = {}) {
  if (n.length < 2)
    throw new Error("coordinates must be an array of two or more positions");
  return Qe({
    type: "LineString",
    coordinates: n
  }, e, t);
}
function _c(n, e, t = {}) {
  return ce(
    n.map((i) => Se(i, e)),
    t
  );
}
function ce(n, e = {}) {
  const t = { type: "FeatureCollection" };
  return e.id && (t.id = e.id), e.bbox && (t.bbox = e.bbox), t.features = n, t;
}
function pn(n, e, t = {}) {
  return Qe({
    type: "MultiLineString",
    coordinates: n
  }, e, t);
}
function $r(n, e, t = {}) {
  return Qe({
    type: "MultiPoint",
    coordinates: n
  }, e, t);
}
function wt(n, e, t = {}) {
  return Qe({
    type: "MultiPolygon",
    coordinates: n
  }, e, t);
}
function Do(n, e, t = {}) {
  return Qe({
    type: "GeometryCollection",
    geometries: n
  }, e, t);
}
function wc(n, e = 0) {
  if (e && !(e >= 0))
    throw new Error("precision must be a positive number");
  const t = Math.pow(10, e || 0);
  return Math.round(n * t) / t;
}
function Zr(n, e = "kilometers") {
  const t = ns[e];
  if (!t)
    throw new Error(e + " units is invalid");
  return n * t;
}
function or(n, e = "kilometers") {
  const t = ns[e];
  if (!t)
    throw new Error(e + " units is invalid");
  return n / t;
}
function Kr(n, e) {
  return Kt(or(n, e));
}
function jn(n) {
  let e = n % 360;
  return e < 0 && (e += 360), e;
}
function xc(n) {
  return n = n % 360, n > 180 ? n - 360 : n < -180 ? n + 360 : n;
}
function Kt(n) {
  return n % (2 * Math.PI) * 180 / Math.PI;
}
function Je(n) {
  return n % 360 * Math.PI / 180;
}
function Pn(n, e = "kilometers", t = "kilometers") {
  if (!(n >= 0))
    throw new Error("length must be a positive number");
  return Zr(or(n, e), t);
}
function Fo(n, e = "meters", t = "kilometers") {
  if (!(n >= 0))
    throw new Error("area must be a positive number");
  const i = qi[e];
  if (!i)
    throw new Error("invalid original units");
  const o = qi[t];
  if (!o)
    throw new Error("invalid final units");
  return n / i * o;
}
function et(n) {
  return !isNaN(n) && n !== null && !Array.isArray(n);
}
function Re(n) {
  return n !== null && typeof n == "object" && !Array.isArray(n);
}
function mn(n) {
  delete n.bbox, n.type === "Feature" ? n.geometry && mn(n.geometry) : n.type === "FeatureCollection" ? n.features.forEach(mn) : n.type === "GeometryCollection" && n.geometries.forEach(mn);
}
function Fr(n) {
  if (!n)
    throw new Error("bbox is required");
  if (!Array.isArray(n))
    throw new Error("bbox must be an Array");
  if (n.length !== 4 && n.length !== 6)
    throw new Error("bbox must be an Array of 4 or 6 numbers");
  n.forEach((e) => {
    if (!et(e))
      throw new Error("bbox must only contain numbers");
  });
}
function Ec(n) {
  if (!n)
    throw new Error("id is required");
  if (["string", "number"].indexOf(typeof n) === -1)
    throw new Error("id must be a number or a string");
}
const Xg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  areaFactors: qi,
  azimuthToBearing: xc,
  bearingToAzimuth: jn,
  convertArea: Fo,
  convertLength: Pn,
  degreesToRadians: Je,
  earthRadius: Be,
  factors: ns,
  feature: Qe,
  featureCollection: ce,
  geometry: mc,
  geometryCollection: Do,
  isNumber: et,
  isObject: Re,
  lengthToDegrees: Kr,
  lengthToRadians: or,
  lineString: Se,
  lineStrings: _c,
  multiLineString: pn,
  multiPoint: $r,
  multiPolygon: wt,
  point: de,
  points: yc,
  polygon: ye,
  polygons: pc,
  radiansToDegrees: Kt,
  radiansToLength: Zr,
  removeBbox: mn,
  round: wc,
  validateBBox: Fr,
  validateId: Ec
}, Symbol.toStringTag, { value: "Module" }));
function be(n) {
  if (!n)
    throw new Error("coord is required");
  if (!Array.isArray(n)) {
    if (n.type === "Feature" && n.geometry !== null && n.geometry.type === "Point")
      return [...n.geometry.coordinates];
    if (n.type === "Point")
      return [...n.coordinates];
  }
  if (Array.isArray(n) && n.length >= 2 && !Array.isArray(n[0]) && !Array.isArray(n[1]))
    return [...n];
  throw new Error("coord must be GeoJSON Point or an Array of numbers");
}
function ve(n) {
  if (Array.isArray(n))
    return n;
  if (n.type === "Feature") {
    if (n.geometry !== null)
      return n.geometry.coordinates;
  } else if (n.coordinates)
    return n.coordinates;
  throw new Error(
    "coords must be GeoJSON Feature, Geometry Object or an Array"
  );
}
function Bo(n) {
  if (n.length > 1 && et(n[0]) && et(n[1]))
    return !0;
  if (Array.isArray(n[0]) && n[0].length)
    return Bo(n[0]);
  throw new Error("coordinates must only contain numbers");
}
function kc(n, e, t) {
  if (!e || !t)
    throw new Error("type and name required");
  if (!n || n.type !== e)
    throw new Error(
      "Invalid input to " + t + ": must be a " + e + ", given " + n.type
    );
}
function Br(n, e, t) {
  if (!n)
    throw new Error("No feature passed");
  if (!t)
    throw new Error(".featureOf() requires a name");
  if (!n || n.type !== "Feature" || !n.geometry)
    throw new Error(
      "Invalid input to " + t + ", Feature with geometry required"
    );
  if (!n.geometry || n.geometry.type !== e)
    throw new Error(
      "Invalid input to " + t + ": must be a " + e + ", given " + n.geometry.type
    );
}
function hn(n, e, t) {
  if (!n)
    throw new Error("No featureCollection passed");
  if (!t)
    throw new Error(".collectionOf() requires a name");
  if (!n || n.type !== "FeatureCollection")
    throw new Error(
      "Invalid input to " + t + ", FeatureCollection required"
    );
  for (const i of n.features) {
    if (!i || i.type !== "Feature" || !i.geometry)
      throw new Error(
        "Invalid input to " + t + ", Feature with geometry required"
      );
    if (!i.geometry || i.geometry.type !== e)
      throw new Error(
        "Invalid input to " + t + ": must be a " + e + ", given " + i.geometry.type
      );
  }
}
function Ue(n) {
  return n.type === "Feature" ? n.geometry : n;
}
function xt(n, e) {
  return n.type === "FeatureCollection" ? "FeatureCollection" : n.type === "GeometryCollection" ? "GeometryCollection" : n.type === "Feature" && n.geometry !== null ? n.geometry.type : n.type;
}
const Vg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  collectionOf: hn,
  containsNumber: Bo,
  featureOf: Br,
  geojsonType: kc,
  getCoord: be,
  getCoords: ve,
  getGeom: Ue,
  getType: xt
}, Symbol.toStringTag, { value: "Module" }));
function ln(n, e, t = {}) {
  if (t.final === !0)
    return Hg(n, e);
  const i = be(n), o = be(e), a = Je(i[0]), u = Je(o[0]), h = Je(i[1]), f = Je(o[1]), g = Math.sin(u - a) * Math.cos(f), m = Math.cos(h) * Math.sin(f) - Math.sin(h) * Math.cos(f) * Math.cos(u - a);
  return Kt(Math.atan2(g, m));
}
function Hg(n, e) {
  let t = ln(e, n);
  return t = (t + 180) % 360, t > 180 ? t - 360 : t;
}
function Qt(n, e, t, i = {}) {
  const o = be(n), a = Je(o[0]), u = Je(o[1]), h = Je(t), f = or(e, i.units), g = Math.asin(
    Math.sin(u) * Math.cos(f) + Math.cos(u) * Math.sin(f) * Math.cos(h)
  ), m = a + Math.atan2(
    Math.sin(h) * Math.sin(f) * Math.cos(u),
    Math.cos(f) - Math.sin(u) * Math.sin(g)
  ), v = Kt(m), p = Kt(g);
  return o[2] !== void 0 ? de([v, p, o[2]], i.properties) : de([v, p], i.properties);
}
function qe(n, e, t = {}) {
  var i = be(n), o = be(e), a = Je(o[1] - i[1]), u = Je(o[0] - i[0]), h = Je(i[1]), f = Je(o[1]), g = Math.pow(Math.sin(a / 2), 2) + Math.pow(Math.sin(u / 2), 2) * Math.cos(h) * Math.cos(f);
  return Zr(
    2 * Math.atan2(Math.sqrt(g), Math.sqrt(1 - g)),
    t.units
  );
}
function Wg(n, e, t = {}) {
  const o = Ue(n).coordinates;
  let a = 0;
  for (let u = 0; u < o.length && !(e >= a && u === o.length - 1); u++)
    if (a >= e) {
      const h = e - a;
      if (h) {
        const f = ln(o[u], o[u - 1]) - 180;
        return Qt(
          o[u],
          h,
          f,
          t
        );
      } else
        return de(o[u]);
    } else
      a += qe(o[u], o[u + 1], t);
  return de(o[o.length - 1]);
}
function Ln(n, e, t = {}) {
  let i;
  return t.final ? i = du(be(e), be(n)) : i = du(be(n), be(e)), i > 180 ? -(360 - i) : i;
}
function du(n, e) {
  const t = Je(n[1]), i = Je(e[1]);
  let o = Je(e[0] - n[0]);
  o > Math.PI && (o -= 2 * Math.PI), o < -Math.PI && (o += 2 * Math.PI);
  const a = Math.log(
    Math.tan(i / 2 + Math.PI / 4) / Math.tan(t / 2 + Math.PI / 4)
  ), u = Math.atan2(o, a);
  return (Kt(u) + 360) % 360;
}
function $g(n, e, t, i = {}) {
  if (!Re(i))
    throw new Error("options is invalid");
  if (!n)
    throw new Error("startPoint is required");
  if (!e)
    throw new Error("midPoint is required");
  if (!t)
    throw new Error("endPoint is required");
  const o = n, a = e, u = t, h = jn(
    i.mercator !== !0 ? ln(a, o) : Ln(a, o)
  );
  let f = jn(
    i.mercator !== !0 ? ln(a, u) : Ln(a, u)
  );
  f < h && (f = f + 360);
  const g = f - h;
  return i.explementary === !0 ? 360 - g : g;
}
function He(n, e, t) {
  if (n !== null)
    for (var i, o, a, u, h, f, g, m = 0, v = 0, p, _ = n.type, w = _ === "FeatureCollection", C = _ === "Feature", b = w ? n.features.length : 1, S = 0; S < b; S++) {
      g = w ? (
        // @ts-expect-error: Known type conflict
        n.features[S].geometry
      ) : C ? (
        // @ts-expect-error: Known type conflict
        n.geometry
      ) : n, p = g ? g.type === "GeometryCollection" : !1, h = p ? g.geometries.length : 1;
      for (var I = 0; I < h; I++) {
        var N = 0, A = 0;
        if (u = p ? g.geometries[I] : g, u !== null) {
          f = u.coordinates;
          var R = u.type;
          switch (m = t && (R === "Polygon" || R === "MultiPolygon") ? 1 : 0, R) {
            case null:
              break;
            case "Point":
              if (
                // @ts-expect-error: Known type conflict
                e(
                  f,
                  v,
                  S,
                  N,
                  A
                ) === !1
              )
                return !1;
              v++, N++;
              break;
            case "LineString":
            case "MultiPoint":
              for (i = 0; i < f.length; i++) {
                if (
                  // @ts-expect-error: Known type conflict
                  e(
                    f[i],
                    v,
                    S,
                    N,
                    A
                  ) === !1
                )
                  return !1;
                v++, R === "MultiPoint" && N++;
              }
              R === "LineString" && N++;
              break;
            case "Polygon":
            case "MultiLineString":
              for (i = 0; i < f.length; i++) {
                for (o = 0; o < f[i].length - m; o++) {
                  if (
                    // @ts-expect-error: Known type conflict
                    e(
                      f[i][o],
                      v,
                      S,
                      N,
                      A
                    ) === !1
                  )
                    return !1;
                  v++;
                }
                R === "MultiLineString" && N++, R === "Polygon" && A++;
              }
              R === "Polygon" && N++;
              break;
            case "MultiPolygon":
              for (i = 0; i < f.length; i++) {
                for (A = 0, o = 0; o < f[i].length; o++) {
                  for (a = 0; a < f[i][o].length - m; a++) {
                    if (
                      // @ts-expect-error: Known type conflict
                      e(
                        f[i][o][a],
                        v,
                        S,
                        N,
                        A
                      ) === !1
                    )
                      return !1;
                    v++;
                  }
                  A++;
                }
                N++;
              }
              break;
            case "GeometryCollection":
              for (i = 0; i < u.geometries.length; i++)
                if (
                  // @ts-expect-error: Known type conflict
                  He(u.geometries[i], e, t) === !1
                )
                  return !1;
              break;
            default:
              throw new Error("Unknown Geometry Type");
          }
        }
      }
    }
}
function Go(n, e, t, i) {
  var o = t;
  return He(
    n,
    function(a, u, h, f, g) {
      u === 0 && t === void 0 ? o = a : o = e(
        // @ts-expect-error: Known type conflict
        o,
        a,
        u,
        h,
        f,
        g
      );
    },
    i
  ), o;
}
function qo(n, e) {
  var t;
  switch (n.type) {
    case "FeatureCollection":
      for (t = 0; t < n.features.length && e(n.features[t].properties, t) !== !1; t++)
        ;
      break;
    case "Feature":
      e(n.properties, 0);
      break;
  }
}
function Cc(n, e, t) {
  var i = t;
  return qo(n, function(o, a) {
    a === 0 && t === void 0 ? i = o : i = e(i, o, a);
  }), i;
}
function Pe(n, e) {
  if (n.type === "Feature")
    e(n, 0);
  else if (n.type === "FeatureCollection")
    for (var t = 0; t < n.features.length && e(n.features[t], t) !== !1; t++)
      ;
}
function zo(n, e, t) {
  var i = t;
  return Pe(n, function(o, a) {
    a === 0 && t === void 0 ? i = o : i = e(i, o, a);
  }), i;
}
function Gr(n) {
  var e = [];
  return He(n, function(t) {
    e.push(t);
  }), e;
}
function at(n, e) {
  var t, i, o, a, u, h, f, g, m, v, p = 0, _ = n.type === "FeatureCollection", w = n.type === "Feature", C = _ ? n.features.length : 1;
  for (t = 0; t < C; t++) {
    for (h = _ ? (
      // @ts-expect-error: Known type conflict
      n.features[t].geometry
    ) : w ? (
      // @ts-expect-error: Known type conflict
      n.geometry
    ) : n, g = _ ? (
      // @ts-expect-error: Known type conflict
      n.features[t].properties
    ) : w ? (
      // @ts-expect-error: Known type conflict
      n.properties
    ) : {}, m = _ ? (
      // @ts-expect-error: Known type conflict
      n.features[t].bbox
    ) : w ? (
      // @ts-expect-error: Known type conflict
      n.bbox
    ) : void 0, v = _ ? (
      // @ts-expect-error: Known type conflict
      n.features[t].id
    ) : w ? (
      // @ts-expect-error: Known type conflict
      n.id
    ) : void 0, f = h ? h.type === "GeometryCollection" : !1, u = f ? h.geometries.length : 1, o = 0; o < u; o++) {
      if (a = f ? h.geometries[o] : h, a === null) {
        if (
          // @ts-expect-error: Known type conflict
          e(
            // @ts-expect-error: Known type conflict
            null,
            p,
            g,
            m,
            v
          ) === !1
        )
          return !1;
        continue;
      }
      switch (a.type) {
        case "Point":
        case "LineString":
        case "MultiPoint":
        case "Polygon":
        case "MultiLineString":
        case "MultiPolygon": {
          if (
            // @ts-expect-error: Known type conflict
            e(
              a,
              p,
              g,
              m,
              v
            ) === !1
          )
            return !1;
          break;
        }
        case "GeometryCollection": {
          for (i = 0; i < a.geometries.length; i++)
            if (
              // @ts-expect-error: Known type conflict
              e(
                a.geometries[i],
                p,
                g,
                m,
                v
              ) === !1
            )
              return !1;
          break;
        }
        default:
          throw new Error("Unknown Geometry Type");
      }
    }
    p++;
  }
}
function Yo(n, e, t) {
  var i = t;
  return at(
    n,
    function(o, a, u, h, f) {
      a === 0 && t === void 0 ? i = o : i = e(
        // @ts-expect-error: Known type conflict
        i,
        o,
        a,
        u,
        h,
        f
      );
    }
  ), i;
}
function it(n, e) {
  at(n, function(t, i, o, a, u) {
    var h = t === null ? null : t.type;
    switch (h) {
      case null:
      case "Point":
      case "LineString":
      case "Polygon":
        return (
          // @ts-expect-error: Known type conflict
          e(
            Qe(t, o, { bbox: a, id: u }),
            i,
            0
          ) === !1 ? !1 : void 0
        );
    }
    var f;
    switch (h) {
      case "MultiPoint":
        f = "Point";
        break;
      case "MultiLineString":
        f = "LineString";
        break;
      case "MultiPolygon":
        f = "Polygon";
        break;
    }
    for (
      var g = 0;
      // @ts-expect-error: Known type conflict
      g < t.coordinates.length;
      g++
    ) {
      var m = t.coordinates[g], v = {
        type: f,
        coordinates: m
      };
      if (
        // @ts-expect-error: Known type conflict
        e(Qe(v, o), i, g) === !1
      )
        return !1;
    }
  });
}
function Ic(n, e, t) {
  var i = t;
  return it(
    n,
    function(o, a, u) {
      a === 0 && u === 0 && t === void 0 ? i = o : i = e(
        // @ts-expect-error: Known type conflict
        i,
        o,
        a,
        u
      );
    }
  ), i;
}
function $t(n, e) {
  it(n, function(t, i, o) {
    var a = 0;
    if (t.geometry) {
      var u = t.geometry.type;
      if (!(u === "Point" || u === "MultiPoint")) {
        var h, f = 0, g = 0, m = 0;
        if (
          // @ts-expect-error: Known type conflict
          He(
            t,
            function(v, p, _, w, C) {
              if (
                // @ts-expect-error: Known type conflict
                h === void 0 || i > f || w > g || C > m
              ) {
                h = v, f = i, g = w, m = C, a = 0;
                return;
              }
              var b = Se(
                // @ts-expect-error: Known type conflict
                [h, v],
                t.properties
              );
              if (
                // @ts-expect-error: Known type conflict
                e(
                  // @ts-expect-error: Known type conflict
                  b,
                  i,
                  o,
                  C,
                  a
                ) === !1
              )
                return !1;
              a++, h = v;
            }
          ) === !1
        )
          return !1;
      }
    }
  });
}
function rs(n, e, t) {
  var i = t, o = !1;
  return $t(
    n,
    function(a, u, h, f, g) {
      o === !1 && t === void 0 ? i = a : i = e(
        i,
        // @ts-expect-error: Known type conflict
        a,
        u,
        h,
        f,
        g
      ), o = !0;
    }
  ), i;
}
function Uo(n, e) {
  if (!n) throw new Error("geojson is required");
  it(n, function(t, i, o) {
    if (t.geometry !== null) {
      var a = t.geometry.type, u = t.geometry.coordinates;
      switch (a) {
        case "LineString":
          if (e(t, i, o, 0, 0) === !1)
            return !1;
          break;
        case "Polygon":
          for (var h = 0; h < u.length; h++)
            if (
              // @ts-expect-error: Known type conflict
              e(
                // @ts-expect-error: Known type conflict
                Se(u[h], t.properties),
                i,
                o,
                h
              ) === !1
            )
              return !1;
          break;
      }
    }
  });
}
function Xo(n, e, t) {
  var i = t;
  return Uo(
    n,
    function(o, a, u, h) {
      a === 0 && t === void 0 ? i = o : i = e(
        i,
        o,
        a,
        u,
        h
      );
    }
  ), i;
}
function Sc(n, e) {
  if (e = e || {}, !Re(e)) throw new Error("options is invalid");
  var t = e.featureIndex || 0, i = e.multiFeatureIndex || 0, o = e.geometryIndex || 0, a = e.segmentIndex || 0, u = e.properties, h;
  switch (n.type) {
    case "FeatureCollection":
      t < 0 && (t = n.features.length + t), u = u || n.features[t].properties, h = n.features[t].geometry;
      break;
    case "Feature":
      u = u || n.properties, h = n.geometry;
      break;
    case "Point":
    case "MultiPoint":
      return null;
    case "LineString":
    case "Polygon":
    case "MultiLineString":
    case "MultiPolygon":
      h = n;
      break;
    default:
      throw new Error("geojson is invalid");
  }
  if (h === null) return null;
  var f = h.coordinates;
  switch (h.type) {
    case "Point":
    case "MultiPoint":
      return null;
    case "LineString":
      return a < 0 && (a = f.length + a - 1), Se(
        // @ts-expect-error: Known type conflict
        [f[a], f[a + 1]],
        u,
        e
      );
    case "Polygon":
      return o < 0 && (o = f.length + o), a < 0 && (a = f[o].length + a - 1), Se(
        [
          // @ts-expect-error: Known type conflict
          f[o][a],
          // @ts-expect-error: Known type conflict
          f[o][a + 1]
        ],
        u,
        e
      );
    case "MultiLineString":
      return i < 0 && (i = f.length + i), a < 0 && (a = f[i].length + a - 1), Se(
        [
          // @ts-expect-error: Known type conflict
          f[i][a],
          // @ts-expect-error: Known type conflict
          f[i][a + 1]
        ],
        u,
        e
      );
    case "MultiPolygon":
      return i < 0 && (i = f.length + i), o < 0 && (o = f[i].length + o), a < 0 && (a = // @ts-expect-error: Known type conflict
      f[i][o].length - a - 1), Se(
        [
          // @ts-expect-error: Known type conflict
          f[i][o][a],
          // @ts-expect-error: Known type conflict
          f[i][o][a + 1]
        ],
        u,
        e
      );
  }
  throw new Error("geojson is invalid");
}
function Mc(n, e) {
  if (e = e || {}, !Re(e)) throw new Error("options is invalid");
  var t = e.featureIndex || 0, i = e.multiFeatureIndex || 0, o = e.geometryIndex || 0, a = e.coordIndex || 0, u = e.properties, h;
  switch (n.type) {
    case "FeatureCollection":
      t < 0 && (t = n.features.length + t), u = u || n.features[t].properties, h = n.features[t].geometry;
      break;
    case "Feature":
      u = u || n.properties, h = n.geometry;
      break;
    case "Point":
    case "MultiPoint":
      return null;
    case "LineString":
    case "Polygon":
    case "MultiLineString":
    case "MultiPolygon":
      h = n;
      break;
    default:
      throw new Error("geojson is invalid");
  }
  if (h === null) return null;
  var f = h.coordinates;
  switch (h.type) {
    case "Point":
      return de(f, u, e);
    case "MultiPoint":
      return i < 0 && (i = f.length + i), de(f[i], u, e);
    case "LineString":
      return a < 0 && (a = f.length + a), de(f[a], u, e);
    case "Polygon":
      return o < 0 && (o = f.length + o), a < 0 && (a = f[o].length + a), de(f[o][a], u, e);
    case "MultiLineString":
      return i < 0 && (i = f.length + i), a < 0 && (a = f[i].length + a), de(f[i][a], u, e);
    case "MultiPolygon":
      return i < 0 && (i = f.length + i), o < 0 && (o = f[i].length + o), a < 0 && (a = f[i][o].length - a), de(
        f[i][o][a],
        u,
        e
      );
  }
  throw new Error("geojson is invalid");
}
const Zg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  coordAll: Gr,
  coordEach: He,
  coordReduce: Go,
  featureEach: Pe,
  featureReduce: zo,
  findPoint: Mc,
  findSegment: Sc,
  flattenEach: it,
  flattenReduce: Ic,
  geomEach: at,
  geomReduce: Yo,
  lineEach: Uo,
  lineReduce: Xo,
  propEach: qo,
  propReduce: Cc,
  segmentEach: $t,
  segmentReduce: rs
}, Symbol.toStringTag, { value: "Module" }));
function Qr(n) {
  return Yo(
    n,
    (e, t) => e + Kg(t),
    0
  );
}
function Kg(n) {
  let e = 0, t;
  switch (n.type) {
    case "Polygon":
      return vu(n.coordinates);
    case "MultiPolygon":
      for (t = 0; t < n.coordinates.length; t++)
        e += vu(n.coordinates[t]);
      return e;
    case "Point":
    case "MultiPoint":
    case "LineString":
    case "MultiLineString":
      return 0;
  }
  return 0;
}
function vu(n) {
  let e = 0;
  if (n && n.length > 0) {
    e += Math.abs(mu(n[0]));
    for (let t = 1; t < n.length; t++)
      e -= Math.abs(mu(n[t]));
  }
  return e;
}
var Qg = Be * Be / 2, qs = Math.PI / 180;
function mu(n) {
  const e = n.length - 1;
  if (e <= 2) return 0;
  let t = 0, i = 0;
  for (; i < e; ) {
    const o = n[i], a = n[i + 1 === e ? 0 : i + 1], u = n[i + 2 >= e ? (i + 2) % e : i + 2], h = o[0] * qs, f = a[1] * qs, g = u[0] * qs;
    t += (g - h) * Math.sin(f), i++;
  }
  return t * Qg;
}
function ze(n, e = {}) {
  if (n.bbox != null && e.recompute !== !0)
    return n.bbox;
  const t = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
  return He(n, (i) => {
    t[0] > i[0] && (t[0] = i[0]), t[1] > i[1] && (t[1] = i[1]), t[2] < i[0] && (t[2] = i[0]), t[3] < i[1] && (t[3] = i[1]);
  }), t;
}
function Jg(n, e, t) {
  var i = n.length, o = Xn(n[0], e), a = [], u, h, f;
  let g, m;
  for (t || (t = []), u = 1; u < i; u++) {
    for (g = n[u - 1], m = n[u], h = f = Xn(m, e); ; )
      if (o | h) {
        if (o & h)
          break;
        o ? (g = uo(g, m, o, e), o = Xn(g, e)) : (m = uo(g, m, h, e), h = Xn(m, e));
      } else {
        a.push(g), h !== f ? (a.push(m), u < i - 1 && (t.push(a), a = [])) : u === i - 1 && a.push(m);
        break;
      }
    o = f;
  }
  return a.length && t.push(a), t;
}
function jg(n, e) {
  var t, i, o, a, u, h, f;
  for (i = 1; i <= 8; i *= 2) {
    for (t = [], o = n[n.length - 1], a = !(Xn(o, e) & i), u = 0; u < n.length; u++)
      h = n[u], f = !(Xn(h, e) & i), f !== a && t.push(uo(o, h, i, e)), f && t.push(h), o = h, a = f;
    if (n = t, !n.length) break;
  }
  return t;
}
function uo(n, e, t, i) {
  return t & 8 ? [n[0] + (e[0] - n[0]) * (i[3] - n[1]) / (e[1] - n[1]), i[3]] : t & 4 ? [n[0] + (e[0] - n[0]) * (i[1] - n[1]) / (e[1] - n[1]), i[1]] : t & 2 ? [i[2], n[1] + (e[1] - n[1]) * (i[2] - n[0]) / (e[0] - n[0])] : t & 1 ? [i[0], n[1] + (e[1] - n[1]) * (i[0] - n[0]) / (e[0] - n[0])] : null;
}
function Xn(n, e) {
  var t = 0;
  return n[0] < e[0] ? t |= 1 : n[0] > e[2] && (t |= 2), n[1] < e[1] ? t |= 4 : n[1] > e[3] && (t |= 8), t;
}
function ed(n, e) {
  const t = Ue(n), i = t.type, o = n.type === "Feature" ? n.properties : {};
  let a = t.coordinates;
  switch (i) {
    case "LineString":
    case "MultiLineString": {
      const u = [];
      return i === "LineString" && (a = [a]), a.forEach((h) => {
        Jg(h, e, u);
      }), u.length === 1 ? Se(u[0], o) : pn(u, o);
    }
    case "Polygon":
      return ye(yu(a, e), o);
    case "MultiPolygon":
      return wt(
        a.map((u) => yu(u, e)),
        o
      );
    default:
      throw new Error("geometry " + i + " not supported");
  }
}
function yu(n, e) {
  const t = [];
  for (const i of n) {
    const o = jg(i, e);
    o.length > 0 && ((o[0][0] !== o[o.length - 1][0] || o[0][1] !== o[o.length - 1][1]) && o.push(o[0]), o.length >= 4 && t.push(o));
  }
  return t;
}
function Jr(n, e = {}) {
  const t = Number(n[0]), i = Number(n[1]), o = Number(n[2]), a = Number(n[3]);
  if (n.length === 6)
    throw new Error(
      "@turf/bbox-polygon does not support BBox with 6 positions"
    );
  const u = [t, i];
  return ye(
    [[u, [o, i], [o, a], [t, a], u]],
    e.properties,
    { bbox: n, id: e.id }
  );
}
var td = class {
  constructor(n) {
    this.points = n.points || [], this.duration = n.duration || 1e4, this.sharpness = n.sharpness || 0.85, this.centers = [], this.controls = [], this.stepLength = n.stepLength || 60, this.length = this.points.length, this.delay = 0;
    for (let e = 0; e < this.length; e++)
      this.points[e].z = this.points[e].z || 0;
    for (let e = 0; e < this.length - 1; e++) {
      const t = this.points[e], i = this.points[e + 1];
      this.centers.push({
        x: (t.x + i.x) / 2,
        y: (t.y + i.y) / 2,
        z: (t.z + i.z) / 2
      });
    }
    this.controls.push([this.points[0], this.points[0]]);
    for (let e = 0; e < this.centers.length - 1; e++) {
      const t = this.points[e + 1].x - (this.centers[e].x + this.centers[e + 1].x) / 2, i = this.points[e + 1].y - (this.centers[e].y + this.centers[e + 1].y) / 2, o = this.points[e + 1].z - (this.centers[e].z + this.centers[e + 1].z) / 2;
      this.controls.push([
        {
          x: (1 - this.sharpness) * this.points[e + 1].x + this.sharpness * (this.centers[e].x + t),
          y: (1 - this.sharpness) * this.points[e + 1].y + this.sharpness * (this.centers[e].y + i),
          z: (1 - this.sharpness) * this.points[e + 1].z + this.sharpness * (this.centers[e].z + o)
        },
        {
          x: (1 - this.sharpness) * this.points[e + 1].x + this.sharpness * (this.centers[e + 1].x + t),
          y: (1 - this.sharpness) * this.points[e + 1].y + this.sharpness * (this.centers[e + 1].y + i),
          z: (1 - this.sharpness) * this.points[e + 1].z + this.sharpness * (this.centers[e + 1].z + o)
        }
      ]);
    }
    return this.controls.push([
      this.points[this.length - 1],
      this.points[this.length - 1]
    ]), this.steps = this.cacheSteps(this.stepLength), this;
  }
  /**
   * Caches an array of equidistant (more or less) points on the curve.
   */
  cacheSteps(n) {
    const e = [];
    let t = this.pos(0);
    e.push(0);
    for (let i = 0; i < this.duration; i += 10) {
      const o = this.pos(i);
      Math.sqrt(
        (o.x - t.x) * (o.x - t.x) + (o.y - t.y) * (o.y - t.y) + (o.z - t.z) * (o.z - t.z)
      ) > n && (e.push(i), t = o);
    }
    return e;
  }
  /**
   * returns angle and speed in the given point in the curve
   */
  vector(n) {
    const e = this.pos(n + 10), t = this.pos(n - 10);
    return {
      angle: 180 * Math.atan2(e.y - t.y, e.x - t.x) / 3.14,
      speed: Math.sqrt(
        (t.x - e.x) * (t.x - e.x) + (t.y - e.y) * (t.y - e.y) + (t.z - e.z) * (t.z - e.z)
      )
    };
  }
  /**
   * Gets the position of the point, given time.
   *
   * WARNING: The speed is not constant. The time it takes between control points is constant.
   *
   * For constant speed, use Spline.steps[i];
   */
  pos(n) {
    let e = n - this.delay;
    e < 0 && (e = 0), e > this.duration && (e = this.duration - 1);
    const t = e / this.duration;
    if (t >= 1)
      return this.points[this.length - 1];
    const i = Math.floor((this.points.length - 1) * t), o = (this.length - 1) * t - i;
    return nd(
      o,
      this.points[i],
      this.controls[i][1],
      this.controls[i + 1][0],
      this.points[i + 1]
    );
  }
};
function nd(n, e, t, i, o) {
  const a = rd(n);
  return {
    x: o.x * a[0] + i.x * a[1] + t.x * a[2] + e.x * a[3],
    y: o.y * a[0] + i.y * a[1] + t.y * a[2] + e.y * a[3],
    z: o.z * a[0] + i.z * a[1] + t.z * a[2] + e.z * a[3]
  };
}
function rd(n) {
  const e = n * n;
  return [
    e * n,
    3 * e * (1 - n),
    3 * n * (1 - n) * (1 - n),
    (1 - n) * (1 - n) * (1 - n)
  ];
}
function id(n, e = {}) {
  const t = e.resolution || 1e4, i = e.sharpness || 0.85, o = [], a = Ue(n).coordinates.map((g) => ({ x: g[0], y: g[1] })), u = new td({
    duration: t,
    points: a,
    sharpness: i
  }), h = (g) => {
    var m = u.pos(g);
    Math.floor(g / 100) % 2 === 0 && o.push([m.x, m.y]);
  };
  for (var f = 0; f < u.duration; f += 10)
    h(f);
  return h(u.duration), Se(o, e.properties);
}
function zi(n) {
  const e = ve(n);
  let t = 0, i = 1, o, a;
  for (; i < e.length; )
    o = a || e[0], a = e[i], t += (a[0] - o[0]) * (a[1] + o[1]), i++;
  return t > 0;
}
function sd(n) {
  const e = Ue(n).coordinates;
  if (e[0].length <= 4)
    return !1;
  let t = !1;
  const i = e[0].length - 1;
  for (let o = 0; o < i; o++) {
    const a = e[0][(o + 2) % i][0] - e[0][(o + 1) % i][0], u = e[0][(o + 2) % i][1] - e[0][(o + 1) % i][1], h = e[0][o][0] - e[0][(o + 1) % i][0], f = e[0][o][1] - e[0][(o + 1) % i][1], g = a * f - u * h;
    if (o === 0)
      t = g > 0;
    else if (t !== g > 0)
      return !0;
  }
  return !1;
}
const an = 11102230246251565e-32, lt = 134217729, od = (3 + 8 * an) * an;
function zs(n, e, t, i, o) {
  let a, u, h, f, g = e[0], m = i[0], v = 0, p = 0;
  m > g == m > -g ? (a = g, g = e[++v]) : (a = m, m = i[++p]);
  let _ = 0;
  if (v < n && p < t)
    for (m > g == m > -g ? (u = g + a, h = a - (u - g), g = e[++v]) : (u = m + a, h = a - (u - m), m = i[++p]), a = u, h !== 0 && (o[_++] = h); v < n && p < t; )
      m > g == m > -g ? (u = a + g, f = u - a, h = a - (u - f) + (g - f), g = e[++v]) : (u = a + m, f = u - a, h = a - (u - f) + (m - f), m = i[++p]), a = u, h !== 0 && (o[_++] = h);
  for (; v < n; )
    u = a + g, f = u - a, h = a - (u - f) + (g - f), g = e[++v], a = u, h !== 0 && (o[_++] = h);
  for (; p < t; )
    u = a + m, f = u - a, h = a - (u - f) + (m - f), m = i[++p], a = u, h !== 0 && (o[_++] = h);
  return (a !== 0 || _ === 0) && (o[_++] = a), _;
}
function ad(n, e) {
  let t = e[0];
  for (let i = 1; i < n; i++) t += e[i];
  return t;
}
function jr(n) {
  return new Float64Array(n);
}
const ud = (3 + 16 * an) * an, ld = (2 + 12 * an) * an, cd = (9 + 64 * an) * an * an, qn = jr(4), pu = jr(8), _u = jr(12), wu = jr(16), mt = jr(4);
function hd(n, e, t, i, o, a, u) {
  let h, f, g, m, v, p, _, w, C, b, S, I, N, A, R, U, V, k;
  const M = n - o, T = t - o, D = e - a, B = i - a;
  A = M * B, p = lt * M, _ = p - (p - M), w = M - _, p = lt * B, C = p - (p - B), b = B - C, R = w * b - (A - _ * C - w * C - _ * b), U = D * T, p = lt * D, _ = p - (p - D), w = D - _, p = lt * T, C = p - (p - T), b = T - C, V = w * b - (U - _ * C - w * C - _ * b), S = R - V, v = R - S, qn[0] = R - (S + v) + (v - V), I = A + S, v = I - A, N = A - (I - v) + (S - v), S = N - U, v = N - S, qn[1] = N - (S + v) + (v - U), k = I + S, v = k - I, qn[2] = I - (k - v) + (S - v), qn[3] = k;
  let q = ad(4, qn), X = ld * u;
  if (q >= X || -q >= X || (v = n - M, h = n - (M + v) + (v - o), v = t - T, g = t - (T + v) + (v - o), v = e - D, f = e - (D + v) + (v - a), v = i - B, m = i - (B + v) + (v - a), h === 0 && f === 0 && g === 0 && m === 0) || (X = cd * u + od * Math.abs(q), q += M * m + B * h - (D * g + T * f), q >= X || -q >= X)) return q;
  A = h * B, p = lt * h, _ = p - (p - h), w = h - _, p = lt * B, C = p - (p - B), b = B - C, R = w * b - (A - _ * C - w * C - _ * b), U = f * T, p = lt * f, _ = p - (p - f), w = f - _, p = lt * T, C = p - (p - T), b = T - C, V = w * b - (U - _ * C - w * C - _ * b), S = R - V, v = R - S, mt[0] = R - (S + v) + (v - V), I = A + S, v = I - A, N = A - (I - v) + (S - v), S = N - U, v = N - S, mt[1] = N - (S + v) + (v - U), k = I + S, v = k - I, mt[2] = I - (k - v) + (S - v), mt[3] = k;
  const O = zs(4, qn, 4, mt, pu);
  A = M * m, p = lt * M, _ = p - (p - M), w = M - _, p = lt * m, C = p - (p - m), b = m - C, R = w * b - (A - _ * C - w * C - _ * b), U = D * g, p = lt * D, _ = p - (p - D), w = D - _, p = lt * g, C = p - (p - g), b = g - C, V = w * b - (U - _ * C - w * C - _ * b), S = R - V, v = R - S, mt[0] = R - (S + v) + (v - V), I = A + S, v = I - A, N = A - (I - v) + (S - v), S = N - U, v = N - S, mt[1] = N - (S + v) + (v - U), k = I + S, v = k - I, mt[2] = I - (k - v) + (S - v), mt[3] = k;
  const Y = zs(O, pu, 4, mt, _u);
  A = h * m, p = lt * h, _ = p - (p - h), w = h - _, p = lt * m, C = p - (p - m), b = m - C, R = w * b - (A - _ * C - w * C - _ * b), U = f * g, p = lt * f, _ = p - (p - f), w = f - _, p = lt * g, C = p - (p - g), b = g - C, V = w * b - (U - _ * C - w * C - _ * b), S = R - V, v = R - S, mt[0] = R - (S + v) + (v - V), I = A + S, v = I - A, N = A - (I - v) + (S - v), S = N - U, v = N - S, mt[1] = N - (S + v) + (v - U), k = I + S, v = k - I, mt[2] = I - (k - v) + (S - v), mt[3] = k;
  const G = zs(Y, _u, 4, mt, wu);
  return wu[G - 1];
}
function fd(n, e, t, i, o, a) {
  const u = (e - a) * (t - o), h = (n - o) * (i - a), f = u - h, g = Math.abs(u + h);
  return Math.abs(f) >= ud * g ? f : -hd(n, e, t, i, o, a, g);
}
function gd(n, e) {
  var t, i, o = 0, a, u, h, f, g, m, v, p = n[0], _ = n[1], w = e.length;
  for (t = 0; t < w; t++) {
    i = 0;
    var C = e[t], b = C.length - 1;
    if (m = C[0], m[0] !== C[b][0] && m[1] !== C[b][1])
      throw new Error("First and last coordinates in a ring must be the same");
    for (u = m[0] - p, h = m[1] - _, i; i < b; i++) {
      if (v = C[i + 1], f = v[0] - p, g = v[1] - _, h === 0 && g === 0) {
        if (f <= 0 && u >= 0 || u <= 0 && f >= 0)
          return 0;
      } else if (g >= 0 && h <= 0 || g <= 0 && h >= 0) {
        if (a = fd(u, f, h, g, 0, 0), a === 0)
          return 0;
        (a > 0 && g > 0 && h <= 0 || a < 0 && g <= 0 && h > 0) && o++;
      }
      m = v, h = g, u = f;
    }
  }
  return o % 2 !== 0;
}
function xe(n, e, t = {}) {
  if (!n)
    throw new Error("point is required");
  if (!e)
    throw new Error("polygon is required");
  const i = be(n), o = Ue(e), a = o.type, u = e.bbox;
  let h = o.coordinates;
  if (u && dd(i, u) === !1)
    return !1;
  a === "Polygon" && (h = [h]);
  for (var f = 0; f < h.length; ++f) {
    const g = gd(i, h[f]);
    if (g === 0 && !t.ignoreBoundary) return !0;
    if (g) return !0;
  }
  return !1;
}
function dd(n, e) {
  return e[0] <= n[0] && e[1] <= n[1] && e[2] >= n[0] && e[3] >= n[1];
}
function Ie(n, e, t = {}) {
  const i = be(n), o = ve(e);
  for (let a = 0; a < o.length - 1; a++) {
    let u = !1;
    if (t.ignoreEndVertices && (a === 0 && (u = "start"), a === o.length - 2 && (u = "end"), a === 0 && a + 1 === o.length - 1 && (u = "both")), vd(
      o[a],
      o[a + 1],
      i,
      u,
      typeof t.epsilon > "u" ? null : t.epsilon
    ))
      return !0;
  }
  return !1;
}
function vd(n, e, t, i, o) {
  const a = t[0], u = t[1], h = n[0], f = n[1], g = e[0], m = e[1], v = t[0] - h, p = t[1] - f, _ = g - h, w = m - f, C = v * w - p * _;
  if (o !== null) {
    if (Math.abs(C) > o)
      return !1;
  } else if (C !== 0)
    return !1;
  if (Math.abs(_) === Math.abs(w) && Math.abs(_) === 0)
    return i ? !1 : t[0] === n[0] && t[1] === n[1];
  if (i) {
    if (i === "start")
      return Math.abs(_) >= Math.abs(w) ? _ > 0 ? h < a && a <= g : g <= a && a < h : w > 0 ? f < u && u <= m : m <= u && u < f;
    if (i === "end")
      return Math.abs(_) >= Math.abs(w) ? _ > 0 ? h <= a && a < g : g < a && a <= h : w > 0 ? f <= u && u < m : m < u && u <= f;
    if (i === "both")
      return Math.abs(_) >= Math.abs(w) ? _ > 0 ? h < a && a < g : g < a && a < h : w > 0 ? f < u && u < m : m < u && u < f;
  } else return Math.abs(_) >= Math.abs(w) ? _ > 0 ? h <= a && a <= g : g <= a && a <= h : w > 0 ? f <= u && u <= m : m <= u && u <= f;
  return !1;
}
function md(n, e, t, i, o) {
  bc(n, e, t || 0, i || n.length - 1, o || yd);
}
function bc(n, e, t, i, o) {
  for (; i > t; ) {
    if (i - t > 600) {
      var a = i - t + 1, u = e - t + 1, h = Math.log(a), f = 0.5 * Math.exp(2 * h / 3), g = 0.5 * Math.sqrt(h * f * (a - f) / a) * (u - a / 2 < 0 ? -1 : 1), m = Math.max(t, Math.floor(e - u * f / a + g)), v = Math.min(i, Math.floor(e + (a - u) * f / a + g));
      bc(n, e, m, v, o);
    }
    var p = n[e], _ = t, w = i;
    for (pr(n, t, e), o(n[i], p) > 0 && pr(n, t, i); _ < w; ) {
      for (pr(n, _, w), _++, w--; o(n[_], p) < 0; ) _++;
      for (; o(n[w], p) > 0; ) w--;
    }
    o(n[t], p) === 0 ? pr(n, t, w) : (w++, pr(n, w, i)), w <= e && (t = w + 1), e <= w && (i = w - 1);
  }
}
function pr(n, e, t) {
  var i = n[e];
  n[e] = n[t], n[t] = i;
}
function yd(n, e) {
  return n < e ? -1 : n > e ? 1 : 0;
}
let ar = class {
  constructor(e = 9) {
    this._maxEntries = Math.max(4, e), this._minEntries = Math.max(2, Math.ceil(this._maxEntries * 0.4)), this.clear();
  }
  all() {
    return this._all(this.data, []);
  }
  search(e) {
    let t = this.data;
    const i = [];
    if (!yi(e, t)) return i;
    const o = this.toBBox, a = [];
    for (; t; ) {
      for (let u = 0; u < t.children.length; u++) {
        const h = t.children[u], f = t.leaf ? o(h) : h;
        yi(e, f) && (t.leaf ? i.push(h) : Us(e, f) ? this._all(h, i) : a.push(h));
      }
      t = a.pop();
    }
    return i;
  }
  collides(e) {
    let t = this.data;
    if (!yi(e, t)) return !1;
    const i = [];
    for (; t; ) {
      for (let o = 0; o < t.children.length; o++) {
        const a = t.children[o], u = t.leaf ? this.toBBox(a) : a;
        if (yi(e, u)) {
          if (t.leaf || Us(e, u)) return !0;
          i.push(a);
        }
      }
      t = i.pop();
    }
    return !1;
  }
  load(e) {
    if (!(e && e.length)) return this;
    if (e.length < this._minEntries) {
      for (let i = 0; i < e.length; i++)
        this.insert(e[i]);
      return this;
    }
    let t = this._build(e.slice(), 0, e.length - 1, 0);
    if (!this.data.children.length)
      this.data = t;
    else if (this.data.height === t.height)
      this._splitRoot(this.data, t);
    else {
      if (this.data.height < t.height) {
        const i = this.data;
        this.data = t, t = i;
      }
      this._insert(t, this.data.height - t.height - 1, !0);
    }
    return this;
  }
  insert(e) {
    return e && this._insert(e, this.data.height - 1), this;
  }
  clear() {
    return this.data = Un([]), this;
  }
  remove(e, t) {
    if (!e) return this;
    let i = this.data;
    const o = this.toBBox(e), a = [], u = [];
    let h, f, g;
    for (; i || a.length; ) {
      if (i || (i = a.pop(), f = a[a.length - 1], h = u.pop(), g = !0), i.leaf) {
        const m = pd(e, i.children, t);
        if (m !== -1)
          return i.children.splice(m, 1), a.push(i), this._condense(a), this;
      }
      !g && !i.leaf && Us(i, o) ? (a.push(i), u.push(h), h = 0, f = i, i = i.children[0]) : f ? (h++, i = f.children[h], g = !1) : i = null;
    }
    return this;
  }
  toBBox(e) {
    return e;
  }
  compareMinX(e, t) {
    return e.minX - t.minX;
  }
  compareMinY(e, t) {
    return e.minY - t.minY;
  }
  toJSON() {
    return this.data;
  }
  fromJSON(e) {
    return this.data = e, this;
  }
  _all(e, t) {
    const i = [];
    for (; e; )
      e.leaf ? t.push(...e.children) : i.push(...e.children), e = i.pop();
    return t;
  }
  _build(e, t, i, o) {
    const a = i - t + 1;
    let u = this._maxEntries, h;
    if (a <= u)
      return h = Un(e.slice(t, i + 1)), zn(h, this.toBBox), h;
    o || (o = Math.ceil(Math.log(a) / Math.log(u)), u = Math.ceil(a / Math.pow(u, o - 1))), h = Un([]), h.leaf = !1, h.height = o;
    const f = Math.ceil(a / u), g = f * Math.ceil(Math.sqrt(u));
    xu(e, t, i, g, this.compareMinX);
    for (let m = t; m <= i; m += g) {
      const v = Math.min(m + g - 1, i);
      xu(e, m, v, f, this.compareMinY);
      for (let p = m; p <= v; p += f) {
        const _ = Math.min(p + f - 1, v);
        h.children.push(this._build(e, p, _, o - 1));
      }
    }
    return zn(h, this.toBBox), h;
  }
  _chooseSubtree(e, t, i, o) {
    for (; o.push(t), !(t.leaf || o.length - 1 === i); ) {
      let a = 1 / 0, u = 1 / 0, h;
      for (let f = 0; f < t.children.length; f++) {
        const g = t.children[f], m = Ys(g), v = xd(e, g) - m;
        v < u ? (u = v, a = m < a ? m : a, h = g) : v === u && m < a && (a = m, h = g);
      }
      t = h || t.children[0];
    }
    return t;
  }
  _insert(e, t, i) {
    const o = i ? e : this.toBBox(e), a = [], u = this._chooseSubtree(o, this.data, t, a);
    for (u.children.push(e), Sr(u, o); t >= 0 && a[t].children.length > this._maxEntries; )
      this._split(a, t), t--;
    this._adjustParentBBoxes(o, a, t);
  }
  // split overflowed node into two
  _split(e, t) {
    const i = e[t], o = i.children.length, a = this._minEntries;
    this._chooseSplitAxis(i, a, o);
    const u = this._chooseSplitIndex(i, a, o), h = Un(i.children.splice(u, i.children.length - u));
    h.height = i.height, h.leaf = i.leaf, zn(i, this.toBBox), zn(h, this.toBBox), t ? e[t - 1].children.push(h) : this._splitRoot(i, h);
  }
  _splitRoot(e, t) {
    this.data = Un([e, t]), this.data.height = e.height + 1, this.data.leaf = !1, zn(this.data, this.toBBox);
  }
  _chooseSplitIndex(e, t, i) {
    let o, a = 1 / 0, u = 1 / 0;
    for (let h = t; h <= i - t; h++) {
      const f = Ir(e, 0, h, this.toBBox), g = Ir(e, h, i, this.toBBox), m = Ed(f, g), v = Ys(f) + Ys(g);
      m < a ? (a = m, o = h, u = v < u ? v : u) : m === a && v < u && (u = v, o = h);
    }
    return o || i - t;
  }
  // sorts node children by the best axis for split
  _chooseSplitAxis(e, t, i) {
    const o = e.leaf ? this.compareMinX : _d, a = e.leaf ? this.compareMinY : wd, u = this._allDistMargin(e, t, i, o), h = this._allDistMargin(e, t, i, a);
    u < h && e.children.sort(o);
  }
  // total margin of all possible split distributions where each node is at least m full
  _allDistMargin(e, t, i, o) {
    e.children.sort(o);
    const a = this.toBBox, u = Ir(e, 0, t, a), h = Ir(e, i - t, i, a);
    let f = mi(u) + mi(h);
    for (let g = t; g < i - t; g++) {
      const m = e.children[g];
      Sr(u, e.leaf ? a(m) : m), f += mi(u);
    }
    for (let g = i - t - 1; g >= t; g--) {
      const m = e.children[g];
      Sr(h, e.leaf ? a(m) : m), f += mi(h);
    }
    return f;
  }
  _adjustParentBBoxes(e, t, i) {
    for (let o = i; o >= 0; o--)
      Sr(t[o], e);
  }
  _condense(e) {
    for (let t = e.length - 1, i; t >= 0; t--)
      e[t].children.length === 0 ? t > 0 ? (i = e[t - 1].children, i.splice(i.indexOf(e[t]), 1)) : this.clear() : zn(e[t], this.toBBox);
  }
};
function pd(n, e, t) {
  if (!t) return e.indexOf(n);
  for (let i = 0; i < e.length; i++)
    if (t(n, e[i])) return i;
  return -1;
}
function zn(n, e) {
  Ir(n, 0, n.children.length, e, n);
}
function Ir(n, e, t, i, o) {
  o || (o = Un(null)), o.minX = 1 / 0, o.minY = 1 / 0, o.maxX = -1 / 0, o.maxY = -1 / 0;
  for (let a = e; a < t; a++) {
    const u = n.children[a];
    Sr(o, n.leaf ? i(u) : u);
  }
  return o;
}
function Sr(n, e) {
  return n.minX = Math.min(n.minX, e.minX), n.minY = Math.min(n.minY, e.minY), n.maxX = Math.max(n.maxX, e.maxX), n.maxY = Math.max(n.maxY, e.maxY), n;
}
function _d(n, e) {
  return n.minX - e.minX;
}
function wd(n, e) {
  return n.minY - e.minY;
}
function Ys(n) {
  return (n.maxX - n.minX) * (n.maxY - n.minY);
}
function mi(n) {
  return n.maxX - n.minX + (n.maxY - n.minY);
}
function xd(n, e) {
  return (Math.max(e.maxX, n.maxX) - Math.min(e.minX, n.minX)) * (Math.max(e.maxY, n.maxY) - Math.min(e.minY, n.minY));
}
function Ed(n, e) {
  const t = Math.max(n.minX, e.minX), i = Math.max(n.minY, e.minY), o = Math.min(n.maxX, e.maxX), a = Math.min(n.maxY, e.maxY);
  return Math.max(0, o - t) * Math.max(0, a - i);
}
function Us(n, e) {
  return n.minX <= e.minX && n.minY <= e.minY && e.maxX <= n.maxX && e.maxY <= n.maxY;
}
function yi(n, e) {
  return e.minX <= n.maxX && e.minY <= n.maxY && e.maxX >= n.minX && e.maxY >= n.minY;
}
function Un(n) {
  return {
    children: n,
    height: 1,
    leaf: !0,
    minX: 1 / 0,
    minY: 1 / 0,
    maxX: -1 / 0,
    maxY: -1 / 0
  };
}
function xu(n, e, t, i, o) {
  const a = [e, t];
  for (; a.length; ) {
    if (t = a.pop(), e = a.pop(), t - e <= i) continue;
    const u = e + Math.ceil((t - e) / i / 2) * i;
    md(n, u, e, t, o), a.push(e, u, u, t);
  }
}
const kd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ar
}, Symbol.toStringTag, { value: "Module" }));
function Xs(n) {
  var e;
  if (n.bbox) e = n.bbox;
  else if (Array.isArray(n) && n.length === 4) e = n;
  else if (Array.isArray(n) && n.length === 6)
    e = [n[0], n[1], n[3], n[4]];
  else if (n.type === "Feature") e = ze(n);
  else if (n.type === "FeatureCollection") e = ze(n);
  else throw new Error("invalid geojson");
  return {
    minX: e[0],
    minY: e[1],
    maxX: e[2],
    maxY: e[3]
  };
}
var Cd = class {
  constructor(e = 9) {
    this.tree = new ar(e), this.tree.toBBox = Xs;
  }
  /**
   * [insert](https://github.com/mourner/rbush#data-format)
   *
   * @memberof rbush
   * @param {Feature} feature insert single GeoJSON Feature
   * @returns {RBush} GeoJSON RBush
   * @example
   * var poly = turf.polygon([[[-78, 41], [-67, 41], [-67, 48], [-78, 48], [-78, 41]]]);
   * tree.insert(poly)
   */
  insert(e) {
    if (e.type !== "Feature") throw new Error("invalid feature");
    return e.bbox = e.bbox ? e.bbox : ze(e), this.tree.insert(e), this;
  }
  /**
   * [load](https://github.com/mourner/rbush#bulk-inserting-data)
   *
   * @memberof rbush
   * @param {FeatureCollection|Array<Feature>} features load entire GeoJSON FeatureCollection
   * @returns {RBush} GeoJSON RBush
   * @example
   * var polys = turf.polygons([
   *     [[[-78, 41], [-67, 41], [-67, 48], [-78, 48], [-78, 41]]],
   *     [[[-93, 32], [-83, 32], [-83, 39], [-93, 39], [-93, 32]]]
   * ]);
   * tree.load(polys);
   */
  load(e) {
    var t = [];
    return Array.isArray(e) ? e.forEach(function(i) {
      if (i.type !== "Feature") throw new Error("invalid features");
      i.bbox = i.bbox ? i.bbox : ze(i), t.push(i);
    }) : Pe(e, function(i) {
      if (i.type !== "Feature") throw new Error("invalid features");
      i.bbox = i.bbox ? i.bbox : ze(i), t.push(i);
    }), this.tree.load(t), this;
  }
  /**
   * [remove](https://github.com/mourner/rbush#removing-data)
   *
   * @memberof rbush
   * @param {Feature} feature remove single GeoJSON Feature
   * @param {Function} equals Pass a custom equals function to compare by value for removal.
   * @returns {RBush} GeoJSON RBush
   * @example
   * var poly = turf.polygon([[[-78, 41], [-67, 41], [-67, 48], [-78, 48], [-78, 41]]]);
   *
   * tree.remove(poly);
   */
  remove(e, t) {
    if (e.type !== "Feature") throw new Error("invalid feature");
    return e.bbox = e.bbox ? e.bbox : ze(e), this.tree.remove(e, t), this;
  }
  /**
   * [clear](https://github.com/mourner/rbush#removing-data)
   *
   * @memberof rbush
   * @returns {RBush} GeoJSON Rbush
   * @example
   * tree.clear()
   */
  clear() {
    return this.tree.clear(), this;
  }
  /**
   * [search](https://github.com/mourner/rbush#search)
   *
   * @memberof rbush
   * @param {BBox|FeatureCollection|Feature} geojson search with GeoJSON
   * @returns {FeatureCollection} all features that intersects with the given GeoJSON.
   * @example
   * var poly = turf.polygon([[[-78, 41], [-67, 41], [-67, 48], [-78, 48], [-78, 41]]]);
   *
   * tree.search(poly);
   */
  search(e) {
    var t = this.tree.search(Xs(e));
    return ce(t);
  }
  /**
   * [collides](https://github.com/mourner/rbush#collisions)
   *
   * @memberof rbush
   * @param {BBox|FeatureCollection|Feature} geojson collides with GeoJSON
   * @returns {boolean} true if there are any items intersecting the given GeoJSON, otherwise false.
   * @example
   * var poly = turf.polygon([[[-78, 41], [-67, 41], [-67, 48], [-78, 48], [-78, 41]]]);
   *
   * tree.collides(poly);
   */
  collides(e) {
    return this.tree.collides(Xs(e));
  }
  /**
   * [all](https://github.com/mourner/rbush#search)
   *
   * @memberof rbush
   * @returns {FeatureCollection} all the features in RBush
   * @example
   * tree.all()
   */
  all() {
    const e = this.tree.all();
    return ce(e);
  }
  /**
   * [toJSON](https://github.com/mourner/rbush#export-and-import)
   *
   * @memberof rbush
   * @returns {any} export data as JSON object
   * @example
   * var exported = tree.toJSON()
   */
  toJSON() {
    return this.tree.toJSON();
  }
  /**
   * [fromJSON](https://github.com/mourner/rbush#export-and-import)
   *
   * @memberof rbush
   * @param {any} json import previously exported data
   * @returns {RBush} GeoJSON RBush
   * @example
   * var exported = {
   *   "children": [
   *     {
   *       "type": "Feature",
   *       "geometry": {
   *         "type": "Point",
   *         "coordinates": [110, 50]
   *       },
   *       "properties": {},
   *       "bbox": [110, 50, 110, 50]
   *     }
   *   ],
   *   "height": 1,
   *   "leaf": true,
   *   "minX": 110,
   *   "minY": 50,
   *   "maxX": 110,
   *   "maxY": 50
   * }
   * tree.fromJSON(exported)
   */
  fromJSON(e) {
    return this.tree.fromJSON(e), this;
  }
};
function is(n) {
  return new Cd(n);
}
function Pc(n, e) {
  if (e = e ?? {}, !Re(e)) throw new Error("options is invalid");
  var t = e.precision, i = e.coordinates, o = e.mutate;
  if (t = t == null || isNaN(t) ? 6 : t, i = i == null || isNaN(i) ? 3 : i, !n) throw new Error("<geojson> is required");
  if (typeof t != "number")
    throw new Error("<precision> must be a number");
  if (typeof i != "number")
    throw new Error("<coordinates> must be a number");
  (o === !1 || o === void 0) && (n = JSON.parse(JSON.stringify(n)));
  var a = Math.pow(10, t);
  return He(n, function(u) {
    Id(u, a, i);
  }), n;
}
function Id(n, e, t) {
  n.length > t && n.splice(t, n.length);
  for (var i = 0; i < n.length; i++)
    n[i] = Math.round(n[i] * e) / e;
  return n;
}
function qr(n) {
  if (!n)
    throw new Error("geojson is required");
  const e = [];
  return it(n, (t) => {
    Sd(t, e);
  }), ce(e);
}
function Sd(n, e) {
  let t = [];
  const i = n.geometry;
  if (i !== null) {
    switch (i.type) {
      case "Polygon":
        t = ve(i);
        break;
      case "LineString":
        t = [ve(i)];
    }
    t.forEach((o) => {
      Md(o, n.properties).forEach((u) => {
        u.id = e.length, e.push(u);
      });
    });
  }
}
function Md(n, e) {
  const t = [];
  return n.reduce((i, o) => {
    const a = Se([i, o], e);
    return a.bbox = bd(i, o), t.push(a), o;
  }), t;
}
function bd(n, e) {
  const t = n[0], i = n[1], o = e[0], a = e[1], u = t < o ? t : o, h = i < a ? i : a, f = t > o ? t : o, g = i > a ? i : a;
  return [u, h, f, g];
}
class Vo {
  constructor(e = [], t = Pd) {
    if (this.data = e, this.length = this.data.length, this.compare = t, this.length > 0)
      for (let i = (this.length >> 1) - 1; i >= 0; i--) this._down(i);
  }
  push(e) {
    this.data.push(e), this.length++, this._up(this.length - 1);
  }
  pop() {
    if (this.length === 0) return;
    const e = this.data[0], t = this.data.pop();
    return this.length--, this.length > 0 && (this.data[0] = t, this._down(0)), e;
  }
  peek() {
    return this.data[0];
  }
  _up(e) {
    const { data: t, compare: i } = this, o = t[e];
    for (; e > 0; ) {
      const a = e - 1 >> 1, u = t[a];
      if (i(o, u) >= 0) break;
      t[e] = u, e = a;
    }
    t[e] = o;
  }
  _down(e) {
    const { data: t, compare: i } = this, o = this.length >> 1, a = t[e];
    for (; e < o; ) {
      let u = (e << 1) + 1, h = t[u];
      const f = u + 1;
      if (f < this.length && i(t[f], h) < 0 && (u = f, h = t[f]), i(h, a) >= 0) break;
      t[e] = h, e = u;
    }
    t[e] = a;
  }
}
function Pd(n, e) {
  return n < e ? -1 : n > e ? 1 : 0;
}
const Ld = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Vo
}, Symbol.toStringTag, { value: "Module" })), un = 11102230246251565e-32, ct = 134217729, Nd = (3 + 8 * un) * un;
function Vs(n, e, t, i, o) {
  let a, u, h, f, g = e[0], m = i[0], v = 0, p = 0;
  m > g == m > -g ? (a = g, g = e[++v]) : (a = m, m = i[++p]);
  let _ = 0;
  if (v < n && p < t)
    for (m > g == m > -g ? (u = g + a, h = a - (u - g), g = e[++v]) : (u = m + a, h = a - (u - m), m = i[++p]), a = u, h !== 0 && (o[_++] = h); v < n && p < t; )
      m > g == m > -g ? (u = a + g, f = u - a, h = a - (u - f) + (g - f), g = e[++v]) : (u = a + m, f = u - a, h = a - (u - f) + (m - f), m = i[++p]), a = u, h !== 0 && (o[_++] = h);
  for (; v < n; )
    u = a + g, f = u - a, h = a - (u - f) + (g - f), g = e[++v], a = u, h !== 0 && (o[_++] = h);
  for (; p < t; )
    u = a + m, f = u - a, h = a - (u - f) + (m - f), m = i[++p], a = u, h !== 0 && (o[_++] = h);
  return (a !== 0 || _ === 0) && (o[_++] = a), _;
}
function Td(n, e) {
  let t = e[0];
  for (let i = 1; i < n; i++) t += e[i];
  return t;
}
function ei(n) {
  return new Float64Array(n);
}
const Od = (3 + 16 * un) * un, Ad = (2 + 12 * un) * un, Rd = (9 + 64 * un) * un * un, Yn = ei(4), Eu = ei(8), ku = ei(12), Cu = ei(16), yt = ei(4);
function Dd(n, e, t, i, o, a, u) {
  let h, f, g, m, v, p, _, w, C, b, S, I, N, A, R, U, V, k;
  const M = n - o, T = t - o, D = e - a, B = i - a;
  A = M * B, p = ct * M, _ = p - (p - M), w = M - _, p = ct * B, C = p - (p - B), b = B - C, R = w * b - (A - _ * C - w * C - _ * b), U = D * T, p = ct * D, _ = p - (p - D), w = D - _, p = ct * T, C = p - (p - T), b = T - C, V = w * b - (U - _ * C - w * C - _ * b), S = R - V, v = R - S, Yn[0] = R - (S + v) + (v - V), I = A + S, v = I - A, N = A - (I - v) + (S - v), S = N - U, v = N - S, Yn[1] = N - (S + v) + (v - U), k = I + S, v = k - I, Yn[2] = I - (k - v) + (S - v), Yn[3] = k;
  let q = Td(4, Yn), X = Ad * u;
  if (q >= X || -q >= X || (v = n - M, h = n - (M + v) + (v - o), v = t - T, g = t - (T + v) + (v - o), v = e - D, f = e - (D + v) + (v - a), v = i - B, m = i - (B + v) + (v - a), h === 0 && f === 0 && g === 0 && m === 0) || (X = Rd * u + Nd * Math.abs(q), q += M * m + B * h - (D * g + T * f), q >= X || -q >= X)) return q;
  A = h * B, p = ct * h, _ = p - (p - h), w = h - _, p = ct * B, C = p - (p - B), b = B - C, R = w * b - (A - _ * C - w * C - _ * b), U = f * T, p = ct * f, _ = p - (p - f), w = f - _, p = ct * T, C = p - (p - T), b = T - C, V = w * b - (U - _ * C - w * C - _ * b), S = R - V, v = R - S, yt[0] = R - (S + v) + (v - V), I = A + S, v = I - A, N = A - (I - v) + (S - v), S = N - U, v = N - S, yt[1] = N - (S + v) + (v - U), k = I + S, v = k - I, yt[2] = I - (k - v) + (S - v), yt[3] = k;
  const O = Vs(4, Yn, 4, yt, Eu);
  A = M * m, p = ct * M, _ = p - (p - M), w = M - _, p = ct * m, C = p - (p - m), b = m - C, R = w * b - (A - _ * C - w * C - _ * b), U = D * g, p = ct * D, _ = p - (p - D), w = D - _, p = ct * g, C = p - (p - g), b = g - C, V = w * b - (U - _ * C - w * C - _ * b), S = R - V, v = R - S, yt[0] = R - (S + v) + (v - V), I = A + S, v = I - A, N = A - (I - v) + (S - v), S = N - U, v = N - S, yt[1] = N - (S + v) + (v - U), k = I + S, v = k - I, yt[2] = I - (k - v) + (S - v), yt[3] = k;
  const Y = Vs(O, Eu, 4, yt, ku);
  A = h * m, p = ct * h, _ = p - (p - h), w = h - _, p = ct * m, C = p - (p - m), b = m - C, R = w * b - (A - _ * C - w * C - _ * b), U = f * g, p = ct * f, _ = p - (p - f), w = f - _, p = ct * g, C = p - (p - g), b = g - C, V = w * b - (U - _ * C - w * C - _ * b), S = R - V, v = R - S, yt[0] = R - (S + v) + (v - V), I = A + S, v = I - A, N = A - (I - v) + (S - v), S = N - U, v = N - S, yt[1] = N - (S + v) + (v - U), k = I + S, v = k - I, yt[2] = I - (k - v) + (S - v), yt[3] = k;
  const G = Vs(Y, ku, 4, yt, Cu);
  return Cu[G - 1];
}
function Iu(n, e, t, i, o, a) {
  const u = (e - a) * (t - o), h = (n - o) * (i - a), f = u - h;
  if (u === 0 || h === 0 || u > 0 != h > 0) return f;
  const g = Math.abs(u + h);
  return Math.abs(f) >= Od * g ? f : -Dd(n, e, t, i, o, a, g);
}
function Fd(n, e) {
  const t = new Vo([], Lc);
  return Gd(n, t), qd(t, e);
}
function Lc(n, e) {
  return n.p.x > e.p.x ? 1 : n.p.x < e.p.x || n.p.x === e.p.x && (n.featureId !== e.featureId || n.ringId !== e.ringId) && n.isLeftEndpoint && !e.isLeftEndpoint ? -1 : n.p.y !== e.p.y ? n.p.y > e.p.y ? 1 : -1 : 1;
}
function Bd(n, e) {
  return n.rightSweepEvent.p.x > e.rightSweepEvent.p.x ? 1 : n.rightSweepEvent.p.x < e.rightSweepEvent.p.x ? -1 : n.rightSweepEvent.p.y !== e.rightSweepEvent.p.y ? n.rightSweepEvent.p.y < e.rightSweepEvent.p.y ? 1 : -1 : 1;
}
function Gd(n, e) {
  if (n.type === "FeatureCollection") {
    const t = n.features;
    for (let i = 0; i < t.length; i++)
      Su(t[i], e);
  } else
    Su(n, e);
}
var pi = 0, _i = 0, wi = 0;
function Su(n, e) {
  const t = n.type === "Feature" ? n.geometry : n;
  let i = t.coordinates;
  (t.type === "Polygon" || t.type === "MultiLineString") && (i = [i]), t.type === "LineString" && (i = [[i]]);
  for (let o = 0; o < i.length; o++)
    for (let a = 0; a < i[o].length; a++) {
      let u = i[o][a][0], h = null;
      _i = _i + 1;
      for (let f = 0; f < i[o][a].length - 1; f++) {
        h = i[o][a][f + 1];
        const g = new Mu(u, pi, _i, wi), m = new Mu(h, pi, _i, wi + 1);
        g.otherEvent = m, m.otherEvent = g, Lc(g, m) > 0 ? (m.isLeftEndpoint = !0, g.isLeftEndpoint = !1) : (g.isLeftEndpoint = !0, m.isLeftEndpoint = !1), e.push(g), e.push(m), u = h, wi = wi + 1;
      }
    }
  pi = pi + 1;
}
var Mu = class {
  constructor(n, e, t, i) {
    this.p = {
      x: n[0],
      y: n[1]
    }, this.featureId = e, this.ringId = t, this.eventId = i, this.otherEvent = null, this.isLeftEndpoint = null;
  }
  isSamePoint(n) {
    return this.p.x === n.p.x && this.p.y === n.p.y;
  }
  asNewXY() {
    return [this.p.x, this.p.y];
  }
};
function qd(n, e = !1) {
  const t = [], i = new Vo([], Bd);
  for (; n.length; ) {
    const o = n.pop();
    if (o.isLeftEndpoint) {
      const a = new zd(o);
      for (let u = 0; u < i.data.length; u++) {
        const h = i.data[u];
        if (e && h.leftSweepEvent.featureId === o.featureId)
          continue;
        const f = Yd(a, h);
        f !== !1 && t.push(f);
      }
      i.push(a);
    } else o.isLeftEndpoint === !1 && i.pop();
  }
  return t;
}
var zd = class {
  /** @param event must have otherEvent non-null */
  constructor(e) {
    this.leftSweepEvent = e, this.rightSweepEvent = e.otherEvent;
  }
};
function Yd(n, e) {
  if (n === null || e === null) return !1;
  const t = n.leftSweepEvent.p.x, i = n.leftSweepEvent.p.y, o = n.rightSweepEvent.p.x, a = n.rightSweepEvent.p.y, u = e.leftSweepEvent.p.x, h = e.leftSweepEvent.p.y, f = e.rightSweepEvent.p.x, g = e.rightSweepEvent.p.y, m = Iu(t, i, o, a, u, h), v = Iu(t, i, o, a, f, g);
  if (m > 0 && v > 0) return !1;
  if (m < 0 && v < 0) return !1;
  if (n.leftSweepEvent.ringId === e.leftSweepEvent.ringId) {
    if (n.rightSweepEvent.isSamePoint(e.leftSweepEvent) || n.rightSweepEvent.isSamePoint(e.rightSweepEvent) || n.leftSweepEvent.isSamePoint(e.leftSweepEvent) || n.leftSweepEvent.isSamePoint(e.rightSweepEvent))
      return !1;
  } else {
    if (n.rightSweepEvent.isSamePoint(e.leftSweepEvent))
      return e.leftSweepEvent.asNewXY();
    if (n.rightSweepEvent.isSamePoint(e.rightSweepEvent))
      return e.rightSweepEvent.asNewXY();
    if (n.leftSweepEvent.isSamePoint(e.leftSweepEvent))
      return e.leftSweepEvent.asNewXY();
    if (n.leftSweepEvent.isSamePoint(e.rightSweepEvent))
      return e.rightSweepEvent.asNewXY();
  }
  const p = (g - h) * (o - t) - (f - u) * (a - i), _ = (f - u) * (i - h) - (g - h) * (t - u), w = (o - t) * (i - h) - (a - i) * (t - u);
  if (p === 0)
    return !1;
  const C = _ / p, b = w / p;
  if (C >= 0 && C <= 1 && b >= 0 && b <= 1) {
    const S = t + C * (o - t), I = i + C * (a - i);
    return [S, I];
  }
  return !1;
}
function Jt(n, e, t = {}) {
  const { removeDuplicates: i = !0, ignoreSelfIntersections: o = !0 } = t;
  let a = [];
  n.type === "FeatureCollection" ? a = a.concat(n.features) : n.type === "Feature" ? a.push(n) : (n.type === "LineString" || n.type === "Polygon" || n.type === "MultiLineString" || n.type === "MultiPolygon") && a.push(Qe(n)), e.type === "FeatureCollection" ? a = a.concat(e.features) : e.type === "Feature" ? a.push(e) : (e.type === "LineString" || e.type === "Polygon" || e.type === "MultiLineString" || e.type === "MultiPolygon") && a.push(Qe(e));
  const u = Fd(
    ce(a),
    o
  );
  let h = [];
  if (i) {
    const f = {};
    u.forEach((g) => {
      const m = g.join(",");
      f[m] || (f[m] = !0, h.push(g));
    });
  } else
    h = u;
  return ce(h.map((f) => de(f)));
}
var Ud = Object.defineProperty, Xd = Object.defineProperties, Vd = Object.getOwnPropertyDescriptors, bu = Object.getOwnPropertySymbols, Hd = Object.prototype.hasOwnProperty, Wd = Object.prototype.propertyIsEnumerable, Pu = (n, e, t) => e in n ? Ud(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, $d = (n, e) => {
  for (var t in e || (e = {}))
    Hd.call(e, t) && Pu(n, t, e[t]);
  if (bu)
    for (var t of bu(e))
      Wd.call(e, t) && Pu(n, t, e[t]);
  return n;
}, Zd = (n, e) => Xd(n, Vd(e));
function on(n, e, t = {}) {
  if (!n || !e)
    throw new Error("lines and inputPoint are required arguments");
  const i = be(e);
  let o = de([1 / 0, 1 / 0], {
    lineStringIndex: -1,
    segmentIndex: -1,
    totalDistance: -1,
    lineDistance: -1,
    segmentDistance: -1,
    pointDistance: 1 / 0,
    // deprecated properties START
    multiFeatureIndex: -1,
    index: -1,
    location: -1,
    dist: 1 / 0
    // deprecated properties END
  }), a = 0, u = 0, h = -1;
  return it(
    n,
    function(f, g, m) {
      h !== m && (h = m, u = 0);
      const v = ve(f);
      for (let p = 0; p < v.length - 1; p++) {
        const _ = de(v[p]), w = be(_), C = de(v[p + 1]), b = be(C), S = qe(_, C, t);
        let I, N;
        b[0] === i[0] && b[1] === i[1] ? [I, N] = [b, !0] : w[0] === i[0] && w[1] === i[1] ? [I, N] = [w, !1] : [I, N] = Jd(
          w,
          b,
          i
        );
        const A = qe(e, I, t);
        if (A < o.properties.pointDistance) {
          const R = qe(_, I, t);
          o = de(I, {
            lineStringIndex: m,
            // Legacy behaviour where index progresses to next segment # if we
            // went with the end point this iteration.
            segmentIndex: N ? p + 1 : p,
            totalDistance: a + R,
            lineDistance: u + R,
            segmentDistance: R,
            pointDistance: A,
            // deprecated properties START
            multiFeatureIndex: -1,
            index: -1,
            location: -1,
            dist: 1 / 0
            // deprecated properties END
          }), o.properties = Zd($d({}, o.properties), {
            multiFeatureIndex: o.properties.lineStringIndex,
            index: o.properties.segmentIndex,
            location: o.properties.totalDistance,
            dist: o.properties.pointDistance
            // deprecated properties END
          });
        }
        a += S, u += S;
      }
    }
  ), o;
}
function Sn(n, e) {
  const [t, i, o] = n, [a, u, h] = e;
  return t * a + i * u + o * h;
}
function _r(n, e) {
  const [t, i, o] = n, [a, u, h] = e;
  return [i * h - o * u, o * a - t * h, t * u - i * a];
}
function Kd(n) {
  return Math.sqrt(Math.pow(n[0], 2) + Math.pow(n[1], 2) + Math.pow(n[2], 2));
}
function Lu(n) {
  const e = Kd(n);
  return [n[0] / e, n[1] / e, n[2] / e];
}
function Hs(n) {
  const e = Je(n[1]), t = Je(n[0]);
  return [
    Math.cos(e) * Math.cos(t),
    Math.cos(e) * Math.sin(t),
    Math.sin(e)
  ];
}
function Qd(n) {
  const [e, t, i] = n, o = Math.min(Math.max(i, -1), 1), a = Kt(Math.asin(o));
  return [Kt(Math.atan2(t, e)), a];
}
function Jd(n, e, t) {
  const i = Hs(n), o = Hs(e), a = Hs(t), u = _r(i, o);
  if (u[0] === 0 && u[1] === 0 && u[2] === 0)
    return Sn(i, o) > 0 ? [[...e], !0] : [[...t], !1];
  const h = _r(u, a);
  if (h[0] === 0 && h[1] === 0 && h[2] === 0)
    return [[...e], !0];
  const f = _r(h, u), g = Lu(f), m = [-g[0], -g[1], -g[2]], v = Sn(a, g) > Sn(a, m) ? g : m, p = Lu(u), _ = Sn(_r(i, v), p), w = Sn(_r(v, o), p);
  return _ >= 0 && w >= 0 ? [Qd(v), !1] : Sn(i, a) > Sn(o, a) ? [[...n], !1] : [[...e], !0];
}
function Nc(n, e) {
  if (!n) throw new Error("line is required");
  if (!e) throw new Error("splitter is required");
  const t = xt(n), i = xt(e);
  if (t !== "LineString") throw new Error("line must be LineString");
  if (i === "FeatureCollection")
    throw new Error("splitter cannot be a FeatureCollection");
  if (i === "GeometryCollection")
    throw new Error("splitter cannot be a GeometryCollection");
  var o = Pc(e, { precision: 7 });
  switch (n.type !== "Feature" && (n = Qe(n)), i) {
    case "Point":
      return lo(
        n,
        o
      );
    case "MultiPoint":
      return Nu(
        n,
        o
      );
    case "LineString":
    case "MultiLineString":
    case "Polygon":
    case "MultiPolygon":
      return Nu(
        n,
        Jt(
          n,
          o,
          {
            ignoreSelfIntersections: !0
          }
        )
      );
  }
}
function Nu(n, e) {
  var t = [], i = is();
  return it(
    e,
    // this cast should be unnecessary (and is wrong, it could contain MultiPoints), but is a workaround for bad flattenEach typings
    function(o) {
      if (t.forEach(function(h, f) {
        h.id = f;
      }), !t.length)
        t = lo(n, o).features, i.load(ce(t));
      else {
        var a = i.search(o);
        if (a.features.length) {
          var u = Tc(o, a);
          t = t.filter(function(h) {
            return h.id !== u.id;
          }), i.remove(u), Pe(lo(u, o), function(h) {
            t.push(h), i.insert(h);
          });
        }
      }
    }
  ), ce(t);
}
function lo(n, e) {
  var t = [], i = ve(n)[0], o = ve(n)[n.geometry.coordinates.length - 1];
  if (Ws(i, be(e)) || Ws(o, be(e)))
    return ce([n]);
  var a = is(), u = qr(n);
  a.load(u);
  var h = a.search(e);
  if (!h.features.length) return ce([n]);
  var f = Tc(e, h), g = [i], m = zo(
    u,
    function(v, p, _) {
      var w = ve(p)[1], C = be(e);
      return _ === f.id ? (v.push(C), t.push(Se(v)), Ws(C, w) ? [C] : [C, w]) : (v.push(w), v);
    },
    g
  );
  return m.length > 1 && t.push(Se(m)), ce(t);
}
function Tc(n, e) {
  if (!e.features.length) throw new Error("lines must contain features");
  if (e.features.length === 1) return e.features[0];
  var t, i = 1 / 0;
  return Pe(e, function(o) {
    var a = on(o, n), u = a.properties.pointDistance;
    u < i && (t = o, i = u);
  }), t;
}
function Ws(n, e) {
  return n[0] === e[0] && n[1] === e[1];
}
function Oc(n, e) {
  const t = Ue(n), i = Ue(e), o = t.type, a = i.type, u = t.coordinates, h = i.coordinates;
  switch (o) {
    case "Point":
      switch (a) {
        case "Point":
          return Ho(u, h);
        default:
          throw new Error("feature2 " + a + " geometry not supported");
      }
    case "MultiPoint":
      switch (a) {
        case "Point":
          return ov(t, i);
        case "MultiPoint":
          return av(t, i);
        default:
          throw new Error("feature2 " + a + " geometry not supported");
      }
    case "LineString":
      switch (a) {
        case "Point":
          return Ie(i, t, { ignoreEndVertices: !0 });
        case "LineString":
          return cv(t, i);
        case "MultiPoint":
          return uv(t, i);
        default:
          throw new Error("feature2 " + a + " geometry not supported");
      }
    case "Polygon":
      switch (a) {
        case "Point":
          return xe(i, t, { ignoreBoundary: !0 });
        case "LineString":
          return Rc(t, i);
        case "Polygon":
          return ss(t, i);
        case "MultiPoint":
          return lv(t, i);
        case "MultiPolygon":
          return sv(t, i);
        default:
          throw new Error("feature2 " + a + " geometry not supported");
      }
    case "MultiPolygon":
      switch (a) {
        case "Point":
          return ev(t, i);
        case "MultiPoint":
          return tv(t, i);
        case "LineString":
          return nv(t, i);
        case "MultiLineString":
          return rv(t, i);
        case "Polygon":
          return jd(t, i);
        case "MultiPolygon":
          return iv(t, i);
        default:
          throw new Error("feature2 " + a + " geometry not supported");
      }
    default:
      throw new Error("feature1 " + o + " geometry not supported");
  }
}
function jd(n, e) {
  const t = ze(e);
  return n.coordinates.some(
    (i) => ss({ type: "Polygon", coordinates: i }, e, t)
  );
}
function ev(n, e) {
  return xe(e, n, { ignoreBoundary: !0 });
}
function tv(n, e) {
  let t = !1;
  for (const i of e.coordinates) {
    if (!xe(i, n))
      return !1;
    t || (t = xe(i, n, {
      ignoreBoundary: !0
    }));
  }
  return t;
}
function nv(n, e) {
  return n.coordinates.some(
    (t) => Rc({ type: "Polygon", coordinates: t }, e)
  );
}
function rv(n, e) {
  let t = !1;
  for (const i of e.coordinates) {
    const o = { type: "LineString", coordinates: i };
    let a = "outside";
    for (const u of n.coordinates) {
      const h = Dc(
        { type: "Polygon", coordinates: u },
        o
      );
      if (h === "interior") {
        a = h;
        break;
      }
      h === "boundary" && (a = h);
    }
    if (a === "outside")
      return !1;
    a === "interior" && (t = !0);
  }
  return t;
}
function iv(n, e) {
  for (const t of e.coordinates) {
    const i = { type: "Polygon", coordinates: t }, o = ze(i);
    if (!n.coordinates.some(
      (u) => ss(
        { type: "Polygon", coordinates: u },
        i,
        o
      )
    ))
      return !1;
  }
  return !0;
}
function sv(n, e) {
  return e.coordinates.every(
    (t) => ss(n, { type: "Polygon", coordinates: t })
  );
}
function ov(n, e) {
  let t, i = !1;
  for (t = 0; t < n.coordinates.length; t++)
    if (Ho(n.coordinates[t], e.coordinates)) {
      i = !0;
      break;
    }
  return i;
}
function av(n, e) {
  for (const t of e.coordinates) {
    let i = !1;
    for (const o of n.coordinates)
      if (Ho(t, o)) {
        i = !0;
        break;
      }
    if (!i)
      return !1;
  }
  return !0;
}
function uv(n, e) {
  let t = !1;
  for (const i of e.coordinates) {
    if (!Ie(i, n))
      return !1;
    !t && Ie(i, n, { ignoreEndVertices: !0 }) && (t = !0);
  }
  return t;
}
function lv(n, e) {
  let t = !1;
  for (const i of e.coordinates) {
    if (!xe(i, n))
      return !1;
    t || (t = xe(i, n, {
      ignoreBoundary: !0
    }));
  }
  return t;
}
function cv(n, e) {
  let t = !1;
  const i = e.coordinates;
  for (let o = 0; o < i.length; o++) {
    const a = i[o];
    if (!Ie(a, n))
      return !1;
    if (!t) {
      if (Ie(a, n, { ignoreEndVertices: !0 }))
        t = !0;
      else if (o > 0) {
        const u = [
          (i[o - 1][0] + a[0]) / 2,
          (i[o - 1][1] + a[1]) / 2
        ];
        Ie(u, n, { ignoreEndVertices: !0 }) && (t = !0);
      }
    }
  }
  return t;
}
function Ac(n, e) {
  const t = n.coordinates, i = [];
  for (let o = 0; o < t.length - 1; o++) {
    const a = Se([t[o], t[o + 1]]), u = Nc(a, Qe(e));
    u.features.length === 0 ? i.push(a) : i.push(...u.features);
  }
  return ce(i);
}
function Rc(n, e) {
  return Dc(n, e) === "interior";
}
function Dc(n, e) {
  const t = ze(n), i = ze(e);
  if (!Fc(t, i))
    return "outside";
  for (const u of e.coordinates)
    if (!xe(u, n))
      return "outside";
  let o = !1;
  const a = Ac(e, n);
  for (const u of a.features) {
    const h = Bc(
      u.geometry.coordinates[0],
      u.geometry.coordinates[1]
    );
    if (!xe(h, n))
      return "outside";
    !o && xe(h, n, { ignoreBoundary: !0 }) && (o = !0);
  }
  return o ? "interior" : "boundary";
}
function ss(n, e, t) {
  if (n.type === "Feature" && n.geometry === null || e.type === "Feature" && e.geometry === null)
    return !1;
  const i = ze(n), o = t ?? ze(e);
  if (!Fc(i, o))
    return !1;
  const a = Ue(n), u = Ue(e).coordinates;
  for (const h of u) {
    for (const g of h)
      if (!xe(g, n))
        return !1;
    const f = Ac(
      { coordinates: h },
      a
    );
    for (const g of f.features) {
      const m = Bc(
        g.geometry.coordinates[0],
        g.geometry.coordinates[1]
      );
      if (!xe(m, n) && !gv(m, a))
        return !1;
    }
  }
  return !0;
}
var hv = 1e-6;
function fv(n, e, t) {
  const i = t[0] - e[0], o = t[1] - e[1], a = i * i + o * o;
  let u = 0;
  a > 0 && (u = ((n[0] - e[0]) * i + (n[1] - e[1]) * o) / a, u = Math.max(0, Math.min(1, u)));
  const h = e[0] + u * i, f = e[1] + u * o, g = n[0] - h, m = n[1] - f;
  return Math.sqrt(g * g + m * m);
}
function gv(n, e) {
  return e.coordinates.some((t) => {
    for (let i = 0; i < t.length - 1; i++)
      if (fv(n, t[i], t[i + 1]) <= hv)
        return !0;
    return !1;
  });
}
function Fc(n, e) {
  return !(n[0] > e[0] || n[2] < e[2] || n[1] > e[1] || n[3] < e[3]);
}
function Ho(n, e) {
  return n[0] === e[0] && n[1] === e[1];
}
function Bc(n, e) {
  return [(n[0] + e[0]) / 2, (n[1] + e[1]) / 2];
}
function er(n, e = {}) {
  const t = Ue(n);
  switch (!e.properties && n.type === "Feature" && (e.properties = n.properties), t.type) {
    case "Polygon":
      return dv(t, e);
    case "MultiPolygon":
      return vv(t, e);
    default:
      throw new Error("invalid poly");
  }
}
function dv(n, e = {}) {
  const i = Ue(n).coordinates, o = e.properties ? e.properties : n.type === "Feature" ? n.properties : {};
  return Gc(i, o);
}
function vv(n, e = {}) {
  const i = Ue(n).coordinates, o = e.properties ? e.properties : n.type === "Feature" ? n.properties : {}, a = [];
  return i.forEach((u) => {
    a.push(Gc(u, o));
  }), ce(a);
}
function Gc(n, e) {
  return n.length > 1 ? pn(n, e) : Se(n[0], e);
}
var mv = Object.defineProperty, ur = (n, e) => mv(n, "name", { value: e, configurable: !0 }), qc = class {
  constructor(e) {
    this.direction = !1, this.compareProperties = !0;
    var t, i, o;
    this.precision = 10 ** -((t = e == null ? void 0 : e.precision) != null ? t : 17), this.direction = (i = e == null ? void 0 : e.direction) != null ? i : !1, this.compareProperties = (o = e == null ? void 0 : e.compareProperties) != null ? o : !0;
  }
  compare(e, t) {
    if (e.type !== t.type || !Mr(e, t))
      return !1;
    switch (e.type) {
      case "Point":
        return this.compareCoord(e.coordinates, t.coordinates);
      case "LineString":
        return this.compareLine(e.coordinates, t.coordinates);
      case "Polygon":
        return this.comparePolygon(e, t);
      case "GeometryCollection":
        return this.compareGeometryCollection(e, t);
      case "Feature":
        return this.compareFeature(e, t);
      case "FeatureCollection":
        return this.compareFeatureCollection(e, t);
      default:
        if (e.type.startsWith("Multi")) {
          const i = co(e), o = co(
            t
          );
          return i.every(
            (a) => o.some((u) => this.compare(a, u))
          );
        }
    }
    return !1;
  }
  compareCoord(e, t) {
    return e.length === t.length && e.every((i, o) => Math.abs(i - t[o]) < this.precision);
  }
  compareLine(e, t, i = 0, o = !1) {
    if (!Mr(e, t))
      return !1;
    const a = e;
    let u = t;
    if (o && !this.compareCoord(a[0], u[0])) {
      const f = this.fixStartIndex(u, a);
      if (f)
        u = f;
      else
        return !1;
    }
    const h = this.compareCoord(a[i], u[i]);
    return this.direction || h ? this.comparePath(a, u) : this.compareCoord(a[i], u[u.length - (1 + i)]) ? this.comparePath(a.slice().reverse(), u) : !1;
  }
  fixStartIndex(e, t) {
    let i, o = -1;
    for (let a = 0; a < e.length; a++)
      if (this.compareCoord(e[a], t[0])) {
        o = a;
        break;
      }
    return o >= 0 && (i = [].concat(
      e.slice(o, e.length),
      e.slice(1, o + 1)
    )), i;
  }
  comparePath(e, t) {
    return e.every((i, o) => this.compareCoord(i, t[o]));
  }
  comparePolygon(e, t) {
    if (this.compareLine(e.coordinates[0], t.coordinates[0], 1, !0)) {
      const i = e.coordinates.slice(1, e.coordinates.length), o = t.coordinates.slice(1, t.coordinates.length);
      return i.every(
        (a) => o.some((u) => this.compareLine(a, u, 1, !0))
      );
    }
    return !1;
  }
  compareGeometryCollection(e, t) {
    return Mr(e.geometries, t.geometries) && this.compareBBox(e, t) && e.geometries.every((i, o) => this.compare(i, t.geometries[o]));
  }
  compareFeature(e, t) {
    return e.id === t.id && (this.compareProperties ? $o(e.properties, t.properties) : !0) && this.compareBBox(e, t) && this.compare(e.geometry, t.geometry);
  }
  compareFeatureCollection(e, t) {
    return Mr(e.features, t.features) && this.compareBBox(e, t) && e.features.every((i, o) => this.compare(i, t.features[o]));
  }
  compareBBox(e, t) {
    return !e.bbox && !t.bbox || (e.bbox && t.bbox ? this.compareCoord(e.bbox, t.bbox) : !1);
  }
};
ur(qc, "GeojsonEquality");
var yv = qc;
function Mr(n, e) {
  return n.coordinates ? n.coordinates.length === e.coordinates.length : n.length === e.length;
}
ur(Mr, "sameLength");
function co(n) {
  return n.coordinates.map((e) => ({
    type: n.type.replace("Multi", ""),
    coordinates: e
  }));
}
ur(co, "explode");
function Wo(n, e, t) {
  return new yv(t).compare(n, e);
}
ur(Wo, "geojsonEquality");
function $o(n, e) {
  if (n === null && e === null)
    return !0;
  if (n === null || e === null)
    return !1;
  const t = Object.keys(n), i = Object.keys(e);
  if (t.length !== i.length) return !1;
  for (var o of t) {
    const a = n[o], u = e[o], h = Tu(a) && Tu(u);
    if (h && !$o(a, u) || !h && a !== u)
      return !1;
  }
  return !0;
}
ur($o, "equal");
var Tu = /* @__PURE__ */ ur((n) => n != null && typeof n == "object", "isObject");
function Nn(n, e = {}) {
  var t = typeof e == "object" ? e.mutate : e;
  if (!n) throw new Error("geojson is required");
  var i = xt(n), o = [];
  switch (i) {
    case "LineString":
      o = $s(n, i);
      break;
    case "MultiLineString":
    case "Polygon":
      ve(n).forEach(function(u) {
        o.push($s(u, i));
      });
      break;
    case "MultiPolygon":
      ve(n).forEach(function(u) {
        var h = [];
        u.forEach(function(f) {
          h.push($s(f, i));
        }), o.push(h);
      });
      break;
    case "Point":
      return n;
    case "MultiPoint":
      var a = {};
      ve(n).forEach(function(u) {
        var h = u.join("-");
        Object.prototype.hasOwnProperty.call(a, h) || (o.push(u), a[h] = !0);
      });
      break;
    default:
      throw new Error(i + " geometry not supported");
  }
  return n.coordinates ? t === !0 ? (n.coordinates = o, n) : { type: i, coordinates: o } : t === !0 ? (n.geometry.coordinates = o, n) : Qe({ type: i, coordinates: o }, n.properties, {
    bbox: n.bbox,
    id: n.id
  });
}
function $s(n, e) {
  const t = ve(n);
  if (t.length === 2 && !Ou(t[0], t[1])) return t;
  const i = [];
  let o = 0, a = 1, u = 2;
  for (i.push(t[o]); u < t.length; )
    Ie(t[a], Se([t[o], t[u]])) ? a = u : (i.push(t[a]), o = a, a++, u = a), u++;
  if (i.push(t[a]), e === "Polygon" || e === "MultiPolygon") {
    if (Ie(
      i[0],
      Se([i[1], i[i.length - 2]])
    ) && (i.shift(), i.pop(), i.push(i[0])), i.length < 4)
      throw new Error("invalid polygon, fewer than 4 points");
    if (!Ou(i[0], i[i.length - 1]))
      throw new Error("invalid polygon, first and last points not equal");
  }
  return i;
}
function Ou(n, e) {
  return n[0] === e[0] && n[1] === e[1];
}
function br(n, e, t = {}) {
  let i = t.precision;
  if (i = i == null || isNaN(i) ? 6 : i, typeof i != "number" || !(i >= 0))
    throw new Error("precision must be a positive number");
  const o = Ue(n).type, a = Ue(e).type;
  return o !== a ? !1 : Wo(Nn(n), Nn(e), {
    precision: i
  });
}
function zc(n, e) {
  var t = Ue(n), i = Ue(e), o = t.type, a = i.type;
  switch (o) {
    case "MultiPoint":
      switch (a) {
        case "LineString":
          return Au(t, i);
        case "Polygon":
          return Du(t, i);
        default:
          throw new Error("feature2 " + a + " geometry not supported");
      }
    case "LineString":
      switch (a) {
        case "MultiPoint":
          return Au(i, t);
        case "LineString":
          return pv(t, i);
        case "Polygon":
          return Ru(t, i);
        default:
          throw new Error("feature2 " + a + " geometry not supported");
      }
    case "Polygon":
      switch (a) {
        case "MultiPoint":
          return Du(i, t);
        case "LineString":
          return Ru(i, t);
        default:
          throw new Error("feature2 " + a + " geometry not supported");
      }
    default:
      throw new Error("feature1 " + o + " geometry not supported");
  }
}
function Au(n, e) {
  for (var t = !1, i = !1, o = n.coordinates.length, a = 0; a < o && (!t || !i); a++) {
    for (var u = !1, h = 0; h < e.coordinates.length - 1; h++) {
      var f = !0;
      if ((h === 0 || h === e.coordinates.length - 2) && (f = !1), _v(
        e.coordinates[h],
        e.coordinates[h + 1],
        n.coordinates[a],
        f
      )) {
        u = !0;
        break;
      }
    }
    u ? t = !0 : i = !0;
  }
  return t && i;
}
function pv(n, e) {
  const t = Jt(n, e);
  if (t.features.length === 0) return !1;
  for (const i of t.features)
    if (!br(i, de(n.coordinates[0])) && !br(
      i,
      de(n.coordinates[n.coordinates.length - 1])
    ) && !br(i, de(e.coordinates[0])) && !br(
      i,
      de(e.coordinates[e.coordinates.length - 1])
    ))
      return !0;
  return !1;
}
function Ru(n, e) {
  const t = er(e);
  return Jt(n, t).features.length > 0;
}
function Du(n, e) {
  var t = !1, i = !1, o = n.coordinates.length;
  for (let a = 0; a < o && (!t || !i); a++)
    xe(de(n.coordinates[a]), e) ? t = !0 : i = !0;
  return i && t;
}
function _v(n, e, t, i) {
  var o = t[0] - n[0], a = t[1] - n[1], u = e[0] - n[0], h = e[1] - n[1], f = o * h - a * u;
  return f !== 0 ? !1 : i ? Math.abs(u) >= Math.abs(h) ? u > 0 ? n[0] <= t[0] && t[0] <= e[0] : e[0] <= t[0] && t[0] <= n[0] : h > 0 ? n[1] <= t[1] && t[1] <= e[1] : e[1] <= t[1] && t[1] <= n[1] : Math.abs(u) >= Math.abs(h) ? u > 0 ? n[0] < t[0] && t[0] < e[0] : e[0] < t[0] && t[0] < n[0] : h > 0 ? n[1] < t[1] && t[1] < e[1] : e[1] < t[1] && t[1] < n[1];
}
function Zo(n, e, {
  ignoreSelfIntersections: t = !0
} = { ignoreSelfIntersections: !0 }) {
  let i = !0;
  return it(n, (o) => {
    it(e, (a) => {
      if (i === !1)
        return !1;
      i = wv(
        o.geometry,
        a.geometry,
        t
      );
    });
  }), i;
}
function wv(n, e, t) {
  switch (n.type) {
    case "Point":
      switch (e.type) {
        case "Point":
          return !Cv(n.coordinates, e.coordinates);
        case "LineString":
          return !Yi(e, n);
        case "Polygon":
          return !xe(n, e);
      }
      break;
    case "LineString":
      switch (e.type) {
        case "Point":
          return !Yi(n, e);
        case "LineString":
          return !xv(n, e, t);
        case "Polygon":
          return !Fu(e, n, t);
      }
      break;
    case "Polygon":
      switch (e.type) {
        case "Point":
          return !xe(e, n);
        case "LineString":
          return !Fu(n, e, t);
        case "Polygon":
          return !Ev(e, n, t);
      }
  }
  return !1;
}
function Yi(n, e) {
  for (let t = 0; t < n.coordinates.length - 1; t++)
    if (kv(
      n.coordinates[t],
      n.coordinates[t + 1],
      e.coordinates
    ))
      return !0;
  return !1;
}
function xv(n, e, t) {
  if (Jt(n, e, {
    ignoreSelfIntersections: t
  }).features.length > 0)
    return !0;
  for (const o of n.coordinates)
    if (Yi(e, { coordinates: o }))
      return !0;
  for (const o of e.coordinates)
    if (Yi(n, { coordinates: o }))
      return !0;
  return !1;
}
function Fu(n, e, t) {
  for (const o of e.coordinates)
    if (xe(o, n))
      return !0;
  return Jt(e, er(n), {
    ignoreSelfIntersections: t
  }).features.length > 0;
}
function Ev(n, e, t) {
  for (const o of n.coordinates[0])
    if (xe(o, e))
      return !0;
  for (const o of e.coordinates[0])
    if (xe(o, n))
      return !0;
  return Jt(
    er(n),
    er(e),
    { ignoreSelfIntersections: t }
  ).features.length > 0;
}
function kv(n, e, t) {
  const i = t[0] - n[0], o = t[1] - n[1], a = e[0] - n[0], u = e[1] - n[1];
  return i * u - o * a !== 0 ? !1 : Math.abs(a) >= Math.abs(u) ? a > 0 ? n[0] <= t[0] && t[0] <= e[0] : e[0] <= t[0] && t[0] <= n[0] : u > 0 ? n[1] <= t[1] && t[1] <= e[1] : e[1] <= t[1] && t[1] <= n[1];
}
function Cv(n, e) {
  return n[0] === e[0] && n[1] === e[1];
}
function Yc(n, e, {
  ignoreSelfIntersections: t = !0
} = {}) {
  return !Zo(n, e, { ignoreSelfIntersections: t });
}
var Uc = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ti(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
function Xc(n) {
  if (n.__esModule) return n;
  var e = n.default;
  if (typeof e == "function") {
    var t = function i() {
      return this instanceof i ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(n).forEach(function(i) {
    var o = Object.getOwnPropertyDescriptor(n, i);
    Object.defineProperty(t, i, o.get ? o : {
      enumerable: !0,
      get: function() {
        return n[i];
      }
    });
  }), t;
}
var Iv = function n(e, t) {
  if (e === t) return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor) return !1;
    var i, o, a;
    if (Array.isArray(e)) {
      if (i = e.length, i != t.length) return !1;
      for (o = i; o-- !== 0; )
        if (!n(e[o], t[o])) return !1;
      return !0;
    }
    if (e.constructor === RegExp) return e.source === t.source && e.flags === t.flags;
    if (e.valueOf !== Object.prototype.valueOf) return e.valueOf() === t.valueOf();
    if (e.toString !== Object.prototype.toString) return e.toString() === t.toString();
    if (a = Object.keys(e), i = a.length, i !== Object.keys(t).length) return !1;
    for (o = i; o-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(t, a[o])) return !1;
    for (o = i; o-- !== 0; ) {
      var u = a[o];
      if (!n(e[u], t[u])) return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
};
const Pr = /* @__PURE__ */ ti(Iv);
function Vc(n, e, t = {}) {
  if (t = t || {}, !Re(t)) throw new Error("options is invalid");
  var i = t.tolerance || 0, o = [], a = is();
  const u = qr(n);
  a.load(u);
  var h;
  let f = [];
  return $t(e, function(g) {
    var m = !1;
    if (!g)
      return;
    let v = g;
    if (i !== 0) {
      const p = Kr(i, "kilometers"), _ = ze(g);
      v = [
        _[0] - p,
        _[1] - p,
        _[2] + p,
        _[3] + p
      ];
    }
    Pe(a.search(v), function(p) {
      if (m === !1) {
        var _ = ve(g).sort(), w = ve(p).sort();
        if (Pr(_, w))
          m = !0, h ? h = Zs(h, g) || h : h = g;
        else if (i === 0 ? Ie(_[0], p) && Ie(_[1], p) : on(p, _[0]).properties.pointDistance <= i && on(p, _[1]).properties.pointDistance <= i)
          m = !0, h ? h = Zs(h, g) || h : h = g;
        else if (i === 0 ? Ie(w[0], g) && Ie(w[1], g) : on(g, w[0]).properties.pointDistance <= i && on(g, w[1]).properties.pointDistance <= i)
          if (h) {
            const C = Zs(h, p);
            C ? h = C : f.push(p);
          } else h = p;
      }
    }), m === !1 && h && (o.push(h), f.length && (o = o.concat(f), f = []), h = void 0);
  }), h && o.push(h), ce(o);
}
function Zs(n, e) {
  var t = ve(e), i = ve(n), o = i[0], a = i[i.length - 1], u = n.geometry.coordinates;
  if (Pr(t[0], o)) u.unshift(t[1]);
  else if (Pr(t[0], a)) u.push(t[1]);
  else if (Pr(t[1], o)) u.unshift(t[0]);
  else if (Pr(t[1], a)) u.push(t[0]);
  else return;
  return n;
}
function Sv(n, e) {
  const t = Ue(n), i = Ue(e), o = t.type, a = i.type;
  if (o === "MultiPoint" && a !== "MultiPoint" || (o === "LineString" || o === "MultiLineString") && a !== "LineString" && a !== "MultiLineString" || (o === "Polygon" || o === "MultiPolygon") && a !== "Polygon" && a !== "MultiPolygon")
    throw new Error("features must be of the same type");
  if (o === "Point") throw new Error("Point geometry not supported");
  if (Wo(n, e, { precision: 6 }))
    return !1;
  let u = 0;
  switch (o) {
    case "MultiPoint":
      for (var h = 0; h < t.coordinates.length; h++)
        for (var f = 0; f < i.coordinates.length; f++) {
          var g = t.coordinates[h], m = i.coordinates[f];
          if (g[0] === m[0] && g[1] === m[1])
            return !0;
        }
      return !1;
    case "LineString":
    case "MultiLineString":
      $t(n, (v) => {
        $t(e, (p) => {
          Vc(v, p).features.length && u++;
        });
      });
      break;
    case "Polygon":
    case "MultiPolygon":
      $t(n, (v) => {
        $t(e, (p) => {
          Jt(v, p).features.length && u++;
        });
      });
      break;
  }
  return u > 0;
}
function Mv(n, e) {
  if (!n) throw new Error("line1 is required");
  if (!e) throw new Error("line2 is required");
  var t = Bu(n, "line1");
  if (t !== "LineString") throw new Error("line1 must be a LineString");
  var i = Bu(e, "line2");
  if (i !== "LineString") throw new Error("line2 must be a LineString");
  for (var o = qr(Nn(n)).features, a = qr(Nn(e)).features, u = 0; u < o.length; u++) {
    var h = o[u].geometry.coordinates;
    if (!a[u]) break;
    var f = a[u].geometry.coordinates;
    if (!bv(h, f)) return !1;
  }
  return !0;
}
function bv(n, e) {
  var t = jn(Ln(n[0], n[1])), i = jn(Ln(e[0], e[1]));
  return t === i || (i - t) % 180 === 0;
}
function Bu(n, e) {
  if (n.geometry && n.geometry.type)
    return n.geometry.type;
  if (n.type) return n.type;
  throw new Error("Invalid GeoJSON object for " + e);
}
function Pv(n, e) {
  var t = Ue(n), i = Ue(e), o = t.type, a = i.type;
  switch (o) {
    case "Point":
      switch (a) {
        case "LineString":
          return ht(t, i);
        case "MultiLineString":
          for (var u = !1, h = 0; h < i.coordinates.length; h++)
            ht(t, {
              coordinates: i.coordinates[h]
            }) && (u = !0);
          return u;
        case "Polygon":
          for (var f = 0; f < i.coordinates.length; f++)
            if (Ie(t, {
              type: "LineString",
              coordinates: i.coordinates[f]
            }))
              return !0;
          return !1;
        case "MultiPolygon":
          for (var f = 0; f < i.coordinates.length; f++)
            for (var h = 0; h < i.coordinates[f].length; h++)
              if (Ie(t, {
                type: "LineString",
                coordinates: i.coordinates[f][h]
              }))
                return !0;
          return !1;
        default:
          throw new Error("feature2 " + a + " geometry not supported");
      }
    case "MultiPoint":
      switch (a) {
        case "LineString":
          for (var u = !1, f = 0; f < t.coordinates.length; f++)
            if (u || ht(
              { coordinates: t.coordinates[f] },
              i
            ) && (u = !0), Ie(
              { type: "Point", coordinates: t.coordinates[f] },
              i,
              { ignoreEndVertices: !0 }
            ))
              return !1;
          return u;
        case "MultiLineString":
          for (var u = !1, f = 0; f < t.coordinates.length; f++)
            for (var h = 0; h < i.coordinates.length; h++)
              if (u || ht(
                { coordinates: t.coordinates[f] },
                { coordinates: i.coordinates[h] }
              ) && (u = !0), Ie(
                { type: "Point", coordinates: t.coordinates[f] },
                { type: "LineString", coordinates: i.coordinates[h] },
                { ignoreEndVertices: !0 }
              ))
                return !1;
          return u;
        case "Polygon":
          for (var u = !1, f = 0; f < t.coordinates.length; f++)
            if (u || Ie(
              { type: "Point", coordinates: t.coordinates[f] },
              { type: "LineString", coordinates: i.coordinates[0] }
            ) && (u = !0), xe(
              { type: "Point", coordinates: t.coordinates[f] },
              i,
              { ignoreBoundary: !0 }
            ))
              return !1;
          return u;
        case "MultiPolygon":
          for (var u = !1, f = 0; f < t.coordinates.length; f++)
            for (var h = 0; h < i.coordinates.length; h++)
              if (u || Ie(
                { type: "Point", coordinates: t.coordinates[f] },
                {
                  type: "LineString",
                  coordinates: i.coordinates[h][0]
                }
              ) && (u = !0), xe(
                { type: "Point", coordinates: t.coordinates[f] },
                { type: "Polygon", coordinates: i.coordinates[h] },
                { ignoreBoundary: !0 }
              ))
                return !1;
          return u;
        default:
          throw new Error("feature2 " + a + " geometry not supported");
      }
    case "LineString":
      switch (a) {
        case "Point":
          return ht(i, t);
        case "MultiPoint":
          for (var u = !1, f = 0; f < i.coordinates.length; f++)
            if (u || ht(
              { coordinates: i.coordinates[f] },
              t
            ) && (u = !0), Ie(
              { type: "Point", coordinates: i.coordinates[f] },
              t,
              { ignoreEndVertices: !0 }
            ))
              return !1;
          return u;
        case "LineString":
          var g = !1;
          if (ht(
            { coordinates: t.coordinates[0] },
            i
          ) && (g = !0), ht(
            {
              coordinates: t.coordinates[t.coordinates.length - 1]
            },
            i
          ) && (g = !0), g === !1) return !1;
          for (var f = 0; f < t.coordinates.length; f++)
            if (Ie(
              { type: "Point", coordinates: t.coordinates[f] },
              i,
              { ignoreEndVertices: !0 }
            ))
              return !1;
          return g;
        case "MultiLineString":
          for (var g = !1, f = 0; f < i.coordinates.length; f++) {
            ht(
              { coordinates: t.coordinates[0] },
              { coordinates: i.coordinates[f] }
            ) && (g = !0), ht(
              {
                coordinates: t.coordinates[t.coordinates.length - 1]
              },
              { coordinates: i.coordinates[f] }
            ) && (g = !0);
            for (var h = 0; h < t.coordinates[f].length; h++)
              if (Ie(
                { type: "Point", coordinates: t.coordinates[h] },
                { type: "LineString", coordinates: i.coordinates[f] },
                { ignoreEndVertices: !0 }
              ))
                return !1;
          }
          return g;
        case "Polygon":
          for (var u = !1, f = 0; f < t.coordinates.length; f++)
            if (u || Ie(
              { type: "Point", coordinates: t.coordinates[f] },
              { type: "LineString", coordinates: i.coordinates[0] }
            ) && (u = !0), xe(
              { type: "Point", coordinates: t.coordinates[f] },
              i,
              { ignoreBoundary: !0 }
            ))
              return !1;
          return u;
        case "MultiPolygon":
          for (var u = !1, f = 0; f < t.coordinates.length; f++) {
            for (var h = 0; h < i.coordinates.length; h++)
              u || Ie(
                { type: "Point", coordinates: t.coordinates[f] },
                {
                  type: "LineString",
                  coordinates: i.coordinates[h][0]
                }
              ) && (u = !0);
            if (xe(
              { type: "Point", coordinates: t.coordinates[f] },
              i,
              { ignoreBoundary: !0 }
            ))
              return !1;
          }
          return u;
        default:
          throw new Error("feature2 " + a + " geometry not supported");
      }
    case "MultiLineString":
      switch (a) {
        case "Point":
          for (var f = 0; f < t.coordinates.length; f++)
            if (ht(i, {
              coordinates: t.coordinates[f]
            }))
              return !0;
          return !1;
        case "MultiPoint":
          for (var u = !1, f = 0; f < t.coordinates.length; f++)
            for (var h = 0; h < i.coordinates.length; h++)
              if (u || ht(
                { coordinates: i.coordinates[h] },
                { coordinates: t.coordinates[h] }
              ) && (u = !0), Ie(
                { type: "Point", coordinates: i.coordinates[h] },
                { type: "LineString", coordinates: t.coordinates[h] },
                { ignoreEndVertices: !0 }
              ))
                return !1;
          return u;
        case "LineString":
          for (var g = !1, f = 0; f < t.coordinates.length; f++) {
            ht(
              { coordinates: t.coordinates[f][0] },
              i
            ) && (g = !0), ht(
              {
                coordinates: t.coordinates[f][t.coordinates[f].length - 1]
              },
              i
            ) && (g = !0);
            for (var h = 0; h < i.coordinates.length; h++)
              if (Ie(
                { type: "Point", coordinates: i.coordinates[h] },
                { type: "LineString", coordinates: t.coordinates[f] },
                { ignoreEndVertices: !0 }
              ))
                return !1;
          }
          return g;
        case "MultiLineString":
          for (var g = !1, f = 0; f < t.coordinates.length; f++)
            for (var h = 0; h < i.coordinates.length; h++) {
              ht(
                { coordinates: t.coordinates[f][0] },
                { coordinates: i.coordinates[h] }
              ) && (g = !0), ht(
                {
                  coordinates: t.coordinates[f][t.coordinates[f].length - 1]
                },
                { coordinates: i.coordinates[h] }
              ) && (g = !0);
              for (var m = 0; m < t.coordinates[f].length; m++)
                if (Ie(
                  { type: "Point", coordinates: t.coordinates[f][m] },
                  { type: "LineString", coordinates: i.coordinates[h] },
                  { ignoreEndVertices: !0 }
                ))
                  return !1;
            }
          return g;
        case "Polygon":
          for (var u = !1, f = 0; f < t.coordinates.length; f++)
            for (var h = 0; h < t.coordinates.length; h++)
              if (u || Ie(
                { type: "Point", coordinates: t.coordinates[f][h] },
                { type: "LineString", coordinates: i.coordinates[0] }
              ) && (u = !0), xe(
                { type: "Point", coordinates: t.coordinates[f][h] },
                i,
                { ignoreBoundary: !0 }
              ))
                return !1;
          return u;
        case "MultiPolygon":
          for (var u = !1, f = 0; f < i.coordinates[0].length; f++)
            for (var h = 0; h < t.coordinates.length; h++)
              for (var m = 0; m < t.coordinates[h].length; m++)
                if (u || Ie(
                  {
                    type: "Point",
                    coordinates: t.coordinates[h][m]
                  },
                  {
                    type: "LineString",
                    coordinates: i.coordinates[0][f]
                  }
                ) && (u = !0), xe(
                  { type: "Point", coordinates: t.coordinates[h][m] },
                  { type: "Polygon", coordinates: [i.coordinates[0][f]] },
                  { ignoreBoundary: !0 }
                ))
                  return !1;
          return u;
        default:
          throw new Error("feature2 " + a + " geometry not supported");
      }
    case "Polygon":
      switch (a) {
        case "Point":
          for (var f = 0; f < t.coordinates.length; f++)
            if (Ie(i, {
              type: "LineString",
              coordinates: t.coordinates[f]
            }))
              return !0;
          return !1;
        case "MultiPoint":
          for (var u = !1, f = 0; f < i.coordinates.length; f++)
            if (u || Ie(
              { type: "Point", coordinates: i.coordinates[f] },
              { type: "LineString", coordinates: t.coordinates[0] }
            ) && (u = !0), xe(
              { type: "Point", coordinates: i.coordinates[f] },
              t,
              { ignoreBoundary: !0 }
            ))
              return !1;
          return u;
        case "LineString":
          for (var u = !1, f = 0; f < i.coordinates.length; f++)
            if (u || Ie(
              { type: "Point", coordinates: i.coordinates[f] },
              { type: "LineString", coordinates: t.coordinates[0] }
            ) && (u = !0), xe(
              { type: "Point", coordinates: i.coordinates[f] },
              t,
              { ignoreBoundary: !0 }
            ))
              return !1;
          return u;
        case "MultiLineString":
          for (var u = !1, f = 0; f < i.coordinates.length; f++)
            for (var h = 0; h < i.coordinates[f].length; h++)
              if (u || Ie(
                { type: "Point", coordinates: i.coordinates[f][h] },
                { type: "LineString", coordinates: t.coordinates[0] }
              ) && (u = !0), xe(
                { type: "Point", coordinates: i.coordinates[f][h] },
                t,
                { ignoreBoundary: !0 }
              ))
                return !1;
          return u;
        case "Polygon":
          for (var u = !1, f = 0; f < t.coordinates[0].length; f++)
            if (u || Ie(
              { type: "Point", coordinates: t.coordinates[0][f] },
              { type: "LineString", coordinates: i.coordinates[0] }
            ) && (u = !0), xe(
              { type: "Point", coordinates: t.coordinates[0][f] },
              i,
              { ignoreBoundary: !0 }
            ))
              return !1;
          return u;
        case "MultiPolygon":
          for (var u = !1, f = 0; f < i.coordinates[0].length; f++)
            for (var h = 0; h < t.coordinates[0].length; h++)
              if (u || Ie(
                { type: "Point", coordinates: t.coordinates[0][h] },
                { type: "LineString", coordinates: i.coordinates[0][f] }
              ) && (u = !0), xe(
                { type: "Point", coordinates: t.coordinates[0][h] },
                { type: "Polygon", coordinates: i.coordinates[0][f] },
                { ignoreBoundary: !0 }
              ))
                return !1;
          return u;
        default:
          throw new Error("feature2 " + a + " geometry not supported");
      }
    case "MultiPolygon":
      switch (a) {
        case "Point":
          for (var f = 0; f < t.coordinates[0].length; f++)
            if (Ie(i, {
              type: "LineString",
              coordinates: t.coordinates[0][f]
            }))
              return !0;
          return !1;
        case "MultiPoint":
          for (var u = !1, f = 0; f < t.coordinates[0].length; f++)
            for (var h = 0; h < i.coordinates.length; h++)
              if (u || Ie(
                { type: "Point", coordinates: i.coordinates[h] },
                { type: "LineString", coordinates: t.coordinates[0][f] }
              ) && (u = !0), xe(
                { type: "Point", coordinates: i.coordinates[h] },
                { type: "Polygon", coordinates: t.coordinates[0][f] },
                { ignoreBoundary: !0 }
              ))
                return !1;
          return u;
        case "LineString":
          for (var u = !1, f = 0; f < t.coordinates[0].length; f++)
            for (var h = 0; h < i.coordinates.length; h++)
              if (u || Ie(
                { type: "Point", coordinates: i.coordinates[h] },
                { type: "LineString", coordinates: t.coordinates[0][f] }
              ) && (u = !0), xe(
                { type: "Point", coordinates: i.coordinates[h] },
                { type: "Polygon", coordinates: t.coordinates[0][f] },
                { ignoreBoundary: !0 }
              ))
                return !1;
          return u;
        case "MultiLineString":
          for (var u = !1, f = 0; f < t.coordinates.length; f++)
            for (var h = 0; h < i.coordinates.length; h++)
              for (var m = 0; m < i.coordinates[h].length; m++)
                if (u || Ie(
                  {
                    type: "Point",
                    coordinates: i.coordinates[h][m]
                  },
                  {
                    type: "LineString",
                    coordinates: t.coordinates[f][0]
                  }
                ) && (u = !0), xe(
                  { type: "Point", coordinates: i.coordinates[h][m] },
                  { type: "Polygon", coordinates: [t.coordinates[f][0]] },
                  { ignoreBoundary: !0 }
                ))
                  return !1;
          return u;
        case "Polygon":
          for (var u = !1, f = 0; f < t.coordinates[0].length; f++)
            for (var h = 0; h < t.coordinates[0][f].length; h++)
              if (u || Ie(
                { type: "Point", coordinates: t.coordinates[0][f][h] },
                { type: "LineString", coordinates: i.coordinates[0] }
              ) && (u = !0), xe(
                { type: "Point", coordinates: t.coordinates[0][f][h] },
                i,
                { ignoreBoundary: !0 }
              ))
                return !1;
          return u;
        case "MultiPolygon":
          for (var u = !1, f = 0; f < t.coordinates[0].length; f++)
            for (var h = 0; h < i.coordinates[0].length; h++)
              for (var m = 0; m < t.coordinates[0].length; m++)
                if (u || Ie(
                  {
                    type: "Point",
                    coordinates: t.coordinates[0][f][m]
                  },
                  {
                    type: "LineString",
                    coordinates: i.coordinates[0][h]
                  }
                ) && (u = !0), xe(
                  {
                    type: "Point",
                    coordinates: t.coordinates[0][f][m]
                  },
                  { type: "Polygon", coordinates: i.coordinates[0][h] },
                  { ignoreBoundary: !0 }
                ))
                  return !1;
          return u;
        default:
          throw new Error("feature2 " + a + " geometry not supported");
      }
    default:
      throw new Error("feature1 " + o + " geometry not supported");
  }
}
function ht(n, e) {
  return !!(Gu(e.coordinates[0], n.coordinates) || Gu(
    e.coordinates[e.coordinates.length - 1],
    n.coordinates
  ));
}
function Gu(n, e) {
  return n[0] === e[0] && n[1] === e[1];
}
var Lv = /* @__PURE__ */ new Set([
  "Point",
  "LineString",
  "MultiLineString",
  "MultiPoint",
  "Polygon",
  "MultiPolygon"
]);
function Hc(n) {
  if (!n.type) return !1;
  const e = Ue(n), t = e.type, i = e.coordinates;
  switch (t) {
    case "Point":
      return i.length > 1;
    case "MultiPoint":
      for (var o = 0; o < i.length; o++)
        if (i[o].length < 2) return !1;
      return !0;
    case "LineString":
      if (i.length < 2) return !1;
      for (var o = 0; o < i.length; o++)
        if (i[o].length < 2) return !1;
      return !0;
    case "MultiLineString":
      if (i.length < 1) return !1;
      for (var o = 0; o < i.length; o++)
        if (i[o].length < 2) return !1;
      return !0;
    case "Polygon":
      for (var o = 0; o < e.coordinates.length; o++)
        if (i[o].length < 4 || !qu(i[o]) || zu(i[o]) || o > 0 && Jt(ye([i[0]]), ye([i[o]])).features.length > 1)
          return !1;
      return !0;
    case "MultiPolygon":
      for (var o = 0; o < e.coordinates.length; o++)
        for (var a = e.coordinates[o], u = 0; u < a.length; u++)
          if (a[u].length < 4 || !qu(a[u]) || zu(a[u]) || u === 0 && !Nv(a, e.coordinates, o) || u > 0 && Jt(ye([a[0]]), ye([a[u]])).features.length > 1)
            return !1;
      return !0;
    case "GeometryCollection":
      return e.geometries ? Array.isArray(e.geometries) && e.geometries.length > 0 && e.geometries.every(
        (h) => Lv.has(h.type) && Hc(h)
      ) : !1;
    default:
      return !1;
  }
}
function qu(n) {
  return n[0][0] === n[n.length - 1][0] && n[0][1] === n[n.length - 1][1];
}
function zu(n) {
  for (var e = 0; e < n.length - 1; e++)
    for (var t = n[e], i = e + 1; i < n.length - 2; i++) {
      var o = [n[i], n[i + 1]];
      if (Ie(t, Se(o))) return !0;
    }
  return !1;
}
function Nv(n, e, t) {
  for (var i = ye(n), o = t + 1; o < e.length; o++)
    if (!Zo(i, ye(e[o])) && zc(i, Se(e[o][0])))
      return !1;
  return !0;
}
function Ko(n, e) {
  return Oc(e, n);
}
function os(n, e = {}) {
  const t = ze(n), i = (t[0] + t[2]) / 2, o = (t[1] + t[3]) / 2;
  return de([i, o], e.properties, e);
}
var Wc = { exports: {} };
(function(n, e) {
  (function(t, i) {
    n.exports = i();
  })(Uc, function() {
    function t(c, r) {
      (r == null || r > c.length) && (r = c.length);
      for (var s = 0, l = Array(r); s < r; s++) l[s] = c[s];
      return l;
    }
    function i(c, r, s) {
      return r = m(r), function(l, d) {
        if (d && (typeof d == "object" || typeof d == "function")) return d;
        if (d !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
        return function(y) {
          if (y === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return y;
        }(l);
      }(c, p() ? Reflect.construct(r, s || [], m(c).constructor) : r.apply(c, s));
    }
    function o(c, r) {
      if (!(c instanceof r)) throw new TypeError("Cannot call a class as a function");
    }
    function a(c, r, s) {
      if (p()) return Reflect.construct.apply(null, arguments);
      var l = [null];
      l.push.apply(l, r);
      var d = new (c.bind.apply(c, l))();
      return s && _(d, s.prototype), d;
    }
    function u(c, r) {
      for (var s = 0; s < r.length; s++) {
        var l = r[s];
        l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(c, b(l.key), l);
      }
    }
    function h(c, r, s) {
      return r && u(c.prototype, r), s && u(c, s), Object.defineProperty(c, "prototype", { writable: !1 }), c;
    }
    function f(c, r) {
      var s = typeof Symbol < "u" && c[Symbol.iterator] || c["@@iterator"];
      if (!s) {
        if (Array.isArray(c) || (s = S(c)) || r) {
          s && (c = s);
          var l = 0, d = function() {
          };
          return { s: d, n: function() {
            return l >= c.length ? { done: !0 } : { done: !1, value: c[l++] };
          }, e: function(L) {
            throw L;
          }, f: d };
        }
        throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      var y, x = !0, E = !1;
      return { s: function() {
        s = s.call(c);
      }, n: function() {
        var L = s.next();
        return x = L.done, L;
      }, e: function(L) {
        E = !0, y = L;
      }, f: function() {
        try {
          x || s.return == null || s.return();
        } finally {
          if (E) throw y;
        }
      } };
    }
    function g() {
      return g = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(c, r, s) {
        var l = function(y, x) {
          for (; !{}.hasOwnProperty.call(y, x) && (y = m(y)) !== null; ) ;
          return y;
        }(c, r);
        if (l) {
          var d = Object.getOwnPropertyDescriptor(l, r);
          return d.get ? d.get.call(arguments.length < 3 ? c : s) : d.value;
        }
      }, g.apply(null, arguments);
    }
    function m(c) {
      return m = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
        return r.__proto__ || Object.getPrototypeOf(r);
      }, m(c);
    }
    function v(c, r) {
      if (typeof r != "function" && r !== null) throw new TypeError("Super expression must either be null or a function");
      c.prototype = Object.create(r && r.prototype, { constructor: { value: c, writable: !0, configurable: !0 } }), Object.defineProperty(c, "prototype", { writable: !1 }), r && _(c, r);
    }
    function p() {
      try {
        var c = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
        }));
      } catch {
      }
      return (p = function() {
        return !!c;
      })();
    }
    function _(c, r) {
      return _ = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(s, l) {
        return s.__proto__ = l, s;
      }, _(c, r);
    }
    function w(c, r, s, l) {
      var d = g(m(1 & l ? c.prototype : c), r, s);
      return 2 & l && typeof d == "function" ? function(y) {
        return d.apply(s, y);
      } : d;
    }
    function C(c) {
      return function(r) {
        if (Array.isArray(r)) return t(r);
      }(c) || function(r) {
        if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
      }(c) || S(c) || function() {
        throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }();
    }
    function b(c) {
      var r = function(s, l) {
        if (typeof s != "object" || !s) return s;
        var d = s[Symbol.toPrimitive];
        if (d !== void 0) {
          var y = d.call(s, l);
          if (typeof y != "object") return y;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return String(s);
      }(c, "string");
      return typeof r == "symbol" ? r : r + "";
    }
    function S(c, r) {
      if (c) {
        if (typeof c == "string") return t(c, r);
        var s = {}.toString.call(c).slice(8, -1);
        return s === "Object" && c.constructor && (s = c.constructor.name), s === "Map" || s === "Set" ? Array.from(c) : s === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s) ? t(c, r) : void 0;
      }
    }
    function I(c) {
      var r = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
      return I = function(s) {
        if (s === null || !function(d) {
          try {
            return Function.toString.call(d).indexOf("[native code]") !== -1;
          } catch {
            return typeof d == "function";
          }
        }(s)) return s;
        if (typeof s != "function") throw new TypeError("Super expression must either be null or a function");
        if (r !== void 0) {
          if (r.has(s)) return r.get(s);
          r.set(s, l);
        }
        function l() {
          return a(s, arguments, m(this).constructor);
        }
        return l.prototype = Object.create(s.prototype, { constructor: { value: l, enumerable: !1, writable: !0, configurable: !0 } }), _(l, s);
      }, I(c);
    }
    var N = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "getEndCapStyle", value: function() {
        return this._endCapStyle;
      } }, { key: "isSingleSided", value: function() {
        return this._isSingleSided;
      } }, { key: "setQuadrantSegments", value: function(r) {
        this._quadrantSegments = r, this._quadrantSegments === 0 && (this._joinStyle = c.JOIN_BEVEL), this._quadrantSegments < 0 && (this._joinStyle = c.JOIN_MITRE, this._mitreLimit = Math.abs(this._quadrantSegments)), r <= 0 && (this._quadrantSegments = 1), this._joinStyle !== c.JOIN_ROUND && (this._quadrantSegments = c.DEFAULT_QUADRANT_SEGMENTS);
      } }, { key: "getJoinStyle", value: function() {
        return this._joinStyle;
      } }, { key: "setJoinStyle", value: function(r) {
        this._joinStyle = r;
      } }, { key: "setSimplifyFactor", value: function(r) {
        this._simplifyFactor = r < 0 ? 0 : r;
      } }, { key: "getSimplifyFactor", value: function() {
        return this._simplifyFactor;
      } }, { key: "getQuadrantSegments", value: function() {
        return this._quadrantSegments;
      } }, { key: "setEndCapStyle", value: function(r) {
        this._endCapStyle = r;
      } }, { key: "getMitreLimit", value: function() {
        return this._mitreLimit;
      } }, { key: "setMitreLimit", value: function(r) {
        this._mitreLimit = r;
      } }, { key: "setSingleSided", value: function(r) {
        this._isSingleSided = r;
      } }], [{ key: "constructor_", value: function() {
        if (this._quadrantSegments = c.DEFAULT_QUADRANT_SEGMENTS, this._endCapStyle = c.CAP_ROUND, this._joinStyle = c.JOIN_ROUND, this._mitreLimit = c.DEFAULT_MITRE_LIMIT, this._isSingleSided = !1, this._simplifyFactor = c.DEFAULT_SIMPLIFY_FACTOR, arguments.length !== 0) {
          if (arguments.length === 1) {
            var r = arguments[0];
            this.setQuadrantSegments(r);
          } else if (arguments.length === 2) {
            var s = arguments[0], l = arguments[1];
            this.setQuadrantSegments(s), this.setEndCapStyle(l);
          } else if (arguments.length === 4) {
            var d = arguments[0], y = arguments[1], x = arguments[2], E = arguments[3];
            this.setQuadrantSegments(d), this.setEndCapStyle(y), this.setJoinStyle(x), this.setMitreLimit(E);
          }
        }
      } }, { key: "bufferDistanceError", value: function(r) {
        var s = Math.PI / 2 / r;
        return 1 - Math.cos(s / 2);
      } }]);
    }();
    N.CAP_ROUND = 1, N.CAP_FLAT = 2, N.CAP_SQUARE = 3, N.JOIN_ROUND = 1, N.JOIN_MITRE = 2, N.JOIN_BEVEL = 3, N.DEFAULT_QUADRANT_SEGMENTS = 8, N.DEFAULT_MITRE_LIMIT = 5, N.DEFAULT_SIMPLIFY_FACTOR = 0.01;
    var A = function(c) {
      function r(s) {
        var l;
        return o(this, r), (l = i(this, r, [s])).name = Object.keys({ Exception: r })[0], l;
      }
      return v(r, c), h(r, [{ key: "toString", value: function() {
        return this.message;
      } }]);
    }(I(Error)), R = function(c) {
      function r(s) {
        var l;
        return o(this, r), (l = i(this, r, [s])).name = Object.keys({ IllegalArgumentException: r })[0], l;
      }
      return v(r, c), h(r);
    }(A), U = function() {
      return h(function c() {
        o(this, c);
      }, [{ key: "filter", value: function(c) {
      } }]);
    }();
    function V() {
    }
    function k() {
    }
    function M() {
    }
    var T, D, B, q, X, O, Y, G, H = function() {
      return h(function c() {
        o(this, c);
      }, null, [{ key: "equalsWithTolerance", value: function(c, r, s) {
        return Math.abs(c - r) <= s;
      } }]);
    }(), Q = function() {
      return h(function c(r, s) {
        o(this, c), this.low = s || 0, this.high = r || 0;
      }, null, [{ key: "toBinaryString", value: function(c) {
        var r, s = "";
        for (r = 2147483648; r > 0; r >>>= 1) s += (c.high & r) === r ? "1" : "0";
        for (r = 2147483648; r > 0; r >>>= 1) s += (c.low & r) === r ? "1" : "0";
        return s;
      } }]);
    }();
    function W() {
    }
    function j() {
    }
    W.NaN = NaN, W.isNaN = function(c) {
      return Number.isNaN(c);
    }, W.isInfinite = function(c) {
      return !Number.isFinite(c);
    }, W.MAX_VALUE = Number.MAX_VALUE, W.POSITIVE_INFINITY = Number.POSITIVE_INFINITY, W.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY, typeof Float64Array == "function" && typeof Int32Array == "function" ? (O = 2146435072, Y = new Float64Array(1), G = new Int32Array(Y.buffer), W.doubleToLongBits = function(c) {
      Y[0] = c;
      var r = 0 | G[0], s = 0 | G[1];
      return (s & O) === O && 1048575 & s && r !== 0 && (r = 0, s = 2146959360), new Q(s, r);
    }, W.longBitsToDouble = function(c) {
      return G[0] = c.low, G[1] = c.high, Y[0];
    }) : (T = 1023, D = Math.log2, B = Math.floor, q = Math.pow, X = function() {
      for (var c = 53; c > 0; c--) {
        var r = q(2, c) - 1;
        if (B(D(r)) + 1 === c) return r;
      }
      return 0;
    }(), W.doubleToLongBits = function(c) {
      var r, s, l, d, y, x, E, L, F;
      if (c < 0 || 1 / c === Number.NEGATIVE_INFINITY ? (x = 1 << 31, c = -c) : x = 0, c === 0) return new Q(L = x, F = 0);
      if (c === 1 / 0) return new Q(L = 2146435072 | x, F = 0);
      if (c != c) return new Q(L = 2146959360, F = 0);
      if (d = 0, F = 0, (r = B(c)) > 1) if (r <= X) (d = B(D(r))) <= 20 ? (F = 0, L = r << 20 - d & 1048575) : (F = r % (s = q(2, l = d - 20)) << 32 - l, L = r / s & 1048575);
      else for (l = r, F = 0; (l = B(s = l / 2)) !== 0; ) d++, F >>>= 1, F |= (1 & L) << 31, L >>>= 1, s !== l && (L |= 524288);
      if (E = d + T, y = r === 0, r = c - r, d < 52 && r !== 0) for (l = 0; ; ) {
        if ((s = 2 * r) >= 1 ? (r = s - 1, y ? (E--, y = !1) : (l <<= 1, l |= 1, d++)) : (r = s, y ? --E == 0 && (d++, y = !1) : (l <<= 1, d++)), d === 20) L |= l, l = 0;
        else if (d === 52) {
          F |= l;
          break;
        }
        if (s === 1) {
          d < 20 ? L |= l << 20 - d : d < 52 && (F |= l << 52 - d);
          break;
        }
      }
      return L |= E << 20, new Q(L |= x, F);
    }, W.longBitsToDouble = function(c) {
      var r, s, l, d, y = c.high, x = c.low, E = y & 1 << 31 ? -1 : 1;
      for (l = ((2146435072 & y) >> 20) - T, d = 0, s = 1 << 19, r = 1; r <= 20; r++) y & s && (d += q(2, -r)), s >>>= 1;
      for (s = 1 << 31, r = 21; r <= 52; r++) x & s && (d += q(2, -r)), s >>>= 1;
      if (l === -1023) {
        if (d === 0) return 0 * E;
        l = -1022;
      } else {
        if (l === 1024) return d === 0 ? E / 0 : NaN;
        d += 1;
      }
      return E * d * q(2, l);
    });
    var J = function(c) {
      function r(s) {
        var l;
        return o(this, r), (l = i(this, r, [s])).name = Object.keys({ RuntimeException: r })[0], l;
      }
      return v(r, c), h(r);
    }(A), re = function(c) {
      function r() {
        var s;
        return o(this, r), s = i(this, r), r.constructor_.apply(s, arguments), s;
      }
      return v(r, c), h(r, null, [{ key: "constructor_", value: function() {
        if (arguments.length === 0) J.constructor_.call(this);
        else if (arguments.length === 1) {
          var s = arguments[0];
          J.constructor_.call(this, s);
        }
      } }]);
    }(J), ee = function() {
      function c() {
        o(this, c);
      }
      return h(c, null, [{ key: "shouldNeverReachHere", value: function() {
        if (arguments.length === 0) c.shouldNeverReachHere(null);
        else if (arguments.length === 1) {
          var r = arguments[0];
          throw new re("Should never reach here" + (r !== null ? ": " + r : ""));
        }
      } }, { key: "isTrue", value: function() {
        if (arguments.length === 1) {
          var r = arguments[0];
          c.isTrue(r, null);
        } else if (arguments.length === 2) {
          var s = arguments[1];
          if (!arguments[0]) throw s === null ? new re() : new re(s);
        }
      } }, { key: "equals", value: function() {
        if (arguments.length === 2) {
          var r = arguments[0], s = arguments[1];
          c.equals(r, s, null);
        } else if (arguments.length === 3) {
          var l = arguments[0], d = arguments[1], y = arguments[2];
          if (!d.equals(l)) throw new re("Expected " + l + " but encountered " + d + (y !== null ? ": " + y : ""));
        }
      } }]);
    }(), te = new ArrayBuffer(8), se = new Float64Array(te), fe = new Int32Array(te), Z = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "getM", value: function() {
        return W.NaN;
      } }, { key: "setOrdinate", value: function(r, s) {
        switch (r) {
          case c.X:
            this.x = s;
            break;
          case c.Y:
            this.y = s;
            break;
          case c.Z:
            this.setZ(s);
            break;
          default:
            throw new R("Invalid ordinate index: " + r);
        }
      } }, { key: "equals2D", value: function() {
        if (arguments.length === 1) {
          var r = arguments[0];
          return this.x === r.x && this.y === r.y;
        }
        if (arguments.length === 2) {
          var s = arguments[0], l = arguments[1];
          return !!H.equalsWithTolerance(this.x, s.x, l) && !!H.equalsWithTolerance(this.y, s.y, l);
        }
      } }, { key: "setM", value: function(r) {
        throw new R("Invalid ordinate index: " + c.M);
      } }, { key: "getZ", value: function() {
        return this.z;
      } }, { key: "getOrdinate", value: function(r) {
        switch (r) {
          case c.X:
            return this.x;
          case c.Y:
            return this.y;
          case c.Z:
            return this.getZ();
        }
        throw new R("Invalid ordinate index: " + r);
      } }, { key: "equals3D", value: function(r) {
        return this.x === r.x && this.y === r.y && (this.getZ() === r.getZ() || W.isNaN(this.getZ()) && W.isNaN(r.getZ()));
      } }, { key: "equals", value: function(r) {
        return r instanceof c && this.equals2D(r);
      } }, { key: "equalInZ", value: function(r, s) {
        return H.equalsWithTolerance(this.getZ(), r.getZ(), s);
      } }, { key: "setX", value: function(r) {
        this.x = r;
      } }, { key: "compareTo", value: function(r) {
        var s = r;
        return this.x < s.x ? -1 : this.x > s.x ? 1 : this.y < s.y ? -1 : this.y > s.y ? 1 : 0;
      } }, { key: "getX", value: function() {
        return this.x;
      } }, { key: "setZ", value: function(r) {
        this.z = r;
      } }, { key: "clone", value: function() {
        try {
          return null;
        } catch (r) {
          if (r instanceof CloneNotSupportedException) return ee.shouldNeverReachHere("this shouldn't happen because this class is Cloneable"), null;
          throw r;
        }
      } }, { key: "copy", value: function() {
        return new c(this);
      } }, { key: "toString", value: function() {
        return "(" + this.x + ", " + this.y + ", " + this.getZ() + ")";
      } }, { key: "distance3D", value: function(r) {
        var s = this.x - r.x, l = this.y - r.y, d = this.getZ() - r.getZ();
        return Math.sqrt(s * s + l * l + d * d);
      } }, { key: "getY", value: function() {
        return this.y;
      } }, { key: "setY", value: function(r) {
        this.y = r;
      } }, { key: "distance", value: function(r) {
        var s = this.x - r.x, l = this.y - r.y;
        return Math.sqrt(s * s + l * l);
      } }, { key: "hashCode", value: function() {
        var r = 17;
        return r = 37 * (r = 37 * r + c.hashCode(this.x)) + c.hashCode(this.y);
      } }, { key: "setCoordinate", value: function(r) {
        this.x = r.x, this.y = r.y, this.z = r.getZ();
      } }, { key: "interfaces_", get: function() {
        return [V, k, M];
      } }], [{ key: "constructor_", value: function() {
        if (this.x = null, this.y = null, this.z = null, arguments.length === 0) c.constructor_.call(this, 0, 0);
        else if (arguments.length === 1) {
          var r = arguments[0];
          c.constructor_.call(this, r.x, r.y, r.getZ());
        } else if (arguments.length === 2) {
          var s = arguments[0], l = arguments[1];
          c.constructor_.call(this, s, l, c.NULL_ORDINATE);
        } else if (arguments.length === 3) {
          var d = arguments[0], y = arguments[1], x = arguments[2];
          this.x = d, this.y = y, this.z = x;
        }
      } }, { key: "hashCode", value: function(r) {
        return se[0] = r, fe[0] ^ fe[1];
      } }]);
    }(), Fe = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "compare", value: function(r, s) {
        var l = c.compare(r.x, s.x);
        if (l !== 0) return l;
        var d = c.compare(r.y, s.y);
        return d !== 0 ? d : this._dimensionsToTest <= 2 ? 0 : c.compare(r.getZ(), s.getZ());
      } }, { key: "interfaces_", get: function() {
        return [j];
      } }], [{ key: "constructor_", value: function() {
        if (this._dimensionsToTest = 2, arguments.length === 0) c.constructor_.call(this, 2);
        else if (arguments.length === 1) {
          var r = arguments[0];
          if (r !== 2 && r !== 3) throw new R("only 2 or 3 dimensions may be specified");
          this._dimensionsToTest = r;
        }
      } }, { key: "compare", value: function(r, s) {
        return r < s ? -1 : r > s ? 1 : W.isNaN(r) ? W.isNaN(s) ? 0 : -1 : W.isNaN(s) ? 1 : 0;
      } }]);
    }();
    Z.DimensionalComparator = Fe, Z.NULL_ORDINATE = W.NaN, Z.X = 0, Z.Y = 1, Z.Z = 2, Z.M = 3;
    var _e = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "getArea", value: function() {
        return this.getWidth() * this.getHeight();
      } }, { key: "equals", value: function(r) {
        if (!(r instanceof c)) return !1;
        var s = r;
        return this.isNull() ? s.isNull() : this._maxx === s.getMaxX() && this._maxy === s.getMaxY() && this._minx === s.getMinX() && this._miny === s.getMinY();
      } }, { key: "intersection", value: function(r) {
        if (this.isNull() || r.isNull() || !this.intersects(r)) return new c();
        var s = this._minx > r._minx ? this._minx : r._minx, l = this._miny > r._miny ? this._miny : r._miny;
        return new c(s, this._maxx < r._maxx ? this._maxx : r._maxx, l, this._maxy < r._maxy ? this._maxy : r._maxy);
      } }, { key: "isNull", value: function() {
        return this._maxx < this._minx;
      } }, { key: "getMaxX", value: function() {
        return this._maxx;
      } }, { key: "covers", value: function() {
        if (arguments.length === 1) {
          if (arguments[0] instanceof Z) {
            var r = arguments[0];
            return this.covers(r.x, r.y);
          }
          if (arguments[0] instanceof c) {
            var s = arguments[0];
            return !this.isNull() && !s.isNull() && s.getMinX() >= this._minx && s.getMaxX() <= this._maxx && s.getMinY() >= this._miny && s.getMaxY() <= this._maxy;
          }
        } else if (arguments.length === 2) {
          var l = arguments[0], d = arguments[1];
          return !this.isNull() && l >= this._minx && l <= this._maxx && d >= this._miny && d <= this._maxy;
        }
      } }, { key: "intersects", value: function() {
        if (arguments.length === 1) {
          if (arguments[0] instanceof c) {
            var r = arguments[0];
            return !this.isNull() && !r.isNull() && !(r._minx > this._maxx || r._maxx < this._minx || r._miny > this._maxy || r._maxy < this._miny);
          }
          if (arguments[0] instanceof Z) {
            var s = arguments[0];
            return this.intersects(s.x, s.y);
          }
        } else if (arguments.length === 2) {
          if (arguments[0] instanceof Z && arguments[1] instanceof Z) {
            var l = arguments[0], d = arguments[1];
            return !this.isNull() && !((l.x < d.x ? l.x : d.x) > this._maxx) && !((l.x > d.x ? l.x : d.x) < this._minx) && !((l.y < d.y ? l.y : d.y) > this._maxy) && !((l.y > d.y ? l.y : d.y) < this._miny);
          }
          if (typeof arguments[0] == "number" && typeof arguments[1] == "number") {
            var y = arguments[0], x = arguments[1];
            return !this.isNull() && !(y > this._maxx || y < this._minx || x > this._maxy || x < this._miny);
          }
        }
      } }, { key: "getMinY", value: function() {
        return this._miny;
      } }, { key: "getDiameter", value: function() {
        if (this.isNull()) return 0;
        var r = this.getWidth(), s = this.getHeight();
        return Math.sqrt(r * r + s * s);
      } }, { key: "getMinX", value: function() {
        return this._minx;
      } }, { key: "expandToInclude", value: function() {
        if (arguments.length === 1) {
          if (arguments[0] instanceof Z) {
            var r = arguments[0];
            this.expandToInclude(r.x, r.y);
          } else if (arguments[0] instanceof c) {
            var s = arguments[0];
            if (s.isNull()) return null;
            this.isNull() ? (this._minx = s.getMinX(), this._maxx = s.getMaxX(), this._miny = s.getMinY(), this._maxy = s.getMaxY()) : (s._minx < this._minx && (this._minx = s._minx), s._maxx > this._maxx && (this._maxx = s._maxx), s._miny < this._miny && (this._miny = s._miny), s._maxy > this._maxy && (this._maxy = s._maxy));
          }
        } else if (arguments.length === 2) {
          var l = arguments[0], d = arguments[1];
          this.isNull() ? (this._minx = l, this._maxx = l, this._miny = d, this._maxy = d) : (l < this._minx && (this._minx = l), l > this._maxx && (this._maxx = l), d < this._miny && (this._miny = d), d > this._maxy && (this._maxy = d));
        }
      } }, { key: "minExtent", value: function() {
        if (this.isNull()) return 0;
        var r = this.getWidth(), s = this.getHeight();
        return r < s ? r : s;
      } }, { key: "getWidth", value: function() {
        return this.isNull() ? 0 : this._maxx - this._minx;
      } }, { key: "compareTo", value: function(r) {
        var s = r;
        return this.isNull() ? s.isNull() ? 0 : -1 : s.isNull() ? 1 : this._minx < s._minx ? -1 : this._minx > s._minx ? 1 : this._miny < s._miny ? -1 : this._miny > s._miny ? 1 : this._maxx < s._maxx ? -1 : this._maxx > s._maxx ? 1 : this._maxy < s._maxy ? -1 : this._maxy > s._maxy ? 1 : 0;
      } }, { key: "translate", value: function(r, s) {
        if (this.isNull()) return null;
        this.init(this.getMinX() + r, this.getMaxX() + r, this.getMinY() + s, this.getMaxY() + s);
      } }, { key: "copy", value: function() {
        return new c(this);
      } }, { key: "toString", value: function() {
        return "Env[" + this._minx + " : " + this._maxx + ", " + this._miny + " : " + this._maxy + "]";
      } }, { key: "setToNull", value: function() {
        this._minx = 0, this._maxx = -1, this._miny = 0, this._maxy = -1;
      } }, { key: "disjoint", value: function(r) {
        return !(!this.isNull() && !r.isNull()) || r._minx > this._maxx || r._maxx < this._minx || r._miny > this._maxy || r._maxy < this._miny;
      } }, { key: "getHeight", value: function() {
        return this.isNull() ? 0 : this._maxy - this._miny;
      } }, { key: "maxExtent", value: function() {
        if (this.isNull()) return 0;
        var r = this.getWidth(), s = this.getHeight();
        return r > s ? r : s;
      } }, { key: "expandBy", value: function() {
        if (arguments.length === 1) {
          var r = arguments[0];
          this.expandBy(r, r);
        } else if (arguments.length === 2) {
          var s = arguments[0], l = arguments[1];
          if (this.isNull()) return null;
          this._minx -= s, this._maxx += s, this._miny -= l, this._maxy += l, (this._minx > this._maxx || this._miny > this._maxy) && this.setToNull();
        }
      } }, { key: "contains", value: function() {
        if (arguments.length === 1) {
          if (arguments[0] instanceof c) {
            var r = arguments[0];
            return this.covers(r);
          }
          if (arguments[0] instanceof Z) {
            var s = arguments[0];
            return this.covers(s);
          }
        } else if (arguments.length === 2) {
          var l = arguments[0], d = arguments[1];
          return this.covers(l, d);
        }
      } }, { key: "centre", value: function() {
        return this.isNull() ? null : new Z((this.getMinX() + this.getMaxX()) / 2, (this.getMinY() + this.getMaxY()) / 2);
      } }, { key: "init", value: function() {
        if (arguments.length === 0) this.setToNull();
        else if (arguments.length === 1) {
          if (arguments[0] instanceof Z) {
            var r = arguments[0];
            this.init(r.x, r.x, r.y, r.y);
          } else if (arguments[0] instanceof c) {
            var s = arguments[0];
            this._minx = s._minx, this._maxx = s._maxx, this._miny = s._miny, this._maxy = s._maxy;
          }
        } else if (arguments.length === 2) {
          var l = arguments[0], d = arguments[1];
          this.init(l.x, d.x, l.y, d.y);
        } else if (arguments.length === 4) {
          var y = arguments[0], x = arguments[1], E = arguments[2], L = arguments[3];
          y < x ? (this._minx = y, this._maxx = x) : (this._minx = x, this._maxx = y), E < L ? (this._miny = E, this._maxy = L) : (this._miny = L, this._maxy = E);
        }
      } }, { key: "getMaxY", value: function() {
        return this._maxy;
      } }, { key: "distance", value: function(r) {
        if (this.intersects(r)) return 0;
        var s = 0;
        this._maxx < r._minx ? s = r._minx - this._maxx : this._minx > r._maxx && (s = this._minx - r._maxx);
        var l = 0;
        return this._maxy < r._miny ? l = r._miny - this._maxy : this._miny > r._maxy && (l = this._miny - r._maxy), s === 0 ? l : l === 0 ? s : Math.sqrt(s * s + l * l);
      } }, { key: "hashCode", value: function() {
        var r = 17;
        return r = 37 * (r = 37 * (r = 37 * (r = 37 * r + Z.hashCode(this._minx)) + Z.hashCode(this._maxx)) + Z.hashCode(this._miny)) + Z.hashCode(this._maxy);
      } }, { key: "interfaces_", get: function() {
        return [V, M];
      } }], [{ key: "constructor_", value: function() {
        if (this._minx = null, this._maxx = null, this._miny = null, this._maxy = null, arguments.length === 0) this.init();
        else if (arguments.length === 1) {
          if (arguments[0] instanceof Z) {
            var r = arguments[0];
            this.init(r.x, r.x, r.y, r.y);
          } else if (arguments[0] instanceof c) {
            var s = arguments[0];
            this.init(s);
          }
        } else if (arguments.length === 2) {
          var l = arguments[0], d = arguments[1];
          this.init(l.x, d.x, l.y, d.y);
        } else if (arguments.length === 4) {
          var y = arguments[0], x = arguments[1], E = arguments[2], L = arguments[3];
          this.init(y, x, E, L);
        }
      } }, { key: "intersects", value: function() {
        if (arguments.length === 3) {
          var r = arguments[0], s = arguments[1], l = arguments[2];
          return l.x >= (r.x < s.x ? r.x : s.x) && l.x <= (r.x > s.x ? r.x : s.x) && l.y >= (r.y < s.y ? r.y : s.y) && l.y <= (r.y > s.y ? r.y : s.y);
        }
        if (arguments.length === 4) {
          var d = arguments[0], y = arguments[1], x = arguments[2], E = arguments[3], L = Math.min(x.x, E.x), F = Math.max(x.x, E.x), $ = Math.min(d.x, y.x), K = Math.max(d.x, y.x);
          return !($ > F) && !(K < L) && (L = Math.min(x.y, E.y), F = Math.max(x.y, E.y), $ = Math.min(d.y, y.y), K = Math.max(d.y, y.y), !($ > F) && !(K < L));
        }
      } }]);
    }(), ae = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "isGeometryCollection", value: function() {
        return this.getTypeCode() === c.TYPECODE_GEOMETRYCOLLECTION;
      } }, { key: "getFactory", value: function() {
        return this._factory;
      } }, { key: "getGeometryN", value: function(r) {
        return this;
      } }, { key: "getArea", value: function() {
        return 0;
      } }, { key: "isRectangle", value: function() {
        return !1;
      } }, { key: "equalsExact", value: function(r) {
        return this === r || this.equalsExact(r, 0);
      } }, { key: "geometryChanged", value: function() {
        this.apply(c.geometryChangedFilter);
      } }, { key: "geometryChangedAction", value: function() {
        this._envelope = null;
      } }, { key: "equalsNorm", value: function(r) {
        return r !== null && this.norm().equalsExact(r.norm());
      } }, { key: "getLength", value: function() {
        return 0;
      } }, { key: "getNumGeometries", value: function() {
        return 1;
      } }, { key: "compareTo", value: function() {
        var r;
        if (arguments.length === 1) {
          var s = arguments[0];
          return r = s, this.getTypeCode() !== r.getTypeCode() ? this.getTypeCode() - r.getTypeCode() : this.isEmpty() && r.isEmpty() ? 0 : this.isEmpty() ? -1 : r.isEmpty() ? 1 : this.compareToSameClass(s);
        }
        if (arguments.length === 2) {
          var l = arguments[0], d = arguments[1];
          return r = l, this.getTypeCode() !== r.getTypeCode() ? this.getTypeCode() - r.getTypeCode() : this.isEmpty() && r.isEmpty() ? 0 : this.isEmpty() ? -1 : r.isEmpty() ? 1 : this.compareToSameClass(l, d);
        }
      } }, { key: "getUserData", value: function() {
        return this._userData;
      } }, { key: "getSRID", value: function() {
        return this._SRID;
      } }, { key: "getEnvelope", value: function() {
        return this.getFactory().toGeometry(this.getEnvelopeInternal());
      } }, { key: "checkNotGeometryCollection", value: function(r) {
        if (r.getTypeCode() === c.TYPECODE_GEOMETRYCOLLECTION) throw new R("This method does not support GeometryCollection arguments");
      } }, { key: "equal", value: function(r, s, l) {
        return l === 0 ? r.equals(s) : r.distance(s) <= l;
      } }, { key: "norm", value: function() {
        var r = this.copy();
        return r.normalize(), r;
      } }, { key: "reverse", value: function() {
        var r = this.reverseInternal();
        return this.envelope != null && (r.envelope = this.envelope.copy()), r.setSRID(this.getSRID()), r;
      } }, { key: "copy", value: function() {
        var r = this.copyInternal();
        return r.envelope = this._envelope == null ? null : this._envelope.copy(), r._SRID = this._SRID, r._userData = this._userData, r;
      } }, { key: "getPrecisionModel", value: function() {
        return this._factory.getPrecisionModel();
      } }, { key: "getEnvelopeInternal", value: function() {
        return this._envelope === null && (this._envelope = this.computeEnvelopeInternal()), new _e(this._envelope);
      } }, { key: "setSRID", value: function(r) {
        this._SRID = r;
      } }, { key: "setUserData", value: function(r) {
        this._userData = r;
      } }, { key: "compare", value: function(r, s) {
        for (var l = r.iterator(), d = s.iterator(); l.hasNext() && d.hasNext(); ) {
          var y = l.next(), x = d.next(), E = y.compareTo(x);
          if (E !== 0) return E;
        }
        return l.hasNext() ? 1 : d.hasNext() ? -1 : 0;
      } }, { key: "hashCode", value: function() {
        return this.getEnvelopeInternal().hashCode();
      } }, { key: "isEquivalentClass", value: function(r) {
        return this.getClass() === r.getClass();
      } }, { key: "isGeometryCollectionOrDerived", value: function() {
        return this.getTypeCode() === c.TYPECODE_GEOMETRYCOLLECTION || this.getTypeCode() === c.TYPECODE_MULTIPOINT || this.getTypeCode() === c.TYPECODE_MULTILINESTRING || this.getTypeCode() === c.TYPECODE_MULTIPOLYGON;
      } }, { key: "interfaces_", get: function() {
        return [k, V, M];
      } }, { key: "getClass", value: function() {
        return c;
      } }], [{ key: "hasNonEmptyElements", value: function(r) {
        for (var s = 0; s < r.length; s++) if (!r[s].isEmpty()) return !0;
        return !1;
      } }, { key: "hasNullElements", value: function(r) {
        for (var s = 0; s < r.length; s++) if (r[s] === null) return !0;
        return !1;
      } }]);
    }();
    ae.constructor_ = function(c) {
      c && (this._envelope = null, this._userData = null, this._factory = c, this._SRID = c.getSRID());
    }, ae.TYPECODE_POINT = 0, ae.TYPECODE_MULTIPOINT = 1, ae.TYPECODE_LINESTRING = 2, ae.TYPECODE_LINEARRING = 3, ae.TYPECODE_MULTILINESTRING = 4, ae.TYPECODE_POLYGON = 5, ae.TYPECODE_MULTIPOLYGON = 6, ae.TYPECODE_GEOMETRYCOLLECTION = 7, ae.TYPENAME_POINT = "Point", ae.TYPENAME_MULTIPOINT = "MultiPoint", ae.TYPENAME_LINESTRING = "LineString", ae.TYPENAME_LINEARRING = "LinearRing", ae.TYPENAME_MULTILINESTRING = "MultiLineString", ae.TYPENAME_POLYGON = "Polygon", ae.TYPENAME_MULTIPOLYGON = "MultiPolygon", ae.TYPENAME_GEOMETRYCOLLECTION = "GeometryCollection", ae.geometryChangedFilter = { get interfaces_() {
      return [U];
    }, filter: function(c) {
      c.geometryChangedAction();
    } };
    var z = function() {
      function c() {
        o(this, c);
      }
      return h(c, null, [{ key: "toLocationSymbol", value: function(r) {
        switch (r) {
          case c.EXTERIOR:
            return "e";
          case c.BOUNDARY:
            return "b";
          case c.INTERIOR:
            return "i";
          case c.NONE:
            return "-";
        }
        throw new R("Unknown location value: " + r);
      } }]);
    }();
    z.INTERIOR = 0, z.BOUNDARY = 1, z.EXTERIOR = 2, z.NONE = -1;
    var Me = function() {
      return h(function c() {
        o(this, c);
      }, [{ key: "add", value: function() {
      } }, { key: "addAll", value: function() {
      } }, { key: "isEmpty", value: function() {
      } }, { key: "iterator", value: function() {
      } }, { key: "size", value: function() {
      } }, { key: "toArray", value: function() {
      } }, { key: "remove", value: function() {
      } }]);
    }(), Ne = function(c) {
      function r(s) {
        var l;
        return o(this, r), (l = i(this, r, [s])).name = Object.keys({ NoSuchElementException: r })[0], l;
      }
      return v(r, c), h(r);
    }(A), ke = function(c) {
      function r(s) {
        var l;
        return o(this, r), (l = i(this, r, [s])).name = Object.keys({ UnsupportedOperationException: r })[0], l;
      }
      return v(r, c), h(r);
    }(A), pt = function(c) {
      function r() {
        return o(this, r), i(this, r, arguments);
      }
      return v(r, c), h(r, [{ key: "contains", value: function() {
      } }]);
    }(Me), gt = function(c) {
      function r(s) {
        var l;
        return o(this, r), (l = i(this, r)).map = /* @__PURE__ */ new Map(), s instanceof Me && l.addAll(s), l;
      }
      return v(r, c), h(r, [{ key: "contains", value: function(s) {
        var l = s.hashCode ? s.hashCode() : s;
        return !!this.map.has(l);
      } }, { key: "add", value: function(s) {
        var l = s.hashCode ? s.hashCode() : s;
        return !this.map.has(l) && !!this.map.set(l, s);
      } }, { key: "addAll", value: function(s) {
        var l, d = f(s);
        try {
          for (d.s(); !(l = d.n()).done; ) {
            var y = l.value;
            this.add(y);
          }
        } catch (x) {
          d.e(x);
        } finally {
          d.f();
        }
        return !0;
      } }, { key: "remove", value: function() {
        throw new ke();
      } }, { key: "size", value: function() {
        return this.map.size;
      } }, { key: "isEmpty", value: function() {
        return this.map.size === 0;
      } }, { key: "toArray", value: function() {
        return Array.from(this.map.values());
      } }, { key: "iterator", value: function() {
        return new Yt(this.map);
      } }, { key: Symbol.iterator, value: function() {
        return this.map;
      } }]);
    }(pt), Yt = function() {
      return h(function c(r) {
        o(this, c), this.iterator = r.values();
        var s = this.iterator.next(), l = s.done, d = s.value;
        this.done = l, this.value = d;
      }, [{ key: "next", value: function() {
        if (this.done) throw new Ne();
        var c = this.value, r = this.iterator.next(), s = r.done, l = r.value;
        return this.done = s, this.value = l, c;
      } }, { key: "hasNext", value: function() {
        return !this.done;
      } }, { key: "remove", value: function() {
        throw new ke();
      } }]);
    }(), ie = function() {
      function c() {
        o(this, c);
      }
      return h(c, null, [{ key: "opposite", value: function(r) {
        return r === c.LEFT ? c.RIGHT : r === c.RIGHT ? c.LEFT : r;
      } }]);
    }();
    ie.ON = 0, ie.LEFT = 1, ie.RIGHT = 2;
    var ri = function(c) {
      function r(s) {
        var l;
        return o(this, r), (l = i(this, r, [s])).name = Object.keys({ EmptyStackException: r })[0], l;
      }
      return v(r, c), h(r);
    }(A), ii = function(c) {
      function r(s) {
        var l;
        return o(this, r), (l = i(this, r, [s])).name = Object.keys({ IndexOutOfBoundsException: r })[0], l;
      }
      return v(r, c), h(r);
    }(A), jt = function(c) {
      function r() {
        return o(this, r), i(this, r, arguments);
      }
      return v(r, c), h(r, [{ key: "get", value: function() {
      } }, { key: "set", value: function() {
      } }, { key: "isEmpty", value: function() {
      } }]);
    }(Me), ps = function(c) {
      function r() {
        var s;
        return o(this, r), (s = i(this, r)).array = [], s;
      }
      return v(r, c), h(r, [{ key: "add", value: function(s) {
        return this.array.push(s), !0;
      } }, { key: "get", value: function(s) {
        if (s < 0 || s >= this.size()) throw new ii();
        return this.array[s];
      } }, { key: "push", value: function(s) {
        return this.array.push(s), s;
      } }, { key: "pop", value: function() {
        if (this.array.length === 0) throw new ri();
        return this.array.pop();
      } }, { key: "peek", value: function() {
        if (this.array.length === 0) throw new ri();
        return this.array[this.array.length - 1];
      } }, { key: "empty", value: function() {
        return this.array.length === 0;
      } }, { key: "isEmpty", value: function() {
        return this.empty();
      } }, { key: "search", value: function(s) {
        return this.array.indexOf(s);
      } }, { key: "size", value: function() {
        return this.array.length;
      } }, { key: "toArray", value: function() {
        return this.array.slice();
      } }]);
    }(jt);
    function Ee(c, r) {
      return c.interfaces_ && c.interfaces_.indexOf(r) > -1;
    }
    var fn = function() {
      return h(function c(r) {
        o(this, c), this.str = r;
      }, [{ key: "append", value: function(c) {
        this.str += c;
      } }, { key: "setCharAt", value: function(c, r) {
        this.str = this.str.substr(0, c) + r + this.str.substr(c + 1);
      } }, { key: "toString", value: function() {
        return this.str;
      } }]);
    }(), gn = function() {
      function c(r) {
        o(this, c), this.value = r;
      }
      return h(c, [{ key: "intValue", value: function() {
        return this.value;
      } }, { key: "compareTo", value: function(r) {
        return this.value < r ? -1 : this.value > r ? 1 : 0;
      } }], [{ key: "compare", value: function(r, s) {
        return r < s ? -1 : r > s ? 1 : 0;
      } }, { key: "isNan", value: function(r) {
        return Number.isNaN(r);
      } }, { key: "valueOf", value: function(r) {
        return new c(r);
      } }]);
    }(), _s = function() {
      return h(function c() {
        o(this, c);
      }, null, [{ key: "isWhitespace", value: function(c) {
        return c <= 32 && c >= 0 || c === 127;
      } }, { key: "toUpperCase", value: function(c) {
        return c.toUpperCase();
      } }]);
    }(), pe = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "le", value: function(r) {
        return this._hi < r._hi || this._hi === r._hi && this._lo <= r._lo;
      } }, { key: "extractSignificantDigits", value: function(r, s) {
        var l = this.abs(), d = c.magnitude(l._hi), y = c.TEN.pow(d);
        (l = l.divide(y)).gt(c.TEN) ? (l = l.divide(c.TEN), d += 1) : l.lt(c.ONE) && (l = l.multiply(c.TEN), d -= 1);
        for (var x = d + 1, E = new fn(), L = c.MAX_PRINT_DIGITS - 1, F = 0; F <= L; F++) {
          r && F === x && E.append(".");
          var $ = Math.trunc(l._hi);
          if ($ < 0) break;
          var K = !1, ne = 0;
          $ > 9 ? (K = !0, ne = "9") : ne = "0" + $, E.append(ne), l = l.subtract(c.valueOf($)).multiply(c.TEN), K && l.selfAdd(c.TEN);
          var ue = !0, he = c.magnitude(l._hi);
          if (he < 0 && Math.abs(he) >= L - F && (ue = !1), !ue) break;
        }
        return s[0] = d, E.toString();
      } }, { key: "sqr", value: function() {
        return this.multiply(this);
      } }, { key: "doubleValue", value: function() {
        return this._hi + this._lo;
      } }, { key: "subtract", value: function() {
        if (arguments[0] instanceof c) {
          var r = arguments[0];
          return this.add(r.negate());
        }
        if (typeof arguments[0] == "number") {
          var s = arguments[0];
          return this.add(-s);
        }
      } }, { key: "equals", value: function() {
        if (arguments.length === 1 && arguments[0] instanceof c) {
          var r = arguments[0];
          return this._hi === r._hi && this._lo === r._lo;
        }
      } }, { key: "isZero", value: function() {
        return this._hi === 0 && this._lo === 0;
      } }, { key: "selfSubtract", value: function() {
        if (arguments[0] instanceof c) {
          var r = arguments[0];
          return this.isNaN() ? this : this.selfAdd(-r._hi, -r._lo);
        }
        if (typeof arguments[0] == "number") {
          var s = arguments[0];
          return this.isNaN() ? this : this.selfAdd(-s, 0);
        }
      } }, { key: "getSpecialNumberString", value: function() {
        return this.isZero() ? "0.0" : this.isNaN() ? "NaN " : null;
      } }, { key: "min", value: function(r) {
        return this.le(r) ? this : r;
      } }, { key: "selfDivide", value: function() {
        if (arguments.length === 1) {
          if (arguments[0] instanceof c) {
            var r = arguments[0];
            return this.selfDivide(r._hi, r._lo);
          }
          if (typeof arguments[0] == "number") {
            var s = arguments[0];
            return this.selfDivide(s, 0);
          }
        } else if (arguments.length === 2) {
          var l, d, y, x, E = arguments[0], L = arguments[1], F = null, $ = null, K = null, ne = null;
          return y = this._hi / E, ne = (F = (K = c.SPLIT * y) - (F = K - y)) * ($ = (ne = c.SPLIT * E) - ($ = ne - E)) - (x = y * E) + F * (d = E - $) + (l = y - F) * $ + l * d, ne = y + (K = (this._hi - x - ne + this._lo - y * L) / E), this._hi = ne, this._lo = y - ne + K, this;
        }
      } }, { key: "dump", value: function() {
        return "DD<" + this._hi + ", " + this._lo + ">";
      } }, { key: "divide", value: function() {
        if (arguments[0] instanceof c) {
          var r, s, l, d, y = arguments[0], x = null, E = null, L = null, F = null;
          return r = (l = this._hi / y._hi) - (x = (L = c.SPLIT * l) - (x = L - l)), F = x * (E = (F = c.SPLIT * y._hi) - (E = F - y._hi)) - (d = l * y._hi) + x * (s = y._hi - E) + r * E + r * s, new c(F = l + (L = (this._hi - d - F + this._lo - l * y._lo) / y._hi), l - F + L);
        }
        if (typeof arguments[0] == "number") {
          var $ = arguments[0];
          return W.isNaN($) ? c.createNaN() : c.copy(this).selfDivide($, 0);
        }
      } }, { key: "ge", value: function(r) {
        return this._hi > r._hi || this._hi === r._hi && this._lo >= r._lo;
      } }, { key: "pow", value: function(r) {
        if (r === 0) return c.valueOf(1);
        var s = new c(this), l = c.valueOf(1), d = Math.abs(r);
        if (d > 1) for (; d > 0; ) d % 2 == 1 && l.selfMultiply(s), (d /= 2) > 0 && (s = s.sqr());
        else l = s;
        return r < 0 ? l.reciprocal() : l;
      } }, { key: "ceil", value: function() {
        if (this.isNaN()) return c.NaN;
        var r = Math.ceil(this._hi), s = 0;
        return r === this._hi && (s = Math.ceil(this._lo)), new c(r, s);
      } }, { key: "compareTo", value: function(r) {
        var s = r;
        return this._hi < s._hi ? -1 : this._hi > s._hi ? 1 : this._lo < s._lo ? -1 : this._lo > s._lo ? 1 : 0;
      } }, { key: "rint", value: function() {
        return this.isNaN() ? this : this.add(0.5).floor();
      } }, { key: "setValue", value: function() {
        if (arguments[0] instanceof c) {
          var r = arguments[0];
          return this.init(r), this;
        }
        if (typeof arguments[0] == "number") {
          var s = arguments[0];
          return this.init(s), this;
        }
      } }, { key: "max", value: function(r) {
        return this.ge(r) ? this : r;
      } }, { key: "sqrt", value: function() {
        if (this.isZero()) return c.valueOf(0);
        if (this.isNegative()) return c.NaN;
        var r = 1 / Math.sqrt(this._hi), s = this._hi * r, l = c.valueOf(s), d = this.subtract(l.sqr())._hi * (0.5 * r);
        return l.add(d);
      } }, { key: "selfAdd", value: function() {
        if (arguments.length === 1) {
          if (arguments[0] instanceof c) {
            var r = arguments[0];
            return this.selfAdd(r._hi, r._lo);
          }
          if (typeof arguments[0] == "number") {
            var s, l, d, y, x, E = arguments[0], L = null;
            return L = (d = this._hi + E) - (y = d - this._hi), l = (x = (L = E - y + (this._hi - L)) + this._lo) + (d - (s = d + x)), this._hi = s + l, this._lo = l + (s - this._hi), this;
          }
        } else if (arguments.length === 2) {
          var F, $, K, ne, ue = arguments[0], he = arguments[1], ge = null, Oe = null, Le = null;
          K = this._hi + ue, $ = this._lo + he, Oe = K - (Le = K - this._hi), ge = $ - (ne = $ - this._lo);
          var Ye = (F = K + (Le = (Oe = ue - Le + (this._hi - Oe)) + $)) + (Le = (ge = he - ne + (this._lo - ge)) + (Le + (K - F))), st = Le + (F - Ye);
          return this._hi = Ye, this._lo = st, this;
        }
      } }, { key: "selfMultiply", value: function() {
        if (arguments.length === 1) {
          if (arguments[0] instanceof c) {
            var r = arguments[0];
            return this.selfMultiply(r._hi, r._lo);
          }
          if (typeof arguments[0] == "number") {
            var s = arguments[0];
            return this.selfMultiply(s, 0);
          }
        } else if (arguments.length === 2) {
          var l, d, y = arguments[0], x = arguments[1], E = null, L = null, F = null, $ = null;
          E = (F = c.SPLIT * this._hi) - this._hi, $ = c.SPLIT * y, E = F - E, l = this._hi - E, L = $ - y;
          var K = (F = this._hi * y) + ($ = E * (L = $ - L) - F + E * (d = y - L) + l * L + l * d + (this._hi * x + this._lo * y)), ne = $ + (E = F - K);
          return this._hi = K, this._lo = ne, this;
        }
      } }, { key: "selfSqr", value: function() {
        return this.selfMultiply(this);
      } }, { key: "floor", value: function() {
        if (this.isNaN()) return c.NaN;
        var r = Math.floor(this._hi), s = 0;
        return r === this._hi && (s = Math.floor(this._lo)), new c(r, s);
      } }, { key: "negate", value: function() {
        return this.isNaN() ? this : new c(-this._hi, -this._lo);
      } }, { key: "clone", value: function() {
        try {
          return null;
        } catch (r) {
          if (r instanceof CloneNotSupportedException) return null;
          throw r;
        }
      } }, { key: "multiply", value: function() {
        if (arguments[0] instanceof c) {
          var r = arguments[0];
          return r.isNaN() ? c.createNaN() : c.copy(this).selfMultiply(r);
        }
        if (typeof arguments[0] == "number") {
          var s = arguments[0];
          return W.isNaN(s) ? c.createNaN() : c.copy(this).selfMultiply(s, 0);
        }
      } }, { key: "isNaN", value: function() {
        return W.isNaN(this._hi);
      } }, { key: "intValue", value: function() {
        return Math.trunc(this._hi);
      } }, { key: "toString", value: function() {
        var r = c.magnitude(this._hi);
        return r >= -3 && r <= 20 ? this.toStandardNotation() : this.toSciNotation();
      } }, { key: "toStandardNotation", value: function() {
        var r = this.getSpecialNumberString();
        if (r !== null) return r;
        var s = new Array(1).fill(null), l = this.extractSignificantDigits(!0, s), d = s[0] + 1, y = l;
        if (l.charAt(0) === ".") y = "0" + l;
        else if (d < 0) y = "0." + c.stringOfChar("0", -d) + l;
        else if (l.indexOf(".") === -1) {
          var x = d - l.length;
          y = l + c.stringOfChar("0", x) + ".0";
        }
        return this.isNegative() ? "-" + y : y;
      } }, { key: "reciprocal", value: function() {
        var r, s, l, d, y = null, x = null, E = null, L = null;
        r = (l = 1 / this._hi) - (y = (E = c.SPLIT * l) - (y = E - l)), x = (L = c.SPLIT * this._hi) - this._hi;
        var F = l + (E = (1 - (d = l * this._hi) - (L = y * (x = L - x) - d + y * (s = this._hi - x) + r * x + r * s) - l * this._lo) / this._hi);
        return new c(F, l - F + E);
      } }, { key: "toSciNotation", value: function() {
        if (this.isZero()) return c.SCI_NOT_ZERO;
        var r = this.getSpecialNumberString();
        if (r !== null) return r;
        var s = new Array(1).fill(null), l = this.extractSignificantDigits(!1, s), d = c.SCI_NOT_EXPONENT_CHAR + s[0];
        if (l.charAt(0) === "0") throw new IllegalStateException("Found leading zero: " + l);
        var y = "";
        l.length > 1 && (y = l.substring(1));
        var x = l.charAt(0) + "." + y;
        return this.isNegative() ? "-" + x + d : x + d;
      } }, { key: "abs", value: function() {
        return this.isNaN() ? c.NaN : this.isNegative() ? this.negate() : new c(this);
      } }, { key: "isPositive", value: function() {
        return this._hi > 0 || this._hi === 0 && this._lo > 0;
      } }, { key: "lt", value: function(r) {
        return this._hi < r._hi || this._hi === r._hi && this._lo < r._lo;
      } }, { key: "add", value: function() {
        if (arguments[0] instanceof c) {
          var r = arguments[0];
          return c.copy(this).selfAdd(r);
        }
        if (typeof arguments[0] == "number") {
          var s = arguments[0];
          return c.copy(this).selfAdd(s);
        }
      } }, { key: "init", value: function() {
        if (arguments.length === 1) {
          if (typeof arguments[0] == "number") {
            var r = arguments[0];
            this._hi = r, this._lo = 0;
          } else if (arguments[0] instanceof c) {
            var s = arguments[0];
            this._hi = s._hi, this._lo = s._lo;
          }
        } else if (arguments.length === 2) {
          var l = arguments[0], d = arguments[1];
          this._hi = l, this._lo = d;
        }
      } }, { key: "gt", value: function(r) {
        return this._hi > r._hi || this._hi === r._hi && this._lo > r._lo;
      } }, { key: "isNegative", value: function() {
        return this._hi < 0 || this._hi === 0 && this._lo < 0;
      } }, { key: "trunc", value: function() {
        return this.isNaN() ? c.NaN : this.isPositive() ? this.floor() : this.ceil();
      } }, { key: "signum", value: function() {
        return this._hi > 0 ? 1 : this._hi < 0 ? -1 : this._lo > 0 ? 1 : this._lo < 0 ? -1 : 0;
      } }, { key: "interfaces_", get: function() {
        return [M, V, k];
      } }], [{ key: "constructor_", value: function() {
        if (this._hi = 0, this._lo = 0, arguments.length === 0) this.init(0);
        else if (arguments.length === 1) {
          if (typeof arguments[0] == "number") {
            var r = arguments[0];
            this.init(r);
          } else if (arguments[0] instanceof c) {
            var s = arguments[0];
            this.init(s);
          } else if (typeof arguments[0] == "string") {
            var l = arguments[0];
            c.constructor_.call(this, c.parse(l));
          }
        } else if (arguments.length === 2) {
          var d = arguments[0], y = arguments[1];
          this.init(d, y);
        }
      } }, { key: "determinant", value: function() {
        if (typeof arguments[3] == "number" && typeof arguments[2] == "number" && typeof arguments[0] == "number" && typeof arguments[1] == "number") {
          var r = arguments[0], s = arguments[1], l = arguments[2], d = arguments[3];
          return c.determinant(c.valueOf(r), c.valueOf(s), c.valueOf(l), c.valueOf(d));
        }
        if (arguments[3] instanceof c && arguments[2] instanceof c && arguments[0] instanceof c && arguments[1] instanceof c) {
          var y = arguments[1], x = arguments[2], E = arguments[3];
          return arguments[0].multiply(E).selfSubtract(y.multiply(x));
        }
      } }, { key: "sqr", value: function(r) {
        return c.valueOf(r).selfMultiply(r);
      } }, { key: "valueOf", value: function() {
        if (typeof arguments[0] == "string") {
          var r = arguments[0];
          return c.parse(r);
        }
        if (typeof arguments[0] == "number") return new c(arguments[0]);
      } }, { key: "sqrt", value: function(r) {
        return c.valueOf(r).sqrt();
      } }, { key: "parse", value: function(r) {
        for (var s = 0, l = r.length; _s.isWhitespace(r.charAt(s)); ) s++;
        var d = !1;
        if (s < l) {
          var y = r.charAt(s);
          y !== "-" && y !== "+" || (s++, y === "-" && (d = !0));
        }
        for (var x = new c(), E = 0, L = 0, F = 0, $ = !1; !(s >= l); ) {
          var K = r.charAt(s);
          if (s++, _s.isDigit(K)) {
            var ne = K - "0";
            x.selfMultiply(c.TEN), x.selfAdd(ne), E++;
          } else {
            if (K !== ".") {
              if (K === "e" || K === "E") {
                var ue = r.substring(s);
                try {
                  F = gn.parseInt(ue);
                } catch (Ye) {
                  throw Ye instanceof NumberFormatException ? new NumberFormatException("Invalid exponent " + ue + " in string " + r) : Ye;
                }
                break;
              }
              throw new NumberFormatException("Unexpected character '" + K + "' at position " + s + " in string " + r);
            }
            L = E, $ = !0;
          }
        }
        var he = x;
        $ || (L = E);
        var ge = E - L - F;
        if (ge === 0) he = x;
        else if (ge > 0) {
          var Oe = c.TEN.pow(ge);
          he = x.divide(Oe);
        } else if (ge < 0) {
          var Le = c.TEN.pow(-ge);
          he = x.multiply(Le);
        }
        return d ? he.negate() : he;
      } }, { key: "createNaN", value: function() {
        return new c(W.NaN, W.NaN);
      } }, { key: "copy", value: function(r) {
        return new c(r);
      } }, { key: "magnitude", value: function(r) {
        var s = Math.abs(r), l = Math.log(s) / Math.log(10), d = Math.trunc(Math.floor(l));
        return 10 * Math.pow(10, d) <= s && (d += 1), d;
      } }, { key: "stringOfChar", value: function(r, s) {
        for (var l = new fn(), d = 0; d < s; d++) l.append(r);
        return l.toString();
      } }]);
    }();
    pe.PI = new pe(3.141592653589793, 12246467991473532e-32), pe.TWO_PI = new pe(6.283185307179586, 24492935982947064e-32), pe.PI_2 = new pe(1.5707963267948966, 6123233995736766e-32), pe.E = new pe(2.718281828459045, 14456468917292502e-32), pe.NaN = new pe(W.NaN, W.NaN), pe.EPS = 123259516440783e-46, pe.SPLIT = 134217729, pe.MAX_PRINT_DIGITS = 32, pe.TEN = pe.valueOf(10), pe.ONE = pe.valueOf(1), pe.SCI_NOT_EXPONENT_CHAR = "E", pe.SCI_NOT_ZERO = "0.0E0";
    var ws = function() {
      function c() {
        o(this, c);
      }
      return h(c, null, [{ key: "orientationIndex", value: function(r, s, l) {
        var d = c.orientationIndexFilter(r, s, l);
        if (d <= 1) return d;
        var y = pe.valueOf(s.x).selfAdd(-r.x), x = pe.valueOf(s.y).selfAdd(-r.y), E = pe.valueOf(l.x).selfAdd(-s.x), L = pe.valueOf(l.y).selfAdd(-s.y);
        return y.selfMultiply(L).selfSubtract(x.selfMultiply(E)).signum();
      } }, { key: "signOfDet2x2", value: function() {
        if (arguments[3] instanceof pe && arguments[2] instanceof pe && arguments[0] instanceof pe && arguments[1] instanceof pe) {
          var r = arguments[1], s = arguments[2], l = arguments[3];
          return arguments[0].multiply(l).selfSubtract(r.multiply(s)).signum();
        }
        if (typeof arguments[3] == "number" && typeof arguments[2] == "number" && typeof arguments[0] == "number" && typeof arguments[1] == "number") {
          var d = arguments[0], y = arguments[1], x = arguments[2], E = arguments[3], L = pe.valueOf(d), F = pe.valueOf(y), $ = pe.valueOf(x), K = pe.valueOf(E);
          return L.multiply(K).selfSubtract(F.multiply($)).signum();
        }
      } }, { key: "intersection", value: function(r, s, l, d) {
        var y = new pe(r.y).selfSubtract(s.y), x = new pe(s.x).selfSubtract(r.x), E = new pe(r.x).selfMultiply(s.y).selfSubtract(new pe(s.x).selfMultiply(r.y)), L = new pe(l.y).selfSubtract(d.y), F = new pe(d.x).selfSubtract(l.x), $ = new pe(l.x).selfMultiply(d.y).selfSubtract(new pe(d.x).selfMultiply(l.y)), K = x.multiply($).selfSubtract(F.multiply(E)), ne = L.multiply(E).selfSubtract(y.multiply($)), ue = y.multiply(F).selfSubtract(L.multiply(x)), he = K.selfDivide(ue).doubleValue(), ge = ne.selfDivide(ue).doubleValue();
        return W.isNaN(he) || W.isInfinite(he) || W.isNaN(ge) || W.isInfinite(ge) ? null : new Z(he, ge);
      } }, { key: "orientationIndexFilter", value: function(r, s, l) {
        var d = null, y = (r.x - l.x) * (s.y - l.y), x = (r.y - l.y) * (s.x - l.x), E = y - x;
        if (y > 0) {
          if (x <= 0) return c.signum(E);
          d = y + x;
        } else {
          if (!(y < 0) || x >= 0) return c.signum(E);
          d = -y - x;
        }
        var L = c.DP_SAFE_EPSILON * d;
        return E >= L || -E >= L ? c.signum(E) : 2;
      } }, { key: "signum", value: function(r) {
        return r > 0 ? 1 : r < 0 ? -1 : 0;
      } }]);
    }();
    ws.DP_SAFE_EPSILON = 1e-15;
    var Te = function() {
      return h(function c() {
        o(this, c);
      }, [{ key: "getM", value: function(c) {
        if (this.hasM()) {
          var r = this.getDimension() - this.getMeasures();
          return this.getOrdinate(c, r);
        }
        return W.NaN;
      } }, { key: "setOrdinate", value: function(c, r, s) {
      } }, { key: "getZ", value: function(c) {
        return this.hasZ() ? this.getOrdinate(c, 2) : W.NaN;
      } }, { key: "size", value: function() {
      } }, { key: "getOrdinate", value: function(c, r) {
      } }, { key: "getCoordinate", value: function() {
      } }, { key: "getCoordinateCopy", value: function(c) {
      } }, { key: "createCoordinate", value: function() {
      } }, { key: "getDimension", value: function() {
      } }, { key: "hasM", value: function() {
        return this.getMeasures() > 0;
      } }, { key: "getX", value: function(c) {
      } }, { key: "hasZ", value: function() {
        return this.getDimension() - this.getMeasures() > 2;
      } }, { key: "getMeasures", value: function() {
        return 0;
      } }, { key: "expandEnvelope", value: function(c) {
      } }, { key: "copy", value: function() {
      } }, { key: "getY", value: function(c) {
      } }, { key: "toCoordinateArray", value: function() {
      } }, { key: "interfaces_", get: function() {
        return [k];
      } }]);
    }();
    Te.X = 0, Te.Y = 1, Te.Z = 2, Te.M = 3;
    var we = function() {
      function c() {
        o(this, c);
      }
      return h(c, null, [{ key: "index", value: function(r, s, l) {
        return ws.orientationIndex(r, s, l);
      } }, { key: "isCCW", value: function() {
        if (arguments[0] instanceof Array) {
          var r = arguments[0], s = r.length - 1;
          if (s < 3) throw new R("Ring has fewer than 4 points, so orientation cannot be determined");
          for (var l = r[0], d = 0, y = 1; y <= s; y++) {
            var x = r[y];
            x.y > l.y && (l = x, d = y);
          }
          var E = d;
          do
            (E -= 1) < 0 && (E = s);
          while (r[E].equals2D(l) && E !== d);
          var L = d;
          do
            L = (L + 1) % s;
          while (r[L].equals2D(l) && L !== d);
          var F = r[E], $ = r[L];
          if (F.equals2D(l) || $.equals2D(l) || F.equals2D($)) return !1;
          var K = c.index(F, l, $);
          return K === 0 ? F.x > $.x : K > 0;
        }
        if (Ee(arguments[0], Te)) {
          var ne = arguments[0], ue = ne.size() - 1;
          if (ue < 3) throw new R("Ring has fewer than 4 points, so orientation cannot be determined");
          for (var he = ne.getCoordinate(0), ge = 0, Oe = 1; Oe <= ue; Oe++) {
            var Le = ne.getCoordinate(Oe);
            Le.y > he.y && (he = Le, ge = Oe);
          }
          var Ye = null, st = ge;
          do
            (st -= 1) < 0 && (st = ue), Ye = ne.getCoordinate(st);
          while (Ye.equals2D(he) && st !== ge);
          var ut = null, In = ge;
          do
            In = (In + 1) % ue, ut = ne.getCoordinate(In);
          while (ut.equals2D(he) && In !== ge);
          if (Ye.equals2D(he) || ut.equals2D(he) || Ye.equals2D(ut)) return !1;
          var yr = c.index(Ye, he, ut);
          return yr === 0 ? Ye.x > ut.x : yr > 0;
        }
      } }]);
    }();
    we.CLOCKWISE = -1, we.RIGHT = we.CLOCKWISE, we.COUNTERCLOCKWISE = 1, we.LEFT = we.COUNTERCLOCKWISE, we.COLLINEAR = 0, we.STRAIGHT = we.COLLINEAR;
    var uf = function() {
      return h(function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }, [{ key: "getCoordinate", value: function() {
        return this._minCoord;
      } }, { key: "getRightmostSide", value: function(c, r) {
        var s = this.getRightmostSideOfSegment(c, r);
        return s < 0 && (s = this.getRightmostSideOfSegment(c, r - 1)), s < 0 && (this._minCoord = null, this.checkForRightmostCoordinate(c)), s;
      } }, { key: "findRightmostEdgeAtVertex", value: function() {
        var c = this._minDe.getEdge().getCoordinates();
        ee.isTrue(this._minIndex > 0 && this._minIndex < c.length, "rightmost point expected to be interior vertex of edge");
        var r = c[this._minIndex - 1], s = c[this._minIndex + 1], l = we.index(this._minCoord, s, r), d = !1;
        (r.y < this._minCoord.y && s.y < this._minCoord.y && l === we.COUNTERCLOCKWISE || r.y > this._minCoord.y && s.y > this._minCoord.y && l === we.CLOCKWISE) && (d = !0), d && (this._minIndex = this._minIndex - 1);
      } }, { key: "getRightmostSideOfSegment", value: function(c, r) {
        var s = c.getEdge().getCoordinates();
        if (r < 0 || r + 1 >= s.length || s[r].y === s[r + 1].y) return -1;
        var l = ie.LEFT;
        return s[r].y < s[r + 1].y && (l = ie.RIGHT), l;
      } }, { key: "getEdge", value: function() {
        return this._orientedDe;
      } }, { key: "checkForRightmostCoordinate", value: function(c) {
        for (var r = c.getEdge().getCoordinates(), s = 0; s < r.length - 1; s++) (this._minCoord === null || r[s].x > this._minCoord.x) && (this._minDe = c, this._minIndex = s, this._minCoord = r[s]);
      } }, { key: "findRightmostEdgeAtNode", value: function() {
        var c = this._minDe.getNode().getEdges();
        this._minDe = c.getRightmostEdge(), this._minDe.isForward() || (this._minDe = this._minDe.getSym(), this._minIndex = this._minDe.getEdge().getCoordinates().length - 1);
      } }, { key: "findEdge", value: function(c) {
        for (var r = c.iterator(); r.hasNext(); ) {
          var s = r.next();
          s.isForward() && this.checkForRightmostCoordinate(s);
        }
        ee.isTrue(this._minIndex !== 0 || this._minCoord.equals(this._minDe.getCoordinate()), "inconsistency in rightmost processing"), this._minIndex === 0 ? this.findRightmostEdgeAtNode() : this.findRightmostEdgeAtVertex(), this._orientedDe = this._minDe, this.getRightmostSide(this._minDe, this._minIndex) === ie.LEFT && (this._orientedDe = this._minDe.getSym());
      } }], [{ key: "constructor_", value: function() {
        this._minIndex = -1, this._minCoord = null, this._minDe = null, this._orientedDe = null;
      } }]);
    }(), en = function(c) {
      function r(s, l) {
        var d;
        return o(this, r), (d = i(this, r, [l ? s + " [ " + l + " ]" : s])).pt = l ? new Z(l) : void 0, d.name = Object.keys({ TopologyException: r })[0], d;
      }
      return v(r, c), h(r, [{ key: "getCoordinate", value: function() {
        return this.pt;
      } }]);
    }(J), lf = function() {
      return h(function c() {
        o(this, c), this.array = [];
      }, [{ key: "addLast", value: function(c) {
        this.array.push(c);
      } }, { key: "removeFirst", value: function() {
        return this.array.shift();
      } }, { key: "isEmpty", value: function() {
        return this.array.length === 0;
      } }]);
    }(), me = function(c) {
      function r(s) {
        var l;
        return o(this, r), (l = i(this, r)).array = [], s instanceof Me && l.addAll(s), l;
      }
      return v(r, c), h(r, [{ key: "interfaces_", get: function() {
        return [jt, Me];
      } }, { key: "ensureCapacity", value: function() {
      } }, { key: "add", value: function(s) {
        return arguments.length === 1 ? this.array.push(s) : this.array.splice(arguments[0], 0, arguments[1]), !0;
      } }, { key: "clear", value: function() {
        this.array = [];
      } }, { key: "addAll", value: function(s) {
        var l, d = f(s);
        try {
          for (d.s(); !(l = d.n()).done; ) {
            var y = l.value;
            this.array.push(y);
          }
        } catch (x) {
          d.e(x);
        } finally {
          d.f();
        }
      } }, { key: "set", value: function(s, l) {
        var d = this.array[s];
        return this.array[s] = l, d;
      } }, { key: "iterator", value: function() {
        return new cf(this);
      } }, { key: "get", value: function(s) {
        if (s < 0 || s >= this.size()) throw new ii();
        return this.array[s];
      } }, { key: "isEmpty", value: function() {
        return this.array.length === 0;
      } }, { key: "sort", value: function(s) {
        s ? this.array.sort(function(l, d) {
          return s.compare(l, d);
        }) : this.array.sort();
      } }, { key: "size", value: function() {
        return this.array.length;
      } }, { key: "toArray", value: function() {
        return this.array.slice();
      } }, { key: "remove", value: function(s) {
        for (var l = 0, d = this.array.length; l < d; l++) if (this.array[l] === s) return !!this.array.splice(l, 1);
        return !1;
      } }, { key: Symbol.iterator, value: function() {
        return this.array.values();
      } }]);
    }(jt), cf = function() {
      return h(function c(r) {
        o(this, c), this.arrayList = r, this.position = 0;
      }, [{ key: "next", value: function() {
        if (this.position === this.arrayList.size()) throw new Ne();
        return this.arrayList.get(this.position++);
      } }, { key: "hasNext", value: function() {
        return this.position < this.arrayList.size();
      } }, { key: "set", value: function(c) {
        return this.arrayList.set(this.position - 1, c);
      } }, { key: "remove", value: function() {
        this.arrayList.remove(this.arrayList.get(this.position));
      } }]);
    }(), hf = function() {
      return h(function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }, [{ key: "clearVisitedEdges", value: function() {
        for (var c = this._dirEdgeList.iterator(); c.hasNext(); )
          c.next().setVisited(!1);
      } }, { key: "getRightmostCoordinate", value: function() {
        return this._rightMostCoord;
      } }, { key: "computeNodeDepth", value: function(c) {
        for (var r = null, s = c.getEdges().iterator(); s.hasNext(); ) {
          var l = s.next();
          if (l.isVisited() || l.getSym().isVisited()) {
            r = l;
            break;
          }
        }
        if (r === null) throw new en("unable to find edge to compute depths at " + c.getCoordinate());
        c.getEdges().computeDepths(r);
        for (var d = c.getEdges().iterator(); d.hasNext(); ) {
          var y = d.next();
          y.setVisited(!0), this.copySymDepths(y);
        }
      } }, { key: "computeDepth", value: function(c) {
        this.clearVisitedEdges();
        var r = this._finder.getEdge();
        r.getNode(), r.getLabel(), r.setEdgeDepths(ie.RIGHT, c), this.copySymDepths(r), this.computeDepths(r);
      } }, { key: "create", value: function(c) {
        this.addReachable(c), this._finder.findEdge(this._dirEdgeList), this._rightMostCoord = this._finder.getCoordinate();
      } }, { key: "findResultEdges", value: function() {
        for (var c = this._dirEdgeList.iterator(); c.hasNext(); ) {
          var r = c.next();
          r.getDepth(ie.RIGHT) >= 1 && r.getDepth(ie.LEFT) <= 0 && !r.isInteriorAreaEdge() && r.setInResult(!0);
        }
      } }, { key: "computeDepths", value: function(c) {
        var r = new gt(), s = new lf(), l = c.getNode();
        for (s.addLast(l), r.add(l), c.setVisited(!0); !s.isEmpty(); ) {
          var d = s.removeFirst();
          r.add(d), this.computeNodeDepth(d);
          for (var y = d.getEdges().iterator(); y.hasNext(); ) {
            var x = y.next().getSym();
            if (!x.isVisited()) {
              var E = x.getNode();
              r.contains(E) || (s.addLast(E), r.add(E));
            }
          }
        }
      } }, { key: "compareTo", value: function(c) {
        var r = c;
        return this._rightMostCoord.x < r._rightMostCoord.x ? -1 : this._rightMostCoord.x > r._rightMostCoord.x ? 1 : 0;
      } }, { key: "getEnvelope", value: function() {
        if (this._env === null) {
          for (var c = new _e(), r = this._dirEdgeList.iterator(); r.hasNext(); ) for (var s = r.next().getEdge().getCoordinates(), l = 0; l < s.length - 1; l++) c.expandToInclude(s[l]);
          this._env = c;
        }
        return this._env;
      } }, { key: "addReachable", value: function(c) {
        var r = new ps();
        for (r.add(c); !r.empty(); ) {
          var s = r.pop();
          this.add(s, r);
        }
      } }, { key: "copySymDepths", value: function(c) {
        var r = c.getSym();
        r.setDepth(ie.LEFT, c.getDepth(ie.RIGHT)), r.setDepth(ie.RIGHT, c.getDepth(ie.LEFT));
      } }, { key: "add", value: function(c, r) {
        c.setVisited(!0), this._nodes.add(c);
        for (var s = c.getEdges().iterator(); s.hasNext(); ) {
          var l = s.next();
          this._dirEdgeList.add(l);
          var d = l.getSym().getNode();
          d.isVisited() || r.push(d);
        }
      } }, { key: "getNodes", value: function() {
        return this._nodes;
      } }, { key: "getDirectedEdges", value: function() {
        return this._dirEdgeList;
      } }, { key: "interfaces_", get: function() {
        return [V];
      } }], [{ key: "constructor_", value: function() {
        this._finder = null, this._dirEdgeList = new me(), this._nodes = new me(), this._rightMostCoord = null, this._env = null, this._finder = new uf();
      } }]);
    }(), xs = function() {
      return h(function c() {
        o(this, c);
      }, null, [{ key: "intersection", value: function(c, r, s, l) {
        var d = c.x < r.x ? c.x : r.x, y = c.y < r.y ? c.y : r.y, x = c.x > r.x ? c.x : r.x, E = c.y > r.y ? c.y : r.y, L = s.x < l.x ? s.x : l.x, F = s.y < l.y ? s.y : l.y, $ = s.x > l.x ? s.x : l.x, K = s.y > l.y ? s.y : l.y, ne = ((d > L ? d : L) + (x < $ ? x : $)) / 2, ue = ((y > F ? y : F) + (E < K ? E : K)) / 2, he = c.x - ne, ge = c.y - ue, Oe = r.x - ne, Le = r.y - ue, Ye = s.x - ne, st = s.y - ue, ut = l.x - ne, In = l.y - ue, yr = ge - Le, tu = Oe - he, nu = he * Le - Oe * ge, ru = st - In, iu = ut - Ye, su = Ye * In - ut * st, ou = yr * iu - ru * tu, Fs = (tu * su - iu * nu) / ou, Bs = (ru * nu - yr * su) / ou;
        return W.isNaN(Fs) || W.isInfinite(Fs) || W.isNaN(Bs) || W.isInfinite(Bs) ? null : new Z(Fs + ne, Bs + ue);
      } }]);
    }(), Mt = function() {
      return h(function c() {
        o(this, c);
      }, null, [{ key: "arraycopy", value: function(c, r, s, l, d) {
        for (var y = 0, x = r; x < r + d; x++) s[l + y] = c[x], y++;
      } }, { key: "getProperty", value: function(c) {
        return { "line.separator": `
` }[c];
      } }]);
    }(), lr = function() {
      function c() {
        o(this, c);
      }
      return h(c, null, [{ key: "log10", value: function(r) {
        var s = Math.log(r);
        return W.isInfinite(s) || W.isNaN(s) ? s : s / c.LOG_10;
      } }, { key: "min", value: function(r, s, l, d) {
        var y = r;
        return s < y && (y = s), l < y && (y = l), d < y && (y = d), y;
      } }, { key: "clamp", value: function() {
        if (typeof arguments[2] == "number" && typeof arguments[0] == "number" && typeof arguments[1] == "number") {
          var r = arguments[0], s = arguments[1], l = arguments[2];
          return r < s ? s : r > l ? l : r;
        }
        if (Number.isInteger(arguments[2]) && Number.isInteger(arguments[0]) && Number.isInteger(arguments[1])) {
          var d = arguments[0], y = arguments[1], x = arguments[2];
          return d < y ? y : d > x ? x : d;
        }
      } }, { key: "wrap", value: function(r, s) {
        return r < 0 ? s - -r % s : r % s;
      } }, { key: "max", value: function() {
        if (arguments.length === 3) {
          var r = arguments[1], s = arguments[2], l = arguments[0];
          return r > l && (l = r), s > l && (l = s), l;
        }
        if (arguments.length === 4) {
          var d = arguments[1], y = arguments[2], x = arguments[3], E = arguments[0];
          return d > E && (E = d), y > E && (E = y), x > E && (E = x), E;
        }
      } }, { key: "average", value: function(r, s) {
        return (r + s) / 2;
      } }]);
    }();
    lr.LOG_10 = Math.log(10);
    var Ut = function() {
      function c() {
        o(this, c);
      }
      return h(c, null, [{ key: "segmentToSegment", value: function(r, s, l, d) {
        if (r.equals(s)) return c.pointToSegment(r, l, d);
        if (l.equals(d)) return c.pointToSegment(d, r, s);
        var y = !1;
        if (_e.intersects(r, s, l, d)) {
          var x = (s.x - r.x) * (d.y - l.y) - (s.y - r.y) * (d.x - l.x);
          if (x === 0) y = !0;
          else {
            var E = (r.y - l.y) * (d.x - l.x) - (r.x - l.x) * (d.y - l.y), L = ((r.y - l.y) * (s.x - r.x) - (r.x - l.x) * (s.y - r.y)) / x, F = E / x;
            (F < 0 || F > 1 || L < 0 || L > 1) && (y = !0);
          }
        } else y = !0;
        return y ? lr.min(c.pointToSegment(r, l, d), c.pointToSegment(s, l, d), c.pointToSegment(l, r, s), c.pointToSegment(d, r, s)) : 0;
      } }, { key: "pointToSegment", value: function(r, s, l) {
        if (s.x === l.x && s.y === l.y) return r.distance(s);
        var d = (l.x - s.x) * (l.x - s.x) + (l.y - s.y) * (l.y - s.y), y = ((r.x - s.x) * (l.x - s.x) + (r.y - s.y) * (l.y - s.y)) / d;
        if (y <= 0) return r.distance(s);
        if (y >= 1) return r.distance(l);
        var x = ((s.y - r.y) * (l.x - s.x) - (s.x - r.x) * (l.y - s.y)) / d;
        return Math.abs(x) * Math.sqrt(d);
      } }, { key: "pointToLinePerpendicular", value: function(r, s, l) {
        var d = (l.x - s.x) * (l.x - s.x) + (l.y - s.y) * (l.y - s.y), y = ((s.y - r.y) * (l.x - s.x) - (s.x - r.x) * (l.y - s.y)) / d;
        return Math.abs(y) * Math.sqrt(d);
      } }, { key: "pointToSegmentString", value: function(r, s) {
        if (s.length === 0) throw new R("Line array must contain at least one vertex");
        for (var l = r.distance(s[0]), d = 0; d < s.length - 1; d++) {
          var y = c.pointToSegment(r, s[d], s[d + 1]);
          y < l && (l = y);
        }
        return l;
      } }]);
    }(), ma = function() {
      return h(function c() {
        o(this, c);
      }, [{ key: "create", value: function() {
        if (arguments.length === 1) arguments[0] instanceof Array || Ee(arguments[0], Te);
        else if (arguments.length !== 2) {
          if (arguments.length === 3) {
            var c = arguments[0], r = arguments[1];
            return this.create(c, r);
          }
        }
      } }]);
    }(), si = function() {
      return h(function c() {
        o(this, c);
      }, [{ key: "filter", value: function(c) {
      } }]);
    }(), ff = function() {
      return h(function c() {
        o(this, c);
      }, null, [{ key: "ofLine", value: function(c) {
        var r = c.size();
        if (r <= 1) return 0;
        var s = 0, l = new Z();
        c.getCoordinate(0, l);
        for (var d = l.x, y = l.y, x = 1; x < r; x++) {
          c.getCoordinate(x, l);
          var E = l.x, L = l.y, F = E - d, $ = L - y;
          s += Math.sqrt(F * F + $ * $), d = E, y = L;
        }
        return s;
      } }]);
    }(), ya = h(function c() {
      o(this, c);
    }), _n = function() {
      function c() {
        o(this, c);
      }
      return h(c, null, [{ key: "copyCoord", value: function(r, s, l, d) {
        for (var y = Math.min(r.getDimension(), l.getDimension()), x = 0; x < y; x++) l.setOrdinate(d, x, r.getOrdinate(s, x));
      } }, { key: "isRing", value: function(r) {
        var s = r.size();
        return s === 0 || !(s <= 3) && r.getOrdinate(0, Te.X) === r.getOrdinate(s - 1, Te.X) && r.getOrdinate(0, Te.Y) === r.getOrdinate(s - 1, Te.Y);
      } }, { key: "scroll", value: function() {
        if (arguments.length === 2) {
          if (Ee(arguments[0], Te) && Number.isInteger(arguments[1])) {
            var r = arguments[0], s = arguments[1];
            c.scroll(r, s, c.isRing(r));
          } else if (Ee(arguments[0], Te) && arguments[1] instanceof Z) {
            var l = arguments[0], d = arguments[1], y = c.indexOf(d, l);
            if (y <= 0) return null;
            c.scroll(l, y);
          }
        } else if (arguments.length === 3) {
          var x = arguments[0], E = arguments[1], L = arguments[2];
          if (E <= 0) return null;
          for (var F = x.copy(), $ = L ? x.size() - 1 : x.size(), K = 0; K < $; K++) for (var ne = 0; ne < x.getDimension(); ne++) x.setOrdinate(K, ne, F.getOrdinate((E + K) % $, ne));
          if (L) for (var ue = 0; ue < x.getDimension(); ue++) x.setOrdinate($, ue, x.getOrdinate(0, ue));
        }
      } }, { key: "isEqual", value: function(r, s) {
        var l = r.size();
        if (l !== s.size()) return !1;
        for (var d = Math.min(r.getDimension(), s.getDimension()), y = 0; y < l; y++) for (var x = 0; x < d; x++) {
          var E = r.getOrdinate(y, x), L = s.getOrdinate(y, x);
          if (r.getOrdinate(y, x) !== s.getOrdinate(y, x) && (!W.isNaN(E) || !W.isNaN(L))) return !1;
        }
        return !0;
      } }, { key: "minCoordinateIndex", value: function() {
        if (arguments.length === 1) {
          var r = arguments[0];
          return c.minCoordinateIndex(r, 0, r.size() - 1);
        }
        if (arguments.length === 3) {
          for (var s = arguments[0], l = arguments[2], d = -1, y = null, x = arguments[1]; x <= l; x++) {
            var E = s.getCoordinate(x);
            (y === null || y.compareTo(E) > 0) && (y = E, d = x);
          }
          return d;
        }
      } }, { key: "extend", value: function(r, s, l) {
        var d = r.create(l, s.getDimension()), y = s.size();
        if (c.copy(s, 0, d, 0, y), y > 0) for (var x = y; x < l; x++) c.copy(s, y - 1, d, x, 1);
        return d;
      } }, { key: "reverse", value: function(r) {
        for (var s = r.size() - 1, l = Math.trunc(s / 2), d = 0; d <= l; d++) c.swap(r, d, s - d);
      } }, { key: "swap", value: function(r, s, l) {
        if (s === l) return null;
        for (var d = 0; d < r.getDimension(); d++) {
          var y = r.getOrdinate(s, d);
          r.setOrdinate(s, d, r.getOrdinate(l, d)), r.setOrdinate(l, d, y);
        }
      } }, { key: "copy", value: function(r, s, l, d, y) {
        for (var x = 0; x < y; x++) c.copyCoord(r, s + x, l, d + x);
      } }, { key: "ensureValidRing", value: function(r, s) {
        var l = s.size();
        return l === 0 ? s : l <= 3 ? c.createClosedRing(r, s, 4) : s.getOrdinate(0, Te.X) === s.getOrdinate(l - 1, Te.X) && s.getOrdinate(0, Te.Y) === s.getOrdinate(l - 1, Te.Y) ? s : c.createClosedRing(r, s, l + 1);
      } }, { key: "indexOf", value: function(r, s) {
        for (var l = 0; l < s.size(); l++) if (r.x === s.getOrdinate(l, Te.X) && r.y === s.getOrdinate(l, Te.Y)) return l;
        return -1;
      } }, { key: "createClosedRing", value: function(r, s, l) {
        var d = r.create(l, s.getDimension()), y = s.size();
        c.copy(s, 0, d, 0, y);
        for (var x = y; x < l; x++) c.copy(s, 0, d, x, 1);
        return d;
      } }, { key: "minCoordinate", value: function(r) {
        for (var s = null, l = 0; l < r.size(); l++) {
          var d = r.getCoordinate(l);
          (s === null || s.compareTo(d) > 0) && (s = d);
        }
        return s;
      } }]);
    }(), oe = function() {
      function c() {
        o(this, c);
      }
      return h(c, null, [{ key: "toDimensionSymbol", value: function(r) {
        switch (r) {
          case c.FALSE:
            return c.SYM_FALSE;
          case c.TRUE:
            return c.SYM_TRUE;
          case c.DONTCARE:
            return c.SYM_DONTCARE;
          case c.P:
            return c.SYM_P;
          case c.L:
            return c.SYM_L;
          case c.A:
            return c.SYM_A;
        }
        throw new R("Unknown dimension value: " + r);
      } }, { key: "toDimensionValue", value: function(r) {
        switch (_s.toUpperCase(r)) {
          case c.SYM_FALSE:
            return c.FALSE;
          case c.SYM_TRUE:
            return c.TRUE;
          case c.SYM_DONTCARE:
            return c.DONTCARE;
          case c.SYM_P:
            return c.P;
          case c.SYM_L:
            return c.L;
          case c.SYM_A:
            return c.A;
        }
        throw new R("Unknown dimension symbol: " + r);
      } }]);
    }();
    oe.P = 0, oe.L = 1, oe.A = 2, oe.FALSE = -1, oe.TRUE = -2, oe.DONTCARE = -3, oe.SYM_FALSE = "F", oe.SYM_TRUE = "T", oe.SYM_DONTCARE = "*", oe.SYM_P = "0", oe.SYM_L = "1", oe.SYM_A = "2";
    var oi = function() {
      return h(function c() {
        o(this, c);
      }, [{ key: "filter", value: function(c) {
      } }]);
    }(), ai = function() {
      return h(function c() {
        o(this, c);
      }, [{ key: "filter", value: function(c, r) {
      } }, { key: "isDone", value: function() {
      } }, { key: "isGeometryChanged", value: function() {
      } }]);
    }(), cr = function(c) {
      function r() {
        var s;
        return o(this, r), s = i(this, r), r.constructor_.apply(s, arguments), s;
      }
      return v(r, c), h(r, [{ key: "computeEnvelopeInternal", value: function() {
        return this.isEmpty() ? new _e() : this._points.expandEnvelope(new _e());
      } }, { key: "isRing", value: function() {
        return this.isClosed() && this.isSimple();
      } }, { key: "getCoordinates", value: function() {
        return this._points.toCoordinateArray();
      } }, { key: "copyInternal", value: function() {
        return new r(this._points.copy(), this._factory);
      } }, { key: "equalsExact", value: function() {
        if (arguments.length === 2 && typeof arguments[1] == "number" && arguments[0] instanceof ae) {
          var s = arguments[0], l = arguments[1];
          if (!this.isEquivalentClass(s)) return !1;
          var d = s;
          if (this._points.size() !== d._points.size()) return !1;
          for (var y = 0; y < this._points.size(); y++) if (!this.equal(this._points.getCoordinate(y), d._points.getCoordinate(y), l)) return !1;
          return !0;
        }
        return w(r, "equalsExact", this, 1).apply(this, arguments);
      } }, { key: "normalize", value: function() {
        for (var s = 0; s < Math.trunc(this._points.size() / 2); s++) {
          var l = this._points.size() - 1 - s;
          if (!this._points.getCoordinate(s).equals(this._points.getCoordinate(l))) {
            if (this._points.getCoordinate(s).compareTo(this._points.getCoordinate(l)) > 0) {
              var d = this._points.copy();
              _n.reverse(d), this._points = d;
            }
            return null;
          }
        }
      } }, { key: "getCoordinate", value: function() {
        return this.isEmpty() ? null : this._points.getCoordinate(0);
      } }, { key: "getBoundaryDimension", value: function() {
        return this.isClosed() ? oe.FALSE : 0;
      } }, { key: "isClosed", value: function() {
        return !this.isEmpty() && this.getCoordinateN(0).equals2D(this.getCoordinateN(this.getNumPoints() - 1));
      } }, { key: "reverseInternal", value: function() {
        var s = this._points.copy();
        return _n.reverse(s), this.getFactory().createLineString(s);
      } }, { key: "getEndPoint", value: function() {
        return this.isEmpty() ? null : this.getPointN(this.getNumPoints() - 1);
      } }, { key: "getTypeCode", value: function() {
        return ae.TYPECODE_LINESTRING;
      } }, { key: "getDimension", value: function() {
        return 1;
      } }, { key: "getLength", value: function() {
        return ff.ofLine(this._points);
      } }, { key: "getNumPoints", value: function() {
        return this._points.size();
      } }, { key: "compareToSameClass", value: function() {
        if (arguments.length === 1) {
          for (var s = arguments[0], l = 0, d = 0; l < this._points.size() && d < s._points.size(); ) {
            var y = this._points.getCoordinate(l).compareTo(s._points.getCoordinate(d));
            if (y !== 0) return y;
            l++, d++;
          }
          return l < this._points.size() ? 1 : d < s._points.size() ? -1 : 0;
        }
        if (arguments.length === 2) {
          var x = arguments[0];
          return arguments[1].compare(this._points, x._points);
        }
      } }, { key: "apply", value: function() {
        if (Ee(arguments[0], si)) for (var s = arguments[0], l = 0; l < this._points.size(); l++) s.filter(this._points.getCoordinate(l));
        else if (Ee(arguments[0], ai)) {
          var d = arguments[0];
          if (this._points.size() === 0) return null;
          for (var y = 0; y < this._points.size() && (d.filter(this._points, y), !d.isDone()); y++) ;
          d.isGeometryChanged() && this.geometryChanged();
        } else Ee(arguments[0], oi) ? arguments[0].filter(this) : Ee(arguments[0], U) && arguments[0].filter(this);
      } }, { key: "getBoundary", value: function() {
        throw new ke();
      } }, { key: "isEquivalentClass", value: function(s) {
        return s instanceof r;
      } }, { key: "getCoordinateN", value: function(s) {
        return this._points.getCoordinate(s);
      } }, { key: "getGeometryType", value: function() {
        return ae.TYPENAME_LINESTRING;
      } }, { key: "getCoordinateSequence", value: function() {
        return this._points;
      } }, { key: "isEmpty", value: function() {
        return this._points.size() === 0;
      } }, { key: "init", value: function(s) {
        if (s === null && (s = this.getFactory().getCoordinateSequenceFactory().create([])), s.size() === 1) throw new R("Invalid number of points in LineString (found " + s.size() + " - must be 0 or >= 2)");
        this._points = s;
      } }, { key: "isCoordinate", value: function(s) {
        for (var l = 0; l < this._points.size(); l++) if (this._points.getCoordinate(l).equals(s)) return !0;
        return !1;
      } }, { key: "getStartPoint", value: function() {
        return this.isEmpty() ? null : this.getPointN(0);
      } }, { key: "getPointN", value: function(s) {
        return this.getFactory().createPoint(this._points.getCoordinate(s));
      } }, { key: "interfaces_", get: function() {
        return [ya];
      } }], [{ key: "constructor_", value: function() {
        if (this._points = null, arguments.length !== 0) {
          if (arguments.length === 2) {
            var s = arguments[0], l = arguments[1];
            ae.constructor_.call(this, l), this.init(s);
          }
        }
      } }]);
    }(ae), pa = h(function c() {
      o(this, c);
    }), Es = function(c) {
      function r() {
        var s;
        return o(this, r), s = i(this, r), r.constructor_.apply(s, arguments), s;
      }
      return v(r, c), h(r, [{ key: "computeEnvelopeInternal", value: function() {
        if (this.isEmpty()) return new _e();
        var s = new _e();
        return s.expandToInclude(this._coordinates.getX(0), this._coordinates.getY(0)), s;
      } }, { key: "getCoordinates", value: function() {
        return this.isEmpty() ? [] : [this.getCoordinate()];
      } }, { key: "copyInternal", value: function() {
        return new r(this._coordinates.copy(), this._factory);
      } }, { key: "equalsExact", value: function() {
        if (arguments.length === 2 && typeof arguments[1] == "number" && arguments[0] instanceof ae) {
          var s = arguments[0], l = arguments[1];
          return !!this.isEquivalentClass(s) && (!(!this.isEmpty() || !s.isEmpty()) || this.isEmpty() === s.isEmpty() && this.equal(s.getCoordinate(), this.getCoordinate(), l));
        }
        return w(r, "equalsExact", this, 1).apply(this, arguments);
      } }, { key: "normalize", value: function() {
      } }, { key: "getCoordinate", value: function() {
        return this._coordinates.size() !== 0 ? this._coordinates.getCoordinate(0) : null;
      } }, { key: "getBoundaryDimension", value: function() {
        return oe.FALSE;
      } }, { key: "reverseInternal", value: function() {
        return this.getFactory().createPoint(this._coordinates.copy());
      } }, { key: "getTypeCode", value: function() {
        return ae.TYPECODE_POINT;
      } }, { key: "getDimension", value: function() {
        return 0;
      } }, { key: "getNumPoints", value: function() {
        return this.isEmpty() ? 0 : 1;
      } }, { key: "getX", value: function() {
        if (this.getCoordinate() === null) throw new IllegalStateException("getX called on empty Point");
        return this.getCoordinate().x;
      } }, { key: "compareToSameClass", value: function() {
        if (arguments.length === 1) {
          var s = arguments[0];
          return this.getCoordinate().compareTo(s.getCoordinate());
        }
        if (arguments.length === 2) {
          var l = arguments[0];
          return arguments[1].compare(this._coordinates, l._coordinates);
        }
      } }, { key: "apply", value: function() {
        if (Ee(arguments[0], si)) {
          var s = arguments[0];
          if (this.isEmpty()) return null;
          s.filter(this.getCoordinate());
        } else if (Ee(arguments[0], ai)) {
          var l = arguments[0];
          if (this.isEmpty()) return null;
          l.filter(this._coordinates, 0), l.isGeometryChanged() && this.geometryChanged();
        } else Ee(arguments[0], oi) ? arguments[0].filter(this) : Ee(arguments[0], U) && arguments[0].filter(this);
      } }, { key: "getBoundary", value: function() {
        return this.getFactory().createGeometryCollection();
      } }, { key: "getGeometryType", value: function() {
        return ae.TYPENAME_POINT;
      } }, { key: "getCoordinateSequence", value: function() {
        return this._coordinates;
      } }, { key: "getY", value: function() {
        if (this.getCoordinate() === null) throw new IllegalStateException("getY called on empty Point");
        return this.getCoordinate().y;
      } }, { key: "isEmpty", value: function() {
        return this._coordinates.size() === 0;
      } }, { key: "init", value: function(s) {
        s === null && (s = this.getFactory().getCoordinateSequenceFactory().create([])), ee.isTrue(s.size() <= 1), this._coordinates = s;
      } }, { key: "isSimple", value: function() {
        return !0;
      } }, { key: "interfaces_", get: function() {
        return [pa];
      } }], [{ key: "constructor_", value: function() {
        this._coordinates = null;
        var s = arguments[0], l = arguments[1];
        ae.constructor_.call(this, l), this.init(s);
      } }]);
    }(ae), _a = function() {
      function c() {
        o(this, c);
      }
      return h(c, null, [{ key: "ofRing", value: function() {
        if (arguments[0] instanceof Array) {
          var r = arguments[0];
          return Math.abs(c.ofRingSigned(r));
        }
        if (Ee(arguments[0], Te)) {
          var s = arguments[0];
          return Math.abs(c.ofRingSigned(s));
        }
      } }, { key: "ofRingSigned", value: function() {
        if (arguments[0] instanceof Array) {
          var r = arguments[0];
          if (r.length < 3) return 0;
          for (var s = 0, l = r[0].x, d = 1; d < r.length - 1; d++) {
            var y = r[d].x - l, x = r[d + 1].y;
            s += y * (r[d - 1].y - x);
          }
          return s / 2;
        }
        if (Ee(arguments[0], Te)) {
          var E = arguments[0], L = E.size();
          if (L < 3) return 0;
          var F = new Z(), $ = new Z(), K = new Z();
          E.getCoordinate(0, $), E.getCoordinate(1, K);
          var ne = $.x;
          K.x -= ne;
          for (var ue = 0, he = 1; he < L - 1; he++) F.y = $.y, $.x = K.x, $.y = K.y, E.getCoordinate(he + 1, K), K.x -= ne, ue += $.x * (F.y - K.y);
          return ue / 2;
        }
      } }]);
    }(), wn = function() {
      return h(function c() {
        o(this, c);
      }, null, [{ key: "sort", value: function() {
        var c = arguments, r = arguments[0];
        if (arguments.length === 1) r.sort(function(ne, ue) {
          return ne.compareTo(ue);
        });
        else if (arguments.length === 2) r.sort(function(ne, ue) {
          return c[1].compare(ne, ue);
        });
        else if (arguments.length === 3) {
          var s = r.slice(arguments[1], arguments[2]);
          s.sort();
          var l = r.slice(0, arguments[1]).concat(s, r.slice(arguments[2], r.length));
          r.splice(0, r.length);
          var d, y = f(l);
          try {
            for (y.s(); !(d = y.n()).done; ) {
              var x = d.value;
              r.push(x);
            }
          } catch (ne) {
            y.e(ne);
          } finally {
            y.f();
          }
        } else if (arguments.length === 4) {
          var E = r.slice(arguments[1], arguments[2]);
          E.sort(function(ne, ue) {
            return c[3].compare(ne, ue);
          });
          var L = r.slice(0, arguments[1]).concat(E, r.slice(arguments[2], r.length));
          r.splice(0, r.length);
          var F, $ = f(L);
          try {
            for ($.s(); !(F = $.n()).done; ) {
              var K = F.value;
              r.push(K);
            }
          } catch (ne) {
            $.e(ne);
          } finally {
            $.f();
          }
        }
      } }, { key: "asList", value: function(c) {
        var r, s = new me(), l = f(c);
        try {
          for (l.s(); !(r = l.n()).done; ) {
            var d = r.value;
            s.add(d);
          }
        } catch (y) {
          l.e(y);
        } finally {
          l.f();
        }
        return s;
      } }, { key: "copyOf", value: function(c, r) {
        return c.slice(0, r);
      } }]);
    }(), wa = h(function c() {
      o(this, c);
    }), ui = function(c) {
      function r() {
        var s;
        return o(this, r), s = i(this, r), r.constructor_.apply(s, arguments), s;
      }
      return v(r, c), h(r, [{ key: "computeEnvelopeInternal", value: function() {
        return this._shell.getEnvelopeInternal();
      } }, { key: "getCoordinates", value: function() {
        if (this.isEmpty()) return [];
        for (var s = new Array(this.getNumPoints()).fill(null), l = -1, d = this._shell.getCoordinates(), y = 0; y < d.length; y++) s[++l] = d[y];
        for (var x = 0; x < this._holes.length; x++) for (var E = this._holes[x].getCoordinates(), L = 0; L < E.length; L++) s[++l] = E[L];
        return s;
      } }, { key: "getArea", value: function() {
        var s = 0;
        s += _a.ofRing(this._shell.getCoordinateSequence());
        for (var l = 0; l < this._holes.length; l++) s -= _a.ofRing(this._holes[l].getCoordinateSequence());
        return s;
      } }, { key: "copyInternal", value: function() {
        for (var s = this._shell.copy(), l = new Array(this._holes.length).fill(null), d = 0; d < this._holes.length; d++) l[d] = this._holes[d].copy();
        return new r(s, l, this._factory);
      } }, { key: "isRectangle", value: function() {
        if (this.getNumInteriorRing() !== 0 || this._shell === null || this._shell.getNumPoints() !== 5) return !1;
        for (var s = this._shell.getCoordinateSequence(), l = this.getEnvelopeInternal(), d = 0; d < 5; d++) {
          var y = s.getX(d);
          if (y !== l.getMinX() && y !== l.getMaxX()) return !1;
          var x = s.getY(d);
          if (x !== l.getMinY() && x !== l.getMaxY()) return !1;
        }
        for (var E = s.getX(0), L = s.getY(0), F = 1; F <= 4; F++) {
          var $ = s.getX(F), K = s.getY(F);
          if ($ !== E == (K !== L)) return !1;
          E = $, L = K;
        }
        return !0;
      } }, { key: "equalsExact", value: function() {
        if (arguments.length === 2 && typeof arguments[1] == "number" && arguments[0] instanceof ae) {
          var s = arguments[0], l = arguments[1];
          if (!this.isEquivalentClass(s)) return !1;
          var d = s, y = this._shell, x = d._shell;
          if (!y.equalsExact(x, l) || this._holes.length !== d._holes.length) return !1;
          for (var E = 0; E < this._holes.length; E++) if (!this._holes[E].equalsExact(d._holes[E], l)) return !1;
          return !0;
        }
        return w(r, "equalsExact", this, 1).apply(this, arguments);
      } }, { key: "normalize", value: function() {
        if (arguments.length === 0) {
          this._shell = this.normalized(this._shell, !0);
          for (var s = 0; s < this._holes.length; s++) this._holes[s] = this.normalized(this._holes[s], !1);
          wn.sort(this._holes);
        } else if (arguments.length === 2) {
          var l = arguments[0], d = arguments[1];
          if (l.isEmpty()) return null;
          var y = l.getCoordinateSequence(), x = _n.minCoordinateIndex(y, 0, y.size() - 2);
          _n.scroll(y, x, !0), we.isCCW(y) === d && _n.reverse(y);
        }
      } }, { key: "getCoordinate", value: function() {
        return this._shell.getCoordinate();
      } }, { key: "getNumInteriorRing", value: function() {
        return this._holes.length;
      } }, { key: "getBoundaryDimension", value: function() {
        return 1;
      } }, { key: "reverseInternal", value: function() {
        for (var s = this.getExteriorRing().reverse(), l = new Array(this.getNumInteriorRing()).fill(null), d = 0; d < l.length; d++) l[d] = this.getInteriorRingN(d).reverse();
        return this.getFactory().createPolygon(s, l);
      } }, { key: "getTypeCode", value: function() {
        return ae.TYPECODE_POLYGON;
      } }, { key: "getDimension", value: function() {
        return 2;
      } }, { key: "getLength", value: function() {
        var s = 0;
        s += this._shell.getLength();
        for (var l = 0; l < this._holes.length; l++) s += this._holes[l].getLength();
        return s;
      } }, { key: "getNumPoints", value: function() {
        for (var s = this._shell.getNumPoints(), l = 0; l < this._holes.length; l++) s += this._holes[l].getNumPoints();
        return s;
      } }, { key: "convexHull", value: function() {
        return this.getExteriorRing().convexHull();
      } }, { key: "normalized", value: function(s, l) {
        var d = s.copy();
        return this.normalize(d, l), d;
      } }, { key: "compareToSameClass", value: function() {
        if (arguments.length === 1) {
          var s = arguments[0], l = this._shell, d = s._shell;
          return l.compareToSameClass(d);
        }
        if (arguments.length === 2) {
          var y = arguments[1], x = arguments[0], E = this._shell, L = x._shell, F = E.compareToSameClass(L, y);
          if (F !== 0) return F;
          for (var $ = this.getNumInteriorRing(), K = x.getNumInteriorRing(), ne = 0; ne < $ && ne < K; ) {
            var ue = this.getInteriorRingN(ne), he = x.getInteriorRingN(ne), ge = ue.compareToSameClass(he, y);
            if (ge !== 0) return ge;
            ne++;
          }
          return ne < $ ? 1 : ne < K ? -1 : 0;
        }
      } }, { key: "apply", value: function() {
        if (Ee(arguments[0], si)) {
          var s = arguments[0];
          this._shell.apply(s);
          for (var l = 0; l < this._holes.length; l++) this._holes[l].apply(s);
        } else if (Ee(arguments[0], ai)) {
          var d = arguments[0];
          if (this._shell.apply(d), !d.isDone()) for (var y = 0; y < this._holes.length && (this._holes[y].apply(d), !d.isDone()); y++) ;
          d.isGeometryChanged() && this.geometryChanged();
        } else if (Ee(arguments[0], oi))
          arguments[0].filter(this);
        else if (Ee(arguments[0], U)) {
          var x = arguments[0];
          x.filter(this), this._shell.apply(x);
          for (var E = 0; E < this._holes.length; E++) this._holes[E].apply(x);
        }
      } }, { key: "getBoundary", value: function() {
        if (this.isEmpty()) return this.getFactory().createMultiLineString();
        var s = new Array(this._holes.length + 1).fill(null);
        s[0] = this._shell;
        for (var l = 0; l < this._holes.length; l++) s[l + 1] = this._holes[l];
        return s.length <= 1 ? this.getFactory().createLinearRing(s[0].getCoordinateSequence()) : this.getFactory().createMultiLineString(s);
      } }, { key: "getGeometryType", value: function() {
        return ae.TYPENAME_POLYGON;
      } }, { key: "getExteriorRing", value: function() {
        return this._shell;
      } }, { key: "isEmpty", value: function() {
        return this._shell.isEmpty();
      } }, { key: "getInteriorRingN", value: function(s) {
        return this._holes[s];
      } }, { key: "interfaces_", get: function() {
        return [wa];
      } }], [{ key: "constructor_", value: function() {
        this._shell = null, this._holes = null;
        var s = arguments[0], l = arguments[1], d = arguments[2];
        if (ae.constructor_.call(this, d), s === null && (s = this.getFactory().createLinearRing()), l === null && (l = []), ae.hasNullElements(l)) throw new R("holes must not contain null elements");
        if (s.isEmpty() && ae.hasNonEmptyElements(l)) throw new R("shell is empty but holes are not");
        this._shell = s, this._holes = l;
      } }]);
    }(ae), gf = function(c) {
      function r() {
        return o(this, r), i(this, r, arguments);
      }
      return v(r, c), h(r);
    }(pt), xa = function(c) {
      function r(s) {
        var l;
        return o(this, r), (l = i(this, r)).array = [], s instanceof Me && l.addAll(s), l;
      }
      return v(r, c), h(r, [{ key: "contains", value: function(s) {
        var l, d = f(this.array);
        try {
          for (d.s(); !(l = d.n()).done; )
            if (l.value.compareTo(s) === 0) return !0;
        } catch (y) {
          d.e(y);
        } finally {
          d.f();
        }
        return !1;
      } }, { key: "add", value: function(s) {
        if (this.contains(s)) return !1;
        for (var l = 0, d = this.array.length; l < d; l++)
          if (this.array[l].compareTo(s) === 1) return !!this.array.splice(l, 0, s);
        return this.array.push(s), !0;
      } }, { key: "addAll", value: function(s) {
        var l, d = f(s);
        try {
          for (d.s(); !(l = d.n()).done; ) {
            var y = l.value;
            this.add(y);
          }
        } catch (x) {
          d.e(x);
        } finally {
          d.f();
        }
        return !0;
      } }, { key: "remove", value: function() {
        throw new ke();
      } }, { key: "size", value: function() {
        return this.array.length;
      } }, { key: "isEmpty", value: function() {
        return this.array.length === 0;
      } }, { key: "toArray", value: function() {
        return this.array.slice();
      } }, { key: "iterator", value: function() {
        return new df(this.array);
      } }]);
    }(gf), df = function() {
      return h(function c(r) {
        o(this, c), this.array = r, this.position = 0;
      }, [{ key: "next", value: function() {
        if (this.position === this.array.length) throw new Ne();
        return this.array[this.position++];
      } }, { key: "hasNext", value: function() {
        return this.position < this.array.length;
      } }, { key: "remove", value: function() {
        throw new ke();
      } }]);
    }(), Et = function(c) {
      function r() {
        var s;
        return o(this, r), s = i(this, r), r.constructor_.apply(s, arguments), s;
      }
      return v(r, c), h(r, [{ key: "computeEnvelopeInternal", value: function() {
        for (var s = new _e(), l = 0; l < this._geometries.length; l++) s.expandToInclude(this._geometries[l].getEnvelopeInternal());
        return s;
      } }, { key: "getGeometryN", value: function(s) {
        return this._geometries[s];
      } }, { key: "getCoordinates", value: function() {
        for (var s = new Array(this.getNumPoints()).fill(null), l = -1, d = 0; d < this._geometries.length; d++) for (var y = this._geometries[d].getCoordinates(), x = 0; x < y.length; x++) s[++l] = y[x];
        return s;
      } }, { key: "getArea", value: function() {
        for (var s = 0, l = 0; l < this._geometries.length; l++) s += this._geometries[l].getArea();
        return s;
      } }, { key: "copyInternal", value: function() {
        for (var s = new Array(this._geometries.length).fill(null), l = 0; l < s.length; l++) s[l] = this._geometries[l].copy();
        return new r(s, this._factory);
      } }, { key: "equalsExact", value: function() {
        if (arguments.length === 2 && typeof arguments[1] == "number" && arguments[0] instanceof ae) {
          var s = arguments[0], l = arguments[1];
          if (!this.isEquivalentClass(s)) return !1;
          var d = s;
          if (this._geometries.length !== d._geometries.length) return !1;
          for (var y = 0; y < this._geometries.length; y++) if (!this._geometries[y].equalsExact(d._geometries[y], l)) return !1;
          return !0;
        }
        return w(r, "equalsExact", this, 1).apply(this, arguments);
      } }, { key: "normalize", value: function() {
        for (var s = 0; s < this._geometries.length; s++) this._geometries[s].normalize();
        wn.sort(this._geometries);
      } }, { key: "getCoordinate", value: function() {
        return this.isEmpty() ? null : this._geometries[0].getCoordinate();
      } }, { key: "getBoundaryDimension", value: function() {
        for (var s = oe.FALSE, l = 0; l < this._geometries.length; l++) s = Math.max(s, this._geometries[l].getBoundaryDimension());
        return s;
      } }, { key: "reverseInternal", value: function() {
        for (var s = this._geometries.length, l = new me(s), d = 0; d < s; d++) l.add(this._geometries[d].reverse());
        return this.getFactory().buildGeometry(l);
      } }, { key: "getTypeCode", value: function() {
        return ae.TYPECODE_GEOMETRYCOLLECTION;
      } }, { key: "getDimension", value: function() {
        for (var s = oe.FALSE, l = 0; l < this._geometries.length; l++) s = Math.max(s, this._geometries[l].getDimension());
        return s;
      } }, { key: "getLength", value: function() {
        for (var s = 0, l = 0; l < this._geometries.length; l++) s += this._geometries[l].getLength();
        return s;
      } }, { key: "getNumPoints", value: function() {
        for (var s = 0, l = 0; l < this._geometries.length; l++) s += this._geometries[l].getNumPoints();
        return s;
      } }, { key: "getNumGeometries", value: function() {
        return this._geometries.length;
      } }, { key: "compareToSameClass", value: function() {
        if (arguments.length === 1) {
          var s = arguments[0], l = new xa(wn.asList(this._geometries)), d = new xa(wn.asList(s._geometries));
          return this.compare(l, d);
        }
        if (arguments.length === 2) {
          for (var y = arguments[1], x = arguments[0], E = this.getNumGeometries(), L = x.getNumGeometries(), F = 0; F < E && F < L; ) {
            var $ = this.getGeometryN(F), K = x.getGeometryN(F), ne = $.compareToSameClass(K, y);
            if (ne !== 0) return ne;
            F++;
          }
          return F < E ? 1 : F < L ? -1 : 0;
        }
      } }, { key: "apply", value: function() {
        if (Ee(arguments[0], si)) for (var s = arguments[0], l = 0; l < this._geometries.length; l++) this._geometries[l].apply(s);
        else if (Ee(arguments[0], ai)) {
          var d = arguments[0];
          if (this._geometries.length === 0) return null;
          for (var y = 0; y < this._geometries.length && (this._geometries[y].apply(d), !d.isDone()); y++) ;
          d.isGeometryChanged() && this.geometryChanged();
        } else if (Ee(arguments[0], oi)) {
          var x = arguments[0];
          x.filter(this);
          for (var E = 0; E < this._geometries.length; E++) this._geometries[E].apply(x);
        } else if (Ee(arguments[0], U)) {
          var L = arguments[0];
          L.filter(this);
          for (var F = 0; F < this._geometries.length; F++) this._geometries[F].apply(L);
        }
      } }, { key: "getBoundary", value: function() {
        return ae.checkNotGeometryCollection(this), ee.shouldNeverReachHere(), null;
      } }, { key: "getGeometryType", value: function() {
        return ae.TYPENAME_GEOMETRYCOLLECTION;
      } }, { key: "isEmpty", value: function() {
        for (var s = 0; s < this._geometries.length; s++) if (!this._geometries[s].isEmpty()) return !1;
        return !0;
      } }], [{ key: "constructor_", value: function() {
        if (this._geometries = null, arguments.length !== 0) {
          if (arguments.length === 2) {
            var s = arguments[0], l = arguments[1];
            if (ae.constructor_.call(this, l), s === null && (s = []), ae.hasNullElements(s)) throw new R("geometries must not contain null elements");
            this._geometries = s;
          }
        }
      } }]);
    }(ae), ks = function(c) {
      function r() {
        var s;
        return o(this, r), s = i(this, r), r.constructor_.apply(s, arguments), s;
      }
      return v(r, c), h(r, [{ key: "copyInternal", value: function() {
        for (var s = new Array(this._geometries.length).fill(null), l = 0; l < s.length; l++) s[l] = this._geometries[l].copy();
        return new r(s, this._factory);
      } }, { key: "isValid", value: function() {
        return !0;
      } }, { key: "equalsExact", value: function() {
        if (arguments.length === 2 && typeof arguments[1] == "number" && arguments[0] instanceof ae) {
          var s = arguments[0], l = arguments[1];
          return !!this.isEquivalentClass(s) && w(r, "equalsExact", this, 1).call(this, s, l);
        }
        return w(r, "equalsExact", this, 1).apply(this, arguments);
      } }, { key: "getCoordinate", value: function() {
        if (arguments.length === 1 && Number.isInteger(arguments[0])) {
          var s = arguments[0];
          return this._geometries[s].getCoordinate();
        }
        return w(r, "getCoordinate", this, 1).apply(this, arguments);
      } }, { key: "getBoundaryDimension", value: function() {
        return oe.FALSE;
      } }, { key: "getTypeCode", value: function() {
        return ae.TYPECODE_MULTIPOINT;
      } }, { key: "getDimension", value: function() {
        return 0;
      } }, { key: "getBoundary", value: function() {
        return this.getFactory().createGeometryCollection();
      } }, { key: "getGeometryType", value: function() {
        return ae.TYPENAME_MULTIPOINT;
      } }, { key: "interfaces_", get: function() {
        return [pa];
      } }], [{ key: "constructor_", value: function() {
        var s = arguments[0], l = arguments[1];
        Et.constructor_.call(this, s, l);
      } }]);
    }(Et), hr = function(c) {
      function r() {
        var s;
        return o(this, r), s = i(this, r), r.constructor_.apply(s, arguments), s;
      }
      return v(r, c), h(r, [{ key: "copyInternal", value: function() {
        return new r(this._points.copy(), this._factory);
      } }, { key: "getBoundaryDimension", value: function() {
        return oe.FALSE;
      } }, { key: "isClosed", value: function() {
        return !!this.isEmpty() || w(r, "isClosed", this, 1).call(this);
      } }, { key: "reverseInternal", value: function() {
        var s = this._points.copy();
        return _n.reverse(s), this.getFactory().createLinearRing(s);
      } }, { key: "getTypeCode", value: function() {
        return ae.TYPECODE_LINEARRING;
      } }, { key: "validateConstruction", value: function() {
        if (!this.isEmpty() && !w(r, "isClosed", this, 1).call(this)) throw new R("Points of LinearRing do not form a closed linestring");
        if (this.getCoordinateSequence().size() >= 1 && this.getCoordinateSequence().size() < r.MINIMUM_VALID_SIZE) throw new R("Invalid number of points in LinearRing (found " + this.getCoordinateSequence().size() + " - must be 0 or >= 4)");
      } }, { key: "getGeometryType", value: function() {
        return ae.TYPENAME_LINEARRING;
      } }], [{ key: "constructor_", value: function() {
        var s = arguments[0], l = arguments[1];
        cr.constructor_.call(this, s, l), this.validateConstruction();
      } }]);
    }(cr);
    hr.MINIMUM_VALID_SIZE = 4;
    var xn = function(c) {
      function r() {
        var s;
        return o(this, r), s = i(this, r), r.constructor_.apply(s, arguments), s;
      }
      return v(r, c), h(r, [{ key: "setOrdinate", value: function(s, l) {
        switch (s) {
          case r.X:
            this.x = l;
            break;
          case r.Y:
            this.y = l;
            break;
          default:
            throw new R("Invalid ordinate index: " + s);
        }
      } }, { key: "getZ", value: function() {
        return Z.NULL_ORDINATE;
      } }, { key: "getOrdinate", value: function(s) {
        switch (s) {
          case r.X:
            return this.x;
          case r.Y:
            return this.y;
        }
        throw new R("Invalid ordinate index: " + s);
      } }, { key: "setZ", value: function(s) {
        throw new R("CoordinateXY dimension 2 does not support z-ordinate");
      } }, { key: "copy", value: function() {
        return new r(this);
      } }, { key: "toString", value: function() {
        return "(" + this.x + ", " + this.y + ")";
      } }, { key: "setCoordinate", value: function(s) {
        this.x = s.x, this.y = s.y, this.z = s.getZ();
      } }], [{ key: "constructor_", value: function() {
        if (arguments.length === 0) Z.constructor_.call(this);
        else if (arguments.length === 1) {
          if (arguments[0] instanceof r) {
            var s = arguments[0];
            Z.constructor_.call(this, s.x, s.y);
          } else if (arguments[0] instanceof Z) {
            var l = arguments[0];
            Z.constructor_.call(this, l.x, l.y);
          }
        } else if (arguments.length === 2) {
          var d = arguments[0], y = arguments[1];
          Z.constructor_.call(this, d, y, Z.NULL_ORDINATE);
        }
      } }]);
    }(Z);
    xn.X = 0, xn.Y = 1, xn.Z = -1, xn.M = -1;
    var En = function(c) {
      function r() {
        var s;
        return o(this, r), s = i(this, r), r.constructor_.apply(s, arguments), s;
      }
      return v(r, c), h(r, [{ key: "getM", value: function() {
        return this._m;
      } }, { key: "setOrdinate", value: function(s, l) {
        switch (s) {
          case r.X:
            this.x = l;
            break;
          case r.Y:
            this.y = l;
            break;
          case r.M:
            this._m = l;
            break;
          default:
            throw new R("Invalid ordinate index: " + s);
        }
      } }, { key: "setM", value: function(s) {
        this._m = s;
      } }, { key: "getZ", value: function() {
        return Z.NULL_ORDINATE;
      } }, { key: "getOrdinate", value: function(s) {
        switch (s) {
          case r.X:
            return this.x;
          case r.Y:
            return this.y;
          case r.M:
            return this._m;
        }
        throw new R("Invalid ordinate index: " + s);
      } }, { key: "setZ", value: function(s) {
        throw new R("CoordinateXY dimension 2 does not support z-ordinate");
      } }, { key: "copy", value: function() {
        return new r(this);
      } }, { key: "toString", value: function() {
        return "(" + this.x + ", " + this.y + " m=" + this.getM() + ")";
      } }, { key: "setCoordinate", value: function(s) {
        this.x = s.x, this.y = s.y, this.z = s.getZ(), this._m = s.getM();
      } }], [{ key: "constructor_", value: function() {
        if (this._m = null, arguments.length === 0) Z.constructor_.call(this), this._m = 0;
        else if (arguments.length === 1) {
          if (arguments[0] instanceof r) {
            var s = arguments[0];
            Z.constructor_.call(this, s.x, s.y), this._m = s._m;
          } else if (arguments[0] instanceof Z) {
            var l = arguments[0];
            Z.constructor_.call(this, l.x, l.y), this._m = this.getM();
          }
        } else if (arguments.length === 3) {
          var d = arguments[0], y = arguments[1], x = arguments[2];
          Z.constructor_.call(this, d, y, Z.NULL_ORDINATE), this._m = x;
        }
      } }]);
    }(Z);
    En.X = 0, En.Y = 1, En.Z = -1, En.M = 2;
    var Cs = function(c) {
      function r() {
        var s;
        return o(this, r), s = i(this, r), r.constructor_.apply(s, arguments), s;
      }
      return v(r, c), h(r, [{ key: "getM", value: function() {
        return this._m;
      } }, { key: "setOrdinate", value: function(s, l) {
        switch (s) {
          case Z.X:
            this.x = l;
            break;
          case Z.Y:
            this.y = l;
            break;
          case Z.Z:
            this.z = l;
            break;
          case Z.M:
            this._m = l;
            break;
          default:
            throw new R("Invalid ordinate index: " + s);
        }
      } }, { key: "setM", value: function(s) {
        this._m = s;
      } }, { key: "getOrdinate", value: function(s) {
        switch (s) {
          case Z.X:
            return this.x;
          case Z.Y:
            return this.y;
          case Z.Z:
            return this.getZ();
          case Z.M:
            return this.getM();
        }
        throw new R("Invalid ordinate index: " + s);
      } }, { key: "copy", value: function() {
        return new r(this);
      } }, { key: "toString", value: function() {
        return "(" + this.x + ", " + this.y + ", " + this.getZ() + " m=" + this.getM() + ")";
      } }, { key: "setCoordinate", value: function(s) {
        this.x = s.x, this.y = s.y, this.z = s.getZ(), this._m = s.getM();
      } }], [{ key: "constructor_", value: function() {
        if (this._m = null, arguments.length === 0) Z.constructor_.call(this), this._m = 0;
        else if (arguments.length === 1) {
          if (arguments[0] instanceof r) {
            var s = arguments[0];
            Z.constructor_.call(this, s), this._m = s._m;
          } else if (arguments[0] instanceof Z) {
            var l = arguments[0];
            Z.constructor_.call(this, l), this._m = this.getM();
          }
        } else if (arguments.length === 4) {
          var d = arguments[0], y = arguments[1], x = arguments[2], E = arguments[3];
          Z.constructor_.call(this, d, y, x), this._m = E;
        }
      } }]);
    }(Z), li = function() {
      function c() {
        o(this, c);
      }
      return h(c, null, [{ key: "measures", value: function(r) {
        return r instanceof xn ? 0 : r instanceof En || r instanceof Cs ? 1 : 0;
      } }, { key: "dimension", value: function(r) {
        return r instanceof xn ? 2 : r instanceof En ? 3 : r instanceof Cs ? 4 : 3;
      } }, { key: "create", value: function() {
        if (arguments.length === 1) {
          var r = arguments[0];
          return c.create(r, 0);
        }
        if (arguments.length === 2) {
          var s = arguments[0], l = arguments[1];
          return s === 2 ? new xn() : s === 3 && l === 0 ? new Z() : s === 3 && l === 1 ? new En() : s === 4 && l === 1 ? new Cs() : new Z();
        }
      } }]);
    }(), fr = function(c) {
      function r() {
        var s;
        return o(this, r), s = i(this, r), r.constructor_.apply(s, arguments), s;
      }
      return v(r, c), h(r, [{ key: "getCoordinate", value: function(s) {
        return this.get(s);
      } }, { key: "addAll", value: function() {
        if (arguments.length === 2 && typeof arguments[1] == "boolean" && Ee(arguments[0], Me)) {
          for (var s = arguments[1], l = !1, d = arguments[0].iterator(); d.hasNext(); ) this.add(d.next(), s), l = !0;
          return l;
        }
        return w(r, "addAll", this, 1).apply(this, arguments);
      } }, { key: "clone", value: function() {
        for (var s = w(r, "clone", this, 1).call(this), l = 0; l < this.size(); l++) s.add(l, this.get(l).clone());
        return s;
      } }, { key: "toCoordinateArray", value: function() {
        if (arguments.length === 0) return this.toArray(r.coordArrayType);
        if (arguments.length === 1) {
          if (arguments[0]) return this.toArray(r.coordArrayType);
          for (var s = this.size(), l = new Array(s).fill(null), d = 0; d < s; d++) l[d] = this.get(s - d - 1);
          return l;
        }
      } }, { key: "add", value: function() {
        if (arguments.length === 1) {
          var s = arguments[0];
          return w(r, "add", this, 1).call(this, s);
        }
        if (arguments.length === 2) {
          if (arguments[0] instanceof Array && typeof arguments[1] == "boolean") {
            var l = arguments[0], d = arguments[1];
            return this.add(l, d, !0), !0;
          }
          if (arguments[0] instanceof Z && typeof arguments[1] == "boolean") {
            var y = arguments[0];
            if (!arguments[1] && this.size() >= 1 && this.get(this.size() - 1).equals2D(y)) return null;
            w(r, "add", this, 1).call(this, y);
          } else if (arguments[0] instanceof Object && typeof arguments[1] == "boolean") {
            var x = arguments[0], E = arguments[1];
            return this.add(x, E), !0;
          }
        } else if (arguments.length === 3) {
          if (typeof arguments[2] == "boolean" && arguments[0] instanceof Array && typeof arguments[1] == "boolean") {
            var L = arguments[0], F = arguments[1];
            if (arguments[2]) for (var $ = 0; $ < L.length; $++) this.add(L[$], F);
            else for (var K = L.length - 1; K >= 0; K--) this.add(L[K], F);
            return !0;
          }
          if (typeof arguments[2] == "boolean" && Number.isInteger(arguments[0]) && arguments[1] instanceof Z) {
            var ne = arguments[0], ue = arguments[1];
            if (!arguments[2]) {
              var he = this.size();
              if (he > 0 && (ne > 0 && this.get(ne - 1).equals2D(ue) || ne < he && this.get(ne).equals2D(ue)))
                return null;
            }
            w(r, "add", this, 1).call(this, ne, ue);
          }
        } else if (arguments.length === 4) {
          var ge = arguments[0], Oe = arguments[1], Le = arguments[2], Ye = arguments[3], st = 1;
          Le > Ye && (st = -1);
          for (var ut = Le; ut !== Ye; ut += st) this.add(ge[ut], Oe);
          return !0;
        }
      } }, { key: "closeRing", value: function() {
        if (this.size() > 0) {
          var s = this.get(0).copy();
          this.add(s, !1);
        }
      } }], [{ key: "constructor_", value: function() {
        if (arguments.length !== 0) {
          if (arguments.length === 1) {
            var s = arguments[0];
            this.ensureCapacity(s.length), this.add(s, !0);
          } else if (arguments.length === 2) {
            var l = arguments[0], d = arguments[1];
            this.ensureCapacity(l.length), this.add(l, d);
          }
        }
      } }]);
    }(me);
    fr.coordArrayType = new Array(0).fill(null);
    var tt = function() {
      function c() {
        o(this, c);
      }
      return h(c, null, [{ key: "isRing", value: function(r) {
        return !(r.length < 4) && !!r[0].equals2D(r[r.length - 1]);
      } }, { key: "ptNotInList", value: function(r, s) {
        for (var l = 0; l < r.length; l++) {
          var d = r[l];
          if (c.indexOf(d, s) < 0) return d;
        }
        return null;
      } }, { key: "scroll", value: function(r, s) {
        var l = c.indexOf(s, r);
        if (l < 0) return null;
        var d = new Array(r.length).fill(null);
        Mt.arraycopy(r, l, d, 0, r.length - l), Mt.arraycopy(r, 0, d, r.length - l, l), Mt.arraycopy(d, 0, r, 0, r.length);
      } }, { key: "equals", value: function() {
        if (arguments.length === 2) {
          var r = arguments[0], s = arguments[1];
          if (r === s) return !0;
          if (r === null || s === null || r.length !== s.length) return !1;
          for (var l = 0; l < r.length; l++) if (!r[l].equals(s[l])) return !1;
          return !0;
        }
        if (arguments.length === 3) {
          var d = arguments[0], y = arguments[1], x = arguments[2];
          if (d === y) return !0;
          if (d === null || y === null || d.length !== y.length) return !1;
          for (var E = 0; E < d.length; E++) if (x.compare(d[E], y[E]) !== 0) return !1;
          return !0;
        }
      } }, { key: "intersection", value: function(r, s) {
        for (var l = new fr(), d = 0; d < r.length; d++) s.intersects(r[d]) && l.add(r[d], !0);
        return l.toCoordinateArray();
      } }, { key: "measures", value: function(r) {
        if (r === null || r.length === 0) return 0;
        var s, l = 0, d = f(r);
        try {
          for (d.s(); !(s = d.n()).done; ) {
            var y = s.value;
            l = Math.max(l, li.measures(y));
          }
        } catch (x) {
          d.e(x);
        } finally {
          d.f();
        }
        return l;
      } }, { key: "hasRepeatedPoints", value: function(r) {
        for (var s = 1; s < r.length; s++) if (r[s - 1].equals(r[s])) return !0;
        return !1;
      } }, { key: "removeRepeatedPoints", value: function(r) {
        return c.hasRepeatedPoints(r) ? new fr(r, !1).toCoordinateArray() : r;
      } }, { key: "reverse", value: function(r) {
        for (var s = r.length - 1, l = Math.trunc(s / 2), d = 0; d <= l; d++) {
          var y = r[d];
          r[d] = r[s - d], r[s - d] = y;
        }
      } }, { key: "removeNull", value: function(r) {
        for (var s = 0, l = 0; l < r.length; l++) r[l] !== null && s++;
        var d = new Array(s).fill(null);
        if (s === 0) return d;
        for (var y = 0, x = 0; x < r.length; x++) r[x] !== null && (d[y++] = r[x]);
        return d;
      } }, { key: "copyDeep", value: function() {
        if (arguments.length === 1) {
          for (var r = arguments[0], s = new Array(r.length).fill(null), l = 0; l < r.length; l++) s[l] = r[l].copy();
          return s;
        }
        if (arguments.length === 5) for (var d = arguments[0], y = arguments[1], x = arguments[2], E = arguments[3], L = arguments[4], F = 0; F < L; F++) x[E + F] = d[y + F].copy();
      } }, { key: "isEqualReversed", value: function(r, s) {
        for (var l = 0; l < r.length; l++) {
          var d = r[l], y = s[r.length - l - 1];
          if (d.compareTo(y) !== 0) return !1;
        }
        return !0;
      } }, { key: "envelope", value: function(r) {
        for (var s = new _e(), l = 0; l < r.length; l++) s.expandToInclude(r[l]);
        return s;
      } }, { key: "toCoordinateArray", value: function(r) {
        return r.toArray(c.coordArrayType);
      } }, { key: "dimension", value: function(r) {
        if (r === null || r.length === 0) return 3;
        var s, l = 0, d = f(r);
        try {
          for (d.s(); !(s = d.n()).done; ) {
            var y = s.value;
            l = Math.max(l, li.dimension(y));
          }
        } catch (x) {
          d.e(x);
        } finally {
          d.f();
        }
        return l;
      } }, { key: "atLeastNCoordinatesOrNothing", value: function(r, s) {
        return s.length >= r ? s : [];
      } }, { key: "indexOf", value: function(r, s) {
        for (var l = 0; l < s.length; l++) if (r.equals(s[l])) return l;
        return -1;
      } }, { key: "increasingDirection", value: function(r) {
        for (var s = 0; s < Math.trunc(r.length / 2); s++) {
          var l = r.length - 1 - s, d = r[s].compareTo(r[l]);
          if (d !== 0) return d;
        }
        return 1;
      } }, { key: "compare", value: function(r, s) {
        for (var l = 0; l < r.length && l < s.length; ) {
          var d = r[l].compareTo(s[l]);
          if (d !== 0) return d;
          l++;
        }
        return l < s.length ? -1 : l < r.length ? 1 : 0;
      } }, { key: "minCoordinate", value: function(r) {
        for (var s = null, l = 0; l < r.length; l++) (s === null || s.compareTo(r[l]) > 0) && (s = r[l]);
        return s;
      } }, { key: "extract", value: function(r, s, l) {
        s = lr.clamp(s, 0, r.length);
        var d = (l = lr.clamp(l, -1, r.length)) - s + 1;
        l < 0 && (d = 0), s >= r.length && (d = 0), l < s && (d = 0);
        var y = new Array(d).fill(null);
        if (d === 0) return y;
        for (var x = 0, E = s; E <= l; E++) y[x++] = r[E];
        return y;
      } }]);
    }(), vf = function() {
      return h(function c() {
        o(this, c);
      }, [{ key: "compare", value: function(c, r) {
        var s = c, l = r;
        return tt.compare(s, l);
      } }, { key: "interfaces_", get: function() {
        return [j];
      } }]);
    }(), mf = function() {
      return h(function c() {
        o(this, c);
      }, [{ key: "compare", value: function(c, r) {
        var s = c, l = r;
        if (s.length < l.length) return -1;
        if (s.length > l.length) return 1;
        if (s.length === 0) return 0;
        var d = tt.compare(s, l);
        return tt.isEqualReversed(s, l) ? 0 : d;
      } }, { key: "OLDcompare", value: function(c, r) {
        var s = c, l = r;
        if (s.length < l.length) return -1;
        if (s.length > l.length) return 1;
        if (s.length === 0) return 0;
        for (var d = tt.increasingDirection(s), y = tt.increasingDirection(l), x = d > 0 ? 0 : s.length - 1, E = y > 0 ? 0 : s.length - 1, L = 0; L < s.length; L++) {
          var F = s[x].compareTo(l[E]);
          if (F !== 0) return F;
          x += d, E += y;
        }
        return 0;
      } }, { key: "interfaces_", get: function() {
        return [j];
      } }]);
    }();
    tt.ForwardComparator = vf, tt.BidirectionalComparator = mf, tt.coordArrayType = new Array(0).fill(null);
    var ci = function() {
      return h(function c(r) {
        o(this, c), this.str = r;
      }, [{ key: "append", value: function(c) {
        this.str += c;
      } }, { key: "setCharAt", value: function(c, r) {
        this.str = this.str.substr(0, c) + r + this.str.substr(c + 1);
      } }, { key: "toString", value: function() {
        return this.str;
      } }]);
    }(), gr = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "getM", value: function(r) {
        return this.hasM() ? this._coordinates[r].getM() : W.NaN;
      } }, { key: "setOrdinate", value: function(r, s, l) {
        switch (s) {
          case Te.X:
            this._coordinates[r].x = l;
            break;
          case Te.Y:
            this._coordinates[r].y = l;
            break;
          default:
            this._coordinates[r].setOrdinate(s, l);
        }
      } }, { key: "getZ", value: function(r) {
        return this.hasZ() ? this._coordinates[r].getZ() : W.NaN;
      } }, { key: "size", value: function() {
        return this._coordinates.length;
      } }, { key: "getOrdinate", value: function(r, s) {
        switch (s) {
          case Te.X:
            return this._coordinates[r].x;
          case Te.Y:
            return this._coordinates[r].y;
          default:
            return this._coordinates[r].getOrdinate(s);
        }
      } }, { key: "getCoordinate", value: function() {
        if (arguments.length === 1) {
          var r = arguments[0];
          return this._coordinates[r];
        }
        if (arguments.length === 2) {
          var s = arguments[0];
          arguments[1].setCoordinate(this._coordinates[s]);
        }
      } }, { key: "getCoordinateCopy", value: function(r) {
        var s = this.createCoordinate();
        return s.setCoordinate(this._coordinates[r]), s;
      } }, { key: "createCoordinate", value: function() {
        return li.create(this.getDimension(), this.getMeasures());
      } }, { key: "getDimension", value: function() {
        return this._dimension;
      } }, { key: "getX", value: function(r) {
        return this._coordinates[r].x;
      } }, { key: "getMeasures", value: function() {
        return this._measures;
      } }, { key: "expandEnvelope", value: function(r) {
        for (var s = 0; s < this._coordinates.length; s++) r.expandToInclude(this._coordinates[s]);
        return r;
      } }, { key: "copy", value: function() {
        for (var r = new Array(this.size()).fill(null), s = 0; s < this._coordinates.length; s++) {
          var l = this.createCoordinate();
          l.setCoordinate(this._coordinates[s]), r[s] = l;
        }
        return new c(r, this._dimension, this._measures);
      } }, { key: "toString", value: function() {
        if (this._coordinates.length > 0) {
          var r = new ci(17 * this._coordinates.length);
          r.append("("), r.append(this._coordinates[0]);
          for (var s = 1; s < this._coordinates.length; s++) r.append(", "), r.append(this._coordinates[s]);
          return r.append(")"), r.toString();
        }
        return "()";
      } }, { key: "getY", value: function(r) {
        return this._coordinates[r].y;
      } }, { key: "toCoordinateArray", value: function() {
        return this._coordinates;
      } }, { key: "interfaces_", get: function() {
        return [Te, M];
      } }], [{ key: "constructor_", value: function() {
        if (this._dimension = 3, this._measures = 0, this._coordinates = null, arguments.length === 1) {
          if (arguments[0] instanceof Array) {
            var r = arguments[0];
            c.constructor_.call(this, r, tt.dimension(r), tt.measures(r));
          } else if (Number.isInteger(arguments[0])) {
            var s = arguments[0];
            this._coordinates = new Array(s).fill(null);
            for (var l = 0; l < s; l++) this._coordinates[l] = new Z();
          } else if (Ee(arguments[0], Te)) {
            var d = arguments[0];
            if (d === null) return this._coordinates = new Array(0).fill(null), null;
            this._dimension = d.getDimension(), this._measures = d.getMeasures(), this._coordinates = new Array(d.size()).fill(null);
            for (var y = 0; y < this._coordinates.length; y++) this._coordinates[y] = d.getCoordinateCopy(y);
          }
        } else if (arguments.length === 2) {
          if (arguments[0] instanceof Array && Number.isInteger(arguments[1])) {
            var x = arguments[0], E = arguments[1];
            c.constructor_.call(this, x, E, tt.measures(x));
          } else if (Number.isInteger(arguments[0]) && Number.isInteger(arguments[1])) {
            var L = arguments[0], F = arguments[1];
            this._coordinates = new Array(L).fill(null), this._dimension = F;
            for (var $ = 0; $ < L; $++) this._coordinates[$] = li.create(F);
          }
        } else if (arguments.length === 3) {
          if (Number.isInteger(arguments[2]) && arguments[0] instanceof Array && Number.isInteger(arguments[1])) {
            var K = arguments[0], ne = arguments[1], ue = arguments[2];
            this._dimension = ne, this._measures = ue, this._coordinates = K === null ? new Array(0).fill(null) : K;
          } else if (Number.isInteger(arguments[2]) && Number.isInteger(arguments[0]) && Number.isInteger(arguments[1])) {
            var he = arguments[0], ge = arguments[1], Oe = arguments[2];
            this._coordinates = new Array(he).fill(null), this._dimension = ge, this._measures = Oe;
            for (var Le = 0; Le < he; Le++) this._coordinates[Le] = this.createCoordinate();
          }
        }
      } }]);
    }(), Is = function() {
      function c() {
        o(this, c);
      }
      return h(c, [{ key: "readResolve", value: function() {
        return c.instance();
      } }, { key: "create", value: function() {
        if (arguments.length === 1) {
          if (arguments[0] instanceof Array) return new gr(arguments[0]);
          if (Ee(arguments[0], Te)) return new gr(arguments[0]);
        } else {
          if (arguments.length === 2) {
            var r = arguments[1];
            return r > 3 && (r = 3), r < 2 && (r = 2), new gr(arguments[0], r);
          }
          if (arguments.length === 3) {
            var s = arguments[2], l = arguments[1] - s;
            return s > 1 && (s = 1), l > 3 && (l = 3), l < 2 && (l = 2), new gr(arguments[0], l + s, s);
          }
        }
      } }, { key: "interfaces_", get: function() {
        return [ma, M];
      } }], [{ key: "instance", value: function() {
        return c.instanceObject;
      } }]);
    }();
    Is.instanceObject = new Is();
    var Ss = function(c) {
      function r() {
        var s;
        return o(this, r), s = i(this, r), r.constructor_.apply(s, arguments), s;
      }
      return v(r, c), h(r, [{ key: "copyInternal", value: function() {
        for (var s = new Array(this._geometries.length).fill(null), l = 0; l < s.length; l++) s[l] = this._geometries[l].copy();
        return new r(s, this._factory);
      } }, { key: "equalsExact", value: function() {
        if (arguments.length === 2 && typeof arguments[1] == "number" && arguments[0] instanceof ae) {
          var s = arguments[0], l = arguments[1];
          return !!this.isEquivalentClass(s) && w(r, "equalsExact", this, 1).call(this, s, l);
        }
        return w(r, "equalsExact", this, 1).apply(this, arguments);
      } }, { key: "getBoundaryDimension", value: function() {
        return 1;
      } }, { key: "getTypeCode", value: function() {
        return ae.TYPECODE_MULTIPOLYGON;
      } }, { key: "getDimension", value: function() {
        return 2;
      } }, { key: "getBoundary", value: function() {
        if (this.isEmpty()) return this.getFactory().createMultiLineString();
        for (var s = new me(), l = 0; l < this._geometries.length; l++) for (var d = this._geometries[l].getBoundary(), y = 0; y < d.getNumGeometries(); y++) s.add(d.getGeometryN(y));
        var x = new Array(s.size()).fill(null);
        return this.getFactory().createMultiLineString(s.toArray(x));
      } }, { key: "getGeometryType", value: function() {
        return ae.TYPENAME_MULTIPOLYGON;
      } }, { key: "interfaces_", get: function() {
        return [wa];
      } }], [{ key: "constructor_", value: function() {
        var s = arguments[0], l = arguments[1];
        Et.constructor_.call(this, s, l);
      } }]);
    }(Et), Ea = function() {
      return h(function c() {
        o(this, c);
      }, [{ key: "get", value: function() {
      } }, { key: "put", value: function() {
      } }, { key: "size", value: function() {
      } }, { key: "values", value: function() {
      } }, { key: "entrySet", value: function() {
      } }]);
    }(), yf = function(c) {
      function r() {
        var s;
        return o(this, r), (s = i(this, r)).map = /* @__PURE__ */ new Map(), s;
      }
      return v(r, c), h(r, [{ key: "get", value: function(s) {
        return this.map.get(s) || null;
      } }, { key: "put", value: function(s, l) {
        return this.map.set(s, l), l;
      } }, { key: "values", value: function() {
        for (var s = new me(), l = this.map.values(), d = l.next(); !d.done; ) s.add(d.value), d = l.next();
        return s;
      } }, { key: "entrySet", value: function() {
        var s = new gt();
        return this.map.entries().forEach(function(l) {
          return s.add(l);
        }), s;
      } }, { key: "size", value: function() {
        return this.map.size();
      } }]);
    }(Ea), Bt = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "equals", value: function(r) {
        if (!(r instanceof c)) return !1;
        var s = r;
        return this._modelType === s._modelType && this._scale === s._scale;
      } }, { key: "compareTo", value: function(r) {
        var s = r, l = this.getMaximumSignificantDigits(), d = s.getMaximumSignificantDigits();
        return gn.compare(l, d);
      } }, { key: "getScale", value: function() {
        return this._scale;
      } }, { key: "isFloating", value: function() {
        return this._modelType === c.FLOATING || this._modelType === c.FLOATING_SINGLE;
      } }, { key: "getType", value: function() {
        return this._modelType;
      } }, { key: "toString", value: function() {
        var r = "UNKNOWN";
        return this._modelType === c.FLOATING ? r = "Floating" : this._modelType === c.FLOATING_SINGLE ? r = "Floating-Single" : this._modelType === c.FIXED && (r = "Fixed (Scale=" + this.getScale() + ")"), r;
      } }, { key: "makePrecise", value: function() {
        if (typeof arguments[0] == "number") {
          var r = arguments[0];
          return W.isNaN(r) || this._modelType === c.FLOATING_SINGLE ? r : this._modelType === c.FIXED ? Math.round(r * this._scale) / this._scale : r;
        }
        if (arguments[0] instanceof Z) {
          var s = arguments[0];
          if (this._modelType === c.FLOATING) return null;
          s.x = this.makePrecise(s.x), s.y = this.makePrecise(s.y);
        }
      } }, { key: "getMaximumSignificantDigits", value: function() {
        var r = 16;
        return this._modelType === c.FLOATING ? r = 16 : this._modelType === c.FLOATING_SINGLE ? r = 6 : this._modelType === c.FIXED && (r = 1 + Math.trunc(Math.ceil(Math.log(this.getScale()) / Math.log(10)))), r;
      } }, { key: "setScale", value: function(r) {
        this._scale = Math.abs(r);
      } }, { key: "interfaces_", get: function() {
        return [M, V];
      } }], [{ key: "constructor_", value: function() {
        if (this._modelType = null, this._scale = null, arguments.length === 0) this._modelType = c.FLOATING;
        else if (arguments.length === 1) {
          if (arguments[0] instanceof On) {
            var r = arguments[0];
            this._modelType = r, r === c.FIXED && this.setScale(1);
          } else if (typeof arguments[0] == "number") {
            var s = arguments[0];
            this._modelType = c.FIXED, this.setScale(s);
          } else if (arguments[0] instanceof c) {
            var l = arguments[0];
            this._modelType = l._modelType, this._scale = l._scale;
          }
        }
      } }, { key: "mostPrecise", value: function(r, s) {
        return r.compareTo(s) >= 0 ? r : s;
      } }]);
    }(), On = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "readResolve", value: function() {
        return c.nameToTypeMap.get(this._name);
      } }, { key: "toString", value: function() {
        return this._name;
      } }, { key: "interfaces_", get: function() {
        return [M];
      } }], [{ key: "constructor_", value: function() {
        this._name = null;
        var r = arguments[0];
        this._name = r, c.nameToTypeMap.put(r, this);
      } }]);
    }();
    On.nameToTypeMap = new yf(), Bt.Type = On, Bt.FIXED = new On("FIXED"), Bt.FLOATING = new On("FLOATING"), Bt.FLOATING_SINGLE = new On("FLOATING SINGLE"), Bt.maximumPreciseValue = 9007199254740992;
    var Ms = function(c) {
      function r() {
        var s;
        return o(this, r), s = i(this, r), r.constructor_.apply(s, arguments), s;
      }
      return v(r, c), h(r, [{ key: "copyInternal", value: function() {
        for (var s = new Array(this._geometries.length).fill(null), l = 0; l < s.length; l++) s[l] = this._geometries[l].copy();
        return new r(s, this._factory);
      } }, { key: "equalsExact", value: function() {
        if (arguments.length === 2 && typeof arguments[1] == "number" && arguments[0] instanceof ae) {
          var s = arguments[0], l = arguments[1];
          return !!this.isEquivalentClass(s) && w(r, "equalsExact", this, 1).call(this, s, l);
        }
        return w(r, "equalsExact", this, 1).apply(this, arguments);
      } }, { key: "getBoundaryDimension", value: function() {
        return this.isClosed() ? oe.FALSE : 0;
      } }, { key: "isClosed", value: function() {
        if (this.isEmpty()) return !1;
        for (var s = 0; s < this._geometries.length; s++) if (!this._geometries[s].isClosed()) return !1;
        return !0;
      } }, { key: "getTypeCode", value: function() {
        return ae.TYPECODE_MULTILINESTRING;
      } }, { key: "getDimension", value: function() {
        return 1;
      } }, { key: "getBoundary", value: function() {
        throw new ke();
      } }, { key: "getGeometryType", value: function() {
        return ae.TYPENAME_MULTILINESTRING;
      } }, { key: "interfaces_", get: function() {
        return [ya];
      } }], [{ key: "constructor_", value: function() {
        var s = arguments[0], l = arguments[1];
        Et.constructor_.call(this, s, l);
      } }]);
    }(Et), An = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "createEmpty", value: function(r) {
        switch (r) {
          case -1:
            return this.createGeometryCollection();
          case 0:
            return this.createPoint();
          case 1:
            return this.createLineString();
          case 2:
            return this.createPolygon();
          default:
            throw new R("Invalid dimension: " + r);
        }
      } }, { key: "toGeometry", value: function(r) {
        return r.isNull() ? this.createPoint() : r.getMinX() === r.getMaxX() && r.getMinY() === r.getMaxY() ? this.createPoint(new Z(r.getMinX(), r.getMinY())) : r.getMinX() === r.getMaxX() || r.getMinY() === r.getMaxY() ? this.createLineString([new Z(r.getMinX(), r.getMinY()), new Z(r.getMaxX(), r.getMaxY())]) : this.createPolygon(this.createLinearRing([new Z(r.getMinX(), r.getMinY()), new Z(r.getMinX(), r.getMaxY()), new Z(r.getMaxX(), r.getMaxY()), new Z(r.getMaxX(), r.getMinY()), new Z(r.getMinX(), r.getMinY())]), null);
      } }, { key: "createLineString", value: function() {
        if (arguments.length === 0) return this.createLineString(this.getCoordinateSequenceFactory().create([]));
        if (arguments.length === 1) {
          if (arguments[0] instanceof Array) {
            var r = arguments[0];
            return this.createLineString(r !== null ? this.getCoordinateSequenceFactory().create(r) : null);
          }
          if (Ee(arguments[0], Te)) return new cr(arguments[0], this);
        }
      } }, { key: "createMultiLineString", value: function() {
        return arguments.length === 0 ? new Ms(null, this) : arguments.length === 1 ? new Ms(arguments[0], this) : void 0;
      } }, { key: "buildGeometry", value: function(r) {
        for (var s = null, l = !1, d = !1, y = r.iterator(); y.hasNext(); ) {
          var x = y.next(), E = x.getTypeCode();
          s === null && (s = E), E !== s && (l = !0), x instanceof Et && (d = !0);
        }
        if (s === null) return this.createGeometryCollection();
        if (l || d) return this.createGeometryCollection(c.toGeometryArray(r));
        var L = r.iterator().next();
        if (r.size() > 1) {
          if (L instanceof ui) return this.createMultiPolygon(c.toPolygonArray(r));
          if (L instanceof cr) return this.createMultiLineString(c.toLineStringArray(r));
          if (L instanceof Es) return this.createMultiPoint(c.toPointArray(r));
          ee.shouldNeverReachHere("Unhandled geometry type: " + L.getGeometryType());
        }
        return L;
      } }, { key: "createMultiPointFromCoords", value: function(r) {
        return this.createMultiPoint(r !== null ? this.getCoordinateSequenceFactory().create(r) : null);
      } }, { key: "createPoint", value: function() {
        if (arguments.length === 0) return this.createPoint(this.getCoordinateSequenceFactory().create([]));
        if (arguments.length === 1) {
          if (arguments[0] instanceof Z) {
            var r = arguments[0];
            return this.createPoint(r !== null ? this.getCoordinateSequenceFactory().create([r]) : null);
          }
          if (Ee(arguments[0], Te)) return new Es(arguments[0], this);
        }
      } }, { key: "getCoordinateSequenceFactory", value: function() {
        return this._coordinateSequenceFactory;
      } }, { key: "createPolygon", value: function() {
        if (arguments.length === 0) return this.createPolygon(null, null);
        if (arguments.length === 1) {
          if (Ee(arguments[0], Te)) {
            var r = arguments[0];
            return this.createPolygon(this.createLinearRing(r));
          }
          if (arguments[0] instanceof Array) {
            var s = arguments[0];
            return this.createPolygon(this.createLinearRing(s));
          }
          if (arguments[0] instanceof hr) {
            var l = arguments[0];
            return this.createPolygon(l, null);
          }
        } else if (arguments.length === 2)
          return new ui(arguments[0], arguments[1], this);
      } }, { key: "getSRID", value: function() {
        return this._SRID;
      } }, { key: "createGeometryCollection", value: function() {
        return arguments.length === 0 ? new Et(null, this) : arguments.length === 1 ? new Et(arguments[0], this) : void 0;
      } }, { key: "getPrecisionModel", value: function() {
        return this._precisionModel;
      } }, { key: "createLinearRing", value: function() {
        if (arguments.length === 0) return this.createLinearRing(this.getCoordinateSequenceFactory().create([]));
        if (arguments.length === 1) {
          if (arguments[0] instanceof Array) {
            var r = arguments[0];
            return this.createLinearRing(r !== null ? this.getCoordinateSequenceFactory().create(r) : null);
          }
          if (Ee(arguments[0], Te)) return new hr(arguments[0], this);
        }
      } }, { key: "createMultiPolygon", value: function() {
        return arguments.length === 0 ? new Ss(null, this) : arguments.length === 1 ? new Ss(arguments[0], this) : void 0;
      } }, { key: "createMultiPoint", value: function() {
        if (arguments.length === 0) return new ks(null, this);
        if (arguments.length === 1) {
          if (arguments[0] instanceof Array) return new ks(arguments[0], this);
          if (Ee(arguments[0], Te)) {
            var r = arguments[0];
            if (r === null) return this.createMultiPoint(new Array(0).fill(null));
            for (var s = new Array(r.size()).fill(null), l = 0; l < r.size(); l++) {
              var d = this.getCoordinateSequenceFactory().create(1, r.getDimension(), r.getMeasures());
              _n.copy(r, l, d, 0, 1), s[l] = this.createPoint(d);
            }
            return this.createMultiPoint(s);
          }
        }
      } }, { key: "interfaces_", get: function() {
        return [M];
      } }], [{ key: "constructor_", value: function() {
        if (this._precisionModel = null, this._coordinateSequenceFactory = null, this._SRID = null, arguments.length === 0) c.constructor_.call(this, new Bt(), 0);
        else if (arguments.length === 1) {
          if (Ee(arguments[0], ma)) {
            var r = arguments[0];
            c.constructor_.call(this, new Bt(), 0, r);
          } else if (arguments[0] instanceof Bt) {
            var s = arguments[0];
            c.constructor_.call(this, s, 0, c.getDefaultCoordinateSequenceFactory());
          }
        } else if (arguments.length === 2) {
          var l = arguments[0], d = arguments[1];
          c.constructor_.call(this, l, d, c.getDefaultCoordinateSequenceFactory());
        } else if (arguments.length === 3) {
          var y = arguments[0], x = arguments[1], E = arguments[2];
          this._precisionModel = y, this._coordinateSequenceFactory = E, this._SRID = x;
        }
      } }, { key: "toMultiPolygonArray", value: function(r) {
        var s = new Array(r.size()).fill(null);
        return r.toArray(s);
      } }, { key: "toGeometryArray", value: function(r) {
        if (r === null) return null;
        var s = new Array(r.size()).fill(null);
        return r.toArray(s);
      } }, { key: "getDefaultCoordinateSequenceFactory", value: function() {
        return Is.instance();
      } }, { key: "toMultiLineStringArray", value: function(r) {
        var s = new Array(r.size()).fill(null);
        return r.toArray(s);
      } }, { key: "toLineStringArray", value: function(r) {
        var s = new Array(r.size()).fill(null);
        return r.toArray(s);
      } }, { key: "toMultiPointArray", value: function(r) {
        var s = new Array(r.size()).fill(null);
        return r.toArray(s);
      } }, { key: "toLinearRingArray", value: function(r) {
        var s = new Array(r.size()).fill(null);
        return r.toArray(s);
      } }, { key: "toPointArray", value: function(r) {
        var s = new Array(r.size()).fill(null);
        return r.toArray(s);
      } }, { key: "toPolygonArray", value: function(r) {
        var s = new Array(r.size()).fill(null);
        return r.toArray(s);
      } }, { key: "createPointFromInternalCoord", value: function(r, s) {
        return s.getPrecisionModel().makePrecise(r), s.getFactory().createPoint(r);
      } }]);
    }(), bs = "XY", pf = "XYZ", _f = "XYM", wf = "XYZM", ka = { POINT: "Point", LINE_STRING: "LineString", LINEAR_RING: "LinearRing", POLYGON: "Polygon", MULTI_POINT: "MultiPoint", MULTI_LINE_STRING: "MultiLineString", MULTI_POLYGON: "MultiPolygon", GEOMETRY_COLLECTION: "GeometryCollection", CIRCLE: "Circle" }, Ca = "EMPTY", hi = 1, tn = 2, dn = 3, Ia = 4, Rn = 5, xf = 6;
    for (var Ef in ka) ka[Ef].toUpperCase();
    var kf = function() {
      return h(function c(r) {
        o(this, c), this.wkt = r, this.index_ = -1;
      }, [{ key: "isAlpha_", value: function(c) {
        return c >= "a" && c <= "z" || c >= "A" && c <= "Z";
      } }, { key: "isNumeric_", value: function(c, r) {
        return c >= "0" && c <= "9" || c == "." && !(r !== void 0 && r);
      } }, { key: "isWhiteSpace_", value: function(c) {
        return c == " " || c == "	" || c == "\r" || c == `
`;
      } }, { key: "nextChar_", value: function() {
        return this.wkt.charAt(++this.index_);
      } }, { key: "nextToken", value: function() {
        var c, r = this.nextChar_(), s = this.index_, l = r;
        if (r == "(") c = tn;
        else if (r == ",") c = Rn;
        else if (r == ")") c = dn;
        else if (this.isNumeric_(r) || r == "-") c = Ia, l = this.readNumber_();
        else if (this.isAlpha_(r)) c = hi, l = this.readText_();
        else {
          if (this.isWhiteSpace_(r)) return this.nextToken();
          if (r !== "") throw new Error("Unexpected character: " + r);
          c = xf;
        }
        return { position: s, value: l, type: c };
      } }, { key: "readNumber_", value: function() {
        var c, r = this.index_, s = !1, l = !1;
        do
          c == "." ? s = !0 : c != "e" && c != "E" || (l = !0), c = this.nextChar_();
        while (this.isNumeric_(c, s) || !l && (c == "e" || c == "E") || l && (c == "-" || c == "+"));
        return parseFloat(this.wkt.substring(r, this.index_--));
      } }, { key: "readText_", value: function() {
        var c, r = this.index_;
        do
          c = this.nextChar_();
        while (this.isAlpha_(c));
        return this.wkt.substring(r, this.index_--).toUpperCase();
      } }]);
    }(), Cf = function() {
      return h(function c(r, s) {
        o(this, c), this.lexer_ = r, this.token_, this.layout_ = bs, this.factory = s;
      }, [{ key: "consume_", value: function() {
        this.token_ = this.lexer_.nextToken();
      } }, { key: "isTokenType", value: function(c) {
        return this.token_.type == c;
      } }, { key: "match", value: function(c) {
        var r = this.isTokenType(c);
        return r && this.consume_(), r;
      } }, { key: "parse", value: function() {
        return this.consume_(), this.parseGeometry_();
      } }, { key: "parseGeometryLayout_", value: function() {
        var c = bs, r = this.token_;
        if (this.isTokenType(hi)) {
          var s = r.value;
          s === "Z" ? c = pf : s === "M" ? c = _f : s === "ZM" && (c = wf), c !== bs && this.consume_();
        }
        return c;
      } }, { key: "parseGeometryCollectionText_", value: function() {
        if (this.match(tn)) {
          var c = [];
          do
            c.push(this.parseGeometry_());
          while (this.match(Rn));
          if (this.match(dn)) return c;
        } else if (this.isEmptyGeometry_()) return [];
        throw new Error(this.formatErrorMessage_());
      } }, { key: "parsePointText_", value: function() {
        if (this.match(tn)) {
          var c = this.parsePoint_();
          if (this.match(dn)) return c;
        } else if (this.isEmptyGeometry_()) return null;
        throw new Error(this.formatErrorMessage_());
      } }, { key: "parseLineStringText_", value: function() {
        if (this.match(tn)) {
          var c = this.parsePointList_();
          if (this.match(dn)) return c;
        } else if (this.isEmptyGeometry_()) return [];
        throw new Error(this.formatErrorMessage_());
      } }, { key: "parsePolygonText_", value: function() {
        if (this.match(tn)) {
          var c = this.parseLineStringTextList_();
          if (this.match(dn)) return c;
        } else if (this.isEmptyGeometry_()) return [];
        throw new Error(this.formatErrorMessage_());
      } }, { key: "parseMultiPointText_", value: function() {
        var c;
        if (this.match(tn)) {
          if (c = this.token_.type == tn ? this.parsePointTextList_() : this.parsePointList_(), this.match(dn)) return c;
        } else if (this.isEmptyGeometry_()) return [];
        throw new Error(this.formatErrorMessage_());
      } }, { key: "parseMultiLineStringText_", value: function() {
        if (this.match(tn)) {
          var c = this.parseLineStringTextList_();
          if (this.match(dn)) return c;
        } else if (this.isEmptyGeometry_()) return [];
        throw new Error(this.formatErrorMessage_());
      } }, { key: "parseMultiPolygonText_", value: function() {
        if (this.match(tn)) {
          var c = this.parsePolygonTextList_();
          if (this.match(dn)) return c;
        } else if (this.isEmptyGeometry_()) return [];
        throw new Error(this.formatErrorMessage_());
      } }, { key: "parsePoint_", value: function() {
        for (var c = [], r = this.layout_.length, s = 0; s < r; ++s) {
          var l = this.token_;
          if (!this.match(Ia)) break;
          c.push(l.value);
        }
        if (c.length == r) return c;
        throw new Error(this.formatErrorMessage_());
      } }, { key: "parsePointList_", value: function() {
        for (var c = [this.parsePoint_()]; this.match(Rn); ) c.push(this.parsePoint_());
        return c;
      } }, { key: "parsePointTextList_", value: function() {
        for (var c = [this.parsePointText_()]; this.match(Rn); ) c.push(this.parsePointText_());
        return c;
      } }, { key: "parseLineStringTextList_", value: function() {
        for (var c = [this.parseLineStringText_()]; this.match(Rn); ) c.push(this.parseLineStringText_());
        return c;
      } }, { key: "parsePolygonTextList_", value: function() {
        for (var c = [this.parsePolygonText_()]; this.match(Rn); ) c.push(this.parsePolygonText_());
        return c;
      } }, { key: "isEmptyGeometry_", value: function() {
        var c = this.isTokenType(hi) && this.token_.value == Ca;
        return c && this.consume_(), c;
      } }, { key: "formatErrorMessage_", value: function() {
        return "Unexpected `" + this.token_.value + "` at position " + this.token_.position + " in `" + this.lexer_.wkt + "`";
      } }, { key: "parseGeometry_", value: function() {
        var c = this.factory, r = function(ge) {
          return a(Z, C(ge));
        }, s = function(ge) {
          var Oe = ge.map(function(Le) {
            return c.createLinearRing(Le.map(r));
          });
          return Oe.length > 1 ? c.createPolygon(Oe[0], Oe.slice(1)) : c.createPolygon(Oe[0]);
        }, l = this.token_;
        if (this.match(hi)) {
          var d = l.value;
          if (this.layout_ = this.parseGeometryLayout_(), d == "GEOMETRYCOLLECTION") {
            var y = this.parseGeometryCollectionText_();
            return c.createGeometryCollection(y);
          }
          switch (d) {
            case "POINT":
              var x = this.parsePointText_();
              return x ? c.createPoint(a(Z, C(x))) : c.createPoint();
            case "LINESTRING":
              var E = this.parseLineStringText_().map(r);
              return c.createLineString(E);
            case "LINEARRING":
              var L = this.parseLineStringText_().map(r);
              return c.createLinearRing(L);
            case "POLYGON":
              var F = this.parsePolygonText_();
              return F && F.length !== 0 ? s(F) : c.createPolygon();
            case "MULTIPOINT":
              var $ = this.parseMultiPointText_();
              if (!$ || $.length === 0) return c.createMultiPoint();
              var K = $.map(r).map(function(ge) {
                return c.createPoint(ge);
              });
              return c.createMultiPoint(K);
            case "MULTILINESTRING":
              var ne = this.parseMultiLineStringText_().map(function(ge) {
                return c.createLineString(ge.map(r));
              });
              return c.createMultiLineString(ne);
            case "MULTIPOLYGON":
              var ue = this.parseMultiPolygonText_();
              if (!ue || ue.length === 0) return c.createMultiPolygon();
              var he = ue.map(s);
              return c.createMultiPolygon(he);
            default:
              throw new Error("Invalid geometry type: " + d);
          }
        }
        throw new Error(this.formatErrorMessage_());
      } }]);
    }();
    function Sa(c) {
      if (c.isEmpty()) return "";
      var r = c.getCoordinate(), s = [r.x, r.y];
      return r.z === void 0 || Number.isNaN(r.z) || s.push(r.z), r.m === void 0 || Number.isNaN(r.m) || s.push(r.m), s.join(" ");
    }
    function dr(c) {
      for (var r = c.getCoordinates().map(function(y) {
        var x = [y.x, y.y];
        return y.z === void 0 || Number.isNaN(y.z) || x.push(y.z), y.m === void 0 || Number.isNaN(y.m) || x.push(y.m), x;
      }), s = [], l = 0, d = r.length; l < d; ++l) s.push(r[l].join(" "));
      return s.join(", ");
    }
    function Ma(c) {
      var r = [];
      r.push("(" + dr(c.getExteriorRing()) + ")");
      for (var s = 0, l = c.getNumInteriorRing(); s < l; ++s) r.push("(" + dr(c.getInteriorRingN(s)) + ")");
      return r.join(", ");
    }
    var If = { Point: Sa, LineString: dr, LinearRing: dr, Polygon: Ma, MultiPoint: function(c) {
      for (var r = [], s = 0, l = c.getNumGeometries(); s < l; ++s) r.push("(" + Sa(c.getGeometryN(s)) + ")");
      return r.join(", ");
    }, MultiLineString: function(c) {
      for (var r = [], s = 0, l = c.getNumGeometries(); s < l; ++s) r.push("(" + dr(c.getGeometryN(s)) + ")");
      return r.join(", ");
    }, MultiPolygon: function(c) {
      for (var r = [], s = 0, l = c.getNumGeometries(); s < l; ++s) r.push("(" + Ma(c.getGeometryN(s)) + ")");
      return r.join(", ");
    }, GeometryCollection: function(c) {
      for (var r = [], s = 0, l = c.getNumGeometries(); s < l; ++s) r.push(ba(c.getGeometryN(s)));
      return r.join(", ");
    } };
    function ba(c) {
      var r = c.getGeometryType(), s = If[r];
      r = r.toUpperCase();
      var l = function(d) {
        var y = "";
        if (d.isEmpty()) return y;
        var x = d.getCoordinate();
        return x.z === void 0 || Number.isNaN(x.z) || (y += "Z"), x.m === void 0 || Number.isNaN(x.m) || (y += "M"), y;
      }(c);
      return l.length > 0 && (r += " " + l), c.isEmpty() ? r + " " + Ca : r + " (" + s(c) + ")";
    }
    var Sf = function() {
      return h(function c(r) {
        o(this, c), this.geometryFactory = r || new An(), this.precisionModel = this.geometryFactory.getPrecisionModel();
      }, [{ key: "read", value: function(c) {
        var r = new kf(c);
        return new Cf(r, this.geometryFactory).parse();
      } }, { key: "write", value: function(c) {
        return ba(c);
      } }]);
    }(), Ps = function() {
      return h(function c(r) {
        o(this, c), this.parser = new Sf(r);
      }, [{ key: "write", value: function(c) {
        return this.parser.write(c);
      } }], [{ key: "toLineString", value: function(c, r) {
        if (arguments.length !== 2) throw new Error("Not implemented");
        return "LINESTRING ( " + c.x + " " + c.y + ", " + r.x + " " + r.y + " )";
      } }]);
    }(), We = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "getIndexAlongSegment", value: function(r, s) {
        return this.computeIntLineIndex(), this._intLineIndex[r][s];
      } }, { key: "getTopologySummary", value: function() {
        var r = new ci();
        return this.isEndPoint() && r.append(" endpoint"), this._isProper && r.append(" proper"), this.isCollinear() && r.append(" collinear"), r.toString();
      } }, { key: "computeIntersection", value: function(r, s, l, d) {
        this._inputLines[0][0] = r, this._inputLines[0][1] = s, this._inputLines[1][0] = l, this._inputLines[1][1] = d, this._result = this.computeIntersect(r, s, l, d);
      } }, { key: "getIntersectionNum", value: function() {
        return this._result;
      } }, { key: "computeIntLineIndex", value: function() {
        if (arguments.length === 0) this._intLineIndex === null && (this._intLineIndex = Array(2).fill().map(function() {
          return Array(2);
        }), this.computeIntLineIndex(0), this.computeIntLineIndex(1));
        else if (arguments.length === 1) {
          var r = arguments[0];
          this.getEdgeDistance(r, 0) > this.getEdgeDistance(r, 1) ? (this._intLineIndex[r][0] = 0, this._intLineIndex[r][1] = 1) : (this._intLineIndex[r][0] = 1, this._intLineIndex[r][1] = 0);
        }
      } }, { key: "isProper", value: function() {
        return this.hasIntersection() && this._isProper;
      } }, { key: "setPrecisionModel", value: function(r) {
        this._precisionModel = r;
      } }, { key: "isInteriorIntersection", value: function() {
        if (arguments.length === 0) return !!this.isInteriorIntersection(0) || !!this.isInteriorIntersection(1);
        if (arguments.length === 1) {
          for (var r = arguments[0], s = 0; s < this._result; s++) if (!this._intPt[s].equals2D(this._inputLines[r][0]) && !this._intPt[s].equals2D(this._inputLines[r][1])) return !0;
          return !1;
        }
      } }, { key: "getIntersection", value: function(r) {
        return this._intPt[r];
      } }, { key: "isEndPoint", value: function() {
        return this.hasIntersection() && !this._isProper;
      } }, { key: "hasIntersection", value: function() {
        return this._result !== c.NO_INTERSECTION;
      } }, { key: "getEdgeDistance", value: function(r, s) {
        return c.computeEdgeDistance(this._intPt[s], this._inputLines[r][0], this._inputLines[r][1]);
      } }, { key: "isCollinear", value: function() {
        return this._result === c.COLLINEAR_INTERSECTION;
      } }, { key: "toString", value: function() {
        return Ps.toLineString(this._inputLines[0][0], this._inputLines[0][1]) + " - " + Ps.toLineString(this._inputLines[1][0], this._inputLines[1][1]) + this.getTopologySummary();
      } }, { key: "getEndpoint", value: function(r, s) {
        return this._inputLines[r][s];
      } }, { key: "isIntersection", value: function(r) {
        for (var s = 0; s < this._result; s++) if (this._intPt[s].equals2D(r)) return !0;
        return !1;
      } }, { key: "getIntersectionAlongSegment", value: function(r, s) {
        return this.computeIntLineIndex(), this._intPt[this._intLineIndex[r][s]];
      } }], [{ key: "constructor_", value: function() {
        this._result = null, this._inputLines = Array(2).fill().map(function() {
          return Array(2);
        }), this._intPt = new Array(2).fill(null), this._intLineIndex = null, this._isProper = null, this._pa = null, this._pb = null, this._precisionModel = null, this._intPt[0] = new Z(), this._intPt[1] = new Z(), this._pa = this._intPt[0], this._pb = this._intPt[1], this._result = 0;
      } }, { key: "computeEdgeDistance", value: function(r, s, l) {
        var d = Math.abs(l.x - s.x), y = Math.abs(l.y - s.y), x = -1;
        if (r.equals(s)) x = 0;
        else if (r.equals(l)) x = d > y ? d : y;
        else {
          var E = Math.abs(r.x - s.x), L = Math.abs(r.y - s.y);
          (x = d > y ? E : L) !== 0 || r.equals(s) || (x = Math.max(E, L));
        }
        return ee.isTrue(!(x === 0 && !r.equals(s)), "Bad distance calculation"), x;
      } }, { key: "nonRobustComputeEdgeDistance", value: function(r, s, l) {
        var d = r.x - s.x, y = r.y - s.y, x = Math.sqrt(d * d + y * y);
        return ee.isTrue(!(x === 0 && !r.equals(s)), "Invalid distance calculation"), x;
      } }]);
    }();
    We.DONT_INTERSECT = 0, We.DO_INTERSECT = 1, We.COLLINEAR = 2, We.NO_INTERSECTION = 0, We.POINT_INTERSECTION = 1, We.COLLINEAR_INTERSECTION = 2;
    var kn = function(c) {
      function r() {
        return o(this, r), i(this, r);
      }
      return v(r, c), h(r, [{ key: "isInSegmentEnvelopes", value: function(s) {
        var l = new _e(this._inputLines[0][0], this._inputLines[0][1]), d = new _e(this._inputLines[1][0], this._inputLines[1][1]);
        return l.contains(s) && d.contains(s);
      } }, { key: "computeIntersection", value: function() {
        if (arguments.length !== 3) return w(r, "computeIntersection", this, 1).apply(this, arguments);
        var s = arguments[0], l = arguments[1], d = arguments[2];
        if (this._isProper = !1, _e.intersects(l, d, s) && we.index(l, d, s) === 0 && we.index(d, l, s) === 0) return this._isProper = !0, (s.equals(l) || s.equals(d)) && (this._isProper = !1), this._result = We.POINT_INTERSECTION, null;
        this._result = We.NO_INTERSECTION;
      } }, { key: "intersection", value: function(s, l, d, y) {
        var x = this.intersectionSafe(s, l, d, y);
        return this.isInSegmentEnvelopes(x) || (x = new Z(r.nearestEndpoint(s, l, d, y))), this._precisionModel !== null && this._precisionModel.makePrecise(x), x;
      } }, { key: "checkDD", value: function(s, l, d, y, x) {
        var E = ws.intersection(s, l, d, y), L = this.isInSegmentEnvelopes(E);
        Mt.out.println("DD in env = " + L + "  --------------------- " + E), x.distance(E) > 1e-4 && Mt.out.println("Distance = " + x.distance(E));
      } }, { key: "intersectionSafe", value: function(s, l, d, y) {
        var x = xs.intersection(s, l, d, y);
        return x === null && (x = r.nearestEndpoint(s, l, d, y)), x;
      } }, { key: "computeCollinearIntersection", value: function(s, l, d, y) {
        var x = _e.intersects(s, l, d), E = _e.intersects(s, l, y), L = _e.intersects(d, y, s), F = _e.intersects(d, y, l);
        return x && E ? (this._intPt[0] = d, this._intPt[1] = y, We.COLLINEAR_INTERSECTION) : L && F ? (this._intPt[0] = s, this._intPt[1] = l, We.COLLINEAR_INTERSECTION) : x && L ? (this._intPt[0] = d, this._intPt[1] = s, !d.equals(s) || E || F ? We.COLLINEAR_INTERSECTION : We.POINT_INTERSECTION) : x && F ? (this._intPt[0] = d, this._intPt[1] = l, !d.equals(l) || E || L ? We.COLLINEAR_INTERSECTION : We.POINT_INTERSECTION) : E && L ? (this._intPt[0] = y, this._intPt[1] = s, !y.equals(s) || x || F ? We.COLLINEAR_INTERSECTION : We.POINT_INTERSECTION) : E && F ? (this._intPt[0] = y, this._intPt[1] = l, !y.equals(l) || x || L ? We.COLLINEAR_INTERSECTION : We.POINT_INTERSECTION) : We.NO_INTERSECTION;
      } }, { key: "computeIntersect", value: function(s, l, d, y) {
        if (this._isProper = !1, !_e.intersects(s, l, d, y)) return We.NO_INTERSECTION;
        var x = we.index(s, l, d), E = we.index(s, l, y);
        if (x > 0 && E > 0 || x < 0 && E < 0) return We.NO_INTERSECTION;
        var L = we.index(d, y, s), F = we.index(d, y, l);
        return L > 0 && F > 0 || L < 0 && F < 0 ? We.NO_INTERSECTION : x === 0 && E === 0 && L === 0 && F === 0 ? this.computeCollinearIntersection(s, l, d, y) : (x === 0 || E === 0 || L === 0 || F === 0 ? (this._isProper = !1, s.equals2D(d) || s.equals2D(y) ? this._intPt[0] = s : l.equals2D(d) || l.equals2D(y) ? this._intPt[0] = l : x === 0 ? this._intPt[0] = new Z(d) : E === 0 ? this._intPt[0] = new Z(y) : L === 0 ? this._intPt[0] = new Z(s) : F === 0 && (this._intPt[0] = new Z(l))) : (this._isProper = !0, this._intPt[0] = this.intersection(s, l, d, y)), We.POINT_INTERSECTION);
      } }], [{ key: "nearestEndpoint", value: function(s, l, d, y) {
        var x = s, E = Ut.pointToSegment(s, d, y), L = Ut.pointToSegment(l, d, y);
        return L < E && (E = L, x = l), (L = Ut.pointToSegment(d, s, l)) < E && (E = L, x = d), (L = Ut.pointToSegment(y, s, l)) < E && (E = L, x = y), x;
      } }]);
    }(We), Mf = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "countSegment", value: function(r, s) {
        if (r.x < this._p.x && s.x < this._p.x) return null;
        if (this._p.x === s.x && this._p.y === s.y) return this._isPointOnSegment = !0, null;
        if (r.y === this._p.y && s.y === this._p.y) {
          var l = r.x, d = s.x;
          return l > d && (l = s.x, d = r.x), this._p.x >= l && this._p.x <= d && (this._isPointOnSegment = !0), null;
        }
        if (r.y > this._p.y && s.y <= this._p.y || s.y > this._p.y && r.y <= this._p.y) {
          var y = we.index(r, s, this._p);
          if (y === we.COLLINEAR) return this._isPointOnSegment = !0, null;
          s.y < r.y && (y = -y), y === we.LEFT && this._crossingCount++;
        }
      } }, { key: "isPointInPolygon", value: function() {
        return this.getLocation() !== z.EXTERIOR;
      } }, { key: "getLocation", value: function() {
        return this._isPointOnSegment ? z.BOUNDARY : this._crossingCount % 2 == 1 ? z.INTERIOR : z.EXTERIOR;
      } }, { key: "isOnSegment", value: function() {
        return this._isPointOnSegment;
      } }], [{ key: "constructor_", value: function() {
        this._p = null, this._crossingCount = 0, this._isPointOnSegment = !1;
        var r = arguments[0];
        this._p = r;
      } }, { key: "locatePointInRing", value: function() {
        if (arguments[0] instanceof Z && Ee(arguments[1], Te)) {
          for (var r = arguments[1], s = new c(arguments[0]), l = new Z(), d = new Z(), y = 1; y < r.size(); y++) if (r.getCoordinate(y, l), r.getCoordinate(y - 1, d), s.countSegment(l, d), s.isOnSegment()) return s.getLocation();
          return s.getLocation();
        }
        if (arguments[0] instanceof Z && arguments[1] instanceof Array) {
          for (var x = arguments[1], E = new c(arguments[0]), L = 1; L < x.length; L++) {
            var F = x[L], $ = x[L - 1];
            if (E.countSegment(F, $), E.isOnSegment()) return E.getLocation();
          }
          return E.getLocation();
        }
      } }]);
    }(), Ls = function() {
      function c() {
        o(this, c);
      }
      return h(c, null, [{ key: "isOnLine", value: function() {
        if (arguments[0] instanceof Z && Ee(arguments[1], Te)) {
          for (var r = arguments[0], s = arguments[1], l = new kn(), d = new Z(), y = new Z(), x = s.size(), E = 1; E < x; E++) if (s.getCoordinate(E - 1, d), s.getCoordinate(E, y), l.computeIntersection(r, d, y), l.hasIntersection()) return !0;
          return !1;
        }
        if (arguments[0] instanceof Z && arguments[1] instanceof Array) {
          for (var L = arguments[0], F = arguments[1], $ = new kn(), K = 1; K < F.length; K++) {
            var ne = F[K - 1], ue = F[K];
            if ($.computeIntersection(L, ne, ue), $.hasIntersection()) return !0;
          }
          return !1;
        }
      } }, { key: "locateInRing", value: function(r, s) {
        return Mf.locatePointInRing(r, s);
      } }, { key: "isInRing", value: function(r, s) {
        return c.locateInRing(r, s) !== z.EXTERIOR;
      } }]);
    }(), bt = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "setAllLocations", value: function(r) {
        for (var s = 0; s < this.location.length; s++) this.location[s] = r;
      } }, { key: "isNull", value: function() {
        for (var r = 0; r < this.location.length; r++) if (this.location[r] !== z.NONE) return !1;
        return !0;
      } }, { key: "setAllLocationsIfNull", value: function(r) {
        for (var s = 0; s < this.location.length; s++) this.location[s] === z.NONE && (this.location[s] = r);
      } }, { key: "isLine", value: function() {
        return this.location.length === 1;
      } }, { key: "merge", value: function(r) {
        if (r.location.length > this.location.length) {
          var s = new Array(3).fill(null);
          s[ie.ON] = this.location[ie.ON], s[ie.LEFT] = z.NONE, s[ie.RIGHT] = z.NONE, this.location = s;
        }
        for (var l = 0; l < this.location.length; l++) this.location[l] === z.NONE && l < r.location.length && (this.location[l] = r.location[l]);
      } }, { key: "getLocations", value: function() {
        return this.location;
      } }, { key: "flip", value: function() {
        if (this.location.length <= 1) return null;
        var r = this.location[ie.LEFT];
        this.location[ie.LEFT] = this.location[ie.RIGHT], this.location[ie.RIGHT] = r;
      } }, { key: "toString", value: function() {
        var r = new fn();
        return this.location.length > 1 && r.append(z.toLocationSymbol(this.location[ie.LEFT])), r.append(z.toLocationSymbol(this.location[ie.ON])), this.location.length > 1 && r.append(z.toLocationSymbol(this.location[ie.RIGHT])), r.toString();
      } }, { key: "setLocations", value: function(r, s, l) {
        this.location[ie.ON] = r, this.location[ie.LEFT] = s, this.location[ie.RIGHT] = l;
      } }, { key: "get", value: function(r) {
        return r < this.location.length ? this.location[r] : z.NONE;
      } }, { key: "isArea", value: function() {
        return this.location.length > 1;
      } }, { key: "isAnyNull", value: function() {
        for (var r = 0; r < this.location.length; r++) if (this.location[r] === z.NONE) return !0;
        return !1;
      } }, { key: "setLocation", value: function() {
        if (arguments.length === 1) {
          var r = arguments[0];
          this.setLocation(ie.ON, r);
        } else if (arguments.length === 2) {
          var s = arguments[0], l = arguments[1];
          this.location[s] = l;
        }
      } }, { key: "init", value: function(r) {
        this.location = new Array(r).fill(null), this.setAllLocations(z.NONE);
      } }, { key: "isEqualOnSide", value: function(r, s) {
        return this.location[s] === r.location[s];
      } }, { key: "allPositionsEqual", value: function(r) {
        for (var s = 0; s < this.location.length; s++) if (this.location[s] !== r) return !1;
        return !0;
      } }], [{ key: "constructor_", value: function() {
        if (this.location = null, arguments.length === 1) {
          if (arguments[0] instanceof Array) {
            var r = arguments[0];
            this.init(r.length);
          } else if (Number.isInteger(arguments[0])) {
            var s = arguments[0];
            this.init(1), this.location[ie.ON] = s;
          } else if (arguments[0] instanceof c) {
            var l = arguments[0];
            if (this.init(l.location.length), l !== null) for (var d = 0; d < this.location.length; d++) this.location[d] = l.location[d];
          }
        } else if (arguments.length === 3) {
          var y = arguments[0], x = arguments[1], E = arguments[2];
          this.init(3), this.location[ie.ON] = y, this.location[ie.LEFT] = x, this.location[ie.RIGHT] = E;
        }
      } }]);
    }(), Pt = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "getGeometryCount", value: function() {
        var r = 0;
        return this.elt[0].isNull() || r++, this.elt[1].isNull() || r++, r;
      } }, { key: "setAllLocations", value: function(r, s) {
        this.elt[r].setAllLocations(s);
      } }, { key: "isNull", value: function(r) {
        return this.elt[r].isNull();
      } }, { key: "setAllLocationsIfNull", value: function() {
        if (arguments.length === 1) {
          var r = arguments[0];
          this.setAllLocationsIfNull(0, r), this.setAllLocationsIfNull(1, r);
        } else if (arguments.length === 2) {
          var s = arguments[0], l = arguments[1];
          this.elt[s].setAllLocationsIfNull(l);
        }
      } }, { key: "isLine", value: function(r) {
        return this.elt[r].isLine();
      } }, { key: "merge", value: function(r) {
        for (var s = 0; s < 2; s++) this.elt[s] === null && r.elt[s] !== null ? this.elt[s] = new bt(r.elt[s]) : this.elt[s].merge(r.elt[s]);
      } }, { key: "flip", value: function() {
        this.elt[0].flip(), this.elt[1].flip();
      } }, { key: "getLocation", value: function() {
        if (arguments.length === 1) {
          var r = arguments[0];
          return this.elt[r].get(ie.ON);
        }
        if (arguments.length === 2) {
          var s = arguments[0], l = arguments[1];
          return this.elt[s].get(l);
        }
      } }, { key: "toString", value: function() {
        var r = new fn();
        return this.elt[0] !== null && (r.append("A:"), r.append(this.elt[0].toString())), this.elt[1] !== null && (r.append(" B:"), r.append(this.elt[1].toString())), r.toString();
      } }, { key: "isArea", value: function() {
        if (arguments.length === 0) return this.elt[0].isArea() || this.elt[1].isArea();
        if (arguments.length === 1) {
          var r = arguments[0];
          return this.elt[r].isArea();
        }
      } }, { key: "isAnyNull", value: function(r) {
        return this.elt[r].isAnyNull();
      } }, { key: "setLocation", value: function() {
        if (arguments.length === 2) {
          var r = arguments[0], s = arguments[1];
          this.elt[r].setLocation(ie.ON, s);
        } else if (arguments.length === 3) {
          var l = arguments[0], d = arguments[1], y = arguments[2];
          this.elt[l].setLocation(d, y);
        }
      } }, { key: "isEqualOnSide", value: function(r, s) {
        return this.elt[0].isEqualOnSide(r.elt[0], s) && this.elt[1].isEqualOnSide(r.elt[1], s);
      } }, { key: "allPositionsEqual", value: function(r, s) {
        return this.elt[r].allPositionsEqual(s);
      } }, { key: "toLine", value: function(r) {
        this.elt[r].isArea() && (this.elt[r] = new bt(this.elt[r].location[0]));
      } }], [{ key: "constructor_", value: function() {
        if (this.elt = new Array(2).fill(null), arguments.length === 1) {
          if (Number.isInteger(arguments[0])) {
            var r = arguments[0];
            this.elt[0] = new bt(r), this.elt[1] = new bt(r);
          } else if (arguments[0] instanceof c) {
            var s = arguments[0];
            this.elt[0] = new bt(s.elt[0]), this.elt[1] = new bt(s.elt[1]);
          }
        } else if (arguments.length === 2) {
          var l = arguments[0], d = arguments[1];
          this.elt[0] = new bt(z.NONE), this.elt[1] = new bt(z.NONE), this.elt[l].setLocation(d);
        } else if (arguments.length === 3) {
          var y = arguments[0], x = arguments[1], E = arguments[2];
          this.elt[0] = new bt(y, x, E), this.elt[1] = new bt(y, x, E);
        } else if (arguments.length === 4) {
          var L = arguments[0], F = arguments[1], $ = arguments[2], K = arguments[3];
          this.elt[0] = new bt(z.NONE, z.NONE, z.NONE), this.elt[1] = new bt(z.NONE, z.NONE, z.NONE), this.elt[L].setLocations(F, $, K);
        }
      } }, { key: "toLineLabel", value: function(r) {
        for (var s = new c(z.NONE), l = 0; l < 2; l++) s.setLocation(l, r.getLocation(l));
        return s;
      } }]);
    }(), fi = function() {
      return h(function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }, [{ key: "computeRing", value: function() {
        if (this._ring !== null) return null;
        for (var c = new Array(this._pts.size()).fill(null), r = 0; r < this._pts.size(); r++) c[r] = this._pts.get(r);
        this._ring = this._geometryFactory.createLinearRing(c), this._isHole = we.isCCW(this._ring.getCoordinates());
      } }, { key: "isIsolated", value: function() {
        return this._label.getGeometryCount() === 1;
      } }, { key: "computePoints", value: function(c) {
        this._startDe = c;
        var r = c, s = !0;
        do {
          if (r === null) throw new en("Found null DirectedEdge");
          if (r.getEdgeRing() === this) throw new en("Directed Edge visited twice during ring-building at " + r.getCoordinate());
          this._edges.add(r);
          var l = r.getLabel();
          ee.isTrue(l.isArea()), this.mergeLabel(l), this.addPoints(r.getEdge(), r.isForward(), s), s = !1, this.setEdgeRing(r, this), r = this.getNext(r);
        } while (r !== this._startDe);
      } }, { key: "getLinearRing", value: function() {
        return this._ring;
      } }, { key: "getCoordinate", value: function(c) {
        return this._pts.get(c);
      } }, { key: "computeMaxNodeDegree", value: function() {
        this._maxNodeDegree = 0;
        var c = this._startDe;
        do {
          var r = c.getNode().getEdges().getOutgoingDegree(this);
          r > this._maxNodeDegree && (this._maxNodeDegree = r), c = this.getNext(c);
        } while (c !== this._startDe);
        this._maxNodeDegree *= 2;
      } }, { key: "addPoints", value: function(c, r, s) {
        var l = c.getCoordinates();
        if (r) {
          var d = 1;
          s && (d = 0);
          for (var y = d; y < l.length; y++) this._pts.add(l[y]);
        } else {
          var x = l.length - 2;
          s && (x = l.length - 1);
          for (var E = x; E >= 0; E--) this._pts.add(l[E]);
        }
      } }, { key: "isHole", value: function() {
        return this._isHole;
      } }, { key: "setInResult", value: function() {
        var c = this._startDe;
        do
          c.getEdge().setInResult(!0), c = c.getNext();
        while (c !== this._startDe);
      } }, { key: "containsPoint", value: function(c) {
        var r = this.getLinearRing();
        if (!r.getEnvelopeInternal().contains(c) || !Ls.isInRing(c, r.getCoordinates())) return !1;
        for (var s = this._holes.iterator(); s.hasNext(); )
          if (s.next().containsPoint(c)) return !1;
        return !0;
      } }, { key: "addHole", value: function(c) {
        this._holes.add(c);
      } }, { key: "isShell", value: function() {
        return this._shell === null;
      } }, { key: "getLabel", value: function() {
        return this._label;
      } }, { key: "getEdges", value: function() {
        return this._edges;
      } }, { key: "getMaxNodeDegree", value: function() {
        return this._maxNodeDegree < 0 && this.computeMaxNodeDegree(), this._maxNodeDegree;
      } }, { key: "getShell", value: function() {
        return this._shell;
      } }, { key: "mergeLabel", value: function() {
        if (arguments.length === 1) {
          var c = arguments[0];
          this.mergeLabel(c, 0), this.mergeLabel(c, 1);
        } else if (arguments.length === 2) {
          var r = arguments[1], s = arguments[0].getLocation(r, ie.RIGHT);
          if (s === z.NONE) return null;
          if (this._label.getLocation(r) === z.NONE) return this._label.setLocation(r, s), null;
        }
      } }, { key: "setShell", value: function(c) {
        this._shell = c, c !== null && c.addHole(this);
      } }, { key: "toPolygon", value: function(c) {
        for (var r = new Array(this._holes.size()).fill(null), s = 0; s < this._holes.size(); s++) r[s] = this._holes.get(s).getLinearRing();
        return c.createPolygon(this.getLinearRing(), r);
      } }], [{ key: "constructor_", value: function() {
        if (this._startDe = null, this._maxNodeDegree = -1, this._edges = new me(), this._pts = new me(), this._label = new Pt(z.NONE), this._ring = null, this._isHole = null, this._shell = null, this._holes = new me(), this._geometryFactory = null, arguments.length !== 0) {
          if (arguments.length === 2) {
            var c = arguments[0], r = arguments[1];
            this._geometryFactory = r, this.computePoints(c), this.computeRing();
          }
        }
      } }]);
    }(), bf = function(c) {
      function r() {
        var s;
        return o(this, r), s = i(this, r), r.constructor_.apply(s, arguments), s;
      }
      return v(r, c), h(r, [{ key: "setEdgeRing", value: function(s, l) {
        s.setMinEdgeRing(l);
      } }, { key: "getNext", value: function(s) {
        return s.getNextMin();
      } }], [{ key: "constructor_", value: function() {
        var s = arguments[0], l = arguments[1];
        fi.constructor_.call(this, s, l);
      } }]);
    }(fi), Pf = function(c) {
      function r() {
        var s;
        return o(this, r), s = i(this, r), r.constructor_.apply(s, arguments), s;
      }
      return v(r, c), h(r, [{ key: "buildMinimalRings", value: function() {
        var s = new me(), l = this._startDe;
        do {
          if (l.getMinEdgeRing() === null) {
            var d = new bf(l, this._geometryFactory);
            s.add(d);
          }
          l = l.getNext();
        } while (l !== this._startDe);
        return s;
      } }, { key: "setEdgeRing", value: function(s, l) {
        s.setEdgeRing(l);
      } }, { key: "linkDirectedEdgesForMinimalEdgeRings", value: function() {
        var s = this._startDe;
        do
          s.getNode().getEdges().linkMinimalDirectedEdges(this), s = s.getNext();
        while (s !== this._startDe);
      } }, { key: "getNext", value: function(s) {
        return s.getNext();
      } }], [{ key: "constructor_", value: function() {
        var s = arguments[0], l = arguments[1];
        fi.constructor_.call(this, s, l);
      } }]);
    }(fi), Pa = function() {
      return h(function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }, [{ key: "setVisited", value: function(c) {
        this._isVisited = c;
      } }, { key: "setInResult", value: function(c) {
        this._isInResult = c;
      } }, { key: "isCovered", value: function() {
        return this._isCovered;
      } }, { key: "isCoveredSet", value: function() {
        return this._isCoveredSet;
      } }, { key: "setLabel", value: function(c) {
        this._label = c;
      } }, { key: "getLabel", value: function() {
        return this._label;
      } }, { key: "setCovered", value: function(c) {
        this._isCovered = c, this._isCoveredSet = !0;
      } }, { key: "updateIM", value: function(c) {
        ee.isTrue(this._label.getGeometryCount() >= 2, "found partial label"), this.computeIM(c);
      } }, { key: "isInResult", value: function() {
        return this._isInResult;
      } }, { key: "isVisited", value: function() {
        return this._isVisited;
      } }], [{ key: "constructor_", value: function() {
        if (this._label = null, this._isInResult = !1, this._isCovered = !1, this._isCoveredSet = !1, this._isVisited = !1, arguments.length !== 0) {
          if (arguments.length === 1) {
            var c = arguments[0];
            this._label = c;
          }
        }
      } }]);
    }(), gi = function(c) {
      function r() {
        var s;
        return o(this, r), s = i(this, r), r.constructor_.apply(s, arguments), s;
      }
      return v(r, c), h(r, [{ key: "isIncidentEdgeInResult", value: function() {
        for (var s = this.getEdges().getEdges().iterator(); s.hasNext(); )
          if (s.next().getEdge().isInResult()) return !0;
        return !1;
      } }, { key: "isIsolated", value: function() {
        return this._label.getGeometryCount() === 1;
      } }, { key: "getCoordinate", value: function() {
        return this._coord;
      } }, { key: "print", value: function(s) {
        s.println("node " + this._coord + " lbl: " + this._label);
      } }, { key: "computeIM", value: function(s) {
      } }, { key: "computeMergedLocation", value: function(s, l) {
        var d = z.NONE;
        if (d = this._label.getLocation(l), !s.isNull(l)) {
          var y = s.getLocation(l);
          d !== z.BOUNDARY && (d = y);
        }
        return d;
      } }, { key: "setLabel", value: function() {
        if (arguments.length !== 2 || !Number.isInteger(arguments[1]) || !Number.isInteger(arguments[0])) return w(r, "setLabel", this, 1).apply(this, arguments);
        var s = arguments[0], l = arguments[1];
        this._label === null ? this._label = new Pt(s, l) : this._label.setLocation(s, l);
      } }, { key: "getEdges", value: function() {
        return this._edges;
      } }, { key: "mergeLabel", value: function() {
        if (arguments[0] instanceof r) {
          var s = arguments[0];
          this.mergeLabel(s._label);
        } else if (arguments[0] instanceof Pt) for (var l = arguments[0], d = 0; d < 2; d++) {
          var y = this.computeMergedLocation(l, d);
          this._label.getLocation(d) === z.NONE && this._label.setLocation(d, y);
        }
      } }, { key: "add", value: function(s) {
        this._edges.insert(s), s.setNode(this);
      } }, { key: "setLabelBoundary", value: function(s) {
        if (this._label === null) return null;
        var l = z.NONE;
        this._label !== null && (l = this._label.getLocation(s));
        var d = null;
        switch (l) {
          case z.BOUNDARY:
            d = z.INTERIOR;
            break;
          case z.INTERIOR:
          default:
            d = z.BOUNDARY;
        }
        this._label.setLocation(s, d);
      } }], [{ key: "constructor_", value: function() {
        this._coord = null, this._edges = null;
        var s = arguments[0], l = arguments[1];
        this._coord = s, this._edges = l, this._label = new Pt(0, z.NONE);
      } }]);
    }(Pa), Lf = function(c) {
      function r() {
        return o(this, r), i(this, r, arguments);
      }
      return v(r, c), h(r);
    }(Ea);
    function La(c) {
      return c == null ? 0 : c.color;
    }
    function De(c) {
      return c == null ? null : c.parent;
    }
    function Xt(c, r) {
      c !== null && (c.color = r);
    }
    function Ns(c) {
      return c == null ? null : c.left;
    }
    function Na(c) {
      return c == null ? null : c.right;
    }
    var vr = function(c) {
      function r() {
        var s;
        return o(this, r), (s = i(this, r)).root_ = null, s.size_ = 0, s;
      }
      return v(r, c), h(r, [{ key: "get", value: function(s) {
        for (var l = this.root_; l !== null; ) {
          var d = s.compareTo(l.key);
          if (d < 0) l = l.left;
          else {
            if (!(d > 0)) return l.value;
            l = l.right;
          }
        }
        return null;
      } }, { key: "put", value: function(s, l) {
        if (this.root_ === null) return this.root_ = { key: s, value: l, left: null, right: null, parent: null, color: 0, getValue: function() {
          return this.value;
        }, getKey: function() {
          return this.key;
        } }, this.size_ = 1, null;
        var d, y, x = this.root_;
        do
          if (d = x, (y = s.compareTo(x.key)) < 0) x = x.left;
          else {
            if (!(y > 0)) {
              var E = x.value;
              return x.value = l, E;
            }
            x = x.right;
          }
        while (x !== null);
        var L = { key: s, left: null, right: null, value: l, parent: d, color: 0, getValue: function() {
          return this.value;
        }, getKey: function() {
          return this.key;
        } };
        return y < 0 ? d.left = L : d.right = L, this.fixAfterInsertion(L), this.size_++, null;
      } }, { key: "fixAfterInsertion", value: function(s) {
        var l;
        for (s.color = 1; s != null && s !== this.root_ && s.parent.color === 1; ) De(s) === Ns(De(De(s))) ? La(l = Na(De(De(s)))) === 1 ? (Xt(De(s), 0), Xt(l, 0), Xt(De(De(s)), 1), s = De(De(s))) : (s === Na(De(s)) && (s = De(s), this.rotateLeft(s)), Xt(De(s), 0), Xt(De(De(s)), 1), this.rotateRight(De(De(s)))) : La(l = Ns(De(De(s)))) === 1 ? (Xt(De(s), 0), Xt(l, 0), Xt(De(De(s)), 1), s = De(De(s))) : (s === Ns(De(s)) && (s = De(s), this.rotateRight(s)), Xt(De(s), 0), Xt(De(De(s)), 1), this.rotateLeft(De(De(s))));
        this.root_.color = 0;
      } }, { key: "values", value: function() {
        var s = new me(), l = this.getFirstEntry();
        if (l !== null) for (s.add(l.value); (l = r.successor(l)) !== null; ) s.add(l.value);
        return s;
      } }, { key: "entrySet", value: function() {
        var s = new gt(), l = this.getFirstEntry();
        if (l !== null) for (s.add(l); (l = r.successor(l)) !== null; ) s.add(l);
        return s;
      } }, { key: "rotateLeft", value: function(s) {
        if (s != null) {
          var l = s.right;
          s.right = l.left, l.left != null && (l.left.parent = s), l.parent = s.parent, s.parent == null ? this.root_ = l : s.parent.left === s ? s.parent.left = l : s.parent.right = l, l.left = s, s.parent = l;
        }
      } }, { key: "rotateRight", value: function(s) {
        if (s != null) {
          var l = s.left;
          s.left = l.right, l.right != null && (l.right.parent = s), l.parent = s.parent, s.parent == null ? this.root_ = l : s.parent.right === s ? s.parent.right = l : s.parent.left = l, l.right = s, s.parent = l;
        }
      } }, { key: "getFirstEntry", value: function() {
        var s = this.root_;
        if (s != null) for (; s.left != null; ) s = s.left;
        return s;
      } }, { key: "size", value: function() {
        return this.size_;
      } }, { key: "containsKey", value: function(s) {
        for (var l = this.root_; l !== null; ) {
          var d = s.compareTo(l.key);
          if (d < 0) l = l.left;
          else {
            if (!(d > 0)) return !0;
            l = l.right;
          }
        }
        return !1;
      } }], [{ key: "successor", value: function(s) {
        var l;
        if (s === null) return null;
        if (s.right !== null) {
          for (l = s.right; l.left !== null; ) l = l.left;
          return l;
        }
        l = s.parent;
        for (var d = s; l !== null && d === l.right; ) d = l, l = l.parent;
        return l;
      } }]);
    }(Lf), Ta = function() {
      return h(function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }, [{ key: "find", value: function(c) {
        return this.nodeMap.get(c);
      } }, { key: "addNode", value: function() {
        if (arguments[0] instanceof Z) {
          var c = arguments[0], r = this.nodeMap.get(c);
          return r === null && (r = this.nodeFact.createNode(c), this.nodeMap.put(c, r)), r;
        }
        if (arguments[0] instanceof gi) {
          var s = arguments[0], l = this.nodeMap.get(s.getCoordinate());
          return l === null ? (this.nodeMap.put(s.getCoordinate(), s), s) : (l.mergeLabel(s), l);
        }
      } }, { key: "print", value: function(c) {
        for (var r = this.iterator(); r.hasNext(); )
          r.next().print(c);
      } }, { key: "iterator", value: function() {
        return this.nodeMap.values().iterator();
      } }, { key: "values", value: function() {
        return this.nodeMap.values();
      } }, { key: "getBoundaryNodes", value: function(c) {
        for (var r = new me(), s = this.iterator(); s.hasNext(); ) {
          var l = s.next();
          l.getLabel().getLocation(c) === z.BOUNDARY && r.add(l);
        }
        return r;
      } }, { key: "add", value: function(c) {
        var r = c.getCoordinate();
        this.addNode(r).add(c);
      } }], [{ key: "constructor_", value: function() {
        this.nodeMap = new vr(), this.nodeFact = null;
        var c = arguments[0];
        this.nodeFact = c;
      } }]);
    }(), dt = function() {
      function c() {
        o(this, c);
      }
      return h(c, null, [{ key: "isNorthern", value: function(r) {
        return r === c.NE || r === c.NW;
      } }, { key: "isOpposite", value: function(r, s) {
        return r !== s && (r - s + 4) % 4 === 2;
      } }, { key: "commonHalfPlane", value: function(r, s) {
        if (r === s) return r;
        if ((r - s + 4) % 4 === 2) return -1;
        var l = r < s ? r : s;
        return l === 0 && (r > s ? r : s) === 3 ? 3 : l;
      } }, { key: "isInHalfPlane", value: function(r, s) {
        return s === c.SE ? r === c.SE || r === c.SW : r === s || r === s + 1;
      } }, { key: "quadrant", value: function() {
        if (typeof arguments[0] == "number" && typeof arguments[1] == "number") {
          var r = arguments[0], s = arguments[1];
          if (r === 0 && s === 0) throw new R("Cannot compute the quadrant for point ( " + r + ", " + s + " )");
          return r >= 0 ? s >= 0 ? c.NE : c.SE : s >= 0 ? c.NW : c.SW;
        }
        if (arguments[0] instanceof Z && arguments[1] instanceof Z) {
          var l = arguments[0], d = arguments[1];
          if (d.x === l.x && d.y === l.y) throw new R("Cannot compute the quadrant for two identical points " + l);
          return d.x >= l.x ? d.y >= l.y ? c.NE : c.SE : d.y >= l.y ? c.NW : c.SW;
        }
      } }]);
    }();
    dt.NE = 0, dt.NW = 1, dt.SW = 2, dt.SE = 3;
    var Oa = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "compareDirection", value: function(r) {
        return this._dx === r._dx && this._dy === r._dy ? 0 : this._quadrant > r._quadrant ? 1 : this._quadrant < r._quadrant ? -1 : we.index(r._p0, r._p1, this._p1);
      } }, { key: "getDy", value: function() {
        return this._dy;
      } }, { key: "getCoordinate", value: function() {
        return this._p0;
      } }, { key: "setNode", value: function(r) {
        this._node = r;
      } }, { key: "print", value: function(r) {
        var s = Math.atan2(this._dy, this._dx), l = this.getClass().getName(), d = l.lastIndexOf("."), y = l.substring(d + 1);
        r.print("  " + y + ": " + this._p0 + " - " + this._p1 + " " + this._quadrant + ":" + s + "   " + this._label);
      } }, { key: "compareTo", value: function(r) {
        var s = r;
        return this.compareDirection(s);
      } }, { key: "getDirectedCoordinate", value: function() {
        return this._p1;
      } }, { key: "getDx", value: function() {
        return this._dx;
      } }, { key: "getLabel", value: function() {
        return this._label;
      } }, { key: "getEdge", value: function() {
        return this._edge;
      } }, { key: "getQuadrant", value: function() {
        return this._quadrant;
      } }, { key: "getNode", value: function() {
        return this._node;
      } }, { key: "toString", value: function() {
        var r = Math.atan2(this._dy, this._dx), s = this.getClass().getName(), l = s.lastIndexOf(".");
        return "  " + s.substring(l + 1) + ": " + this._p0 + " - " + this._p1 + " " + this._quadrant + ":" + r + "   " + this._label;
      } }, { key: "computeLabel", value: function(r) {
      } }, { key: "init", value: function(r, s) {
        this._p0 = r, this._p1 = s, this._dx = s.x - r.x, this._dy = s.y - r.y, this._quadrant = dt.quadrant(this._dx, this._dy), ee.isTrue(!(this._dx === 0 && this._dy === 0), "EdgeEnd with identical endpoints found");
      } }, { key: "interfaces_", get: function() {
        return [V];
      } }], [{ key: "constructor_", value: function() {
        if (this._edge = null, this._label = null, this._node = null, this._p0 = null, this._p1 = null, this._dx = null, this._dy = null, this._quadrant = null, arguments.length === 1) {
          var r = arguments[0];
          this._edge = r;
        } else if (arguments.length === 3) {
          var s = arguments[0], l = arguments[1], d = arguments[2];
          c.constructor_.call(this, s, l, d, null);
        } else if (arguments.length === 4) {
          var y = arguments[0], x = arguments[1], E = arguments[2], L = arguments[3];
          c.constructor_.call(this, y), this.init(x, E), this._label = L;
        }
      } }]);
    }(), Ts = function(c) {
      function r() {
        var s;
        return o(this, r), s = i(this, r), r.constructor_.apply(s, arguments), s;
      }
      return v(r, c), h(r, [{ key: "getNextMin", value: function() {
        return this._nextMin;
      } }, { key: "getDepth", value: function(s) {
        return this._depth[s];
      } }, { key: "setVisited", value: function(s) {
        this._isVisited = s;
      } }, { key: "computeDirectedLabel", value: function() {
        this._label = new Pt(this._edge.getLabel()), this._isForward || this._label.flip();
      } }, { key: "getNext", value: function() {
        return this._next;
      } }, { key: "setDepth", value: function(s, l) {
        if (this._depth[s] !== -999 && this._depth[s] !== l) throw new en("assigned depths do not match", this.getCoordinate());
        this._depth[s] = l;
      } }, { key: "isInteriorAreaEdge", value: function() {
        for (var s = !0, l = 0; l < 2; l++) this._label.isArea(l) && this._label.getLocation(l, ie.LEFT) === z.INTERIOR && this._label.getLocation(l, ie.RIGHT) === z.INTERIOR || (s = !1);
        return s;
      } }, { key: "setNextMin", value: function(s) {
        this._nextMin = s;
      } }, { key: "print", value: function(s) {
        w(r, "print", this, 1).call(this, s), s.print(" " + this._depth[ie.LEFT] + "/" + this._depth[ie.RIGHT]), s.print(" (" + this.getDepthDelta() + ")"), this._isInResult && s.print(" inResult");
      } }, { key: "setMinEdgeRing", value: function(s) {
        this._minEdgeRing = s;
      } }, { key: "isLineEdge", value: function() {
        var s = this._label.isLine(0) || this._label.isLine(1), l = !this._label.isArea(0) || this._label.allPositionsEqual(0, z.EXTERIOR), d = !this._label.isArea(1) || this._label.allPositionsEqual(1, z.EXTERIOR);
        return s && l && d;
      } }, { key: "setEdgeRing", value: function(s) {
        this._edgeRing = s;
      } }, { key: "getMinEdgeRing", value: function() {
        return this._minEdgeRing;
      } }, { key: "getDepthDelta", value: function() {
        var s = this._edge.getDepthDelta();
        return this._isForward || (s = -s), s;
      } }, { key: "setInResult", value: function(s) {
        this._isInResult = s;
      } }, { key: "getSym", value: function() {
        return this._sym;
      } }, { key: "isForward", value: function() {
        return this._isForward;
      } }, { key: "getEdge", value: function() {
        return this._edge;
      } }, { key: "printEdge", value: function(s) {
        this.print(s), s.print(" "), this._isForward ? this._edge.print(s) : this._edge.printReverse(s);
      } }, { key: "setSym", value: function(s) {
        this._sym = s;
      } }, { key: "setVisitedEdge", value: function(s) {
        this.setVisited(s), this._sym.setVisited(s);
      } }, { key: "setEdgeDepths", value: function(s, l) {
        var d = this.getEdge().getDepthDelta();
        this._isForward || (d = -d);
        var y = 1;
        s === ie.LEFT && (y = -1);
        var x = ie.opposite(s), E = l + d * y;
        this.setDepth(s, l), this.setDepth(x, E);
      } }, { key: "getEdgeRing", value: function() {
        return this._edgeRing;
      } }, { key: "isInResult", value: function() {
        return this._isInResult;
      } }, { key: "setNext", value: function(s) {
        this._next = s;
      } }, { key: "isVisited", value: function() {
        return this._isVisited;
      } }], [{ key: "constructor_", value: function() {
        this._isForward = null, this._isInResult = !1, this._isVisited = !1, this._sym = null, this._next = null, this._nextMin = null, this._edgeRing = null, this._minEdgeRing = null, this._depth = [0, -999, -999];
        var s = arguments[0], l = arguments[1];
        if (Oa.constructor_.call(this, s), this._isForward = l, l) this.init(s.getCoordinate(0), s.getCoordinate(1));
        else {
          var d = s.getNumPoints() - 1;
          this.init(s.getCoordinate(d), s.getCoordinate(d - 1));
        }
        this.computeDirectedLabel();
      } }, { key: "depthFactor", value: function(s, l) {
        return s === z.EXTERIOR && l === z.INTERIOR ? 1 : s === z.INTERIOR && l === z.EXTERIOR ? -1 : 0;
      } }]);
    }(Oa), Aa = function() {
      return h(function c() {
        o(this, c);
      }, [{ key: "createNode", value: function(c) {
        return new gi(c, null);
      } }]);
    }(), Ra = function() {
      return h(function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }, [{ key: "printEdges", value: function(c) {
        c.println("Edges:");
        for (var r = 0; r < this._edges.size(); r++) {
          c.println("edge " + r + ":");
          var s = this._edges.get(r);
          s.print(c), s.eiList.print(c);
        }
      } }, { key: "find", value: function(c) {
        return this._nodes.find(c);
      } }, { key: "addNode", value: function() {
        if (arguments[0] instanceof gi) {
          var c = arguments[0];
          return this._nodes.addNode(c);
        }
        if (arguments[0] instanceof Z) {
          var r = arguments[0];
          return this._nodes.addNode(r);
        }
      } }, { key: "getNodeIterator", value: function() {
        return this._nodes.iterator();
      } }, { key: "linkResultDirectedEdges", value: function() {
        for (var c = this._nodes.iterator(); c.hasNext(); )
          c.next().getEdges().linkResultDirectedEdges();
      } }, { key: "debugPrintln", value: function(c) {
        Mt.out.println(c);
      } }, { key: "isBoundaryNode", value: function(c, r) {
        var s = this._nodes.find(r);
        if (s === null) return !1;
        var l = s.getLabel();
        return l !== null && l.getLocation(c) === z.BOUNDARY;
      } }, { key: "linkAllDirectedEdges", value: function() {
        for (var c = this._nodes.iterator(); c.hasNext(); )
          c.next().getEdges().linkAllDirectedEdges();
      } }, { key: "matchInSameDirection", value: function(c, r, s, l) {
        return !!c.equals(s) && we.index(c, r, l) === we.COLLINEAR && dt.quadrant(c, r) === dt.quadrant(s, l);
      } }, { key: "getEdgeEnds", value: function() {
        return this._edgeEndList;
      } }, { key: "debugPrint", value: function(c) {
        Mt.out.print(c);
      } }, { key: "getEdgeIterator", value: function() {
        return this._edges.iterator();
      } }, { key: "findEdgeInSameDirection", value: function(c, r) {
        for (var s = 0; s < this._edges.size(); s++) {
          var l = this._edges.get(s), d = l.getCoordinates();
          if (this.matchInSameDirection(c, r, d[0], d[1]) || this.matchInSameDirection(c, r, d[d.length - 1], d[d.length - 2])) return l;
        }
        return null;
      } }, { key: "insertEdge", value: function(c) {
        this._edges.add(c);
      } }, { key: "findEdgeEnd", value: function(c) {
        for (var r = this.getEdgeEnds().iterator(); r.hasNext(); ) {
          var s = r.next();
          if (s.getEdge() === c) return s;
        }
        return null;
      } }, { key: "addEdges", value: function(c) {
        for (var r = c.iterator(); r.hasNext(); ) {
          var s = r.next();
          this._edges.add(s);
          var l = new Ts(s, !0), d = new Ts(s, !1);
          l.setSym(d), d.setSym(l), this.add(l), this.add(d);
        }
      } }, { key: "add", value: function(c) {
        this._nodes.add(c), this._edgeEndList.add(c);
      } }, { key: "getNodes", value: function() {
        return this._nodes.values();
      } }, { key: "findEdge", value: function(c, r) {
        for (var s = 0; s < this._edges.size(); s++) {
          var l = this._edges.get(s), d = l.getCoordinates();
          if (c.equals(d[0]) && r.equals(d[1])) return l;
        }
        return null;
      } }], [{ key: "constructor_", value: function() {
        if (this._edges = new me(), this._nodes = null, this._edgeEndList = new me(), arguments.length === 0) this._nodes = new Ta(new Aa());
        else if (arguments.length === 1) {
          var c = arguments[0];
          this._nodes = new Ta(c);
        }
      } }, { key: "linkResultDirectedEdges", value: function(c) {
        for (var r = c.iterator(); r.hasNext(); )
          r.next().getEdges().linkResultDirectedEdges();
      } }]);
    }(), Nf = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "sortShellsAndHoles", value: function(r, s, l) {
        for (var d = r.iterator(); d.hasNext(); ) {
          var y = d.next();
          y.isHole() ? l.add(y) : s.add(y);
        }
      } }, { key: "computePolygons", value: function(r) {
        for (var s = new me(), l = r.iterator(); l.hasNext(); ) {
          var d = l.next().toPolygon(this._geometryFactory);
          s.add(d);
        }
        return s;
      } }, { key: "placeFreeHoles", value: function(r, s) {
        for (var l = s.iterator(); l.hasNext(); ) {
          var d = l.next();
          if (d.getShell() === null) {
            var y = c.findEdgeRingContaining(d, r);
            if (y === null) throw new en("unable to assign hole to a shell", d.getCoordinate(0));
            d.setShell(y);
          }
        }
      } }, { key: "buildMinimalEdgeRings", value: function(r, s, l) {
        for (var d = new me(), y = r.iterator(); y.hasNext(); ) {
          var x = y.next();
          if (x.getMaxNodeDegree() > 2) {
            x.linkDirectedEdgesForMinimalEdgeRings();
            var E = x.buildMinimalRings(), L = this.findShell(E);
            L !== null ? (this.placePolygonHoles(L, E), s.add(L)) : l.addAll(E);
          } else d.add(x);
        }
        return d;
      } }, { key: "buildMaximalEdgeRings", value: function(r) {
        for (var s = new me(), l = r.iterator(); l.hasNext(); ) {
          var d = l.next();
          if (d.isInResult() && d.getLabel().isArea() && d.getEdgeRing() === null) {
            var y = new Pf(d, this._geometryFactory);
            s.add(y), y.setInResult();
          }
        }
        return s;
      } }, { key: "placePolygonHoles", value: function(r, s) {
        for (var l = s.iterator(); l.hasNext(); ) {
          var d = l.next();
          d.isHole() && d.setShell(r);
        }
      } }, { key: "getPolygons", value: function() {
        return this.computePolygons(this._shellList);
      } }, { key: "findShell", value: function(r) {
        for (var s = 0, l = null, d = r.iterator(); d.hasNext(); ) {
          var y = d.next();
          y.isHole() || (l = y, s++);
        }
        return ee.isTrue(s <= 1, "found two shells in MinimalEdgeRing list"), l;
      } }, { key: "add", value: function() {
        if (arguments.length === 1) {
          var r = arguments[0];
          this.add(r.getEdgeEnds(), r.getNodes());
        } else if (arguments.length === 2) {
          var s = arguments[0], l = arguments[1];
          Ra.linkResultDirectedEdges(l);
          var d = this.buildMaximalEdgeRings(s), y = new me(), x = this.buildMinimalEdgeRings(d, this._shellList, y);
          this.sortShellsAndHoles(x, this._shellList, y), this.placeFreeHoles(this._shellList, y);
        }
      } }], [{ key: "constructor_", value: function() {
        this._geometryFactory = null, this._shellList = new me();
        var r = arguments[0];
        this._geometryFactory = r;
      } }, { key: "findEdgeRingContaining", value: function(r, s) {
        for (var l = r.getLinearRing(), d = l.getEnvelopeInternal(), y = l.getCoordinateN(0), x = null, E = null, L = s.iterator(); L.hasNext(); ) {
          var F = L.next(), $ = F.getLinearRing(), K = $.getEnvelopeInternal();
          if (!K.equals(d) && K.contains(d)) {
            y = tt.ptNotInList(l.getCoordinates(), $.getCoordinates());
            var ne = !1;
            Ls.isInRing(y, $.getCoordinates()) && (ne = !0), ne && (x === null || E.contains(K)) && (E = (x = F).getLinearRing().getEnvelopeInternal());
          }
        }
        return x;
      } }]);
    }(), Da = function() {
      return h(function c() {
        o(this, c);
      }, [{ key: "getBounds", value: function() {
      } }]);
    }(), nn = function() {
      return h(function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }, [{ key: "getItem", value: function() {
        return this._item;
      } }, { key: "getBounds", value: function() {
        return this._bounds;
      } }, { key: "interfaces_", get: function() {
        return [Da, M];
      } }], [{ key: "constructor_", value: function() {
        this._bounds = null, this._item = null;
        var c = arguments[0], r = arguments[1];
        this._bounds = c, this._item = r;
      } }]);
    }(), di = function() {
      return h(function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }, [{ key: "poll", value: function() {
        if (this.isEmpty()) return null;
        var c = this._items.get(1);
        return this._items.set(1, this._items.get(this._size)), this._size -= 1, this.reorder(1), c;
      } }, { key: "size", value: function() {
        return this._size;
      } }, { key: "reorder", value: function(c) {
        for (var r = null, s = this._items.get(c); 2 * c <= this._size && ((r = 2 * c) !== this._size && this._items.get(r + 1).compareTo(this._items.get(r)) < 0 && r++, this._items.get(r).compareTo(s) < 0); c = r) this._items.set(c, this._items.get(r));
        this._items.set(c, s);
      } }, { key: "clear", value: function() {
        this._size = 0, this._items.clear();
      } }, { key: "peek", value: function() {
        return this.isEmpty() ? null : this._items.get(1);
      } }, { key: "isEmpty", value: function() {
        return this._size === 0;
      } }, { key: "add", value: function(c) {
        this._items.add(null), this._size += 1;
        var r = this._size;
        for (this._items.set(0, c); c.compareTo(this._items.get(Math.trunc(r / 2))) < 0; r /= 2) this._items.set(r, this._items.get(Math.trunc(r / 2)));
        this._items.set(r, c);
      } }], [{ key: "constructor_", value: function() {
        this._size = null, this._items = null, this._size = 0, this._items = new me(), this._items.add(null);
      } }]);
    }(), Tf = function() {
      return h(function c() {
        o(this, c);
      }, [{ key: "insert", value: function(c, r) {
      } }, { key: "remove", value: function(c, r) {
      } }, { key: "query", value: function() {
      } }]);
    }(), Lt = function() {
      return h(function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }, [{ key: "getLevel", value: function() {
        return this._level;
      } }, { key: "size", value: function() {
        return this._childBoundables.size();
      } }, { key: "getChildBoundables", value: function() {
        return this._childBoundables;
      } }, { key: "addChildBoundable", value: function(c) {
        ee.isTrue(this._bounds === null), this._childBoundables.add(c);
      } }, { key: "isEmpty", value: function() {
        return this._childBoundables.isEmpty();
      } }, { key: "getBounds", value: function() {
        return this._bounds === null && (this._bounds = this.computeBounds()), this._bounds;
      } }, { key: "interfaces_", get: function() {
        return [Da, M];
      } }], [{ key: "constructor_", value: function() {
        if (this._childBoundables = new me(), this._bounds = null, this._level = null, arguments.length !== 0) {
          if (arguments.length === 1) {
            var c = arguments[0];
            this._level = c;
          }
        }
      } }]);
    }(), Dn = { reverseOrder: function() {
      return { compare: function(c, r) {
        return r.compareTo(c);
      } };
    }, min: function(c) {
      return Dn.sort(c), c.get(0);
    }, sort: function(c, r) {
      var s = c.toArray();
      r ? wn.sort(s, r) : wn.sort(s);
      for (var l = c.iterator(), d = 0, y = s.length; d < y; d++) l.next(), l.set(s[d]);
    }, singletonList: function(c) {
      var r = new me();
      return r.add(c), r;
    } }, Of = function() {
      function c() {
        o(this, c);
      }
      return h(c, null, [{ key: "maxDistance", value: function(r, s, l, d, y, x, E, L) {
        var F = c.distance(r, s, y, x);
        return F = Math.max(F, c.distance(r, s, E, L)), F = Math.max(F, c.distance(l, d, y, x)), F = Math.max(F, c.distance(l, d, E, L));
      } }, { key: "distance", value: function(r, s, l, d) {
        var y = l - r, x = d - s;
        return Math.sqrt(y * y + x * x);
      } }, { key: "maximumDistance", value: function(r, s) {
        var l = Math.min(r.getMinX(), s.getMinX()), d = Math.min(r.getMinY(), s.getMinY()), y = Math.max(r.getMaxX(), s.getMaxX()), x = Math.max(r.getMaxY(), s.getMaxY());
        return c.distance(l, d, y, x);
      } }, { key: "minMaxDistance", value: function(r, s) {
        var l = r.getMinX(), d = r.getMinY(), y = r.getMaxX(), x = r.getMaxY(), E = s.getMinX(), L = s.getMinY(), F = s.getMaxX(), $ = s.getMaxY(), K = c.maxDistance(l, d, l, x, E, L, E, $);
        return K = Math.min(K, c.maxDistance(l, d, l, x, E, L, F, L)), K = Math.min(K, c.maxDistance(l, d, l, x, F, $, E, $)), K = Math.min(K, c.maxDistance(l, d, l, x, F, $, F, L)), K = Math.min(K, c.maxDistance(l, d, y, d, E, L, E, $)), K = Math.min(K, c.maxDistance(l, d, y, d, E, L, F, L)), K = Math.min(K, c.maxDistance(l, d, y, d, F, $, E, $)), K = Math.min(K, c.maxDistance(l, d, y, d, F, $, F, L)), K = Math.min(K, c.maxDistance(y, x, l, x, E, L, E, $)), K = Math.min(K, c.maxDistance(y, x, l, x, E, L, F, L)), K = Math.min(K, c.maxDistance(y, x, l, x, F, $, E, $)), K = Math.min(K, c.maxDistance(y, x, l, x, F, $, F, L)), K = Math.min(K, c.maxDistance(y, x, y, d, E, L, E, $)), K = Math.min(K, c.maxDistance(y, x, y, d, E, L, F, L)), K = Math.min(K, c.maxDistance(y, x, y, d, F, $, E, $)), K = Math.min(K, c.maxDistance(y, x, y, d, F, $, F, L));
      } }]);
    }(), Fn = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "maximumDistance", value: function() {
        return Of.maximumDistance(this._boundable1.getBounds(), this._boundable2.getBounds());
      } }, { key: "expandToQueue", value: function(r, s) {
        var l = c.isComposite(this._boundable1), d = c.isComposite(this._boundable2);
        if (l && d) return c.area(this._boundable1) > c.area(this._boundable2) ? (this.expand(this._boundable1, this._boundable2, !1, r, s), null) : (this.expand(this._boundable2, this._boundable1, !0, r, s), null);
        if (l) return this.expand(this._boundable1, this._boundable2, !1, r, s), null;
        if (d) return this.expand(this._boundable2, this._boundable1, !0, r, s), null;
        throw new R("neither boundable is composite");
      } }, { key: "isLeaves", value: function() {
        return !(c.isComposite(this._boundable1) || c.isComposite(this._boundable2));
      } }, { key: "compareTo", value: function(r) {
        var s = r;
        return this._distance < s._distance ? -1 : this._distance > s._distance ? 1 : 0;
      } }, { key: "expand", value: function(r, s, l, d, y) {
        for (var x = r.getChildBoundables().iterator(); x.hasNext(); ) {
          var E = x.next(), L = null;
          (L = l ? new c(s, E, this._itemDistance) : new c(E, s, this._itemDistance)).getDistance() < y && d.add(L);
        }
      } }, { key: "getBoundable", value: function(r) {
        return r === 0 ? this._boundable1 : this._boundable2;
      } }, { key: "getDistance", value: function() {
        return this._distance;
      } }, { key: "distance", value: function() {
        return this.isLeaves() ? this._itemDistance.distance(this._boundable1, this._boundable2) : this._boundable1.getBounds().distance(this._boundable2.getBounds());
      } }, { key: "interfaces_", get: function() {
        return [V];
      } }], [{ key: "constructor_", value: function() {
        this._boundable1 = null, this._boundable2 = null, this._distance = null, this._itemDistance = null;
        var r = arguments[0], s = arguments[1], l = arguments[2];
        this._boundable1 = r, this._boundable2 = s, this._itemDistance = l, this._distance = this.distance();
      } }, { key: "area", value: function(r) {
        return r.getBounds().getArea();
      } }, { key: "isComposite", value: function(r) {
        return r instanceof Lt;
      } }]);
    }(), Fa = function() {
      return h(function c() {
        o(this, c);
      }, [{ key: "visitItem", value: function(c) {
      } }]);
    }(), Bn = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "queryInternal", value: function() {
        if (Ee(arguments[2], Fa) && arguments[0] instanceof Object && arguments[1] instanceof Lt) for (var r = arguments[0], s = arguments[2], l = arguments[1].getChildBoundables(), d = 0; d < l.size(); d++) {
          var y = l.get(d);
          this.getIntersectsOp().intersects(y.getBounds(), r) && (y instanceof Lt ? this.queryInternal(r, y, s) : y instanceof nn ? s.visitItem(y.getItem()) : ee.shouldNeverReachHere());
        }
        else if (Ee(arguments[2], jt) && arguments[0] instanceof Object && arguments[1] instanceof Lt) for (var x = arguments[0], E = arguments[2], L = arguments[1].getChildBoundables(), F = 0; F < L.size(); F++) {
          var $ = L.get(F);
          this.getIntersectsOp().intersects($.getBounds(), x) && ($ instanceof Lt ? this.queryInternal(x, $, E) : $ instanceof nn ? E.add($.getItem()) : ee.shouldNeverReachHere());
        }
      } }, { key: "getNodeCapacity", value: function() {
        return this._nodeCapacity;
      } }, { key: "lastNode", value: function(r) {
        return r.get(r.size() - 1);
      } }, { key: "size", value: function() {
        if (arguments.length === 0) return this.isEmpty() ? 0 : (this.build(), this.size(this._root));
        if (arguments.length === 1) {
          for (var r = 0, s = arguments[0].getChildBoundables().iterator(); s.hasNext(); ) {
            var l = s.next();
            l instanceof Lt ? r += this.size(l) : l instanceof nn && (r += 1);
          }
          return r;
        }
      } }, { key: "removeItem", value: function(r, s) {
        for (var l = null, d = r.getChildBoundables().iterator(); d.hasNext(); ) {
          var y = d.next();
          y instanceof nn && y.getItem() === s && (l = y);
        }
        return l !== null && (r.getChildBoundables().remove(l), !0);
      } }, { key: "itemsTree", value: function() {
        if (arguments.length === 0) {
          this.build();
          var r = this.itemsTree(this._root);
          return r === null ? new me() : r;
        }
        if (arguments.length === 1) {
          for (var s = arguments[0], l = new me(), d = s.getChildBoundables().iterator(); d.hasNext(); ) {
            var y = d.next();
            if (y instanceof Lt) {
              var x = this.itemsTree(y);
              x !== null && l.add(x);
            } else y instanceof nn ? l.add(y.getItem()) : ee.shouldNeverReachHere();
          }
          return l.size() <= 0 ? null : l;
        }
      } }, { key: "insert", value: function(r, s) {
        ee.isTrue(!this._built, "Cannot insert items into an STR packed R-tree after it has been built."), this._itemBoundables.add(new nn(r, s));
      } }, { key: "boundablesAtLevel", value: function() {
        if (arguments.length === 1) {
          var r = arguments[0], s = new me();
          return this.boundablesAtLevel(r, this._root, s), s;
        }
        if (arguments.length === 3) {
          var l = arguments[0], d = arguments[1], y = arguments[2];
          if (ee.isTrue(l > -2), d.getLevel() === l) return y.add(d), null;
          for (var x = d.getChildBoundables().iterator(); x.hasNext(); ) {
            var E = x.next();
            E instanceof Lt ? this.boundablesAtLevel(l, E, y) : (ee.isTrue(E instanceof nn), l === -1 && y.add(E));
          }
          return null;
        }
      } }, { key: "query", value: function() {
        if (arguments.length === 1) {
          var r = arguments[0];
          this.build();
          var s = new me();
          return this.isEmpty() || this.getIntersectsOp().intersects(this._root.getBounds(), r) && this.queryInternal(r, this._root, s), s;
        }
        if (arguments.length === 2) {
          var l = arguments[0], d = arguments[1];
          if (this.build(), this.isEmpty()) return null;
          this.getIntersectsOp().intersects(this._root.getBounds(), l) && this.queryInternal(l, this._root, d);
        }
      } }, { key: "build", value: function() {
        if (this._built) return null;
        this._root = this._itemBoundables.isEmpty() ? this.createNode(0) : this.createHigherLevels(this._itemBoundables, -1), this._itemBoundables = null, this._built = !0;
      } }, { key: "getRoot", value: function() {
        return this.build(), this._root;
      } }, { key: "remove", value: function() {
        if (arguments.length === 2) {
          var r = arguments[0], s = arguments[1];
          return this.build(), !!this.getIntersectsOp().intersects(this._root.getBounds(), r) && this.remove(r, this._root, s);
        }
        if (arguments.length === 3) {
          var l = arguments[0], d = arguments[1], y = arguments[2], x = this.removeItem(d, y);
          if (x) return !0;
          for (var E = null, L = d.getChildBoundables().iterator(); L.hasNext(); ) {
            var F = L.next();
            if (this.getIntersectsOp().intersects(F.getBounds(), l) && F instanceof Lt && (x = this.remove(l, F, y))) {
              E = F;
              break;
            }
          }
          return E !== null && E.getChildBoundables().isEmpty() && d.getChildBoundables().remove(E), x;
        }
      } }, { key: "createHigherLevels", value: function(r, s) {
        ee.isTrue(!r.isEmpty());
        var l = this.createParentBoundables(r, s + 1);
        return l.size() === 1 ? l.get(0) : this.createHigherLevels(l, s + 1);
      } }, { key: "depth", value: function() {
        if (arguments.length === 0) return this.isEmpty() ? 0 : (this.build(), this.depth(this._root));
        if (arguments.length === 1) {
          for (var r = 0, s = arguments[0].getChildBoundables().iterator(); s.hasNext(); ) {
            var l = s.next();
            if (l instanceof Lt) {
              var d = this.depth(l);
              d > r && (r = d);
            }
          }
          return r + 1;
        }
      } }, { key: "createParentBoundables", value: function(r, s) {
        ee.isTrue(!r.isEmpty());
        var l = new me();
        l.add(this.createNode(s));
        var d = new me(r);
        Dn.sort(d, this.getComparator());
        for (var y = d.iterator(); y.hasNext(); ) {
          var x = y.next();
          this.lastNode(l).getChildBoundables().size() === this.getNodeCapacity() && l.add(this.createNode(s)), this.lastNode(l).addChildBoundable(x);
        }
        return l;
      } }, { key: "isEmpty", value: function() {
        return this._built ? this._root.isEmpty() : this._itemBoundables.isEmpty();
      } }, { key: "interfaces_", get: function() {
        return [M];
      } }], [{ key: "constructor_", value: function() {
        if (this._root = null, this._built = !1, this._itemBoundables = new me(), this._nodeCapacity = null, arguments.length === 0) c.constructor_.call(this, c.DEFAULT_NODE_CAPACITY);
        else if (arguments.length === 1) {
          var r = arguments[0];
          ee.isTrue(r > 1, "Node capacity must be greater than 1"), this._nodeCapacity = r;
        }
      } }, { key: "compareDoubles", value: function(r, s) {
        return r > s ? 1 : r < s ? -1 : 0;
      } }]);
    }();
    Bn.IntersectsOp = function() {
    }, Bn.DEFAULT_NODE_CAPACITY = 10;
    var Af = function() {
      return h(function c() {
        o(this, c);
      }, [{ key: "distance", value: function(c, r) {
      } }]);
    }(), Vt = function(c) {
      function r() {
        var s;
        return o(this, r), s = i(this, r), r.constructor_.apply(s, arguments), s;
      }
      return v(r, c), h(r, [{ key: "createParentBoundablesFromVerticalSlices", value: function(s, l) {
        ee.isTrue(s.length > 0);
        for (var d = new me(), y = 0; y < s.length; y++) d.addAll(this.createParentBoundablesFromVerticalSlice(s[y], l));
        return d;
      } }, { key: "nearestNeighbourK", value: function() {
        if (arguments.length === 2) {
          var s = arguments[0], l = arguments[1];
          return this.nearestNeighbourK(s, W.POSITIVE_INFINITY, l);
        }
        if (arguments.length === 3) {
          var d = arguments[0], y = arguments[2], x = arguments[1], E = new di();
          E.add(d);
          for (var L = new di(); !E.isEmpty() && x >= 0; ) {
            var F = E.poll(), $ = F.getDistance();
            if ($ >= x) break;
            F.isLeaves() ? L.size() < y ? L.add(F) : (L.peek().getDistance() > $ && (L.poll(), L.add(F)), x = L.peek().getDistance()) : F.expandToQueue(E, x);
          }
          return r.getItems(L);
        }
      } }, { key: "createNode", value: function(s) {
        return new Ba(s);
      } }, { key: "size", value: function() {
        return arguments.length === 0 ? w(r, "size", this, 1).call(this) : w(r, "size", this, 1).apply(this, arguments);
      } }, { key: "insert", value: function() {
        if (!(arguments.length === 2 && arguments[1] instanceof Object && arguments[0] instanceof _e)) return w(r, "insert", this, 1).apply(this, arguments);
        var s = arguments[0], l = arguments[1];
        if (s.isNull()) return null;
        w(r, "insert", this, 1).call(this, s, l);
      } }, { key: "getIntersectsOp", value: function() {
        return r.intersectsOp;
      } }, { key: "verticalSlices", value: function(s, l) {
        for (var d = Math.trunc(Math.ceil(s.size() / l)), y = new Array(l).fill(null), x = s.iterator(), E = 0; E < l; E++) {
          y[E] = new me();
          for (var L = 0; x.hasNext() && L < d; ) {
            var F = x.next();
            y[E].add(F), L++;
          }
        }
        return y;
      } }, { key: "query", value: function() {
        if (arguments.length === 1) {
          var s = arguments[0];
          return w(r, "query", this, 1).call(this, s);
        }
        if (arguments.length === 2) {
          var l = arguments[0], d = arguments[1];
          w(r, "query", this, 1).call(this, l, d);
        }
      } }, { key: "getComparator", value: function() {
        return r.yComparator;
      } }, { key: "createParentBoundablesFromVerticalSlice", value: function(s, l) {
        return w(r, "createParentBoundables", this, 1).call(this, s, l);
      } }, { key: "remove", value: function() {
        if (arguments.length === 2 && arguments[1] instanceof Object && arguments[0] instanceof _e) {
          var s = arguments[0], l = arguments[1];
          return w(r, "remove", this, 1).call(this, s, l);
        }
        return w(r, "remove", this, 1).apply(this, arguments);
      } }, { key: "depth", value: function() {
        return arguments.length === 0 ? w(r, "depth", this, 1).call(this) : w(r, "depth", this, 1).apply(this, arguments);
      } }, { key: "createParentBoundables", value: function(s, l) {
        ee.isTrue(!s.isEmpty());
        var d = Math.trunc(Math.ceil(s.size() / this.getNodeCapacity())), y = new me(s);
        Dn.sort(y, r.xComparator);
        var x = this.verticalSlices(y, Math.trunc(Math.ceil(Math.sqrt(d))));
        return this.createParentBoundablesFromVerticalSlices(x, l);
      } }, { key: "nearestNeighbour", value: function() {
        if (arguments.length === 1) {
          if (Ee(arguments[0], Af)) {
            var s = arguments[0];
            if (this.isEmpty()) return null;
            var l = new Fn(this.getRoot(), this.getRoot(), s);
            return this.nearestNeighbour(l);
          }
          if (arguments[0] instanceof Fn) {
            var d = arguments[0], y = W.POSITIVE_INFINITY, x = null, E = new di();
            for (E.add(d); !E.isEmpty() && y > 0; ) {
              var L = E.poll(), F = L.getDistance();
              if (F >= y) break;
              L.isLeaves() ? (y = F, x = L) : L.expandToQueue(E, y);
            }
            return x === null ? null : [x.getBoundable(0).getItem(), x.getBoundable(1).getItem()];
          }
        } else {
          if (arguments.length === 2) {
            var $ = arguments[0], K = arguments[1];
            if (this.isEmpty() || $.isEmpty()) return null;
            var ne = new Fn(this.getRoot(), $.getRoot(), K);
            return this.nearestNeighbour(ne);
          }
          if (arguments.length === 3) {
            var ue = arguments[2], he = new nn(arguments[0], arguments[1]), ge = new Fn(this.getRoot(), he, ue);
            return this.nearestNeighbour(ge)[0];
          }
          if (arguments.length === 4) {
            var Oe = arguments[2], Le = arguments[3], Ye = new nn(arguments[0], arguments[1]), st = new Fn(this.getRoot(), Ye, Oe);
            return this.nearestNeighbourK(st, Le);
          }
        }
      } }, { key: "isWithinDistance", value: function() {
        if (arguments.length === 2) {
          var s = arguments[0], l = arguments[1], d = W.POSITIVE_INFINITY, y = new di();
          for (y.add(s); !y.isEmpty(); ) {
            var x = y.poll(), E = x.getDistance();
            if (E > l) return !1;
            if (x.maximumDistance() <= l) return !0;
            if (x.isLeaves()) {
              if ((d = E) <= l) return !0;
            } else x.expandToQueue(y, d);
          }
          return !1;
        }
        if (arguments.length === 3) {
          var L = arguments[0], F = arguments[1], $ = arguments[2], K = new Fn(this.getRoot(), L.getRoot(), F);
          return this.isWithinDistance(K, $);
        }
      } }, { key: "interfaces_", get: function() {
        return [Tf, M];
      } }], [{ key: "constructor_", value: function() {
        if (arguments.length === 0) r.constructor_.call(this, r.DEFAULT_NODE_CAPACITY);
        else if (arguments.length === 1) {
          var s = arguments[0];
          Bn.constructor_.call(this, s);
        }
      } }, { key: "centreX", value: function(s) {
        return r.avg(s.getMinX(), s.getMaxX());
      } }, { key: "avg", value: function(s, l) {
        return (s + l) / 2;
      } }, { key: "getItems", value: function(s) {
        for (var l = new Array(s.size()).fill(null), d = 0; !s.isEmpty(); ) {
          var y = s.poll();
          l[d] = y.getBoundable(0).getItem(), d++;
        }
        return l;
      } }, { key: "centreY", value: function(s) {
        return r.avg(s.getMinY(), s.getMaxY());
      } }]);
    }(Bn), Ba = function(c) {
      function r() {
        var s;
        return o(this, r), s = i(this, r), r.constructor_.apply(s, arguments), s;
      }
      return v(r, c), h(r, [{ key: "computeBounds", value: function() {
        for (var s = null, l = this.getChildBoundables().iterator(); l.hasNext(); ) {
          var d = l.next();
          s === null ? s = new _e(d.getBounds()) : s.expandToInclude(d.getBounds());
        }
        return s;
      } }], [{ key: "constructor_", value: function() {
        var s = arguments[0];
        Lt.constructor_.call(this, s);
      } }]);
    }(Lt);
    Vt.STRtreeNode = Ba, Vt.xComparator = new (function() {
      return h(function c() {
        o(this, c);
      }, [{ key: "interfaces_", get: function() {
        return [j];
      } }, { key: "compare", value: function(c, r) {
        return Bn.compareDoubles(Vt.centreX(c.getBounds()), Vt.centreX(r.getBounds()));
      } }]);
    }())(), Vt.yComparator = new (function() {
      return h(function c() {
        o(this, c);
      }, [{ key: "interfaces_", get: function() {
        return [j];
      } }, { key: "compare", value: function(c, r) {
        return Bn.compareDoubles(Vt.centreY(c.getBounds()), Vt.centreY(r.getBounds()));
      } }]);
    }())(), Vt.intersectsOp = new (function() {
      return h(function c() {
        o(this, c);
      }, [{ key: "interfaces_", get: function() {
        return [IntersectsOp];
      } }, { key: "intersects", value: function(c, r) {
        return c.intersects(r);
      } }]);
    }())(), Vt.DEFAULT_NODE_CAPACITY = 10;
    var Rf = function() {
      function c() {
        o(this, c);
      }
      return h(c, null, [{ key: "relativeSign", value: function(r, s) {
        return r < s ? -1 : r > s ? 1 : 0;
      } }, { key: "compare", value: function(r, s, l) {
        if (s.equals2D(l)) return 0;
        var d = c.relativeSign(s.x, l.x), y = c.relativeSign(s.y, l.y);
        switch (r) {
          case 0:
            return c.compareValue(d, y);
          case 1:
            return c.compareValue(y, d);
          case 2:
            return c.compareValue(y, -d);
          case 3:
            return c.compareValue(-d, y);
          case 4:
            return c.compareValue(-d, -y);
          case 5:
            return c.compareValue(-y, -d);
          case 6:
            return c.compareValue(-y, d);
          case 7:
            return c.compareValue(d, -y);
        }
        return ee.shouldNeverReachHere("invalid octant value"), 0;
      } }, { key: "compareValue", value: function(r, s) {
        return r < 0 ? -1 : r > 0 ? 1 : s < 0 ? -1 : s > 0 ? 1 : 0;
      } }]);
    }(), Df = function() {
      return h(function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }, [{ key: "getCoordinate", value: function() {
        return this.coord;
      } }, { key: "print", value: function(c) {
        c.print(this.coord), c.print(" seg # = " + this.segmentIndex);
      } }, { key: "compareTo", value: function(c) {
        var r = c;
        return this.segmentIndex < r.segmentIndex ? -1 : this.segmentIndex > r.segmentIndex ? 1 : this.coord.equals2D(r.coord) ? 0 : this._isInterior ? r._isInterior ? Rf.compare(this._segmentOctant, this.coord, r.coord) : 1 : -1;
      } }, { key: "isEndPoint", value: function(c) {
        return this.segmentIndex === 0 && !this._isInterior || this.segmentIndex === c;
      } }, { key: "toString", value: function() {
        return this.segmentIndex + ":" + this.coord.toString();
      } }, { key: "isInterior", value: function() {
        return this._isInterior;
      } }, { key: "interfaces_", get: function() {
        return [V];
      } }], [{ key: "constructor_", value: function() {
        this._segString = null, this.coord = null, this.segmentIndex = null, this._segmentOctant = null, this._isInterior = null;
        var c = arguments[0], r = arguments[1], s = arguments[2], l = arguments[3];
        this._segString = c, this.coord = new Z(r), this.segmentIndex = s, this._segmentOctant = l, this._isInterior = !r.equals2D(c.getCoordinate(s));
      } }]);
    }(), Ff = function() {
      return h(function c() {
        o(this, c);
      }, [{ key: "hasNext", value: function() {
      } }, { key: "next", value: function() {
      } }, { key: "remove", value: function() {
      } }]);
    }(), Bf = function() {
      return h(function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }, [{ key: "getSplitCoordinates", value: function() {
        var c = new fr();
        this.addEndpoints();
        for (var r = this.iterator(), s = r.next(); r.hasNext(); ) {
          var l = r.next();
          this.addEdgeCoordinates(s, l, c), s = l;
        }
        return c.toCoordinateArray();
      } }, { key: "addCollapsedNodes", value: function() {
        var c = new me();
        this.findCollapsesFromInsertedNodes(c), this.findCollapsesFromExistingVertices(c);
        for (var r = c.iterator(); r.hasNext(); ) {
          var s = r.next().intValue();
          this.add(this._edge.getCoordinate(s), s);
        }
      } }, { key: "createSplitEdgePts", value: function(c, r) {
        var s = r.segmentIndex - c.segmentIndex + 2;
        if (s === 2) return [new Z(c.coord), new Z(r.coord)];
        var l = this._edge.getCoordinate(r.segmentIndex), d = r.isInterior() || !r.coord.equals2D(l);
        d || s--;
        var y = new Array(s).fill(null), x = 0;
        y[x++] = new Z(c.coord);
        for (var E = c.segmentIndex + 1; E <= r.segmentIndex; E++) y[x++] = this._edge.getCoordinate(E);
        return d && (y[x] = new Z(r.coord)), y;
      } }, { key: "print", value: function(c) {
        c.println("Intersections:");
        for (var r = this.iterator(); r.hasNext(); )
          r.next().print(c);
      } }, { key: "findCollapsesFromExistingVertices", value: function(c) {
        for (var r = 0; r < this._edge.size() - 2; r++) {
          var s = this._edge.getCoordinate(r);
          this._edge.getCoordinate(r + 1);
          var l = this._edge.getCoordinate(r + 2);
          s.equals2D(l) && c.add(gn.valueOf(r + 1));
        }
      } }, { key: "addEdgeCoordinates", value: function(c, r, s) {
        var l = this.createSplitEdgePts(c, r);
        s.add(l, !1);
      } }, { key: "iterator", value: function() {
        return this._nodeMap.values().iterator();
      } }, { key: "addSplitEdges", value: function(c) {
        this.addEndpoints(), this.addCollapsedNodes();
        for (var r = this.iterator(), s = r.next(); r.hasNext(); ) {
          var l = r.next(), d = this.createSplitEdge(s, l);
          c.add(d), s = l;
        }
      } }, { key: "findCollapseIndex", value: function(c, r, s) {
        if (!c.coord.equals2D(r.coord)) return !1;
        var l = r.segmentIndex - c.segmentIndex;
        return r.isInterior() || l--, l === 1 && (s[0] = c.segmentIndex + 1, !0);
      } }, { key: "findCollapsesFromInsertedNodes", value: function(c) {
        for (var r = new Array(1).fill(null), s = this.iterator(), l = s.next(); s.hasNext(); ) {
          var d = s.next();
          this.findCollapseIndex(l, d, r) && c.add(gn.valueOf(r[0])), l = d;
        }
      } }, { key: "getEdge", value: function() {
        return this._edge;
      } }, { key: "addEndpoints", value: function() {
        var c = this._edge.size() - 1;
        this.add(this._edge.getCoordinate(0), 0), this.add(this._edge.getCoordinate(c), c);
      } }, { key: "createSplitEdge", value: function(c, r) {
        var s = this.createSplitEdgePts(c, r);
        return new Cn(s, this._edge.getData());
      } }, { key: "add", value: function(c, r) {
        var s = new Df(this._edge, c, r, this._edge.getSegmentOctant(r)), l = this._nodeMap.get(s);
        return l !== null ? (ee.isTrue(l.coord.equals2D(c), "Found equal nodes with different coordinates"), l) : (this._nodeMap.put(s, s), s);
      } }, { key: "checkSplitEdgesCorrectness", value: function(c) {
        var r = this._edge.getCoordinates(), s = c.get(0).getCoordinate(0);
        if (!s.equals2D(r[0])) throw new J("bad split edge start point at " + s);
        var l = c.get(c.size() - 1).getCoordinates(), d = l[l.length - 1];
        if (!d.equals2D(r[r.length - 1])) throw new J("bad split edge end point at " + d);
      } }], [{ key: "constructor_", value: function() {
        this._nodeMap = new vr(), this._edge = null;
        var c = arguments[0];
        this._edge = c;
      } }]);
    }(), Gf = function() {
      function c() {
        o(this, c);
      }
      return h(c, null, [{ key: "octant", value: function() {
        if (typeof arguments[0] == "number" && typeof arguments[1] == "number") {
          var r = arguments[0], s = arguments[1];
          if (r === 0 && s === 0) throw new R("Cannot compute the octant for point ( " + r + ", " + s + " )");
          var l = Math.abs(r), d = Math.abs(s);
          return r >= 0 ? s >= 0 ? l >= d ? 0 : 1 : l >= d ? 7 : 6 : s >= 0 ? l >= d ? 3 : 2 : l >= d ? 4 : 5;
        }
        if (arguments[0] instanceof Z && arguments[1] instanceof Z) {
          var y = arguments[0], x = arguments[1], E = x.x - y.x, L = x.y - y.y;
          if (E === 0 && L === 0) throw new R("Cannot compute the octant for two identical points " + y);
          return c.octant(E, L);
        }
      } }]);
    }(), qf = function() {
      return h(function c() {
        o(this, c);
      }, [{ key: "getCoordinates", value: function() {
      } }, { key: "size", value: function() {
      } }, { key: "getCoordinate", value: function(c) {
      } }, { key: "isClosed", value: function() {
      } }, { key: "setData", value: function(c) {
      } }, { key: "getData", value: function() {
      } }]);
    }(), zf = function() {
      return h(function c() {
        o(this, c);
      }, [{ key: "addIntersection", value: function(c, r) {
      } }, { key: "interfaces_", get: function() {
        return [qf];
      } }]);
    }(), Cn = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "getCoordinates", value: function() {
        return this._pts;
      } }, { key: "size", value: function() {
        return this._pts.length;
      } }, { key: "getCoordinate", value: function(r) {
        return this._pts[r];
      } }, { key: "isClosed", value: function() {
        return this._pts[0].equals(this._pts[this._pts.length - 1]);
      } }, { key: "getSegmentOctant", value: function(r) {
        return r === this._pts.length - 1 ? -1 : this.safeOctant(this.getCoordinate(r), this.getCoordinate(r + 1));
      } }, { key: "setData", value: function(r) {
        this._data = r;
      } }, { key: "safeOctant", value: function(r, s) {
        return r.equals2D(s) ? 0 : Gf.octant(r, s);
      } }, { key: "getData", value: function() {
        return this._data;
      } }, { key: "addIntersection", value: function() {
        if (arguments.length === 2) {
          var r = arguments[0], s = arguments[1];
          this.addIntersectionNode(r, s);
        } else if (arguments.length === 4) {
          var l = arguments[1], d = arguments[3], y = new Z(arguments[0].getIntersection(d));
          this.addIntersection(y, l);
        }
      } }, { key: "toString", value: function() {
        return Ps.toLineString(new gr(this._pts));
      } }, { key: "getNodeList", value: function() {
        return this._nodeList;
      } }, { key: "addIntersectionNode", value: function(r, s) {
        var l = s, d = l + 1;
        if (d < this._pts.length) {
          var y = this._pts[d];
          r.equals2D(y) && (l = d);
        }
        return this._nodeList.add(r, l);
      } }, { key: "addIntersections", value: function(r, s, l) {
        for (var d = 0; d < r.getIntersectionNum(); d++) this.addIntersection(r, s, l, d);
      } }, { key: "interfaces_", get: function() {
        return [zf];
      } }], [{ key: "constructor_", value: function() {
        this._nodeList = new Bf(this), this._pts = null, this._data = null;
        var r = arguments[0], s = arguments[1];
        this._pts = r, this._data = s;
      } }, { key: "getNodedSubstrings", value: function() {
        if (arguments.length === 1) {
          var r = arguments[0], s = new me();
          return c.getNodedSubstrings(r, s), s;
        }
        if (arguments.length === 2) for (var l = arguments[1], d = arguments[0].iterator(); d.hasNext(); )
          d.next().getNodeList().addSplitEdges(l);
      } }]);
    }(), kt = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "minX", value: function() {
        return Math.min(this.p0.x, this.p1.x);
      } }, { key: "orientationIndex", value: function() {
        if (arguments[0] instanceof c) {
          var r = arguments[0], s = we.index(this.p0, this.p1, r.p0), l = we.index(this.p0, this.p1, r.p1);
          return s >= 0 && l >= 0 || s <= 0 && l <= 0 ? Math.max(s, l) : 0;
        }
        if (arguments[0] instanceof Z) {
          var d = arguments[0];
          return we.index(this.p0, this.p1, d);
        }
      } }, { key: "toGeometry", value: function(r) {
        return r.createLineString([this.p0, this.p1]);
      } }, { key: "isVertical", value: function() {
        return this.p0.x === this.p1.x;
      } }, { key: "equals", value: function(r) {
        if (!(r instanceof c)) return !1;
        var s = r;
        return this.p0.equals(s.p0) && this.p1.equals(s.p1);
      } }, { key: "intersection", value: function(r) {
        var s = new kn();
        return s.computeIntersection(this.p0, this.p1, r.p0, r.p1), s.hasIntersection() ? s.getIntersection(0) : null;
      } }, { key: "project", value: function() {
        if (arguments[0] instanceof Z) {
          var r = arguments[0];
          if (r.equals(this.p0) || r.equals(this.p1)) return new Z(r);
          var s = this.projectionFactor(r), l = new Z();
          return l.x = this.p0.x + s * (this.p1.x - this.p0.x), l.y = this.p0.y + s * (this.p1.y - this.p0.y), l;
        }
        if (arguments[0] instanceof c) {
          var d = arguments[0], y = this.projectionFactor(d.p0), x = this.projectionFactor(d.p1);
          if (y >= 1 && x >= 1 || y <= 0 && x <= 0) return null;
          var E = this.project(d.p0);
          y < 0 && (E = this.p0), y > 1 && (E = this.p1);
          var L = this.project(d.p1);
          return x < 0 && (L = this.p0), x > 1 && (L = this.p1), new c(E, L);
        }
      } }, { key: "normalize", value: function() {
        this.p1.compareTo(this.p0) < 0 && this.reverse();
      } }, { key: "angle", value: function() {
        return Math.atan2(this.p1.y - this.p0.y, this.p1.x - this.p0.x);
      } }, { key: "getCoordinate", value: function(r) {
        return r === 0 ? this.p0 : this.p1;
      } }, { key: "distancePerpendicular", value: function(r) {
        return Ut.pointToLinePerpendicular(r, this.p0, this.p1);
      } }, { key: "minY", value: function() {
        return Math.min(this.p0.y, this.p1.y);
      } }, { key: "midPoint", value: function() {
        return c.midPoint(this.p0, this.p1);
      } }, { key: "projectionFactor", value: function(r) {
        if (r.equals(this.p0)) return 0;
        if (r.equals(this.p1)) return 1;
        var s = this.p1.x - this.p0.x, l = this.p1.y - this.p0.y, d = s * s + l * l;
        return d <= 0 ? W.NaN : ((r.x - this.p0.x) * s + (r.y - this.p0.y) * l) / d;
      } }, { key: "closestPoints", value: function(r) {
        var s = this.intersection(r);
        if (s !== null) return [s, s];
        var l = new Array(2).fill(null), d = W.MAX_VALUE, y = null, x = this.closestPoint(r.p0);
        d = x.distance(r.p0), l[0] = x, l[1] = r.p0;
        var E = this.closestPoint(r.p1);
        (y = E.distance(r.p1)) < d && (d = y, l[0] = E, l[1] = r.p1);
        var L = r.closestPoint(this.p0);
        (y = L.distance(this.p0)) < d && (d = y, l[0] = this.p0, l[1] = L);
        var F = r.closestPoint(this.p1);
        return (y = F.distance(this.p1)) < d && (d = y, l[0] = this.p1, l[1] = F), l;
      } }, { key: "closestPoint", value: function(r) {
        var s = this.projectionFactor(r);
        return s > 0 && s < 1 ? this.project(r) : this.p0.distance(r) < this.p1.distance(r) ? this.p0 : this.p1;
      } }, { key: "maxX", value: function() {
        return Math.max(this.p0.x, this.p1.x);
      } }, { key: "getLength", value: function() {
        return this.p0.distance(this.p1);
      } }, { key: "compareTo", value: function(r) {
        var s = r, l = this.p0.compareTo(s.p0);
        return l !== 0 ? l : this.p1.compareTo(s.p1);
      } }, { key: "reverse", value: function() {
        var r = this.p0;
        this.p0 = this.p1, this.p1 = r;
      } }, { key: "equalsTopo", value: function(r) {
        return this.p0.equals(r.p0) && this.p1.equals(r.p1) || this.p0.equals(r.p1) && this.p1.equals(r.p0);
      } }, { key: "lineIntersection", value: function(r) {
        return xs.intersection(this.p0, this.p1, r.p0, r.p1);
      } }, { key: "maxY", value: function() {
        return Math.max(this.p0.y, this.p1.y);
      } }, { key: "pointAlongOffset", value: function(r, s) {
        var l = this.p0.x + r * (this.p1.x - this.p0.x), d = this.p0.y + r * (this.p1.y - this.p0.y), y = this.p1.x - this.p0.x, x = this.p1.y - this.p0.y, E = Math.sqrt(y * y + x * x), L = 0, F = 0;
        if (s !== 0) {
          if (E <= 0) throw new IllegalStateException("Cannot compute offset from zero-length line segment");
          L = s * y / E, F = s * x / E;
        }
        return new Z(l - F, d + L);
      } }, { key: "setCoordinates", value: function() {
        if (arguments.length === 1) {
          var r = arguments[0];
          this.setCoordinates(r.p0, r.p1);
        } else if (arguments.length === 2) {
          var s = arguments[0], l = arguments[1];
          this.p0.x = s.x, this.p0.y = s.y, this.p1.x = l.x, this.p1.y = l.y;
        }
      } }, { key: "segmentFraction", value: function(r) {
        var s = this.projectionFactor(r);
        return s < 0 ? s = 0 : (s > 1 || W.isNaN(s)) && (s = 1), s;
      } }, { key: "toString", value: function() {
        return "LINESTRING( " + this.p0.x + " " + this.p0.y + ", " + this.p1.x + " " + this.p1.y + ")";
      } }, { key: "isHorizontal", value: function() {
        return this.p0.y === this.p1.y;
      } }, { key: "reflect", value: function(r) {
        var s = this.p1.getY() - this.p0.getY(), l = this.p0.getX() - this.p1.getX(), d = this.p0.getY() * (this.p1.getX() - this.p0.getX()) - this.p0.getX() * (this.p1.getY() - this.p0.getY()), y = s * s + l * l, x = s * s - l * l, E = r.getX(), L = r.getY();
        return new Z((-x * E - 2 * s * l * L - 2 * s * d) / y, (x * L - 2 * s * l * E - 2 * l * d) / y);
      } }, { key: "distance", value: function() {
        if (arguments[0] instanceof c) {
          var r = arguments[0];
          return Ut.segmentToSegment(this.p0, this.p1, r.p0, r.p1);
        }
        if (arguments[0] instanceof Z) {
          var s = arguments[0];
          return Ut.pointToSegment(s, this.p0, this.p1);
        }
      } }, { key: "pointAlong", value: function(r) {
        var s = new Z();
        return s.x = this.p0.x + r * (this.p1.x - this.p0.x), s.y = this.p0.y + r * (this.p1.y - this.p0.y), s;
      } }, { key: "hashCode", value: function() {
        var r = W.doubleToLongBits(this.p0.x);
        r ^= 31 * W.doubleToLongBits(this.p0.y);
        var s = Math.trunc(r) ^ Math.trunc(r >> 32), l = W.doubleToLongBits(this.p1.x);
        return l ^= 31 * W.doubleToLongBits(this.p1.y), s ^ (Math.trunc(l) ^ Math.trunc(l >> 32));
      } }, { key: "interfaces_", get: function() {
        return [V, M];
      } }], [{ key: "constructor_", value: function() {
        if (this.p0 = null, this.p1 = null, arguments.length === 0) c.constructor_.call(this, new Z(), new Z());
        else if (arguments.length === 1) {
          var r = arguments[0];
          c.constructor_.call(this, r.p0, r.p1);
        } else if (arguments.length === 2) {
          var s = arguments[0], l = arguments[1];
          this.p0 = s, this.p1 = l;
        } else if (arguments.length === 4) {
          var d = arguments[0], y = arguments[1], x = arguments[2], E = arguments[3];
          c.constructor_.call(this, new Z(d, y), new Z(x, E));
        }
      } }, { key: "midPoint", value: function(r, s) {
        return new Z((r.x + s.x) / 2, (r.y + s.y) / 2);
      } }]);
    }(), Yf = function() {
      return h(function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }, [{ key: "overlap", value: function() {
        if (arguments.length !== 2) {
          if (arguments.length === 4) {
            var c = arguments[1], r = arguments[2], s = arguments[3];
            arguments[0].getLineSegment(c, this._overlapSeg1), r.getLineSegment(s, this._overlapSeg2), this.overlap(this._overlapSeg1, this._overlapSeg2);
          }
        }
      } }], [{ key: "constructor_", value: function() {
        this._overlapSeg1 = new kt(), this._overlapSeg2 = new kt();
      } }]);
    }(), Ga = function() {
      return h(function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }, [{ key: "getLineSegment", value: function(c, r) {
        r.p0 = this._pts[c], r.p1 = this._pts[c + 1];
      } }, { key: "computeSelect", value: function(c, r, s, l) {
        var d = this._pts[r], y = this._pts[s];
        if (s - r == 1) return l.select(this, r), null;
        if (!c.intersects(d, y)) return null;
        var x = Math.trunc((r + s) / 2);
        r < x && this.computeSelect(c, r, x, l), x < s && this.computeSelect(c, x, s, l);
      } }, { key: "getCoordinates", value: function() {
        for (var c = new Array(this._end - this._start + 1).fill(null), r = 0, s = this._start; s <= this._end; s++) c[r++] = this._pts[s];
        return c;
      } }, { key: "computeOverlaps", value: function() {
        if (arguments.length === 2) {
          var c = arguments[0], r = arguments[1];
          this.computeOverlaps(this._start, this._end, c, c._start, c._end, r);
        } else if (arguments.length === 6) {
          var s = arguments[0], l = arguments[1], d = arguments[2], y = arguments[3], x = arguments[4], E = arguments[5];
          if (l - s == 1 && x - y == 1) return E.overlap(this, s, d, y), null;
          if (!this.overlaps(s, l, d, y, x)) return null;
          var L = Math.trunc((s + l) / 2), F = Math.trunc((y + x) / 2);
          s < L && (y < F && this.computeOverlaps(s, L, d, y, F, E), F < x && this.computeOverlaps(s, L, d, F, x, E)), L < l && (y < F && this.computeOverlaps(L, l, d, y, F, E), F < x && this.computeOverlaps(L, l, d, F, x, E));
        }
      } }, { key: "setId", value: function(c) {
        this._id = c;
      } }, { key: "select", value: function(c, r) {
        this.computeSelect(c, this._start, this._end, r);
      } }, { key: "getEnvelope", value: function() {
        if (this._env === null) {
          var c = this._pts[this._start], r = this._pts[this._end];
          this._env = new _e(c, r);
        }
        return this._env;
      } }, { key: "overlaps", value: function(c, r, s, l, d) {
        return _e.intersects(this._pts[c], this._pts[r], s._pts[l], s._pts[d]);
      } }, { key: "getEndIndex", value: function() {
        return this._end;
      } }, { key: "getStartIndex", value: function() {
        return this._start;
      } }, { key: "getContext", value: function() {
        return this._context;
      } }, { key: "getId", value: function() {
        return this._id;
      } }], [{ key: "constructor_", value: function() {
        this._pts = null, this._start = null, this._end = null, this._env = null, this._context = null, this._id = null;
        var c = arguments[0], r = arguments[1], s = arguments[2], l = arguments[3];
        this._pts = c, this._start = r, this._end = s, this._context = l;
      } }]);
    }(), Uf = function() {
      function c() {
        o(this, c);
      }
      return h(c, null, [{ key: "findChainEnd", value: function(r, s) {
        for (var l = s; l < r.length - 1 && r[l].equals2D(r[l + 1]); ) l++;
        if (l >= r.length - 1) return r.length - 1;
        for (var d = dt.quadrant(r[l], r[l + 1]), y = s + 1; y < r.length && !(!r[y - 1].equals2D(r[y]) && dt.quadrant(r[y - 1], r[y]) !== d); )
          y++;
        return y - 1;
      } }, { key: "getChains", value: function() {
        if (arguments.length === 1) {
          var r = arguments[0];
          return c.getChains(r, null);
        }
        if (arguments.length === 2) {
          var s = arguments[0], l = arguments[1], d = new me(), y = 0;
          do {
            var x = c.findChainEnd(s, y), E = new Ga(s, y, x, l);
            d.add(E), y = x;
          } while (y < s.length - 1);
          return d;
        }
      } }]);
    }(), Os = function() {
      return h(function c() {
        o(this, c);
      }, [{ key: "computeNodes", value: function(c) {
      } }, { key: "getNodedSubstrings", value: function() {
      } }]);
    }(), qa = function() {
      return h(function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }, [{ key: "setSegmentIntersector", value: function(c) {
        this._segInt = c;
      } }, { key: "interfaces_", get: function() {
        return [Os];
      } }], [{ key: "constructor_", value: function() {
        if (this._segInt = null, arguments.length !== 0) {
          if (arguments.length === 1) {
            var c = arguments[0];
            this.setSegmentIntersector(c);
          }
        }
      } }]);
    }(), As = function(c) {
      function r() {
        var s;
        return o(this, r), s = i(this, r), r.constructor_.apply(s, arguments), s;
      }
      return v(r, c), h(r, [{ key: "getMonotoneChains", value: function() {
        return this._monoChains;
      } }, { key: "getNodedSubstrings", value: function() {
        return Cn.getNodedSubstrings(this._nodedSegStrings);
      } }, { key: "getIndex", value: function() {
        return this._index;
      } }, { key: "add", value: function(s) {
        for (var l = Uf.getChains(s.getCoordinates(), s).iterator(); l.hasNext(); ) {
          var d = l.next();
          d.setId(this._idCounter++), this._index.insert(d.getEnvelope(), d), this._monoChains.add(d);
        }
      } }, { key: "computeNodes", value: function(s) {
        this._nodedSegStrings = s;
        for (var l = s.iterator(); l.hasNext(); ) this.add(l.next());
        this.intersectChains();
      } }, { key: "intersectChains", value: function() {
        for (var s = new za(this._segInt), l = this._monoChains.iterator(); l.hasNext(); ) for (var d = l.next(), y = this._index.query(d.getEnvelope()).iterator(); y.hasNext(); ) {
          var x = y.next();
          if (x.getId() > d.getId() && (d.computeOverlaps(x, s), this._nOverlaps++), this._segInt.isDone()) return null;
        }
      } }], [{ key: "constructor_", value: function() {
        if (this._monoChains = new me(), this._index = new Vt(), this._idCounter = 0, this._nodedSegStrings = null, this._nOverlaps = 0, arguments.length !== 0) {
          if (arguments.length === 1) {
            var s = arguments[0];
            qa.constructor_.call(this, s);
          }
        }
      } }]);
    }(qa), za = function(c) {
      function r() {
        var s;
        return o(this, r), s = i(this, r), r.constructor_.apply(s, arguments), s;
      }
      return v(r, c), h(r, [{ key: "overlap", value: function() {
        if (arguments.length !== 4) return w(r, "overlap", this, 1).apply(this, arguments);
        var s = arguments[1], l = arguments[2], d = arguments[3], y = arguments[0].getContext(), x = l.getContext();
        this._si.processIntersections(y, s, x, d);
      } }], [{ key: "constructor_", value: function() {
        this._si = null;
        var s = arguments[0];
        this._si = s;
      } }]);
    }(Yf);
    As.SegmentOverlapAction = za;
    var Gt = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "isDeletable", value: function(r, s, l, d) {
        var y = this._inputLine[r], x = this._inputLine[s], E = this._inputLine[l];
        return !!this.isConcave(y, x, E) && !!this.isShallow(y, x, E, d) && this.isShallowSampled(y, x, r, l, d);
      } }, { key: "deleteShallowConcavities", value: function() {
        for (var r = 1, s = this.findNextNonDeletedIndex(r), l = this.findNextNonDeletedIndex(s), d = !1; l < this._inputLine.length; ) {
          var y = !1;
          this.isDeletable(r, s, l, this._distanceTol) && (this._isDeleted[s] = c.DELETE, y = !0, d = !0), r = y ? l : s, s = this.findNextNonDeletedIndex(r), l = this.findNextNonDeletedIndex(s);
        }
        return d;
      } }, { key: "isShallowConcavity", value: function(r, s, l, d) {
        return we.index(r, s, l) === this._angleOrientation && Ut.pointToSegment(s, r, l) < d;
      } }, { key: "isShallowSampled", value: function(r, s, l, d, y) {
        var x = Math.trunc((d - l) / c.NUM_PTS_TO_CHECK);
        x <= 0 && (x = 1);
        for (var E = l; E < d; E += x) if (!this.isShallow(r, s, this._inputLine[E], y)) return !1;
        return !0;
      } }, { key: "isConcave", value: function(r, s, l) {
        var d = we.index(r, s, l) === this._angleOrientation;
        return d;
      } }, { key: "simplify", value: function(r) {
        this._distanceTol = Math.abs(r), r < 0 && (this._angleOrientation = we.CLOCKWISE), this._isDeleted = new Array(this._inputLine.length).fill(null);
        var s = !1;
        do
          s = this.deleteShallowConcavities();
        while (s);
        return this.collapseLine();
      } }, { key: "findNextNonDeletedIndex", value: function(r) {
        for (var s = r + 1; s < this._inputLine.length && this._isDeleted[s] === c.DELETE; ) s++;
        return s;
      } }, { key: "isShallow", value: function(r, s, l, d) {
        return Ut.pointToSegment(s, r, l) < d;
      } }, { key: "collapseLine", value: function() {
        for (var r = new fr(), s = 0; s < this._inputLine.length; s++) this._isDeleted[s] !== c.DELETE && r.add(this._inputLine[s]);
        return r.toCoordinateArray();
      } }], [{ key: "constructor_", value: function() {
        this._inputLine = null, this._distanceTol = null, this._isDeleted = null, this._angleOrientation = we.COUNTERCLOCKWISE;
        var r = arguments[0];
        this._inputLine = r;
      } }, { key: "simplify", value: function(r, s) {
        return new c(r).simplify(s);
      } }]);
    }();
    Gt.INIT = 0, Gt.DELETE = 1, Gt.KEEP = 1, Gt.NUM_PTS_TO_CHECK = 10;
    var Ya = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "getCoordinates", value: function() {
        return this._ptList.toArray(c.COORDINATE_ARRAY_TYPE);
      } }, { key: "setPrecisionModel", value: function(r) {
        this._precisionModel = r;
      } }, { key: "addPt", value: function(r) {
        var s = new Z(r);
        if (this._precisionModel.makePrecise(s), this.isRedundant(s)) return null;
        this._ptList.add(s);
      } }, { key: "reverse", value: function() {
      } }, { key: "addPts", value: function(r, s) {
        if (s) for (var l = 0; l < r.length; l++) this.addPt(r[l]);
        else for (var d = r.length - 1; d >= 0; d--) this.addPt(r[d]);
      } }, { key: "isRedundant", value: function(r) {
        if (this._ptList.size() < 1) return !1;
        var s = this._ptList.get(this._ptList.size() - 1);
        return r.distance(s) < this._minimimVertexDistance;
      } }, { key: "toString", value: function() {
        return new An().createLineString(this.getCoordinates()).toString();
      } }, { key: "closeRing", value: function() {
        if (this._ptList.size() < 1) return null;
        var r = new Z(this._ptList.get(0)), s = this._ptList.get(this._ptList.size() - 1);
        if (r.equals(s)) return null;
        this._ptList.add(r);
      } }, { key: "setMinimumVertexDistance", value: function(r) {
        this._minimimVertexDistance = r;
      } }], [{ key: "constructor_", value: function() {
        this._ptList = null, this._precisionModel = null, this._minimimVertexDistance = 0, this._ptList = new me();
      } }]);
    }();
    Ya.COORDINATE_ARRAY_TYPE = new Array(0).fill(null);
    var Ct = function() {
      function c() {
        o(this, c);
      }
      return h(c, null, [{ key: "toDegrees", value: function(r) {
        return 180 * r / Math.PI;
      } }, { key: "normalize", value: function(r) {
        for (; r > Math.PI; ) r -= c.PI_TIMES_2;
        for (; r <= -Math.PI; ) r += c.PI_TIMES_2;
        return r;
      } }, { key: "angle", value: function() {
        if (arguments.length === 1) {
          var r = arguments[0];
          return Math.atan2(r.y, r.x);
        }
        if (arguments.length === 2) {
          var s = arguments[0], l = arguments[1], d = l.x - s.x, y = l.y - s.y;
          return Math.atan2(y, d);
        }
      } }, { key: "isAcute", value: function(r, s, l) {
        var d = r.x - s.x, y = r.y - s.y;
        return d * (l.x - s.x) + y * (l.y - s.y) > 0;
      } }, { key: "isObtuse", value: function(r, s, l) {
        var d = r.x - s.x, y = r.y - s.y;
        return d * (l.x - s.x) + y * (l.y - s.y) < 0;
      } }, { key: "interiorAngle", value: function(r, s, l) {
        var d = c.angle(s, r), y = c.angle(s, l);
        return Math.abs(y - d);
      } }, { key: "normalizePositive", value: function(r) {
        if (r < 0) {
          for (; r < 0; ) r += c.PI_TIMES_2;
          r >= c.PI_TIMES_2 && (r = 0);
        } else {
          for (; r >= c.PI_TIMES_2; ) r -= c.PI_TIMES_2;
          r < 0 && (r = 0);
        }
        return r;
      } }, { key: "angleBetween", value: function(r, s, l) {
        var d = c.angle(s, r), y = c.angle(s, l);
        return c.diff(d, y);
      } }, { key: "diff", value: function(r, s) {
        var l = null;
        return (l = r < s ? s - r : r - s) > Math.PI && (l = 2 * Math.PI - l), l;
      } }, { key: "toRadians", value: function(r) {
        return r * Math.PI / 180;
      } }, { key: "getTurn", value: function(r, s) {
        var l = Math.sin(s - r);
        return l > 0 ? c.COUNTERCLOCKWISE : l < 0 ? c.CLOCKWISE : c.NONE;
      } }, { key: "angleBetweenOriented", value: function(r, s, l) {
        var d = c.angle(s, r), y = c.angle(s, l) - d;
        return y <= -Math.PI ? y + c.PI_TIMES_2 : y > Math.PI ? y - c.PI_TIMES_2 : y;
      } }]);
    }();
    Ct.PI_TIMES_2 = 2 * Math.PI, Ct.PI_OVER_2 = Math.PI / 2, Ct.PI_OVER_4 = Math.PI / 4, Ct.COUNTERCLOCKWISE = we.COUNTERCLOCKWISE, Ct.CLOCKWISE = we.CLOCKWISE, Ct.NONE = we.COLLINEAR;
    var mr = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "addNextSegment", value: function(r, s) {
        if (this._s0 = this._s1, this._s1 = this._s2, this._s2 = r, this._seg0.setCoordinates(this._s0, this._s1), this.computeOffsetSegment(this._seg0, this._side, this._distance, this._offset0), this._seg1.setCoordinates(this._s1, this._s2), this.computeOffsetSegment(this._seg1, this._side, this._distance, this._offset1), this._s1.equals(this._s2)) return null;
        var l = we.index(this._s0, this._s1, this._s2), d = l === we.CLOCKWISE && this._side === ie.LEFT || l === we.COUNTERCLOCKWISE && this._side === ie.RIGHT;
        l === 0 ? this.addCollinear(s) : d ? this.addOutsideTurn(l, s) : this.addInsideTurn(l, s);
      } }, { key: "addLineEndCap", value: function(r, s) {
        var l = new kt(r, s), d = new kt();
        this.computeOffsetSegment(l, ie.LEFT, this._distance, d);
        var y = new kt();
        this.computeOffsetSegment(l, ie.RIGHT, this._distance, y);
        var x = s.x - r.x, E = s.y - r.y, L = Math.atan2(E, x);
        switch (this._bufParams.getEndCapStyle()) {
          case N.CAP_ROUND:
            this._segList.addPt(d.p1), this.addDirectedFillet(s, L + Math.PI / 2, L - Math.PI / 2, we.CLOCKWISE, this._distance), this._segList.addPt(y.p1);
            break;
          case N.CAP_FLAT:
            this._segList.addPt(d.p1), this._segList.addPt(y.p1);
            break;
          case N.CAP_SQUARE:
            var F = new Z();
            F.x = Math.abs(this._distance) * Math.cos(L), F.y = Math.abs(this._distance) * Math.sin(L);
            var $ = new Z(d.p1.x + F.x, d.p1.y + F.y), K = new Z(y.p1.x + F.x, y.p1.y + F.y);
            this._segList.addPt($), this._segList.addPt(K);
        }
      } }, { key: "getCoordinates", value: function() {
        return this._segList.getCoordinates();
      } }, { key: "addMitreJoin", value: function(r, s, l, d) {
        var y = xs.intersection(s.p0, s.p1, l.p0, l.p1);
        if (y !== null && (d <= 0 ? 1 : y.distance(r) / Math.abs(d)) <= this._bufParams.getMitreLimit()) return this._segList.addPt(y), null;
        this.addLimitedMitreJoin(s, l, d, this._bufParams.getMitreLimit());
      } }, { key: "addOutsideTurn", value: function(r, s) {
        if (this._offset0.p1.distance(this._offset1.p0) < this._distance * c.OFFSET_SEGMENT_SEPARATION_FACTOR) return this._segList.addPt(this._offset0.p1), null;
        this._bufParams.getJoinStyle() === N.JOIN_MITRE ? this.addMitreJoin(this._s1, this._offset0, this._offset1, this._distance) : this._bufParams.getJoinStyle() === N.JOIN_BEVEL ? this.addBevelJoin(this._offset0, this._offset1) : (s && this._segList.addPt(this._offset0.p1), this.addCornerFillet(this._s1, this._offset0.p1, this._offset1.p0, r, this._distance), this._segList.addPt(this._offset1.p0));
      } }, { key: "createSquare", value: function(r) {
        this._segList.addPt(new Z(r.x + this._distance, r.y + this._distance)), this._segList.addPt(new Z(r.x + this._distance, r.y - this._distance)), this._segList.addPt(new Z(r.x - this._distance, r.y - this._distance)), this._segList.addPt(new Z(r.x - this._distance, r.y + this._distance)), this._segList.closeRing();
      } }, { key: "addSegments", value: function(r, s) {
        this._segList.addPts(r, s);
      } }, { key: "addFirstSegment", value: function() {
        this._segList.addPt(this._offset1.p0);
      } }, { key: "addCornerFillet", value: function(r, s, l, d, y) {
        var x = s.x - r.x, E = s.y - r.y, L = Math.atan2(E, x), F = l.x - r.x, $ = l.y - r.y, K = Math.atan2($, F);
        d === we.CLOCKWISE ? L <= K && (L += 2 * Math.PI) : L >= K && (L -= 2 * Math.PI), this._segList.addPt(s), this.addDirectedFillet(r, L, K, d, y), this._segList.addPt(l);
      } }, { key: "addLastSegment", value: function() {
        this._segList.addPt(this._offset1.p1);
      } }, { key: "initSideSegments", value: function(r, s, l) {
        this._s1 = r, this._s2 = s, this._side = l, this._seg1.setCoordinates(r, s), this.computeOffsetSegment(this._seg1, l, this._distance, this._offset1);
      } }, { key: "addLimitedMitreJoin", value: function(r, s, l, d) {
        var y = this._seg0.p1, x = Ct.angle(y, this._seg0.p0), E = Ct.angleBetweenOriented(this._seg0.p0, y, this._seg1.p1) / 2, L = Ct.normalize(x + E), F = Ct.normalize(L + Math.PI), $ = d * l, K = l - $ * Math.abs(Math.sin(E)), ne = y.x + $ * Math.cos(F), ue = y.y + $ * Math.sin(F), he = new Z(ne, ue), ge = new kt(y, he), Oe = ge.pointAlongOffset(1, K), Le = ge.pointAlongOffset(1, -K);
        this._side === ie.LEFT ? (this._segList.addPt(Oe), this._segList.addPt(Le)) : (this._segList.addPt(Le), this._segList.addPt(Oe));
      } }, { key: "addDirectedFillet", value: function(r, s, l, d, y) {
        var x = d === we.CLOCKWISE ? -1 : 1, E = Math.abs(s - l), L = Math.trunc(E / this._filletAngleQuantum + 0.5);
        if (L < 1) return null;
        for (var F = E / L, $ = new Z(), K = 0; K < L; K++) {
          var ne = s + x * K * F;
          $.x = r.x + y * Math.cos(ne), $.y = r.y + y * Math.sin(ne), this._segList.addPt($);
        }
      } }, { key: "computeOffsetSegment", value: function(r, s, l, d) {
        var y = s === ie.LEFT ? 1 : -1, x = r.p1.x - r.p0.x, E = r.p1.y - r.p0.y, L = Math.sqrt(x * x + E * E), F = y * l * x / L, $ = y * l * E / L;
        d.p0.x = r.p0.x - $, d.p0.y = r.p0.y + F, d.p1.x = r.p1.x - $, d.p1.y = r.p1.y + F;
      } }, { key: "addInsideTurn", value: function(r, s) {
        if (this._li.computeIntersection(this._offset0.p0, this._offset0.p1, this._offset1.p0, this._offset1.p1), this._li.hasIntersection()) this._segList.addPt(this._li.getIntersection(0));
        else if (this._hasNarrowConcaveAngle = !0, this._offset0.p1.distance(this._offset1.p0) < this._distance * c.INSIDE_TURN_VERTEX_SNAP_DISTANCE_FACTOR) this._segList.addPt(this._offset0.p1);
        else {
          if (this._segList.addPt(this._offset0.p1), this._closingSegLengthFactor > 0) {
            var l = new Z((this._closingSegLengthFactor * this._offset0.p1.x + this._s1.x) / (this._closingSegLengthFactor + 1), (this._closingSegLengthFactor * this._offset0.p1.y + this._s1.y) / (this._closingSegLengthFactor + 1));
            this._segList.addPt(l);
            var d = new Z((this._closingSegLengthFactor * this._offset1.p0.x + this._s1.x) / (this._closingSegLengthFactor + 1), (this._closingSegLengthFactor * this._offset1.p0.y + this._s1.y) / (this._closingSegLengthFactor + 1));
            this._segList.addPt(d);
          } else this._segList.addPt(this._s1);
          this._segList.addPt(this._offset1.p0);
        }
      } }, { key: "createCircle", value: function(r) {
        var s = new Z(r.x + this._distance, r.y);
        this._segList.addPt(s), this.addDirectedFillet(r, 0, 2 * Math.PI, -1, this._distance), this._segList.closeRing();
      } }, { key: "addBevelJoin", value: function(r, s) {
        this._segList.addPt(r.p1), this._segList.addPt(s.p0);
      } }, { key: "init", value: function(r) {
        this._distance = r, this._maxCurveSegmentError = r * (1 - Math.cos(this._filletAngleQuantum / 2)), this._segList = new Ya(), this._segList.setPrecisionModel(this._precisionModel), this._segList.setMinimumVertexDistance(r * c.CURVE_VERTEX_SNAP_DISTANCE_FACTOR);
      } }, { key: "addCollinear", value: function(r) {
        this._li.computeIntersection(this._s0, this._s1, this._s1, this._s2), this._li.getIntersectionNum() >= 2 && (this._bufParams.getJoinStyle() === N.JOIN_BEVEL || this._bufParams.getJoinStyle() === N.JOIN_MITRE ? (r && this._segList.addPt(this._offset0.p1), this._segList.addPt(this._offset1.p0)) : this.addCornerFillet(this._s1, this._offset0.p1, this._offset1.p0, we.CLOCKWISE, this._distance));
      } }, { key: "closeRing", value: function() {
        this._segList.closeRing();
      } }, { key: "hasNarrowConcaveAngle", value: function() {
        return this._hasNarrowConcaveAngle;
      } }], [{ key: "constructor_", value: function() {
        this._maxCurveSegmentError = 0, this._filletAngleQuantum = null, this._closingSegLengthFactor = 1, this._segList = null, this._distance = 0, this._precisionModel = null, this._bufParams = null, this._li = null, this._s0 = null, this._s1 = null, this._s2 = null, this._seg0 = new kt(), this._seg1 = new kt(), this._offset0 = new kt(), this._offset1 = new kt(), this._side = 0, this._hasNarrowConcaveAngle = !1;
        var r = arguments[0], s = arguments[1], l = arguments[2];
        this._precisionModel = r, this._bufParams = s, this._li = new kn(), this._filletAngleQuantum = Math.PI / 2 / s.getQuadrantSegments(), s.getQuadrantSegments() >= 8 && s.getJoinStyle() === N.JOIN_ROUND && (this._closingSegLengthFactor = c.MAX_CLOSING_SEG_LEN_FACTOR), this.init(l);
      } }]);
    }();
    mr.OFFSET_SEGMENT_SEPARATION_FACTOR = 1e-3, mr.INSIDE_TURN_VERTEX_SNAP_DISTANCE_FACTOR = 1e-3, mr.CURVE_VERTEX_SNAP_DISTANCE_FACTOR = 1e-6, mr.MAX_CLOSING_SEG_LEN_FACTOR = 80;
    var Xf = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "getOffsetCurve", value: function(r, s) {
        if (this._distance = s, s === 0) return null;
        var l = s < 0, d = Math.abs(s), y = this.getSegGen(d);
        r.length <= 1 ? this.computePointCurve(r[0], y) : this.computeOffsetCurve(r, l, y);
        var x = y.getCoordinates();
        return l && tt.reverse(x), x;
      } }, { key: "computeSingleSidedBufferCurve", value: function(r, s, l) {
        var d = this.simplifyTolerance(this._distance);
        if (s) {
          l.addSegments(r, !0);
          var y = Gt.simplify(r, -d), x = y.length - 1;
          l.initSideSegments(y[x], y[x - 1], ie.LEFT), l.addFirstSegment();
          for (var E = x - 2; E >= 0; E--) l.addNextSegment(y[E], !0);
        } else {
          l.addSegments(r, !1);
          var L = Gt.simplify(r, d), F = L.length - 1;
          l.initSideSegments(L[0], L[1], ie.LEFT), l.addFirstSegment();
          for (var $ = 2; $ <= F; $++) l.addNextSegment(L[$], !0);
        }
        l.addLastSegment(), l.closeRing();
      } }, { key: "computeRingBufferCurve", value: function(r, s, l) {
        var d = this.simplifyTolerance(this._distance);
        s === ie.RIGHT && (d = -d);
        var y = Gt.simplify(r, d), x = y.length - 1;
        l.initSideSegments(y[x - 1], y[0], s);
        for (var E = 1; E <= x; E++) {
          var L = E !== 1;
          l.addNextSegment(y[E], L);
        }
        l.closeRing();
      } }, { key: "computeLineBufferCurve", value: function(r, s) {
        var l = this.simplifyTolerance(this._distance), d = Gt.simplify(r, l), y = d.length - 1;
        s.initSideSegments(d[0], d[1], ie.LEFT);
        for (var x = 2; x <= y; x++) s.addNextSegment(d[x], !0);
        s.addLastSegment(), s.addLineEndCap(d[y - 1], d[y]);
        var E = Gt.simplify(r, -l), L = E.length - 1;
        s.initSideSegments(E[L], E[L - 1], ie.LEFT);
        for (var F = L - 2; F >= 0; F--) s.addNextSegment(E[F], !0);
        s.addLastSegment(), s.addLineEndCap(E[1], E[0]), s.closeRing();
      } }, { key: "computePointCurve", value: function(r, s) {
        switch (this._bufParams.getEndCapStyle()) {
          case N.CAP_ROUND:
            s.createCircle(r);
            break;
          case N.CAP_SQUARE:
            s.createSquare(r);
        }
      } }, { key: "getLineCurve", value: function(r, s) {
        if (this._distance = s, this.isLineOffsetEmpty(s)) return null;
        var l = Math.abs(s), d = this.getSegGen(l);
        if (r.length <= 1) this.computePointCurve(r[0], d);
        else if (this._bufParams.isSingleSided()) {
          var y = s < 0;
          this.computeSingleSidedBufferCurve(r, y, d);
        } else this.computeLineBufferCurve(r, d);
        return d.getCoordinates();
      } }, { key: "getBufferParameters", value: function() {
        return this._bufParams;
      } }, { key: "simplifyTolerance", value: function(r) {
        return r * this._bufParams.getSimplifyFactor();
      } }, { key: "getRingCurve", value: function(r, s, l) {
        if (this._distance = l, r.length <= 2) return this.getLineCurve(r, l);
        if (l === 0) return c.copyCoordinates(r);
        var d = this.getSegGen(l);
        return this.computeRingBufferCurve(r, s, d), d.getCoordinates();
      } }, { key: "computeOffsetCurve", value: function(r, s, l) {
        var d = this.simplifyTolerance(this._distance);
        if (s) {
          var y = Gt.simplify(r, -d), x = y.length - 1;
          l.initSideSegments(y[x], y[x - 1], ie.LEFT), l.addFirstSegment();
          for (var E = x - 2; E >= 0; E--) l.addNextSegment(y[E], !0);
        } else {
          var L = Gt.simplify(r, d), F = L.length - 1;
          l.initSideSegments(L[0], L[1], ie.LEFT), l.addFirstSegment();
          for (var $ = 2; $ <= F; $++) l.addNextSegment(L[$], !0);
        }
        l.addLastSegment();
      } }, { key: "isLineOffsetEmpty", value: function(r) {
        return r === 0 || r < 0 && !this._bufParams.isSingleSided();
      } }, { key: "getSegGen", value: function(r) {
        return new mr(this._precisionModel, this._bufParams, r);
      } }], [{ key: "constructor_", value: function() {
        this._distance = 0, this._precisionModel = null, this._bufParams = null;
        var r = arguments[0], s = arguments[1];
        this._precisionModel = r, this._bufParams = s;
      } }, { key: "copyCoordinates", value: function(r) {
        for (var s = new Array(r.length).fill(null), l = 0; l < s.length; l++) s[l] = new Z(r[l]);
        return s;
      } }]);
    }(), Ua = function() {
      return h(function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }, [{ key: "findStabbedSegments", value: function() {
        if (arguments.length === 1) {
          for (var c = arguments[0], r = new me(), s = this._subgraphs.iterator(); s.hasNext(); ) {
            var l = s.next(), d = l.getEnvelope();
            c.y < d.getMinY() || c.y > d.getMaxY() || this.findStabbedSegments(c, l.getDirectedEdges(), r);
          }
          return r;
        }
        if (arguments.length === 3) {
          if (Ee(arguments[2], jt) && arguments[0] instanceof Z && arguments[1] instanceof Ts) {
            for (var y = arguments[0], x = arguments[1], E = arguments[2], L = x.getEdge().getCoordinates(), F = 0; F < L.length - 1; F++)
              if (this._seg.p0 = L[F], this._seg.p1 = L[F + 1], this._seg.p0.y > this._seg.p1.y && this._seg.reverse(), !(Math.max(this._seg.p0.x, this._seg.p1.x) < y.x || this._seg.isHorizontal() || y.y < this._seg.p0.y || y.y > this._seg.p1.y || we.index(this._seg.p0, this._seg.p1, y) === we.RIGHT)) {
                var $ = x.getDepth(ie.LEFT);
                this._seg.p0.equals(L[F]) || ($ = x.getDepth(ie.RIGHT));
                var K = new Xa(this._seg, $);
                E.add(K);
              }
          } else if (Ee(arguments[2], jt) && arguments[0] instanceof Z && Ee(arguments[1], jt)) for (var ne = arguments[0], ue = arguments[2], he = arguments[1].iterator(); he.hasNext(); ) {
            var ge = he.next();
            ge.isForward() && this.findStabbedSegments(ne, ge, ue);
          }
        }
      } }, { key: "getDepth", value: function(c) {
        var r = this.findStabbedSegments(c);
        return r.size() === 0 ? 0 : Dn.min(r)._leftDepth;
      } }], [{ key: "constructor_", value: function() {
        this._subgraphs = null, this._seg = new kt();
        var c = arguments[0];
        this._subgraphs = c;
      } }]);
    }(), Xa = function() {
      return h(function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }, [{ key: "compareTo", value: function(c) {
        var r = c;
        if (this._upwardSeg.minX() >= r._upwardSeg.maxX()) return 1;
        if (this._upwardSeg.maxX() <= r._upwardSeg.minX()) return -1;
        var s = this._upwardSeg.orientationIndex(r._upwardSeg);
        return s !== 0 || (s = -1 * r._upwardSeg.orientationIndex(this._upwardSeg)) !== 0 ? s : this._upwardSeg.compareTo(r._upwardSeg);
      } }, { key: "compareX", value: function(c, r) {
        var s = c.p0.compareTo(r.p0);
        return s !== 0 ? s : c.p1.compareTo(r.p1);
      } }, { key: "toString", value: function() {
        return this._upwardSeg.toString();
      } }, { key: "interfaces_", get: function() {
        return [V];
      } }], [{ key: "constructor_", value: function() {
        this._upwardSeg = null, this._leftDepth = null;
        var c = arguments[0], r = arguments[1];
        this._upwardSeg = new kt(c), this._leftDepth = r;
      } }]);
    }();
    Ua.DepthSegment = Xa;
    var Va = function(c) {
      function r() {
        var s;
        return o(this, r), s = i(this, r), r.constructor_.apply(s, arguments), s;
      }
      return v(r, c), h(r, null, [{ key: "constructor_", value: function() {
        A.constructor_.call(this, "Projective point not representable on the Cartesian plane.");
      } }]);
    }(A), Rs = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "getY", value: function() {
        var r = this.y / this.w;
        if (W.isNaN(r) || W.isInfinite(r)) throw new Va();
        return r;
      } }, { key: "getX", value: function() {
        var r = this.x / this.w;
        if (W.isNaN(r) || W.isInfinite(r)) throw new Va();
        return r;
      } }, { key: "getCoordinate", value: function() {
        var r = new Z();
        return r.x = this.getX(), r.y = this.getY(), r;
      } }], [{ key: "constructor_", value: function() {
        if (this.x = null, this.y = null, this.w = null, arguments.length === 0) this.x = 0, this.y = 0, this.w = 1;
        else if (arguments.length === 1) {
          var r = arguments[0];
          this.x = r.x, this.y = r.y, this.w = 1;
        } else if (arguments.length === 2) {
          if (typeof arguments[0] == "number" && typeof arguments[1] == "number") {
            var s = arguments[0], l = arguments[1];
            this.x = s, this.y = l, this.w = 1;
          } else if (arguments[0] instanceof c && arguments[1] instanceof c) {
            var d = arguments[0], y = arguments[1];
            this.x = d.y * y.w - y.y * d.w, this.y = y.x * d.w - d.x * y.w, this.w = d.x * y.y - y.x * d.y;
          } else if (arguments[0] instanceof Z && arguments[1] instanceof Z) {
            var x = arguments[0], E = arguments[1];
            this.x = x.y - E.y, this.y = E.x - x.x, this.w = x.x * E.y - E.x * x.y;
          }
        } else if (arguments.length === 3) {
          var L = arguments[0], F = arguments[1], $ = arguments[2];
          this.x = L, this.y = F, this.w = $;
        } else if (arguments.length === 4) {
          var K = arguments[0], ne = arguments[1], ue = arguments[2], he = arguments[3], ge = K.y - ne.y, Oe = ne.x - K.x, Le = K.x * ne.y - ne.x * K.y, Ye = ue.y - he.y, st = he.x - ue.x, ut = ue.x * he.y - he.x * ue.y;
          this.x = Oe * ut - st * Le, this.y = Ye * Le - ge * ut, this.w = ge * st - Ye * Oe;
        }
      } }]);
    }(), Vf = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "area", value: function() {
        return c.area(this.p0, this.p1, this.p2);
      } }, { key: "signedArea", value: function() {
        return c.signedArea(this.p0, this.p1, this.p2);
      } }, { key: "interpolateZ", value: function(r) {
        if (r === null) throw new R("Supplied point is null.");
        return c.interpolateZ(r, this.p0, this.p1, this.p2);
      } }, { key: "longestSideLength", value: function() {
        return c.longestSideLength(this.p0, this.p1, this.p2);
      } }, { key: "isAcute", value: function() {
        return c.isAcute(this.p0, this.p1, this.p2);
      } }, { key: "circumcentre", value: function() {
        return c.circumcentre(this.p0, this.p1, this.p2);
      } }, { key: "area3D", value: function() {
        return c.area3D(this.p0, this.p1, this.p2);
      } }, { key: "centroid", value: function() {
        return c.centroid(this.p0, this.p1, this.p2);
      } }, { key: "inCentre", value: function() {
        return c.inCentre(this.p0, this.p1, this.p2);
      } }], [{ key: "constructor_", value: function() {
        this.p0 = null, this.p1 = null, this.p2 = null;
        var r = arguments[0], s = arguments[1], l = arguments[2];
        this.p0 = r, this.p1 = s, this.p2 = l;
      } }, { key: "area", value: function(r, s, l) {
        return Math.abs(((l.x - r.x) * (s.y - r.y) - (s.x - r.x) * (l.y - r.y)) / 2);
      } }, { key: "signedArea", value: function(r, s, l) {
        return ((l.x - r.x) * (s.y - r.y) - (s.x - r.x) * (l.y - r.y)) / 2;
      } }, { key: "det", value: function(r, s, l, d) {
        return r * d - s * l;
      } }, { key: "interpolateZ", value: function(r, s, l, d) {
        var y = s.x, x = s.y, E = l.x - y, L = d.x - y, F = l.y - x, $ = d.y - x, K = E * $ - L * F, ne = r.x - y, ue = r.y - x, he = ($ * ne - L * ue) / K, ge = (-F * ne + E * ue) / K;
        return s.getZ() + he * (l.getZ() - s.getZ()) + ge * (d.getZ() - s.getZ());
      } }, { key: "longestSideLength", value: function(r, s, l) {
        var d = r.distance(s), y = s.distance(l), x = l.distance(r), E = d;
        return y > E && (E = y), x > E && (E = x), E;
      } }, { key: "circumcentreDD", value: function(r, s, l) {
        var d = pe.valueOf(r.x).subtract(l.x), y = pe.valueOf(r.y).subtract(l.y), x = pe.valueOf(s.x).subtract(l.x), E = pe.valueOf(s.y).subtract(l.y), L = pe.determinant(d, y, x, E).multiply(2), F = d.sqr().add(y.sqr()), $ = x.sqr().add(E.sqr()), K = pe.determinant(y, F, E, $), ne = pe.determinant(d, F, x, $), ue = pe.valueOf(l.x).subtract(K.divide(L)).doubleValue(), he = pe.valueOf(l.y).add(ne.divide(L)).doubleValue();
        return new Z(ue, he);
      } }, { key: "isAcute", value: function(r, s, l) {
        return !!Ct.isAcute(r, s, l) && !!Ct.isAcute(s, l, r) && !!Ct.isAcute(l, r, s);
      } }, { key: "circumcentre", value: function(r, s, l) {
        var d = l.x, y = l.y, x = r.x - d, E = r.y - y, L = s.x - d, F = s.y - y, $ = 2 * c.det(x, E, L, F), K = c.det(E, x * x + E * E, F, L * L + F * F), ne = c.det(x, x * x + E * E, L, L * L + F * F);
        return new Z(d - K / $, y + ne / $);
      } }, { key: "perpendicularBisector", value: function(r, s) {
        var l = s.x - r.x, d = s.y - r.y, y = new Rs(r.x + l / 2, r.y + d / 2, 1), x = new Rs(r.x - d + l / 2, r.y + l + d / 2, 1);
        return new Rs(y, x);
      } }, { key: "angleBisector", value: function(r, s, l) {
        var d = s.distance(r), y = d / (d + s.distance(l)), x = l.x - r.x, E = l.y - r.y;
        return new Z(r.x + y * x, r.y + y * E);
      } }, { key: "area3D", value: function(r, s, l) {
        var d = s.x - r.x, y = s.y - r.y, x = s.getZ() - r.getZ(), E = l.x - r.x, L = l.y - r.y, F = l.getZ() - r.getZ(), $ = y * F - x * L, K = x * E - d * F, ne = d * L - y * E, ue = $ * $ + K * K + ne * ne, he = Math.sqrt(ue) / 2;
        return he;
      } }, { key: "centroid", value: function(r, s, l) {
        var d = (r.x + s.x + l.x) / 3, y = (r.y + s.y + l.y) / 3;
        return new Z(d, y);
      } }, { key: "inCentre", value: function(r, s, l) {
        var d = s.distance(l), y = r.distance(l), x = r.distance(s), E = d + y + x, L = (d * r.x + y * s.x + x * l.x) / E, F = (d * r.y + y * s.y + x * l.y) / E;
        return new Z(L, F);
      } }]);
    }(), Hf = function() {
      return h(function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }, [{ key: "addRingSide", value: function(c, r, s, l, d) {
        if (r === 0 && c.length < hr.MINIMUM_VALID_SIZE) return null;
        var y = l, x = d;
        c.length >= hr.MINIMUM_VALID_SIZE && we.isCCW(c) && (y = d, x = l, s = ie.opposite(s));
        var E = this._curveBuilder.getRingCurve(c, s, r);
        this.addCurve(E, y, x);
      } }, { key: "addRingBothSides", value: function(c, r) {
        this.addRingSide(c, r, ie.LEFT, z.EXTERIOR, z.INTERIOR), this.addRingSide(c, r, ie.RIGHT, z.INTERIOR, z.EXTERIOR);
      } }, { key: "addPoint", value: function(c) {
        if (this._distance <= 0) return null;
        var r = c.getCoordinates(), s = this._curveBuilder.getLineCurve(r, this._distance);
        this.addCurve(s, z.EXTERIOR, z.INTERIOR);
      } }, { key: "addPolygon", value: function(c) {
        var r = this._distance, s = ie.LEFT;
        this._distance < 0 && (r = -this._distance, s = ie.RIGHT);
        var l = c.getExteriorRing(), d = tt.removeRepeatedPoints(l.getCoordinates());
        if (this._distance < 0 && this.isErodedCompletely(l, this._distance) || this._distance <= 0 && d.length < 3) return null;
        this.addRingSide(d, r, s, z.EXTERIOR, z.INTERIOR);
        for (var y = 0; y < c.getNumInteriorRing(); y++) {
          var x = c.getInteriorRingN(y), E = tt.removeRepeatedPoints(x.getCoordinates());
          this._distance > 0 && this.isErodedCompletely(x, -this._distance) || this.addRingSide(E, r, ie.opposite(s), z.INTERIOR, z.EXTERIOR);
        }
      } }, { key: "isTriangleErodedCompletely", value: function(c, r) {
        var s = new Vf(c[0], c[1], c[2]), l = s.inCentre();
        return Ut.pointToSegment(l, s.p0, s.p1) < Math.abs(r);
      } }, { key: "addLineString", value: function(c) {
        if (this._curveBuilder.isLineOffsetEmpty(this._distance)) return null;
        var r = tt.removeRepeatedPoints(c.getCoordinates());
        if (tt.isRing(r) && !this._curveBuilder.getBufferParameters().isSingleSided()) this.addRingBothSides(r, this._distance);
        else {
          var s = this._curveBuilder.getLineCurve(r, this._distance);
          this.addCurve(s, z.EXTERIOR, z.INTERIOR);
        }
      } }, { key: "addCurve", value: function(c, r, s) {
        if (c === null || c.length < 2) return null;
        var l = new Cn(c, new Pt(0, z.BOUNDARY, r, s));
        this._curveList.add(l);
      } }, { key: "getCurves", value: function() {
        return this.add(this._inputGeom), this._curveList;
      } }, { key: "add", value: function(c) {
        if (c.isEmpty()) return null;
        if (c instanceof ui) this.addPolygon(c);
        else if (c instanceof cr) this.addLineString(c);
        else if (c instanceof Es) this.addPoint(c);
        else if (c instanceof ks) this.addCollection(c);
        else if (c instanceof Ms) this.addCollection(c);
        else if (c instanceof Ss) this.addCollection(c);
        else {
          if (!(c instanceof Et)) throw new ke(c.getGeometryType());
          this.addCollection(c);
        }
      } }, { key: "isErodedCompletely", value: function(c, r) {
        var s = c.getCoordinates();
        if (s.length < 4) return r < 0;
        if (s.length === 4) return this.isTriangleErodedCompletely(s, r);
        var l = c.getEnvelopeInternal(), d = Math.min(l.getHeight(), l.getWidth());
        return r < 0 && 2 * Math.abs(r) > d;
      } }, { key: "addCollection", value: function(c) {
        for (var r = 0; r < c.getNumGeometries(); r++) {
          var s = c.getGeometryN(r);
          this.add(s);
        }
      } }], [{ key: "constructor_", value: function() {
        this._inputGeom = null, this._distance = null, this._curveBuilder = null, this._curveList = new me();
        var c = arguments[0], r = arguments[1], s = arguments[2];
        this._inputGeom = c, this._distance = r, this._curveBuilder = s;
      } }]);
    }(), Wf = function() {
      return h(function c() {
        o(this, c);
      }, [{ key: "locate", value: function(c) {
      } }]);
    }(), $f = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "next", value: function() {
        if (this._atStart) return this._atStart = !1, c.isAtomic(this._parent) && this._index++, this._parent;
        if (this._subcollectionIterator !== null) {
          if (this._subcollectionIterator.hasNext()) return this._subcollectionIterator.next();
          this._subcollectionIterator = null;
        }
        if (this._index >= this._max) throw new Ne();
        var r = this._parent.getGeometryN(this._index++);
        return r instanceof Et ? (this._subcollectionIterator = new c(r), this._subcollectionIterator.next()) : r;
      } }, { key: "remove", value: function() {
        throw new ke(this.getClass().getName());
      } }, { key: "hasNext", value: function() {
        if (this._atStart) return !0;
        if (this._subcollectionIterator !== null) {
          if (this._subcollectionIterator.hasNext()) return !0;
          this._subcollectionIterator = null;
        }
        return !(this._index >= this._max);
      } }, { key: "interfaces_", get: function() {
        return [Ff];
      } }], [{ key: "constructor_", value: function() {
        this._parent = null, this._atStart = null, this._max = null, this._index = null, this._subcollectionIterator = null;
        var r = arguments[0];
        this._parent = r, this._atStart = !0, this._index = 0, this._max = r.getNumGeometries();
      } }, { key: "isAtomic", value: function(r) {
        return !(r instanceof Et);
      } }]);
    }(), Zf = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "locate", value: function(r) {
        return c.locate(r, this._geom);
      } }, { key: "interfaces_", get: function() {
        return [Wf];
      } }], [{ key: "constructor_", value: function() {
        this._geom = null;
        var r = arguments[0];
        this._geom = r;
      } }, { key: "locatePointInPolygon", value: function(r, s) {
        if (s.isEmpty()) return z.EXTERIOR;
        var l = s.getExteriorRing(), d = c.locatePointInRing(r, l);
        if (d !== z.INTERIOR) return d;
        for (var y = 0; y < s.getNumInteriorRing(); y++) {
          var x = s.getInteriorRingN(y), E = c.locatePointInRing(r, x);
          if (E === z.BOUNDARY) return z.BOUNDARY;
          if (E === z.INTERIOR) return z.EXTERIOR;
        }
        return z.INTERIOR;
      } }, { key: "locatePointInRing", value: function(r, s) {
        return s.getEnvelopeInternal().intersects(r) ? Ls.locateInRing(r, s.getCoordinates()) : z.EXTERIOR;
      } }, { key: "containsPointInPolygon", value: function(r, s) {
        return z.EXTERIOR !== c.locatePointInPolygon(r, s);
      } }, { key: "locateInGeometry", value: function(r, s) {
        if (s instanceof ui) return c.locatePointInPolygon(r, s);
        if (s instanceof Et) for (var l = new $f(s); l.hasNext(); ) {
          var d = l.next();
          if (d !== s) {
            var y = c.locateInGeometry(r, d);
            if (y !== z.EXTERIOR) return y;
          }
        }
        return z.EXTERIOR;
      } }, { key: "isContained", value: function(r, s) {
        return z.EXTERIOR !== c.locate(r, s);
      } }, { key: "locate", value: function(r, s) {
        return s.isEmpty() ? z.EXTERIOR : s.getEnvelopeInternal().intersects(r) ? c.locateInGeometry(r, s) : z.EXTERIOR;
      } }]);
    }(), Kf = function() {
      return h(function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }, [{ key: "getNextCW", value: function(c) {
        this.getEdges();
        var r = this._edgeList.indexOf(c), s = r - 1;
        return r === 0 && (s = this._edgeList.size() - 1), this._edgeList.get(s);
      } }, { key: "propagateSideLabels", value: function(c) {
        for (var r = z.NONE, s = this.iterator(); s.hasNext(); ) {
          var l = s.next().getLabel();
          l.isArea(c) && l.getLocation(c, ie.LEFT) !== z.NONE && (r = l.getLocation(c, ie.LEFT));
        }
        if (r === z.NONE) return null;
        for (var d = r, y = this.iterator(); y.hasNext(); ) {
          var x = y.next(), E = x.getLabel();
          if (E.getLocation(c, ie.ON) === z.NONE && E.setLocation(c, ie.ON, d), E.isArea(c)) {
            var L = E.getLocation(c, ie.LEFT), F = E.getLocation(c, ie.RIGHT);
            if (F !== z.NONE) {
              if (F !== d) throw new en("side location conflict", x.getCoordinate());
              L === z.NONE && ee.shouldNeverReachHere("found single null side (at " + x.getCoordinate() + ")"), d = L;
            } else ee.isTrue(E.getLocation(c, ie.LEFT) === z.NONE, "found single null side"), E.setLocation(c, ie.RIGHT, d), E.setLocation(c, ie.LEFT, d);
          }
        }
      } }, { key: "getCoordinate", value: function() {
        var c = this.iterator();
        return c.hasNext() ? c.next().getCoordinate() : null;
      } }, { key: "print", value: function(c) {
        Mt.out.println("EdgeEndStar:   " + this.getCoordinate());
        for (var r = this.iterator(); r.hasNext(); )
          r.next().print(c);
      } }, { key: "isAreaLabelsConsistent", value: function(c) {
        return this.computeEdgeEndLabels(c.getBoundaryNodeRule()), this.checkAreaLabelsConsistent(0);
      } }, { key: "checkAreaLabelsConsistent", value: function(c) {
        var r = this.getEdges();
        if (r.size() <= 0) return !0;
        var s = r.size() - 1, l = r.get(s).getLabel().getLocation(c, ie.LEFT);
        ee.isTrue(l !== z.NONE, "Found unlabelled area edge");
        for (var d = l, y = this.iterator(); y.hasNext(); ) {
          var x = y.next().getLabel();
          ee.isTrue(x.isArea(c), "Found non-area edge");
          var E = x.getLocation(c, ie.LEFT), L = x.getLocation(c, ie.RIGHT);
          if (E === L || L !== d) return !1;
          d = E;
        }
        return !0;
      } }, { key: "findIndex", value: function(c) {
        this.iterator();
        for (var r = 0; r < this._edgeList.size(); r++)
          if (this._edgeList.get(r) === c) return r;
        return -1;
      } }, { key: "iterator", value: function() {
        return this.getEdges().iterator();
      } }, { key: "getEdges", value: function() {
        return this._edgeList === null && (this._edgeList = new me(this._edgeMap.values())), this._edgeList;
      } }, { key: "getLocation", value: function(c, r, s) {
        return this._ptInAreaLocation[c] === z.NONE && (this._ptInAreaLocation[c] = Zf.locate(r, s[c].getGeometry())), this._ptInAreaLocation[c];
      } }, { key: "toString", value: function() {
        var c = new fn();
        c.append("EdgeEndStar:   " + this.getCoordinate()), c.append(`
`);
        for (var r = this.iterator(); r.hasNext(); ) {
          var s = r.next();
          c.append(s), c.append(`
`);
        }
        return c.toString();
      } }, { key: "computeEdgeEndLabels", value: function(c) {
        for (var r = this.iterator(); r.hasNext(); )
          r.next().computeLabel(c);
      } }, { key: "computeLabelling", value: function(c) {
        this.computeEdgeEndLabels(c[0].getBoundaryNodeRule()), this.propagateSideLabels(0), this.propagateSideLabels(1);
        for (var r = [!1, !1], s = this.iterator(); s.hasNext(); ) for (var l = s.next().getLabel(), d = 0; d < 2; d++) l.isLine(d) && l.getLocation(d) === z.BOUNDARY && (r[d] = !0);
        for (var y = this.iterator(); y.hasNext(); ) for (var x = y.next(), E = x.getLabel(), L = 0; L < 2; L++) if (E.isAnyNull(L)) {
          var F = z.NONE;
          if (r[L]) F = z.EXTERIOR;
          else {
            var $ = x.getCoordinate();
            F = this.getLocation(L, $, c);
          }
          E.setAllLocationsIfNull(L, F);
        }
      } }, { key: "getDegree", value: function() {
        return this._edgeMap.size();
      } }, { key: "insertEdgeEnd", value: function(c, r) {
        this._edgeMap.put(c, r), this._edgeList = null;
      } }], [{ key: "constructor_", value: function() {
        this._edgeMap = new vr(), this._edgeList = null, this._ptInAreaLocation = [z.NONE, z.NONE];
      } }]);
    }(), Qf = function(c) {
      function r() {
        var s;
        return o(this, r), s = i(this, r), r.constructor_.apply(s, arguments), s;
      }
      return v(r, c), h(r, [{ key: "linkResultDirectedEdges", value: function() {
        this.getResultAreaEdges();
        for (var s = null, l = null, d = this._SCANNING_FOR_INCOMING, y = 0; y < this._resultAreaEdgeList.size(); y++) {
          var x = this._resultAreaEdgeList.get(y), E = x.getSym();
          if (x.getLabel().isArea()) switch (s === null && x.isInResult() && (s = x), d) {
            case this._SCANNING_FOR_INCOMING:
              if (!E.isInResult()) continue;
              l = E, d = this._LINKING_TO_OUTGOING;
              break;
            case this._LINKING_TO_OUTGOING:
              if (!x.isInResult()) continue;
              l.setNext(x), d = this._SCANNING_FOR_INCOMING;
          }
        }
        if (d === this._LINKING_TO_OUTGOING) {
          if (s === null) throw new en("no outgoing dirEdge found", this.getCoordinate());
          ee.isTrue(s.isInResult(), "unable to link last incoming dirEdge"), l.setNext(s);
        }
      } }, { key: "insert", value: function(s) {
        var l = s;
        this.insertEdgeEnd(l, l);
      } }, { key: "getRightmostEdge", value: function() {
        var s = this.getEdges(), l = s.size();
        if (l < 1) return null;
        var d = s.get(0);
        if (l === 1) return d;
        var y = s.get(l - 1), x = d.getQuadrant(), E = y.getQuadrant();
        return dt.isNorthern(x) && dt.isNorthern(E) ? d : dt.isNorthern(x) || dt.isNorthern(E) ? d.getDy() !== 0 ? d : y.getDy() !== 0 ? y : (ee.shouldNeverReachHere("found two horizontal edges incident on node"), null) : y;
      } }, { key: "print", value: function(s) {
        Mt.out.println("DirectedEdgeStar: " + this.getCoordinate());
        for (var l = this.iterator(); l.hasNext(); ) {
          var d = l.next();
          s.print("out "), d.print(s), s.println(), s.print("in "), d.getSym().print(s), s.println();
        }
      } }, { key: "getResultAreaEdges", value: function() {
        if (this._resultAreaEdgeList !== null) return this._resultAreaEdgeList;
        this._resultAreaEdgeList = new me();
        for (var s = this.iterator(); s.hasNext(); ) {
          var l = s.next();
          (l.isInResult() || l.getSym().isInResult()) && this._resultAreaEdgeList.add(l);
        }
        return this._resultAreaEdgeList;
      } }, { key: "updateLabelling", value: function(s) {
        for (var l = this.iterator(); l.hasNext(); ) {
          var d = l.next().getLabel();
          d.setAllLocationsIfNull(0, s.getLocation(0)), d.setAllLocationsIfNull(1, s.getLocation(1));
        }
      } }, { key: "linkAllDirectedEdges", value: function() {
        this.getEdges();
        for (var s = null, l = null, d = this._edgeList.size() - 1; d >= 0; d--) {
          var y = this._edgeList.get(d), x = y.getSym();
          l === null && (l = x), s !== null && x.setNext(s), s = y;
        }
        l.setNext(s);
      } }, { key: "computeDepths", value: function() {
        if (arguments.length === 1) {
          var s = arguments[0], l = this.findIndex(s), d = s.getDepth(ie.LEFT), y = s.getDepth(ie.RIGHT), x = this.computeDepths(l + 1, this._edgeList.size(), d);
          if (this.computeDepths(0, l, x) !== y) throw new en("depth mismatch at " + s.getCoordinate());
        } else if (arguments.length === 3) {
          for (var E = arguments[1], L = arguments[2], F = arguments[0]; F < E; F++) {
            var $ = this._edgeList.get(F);
            $.setEdgeDepths(ie.RIGHT, L), L = $.getDepth(ie.LEFT);
          }
          return L;
        }
      } }, { key: "mergeSymLabels", value: function() {
        for (var s = this.iterator(); s.hasNext(); ) {
          var l = s.next();
          l.getLabel().merge(l.getSym().getLabel());
        }
      } }, { key: "linkMinimalDirectedEdges", value: function(s) {
        for (var l = null, d = null, y = this._SCANNING_FOR_INCOMING, x = this._resultAreaEdgeList.size() - 1; x >= 0; x--) {
          var E = this._resultAreaEdgeList.get(x), L = E.getSym();
          switch (l === null && E.getEdgeRing() === s && (l = E), y) {
            case this._SCANNING_FOR_INCOMING:
              if (L.getEdgeRing() !== s) continue;
              d = L, y = this._LINKING_TO_OUTGOING;
              break;
            case this._LINKING_TO_OUTGOING:
              if (E.getEdgeRing() !== s) continue;
              d.setNextMin(E), y = this._SCANNING_FOR_INCOMING;
          }
        }
        y === this._LINKING_TO_OUTGOING && (ee.isTrue(l !== null, "found null for first outgoing dirEdge"), ee.isTrue(l.getEdgeRing() === s, "unable to link last incoming dirEdge"), d.setNextMin(l));
      } }, { key: "getOutgoingDegree", value: function() {
        if (arguments.length === 0) {
          for (var s = 0, l = this.iterator(); l.hasNext(); )
            l.next().isInResult() && s++;
          return s;
        }
        if (arguments.length === 1) {
          for (var d = arguments[0], y = 0, x = this.iterator(); x.hasNext(); )
            x.next().getEdgeRing() === d && y++;
          return y;
        }
      } }, { key: "getLabel", value: function() {
        return this._label;
      } }, { key: "findCoveredLineEdges", value: function() {
        for (var s = z.NONE, l = this.iterator(); l.hasNext(); ) {
          var d = l.next(), y = d.getSym();
          if (!d.isLineEdge()) {
            if (d.isInResult()) {
              s = z.INTERIOR;
              break;
            }
            if (y.isInResult()) {
              s = z.EXTERIOR;
              break;
            }
          }
        }
        if (s === z.NONE) return null;
        for (var x = s, E = this.iterator(); E.hasNext(); ) {
          var L = E.next(), F = L.getSym();
          L.isLineEdge() ? L.getEdge().setCovered(x === z.INTERIOR) : (L.isInResult() && (x = z.EXTERIOR), F.isInResult() && (x = z.INTERIOR));
        }
      } }, { key: "computeLabelling", value: function(s) {
        w(r, "computeLabelling", this, 1).call(this, s), this._label = new Pt(z.NONE);
        for (var l = this.iterator(); l.hasNext(); ) for (var d = l.next().getEdge().getLabel(), y = 0; y < 2; y++) {
          var x = d.getLocation(y);
          x !== z.INTERIOR && x !== z.BOUNDARY || this._label.setLocation(y, z.INTERIOR);
        }
      } }], [{ key: "constructor_", value: function() {
        this._resultAreaEdgeList = null, this._label = null, this._SCANNING_FOR_INCOMING = 1, this._LINKING_TO_OUTGOING = 2;
      } }]);
    }(Kf), Jf = function(c) {
      function r() {
        return o(this, r), i(this, r);
      }
      return v(r, c), h(r, [{ key: "createNode", value: function(s) {
        return new gi(s, new Qf());
      } }]);
    }(Aa), Ha = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "compareTo", value: function(r) {
        var s = r;
        return c.compareOriented(this._pts, this._orientation, s._pts, s._orientation);
      } }, { key: "interfaces_", get: function() {
        return [V];
      } }], [{ key: "constructor_", value: function() {
        this._pts = null, this._orientation = null;
        var r = arguments[0];
        this._pts = r, this._orientation = c.orientation(r);
      } }, { key: "orientation", value: function(r) {
        return tt.increasingDirection(r) === 1;
      } }, { key: "compareOriented", value: function(r, s, l, d) {
        for (var y = s ? 1 : -1, x = d ? 1 : -1, E = s ? r.length : -1, L = d ? l.length : -1, F = s ? 0 : r.length - 1, $ = d ? 0 : l.length - 1; ; ) {
          var K = r[F].compareTo(l[$]);
          if (K !== 0) return K;
          var ne = (F += y) === E, ue = ($ += x) === L;
          if (ne && !ue) return -1;
          if (!ne && ue) return 1;
          if (ne && ue) return 0;
        }
      } }]);
    }(), jf = function() {
      return h(function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }, [{ key: "print", value: function(c) {
        c.print("MULTILINESTRING ( ");
        for (var r = 0; r < this._edges.size(); r++) {
          var s = this._edges.get(r);
          r > 0 && c.print(","), c.print("(");
          for (var l = s.getCoordinates(), d = 0; d < l.length; d++) d > 0 && c.print(","), c.print(l[d].x + " " + l[d].y);
          c.println(")");
        }
        c.print(")  ");
      } }, { key: "addAll", value: function(c) {
        for (var r = c.iterator(); r.hasNext(); ) this.add(r.next());
      } }, { key: "findEdgeIndex", value: function(c) {
        for (var r = 0; r < this._edges.size(); r++) if (this._edges.get(r).equals(c)) return r;
        return -1;
      } }, { key: "iterator", value: function() {
        return this._edges.iterator();
      } }, { key: "getEdges", value: function() {
        return this._edges;
      } }, { key: "get", value: function(c) {
        return this._edges.get(c);
      } }, { key: "findEqualEdge", value: function(c) {
        var r = new Ha(c.getCoordinates());
        return this._ocaMap.get(r);
      } }, { key: "add", value: function(c) {
        this._edges.add(c);
        var r = new Ha(c.getCoordinates());
        this._ocaMap.put(r, c);
      } }], [{ key: "constructor_", value: function() {
        this._edges = new me(), this._ocaMap = new vr();
      } }]);
    }(), Wa = function() {
      return h(function c() {
        o(this, c);
      }, [{ key: "processIntersections", value: function(c, r, s, l) {
      } }, { key: "isDone", value: function() {
      } }]);
    }(), eg = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "isTrivialIntersection", value: function(r, s, l, d) {
        if (r === l && this._li.getIntersectionNum() === 1) {
          if (c.isAdjacentSegments(s, d)) return !0;
          if (r.isClosed()) {
            var y = r.size() - 1;
            if (s === 0 && d === y || d === 0 && s === y) return !0;
          }
        }
        return !1;
      } }, { key: "getProperIntersectionPoint", value: function() {
        return this._properIntersectionPoint;
      } }, { key: "hasProperInteriorIntersection", value: function() {
        return this._hasProperInterior;
      } }, { key: "getLineIntersector", value: function() {
        return this._li;
      } }, { key: "hasProperIntersection", value: function() {
        return this._hasProper;
      } }, { key: "processIntersections", value: function(r, s, l, d) {
        if (r === l && s === d) return null;
        this.numTests++;
        var y = r.getCoordinates()[s], x = r.getCoordinates()[s + 1], E = l.getCoordinates()[d], L = l.getCoordinates()[d + 1];
        this._li.computeIntersection(y, x, E, L), this._li.hasIntersection() && (this.numIntersections++, this._li.isInteriorIntersection() && (this.numInteriorIntersections++, this._hasInterior = !0), this.isTrivialIntersection(r, s, l, d) || (this._hasIntersection = !0, r.addIntersections(this._li, s, 0), l.addIntersections(this._li, d, 1), this._li.isProper() && (this.numProperIntersections++, this._hasProper = !0, this._hasProperInterior = !0)));
      } }, { key: "hasIntersection", value: function() {
        return this._hasIntersection;
      } }, { key: "isDone", value: function() {
        return !1;
      } }, { key: "hasInteriorIntersection", value: function() {
        return this._hasInterior;
      } }, { key: "interfaces_", get: function() {
        return [Wa];
      } }], [{ key: "constructor_", value: function() {
        this._hasIntersection = !1, this._hasProper = !1, this._hasProperInterior = !1, this._hasInterior = !1, this._properIntersectionPoint = null, this._li = null, this._isSelfIntersection = null, this.numIntersections = 0, this.numInteriorIntersections = 0, this.numProperIntersections = 0, this.numTests = 0;
        var r = arguments[0];
        this._li = r;
      } }, { key: "isAdjacentSegments", value: function(r, s) {
        return Math.abs(r - s) === 1;
      } }]);
    }(), tg = function() {
      return h(function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }, [{ key: "getSegmentIndex", value: function() {
        return this.segmentIndex;
      } }, { key: "getCoordinate", value: function() {
        return this.coord;
      } }, { key: "print", value: function(c) {
        c.print(this.coord), c.print(" seg # = " + this.segmentIndex), c.println(" dist = " + this.dist);
      } }, { key: "compareTo", value: function(c) {
        var r = c;
        return this.compare(r.segmentIndex, r.dist);
      } }, { key: "isEndPoint", value: function(c) {
        return this.segmentIndex === 0 && this.dist === 0 || this.segmentIndex === c;
      } }, { key: "toString", value: function() {
        return this.coord + " seg # = " + this.segmentIndex + " dist = " + this.dist;
      } }, { key: "getDistance", value: function() {
        return this.dist;
      } }, { key: "compare", value: function(c, r) {
        return this.segmentIndex < c ? -1 : this.segmentIndex > c ? 1 : this.dist < r ? -1 : this.dist > r ? 1 : 0;
      } }, { key: "interfaces_", get: function() {
        return [V];
      } }], [{ key: "constructor_", value: function() {
        this.coord = null, this.segmentIndex = null, this.dist = null;
        var c = arguments[0], r = arguments[1], s = arguments[2];
        this.coord = new Z(c), this.segmentIndex = r, this.dist = s;
      } }]);
    }(), ng = function() {
      return h(function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }, [{ key: "print", value: function(c) {
        c.println("Intersections:");
        for (var r = this.iterator(); r.hasNext(); )
          r.next().print(c);
      } }, { key: "iterator", value: function() {
        return this._nodeMap.values().iterator();
      } }, { key: "addSplitEdges", value: function(c) {
        this.addEndpoints();
        for (var r = this.iterator(), s = r.next(); r.hasNext(); ) {
          var l = r.next(), d = this.createSplitEdge(s, l);
          c.add(d), s = l;
        }
      } }, { key: "addEndpoints", value: function() {
        var c = this.edge.pts.length - 1;
        this.add(this.edge.pts[0], 0, 0), this.add(this.edge.pts[c], c, 0);
      } }, { key: "createSplitEdge", value: function(c, r) {
        var s = r.segmentIndex - c.segmentIndex + 2, l = this.edge.pts[r.segmentIndex], d = r.dist > 0 || !r.coord.equals2D(l);
        d || s--;
        var y = new Array(s).fill(null), x = 0;
        y[x++] = new Z(c.coord);
        for (var E = c.segmentIndex + 1; E <= r.segmentIndex; E++) y[x++] = this.edge.pts[E];
        return d && (y[x] = r.coord), new Za(y, new Pt(this.edge._label));
      } }, { key: "add", value: function(c, r, s) {
        var l = new tg(c, r, s), d = this._nodeMap.get(l);
        return d !== null ? d : (this._nodeMap.put(l, l), l);
      } }, { key: "isIntersection", value: function(c) {
        for (var r = this.iterator(); r.hasNext(); )
          if (r.next().coord.equals(c)) return !0;
        return !1;
      } }], [{ key: "constructor_", value: function() {
        this._nodeMap = new vr(), this.edge = null;
        var c = arguments[0];
        this.edge = c;
      } }]);
    }(), rg = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "isIntersects", value: function() {
        return !this.isDisjoint();
      } }, { key: "isCovers", value: function() {
        return (c.isTrue(this._matrix[z.INTERIOR][z.INTERIOR]) || c.isTrue(this._matrix[z.INTERIOR][z.BOUNDARY]) || c.isTrue(this._matrix[z.BOUNDARY][z.INTERIOR]) || c.isTrue(this._matrix[z.BOUNDARY][z.BOUNDARY])) && this._matrix[z.EXTERIOR][z.INTERIOR] === oe.FALSE && this._matrix[z.EXTERIOR][z.BOUNDARY] === oe.FALSE;
      } }, { key: "isCoveredBy", value: function() {
        return (c.isTrue(this._matrix[z.INTERIOR][z.INTERIOR]) || c.isTrue(this._matrix[z.INTERIOR][z.BOUNDARY]) || c.isTrue(this._matrix[z.BOUNDARY][z.INTERIOR]) || c.isTrue(this._matrix[z.BOUNDARY][z.BOUNDARY])) && this._matrix[z.INTERIOR][z.EXTERIOR] === oe.FALSE && this._matrix[z.BOUNDARY][z.EXTERIOR] === oe.FALSE;
      } }, { key: "set", value: function() {
        if (arguments.length === 1) for (var r = arguments[0], s = 0; s < r.length; s++) {
          var l = Math.trunc(s / 3), d = s % 3;
          this._matrix[l][d] = oe.toDimensionValue(r.charAt(s));
        }
        else if (arguments.length === 3) {
          var y = arguments[0], x = arguments[1], E = arguments[2];
          this._matrix[y][x] = E;
        }
      } }, { key: "isContains", value: function() {
        return c.isTrue(this._matrix[z.INTERIOR][z.INTERIOR]) && this._matrix[z.EXTERIOR][z.INTERIOR] === oe.FALSE && this._matrix[z.EXTERIOR][z.BOUNDARY] === oe.FALSE;
      } }, { key: "setAtLeast", value: function() {
        if (arguments.length === 1) for (var r = arguments[0], s = 0; s < r.length; s++) {
          var l = Math.trunc(s / 3), d = s % 3;
          this.setAtLeast(l, d, oe.toDimensionValue(r.charAt(s)));
        }
        else if (arguments.length === 3) {
          var y = arguments[0], x = arguments[1], E = arguments[2];
          this._matrix[y][x] < E && (this._matrix[y][x] = E);
        }
      } }, { key: "setAtLeastIfValid", value: function(r, s, l) {
        r >= 0 && s >= 0 && this.setAtLeast(r, s, l);
      } }, { key: "isWithin", value: function() {
        return c.isTrue(this._matrix[z.INTERIOR][z.INTERIOR]) && this._matrix[z.INTERIOR][z.EXTERIOR] === oe.FALSE && this._matrix[z.BOUNDARY][z.EXTERIOR] === oe.FALSE;
      } }, { key: "isTouches", value: function(r, s) {
        return r > s ? this.isTouches(s, r) : (r === oe.A && s === oe.A || r === oe.L && s === oe.L || r === oe.L && s === oe.A || r === oe.P && s === oe.A || r === oe.P && s === oe.L) && this._matrix[z.INTERIOR][z.INTERIOR] === oe.FALSE && (c.isTrue(this._matrix[z.INTERIOR][z.BOUNDARY]) || c.isTrue(this._matrix[z.BOUNDARY][z.INTERIOR]) || c.isTrue(this._matrix[z.BOUNDARY][z.BOUNDARY]));
      } }, { key: "isOverlaps", value: function(r, s) {
        return r === oe.P && s === oe.P || r === oe.A && s === oe.A ? c.isTrue(this._matrix[z.INTERIOR][z.INTERIOR]) && c.isTrue(this._matrix[z.INTERIOR][z.EXTERIOR]) && c.isTrue(this._matrix[z.EXTERIOR][z.INTERIOR]) : r === oe.L && s === oe.L && this._matrix[z.INTERIOR][z.INTERIOR] === 1 && c.isTrue(this._matrix[z.INTERIOR][z.EXTERIOR]) && c.isTrue(this._matrix[z.EXTERIOR][z.INTERIOR]);
      } }, { key: "isEquals", value: function(r, s) {
        return r === s && c.isTrue(this._matrix[z.INTERIOR][z.INTERIOR]) && this._matrix[z.INTERIOR][z.EXTERIOR] === oe.FALSE && this._matrix[z.BOUNDARY][z.EXTERIOR] === oe.FALSE && this._matrix[z.EXTERIOR][z.INTERIOR] === oe.FALSE && this._matrix[z.EXTERIOR][z.BOUNDARY] === oe.FALSE;
      } }, { key: "toString", value: function() {
        for (var r = new ci("123456789"), s = 0; s < 3; s++) for (var l = 0; l < 3; l++) r.setCharAt(3 * s + l, oe.toDimensionSymbol(this._matrix[s][l]));
        return r.toString();
      } }, { key: "setAll", value: function(r) {
        for (var s = 0; s < 3; s++) for (var l = 0; l < 3; l++) this._matrix[s][l] = r;
      } }, { key: "get", value: function(r, s) {
        return this._matrix[r][s];
      } }, { key: "transpose", value: function() {
        var r = this._matrix[1][0];
        return this._matrix[1][0] = this._matrix[0][1], this._matrix[0][1] = r, r = this._matrix[2][0], this._matrix[2][0] = this._matrix[0][2], this._matrix[0][2] = r, r = this._matrix[2][1], this._matrix[2][1] = this._matrix[1][2], this._matrix[1][2] = r, this;
      } }, { key: "matches", value: function(r) {
        if (r.length !== 9) throw new R("Should be length 9: " + r);
        for (var s = 0; s < 3; s++) for (var l = 0; l < 3; l++) if (!c.matches(this._matrix[s][l], r.charAt(3 * s + l))) return !1;
        return !0;
      } }, { key: "add", value: function(r) {
        for (var s = 0; s < 3; s++) for (var l = 0; l < 3; l++) this.setAtLeast(s, l, r.get(s, l));
      } }, { key: "isDisjoint", value: function() {
        return this._matrix[z.INTERIOR][z.INTERIOR] === oe.FALSE && this._matrix[z.INTERIOR][z.BOUNDARY] === oe.FALSE && this._matrix[z.BOUNDARY][z.INTERIOR] === oe.FALSE && this._matrix[z.BOUNDARY][z.BOUNDARY] === oe.FALSE;
      } }, { key: "isCrosses", value: function(r, s) {
        return r === oe.P && s === oe.L || r === oe.P && s === oe.A || r === oe.L && s === oe.A ? c.isTrue(this._matrix[z.INTERIOR][z.INTERIOR]) && c.isTrue(this._matrix[z.INTERIOR][z.EXTERIOR]) : r === oe.L && s === oe.P || r === oe.A && s === oe.P || r === oe.A && s === oe.L ? c.isTrue(this._matrix[z.INTERIOR][z.INTERIOR]) && c.isTrue(this._matrix[z.EXTERIOR][z.INTERIOR]) : r === oe.L && s === oe.L && this._matrix[z.INTERIOR][z.INTERIOR] === 0;
      } }, { key: "interfaces_", get: function() {
        return [k];
      } }], [{ key: "constructor_", value: function() {
        if (this._matrix = null, arguments.length === 0) this._matrix = Array(3).fill().map(function() {
          return Array(3);
        }), this.setAll(oe.FALSE);
        else if (arguments.length === 1) {
          if (typeof arguments[0] == "string") {
            var r = arguments[0];
            c.constructor_.call(this), this.set(r);
          } else if (arguments[0] instanceof c) {
            var s = arguments[0];
            c.constructor_.call(this), this._matrix[z.INTERIOR][z.INTERIOR] = s._matrix[z.INTERIOR][z.INTERIOR], this._matrix[z.INTERIOR][z.BOUNDARY] = s._matrix[z.INTERIOR][z.BOUNDARY], this._matrix[z.INTERIOR][z.EXTERIOR] = s._matrix[z.INTERIOR][z.EXTERIOR], this._matrix[z.BOUNDARY][z.INTERIOR] = s._matrix[z.BOUNDARY][z.INTERIOR], this._matrix[z.BOUNDARY][z.BOUNDARY] = s._matrix[z.BOUNDARY][z.BOUNDARY], this._matrix[z.BOUNDARY][z.EXTERIOR] = s._matrix[z.BOUNDARY][z.EXTERIOR], this._matrix[z.EXTERIOR][z.INTERIOR] = s._matrix[z.EXTERIOR][z.INTERIOR], this._matrix[z.EXTERIOR][z.BOUNDARY] = s._matrix[z.EXTERIOR][z.BOUNDARY], this._matrix[z.EXTERIOR][z.EXTERIOR] = s._matrix[z.EXTERIOR][z.EXTERIOR];
          }
        }
      } }, { key: "matches", value: function() {
        if (Number.isInteger(arguments[0]) && typeof arguments[1] == "string") {
          var r = arguments[0], s = arguments[1];
          return s === oe.SYM_DONTCARE || s === oe.SYM_TRUE && (r >= 0 || r === oe.TRUE) || s === oe.SYM_FALSE && r === oe.FALSE || s === oe.SYM_P && r === oe.P || s === oe.SYM_L && r === oe.L || s === oe.SYM_A && r === oe.A;
        }
        if (typeof arguments[0] == "string" && typeof arguments[1] == "string") {
          var l = arguments[1];
          return new c(arguments[0]).matches(l);
        }
      } }, { key: "isTrue", value: function(r) {
        return r >= 0 || r === oe.TRUE;
      } }]);
    }(), ig = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "size", value: function() {
        return this._size;
      } }, { key: "addAll", value: function(r) {
        return r === null || r.length === 0 ? null : (this.ensureCapacity(this._size + r.length), Mt.arraycopy(r, 0, this._data, this._size, r.length), void (this._size += r.length));
      } }, { key: "ensureCapacity", value: function(r) {
        if (r <= this._data.length) return null;
        var s = Math.max(r, 2 * this._data.length);
        this._data = wn.copyOf(this._data, s);
      } }, { key: "toArray", value: function() {
        var r = new Array(this._size).fill(null);
        return Mt.arraycopy(this._data, 0, r, 0, this._size), r;
      } }, { key: "add", value: function(r) {
        this.ensureCapacity(this._size + 1), this._data[this._size] = r, ++this._size;
      } }], [{ key: "constructor_", value: function() {
        if (this._data = null, this._size = 0, arguments.length === 0) c.constructor_.call(this, 10);
        else if (arguments.length === 1) {
          var r = arguments[0];
          this._data = new Array(r).fill(null);
        }
      } }]);
    }(), sg = function() {
      function c() {
        o(this, c);
      }
      return h(c, [{ key: "getChainStartIndices", value: function(r) {
        var s = 0, l = new ig(Math.trunc(r.length / 2));
        l.add(s);
        do {
          var d = this.findChainEnd(r, s);
          l.add(d), s = d;
        } while (s < r.length - 1);
        return l.toArray();
      } }, { key: "findChainEnd", value: function(r, s) {
        for (var l = dt.quadrant(r[s], r[s + 1]), d = s + 1; d < r.length && dt.quadrant(r[d - 1], r[d]) === l; )
          d++;
        return d - 1;
      } }, { key: "OLDgetChainStartIndices", value: function(r) {
        var s = 0, l = new me();
        l.add(s);
        do {
          var d = this.findChainEnd(r, s);
          l.add(d), s = d;
        } while (s < r.length - 1);
        return c.toIntArray(l);
      } }], [{ key: "toIntArray", value: function(r) {
        for (var s = new Array(r.size()).fill(null), l = 0; l < s.length; l++) s[l] = r.get(l).intValue();
        return s;
      } }]);
    }(), og = function() {
      return h(function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }, [{ key: "getCoordinates", value: function() {
        return this.pts;
      } }, { key: "getMaxX", value: function(c) {
        var r = this.pts[this.startIndex[c]].x, s = this.pts[this.startIndex[c + 1]].x;
        return r > s ? r : s;
      } }, { key: "getMinX", value: function(c) {
        var r = this.pts[this.startIndex[c]].x, s = this.pts[this.startIndex[c + 1]].x;
        return r < s ? r : s;
      } }, { key: "computeIntersectsForChain", value: function() {
        if (arguments.length === 4) {
          var c = arguments[0], r = arguments[1], s = arguments[2], l = arguments[3];
          this.computeIntersectsForChain(this.startIndex[c], this.startIndex[c + 1], r, r.startIndex[s], r.startIndex[s + 1], l);
        } else if (arguments.length === 6) {
          var d = arguments[0], y = arguments[1], x = arguments[2], E = arguments[3], L = arguments[4], F = arguments[5];
          if (y - d == 1 && L - E == 1) return F.addIntersections(this.e, d, x.e, E), null;
          if (!this.overlaps(d, y, x, E, L)) return null;
          var $ = Math.trunc((d + y) / 2), K = Math.trunc((E + L) / 2);
          d < $ && (E < K && this.computeIntersectsForChain(d, $, x, E, K, F), K < L && this.computeIntersectsForChain(d, $, x, K, L, F)), $ < y && (E < K && this.computeIntersectsForChain($, y, x, E, K, F), K < L && this.computeIntersectsForChain($, y, x, K, L, F));
        }
      } }, { key: "overlaps", value: function(c, r, s, l, d) {
        return _e.intersects(this.pts[c], this.pts[r], s.pts[l], s.pts[d]);
      } }, { key: "getStartIndexes", value: function() {
        return this.startIndex;
      } }, { key: "computeIntersects", value: function(c, r) {
        for (var s = 0; s < this.startIndex.length - 1; s++) for (var l = 0; l < c.startIndex.length - 1; l++) this.computeIntersectsForChain(s, c, l, r);
      } }], [{ key: "constructor_", value: function() {
        this.e = null, this.pts = null, this.startIndex = null;
        var c = arguments[0];
        this.e = c, this.pts = c.getCoordinates();
        var r = new sg();
        this.startIndex = r.getChainStartIndices(this.pts);
      } }]);
    }(), $a = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "getDepth", value: function(r, s) {
        return this._depth[r][s];
      } }, { key: "setDepth", value: function(r, s, l) {
        this._depth[r][s] = l;
      } }, { key: "isNull", value: function() {
        if (arguments.length === 0) {
          for (var r = 0; r < 2; r++) for (var s = 0; s < 3; s++) if (this._depth[r][s] !== c.NULL_VALUE) return !1;
          return !0;
        }
        if (arguments.length === 1) {
          var l = arguments[0];
          return this._depth[l][1] === c.NULL_VALUE;
        }
        if (arguments.length === 2) {
          var d = arguments[0], y = arguments[1];
          return this._depth[d][y] === c.NULL_VALUE;
        }
      } }, { key: "normalize", value: function() {
        for (var r = 0; r < 2; r++) if (!this.isNull(r)) {
          var s = this._depth[r][1];
          this._depth[r][2] < s && (s = this._depth[r][2]), s < 0 && (s = 0);
          for (var l = 1; l < 3; l++) {
            var d = 0;
            this._depth[r][l] > s && (d = 1), this._depth[r][l] = d;
          }
        }
      } }, { key: "getDelta", value: function(r) {
        return this._depth[r][ie.RIGHT] - this._depth[r][ie.LEFT];
      } }, { key: "getLocation", value: function(r, s) {
        return this._depth[r][s] <= 0 ? z.EXTERIOR : z.INTERIOR;
      } }, { key: "toString", value: function() {
        return "A: " + this._depth[0][1] + "," + this._depth[0][2] + " B: " + this._depth[1][1] + "," + this._depth[1][2];
      } }, { key: "add", value: function() {
        if (arguments.length === 1) for (var r = arguments[0], s = 0; s < 2; s++) for (var l = 1; l < 3; l++) {
          var d = r.getLocation(s, l);
          d !== z.EXTERIOR && d !== z.INTERIOR || (this.isNull(s, l) ? this._depth[s][l] = c.depthAtLocation(d) : this._depth[s][l] += c.depthAtLocation(d));
        }
        else if (arguments.length === 3) {
          var y = arguments[0], x = arguments[1];
          arguments[2] === z.INTERIOR && this._depth[y][x]++;
        }
      } }], [{ key: "constructor_", value: function() {
        this._depth = Array(2).fill().map(function() {
          return Array(3);
        });
        for (var r = 0; r < 2; r++) for (var s = 0; s < 3; s++) this._depth[r][s] = c.NULL_VALUE;
      } }, { key: "depthAtLocation", value: function(r) {
        return r === z.EXTERIOR ? 0 : r === z.INTERIOR ? 1 : c.NULL_VALUE;
      } }]);
    }();
    $a.NULL_VALUE = -1;
    var Za = function(c) {
      function r() {
        var s;
        return o(this, r), s = i(this, r), r.constructor_.apply(s, arguments), s;
      }
      return v(r, c), h(r, [{ key: "getDepth", value: function() {
        return this._depth;
      } }, { key: "getCollapsedEdge", value: function() {
        var s = new Array(2).fill(null);
        return s[0] = this.pts[0], s[1] = this.pts[1], new r(s, Pt.toLineLabel(this._label));
      } }, { key: "isIsolated", value: function() {
        return this._isIsolated;
      } }, { key: "getCoordinates", value: function() {
        return this.pts;
      } }, { key: "setIsolated", value: function(s) {
        this._isIsolated = s;
      } }, { key: "setName", value: function(s) {
        this._name = s;
      } }, { key: "equals", value: function(s) {
        if (!(s instanceof r)) return !1;
        var l = s;
        if (this.pts.length !== l.pts.length) return !1;
        for (var d = !0, y = !0, x = this.pts.length, E = 0; E < this.pts.length; E++) if (this.pts[E].equals2D(l.pts[E]) || (d = !1), this.pts[E].equals2D(l.pts[--x]) || (y = !1), !d && !y) return !1;
        return !0;
      } }, { key: "getCoordinate", value: function() {
        if (arguments.length === 0) return this.pts.length > 0 ? this.pts[0] : null;
        if (arguments.length === 1) {
          var s = arguments[0];
          return this.pts[s];
        }
      } }, { key: "print", value: function(s) {
        s.print("edge " + this._name + ": "), s.print("LINESTRING (");
        for (var l = 0; l < this.pts.length; l++) l > 0 && s.print(","), s.print(this.pts[l].x + " " + this.pts[l].y);
        s.print(")  " + this._label + " " + this._depthDelta);
      } }, { key: "computeIM", value: function(s) {
        r.updateIM(this._label, s);
      } }, { key: "isCollapsed", value: function() {
        return !!this._label.isArea() && this.pts.length === 3 && !!this.pts[0].equals(this.pts[2]);
      } }, { key: "isClosed", value: function() {
        return this.pts[0].equals(this.pts[this.pts.length - 1]);
      } }, { key: "getMaximumSegmentIndex", value: function() {
        return this.pts.length - 1;
      } }, { key: "getDepthDelta", value: function() {
        return this._depthDelta;
      } }, { key: "getNumPoints", value: function() {
        return this.pts.length;
      } }, { key: "printReverse", value: function(s) {
        s.print("edge " + this._name + ": ");
        for (var l = this.pts.length - 1; l >= 0; l--) s.print(this.pts[l] + " ");
        s.println("");
      } }, { key: "getMonotoneChainEdge", value: function() {
        return this._mce === null && (this._mce = new og(this)), this._mce;
      } }, { key: "getEnvelope", value: function() {
        if (this._env === null) {
          this._env = new _e();
          for (var s = 0; s < this.pts.length; s++) this._env.expandToInclude(this.pts[s]);
        }
        return this._env;
      } }, { key: "addIntersection", value: function(s, l, d, y) {
        var x = new Z(s.getIntersection(y)), E = l, L = s.getEdgeDistance(d, y), F = E + 1;
        if (F < this.pts.length) {
          var $ = this.pts[F];
          x.equals2D($) && (E = F, L = 0);
        }
        this.eiList.add(x, E, L);
      } }, { key: "toString", value: function() {
        var s = new ci();
        s.append("edge " + this._name + ": "), s.append("LINESTRING (");
        for (var l = 0; l < this.pts.length; l++) l > 0 && s.append(","), s.append(this.pts[l].x + " " + this.pts[l].y);
        return s.append(")  " + this._label + " " + this._depthDelta), s.toString();
      } }, { key: "isPointwiseEqual", value: function(s) {
        if (this.pts.length !== s.pts.length) return !1;
        for (var l = 0; l < this.pts.length; l++) if (!this.pts[l].equals2D(s.pts[l])) return !1;
        return !0;
      } }, { key: "setDepthDelta", value: function(s) {
        this._depthDelta = s;
      } }, { key: "getEdgeIntersectionList", value: function() {
        return this.eiList;
      } }, { key: "addIntersections", value: function(s, l, d) {
        for (var y = 0; y < s.getIntersectionNum(); y++) this.addIntersection(s, l, d, y);
      } }], [{ key: "constructor_", value: function() {
        if (this.pts = null, this._env = null, this.eiList = new ng(this), this._name = null, this._mce = null, this._isIsolated = !0, this._depth = new $a(), this._depthDelta = 0, arguments.length === 1) {
          var s = arguments[0];
          r.constructor_.call(this, s, null);
        } else if (arguments.length === 2) {
          var l = arguments[0], d = arguments[1];
          this.pts = l, this._label = d;
        }
      } }, { key: "updateIM", value: function() {
        if (!(arguments.length === 2 && arguments[1] instanceof rg && arguments[0] instanceof Pt)) return w(r, "updateIM", this).apply(this, arguments);
        var s = arguments[0], l = arguments[1];
        l.setAtLeastIfValid(s.getLocation(0, ie.ON), s.getLocation(1, ie.ON), 1), s.isArea() && (l.setAtLeastIfValid(s.getLocation(0, ie.LEFT), s.getLocation(1, ie.LEFT), 2), l.setAtLeastIfValid(s.getLocation(0, ie.RIGHT), s.getLocation(1, ie.RIGHT), 2));
      } }]);
    }(Pa), Ka = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "setWorkingPrecisionModel", value: function(r) {
        this._workingPrecisionModel = r;
      } }, { key: "insertUniqueEdge", value: function(r) {
        var s = this._edgeList.findEqualEdge(r);
        if (s !== null) {
          var l = s.getLabel(), d = r.getLabel();
          s.isPointwiseEqual(r) || (d = new Pt(r.getLabel())).flip(), l.merge(d);
          var y = c.depthDelta(d), x = s.getDepthDelta() + y;
          s.setDepthDelta(x);
        } else this._edgeList.add(r), r.setDepthDelta(c.depthDelta(r.getLabel()));
      } }, { key: "buildSubgraphs", value: function(r, s) {
        for (var l = new me(), d = r.iterator(); d.hasNext(); ) {
          var y = d.next(), x = y.getRightmostCoordinate(), E = new Ua(l).getDepth(x);
          y.computeDepth(E), y.findResultEdges(), l.add(y), s.add(y.getDirectedEdges(), y.getNodes());
        }
      } }, { key: "createSubgraphs", value: function(r) {
        for (var s = new me(), l = r.getNodes().iterator(); l.hasNext(); ) {
          var d = l.next();
          if (!d.isVisited()) {
            var y = new hf();
            y.create(d), s.add(y);
          }
        }
        return Dn.sort(s, Dn.reverseOrder()), s;
      } }, { key: "createEmptyResultGeometry", value: function() {
        return this._geomFact.createPolygon();
      } }, { key: "getNoder", value: function(r) {
        if (this._workingNoder !== null) return this._workingNoder;
        var s = new As(), l = new kn();
        return l.setPrecisionModel(r), s.setSegmentIntersector(new eg(l)), s;
      } }, { key: "buffer", value: function(r, s) {
        var l = this._workingPrecisionModel;
        l === null && (l = r.getPrecisionModel()), this._geomFact = r.getFactory();
        var d = new Xf(l, this._bufParams), y = new Hf(r, s, d).getCurves();
        if (y.size() <= 0) return this.createEmptyResultGeometry();
        this.computeNodedEdges(y, l), this._graph = new Ra(new Jf()), this._graph.addEdges(this._edgeList.getEdges());
        var x = this.createSubgraphs(this._graph), E = new Nf(this._geomFact);
        this.buildSubgraphs(x, E);
        var L = E.getPolygons();
        return L.size() <= 0 ? this.createEmptyResultGeometry() : this._geomFact.buildGeometry(L);
      } }, { key: "computeNodedEdges", value: function(r, s) {
        var l = this.getNoder(s);
        l.computeNodes(r);
        for (var d = l.getNodedSubstrings().iterator(); d.hasNext(); ) {
          var y = d.next(), x = y.getCoordinates();
          if (x.length !== 2 || !x[0].equals2D(x[1])) {
            var E = y.getData(), L = new Za(y.getCoordinates(), new Pt(E));
            this.insertUniqueEdge(L);
          }
        }
      } }, { key: "setNoder", value: function(r) {
        this._workingNoder = r;
      } }], [{ key: "constructor_", value: function() {
        this._bufParams = null, this._workingPrecisionModel = null, this._workingNoder = null, this._geomFact = null, this._graph = null, this._edgeList = new jf();
        var r = arguments[0];
        this._bufParams = r;
      } }, { key: "depthDelta", value: function(r) {
        var s = r.getLocation(0, ie.LEFT), l = r.getLocation(0, ie.RIGHT);
        return s === z.INTERIOR && l === z.EXTERIOR ? 1 : s === z.EXTERIOR && l === z.INTERIOR ? -1 : 0;
      } }, { key: "convertSegStrings", value: function(r) {
        for (var s = new An(), l = new me(); r.hasNext(); ) {
          var d = r.next(), y = s.createLineString(d.getCoordinates());
          l.add(y);
        }
        return s.buildGeometry(l);
      } }]);
    }(), ag = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "rescale", value: function() {
        if (Ee(arguments[0], Me)) for (var r = arguments[0].iterator(); r.hasNext(); ) {
          var s = r.next();
          this.rescale(s.getCoordinates());
        }
        else if (arguments[0] instanceof Array) {
          for (var l = arguments[0], d = 0; d < l.length; d++) l[d].x = l[d].x / this._scaleFactor + this._offsetX, l[d].y = l[d].y / this._scaleFactor + this._offsetY;
          l.length === 2 && l[0].equals2D(l[1]) && Mt.out.println(l);
        }
      } }, { key: "scale", value: function() {
        if (Ee(arguments[0], Me)) {
          for (var r = arguments[0], s = new me(r.size()), l = r.iterator(); l.hasNext(); ) {
            var d = l.next();
            s.add(new Cn(this.scale(d.getCoordinates()), d.getData()));
          }
          return s;
        }
        if (arguments[0] instanceof Array) {
          for (var y = arguments[0], x = new Array(y.length).fill(null), E = 0; E < y.length; E++) x[E] = new Z(Math.round((y[E].x - this._offsetX) * this._scaleFactor), Math.round((y[E].y - this._offsetY) * this._scaleFactor), y[E].getZ());
          return tt.removeRepeatedPoints(x);
        }
      } }, { key: "isIntegerPrecision", value: function() {
        return this._scaleFactor === 1;
      } }, { key: "getNodedSubstrings", value: function() {
        var r = this._noder.getNodedSubstrings();
        return this._isScaled && this.rescale(r), r;
      } }, { key: "computeNodes", value: function(r) {
        var s = r;
        this._isScaled && (s = this.scale(r)), this._noder.computeNodes(s);
      } }, { key: "interfaces_", get: function() {
        return [Os];
      } }], [{ key: "constructor_", value: function() {
        if (this._noder = null, this._scaleFactor = null, this._offsetX = null, this._offsetY = null, this._isScaled = !1, arguments.length === 2) {
          var r = arguments[0], s = arguments[1];
          c.constructor_.call(this, r, s, 0, 0);
        } else if (arguments.length === 4) {
          var l = arguments[0], d = arguments[1];
          this._noder = l, this._scaleFactor = d, this._isScaled = !this.isIntegerPrecision();
        }
      } }]);
    }(), Qa = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "checkEndPtVertexIntersections", value: function() {
        if (arguments.length === 0) for (var r = this._segStrings.iterator(); r.hasNext(); ) {
          var s = r.next().getCoordinates();
          this.checkEndPtVertexIntersections(s[0], this._segStrings), this.checkEndPtVertexIntersections(s[s.length - 1], this._segStrings);
        }
        else if (arguments.length === 2) {
          for (var l = arguments[0], d = arguments[1].iterator(); d.hasNext(); ) for (var y = d.next().getCoordinates(), x = 1; x < y.length - 1; x++) if (y[x].equals(l)) throw new J("found endpt/interior pt intersection at index " + x + " :pt " + l);
        }
      } }, { key: "checkInteriorIntersections", value: function() {
        if (arguments.length === 0) for (var r = this._segStrings.iterator(); r.hasNext(); ) for (var s = r.next(), l = this._segStrings.iterator(); l.hasNext(); ) {
          var d = l.next();
          this.checkInteriorIntersections(s, d);
        }
        else if (arguments.length === 2) for (var y = arguments[0], x = arguments[1], E = y.getCoordinates(), L = x.getCoordinates(), F = 0; F < E.length - 1; F++) for (var $ = 0; $ < L.length - 1; $++) this.checkInteriorIntersections(y, F, x, $);
        else if (arguments.length === 4) {
          var K = arguments[0], ne = arguments[1], ue = arguments[2], he = arguments[3];
          if (K === ue && ne === he) return null;
          var ge = K.getCoordinates()[ne], Oe = K.getCoordinates()[ne + 1], Le = ue.getCoordinates()[he], Ye = ue.getCoordinates()[he + 1];
          if (this._li.computeIntersection(ge, Oe, Le, Ye), this._li.hasIntersection() && (this._li.isProper() || this.hasInteriorIntersection(this._li, ge, Oe) || this.hasInteriorIntersection(this._li, Le, Ye))) throw new J("found non-noded intersection at " + ge + "-" + Oe + " and " + Le + "-" + Ye);
        }
      } }, { key: "checkValid", value: function() {
        this.checkEndPtVertexIntersections(), this.checkInteriorIntersections(), this.checkCollapses();
      } }, { key: "checkCollapses", value: function() {
        if (arguments.length === 0) for (var r = this._segStrings.iterator(); r.hasNext(); ) {
          var s = r.next();
          this.checkCollapses(s);
        }
        else if (arguments.length === 1) for (var l = arguments[0].getCoordinates(), d = 0; d < l.length - 2; d++) this.checkCollapse(l[d], l[d + 1], l[d + 2]);
      } }, { key: "hasInteriorIntersection", value: function(r, s, l) {
        for (var d = 0; d < r.getIntersectionNum(); d++) {
          var y = r.getIntersection(d);
          if (!y.equals(s) && !y.equals(l)) return !0;
        }
        return !1;
      } }, { key: "checkCollapse", value: function(r, s, l) {
        if (r.equals(l)) throw new J("found non-noded collapse at " + c.fact.createLineString([r, s, l]));
      } }], [{ key: "constructor_", value: function() {
        this._li = new kn(), this._segStrings = null;
        var r = arguments[0];
        this._segStrings = r;
      } }]);
    }();
    Qa.fact = new An();
    var Ds = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "intersectsScaled", value: function(r, s) {
        var l = Math.min(r.x, s.x), d = Math.max(r.x, s.x), y = Math.min(r.y, s.y), x = Math.max(r.y, s.y), E = this._maxx < l || this._minx > d || this._maxy < y || this._miny > x;
        if (E) return !1;
        var L = this.intersectsToleranceSquare(r, s);
        return ee.isTrue(!(E && L), "Found bad envelope test"), L;
      } }, { key: "initCorners", value: function(r) {
        var s = 0.5;
        this._minx = r.x - s, this._maxx = r.x + s, this._miny = r.y - s, this._maxy = r.y + s, this._corner[0] = new Z(this._maxx, this._maxy), this._corner[1] = new Z(this._minx, this._maxy), this._corner[2] = new Z(this._minx, this._miny), this._corner[3] = new Z(this._maxx, this._miny);
      } }, { key: "intersects", value: function(r, s) {
        return this._scaleFactor === 1 ? this.intersectsScaled(r, s) : (this.copyScaled(r, this._p0Scaled), this.copyScaled(s, this._p1Scaled), this.intersectsScaled(this._p0Scaled, this._p1Scaled));
      } }, { key: "scale", value: function(r) {
        return Math.round(r * this._scaleFactor);
      } }, { key: "getCoordinate", value: function() {
        return this._originalPt;
      } }, { key: "copyScaled", value: function(r, s) {
        s.x = this.scale(r.x), s.y = this.scale(r.y);
      } }, { key: "getSafeEnvelope", value: function() {
        if (this._safeEnv === null) {
          var r = c.SAFE_ENV_EXPANSION_FACTOR / this._scaleFactor;
          this._safeEnv = new _e(this._originalPt.x - r, this._originalPt.x + r, this._originalPt.y - r, this._originalPt.y + r);
        }
        return this._safeEnv;
      } }, { key: "intersectsPixelClosure", value: function(r, s) {
        return this._li.computeIntersection(r, s, this._corner[0], this._corner[1]), !!this._li.hasIntersection() || (this._li.computeIntersection(r, s, this._corner[1], this._corner[2]), !!this._li.hasIntersection() || (this._li.computeIntersection(r, s, this._corner[2], this._corner[3]), !!this._li.hasIntersection() || (this._li.computeIntersection(r, s, this._corner[3], this._corner[0]), !!this._li.hasIntersection())));
      } }, { key: "intersectsToleranceSquare", value: function(r, s) {
        var l = !1, d = !1;
        return this._li.computeIntersection(r, s, this._corner[0], this._corner[1]), !!this._li.isProper() || (this._li.computeIntersection(r, s, this._corner[1], this._corner[2]), !!this._li.isProper() || (this._li.hasIntersection() && (l = !0), this._li.computeIntersection(r, s, this._corner[2], this._corner[3]), !!this._li.isProper() || (this._li.hasIntersection() && (d = !0), this._li.computeIntersection(r, s, this._corner[3], this._corner[0]), !!this._li.isProper() || !(!l || !d) || !!r.equals(this._pt) || !!s.equals(this._pt))));
      } }, { key: "addSnappedNode", value: function(r, s) {
        var l = r.getCoordinate(s), d = r.getCoordinate(s + 1);
        return !!this.intersects(l, d) && (r.addIntersection(this.getCoordinate(), s), !0);
      } }], [{ key: "constructor_", value: function() {
        this._li = null, this._pt = null, this._originalPt = null, this._ptScaled = null, this._p0Scaled = null, this._p1Scaled = null, this._scaleFactor = null, this._minx = null, this._maxx = null, this._miny = null, this._maxy = null, this._corner = new Array(4).fill(null), this._safeEnv = null;
        var r = arguments[0], s = arguments[1], l = arguments[2];
        if (this._originalPt = r, this._pt = r, this._scaleFactor = s, this._li = l, s <= 0) throw new R("Scale factor must be non-zero");
        s !== 1 && (this._pt = new Z(this.scale(r.x), this.scale(r.y)), this._p0Scaled = new Z(), this._p1Scaled = new Z()), this.initCorners(this._pt);
      } }]);
    }();
    Ds.SAFE_ENV_EXPANSION_FACTOR = 0.75;
    var ug = function() {
      return h(function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }, [{ key: "select", value: function() {
        if (arguments.length !== 1) {
          if (arguments.length === 2) {
            var c = arguments[1];
            arguments[0].getLineSegment(c, this.selectedSegment), this.select(this.selectedSegment);
          }
        }
      } }], [{ key: "constructor_", value: function() {
        this.selectedSegment = new kt();
      } }]);
    }(), Ja = function() {
      return h(function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }, [{ key: "snap", value: function() {
        if (arguments.length === 1) {
          var c = arguments[0];
          return this.snap(c, null, -1);
        }
        if (arguments.length === 3) {
          var r = arguments[0], s = arguments[1], l = arguments[2], d = r.getSafeEnvelope(), y = new ja(r, s, l);
          return this._index.query(d, new (function() {
            return h(function x() {
              o(this, x);
            }, [{ key: "interfaces_", get: function() {
              return [Fa];
            } }, { key: "visitItem", value: function(x) {
              x.select(d, y);
            } }]);
          }())()), y.isNodeAdded();
        }
      } }], [{ key: "constructor_", value: function() {
        this._index = null;
        var c = arguments[0];
        this._index = c;
      } }]);
    }(), ja = function(c) {
      function r() {
        var s;
        return o(this, r), s = i(this, r), r.constructor_.apply(s, arguments), s;
      }
      return v(r, c), h(r, [{ key: "isNodeAdded", value: function() {
        return this._isNodeAdded;
      } }, { key: "select", value: function() {
        if (!(arguments.length === 2 && Number.isInteger(arguments[1]) && arguments[0] instanceof Ga)) return w(r, "select", this, 1).apply(this, arguments);
        var s = arguments[1], l = arguments[0].getContext();
        if (this._parentEdge === l && (s === this._hotPixelVertexIndex || s + 1 === this._hotPixelVertexIndex)) return null;
        this._isNodeAdded |= this._hotPixel.addSnappedNode(l, s);
      } }], [{ key: "constructor_", value: function() {
        this._hotPixel = null, this._parentEdge = null, this._hotPixelVertexIndex = null, this._isNodeAdded = !1;
        var s = arguments[0], l = arguments[1], d = arguments[2];
        this._hotPixel = s, this._parentEdge = l, this._hotPixelVertexIndex = d;
      } }]);
    }(ug);
    Ja.HotPixelSnapAction = ja;
    var lg = function() {
      return h(function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }, [{ key: "processIntersections", value: function(c, r, s, l) {
        if (c === s && r === l) return null;
        var d = c.getCoordinates()[r], y = c.getCoordinates()[r + 1], x = s.getCoordinates()[l], E = s.getCoordinates()[l + 1];
        if (this._li.computeIntersection(d, y, x, E), this._li.hasIntersection() && this._li.isInteriorIntersection()) {
          for (var L = 0; L < this._li.getIntersectionNum(); L++) this._interiorIntersections.add(this._li.getIntersection(L));
          c.addIntersections(this._li, r, 0), s.addIntersections(this._li, l, 1);
        }
      } }, { key: "isDone", value: function() {
        return !1;
      } }, { key: "getInteriorIntersections", value: function() {
        return this._interiorIntersections;
      } }, { key: "interfaces_", get: function() {
        return [Wa];
      } }], [{ key: "constructor_", value: function() {
        this._li = null, this._interiorIntersections = null;
        var c = arguments[0];
        this._li = c, this._interiorIntersections = new me();
      } }]);
    }(), cg = function() {
      return h(function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }, [{ key: "checkCorrectness", value: function(c) {
        var r = Cn.getNodedSubstrings(c), s = new Qa(r);
        try {
          s.checkValid();
        } catch (l) {
          if (!(l instanceof A)) throw l;
          l.printStackTrace();
        }
      } }, { key: "getNodedSubstrings", value: function() {
        return Cn.getNodedSubstrings(this._nodedSegStrings);
      } }, { key: "snapRound", value: function(c, r) {
        var s = this.findInteriorIntersections(c, r);
        this.computeIntersectionSnaps(s), this.computeVertexSnaps(c);
      } }, { key: "findInteriorIntersections", value: function(c, r) {
        var s = new lg(r);
        return this._noder.setSegmentIntersector(s), this._noder.computeNodes(c), s.getInteriorIntersections();
      } }, { key: "computeVertexSnaps", value: function() {
        if (Ee(arguments[0], Me)) for (var c = arguments[0].iterator(); c.hasNext(); ) {
          var r = c.next();
          this.computeVertexSnaps(r);
        }
        else if (arguments[0] instanceof Cn) for (var s = arguments[0], l = s.getCoordinates(), d = 0; d < l.length; d++) {
          var y = new Ds(l[d], this._scaleFactor, this._li);
          this._pointSnapper.snap(y, s, d) && s.addIntersection(l[d], d);
        }
      } }, { key: "computeNodes", value: function(c) {
        this._nodedSegStrings = c, this._noder = new As(), this._pointSnapper = new Ja(this._noder.getIndex()), this.snapRound(c, this._li);
      } }, { key: "computeIntersectionSnaps", value: function(c) {
        for (var r = c.iterator(); r.hasNext(); ) {
          var s = r.next(), l = new Ds(s, this._scaleFactor, this._li);
          this._pointSnapper.snap(l);
        }
      } }, { key: "interfaces_", get: function() {
        return [Os];
      } }], [{ key: "constructor_", value: function() {
        this._pm = null, this._li = null, this._scaleFactor = null, this._noder = null, this._pointSnapper = null, this._nodedSegStrings = null;
        var c = arguments[0];
        this._pm = c, this._li = new kn(), this._li.setPrecisionModel(c), this._scaleFactor = c.getScale();
      } }]);
    }(), Gn = function() {
      function c() {
        o(this, c), c.constructor_.apply(this, arguments);
      }
      return h(c, [{ key: "bufferFixedPrecision", value: function(r) {
        var s = new ag(new cg(new Bt(1)), r.getScale()), l = new Ka(this._bufParams);
        l.setWorkingPrecisionModel(r), l.setNoder(s), this._resultGeometry = l.buffer(this._argGeom, this._distance);
      } }, { key: "bufferReducedPrecision", value: function() {
        if (arguments.length === 0) {
          for (var r = c.MAX_PRECISION_DIGITS; r >= 0; r--) {
            try {
              this.bufferReducedPrecision(r);
            } catch (y) {
              if (!(y instanceof en)) throw y;
              this._saveException = y;
            }
            if (this._resultGeometry !== null) return null;
          }
          throw this._saveException;
        }
        if (arguments.length === 1) {
          var s = arguments[0], l = c.precisionScaleFactor(this._argGeom, this._distance, s), d = new Bt(l);
          this.bufferFixedPrecision(d);
        }
      } }, { key: "computeGeometry", value: function() {
        if (this.bufferOriginalPrecision(), this._resultGeometry !== null) return null;
        var r = this._argGeom.getFactory().getPrecisionModel();
        r.getType() === Bt.FIXED ? this.bufferFixedPrecision(r) : this.bufferReducedPrecision();
      } }, { key: "setQuadrantSegments", value: function(r) {
        this._bufParams.setQuadrantSegments(r);
      } }, { key: "bufferOriginalPrecision", value: function() {
        try {
          var r = new Ka(this._bufParams);
          this._resultGeometry = r.buffer(this._argGeom, this._distance);
        } catch (s) {
          if (!(s instanceof J)) throw s;
          this._saveException = s;
        }
      } }, { key: "getResultGeometry", value: function(r) {
        return this._distance = r, this.computeGeometry(), this._resultGeometry;
      } }, { key: "setEndCapStyle", value: function(r) {
        this._bufParams.setEndCapStyle(r);
      } }], [{ key: "constructor_", value: function() {
        if (this._argGeom = null, this._distance = null, this._bufParams = new N(), this._resultGeometry = null, this._saveException = null, arguments.length === 1) {
          var r = arguments[0];
          this._argGeom = r;
        } else if (arguments.length === 2) {
          var s = arguments[0], l = arguments[1];
          this._argGeom = s, this._bufParams = l;
        }
      } }, { key: "bufferOp", value: function() {
        if (arguments.length === 2) {
          var r = arguments[1];
          return new c(arguments[0]).getResultGeometry(r);
        }
        if (arguments.length === 3) {
          if (Number.isInteger(arguments[2]) && arguments[0] instanceof ae && typeof arguments[1] == "number") {
            var s = arguments[1], l = arguments[2], d = new c(arguments[0]);
            return d.setQuadrantSegments(l), d.getResultGeometry(s);
          }
          if (arguments[2] instanceof N && arguments[0] instanceof ae && typeof arguments[1] == "number") {
            var y = arguments[1];
            return new c(arguments[0], arguments[2]).getResultGeometry(y);
          }
        } else if (arguments.length === 4) {
          var x = arguments[1], E = arguments[2], L = arguments[3], F = new c(arguments[0]);
          return F.setQuadrantSegments(E), F.setEndCapStyle(L), F.getResultGeometry(x);
        }
      } }, { key: "precisionScaleFactor", value: function(r, s, l) {
        var d = r.getEnvelopeInternal(), y = lr.max(Math.abs(d.getMaxX()), Math.abs(d.getMaxY()), Math.abs(d.getMinX()), Math.abs(d.getMinY())) + 2 * (s > 0 ? s : 0), x = l - Math.trunc(Math.log(y) / Math.log(10) + 1);
        return Math.pow(10, x);
      } }]);
    }();
    Gn.CAP_ROUND = N.CAP_ROUND, Gn.CAP_BUTT = N.CAP_FLAT, Gn.CAP_FLAT = N.CAP_FLAT, Gn.CAP_SQUARE = N.CAP_SQUARE, Gn.MAX_PRECISION_DIGITS = 12;
    var hg = ["Point", "MultiPoint", "LineString", "MultiLineString", "Polygon", "MultiPolygon"], eu = function() {
      return h(function c(r) {
        o(this, c), this.geometryFactory = r || new An();
      }, [{ key: "read", value: function(c) {
        var r, s = (r = typeof c == "string" ? JSON.parse(c) : c).type;
        if (!Nt[s]) throw new Error("Unknown GeoJSON type: " + r.type);
        return hg.indexOf(s) !== -1 ? Nt[s].call(this, r.coordinates) : s === "GeometryCollection" ? Nt[s].call(this, r.geometries) : Nt[s].call(this, r);
      } }, { key: "write", value: function(c) {
        var r = c.getGeometryType();
        if (!Ht[r]) throw new Error("Geometry is not supported");
        return Ht[r].call(this, c);
      } }]);
    }(), Nt = { Feature: function(c) {
      var r = {};
      for (var s in c) r[s] = c[s];
      if (c.geometry) {
        var l = c.geometry.type;
        if (!Nt[l]) throw new Error("Unknown GeoJSON type: " + c.type);
        r.geometry = this.read(c.geometry);
      }
      return c.bbox && (r.bbox = Nt.bbox.call(this, c.bbox)), r;
    }, FeatureCollection: function(c) {
      var r = {};
      if (c.features) {
        r.features = [];
        for (var s = 0; s < c.features.length; ++s) r.features.push(this.read(c.features[s]));
      }
      return c.bbox && (r.bbox = this.parse.bbox.call(this, c.bbox)), r;
    }, coordinates: function(c) {
      for (var r = [], s = 0; s < c.length; ++s) {
        var l = c[s];
        r.push(a(Z, C(l)));
      }
      return r;
    }, bbox: function(c) {
      return this.geometryFactory.createLinearRing([new Z(c[0], c[1]), new Z(c[2], c[1]), new Z(c[2], c[3]), new Z(c[0], c[3]), new Z(c[0], c[1])]);
    }, Point: function(c) {
      var r = a(Z, C(c));
      return this.geometryFactory.createPoint(r);
    }, MultiPoint: function(c) {
      for (var r = [], s = 0; s < c.length; ++s) r.push(Nt.Point.call(this, c[s]));
      return this.geometryFactory.createMultiPoint(r);
    }, LineString: function(c) {
      var r = Nt.coordinates.call(this, c);
      return this.geometryFactory.createLineString(r);
    }, MultiLineString: function(c) {
      for (var r = [], s = 0; s < c.length; ++s) r.push(Nt.LineString.call(this, c[s]));
      return this.geometryFactory.createMultiLineString(r);
    }, Polygon: function(c) {
      for (var r = Nt.coordinates.call(this, c[0]), s = this.geometryFactory.createLinearRing(r), l = [], d = 1; d < c.length; ++d) {
        var y = c[d], x = Nt.coordinates.call(this, y), E = this.geometryFactory.createLinearRing(x);
        l.push(E);
      }
      return this.geometryFactory.createPolygon(s, l);
    }, MultiPolygon: function(c) {
      for (var r = [], s = 0; s < c.length; ++s) {
        var l = c[s];
        r.push(Nt.Polygon.call(this, l));
      }
      return this.geometryFactory.createMultiPolygon(r);
    }, GeometryCollection: function(c) {
      for (var r = [], s = 0; s < c.length; ++s) {
        var l = c[s];
        r.push(this.read(l));
      }
      return this.geometryFactory.createGeometryCollection(r);
    } }, Ht = { coordinate: function(c) {
      var r = [c.x, c.y];
      return c.z && r.push(c.z), c.m && r.push(c.m), r;
    }, Point: function(c) {
      return { type: "Point", coordinates: Ht.coordinate.call(this, c.getCoordinate()) };
    }, MultiPoint: function(c) {
      for (var r = [], s = 0; s < c._geometries.length; ++s) {
        var l = c._geometries[s], d = Ht.Point.call(this, l);
        r.push(d.coordinates);
      }
      return { type: "MultiPoint", coordinates: r };
    }, LineString: function(c) {
      for (var r = [], s = c.getCoordinates(), l = 0; l < s.length; ++l) {
        var d = s[l];
        r.push(Ht.coordinate.call(this, d));
      }
      return { type: "LineString", coordinates: r };
    }, MultiLineString: function(c) {
      for (var r = [], s = 0; s < c._geometries.length; ++s) {
        var l = c._geometries[s], d = Ht.LineString.call(this, l);
        r.push(d.coordinates);
      }
      return { type: "MultiLineString", coordinates: r };
    }, Polygon: function(c) {
      var r = [], s = Ht.LineString.call(this, c._shell);
      r.push(s.coordinates);
      for (var l = 0; l < c._holes.length; ++l) {
        var d = c._holes[l], y = Ht.LineString.call(this, d);
        r.push(y.coordinates);
      }
      return { type: "Polygon", coordinates: r };
    }, MultiPolygon: function(c) {
      for (var r = [], s = 0; s < c._geometries.length; ++s) {
        var l = c._geometries[s], d = Ht.Polygon.call(this, l);
        r.push(d.coordinates);
      }
      return { type: "MultiPolygon", coordinates: r };
    }, GeometryCollection: function(c) {
      for (var r = [], s = 0; s < c._geometries.length; ++s) {
        var l = c._geometries[s], d = l.getGeometryType();
        r.push(Ht[d].call(this, l));
      }
      return { type: "GeometryCollection", geometries: r };
    } };
    return { BufferOp: Gn, GeoJSONReader: function() {
      return h(function c(r) {
        o(this, c), this.parser = new eu(r || new An());
      }, [{ key: "read", value: function(c) {
        return this.parser.read(c);
      } }]);
    }(), GeoJSONWriter: function() {
      return h(function c() {
        o(this, c), this.parser = new eu(this.geometryFactory);
      }, [{ key: "write", value: function(c) {
        return this.parser.write(c);
      } }]);
    }() };
  });
})(Wc);
var Tv = Wc.exports;
const Ov = /* @__PURE__ */ ti(Tv);
class Av {
  constructor() {
    this._partials = new Float64Array(32), this._n = 0;
  }
  add(e) {
    const t = this._partials;
    let i = 0;
    for (let o = 0; o < this._n && o < 32; o++) {
      const a = t[o], u = e + a, h = Math.abs(e) < Math.abs(a) ? e - (u - a) : a - (u - e);
      h && (t[i++] = h), e = u;
    }
    return t[i] = e, this._n = i + 1, this;
  }
  valueOf() {
    const e = this._partials;
    let t = this._n, i, o, a, u = 0;
    if (t > 0) {
      for (u = e[--t]; t > 0 && (i = u, o = e[--t], u = i + o, a = o - (u - i), !a); )
        ;
      t > 0 && (a < 0 && e[t - 1] < 0 || a > 0 && e[t - 1] > 0) && (o = a * 2, i = u + o, o == i - u && (u = i));
    }
    return u;
  }
}
function* Rv(n) {
  for (const e of n)
    yield* e;
}
function $c(n) {
  return Array.from(Rv(n));
}
var Xe = 1e-6, Ae = Math.PI, Rt = Ae / 2, Yu = Ae / 4, zt = Ae * 2, rn = 180 / Ae, It = Ae / 180, je = Math.abs, Dv = Math.atan, tr = Math.atan2, $e = Math.cos, Ve = Math.sin, Fv = Math.sign || function(n) {
  return n > 0 ? 1 : n < 0 ? -1 : 0;
}, ni = Math.sqrt;
function Zc(n) {
  return n > 1 ? 0 : n < -1 ? Ae : Math.acos(n);
}
function nr(n) {
  return n > 1 ? Rt : n < -1 ? -Rt : Math.asin(n);
}
function Lr() {
}
function Ui(n, e) {
  n && Xu.hasOwnProperty(n.type) && Xu[n.type](n, e);
}
var Uu = {
  Feature: function(n, e) {
    Ui(n.geometry, e);
  },
  FeatureCollection: function(n, e) {
    for (var t = n.features, i = -1, o = t.length; ++i < o; ) Ui(t[i].geometry, e);
  }
}, Xu = {
  Sphere: function(n, e) {
    e.sphere();
  },
  Point: function(n, e) {
    n = n.coordinates, e.point(n[0], n[1], n[2]);
  },
  MultiPoint: function(n, e) {
    for (var t = n.coordinates, i = -1, o = t.length; ++i < o; ) n = t[i], e.point(n[0], n[1], n[2]);
  },
  LineString: function(n, e) {
    ho(n.coordinates, e, 0);
  },
  MultiLineString: function(n, e) {
    for (var t = n.coordinates, i = -1, o = t.length; ++i < o; ) ho(t[i], e, 0);
  },
  Polygon: function(n, e) {
    Vu(n.coordinates, e);
  },
  MultiPolygon: function(n, e) {
    for (var t = n.coordinates, i = -1, o = t.length; ++i < o; ) Vu(t[i], e);
  },
  GeometryCollection: function(n, e) {
    for (var t = n.geometries, i = -1, o = t.length; ++i < o; ) Ui(t[i], e);
  }
};
function ho(n, e, t) {
  var i = -1, o = n.length - t, a;
  for (e.lineStart(); ++i < o; ) a = n[i], e.point(a[0], a[1], a[2]);
  e.lineEnd();
}
function Vu(n, e) {
  var t = -1, i = n.length;
  for (e.polygonStart(); ++t < i; ) ho(n[t], e, 1);
  e.polygonEnd();
}
function Bv(n, e) {
  n && Uu.hasOwnProperty(n.type) ? Uu[n.type](n, e) : Ui(n, e);
}
function fo(n) {
  return [tr(n[1], n[0]), nr(n[2])];
}
function rr(n) {
  var e = n[0], t = n[1], i = $e(t);
  return [i * $e(e), i * Ve(e), Ve(t)];
}
function xi(n, e) {
  return n[0] * e[0] + n[1] * e[1] + n[2] * e[2];
}
function Xi(n, e) {
  return [n[1] * e[2] - n[2] * e[1], n[2] * e[0] - n[0] * e[2], n[0] * e[1] - n[1] * e[0]];
}
function Ks(n, e) {
  n[0] += e[0], n[1] += e[1], n[2] += e[2];
}
function Ei(n, e) {
  return [n[0] * e, n[1] * e, n[2] * e];
}
function go(n) {
  var e = ni(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]);
  n[0] /= e, n[1] /= e, n[2] /= e;
}
function vo(n, e) {
  function t(i, o) {
    return i = n(i, o), e(i[0], i[1]);
  }
  return n.invert && e.invert && (t.invert = function(i, o) {
    return i = e.invert(i, o), i && n.invert(i[0], i[1]);
  }), t;
}
function mo(n, e) {
  return [je(n) > Ae ? n + Math.round(-n / zt) * zt : n, e];
}
mo.invert = mo;
function Gv(n, e, t) {
  return (n %= zt) ? e || t ? vo(Wu(n), $u(e, t)) : Wu(n) : e || t ? $u(e, t) : mo;
}
function Hu(n) {
  return function(e, t) {
    return e += n, [e > Ae ? e - zt : e < -Ae ? e + zt : e, t];
  };
}
function Wu(n) {
  var e = Hu(n);
  return e.invert = Hu(-n), e;
}
function $u(n, e) {
  var t = $e(n), i = Ve(n), o = $e(e), a = Ve(e);
  function u(h, f) {
    var g = $e(f), m = $e(h) * g, v = Ve(h) * g, p = Ve(f), _ = p * t + m * i;
    return [
      tr(v * o - _ * a, m * t - p * i),
      nr(_ * o + v * a)
    ];
  }
  return u.invert = function(h, f) {
    var g = $e(f), m = $e(h) * g, v = Ve(h) * g, p = Ve(f), _ = p * o - v * a;
    return [
      tr(v * o + p * a, m * t + _ * i),
      nr(_ * t - m * i)
    ];
  }, u;
}
function qv(n, e, t, i, o, a) {
  if (t) {
    var u = $e(e), h = Ve(e), f = i * t;
    o == null ? (o = e + i * zt, a = e - f / 2) : (o = Zu(u, o), a = Zu(u, a), (i > 0 ? o < a : o > a) && (o += i * zt));
    for (var g, m = o; i > 0 ? m > a : m < a; m -= f)
      g = fo([u, -h * $e(m), -h * Ve(m)]), n.point(g[0], g[1]);
  }
}
function Zu(n, e) {
  e = rr(e), e[0] -= n, go(e);
  var t = Zc(-e[1]);
  return ((-e[2] < 0 ? -t : t) + zt - Xe) % zt;
}
function Kc() {
  var n = [], e;
  return {
    point: function(t, i, o) {
      e.push([t, i, o]);
    },
    lineStart: function() {
      n.push(e = []);
    },
    lineEnd: Lr,
    rejoin: function() {
      n.length > 1 && n.push(n.pop().concat(n.shift()));
    },
    result: function() {
      var t = n;
      return n = [], e = null, t;
    }
  };
}
function Oi(n, e) {
  return je(n[0] - e[0]) < Xe && je(n[1] - e[1]) < Xe;
}
function ki(n, e, t, i) {
  this.x = n, this.z = e, this.o = t, this.e = i, this.v = !1, this.n = this.p = null;
}
function Qc(n, e, t, i, o) {
  var a = [], u = [], h, f;
  if (n.forEach(function(w) {
    if (!((C = w.length - 1) <= 0)) {
      var C, b = w[0], S = w[C], I;
      if (Oi(b, S)) {
        if (!b[2] && !S[2]) {
          for (o.lineStart(), h = 0; h < C; ++h) o.point((b = w[h])[0], b[1]);
          o.lineEnd();
          return;
        }
        S[0] += 2 * Xe;
      }
      a.push(I = new ki(b, w, null, !0)), u.push(I.o = new ki(b, null, I, !1)), a.push(I = new ki(S, w, null, !1)), u.push(I.o = new ki(S, null, I, !0));
    }
  }), !!a.length) {
    for (u.sort(e), Ku(a), Ku(u), h = 0, f = u.length; h < f; ++h)
      u[h].e = t = !t;
    for (var g = a[0], m, v; ; ) {
      for (var p = g, _ = !0; p.v; ) if ((p = p.n) === g) return;
      m = p.z, o.lineStart();
      do {
        if (p.v = p.o.v = !0, p.e) {
          if (_)
            for (h = 0, f = m.length; h < f; ++h) o.point((v = m[h])[0], v[1]);
          else
            i(p.x, p.n.x, 1, o);
          p = p.n;
        } else {
          if (_)
            for (m = p.p.z, h = m.length - 1; h >= 0; --h) o.point((v = m[h])[0], v[1]);
          else
            i(p.x, p.p.x, -1, o);
          p = p.p;
        }
        p = p.o, m = p.z, _ = !_;
      } while (!p.v);
      o.lineEnd();
    }
  }
}
function Ku(n) {
  if (e = n.length) {
    for (var e, t = 0, i = n[0], o; ++t < e; )
      i.n = o = n[t], o.p = i, i = o;
    i.n = o = n[0], o.p = i;
  }
}
function Qs(n) {
  return je(n[0]) <= Ae ? n[0] : Fv(n[0]) * ((je(n[0]) + Ae) % zt - Ae);
}
function zv(n, e) {
  var t = Qs(e), i = e[1], o = Ve(i), a = [Ve(t), -$e(t), 0], u = 0, h = 0, f = new Av();
  o === 1 ? i = Rt + Xe : o === -1 && (i = -Rt - Xe);
  for (var g = 0, m = n.length; g < m; ++g)
    if (p = (v = n[g]).length)
      for (var v, p, _ = v[p - 1], w = Qs(_), C = _[1] / 2 + Yu, b = Ve(C), S = $e(C), I = 0; I < p; ++I, w = A, b = U, S = V, _ = N) {
        var N = v[I], A = Qs(N), R = N[1] / 2 + Yu, U = Ve(R), V = $e(R), k = A - w, M = k >= 0 ? 1 : -1, T = M * k, D = T > Ae, B = b * U;
        if (f.add(tr(B * M * Ve(T), S * V + B * $e(T))), u += D ? k + M * zt : k, D ^ w >= t ^ A >= t) {
          var q = Xi(rr(_), rr(N));
          go(q);
          var X = Xi(a, q);
          go(X);
          var O = (D ^ k >= 0 ? -1 : 1) * nr(X[2]);
          (i > O || i === O && (q[0] || q[1])) && (h += D ^ k >= 0 ? 1 : -1);
        }
      }
  return (u < -Xe || u < Xe && f < -1e-12) ^ h & 1;
}
function Jc(n, e, t, i) {
  return function(o) {
    var a = e(o), u = Kc(), h = e(u), f = !1, g, m, v, p = {
      point: _,
      lineStart: C,
      lineEnd: b,
      polygonStart: function() {
        p.point = S, p.lineStart = I, p.lineEnd = N, m = [], g = [];
      },
      polygonEnd: function() {
        p.point = _, p.lineStart = C, p.lineEnd = b, m = $c(m);
        var A = zv(g, i);
        m.length ? (f || (o.polygonStart(), f = !0), Qc(m, Uv, A, t, o)) : A && (f || (o.polygonStart(), f = !0), o.lineStart(), t(null, null, 1, o), o.lineEnd()), f && (o.polygonEnd(), f = !1), m = g = null;
      },
      sphere: function() {
        o.polygonStart(), o.lineStart(), t(null, null, 1, o), o.lineEnd(), o.polygonEnd();
      }
    };
    function _(A, R) {
      n(A, R) && o.point(A, R);
    }
    function w(A, R) {
      a.point(A, R);
    }
    function C() {
      p.point = w, a.lineStart();
    }
    function b() {
      p.point = _, a.lineEnd();
    }
    function S(A, R) {
      v.push([A, R]), h.point(A, R);
    }
    function I() {
      h.lineStart(), v = [];
    }
    function N() {
      S(v[0][0], v[0][1]), h.lineEnd();
      var A = h.clean(), R = u.result(), U, V = R.length, k, M, T;
      if (v.pop(), g.push(v), v = null, !!V) {
        if (A & 1) {
          if (M = R[0], (k = M.length - 1) > 0) {
            for (f || (o.polygonStart(), f = !0), o.lineStart(), U = 0; U < k; ++U) o.point((T = M[U])[0], T[1]);
            o.lineEnd();
          }
          return;
        }
        V > 1 && A & 2 && R.push(R.pop().concat(R.shift())), m.push(R.filter(Yv));
      }
    }
    return p;
  };
}
function Yv(n) {
  return n.length > 1;
}
function Uv(n, e) {
  return ((n = n.x)[0] < 0 ? n[1] - Rt - Xe : Rt - n[1]) - ((e = e.x)[0] < 0 ? e[1] - Rt - Xe : Rt - e[1]);
}
const Qu = Jc(
  function() {
    return !0;
  },
  Xv,
  Hv,
  [-Ae, -Rt]
);
function Xv(n) {
  var e = NaN, t = NaN, i = NaN, o;
  return {
    lineStart: function() {
      n.lineStart(), o = 1;
    },
    point: function(a, u) {
      var h = a > 0 ? Ae : -Ae, f = je(a - e);
      je(f - Ae) < Xe ? (n.point(e, t = (t + u) / 2 > 0 ? Rt : -Rt), n.point(i, t), n.lineEnd(), n.lineStart(), n.point(h, t), n.point(a, t), o = 0) : i !== h && f >= Ae && (je(e - i) < Xe && (e -= i * Xe), je(a - h) < Xe && (a -= h * Xe), t = Vv(e, t, a, u), n.point(i, t), n.lineEnd(), n.lineStart(), n.point(h, t), o = 0), n.point(e = a, t = u), i = h;
    },
    lineEnd: function() {
      n.lineEnd(), e = t = NaN;
    },
    clean: function() {
      return 2 - o;
    }
  };
}
function Vv(n, e, t, i) {
  var o, a, u = Ve(n - t);
  return je(u) > Xe ? Dv((Ve(e) * (a = $e(i)) * Ve(t) - Ve(i) * (o = $e(e)) * Ve(n)) / (o * a * u)) : (e + i) / 2;
}
function Hv(n, e, t, i) {
  var o;
  if (n == null)
    o = t * Rt, i.point(-Ae, o), i.point(0, o), i.point(Ae, o), i.point(Ae, 0), i.point(Ae, -o), i.point(0, -o), i.point(-Ae, -o), i.point(-Ae, 0), i.point(-Ae, o);
  else if (je(n[0] - e[0]) > Xe) {
    var a = n[0] < e[0] ? Ae : -Ae;
    o = t * a / 2, i.point(-a, o), i.point(0, o), i.point(a, o);
  } else
    i.point(e[0], e[1]);
}
function Wv(n) {
  var e = $e(n), t = 6 * It, i = e > 0, o = je(e) > Xe;
  function a(m, v, p, _) {
    qv(_, n, t, p, m, v);
  }
  function u(m, v) {
    return $e(m) * $e(v) > e;
  }
  function h(m) {
    var v, p, _, w, C;
    return {
      lineStart: function() {
        w = _ = !1, C = 1;
      },
      point: function(b, S) {
        var I = [b, S], N, A = u(b, S), R = i ? A ? 0 : g(b, S) : A ? g(b + (b < 0 ? Ae : -Ae), S) : 0;
        if (!v && (w = _ = A) && m.lineStart(), A !== _ && (N = f(v, I), (!N || Oi(v, N) || Oi(I, N)) && (I[2] = 1)), A !== _)
          C = 0, A ? (m.lineStart(), N = f(I, v), m.point(N[0], N[1])) : (N = f(v, I), m.point(N[0], N[1], 2), m.lineEnd()), v = N;
        else if (o && v && i ^ A) {
          var U;
          !(R & p) && (U = f(I, v, !0)) && (C = 0, i ? (m.lineStart(), m.point(U[0][0], U[0][1]), m.point(U[1][0], U[1][1]), m.lineEnd()) : (m.point(U[1][0], U[1][1]), m.lineEnd(), m.lineStart(), m.point(U[0][0], U[0][1], 3)));
        }
        A && (!v || !Oi(v, I)) && m.point(I[0], I[1]), v = I, _ = A, p = R;
      },
      lineEnd: function() {
        _ && m.lineEnd(), v = null;
      },
      // Rejoin first and last segments if there were intersections and the first
      // and last points were visible.
      clean: function() {
        return C | (w && _) << 1;
      }
    };
  }
  function f(m, v, p) {
    var _ = rr(m), w = rr(v), C = [1, 0, 0], b = Xi(_, w), S = xi(b, b), I = b[0], N = S - I * I;
    if (!N) return !p && m;
    var A = e * S / N, R = -e * I / N, U = Xi(C, b), V = Ei(C, A), k = Ei(b, R);
    Ks(V, k);
    var M = U, T = xi(V, M), D = xi(M, M), B = T * T - D * (xi(V, V) - 1);
    if (!(B < 0)) {
      var q = ni(B), X = Ei(M, (-T - q) / D);
      if (Ks(X, V), X = fo(X), !p) return X;
      var O = m[0], Y = v[0], G = m[1], H = v[1], Q;
      Y < O && (Q = O, O = Y, Y = Q);
      var W = Y - O, j = je(W - Ae) < Xe, J = j || W < Xe;
      if (!j && H < G && (Q = G, G = H, H = Q), J ? j ? G + H > 0 ^ X[1] < (je(X[0] - O) < Xe ? G : H) : G <= X[1] && X[1] <= H : W > Ae ^ (O <= X[0] && X[0] <= Y)) {
        var re = Ei(M, (-T + q) / D);
        return Ks(re, V), [X, fo(re)];
      }
    }
  }
  function g(m, v) {
    var p = i ? n : Ae - n, _ = 0;
    return m < -p ? _ |= 1 : m > p && (_ |= 2), v < -p ? _ |= 4 : v > p && (_ |= 8), _;
  }
  return Jc(u, h, a, i ? [0, -n] : [-Ae, n - Ae]);
}
function $v(n, e, t, i, o, a) {
  var u = n[0], h = n[1], f = e[0], g = e[1], m = 0, v = 1, p = f - u, _ = g - h, w;
  if (w = t - u, !(!p && w > 0)) {
    if (w /= p, p < 0) {
      if (w < m) return;
      w < v && (v = w);
    } else if (p > 0) {
      if (w > v) return;
      w > m && (m = w);
    }
    if (w = o - u, !(!p && w < 0)) {
      if (w /= p, p < 0) {
        if (w > v) return;
        w > m && (m = w);
      } else if (p > 0) {
        if (w < m) return;
        w < v && (v = w);
      }
      if (w = i - h, !(!_ && w > 0)) {
        if (w /= _, _ < 0) {
          if (w < m) return;
          w < v && (v = w);
        } else if (_ > 0) {
          if (w > v) return;
          w > m && (m = w);
        }
        if (w = a - h, !(!_ && w < 0)) {
          if (w /= _, _ < 0) {
            if (w > v) return;
            w > m && (m = w);
          } else if (_ > 0) {
            if (w < m) return;
            w < v && (v = w);
          }
          return m > 0 && (n[0] = u + m * p, n[1] = h + m * _), v < 1 && (e[0] = u + v * p, e[1] = h + v * _), !0;
        }
      }
    }
  }
}
var Nr = 1e9, Ci = -Nr;
function Zv(n, e, t, i) {
  function o(g, m) {
    return n <= g && g <= t && e <= m && m <= i;
  }
  function a(g, m, v, p) {
    var _ = 0, w = 0;
    if (g == null || (_ = u(g, v)) !== (w = u(m, v)) || f(g, m) < 0 ^ v > 0)
      do
        p.point(_ === 0 || _ === 3 ? n : t, _ > 1 ? i : e);
      while ((_ = (_ + v + 4) % 4) !== w);
    else
      p.point(m[0], m[1]);
  }
  function u(g, m) {
    return je(g[0] - n) < Xe ? m > 0 ? 0 : 3 : je(g[0] - t) < Xe ? m > 0 ? 2 : 1 : je(g[1] - e) < Xe ? m > 0 ? 1 : 0 : m > 0 ? 3 : 2;
  }
  function h(g, m) {
    return f(g.x, m.x);
  }
  function f(g, m) {
    var v = u(g, 1), p = u(m, 1);
    return v !== p ? v - p : v === 0 ? m[1] - g[1] : v === 1 ? g[0] - m[0] : v === 2 ? g[1] - m[1] : m[0] - g[0];
  }
  return function(g) {
    var m = g, v = Kc(), p, _, w, C, b, S, I, N, A, R, U, V = {
      point: k,
      lineStart: B,
      lineEnd: q,
      polygonStart: T,
      polygonEnd: D
    };
    function k(O, Y) {
      o(O, Y) && m.point(O, Y);
    }
    function M() {
      for (var O = 0, Y = 0, G = _.length; Y < G; ++Y)
        for (var H = _[Y], Q = 1, W = H.length, j = H[0], J, re, ee = j[0], te = j[1]; Q < W; ++Q)
          J = ee, re = te, j = H[Q], ee = j[0], te = j[1], re <= i ? te > i && (ee - J) * (i - re) > (te - re) * (n - J) && ++O : te <= i && (ee - J) * (i - re) < (te - re) * (n - J) && --O;
      return O;
    }
    function T() {
      m = v, p = [], _ = [], U = !0;
    }
    function D() {
      var O = M(), Y = U && O, G = (p = $c(p)).length;
      (Y || G) && (g.polygonStart(), Y && (g.lineStart(), a(null, null, 1, g), g.lineEnd()), G && Qc(p, h, O, a, g), g.polygonEnd()), m = g, p = _ = w = null;
    }
    function B() {
      V.point = X, _ && _.push(w = []), R = !0, A = !1, I = N = NaN;
    }
    function q() {
      p && (X(C, b), S && A && v.rejoin(), p.push(v.result())), V.point = k, A && m.lineEnd();
    }
    function X(O, Y) {
      var G = o(O, Y);
      if (_ && w.push([O, Y]), R)
        C = O, b = Y, S = G, R = !1, G && (m.lineStart(), m.point(O, Y));
      else if (G && A) m.point(O, Y);
      else {
        var H = [I = Math.max(Ci, Math.min(Nr, I)), N = Math.max(Ci, Math.min(Nr, N))], Q = [O = Math.max(Ci, Math.min(Nr, O)), Y = Math.max(Ci, Math.min(Nr, Y))];
        $v(H, Q, n, e, t, i) ? (A || (m.lineStart(), m.point(H[0], H[1])), m.point(Q[0], Q[1]), G || m.lineEnd(), U = !1) : G && (m.lineStart(), m.point(O, Y), U = !1);
      }
      I = O, N = Y, A = G;
    }
    return V;
  };
}
const Ju = (n) => n;
var ir = 1 / 0, Vi = ir, zr = -ir, Hi = zr, ju = {
  point: Kv,
  lineStart: Lr,
  lineEnd: Lr,
  polygonStart: Lr,
  polygonEnd: Lr,
  result: function() {
    var n = [[ir, Vi], [zr, Hi]];
    return zr = Hi = -(Vi = ir = 1 / 0), n;
  }
};
function Kv(n, e) {
  n < ir && (ir = n), n > zr && (zr = n), e < Vi && (Vi = e), e > Hi && (Hi = e);
}
function Qo(n) {
  return function(e) {
    var t = new yo();
    for (var i in n) t[i] = n[i];
    return t.stream = e, t;
  };
}
function yo() {
}
yo.prototype = {
  constructor: yo,
  point: function(n, e) {
    this.stream.point(n, e);
  },
  sphere: function() {
    this.stream.sphere();
  },
  lineStart: function() {
    this.stream.lineStart();
  },
  lineEnd: function() {
    this.stream.lineEnd();
  },
  polygonStart: function() {
    this.stream.polygonStart();
  },
  polygonEnd: function() {
    this.stream.polygonEnd();
  }
};
function Jo(n, e, t) {
  var i = n.clipExtent && n.clipExtent();
  return n.scale(150).translate([0, 0]), i != null && n.clipExtent(null), Bv(t, n.stream(ju)), e(ju.result()), i != null && n.clipExtent(i), n;
}
function jc(n, e, t) {
  return Jo(n, function(i) {
    var o = e[1][0] - e[0][0], a = e[1][1] - e[0][1], u = Math.min(o / (i[1][0] - i[0][0]), a / (i[1][1] - i[0][1])), h = +e[0][0] + (o - u * (i[1][0] + i[0][0])) / 2, f = +e[0][1] + (a - u * (i[1][1] + i[0][1])) / 2;
    n.scale(150 * u).translate([h, f]);
  }, t);
}
function Qv(n, e, t) {
  return jc(n, [[0, 0], e], t);
}
function Jv(n, e, t) {
  return Jo(n, function(i) {
    var o = +e, a = o / (i[1][0] - i[0][0]), u = (o - a * (i[1][0] + i[0][0])) / 2, h = -a * i[0][1];
    n.scale(150 * a).translate([u, h]);
  }, t);
}
function jv(n, e, t) {
  return Jo(n, function(i) {
    var o = +e, a = o / (i[1][1] - i[0][1]), u = -a * i[0][0], h = (o - a * (i[1][1] + i[0][1])) / 2;
    n.scale(150 * a).translate([u, h]);
  }, t);
}
var el = 16, em = $e(30 * It);
function tl(n, e) {
  return +e ? nm(n, e) : tm(n);
}
function tm(n) {
  return Qo({
    point: function(e, t) {
      e = n(e, t), this.stream.point(e[0], e[1]);
    }
  });
}
function nm(n, e) {
  function t(i, o, a, u, h, f, g, m, v, p, _, w, C, b) {
    var S = g - i, I = m - o, N = S * S + I * I;
    if (N > 4 * e && C--) {
      var A = u + p, R = h + _, U = f + w, V = ni(A * A + R * R + U * U), k = nr(U /= V), M = je(je(U) - 1) < Xe || je(a - v) < Xe ? (a + v) / 2 : tr(R, A), T = n(M, k), D = T[0], B = T[1], q = D - i, X = B - o, O = I * q - S * X;
      (O * O / N > e || je((S * q + I * X) / N - 0.5) > 0.3 || u * p + h * _ + f * w < em) && (t(i, o, a, u, h, f, D, B, M, A /= V, R /= V, U, C, b), b.point(D, B), t(D, B, M, A, R, U, g, m, v, p, _, w, C, b));
    }
  }
  return function(i) {
    var o, a, u, h, f, g, m, v, p, _, w, C, b = {
      point: S,
      lineStart: I,
      lineEnd: A,
      polygonStart: function() {
        i.polygonStart(), b.lineStart = R;
      },
      polygonEnd: function() {
        i.polygonEnd(), b.lineStart = I;
      }
    };
    function S(k, M) {
      k = n(k, M), i.point(k[0], k[1]);
    }
    function I() {
      v = NaN, b.point = N, i.lineStart();
    }
    function N(k, M) {
      var T = rr([k, M]), D = n(k, M);
      t(v, p, m, _, w, C, v = D[0], p = D[1], m = k, _ = T[0], w = T[1], C = T[2], el, i), i.point(v, p);
    }
    function A() {
      b.point = S, i.lineEnd();
    }
    function R() {
      I(), b.point = U, b.lineEnd = V;
    }
    function U(k, M) {
      N(o = k, M), a = v, u = p, h = _, f = w, g = C, b.point = N;
    }
    function V() {
      t(v, p, m, _, w, C, a, u, o, h, f, g, el, i), b.lineEnd = A, A();
    }
    return b;
  };
}
var rm = Qo({
  point: function(n, e) {
    this.stream.point(n * It, e * It);
  }
});
function im(n) {
  return Qo({
    point: function(e, t) {
      var i = n(e, t);
      return this.stream.point(i[0], i[1]);
    }
  });
}
function sm(n, e, t, i, o) {
  function a(u, h) {
    return u *= i, h *= o, [e + n * u, t - n * h];
  }
  return a.invert = function(u, h) {
    return [(u - e) / n * i, (t - h) / n * o];
  }, a;
}
function nl(n, e, t, i, o, a) {
  if (!a) return sm(n, e, t, i, o);
  var u = $e(a), h = Ve(a), f = u * n, g = h * n, m = u / n, v = h / n, p = (h * t - u * e) / n, _ = (h * e + u * t) / n;
  function w(C, b) {
    return C *= i, b *= o, [f * C - g * b + e, t - g * C - f * b];
  }
  return w.invert = function(C, b) {
    return [i * (m * C - v * b + p), o * (_ - v * C - m * b)];
  }, w;
}
function om(n) {
  return am(function() {
    return n;
  })();
}
function am(n) {
  var e, t = 150, i = 480, o = 250, a = 0, u = 0, h = 0, f = 0, g = 0, m, v = 0, p = 1, _ = 1, w = null, C = Qu, b = null, S, I, N, A = Ju, R = 0.5, U, V, k, M, T;
  function D(O) {
    return k(O[0] * It, O[1] * It);
  }
  function B(O) {
    return O = k.invert(O[0], O[1]), O && [O[0] * rn, O[1] * rn];
  }
  D.stream = function(O) {
    return M && T === O ? M : M = rm(im(m)(C(U(A(T = O)))));
  }, D.preclip = function(O) {
    return arguments.length ? (C = O, w = void 0, X()) : C;
  }, D.postclip = function(O) {
    return arguments.length ? (A = O, b = S = I = N = null, X()) : A;
  }, D.clipAngle = function(O) {
    return arguments.length ? (C = +O ? Wv(w = O * It) : (w = null, Qu), X()) : w * rn;
  }, D.clipExtent = function(O) {
    return arguments.length ? (A = O == null ? (b = S = I = N = null, Ju) : Zv(b = +O[0][0], S = +O[0][1], I = +O[1][0], N = +O[1][1]), X()) : b == null ? null : [[b, S], [I, N]];
  }, D.scale = function(O) {
    return arguments.length ? (t = +O, q()) : t;
  }, D.translate = function(O) {
    return arguments.length ? (i = +O[0], o = +O[1], q()) : [i, o];
  }, D.center = function(O) {
    return arguments.length ? (a = O[0] % 360 * It, u = O[1] % 360 * It, q()) : [a * rn, u * rn];
  }, D.rotate = function(O) {
    return arguments.length ? (h = O[0] % 360 * It, f = O[1] % 360 * It, g = O.length > 2 ? O[2] % 360 * It : 0, q()) : [h * rn, f * rn, g * rn];
  }, D.angle = function(O) {
    return arguments.length ? (v = O % 360 * It, q()) : v * rn;
  }, D.reflectX = function(O) {
    return arguments.length ? (p = O ? -1 : 1, q()) : p < 0;
  }, D.reflectY = function(O) {
    return arguments.length ? (_ = O ? -1 : 1, q()) : _ < 0;
  }, D.precision = function(O) {
    return arguments.length ? (U = tl(V, R = O * O), X()) : ni(R);
  }, D.fitExtent = function(O, Y) {
    return jc(D, O, Y);
  }, D.fitSize = function(O, Y) {
    return Qv(D, O, Y);
  }, D.fitWidth = function(O, Y) {
    return Jv(D, O, Y);
  }, D.fitHeight = function(O, Y) {
    return jv(D, O, Y);
  };
  function q() {
    var O = nl(t, 0, 0, p, _, v).apply(null, e(a, u)), Y = nl(t, i - O[0], o - O[1], p, _, v);
    return m = Gv(h, f, g), V = vo(e, Y), k = vo(m, V), U = tl(V, R), X();
  }
  function X() {
    return M = T = null, D;
  }
  return function() {
    return e = n.apply(this, arguments), D.invert = e.invert && B, q();
  };
}
function um(n) {
  return function(e, t) {
    var i = $e(e), o = $e(t), a = n(i * o);
    return a === 1 / 0 ? [2, 0] : [
      a * o * Ve(e),
      a * Ve(t)
    ];
  };
}
function lm(n) {
  return function(e, t) {
    var i = ni(e * e + t * t), o = n(i), a = Ve(o), u = $e(o);
    return [
      tr(e * a, i * u),
      nr(i && t * a / i)
    ];
  };
}
var eh = um(function(n) {
  return (n = Zc(n)) && n / Ve(n);
});
eh.invert = lm(function(n) {
  return n;
});
function cm() {
  return om(eh).scale(79.4188).clipAngle(180 - 1e-3);
}
var { BufferOp: hm, GeoJSONReader: fm, GeoJSONWriter: gm } = Ov;
function dm(n, e, t) {
  t = t || {};
  var i = t.units || "kilometers", o = t.steps || 8;
  if (!n) throw new Error("geojson is required");
  if (typeof t != "object") throw new Error("options must be an object");
  if (typeof o != "number") throw new Error("steps must be an number");
  if (e === void 0) throw new Error("radius is required");
  if (o <= 0) throw new Error("steps must be greater than 0");
  var a = [];
  switch (n.type) {
    case "GeometryCollection":
      return at(n, function(u) {
        var h = Ai(u, e, i, o);
        h && a.push(h);
      }), ce(a);
    case "FeatureCollection":
      return Pe(n, function(u) {
        var h = Ai(u, e, i, o);
        h && Pe(h, function(f) {
          f && a.push(f);
        });
      }), ce(a);
  }
  return Ai(n, e, i, o);
}
function Ai(n, e, t, i) {
  var o = n.properties || {}, a = n.type === "Feature" ? n.geometry : n;
  if (a.type === "GeometryCollection") {
    var u = [];
    return at(n, function(C) {
      var b = Ai(C, e, t, i);
      b && u.push(b);
    }), ce(u);
  }
  var h = vm(a), f = {
    type: a.type,
    coordinates: nh(a.coordinates, h)
  }, g = new fm(), m = g.read(f), v = Zr(or(e, t), "meters"), p = hm.bufferOp(m, v, i), _ = new gm();
  if (p = _.write(p), !th(p.coordinates)) {
    var w = {
      type: p.type,
      coordinates: rh(p.coordinates, h)
    };
    return Qe(w, o);
  }
}
function th(n) {
  return Array.isArray(n[0]) ? th(n[0]) : isNaN(n[0]);
}
function nh(n, e) {
  return typeof n[0] != "object" ? e(n) : n.map(function(t) {
    return nh(t, e);
  });
}
function rh(n, e) {
  return typeof n[0] != "object" ? e.invert(n) : n.map(function(t) {
    return rh(t, e);
  });
}
function vm(n) {
  var e = os(n).geometry.coordinates, t = [-e[0], -e[1]];
  return cm().rotate(t).scale(Be);
}
function jo(n, e = {}) {
  let t = 0, i = 0, o = 0;
  return at(n, function(a, u, h) {
    let f = e.weight ? h == null ? void 0 : h[e.weight] : void 0;
    if (f = f ?? 1, !et(f))
      throw new Error(
        "weight value must be a number for feature index " + u
      );
    f = Number(f), f > 0 && He(a, function(g) {
      t += g[0] * f, i += g[1] * f, o += f;
    });
  }), de([t / o, i / o], e.properties, e);
}
function Dt(n, e = {}) {
  let t = 0, i = 0, o = 0;
  return He(
    n,
    function(a) {
      t += a[0], i += a[1], o++;
    },
    !0
  ), de([t / o, i / o], e.properties);
}
function mm(n, e = {}) {
  if (e = e || {}, !Re(e)) throw new Error("options is invalid");
  var t = e.counter || 10;
  if (!et(t)) throw new Error("counter must be a number");
  var i = e.weight, o = jo(n, { weight: e.weight }), a = ce([]);
  Pe(n, function(h) {
    var f;
    a.features.push(
      Dt(h, {
        properties: { weight: (f = h.properties) == null ? void 0 : f[i] }
      })
    );
  });
  const u = {
    tolerance: e.tolerance,
    medianCandidates: []
  };
  return ih(
    o.geometry.coordinates,
    [0, 0],
    a,
    u,
    t
  );
}
function ih(n, e, t, i, o) {
  var a = i.tolerance || 1e-3, u = 0, h = 0, f = 0, g = 0;
  if (Pe(t, function(p) {
    var _, w = (_ = p.properties) == null ? void 0 : _.weight, C = w ?? 1;
    if (C = Number(C), !et(C)) throw new Error("weight value must be a number");
    if (C > 0) {
      g += 1;
      var b = C * qe(p, n);
      b === 0 && (b = 1);
      var S = C / b;
      u += p.geometry.coordinates[0] * S, h += p.geometry.coordinates[1] * S, f += S;
    }
  }), g < 1) throw new Error("no features to measure");
  var m = u / f, v = h / f;
  return g === 1 || o === 0 || Math.abs(m - e[0]) < a && Math.abs(v - e[1]) < a ? de([m, v], {
    medianCandidates: i.medianCandidates
  }) : (i.medianCandidates.push([m, v]), ih(
    [m, v],
    n,
    t,
    i,
    o - 1
  ));
}
var ea = { exports: {} };
const ym = /* @__PURE__ */ Xc(kd), pm = /* @__PURE__ */ Xc(Ld);
var as = { exports: {} }, _m = function(e, t, i, o) {
  var a = e[0], u = e[1], h = !1;
  i === void 0 && (i = 0), o === void 0 && (o = t.length);
  for (var f = (o - i) / 2, g = 0, m = f - 1; g < f; m = g++) {
    var v = t[i + g * 2 + 0], p = t[i + g * 2 + 1], _ = t[i + m * 2 + 0], w = t[i + m * 2 + 1], C = p > u != w > u && a < (_ - v) * (u - p) / (w - p) + v;
    C && (h = !h);
  }
  return h;
}, wm = function(e, t, i, o) {
  var a = e[0], u = e[1], h = !1;
  i === void 0 && (i = 0), o === void 0 && (o = t.length);
  for (var f = o - i, g = 0, m = f - 1; g < f; m = g++) {
    var v = t[g + i][0], p = t[g + i][1], _ = t[m + i][0], w = t[m + i][1], C = p > u != w > u && a < (_ - v) * (u - p) / (w - p) + v;
    C && (h = !h);
  }
  return h;
}, sh = _m, oh = wm;
as.exports = function(e, t, i, o) {
  return t.length > 0 && Array.isArray(t[0]) ? oh(e, t, i, o) : sh(e, t, i, o);
};
as.exports.nested = oh;
as.exports.flat = sh;
var xm = as.exports, po = { exports: {} };
(function(n, e) {
  (function(t, i) {
    i(e);
  })(Uc, function(t) {
    const o = 33306690738754706e-32;
    function a(C, b, S, I, N) {
      let A, R, U, V, k = b[0], M = I[0], T = 0, D = 0;
      M > k == M > -k ? (A = k, k = b[++T]) : (A = M, M = I[++D]);
      let B = 0;
      if (T < C && D < S) for (M > k == M > -k ? (U = A - ((R = k + A) - k), k = b[++T]) : (U = A - ((R = M + A) - M), M = I[++D]), A = R, U !== 0 && (N[B++] = U); T < C && D < S; ) M > k == M > -k ? (U = A - ((R = A + k) - (V = R - A)) + (k - V), k = b[++T]) : (U = A - ((R = A + M) - (V = R - A)) + (M - V), M = I[++D]), A = R, U !== 0 && (N[B++] = U);
      for (; T < C; ) U = A - ((R = A + k) - (V = R - A)) + (k - V), k = b[++T], A = R, U !== 0 && (N[B++] = U);
      for (; D < S; ) U = A - ((R = A + M) - (V = R - A)) + (M - V), M = I[++D], A = R, U !== 0 && (N[B++] = U);
      return A === 0 && B !== 0 || (N[B++] = A), B;
    }
    function u(C) {
      return new Float64Array(C);
    }
    const h = 33306690738754716e-32, f = 22204460492503146e-32, g = 11093356479670487e-47, m = u(4), v = u(8), p = u(12), _ = u(16), w = u(4);
    t.orient2d = function(C, b, S, I, N, A) {
      const R = (b - A) * (S - N), U = (C - N) * (I - A), V = R - U;
      if (R === 0 || U === 0 || R > 0 != U > 0) return V;
      const k = Math.abs(R + U);
      return Math.abs(V) >= h * k ? V : -function(M, T, D, B, q, X, O) {
        let Y, G, H, Q, W, j, J, re, ee, te, se, fe, Z, Fe, _e, ae, z, Me;
        const Ne = M - q, ke = D - q, pt = T - X, gt = B - X;
        W = (_e = (re = Ne - (J = (j = 134217729 * Ne) - (j - Ne))) * (te = gt - (ee = (j = 134217729 * gt) - (j - gt))) - ((Fe = Ne * gt) - J * ee - re * ee - J * te)) - (se = _e - (z = (re = pt - (J = (j = 134217729 * pt) - (j - pt))) * (te = ke - (ee = (j = 134217729 * ke) - (j - ke))) - ((ae = pt * ke) - J * ee - re * ee - J * te))), m[0] = _e - (se + W) + (W - z), W = (Z = Fe - ((fe = Fe + se) - (W = fe - Fe)) + (se - W)) - (se = Z - ae), m[1] = Z - (se + W) + (W - ae), W = (Me = fe + se) - fe, m[2] = fe - (Me - W) + (se - W), m[3] = Me;
        let Yt = function(ps, Ee) {
          let fn = Ee[0];
          for (let gn = 1; gn < ps; gn++) fn += Ee[gn];
          return fn;
        }(4, m), ie = f * O;
        if (Yt >= ie || -Yt >= ie || (Y = M - (Ne + (W = M - Ne)) + (W - q), H = D - (ke + (W = D - ke)) + (W - q), G = T - (pt + (W = T - pt)) + (W - X), Q = B - (gt + (W = B - gt)) + (W - X), Y === 0 && G === 0 && H === 0 && Q === 0) || (ie = g * O + o * Math.abs(Yt), (Yt += Ne * Q + gt * Y - (pt * H + ke * G)) >= ie || -Yt >= ie)) return Yt;
        W = (_e = (re = Y - (J = (j = 134217729 * Y) - (j - Y))) * (te = gt - (ee = (j = 134217729 * gt) - (j - gt))) - ((Fe = Y * gt) - J * ee - re * ee - J * te)) - (se = _e - (z = (re = G - (J = (j = 134217729 * G) - (j - G))) * (te = ke - (ee = (j = 134217729 * ke) - (j - ke))) - ((ae = G * ke) - J * ee - re * ee - J * te))), w[0] = _e - (se + W) + (W - z), W = (Z = Fe - ((fe = Fe + se) - (W = fe - Fe)) + (se - W)) - (se = Z - ae), w[1] = Z - (se + W) + (W - ae), W = (Me = fe + se) - fe, w[2] = fe - (Me - W) + (se - W), w[3] = Me;
        const ri = a(4, m, 4, w, v);
        W = (_e = (re = Ne - (J = (j = 134217729 * Ne) - (j - Ne))) * (te = Q - (ee = (j = 134217729 * Q) - (j - Q))) - ((Fe = Ne * Q) - J * ee - re * ee - J * te)) - (se = _e - (z = (re = pt - (J = (j = 134217729 * pt) - (j - pt))) * (te = H - (ee = (j = 134217729 * H) - (j - H))) - ((ae = pt * H) - J * ee - re * ee - J * te))), w[0] = _e - (se + W) + (W - z), W = (Z = Fe - ((fe = Fe + se) - (W = fe - Fe)) + (se - W)) - (se = Z - ae), w[1] = Z - (se + W) + (W - ae), W = (Me = fe + se) - fe, w[2] = fe - (Me - W) + (se - W), w[3] = Me;
        const ii = a(ri, v, 4, w, p);
        W = (_e = (re = Y - (J = (j = 134217729 * Y) - (j - Y))) * (te = Q - (ee = (j = 134217729 * Q) - (j - Q))) - ((Fe = Y * Q) - J * ee - re * ee - J * te)) - (se = _e - (z = (re = G - (J = (j = 134217729 * G) - (j - G))) * (te = H - (ee = (j = 134217729 * H) - (j - H))) - ((ae = G * H) - J * ee - re * ee - J * te))), w[0] = _e - (se + W) + (W - z), W = (Z = Fe - ((fe = Fe + se) - (W = fe - Fe)) + (se - W)) - (se = Z - ae), w[1] = Z - (se + W) + (W - ae), W = (Me = fe + se) - fe, w[2] = fe - (Me - W) + (se - W), w[3] = Me;
        const jt = a(ii, p, 4, w, _);
        return _[jt - 1];
      }(C, b, S, I, N, A, k);
    }, t.orient2dfast = function(C, b, S, I, N, A) {
      return (b - A) * (S - N) - (C - N) * (I - A);
    }, Object.defineProperty(t, "__esModule", { value: !0 });
  });
})(po, po.exports);
var Em = po.exports, rl = ym, Ri = pm, km = xm, Cm = Em.orient2d;
Ri.default && (Ri = Ri.default);
ea.exports = ah;
ea.exports.default = ah;
function ah(n, e, t) {
  e = Math.max(0, e === void 0 ? 2 : e), t = t || 0;
  var i = Pm(n), o = new rl(16);
  o.toBBox = function(I) {
    return {
      minX: I[0],
      minY: I[1],
      maxX: I[0],
      maxY: I[1]
    };
  }, o.compareMinX = function(I, N) {
    return I[0] - N[0];
  }, o.compareMinY = function(I, N) {
    return I[1] - N[1];
  }, o.load(n);
  for (var a = [], u = 0, h; u < i.length; u++) {
    var f = i[u];
    o.remove(f), h = ol(f, h), a.push(h);
  }
  var g = new rl(16);
  for (u = 0; u < a.length; u++) g.insert(Js(a[u]));
  for (var m = e * e, v = t * t; a.length; ) {
    var p = a.shift(), _ = p.p, w = p.next.p, C = js(_, w);
    if (!(C < v)) {
      var b = C / m;
      f = Im(o, p.prev.p, _, w, p.next.next.p, b, g), f && Math.min(js(f, _), js(f, w)) <= b && (a.push(p), a.push(ol(f, p)), o.remove(f), g.remove(p), g.insert(Js(p)), g.insert(Js(p.next)));
    }
  }
  p = h;
  var S = [];
  do
    S.push(p.p), p = p.next;
  while (p !== h);
  return S.push(p.p), S;
}
function Im(n, e, t, i, o, a, u) {
  for (var h = new Ri([], Sm), f = n.data; f; ) {
    for (var g = 0; g < f.children.length; g++) {
      var m = f.children[g], v = f.leaf ? eo(m, t, i) : Mm(t, i, m);
      v > a || h.push({
        node: m,
        dist: v
      });
    }
    for (; h.length && !h.peek().node.children; ) {
      var p = h.pop(), _ = p.node, w = eo(_, e, t), C = eo(_, i, o);
      if (p.dist < w && p.dist < C && sl(t, _, u) && sl(i, _, u)) return _;
    }
    f = h.pop(), f && (f = f.node);
  }
  return null;
}
function Sm(n, e) {
  return n.dist - e.dist;
}
function Mm(n, e, t) {
  if (il(n, t) || il(e, t)) return 0;
  var i = Ii(n[0], n[1], e[0], e[1], t.minX, t.minY, t.maxX, t.minY);
  if (i === 0) return 0;
  var o = Ii(n[0], n[1], e[0], e[1], t.minX, t.minY, t.minX, t.maxY);
  if (o === 0) return 0;
  var a = Ii(n[0], n[1], e[0], e[1], t.maxX, t.minY, t.maxX, t.maxY);
  if (a === 0) return 0;
  var u = Ii(n[0], n[1], e[0], e[1], t.minX, t.maxY, t.maxX, t.maxY);
  return u === 0 ? 0 : Math.min(i, o, a, u);
}
function il(n, e) {
  return n[0] >= e.minX && n[0] <= e.maxX && n[1] >= e.minY && n[1] <= e.maxY;
}
function sl(n, e, t) {
  for (var i = Math.min(n[0], e[0]), o = Math.min(n[1], e[1]), a = Math.max(n[0], e[0]), u = Math.max(n[1], e[1]), h = t.search({ minX: i, minY: o, maxX: a, maxY: u }), f = 0; f < h.length; f++)
    if (bm(h[f].p, h[f].next.p, n, e)) return !1;
  return !0;
}
function Vn(n, e, t) {
  return Cm(n[0], n[1], e[0], e[1], t[0], t[1]);
}
function bm(n, e, t, i) {
  return n !== i && e !== t && Vn(n, e, t) > 0 != Vn(n, e, i) > 0 && Vn(t, i, n) > 0 != Vn(t, i, e) > 0;
}
function Js(n) {
  var e = n.p, t = n.next.p;
  return n.minX = Math.min(e[0], t[0]), n.minY = Math.min(e[1], t[1]), n.maxX = Math.max(e[0], t[0]), n.maxY = Math.max(e[1], t[1]), n;
}
function Pm(n) {
  for (var e = n[0], t = n[0], i = n[0], o = n[0], a = 0; a < n.length; a++) {
    var u = n[a];
    u[0] < e[0] && (e = u), u[0] > i[0] && (i = u), u[1] < t[1] && (t = u), u[1] > o[1] && (o = u);
  }
  var h = [e, t, i, o], f = h.slice();
  for (a = 0; a < n.length; a++)
    km(n[a], h) || f.push(n[a]);
  return Nm(f);
}
function ol(n, e) {
  var t = {
    p: n,
    prev: null,
    next: null,
    minX: 0,
    minY: 0,
    maxX: 0,
    maxY: 0
  };
  return e ? (t.next = e.next, t.prev = e, e.next.prev = t, e.next = t) : (t.prev = t, t.next = t), t;
}
function js(n, e) {
  var t = n[0] - e[0], i = n[1] - e[1];
  return t * t + i * i;
}
function eo(n, e, t) {
  var i = e[0], o = e[1], a = t[0] - i, u = t[1] - o;
  if (a !== 0 || u !== 0) {
    var h = ((n[0] - i) * a + (n[1] - o) * u) / (a * a + u * u);
    h > 1 ? (i = t[0], o = t[1]) : h > 0 && (i += a * h, o += u * h);
  }
  return a = n[0] - i, u = n[1] - o, a * a + u * u;
}
function Ii(n, e, t, i, o, a, u, h) {
  var f = t - n, g = i - e, m = u - o, v = h - a, p = n - o, _ = e - a, w = f * f + g * g, C = f * m + g * v, b = m * m + v * v, S = f * p + g * _, I = m * p + v * _, N = w * b - C * C, A, R, U, V, k = N, M = N;
  N === 0 ? (R = 0, k = 1, V = I, M = b) : (R = C * I - b * S, V = w * I - C * S, R < 0 ? (R = 0, V = I, M = b) : R > k && (R = k, V = I + C, M = b)), V < 0 ? (V = 0, -S < 0 ? R = 0 : -S > w ? R = k : (R = -S, k = w)) : V > M && (V = M, -S + C < 0 ? R = 0 : -S + C > w ? R = k : (R = -S + C, k = w)), A = R === 0 ? 0 : R / k, U = V === 0 ? 0 : V / M;
  var T = (1 - A) * n + A * t, D = (1 - A) * e + A * i, B = (1 - U) * o + U * u, q = (1 - U) * a + U * h, X = B - T, O = q - D;
  return X * X + O * O;
}
function Lm(n, e) {
  return n[0] === e[0] ? n[1] - e[1] : n[0] - e[0];
}
function Nm(n) {
  n.sort(Lm);
  for (var e = [], t = 0; t < n.length; t++) {
    for (; e.length >= 2 && Vn(e[e.length - 2], e[e.length - 1], n[t]) <= 0; )
      e.pop();
    e.push(n[t]);
  }
  for (var i = [], o = n.length - 1; o >= 0; o--) {
    for (; i.length >= 2 && Vn(i[i.length - 2], i[i.length - 1], n[o]) <= 0; )
      i.pop();
    i.push(n[o]);
  }
  return i.pop(), e.pop(), e.concat(i);
}
var Tm = ea.exports;
const Om = /* @__PURE__ */ ti(Tm);
function uh(n, e = {}) {
  e.concavity = e.concavity || 1 / 0;
  const t = [];
  if (He(n, (o) => {
    t.push([o[0], o[1]]);
  }), !t.length)
    return null;
  const i = Om(t, e.concavity);
  return i.length > 3 ? ye([i], e.properties) : null;
}
function lh(n, e = {}) {
  switch (xt(n)) {
    case "Point":
      return de(be(n), e.properties);
    case "Polygon":
      var t = [];
      He(n, function(A) {
        t.push(A);
      });
      var i = Dt(n, { properties: e.properties }), o = i.geometry.coordinates, a = 0, u = 0, h = 0, f, g, m, v, p, _, w, C, b = t.map(function(A) {
        return [A[0] - o[0], A[1] - o[1]];
      });
      for (f = 0; f < t.length - 1; f++)
        g = b[f], v = g[0], _ = g[1], m = b[f + 1], p = m[0], w = m[1], C = v * w - p * _, h += C, a += (v + p) * C, u += (_ + w) * C;
      if (h === 0)
        return i;
      var S = h * 0.5, I = 1 / (6 * S);
      return de(
        [o[0] + I * a, o[1] + I * u],
        e.properties
      );
    default:
      var N = uh(n);
      return N ? lh(N, { properties: e.properties }) : Dt(n, { properties: e.properties });
  }
}
function ta(n, e, t = {}) {
  const i = t.steps || 64, o = t.properties ? t.properties : !Array.isArray(n) && n.type === "Feature" && n.properties ? n.properties : {}, a = [];
  for (let u = 0; u < i; u++)
    a.push(
      Qt(n, e, u * -360 / i, t).geometry.coordinates
    );
  return a.push(a[0]), ye([a], o);
}
function nt(n) {
  if (!n)
    throw new Error("geojson is required");
  switch (n.type) {
    case "Feature":
      return ch(n);
    case "FeatureCollection":
      return Am(n);
    case "Point":
    case "LineString":
    case "Polygon":
    case "MultiPoint":
    case "MultiLineString":
    case "MultiPolygon":
    case "GeometryCollection":
      return na(n);
    default:
      throw new Error("unknown GeoJSON type");
  }
}
function ch(n) {
  const e = { type: "Feature" };
  return Object.keys(n).forEach((t) => {
    switch (t) {
      case "type":
      case "properties":
      case "geometry":
        return;
      default:
        e[t] = n[t];
    }
  }), e.properties = us(n.properties), n.geometry == null ? e.geometry = null : e.geometry = na(n.geometry), e;
}
function us(n) {
  const e = {};
  return n && Object.keys(n).forEach((t) => {
    const i = n[t];
    typeof i == "object" ? i === null ? e[t] = null : Array.isArray(i) ? e[t] = i.map((o) => o) : e[t] = us(i) : e[t] = i;
  }), e;
}
function Am(n) {
  const e = { type: "FeatureCollection" };
  return Object.keys(n).forEach((t) => {
    switch (t) {
      case "type":
      case "features":
        return;
      default:
        e[t] = n[t];
    }
  }), e.features = n.features.map((t) => ch(t)), e;
}
function na(n) {
  const e = { type: n.type };
  return n.bbox && (e.bbox = n.bbox), n.type === "GeometryCollection" ? (e.geometries = n.geometries.map((t) => na(t)), e) : (e.coordinates = hh(n.coordinates), e);
}
function hh(n) {
  const e = n;
  return typeof e[0] != "object" ? e.slice() : e.map((t) => hh(t));
}
function fh(n, e) {
  if (!n) throw new Error("geojson is required");
  if (n.type !== "FeatureCollection")
    throw new Error("geojson must be a FeatureCollection");
  if (e == null)
    throw new Error("filter is required");
  var t = [];
  return Pe(n, function(i) {
    ls(i.properties, e) && t.push(i);
  }), ce(t);
}
function ra(n, e, t) {
  if (!n) throw new Error("geojson is required");
  if (n.type !== "FeatureCollection")
    throw new Error("geojson must be a FeatureCollection");
  if (e == null)
    throw new Error("property is required");
  for (var i = ia(n, e), o = Object.keys(i), a = 0; a < o.length; a++) {
    for (var u = o[a], h = i[u], f = [], g = 0; g < h.length; g++)
      f.push(n.features[h[g]]);
    t(ce(f), u, a);
  }
}
function gh(n, e, t, i) {
  var o = i;
  return ra(
    n,
    e,
    function(a, u, h) {
      h === 0 && i === void 0 ? o = a : o = t(
        o,
        a,
        u,
        h
      );
    }
  ), o;
}
function ia(n, e) {
  var t = {};
  return Pe(n, function(i, o) {
    var a = i.properties || {};
    if (Object.prototype.hasOwnProperty.call(a, String(e))) {
      var u = a[e];
      Object.prototype.hasOwnProperty.call(t, u) ? t[u].push(o) : t[u] = [o];
    }
  }), t;
}
function ls(n, e) {
  if (n === void 0) return !1;
  var t = typeof e;
  if (t === "number" || t === "string")
    return Object.prototype.hasOwnProperty.call(n, e);
  if (Array.isArray(e)) {
    for (var i = 0; i < e.length; i++)
      if (!ls(n, e[i])) return !1;
    return !0;
  } else
    return sa(n, e);
}
function sa(n, e) {
  for (var t = Object.keys(e), i = 0; i < t.length; i++) {
    var o = t[i];
    if (n[o] !== e[o]) return !1;
  }
  return !0;
}
function dh(n, e) {
  if (!e) return {};
  if (!e.length) return {};
  for (var t = {}, i = 0; i < e.length; i++) {
    var o = e[i];
    Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
  }
  return t;
}
const Rm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyFilter: ls,
  clusterEach: ra,
  clusterReduce: gh,
  createBins: ia,
  filterProperties: dh,
  getCluster: fh,
  propertiesContainsFilter: sa
}, Symbol.toStringTag, { value: "Module" }));
function Dm(n, e, t = {}) {
  t.mutate !== !0 && (n = nt(n));
  const i = t.minPoints || 3, o = Kr(e, t.units);
  var a = new ar(n.features.length), u = n.features.map((_) => !1), h = n.features.map((_) => !1), f = n.features.map((_) => !1), g = n.features.map((_) => -1);
  a.load(
    n.features.map((_, w) => {
      var [C, b] = _.geometry.coordinates;
      return {
        minX: C,
        minY: b,
        maxX: C,
        maxY: b,
        index: w
      };
    })
  );
  const m = (_) => {
    const w = n.features[_], [C, b] = w.geometry.coordinates, S = Math.max(b - o, -90), I = Math.min(b + o, 90), N = function() {
      return S < 0 && I > 0 ? o : Math.abs(S) < Math.abs(I) ? o / Math.cos(Je(I)) : o / Math.cos(Je(S));
    }(), A = Math.max(C - N, -360), R = Math.min(C + N, 360), U = { minX: A, minY: S, maxX: R, maxY: I };
    return a.search(U).filter(
      (V) => {
        const k = V.index, M = n.features[k];
        return qe(w, M, {
          units: t.units
        }) <= e;
      }
    );
  }, v = (_, w) => {
    for (var C = 0; C < w.length; C++) {
      var b = w[C];
      const S = b.index;
      if (!u[S]) {
        u[S] = !0;
        const I = m(S);
        I.length >= i && w.push(...I);
      }
      h[S] || (h[S] = !0, g[S] = _);
    }
  };
  var p = 0;
  return n.features.forEach((_, w) => {
    if (u[w]) return;
    const C = m(w);
    if (C.length >= i) {
      const b = p;
      p++, u[w] = !0, v(b, C);
    } else
      f[w] = !0;
  }), n.features.forEach((_, w) => {
    var C = n.features[w];
    C.properties || (C.properties = {}), g[w] >= 0 ? (C.properties.dbscan = f[w] ? "edge" : "core", C.properties.cluster = g[w]) : C.properties.dbscan = "noise";
  }), n;
}
var vh = {
  /**
   * Euclidean distance
   */
  eudist: function(e, t, i) {
    for (var o = e.length, a = 0, u = 0; u < o; u++) {
      var h = (e[u] || 0) - (t[u] || 0);
      a += h * h;
    }
    return i ? Math.sqrt(a) : a;
  },
  mandist: function(e, t, i) {
    for (var o = e.length, a = 0, u = 0; u < o; u++)
      a += Math.abs((e[u] || 0) - (t[u] || 0));
    return i ? Math.sqrt(a) : a;
  },
  /**
   * Unidimensional distance
   */
  dist: function(e, t, i) {
    var o = Math.abs(e - t);
    return i ? o : o * o;
  }
}, mh = vh, Fm = mh.eudist, Bm = mh.dist, Gm = {
  kmrand: function(e, t) {
    for (var i = {}, o = [], a = t << 2, u = e.length, h = e[0].length > 0; o.length < t && a-- > 0; ) {
      var f = e[Math.floor(Math.random() * u)], g = h ? f.join("_") : "" + f;
      i[g] || (i[g] = !0, o.push(f));
    }
    if (o.length < t) throw new Error("Error initializating clusters");
    return o;
  },
  /**
   * K-means++ initial centroid selection
   */
  kmpp: function(e, t) {
    var i = e[0].length ? Fm : Bm, o = [], a = e.length, u = e[0].length > 0, h = e[Math.floor(Math.random() * a)];
    for (u ? h.join("_") : "" + h, o.push(h); o.length < t; ) {
      for (var f = [], g = o.length, m = 0, v = [], p = 0; p < a; p++) {
        for (var _ = 1 / 0, w = 0; w < g; w++) {
          var C = i(e[p], o[w]);
          C <= _ && (_ = C);
        }
        f[p] = _;
      }
      for (var b = 0; b < a; b++)
        m += f[b];
      for (var S = 0; S < a; S++)
        v[S] = { i: S, v: e[S], pr: f[S] / m, cs: 0 };
      v.sort(function(R, U) {
        return R.pr - U.pr;
      }), v[0].cs = v[0].pr;
      for (var I = 1; I < a; I++)
        v[I].cs = v[I - 1].cs + v[I].pr;
      for (var N = Math.random(), A = 0; A < a - 1 && v[A++].cs < N; )
        ;
      o.push(v[A - 1].v);
    }
    return o;
  }
}, oa = vh, yh = Gm, qm = oa.eudist;
oa.mandist;
oa.dist;
var zm = yh.kmrand, Ym = yh.kmpp, al = 1e4;
function ul(n, e, t) {
  t = t || [];
  for (var i = 0; i < n; i++)
    t[i] = e;
  return t;
}
function Um(n, e, t, i) {
  var o = [], a = [], u = [], h = [], f = !1, g = i || al, m = n.length, v = n[0].length, p = v > 0, _ = [];
  if (t)
    t == "kmrand" ? o = zm(n, e) : t == "kmpp" ? o = Ym(n, e) : o = t;
  else for (var w = {}; o.length < e; ) {
    var C = Math.floor(Math.random() * m);
    w[C] || (w[C] = !0, o.push(n[C]));
  }
  do {
    ul(e, 0, _);
    for (var b = 0; b < m; b++) {
      for (var S = 1 / 0, I = 0, N = 0; N < e; N++) {
        var h = p ? qm(n[b], o[N]) : Math.abs(n[b] - o[N]);
        h <= S && (S = h, I = N);
      }
      u[b] = I, _[I]++;
    }
    for (var A = [], a = [], R = 0; R < e; R++)
      A[R] = p ? ul(v, 0, A[R]) : 0, a[R] = o[R];
    if (p) {
      for (var U = 0; U < e; U++)
        o[U] = [];
      for (var V = 0; V < m; V++)
        for (var k = u[V], M = A[k], T = n[V], D = 0; D < v; D++)
          M[D] += T[D];
      f = !0;
      for (var B = 0; B < e; B++) {
        for (var q = o[B], X = A[B], O = a[B], Y = _[B], G = 0; G < v; G++)
          q[G] = X[G] / Y || 0;
        if (f) {
          for (var H = 0; H < v; H++)
            if (O[H] != q[H]) {
              f = !1;
              break;
            }
        }
      }
    } else {
      for (var Q = 0; Q < m; Q++) {
        var W = u[Q];
        A[W] += n[Q];
      }
      for (var j = 0; j < e; j++)
        o[j] = A[j] / _[j] || 0;
      f = !0;
      for (var J = 0; J < e; J++)
        if (a[J] != o[J]) {
          f = !1;
          break;
        }
    }
    f = f || --g <= 0;
  } while (!f);
  return {
    it: al - g,
    k: e,
    idxs: u,
    centroids: o
  };
}
var Xm = Um;
const Vm = /* @__PURE__ */ ti(Xm);
function Hm(n, e = {}) {
  var t = n.features.length;
  e.numberOfClusters = e.numberOfClusters || Math.round(Math.sqrt(t / 2)), e.numberOfClusters > t && (e.numberOfClusters = t), e.mutate !== !0 && (n = nt(n));
  var i = Gr(n), o = i.slice(0, e.numberOfClusters), a = Vm(i, e.numberOfClusters, o), u = {};
  return a.centroids.forEach(function(h, f) {
    u[f] = h;
  }), Pe(n, function(h, f) {
    var g = a.idxs[f];
    h.properties.cluster = g, h.properties.centroid = u[g];
  }), n;
}
function Wm(n, e, t, i) {
  var o = new ar(6), a = e.features.map(function(u) {
    var h;
    return {
      minX: u.geometry.coordinates[0],
      minY: u.geometry.coordinates[1],
      maxX: u.geometry.coordinates[0],
      maxY: u.geometry.coordinates[1],
      property: (h = u.properties) == null ? void 0 : h[t]
    };
  });
  return o.load(a), n.features.forEach(function(u) {
    u.properties || (u.properties = {});
    var h = ze(u), f = o.search({
      minX: h[0],
      minY: h[1],
      maxX: h[2],
      maxY: h[3]
    }), g = [];
    f.forEach(function(m) {
      xe([m.minX, m.minY], u) && g.push(m.property);
    }), u.properties[i] = g;
  }), n;
}
function $m(n) {
  var e = {
    MultiPoint: {
      coordinates: [],
      properties: []
    },
    MultiLineString: {
      coordinates: [],
      properties: []
    },
    MultiPolygon: {
      coordinates: [],
      properties: []
    }
  };
  return Pe(n, (t) => {
    var i;
    switch ((i = t.geometry) == null ? void 0 : i.type) {
      case "Point":
        e.MultiPoint.coordinates.push(t.geometry.coordinates), e.MultiPoint.properties.push(t.properties);
        break;
      case "MultiPoint":
        e.MultiPoint.coordinates.push(...t.geometry.coordinates), e.MultiPoint.properties.push(t.properties);
        break;
      case "LineString":
        e.MultiLineString.coordinates.push(t.geometry.coordinates), e.MultiLineString.properties.push(t.properties);
        break;
      case "MultiLineString":
        e.MultiLineString.coordinates.push(
          ...t.geometry.coordinates
        ), e.MultiLineString.properties.push(t.properties);
        break;
      case "Polygon":
        e.MultiPolygon.coordinates.push(t.geometry.coordinates), e.MultiPolygon.properties.push(t.properties);
        break;
      case "MultiPolygon":
        e.MultiPolygon.coordinates.push(...t.geometry.coordinates), e.MultiPolygon.properties.push(t.properties);
        break;
    }
  }), ce(
    Object.keys(e).filter(function(t) {
      return e[t].coordinates.length;
    }).sort().map(function(t) {
      var i = { type: t, coordinates: e[t].coordinates }, o = { collectedProperties: e[t].properties };
      return Qe(i, o);
    })
  );
}
function ph(n, e) {
  let t = !1;
  return ce(
    Qm(
      n.features.map((i) => {
        const o = {
          x: i.geometry.coordinates[0],
          y: i.geometry.coordinates[1]
        };
        return e ? o.z = i.properties[e] : i.geometry.coordinates.length === 3 && (t = !0, o.z = i.geometry.coordinates[2]), o;
      })
    ).map((i) => {
      const o = [i.a.x, i.a.y], a = [i.b.x, i.b.y], u = [i.c.x, i.c.y];
      let h = {};
      return t ? (o.push(i.a.z), a.push(i.b.z), u.push(i.c.z)) : h = {
        a: i.a.z,
        b: i.b.z,
        c: i.c.z
      }, ye([[o, a, u, o]], h);
    })
  );
}
var ll = class {
  constructor(n, e, t) {
    this.a = n, this.b = e, this.c = t;
    const i = e.x - n.x, o = e.y - n.y, a = t.x - n.x, u = t.y - n.y, h = i * (n.x + e.x) + o * (n.y + e.y), f = a * (n.x + t.x) + u * (n.y + t.y), g = 2 * (i * (t.y - e.y) - o * (t.x - e.x));
    let m, v;
    this.x = (u * h - o * f) / g, this.y = (i * f - a * h) / g, m = this.x - n.x, v = this.y - n.y, this.r = m * m + v * v;
  }
};
function Zm(n, e) {
  return e.x - n.x;
}
function Km(n) {
  let e = n.length, t, i, o, a, u;
  e: for (; e; )
    for (i = n[--e], t = n[--e], o = e; o; )
      if (u = n[--o], a = n[--o], t === a && i === u || t === u && i === a) {
        n.splice(e, 2), n.splice(o, 2), e -= 2;
        continue e;
      }
}
function Qm(n) {
  if (n.length < 3)
    return [];
  n.sort(Zm);
  let e = n.length - 1;
  const t = n[e].x, i = n[0].x;
  let o = n[e].y, a = o;
  const u = 1e-12;
  let h, f, g, m, v, p;
  for (; e--; )
    n[e].y < o && (o = n[e].y), n[e].y > a && (a = n[e].y);
  let _ = i - t, w = a - o;
  const C = _ > w ? _ : w, b = (i + t) * 0.5, S = (a + o) * 0.5, I = [
    new ll(
      {
        __sentinel: !0,
        x: b - 20 * C,
        y: S - C
      },
      {
        __sentinel: !0,
        x: b,
        y: S + 20 * C
      },
      {
        __sentinel: !0,
        x: b + 20 * C,
        y: S - C
      }
    )
  ], N = [], A = [];
  let R;
  for (e = n.length; e--; ) {
    for (A.length = 0, R = I.length; R--; ) {
      if (_ = n[e].x - I[R].x, _ > 0 && _ * _ > I[R].r) {
        N.push(I[R]), I.splice(R, 1);
        continue;
      }
      w = n[e].y - I[R].y, !(_ * _ + w * w > I[R].r) && (A.push(
        I[R].a,
        I[R].b,
        I[R].b,
        I[R].c,
        I[R].c,
        I[R].a
      ), I.splice(R, 1));
    }
    for (Km(A), R = A.length; R; )
      f = A[--R], h = A[--R], g = n[e], m = f.x - h.x, v = f.y - h.y, p = 2 * (m * (g.y - f.y) - v * (g.x - f.x)), Math.abs(p) > u && I.push(new ll(h, f, g));
  }
  for (Array.prototype.push.apply(N, I), e = N.length; e--; )
    (N[e].a.__sentinel || N[e].b.__sentinel || N[e].c.__sentinel) && N.splice(e, 1);
  return N;
}
function Jm(n) {
  return n;
}
function jm(n) {
  if (n == null) return Jm;
  var e, t, i = n.scale[0], o = n.scale[1], a = n.translate[0], u = n.translate[1];
  return function(h, f) {
    f || (e = t = 0);
    var g = 2, m = h.length, v = new Array(m);
    for (v[0] = (e += h[0]) * i + a, v[1] = (t += h[1]) * o + u; g < m; ) v[g] = h[g], ++g;
    return v;
  };
}
function ey(n, e) {
  for (var t, i = n.length, o = i - e; o < --i; ) t = n[o], n[o++] = n[i], n[i] = t;
}
function _h(n, e) {
  var t = jm(n.transform), i = n.arcs;
  function o(m, v) {
    v.length && v.pop();
    for (var p = i[m < 0 ? ~m : m], _ = 0, w = p.length; _ < w; ++_)
      v.push(t(p[_], _));
    m < 0 && ey(v, w);
  }
  function a(m) {
    return t(m);
  }
  function u(m) {
    for (var v = [], p = 0, _ = m.length; p < _; ++p) o(m[p], v);
    return v.length < 2 && v.push(v[0]), v;
  }
  function h(m) {
    for (var v = u(m); v.length < 4; ) v.push(v[0]);
    return v;
  }
  function f(m) {
    return m.map(h);
  }
  function g(m) {
    var v = m.type, p;
    switch (v) {
      case "GeometryCollection":
        return { type: v, geometries: m.geometries.map(g) };
      case "Point":
        p = a(m.coordinates);
        break;
      case "MultiPoint":
        p = m.coordinates.map(a);
        break;
      case "LineString":
        p = u(m.arcs);
        break;
      case "MultiLineString":
        p = m.arcs.map(u);
        break;
      case "Polygon":
        p = f(m.arcs);
        break;
      case "MultiPolygon":
        p = m.arcs.map(f);
        break;
      default:
        return null;
    }
    return { type: v, coordinates: p };
  }
  return g(e);
}
function ty(n, e) {
  var t = {}, i = {}, o = {}, a = [], u = -1;
  e.forEach(function(g, m) {
    var v = n.arcs[g < 0 ? ~g : g], p;
    v.length < 3 && !v[1][0] && !v[1][1] && (p = e[++u], e[u] = g, e[m] = p);
  }), e.forEach(function(g) {
    var m = h(g), v = m[0], p = m[1], _, w;
    if (_ = o[v])
      if (delete o[_.end], _.push(g), _.end = p, w = i[p]) {
        delete i[w.start];
        var C = w === _ ? _ : _.concat(w);
        i[C.start = _.start] = o[C.end = w.end] = C;
      } else
        i[_.start] = o[_.end] = _;
    else if (_ = i[p])
      if (delete i[_.start], _.unshift(g), _.start = v, w = o[v]) {
        delete o[w.end];
        var b = w === _ ? _ : w.concat(_);
        i[b.start = w.start] = o[b.end = _.end] = b;
      } else
        i[_.start] = o[_.end] = _;
    else
      _ = [g], i[_.start = v] = o[_.end = p] = _;
  });
  function h(g) {
    var m = n.arcs[g < 0 ? ~g : g], v = m[0], p;
    return n.transform ? (p = [0, 0], m.forEach(function(_) {
      p[0] += _[0], p[1] += _[1];
    })) : p = m[m.length - 1], g < 0 ? [p, v] : [v, p];
  }
  function f(g, m) {
    for (var v in g) {
      var p = g[v];
      delete m[p.start], delete p.start, delete p.end, p.forEach(function(_) {
        t[_ < 0 ? ~_ : _] = 1;
      }), a.push(p);
    }
  }
  return f(o, i), f(i, o), e.forEach(function(g) {
    t[g < 0 ? ~g : g] || a.push([g]);
  }), a;
}
function ny(n) {
  for (var e = -1, t = n.length, i, o = n[t - 1], a = 0; ++e < t; ) i = o, o = n[e], a += i[0] * o[1] - i[1] * o[0];
  return Math.abs(a);
}
function ry(n) {
  return _h(n, iy.apply(this, arguments));
}
function iy(n, e) {
  var t = {}, i = [], o = [];
  e.forEach(a);
  function a(f) {
    switch (f.type) {
      case "GeometryCollection":
        f.geometries.forEach(a);
        break;
      case "Polygon":
        u(f.arcs);
        break;
      case "MultiPolygon":
        f.arcs.forEach(u);
        break;
    }
  }
  function u(f) {
    f.forEach(function(g) {
      g.forEach(function(m) {
        (t[m = m < 0 ? ~m : m] || (t[m] = [])).push(f);
      });
    }), i.push(f);
  }
  function h(f) {
    return ny(_h(n, { type: "Polygon", arcs: [f] }).coordinates[0]);
  }
  return i.forEach(function(f) {
    if (!f._) {
      var g = [], m = [f];
      for (f._ = 1, o.push(g); f = m.pop(); )
        g.push(f), f.forEach(function(v) {
          v.forEach(function(p) {
            t[p < 0 ? ~p : p].forEach(function(_) {
              _._ || (_._ = 1, m.push(_));
            });
          });
        });
    }
  }), i.forEach(function(f) {
    delete f._;
  }), {
    type: "MultiPolygon",
    arcs: o.map(function(f) {
      var g = [], m;
      if (f.forEach(function(C) {
        C.forEach(function(b) {
          b.forEach(function(S) {
            t[S < 0 ? ~S : S].length < 2 && g.push(S);
          });
        });
      }), g = ty(n, g), (m = g.length) > 1)
        for (var v = 1, p = h(g[0]), _, w; v < m; ++v)
          (_ = h(g[v])) > p && (w = g[0], g[0] = g[v], g[v] = w, p = _);
      return g;
    }).filter(function(f) {
      return f.length > 0;
    })
  };
}
var aa = Object.prototype.hasOwnProperty;
function sy(n) {
  var e = 1 / 0, t = 1 / 0, i = -1 / 0, o = -1 / 0;
  function a(v) {
    v != null && aa.call(u, v.type) && u[v.type](v);
  }
  var u = {
    GeometryCollection: function(v) {
      v.geometries.forEach(a);
    },
    Point: function(v) {
      h(v.coordinates);
    },
    MultiPoint: function(v) {
      v.coordinates.forEach(h);
    },
    LineString: function(v) {
      f(v.arcs);
    },
    MultiLineString: function(v) {
      v.arcs.forEach(f);
    },
    Polygon: function(v) {
      v.arcs.forEach(f);
    },
    MultiPolygon: function(v) {
      v.arcs.forEach(g);
    }
  };
  function h(v) {
    var p = v[0], _ = v[1];
    p < e && (e = p), p > i && (i = p), _ < t && (t = _), _ > o && (o = _);
  }
  function f(v) {
    v.forEach(h);
  }
  function g(v) {
    v.forEach(f);
  }
  for (var m in n)
    a(n[m]);
  return i >= e && o >= t ? [e, t, i, o] : void 0;
}
function oy(n, e, t, i, o) {
  arguments.length === 3 && (i = Array, o = null);
  for (var a = new i(n = 1 << Math.max(4, Math.ceil(Math.log(n) / Math.LN2))), u = n - 1, h = 0; h < n; ++h)
    a[h] = o;
  function f(v) {
    for (var p = e(v) & u, _ = a[p], w = 0; _ != o; ) {
      if (t(_, v)) return !0;
      if (++w >= n) throw new Error("full hashset");
      _ = a[p = p + 1 & u];
    }
    return a[p] = v, !0;
  }
  function g(v) {
    for (var p = e(v) & u, _ = a[p], w = 0; _ != o; ) {
      if (t(_, v)) return !0;
      if (++w >= n) break;
      _ = a[p = p + 1 & u];
    }
    return !1;
  }
  function m() {
    for (var v = [], p = 0, _ = a.length; p < _; ++p) {
      var w = a[p];
      w != o && v.push(w);
    }
    return v;
  }
  return {
    add: f,
    has: g,
    values: m
  };
}
function ua(n, e, t, i, o, a) {
  arguments.length === 3 && (i = a = Array, o = null);
  for (var u = new i(n = 1 << Math.max(4, Math.ceil(Math.log(n) / Math.LN2))), h = new a(n), f = n - 1, g = 0; g < n; ++g)
    u[g] = o;
  function m(w, C) {
    for (var b = e(w) & f, S = u[b], I = 0; S != o; ) {
      if (t(S, w)) return h[b] = C;
      if (++I >= n) throw new Error("full hashmap");
      S = u[b = b + 1 & f];
    }
    return u[b] = w, h[b] = C, C;
  }
  function v(w, C) {
    for (var b = e(w) & f, S = u[b], I = 0; S != o; ) {
      if (t(S, w)) return h[b];
      if (++I >= n) throw new Error("full hashmap");
      S = u[b = b + 1 & f];
    }
    return u[b] = w, h[b] = C, C;
  }
  function p(w, C) {
    for (var b = e(w) & f, S = u[b], I = 0; S != o; ) {
      if (t(S, w)) return h[b];
      if (++I >= n) break;
      S = u[b = b + 1 & f];
    }
    return C;
  }
  function _() {
    for (var w = [], C = 0, b = u.length; C < b; ++C) {
      var S = u[C];
      S != o && w.push(S);
    }
    return w;
  }
  return {
    set: m,
    maybeSet: v,
    // set if unset
    get: p,
    keys: _
  };
}
function bn(n, e) {
  return n[0] === e[0] && n[1] === e[1];
}
var wh = new ArrayBuffer(16), cl = new Float64Array(wh), Si = new Uint32Array(wh);
function _o(n) {
  cl[0] = n[0], cl[1] = n[1];
  var e = Si[0] ^ Si[1];
  return e = e << 5 ^ e >> 7 ^ Si[2] ^ Si[3], e & 2147483647;
}
function ay(n) {
  var e = n.coordinates, t = n.lines, i = n.rings, o = U(), a = new Int32Array(e.length), u = new Int32Array(e.length), h = new Int32Array(e.length), f = new Int8Array(e.length), g = 0, m, v, p, _, w;
  for (m = 0, v = e.length; m < v; ++m)
    a[m] = u[m] = h[m] = -1;
  for (m = 0, v = t.length; m < v; ++m) {
    var C = t[m], b = C[0], S = C[1];
    for (_ = o[b], w = o[++b], ++g, f[_] = 1; ++b <= S; )
      R(m, p = _, _ = w, w = o[b]);
    ++g, f[w] = 1;
  }
  for (m = 0, v = e.length; m < v; ++m)
    a[m] = -1;
  for (m = 0, v = i.length; m < v; ++m) {
    var I = i[m], N = I[0] + 1, A = I[1];
    for (p = o[A - 1], _ = o[N - 1], w = o[N], R(m, p, _, w); ++N <= A; )
      R(m, p = _, _ = w, w = o[N]);
  }
  function R(D, B, q, X) {
    if (a[q] !== D) {
      a[q] = D;
      var O = u[q];
      if (O >= 0) {
        var Y = h[q];
        (O !== B || Y !== X) && (O !== X || Y !== B) && (++g, f[q] = 1);
      } else
        u[q] = B, h[q] = X;
    }
  }
  function U() {
    for (var D = ua(e.length * 1.4, V, k, Int32Array, -1, Int32Array), B = new Int32Array(e.length), q = 0, X = e.length; q < X; ++q)
      B[q] = D.maybeSet(q, q);
    return B;
  }
  function V(D) {
    return _o(e[D]);
  }
  function k(D, B) {
    return bn(e[D], e[B]);
  }
  a = u = h = null;
  var M = oy(g * 1.4, _o, bn), T;
  for (m = 0, v = e.length; m < v; ++m)
    f[T = o[m]] && M.add(e[T]);
  return M;
}
function uy(n) {
  var e = ay(n), t = n.coordinates, i = n.lines, o = n.rings, a, u, h;
  for (u = 0, h = i.length; u < h; ++u)
    for (var f = i[u], g = f[0], m = f[1]; ++g < m; )
      e.has(t[g]) && (a = { 0: g, 1: f[1] }, f[1] = g, f = f.next = a);
  for (u = 0, h = o.length; u < h; ++u)
    for (var v = o[u], p = v[0], _ = p, w = v[1], C = e.has(t[p]); ++_ < w; )
      e.has(t[_]) && (C ? (a = { 0: _, 1: v[1] }, v[1] = _, v = v.next = a) : (ly(t, p, w, w - _), t[w] = t[p], C = !0, _ = p));
  return n;
}
function ly(n, e, t, i) {
  to(n, e, t), to(n, e, e + i), to(n, e + i, t);
}
function to(n, e, t) {
  for (var i = e + (t-- - e >> 1), o; e < i; ++e, --t)
    o = n[e], n[e] = n[t], n[t] = o;
}
function cy(n) {
  var e = n.coordinates, t = n.lines, i, o = n.rings, a, u = t.length + o.length, h, f;
  for (delete n.lines, delete n.rings, h = 0, f = t.length; h < f; ++h)
    for (i = t[h]; i = i.next; ) ++u;
  for (h = 0, f = o.length; h < f; ++h)
    for (a = o[h]; a = a.next; ) ++u;
  var g = ua(u * 2 * 1.4, _o, bn), m = n.arcs = [];
  for (h = 0, f = t.length; h < f; ++h) {
    i = t[h];
    do
      v(i);
    while (i = i.next);
  }
  for (h = 0, f = o.length; h < f; ++h)
    if (a = o[h], a.next)
      do
        v(a);
      while (a = a.next);
    else
      p(a);
  function v(I) {
    var N, A, R, U, V, k, M, T;
    if (R = g.get(N = e[I[0]])) {
      for (M = 0, T = R.length; M < T; ++M)
        if (U = R[M], _(U, I)) {
          I[0] = U[0], I[1] = U[1];
          return;
        }
    }
    if (V = g.get(A = e[I[1]])) {
      for (M = 0, T = V.length; M < T; ++M)
        if (k = V[M], w(k, I)) {
          I[1] = k[0], I[0] = k[1];
          return;
        }
    }
    R ? R.push(I) : g.set(N, [I]), V ? V.push(I) : g.set(A, [I]), m.push(I);
  }
  function p(I) {
    var N, A, R, U, V;
    if (A = g.get(N = e[I[0]]))
      for (U = 0, V = A.length; U < V; ++U) {
        if (R = A[U], C(R, I)) {
          I[0] = R[0], I[1] = R[1];
          return;
        }
        if (b(R, I)) {
          I[0] = R[1], I[1] = R[0];
          return;
        }
      }
    if (A = g.get(N = e[I[0] + S(I)]))
      for (U = 0, V = A.length; U < V; ++U) {
        if (R = A[U], C(R, I)) {
          I[0] = R[0], I[1] = R[1];
          return;
        }
        if (b(R, I)) {
          I[0] = R[1], I[1] = R[0];
          return;
        }
      }
    A ? A.push(I) : g.set(N, [I]), m.push(I);
  }
  function _(I, N) {
    var A = I[0], R = N[0], U = I[1], V = N[1];
    if (A - U !== R - V) return !1;
    for (; A <= U; ++A, ++R) if (!bn(e[A], e[R])) return !1;
    return !0;
  }
  function w(I, N) {
    var A = I[0], R = N[0], U = I[1], V = N[1];
    if (A - U !== R - V) return !1;
    for (; A <= U; ++A, --V) if (!bn(e[A], e[V])) return !1;
    return !0;
  }
  function C(I, N) {
    var A = I[0], R = N[0], U = I[1], V = N[1], k = U - A;
    if (k !== V - R) return !1;
    for (var M = S(I), T = S(N), D = 0; D < k; ++D)
      if (!bn(e[A + (D + M) % k], e[R + (D + T) % k])) return !1;
    return !0;
  }
  function b(I, N) {
    var A = I[0], R = N[0], U = I[1], V = N[1], k = U - A;
    if (k !== V - R) return !1;
    for (var M = S(I), T = k - S(N), D = 0; D < k; ++D)
      if (!bn(e[A + (D + M) % k], e[V - (D + T) % k])) return !1;
    return !0;
  }
  function S(I) {
    for (var N = I[0], A = I[1], R = N, U = R, V = e[R]; ++R < A; ) {
      var k = e[R];
      (k[0] < V[0] || k[0] === V[0] && k[1] < V[1]) && (U = R, V = k);
    }
    return U - N;
  }
  return n;
}
function hy(n) {
  var e = -1, t = [], i = [], o = [];
  function a(v) {
    v && aa.call(u, v.type) && u[v.type](v);
  }
  var u = {
    GeometryCollection: function(v) {
      v.geometries.forEach(a);
    },
    LineString: function(v) {
      v.arcs = h(v.arcs);
    },
    MultiLineString: function(v) {
      v.arcs = v.arcs.map(h);
    },
    Polygon: function(v) {
      v.arcs = v.arcs.map(f);
    },
    MultiPolygon: function(v) {
      v.arcs = v.arcs.map(g);
    }
  };
  function h(v) {
    for (var p = 0, _ = v.length; p < _; ++p) o[++e] = v[p];
    var w = { 0: e - _ + 1, 1: e };
    return t.push(w), w;
  }
  function f(v) {
    for (var p = 0, _ = v.length; p < _; ++p) o[++e] = v[p];
    var w = { 0: e - _ + 1, 1: e };
    return i.push(w), w;
  }
  function g(v) {
    return v.map(f);
  }
  for (var m in n)
    a(n[m]);
  return {
    type: "Topology",
    coordinates: o,
    lines: t,
    rings: i,
    objects: n
  };
}
function fy(n) {
  var e = {}, t;
  for (t in n) e[t] = gy(n[t]);
  return e;
}
function gy(n) {
  return n == null ? { type: null } : (n.type === "FeatureCollection" ? dy : n.type === "Feature" ? xh : la)(n);
}
function dy(n) {
  var e = { type: "GeometryCollection", geometries: n.features.map(xh) };
  return n.bbox != null && (e.bbox = n.bbox), e;
}
function xh(n) {
  var e = la(n.geometry), t;
  n.id != null && (e.id = n.id), n.bbox != null && (e.bbox = n.bbox);
  for (t in n.properties) {
    e.properties = n.properties;
    break;
  }
  return e;
}
function la(n) {
  if (n == null) return { type: null };
  var e = n.type === "GeometryCollection" ? { type: "GeometryCollection", geometries: n.geometries.map(la) } : n.type === "Point" || n.type === "MultiPoint" ? { type: n.type, coordinates: n.coordinates } : { type: n.type, arcs: n.coordinates };
  return n.bbox != null && (e.bbox = n.bbox), e;
}
function vy(n, e) {
  var t = sy(n = fy(n)), i = cy(uy(hy(n))), o = i.coordinates, a = ua(i.arcs.length * 1.4, my, yy);
  n = i.objects, i.bbox = t, i.arcs = i.arcs.map(function(v, p) {
    return a.set(v, p), o.slice(v[0], v[1] + 1);
  }), delete i.coordinates, o = null;
  function u(v) {
    v && aa.call(h, v.type) && h[v.type](v);
  }
  var h = {
    GeometryCollection: function(v) {
      v.geometries.forEach(u);
    },
    LineString: function(v) {
      v.arcs = f(v.arcs);
    },
    MultiLineString: function(v) {
      v.arcs = v.arcs.map(f);
    },
    Polygon: function(v) {
      v.arcs = v.arcs.map(f);
    },
    MultiPolygon: function(v) {
      v.arcs = v.arcs.map(g);
    }
  };
  function f(v) {
    var p = [];
    do {
      var _ = a.get(v);
      p.push(v[0] < v[1] ? _ : ~_);
    } while (v = v.next);
    return p;
  }
  function g(v) {
    return v.map(f);
  }
  for (var m in n)
    u(n[m]);
  return i;
}
function my(n) {
  var e = n[0], t = n[1], i;
  return t < e && (i = e, e = t, t = i), e + 31 * t;
}
function yy(n, e) {
  var t = n[0], i = n[1], o = e[0], a = e[1], u;
  return i < t && (u = t, t = i, i = u), a < o && (u = o, o = a, a = u), t === o && i === a;
}
function py(n, e = {}) {
  if (e = e || {}, !Re(e))
    throw new Error("options is invalid");
  const t = e.mutate;
  if (xt(n) !== "FeatureCollection")
    throw new Error("geojson must be a FeatureCollection");
  if (!n.features.length)
    throw new Error("geojson is empty");
  (t === !1 || t === void 0) && (n = nt(n));
  const i = [], o = Xo(
    n,
    (a, u) => {
      const h = _y(a, u);
      return h || (i.push(a), u);
    }
  );
  return o && i.push(o), i.length ? i.length === 1 ? i[0] : pn(
    i.map((a) => a.coordinates)
  ) : null;
}
function Mi(n) {
  return n[0].toString() + "," + n[1].toString();
}
function _y(n, e) {
  const t = n.geometry.coordinates, i = e.geometry.coordinates, o = Mi(t[0]), a = Mi(t[t.length - 1]), u = Mi(i[0]), h = Mi(i[i.length - 1]);
  let f;
  if (o === h)
    f = i.concat(t.slice(1));
  else if (u === a)
    f = t.concat(i.slice(1));
  else if (o === u)
    f = t.slice(1).reverse().concat(i);
  else if (a === h)
    f = t.concat(i.reverse().slice(1));
  else
    return null;
  return Se(f);
}
function wy(n, e = {}) {
  if (xt(n) !== "FeatureCollection")
    throw new Error("geojson must be a FeatureCollection");
  if (!n.features.length)
    throw new Error("geojson is empty");
  (e.mutate === !1 || e.mutate === void 0) && (n = nt(n));
  const t = [];
  it(n, (a) => {
    t.push(a.geometry);
  });
  const i = vy({ geoms: Do(t).geometry });
  return ry(i, i.objects.geoms.geometries);
}
function xy(n, e = {}) {
  if (e = e || {}, !Re(e))
    throw new Error("options is invalid");
  const t = e.mutate;
  if (xt(n) !== "FeatureCollection")
    throw new Error("geojson must be a FeatureCollection");
  if (!n.features.length)
    throw new Error("geojson is empty");
  (t === !1 || t === void 0) && (n = nt(n));
  const i = Ey(n);
  if (!i)
    throw new Error("geojson must be homogenous");
  const o = n;
  switch (i) {
    case "LineString":
      return py(o, e);
    case "Polygon":
      return wy(o, e);
    default:
      throw new Error(i + " is not supported");
  }
}
function Ey(n) {
  const e = {};
  it(n, (i) => {
    e[i.geometry.type] = !0;
  });
  const t = Object.keys(e);
  return t.length === 1 ? t[0] : null;
}
function ky(n, e = {}) {
  const t = e.maxEdge || 1 / 0, i = Cy(n), o = ph(i);
  if (o.features = o.features.filter((u) => {
    const h = u.geometry.coordinates[0][0], f = u.geometry.coordinates[0][1], g = u.geometry.coordinates[0][2], m = qe(h, f, e), v = qe(f, g, e), p = qe(h, g, e);
    return m <= t && v <= t && p <= t;
  }), o.features.length < 1)
    return null;
  const a = xy(o);
  return a.coordinates.length === 1 && (a.coordinates = a.coordinates[0], a.type = "Polygon"), Qe(a);
}
function Cy(n) {
  const e = [], t = {};
  return Pe(n, (i) => {
    if (!i.geometry)
      return;
    const o = i.geometry.coordinates.join("-");
    Object.prototype.hasOwnProperty.call(t, o) || (e.push(i), t[o] = !0);
  }), ce(e);
}
var Iy = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, no = Math.ceil, Ot = Math.floor, _t = "[BigNumber Error] ", hl = _t + "Number primitive has more than 15 significant digits: ", qt = 1e14, Ce = 14, ro = 9007199254740991, io = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], vn = 1e7, rt = 1e9;
function Eh(n) {
  var e, t, i, o = I.prototype = { constructor: I, toString: null, valueOf: null }, a = new I(1), u = 20, h = 4, f = -7, g = 21, m = -1e7, v = 1e7, p = !1, _ = 1, w = 0, C = {
    prefix: "",
    groupSize: 3,
    secondaryGroupSize: 0,
    groupSeparator: ",",
    decimalSeparator: ".",
    fractionGroupSize: 0,
    fractionGroupSeparator: " ",
    // non-breaking space
    suffix: ""
  }, b = "0123456789abcdefghijklmnopqrstuvwxyz", S = !0;
  function I(k, M) {
    var T, D, B, q, X, O, Y, G, H = this;
    if (!(H instanceof I)) return new I(k, M);
    if (M == null) {
      if (k && k._isBigNumber === !0) {
        H.s = k.s, !k.c || k.e > v ? H.c = H.e = null : k.e < m ? H.c = [H.e = 0] : (H.e = k.e, H.c = k.c.slice());
        return;
      }
      if ((O = typeof k == "number") && k * 0 == 0) {
        if (H.s = 1 / k < 0 ? (k = -k, -1) : 1, k === ~~k) {
          for (q = 0, X = k; X >= 10; X /= 10, q++) ;
          q > v ? H.c = H.e = null : (H.e = q, H.c = [k]);
          return;
        }
        G = String(k);
      } else {
        if (!Iy.test(G = String(k))) return i(H, G, O);
        H.s = G.charCodeAt(0) == 45 ? (G = G.slice(1), -1) : 1;
      }
      (q = G.indexOf(".")) > -1 && (G = G.replace(".", "")), (X = G.search(/e/i)) > 0 ? (q < 0 && (q = X), q += +G.slice(X + 1), G = G.substring(0, X)) : q < 0 && (q = G.length);
    } else {
      if (Ze(M, 2, b.length, "Base"), M == 10 && S)
        return H = new I(k), U(H, u + H.e + 1, h);
      if (G = String(k), O = typeof k == "number") {
        if (k * 0 != 0) return i(H, G, O, M);
        if (H.s = 1 / k < 0 ? (G = G.slice(1), -1) : 1, I.DEBUG && G.replace(/^0\.0*|\./, "").length > 15)
          throw Error(hl + k);
      } else
        H.s = G.charCodeAt(0) === 45 ? (G = G.slice(1), -1) : 1;
      for (T = b.slice(0, M), q = X = 0, Y = G.length; X < Y; X++)
        if (T.indexOf(D = G.charAt(X)) < 0) {
          if (D == ".") {
            if (X > q) {
              q = Y;
              continue;
            }
          } else if (!B && (G == G.toUpperCase() && (G = G.toLowerCase()) || G == G.toLowerCase() && (G = G.toUpperCase()))) {
            B = !0, X = -1, q = 0;
            continue;
          }
          return i(H, String(k), O, M);
        }
      O = !1, G = t(G, M, 10, H.s), (q = G.indexOf(".")) > -1 ? G = G.replace(".", "") : q = G.length;
    }
    for (X = 0; G.charCodeAt(X) === 48; X++) ;
    for (Y = G.length; G.charCodeAt(--Y) === 48; ) ;
    if (G = G.slice(X, ++Y)) {
      if (Y -= X, O && I.DEBUG && Y > 15 && (k > ro || k !== Ot(k)))
        throw Error(hl + H.s * k);
      if ((q = q - X - 1) > v)
        H.c = H.e = null;
      else if (q < m)
        H.c = [H.e = 0];
      else {
        if (H.e = q, H.c = [], X = (q + 1) % Ce, q < 0 && (X += Ce), X < Y) {
          for (X && H.c.push(+G.slice(0, X)), Y -= Ce; X < Y; )
            H.c.push(+G.slice(X, X += Ce));
          X = Ce - (G = G.slice(X)).length;
        } else
          X -= Y;
        for (; X--; G += "0") ;
        H.c.push(+G);
      }
    } else
      H.c = [H.e = 0];
  }
  I.clone = Eh, I.ROUND_UP = 0, I.ROUND_DOWN = 1, I.ROUND_CEIL = 2, I.ROUND_FLOOR = 3, I.ROUND_HALF_UP = 4, I.ROUND_HALF_DOWN = 5, I.ROUND_HALF_EVEN = 6, I.ROUND_HALF_CEIL = 7, I.ROUND_HALF_FLOOR = 8, I.EUCLID = 9, I.config = I.set = function(k) {
    var M, T;
    if (k != null)
      if (typeof k == "object") {
        if (k.hasOwnProperty(M = "DECIMAL_PLACES") && (T = k[M], Ze(T, 0, rt, M), u = T), k.hasOwnProperty(M = "ROUNDING_MODE") && (T = k[M], Ze(T, 0, 8, M), h = T), k.hasOwnProperty(M = "EXPONENTIAL_AT") && (T = k[M], T && T.pop ? (Ze(T[0], -rt, 0, M), Ze(T[1], 0, rt, M), f = T[0], g = T[1]) : (Ze(T, -rt, rt, M), f = -(g = T < 0 ? -T : T))), k.hasOwnProperty(M = "RANGE"))
          if (T = k[M], T && T.pop)
            Ze(T[0], -rt, -1, M), Ze(T[1], 1, rt, M), m = T[0], v = T[1];
          else if (Ze(T, -rt, rt, M), T)
            m = -(v = T < 0 ? -T : T);
          else
            throw Error(_t + M + " cannot be zero: " + T);
        if (k.hasOwnProperty(M = "CRYPTO"))
          if (T = k[M], T === !!T)
            if (T)
              if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes))
                p = T;
              else
                throw p = !T, Error(_t + "crypto unavailable");
            else
              p = T;
          else
            throw Error(_t + M + " not true or false: " + T);
        if (k.hasOwnProperty(M = "MODULO_MODE") && (T = k[M], Ze(T, 0, 9, M), _ = T), k.hasOwnProperty(M = "POW_PRECISION") && (T = k[M], Ze(T, 0, rt, M), w = T), k.hasOwnProperty(M = "FORMAT"))
          if (T = k[M], typeof T == "object") C = T;
          else throw Error(_t + M + " not an object: " + T);
        if (k.hasOwnProperty(M = "ALPHABET"))
          if (T = k[M], typeof T == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(T))
            S = T.slice(0, 10) == "0123456789", b = T;
          else
            throw Error(_t + M + " invalid: " + T);
      } else
        throw Error(_t + "Object expected: " + k);
    return {
      DECIMAL_PLACES: u,
      ROUNDING_MODE: h,
      EXPONENTIAL_AT: [f, g],
      RANGE: [m, v],
      CRYPTO: p,
      MODULO_MODE: _,
      POW_PRECISION: w,
      FORMAT: C,
      ALPHABET: b
    };
  }, I.isBigNumber = function(k) {
    if (!k || k._isBigNumber !== !0) return !1;
    if (!I.DEBUG) return !0;
    var M, T, D = k.c, B = k.e, q = k.s;
    e: if ({}.toString.call(D) == "[object Array]") {
      if ((q === 1 || q === -1) && B >= -rt && B <= rt && B === Ot(B)) {
        if (D[0] === 0) {
          if (B === 0 && D.length === 1) return !0;
          break e;
        }
        if (M = (B + 1) % Ce, M < 1 && (M += Ce), String(D[0]).length == M) {
          for (M = 0; M < D.length; M++)
            if (T = D[M], T < 0 || T >= qt || T !== Ot(T)) break e;
          if (T !== 0) return !0;
        }
      }
    } else if (D === null && B === null && (q === null || q === 1 || q === -1))
      return !0;
    throw Error(_t + "Invalid BigNumber: " + k);
  }, I.maximum = I.max = function() {
    return A(arguments, -1);
  }, I.minimum = I.min = function() {
    return A(arguments, 1);
  }, I.random = function() {
    var k = 9007199254740992, M = Math.random() * k & 2097151 ? function() {
      return Ot(Math.random() * k);
    } : function() {
      return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
    };
    return function(T) {
      var D, B, q, X, O, Y = 0, G = [], H = new I(a);
      if (T == null ? T = u : Ze(T, 0, rt), X = no(T / Ce), p)
        if (crypto.getRandomValues) {
          for (D = crypto.getRandomValues(new Uint32Array(X *= 2)); Y < X; )
            O = D[Y] * 131072 + (D[Y + 1] >>> 11), O >= 9e15 ? (B = crypto.getRandomValues(new Uint32Array(2)), D[Y] = B[0], D[Y + 1] = B[1]) : (G.push(O % 1e14), Y += 2);
          Y = X / 2;
        } else if (crypto.randomBytes) {
          for (D = crypto.randomBytes(X *= 7); Y < X; )
            O = (D[Y] & 31) * 281474976710656 + D[Y + 1] * 1099511627776 + D[Y + 2] * 4294967296 + D[Y + 3] * 16777216 + (D[Y + 4] << 16) + (D[Y + 5] << 8) + D[Y + 6], O >= 9e15 ? crypto.randomBytes(7).copy(D, Y) : (G.push(O % 1e14), Y += 7);
          Y = X / 7;
        } else
          throw p = !1, Error(_t + "crypto unavailable");
      if (!p)
        for (; Y < X; )
          O = M(), O < 9e15 && (G[Y++] = O % 1e14);
      for (X = G[--Y], T %= Ce, X && T && (O = io[Ce - T], G[Y] = Ot(X / O) * O); G[Y] === 0; G.pop(), Y--) ;
      if (Y < 0)
        G = [q = 0];
      else {
        for (q = -1; G[0] === 0; G.splice(0, 1), q -= Ce) ;
        for (Y = 1, O = G[0]; O >= 10; O /= 10, Y++) ;
        Y < Ce && (q -= Ce - Y);
      }
      return H.e = q, H.c = G, H;
    };
  }(), I.sum = function() {
    for (var k = 1, M = arguments, T = new I(M[0]); k < M.length; ) T = T.plus(M[k++]);
    return T;
  }, t = /* @__PURE__ */ function() {
    var k = "0123456789";
    function M(T, D, B, q) {
      for (var X, O = [0], Y, G = 0, H = T.length; G < H; ) {
        for (Y = O.length; Y--; O[Y] *= D) ;
        for (O[0] += q.indexOf(T.charAt(G++)), X = 0; X < O.length; X++)
          O[X] > B - 1 && (O[X + 1] == null && (O[X + 1] = 0), O[X + 1] += O[X] / B | 0, O[X] %= B);
      }
      return O.reverse();
    }
    return function(T, D, B, q, X) {
      var O, Y, G, H, Q, W, j, J, re = T.indexOf("."), ee = u, te = h;
      for (re >= 0 && (H = w, w = 0, T = T.replace(".", ""), J = new I(D), W = J.pow(T.length - re), w = H, J.c = M(
        sn(Tt(W.c), W.e, "0"),
        10,
        B,
        k
      ), J.e = J.c.length), j = M(T, D, B, X ? (O = b, k) : (O = k, b)), G = H = j.length; j[--H] == 0; j.pop()) ;
      if (!j[0]) return O.charAt(0);
      if (re < 0 ? --G : (W.c = j, W.e = G, W.s = q, W = e(W, J, ee, te, B), j = W.c, Q = W.r, G = W.e), Y = G + ee + 1, re = j[Y], H = B / 2, Q = Q || Y < 0 || j[Y + 1] != null, Q = te < 4 ? (re != null || Q) && (te == 0 || te == (W.s < 0 ? 3 : 2)) : re > H || re == H && (te == 4 || Q || te == 6 && j[Y - 1] & 1 || te == (W.s < 0 ? 8 : 7)), Y < 1 || !j[0])
        T = Q ? sn(O.charAt(1), -ee, O.charAt(0)) : O.charAt(0);
      else {
        if (j.length = Y, Q)
          for (--B; ++j[--Y] > B; )
            j[Y] = 0, Y || (++G, j = [1].concat(j));
        for (H = j.length; !j[--H]; ) ;
        for (re = 0, T = ""; re <= H; T += O.charAt(j[re++])) ;
        T = sn(T, G, O.charAt(0));
      }
      return T;
    };
  }(), e = /* @__PURE__ */ function() {
    function k(D, B, q) {
      var X, O, Y, G, H = 0, Q = D.length, W = B % vn, j = B / vn | 0;
      for (D = D.slice(); Q--; )
        Y = D[Q] % vn, G = D[Q] / vn | 0, X = j * Y + G * W, O = W * Y + X % vn * vn + H, H = (O / q | 0) + (X / vn | 0) + j * G, D[Q] = O % q;
      return H && (D = [H].concat(D)), D;
    }
    function M(D, B, q, X) {
      var O, Y;
      if (q != X)
        Y = q > X ? 1 : -1;
      else
        for (O = Y = 0; O < q; O++)
          if (D[O] != B[O]) {
            Y = D[O] > B[O] ? 1 : -1;
            break;
          }
      return Y;
    }
    function T(D, B, q, X) {
      for (var O = 0; q--; )
        D[q] -= O, O = D[q] < B[q] ? 1 : 0, D[q] = O * X + D[q] - B[q];
      for (; !D[0] && D.length > 1; D.splice(0, 1)) ;
    }
    return function(D, B, q, X, O) {
      var Y, G, H, Q, W, j, J, re, ee, te, se, fe, Z, Fe, _e, ae, z, Me = D.s == B.s ? 1 : -1, Ne = D.c, ke = B.c;
      if (!Ne || !Ne[0] || !ke || !ke[0])
        return new I(
          // Return NaN if either NaN, or both Infinity or 0.
          !D.s || !B.s || (Ne ? ke && Ne[0] == ke[0] : !ke) ? NaN : (
            // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
            Ne && Ne[0] == 0 || !ke ? Me * 0 : Me / 0
          )
        );
      for (re = new I(Me), ee = re.c = [], G = D.e - B.e, Me = q + G + 1, O || (O = qt, G = At(D.e / Ce) - At(B.e / Ce), Me = Me / Ce | 0), H = 0; ke[H] == (Ne[H] || 0); H++) ;
      if (ke[H] > (Ne[H] || 0) && G--, Me < 0)
        ee.push(1), Q = !0;
      else {
        for (Fe = Ne.length, ae = ke.length, H = 0, Me += 2, W = Ot(O / (ke[0] + 1)), W > 1 && (ke = k(ke, W, O), Ne = k(Ne, W, O), ae = ke.length, Fe = Ne.length), Z = ae, te = Ne.slice(0, ae), se = te.length; se < ae; te[se++] = 0) ;
        z = ke.slice(), z = [0].concat(z), _e = ke[0], ke[1] >= O / 2 && _e++;
        do {
          if (W = 0, Y = M(ke, te, ae, se), Y < 0) {
            if (fe = te[0], ae != se && (fe = fe * O + (te[1] || 0)), W = Ot(fe / _e), W > 1)
              for (W >= O && (W = O - 1), j = k(ke, W, O), J = j.length, se = te.length; M(j, te, J, se) == 1; )
                W--, T(j, ae < J ? z : ke, J, O), J = j.length, Y = 1;
            else
              W == 0 && (Y = W = 1), j = ke.slice(), J = j.length;
            if (J < se && (j = [0].concat(j)), T(te, j, se, O), se = te.length, Y == -1)
              for (; M(ke, te, ae, se) < 1; )
                W++, T(te, ae < se ? z : ke, se, O), se = te.length;
          } else Y === 0 && (W++, te = [0]);
          ee[H++] = W, te[0] ? te[se++] = Ne[Z] || 0 : (te = [Ne[Z]], se = 1);
        } while ((Z++ < Fe || te[0] != null) && Me--);
        Q = te[0] != null, ee[0] || ee.splice(0, 1);
      }
      if (O == qt) {
        for (H = 1, Me = ee[0]; Me >= 10; Me /= 10, H++) ;
        U(re, q + (re.e = H + G * Ce - 1) + 1, X, Q);
      } else
        re.e = G, re.r = +Q;
      return re;
    };
  }();
  function N(k, M, T, D) {
    var B, q, X, O, Y;
    if (T == null ? T = h : Ze(T, 0, 8), !k.c) return k.toString();
    if (B = k.c[0], X = k.e, M == null)
      Y = Tt(k.c), Y = D == 1 || D == 2 && (X <= f || X >= g) ? Pi(Y, X) : sn(Y, X, "0");
    else if (k = U(new I(k), M, T), q = k.e, Y = Tt(k.c), O = Y.length, D == 1 || D == 2 && (M <= q || q <= f)) {
      for (; O < M; Y += "0", O++) ;
      Y = Pi(Y, q);
    } else if (M -= X + (D === 2 && q > X), Y = sn(Y, q, "0"), q + 1 > O) {
      if (--M > 0) for (Y += "."; M--; Y += "0") ;
    } else if (M += q - O, M > 0)
      for (q + 1 == O && (Y += "."); M--; Y += "0") ;
    return k.s < 0 && B ? "-" + Y : Y;
  }
  function A(k, M) {
    for (var T, D, B = 1, q = new I(k[0]); B < k.length; B++)
      D = new I(k[B]), (!D.s || (T = Mn(q, D)) === M || T === 0 && q.s === M) && (q = D);
    return q;
  }
  function R(k, M, T) {
    for (var D = 1, B = M.length; !M[--B]; M.pop()) ;
    for (B = M[0]; B >= 10; B /= 10, D++) ;
    return (T = D + T * Ce - 1) > v ? k.c = k.e = null : T < m ? k.c = [k.e = 0] : (k.e = T, k.c = M), k;
  }
  i = /* @__PURE__ */ function() {
    var k = /^(-?)0([xbo])(?=\w[\w.]*$)/i, M = /^([^.]+)\.$/, T = /^\.([^.]+)$/, D = /^-?(Infinity|NaN)$/, B = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
    return function(q, X, O, Y) {
      var G, H = O ? X : X.replace(B, "");
      if (D.test(H))
        q.s = isNaN(H) ? null : H < 0 ? -1 : 1;
      else {
        if (!O && (H = H.replace(k, function(Q, W, j) {
          return G = (j = j.toLowerCase()) == "x" ? 16 : j == "b" ? 2 : 8, !Y || Y == G ? W : Q;
        }), Y && (G = Y, H = H.replace(M, "$1").replace(T, "0.$1")), X != H))
          return new I(H, G);
        if (I.DEBUG)
          throw Error(_t + "Not a" + (Y ? " base " + Y : "") + " number: " + X);
        q.s = null;
      }
      q.c = q.e = null;
    };
  }();
  function U(k, M, T, D) {
    var B, q, X, O, Y, G, H, Q = k.c, W = io;
    if (Q) {
      e: {
        for (B = 1, O = Q[0]; O >= 10; O /= 10, B++) ;
        if (q = M - B, q < 0)
          q += Ce, X = M, Y = Q[G = 0], H = Ot(Y / W[B - X - 1] % 10);
        else if (G = no((q + 1) / Ce), G >= Q.length)
          if (D) {
            for (; Q.length <= G; Q.push(0)) ;
            Y = H = 0, B = 1, q %= Ce, X = q - Ce + 1;
          } else
            break e;
        else {
          for (Y = O = Q[G], B = 1; O >= 10; O /= 10, B++) ;
          q %= Ce, X = q - Ce + B, H = X < 0 ? 0 : Ot(Y / W[B - X - 1] % 10);
        }
        if (D = D || M < 0 || // Are there any non-zero digits after the rounding digit?
        // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
        // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
        Q[G + 1] != null || (X < 0 ? Y : Y % W[B - X - 1]), D = T < 4 ? (H || D) && (T == 0 || T == (k.s < 0 ? 3 : 2)) : H > 5 || H == 5 && (T == 4 || D || T == 6 && // Check whether the digit to the left of the rounding digit is odd.
        (q > 0 ? X > 0 ? Y / W[B - X] : 0 : Q[G - 1]) % 10 & 1 || T == (k.s < 0 ? 8 : 7)), M < 1 || !Q[0])
          return Q.length = 0, D ? (M -= k.e + 1, Q[0] = W[(Ce - M % Ce) % Ce], k.e = -M || 0) : Q[0] = k.e = 0, k;
        if (q == 0 ? (Q.length = G, O = 1, G--) : (Q.length = G + 1, O = W[Ce - q], Q[G] = X > 0 ? Ot(Y / W[B - X] % W[X]) * O : 0), D)
          for (; ; )
            if (G == 0) {
              for (q = 1, X = Q[0]; X >= 10; X /= 10, q++) ;
              for (X = Q[0] += O, O = 1; X >= 10; X /= 10, O++) ;
              q != O && (k.e++, Q[0] == qt && (Q[0] = 1));
              break;
            } else {
              if (Q[G] += O, Q[G] != qt) break;
              Q[G--] = 0, O = 1;
            }
        for (q = Q.length; Q[--q] === 0; Q.pop()) ;
      }
      k.e > v ? k.c = k.e = null : k.e < m && (k.c = [k.e = 0]);
    }
    return k;
  }
  function V(k) {
    var M, T = k.e;
    return T === null ? k.toString() : (M = Tt(k.c), M = T <= f || T >= g ? Pi(M, T) : sn(M, T, "0"), k.s < 0 ? "-" + M : M);
  }
  return o.absoluteValue = o.abs = function() {
    var k = new I(this);
    return k.s < 0 && (k.s = 1), k;
  }, o.comparedTo = function(k, M) {
    return Mn(this, new I(k, M));
  }, o.decimalPlaces = o.dp = function(k, M) {
    var T, D, B, q = this;
    if (k != null)
      return Ze(k, 0, rt), M == null ? M = h : Ze(M, 0, 8), U(new I(q), k + q.e + 1, M);
    if (!(T = q.c)) return null;
    if (D = ((B = T.length - 1) - At(this.e / Ce)) * Ce, B = T[B]) for (; B % 10 == 0; B /= 10, D--) ;
    return D < 0 && (D = 0), D;
  }, o.dividedBy = o.div = function(k, M) {
    return e(this, new I(k, M), u, h);
  }, o.dividedToIntegerBy = o.idiv = function(k, M) {
    return e(this, new I(k, M), 0, 1);
  }, o.exponentiatedBy = o.pow = function(k, M) {
    var T, D, B, q, X, O, Y, G, H, Q = this;
    if (k = new I(k), k.c && !k.isInteger())
      throw Error(_t + "Exponent not an integer: " + V(k));
    if (M != null && (M = new I(M)), O = k.e > 14, !Q.c || !Q.c[0] || Q.c[0] == 1 && !Q.e && Q.c.length == 1 || !k.c || !k.c[0])
      return H = new I(Math.pow(+V(Q), O ? k.s * (2 - bi(k)) : +V(k))), M ? H.mod(M) : H;
    if (Y = k.s < 0, M) {
      if (M.c ? !M.c[0] : !M.s) return new I(NaN);
      D = !Y && Q.isInteger() && M.isInteger(), D && (Q = Q.mod(M));
    } else {
      if (k.e > 9 && (Q.e > 0 || Q.e < -1 || (Q.e == 0 ? Q.c[0] > 1 || O && Q.c[1] >= 24e7 : Q.c[0] < 8e13 || O && Q.c[0] <= 9999975e7)))
        return q = Q.s < 0 && bi(k) ? -0 : 0, Q.e > -1 && (q = 1 / q), new I(Y ? 1 / q : q);
      w && (q = no(w / Ce + 2));
    }
    for (O ? (T = new I(0.5), Y && (k.s = 1), G = bi(k)) : (B = Math.abs(+V(k)), G = B % 2), H = new I(a); ; ) {
      if (G) {
        if (H = H.times(Q), !H.c) break;
        q ? H.c.length > q && (H.c.length = q) : D && (H = H.mod(M));
      }
      if (B) {
        if (B = Ot(B / 2), B === 0) break;
        G = B % 2;
      } else if (k = k.times(T), U(k, k.e + 1, 1), k.e > 14)
        G = bi(k);
      else {
        if (B = +V(k), B === 0) break;
        G = B % 2;
      }
      Q = Q.times(Q), q ? Q.c && Q.c.length > q && (Q.c.length = q) : D && (Q = Q.mod(M));
    }
    return D ? H : (Y && (H = a.div(H)), M ? H.mod(M) : q ? U(H, w, h, X) : H);
  }, o.integerValue = function(k) {
    var M = new I(this);
    return k == null ? k = h : Ze(k, 0, 8), U(M, M.e + 1, k);
  }, o.isEqualTo = o.eq = function(k, M) {
    return Mn(this, new I(k, M)) === 0;
  }, o.isFinite = function() {
    return !!this.c;
  }, o.isGreaterThan = o.gt = function(k, M) {
    return Mn(this, new I(k, M)) > 0;
  }, o.isGreaterThanOrEqualTo = o.gte = function(k, M) {
    return (M = Mn(this, new I(k, M))) === 1 || M === 0;
  }, o.isInteger = function() {
    return !!this.c && At(this.e / Ce) > this.c.length - 2;
  }, o.isLessThan = o.lt = function(k, M) {
    return Mn(this, new I(k, M)) < 0;
  }, o.isLessThanOrEqualTo = o.lte = function(k, M) {
    return (M = Mn(this, new I(k, M))) === -1 || M === 0;
  }, o.isNaN = function() {
    return !this.s;
  }, o.isNegative = function() {
    return this.s < 0;
  }, o.isPositive = function() {
    return this.s > 0;
  }, o.isZero = function() {
    return !!this.c && this.c[0] == 0;
  }, o.minus = function(k, M) {
    var T, D, B, q, X = this, O = X.s;
    if (k = new I(k, M), M = k.s, !O || !M) return new I(NaN);
    if (O != M)
      return k.s = -M, X.plus(k);
    var Y = X.e / Ce, G = k.e / Ce, H = X.c, Q = k.c;
    if (!Y || !G) {
      if (!H || !Q) return H ? (k.s = -M, k) : new I(Q ? X : NaN);
      if (!H[0] || !Q[0])
        return Q[0] ? (k.s = -M, k) : new I(H[0] ? X : (
          // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
          h == 3 ? -0 : 0
        ));
    }
    if (Y = At(Y), G = At(G), H = H.slice(), O = Y - G) {
      for ((q = O < 0) ? (O = -O, B = H) : (G = Y, B = Q), B.reverse(), M = O; M--; B.push(0)) ;
      B.reverse();
    } else
      for (D = (q = (O = H.length) < (M = Q.length)) ? O : M, O = M = 0; M < D; M++)
        if (H[M] != Q[M]) {
          q = H[M] < Q[M];
          break;
        }
    if (q && (B = H, H = Q, Q = B, k.s = -k.s), M = (D = Q.length) - (T = H.length), M > 0) for (; M--; H[T++] = 0) ;
    for (M = qt - 1; D > O; ) {
      if (H[--D] < Q[D]) {
        for (T = D; T && !H[--T]; H[T] = M) ;
        --H[T], H[D] += qt;
      }
      H[D] -= Q[D];
    }
    for (; H[0] == 0; H.splice(0, 1), --G) ;
    return H[0] ? R(k, H, G) : (k.s = h == 3 ? -1 : 1, k.c = [k.e = 0], k);
  }, o.modulo = o.mod = function(k, M) {
    var T, D, B = this;
    return k = new I(k, M), !B.c || !k.s || k.c && !k.c[0] ? new I(NaN) : !k.c || B.c && !B.c[0] ? new I(B) : (_ == 9 ? (D = k.s, k.s = 1, T = e(B, k, 0, 3), k.s = D, T.s *= D) : T = e(B, k, 0, _), k = B.minus(T.times(k)), !k.c[0] && _ == 1 && (k.s = B.s), k);
  }, o.multipliedBy = o.times = function(k, M) {
    var T, D, B, q, X, O, Y, G, H, Q, W, j, J, re, ee, te = this, se = te.c, fe = (k = new I(k, M)).c;
    if (!se || !fe || !se[0] || !fe[0])
      return !te.s || !k.s || se && !se[0] && !fe || fe && !fe[0] && !se ? k.c = k.e = k.s = null : (k.s *= te.s, !se || !fe ? k.c = k.e = null : (k.c = [0], k.e = 0)), k;
    for (D = At(te.e / Ce) + At(k.e / Ce), k.s *= te.s, Y = se.length, Q = fe.length, Y < Q && (J = se, se = fe, fe = J, B = Y, Y = Q, Q = B), B = Y + Q, J = []; B--; J.push(0)) ;
    for (re = qt, ee = vn, B = Q; --B >= 0; ) {
      for (T = 0, W = fe[B] % ee, j = fe[B] / ee | 0, X = Y, q = B + X; q > B; )
        G = se[--X] % ee, H = se[X] / ee | 0, O = j * G + H * W, G = W * G + O % ee * ee + J[q] + T, T = (G / re | 0) + (O / ee | 0) + j * H, J[q--] = G % re;
      J[q] = T;
    }
    return T ? ++D : J.splice(0, 1), R(k, J, D);
  }, o.negated = function() {
    var k = new I(this);
    return k.s = -k.s || null, k;
  }, o.plus = function(k, M) {
    var T, D = this, B = D.s;
    if (k = new I(k, M), M = k.s, !B || !M) return new I(NaN);
    if (B != M)
      return k.s = -M, D.minus(k);
    var q = D.e / Ce, X = k.e / Ce, O = D.c, Y = k.c;
    if (!q || !X) {
      if (!O || !Y) return new I(B / 0);
      if (!O[0] || !Y[0]) return Y[0] ? k : new I(O[0] ? D : B * 0);
    }
    if (q = At(q), X = At(X), O = O.slice(), B = q - X) {
      for (B > 0 ? (X = q, T = Y) : (B = -B, T = O), T.reverse(); B--; T.push(0)) ;
      T.reverse();
    }
    for (B = O.length, M = Y.length, B - M < 0 && (T = Y, Y = O, O = T, M = B), B = 0; M; )
      B = (O[--M] = O[M] + Y[M] + B) / qt | 0, O[M] = qt === O[M] ? 0 : O[M] % qt;
    return B && (O = [B].concat(O), ++X), R(k, O, X);
  }, o.precision = o.sd = function(k, M) {
    var T, D, B, q = this;
    if (k != null && k !== !!k)
      return Ze(k, 1, rt), M == null ? M = h : Ze(M, 0, 8), U(new I(q), k, M);
    if (!(T = q.c)) return null;
    if (B = T.length - 1, D = B * Ce + 1, B = T[B]) {
      for (; B % 10 == 0; B /= 10, D--) ;
      for (B = T[0]; B >= 10; B /= 10, D++) ;
    }
    return k && q.e + 1 > D && (D = q.e + 1), D;
  }, o.shiftedBy = function(k) {
    return Ze(k, -ro, ro), this.times("1e" + k);
  }, o.squareRoot = o.sqrt = function() {
    var k, M, T, D, B, q = this, X = q.c, O = q.s, Y = q.e, G = u + 4, H = new I("0.5");
    if (O !== 1 || !X || !X[0])
      return new I(!O || O < 0 && (!X || X[0]) ? NaN : X ? q : 1 / 0);
    if (O = Math.sqrt(+V(q)), O == 0 || O == 1 / 0 ? (M = Tt(X), (M.length + Y) % 2 == 0 && (M += "0"), O = Math.sqrt(+M), Y = At((Y + 1) / 2) - (Y < 0 || Y % 2), O == 1 / 0 ? M = "5e" + Y : (M = O.toExponential(), M = M.slice(0, M.indexOf("e") + 1) + Y), T = new I(M)) : T = new I(O + ""), T.c[0]) {
      for (Y = T.e, O = Y + G, O < 3 && (O = 0); ; )
        if (B = T, T = H.times(B.plus(e(q, B, G, 1))), Tt(B.c).slice(0, O) === (M = Tt(T.c)).slice(0, O))
          if (T.e < Y && --O, M = M.slice(O - 3, O + 1), M == "9999" || !D && M == "4999") {
            if (!D && (U(B, B.e + u + 2, 0), B.times(B).eq(q))) {
              T = B;
              break;
            }
            G += 4, O += 4, D = 1;
          } else {
            (!+M || !+M.slice(1) && M.charAt(0) == "5") && (U(T, T.e + u + 2, 1), k = !T.times(T).eq(q));
            break;
          }
    }
    return U(T, T.e + u + 1, h, k);
  }, o.toExponential = function(k, M) {
    return k != null && (Ze(k, 0, rt), k++), N(this, k, M, 1);
  }, o.toFixed = function(k, M) {
    return k != null && (Ze(k, 0, rt), k = k + this.e + 1), N(this, k, M);
  }, o.toFormat = function(k, M, T) {
    var D, B = this;
    if (T == null)
      k != null && M && typeof M == "object" ? (T = M, M = null) : k && typeof k == "object" ? (T = k, k = M = null) : T = C;
    else if (typeof T != "object")
      throw Error(_t + "Argument not an object: " + T);
    if (D = B.toFixed(k, M), B.c) {
      var q, X = D.split("."), O = +T.groupSize, Y = +T.secondaryGroupSize, G = T.groupSeparator || "", H = X[0], Q = X[1], W = B.s < 0, j = W ? H.slice(1) : H, J = j.length;
      if (Y && (q = O, O = Y, Y = q, J -= q), O > 0 && J > 0) {
        for (q = J % O || O, H = j.substr(0, q); q < J; q += O) H += G + j.substr(q, O);
        Y > 0 && (H += G + j.slice(q)), W && (H = "-" + H);
      }
      D = Q ? H + (T.decimalSeparator || "") + ((Y = +T.fractionGroupSize) ? Q.replace(
        new RegExp("\\d{" + Y + "}\\B", "g"),
        "$&" + (T.fractionGroupSeparator || "")
      ) : Q) : H;
    }
    return (T.prefix || "") + D + (T.suffix || "");
  }, o.toFraction = function(k) {
    var M, T, D, B, q, X, O, Y, G, H, Q, W, j = this, J = j.c;
    if (k != null && (O = new I(k), !O.isInteger() && (O.c || O.s !== 1) || O.lt(a)))
      throw Error(_t + "Argument " + (O.isInteger() ? "out of range: " : "not an integer: ") + V(O));
    if (!J) return new I(j);
    for (M = new I(a), G = T = new I(a), D = Y = new I(a), W = Tt(J), q = M.e = W.length - j.e - 1, M.c[0] = io[(X = q % Ce) < 0 ? Ce + X : X], k = !k || O.comparedTo(M) > 0 ? q > 0 ? M : G : O, X = v, v = 1 / 0, O = new I(W), Y.c[0] = 0; H = e(O, M, 0, 1), B = T.plus(H.times(D)), B.comparedTo(k) != 1; )
      T = D, D = B, G = Y.plus(H.times(B = G)), Y = B, M = O.minus(H.times(B = M)), O = B;
    return B = e(k.minus(T), D, 0, 1), Y = Y.plus(B.times(G)), T = T.plus(B.times(D)), Y.s = G.s = j.s, q = q * 2, Q = e(G, D, q, h).minus(j).abs().comparedTo(
      e(Y, T, q, h).minus(j).abs()
    ) < 1 ? [G, D] : [Y, T], v = X, Q;
  }, o.toNumber = function() {
    return +V(this);
  }, o.toPrecision = function(k, M) {
    return k != null && Ze(k, 1, rt), N(this, k, M, 2);
  }, o.toString = function(k) {
    var M, T = this, D = T.s, B = T.e;
    return B === null ? D ? (M = "Infinity", D < 0 && (M = "-" + M)) : M = "NaN" : (k == null ? M = B <= f || B >= g ? Pi(Tt(T.c), B) : sn(Tt(T.c), B, "0") : k === 10 && S ? (T = U(new I(T), u + B + 1, h), M = sn(Tt(T.c), T.e, "0")) : (Ze(k, 2, b.length, "Base"), M = t(sn(Tt(T.c), B, "0"), 10, k, D, !0)), D < 0 && T.c[0] && (M = "-" + M)), M;
  }, o.valueOf = o.toJSON = function() {
    return V(this);
  }, o._isBigNumber = !0, o[Symbol.toStringTag] = "BigNumber", o[Symbol.for("nodejs.util.inspect.custom")] = o.valueOf, n != null && I.set(n), I;
}
function At(n) {
  var e = n | 0;
  return n > 0 || n === e ? e : e - 1;
}
function Tt(n) {
  for (var e, t, i = 1, o = n.length, a = n[0] + ""; i < o; ) {
    for (e = n[i++] + "", t = Ce - e.length; t--; e = "0" + e) ;
    a += e;
  }
  for (o = a.length; a.charCodeAt(--o) === 48; ) ;
  return a.slice(0, o + 1 || 1);
}
function Mn(n, e) {
  var t, i, o = n.c, a = e.c, u = n.s, h = e.s, f = n.e, g = e.e;
  if (!u || !h) return null;
  if (t = o && !o[0], i = a && !a[0], t || i) return t ? i ? 0 : -h : u;
  if (u != h) return u;
  if (t = u < 0, i = f == g, !o || !a) return i ? 0 : !o ^ t ? 1 : -1;
  if (!i) return f > g ^ t ? 1 : -1;
  for (h = (f = o.length) < (g = a.length) ? f : g, u = 0; u < h; u++) if (o[u] != a[u]) return o[u] > a[u] ^ t ? 1 : -1;
  return f == g ? 0 : f > g ^ t ? 1 : -1;
}
function Ze(n, e, t, i) {
  if (n < e || n > t || n !== Ot(n))
    throw Error(_t + (i || "Argument") + (typeof n == "number" ? n < e || n > t ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(n));
}
function bi(n) {
  var e = n.c.length - 1;
  return At(n.e / Ce) == e && n.c[e] % 2 != 0;
}
function Pi(n, e) {
  return (n.length > 1 ? n.charAt(0) + "." + n.slice(1) : n) + (e < 0 ? "e" : "e+") + e;
}
function sn(n, e, t) {
  var i, o;
  if (e < 0) {
    for (o = t + "."; ++e; o += t) ;
    n = o + n;
  } else if (i = n.length, ++e > i) {
    for (o = t, e -= i; --e; o += t) ;
    n += o;
  } else e < i && (n = n.slice(0, e) + "." + n.slice(e));
  return n;
}
var Zt = Eh(), Sy = class {
  constructor(n) {
    le(this, "key");
    le(this, "left", null);
    le(this, "right", null);
    this.key = n;
  }
}, wr = class extends Sy {
  constructor(n) {
    super(n);
  }
}, My = class {
  constructor() {
    le(this, "size", 0);
    le(this, "modificationCount", 0);
    le(this, "splayCount", 0);
  }
  splay(n) {
    const e = this.root;
    if (e == null)
      return this.compare(n, n), -1;
    let t = null, i = null, o = null, a = null, u = e;
    const h = this.compare;
    let f;
    for (; ; )
      if (f = h(u.key, n), f > 0) {
        let g = u.left;
        if (g == null || (f = h(g.key, n), f > 0 && (u.left = g.right, g.right = u, u = g, g = u.left, g == null)))
          break;
        t == null ? i = u : t.left = u, t = u, u = g;
      } else if (f < 0) {
        let g = u.right;
        if (g == null || (f = h(g.key, n), f < 0 && (u.right = g.left, g.left = u, u = g, g = u.right, g == null)))
          break;
        o == null ? a = u : o.right = u, o = u, u = g;
      } else
        break;
    return o != null && (o.right = u.left, u.left = a), t != null && (t.left = u.right, u.right = i), this.root !== u && (this.root = u, this.splayCount++), f;
  }
  splayMin(n) {
    let e = n, t = e.left;
    for (; t != null; ) {
      const i = t;
      e.left = i.right, i.right = e, e = i, t = e.left;
    }
    return e;
  }
  splayMax(n) {
    let e = n, t = e.right;
    for (; t != null; ) {
      const i = t;
      e.right = i.left, i.left = e, e = i, t = e.right;
    }
    return e;
  }
  _delete(n) {
    if (this.root == null || this.splay(n) != 0) return null;
    let t = this.root;
    const i = t, o = t.left;
    if (this.size--, o == null)
      this.root = t.right;
    else {
      const a = t.right;
      t = this.splayMax(o), t.right = a, this.root = t;
    }
    return this.modificationCount++, i;
  }
  addNewRoot(n, e) {
    this.size++, this.modificationCount++;
    const t = this.root;
    if (t == null) {
      this.root = n;
      return;
    }
    e < 0 ? (n.left = t, n.right = t.right, t.right = null) : (n.right = t, n.left = t.left, t.left = null), this.root = n;
  }
  _first() {
    const n = this.root;
    return n == null ? null : (this.root = this.splayMin(n), this.root);
  }
  _last() {
    const n = this.root;
    return n == null ? null : (this.root = this.splayMax(n), this.root);
  }
  clear() {
    this.root = null, this.size = 0, this.modificationCount++;
  }
  has(n) {
    return this.validKey(n) && this.splay(n) == 0;
  }
  defaultCompare() {
    return (n, e) => n < e ? -1 : n > e ? 1 : 0;
  }
  wrap() {
    return {
      getRoot: () => this.root,
      setRoot: (n) => {
        this.root = n;
      },
      getSize: () => this.size,
      getModificationCount: () => this.modificationCount,
      getSplayCount: () => this.splayCount,
      setSplayCount: (n) => {
        this.splayCount = n;
      },
      splay: (n) => this.splay(n),
      has: (n) => this.has(n)
    };
  }
}, dc, vc, Wi = class Tr extends My {
  constructor(t, i) {
    super();
    le(this, "root", null);
    le(this, "compare");
    le(this, "validKey");
    le(this, dc, "[object Set]");
    this.compare = t ?? this.defaultCompare(), this.validKey = i ?? ((o) => o != null && o != null);
  }
  delete(t) {
    return this.validKey(t) ? this._delete(t) != null : !1;
  }
  deleteAll(t) {
    for (const i of t)
      this.delete(i);
  }
  forEach(t) {
    const i = this[Symbol.iterator]();
    let o;
    for (; o = i.next(), !o.done; )
      t(o.value, o.value, this);
  }
  add(t) {
    const i = this.splay(t);
    return i != 0 && this.addNewRoot(new wr(t), i), this;
  }
  addAndReturn(t) {
    const i = this.splay(t);
    return i != 0 && this.addNewRoot(new wr(t), i), this.root.key;
  }
  addAll(t) {
    for (const i of t)
      this.add(i);
  }
  isEmpty() {
    return this.root == null;
  }
  isNotEmpty() {
    return this.root != null;
  }
  single() {
    if (this.size == 0) throw "Bad state: No element";
    if (this.size > 1) throw "Bad state: Too many element";
    return this.root.key;
  }
  first() {
    if (this.size == 0) throw "Bad state: No element";
    return this._first().key;
  }
  last() {
    if (this.size == 0) throw "Bad state: No element";
    return this._last().key;
  }
  lastBefore(t) {
    if (t == null) throw "Invalid arguments(s)";
    if (this.root == null) return null;
    if (this.splay(t) < 0) return this.root.key;
    let o = this.root.left;
    if (o == null) return null;
    let a = o.right;
    for (; a != null; )
      o = a, a = o.right;
    return o.key;
  }
  firstAfter(t) {
    if (t == null) throw "Invalid arguments(s)";
    if (this.root == null) return null;
    if (this.splay(t) > 0) return this.root.key;
    let o = this.root.right;
    if (o == null) return null;
    let a = o.left;
    for (; a != null; )
      o = a, a = o.left;
    return o.key;
  }
  retainAll(t) {
    const i = new Tr(this.compare, this.validKey), o = this.modificationCount;
    for (const a of t) {
      if (o != this.modificationCount)
        throw "Concurrent modification during iteration.";
      this.validKey(a) && this.splay(a) == 0 && i.add(this.root.key);
    }
    i.size != this.size && (this.root = i.root, this.size = i.size, this.modificationCount++);
  }
  lookup(t) {
    return !this.validKey(t) || this.splay(t) != 0 ? null : this.root.key;
  }
  intersection(t) {
    const i = new Tr(this.compare, this.validKey);
    for (const o of this)
      t.has(o) && i.add(o);
    return i;
  }
  difference(t) {
    const i = new Tr(this.compare, this.validKey);
    for (const o of this)
      t.has(o) || i.add(o);
    return i;
  }
  union(t) {
    const i = this.clone();
    return i.addAll(t), i;
  }
  clone() {
    const t = new Tr(this.compare, this.validKey);
    return t.size = this.size, t.root = this.copyNode(this.root), t;
  }
  copyNode(t) {
    if (t == null) return null;
    function i(a, u) {
      let h, f;
      do {
        if (h = a.left, f = a.right, h != null) {
          const g = new wr(h.key);
          u.left = g, i(h, g);
        }
        if (f != null) {
          const g = new wr(f.key);
          u.right = g, a = f, u = g;
        }
      } while (f != null);
    }
    const o = new wr(t.key);
    return i(t, o), o;
  }
  toSet() {
    return this.clone();
  }
  entries() {
    return new Py(this.wrap());
  }
  keys() {
    return this[Symbol.iterator]();
  }
  values() {
    return this[Symbol.iterator]();
  }
  [(vc = Symbol.iterator, dc = Symbol.toStringTag, vc)]() {
    return new by(this.wrap());
  }
}, kh = class {
  constructor(n) {
    le(this, "tree");
    le(this, "path", new Array());
    le(this, "modificationCount", null);
    le(this, "splayCount");
    this.tree = n, this.splayCount = n.getSplayCount();
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    return this.moveNext() ? { done: !1, value: this.current() } : { done: !0, value: null };
  }
  current() {
    if (!this.path.length) return null;
    const n = this.path[this.path.length - 1];
    return this.getValue(n);
  }
  rebuildPath(n) {
    this.path.splice(0, this.path.length), this.tree.splay(n), this.path.push(this.tree.getRoot()), this.splayCount = this.tree.getSplayCount();
  }
  findLeftMostDescendent(n) {
    for (; n != null; )
      this.path.push(n), n = n.left;
  }
  moveNext() {
    if (this.modificationCount != this.tree.getModificationCount()) {
      if (this.modificationCount == null) {
        this.modificationCount = this.tree.getModificationCount();
        let t = this.tree.getRoot();
        for (; t != null; )
          this.path.push(t), t = t.left;
        return this.path.length > 0;
      }
      throw "Concurrent modification during iteration.";
    }
    if (!this.path.length) return !1;
    this.splayCount != this.tree.getSplayCount() && this.rebuildPath(this.path[this.path.length - 1].key);
    let n = this.path[this.path.length - 1], e = n.right;
    if (e != null) {
      for (; e != null; )
        this.path.push(e), e = e.left;
      return !0;
    }
    for (this.path.pop(); this.path.length && this.path[this.path.length - 1].right === n; )
      n = this.path.pop();
    return this.path.length > 0;
  }
}, by = class extends kh {
  getValue(n) {
    return n.key;
  }
}, Py = class extends kh {
  getValue(n) {
    return [n.key, n.key];
  }
}, Ch = (n) => () => n, wo = (n) => {
  const e = n ? (t, i) => i.minus(t).abs().isLessThanOrEqualTo(n) : Ch(!1);
  return (t, i) => e(t, i) ? 0 : t.comparedTo(i);
};
function Ly(n) {
  const e = n ? (t, i, o, a, u) => t.exponentiatedBy(2).isLessThanOrEqualTo(
    a.minus(i).exponentiatedBy(2).plus(u.minus(o).exponentiatedBy(2)).times(n)
  ) : Ch(!1);
  return (t, i, o) => {
    const a = t.x, u = t.y, h = o.x, f = o.y, g = u.minus(f).times(i.x.minus(h)).minus(a.minus(h).times(i.y.minus(f)));
    return e(g, a, u, h, f) ? 0 : g.comparedTo(0);
  };
}
var Ny = (n) => n, Ty = (n) => {
  if (n) {
    const e = new Wi(wo(n)), t = new Wi(wo(n)), i = (a, u) => u.addAndReturn(a), o = (a) => ({
      x: i(a.x, e),
      y: i(a.y, t)
    });
    return o({ x: new Zt(0), y: new Zt(0) }), o;
  }
  return Ny;
}, xo = (n) => ({
  set: (e) => {
    cn = xo(e);
  },
  reset: () => xo(n),
  compare: wo(n),
  snap: Ty(n),
  orient: Ly(n)
}), cn = xo(), xr = (n, e) => n.ll.x.isLessThanOrEqualTo(e.x) && e.x.isLessThanOrEqualTo(n.ur.x) && n.ll.y.isLessThanOrEqualTo(e.y) && e.y.isLessThanOrEqualTo(n.ur.y), Eo = (n, e) => {
  if (e.ur.x.isLessThan(n.ll.x) || n.ur.x.isLessThan(e.ll.x) || e.ur.y.isLessThan(n.ll.y) || n.ur.y.isLessThan(e.ll.y))
    return null;
  const t = n.ll.x.isLessThan(e.ll.x) ? e.ll.x : n.ll.x, i = n.ur.x.isLessThan(e.ur.x) ? n.ur.x : e.ur.x, o = n.ll.y.isLessThan(e.ll.y) ? e.ll.y : n.ll.y, a = n.ur.y.isLessThan(e.ur.y) ? n.ur.y : e.ur.y;
  return { ll: { x: t, y: o }, ur: { x: i, y: a } };
}, Di = (n, e) => n.x.times(e.y).minus(n.y.times(e.x)), Ih = (n, e) => n.x.times(e.x).plus(n.y.times(e.y)), $i = (n) => Ih(n, n).sqrt(), Oy = (n, e, t) => {
  const i = { x: e.x.minus(n.x), y: e.y.minus(n.y) }, o = { x: t.x.minus(n.x), y: t.y.minus(n.y) };
  return Di(o, i).div($i(o)).div($i(i));
}, Ay = (n, e, t) => {
  const i = { x: e.x.minus(n.x), y: e.y.minus(n.y) }, o = { x: t.x.minus(n.x), y: t.y.minus(n.y) };
  return Ih(o, i).div($i(o)).div($i(i));
}, fl = (n, e, t) => e.y.isZero() ? null : { x: n.x.plus(e.x.div(e.y).times(t.minus(n.y))), y: t }, gl = (n, e, t) => e.x.isZero() ? null : { x: t, y: n.y.plus(e.y.div(e.x).times(t.minus(n.x))) }, Ry = (n, e, t, i) => {
  if (e.x.isZero()) return gl(t, i, n.x);
  if (i.x.isZero()) return gl(n, e, t.x);
  if (e.y.isZero()) return fl(t, i, n.y);
  if (i.y.isZero()) return fl(n, e, t.y);
  const o = Di(e, i);
  if (o.isZero()) return null;
  const a = { x: t.x.minus(n.x), y: t.y.minus(n.y) }, u = Di(a, e).div(o), h = Di(a, i).div(o), f = n.x.plus(h.times(e.x)), g = t.x.plus(u.times(i.x)), m = n.y.plus(h.times(e.y)), v = t.y.plus(u.times(i.y)), p = f.plus(g).div(2), _ = m.plus(v).div(2);
  return { x: p, y: _ };
}, Wt = class Sh {
  // Warning: 'point' input will be modified and re-used (for performance)
  constructor(e, t) {
    le(this, "point");
    le(this, "isLeft");
    le(this, "segment");
    le(this, "otherSE");
    le(this, "consumedBy");
    e.events === void 0 ? e.events = [this] : e.events.push(this), this.point = e, this.isLeft = t;
  }
  // for ordering sweep events in the sweep event queue
  static compare(e, t) {
    const i = Sh.comparePoints(e.point, t.point);
    return i !== 0 ? i : (e.point !== t.point && e.link(t), e.isLeft !== t.isLeft ? e.isLeft ? 1 : -1 : Zi.compare(e.segment, t.segment));
  }
  // for ordering points in sweep line order
  static comparePoints(e, t) {
    return e.x.isLessThan(t.x) ? -1 : e.x.isGreaterThan(t.x) ? 1 : e.y.isLessThan(t.y) ? -1 : e.y.isGreaterThan(t.y) ? 1 : 0;
  }
  link(e) {
    if (e.point === this.point)
      throw new Error("Tried to link already linked events");
    const t = e.point.events;
    for (let i = 0, o = t.length; i < o; i++) {
      const a = t[i];
      this.point.events.push(a), a.point = this.point;
    }
    this.checkForConsuming();
  }
  /* Do a pass over our linked events and check to see if any pair
   * of segments match, and should be consumed. */
  checkForConsuming() {
    const e = this.point.events.length;
    for (let t = 0; t < e; t++) {
      const i = this.point.events[t];
      if (i.segment.consumedBy === void 0)
        for (let o = t + 1; o < e; o++) {
          const a = this.point.events[o];
          a.consumedBy === void 0 && i.otherSE.point.events === a.otherSE.point.events && i.segment.consume(a.segment);
        }
    }
  }
  getAvailableLinkedEvents() {
    const e = [];
    for (let t = 0, i = this.point.events.length; t < i; t++) {
      const o = this.point.events[t];
      o !== this && !o.segment.ringOut && o.segment.isInResult() && e.push(o);
    }
    return e;
  }
  /**
   * Returns a comparator function for sorting linked events that will
   * favor the event that will give us the smallest left-side angle.
   * All ring construction starts as low as possible heading to the right,
   * so by always turning left as sharp as possible we'll get polygons
   * without uncessary loops & holes.
   *
   * The comparator function has a compute cache such that it avoids
   * re-computing already-computed values.
   */
  getLeftmostComparator(e) {
    const t = /* @__PURE__ */ new Map(), i = (o) => {
      const a = o.otherSE;
      t.set(o, {
        sine: Oy(this.point, e.point, a.point),
        cosine: Ay(this.point, e.point, a.point)
      });
    };
    return (o, a) => {
      t.has(o) || i(o), t.has(a) || i(a);
      const { sine: u, cosine: h } = t.get(o), { sine: f, cosine: g } = t.get(a);
      return u.isGreaterThanOrEqualTo(0) && f.isGreaterThanOrEqualTo(0) ? h.isLessThan(g) ? 1 : h.isGreaterThan(g) ? -1 : 0 : u.isLessThan(0) && f.isLessThan(0) ? h.isLessThan(g) ? -1 : h.isGreaterThan(g) ? 1 : 0 : f.isLessThan(u) ? -1 : f.isGreaterThan(u) ? 1 : 0;
    };
  }
}, Dy = class ko {
  constructor(e) {
    le(this, "events");
    le(this, "poly");
    le(this, "_isExteriorRing");
    le(this, "_enclosingRing");
    this.events = e;
    for (let t = 0, i = e.length; t < i; t++)
      e[t].segment.ringOut = this;
    this.poly = null;
  }
  /* Given the segments from the sweep line pass, compute & return a series
   * of closed rings from all the segments marked to be part of the result */
  static factory(e) {
    const t = [];
    for (let i = 0, o = e.length; i < o; i++) {
      const a = e[i];
      if (!a.isInResult() || a.ringOut) continue;
      let u = null, h = a.leftSE, f = a.rightSE;
      const g = [h], m = h.point, v = [];
      for (; u = h, h = f, g.push(h), h.point !== m; )
        for (; ; ) {
          const p = h.getAvailableLinkedEvents();
          if (p.length === 0) {
            const C = g[0].point, b = g[g.length - 1].point;
            throw new Error(
              `Unable to complete output ring starting at [${C.x}, ${C.y}]. Last matching segment found ends at [${b.x}, ${b.y}].`
            );
          }
          if (p.length === 1) {
            f = p[0].otherSE;
            break;
          }
          let _ = null;
          for (let C = 0, b = v.length; C < b; C++)
            if (v[C].point === h.point) {
              _ = C;
              break;
            }
          if (_ !== null) {
            const C = v.splice(_)[0], b = g.splice(C.index);
            b.unshift(b[0].otherSE), t.push(new ko(b.reverse()));
            continue;
          }
          v.push({
            index: g.length,
            point: h.point
          });
          const w = h.getLeftmostComparator(u);
          f = p.sort(w)[0].otherSE;
          break;
        }
      t.push(new ko(g));
    }
    return t;
  }
  getGeom() {
    let e = this.events[0].point;
    const t = [e];
    for (let g = 1, m = this.events.length - 1; g < m; g++) {
      const v = this.events[g].point, p = this.events[g + 1].point;
      cn.orient(v, e, p) !== 0 && (t.push(v), e = v);
    }
    if (t.length === 1) return null;
    const i = t[0], o = t[1];
    cn.orient(i, e, o) === 0 && t.shift(), t.push(t[0]);
    const a = this.isExteriorRing() ? 1 : -1, u = this.isExteriorRing() ? 0 : t.length - 1, h = this.isExteriorRing() ? t.length : -1, f = [];
    for (let g = u; g != h; g += a)
      f.push([t[g].x.toNumber(), t[g].y.toNumber()]);
    return f;
  }
  isExteriorRing() {
    if (this._isExteriorRing === void 0) {
      const e = this.enclosingRing();
      this._isExteriorRing = e ? !e.isExteriorRing() : !0;
    }
    return this._isExteriorRing;
  }
  enclosingRing() {
    return this._enclosingRing === void 0 && (this._enclosingRing = this._calcEnclosingRing()), this._enclosingRing;
  }
  /* Returns the ring that encloses this one, if any */
  _calcEnclosingRing() {
    var o, a;
    let e = this.events[0];
    for (let u = 1, h = this.events.length; u < h; u++) {
      const f = this.events[u];
      Wt.compare(e, f) > 0 && (e = f);
    }
    let t = e.segment.prevInResult(), i = t ? t.prevInResult() : null;
    for (; ; ) {
      if (!t) return null;
      if (!i) return t.ringOut;
      if (i.ringOut !== t.ringOut)
        return ((o = i.ringOut) == null ? void 0 : o.enclosingRing()) !== t.ringOut ? t.ringOut : (a = t.ringOut) == null ? void 0 : a.enclosingRing();
      t = i.prevInResult(), i = t ? t.prevInResult() : null;
    }
  }
}, dl = class {
  constructor(n) {
    le(this, "exteriorRing");
    le(this, "interiorRings");
    this.exteriorRing = n, n.poly = this, this.interiorRings = [];
  }
  addInterior(n) {
    this.interiorRings.push(n), n.poly = this;
  }
  getGeom() {
    const n = this.exteriorRing.getGeom();
    if (n === null) return null;
    const e = [n];
    for (let t = 0, i = this.interiorRings.length; t < i; t++) {
      const o = this.interiorRings[t].getGeom();
      o !== null && e.push(o);
    }
    return e;
  }
}, Fy = class {
  constructor(n) {
    le(this, "rings");
    le(this, "polys");
    this.rings = n, this.polys = this._composePolys(n);
  }
  getGeom() {
    const n = [];
    for (let e = 0, t = this.polys.length; e < t; e++) {
      const i = this.polys[e].getGeom();
      i !== null && n.push(i);
    }
    return n;
  }
  _composePolys(n) {
    var t;
    const e = [];
    for (let i = 0, o = n.length; i < o; i++) {
      const a = n[i];
      if (!a.poly)
        if (a.isExteriorRing()) e.push(new dl(a));
        else {
          const u = a.enclosingRing();
          u != null && u.poly || e.push(new dl(u)), (t = u == null ? void 0 : u.poly) == null || t.addInterior(a);
        }
    }
    return e;
  }
}, By = class {
  constructor(n, e = Zi.compare) {
    le(this, "queue");
    le(this, "tree");
    le(this, "segments");
    this.queue = n, this.tree = new Wi(e), this.segments = [];
  }
  process(n) {
    const e = n.segment, t = [];
    if (n.consumedBy)
      return n.isLeft ? this.queue.delete(n.otherSE) : this.tree.delete(e), t;
    n.isLeft && this.tree.add(e);
    let i = e, o = e;
    do
      i = this.tree.lastBefore(i);
    while (i != null && i.consumedBy != null);
    do
      o = this.tree.firstAfter(o);
    while (o != null && o.consumedBy != null);
    if (n.isLeft) {
      let a = null;
      if (i) {
        const h = i.getIntersection(e);
        if (h !== null && (e.isAnEndpoint(h) || (a = h), !i.isAnEndpoint(h))) {
          const f = this._splitSafely(i, h);
          for (let g = 0, m = f.length; g < m; g++)
            t.push(f[g]);
        }
      }
      let u = null;
      if (o) {
        const h = o.getIntersection(e);
        if (h !== null && (e.isAnEndpoint(h) || (u = h), !o.isAnEndpoint(h))) {
          const f = this._splitSafely(o, h);
          for (let g = 0, m = f.length; g < m; g++)
            t.push(f[g]);
        }
      }
      if (a !== null || u !== null) {
        let h = null;
        a === null ? h = u : u === null ? h = a : h = Wt.comparePoints(
          a,
          u
        ) <= 0 ? a : u, this.queue.delete(e.rightSE), t.push(e.rightSE);
        const f = e.split(h);
        for (let g = 0, m = f.length; g < m; g++)
          t.push(f[g]);
      }
      t.length > 0 ? (this.tree.delete(e), t.push(n)) : (this.segments.push(e), e.prev = i);
    } else {
      if (i && o) {
        const a = i.getIntersection(o);
        if (a !== null) {
          if (!i.isAnEndpoint(a)) {
            const u = this._splitSafely(i, a);
            for (let h = 0, f = u.length; h < f; h++)
              t.push(u[h]);
          }
          if (!o.isAnEndpoint(a)) {
            const u = this._splitSafely(o, a);
            for (let h = 0, f = u.length; h < f; h++)
              t.push(u[h]);
          }
        }
      }
      this.tree.delete(e);
    }
    return t;
  }
  /* Safely split a segment that is currently in the datastructures
   * IE - a segment other than the one that is currently being processed. */
  _splitSafely(n, e) {
    this.tree.delete(n);
    const t = n.rightSE;
    this.queue.delete(t);
    const i = n.split(e);
    return i.push(t), n.consumedBy === void 0 && this.tree.add(n), i;
  }
}, Gy = class {
  constructor() {
    le(this, "type");
    le(this, "numMultiPolys");
  }
  run(n, e, t) {
    Or.type = n;
    const i = [new ml(e, !0)];
    for (let g = 0, m = t.length; g < m; g++)
      i.push(new ml(t[g], !1));
    if (Or.numMultiPolys = i.length, Or.type === "difference") {
      const g = i[0];
      let m = 1;
      for (; m < i.length; )
        Eo(i[m].bbox, g.bbox) !== null ? m++ : i.splice(m, 1);
    }
    if (Or.type === "intersection")
      for (let g = 0, m = i.length; g < m; g++) {
        const v = i[g];
        for (let p = g + 1, _ = i.length; p < _; p++)
          if (Eo(v.bbox, i[p].bbox) === null) return [];
      }
    const o = new Wi(Wt.compare);
    for (let g = 0, m = i.length; g < m; g++) {
      const v = i[g].getSweepEvents();
      for (let p = 0, _ = v.length; p < _; p++)
        o.add(v[p]);
    }
    const a = new By(o);
    let u = null;
    for (o.size != 0 && (u = o.first(), o.delete(u)); u; ) {
      const g = a.process(u);
      for (let m = 0, v = g.length; m < v; m++) {
        const p = g[m];
        p.consumedBy === void 0 && o.add(p);
      }
      o.size != 0 ? (u = o.first(), o.delete(u)) : u = null;
    }
    cn.reset();
    const h = Dy.factory(a.segments);
    return new Fy(h).getGeom();
  }
}, Or = new Gy(), sr = Or, qy = 0, Zi = class Fi {
  /* Warning: a reference to ringWindings input will be stored,
   *  and possibly will be later modified */
  constructor(e, t, i, o) {
    le(this, "id");
    le(this, "leftSE");
    le(this, "rightSE");
    le(this, "rings");
    le(this, "windings");
    le(this, "ringOut");
    le(this, "consumedBy");
    le(this, "prev");
    le(this, "_prevInResult");
    le(this, "_beforeState");
    le(this, "_afterState");
    le(this, "_isInResult");
    this.id = ++qy, this.leftSE = e, e.segment = this, e.otherSE = t, this.rightSE = t, t.segment = this, t.otherSE = e, this.rings = i, this.windings = o;
  }
  /* This compare() function is for ordering segments in the sweep
   * line tree, and does so according to the following criteria:
   *
   * Consider the vertical line that lies an infinestimal step to the
   * right of the right-more of the two left endpoints of the input
   * segments. Imagine slowly moving a point up from negative infinity
   * in the increasing y direction. Which of the two segments will that
   * point intersect first? That segment comes 'before' the other one.
   *
   * If neither segment would be intersected by such a line, (if one
   * or more of the segments are vertical) then the line to be considered
   * is directly on the right-more of the two left inputs.
   */
  static compare(e, t) {
    const i = e.leftSE.point.x, o = t.leftSE.point.x, a = e.rightSE.point.x, u = t.rightSE.point.x;
    if (u.isLessThan(i)) return 1;
    if (a.isLessThan(o)) return -1;
    const h = e.leftSE.point.y, f = t.leftSE.point.y, g = e.rightSE.point.y, m = t.rightSE.point.y;
    if (i.isLessThan(o)) {
      if (f.isLessThan(h) && f.isLessThan(g)) return 1;
      if (f.isGreaterThan(h) && f.isGreaterThan(g)) return -1;
      const v = e.comparePoint(t.leftSE.point);
      if (v < 0) return 1;
      if (v > 0) return -1;
      const p = t.comparePoint(e.rightSE.point);
      return p !== 0 ? p : -1;
    }
    if (i.isGreaterThan(o)) {
      if (h.isLessThan(f) && h.isLessThan(m)) return -1;
      if (h.isGreaterThan(f) && h.isGreaterThan(m)) return 1;
      const v = t.comparePoint(e.leftSE.point);
      if (v !== 0) return v;
      const p = e.comparePoint(t.rightSE.point);
      return p < 0 ? 1 : p > 0 ? -1 : 1;
    }
    if (h.isLessThan(f)) return -1;
    if (h.isGreaterThan(f)) return 1;
    if (a.isLessThan(u)) {
      const v = t.comparePoint(e.rightSE.point);
      if (v !== 0) return v;
    }
    if (a.isGreaterThan(u)) {
      const v = e.comparePoint(t.rightSE.point);
      if (v < 0) return 1;
      if (v > 0) return -1;
    }
    if (!a.eq(u)) {
      const v = g.minus(h), p = a.minus(i), _ = m.minus(f), w = u.minus(o);
      if (v.isGreaterThan(p) && _.isLessThan(w)) return 1;
      if (v.isLessThan(p) && _.isGreaterThan(w)) return -1;
    }
    return a.isGreaterThan(u) ? 1 : a.isLessThan(u) || g.isLessThan(m) ? -1 : g.isGreaterThan(m) ? 1 : e.id < t.id ? -1 : e.id > t.id ? 1 : 0;
  }
  static fromRing(e, t, i) {
    let o, a, u;
    const h = Wt.comparePoints(e, t);
    if (h < 0)
      o = e, a = t, u = 1;
    else if (h > 0)
      o = t, a = e, u = -1;
    else
      throw new Error(
        `Tried to create degenerate segment at [${e.x}, ${e.y}]`
      );
    const f = new Wt(o, !0), g = new Wt(a, !1);
    return new Fi(f, g, [i], [u]);
  }
  /* When a segment is split, the rightSE is replaced with a new sweep event */
  replaceRightSE(e) {
    this.rightSE = e, this.rightSE.segment = this, this.rightSE.otherSE = this.leftSE, this.leftSE.otherSE = this.rightSE;
  }
  bbox() {
    const e = this.leftSE.point.y, t = this.rightSE.point.y;
    return {
      ll: { x: this.leftSE.point.x, y: e.isLessThan(t) ? e : t },
      ur: { x: this.rightSE.point.x, y: e.isGreaterThan(t) ? e : t }
    };
  }
  /* A vector from the left point to the right */
  vector() {
    return {
      x: this.rightSE.point.x.minus(this.leftSE.point.x),
      y: this.rightSE.point.y.minus(this.leftSE.point.y)
    };
  }
  isAnEndpoint(e) {
    return e.x.eq(this.leftSE.point.x) && e.y.eq(this.leftSE.point.y) || e.x.eq(this.rightSE.point.x) && e.y.eq(this.rightSE.point.y);
  }
  /* Compare this segment with a point.
   *
   * A point P is considered to be colinear to a segment if there
   * exists a distance D such that if we travel along the segment
   * from one * endpoint towards the other a distance D, we find
   * ourselves at point P.
   *
   * Return value indicates:
   *
   *   1: point lies above the segment (to the left of vertical)
   *   0: point is colinear to segment
   *  -1: point lies below the segment (to the right of vertical)
   */
  comparePoint(e) {
    return cn.orient(this.leftSE.point, e, this.rightSE.point);
  }
  /**
   * Given another segment, returns the first non-trivial intersection
   * between the two segments (in terms of sweep line ordering), if it exists.
   *
   * A 'non-trivial' intersection is one that will cause one or both of the
   * segments to be split(). As such, 'trivial' vs. 'non-trivial' intersection:
   *
   *   * endpoint of segA with endpoint of segB --> trivial
   *   * endpoint of segA with point along segB --> non-trivial
   *   * endpoint of segB with point along segA --> non-trivial
   *   * point along segA with point along segB --> non-trivial
   *
   * If no non-trivial intersection exists, return null
   * Else, return null.
   */
  getIntersection(e) {
    const t = this.bbox(), i = e.bbox(), o = Eo(t, i);
    if (o === null) return null;
    const a = this.leftSE.point, u = this.rightSE.point, h = e.leftSE.point, f = e.rightSE.point, g = xr(t, h) && this.comparePoint(h) === 0, m = xr(i, a) && e.comparePoint(a) === 0, v = xr(t, f) && this.comparePoint(f) === 0, p = xr(i, u) && e.comparePoint(u) === 0;
    if (m && g)
      return p && !v ? u : !p && v ? f : null;
    if (m)
      return v && a.x.eq(f.x) && a.y.eq(f.y) ? null : a;
    if (g)
      return p && u.x.eq(h.x) && u.y.eq(h.y) ? null : h;
    if (p && v) return null;
    if (p) return u;
    if (v) return f;
    const _ = Ry(a, this.vector(), h, e.vector());
    return _ === null || !xr(o, _) ? null : cn.snap(_);
  }
  /**
   * Split the given segment into multiple segments on the given points.
   *  * Each existing segment will retain its leftSE and a new rightSE will be
   *    generated for it.
   *  * A new segment will be generated which will adopt the original segment's
   *    rightSE, and a new leftSE will be generated for it.
   *  * If there are more than two points given to split on, new segments
   *    in the middle will be generated with new leftSE and rightSE's.
   *  * An array of the newly generated SweepEvents will be returned.
   *
   * Warning: input array of points is modified
   */
  split(e) {
    const t = [], i = e.events !== void 0, o = new Wt(e, !0), a = new Wt(e, !1), u = this.rightSE;
    this.replaceRightSE(a), t.push(a), t.push(o);
    const h = new Fi(
      o,
      u,
      this.rings.slice(),
      this.windings.slice()
    );
    return Wt.comparePoints(h.leftSE.point, h.rightSE.point) > 0 && h.swapEvents(), Wt.comparePoints(this.leftSE.point, this.rightSE.point) > 0 && this.swapEvents(), i && (o.checkForConsuming(), a.checkForConsuming()), t;
  }
  /* Swap which event is left and right */
  swapEvents() {
    const e = this.rightSE;
    this.rightSE = this.leftSE, this.leftSE = e, this.leftSE.isLeft = !0, this.rightSE.isLeft = !1;
    for (let t = 0, i = this.windings.length; t < i; t++)
      this.windings[t] *= -1;
  }
  /* Consume another segment. We take their rings under our wing
   * and mark them as consumed. Use for perfectly overlapping segments */
  consume(e) {
    let t = this, i = e;
    for (; t.consumedBy; ) t = t.consumedBy;
    for (; i.consumedBy; ) i = i.consumedBy;
    const o = Fi.compare(t, i);
    if (o !== 0) {
      if (o > 0) {
        const a = t;
        t = i, i = a;
      }
      if (t.prev === i) {
        const a = t;
        t = i, i = a;
      }
      for (let a = 0, u = i.rings.length; a < u; a++) {
        const h = i.rings[a], f = i.windings[a], g = t.rings.indexOf(h);
        g === -1 ? (t.rings.push(h), t.windings.push(f)) : t.windings[g] += f;
      }
      i.rings = null, i.windings = null, i.consumedBy = t, i.leftSE.consumedBy = t.leftSE, i.rightSE.consumedBy = t.rightSE;
    }
  }
  /* The first segment previous segment chain that is in the result */
  prevInResult() {
    return this._prevInResult !== void 0 ? this._prevInResult : (this.prev ? this.prev.isInResult() ? this._prevInResult = this.prev : this._prevInResult = this.prev.prevInResult() : this._prevInResult = null, this._prevInResult);
  }
  beforeState() {
    if (this._beforeState !== void 0) return this._beforeState;
    if (!this.prev)
      this._beforeState = {
        rings: [],
        windings: [],
        multiPolys: []
      };
    else {
      const e = this.prev.consumedBy || this.prev;
      this._beforeState = e.afterState();
    }
    return this._beforeState;
  }
  afterState() {
    if (this._afterState !== void 0) return this._afterState;
    const e = this.beforeState();
    this._afterState = {
      rings: e.rings.slice(0),
      windings: e.windings.slice(0),
      multiPolys: []
    };
    const t = this._afterState.rings, i = this._afterState.windings, o = this._afterState.multiPolys;
    for (let h = 0, f = this.rings.length; h < f; h++) {
      const g = this.rings[h], m = this.windings[h], v = t.indexOf(g);
      v === -1 ? (t.push(g), i.push(m)) : i[v] += m;
    }
    const a = [], u = [];
    for (let h = 0, f = t.length; h < f; h++) {
      if (i[h] === 0) continue;
      const g = t[h], m = g.poly;
      if (u.indexOf(m) === -1)
        if (g.isExterior) a.push(m);
        else {
          u.indexOf(m) === -1 && u.push(m);
          const v = a.indexOf(g.poly);
          v !== -1 && a.splice(v, 1);
        }
    }
    for (let h = 0, f = a.length; h < f; h++) {
      const g = a[h].multiPoly;
      o.indexOf(g) === -1 && o.push(g);
    }
    return this._afterState;
  }
  /* Is this segment part of the final result? */
  isInResult() {
    if (this.consumedBy) return !1;
    if (this._isInResult !== void 0) return this._isInResult;
    const e = this.beforeState().multiPolys, t = this.afterState().multiPolys;
    switch (sr.type) {
      case "union": {
        const i = e.length === 0, o = t.length === 0;
        this._isInResult = i !== o;
        break;
      }
      case "intersection": {
        let i, o;
        e.length < t.length ? (i = e.length, o = t.length) : (i = t.length, o = e.length), this._isInResult = o === sr.numMultiPolys && i < o;
        break;
      }
      case "xor": {
        const i = Math.abs(e.length - t.length);
        this._isInResult = i % 2 === 1;
        break;
      }
      case "difference": {
        const i = (o) => o.length === 1 && o[0].isSubject;
        this._isInResult = i(e) !== i(t);
        break;
      }
    }
    return this._isInResult;
  }
}, vl = class {
  constructor(n, e, t) {
    le(this, "poly");
    le(this, "isExterior");
    le(this, "segments");
    le(this, "bbox");
    if (!Array.isArray(n) || n.length === 0)
      throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
    if (this.poly = e, this.isExterior = t, this.segments = [], typeof n[0][0] != "number" || typeof n[0][1] != "number")
      throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
    const i = cn.snap({ x: new Zt(n[0][0]), y: new Zt(n[0][1]) });
    this.bbox = {
      ll: { x: i.x, y: i.y },
      ur: { x: i.x, y: i.y }
    };
    let o = i;
    for (let a = 1, u = n.length; a < u; a++) {
      if (typeof n[a][0] != "number" || typeof n[a][1] != "number")
        throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
      const h = cn.snap({ x: new Zt(n[a][0]), y: new Zt(n[a][1]) });
      h.x.eq(o.x) && h.y.eq(o.y) || (this.segments.push(Zi.fromRing(o, h, this)), h.x.isLessThan(this.bbox.ll.x) && (this.bbox.ll.x = h.x), h.y.isLessThan(this.bbox.ll.y) && (this.bbox.ll.y = h.y), h.x.isGreaterThan(this.bbox.ur.x) && (this.bbox.ur.x = h.x), h.y.isGreaterThan(this.bbox.ur.y) && (this.bbox.ur.y = h.y), o = h);
    }
    (!i.x.eq(o.x) || !i.y.eq(o.y)) && this.segments.push(Zi.fromRing(o, i, this));
  }
  getSweepEvents() {
    const n = [];
    for (let e = 0, t = this.segments.length; e < t; e++) {
      const i = this.segments[e];
      n.push(i.leftSE), n.push(i.rightSE);
    }
    return n;
  }
}, zy = class {
  constructor(n, e) {
    le(this, "multiPoly");
    le(this, "exteriorRing");
    le(this, "interiorRings");
    le(this, "bbox");
    if (!Array.isArray(n))
      throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
    this.exteriorRing = new vl(n[0], this, !0), this.bbox = {
      ll: { x: this.exteriorRing.bbox.ll.x, y: this.exteriorRing.bbox.ll.y },
      ur: { x: this.exteriorRing.bbox.ur.x, y: this.exteriorRing.bbox.ur.y }
    }, this.interiorRings = [];
    for (let t = 1, i = n.length; t < i; t++) {
      const o = new vl(n[t], this, !1);
      o.bbox.ll.x.isLessThan(this.bbox.ll.x) && (this.bbox.ll.x = o.bbox.ll.x), o.bbox.ll.y.isLessThan(this.bbox.ll.y) && (this.bbox.ll.y = o.bbox.ll.y), o.bbox.ur.x.isGreaterThan(this.bbox.ur.x) && (this.bbox.ur.x = o.bbox.ur.x), o.bbox.ur.y.isGreaterThan(this.bbox.ur.y) && (this.bbox.ur.y = o.bbox.ur.y), this.interiorRings.push(o);
    }
    this.multiPoly = e;
  }
  getSweepEvents() {
    const n = this.exteriorRing.getSweepEvents();
    for (let e = 0, t = this.interiorRings.length; e < t; e++) {
      const i = this.interiorRings[e].getSweepEvents();
      for (let o = 0, a = i.length; o < a; o++)
        n.push(i[o]);
    }
    return n;
  }
}, ml = class {
  constructor(n, e) {
    le(this, "isSubject");
    le(this, "polys");
    le(this, "bbox");
    if (!Array.isArray(n))
      throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
    try {
      typeof n[0][0][0] == "number" && (n = [n]);
    } catch {
    }
    this.polys = [], this.bbox = {
      ll: { x: new Zt(Number.POSITIVE_INFINITY), y: new Zt(Number.POSITIVE_INFINITY) },
      ur: { x: new Zt(Number.NEGATIVE_INFINITY), y: new Zt(Number.NEGATIVE_INFINITY) }
    };
    for (let t = 0, i = n.length; t < i; t++) {
      const o = new zy(n[t], this);
      o.bbox.ll.x.isLessThan(this.bbox.ll.x) && (this.bbox.ll.x = o.bbox.ll.x), o.bbox.ll.y.isLessThan(this.bbox.ll.y) && (this.bbox.ll.y = o.bbox.ll.y), o.bbox.ur.x.isGreaterThan(this.bbox.ur.x) && (this.bbox.ur.x = o.bbox.ur.x), o.bbox.ur.y.isGreaterThan(this.bbox.ur.y) && (this.bbox.ur.y = o.bbox.ur.y), this.polys.push(o);
    }
    this.isSubject = e;
  }
  getSweepEvents() {
    const n = [];
    for (let e = 0, t = this.polys.length; e < t; e++) {
      const i = this.polys[e].getSweepEvents();
      for (let o = 0, a = i.length; o < a; o++)
        n.push(i[o]);
    }
    return n;
  }
}, yn = (n, ...e) => sr.run("union", n, e), Mh = (n, ...e) => sr.run("intersection", n, e), Yy = (n, ...e) => sr.run("xor", n, e), bh = (n, ...e) => sr.run("difference", n, e), Uy = cn.set;
const Xy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  difference: bh,
  intersection: Mh,
  setPrecision: Uy,
  union: yn,
  xor: Yy
}, Symbol.toStringTag, { value: "Module" }));
function Vy(n) {
  const e = [];
  if (at(n, (o) => {
    e.push(o.coordinates);
  }), e.length < 2)
    throw new Error("Must have at least two features");
  const t = n.features[0].properties || {}, i = bh(e[0], ...e.slice(1));
  return i.length === 0 ? null : i.length === 1 ? ye(i[0], t) : wt(i, t);
}
function Co(n) {
  if (!n) throw new Error("geojson is required");
  var e = [];
  return it(n, function(t) {
    e.push(t);
  }), ce(e);
}
function Hy(n, e = {}) {
  if (e = e || {}, !Re(e)) throw new Error("options is invalid");
  const { propertyName: t } = e;
  hn(n, "Polygon", "dissolve");
  const i = [];
  if (t) {
    const o = {};
    Pe(n, function(u) {
      u.properties && (Object.prototype.hasOwnProperty.call(
        o,
        u.properties[t]
      ) || (o[u.properties[t]] = []), o[u.properties[t]].push(u));
    });
    const a = Object.keys(o);
    for (let u = 0; u < a.length; u++) {
      const h = wt(
        yn.apply(
          null,
          // List of polygons expressed as Position[][][] a.k.a. Geom[]
          o[a[u]].map(function(f) {
            return f.geometry.coordinates;
          })
        )
      );
      h && h.properties && (h.properties[t] = a[u], i.push(h));
    }
  } else
    return Co(
      wt(
        yn.apply(
          null,
          // List of polygons expressed as Position[][][] a.k.a. Geom[]
          n.features.map(function(o) {
            return o.geometry.coordinates;
          })
        )
      )
    );
  return Co(ce(i));
}
function Wy(n, e, t = 2) {
  const i = be(n), o = be(e), a = i[0] - o[0], u = i[1] - o[1];
  return t === 1 ? Math.abs(a) + Math.abs(u) : Math.pow(Math.pow(a, t) + Math.pow(u, t), 1 / t);
}
function Ph(n, e) {
  var t, i;
  e = e || {};
  const o = e.threshold || 1e4, a = e.p || 2, u = (t = e.binary) != null ? t : !1, h = e.alpha || -1, f = (i = e.standardization) != null ? i : !1, g = [];
  Pe(n, (v) => {
    g.push(Dt(v));
  });
  const m = [];
  for (let v = 0; v < g.length; v++)
    m[v] = [];
  for (let v = 0; v < g.length; v++)
    for (let p = v; p < g.length; p++) {
      v === p && (m[v][p] = 0);
      const _ = Wy(g[v], g[p], a);
      m[v][p] = _, m[p][v] = _;
    }
  for (let v = 0; v < g.length; v++)
    for (let p = 0; p < g.length; p++) {
      const _ = m[v][p];
      _ !== 0 && (u ? _ <= o ? m[v][p] = 1 : m[v][p] = 0 : _ <= o ? m[v][p] = Math.pow(_, h) : m[v][p] = 0);
    }
  if (f)
    for (let v = 0; v < g.length; v++) {
      const p = m[v].reduce((_, w) => _ + w, 0);
      for (let _ = 0; _ < g.length; _++)
        m[v][_] = m[v][_] / p;
    }
  return m;
}
function Zn(n, e, t = {}) {
  const i = be(n), o = be(e);
  o[0] += o[0] - i[0] > 180 ? -360 : i[0] - o[0] > 180 ? 360 : 0;
  const a = $y(i, o);
  return Pn(a, "meters", t.units);
}
function $y(n, e, t) {
  t = t === void 0 ? Be : Number(t);
  const i = t, o = n[1] * Math.PI / 180, a = e[1] * Math.PI / 180, u = a - o;
  let h = Math.abs(e[0] - n[0]) * Math.PI / 180;
  h > Math.PI && (h -= 2 * Math.PI);
  const f = Math.log(
    Math.tan(a / 2 + Math.PI / 4) / Math.tan(o / 2 + Math.PI / 4)
  ), g = Math.abs(f) > 1e-11 ? u / f : Math.cos(o);
  return Math.sqrt(
    u * u + g * g * h * h
  ) * i;
}
function cs(n, e, t, i = {}) {
  const o = e < 0;
  let a = Pn(
    Math.abs(e),
    i.units,
    "meters"
  );
  o && (a = -Math.abs(a));
  const u = be(n), h = Zy(
    u,
    a,
    t
  );
  return h[0] += h[0] - u[0] > 180 ? -360 : u[0] - h[0] > 180 ? 360 : 0, de(h, i.properties);
}
function Zy(n, e, t, i) {
  i = i === void 0 ? Be : Number(i);
  const o = e / i, a = n[0] * Math.PI / 180, u = Je(n[1]), h = Je(t), f = o * Math.cos(h);
  let g = u + f;
  Math.abs(g) > Math.PI / 2 && (g = g > 0 ? Math.PI - g : -Math.PI - g);
  const m = Math.log(
    Math.tan(g / 2 + Math.PI / 4) / Math.tan(u / 2 + Math.PI / 4)
  ), v = Math.abs(m) > 1e-11 ? f / m : Math.cos(u), p = o * Math.sin(h) / v;
  return [
    ((a + p) * 180 / Math.PI + 540) % 360 - 180,
    g * 180 / Math.PI
  ];
}
function Lh(n, e, t) {
  if (t = t || {}, !Re(t)) throw new Error("options is invalid");
  const i = t.pivot, o = t.mutate;
  if (!n) throw new Error("geojson is required");
  if (e == null || isNaN(e))
    throw new Error("angle is required");
  if (e === 0) return n;
  const a = i ?? Dt(n);
  return (o === !1 || o === void 0) && (n = nt(n)), He(n, function(u) {
    const f = Ln(a, u) + e, g = Zn(a, u), m = ve(
      cs(a, g, f)
    );
    u[0] = m[0], u[1] = m[1];
  }), mn(n), n;
}
function Nh(n, e, t, i) {
  i = i || {};
  let o = i.steps || 64;
  const a = i.units || "kilometers";
  let u = i.angle || 0;
  const h = i.pivot || n, f = i.properties || {};
  if (!n) throw new Error("center is required");
  if (!e) throw new Error("xSemiAxis is required");
  if (!t) throw new Error("ySemiAxis is required");
  if (!Re(i)) throw new Error("options must be an object");
  if (!et(o)) throw new Error("steps must be a number");
  if (!et(u)) throw new Error("angle must be a number");
  const g = be(
    Lh(de(be(n)), u, { pivot: h })
  );
  u = -90 + u, o = Math.ceil(o / 4);
  let m = [], v = [];
  const p = e, _ = t, w = _, C = (p - _) / (Math.PI / 2), b = (p + _) * Math.PI / 4, S = 0.5, I = o;
  let N = 0, A = 0;
  for (let U = 0; U < o; U++)
    A += N, C === 0 ? N = b / I / w : N = (-(C * A + w) + Math.sqrt(Math.pow(C * A + w, 2) - 4 * (S * C) * -(b / I))) / (2 * (S * C)), A != 0 && m.push(A);
  v.push(0);
  for (let U = 0; U < m.length; U++)
    v.push(m[U]);
  v.push(Math.PI / 2);
  for (let U = 0; U < m.length; U++)
    v.push(
      Math.PI - m[m.length - U - 1]
    );
  v.push(Math.PI);
  for (let U = 0; U < m.length; U++)
    v.push(Math.PI + m[U]);
  v.push(3 * Math.PI / 2);
  for (let U = 0; U < m.length; U++)
    v.push(
      2 * Math.PI - m[m.length - U - 1]
    );
  v.push(0);
  const R = [];
  for (const U of v) {
    const V = Math.atan2(_ * Math.sin(U), p * Math.cos(U)), k = Math.sqrt(
      Math.pow(p, 2) * Math.pow(_, 2) / (Math.pow(p * Math.sin(V), 2) + Math.pow(_ * Math.cos(V), 2))
    );
    R.push(
      Qt(g, k, u + Kt(V), {
        units: a
      }).geometry.coordinates
    );
  }
  return ye([R], f);
}
function Th(n) {
  return Jr(ze(n));
}
function hs(n) {
  const e = [];
  return n.type === "FeatureCollection" ? Pe(n, function(t) {
    He(t, function(i) {
      e.push(de(i, t.properties));
    });
  }) : n.type === "Feature" ? He(n, function(t) {
    e.push(de(t, n.properties));
  }) : He(n, function(t) {
    e.push(de(t));
  }), ce(e);
}
function Ky(n, e) {
  var t;
  if (e = e || {}, !Re(e)) throw new Error("options is invalid");
  const i = (t = e.mutate) != null ? t : !1;
  if (!n) throw new Error("geojson is required");
  return (i === !1 || i === void 0) && (n = nt(n)), He(n, function(o) {
    var a = o[0], u = o[1];
    o[0] = u, o[1] = a;
  }), n;
}
function Qy(n) {
  const t = Math.pow(10, 6), i = [];
  for (let o = 0; o < n.length; o++) {
    const a = n[o];
    a !== void 0 && (i[o] = Math.round((a + Number.EPSILON) * t) / t);
  }
  return i;
}
const yl = Math.PI / 180, pl = 180 / Math.PI;
class Ki {
  constructor(e, t) {
    le(this, "lon");
    le(this, "lat");
    le(this, "x");
    le(this, "y");
    this.lon = e, this.lat = t, this.x = yl * e, this.y = yl * t;
  }
  /**
   * Get a string representation of the coordinate
   *
   * @returns String representation of the coordinate
   *
   * @example
   * ```typescript
   * const coord = new Coord(45.123456789, 50.987654321);
   * console.log(coord.view()); // "45.123457,50.987654"
   * ```
   */
  view() {
    return String(this.lon).slice(0, 4) + "," + String(this.lat).slice(0, 4);
  }
  /**
   * Get the antipodal point (diametrically opposite point on the sphere)
   *
   * @returns Antipodal point
   *
   * @example
   * ```typescript
   * const coord = new Coord(45.123456789, 50.987654321);
   * console.log(coord.antipode()); // Coord { lon: -45.123457, lat: -50.987654 }
   * ```
   */
  antipode() {
    const e = -1 * this.lat, t = this.lon < 0 ? 180 + this.lon : (180 - this.lon) * -1;
    return new Ki(t, e);
  }
}
class Jy {
  constructor(e) {
    le(this, "properties", {});
    le(this, "geometries", []);
    e && (this.properties = e);
  }
  /**
   * Convert to GeoJSON Feature
   *
   * @returns GeoJSON Feature with LineString or MultiLineString geometry
   *
   * @example
   * ```typescript
   * const gc = new GreatCircle({x: -122, y: 48}, {x: -77, y: 39});
   * const arc = gc.Arc(3);
   * console.log(arc.json());
   * // { type: 'Feature', geometry: { type: 'LineString', coordinates: [[-122, 48], [-99.5, 43.5], [-77, 39]] }, properties: {} }
   * ```
   */
  json() {
    if (this.geometries.length === 0)
      return {
        type: "Feature",
        // NOTE: coordinates: null is non-standard GeoJSON (RFC 7946 specifies empty array [])
        // but maintained for backward compatibility with original arc.js behavior
        geometry: { type: "LineString", coordinates: null },
        properties: this.properties
      };
    if (this.geometries.length === 1) {
      const t = this.geometries[0];
      return t ? {
        type: "Feature",
        geometry: { type: "LineString", coordinates: t.coords },
        properties: this.properties
      } : {
        type: "Feature",
        geometry: { type: "LineString", coordinates: [] },
        properties: this.properties
      };
    }
    return {
      type: "Feature",
      geometry: { type: "MultiLineString", coordinates: this.geometries.filter((t) => t !== void 0).map((t) => t.coords) },
      properties: this.properties
    };
  }
  /**
   * Convert to WKT (Well Known Text) format
   *
   * @returns WKT string representation
   *
   * @example
   * ```typescript
   * const arc = new Arc({ name: 'test-arc' });
   * console.log(arc.wkt()); // "LINESTRING EMPTY" or "LINESTRING(lon lat,lon lat,...)"
   * ```
   */
  wkt() {
    if (this.geometries.length === 0)
      return "";
    let e = [];
    for (const t of this.geometries) {
      if (!t || t.coords.length === 0) {
        e.push("LINESTRING EMPTY");
        continue;
      }
      const i = t.coords.filter((o) => o !== void 0).map((o) => {
        const a = o[0] ?? 0, u = o[1] ?? 0;
        return `${a} ${u}`;
      });
      i.length === 0 ? e.push("LINESTRING EMPTY") : e.push(`LINESTRING(${i.join(",")})`);
    }
    return e.join("; ");
  }
}
class jy {
  constructor() {
    le(this, "coords", []);
    le(this, "length", 0);
  }
  /**
   * Add a coordinate to the line string
   *
   * @param coord - Coordinate position to add
   */
  move_to(e) {
    this.length++, this.coords.push(e);
  }
}
class ep {
  constructor(e, t, i) {
    le(this, "start");
    le(this, "end");
    le(this, "properties");
    le(this, "g");
    if (!e || e.x === void 0 || e.y === void 0)
      throw new Error("GreatCircle constructor expects two args: start and end objects with x and y properties");
    if (!t || t.x === void 0 || t.y === void 0)
      throw new Error("GreatCircle constructor expects two args: start and end objects with x and y properties");
    this.start = new Ki(e.x, e.y), this.end = new Ki(t.x, t.y), this.properties = i || {};
    const o = this.start.x - this.end.x, a = this.start.y - this.end.y, u = Math.pow(Math.sin(a / 2), 2) + Math.cos(this.start.y) * Math.cos(this.end.y) * Math.pow(Math.sin(o / 2), 2);
    if (this.g = 2 * Math.asin(Math.sqrt(u)), this.g === Math.PI)
      throw new Error("it appears " + this.start.view() + " and " + this.end.view() + " are 'antipodal', e.g diametrically opposite, thus there is no single route but rather infinite");
    if (isNaN(this.g))
      throw new Error("could not calculate great circle between " + e + " and " + t);
  }
  /**
   * Interpolate along the great circle
   * http://williams.best.vwh.net/avform.htm#Intermediate
   *
   * @param f - Interpolation factor
   * @returns Interpolated point
   *
   * @example
   * ```typescript
   * const greatCircle = new GreatCircle({ x: 45.123456789, y: 50.987654321 }, { x: 46.123456789, y: 51.987654321 });
   * console.log(greatCircle.interpolate(0.5)); // [45.623457, 51.487654]
   * ```
   */
  interpolate(e) {
    const t = Math.sin((1 - e) * this.g) / Math.sin(this.g), i = Math.sin(e * this.g) / Math.sin(this.g), o = t * Math.cos(this.start.y) * Math.cos(this.start.x) + i * Math.cos(this.end.y) * Math.cos(this.end.x), a = t * Math.cos(this.start.y) * Math.sin(this.start.x) + i * Math.cos(this.end.y) * Math.sin(this.end.x), u = t * Math.sin(this.start.y) + i * Math.sin(this.end.y), h = pl * Math.atan2(u, Math.sqrt(Math.pow(o, 2) + Math.pow(a, 2)));
    return [pl * Math.atan2(a, o), h];
  }
  /**
   * Generate points along the great circle
   *
   * @param npoints - Number of points to generate
   * @param options - Optional options object
   * @returns Arc object
   *
   * @example
   * ```typescript
   * const greatCircle = new GreatCircle({ x: 45.123456789, y: 50.987654321 }, { x: 46.123456789, y: 51.987654321 });
   * console.log(greatCircle.Arc(10)); // Arc { geometries: [ [Array] ] }
   * ```
   */
  Arc(e, t) {
    var p, _, w, C, b, S, I, N, A, R, U, V, k, M, T, D, B, q, X, O, Y, G, H, Q, W;
    let i = [];
    if (!e || e <= 2)
      i.push([this.start.lon, this.start.lat]), i.push([this.end.lon, this.end.lat]);
    else {
      const j = 1 / (e - 1);
      for (let J = 0; J < e; ++J) {
        const re = j * J, ee = this.interpolate(re);
        i.push(ee);
      }
    }
    let o = !1, a = 0;
    const u = (t == null ? void 0 : t.offset) ?? 10, h = 180 - u, f = -180 + u, g = 360 - u;
    for (let j = 1; j < i.length; ++j) {
      const J = ((p = i[j - 1]) == null ? void 0 : p[0]) ?? 0, re = ((_ = i[j]) == null ? void 0 : _[0]) ?? 0, ee = Math.abs(re - J);
      ee > g && (re > h && J < f || J > h && re < f) ? o = !0 : ee > a && (a = ee);
    }
    const m = [];
    if (o && a < u) {
      let j = [];
      m.push(j);
      for (let J = 0; J < i.length; ++J) {
        const re = parseFloat((((w = i[J]) == null ? void 0 : w[0]) ?? 0).toString());
        if (J > 0 && Math.abs(re - (((C = i[J - 1]) == null ? void 0 : C[0]) ?? 0)) > g) {
          const ee = parseFloat((((b = i[J - 1]) == null ? void 0 : b[0]) ?? 0).toString()), te = parseFloat((((S = i[J - 1]) == null ? void 0 : S[1]) ?? 0).toString()), se = parseFloat((((I = i[J]) == null ? void 0 : I[0]) ?? 0).toString()), fe = parseFloat((((N = i[J]) == null ? void 0 : N[1]) ?? 0).toString());
          if (ee > -180 && ee < f && se === 180 && J + 1 < i.length && (((A = i[J - 1]) == null ? void 0 : A[0]) ?? 0) > -180 && (((R = i[J - 1]) == null ? void 0 : R[0]) ?? 0) < f) {
            j.push([-180, ((U = i[J]) == null ? void 0 : U[1]) ?? 0]), J++, j.push([((V = i[J]) == null ? void 0 : V[0]) ?? 0, ((k = i[J]) == null ? void 0 : k[1]) ?? 0]);
            continue;
          } else if (ee > h && ee < 180 && se === -180 && J + 1 < i.length && (((M = i[J - 1]) == null ? void 0 : M[0]) ?? 0) > h && (((T = i[J - 1]) == null ? void 0 : T[0]) ?? 0) < 180) {
            j.push([180, ((D = i[J]) == null ? void 0 : D[1]) ?? 0]), J++, j.push([((B = i[J]) == null ? void 0 : B[0]) ?? 0, ((q = i[J]) == null ? void 0 : q[1]) ?? 0]);
            continue;
          }
          if (ee <= 180 && se >= 180 && ee < se) {
            const Z = (180 - ee) / (se - ee), Fe = Z * fe + (1 - Z) * te;
            j.push([(((X = i[J - 1]) == null ? void 0 : X[0]) ?? 0) > h ? 180 : -180, Fe]), j = [], j.push([(((O = i[J - 1]) == null ? void 0 : O[0]) ?? 0) > h ? -180 : 180, Fe]), m.push(j);
          } else
            j = [], m.push(j);
          j.push([re, ((Y = i[J]) == null ? void 0 : Y[1]) ?? 0]);
        } else
          j.push([((G = i[J]) == null ? void 0 : G[0]) ?? 0, ((H = i[J]) == null ? void 0 : H[1]) ?? 0]);
      }
    } else {
      const j = [];
      m.push(j);
      for (let J = 0; J < i.length; ++J)
        j.push([((Q = i[J]) == null ? void 0 : Q[0]) ?? 0, ((W = i[J]) == null ? void 0 : W[1]) ?? 0]);
    }
    const v = new Jy(this.properties);
    for (let j = 0; j < m.length; ++j) {
      const J = new jy();
      v.geometries.push(J);
      const re = m[j];
      if (re)
        for (let ee = 0; ee < re.length; ++ee) {
          const te = re[ee];
          te && J.move_to(Qy([te[0], te[1]]));
        }
    }
    return v;
  }
}
function tp(n, e, t = {}) {
  if (typeof t != "object") throw new Error("options is invalid");
  const { properties: i = {}, npoints: o = 100, offset: a = 10 } = t, u = be(n), h = be(e);
  if (u[0] === h[0] && u[1] === h[1]) {
    const m = Array(o).fill([u[0], u[1]]);
    return Se(m, i);
  }
  return new ep(
    { x: u[0], y: u[1] },
    { x: h[0], y: h[1] },
    i || {}
  ).Arc(o, { offset: a }).json();
}
function Yr(n, e = {}) {
  const t = [];
  if (at(n, (o) => {
    t.push(o.coordinates);
  }), t.length < 2)
    throw new Error("Must specify at least 2 geometries");
  const i = Mh(t[0], ...t.slice(1));
  return i.length === 0 ? null : i.length === 1 ? ye(i[0], e.properties) : wt(i, e.properties);
}
function Oh(n, e, t = {}) {
  const i = JSON.stringify(t.properties || {}), [o, a, u, h] = n, f = (a + h) / 2, g = (o + u) / 2, v = e * 2 / qe([o, f], [u, f], t) * (u - o), _ = e * 2 / qe([g, a], [g, h], t) * (h - a), w = v / 2, C = w * 2, b = Math.sqrt(3) / 2 * _, S = u - o, I = h - a, N = 3 / 4 * C, A = b, R = (S - C) / (C - w / 2), U = Math.floor(R), V = (U * N - w / 2 - S) / 2 - w / 2 + N / 2, k = Math.floor((I - b) / b);
  let M = (I - k * b) / 2;
  const T = k * b - I > b / 2;
  T && (M -= b / 4);
  const D = [], B = [];
  for (let X = 0; X < 6; X++) {
    const O = 2 * Math.PI / 6 * X;
    D.push(Math.cos(O)), B.push(Math.sin(O));
  }
  const q = [];
  for (let X = 0; X <= U; X++)
    for (let O = 0; O <= k; O++) {
      const Y = X % 2 === 1;
      if (O === 0 && Y || O === 0 && T) continue;
      const G = X * N + o - V;
      let H = O * A + a + M;
      if (Y && (H -= b / 2), t.triangles === !0)
        rp(
          [G, H],
          v / 2,
          _ / 2,
          JSON.parse(i),
          D,
          B
        ).forEach(function(Q) {
          t.mask ? Yr(ce([t.mask, Q])) && q.push(Q) : q.push(Q);
        });
      else {
        const Q = np(
          [G, H],
          v / 2,
          _ / 2,
          JSON.parse(i),
          D,
          B
        );
        t.mask ? Yr(ce([t.mask, Q])) && q.push(Q) : q.push(Q);
      }
    }
  return ce(q);
}
function np(n, e, t, i, o, a) {
  const u = [];
  for (let h = 0; h < 6; h++) {
    const f = n[0] + e * o[h], g = n[1] + t * a[h];
    u.push([f, g]);
  }
  return u.push(u[0].slice()), ye([u], i);
}
function rp(n, e, t, i, o, a) {
  const u = [];
  for (let h = 0; h < 6; h++) {
    const f = [];
    f.push(n), f.push([n[0] + e * o[h], n[1] + t * a[h]]), f.push([
      n[0] + e * o[(h + 1) % 6],
      n[1] + t * a[(h + 1) % 6]
    ]), f.push(n), u.push(ye([f], i));
  }
  return u;
}
function Ah(n, e, t = {}) {
  t.mask && !t.units && (t.units = "kilometers");
  for (var i = [], o = n[0], a = n[1], u = n[2], h = n[3], f = e / qe([o, a], [u, a], t), g = f * (u - o), m = e / qe([o, a], [o, h], t), v = m * (h - a), p = u - o, _ = h - a, w = Math.floor(p / g), C = Math.floor(_ / v), b = (p - w * g) / 2, S = (_ - C * v) / 2, I = o + b; I <= u; ) {
    for (var N = a + S; N <= h; ) {
      var A = de([I, N], t.properties);
      t.mask ? Ko(A, t.mask) && i.push(A) : i.push(A), N += v;
    }
    I += g;
  }
  return ce(i);
}
function Rh(n, e, t, i = {}) {
  const o = [], a = n[0], u = n[1], h = n[2], f = n[3], g = h - a, m = Pn(e, i.units, "degrees"), v = f - u, p = Pn(t, i.units, "degrees"), _ = Math.floor(Math.abs(g) / m), w = Math.floor(Math.abs(v) / p), C = (g - _ * m) / 2, b = (v - w * p) / 2;
  let S = a + C;
  for (let I = 0; I < _; I++) {
    let N = u + b;
    for (let A = 0; A < w; A++) {
      const R = ye(
        [
          [
            [S, N],
            [S, N + p],
            [S + m, N + p],
            [S + m, N],
            [S, N]
          ]
        ],
        i.properties
      );
      i.mask ? Yc(i.mask, R) && o.push(R) : o.push(R), N += p;
    }
    S += m;
  }
  return ce(o);
}
function ca(n, e, t = {}) {
  return Rh(n, e, e, t);
}
function Dh(n, e, t = {}) {
  for (var i = [], o = e / qe([n[0], n[1]], [n[2], n[1]], t), a = o * (n[2] - n[0]), u = e / qe([n[0], n[1]], [n[0], n[3]], t), h = u * (n[3] - n[1]), f = 0, g = n[0]; g <= n[2]; ) {
    for (var m = 0, v = n[1]; v <= n[3]; ) {
      var p = null, _ = null;
      f % 2 === 0 && m % 2 === 0 ? (p = ye(
        [
          [
            [g, v],
            [g, v + h],
            [g + a, v],
            [g, v]
          ]
        ],
        t.properties
      ), _ = ye(
        [
          [
            [g, v + h],
            [g + a, v + h],
            [g + a, v],
            [g, v + h]
          ]
        ],
        t.properties
      )) : f % 2 === 0 && m % 2 === 1 ? (p = ye(
        [
          [
            [g, v],
            [g + a, v + h],
            [g + a, v],
            [g, v]
          ]
        ],
        t.properties
      ), _ = ye(
        [
          [
            [g, v],
            [g, v + h],
            [g + a, v + h],
            [g, v]
          ]
        ],
        t.properties
      )) : m % 2 === 0 && f % 2 === 1 ? (p = ye(
        [
          [
            [g, v],
            [g, v + h],
            [g + a, v + h],
            [g, v]
          ]
        ],
        t.properties
      ), _ = ye(
        [
          [
            [g, v],
            [g + a, v + h],
            [g + a, v],
            [g, v]
          ]
        ],
        t.properties
      )) : m % 2 === 1 && f % 2 === 1 && (p = ye(
        [
          [
            [g, v],
            [g, v + h],
            [g + a, v],
            [g, v]
          ]
        ],
        t.properties
      ), _ = ye(
        [
          [
            [g, v + h],
            [g + a, v + h],
            [g + a, v],
            [g, v + h]
          ]
        ],
        t.properties
      )), t.mask ? (Yr(ce([t.mask, p])) && i.push(p), Yr(ce([t.mask, _])) && i.push(_)) : (i.push(p), i.push(_)), v += h, m++;
    }
    f++, g += a;
  }
  return ce(i);
}
function ip(n, e, t) {
  var i, o, a, u;
  if (t = t || {}, typeof t != "object")
    throw new Error("options is invalid");
  if (!n)
    throw new Error("points is required");
  if (hn(n, "Point", "input must contain Points"), !e)
    throw new Error("cellSize is required");
  var h = (i = t.gridType) != null ? i : "square", f = (o = t.property) != null ? o : "elevation", g = (a = t.weight) != null ? a : 1, m = (u = t.bbox) != null ? u : ze(n);
  if (g !== void 0 && typeof g != "number")
    throw new Error("weight must be a number");
  Fr(m);
  var v;
  switch (h) {
    case "point":
    case "points":
      v = Ah(m, e, t);
      break;
    case "square":
    case "squares":
      v = ca(m, e, t);
      break;
    case "hex":
    case "hexes":
      v = Oh(m, e, t);
      break;
    case "triangle":
    case "triangles":
      v = Dh(m, e, t);
      break;
    default:
      throw new Error("invalid gridType");
  }
  var p = [];
  return Pe(v, function(_) {
    var w, C = 0, b = 0;
    Pe(n, function(I) {
      var N, A = h === "point" ? _ : Dt(_), R = qe(A, I, t), U;
      if (f !== void 0 && (U = (N = I.properties) == null ? void 0 : N[f]), U === void 0 && (U = I.geometry.coordinates[2]), U === void 0)
        throw new Error("zValue is missing");
      R === 0 && (C = U);
      var V = 1 / Math.pow(R, g);
      b += V, C += V * U;
    });
    var S = nt(_);
    (w = S.properties) != null || (S.properties = {}), S.properties[f] = C / b, p.push(S);
  }), ce(p);
}
var sp = Object.defineProperty, _l = Object.getOwnPropertySymbols, op = Object.prototype.hasOwnProperty, ap = Object.prototype.propertyIsEnumerable, wl = (n, e, t) => e in n ? sp(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, xl = (n, e) => {
  for (var t in e || (e = {}))
    op.call(e, t) && wl(n, t, e[t]);
  if (_l)
    for (var t of _l(e))
      ap.call(e, t) && wl(n, t, e[t]);
  return n;
};
function up(n, e = {}) {
  if (!Re(e)) throw new Error("options is invalid");
  const { zProperty: t = "elevation", flip: i = !1, flags: o = !1 } = e;
  hn(n, "Point", "input must contain Points");
  for (var a = lp(n, i), u = [], h = 0; h < a.length; h++) {
    for (var f = a[h], g = [], m = 0; m < f.length; m++) {
      var v = f[m];
      v.properties == null && (v.properties = {}), v.properties[t] ? g.push(v.properties[t]) : g.push(0), o === !0 && (v.properties.matrixPosition = [h, m]);
    }
    u.push(g);
  }
  return u;
}
function lp(n, e) {
  var t = {};
  Pe(n, (o) => {
    var a = ve(o)[1];
    t[a] || (t[a] = []), t[a].push(o);
  });
  const i = [];
  for (const o of Object.values(t))
    i.push(o.sort((a, u) => ve(a)[0] - ve(u)[0]));
  return i.sort(
    e ? (o, a) => ve(o[0])[1] - ve(a[0])[1] : (o, a) => ve(a[0])[1] - ve(o[0])[1]
  ), i;
}
function cp(n, e, t) {
  if (t = t || {}, !Re(t)) throw new Error("options is invalid");
  const i = t.zProperty || "elevation", o = t.commonProperties || {}, a = t.breaksProperties || [];
  if (hn(n, "Point", "Input must contain Points"), !e) throw new Error("breaks is required");
  if (!Array.isArray(e)) throw new Error("breaks is not an Array");
  if (!Re(o))
    throw new Error("commonProperties is not an Object");
  if (!Array.isArray(a))
    throw new Error("breaksProperties is not an Array");
  const u = up(n, { zProperty: i, flip: !0 }), h = u[0].length;
  if (u.length < 2 || h < 2)
    throw new Error("Matrix of points must be at least 2x2");
  for (let m = 1; m < u.length; m++)
    if (u[m].length !== h)
      throw new Error("Matrix of points is not uniform in the x dimension");
  let f = hp(u, e, i);
  f = gp(f, u, n);
  const g = f.map((m, v) => {
    if (a[v] && !Re(a[v]))
      throw new Error("Each mappedProperty is required to be an Object");
    const p = xl(xl({}, o), a[v]);
    return p[i] = m[i], wt(
      m.groupedRings,
      p
    );
  });
  return ce(g);
}
function hp(n, e, t) {
  const i = [];
  let o;
  for (let a = 1; a < e.length; a++) {
    a === 1 && (o = El(n, +e[0]));
    const u = +e[a], h = +e[a - 1], f = El(n, u), g = f.map(
      (_) => (
        // note that we (in-place) reverse the array result of .map and not the original segment itself.
        _.map((w) => [w[0], w[1]]).reverse()
      )
    ), m = fp(o.concat(g), n), v = dp(m), p = vp(v);
    if (p.length === 0 && n[0][0] < u && n[0][0] >= h) {
      const _ = n[0].length, w = n.length;
      p.push([
        [
          [0, 0],
          [_ - 1, 0],
          [_ - 1, w - 1],
          [0, w - 1],
          [0, 0]
        ]
      ]);
    }
    i.push({
      groupedRings: p,
      [t]: h + "-" + u
    }), o = f;
  }
  return i;
}
function El(n, e) {
  const t = [], i = n[0].length, o = n.length;
  for (let u = 0; u < o - 1; u++)
    for (let h = 0; h < i - 1; h++) {
      const f = n[u + 1][h + 1], g = n[u][h + 1], m = n[u][h], v = n[u + 1][h];
      switch ((v >= e ? 8 : 0) | (f >= e ? 4 : 0) | (g >= e ? 2 : 0) | (m >= e ? 1 : 0)) {
        case 0:
          continue;
        case 1:
          t.push([
            [h + a(m, g), u],
            [h, u + a(m, v)]
          ]);
          break;
        case 2:
          t.push([
            [h + 1, u + a(g, f)],
            [h + a(m, g), u]
          ]);
          break;
        case 3:
          t.push([
            [h + 1, u + a(g, f)],
            [h, u + a(m, v)]
          ]);
          break;
        case 4:
          t.push([
            [h + a(v, f), u + 1],
            [h + 1, u + a(g, f)]
          ]);
          break;
        case 5: {
          (v + f + g + m) / 4 >= e ? t.push(
            [
              [h + a(v, f), u + 1],
              [h, u + a(m, v)]
            ],
            [
              [h + a(m, g), u],
              [h + 1, u + a(g, f)]
            ]
          ) : t.push(
            [
              [h + a(v, f), u + 1],
              [h + 1, u + a(g, f)]
            ],
            [
              [h + a(m, g), u],
              [h, u + a(m, v)]
            ]
          );
          break;
        }
        case 6:
          t.push([
            [h + a(v, f), u + 1],
            [h + a(m, g), u]
          ]);
          break;
        case 7:
          t.push([
            [h + a(v, f), u + 1],
            [h, u + a(m, v)]
          ]);
          break;
        case 8:
          t.push([
            [h, u + a(m, v)],
            [h + a(v, f), u + 1]
          ]);
          break;
        case 9:
          t.push([
            [h + a(m, g), u],
            [h + a(v, f), u + 1]
          ]);
          break;
        case 10: {
          (v + f + g + m) / 4 >= e ? t.push(
            [
              [h, u + a(m, v)],
              [h + a(m, g), u]
            ],
            [
              [h + 1, u + a(g, f)],
              [h + a(v, f), u + 1]
            ]
          ) : t.push(
            [
              [h, u + a(m, v)],
              [h + a(v, f), u + 1]
            ],
            [
              [h + 1, u + a(g, f)],
              [h + a(m, g), u]
            ]
          );
          break;
        }
        case 11:
          t.push([
            [h + 1, u + a(g, f)],
            [h + a(v, f), u + 1]
          ]);
          break;
        case 12:
          t.push([
            [h, u + a(m, v)],
            [h + 1, u + a(g, f)]
          ]);
          break;
        case 13:
          t.push([
            [h + a(m, g), u],
            [h + 1, u + a(g, f)]
          ]);
          break;
        case 14:
          t.push([
            [h, u + a(m, v)],
            [h + a(m, g), u]
          ]);
          break;
        case 15:
          continue;
      }
    }
  return t;
  function a(u, h) {
    if (u === h)
      return 0.5;
    let f = (e - u) / (h - u);
    return f > 1 ? 1 : f < 0 ? 0 : f;
  }
}
function fp(n, e) {
  const t = e.length, i = e[0].length, o = [], a = [];
  for (; n.length > 0; ) {
    const u = [...n.shift()];
    o.push(u);
    let h;
    do {
      h = !1;
      for (let f = 0; f < n.length; f++) {
        const g = n[f];
        if (g[0][0] === u[u.length - 1][0] && g[0][1] === u[u.length - 1][1]) {
          h = !0, u.push(g[1]), n.splice(f, 1);
          break;
        }
        if (g[1][0] === u[0][0] && g[1][1] === u[0][1]) {
          h = !0, u.unshift(g[0]), n.splice(f, 1);
          break;
        }
      }
    } while (h);
  }
  for (; o.length > 0; ) {
    const u = o[0];
    if (u[0][0] === u[u.length - 1][0] && u[0][1] === u[u.length - 1][1]) {
      a.push(u), o.shift();
      continue;
    }
    const h = u[u.length - 1];
    let f, g;
    if (h[0] === 0 && h[1] !== 0)
      f = Li(
        o,
        (m) => m[0][0] === 0 && m[0][1] < h[1],
        // left side, below end
        (m, v) => v[0][1] - m[0][1]
        // prefer positions to the top
      ), g = [0, 0];
    else if (h[1] === 0 && h[0] !== i - 1)
      f = Li(
        o,
        (m) => m[0][1] === 0 && m[0][0] > h[0],
        // bottom side, right of end
        (m, v) => m[0][0] - v[0][0]
        // prefer positions to the left
      ), g = [i - 1, 0];
    else if (h[0] === i - 1 && h[1] !== t - 1)
      f = Li(
        o,
        (m) => m[0][0] === i - 1 && m[0][1] > h[1],
        // right side, above end
        (m, v) => m[0][1] - v[0][1]
        // prefer positions to the bottom
      ), g = [i - 1, t - 1];
    else if (h[1] === t - 1 && h[0] !== 0)
      f = Li(
        o,
        (m) => m[0][1] === t - 1 && m[0][0] < h[0],
        // top side, left of end
        (m, v) => v[0][0] - m[0][0]
        // prefer positions to the right
      ), g = [0, t - 1];
    else
      throw new Error("Contour not closed but is not along an edge");
    if (f === -1)
      u.push(g);
    else if (f === 0)
      u.push([u[0][0], u[0][1]]), a.push(u), o.shift();
    else {
      const m = o[f];
      o.splice(f, 1);
      for (const v of m)
        u.push(v);
    }
  }
  for (let u = 0; u < a.length; u++)
    a[u].length < 4 && (a.splice(u, 1), u--);
  return a;
}
function gp(n, e, t) {
  const i = ze(t), o = i[2] - i[0], a = i[3] - i[1], u = i[0], h = i[1], f = e[0].length - 1, g = e.length - 1, m = o / f, v = a / g;
  return n.map(function(p) {
    return p.groupedRings = p.groupedRings.map(
      function(_) {
        return _.map(function(w) {
          return w.map((C) => [
            C[0] * m + u,
            C[1] * v + h
          ]);
        });
      }
    ), p;
  });
}
function dp(n) {
  const e = n.map(function(t) {
    return { ring: t, area: Qr(ye([t])) };
  });
  return e.sort(function(t, i) {
    return i.area - t.area;
  }), e.map(function(t) {
    return t.ring;
  });
}
function vp(n) {
  const e = n.map((i) => ({ lrCoordinates: i, grouped: !1 })), t = [];
  for (; !mp(e); )
    for (let i = 0; i < e.length; i++)
      if (!e[i].grouped) {
        const o = [];
        o.push(e[i].lrCoordinates), e[i].grouped = !0;
        const a = ye([e[i].lrCoordinates]);
        e: for (let u = i + 1; u < e.length; u++)
          if (!e[u].grouped) {
            const h = ye([e[u].lrCoordinates]);
            if (kl(h, a)) {
              for (let f = 1; f < o.length; f++)
                if (kl(h, ye([o[f]])))
                  continue e;
              o.push(e[u].lrCoordinates), e[u].grouped = !0;
            }
          }
        t.push(o);
      }
  return t;
}
function kl(n, e) {
  const t = hs(n);
  for (let i = 0; i < t.features.length; i++)
    if (!xe(t.features[i], e))
      return !1;
  return !0;
}
function mp(n) {
  for (let e = 0; e < n.length; e++)
    if (n[e].grouped === !1)
      return !1;
  return !0;
}
function Li(n, e, t) {
  let i = -1;
  for (let o = 0; o < n.length; o++)
    e(n[o]) && (i === -1 || t(n[i], n[o]) > 0) && (i = o);
  return i;
}
var yp = Object.defineProperty, Cl = Object.getOwnPropertySymbols, pp = Object.prototype.hasOwnProperty, _p = Object.prototype.propertyIsEnumerable, Il = (n, e, t) => e in n ? yp(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Sl = (n, e) => {
  for (var t in e || (e = {}))
    pp.call(e, t) && Il(n, t, e[t]);
  if (Cl)
    for (var t of Cl(e))
      _p.call(e, t) && Il(n, t, e[t]);
  return n;
};
function wp(n, e = {}) {
  if (!Re(e)) throw new Error("options is invalid");
  const { zProperty: t = "elevation", flip: i = !1, flags: o = !1 } = e;
  hn(n, "Point", "input must contain Points");
  for (var a = xp(n, i), u = [], h = 0; h < a.length; h++) {
    for (var f = a[h], g = [], m = 0; m < f.length; m++) {
      var v = f[m];
      v.properties == null && (v.properties = {}), v.properties[t] ? g.push(v.properties[t]) : g.push(0), o === !0 && (v.properties.matrixPosition = [h, m]);
    }
    u.push(g);
  }
  return u;
}
function xp(n, e) {
  var t = {};
  Pe(n, (o) => {
    var a = ve(o)[1];
    t[a] || (t[a] = []), t[a].push(o);
  });
  const i = [];
  for (const o of Object.values(t))
    i.push(o.sort((a, u) => ve(a)[0] - ve(u)[0]));
  return i.sort(
    e ? (o, a) => ve(o[0])[1] - ve(a[0])[1] : (o, a) => ve(a[0])[1] - ve(o[0])[1]
  ), i;
}
function Ep(n, e, t) {
  if (t = t || {}, !Re(t)) throw new Error("options is invalid");
  const i = t.zProperty || "elevation", o = t.commonProperties || {}, a = t.breaksProperties || [];
  if (hn(n, "Point", "Input must contain Points"), !e) throw new Error("breaks is required");
  if (!Array.isArray(e)) throw new Error("breaks must be an Array");
  if (!Re(o))
    throw new Error("commonProperties must be an Object");
  if (!Array.isArray(a))
    throw new Error("breaksProperties must be an Array");
  const u = wp(n, { zProperty: i, flip: !0 }), h = u[0].length;
  if (u.length < 2 || h < 2)
    throw new Error("Matrix of points must be at least 2x2");
  for (let m = 1; m < u.length; m++)
    if (u[m].length !== h)
      throw new Error("Matrix of points is not uniform in the x dimension");
  const f = kp(
    u,
    e,
    i,
    o,
    a
  ), g = Ip(f, u, n);
  return ce(g);
}
function kp(n, e, t, i, o) {
  const a = [];
  for (let u = 0; u < e.length; u++) {
    const h = +e[u], f = Sl(Sl({}, i), o[u]);
    f[t] = h;
    const g = pn(Cp(n, h), f);
    a.push(g);
  }
  return a;
}
function Cp(n, e) {
  const t = [], i = n.length, o = n[0].length;
  for (let h = 0; h < i - 1; h++)
    for (let f = 0; f < o - 1; f++) {
      const g = n[h + 1][f + 1], m = n[h][f + 1], v = n[h][f], p = n[h + 1][f];
      switch ((p >= e ? 8 : 0) | (g >= e ? 4 : 0) | (m >= e ? 2 : 0) | (v >= e ? 1 : 0)) {
        case 0:
          continue;
        case 1:
          t.push([
            [f + u(v, m), h],
            [f, h + u(v, p)]
          ]);
          break;
        case 2:
          t.push([
            [f + 1, h + u(m, g)],
            [f + u(v, m), h]
          ]);
          break;
        case 3:
          t.push([
            [f + 1, h + u(m, g)],
            [f, h + u(v, p)]
          ]);
          break;
        case 4:
          t.push([
            [f + u(p, g), h + 1],
            [f + 1, h + u(m, g)]
          ]);
          break;
        case 5: {
          (p + g + m + v) / 4 >= e ? t.push(
            [
              [f + u(p, g), h + 1],
              [f, h + u(v, p)]
            ],
            [
              [f + u(v, m), h],
              [f + 1, h + u(m, g)]
            ]
          ) : t.push(
            [
              [f + u(p, g), h + 1],
              [f + 1, h + u(m, g)]
            ],
            [
              [f + u(v, m), h],
              [f, h + u(v, p)]
            ]
          );
          break;
        }
        case 6:
          t.push([
            [f + u(p, g), h + 1],
            [f + u(v, m), h]
          ]);
          break;
        case 7:
          t.push([
            [f + u(p, g), h + 1],
            [f, h + u(v, p)]
          ]);
          break;
        case 8:
          t.push([
            [f, h + u(v, p)],
            [f + u(p, g), h + 1]
          ]);
          break;
        case 9:
          t.push([
            [f + u(v, m), h],
            [f + u(p, g), h + 1]
          ]);
          break;
        case 10: {
          (p + g + m + v) / 4 >= e ? t.push(
            [
              [f, h + u(v, p)],
              [f + u(v, m), h]
            ],
            [
              [f + 1, h + u(m, g)],
              [f + u(p, g), h + 1]
            ]
          ) : t.push(
            [
              [f, h + u(v, p)],
              [f + u(p, g), h + 1]
            ],
            [
              [f + 1, h + u(m, g)],
              [f + u(v, m), h]
            ]
          );
          break;
        }
        case 11:
          t.push([
            [f + 1, h + u(m, g)],
            [f + u(p, g), h + 1]
          ]);
          break;
        case 12:
          t.push([
            [f, h + u(v, p)],
            [f + 1, h + u(m, g)]
          ]);
          break;
        case 13:
          t.push([
            [f + u(v, m), h],
            [f + 1, h + u(m, g)]
          ]);
          break;
        case 14:
          t.push([
            [f, h + u(v, p)],
            [f + u(v, m), h]
          ]);
          break;
        case 15:
          continue;
      }
    }
  const a = [];
  for (; t.length > 0; ) {
    const h = [...t.shift()];
    a.push(h);
    let f;
    do {
      f = !1;
      for (let g = 0; g < t.length; g++) {
        const m = t[g];
        if (m[0][0] === h[h.length - 1][0] && m[0][1] === h[h.length - 1][1]) {
          f = !0, h.push(m[1]), t.splice(g, 1);
          break;
        }
        if (m[1][0] === h[0][0] && m[1][1] === h[0][1]) {
          f = !0, h.unshift(m[0]), t.splice(g, 1);
          break;
        }
      }
    } while (f);
  }
  return a;
  function u(h, f) {
    if (h === f)
      return 0.5;
    let g = (e - h) / (f - h);
    return g > 1 ? 1 : g < 0 ? 0 : g;
  }
}
function Ip(n, e, t) {
  const i = ze(t), o = i[2] - i[0], a = i[3] - i[1], u = i[0], h = i[1], f = e[0].length - 1, g = e.length - 1, m = o / f, v = a / g, p = (_) => {
    _[0] = _[0] * m + u, _[1] = _[1] * v + h;
  };
  return n.forEach((_) => {
    He(_, p);
  }), n;
}
function Sp(n) {
  let e, t;
  const i = {
    type: "FeatureCollection",
    features: []
  };
  if (n.type === "Feature" ? t = n.geometry : t = n, t.type === "LineString")
    e = [t.coordinates];
  else if (t.type === "MultiLineString")
    e = t.coordinates;
  else if (t.type === "MultiPolygon")
    e = [].concat(...t.coordinates);
  else if (t.type === "Polygon")
    e = t.coordinates;
  else
    throw new Error(
      "Input must be a LineString, MultiLineString, Polygon, or MultiPolygon Feature or Geometry"
    );
  return e.forEach((o) => {
    e.forEach((a) => {
      for (let u = 0; u < o.length - 1; u++)
        for (let h = u; h < a.length - 1; h++) {
          if (o === a && (Math.abs(u - h) === 1 || // segments are first and last segment of lineString
          u === 0 && h === o.length - 2 && // lineString is closed
          o[u][0] === o[o.length - 1][0] && o[u][1] === o[o.length - 1][1]))
            continue;
          const f = Mp(
            o[u][0],
            o[u][1],
            o[u + 1][0],
            o[u + 1][1],
            a[h][0],
            a[h][1],
            a[h + 1][0],
            a[h + 1][1]
          );
          f && i.features.push(de([f[0], f[1]]));
        }
    });
  }), i;
}
function Mp(n, e, t, i, o, a, u, h) {
  let f, g, m, v, p;
  const _ = {
    x: null,
    y: null,
    onLine1: !1,
    onLine2: !1
  };
  return f = (h - a) * (t - n) - (u - o) * (i - e), f === 0 ? _.x !== null && _.y !== null ? _ : !1 : (g = e - a, m = n - o, v = (u - o) * g - (h - a) * m, p = (t - n) * g - (i - e) * m, g = v / f, m = p / f, _.x = n + g * (t - n), _.y = e + g * (i - e), g >= 0 && g <= 1 && (_.onLine1 = !0), m >= 0 && m <= 1 && (_.onLine2 = !0), _.onLine1 && _.onLine2 ? [_.x, _.y] : !1);
}
function ha(n, e = {}) {
  return rs(
    n,
    (t, i) => {
      const o = i.geometry.coordinates;
      return t + qe(o[0], o[1], e);
    },
    0
  );
}
function Fh(n, e, t, i, o = {}) {
  const a = o.steps || 64, u = Ml(t), h = Ml(i), f = !Array.isArray(n) && n.type === "Feature" ? n.properties : {};
  if (u === h)
    return Se(
      ta(n, e, o).geometry.coordinates[0],
      f
    );
  const g = u, m = u < h ? h : h + 360, v = [], p = (m - g) / a;
  for (let _ = 0; _ <= a; _++) {
    const w = _ === a ? m : g + _ * p;
    v.push(
      Qt(n, e, w, o).geometry.coordinates
    );
  }
  return Se(v, f);
}
function Ml(n) {
  let e = n % 360;
  return e < 0 && (e += 360), e;
}
function Bh(n, e, t, i = {}) {
  if (!Re(i)) throw new Error("options is invalid");
  const { units: o = "kilometers" } = i;
  var a, u = [];
  if (n.type === "Feature") a = n.geometry.coordinates;
  else if (n.type === "LineString") a = n.coordinates;
  else throw new Error("input must be a LineString Feature or Geometry");
  const h = a.length;
  let f = 0, g, m, v;
  for (let _ = 0; _ < a.length && !(e >= f && _ === a.length - 1); _++) {
    if (f > e && u.length === 0) {
      let w = e - f;
      if (!w)
        return u.push(a[_]), Se(u);
      m = ln(a[_], a[_ - 1]) - 180, v = Qt(a[_], w, m, { units: o }), u.push(v.geometry.coordinates);
    }
    if (f >= t)
      return g = t - f, g ? (m = ln(a[_], a[_ - 1]) - 180, v = Qt(a[_], g, m, { units: o }), u.push(v.geometry.coordinates), Se(u)) : (u.push(a[_]), Se(u));
    if (f >= e && u.push(a[_]), _ === a.length - 1)
      return Se(u);
    f += qe(a[_], a[_ + 1], { units: o });
  }
  if (f < e && a.length === h)
    throw new Error("Start position is beyond line");
  var p = a[a.length - 1];
  return Se([p, p]);
}
function bp(n, e, t = {}) {
  if (!Re(t)) throw new Error("options is invalid");
  const { units: i = "kilometers", reverse: o = !1 } = t;
  if (!n) throw new Error("geojson is required");
  if (e <= 0)
    throw new Error("segmentLength must be greater than 0");
  const a = [];
  return it(n, (u) => {
    o && (u.geometry.coordinates = u.geometry.coordinates.reverse()), Pp(
      u,
      e,
      i,
      (h) => {
        a.push(h);
      }
    );
  }), ce(a);
}
function Pp(n, e, t, i) {
  var o = ha(n, { units: t });
  if (o <= e)
    return i(n);
  var a = o / e;
  Number.isInteger(a) || (a = Math.floor(a) + 1);
  for (var u = 0; u < a; u++) {
    var h = Bh(
      n,
      e * u,
      e * (u + 1),
      { units: t }
    );
    i(h);
  }
}
function Qi(n) {
  var e = n[0], t = n[1];
  return [t[0] - e[0], t[1] - e[1]];
}
function Io(n, e) {
  return n[0] * e[1] - e[0] * n[1];
}
function Lp(n, e) {
  return [n[0] + e[0], n[1] + e[1]];
}
function Np(n, e) {
  return [n[0] - e[0], n[1] - e[1]];
}
function Tp(n, e) {
  return [n * e[0], n * e[1]];
}
function Op(n, e) {
  var t = n[0], i = Qi(n), o = e[0], a = Qi(e), u = Io(i, a), h = Np(o, t), f = Io(h, a), g = f / u, m = Lp(t, Tp(g, i));
  return m;
}
function Ap(n, e) {
  var t = Qi(n), i = Qi(e);
  return Io(t, i) === 0;
}
function Rp(n, e) {
  return Ap(n, e) ? !1 : Op(n, e);
}
function Dp(n, e, t = {}) {
  if (t = t || {}, !Re(t)) throw new Error("options is invalid");
  const { units: i = "kilometers" } = t;
  if (!n) throw new Error("geojson is required");
  if (e == null || isNaN(e))
    throw new Error("distance is required");
  var o = xt(n), a = n.type === "Feature" ? n.properties : {};
  switch (o) {
    case "LineString":
      return bl(n, e, i);
    case "MultiLineString":
      var u = [];
      return it(n, function(h) {
        u.push(
          bl(h, e, i).geometry.coordinates
        );
      }), pn(u, a);
    default:
      throw new Error("geometry " + o + " is not supported");
  }
}
function bl(n, e, t) {
  var i = [], o = Kr(e, t), a = ve(n), u = [];
  return a.forEach(function(h, f) {
    if (f !== a.length - 1) {
      var g = Fp(
        h,
        a[f + 1],
        o
      );
      if (i.push(g), f > 0) {
        var m = i[f - 1], v = Rp(g, m);
        v !== !1 && (m[1] = v, g[0] = v), u.push(m[0]), f === a.length - 2 && (u.push(g[0]), u.push(g[1]));
      }
      a.length === 2 && (u.push(g[0]), u.push(g[1]));
    }
  }), Se(
    u,
    n.type === "Feature" ? n.properties : {}
  );
}
function Fp(n, e, t) {
  var i = Math.sqrt(
    (n[0] - e[0]) * (n[0] - e[0]) + (n[1] - e[1]) * (n[1] - e[1])
  ), o = n[0] + t * (e[1] - n[1]) / i, a = e[0] + t * (e[1] - n[1]) / i, u = n[1] + t * (n[0] - e[0]) / i, h = e[1] + t * (n[0] - e[0]) / i;
  return [
    [o, u],
    [a, h]
  ];
}
function Bp(n, e, t) {
  const i = ve(t);
  if (xt(t) !== "LineString")
    throw new Error("line must be a LineString");
  const o = on(t, n), a = on(t, e);
  Pl(t, o), Pl(t, a);
  const u = o.properties.segmentIndex <= a.properties.segmentIndex ? [o, a] : [a, o], h = [u[0].geometry.coordinates];
  for (let f = u[0].properties.segmentIndex + 1; f < u[1].properties.segmentIndex + 1; f++)
    h.push(i[f]);
  return h.push(u[1].geometry.coordinates), Se(h, t.type === "Feature" ? t.properties : {});
}
function Pl(n, e) {
  let t = n.type === "Feature" ? n.geometry : n;
  e.properties.segmentIndex >= t.coordinates.length - 1 && (e.properties.segmentIndex = t.coordinates.length - 2);
}
function Gp(n, e = {}) {
  var t, i, o, a = e.properties, u = (t = e.autoComplete) != null ? t : !0, h = (i = e.orderCoords) != null ? i : !0, f = (o = e.mutate) != null ? o : !1;
  switch (f || (n = nt(n)), n.type) {
    case "FeatureCollection":
      var g = [];
      return n.features.forEach(function(m) {
        g.push(
          ve(Ll(m, {}, u, h))
        );
      }), wt(g, a);
    default:
      return Ll(n, a, u, h);
  }
}
function Ll(n, e, t, i) {
  e = e || (n.type === "Feature" ? n.properties : {});
  var o = Ue(n), a = o.coordinates, u = o.type;
  if (!a.length) throw new Error("line must contain coordinates");
  switch (u) {
    case "LineString":
      return t && (a = Nl(a)), ye([a], e);
    case "MultiLineString":
      var h = [], f = 0;
      return a.forEach(function(g) {
        if (t && (g = Nl(g)), i) {
          var m = qp(ze(Se(g)));
          m > f ? (h.unshift(g), f = m) : h.push(g);
        } else
          h.push(g);
      }), ye(h, e);
    default:
      throw new Error("geometry type " + u + " is not supported");
  }
}
function Nl(n) {
  var e = n[0], t = e[0], i = e[1], o = n[n.length - 1], a = o[0], u = o[1];
  return (t !== a || i !== u) && n.push(e), n;
}
function qp(n) {
  var e = n[0], t = n[1], i = n[2], o = n[3];
  return Math.abs(e - i) * Math.abs(t - o);
}
function zp(n, e, t) {
  var i;
  const o = (i = t == null ? void 0 : t.mutate) != null ? i : !1;
  let a = e;
  e && o === !1 && (a = nt(e));
  const u = Up(a);
  let h = null;
  return n.type === "FeatureCollection" ? h = Yp(n) : n.type === "Feature" ? h = So(
    yn(n.geometry.coordinates)
  ) : h = So(
    yn(n.coordinates)
  ), h.geometry.coordinates.forEach(function(f) {
    u.geometry.coordinates.push(f[0]);
  }), u;
}
function Yp(n) {
  const e = n.features.length === 2 ? yn(
    n.features[0].geometry.coordinates,
    n.features[1].geometry.coordinates
  ) : yn.apply(
    Xy,
    n.features.map(function(t) {
      return t.geometry.coordinates;
    })
  );
  return So(e);
}
function So(n) {
  return wt(n);
}
function Up(n) {
  let t = [
    [
      [180, 90],
      [-180, 90],
      [-180, -90],
      [180, -90],
      [180, 90]
    ]
  ];
  return n && (n.type === "Feature" ? t = n.geometry.coordinates : t = n.coordinates), ye(t);
}
function Xp(n, e) {
  const t = qe(n, e), i = ln(n, e);
  return Qt(n, t / 2, i);
}
function Vp(n, e) {
  var t, i;
  const o = e.inputField, a = e.threshold || 1e5, u = e.p || 2, h = (t = e.binary) != null ? t : !1, f = e.alpha || -1, g = (i = e.standardization) != null ? i : !0, m = Ph(n, {
    alpha: f,
    binary: h,
    p: u,
    standardization: g,
    threshold: a
  }), v = [];
  Pe(n, (T) => {
    const D = T.properties || {};
    v.push(D[o]);
  });
  const p = Gh(v), _ = Hp(v);
  let w = 0, C = 0, b = 0, S = 0;
  const I = m.length;
  for (let T = 0; T < I; T++) {
    let D = 0;
    for (let B = 0; B < I; B++)
      w += m[T][B] * (v[T] - p) * (v[B] - p), C += m[T][B], b += Math.pow(m[T][B] + m[B][T], 2), D += m[T][B] + m[B][T];
    S += Math.pow(D, 2);
  }
  b = 0.5 * b;
  const N = w / C / _, A = -1 / (I - 1), R = I * I * b - I * S + 3 * (C * C), U = (I - 1) * (I + 1) * (C * C), V = R / U - A * A, k = Math.sqrt(V), M = (N - A) / k;
  return {
    expectedMoranIndex: A,
    moranIndex: N,
    stdNorm: k,
    zNorm: M
  };
}
function Gh(n) {
  let e = 0;
  for (const t of n)
    e += t;
  return e / n.length;
}
function Hp(n) {
  const e = Gh(n);
  let t = 0;
  for (const i of n)
    t += Math.pow(i - e, 2);
  return t / n.length;
}
var Wp = Object.defineProperty, $p = Object.defineProperties, Zp = Object.getOwnPropertyDescriptors, Tl = Object.getOwnPropertySymbols, Kp = Object.prototype.hasOwnProperty, Qp = Object.prototype.propertyIsEnumerable, Ol = (n, e, t) => e in n ? Wp(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Al = (n, e) => {
  for (var t in e || (e = {}))
    Kp.call(e, t) && Ol(n, t, e[t]);
  if (Tl)
    for (var t of Tl(e))
      Qp.call(e, t) && Ol(n, t, e[t]);
  return n;
}, Rl = (n, e) => $p(n, Zp(e));
function fs(n, e, t = {}) {
  if (!n) throw new Error("targetPoint is required");
  if (!e) throw new Error("points is required");
  let i = 1 / 0, o = 0;
  Pe(e, (u, h) => {
    const f = qe(n, u, t);
    f < i && (o = h, i = f);
  });
  const a = nt(e.features[o]);
  return Rl(Al({}, a), {
    properties: Rl(Al({}, a.properties), {
      featureIndex: o,
      distanceToPoint: i
    })
  });
}
function Jp(n, e) {
  e = e || {};
  const t = e.studyArea || Jr(ze(n)), i = e.properties || {}, o = e.units || "kilometers", a = [];
  Pe(n, (v) => {
    a.push(Dt(v));
  });
  const u = a.length, h = a.map((v, p) => {
    const _ = ce(
      a.filter((w, C) => C !== p)
    );
    return qe(
      v,
      fs(v, _).geometry.coordinates,
      { units: o }
    );
  }).reduce((v, p) => v + p, 0) / u, f = u / Fo(Qr(t), "meters", o), g = 1 / (2 * Math.sqrt(f)), m = 0.26136 / Math.sqrt(u * f);
  return i.nearestNeighborAnalysis = {
    units: o,
    arealUnits: o + "²",
    observedMeanDistance: h,
    expectedMeanDistance: g,
    nearestNeighborIndex: h / g,
    numberOfPoints: u,
    zScore: (h - g) / m
  }, t.properties = i, t;
}
function fa(n, e, t = {}) {
  var i, o;
  const a = (i = t.method) != null ? i : "geodesic", u = (o = t.units) != null ? o : "kilometers";
  if (!n)
    throw new Error("pt is required");
  if (Array.isArray(n) ? n = de(n) : n.type === "Point" ? n = Qe(n) : Br(n, "Point", "point"), !e)
    throw new Error("line is required");
  Array.isArray(e) ? e = Se(e) : e.type === "LineString" ? e = Qe(e) : Br(e, "LineString", "line");
  let h = 1 / 0;
  const f = n.geometry.coordinates;
  return $t(e, (g) => {
    if (g) {
      const m = g.geometry.coordinates[0], v = g.geometry.coordinates[1], p = jp(f, m, v, { method: a });
      p < h && (h = p);
    }
  }), Pn(h, "degrees", u);
}
function jp(n, e, t, i) {
  if (i.method === "geodesic")
    return on(Se([e, t]).geometry, n, {
      units: "degrees"
    }).properties.pointDistance;
  const o = [t[0] - e[0], t[1] - e[1]], a = [n[0] - e[0], n[1] - e[1]], u = Dl(a, o);
  if (u <= 0)
    return Zn(n, e, { units: "degrees" });
  const h = Dl(o, o);
  if (h <= u)
    return Zn(n, t, { units: "degrees" });
  const f = u / h, g = [e[0] + f * o[0], e[1] + f * o[1]];
  return Zn(n, g, { units: "degrees" });
}
function Dl(n, e) {
  return n[0] * e[0] + n[1] * e[1];
}
var e0 = Object.defineProperty, Fl = Object.getOwnPropertySymbols, t0 = Object.prototype.hasOwnProperty, n0 = Object.prototype.propertyIsEnumerable, Bl = (n, e, t) => e in n ? e0(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, so = (n, e) => {
  for (var t in e || (e = {}))
    t0.call(e, t) && Bl(n, t, e[t]);
  if (Fl)
    for (var t of Fl(e))
      n0.call(e, t) && Bl(n, t, e[t]);
  return n;
};
function r0(n, e, t = {}) {
  const i = t.units, o = t.properties || {}, a = i0(n);
  if (!a.features.length)
    throw new Error("points must contain features");
  if (!e)
    throw new Error("line is required");
  if (xt(e) !== "LineString")
    throw new Error("line must be a LineString");
  let u = 1 / 0, h = null;
  return Pe(a, (f) => {
    const g = fa(f, e, { units: i });
    g < u && (u = g, h = f);
  }), h && (h.properties = so(so(so({}, { dist: u }), h.properties), o)), h;
}
function i0(n) {
  const e = [];
  switch (n.geometry ? n.geometry.type : n.type) {
    case "GeometryCollection":
      return at(n, (i) => {
        i.type === "Point" && e.push({ type: "Feature", properties: {}, geometry: i });
      }), { type: "FeatureCollection", features: e };
    case "FeatureCollection":
      return n.features = n.features.filter((i) => i.geometry.type === "Point"), n;
    default:
      throw new Error("points must be a Point Collection");
  }
}
function s0(n, e) {
  const t = be(n), a = Ue(e).coordinates[0];
  if (a.length < 4)
    throw new Error("OuterRing of a Polygon must have 4 or more Positions.");
  const u = e.type === "Feature" && e.properties || {}, h = u.a, f = u.b, g = u.c, m = t[0], v = t[1], p = a[0][0], _ = a[0][1], w = h !== void 0 ? h : a[0][2], C = a[1][0], b = a[1][1], S = f !== void 0 ? f : a[1][2], I = a[2][0], N = a[2][1], A = g !== void 0 ? g : a[2][2];
  return (A * (m - p) * (v - b) + w * (m - C) * (v - N) + S * (m - I) * (v - _) - S * (m - p) * (v - N) - A * (m - C) * (v - _) - w * (m - I) * (v - b)) / ((m - p) * (v - b) + (m - C) * (v - N) + (m - I) * (v - _) - (m - p) * (v - N) - (m - C) * (v - _) - (m - I) * (v - b));
}
function o0(n) {
  const e = a0(n), t = os(e);
  let i = !1, o = 0;
  for (; !i && o < e.features.length; ) {
    const a = e.features[o].geometry;
    let u, h, f, g, m, v, p = !1;
    if (a.type === "Point")
      t.geometry.coordinates[0] === a.coordinates[0] && t.geometry.coordinates[1] === a.coordinates[1] && (i = !0);
    else if (a.type === "MultiPoint") {
      let _ = !1, w = 0;
      for (; !_ && w < a.coordinates.length; )
        t.geometry.coordinates[0] === a.coordinates[w][0] && t.geometry.coordinates[1] === a.coordinates[w][1] && (i = !0, _ = !0), w++;
    } else if (a.type === "LineString") {
      let _ = 0;
      for (; !p && _ < a.coordinates.length - 1; )
        u = t.geometry.coordinates[0], h = t.geometry.coordinates[1], f = a.coordinates[_][0], g = a.coordinates[_][1], m = a.coordinates[_ + 1][0], v = a.coordinates[_ + 1][1], Gl(u, h, f, g, m, v) && (p = !0, i = !0), _++;
    } else if (a.type === "MultiLineString") {
      let _ = 0;
      for (; _ < a.coordinates.length; ) {
        p = !1;
        let w = 0;
        const C = a.coordinates[_];
        for (; !p && w < C.length - 1; )
          u = t.geometry.coordinates[0], h = t.geometry.coordinates[1], f = C[w][0], g = C[w][1], m = C[w + 1][0], v = C[w + 1][1], Gl(u, h, f, g, m, v) && (p = !0, i = !0), w++;
        _++;
      }
    } else (a.type === "Polygon" || a.type === "MultiPolygon") && xe(t, a) && (i = !0);
    o++;
  }
  if (i)
    return t;
  {
    const a = ce([]);
    for (let u = 0; u < e.features.length; u++)
      a.features = a.features.concat(
        hs(e.features[u]).features
      );
    return de(fs(t, a).geometry.coordinates);
  }
}
function a0(n) {
  return n.type !== "FeatureCollection" ? n.type !== "Feature" ? ce([Qe(n)]) : ce([n]) : n;
}
function Gl(n, e, t, i, o, a) {
  const u = Math.sqrt((o - t) * (o - t) + (a - i) * (a - i)), h = Math.sqrt((n - t) * (n - t) + (e - i) * (e - i)), f = Math.sqrt((o - n) * (o - n) + (a - e) * (a - e));
  return u === h + f;
}
function qh(n, e) {
  const t = [];
  return Pe(n, function(i) {
    let o = !1;
    if (i.geometry.type === "Point")
      at(e, function(u) {
        xe(i, u) && (o = !0);
      }), o && t.push(i);
    else if (i.geometry.type === "MultiPoint") {
      var a = [];
      at(e, function(u) {
        He(i, function(h) {
          xe(h, u) && (o = !0, a.push(h));
        });
      }), o && t.push(
        $r(a, i.properties)
      );
    } else
      throw new Error("Input geometry must be a Point or MultiPoint");
  }), ce(t);
}
function Mo(n, e, t = {}) {
  var i, o;
  const a = (i = t.method) != null ? i : "geodesic", u = (o = t.units) != null ? o : "kilometers";
  if (!n) throw new Error("point is required");
  if (!e)
    throw new Error("polygon or multi-polygon is required");
  const h = Ue(e);
  if (h.type === "MultiPolygon") {
    const m = h.coordinates.map(
      (v) => Mo(n, ye(v), { method: a, units: u })
    );
    return Math.min(...m.map(Math.abs)) * (xe(n, e) ? -1 : 1);
  }
  if (h.coordinates.length > 1) {
    const [m, ...v] = h.coordinates.map(
      (_) => Mo(n, ye([_]), { method: a, units: u })
    );
    if (m >= 0) return m;
    const p = Math.min(...v);
    return p < 0 ? Math.abs(p) : Math.max(p * -1, m);
  }
  const f = er(h);
  let g = 1 / 0;
  return it(f, (m) => {
    g = Math.min(
      g,
      fa(n, m, {
        method: a,
        units: u
      })
    );
  }), xe(n, h) ? -g : g;
}
function u0(n) {
  return (n > 0) - (n < 0) || +n;
}
function ga(n, e, t) {
  const i = e[0] - n[0], o = e[1] - n[1], a = t[0] - e[0], u = t[1] - e[1];
  return u0(i * u - a * o);
}
function l0(n, e) {
  const t = n.geometry.coordinates[0].map((u) => u[0]), i = n.geometry.coordinates[0].map((u) => u[1]), o = e.geometry.coordinates[0].map((u) => u[0]), a = e.geometry.coordinates[0].map((u) => u[1]);
  return Math.max.apply(null, t) === Math.max.apply(null, o) && Math.max.apply(null, i) === Math.max.apply(null, a) && Math.min.apply(null, t) === Math.min.apply(null, o) && Math.min.apply(null, i) === Math.min.apply(null, a);
}
function ql(n, e) {
  return e.geometry.coordinates[0].every(
    (t) => xe(de(t), n)
  );
}
function c0(n, e) {
  return n[0] === e[0] && n[1] === e[1];
}
var h0 = class {
  constructor(e, t) {
    this.id = e, this.coordinates = t, this.innerEdges = [], this.outerEdges = [], this.outerEdgesSorted = !1;
  }
  removeInnerEdge(e) {
    this.innerEdges = this.innerEdges.filter((t) => t.from.id !== e.from.id);
  }
  removeOuterEdge(e) {
    this.outerEdges = this.outerEdges.filter((t) => t.to.id !== e.to.id);
  }
  /**
   * Outer edges are stored CCW order.
   *
   * @memberof Node
   * @param {Edge} edge - Edge to add as an outerEdge.
   */
  addOuterEdge(e) {
    this.outerEdges.push(e), this.outerEdgesSorted = !1;
  }
  /**
   * Sorts outer edges in CCW way.
   *
   * @memberof Node
   * @private
   */
  sortOuterEdges() {
    this.outerEdgesSorted || (this.outerEdges.sort((e, t) => {
      const i = e.to, o = t.to;
      if (i.coordinates[0] - this.coordinates[0] >= 0 && o.coordinates[0] - this.coordinates[0] < 0)
        return 1;
      if (i.coordinates[0] - this.coordinates[0] < 0 && o.coordinates[0] - this.coordinates[0] >= 0)
        return -1;
      if (i.coordinates[0] - this.coordinates[0] === 0 && o.coordinates[0] - this.coordinates[0] === 0)
        return i.coordinates[1] - this.coordinates[1] >= 0 || o.coordinates[1] - this.coordinates[1] >= 0 ? i.coordinates[1] - o.coordinates[1] : o.coordinates[1] - i.coordinates[1];
      const a = ga(
        this.coordinates,
        i.coordinates,
        o.coordinates
      );
      if (a < 0) return 1;
      if (a > 0) return -1;
      const u = Math.pow(i.coordinates[0] - this.coordinates[0], 2) + Math.pow(i.coordinates[1] - this.coordinates[1], 2), h = Math.pow(o.coordinates[0] - this.coordinates[0], 2) + Math.pow(o.coordinates[1] - this.coordinates[1], 2);
      return u - h;
    }), this.outerEdgesSorted = !0);
  }
  /**
   * Retrieves outer edges.
   *
   * They are sorted if they aren't in the CCW order.
   *
   * @memberof Node
   * @returns {Edge[]} - List of outer edges sorted in a CCW order.
   */
  getOuterEdges() {
    return this.sortOuterEdges(), this.outerEdges;
  }
  getOuterEdge(e) {
    return this.sortOuterEdges(), this.outerEdges[e];
  }
  addInnerEdge(e) {
    this.innerEdges.push(e);
  }
}, f0 = class zh {
  /**
   * Creates or get the symetric Edge.
   *
   * @returns {Edge} - Symetric Edge.
   */
  getSymetric() {
    return this.symetric || (this.symetric = new zh(this.to, this.from), this.symetric.symetric = this), this.symetric;
  }
  /**
   * @param {Node} from - start node of the Edge
   * @param {Node} to - end node of the edge
   */
  constructor(e, t) {
    this.from = e, this.to = t, this.next = void 0, this.label = void 0, this.symetric = void 0, this.ring = void 0, this.from.addOuterEdge(this), this.to.addInnerEdge(this);
  }
  /**
   * Removes edge from from and to nodes.
   */
  deleteEdge() {
    this.from.removeOuterEdge(this), this.to.removeInnerEdge(this);
  }
  /**
   * Compares Edge equallity.
   *
   * An edge is equal to another, if the from and to nodes are the same.
   *
   * @param {Edge} edge - Another Edge
   * @returns {boolean} - True if Edges are equal, False otherwise
   */
  isEqual(e) {
    return this.from.id === e.from.id && this.to.id === e.to.id;
  }
  toString() {
    return `Edge { ${this.from.id} -> ${this.to.id} }`;
  }
  /**
   * Returns a LineString representation of the Edge
   *
   * @returns {Feature<LineString>} - LineString representation of the Edge
   */
  toLineString() {
    return Se([this.from.coordinates, this.to.coordinates]);
  }
  /**
   * Comparator of two edges.
   *
   * Implementation of geos::planargraph::DirectedEdge::compareTo.
   *
   * @param {Edge} edge - Another edge to compare with this one
   * @returns {number} -1 if this Edge has a greater angle with the positive x-axis than b,
   *          0 if the Edges are colinear,
   *          1 otherwise
   */
  compareTo(e) {
    return ga(
      e.from.coordinates,
      e.to.coordinates,
      this.to.coordinates
    );
  }
}, Yh = class {
  constructor() {
    this.edges = [], this.polygon = void 0, this.envelope = void 0;
  }
  /**
   * Add an edge to the ring, inserting it in the last position.
   *
   * @memberof EdgeRing
   * @param {Edge} edge - Edge to be inserted
   */
  push(n) {
    this.edges.push(n), this.polygon = this.envelope = void 0;
  }
  /**
   * Get Edge.
   *
   * @memberof EdgeRing
   * @param {number} i - Index
   * @returns {Edge} - Edge in the i position
   */
  get(n) {
    return this.edges[n];
  }
  /**
   * Getter of length property.
   *
   * @memberof EdgeRing
   * @returns {number} - Length of the edge ring.
   */
  get length() {
    return this.edges.length;
  }
  /**
   * Similar to Array.prototype.forEach for the list of Edges in the EdgeRing.
   *
   * @memberof EdgeRing
   * @param {Function} f - The same function to be passed to Array.prototype.forEach
   */
  forEach(n) {
    this.edges.forEach(n);
  }
  /**
   * Similar to Array.prototype.map for the list of Edges in the EdgeRing.
   *
   * @memberof EdgeRing
   * @param {Function} f - The same function to be passed to Array.prototype.map
   * @returns {Array} - The mapped values in the function
   */
  map(n) {
    return this.edges.map(n);
  }
  /**
   * Similar to Array.prototype.some for the list of Edges in the EdgeRing.
   *
   * @memberof EdgeRing
   * @param {Function} f - The same function to be passed to Array.prototype.some
   * @returns {boolean} - True if an Edge check the condition
   */
  some(n) {
    return this.edges.some(n);
  }
  /**
   * Check if the ring is valid in geomtry terms.
   *
   * A ring must have either 0 or 4 or more points. The first and the last must be
   * equal (in 2D)
   * geos::geom::LinearRing::validateConstruction
   *
   * @memberof EdgeRing
   * @returns {boolean} - Validity of the EdgeRing
   */
  isValid() {
    return !0;
  }
  /**
   * Tests whether this ring is a hole.
   *
   * A ring is a hole if it is oriented counter-clockwise.
   * Similar implementation of geos::algorithm::CGAlgorithms::isCCW
   *
   * @memberof EdgeRing
   * @returns {boolean} - true: if it is a hole
   */
  isHole() {
    const n = this.edges.reduce((o, a, u) => (a.from.coordinates[1] > this.edges[o].from.coordinates[1] && (o = u), o), 0), e = (n === 0 ? this.length : n) - 1, t = (n + 1) % this.length, i = ga(
      this.edges[e].from.coordinates,
      this.edges[n].from.coordinates,
      this.edges[t].from.coordinates
    );
    return i === 0 ? this.edges[e].from.coordinates[0] > this.edges[t].from.coordinates[0] : i > 0;
  }
  /**
   * Creates a MultiPoint representing the EdgeRing (discarts edges directions).
   *
   * @memberof EdgeRing
   * @returns {Feature<MultiPoint>} - Multipoint representation of the EdgeRing
   */
  toMultiPoint() {
    return $r(this.edges.map((n) => n.from.coordinates));
  }
  /**
   * Creates a Polygon representing the EdgeRing.
   *
   * @memberof EdgeRing
   * @returns {Feature<Polygon>} - Polygon representation of the Edge Ring
   */
  toPolygon() {
    if (this.polygon) return this.polygon;
    const n = this.edges.map((e) => e.from.coordinates);
    return n.push(this.edges[0].from.coordinates), this.polygon = ye([n]);
  }
  /**
   * Calculates the envelope of the EdgeRing.
   *
   * @memberof EdgeRing
   * @returns {Feature<Polygon>} - envelope
   */
  getEnvelope() {
    return this.envelope ? this.envelope : this.envelope = Th(this.toPolygon());
  }
  /**
   * `geos::operation::polygonize::EdgeRing::findEdgeRingContaining`
   *
   * @param {EdgeRing} testEdgeRing - EdgeRing to look in the list
   * @param {EdgeRing[]} shellList - List of EdgeRing in which to search
   *
   * @returns {EdgeRing} - EdgeRing which contains the testEdgeRing
   */
  static findEdgeRingContaining(n, e) {
    const t = n.getEnvelope();
    let i, o;
    return e.forEach((a) => {
      const u = a.getEnvelope();
      if (o && (i = o.getEnvelope()), !l0(u, t) && ql(u, t)) {
        const h = n.map(
          (g) => g.from.coordinates
        );
        let f;
        for (const g of h)
          a.some((m) => c0(g, m.from.coordinates)) || (f = g);
        f && a.inside(de(f)) && (!o || ql(i, u)) && (o = a);
      }
    }), o;
  }
  /**
   * Checks if the point is inside the edgeRing
   *
   * @param {Feature<Point>} pt - Point to check if it is inside the edgeRing
   * @returns {boolean} - True if it is inside, False otherwise
   */
  inside(n) {
    return xe(n, this.toPolygon());
  }
};
function g0(n) {
  if (!n) throw new Error("No geojson passed");
  if (n.type !== "FeatureCollection" && n.type !== "GeometryCollection" && n.type !== "MultiLineString" && n.type !== "LineString" && n.type !== "Feature")
    throw new Error(
      `Invalid input type '${n.type}'. Geojson must be FeatureCollection, GeometryCollection, LineString, MultiLineString or Feature`
    );
}
var d0 = class Uh {
  constructor() {
    this.nodes = /* @__PURE__ */ new Map(), this.nodeId = 0, this.edges = /* @__PURE__ */ new Map();
  }
  // Map<from, Map<to, Edge>>
  /**
   * Creates a graph from a GeoJSON.
   *
   * @param {FeatureCollection<LineString>} geoJson - it must comply with the restrictions detailed in the index
   * @returns {Graph} - The newly created graph
   * @throws {Error} if geoJson is invalid.
   */
  static fromGeoJson(e) {
    g0(e);
    const t = new Uh();
    return it(e, (i) => {
      Br(i, "LineString", "Graph::fromGeoJson"), Go(i, (o, a) => {
        if (o) {
          const u = t.getNode(o), h = t.getNode(a);
          t.addEdge(u, h);
        }
        return a;
      });
    }), t;
  }
  /**
   * Creates or get a Node.
   *
   * @param {number[]} coordinates - Coordinates of the node
   * @returns {Node} - The created or stored node
   */
  getNode(e) {
    var t;
    let i = (t = this.nodes.get(e[0])) == null ? void 0 : t.get(e[1]);
    if (i == null) {
      const o = new h0(this.nodeId++, e);
      let a = this.nodes.get(e[0]);
      return a == null && (a = /* @__PURE__ */ new Map(), this.nodes.set(e[0], a)), a.set(e[1], o), o;
    }
    return i;
  }
  /**
   * Adds an Edge and its symetricall.
   *
   * Edges are added symetrically, i.e.: we also add its symetric
   *
   * @param {Node} from - Node which starts the Edge
   * @param {Node} to - Node which ends the Edge
   */
  addEdge(e, t) {
    var i;
    if ((i = this.edges.get(e)) != null && i.has(t))
      return;
    const o = new f0(e, t), a = o.getSymetric();
    let u = this.edges.get(e);
    u == null && (u = /* @__PURE__ */ new Map(), this.edges.set(e, u)), u.set(t, o);
    let h = this.edges.get(t);
    h == null && (h = /* @__PURE__ */ new Map(), this.edges.set(t, h)), h.set(e, a);
  }
  /**
   * Removes Dangle Nodes (nodes with grade 1).
   */
  deleteDangles() {
    this._forEachNode((e) => this._removeIfDangle(e));
  }
  /**
   * Check if node is dangle, if so, remove it.
   *
   * It calls itself recursively, removing a dangling node might cause another dangling node
   *
   * @param {Node} node - Node to check if it's a dangle
   */
  _removeIfDangle(e) {
    if (e.innerEdges.length <= 1) {
      const t = e.getOuterEdges().map((i) => i.to);
      this.removeNode(e), t.forEach((i) => this._removeIfDangle(i));
    }
  }
  /**
   * Delete cut-edges (bridge edges).
   *
   * The graph will be traversed, all the edges will be labeled according the ring
   * in which they are. (The label is a number incremented by 1). Edges with the same
   * label are cut-edges.
   */
  deleteCutEdges() {
    this._computeNextCWEdges(), this._findLabeledEdgeRings(), this._forEachEdge((e) => {
      e.label === e.symetric.label && (this.removeEdge(e.symetric), this.removeEdge(e));
    });
  }
  /**
   * Set the `next` property of each Edge.
   *
   * The graph will be transversed in a CW form, so, we set the next of the symetrical edge as the previous one.
   * OuterEdges are sorted CCW.
   *
   * @param {Node} [node] - If no node is passed, the function calls itself for every node in the Graph
   */
  _computeNextCWEdges(e) {
    e == null ? this._forEachNode((t) => this._computeNextCWEdges(t)) : e.getOuterEdges().forEach((t, i) => {
      e.getOuterEdge(
        (i === 0 ? e.getOuterEdges().length : i) - 1
      ).symetric.next = t;
    });
  }
  /**
   * Computes the next edge pointers going CCW around the given node, for the given edgering label.
   *
   * This algorithm has the effect of converting maximal edgerings into minimal edgerings
   *
   * XXX: method literally transcribed from `geos::operation::polygonize::PolygonizeGraph::computeNextCCWEdges`,
   * could be written in a more javascript way.
   *
   * @param {Node} node - Node
   * @param {number} label - Ring's label
   */
  _computeNextCCWEdges(e, t) {
    const i = e.getOuterEdges();
    let o, a;
    for (let u = i.length - 1; u >= 0; --u) {
      let h = i[u], f = h.symetric, g, m;
      h.label === t && (g = h), f.label === t && (m = f), !(!g || !m) && (m && (a = m), g && (a && (a.next = g, a = void 0), o || (o = g)));
    }
    a && (a.next = o);
  }
  /**
   * Finds rings and labels edges according to which rings are.
   *
   * The label is a number which is increased for each ring.
   *
   * @returns {Edge[]} edges that start rings
   */
  _findLabeledEdgeRings() {
    const e = [];
    let t = 0;
    return this._forEachEdge((i) => {
      if (i.label >= 0) return;
      e.push(i);
      let o = i;
      do
        o.label = t, o = o.next;
      while (!i.isEqual(o));
      t++;
    }), e;
  }
  /**
   * Computes the EdgeRings formed by the edges in this graph.
   *
   * @returns {EdgeRing[]} - A list of all the EdgeRings in the graph.
   */
  getEdgeRings() {
    this._computeNextCWEdges(), this._forEachEdge((t) => {
      t.label = void 0;
    }), this._findLabeledEdgeRings().forEach((t) => {
      this._findIntersectionNodes(t).forEach((i) => {
        this._computeNextCCWEdges(i, t.label);
      });
    });
    const e = [];
    return this._forEachEdge((t) => {
      t.ring || e.push(this._findEdgeRing(t));
    }), e;
  }
  /**
   * Find all nodes in a Maxima EdgeRing which are self-intersection nodes.
   *
   * @param {Node} startEdge - Start Edge of the Ring
   * @returns {Node[]} - intersection nodes
   */
  _findIntersectionNodes(e) {
    const t = [];
    let i = e;
    do {
      let o = 0;
      i.from.getOuterEdges().forEach((a) => {
        a.label === e.label && ++o;
      }), o > 1 && t.push(i.from), i = i.next;
    } while (!e.isEqual(i));
    return t;
  }
  /**
   * Get the edge-ring which starts from the provided Edge.
   *
   * @param {Edge} startEdge - starting edge of the edge ring
   * @returns {EdgeRing} - EdgeRing which start Edge is the provided one.
   */
  _findEdgeRing(e) {
    let t = e;
    const i = new Yh();
    do
      i.push(t), t.ring = i, t = t.next;
    while (!e.isEqual(t));
    return i;
  }
  /**
   * Removes a node from the Graph.
   *
   * It also removes edges asociated to that node
   * @param {Node} node - Node to be removed
   */
  removeNode(e) {
    var t;
    e.getOuterEdges().forEach((i) => this.removeEdge(i)), e.innerEdges.forEach((i) => this.removeEdge(i)), (t = this.nodes.get(e.coordinates[0])) == null || t.delete(e.coordinates[1]);
  }
  /**
   * Remove edge from the graph and deletes the edge.
   *
   * @param {Edge} edge - Edge to be removed
   */
  removeEdge(e) {
    var t;
    (t = this.edges.get(e.from)) == null || t.delete(e.to), e.deleteEdge();
  }
  _forEachNode(e) {
    for (const t of this.nodes.values())
      for (const i of t.values())
        e(i);
  }
  _forEachEdge(e) {
    for (const t of this.edges.values())
      for (const i of t.values())
        e(i);
  }
};
function v0(n) {
  const e = d0.fromGeoJson(n);
  e.deleteDangles(), e.deleteCutEdges();
  const t = [], i = [];
  return e.getEdgeRings().filter((o) => o.isValid()).forEach((o) => {
    o.isHole() ? t.push(o) : i.push(o);
  }), t.forEach((o) => {
    Yh.findEdgeRingContaining(o, i) && i.push(o);
  }), ce(i.map((o) => o.toPolygon()));
}
function m0(n, e) {
  e = e || {}, e.iterations = e.iterations || 1;
  const { iterations: t } = e, i = [];
  if (!n) throw new Error("inputPolys is required");
  return at(n, function(o, a, u) {
    if (o.type === "Polygon") {
      let h = [[]];
      for (let f = 0; f < t; f++) {
        let g = [], m = o;
        f > 0 && (m = ye(h).geometry), y0(m, g), h = g.slice(0);
      }
      i.push(ye(h, u));
    } else if (o.type === "MultiPolygon") {
      let h = [[[]]];
      for (let f = 0; f < t; f++) {
        let g = [], m = o;
        f > 0 && (m = wt(h).geometry), p0(m, g), h = g.slice(0);
      }
      i.push(wt(h, u));
    } else
      throw new Error("geometry is invalid, must be Polygon or MultiPolygon");
  }), ce(i);
}
function y0(n, e) {
  var t, i;
  He(
    n,
    function(o, a, u, h, f) {
      if (i !== f)
        e.push([]);
      else {
        var g = t[0], m = t[1], v = o[0], p = o[1];
        e[f].push([
          0.75 * g + 0.25 * v,
          0.75 * m + 0.25 * p
        ]), e[f].push([
          0.25 * g + 0.75 * v,
          0.25 * m + 0.75 * p
        ]);
      }
      t = o, i = f;
    },
    !1
  ), e.forEach(function(o) {
    o.push(o[0]);
  });
}
function p0(n, e) {
  let t, i, o;
  He(
    n,
    function(a, u, h, f, g) {
      if (i !== f)
        e.push([[]]);
      else if (o !== g)
        e[f].push([]);
      else {
        var m = t[0], v = t[1], p = a[0], _ = a[1];
        e[f][g].push([
          0.75 * m + 0.25 * p,
          0.75 * v + 0.25 * _
        ]), e[f][g].push([
          0.25 * m + 0.75 * p,
          0.25 * v + 0.75 * _
        ]);
      }
      t = a, i = f, o = g;
    },
    !1
  ), e.forEach(function(a) {
    a.forEach(function(u) {
      u.push(u[0]);
    });
  });
}
function _0(n, e) {
  const t = ve(n), i = ve(e);
  let o = [], a = [], u;
  const h = ze(e);
  let f = 0, g = null;
  switch (t[0] > h[0] && t[0] < h[2] && t[1] > h[1] && t[1] < h[3] && (g = fs(n, hs(e)), f = g.properties.featureIndex), xt(e)) {
    case "Polygon":
      o = i[0][f], a = i[0][0], g !== null && g.geometry.coordinates[1] < t[1] && (a = i[0][f]), u = Ur(
        i[0][0],
        i[0][i[0].length - 1],
        t
      ), [o, a] = zl(
        i[0],
        t,
        u,
        o,
        a
      );
      break;
    case "MultiPolygon":
      for (var v = 0, p = 0, _ = 0, w = 0; w < i[0].length; w++) {
        v = w;
        for (var C = !1, b = 0; b < i[0][w].length; b++) {
          if (p = b, _ === f) {
            C = !0;
            break;
          }
          _++;
        }
        if (C) break;
      }
      o = i[0][v][p], a = i[0][v][p], u = Ur(
        i[0][0][0],
        i[0][0][i[0][0].length - 1],
        t
      ), i.forEach(function(S) {
        [o, a] = zl(S[0], t, u, o, a);
      });
      break;
  }
  return ce([de(o), de(a)]);
}
function zl(n, e, t, i, o) {
  for (let a = 0; a < n.length; a++) {
    const u = n[a];
    let h = n[a + 1];
    a === n.length - 1 && (h = n[0]);
    const f = Ur(u, h, e);
    t <= 0 && f > 0 ? x0(e, u, i) || (i = u) : t > 0 && f <= 0 && (w0(e, u, o) || (o = u)), t = f;
  }
  return [i, o];
}
function w0(n, e, t) {
  return Ur(n, e, t) > 0;
}
function x0(n, e, t) {
  return Ur(n, e, t) < 0;
}
function Ur(n, e, t) {
  return (e[0] - n[0]) * (t[1] - n[1]) - (t[0] - n[0]) * (e[1] - n[1]);
}
function Xh(n, e = {}) {
  return Hh(n, "mercator", e);
}
function Vh(n, e = {}) {
  return Hh(n, "wgs84", e);
}
function Hh(n, e, t = {}) {
  t = t || {};
  var i = t.mutate;
  if (!n) throw new Error("geojson is required");
  return Array.isArray(n) && et(n[0]) ? n = e === "mercator" ? Yl(n) : Ul(n) : (i !== !0 && (n = nt(n)), He(n, function(o) {
    var a = e === "mercator" ? Yl(o) : Ul(o);
    o[0] = a[0], o[1] = a[1];
  })), n;
}
function Yl(n) {
  var e = Math.PI / 180, t = 6378137, i = 20037508342789244e-9, o = Math.abs(n[0]) <= 180 ? n[0] : n[0] - E0(n[0]) * 360, a = [
    t * o * e,
    t * Math.log(Math.tan(Math.PI * 0.25 + 0.5 * n[1] * e))
  ];
  return a[0] > i && (a[0] = i), a[0] < -i && (a[0] = -i), a[1] > i && (a[1] = i), a[1] < -i && (a[1] = -i), a;
}
function Ul(n) {
  var e = 180 / Math.PI, t = 6378137;
  return [
    n[0] * e / t,
    (Math.PI * 0.5 - 2 * Math.atan(Math.exp(-n[1] / t))) * e
  ];
}
function E0(n) {
  return n < 0 ? -1 : n > 0 ? 1 : 0;
}
const k0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  toMercator: Xh,
  toWgs84: Vh
}, Symbol.toStringTag, { value: "Module" }));
function C0(n, e) {
  e = e || {};
  const t = e.studyBbox || ze(n), i = e.confidenceLevel || 20, o = n.features, a = o.length, u = Qr(Jr(t)), h = Math.sqrt(u / a * 2), g = ca(t, h, {
    units: "meters"
  }).features, m = {};
  for (let V = 0; V < g.length; V++)
    m[V] = {
      box: ze(g[V]),
      cnt: 0
    };
  let v = 0;
  for (const V of o)
    for (const k of Object.keys(m)) {
      const M = m[k].box;
      if (S0(be(V), M)) {
        m[k].cnt += 1, v += 1;
        break;
      }
    }
  let p = 0;
  for (const V of Object.keys(m)) {
    const k = m[V].cnt;
    k > p && (p = k);
  }
  const _ = [], w = Object.keys(m).length, C = v / w;
  let b = 0;
  for (let V = 0; V < p + 1; V++)
    b += Math.exp(-C) * Math.pow(C, V) / M0(V), _.push(b);
  const S = [];
  let I = 0;
  for (let V = 0; V < p + 1; V++) {
    for (const M of Object.keys(m))
      m[M].cnt === V && (I += 1);
    const k = I / w;
    S.push(k);
  }
  let N = 0;
  for (let V = 0; V < p + 1; V++) {
    const k = Math.abs(
      _[V] - S[V]
    );
    k > N && (N = k);
  }
  const R = I0[i] / Math.sqrt(w), U = {
    criticalValue: R,
    isRandom: !0,
    maxAbsoluteDifference: N,
    observedDistribution: S
  };
  return N > R && (U.isRandom = !1), U;
}
var I0 = {
  20: 1.07275,
  15: 1.13795,
  10: 1.22385,
  5: 1.3581,
  2: 1.51743,
  1: 1.62762
};
function S0(n, e) {
  return e[0] <= n[0] && e[1] <= n[1] && e[2] >= n[0] && e[3] >= n[1];
}
function M0(n) {
  const e = [];
  function t(i) {
    return i === 0 || i === 1 ? 1 : e[i] > 0 ? e[i] : e[i] = t(i - 1) * i;
  }
  return t(n);
}
function Wh(n) {
  return ds(n), gs(n);
}
function gs(n) {
  return Array.isArray(n) ? Xl(n) : n && n.bbox ? Xl(n.bbox) : [P0(), L0()];
}
function ds(n) {
  n != null && (Array.isArray(n) ? Fr(n) : n.bbox != null && Fr(n.bbox));
}
function $h(n, e = {}) {
  ds(e.bbox), n == null && (n = 1);
  const t = [];
  for (let i = 0; i < n; i++)
    t.push(de(gs(e.bbox)));
  return ce(t);
}
function Zh(n, e = {}) {
  ds(e.bbox), n == null && (n = 1), (e.bbox === void 0 || e.bbox === null) && (e.bbox = [-180, -90, 180, 90]), (!et(e.num_vertices) || e.num_vertices === void 0) && (e.num_vertices = 10), (!et(e.max_radial_length) || e.max_radial_length === void 0) && (e.max_radial_length = 10);
  const t = Math.abs(e.bbox[0] - e.bbox[2]), i = Math.abs(e.bbox[1] - e.bbox[3]), o = Math.min(t / 2, i / 2);
  if (e.max_radial_length > o)
    throw new Error("max_radial_length is greater than the radius of the bbox");
  const a = [
    e.bbox[0] + e.max_radial_length,
    e.bbox[1] + e.max_radial_length,
    e.bbox[2] - e.max_radial_length,
    e.bbox[3] - e.max_radial_length
  ], u = [];
  for (let h = 0; h < n; h++) {
    let f = [];
    const g = [...Array(e.num_vertices + 1)].map(Math.random);
    g.forEach((m, v, p) => {
      p[v] = v > 0 ? m + p[v - 1] : m;
    }), g.forEach((m) => {
      m = m * 2 * Math.PI / g[g.length - 1];
      const v = Math.random();
      f.push([
        v * (e.max_radial_length || 10) * Math.sin(m),
        v * (e.max_radial_length || 10) * Math.cos(m)
      ]);
    }), f[f.length - 1] = f[0], f = f.reverse().map(b0(gs(a))), u.push(ye([f]));
  }
  return ce(u);
}
function Kh(n, e = {}) {
  if (e = e || {}, !Re(e))
    throw new Error("options is invalid");
  const t = e.bbox;
  ds(t);
  let i = e.num_vertices, o = e.max_length, a = e.max_rotation;
  n == null && (n = 1), (!et(i) || i === void 0 || i < 2) && (i = 10), (!et(o) || o === void 0) && (o = 1e-4), (!et(a) || a === void 0) && (a = Math.PI / 8);
  const u = [];
  for (let h = 0; h < n; h++) {
    const g = [gs(t)];
    for (let m = 0; m < i - 1; m++) {
      const p = (m === 0 ? Math.random() * 2 * Math.PI : Math.tan(
        (g[m][1] - g[m - 1][1]) / (g[m][0] - g[m - 1][0])
      )) + (Math.random() - 0.5) * a * 2, _ = Math.random() * o;
      g.push([
        g[m][0] + _ * Math.cos(p),
        g[m][1] + _ * Math.sin(p)
      ]);
    }
    u.push(Se(g));
  }
  return ce(u);
}
function b0(n) {
  return (e) => [e[0] + n[0], e[1] + n[1]];
}
function Qh() {
  return Math.random() - 0.5;
}
function P0() {
  return Qh() * 360;
}
function L0() {
  return Qh() * 180;
}
function Xl(n) {
  return [
    Math.random() * (n[2] - n[0]) + n[0],
    Math.random() * (n[3] - n[1]) + n[1]
  ];
}
const N0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  randomLineString: Kh,
  randomPoint: $h,
  randomPolygon: Zh,
  randomPosition: Wh
}, Symbol.toStringTag, { value: "Module" }));
function T0(n, e = {}) {
  var t, i;
  if (e = e || {}, !Re(e)) throw new Error("options is invalid");
  const o = (t = e.mutate) != null ? t : !1, a = (i = e.reverse) != null ? i : !1;
  if (!n) throw new Error("<geojson> is required");
  if (typeof a != "boolean")
    throw new Error("<reverse> must be a boolean");
  if (typeof o != "boolean")
    throw new Error("<mutate> must be a boolean");
  !o && n.type !== "Point" && n.type !== "MultiPoint" && (n = nt(n));
  const u = [];
  switch (n.type) {
    case "GeometryCollection":
      return at(n, function(h) {
        Bi(h, a);
      }), n;
    case "FeatureCollection":
      return Pe(n, function(h) {
        const f = Bi(h, a);
        Pe(f, function(g) {
          u.push(g);
        });
      }), ce(u);
  }
  return Bi(n, a);
}
function Bi(n, e) {
  switch (n.type === "Feature" ? n.geometry.type : n.type) {
    case "GeometryCollection":
      return at(n, function(i) {
        Bi(i, e);
      }), n;
    case "LineString":
      return Vl(ve(n), e), n;
    case "Polygon":
      return Hl(ve(n), e), n;
    case "MultiLineString":
      return ve(n).forEach(function(i) {
        Vl(i, e);
      }), n;
    case "MultiPolygon":
      return ve(n).forEach(function(i) {
        Hl(i, e);
      }), n;
    case "Point":
    case "MultiPoint":
      return n;
  }
}
function Vl(n, e) {
  zi(n) === e && n.reverse();
}
function Hl(n, e) {
  zi(n[0]) !== e && n[0].reverse();
  for (let t = 1; t < n.length; t++)
    zi(n[t]) === e && n[t].reverse();
}
function O0(n, e) {
  if (!n) throw new Error("fc is required");
  if (e == null) throw new Error("num is required");
  if (typeof e != "number") throw new Error("num must be a number");
  var t = ce(A0(n.features, e));
  return t;
}
function A0(n, e) {
  for (var t = n.slice(0), i = n.length, o = i - e, a, u; i-- > o; )
    u = Math.floor((i + 1) * Math.random()), a = t[u], t[u] = t[i], t[i] = a;
  return t.slice(o);
}
function R0(n, e, t, i, o = {}) {
  if (o = o || {}, !Re(o)) throw new Error("options is invalid");
  const a = o.properties;
  if (!n) throw new Error("center is required");
  if (t == null)
    throw new Error("bearing1 is required");
  if (i == null)
    throw new Error("bearing2 is required");
  if (!e) throw new Error("radius is required");
  if (typeof o != "object") throw new Error("options must be an object");
  if (Wl(t) === Wl(i))
    return ta(n, e, o);
  const u = ve(n), h = Fh(n, e, t, i, o), f = [[u]];
  return He(h, function(g) {
    f[0].push(g);
  }), f[0].push(u), ye(f, a);
}
function Wl(n) {
  let e = n % 360;
  return e < 0 && (e += 360), e;
}
function Jh(n, e, t) {
  if (t = t || {}, !Re(t)) throw new Error("options is invalid");
  const i = t.origin || "centroid", o = t.mutate || !1;
  if (!n) throw new Error("geojson required");
  if (typeof e != "number" || e <= 0)
    throw new Error("invalid factor");
  const a = Array.isArray(i) || typeof i == "object";
  return o !== !0 && (n = nt(n)), n.type === "FeatureCollection" && !a ? (Pe(n, function(u, h) {
    n.features[h] = $l(
      u,
      e,
      i
    );
  }), e !== 1 && delete n.bbox, n) : $l(n, e, i);
}
function $l(n, e, t) {
  const i = xt(n) === "Point", o = D0(n, t);
  return e === 1 || i || (He(n, function(a) {
    const u = Zn(o, a), h = Ln(o, a), f = u * e, g = ve(
      cs(o, f, h)
    );
    a[0] = g[0], a[1] = g[1], a.length === 3 && (a[2] *= e);
  }), mn(n)), n;
}
function D0(n, e) {
  if (e == null && (e = "centroid"), Array.isArray(e) || typeof e == "object")
    return be(e);
  const t = n.bbox ? n.bbox : ze(n, { recompute: !0 }), i = t[0], o = t[1], a = t[2], u = t[3];
  switch (e) {
    case "sw":
    case "southwest":
    case "westsouth":
    case "bottomleft":
      return de([i, o]);
    case "se":
    case "southeast":
    case "eastsouth":
    case "bottomright":
      return de([a, o]);
    case "nw":
    case "northwest":
    case "westnorth":
    case "topleft":
      return de([i, u]);
    case "ne":
    case "northeast":
    case "eastnorth":
    case "topright":
      return de([a, u]);
    case "center":
      return os(n);
    case void 0:
    case null:
    case "centroid":
      return Dt(n);
    default:
      throw new Error("invalid origin");
  }
}
function Zl(n) {
  for (var e = n, t = []; e.parent; )
    t.unshift(e), e = e.parent;
  return t;
}
function F0() {
  return new q0(function(n) {
    return n.f;
  });
}
var Ji = {
  /**
   * Perform an A* Search on a graph given a start and end node.
   *
   * @private
   * @memberof astar
   * @param {Graph} graph Graph
   * @param {GridNode} start Start
   * @param {GridNode} end End
   * @param {Object} [options] Options
   * @param {bool} [options.closest] Specifies whether to return the path to the closest node if the target is unreachable.
   * @param {Function} [options.heuristic] Heuristic function (see astar.heuristics).
   * @returns {Object} Search
   */
  search: function(n, e, t, i = {}) {
    var o;
    n.cleanDirty(), i = i || {};
    var a = Ji.heuristics.manhattan, u = (o = i.closest) != null ? o : !1, h = F0(), f = e;
    for (e.h = a(e, t), h.push(e); h.size() > 0; ) {
      var g = h.pop();
      if (g === t)
        return Zl(g);
      g.closed = !0;
      for (var m = n.neighbors(g), v = 0, p = m.length; v < p; ++v) {
        var _ = m[v];
        if (!(_.closed || _.isWall())) {
          var w = g.g + _.getCost(g), C = _.visited;
          (!C || w < _.g) && (_.visited = !0, _.parent = g, _.h = _.h || a(_, t), _.g = w, _.f = _.g + _.h, n.markDirty(_), u && (_.h < f.h || _.h === f.h && _.g < f.g) && (f = _), C ? h.rescoreElement(_) : h.push(_));
        }
      }
    }
    return u ? Zl(f) : [];
  },
  // See list of heuristics: http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
  heuristics: {
    manhattan: function(n, e) {
      var t = Math.abs(e.x - n.x), i = Math.abs(e.y - n.y);
      return t + i;
    },
    diagonal: function(n, e) {
      var t = 1, i = Math.sqrt(2), o = Math.abs(e.x - n.x), a = Math.abs(e.y - n.y);
      return t * (o + a) + (i - 2 * t) * Math.min(o, a);
    }
  },
  cleanNode: function(n) {
    n.f = 0, n.g = 0, n.h = 0, n.visited = !1, n.closed = !1, n.parent = void 0;
  }
}, B0 = class {
  constructor(n, e = {}) {
    this.nodes = [], this.grid = [], this.dirtyNodes = [], this.diagonal = !!e.diagonal;
    for (var t = 0; t < n.length; t++) {
      this.grid[t] = [];
      for (var i = 0, o = n[t]; i < o.length; i++) {
        var a = new G0(t, i, o[i]);
        this.grid[t][i] = a, this.nodes.push(a);
      }
    }
    this.init();
  }
  init() {
    this.dirtyNodes = [];
    for (var n = 0; n < this.nodes.length; n++)
      Ji.cleanNode(this.nodes[n]);
  }
  cleanDirty() {
    for (var n = 0; n < this.dirtyNodes.length; n++)
      Ji.cleanNode(this.dirtyNodes[n]);
    this.dirtyNodes = [];
  }
  markDirty(n) {
    this.dirtyNodes.push(n);
  }
  neighbors(n) {
    var e = [], t = n.x, i = n.y, o = this.grid;
    return o[t - 1] && o[t - 1][i] && e.push(o[t - 1][i]), o[t + 1] && o[t + 1][i] && e.push(o[t + 1][i]), o[t] && o[t][i - 1] && e.push(o[t][i - 1]), o[t] && o[t][i + 1] && e.push(o[t][i + 1]), this.diagonal && (o[t - 1] && o[t - 1][i - 1] && e.push(o[t - 1][i - 1]), o[t + 1] && o[t + 1][i - 1] && e.push(o[t + 1][i - 1]), o[t - 1] && o[t - 1][i + 1] && e.push(o[t - 1][i + 1]), o[t + 1] && o[t + 1][i + 1] && e.push(o[t + 1][i + 1])), e;
  }
  toString() {
    for (var n = [], e = this.grid, t, i, o, a, u = 0, h = e.length; u < h; u++) {
      for (t = [], i = e[u], o = 0, a = i.length; o < a; o++)
        t.push(i[o].weight);
      n.push(t.join(" "));
    }
    return n.join(`
`);
  }
}, G0 = class {
  constructor(n, e, t) {
    this.visited = !1, this.h = 0, this.g = 0, this.f = 0, this.closed = !1, this.x = n, this.y = e, this.weight = t;
  }
  toString() {
    return "[" + this.x + " " + this.y + "]";
  }
  getCost(n) {
    return n && n.x !== this.x && n.y !== this.y ? this.weight * 1.41421 : this.weight;
  }
  isWall() {
    return this.weight === 0;
  }
}, q0 = class {
  constructor(n) {
    this.content = [], this.scoreFunction = n;
  }
  push(n) {
    this.content.push(n), this.sinkDown(this.content.length - 1);
  }
  pop() {
    var n = this.content[0], e = this.content.pop();
    return this.content.length > 0 && (this.content[0] = e, this.bubbleUp(0)), n;
  }
  remove(n) {
    var e = this.content.indexOf(n), t = this.content.pop();
    e !== this.content.length - 1 && (this.content[e] = t, this.scoreFunction(t) < this.scoreFunction(n) ? this.sinkDown(e) : this.bubbleUp(e));
  }
  size() {
    return this.content.length;
  }
  rescoreElement(n) {
    this.sinkDown(this.content.indexOf(n));
  }
  sinkDown(n) {
    for (var e = this.content[n]; n > 0; ) {
      var t = (n + 1 >> 1) - 1, i = this.content[t];
      if (this.scoreFunction(e) < this.scoreFunction(i))
        this.content[t] = e, this.content[n] = i, n = t;
      else
        break;
    }
  }
  bubbleUp(n) {
    for (var e = this.content.length, t = this.content[n], i = this.scoreFunction(t); ; ) {
      var o = n + 1 << 1, a = o - 1, u = null, h;
      if (a < e) {
        var f = this.content[a];
        h = this.scoreFunction(f), h < i && (u = a);
      }
      if (o < e) {
        var g = this.content[o], m = this.scoreFunction(g);
        m < (u === null ? i : h) && (u = o);
      }
      if (u !== null)
        this.content[n] = this.content[u], this.content[u] = t, n = u;
      else
        break;
    }
  }
};
function z0(n, e, t = {}) {
  if (t = t || {}, !Re(t)) throw new Error("options is invalid");
  let i = t.obstacles || ce([]), o = t.resolution || 100;
  if (!n) throw new Error("start is required");
  if (!e) throw new Error("end is required");
  if (!et(o) || o <= 0)
    throw new Error("options.resolution must be a number, greater than 0");
  const a = be(n), u = be(e);
  if (n = de(a), e = de(u), i.type === "FeatureCollection") {
    if (i.features.length === 0)
      return Se([a, u]);
  } else if (i.type === "Feature" && i.geometry.type === "Polygon")
    i = ce([i]);
  else if (i.type === "Polygon")
    i = ce([Qe(Ue(i))]);
  else
    throw new Error("invalid obstacles");
  const h = i;
  h.features.push(n), h.features.push(e);
  const f = ze(Jh(Jr(ze(h)), 1.15)), [g, m, v, p] = f;
  h.features.pop(), h.features.pop();
  const _ = qe([g, m], [v, m], t) / o, w = (v - g) / _, C = qe([g, m], [g, p], t) / o, b = (p - m) / C, S = _ % 1 * w / 2, I = C % 1 * b / 2, N = [], A = [];
  let R, U, V = 1 / 0, k = 1 / 0, M = p - I, T = 0;
  for (; M >= m; ) {
    const Y = [], G = [];
    let H = g + S, Q = 0;
    for (; H <= v; ) {
      const W = de([H, M]), j = Y0(W, i);
      Y.push(j ? 0 : 1), G.push(H + "|" + M);
      const J = qe(W, n);
      !j && J < V && (V = J, R = { x: Q, y: T });
      const re = qe(W, e);
      !j && re < k && (k = re, U = { x: Q, y: T }), H += w, Q++;
    }
    A.push(Y), N.push(G), M -= b, T++;
  }
  const D = new B0(A, { diagonal: !0 }), B = D.grid[R.y][R.x], q = D.grid[U.y][U.x], X = Ji.search(D, B, q), O = [a];
  return X.forEach(function(Y) {
    const G = N[Y.x][Y.y].split("|");
    O.push([+G[0], +G[1]]);
  }), O.push(u), Nn(Se(O));
}
function Y0(n, e) {
  for (let t = 0; t < e.features.length; t++)
    if (xe(n, e.features[t]))
      return !0;
  return !1;
}
function U0(n, e) {
  var t = n[0] - e[0], i = n[1] - e[1];
  return t * t + i * i;
}
function X0(n, e, t) {
  var i = e[0], o = e[1], a = t[0] - i, u = t[1] - o;
  if (a !== 0 || u !== 0) {
    var h = ((n[0] - i) * a + (n[1] - o) * u) / (a * a + u * u);
    h > 1 ? (i = t[0], o = t[1]) : h > 0 && (i += a * h, o += u * h);
  }
  return a = n[0] - i, u = n[1] - o, a * a + u * u;
}
function V0(n, e) {
  for (var t = n[0], i = [t], o, a = 1, u = n.length; a < u; a++)
    o = n[a], U0(o, t) > e && (i.push(o), t = o);
  return t !== o && i.push(o), i;
}
function bo(n, e, t, i, o) {
  for (var a = i, u, h = e + 1; h < t; h++) {
    var f = X0(n[h], n[e], n[t]);
    f > a && (u = h, a = f);
  }
  a > i && (u - e > 1 && bo(n, e, u, i, o), o.push(n[u]), t - u > 1 && bo(n, u, t, i, o));
}
function H0(n, e) {
  var t = n.length - 1, i = [n[0]];
  return bo(n, 0, t, e, i), i.push(n[t]), i;
}
function ji(n, e, t) {
  if (n.length <= 2) return n;
  var i = e !== void 0 ? e * e : 1;
  return n = t ? n : V0(n, i), n = H0(n, i), n;
}
function W0(n, e = {}) {
  var t, i, o;
  if (e = e ?? {}, !Re(e)) throw new Error("options is invalid");
  const a = (t = e.tolerance) != null ? t : 1, u = (i = e.highQuality) != null ? i : !1, h = (o = e.mutate) != null ? o : !1;
  if (!n) throw new Error("geojson is required");
  if (a && a < 0) throw new Error("invalid tolerance");
  return h !== !0 && (n = nt(n)), at(n, function(f) {
    $0(f, a, u);
  }), n;
}
function $0(n, e, t) {
  const i = n.type;
  if (i === "Point" || i === "MultiPoint") return n;
  if (Nn(n, { mutate: !0 }), i !== "GeometryCollection")
    switch (i) {
      case "LineString":
        n.coordinates = ji(
          n.coordinates,
          e,
          t
        );
        break;
      case "MultiLineString":
        n.coordinates = n.coordinates.map(
          (o) => ji(o, e, t)
        );
        break;
      case "Polygon":
        n.coordinates = Kl(
          n.coordinates,
          e,
          t
        );
        break;
      case "MultiPolygon":
        n.coordinates = n.coordinates.map(
          (o) => Kl(o, e, t)
        );
    }
  return n;
}
function Kl(n, e, t) {
  return n.map(function(i) {
    if (i.length < 4)
      throw new Error("invalid polygon");
    let o = e, a = ji(i, o, t);
    for (; !Ql(a) && o >= Number.EPSILON; )
      o -= o * 0.01, a = ji(i, o, t);
    return Ql(a) ? ((a[a.length - 1][0] !== a[0][0] || a[a.length - 1][1] !== a[0][1]) && a.push(a[0]), a) : i;
  });
}
function Ql(n) {
  return n.length < 3 ? !1 : !(n.length === 3 && n[2][0] === n[0][0] && n[2][1] === n[0][1]);
}
function Z0(n) {
  var e = n[0], t = n[1], i = n[2], o = n[3], a = qe(n.slice(0, 2), [i, t]), u = qe(n.slice(0, 2), [e, o]);
  if (a >= u) {
    var h = (t + o) / 2;
    return [
      e,
      h - (i - e) / 2,
      i,
      h + (i - e) / 2
    ];
  } else {
    var f = (e + i) / 2;
    return [
      f - (o - t) / 2,
      t,
      f + (o - t) / 2,
      o
    ];
  }
}
function K0(n, e) {
  var t;
  if (e = e || {}, !Re(e)) throw new Error("options is invalid");
  const i = e.steps || 64, o = e.weight, a = e.properties || {};
  if (!et(i)) throw new Error("steps must be a number");
  if (!Re(a)) throw new Error("properties must be a number");
  const u = Gr(n).length, h = jo(n, { weight: o });
  let f = 0, g = 0, m = 0;
  Pe(n, function(k) {
    var M;
    const T = o && ((M = k.properties) == null ? void 0 : M[o]) || 1, D = Jl(ve(k), ve(h));
    f += Math.pow(D.x, 2) * T, g += Math.pow(D.y, 2) * T, m += D.x * D.y * T;
  });
  const v = f - g, p = Math.sqrt(Math.pow(v, 2) + 4 * Math.pow(m, 2)), _ = 2 * m, w = Math.atan((v + p) / _), C = w * 180 / Math.PI;
  let b = 0, S = 0, I = 0;
  Pe(n, function(k) {
    var M;
    const T = o && ((M = k.properties) == null ? void 0 : M[o]) || 1, D = Jl(ve(k), ve(h));
    b += Math.pow(
      D.x * Math.cos(w) - D.y * Math.sin(w),
      2
    ) * T, S += Math.pow(
      D.x * Math.sin(w) + D.y * Math.cos(w),
      2
    ) * T, I += T;
  });
  const N = Math.sqrt(2 * b / I), A = Math.sqrt(2 * S / I), R = Nh(h, N, A, {
    units: "degrees",
    angle: C,
    steps: i,
    properties: a
  }), U = qh(
    n,
    ce([R])
  ), V = {
    meanCenterCoordinates: ve(h),
    semiMajorAxis: N,
    semiMinorAxis: A,
    numberOfFeatures: u,
    angle: C,
    percentageWithinEllipse: 100 * Gr(U).length / u
  };
  return R.properties = (t = R.properties) != null ? t : {}, R.properties.standardDeviationalEllipse = V, R;
}
function Jl(n, e) {
  return {
    x: n[0] - e[0],
    y: n[1] - e[1]
  };
}
function Q0(n, e, t, i) {
  return n = nt(n), e = nt(e), Pe(n, function(o) {
    o.properties || (o.properties = {}), Pe(e, function(a) {
      o.properties && a.properties && o.properties[i] === void 0 && xe(o, a) && (o.properties[i] = a.properties[t]);
    });
  }), n;
}
var da = { exports: {} };
da.exports = vs;
da.exports.default = vs;
function vs(n, e, t) {
  t = t || 2;
  var i = e && e.length, o = i ? e[0] * t : n.length, a = jh(n, 0, o, t, !0), u = [];
  if (!a || a.next === a.prev) return u;
  var h, f, g, m, v, p, _;
  if (i && (a = n_(n, e, a, t)), n.length > 80 * t) {
    h = g = n[0], f = m = n[1];
    for (var w = t; w < o; w += t)
      v = n[w], p = n[w + 1], v < h && (h = v), p < f && (f = p), v > g && (g = v), p > m && (m = p);
    _ = Math.max(g - h, m - f), _ = _ !== 0 ? 32767 / _ : 0;
  }
  return Xr(a, u, t, h, f, _, 0), u;
}
function jh(n, e, t, i, o) {
  var a, u;
  if (o === No(n, e, t, i) > 0)
    for (a = e; a < t; a += i) u = jl(a, n[a], n[a + 1], u);
  else
    for (a = t - i; a >= e; a -= i) u = jl(a, n[a], n[a + 1], u);
  return u && ms(u, u.next) && (Hr(u), u = u.next), u;
}
function Tn(n, e) {
  if (!n) return n;
  e || (e = n);
  var t = n, i;
  do
    if (i = !1, !t.steiner && (ms(t, t.next) || Ke(t.prev, t, t.next) === 0)) {
      if (Hr(t), t = e = t.prev, t === t.next) break;
      i = !0;
    } else
      t = t.next;
  while (i || t !== e);
  return e;
}
function Xr(n, e, t, i, o, a, u) {
  if (n) {
    !u && a && a_(n, i, o, a);
    for (var h = n, f, g; n.prev !== n.next; ) {
      if (f = n.prev, g = n.next, a ? j0(n, i, o, a) : J0(n)) {
        e.push(f.i / t | 0), e.push(n.i / t | 0), e.push(g.i / t | 0), Hr(n), n = g.next, h = g.next;
        continue;
      }
      if (n = g, n === h) {
        u ? u === 1 ? (n = e_(Tn(n), e, t), Xr(n, e, t, i, o, a, 2)) : u === 2 && t_(n, e, t, i, o, a) : Xr(Tn(n), e, t, i, o, a, 1);
        break;
      }
    }
  }
}
function J0(n) {
  var e = n.prev, t = n, i = n.next;
  if (Ke(e, t, i) >= 0) return !1;
  for (var o = e.x, a = t.x, u = i.x, h = e.y, f = t.y, g = i.y, m = o < a ? o < u ? o : u : a < u ? a : u, v = h < f ? h < g ? h : g : f < g ? f : g, p = o > a ? o > u ? o : u : a > u ? a : u, _ = h > f ? h > g ? h : g : f > g ? f : g, w = i.next; w !== e; ) {
    if (w.x >= m && w.x <= p && w.y >= v && w.y <= _ && Hn(o, h, a, f, u, g, w.x, w.y) && Ke(w.prev, w, w.next) >= 0) return !1;
    w = w.next;
  }
  return !0;
}
function j0(n, e, t, i) {
  var o = n.prev, a = n, u = n.next;
  if (Ke(o, a, u) >= 0) return !1;
  for (var h = o.x, f = a.x, g = u.x, m = o.y, v = a.y, p = u.y, _ = h < f ? h < g ? h : g : f < g ? f : g, w = m < v ? m < p ? m : p : v < p ? v : p, C = h > f ? h > g ? h : g : f > g ? f : g, b = m > v ? m > p ? m : p : v > p ? v : p, S = Po(_, w, e, t, i), I = Po(C, b, e, t, i), N = n.prevZ, A = n.nextZ; N && N.z >= S && A && A.z <= I; ) {
    if (N.x >= _ && N.x <= C && N.y >= w && N.y <= b && N !== o && N !== u && Hn(h, m, f, v, g, p, N.x, N.y) && Ke(N.prev, N, N.next) >= 0 || (N = N.prevZ, A.x >= _ && A.x <= C && A.y >= w && A.y <= b && A !== o && A !== u && Hn(h, m, f, v, g, p, A.x, A.y) && Ke(A.prev, A, A.next) >= 0)) return !1;
    A = A.nextZ;
  }
  for (; N && N.z >= S; ) {
    if (N.x >= _ && N.x <= C && N.y >= w && N.y <= b && N !== o && N !== u && Hn(h, m, f, v, g, p, N.x, N.y) && Ke(N.prev, N, N.next) >= 0) return !1;
    N = N.prevZ;
  }
  for (; A && A.z <= I; ) {
    if (A.x >= _ && A.x <= C && A.y >= w && A.y <= b && A !== o && A !== u && Hn(h, m, f, v, g, p, A.x, A.y) && Ke(A.prev, A, A.next) >= 0) return !1;
    A = A.nextZ;
  }
  return !0;
}
function e_(n, e, t) {
  var i = n;
  do {
    var o = i.prev, a = i.next.next;
    !ms(o, a) && ef(o, i, i.next, a) && Vr(o, a) && Vr(a, o) && (e.push(o.i / t | 0), e.push(i.i / t | 0), e.push(a.i / t | 0), Hr(i), Hr(i.next), i = n = a), i = i.next;
  } while (i !== n);
  return Tn(i);
}
function t_(n, e, t, i, o, a) {
  var u = n;
  do {
    for (var h = u.next.next; h !== u.prev; ) {
      if (u.i !== h.i && c_(u, h)) {
        var f = tf(u, h);
        u = Tn(u, u.next), f = Tn(f, f.next), Xr(u, e, t, i, o, a, 0), Xr(f, e, t, i, o, a, 0);
        return;
      }
      h = h.next;
    }
    u = u.next;
  } while (u !== n);
}
function n_(n, e, t, i) {
  var o = [], a, u, h, f, g;
  for (a = 0, u = e.length; a < u; a++)
    h = e[a] * i, f = a < u - 1 ? e[a + 1] * i : n.length, g = jh(n, h, f, i, !1), g === g.next && (g.steiner = !0), o.push(l_(g));
  for (o.sort(r_), a = 0; a < o.length; a++)
    t = i_(o[a], t);
  return t;
}
function r_(n, e) {
  return n.x - e.x;
}
function i_(n, e) {
  var t = s_(n, e);
  if (!t)
    return e;
  var i = tf(t, n);
  return Tn(i, i.next), Tn(t, t.next);
}
function s_(n, e) {
  var t = e, i = n.x, o = n.y, a = -1 / 0, u;
  do {
    if (o <= t.y && o >= t.next.y && t.next.y !== t.y) {
      var h = t.x + (o - t.y) * (t.next.x - t.x) / (t.next.y - t.y);
      if (h <= i && h > a && (a = h, u = t.x < t.next.x ? t : t.next, h === i))
        return u;
    }
    t = t.next;
  } while (t !== e);
  if (!u) return null;
  var f = u, g = u.x, m = u.y, v = 1 / 0, p;
  t = u;
  do
    i >= t.x && t.x >= g && i !== t.x && Hn(o < m ? i : a, o, g, m, o < m ? a : i, o, t.x, t.y) && (p = Math.abs(o - t.y) / (i - t.x), Vr(t, n) && (p < v || p === v && (t.x > u.x || t.x === u.x && o_(u, t))) && (u = t, v = p)), t = t.next;
  while (t !== f);
  return u;
}
function o_(n, e) {
  return Ke(n.prev, n, e.prev) < 0 && Ke(e.next, n, n.next) < 0;
}
function a_(n, e, t, i) {
  var o = n;
  do
    o.z === 0 && (o.z = Po(o.x, o.y, e, t, i)), o.prevZ = o.prev, o.nextZ = o.next, o = o.next;
  while (o !== n);
  o.prevZ.nextZ = null, o.prevZ = null, u_(o);
}
function u_(n) {
  var e, t, i, o, a, u, h, f, g = 1;
  do {
    for (t = n, n = null, a = null, u = 0; t; ) {
      for (u++, i = t, h = 0, e = 0; e < g && (h++, i = i.nextZ, !!i); e++)
        ;
      for (f = g; h > 0 || f > 0 && i; )
        h !== 0 && (f === 0 || !i || t.z <= i.z) ? (o = t, t = t.nextZ, h--) : (o = i, i = i.nextZ, f--), a ? a.nextZ = o : n = o, o.prevZ = a, a = o;
      t = i;
    }
    a.nextZ = null, g *= 2;
  } while (u > 1);
  return n;
}
function Po(n, e, t, i, o) {
  return n = (n - t) * o | 0, e = (e - i) * o | 0, n = (n | n << 8) & 16711935, n = (n | n << 4) & 252645135, n = (n | n << 2) & 858993459, n = (n | n << 1) & 1431655765, e = (e | e << 8) & 16711935, e = (e | e << 4) & 252645135, e = (e | e << 2) & 858993459, e = (e | e << 1) & 1431655765, n | e << 1;
}
function l_(n) {
  var e = n, t = n;
  do
    (e.x < t.x || e.x === t.x && e.y < t.y) && (t = e), e = e.next;
  while (e !== n);
  return t;
}
function Hn(n, e, t, i, o, a, u, h) {
  return (o - u) * (e - h) >= (n - u) * (a - h) && (n - u) * (i - h) >= (t - u) * (e - h) && (t - u) * (a - h) >= (o - u) * (i - h);
}
function c_(n, e) {
  return n.next.i !== e.i && n.prev.i !== e.i && !h_(n, e) && // dones't intersect other edges
  (Vr(n, e) && Vr(e, n) && f_(n, e) && // locally visible
  (Ke(n.prev, n, e.prev) || Ke(n, e.prev, e)) || // does not create opposite-facing sectors
  ms(n, e) && Ke(n.prev, n, n.next) > 0 && Ke(e.prev, e, e.next) > 0);
}
function Ke(n, e, t) {
  return (e.y - n.y) * (t.x - e.x) - (e.x - n.x) * (t.y - e.y);
}
function ms(n, e) {
  return n.x === e.x && n.y === e.y;
}
function ef(n, e, t, i) {
  var o = Ti(Ke(n, e, t)), a = Ti(Ke(n, e, i)), u = Ti(Ke(t, i, n)), h = Ti(Ke(t, i, e));
  return !!(o !== a && u !== h || o === 0 && Ni(n, t, e) || a === 0 && Ni(n, i, e) || u === 0 && Ni(t, n, i) || h === 0 && Ni(t, e, i));
}
function Ni(n, e, t) {
  return e.x <= Math.max(n.x, t.x) && e.x >= Math.min(n.x, t.x) && e.y <= Math.max(n.y, t.y) && e.y >= Math.min(n.y, t.y);
}
function Ti(n) {
  return n > 0 ? 1 : n < 0 ? -1 : 0;
}
function h_(n, e) {
  var t = n;
  do {
    if (t.i !== n.i && t.next.i !== n.i && t.i !== e.i && t.next.i !== e.i && ef(t, t.next, n, e)) return !0;
    t = t.next;
  } while (t !== n);
  return !1;
}
function Vr(n, e) {
  return Ke(n.prev, n, n.next) < 0 ? Ke(n, e, n.next) >= 0 && Ke(n, n.prev, e) >= 0 : Ke(n, e, n.prev) < 0 || Ke(n, n.next, e) < 0;
}
function f_(n, e) {
  var t = n, i = !1, o = (n.x + e.x) / 2, a = (n.y + e.y) / 2;
  do
    t.y > a != t.next.y > a && t.next.y !== t.y && o < (t.next.x - t.x) * (a - t.y) / (t.next.y - t.y) + t.x && (i = !i), t = t.next;
  while (t !== n);
  return i;
}
function tf(n, e) {
  var t = new Lo(n.i, n.x, n.y), i = new Lo(e.i, e.x, e.y), o = n.next, a = e.prev;
  return n.next = e, e.prev = n, t.next = o, o.prev = t, i.next = t, t.prev = i, a.next = i, i.prev = a, i;
}
function jl(n, e, t, i) {
  var o = new Lo(n, e, t);
  return i ? (o.next = i.next, o.prev = i, i.next.prev = o, i.next = o) : (o.prev = o, o.next = o), o;
}
function Hr(n) {
  n.next.prev = n.prev, n.prev.next = n.next, n.prevZ && (n.prevZ.nextZ = n.nextZ), n.nextZ && (n.nextZ.prevZ = n.prevZ);
}
function Lo(n, e, t) {
  this.i = n, this.x = e, this.y = t, this.prev = null, this.next = null, this.z = 0, this.prevZ = null, this.nextZ = null, this.steiner = !1;
}
vs.deviation = function(n, e, t, i) {
  var o = e && e.length, a = o ? e[0] * t : n.length, u = Math.abs(No(n, 0, a, t));
  if (o)
    for (var h = 0, f = e.length; h < f; h++) {
      var g = e[h] * t, m = h < f - 1 ? e[h + 1] * t : n.length;
      u -= Math.abs(No(n, g, m, t));
    }
  var v = 0;
  for (h = 0; h < i.length; h += 3) {
    var p = i[h] * t, _ = i[h + 1] * t, w = i[h + 2] * t;
    v += Math.abs(
      (n[p] - n[w]) * (n[_ + 1] - n[p + 1]) - (n[p] - n[_]) * (n[w + 1] - n[p + 1])
    );
  }
  return u === 0 && v === 0 ? 0 : Math.abs((v - u) / u);
};
function No(n, e, t, i) {
  for (var o = 0, a = e, u = t - i; a < t; a += i)
    o += (n[u] - n[a]) * (n[a + 1] + n[u + 1]), u = a;
  return o;
}
vs.flatten = function(n) {
  for (var e = n[0][0].length, t = { vertices: [], holes: [], dimensions: e }, i = 0, o = 0; o < n.length; o++) {
    for (var a = 0; a < n[o].length; a++)
      for (var u = 0; u < e; u++) t.vertices.push(n[o][a][u]);
    o > 0 && (i += n[o - 1].length, t.holes.push(i));
  }
  return t;
};
var g_ = da.exports;
const d_ = /* @__PURE__ */ ti(g_);
function v_(n) {
  if (!n.geometry || n.geometry.type !== "Polygon" && n.geometry.type !== "MultiPolygon")
    throw new Error("input must be a Polygon or MultiPolygon");
  const e = {
    type: "FeatureCollection",
    features: []
  };
  return n.geometry.type === "Polygon" ? e.features = ec(n.geometry.coordinates) : n.geometry.coordinates.forEach(function(t) {
    e.features = e.features.concat(ec(t));
  }), e;
}
function ec(n) {
  const e = m_(n), t = 3, i = d_(e.vertices, e.holes, t), o = [], a = [];
  i.forEach(function(h, f) {
    const g = i[f];
    e.vertices[g * t + 2] !== void 0 ? a.push([
      e.vertices[g * t],
      e.vertices[g * t + 1],
      e.vertices[g * t + 2]
    ]) : a.push([
      e.vertices[g * t],
      e.vertices[g * t + 1]
    ]);
  });
  for (var u = 0; u < a.length; u += 3) {
    const h = a.slice(u, u + 3);
    h.push(a[u]), o.push(ye([h]));
  }
  return o;
}
function m_(n) {
  const t = {
    vertices: [],
    holes: [],
    dimensions: 3
  };
  let i = 0;
  for (let o = 0; o < n.length; o++) {
    for (let a = 0; a < n[o].length; a++)
      for (let u = 0; u < 3; u++) t.vertices.push(n[o][a][u]);
    o > 0 && (i += n[o - 1].length, t.holes.push(i));
  }
  return t;
}
function y_(n, e, t, i) {
  if (i = i || {}, !Re(i)) throw new Error("options is invalid");
  var o = i.units, a = i.zTranslation, u = i.mutate;
  if (!n) throw new Error("geojson is required");
  if (e == null || isNaN(e))
    throw new Error("distance is required");
  if (a && typeof a != "number" && isNaN(a))
    throw new Error("zTranslation is not a number");
  if (a = a !== void 0 ? a : 0, e === 0 && a === 0) return n;
  if (t == null || isNaN(t))
    throw new Error("direction is required");
  return e < 0 && (e = -e, t = t + 180), (u === !1 || u === void 0) && (n = nt(n)), He(n, function(h) {
    var f = ve(
      cs(h, e, t, { units: o })
    );
    h[0] = f[0], h[1] = f[1], a && h.length === 3 && (h[2] += a);
  }), mn(n), n;
}
function p_(n, e = {}) {
  const t = [];
  if (at(n, (o) => {
    t.push(o.coordinates);
  }), t.length < 2)
    throw new Error("Must have at least 2 geometries");
  const i = yn(t[0], ...t.slice(1));
  return i.length === 0 ? null : i.length === 1 ? ye(i[0], e.properties) : wt(i, e.properties);
}
function __(n, e) {
  if (n.geometry.type !== "Polygon")
    throw new Error("The input feature must be a Polygon");
  for (var t = n.geometry.coordinates, i = [], o = {}, a = [], u = 0; u < t.length; u++)
    for (var h = 0; h < t[u].length - 1; h++)
      a.push(_(u, h));
  var f = new ar();
  f.load(a);
  for (var g = 0; g < t.length; g++)
    for (var m = 0; m < t[g].length - 1; m++) {
      var v = f.search(_(g, m));
      v.forEach(function(w) {
        var C = w.ring, b = w.edge;
        p(g, m, C, b);
      });
    }
  return i;
  function p(w, C, b, S) {
    var I = t[w][C], N = t[w][C + 1], A = t[b][S], R = t[b][S + 1], U = w_(I, N, A, R);
    if (U !== null) {
      var V, k;
      if (N[0] !== I[0] ? V = (U[0] - I[0]) / (N[0] - I[0]) : V = (U[1] - I[1]) / (N[1] - I[1]), R[0] !== A[0] ? k = (U[0] - A[0]) / (R[0] - A[0]) : k = (U[1] - A[1]) / (R[1] - A[1]), !(V >= 1 || V <= 0 || k >= 1 || k <= 0)) {
        var M = U, T = !o[M.toString()];
        T && (o[M.toString()] = !0), e && i.push(
          e(
            U,
            w,
            C,
            I,
            N,
            V,
            b,
            S,
            A,
            R,
            k,
            T
          )
        );
      }
    }
  }
  function _(w, C) {
    var b = t[w][C], S = t[w][C + 1], I, N, A, R;
    return b[0] < S[0] ? (I = b[0], N = S[0]) : (I = S[0], N = b[0]), b[1] < S[1] ? (A = b[1], R = S[1]) : (A = S[1], R = b[1]), {
      minX: I,
      minY: A,
      maxX: N,
      maxY: R,
      ring: w,
      edge: C
    };
  }
}
function w_(n, e, t, i) {
  if (Ar(n, t) || Ar(n, i) || Ar(e, t) || Ar(i, t))
    return null;
  var o = n[0], a = n[1], u = e[0], h = e[1], f = t[0], g = t[1], m = i[0], v = i[1], p = (o - u) * (g - v) - (a - h) * (f - m);
  if (p === 0) return null;
  var _ = ((o * h - a * u) * (f - m) - (o - u) * (f * v - g * m)) / p, w = ((o * h - a * u) * (g - v) - (a - h) * (f * v - g * m)) / p;
  return [_, w];
}
function Ar(n, e) {
  if (!n || !e || n.length !== e.length) return !1;
  for (var t = 0, i = n.length; t < i; t++)
    if (n[t] instanceof Array && e[t] instanceof Array) {
      if (!Ar(n[t], e[t])) return !1;
    } else if (n[t] !== e[t])
      return !1;
  return !0;
}
function x_(n) {
  if (n.type != "Feature")
    throw new Error("The input must a geojson object of type Feature");
  if (n.geometry === void 0 || n.geometry == null)
    throw new Error(
      "The input must a geojson object with a non-empty geometry"
    );
  if (n.geometry.type != "Polygon")
    throw new Error("The input must be a geojson Polygon");
  for (var e = n.geometry.coordinates.length, t = [], S = 0; S < e; S++) {
    var i = n.geometry.coordinates[S];
    Rr(i[0], i[i.length - 1]) || i.push(i[0]);
    for (var o = 0; o < i.length - 1; o++)
      t.push(i[o]);
  }
  if (!k_(t))
    throw new Error(
      "The input polygon may not have duplicate vertices (except for the first and last vertex of each ring)"
    );
  var a = t.length, u = __(
    n,
    function(re, ee, te, se, fe, Z, Fe, _e, ae, z, Me, Ne) {
      return [
        re,
        ee,
        te,
        se,
        fe,
        Z,
        Fe,
        _e,
        ae,
        z,
        Me,
        Ne
      ];
    }
  ), h = u.length;
  if (h == 0) {
    for (var U = [], S = 0; S < e; S++)
      U.push(
        ye([n.geometry.coordinates[S]], {
          parent: -1,
          winding: E_(n.geometry.coordinates[S])
        })
      );
    let re = ce(U);
    return Q(re), W(re), re;
  }
  for (var f = [], g = [], S = 0; S < e; S++) {
    f.push([]);
    for (var o = 0; o < n.geometry.coordinates[S].length - 1; o++)
      f[S].push([
        new tc(
          n.geometry.coordinates[S][Wn(o + 1, n.geometry.coordinates[S].length - 1)],
          1,
          [S, o],
          [S, Wn(o + 1, n.geometry.coordinates[S].length - 1)],
          void 0
        )
      ]), g.push(
        new nc(
          n.geometry.coordinates[S][o],
          [S, Wn(o - 1, n.geometry.coordinates[S].length - 1)],
          [S, o],
          void 0,
          void 0,
          !1,
          !0
        )
      );
  }
  for (var S = 0; S < h; S++)
    f[u[S][1]][u[S][2]].push(
      new tc(
        u[S][0],
        u[S][5],
        [u[S][1], u[S][2]],
        [u[S][6], u[S][7]],
        void 0
      )
    ), u[S][11] && g.push(
      new nc(
        u[S][0],
        [u[S][1], u[S][2]],
        [u[S][6], u[S][7]],
        void 0,
        void 0,
        !0,
        !0
      )
    );
  for (var m = g.length, S = 0; S < f.length; S++)
    for (var o = 0; o < f[S].length; o++)
      f[S][o].sort(function(ee, te) {
        return ee.param < te.param ? -1 : 1;
      });
  for (var v = [], S = 0; S < m; S++)
    v.push({
      minX: g[S].coord[0],
      minY: g[S].coord[1],
      maxX: g[S].coord[0],
      maxY: g[S].coord[1],
      index: S
    });
  var p = new ar();
  p.load(v);
  for (var S = 0; S < f.length; S++)
    for (var o = 0; o < f[S].length; o++)
      for (var _ = 0; _ < f[S][o].length; _++) {
        let ee;
        _ == f[S][o].length - 1 ? ee = f[S][Wn(o + 1, n.geometry.coordinates[S].length - 1)][0].coord : ee = f[S][o][_ + 1].coord;
        var w = p.search({
          minX: ee[0],
          minY: ee[1],
          maxX: ee[0],
          maxY: ee[1]
        })[0];
        f[S][o][_].nxtIsectAlongEdgeIn = w.index;
      }
  for (var S = 0; S < f.length; S++)
    for (var o = 0; o < f[S].length; o++)
      for (var _ = 0; _ < f[S][o].length; _++) {
        let te = f[S][o][_].coord;
        var w = p.search({
          minX: te[0],
          minY: te[1],
          maxX: te[0],
          maxY: te[1]
        })[0], C = w.index;
        C < a ? g[C].nxtIsectAlongRingAndEdge2 = f[S][o][_].nxtIsectAlongEdgeIn : Rr(
          g[C].ringAndEdge1,
          f[S][o][_].ringAndEdgeIn
        ) ? g[C].nxtIsectAlongRingAndEdge1 = f[S][o][_].nxtIsectAlongEdgeIn : g[C].nxtIsectAlongRingAndEdge2 = f[S][o][_].nxtIsectAlongEdgeIn;
      }
  for (var b = [], S = 0, o = 0; o < e; o++) {
    for (var I = S, _ = 0; _ < n.geometry.coordinates[o].length - 1; _++)
      g[S].coord[0] < g[I].coord[0] && (I = S), S++;
    for (var N = g[I].nxtIsectAlongRingAndEdge2, _ = 0; _ < g.length; _++)
      if (g[_].nxtIsectAlongRingAndEdge1 == I || g[_].nxtIsectAlongRingAndEdge2 == I) {
        var A = _;
        break;
      }
    var R = Gi(
      [
        g[A].coord,
        g[I].coord,
        g[N].coord
      ],
      !0
    ) ? 1 : -1;
    b.push({ isect: I, parent: -1, winding: R });
  }
  b.sort(function(J, re) {
    return g[J.isect].coord > g[re.isect].coord ? -1 : 1;
  });
  for (var U = []; b.length > 0; ) {
    var V = b.pop(), k = V.isect, M = V.parent, T = V.winding, D = U.length, B = [g[k].coord], q = k;
    if (g[k].ringAndEdge1Walkable)
      var X = g[k].ringAndEdge1, O = g[k].nxtIsectAlongRingAndEdge1;
    else
      var X = g[k].ringAndEdge2, O = g[k].nxtIsectAlongRingAndEdge2;
    for (; !Rr(g[k].coord, g[O].coord); ) {
      B.push(g[O].coord);
      for (var Y = void 0, S = 0; S < b.length; S++)
        if (b[S].isect == O) {
          Y = S;
          break;
        }
      if (Y != null && b.splice(Y, 1), Rr(X, g[O].ringAndEdge1)) {
        if (X = g[O].ringAndEdge2, g[O].ringAndEdge2Walkable = !1, g[O].ringAndEdge1Walkable) {
          var G = {
            isect: O
          };
          Gi(
            [
              g[q].coord,
              g[O].coord,
              g[g[O].nxtIsectAlongRingAndEdge2].coord
            ],
            T == 1
          ) ? (G.parent = M, G.winding = -T) : (G.parent = D, G.winding = T), b.push(G);
        }
        q = O, O = g[O].nxtIsectAlongRingAndEdge2;
      } else {
        if (X = g[O].ringAndEdge1, g[O].ringAndEdge1Walkable = !1, g[O].ringAndEdge2Walkable) {
          var G = {
            isect: O
          };
          Gi(
            [
              g[q].coord,
              g[O].coord,
              g[g[O].nxtIsectAlongRingAndEdge1].coord
            ],
            T == 1
          ) ? (G.parent = M, G.winding = -T) : (G.parent = D, G.winding = T), b.push(G);
        }
        q = O, O = g[O].nxtIsectAlongRingAndEdge1;
      }
    }
    B.push(g[O].coord), U.push(
      ye([B], {
        index: D,
        parent: M,
        winding: T,
        netWinding: void 0
      })
    );
  }
  let H = ce(U);
  Q(H), W(H);
  function Q(J) {
    for (var re = [], ee = 0; ee < J.features.length; ee++)
      J.features[ee].properties.parent == -1 && re.push(ee);
    if (re.length > 1)
      for (var ee = 0; ee < re.length; ee++) {
        for (var te = -1, se = 1 / 0, fe = 0; fe < J.features.length; fe++)
          re[ee] != fe && xe(
            J.features[re[ee]].geometry.coordinates[0][0],
            J.features[fe],
            { ignoreBoundary: !0 }
          ) && Qr(J.features[fe]) < se && (te = fe);
        J.features[re[ee]].properties.parent = te;
      }
  }
  function W(J) {
    for (var re = 0; re < J.features.length; re++)
      if (J.features[re].properties.parent == -1) {
        var ee = J.features[re].properties.winding;
        J.features[re].properties.netWinding = ee, j(J, re, ee);
      }
  }
  function j(J, re, ee) {
    for (var te = 0; te < J.features.length; te++)
      if (J.features[te].properties.parent == re) {
        var se = ee + J.features[te].properties.winding;
        J.features[te].properties.netWinding = se, j(J, te, se);
      }
  }
  return H;
}
var tc = class {
  // The next intersection when following the incomming edge (so not when following ringAndEdgeOut!)
  // Constructor for (ring- or intersection-) pseudo-vertices.
  constructor(n, e, t, i, o) {
    this.coord = n, this.param = e, this.ringAndEdgeIn = t, this.ringAndEdgeOut = i, this.nxtIsectAlongEdgeIn = o;
  }
}, nc = class {
  // Constructor for an intersection. There are two intersection-pseudo-vertices per self-intersection and one ring-pseudo-vertex per ring-vertex-intersection. Their labels 1 and 2 are not assigned a particular meaning but are permanent once given.
  constructor(n, e, t, i, o, a, u) {
    this.coord = n, this.ringAndEdge1 = e, this.ringAndEdge2 = t, this.nxtIsectAlongRingAndEdge1 = i, this.nxtIsectAlongRingAndEdge2 = o, this.ringAndEdge1Walkable = a, this.ringAndEdge2Walkable = u;
  }
};
function Gi(n, e) {
  if (typeof e > "u" && (e = !0), n.length != 3)
    throw new Error("This function requires an array of three points [x,y]");
  var t = (n[1][0] - n[0][0]) * (n[2][1] - n[0][1]) - (n[1][1] - n[0][1]) * (n[2][0] - n[0][0]);
  return t >= 0 == e;
}
function E_(n) {
  for (var e = 0, t = 0; t < n.length - 1; t++)
    n[t][0] < n[e][0] && (e = t);
  if (Gi(
    [
      n[Wn(e - 1, n.length - 1)],
      n[e],
      n[Wn(e + 1, n.length - 1)]
    ],
    !0
  ))
    var i = 1;
  else
    var i = -1;
  return i;
}
function Rr(n, e) {
  if (!n || !e || n.length != e.length) return !1;
  for (var t = 0, i = n.length; t < i; t++)
    if (n[t] instanceof Array && e[t] instanceof Array) {
      if (!Rr(n[t], e[t])) return !1;
    } else if (n[t] != e[t])
      return !1;
  return !0;
}
function Wn(n, e) {
  return (n % e + e) % e;
}
function k_(n) {
  for (var e = {}, t = 1, i = 0, o = n.length; i < o; ++i) {
    if (Object.prototype.hasOwnProperty.call(e, n[i].toString())) {
      t = 0;
      break;
    }
    e[n[i].toString()] = 1;
  }
  return t;
}
function C_(n) {
  var e = [];
  return it(n, function(t) {
    t.geometry.type === "Polygon" && Pe(x_(t), function(i) {
      e.push(ye(i.geometry.coordinates, t.properties));
    });
  }), ce(e);
}
function rc(n) {
  return function() {
    return n;
  };
}
function I_(n) {
  return n[0];
}
function S_(n) {
  return n[1];
}
function es() {
  this._ = null;
}
function ys(n) {
  n.U = // parent node
  n.C = // color - true for red, false for black
  n.L = // left node
  n.R = // right node
  n.P = // previous node
  n.N = null;
}
es.prototype = {
  constructor: es,
  insert: function(n, e) {
    var t, i, o;
    if (n) {
      if (e.P = n, e.N = n.N, n.N && (n.N.P = e), n.N = e, n.R) {
        for (n = n.R; n.L; ) n = n.L;
        n.L = e;
      } else
        n.R = e;
      t = n;
    } else this._ ? (n = ic(this._), e.P = null, e.N = n, n.P = n.L = e, t = n) : (e.P = e.N = null, this._ = e, t = null);
    for (e.L = e.R = null, e.U = t, e.C = !0, n = e; t && t.C; )
      i = t.U, t === i.L ? (o = i.R, o && o.C ? (t.C = o.C = !1, i.C = !0, n = i) : (n === t.R && (Er(this, t), n = t, t = n.U), t.C = !1, i.C = !0, kr(this, i))) : (o = i.L, o && o.C ? (t.C = o.C = !1, i.C = !0, n = i) : (n === t.L && (kr(this, t), n = t, t = n.U), t.C = !1, i.C = !0, Er(this, i))), t = n.U;
    this._.C = !1;
  },
  remove: function(n) {
    n.N && (n.N.P = n.P), n.P && (n.P.N = n.N), n.N = n.P = null;
    var e = n.U, t, i = n.L, o = n.R, a, u;
    if (i ? o ? a = ic(o) : a = i : a = o, e ? e.L === n ? e.L = a : e.R = a : this._ = a, i && o ? (u = a.C, a.C = n.C, a.L = i, i.U = a, a !== o ? (e = a.U, a.U = n.U, n = a.R, e.L = n, a.R = o, o.U = a) : (a.U = e, e = a, n = a.R)) : (u = n.C, n = a), n && (n.U = e), !u) {
      if (n && n.C) {
        n.C = !1;
        return;
      }
      do {
        if (n === this._) break;
        if (n === e.L) {
          if (t = e.R, t.C && (t.C = !1, e.C = !0, Er(this, e), t = e.R), t.L && t.L.C || t.R && t.R.C) {
            (!t.R || !t.R.C) && (t.L.C = !1, t.C = !0, kr(this, t), t = e.R), t.C = e.C, e.C = t.R.C = !1, Er(this, e), n = this._;
            break;
          }
        } else if (t = e.L, t.C && (t.C = !1, e.C = !0, kr(this, e), t = e.L), t.L && t.L.C || t.R && t.R.C) {
          (!t.L || !t.L.C) && (t.R.C = !1, t.C = !0, Er(this, t), t = e.L), t.C = e.C, e.C = t.L.C = !1, kr(this, e), n = this._;
          break;
        }
        t.C = !0, n = e, e = e.U;
      } while (!n.C);
      n && (n.C = !1);
    }
  }
};
function Er(n, e) {
  var t = e, i = e.R, o = t.U;
  o ? o.L === t ? o.L = i : o.R = i : n._ = i, i.U = o, t.U = i, t.R = i.L, t.R && (t.R.U = t), i.L = t;
}
function kr(n, e) {
  var t = e, i = e.L, o = t.U;
  o ? o.L === t ? o.L = i : o.R = i : n._ = i, i.U = o, t.U = i, t.L = i.R, t.L && (t.L.U = t), i.R = t;
}
function ic(n) {
  for (; n.L; ) n = n.L;
  return n;
}
function Dr(n, e, t, i) {
  var o = [null, null], a = ft.push(o) - 1;
  return o.left = n, o.right = e, t && ts(o, n, e, t), i && ts(o, e, n, i), St[n.index].halfedges.push(a), St[e.index].halfedges.push(a), o;
}
function Cr(n, e, t) {
  var i = [e, t];
  return i.left = n, i;
}
function ts(n, e, t, i) {
  !n[0] && !n[1] ? (n[0] = i, n.left = e, n.right = t) : n.left === t ? n[1] = i : n[0] = i;
}
function M_(n, e, t, i, o) {
  var a = n[0], u = n[1], h = a[0], f = a[1], g = u[0], m = u[1], v = 0, p = 1, _ = g - h, w = m - f, C;
  if (C = e - h, !(!_ && C > 0)) {
    if (C /= _, _ < 0) {
      if (C < v) return;
      C < p && (p = C);
    } else if (_ > 0) {
      if (C > p) return;
      C > v && (v = C);
    }
    if (C = i - h, !(!_ && C < 0)) {
      if (C /= _, _ < 0) {
        if (C > p) return;
        C > v && (v = C);
      } else if (_ > 0) {
        if (C < v) return;
        C < p && (p = C);
      }
      if (C = t - f, !(!w && C > 0)) {
        if (C /= w, w < 0) {
          if (C < v) return;
          C < p && (p = C);
        } else if (w > 0) {
          if (C > p) return;
          C > v && (v = C);
        }
        if (C = o - f, !(!w && C < 0)) {
          if (C /= w, w < 0) {
            if (C > p) return;
            C > v && (v = C);
          } else if (w > 0) {
            if (C < v) return;
            C < p && (p = C);
          }
          return !(v > 0) && !(p < 1) || (v > 0 && (n[0] = [h + v * _, f + v * w]), p < 1 && (n[1] = [h + p * _, f + p * w])), !0;
        }
      }
    }
  }
}
function b_(n, e, t, i, o) {
  var a = n[1];
  if (a) return !0;
  var u = n[0], h = n.left, f = n.right, g = h[0], m = h[1], v = f[0], p = f[1], _ = (g + v) / 2, w = (m + p) / 2, C, b;
  if (p === m) {
    if (_ < e || _ >= i) return;
    if (g > v) {
      if (!u) u = [_, t];
      else if (u[1] >= o) return;
      a = [_, o];
    } else {
      if (!u) u = [_, o];
      else if (u[1] < t) return;
      a = [_, t];
    }
  } else if (C = (g - v) / (p - m), b = w - C * _, C < -1 || C > 1)
    if (g > v) {
      if (!u) u = [(t - b) / C, t];
      else if (u[1] >= o) return;
      a = [(o - b) / C, o];
    } else {
      if (!u) u = [(o - b) / C, o];
      else if (u[1] < t) return;
      a = [(t - b) / C, t];
    }
  else if (m < p) {
    if (!u) u = [e, C * e + b];
    else if (u[0] >= i) return;
    a = [i, C * i + b];
  } else {
    if (!u) u = [i, C * i + b];
    else if (u[0] < e) return;
    a = [e, C * e + b];
  }
  return n[0] = u, n[1] = a, !0;
}
function P_(n, e, t, i) {
  for (var o = ft.length, a; o--; )
    (!b_(a = ft[o], n, e, t, i) || !M_(a, n, e, t, i) || !(Math.abs(a[0][0] - a[1][0]) > Ge || Math.abs(a[0][1] - a[1][1]) > Ge)) && delete ft[o];
}
function L_(n) {
  return St[n.index] = {
    site: n,
    halfedges: []
  };
}
function N_(n, e) {
  var t = n.site, i = e.left, o = e.right;
  return t === o && (o = i, i = t), o ? Math.atan2(o[1] - i[1], o[0] - i[0]) : (t === i ? (i = e[1], o = e[0]) : (i = e[0], o = e[1]), Math.atan2(i[0] - o[0], o[1] - i[1]));
}
function nf(n, e) {
  return e[+(e.left !== n.site)];
}
function T_(n, e) {
  return e[+(e.left === n.site)];
}
function O_() {
  for (var n = 0, e = St.length, t, i, o, a; n < e; ++n)
    if ((t = St[n]) && (a = (i = t.halfedges).length)) {
      var u = new Array(a), h = new Array(a);
      for (o = 0; o < a; ++o) u[o] = o, h[o] = N_(t, ft[i[o]]);
      for (u.sort(function(f, g) {
        return h[g] - h[f];
      }), o = 0; o < a; ++o) h[o] = i[u[o]];
      for (o = 0; o < a; ++o) i[o] = h[o];
    }
}
function A_(n, e, t, i) {
  var o = St.length, a, u, h, f, g, m, v, p, _, w, C, b, S = !0;
  for (a = 0; a < o; ++a)
    if (u = St[a]) {
      for (h = u.site, g = u.halfedges, f = g.length; f--; )
        ft[g[f]] || g.splice(f, 1);
      for (f = 0, m = g.length; f < m; )
        w = T_(u, ft[g[f]]), C = w[0], b = w[1], v = nf(u, ft[g[++f % m]]), p = v[0], _ = v[1], (Math.abs(C - p) > Ge || Math.abs(b - _) > Ge) && (g.splice(f, 0, ft.push(Cr(
          h,
          w,
          Math.abs(C - n) < Ge && i - b > Ge ? [n, Math.abs(p - n) < Ge ? _ : i] : Math.abs(b - i) < Ge && t - C > Ge ? [Math.abs(_ - i) < Ge ? p : t, i] : Math.abs(C - t) < Ge && b - e > Ge ? [t, Math.abs(p - t) < Ge ? _ : e] : Math.abs(b - e) < Ge && C - n > Ge ? [Math.abs(_ - e) < Ge ? p : n, e] : null
        )) - 1), ++m);
      m && (S = !1);
    }
  if (S) {
    var I, N, A, R = 1 / 0;
    for (a = 0, S = null; a < o; ++a)
      (u = St[a]) && (h = u.site, I = h[0] - n, N = h[1] - e, A = I * I + N * N, A < R && (R = A, S = u));
    if (S) {
      var U = [n, e], V = [n, i], k = [t, i], M = [t, e];
      S.halfedges.push(
        ft.push(Cr(h = S.site, U, V)) - 1,
        ft.push(Cr(h, V, k)) - 1,
        ft.push(Cr(h, k, M)) - 1,
        ft.push(Cr(h, M, U)) - 1
      );
    }
  }
  for (a = 0; a < o; ++a)
    (u = St[a]) && (u.halfedges.length || delete St[a]);
}
var rf = [], va;
function R_() {
  ys(this), this.x = this.y = this.arc = this.site = this.cy = null;
}
function $n(n) {
  var e = n.P, t = n.N;
  if (!(!e || !t)) {
    var i = e.site, o = n.site, a = t.site;
    if (i !== a) {
      var u = o[0], h = o[1], f = i[0] - u, g = i[1] - h, m = a[0] - u, v = a[1] - h, p = 2 * (f * v - g * m);
      if (!(p >= -1e-12)) {
        var _ = f * f + g * g, w = m * m + v * v, C = (v * _ - g * w) / p, b = (f * w - m * _) / p, S = rf.pop() || new R_();
        S.arc = n, S.site = o, S.x = C + u, S.y = (S.cy = b + h) + Math.sqrt(C * C + b * b), n.circle = S;
        for (var I = null, N = Wr._; N; )
          if (S.y < N.y || S.y === N.y && S.x <= N.x)
            if (N.L) N = N.L;
            else {
              I = N.P;
              break;
            }
          else if (N.R) N = N.R;
          else {
            I = N;
            break;
          }
        Wr.insert(I, S), I || (va = S);
      }
    }
  }
}
function Kn(n) {
  var e = n.circle;
  e && (e.P || (va = e.N), Wr.remove(e), rf.push(e), ys(e), n.circle = null);
}
var sf = [];
function D_() {
  ys(this), this.edge = this.site = this.circle = null;
}
function sc(n) {
  var e = sf.pop() || new D_();
  return e.site = n, e;
}
function oo(n) {
  Kn(n), Qn.remove(n), sf.push(n), ys(n);
}
function F_(n) {
  var e = n.circle, t = e.x, i = e.cy, o = [t, i], a = n.P, u = n.N, h = [n];
  oo(n);
  for (var f = a; f.circle && Math.abs(t - f.circle.x) < Ge && Math.abs(i - f.circle.cy) < Ge; )
    a = f.P, h.unshift(f), oo(f), f = a;
  h.unshift(f), Kn(f);
  for (var g = u; g.circle && Math.abs(t - g.circle.x) < Ge && Math.abs(i - g.circle.cy) < Ge; )
    u = g.N, h.push(g), oo(g), g = u;
  h.push(g), Kn(g);
  var m = h.length, v;
  for (v = 1; v < m; ++v)
    g = h[v], f = h[v - 1], ts(g.edge, f.site, g.site, o);
  f = h[0], g = h[m - 1], g.edge = Dr(f.site, g.site, null, o), $n(f), $n(g);
}
function B_(n) {
  for (var e = n[0], t = n[1], i, o, a, u, h = Qn._; h; )
    if (a = of(h, t) - e, a > Ge) h = h.L;
    else if (u = e - G_(h, t), u > Ge) {
      if (!h.R) {
        i = h;
        break;
      }
      h = h.R;
    } else {
      a > -Ge ? (i = h.P, o = h) : u > -Ge ? (i = h, o = h.N) : i = o = h;
      break;
    }
  L_(n);
  var f = sc(n);
  if (Qn.insert(i, f), !(!i && !o)) {
    if (i === o) {
      Kn(i), o = sc(i.site), Qn.insert(f, o), f.edge = o.edge = Dr(i.site, f.site), $n(i), $n(o);
      return;
    }
    if (!o) {
      f.edge = Dr(i.site, f.site);
      return;
    }
    Kn(i), Kn(o);
    var g = i.site, m = g[0], v = g[1], p = n[0] - m, _ = n[1] - v, w = o.site, C = w[0] - m, b = w[1] - v, S = 2 * (p * b - _ * C), I = p * p + _ * _, N = C * C + b * b, A = [(b * I - _ * N) / S + m, (p * N - C * I) / S + v];
    ts(o.edge, g, w, A), f.edge = Dr(g, n, null, A), o.edge = Dr(n, w, null, A), $n(i), $n(o);
  }
}
function of(n, e) {
  var t = n.site, i = t[0], o = t[1], a = o - e;
  if (!a) return i;
  var u = n.P;
  if (!u) return -1 / 0;
  t = u.site;
  var h = t[0], f = t[1], g = f - e;
  if (!g) return h;
  var m = h - i, v = 1 / a - 1 / g, p = m / g;
  return v ? (-p + Math.sqrt(p * p - 2 * v * (m * m / (-2 * g) - f + g / 2 + o - a / 2))) / v + i : (i + h) / 2;
}
function G_(n, e) {
  var t = n.N;
  if (t) return of(t, e);
  var i = n.site;
  return i[1] === e ? i[0] : 1 / 0;
}
var Ge = 1e-6, Qn, St, Wr, ft;
function q_(n, e, t) {
  return (n[0] - t[0]) * (e[1] - n[1]) - (n[0] - e[0]) * (t[1] - n[1]);
}
function z_(n, e) {
  return e[1] - n[1] || e[0] - n[0];
}
function To(n, e) {
  var t = n.sort(z_).pop(), i, o, a;
  for (ft = [], St = new Array(n.length), Qn = new es(), Wr = new es(); ; )
    if (a = va, t && (!a || t[1] < a.y || t[1] === a.y && t[0] < a.x))
      (t[0] !== i || t[1] !== o) && (B_(t), i = t[0], o = t[1]), t = n.pop();
    else if (a)
      F_(a.arc);
    else
      break;
  if (O_(), e) {
    var u = +e[0][0], h = +e[0][1], f = +e[1][0], g = +e[1][1];
    P_(u, h, f, g), A_(u, h, f, g);
  }
  this.edges = ft, this.cells = St, Qn = Wr = ft = St = null;
}
To.prototype = {
  constructor: To,
  polygons: function() {
    var n = this.edges;
    return this.cells.map(function(e) {
      var t = e.halfedges.map(function(i) {
        return nf(e, n[i]);
      });
      return t.data = e.site.data, t;
    });
  },
  triangles: function() {
    var n = [], e = this.edges;
    return this.cells.forEach(function(t, i) {
      if (h = (a = t.halfedges).length)
        for (var o = t.site, a, u = -1, h, f, g = e[a[h - 1]], m = g.left === o ? g.right : g.left; ++u < h; )
          f = m, g = e[a[u]], m = g.left === o ? g.right : g.left, f && m && i < f.index && i < m.index && q_(o, f, m) < 0 && n.push([o.data, f.data, m.data]);
    }), n;
  },
  links: function() {
    return this.edges.filter(function(n) {
      return n.right;
    }).map(function(n) {
      return {
        source: n.left.data,
        target: n.right.data
      };
    });
  },
  find: function(n, e, t) {
    for (var i = this, o, a = i._found || 0, u = i.cells.length, h; !(h = i.cells[a]); ) if (++a >= u) return null;
    var f = n - h.site[0], g = e - h.site[1], m = f * f + g * g;
    do
      h = i.cells[o = a], a = null, h.halfedges.forEach(function(v) {
        var p = i.edges[v], _ = p.left;
        if (!((_ === h.site || !_) && !(_ = p.right))) {
          var w = n - _[0], C = e - _[1], b = w * w + C * C;
          b < m && (m = b, a = _.index);
        }
      });
    while (a !== null);
    return i._found = o, t == null || m <= t * t ? h.site : null;
  }
};
function Y_() {
  var n = I_, e = S_, t = null;
  function i(o) {
    return new To(o.map(function(a, u) {
      var h = [Math.round(n(a, u, o) / Ge) * Ge, Math.round(e(a, u, o) / Ge) * Ge];
      return h.index = u, h.data = a, h;
    }), t);
  }
  return i.polygons = function(o) {
    return i(o).polygons();
  }, i.links = function(o) {
    return i(o).links();
  }, i.triangles = function(o) {
    return i(o).triangles();
  }, i.x = function(o) {
    return arguments.length ? (n = typeof o == "function" ? o : rc(+o), i) : n;
  }, i.y = function(o) {
    return arguments.length ? (e = typeof o == "function" ? o : rc(+o), i) : e;
  }, i.extent = function(o) {
    return arguments.length ? (t = o == null ? null : [[+o[0][0], +o[0][1]], [+o[1][0], +o[1][1]]], i) : t && [[t[0][0], t[0][1]], [t[1][0], t[1][1]]];
  }, i.size = function(o) {
    return arguments.length ? (t = o == null ? null : [[0, 0], [+o[0], +o[1]]], i) : t && [t[1][0] - t[0][0], t[1][1] - t[0][1]];
  }, i;
}
function U_(n) {
  return n = n.slice(), n.push(n[0]), ye([n]);
}
function X_(n, e) {
  if (e = e || {}, !Re(e)) throw new Error("options is invalid");
  const t = e.bbox || [-180, -85, 180, 85];
  if (!n) throw new Error("points is required");
  if (!Array.isArray(t)) throw new Error("bbox is invalid");
  return hn(n, "Point", "points"), ce(
    Y_().x((i) => i.geometry.coordinates[0]).y((i) => i.geometry.coordinates[1]).extent([
      [t[0], t[1]],
      [t[2], t[3]]
    ]).polygons(n.features).map(function(i, o) {
      return Object.assign(U_(i), {
        properties: us(n.features[o].properties)
      });
    })
  );
}
function V_(n, e = {}) {
  var t;
  const i = !!e.planar, o = (t = e.segment) != null ? t : !1;
  let a = 0, u = 0, h = 0, f = 0;
  const g = [];
  o ? $t(n, (I) => {
    const [N, A] = ac(
      I.geometry.coordinates,
      i
    ), R = oc(I, i);
    isNaN(N) || isNaN(A) || (a += N, u += A, h += 1, f += R, g.push(Dt(I)));
  }) : Pe(n, (I) => {
    if (I.geometry.type !== "LineString")
      throw new Error("shold to support MultiLineString?");
    const [N, A] = ac(
      I.geometry.coordinates,
      i
    ), R = oc(I, i);
    isNaN(N) || isNaN(A) || (a += N, u += A, h += 1, f += R, g.push(Dt(I)));
  });
  const m = W_(a, u), v = af(m), p = $_(
    a,
    u,
    h
  ), _ = f / h, w = Dt(ce(g)), [C, b] = be(w);
  let S;
  return i ? S = uc(
    [C, b],
    m,
    _,
    i
  ) : S = uc(
    [C, b],
    v,
    _,
    i
  ), Se(S, {
    averageLength: _,
    averageX: C,
    averageY: b,
    bearingAngle: v,
    cartesianAngle: m,
    circularVariance: p,
    countOfLines: h
  });
}
function H_(n) {
  const [e, t] = n[0], [i, o] = n[1], a = i - e, u = o - t;
  return Math.sqrt(Math.pow(a, 2) + Math.pow(u, 2));
}
function oc(n, e) {
  return e ? rs(
    n,
    (t, i) => {
      const o = i.geometry.coordinates;
      return t + H_(o);
    },
    0
  ) : ha(n, {
    units: "meters"
  });
}
function af(n) {
  let e = 90 - n;
  return e > 180 && (e -= 360), e;
}
function ac(n, e) {
  const t = n[0], i = n[n.length - 1];
  if (e) {
    const [o, a] = t, [u, h] = i, f = u - o, g = h - a, m = Math.sqrt(Math.pow(f, 2) + Math.pow(g, 2));
    if (m < 1e-9)
      return [NaN, NaN];
    const v = g / m, p = f / m;
    return [v, p];
  } else {
    const a = af(ln(t, i)) * Math.PI / 180;
    return [Math.sin(a), Math.cos(a)];
  }
}
function W_(n, e) {
  let t = 0;
  return Math.abs(e) < 1e-9 ? t = 90 : t = Math.atan2(n, e) * 180 / Math.PI, n >= 0 ? e < 0 && (t += 180) : e < 0 && (t -= 180), t;
}
function $_(n, e, t) {
  if (t === 0)
    throw new Error("the size of the features set must be greater than 0");
  return 1 - Math.sqrt(Math.pow(n, 2) + Math.pow(e, 2)) / t;
}
function uc(n, e, t, i) {
  if (i) {
    const [o, a] = n;
    let u, h, f, g;
    const m = e * Math.PI / 180, v = Math.sin(m), p = Math.cos(m);
    return u = o - t / 2 * p, h = a - t / 2 * v, f = o + t / 2 * p, g = a + t / 2 * v, [
      [u, h],
      [f, g]
    ];
  } else {
    const o = Qt(de(n), t / 2, e, {
      units: "meters"
    }), a = Qt(de(n), -t / 2, e, {
      units: "meters"
    });
    return [be(a), be(o)];
  }
}
const C1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  along: Wg,
  angle: $g,
  applyFilter: ls,
  area: Qr,
  areaFactors: qi,
  azimuthToBearing: xc,
  bbox: ze,
  bboxClip: ed,
  bboxPolygon: Jr,
  bearing: ln,
  bearingToAzimuth: jn,
  bezierSpline: id,
  booleanClockwise: zi,
  booleanConcave: sd,
  booleanContains: Oc,
  booleanCrosses: zc,
  booleanDisjoint: Zo,
  booleanEqual: br,
  booleanIntersects: Yc,
  booleanOverlap: Sv,
  booleanParallel: Mv,
  booleanPointInPolygon: xe,
  booleanPointOnLine: Ie,
  booleanTouches: Pv,
  booleanValid: Hc,
  booleanWithin: Ko,
  buffer: dm,
  center: os,
  centerMean: jo,
  centerMedian: mm,
  centerOfMass: lh,
  centroid: Dt,
  circle: ta,
  cleanCoords: Nn,
  clone: nt,
  cloneProperties: us,
  clusterEach: ra,
  clusterReduce: gh,
  clusters: Rm,
  clustersDbscan: Dm,
  clustersKmeans: Hm,
  collect: Wm,
  collectionOf: hn,
  combine: $m,
  concave: ky,
  containsNumber: Bo,
  convertArea: Fo,
  convertLength: Pn,
  convex: uh,
  coordAll: Gr,
  coordEach: He,
  coordReduce: Go,
  createBins: ia,
  degreesToRadians: Je,
  destination: Qt,
  difference: Vy,
  directionalMean: V_,
  dissolve: Hy,
  distance: qe,
  distanceWeight: Ph,
  earthRadius: Be,
  ellipse: Nh,
  envelope: Th,
  explode: hs,
  factors: ns,
  feature: Qe,
  featureCollection: ce,
  featureEach: Pe,
  featureOf: Br,
  featureReduce: zo,
  filterProperties: dh,
  findPoint: Mc,
  findSegment: Sc,
  flatten: Co,
  flattenEach: it,
  flattenReduce: Ic,
  flip: Ky,
  geojsonRbush: is,
  geojsonType: kc,
  geomEach: at,
  geomReduce: Yo,
  geometry: mc,
  geometryCollection: Do,
  getCluster: fh,
  getCoord: be,
  getCoords: ve,
  getGeom: Ue,
  getType: xt,
  greatCircle: tp,
  helpers: Xg,
  hexGrid: Oh,
  interpolate: ip,
  intersect: Yr,
  invariant: Vg,
  isNumber: et,
  isObject: Re,
  isobands: cp,
  isolines: Ep,
  kinks: Sp,
  length: ha,
  lengthToDegrees: Kr,
  lengthToRadians: or,
  lineArc: Fh,
  lineChunk: bp,
  lineEach: Uo,
  lineIntersect: Jt,
  lineOffset: Dp,
  lineOverlap: Vc,
  lineReduce: Xo,
  lineSegment: qr,
  lineSlice: Bp,
  lineSliceAlong: Bh,
  lineSplit: Nc,
  lineString: Se,
  lineStrings: _c,
  lineToPolygon: Gp,
  mask: zp,
  meta: Zg,
  midpoint: Xp,
  moranIndex: Vp,
  multiLineString: pn,
  multiPoint: $r,
  multiPolygon: wt,
  nearestNeighborAnalysis: Jp,
  nearestPoint: fs,
  nearestPointOnLine: on,
  nearestPointToLine: r0,
  planepoint: s0,
  point: de,
  pointGrid: Ah,
  pointOnFeature: o0,
  pointToLineDistance: fa,
  pointToPolygonDistance: Mo,
  points: yc,
  pointsWithinPolygon: qh,
  polygon: ye,
  polygonSmooth: m0,
  polygonTangents: _0,
  polygonToLine: er,
  polygonize: v0,
  polygons: pc,
  projection: k0,
  propEach: qo,
  propReduce: Cc,
  propertiesContainsFilter: sa,
  quadratAnalysis: C0,
  radiansToDegrees: Kt,
  radiansToLength: Zr,
  random: N0,
  randomLineString: Kh,
  randomPoint: $h,
  randomPolygon: Zh,
  randomPosition: Wh,
  rectangleGrid: Rh,
  removeBbox: mn,
  rewind: T0,
  rhumbBearing: Ln,
  rhumbDestination: cs,
  rhumbDistance: Zn,
  round: wc,
  sample: O0,
  sector: R0,
  segmentEach: $t,
  segmentReduce: rs,
  shortestPath: z0,
  simplify: W0,
  square: Z0,
  squareGrid: ca,
  standardDeviationalEllipse: K0,
  tag: Q0,
  tesselate: v_,
  tin: ph,
  toMercator: Xh,
  toWgs84: Vh,
  transformRotate: Lh,
  transformScale: Jh,
  transformTranslate: y_,
  triangleGrid: Dh,
  truncate: Pc,
  union: p_,
  unkinkPolygon: C_,
  validateBBox: Fr,
  validateId: Ec,
  voronoi: X_
}, Symbol.toStringTag, { value: "Module" }));
class Z_ {
  constructor(e, t) {
    this.viewer = e, this.config = {
      baseColor: "#40aee2",
      bodyColor: "#11374c",
      headerOpacity: 0.8,
      bodyOpacity: 0.5,
      offset: [0, 0],
      showTitle: !1,
      align: "left",
      // 新增碰撞检测配置
      enableCollisionDetection: !0,
      // 是否启用碰撞检测
      collisionThreshold: 0.3,
      // 碰撞阈值（0-1），当相交面积超过这个比例时隐藏气泡
      hideStrategy: "smaller",
      // 隐藏策略：'smaller'隐藏较小的，'newer'隐藏较新的，'distance'隐藏离中心较远的
      allowClick: !1,
      ...t
    }, this.billboardCollection = new P.BillboardCollection(), this.layer = this.viewer.scene.primitives.add(this.billboardCollection), this.data = [], this.bubbleSizes = /* @__PURE__ */ new Map(), this.eventListener = null, this.customVisibleArea = null, this.visibleAreaMode = "screen";
  }
  /**
   * 新增数据
   */
  setData(e) {
    if (this.clearLayer(), !Array.isArray(e)) {
      console.error("data must be an array.");
      return;
    }
    this.data = e, e.forEach((t) => {
      this.addLayer(t);
    });
  }
  /**
   * 添加图标图层
   */
  addLayer(e) {
    var g, m, v, p, _, w, C, b;
    if (!e || !e.geometry || !e.geometry.coordinates) {
      console.error("缺少coordinates字段");
      return;
    }
    let t = e.geometry.coordinates[0], i = e.geometry.coordinates[1], o = e.geometry.coordinates[2] || 0;
    const a = lu({
      title: e.properties.title || (e == null ? void 0 : e.title) || "",
      showTitle: ((g = this.config) == null ? void 0 : g.showTitle) || !1,
      content: ((m = e == null ? void 0 : e.properties) == null ? void 0 : m.content) || (e == null ? void 0 : e.content) || [],
      baseColor: (v = this.config) == null ? void 0 : v.baseColor,
      bodyColor: (p = this.config) == null ? void 0 : p.bodyColor,
      headerOpacity: (_ = this.config) == null ? void 0 : _.headerOpacity,
      bodyOpacity: (w = this.config) == null ? void 0 : w.bodyOpacity,
      align: this.config.align,
      // 注意这里应该是contentAlign，不是algin
      scale: 1,
      titleFontSize: (C = this.config) == null ? void 0 : C.titleFontSize,
      contentFontSize: (b = this.config) == null ? void 0 : b.contentFontSize
    });
    if (a.width > 1920 || a.height > 1080) {
      console.warn("Canvas size too large, skipping...");
      return;
    }
    const u = e.properties.id || Ft(), h = {
      position: P.Cartesian3.fromDegrees(t, i, o),
      image: a,
      verticalOrigin: P.VerticalOrigin.BOTTOM,
      id: u,
      disableDepthTestDistance: Number.POSITIVE_INFINITY,
      scale: 1,
      scaleByDistance: new P.NearFarScalar(15e4, 1, 4e5, 0.5),
      pixelOffset: new P.Cartesian2(this.config.offset[0], this.config.offset[1]),
      pixelOffsetScaleByDistance: new P.NearFarScalar(15e4, 1, 4e5, 0.5)
    }, f = this.billboardCollection.add(h);
    return f.properties = {
      ...e.properties
    }, this.bubbleSizes.set(u, {
      width: a.width,
      height: a.height,
      createdTime: Date.now()
      // 记录创建时间，用于按时间隐藏策略
    }), this.eventListener || (this.eventListener = (S) => this.render(), this.viewer.clock.onTick.addEventListener(this.eventListener)), this.config.allowClick || (f.pickPrimitive = this.config.allowClick), f;
  }
  /**
   * 渲染和碰撞检测
   */
  render() {
    const e = [], t = /* @__PURE__ */ new Map();
    this.billboardCollection._billboards.forEach((i) => {
      const o = P.SceneTransforms.wgs84ToWindowCoordinates(
        this.viewer.scene,
        i.position
      ), a = P.Cartographic.fromCartesian(i.position);
      let u = !1;
      if (this.visibleAreaMode === "custom" && this.customVisibleArea) {
        if (u = this.isPointInVisibleArea(a), !u) {
          i.show = !1;
          return;
        }
        u = o && o.x && o.y;
      } else if (o && o.x && o.y)
        if (Math.abs(o.x) > window.innerWidth || Math.abs(o.y) > window.innerHeight) {
          i.show = !1;
          return;
        } else
          u = !0;
      if (u) {
        i.show = !0;
        const h = this.bubbleSizes.get(i.id);
        if (!h) return;
        const f = h.width * i.scale, g = h.height * i.scale, m = i.pixelOffset ? i.pixelOffset.x : 0, v = i.pixelOffset ? i.pixelOffset.y : 0, p = {
          id: i.id,
          billboard: i,
          left: o.x + m - f / 2,
          right: o.x + m + f / 2,
          top: o.y + v - g,
          bottom: o.y + v,
          width: f,
          height: g,
          area: f * g,
          createdTime: h.createdTime,
          screenPosition: o
        };
        t.set(i.id, p), e.push(p);
      } else
        i.show = !1;
    }), this.config.enableCollisionDetection && e.length > 1 && this.performCollisionDetection(e, t);
  }
  /**
   * 设置自定义可视区域
   * @param {Object} geometry - turf 多边形或多边形集合
   */
  setVisibleArea(e) {
    e && (e.type === "Polygon" || e.type === "MultiPolygon") ? (this.customVisibleArea = e, this.visibleAreaMode = "custom") : console.error("Invalid geometry type. Must be Polygon or MultiPolygon.");
  }
  /**
   * 清除自定义可视区域，恢复屏幕视口判断
   */
  clearVisibleArea() {
    this.customVisibleArea = null, this.visibleAreaMode = "screen";
  }
  /**
   * 检查点是否在可视区域内
   */
  isPointInVisibleArea(e) {
    if (this.visibleAreaMode === "custom" && this.customVisibleArea) {
      const t = P.Math.toDegrees(e.longitude), i = P.Math.toDegrees(e.latitude), o = de([t, i]);
      return Ko(o, this.customVisibleArea);
    }
    return !0;
  }
  /**
   * 执行碰撞检测
   */
  performCollisionDetection(e, t) {
    let i;
    switch (this.config.hideStrategy) {
      case "smaller":
        i = [...e].sort((a, u) => u.area - a.area);
        break;
      case "newer":
        i = [...e].sort((a, u) => a.createdTime - u.createdTime);
        break;
      case "distance":
        i = [...e].sort((a, u) => {
          const h = this.calculateDistanceToScreenCenter(a.screenPosition), f = this.calculateDistanceToScreenCenter(u.screenPosition);
          return h - f;
        });
        break;
      default:
        i = [...e].sort((a, u) => u.area - a.area);
    }
    const o = /* @__PURE__ */ new Set();
    for (const a of i) {
      let u = !0;
      for (const h of o) {
        const f = t.get(h);
        if (f && this.checkCollision(a, f))
          if (u = this.decideWhichToHide(a, f), u)
            f.billboard.show = !1, o.delete(f.id);
          else
            break;
      }
      u ? (a.billboard.show = !0, o.add(a.id)) : a.billboard.show = !1;
    }
  }
  /**
   * 检查两个气泡是否碰撞
   */
  checkCollision(e, t) {
    const i = Math.max(e.left, t.left), o = Math.min(e.right, t.right), a = Math.max(e.top, t.top), u = Math.min(e.bottom, t.bottom);
    if (i >= o || a >= u)
      return !1;
    const h = (o - i) * (u - a), f = Math.min(e.area, t.area);
    return h / f > this.config.collisionThreshold;
  }
  /**
   * 根据策略决定隐藏哪个气泡
   */
  decideWhichToHide(e, t) {
    switch (this.config.hideStrategy) {
      case "smaller":
        return e.area >= t.area;
      case "newer":
        return e.createdTime <= t.createdTime;
      case "distance":
        const i = this.calculateDistanceToScreenCenter(e.screenPosition), o = this.calculateDistanceToScreenCenter(t.screenPosition);
        return i <= o;
      default:
        return e.area >= t.area;
    }
  }
  /**
   * 计算到屏幕中心的距离
   */
  calculateDistanceToScreenCenter(e) {
    const t = this.viewer.scene.canvas, i = t.width / 2, o = t.height / 2, a = e.x - i, u = e.y - o;
    return Math.sqrt(a * a + u * u);
  }
  /**
   * 移除指定的图标
   */
  removeLayer(e) {
    if (!e) {
      console.error("Billboard is required to remove.");
      return;
    }
    this.bubbleSizes.delete(e.id), this.billboardCollection.remove(e);
  }
  /**
   * 清空所有图标
   */
  clearLayer() {
    this.bubbleSizes.clear(), this.billboardCollection.removeAll();
  }
  /**
   * 显示
   */
  show() {
    this.billboardCollection && (this.billboardCollection.show = !0);
  }
  /**
   * 隐藏
   */
  hide() {
    this.billboardCollection && (this.billboardCollection.show = !1);
  }
  /**
   * 根据id重新绘制图标
   */
  updateLayerById(e, t) {
    var o, a;
    if (!e) {
      console.error("ID is required to remove.");
      return;
    }
    let i = this.billboardCollection._billboards.findIndex((u) => u.id === e);
    if (i !== -1) {
      const u = this.billboardCollection.get(i), h = lu({
        title: t.title || "",
        showTitle: this.config.showTitle || !1,
        content: t.content || [],
        baseColor: this.config.baseColor,
        bodyColor: this.config.bodyColor,
        headerOpacity: this.config.headerOpacity,
        bodyOpacity: this.config.bodyOpacity,
        align: this.config.align,
        scale: 1,
        titleFontSize: (o = this.config) == null ? void 0 : o.titleFontSize,
        contentFontSize: (a = this.config) == null ? void 0 : a.contentFontSize
      });
      u.setImage("", h), this.bubbleSizes.set(e, {
        width: h.width,
        height: h.height,
        createdTime: Date.now()
        // 重置创建时间
      });
    }
  }
  /**
   * 根据ID获取图标
   * @param {string | symbol} id 图标的唯一标识符
   */
  getLayerById(e) {
    if (!e) {
      console.error("ID is required to get.");
      return;
    }
    for (let t = 0; t < this.billboardCollection.length; t++) {
      const i = this.billboardCollection.get(t);
      if (i.id === e)
        return i;
    }
    return null;
  }
  /**
   * 根据ID移除图标
   */
  removeLayerById(e) {
    if (!e) {
      console.error("ID is required to remove.");
      return;
    }
    this.bubbleSizes.delete(e);
    for (let t = 0; t < this.billboardCollection.length; t++) {
      const i = this.billboardCollection.get(t);
      if (i.id === e) {
        this.billboardCollection.remove(i);
        break;
      }
    }
  }
  /**
   * 销毁图层，清理资源
   */
  destroy() {
    this.eventListener && (this.viewer.clock.onTick.removeEventListener(this.eventListener), this.eventListener = null), this.bubbleSizes.clear(), this.clearLayer(), this.layer && this.viewer && this.viewer.scene && this.viewer.scene.primitives.remove(this.layer), this.layer = null, this.billboardCollection = null, this.viewer = null;
  }
  /**
   * 更新配置
   */
  updateConfig(e) {
    this.config = {
      ...this.config,
      ...e
    };
  }
}
class K_ {
  constructor(e, t) {
    this.viewer = e, this.config = {
      fillColor: "#40aee2ff",
      outlineColor: "#11374cff",
      outlineWidth: 2,
      height: 0,
      extrudedHeight: void 0,
      radius: 100,
      xRadius: 100,
      yRadius: 100,
      opacity: 1,
      ...t
    }, this.layer = new P.CustomDataSource("circle-group-layer"), this.viewer.dataSources.add(this.layer);
  }
  /**
   * 新增数据
   */
  setData(e) {
    if (this.clearLayer(), !Array.isArray(e)) {
      console.error("data must be an array.");
      return;
    }
    e.forEach((t) => {
      this.addLayer(t);
    });
  }
  /**
   * 添加圆图层
   */
  addLayer(e) {
    var b, S, I, N, A, R, U, V, k, M;
    if (!e || !e.geometry || !e.geometry.coordinates) {
      console.error("缺少coordinates字段");
      return;
    }
    let t = e.geometry.coordinates[0], i = e.geometry.coordinates[1], o = e.geometry.coordinates[2] || this.config.height;
    const a = ((b = e.properties) == null ? void 0 : b.xRadius) || this.config.xRadius || this.config.radius, u = ((S = e.properties) == null ? void 0 : S.yRadius) || this.config.yRadius || this.config.radius, h = ((I = e.properties) == null ? void 0 : I.fillColor) || this.config.fillColor, f = ((N = e.properties) == null ? void 0 : N.outline) || this.config.outline || !1, g = ((A = e.properties) == null ? void 0 : A.outlineColor) || this.config.outlineColor, m = ((R = e.properties) == null ? void 0 : R.outlineWidth) || this.config.outlineWidth, v = ((U = e.properties) == null ? void 0 : U.extrudedHeight) || this.config.extrudedHeight, p = ((V = e.properties) == null ? void 0 : V.rotation) || this.config.rotation || 0, _ = ((k = e.properties) == null ? void 0 : k.opacity) || this.config.opacity, w = ((M = e.properties) == null ? void 0 : M.id) || Ft(), C = this.layer.entities.add({
      id: w,
      position: P.Cartesian3.fromDegrees(t, i, o),
      ellipse: {
        semiMajorAxis: a,
        semiMinorAxis: u,
        height: o,
        extrudedHeight: v,
        material: P.Color.fromCssColorString(h).withAlpha(_),
        outline: f,
        outlineColor: P.Color.fromCssColorString(g),
        outlineWidth: m,
        numberOfVerticalLines: 32,
        rotation: p
      }
    });
    return C.properties = {
      ...e.properties,
      center: [t, i, o]
    }, C;
  }
  /**
   * 清除全部
   */
  clearLayer() {
    this.layer.entities.removeAll();
  }
  /**
   * 显示
   */
  show() {
    this.layer.show = !0;
  }
  /**
   * 隐藏
   */
  hide() {
    this.layer.show = !1;
  }
  /**
   * 根据ID获取圆实例
   * @param id
   * @returns {Entity|null}
   */
  getLayerById(e) {
    return this.layer.entities.getById(e) || null;
  }
  /**
   * 删除圆实例
   * @param circle
   */
  removeLayer(e) {
    e && this.layer.entities.remove(e);
  }
  /**
   * 根据id删除圆实例
   * @param id
   */
  removeLayerById(e) {
    if (!e) {
      console.error("ID is required to remove.");
      return;
    }
    const t = this.getLayerById(e);
    t && this.layer.entities.remove(t);
  }
  //销毁
  destroy() {
    this.viewer && this.layer && this.viewer.dataSources.remove(this.layer), this.layer = null, this.viewer = null;
  }
}
const Oo = "CircleWaveMaterial";
let lc = !1;
function Q_() {
  lc || !P.Material || !P.Material._materialCache || (P.Material._materialCache.addMaterial(Oo, {
    fabric: {
      type: Oo,
      uniforms: {
        color: P.Color.YELLOW.clone(),
        time: 0,
        count: 2,
        gradient: 1
      },
      source: `
        czm_material czm_getMaterial(czm_materialInput materialInput) {
          czm_material material = czm_getDefaultMaterial(materialInput);
          material.diffuse = 1.5 * color.rgb;

          vec2 st = materialInput.st;
          float dis = distance(st, vec2(0.5));
          float per = fract(time);

          if (dis > 0.5) discard;

          float perDis = 0.5 / count;
          float bl = 0.0;

          for (int i = 0; i < 10; i++) {
            if (float(i) <= count) {
              float disNum = perDis * float(i) - dis + per / count;
              if (disNum > 0.0 && disNum < perDis) {
                bl = 1.0 - disNum / perDis;
              }
            }
          }

          material.alpha = pow(bl, gradient);
          return material;
        }
      `
    },
    translucent: () => !0
  }), lc = !0);
}
class J_ {
  constructor(e = {}) {
    this._definitionChanged = new P.Event(), this.color = P.Color.fromCssColorString(e.color || "#FFCB33"), this.duration = e.duration || 3e3, this.count = e.count || 3, this.gradient = e.gradient ?? 0.1, this._startTime = Date.now();
  }
  get isConstant() {
    return !1;
  }
  get definitionChanged() {
    return this._definitionChanged;
  }
  getType() {
    return Oo;
  }
  getValue(e, t = {}) {
    return t.color = P.Color.clone(this.color, t.color), t.time = (Date.now() - this._startTime) % this.duration / this.duration, t.count = this.count, t.gradient = 1 + 10 * (1 - this.gradient), t;
  }
  equals(e) {
    return this === e;
  }
}
class j_ {
  constructor(e, t) {
    this.viewer = e, this.config = {
      color: "#fbad06",
      radius: 1e3,
      duration: 3e3,
      count: 5,
      ...t
    }, this.layer = new P.CustomDataSource("circle-wave-layer"), this.viewer.dataSources.add(this.layer), Q_();
  }
  setData(e = []) {
    if (this.clearLayer(), !Array.isArray(e)) {
      console.error("data must be an array.");
      return;
    }
    e.forEach((t) => this.addLayer(t));
  }
  addLayer(e) {
    var f;
    if (!this.viewer || this.viewer.isDestroyed() || !((f = e == null ? void 0 : e.geometry) != null && f.coordinates)) return;
    const [t, i, o = 0] = e.geometry.coordinates, a = e.properties || {}, u = a.id || Ft(), h = this.layer.entities.add({
      id: u,
      position: P.Cartesian3.fromDegrees(t, i, o),
      ellipse: {
        semiMajorAxis: a.radius || this.config.radius,
        semiMinorAxis: a.radius || this.config.radius,
        material: new J_({
          color: a.color || this.config.color,
          duration: a.duration || this.config.duration,
          count: a.count || this.config.count,
          gradient: 0
        })
      }
    });
    return h.properties = {
      ...a,
      center: [t, i, o]
    }, h;
  }
  /**
   * 清除全部
   */
  clearLayer() {
    this.layer.entities.removeAll();
  }
  /**
   * 显示
   */
  show() {
    this.layer.show = !0;
  }
  /**
   * 隐藏
   */
  hide() {
    this.layer.show = !1;
  }
  /**
   * 根据ID获取圆实例
   * @param id
   * @returns {Entity|null}
   */
  getLayerById(e) {
    return this.layer.entities.getById(e) || null;
  }
  /**
   * 删除圆实例
   * @param circle
   */
  removeLayer(e) {
    e && this.layer.entities.remove(e);
  }
  /**
   * 根据id删除圆实例
   * @param id
   */
  removeLayerById(e) {
    if (!e) {
      console.error("ID is required to remove.");
      return;
    }
    const t = this.getLayerById(e);
    t && this.layer.entities.remove(t);
  }
  destroy() {
    this.viewer && this.layer && this.viewer.dataSources.remove(this.layer), this.layer = null, this.viewer = null;
  }
}
const Ao = "CircleExplosionMaterial";
let cc = !1;
function e1() {
  cc || !P.Material || !P.Material._materialCache || (P.Material._materialCache.addMaterial(Ao, {
    fabric: {
      type: Ao,
      uniforms: {
        color: P.Color.RED.clone(),
        time: 0,
        speed: 1,
        fillAlpha: 0.25,
        edgeWidth: 0.03,
        waveWidth: 0.05
      },
      source: `
        czm_material czm_getMaterial(czm_materialInput materialInput) {
          czm_material material = czm_getDefaultMaterial(materialInput);

          vec2 st = materialInput.st;
          float dis = distance(st, vec2(0.5));
          float t = fract(time * speed);

          // 圆半径
          float radius = 0.5;

          if (dis > radius) discard;

          // 底层填充
          float baseAlpha = fillAlpha * (1.0 - dis / radius);

          // 外圈亮边
          float edge = smoothstep(radius - edgeWidth, radius, dis);

          // 扩散波
          float waveRadius = t * radius;
          float wave = smoothstep(waveRadius - waveWidth, waveRadius, dis) *
                       (1.0 - smoothstep(waveRadius, waveRadius + waveWidth, dis));

          material.diffuse = color.rgb;

          material.alpha = baseAlpha + edge * 0.8 + wave;

          return material;
        }
      `
    },
    translucent: () => !0
  }), cc = !0);
}
class t1 {
  constructor(e = {}) {
    this._definitionChanged = new P.Event(), this.color = P.Color.fromCssColorString(e.color || "#ff0000"), this.duration = e.duration || 2e3, this.speed = e.speed || 1, this.fillAlpha = e.fillAlpha ?? 0.25, this.edgeWidth = e.edgeWidth ?? 0.03, this.waveWidth = e.waveWidth ?? 0.05, this._startTime = Date.now();
  }
  get isConstant() {
    return !1;
  }
  get definitionChanged() {
    return this._definitionChanged;
  }
  getType() {
    return Ao;
  }
  getValue(e, t = {}) {
    return t.color = P.Color.clone(this.color, t.color), t.time = (Date.now() - this._startTime) % this.duration / this.duration, t.speed = this.speed, t.fillAlpha = this.fillAlpha, t.edgeWidth = this.edgeWidth, t.waveWidth = this.waveWidth, t;
  }
  equals(e) {
    return this === e;
  }
}
class n1 {
  constructor(e, t = {}) {
    this.viewer = e, this.config = {
      color: "#ff2a2a",
      radius: 1e3,
      //半径
      duration: 2e3,
      //持续时间
      speed: 1,
      //速度
      fillAlpha: 0.25,
      //填充透明度
      edgeWidth: 0.03,
      //边缘宽度
      waveWidth: 0.05,
      //扩散波宽度
      height: 0,
      ...t
    }, this.layer = new P.CustomDataSource("circle-explosion-layer"), this.viewer.dataSources.add(this.layer), e1();
  }
  setData(e = []) {
    this.clearLayer(), Array.isArray(e) && e.forEach((t) => this.addLayer(t));
  }
  addLayer(e) {
    var f;
    if (!this.viewer || this.viewer.isDestroyed() || !((f = e == null ? void 0 : e.geometry) != null && f.coordinates)) return;
    const [t, i, o = this.config.height] = e.geometry.coordinates, a = e.properties || {}, u = a.id || Ft(), h = this.layer.entities.add({
      id: u,
      position: P.Cartesian3.fromDegrees(t, i, o),
      ellipse: {
        semiMajorAxis: a.radius || this.config.radius,
        semiMinorAxis: a.radius || this.config.radius,
        material: new t1({
          color: a.color || this.config.color,
          duration: a.duration || this.config.duration,
          speed: a.speed ?? this.config.speed,
          fillAlpha: a.fillAlpha ?? this.config.fillAlpha,
          edgeWidth: a.edgeWidth ?? this.config.edgeWidth,
          waveWidth: a.waveWidth ?? this.config.waveWidth
        })
      }
    });
    return h.properties = {
      ...a,
      center: [t, i, o]
    }, h;
  }
  clearLayer() {
    this.layer.entities.removeAll();
  }
  show() {
    this.layer.show = !0;
  }
  hide() {
    this.layer.show = !1;
  }
  getLayerById(e) {
    return this.layer.entities.getById(e) || null;
  }
  removeLayerById(e) {
    if (!e) {
      console.error("ID is required to remove.");
      return;
    }
    const t = this.getLayerById(e);
    t && this.layer.entities.remove(t);
  }
  destroy() {
    this.viewer && this.layer && this.viewer.dataSources.remove(this.layer), this.layer = null, this.viewer = null;
  }
}
const Ro = "PointRippleMaterial";
let hc = !1;
function r1() {
  hc || !P.Material || !P.Material._materialCache || (P.Material._materialCache.addMaterial(Ro, {
    fabric: {
      type: Ro,
      uniforms: {
        color: new P.Color(1, 0, 0, 1),
        time: 1,
        speed: 1,
        innerFade: 1.5,
        // 中心衰减强度
        ringWidth: 0.06
        // 外圈宽度
      },
      source: `
        czm_material czm_getMaterial(czm_materialInput materialInput) {
          czm_material material = czm_getDefaultMaterial(materialInput);

          vec2 st = materialInput.st - 0.5;
          float dist = length(st) * 2.0;   // 0 ~ 1
          float t = fract(time * speed);

          if (dist > 1.0) discard;

          // 当前扩散半径
          float radius = t;

          // 外圈亮边
          float ring = smoothstep(radius, radius - ringWidth, dist);

          // 中心径向渐变（越靠近中心越透明）
          float centerFade = pow(dist, innerFade);

          float alpha = ring * centerFade;

          material.diffuse = color.rgb * 2.0;
          material.alpha = alpha * color.a;

          return material;
        }
      `
    },
    translucent: () => !0
  }), hc = !0);
}
class i1 {
  constructor(e = {}) {
    this._definitionChanged = new P.Event(), this.color = P.Color.fromCssColorString(e.color || "#ff3b30"), this.duration = e.duration || 2e3, this.speed = e.speed ?? 1, this.innerFade = e.innerFade ?? 1.5, this.ringWidth = e.ringWidth ?? 0.06, this._startTime = Date.now();
  }
  get isConstant() {
    return !1;
  }
  get definitionChanged() {
    return this._definitionChanged;
  }
  getType() {
    return Ro;
  }
  getValue(e, t = {}) {
    return t.color = this.color, t.time = (Date.now() - this._startTime) % this.duration / this.duration, t.speed = this.speed, t.innerFade = this.innerFade, t.ringWidth = this.ringWidth, t;
  }
  equals(e) {
    return this === e;
  }
}
class s1 {
  constructor(e, t = {}) {
    this.viewer = e, this.config = {
      color: "#ff2d2d",
      radius: 1500,
      //半径
      duration: 3e3,
      //持续时间
      speed: 1,
      //速度
      innerFade: 1.5,
      //内环淡入
      ringWidth: 0.01,
      //环宽度
      height: 0,
      ...t
    }, this.layer = new P.CustomDataSource("point-ripple-layer"), this.viewer.dataSources.add(this.layer), r1();
  }
  /**
   * data: [{ geometry: { coordinates: [lon, lat, height?] }, properties: { radius, color, duration, speed } }]
   */
  setData(e = []) {
    this.clearLayer(), Array.isArray(e) && e.forEach((t) => this.addLayer(t));
  }
  addLayer(e) {
    var f;
    if (!this.viewer || this.viewer.isDestroyed() || !((f = e == null ? void 0 : e.geometry) != null && f.coordinates)) return;
    const [t, i, o = this.config.height] = e.geometry.coordinates, a = e.properties || {}, u = a.id || Ft(), h = this.layer.entities.add({
      id: u,
      position: P.Cartesian3.fromDegrees(t, i, o),
      ellipse: {
        semiMajorAxis: a.radius || this.config.radius,
        semiMinorAxis: a.radius || this.config.radius,
        // height,
        // 🔥 关键
        // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        // classificationType: Cesium.ClassificationType.BOTH,
        material: new i1({
          color: a.color || this.config.color,
          duration: a.duration || this.config.duration,
          speed: a.speed ?? this.config.speed,
          innerFade: a.innerFade ?? this.config.innerFade,
          ringWidth: a.ringWidth ?? this.config.ringWidth
        })
      }
    });
    return h.properties = {
      ...a,
      center: [t, i, o]
    }, h;
  }
  clearLayer() {
    this.layer.entities.removeAll();
  }
  show() {
    this.layer.show = !0;
  }
  hide() {
    this.layer.show = !1;
  }
  getLayerById(e) {
    return this.layer.entities.getById(e) || null;
  }
  removeById(e) {
    const t = this.getById(e);
    t && this.layer.entities.remove(t);
  }
  destroy() {
    this.viewer && this.layer && this.viewer.dataSources.remove(this.layer), this.layer = null, this.viewer = null;
  }
}
class o1 {
  constructor(e, t = {}) {
    this.viewer = e, this.config = {
      color: "#ffffff",
      lineWidth: 2,
      opacity: 0.6,
      ...t
    }, this.polygonPrimitive = null, this.linePrimitive = null, this.data = [];
  }
  /**
   * 设置数据
   */
  setData(e) {
    if (!Array.isArray(e)) {
      console.error("data must be an array.");
      return;
    }
    this.data = e, this.clearLayer();
    let t = [], i = [];
    e.forEach((u) => {
      var m, v;
      const h = (m = u.geometry) == null ? void 0 : m.coordinates, f = ((v = u.geometry) == null ? void 0 : v.type) || "Polygon";
      if (!h || !h.length) return;
      const g = (p) => {
        var A, R, U;
        const _ = p[0], w = p.slice(1), C = [];
        _.forEach((V) => C.push(V[0], V[1]));
        const b = w.map((V) => {
          const k = [];
          return V.forEach((M) => k.push(M[0], M[1])), new P.PolygonHierarchy(
            P.Cartesian3.fromDegreesArray(k)
          );
        }), S = new P.PolygonGeometry({
          polygonHierarchy: new P.PolygonHierarchy(
            P.Cartesian3.fromDegreesArray(C),
            b
          ),
          vertexFormat: P.PerInstanceColorAppearance.VERTEX_FORMAT
        }), I = ((A = u.properties) == null ? void 0 : A.id) || Ft();
        t.push(new P.GeometryInstance({
          geometry: S,
          id: I,
          attributes: {
            color: P.ColorGeometryInstanceAttribute.fromColor(
              P.Color.fromCssColorString(((R = u.properties) == null ? void 0 : R.color) || this.config.color).withAlpha(this.config.opacity)
            )
          }
        }));
        const N = (V) => {
          const k = [];
          return V.forEach((M) => k.push(M[0], M[1])), k.push(V[0][0], V[0][1]), P.Cartesian3.fromDegreesArray(k);
        };
        i.push(new P.GeometryInstance({
          geometry: new P.PolylineGeometry({
            positions: N(_),
            width: this.config.lineWidth || 2
          }),
          id: I,
          attributes: {
            color: P.ColorGeometryInstanceAttribute.fromColor(
              P.Color.fromCssColorString(((U = u.properties) == null ? void 0 : U.color) || this.config.color)
            )
          }
        })), w.forEach((V) => {
          var k;
          i.push(new P.GeometryInstance({
            geometry: new P.PolylineGeometry({
              positions: N(V),
              width: this.config.lineWidth || 2
            }),
            id: I,
            attributes: {
              color: P.ColorGeometryInstanceAttribute.fromColor(
                P.Color.fromCssColorString(((k = u.properties) == null ? void 0 : k.color) || this.config.color)
              )
            }
          }));
        });
      };
      f === "Polygon" && g(h), f === "MultiPolygon" && h.forEach((p) => {
        g(p);
      });
    });
    const o = new P.PerInstanceColorAppearance({
      translucent: !1,
      closed: !0,
      faceForward: !0,
      renderState: P.RenderState.fromCache({
        depthTest: { enabled: !0 },
        depthMask: !0,
        //写入深度，防止颜色污染
        blending: P.BlendingState.ALPHA_BLEND
      })
    });
    this.polygonPrimitive = this.viewer.scene.primitives.add(
      new P.Primitive({
        geometryInstances: t,
        appearance: o,
        asynchronous: !1
      })
    );
    const a = new P.PolylineColorAppearance({ translucent: !1 });
    this.linePrimitive = this.viewer.scene.primitives.add(
      new P.Primitive({
        geometryInstances: i,
        appearance: a,
        asynchronous: !1
      })
    );
  }
  /**
   * 清空图层
   */
  clearLayer() {
    this.polygonPrimitive && (this.viewer.scene.primitives.remove(this.polygonPrimitive), this.polygonPrimitive = null, this.viewer.scene.primitives.remove(this.linePrimitive), this.linePrimitive = null);
  }
  /**
   * 显示
   */
  show() {
    this.polygonPrimitive && (this.polygonPrimitive.show = !0, this.linePrimitive.show = !0);
  }
  /**
   * 隐藏
   */
  hide() {
    this.polygonPrimitive && (this.polygonPrimitive.show = !1, this.linePrimitive.show = !1);
  }
  /**
   * 根据ID获取面对象
   */
  getLayerById(e) {
    return this.polygonPrimitive ? this.polygonPrimitive.getGeometryInstanceAttributes(e) : null;
  }
  /**
   * 根据ID获取数据
   */
  getLayerDataById(e) {
    return this.data.find((t) => {
      var i;
      return ((i = t.properties) == null ? void 0 : i.id) === e;
    });
  }
  /**
   * 销毁
   */
  destroy() {
    this.clearLayer(), this.viewer = null, this.data = [];
  }
}
class a1 {
  constructor(e, t) {
    this.viewer = e, this.config = {
      type: "glow",
      width: 2,
      color: "#ffffff",
      outlineColor: "#ff0000",
      ...t
    }, this.linePrimitive = null, this.data = [];
  }
  getAppearance(e) {
    var i, o, a, u, h, f, g;
    const t = P.Color.fromCssColorString(this.config.color);
    switch (e) {
      case "dash":
        return new P.PolylineMaterialAppearance({
          material: P.Material.fromType(P.Material.PolylineDashType, {
            color: t,
            //颜色
            gapColor: (i = this.config) != null && i.gapColor ? new P.Color.fromCssColorString((o = this.config) == null ? void 0 : o.gapColor) : P.Color.TRANSPARENT,
            //间隙颜色
            dashLength: ((a = this.config) == null ? void 0 : a.dashLength) || 16
            //虚线长度
          }),
          translucent: !1
        });
      case "glow":
        return new P.PolylineMaterialAppearance({
          material: P.Material.fromType(P.Material.PolylineGlowType, {
            color: t,
            glowPower: ((u = this.config) == null ? void 0 : u.glowPower) || 0.25,
            taperPower: ((h = this.config) == null ? void 0 : h.taperPower) || 1
          }),
          translucent: !1
        });
      case "outline":
        return new P.PolylineMaterialAppearance({
          material: P.Material.fromType(P.Material.PolylineOutlineType, {
            color: t,
            outlineWidth: ((f = this.config) == null ? void 0 : f.outlineWidth) || 1,
            outlineColor: new P.Color.fromCssColorString((g = this.config) == null ? void 0 : g.outlineColor)
          }),
          translucent: !1
        });
      case "arrow":
        return new P.PolylineMaterialAppearance({
          material: P.Material.fromType(P.Material.PolylineArrowType, {
            color: t
          }),
          translucent: !1
        });
    }
  }
  /**
   * 新增数据
   */
  setData(e) {
    if (!Array.isArray(e)) {
      console.error("data must be an array.");
      return;
    }
    this.data = e, this.clearLayer();
    let t = [];
    e.forEach((a) => {
      var g;
      let u = a.geometry.coordinates, h = [];
      u.forEach((m) => {
        h.push(m[0], m[1]);
      });
      const f = new P.PolylineGeometry({
        positions: P.Cartesian3.fromDegreesArray(h),
        width: ((g = a == null ? void 0 : a.properties) == null ? void 0 : g.width) || this.config.width,
        vertexFormat: P.PolylineMaterialAppearance.VERTEX_FORMAT
      });
      f.properties = {
        ...a.properties
      }, t.push(
        new P.GeometryInstance({
          geometry: f,
          id: a.properties.id || Ft(),
          attributes: {
            color: P.ColorGeometryInstanceAttribute.fromColor(
              a.properties.color ? new P.Color.fromCssColorString(a.properties.color) : new P.Color.fromCssColorString(this.config.color)
            )
          }
        })
      );
    });
    const i = this.getAppearance(this.config.type), o = new P.Primitive({
      geometryInstances: t,
      appearance: i,
      asynchronous: !1,
      // 设置较低的绘制顺序，让线先绘制
      depthFailAppearance: void 0
    });
    this.linePrimitive = this.viewer.scene.primitives.add(o, 0), console.log(this.linePrimitive, "linePrimitive");
  }
  /**
   * 清空所有线
   */
  clearLayer() {
    this.linePrimitive && (this.viewer.scene.primitives.remove(this.linePrimitive), this.linePrimitive = null);
  }
  /**
   * 显示
   */
  show() {
    this.linePrimitive && (this.linePrimitive.show = !0);
  }
  /**
   * 隐藏
   */
  hide() {
    this.linePrimitive && (this.linePrimitive.show = !1);
  }
  /**
   * 根据ID获取线对象
   * @param {string | symbol} id 线的唯一标识符
   */
  getLayerById(e) {
    return this.linePrimitive.getGeometryInstanceAttributes(e);
  }
  /**
   * 根据Id获取线数据
   */
  getLayerDataById(e) {
    let t = null;
    return t = this.data.find((i) => i.properties.id === e), t;
  }
  /**
   * 销毁
   */
  destroy() {
    this.clearLayer();
  }
}
function fc(n, e) {
  return Number.isFinite(n) ? n : e;
}
class u1 {
  constructor(e, t = {}) {
    this.viewer = e, this.config = {
      radius: 50,
      // 像素半径（局部贴图下才有意义）
      maxValue: 100,
      gradient: {
        0.25: "rgb(0,0,255)",
        0.55: "rgb(0,255,0)",
        0.85: "rgb(255,255,0)",
        1: "rgb(255,0,0)"
      },
      ...t
    }, this._canvasSize = 1024, this._canvas = document.createElement("canvas"), this._canvas.width = this._canvasSize, this._canvas.height = this._canvasSize, this._ctx = this._canvas.getContext("2d", { willReadFrequently: !0 }), this._createGradientMap(), this._layer = e.entities.add({
      rectangle: {
        coordinates: P.Rectangle.fromDegrees(0, 0, 0, 0),
        material: new P.ImageMaterialProperty({
          image: this._canvas,
          transparent: !0
        })
      }
    }), this._points = [], this._rect = null;
  }
  _createGradientMap() {
    const e = document.createElement("canvas");
    e.width = 256, e.height = 1;
    const t = e.getContext("2d"), i = t.createLinearGradient(0, 0, 256, 0), o = this.config.gradient;
    Object.keys(o).forEach((a) => {
      i.addColorStop(Number(a), o[a]);
    }), t.fillStyle = i, t.fillRect(0, 0, 256, 1), this._gradientData = t.getImageData(0, 0, 256, 1).data;
  }
  _calcBounds(e) {
    let t = 180, i = 90, o = -180, a = -90;
    e.forEach((h) => {
      t = Math.min(t, h.lon), i = Math.min(i, h.lat), o = Math.max(o, h.lon), a = Math.max(a, h.lat);
    });
    const u = 0.01;
    return P.Rectangle.fromDegrees(
      t - u,
      i - u,
      o + u,
      a + u
    );
  }
  setData(e = []) {
    if (this._points = [], !!Array.isArray(e)) {
      if (e.forEach((t) => {
        var u, h;
        if (!((u = t == null ? void 0 : t.geometry) != null && u.coordinates)) return;
        const [i, o] = t.geometry.coordinates, a = fc((h = t.properties) == null ? void 0 : h.value, 50);
        Number.isFinite(i) && Number.isFinite(o) && this._points.push({ lon: i, lat: o, value: a });
      }), !this._points.length)
        return this.clearLayer();
      this._rect = this._calcBounds(this._points), this._layer.rectangle.coordinates = this._rect, this._draw();
    }
  }
  _draw() {
    const e = this._ctx, t = this._canvasSize;
    if (e.clearRect(0, 0, t, t), !this._rect) return;
    const i = this._rect, o = P.Math.toDegrees(i.west), a = P.Math.toDegrees(i.south), u = P.Math.toDegrees(i.east), h = P.Math.toDegrees(i.north), f = u - o || 1e-6, g = h - a || 1e-6;
    this._points.forEach((m) => {
      const v = (m.lon - o) / f * t, p = (h - m.lat) / g * t;
      if (!Number.isFinite(v) || !Number.isFinite(p)) return;
      const _ = Math.max(1, fc(this.config.radius, 50)), w = e.createRadialGradient(v, p, 0, v, p, _), C = Math.min(m.value / this.config.maxValue, 1);
      w.addColorStop(0, `rgba(0,0,0,${C})`), w.addColorStop(1, "rgba(0,0,0,0)"), e.fillStyle = w, e.beginPath(), e.arc(v, p, _, 0, Math.PI * 2), e.fill();
    }), this._applyGradient();
  }
  _applyGradient() {
    const e = this._ctx, t = this._canvasSize, i = e.getImageData(0, 0, t, t), o = i.data, a = this._gradientData;
    for (let u = 0; u < o.length; u += 4) {
      const h = o[u + 3];
      if (h === 0) continue;
      const f = Math.min(255, h);
      o[u] = a[f * 4], o[u + 1] = a[f * 4 + 1], o[u + 2] = a[f * 4 + 2];
    }
    e.putImageData(i, 0, 0);
  }
  clearLayer() {
    this._points = [];
    const e = this._canvasSize;
    this._ctx.clearRect(0, 0, e, e);
    const t = this._layer.rectangle, i = t.material;
    t.material = new P.ImageMaterialProperty({
      image: this._canvas,
      transparent: !0
    }), t.material = i;
  }
  show() {
    this._layer.show = !0;
  }
  hide() {
    this._layer.show = !1;
  }
  destroy() {
    var e;
    (e = this.viewer) == null || e.entities.remove(this._layer), this.viewer = null;
  }
}
var Jn = {
  defaultRadius: 40,
  defaultRenderer: "canvas2d",
  defaultGradient: {
    0.25: "rgb(0,0,255)",
    0.55: "rgb(0,255,0)",
    0.85: "yellow",
    1: "rgb(255,0,0)"
  },
  defaultMaxOpacity: 1,
  defaultMinOpacity: 0,
  defaultBlur: 0.85,
  defaultXField: "x",
  defaultYField: "y",
  defaultValueField: "value",
  plugins: {}
}, l1 = function() {
  var e = function(o) {
    this._coordinator = {}, this._data = [], this._radi = [], this._min = 0, this._max = 1, this._xField = o.xField || o.defaultXField, this._yField = o.yField || o.defaultYField, this._valueField = o.valueField || o.defaultValueField, o.radius && (this._cfgRadius = o.radius);
  }, t = Jn.defaultRadius;
  return e.prototype = {
    // when forceRender = false -> called from setData, omits renderall event
    _organiseData: function(i, o) {
      var a = i[this._xField], u = i[this._yField], h = this._radi, f = this._data, g = this._max, m = this._min, v = i[this._valueField] || 1, p = i.radius || this._cfgRadius || t;
      return f[a] || (f[a] = [], h[a] = []), f[a][u] ? f[a][u] += v : (f[a][u] = v, h[a][u] = p), f[a][u] > g ? (o ? this.setDataMax(f[a][u]) : this._max = f[a][u], !1) : {
        x: a,
        y: u,
        value: v,
        radius: p,
        min: m,
        max: g
      };
    },
    _unOrganizeData: function() {
      var i = [], o = this._data, a = this._radi;
      for (var u in o)
        for (var h in o[u])
          i.push({
            x: u,
            y: h,
            radius: a[u][h],
            value: o[u][h]
          });
      return {
        min: this._min,
        max: this._max,
        data: i
      };
    },
    _onExtremaChange: function() {
      this._coordinator.emit("extremachange", {
        min: this._min,
        max: this._max
      });
    },
    addData: function() {
      if (arguments[0].length > 0)
        for (var i = arguments[0], o = i.length; o--; )
          this.addData.call(this, i[o]);
      else {
        var a = this._organiseData(arguments[0], !0);
        a && this._coordinator.emit("renderpartial", {
          min: this._min,
          max: this._max,
          data: [a]
        });
      }
      return this;
    },
    setData: function(i) {
      var o = i.data, a = o.length;
      this._data = [], this._radi = [];
      for (var u = 0; u < a; u++)
        this._organiseData(o[u], !1);
      return this._max = i.max, this._min = i.min || 0, this._onExtremaChange(), this._coordinator.emit("renderall", this._getInternalData()), this;
    },
    removeData: function() {
    },
    setDataMax: function(i) {
      return this._max = i, this._onExtremaChange(), this._coordinator.emit("renderall", this._getInternalData()), this;
    },
    setDataMin: function(i) {
      return this._min = i, this._onExtremaChange(), this._coordinator.emit("renderall", this._getInternalData()), this;
    },
    setCoordinator: function(i) {
      this._coordinator = i;
    },
    _getInternalData: function() {
      return {
        max: this._max,
        min: this._min,
        data: this._data,
        radi: this._radi
      };
    },
    getData: function() {
      return this._unOrganizeData();
    }
  }, e;
}(), c1 = function() {
  var e = function(a) {
    var u = a.gradient || a.defaultGradient, h = document.createElement("canvas"), f = h.getContext("2d");
    h.width = 256, h.height = 1;
    var g = f.createLinearGradient(0, 0, 256, 1);
    for (var m in u)
      g.addColorStop(m, u[m]);
    return f.fillStyle = g, f.fillRect(0, 0, 256, 1), f.getImageData(0, 0, 256, 1).data;
  }, t = function(a, u) {
    var h = document.createElement("canvas"), f = h.getContext("2d"), g = a, m = a;
    if (h.width = h.height = a * 2, u == 1)
      f.beginPath(), f.arc(g, m, a, 0, 2 * Math.PI, !1), f.fillStyle = "rgba(0,0,0,1)", f.fill();
    else {
      var v = f.createRadialGradient(
        g,
        m,
        a * u,
        g,
        m,
        a
      );
      v.addColorStop(0, "rgba(0,0,0,1)"), v.addColorStop(1, "rgba(0,0,0,0)"), f.fillStyle = v, f.fillRect(0, 0, 2 * a, 2 * a);
    }
    return h;
  }, i = function(m) {
    for (var u = [], h = m.min, f = m.max, g = m.radi, m = m.data, v = Object.keys(m), p = v.length; p--; )
      for (var _ = v[p], w = Object.keys(m[_]), C = w.length; C--; ) {
        var b = w[C], S = m[_][b], I = g[_][b];
        u.push({
          x: _,
          y: b,
          value: S,
          radius: I
        });
      }
    return {
      min: h,
      max: f,
      data: u
    };
  };
  function o(a) {
    var u = a.container, h = this.shadowCanvas = document.createElement("canvas"), f = this.canvas = a.canvas || document.createElement("canvas");
    this._renderBoundaries = [1e4, 1e4, 0, 0];
    var g = getComputedStyle(a.container) || {};
    f.className = "heatmap-canvas", this._width = f.width = h.width = +g.width.replace(/px/, ""), this._height = f.height = h.height = +g.height.replace(/px/, ""), this.shadowCtx = h.getContext("2d"), this.ctx = f.getContext("2d"), f.style.cssText = h.style.cssText = "position:absolute;left:0;top:0;", u.style.position = "relative", u.appendChild(f), this._palette = e(a), this._templates = {}, this._setStyles(a);
  }
  return o.prototype = {
    renderPartial: function(a) {
      this._drawAlpha(a), this._colorize();
    },
    renderAll: function(a) {
      this._clear(), this._drawAlpha(i(a)), this._colorize();
    },
    _updateGradient: function(a) {
      this._palette = e(a);
    },
    updateConfig: function(a) {
      a.gradient && this._updateGradient(a), this._setStyles(a);
    },
    setDimensions: function(a, u) {
      this._width = a, this._height = u, this.canvas.width = this.shadowCanvas.width = a, this.canvas.height = this.shadowCanvas.height = u;
    },
    _clear: function() {
      this.shadowCtx.clearRect(0, 0, this._width, this._height), this.ctx.clearRect(0, 0, this._width, this._height);
    },
    _setStyles: function(a) {
      this._blur = a.blur == 0 ? 0 : a.blur || a.defaultBlur, a.backgroundColor && (this.canvas.style.backgroundColor = a.backgroundColor), this._opacity = (a.opacity || 0) * 255, this._maxOpacity = (a.maxOpacity || a.defaultMaxOpacity) * 255, this._minOpacity = (a.minOpacity || a.defaultMinOpacity) * 255, this._useGradientOpacity = !!a.useGradientOpacity;
    },
    _drawAlpha: function(f) {
      for (var u = this._min = f.min, h = this._max = f.max, f = f.data || [], g = f.length, m = 1 - this._blur; g--; ) {
        var v = f[g], p = v.x, _ = v.y, w = v.radius, C = Math.min(v.value, h), b = p - w, S = _ - w, I = this.shadowCtx, N;
        this._templates[w] ? N = this._templates[w] : this._templates[w] = N = t(w, m), I.globalAlpha = (C - u) / (h - u), I.drawImage(N, b, S), b < this._renderBoundaries[0] && (this._renderBoundaries[0] = b), S < this._renderBoundaries[1] && (this._renderBoundaries[1] = S), b + 2 * w > this._renderBoundaries[2] && (this._renderBoundaries[2] = b + 2 * w), S + 2 * w > this._renderBoundaries[3] && (this._renderBoundaries[3] = S + 2 * w);
      }
    },
    _colorize: function() {
      var a = this._renderBoundaries[0], u = this._renderBoundaries[1], h = this._renderBoundaries[2] - a, f = this._renderBoundaries[3] - u, g = this._width, m = this._height, v = this._opacity, p = this._maxOpacity, _ = this._minOpacity, w = this._useGradientOpacity;
      a < 0 && (a = 0), u < 0 && (u = 0), a + h > g && (h = g - a), u + f > m && (f = m - u);
      for (var C = this.shadowCtx.getImageData(a, u, h, f), b = C.data, S = b.length, I = this._palette, N = 3; N < S; N += 4) {
        var A = b[N], R = A * 4;
        if (R) {
          var U;
          v > 0 ? U = v : A < p ? A < _ ? U = _ : U = A : U = p, b[N - 3] = I[R], b[N - 2] = I[R + 1], b[N - 1] = I[R + 2], b[N] = w ? I[R + 3] : U;
        }
      }
      Object.defineProperty(C, "data", {
        value: b,
        writable: !0,
        configurable: !0,
        enumerable: !0
      }), this.ctx.putImageData(C, a, u), this._renderBoundaries = [1e3, 1e3, 0, 0];
    },
    getValueAt: function(a) {
      var u, h = this.shadowCtx, f = h.getImageData(a.x, a.y, 1, 1), g = f.data[3], m = this._max, v = this._min;
      return u = Math.abs(m - v) * (g / 255) >> 0, u;
    },
    getDataURL: function() {
      return this.canvas.toDataURL();
    }
  }, o;
}(), h1 = function() {
  var e = !1;
  return Jn.defaultRenderer === "canvas2d" && (e = c1), e;
}(), gc = {
  merge: function() {
    for (var n = {}, e = arguments.length, t = 0; t < e; t++) {
      var i = arguments[t];
      for (var o in i)
        n[o] = i[o];
    }
    return n;
  }
}, f1 = function() {
  var e = function() {
    function a() {
      this.cStore = {};
    }
    return a.prototype = {
      on: function(u, h, f) {
        var g = this.cStore;
        g[u] || (g[u] = []), g[u].push(function(m) {
          return h.call(f, m);
        });
      },
      emit: function(u, h) {
        var f = this.cStore;
        if (f[u])
          for (var g = f[u].length, m = 0; m < g; m++) {
            var v = f[u][m];
            v(h);
          }
      }
    }, a;
  }(), t = function(o) {
    var a = o._renderer, u = o._coordinator, h = o._store;
    u.on("renderpartial", a.renderPartial, a), u.on("renderall", a.renderAll, a), u.on("extremachange", function(f) {
      o._config.onExtremaChange && o._config.onExtremaChange({
        min: f.min,
        max: f.max,
        gradient: o._config.gradient || o._config.defaultGradient
      });
    }), h.setCoordinator(u);
  };
  function i() {
    var o = this._config = gc.merge(Jn, arguments[0] || {});
    if (this._coordinator = new e(), o.plugin) {
      var a = o.plugin;
      if (Jn.plugins[a]) {
        var u = Jn.plugins[a];
        this._renderer = new u.renderer(o), this._store = new u.store(o);
      } else
        throw new Error(
          "Plugin '" + a + "' not found. Maybe it was not registered."
        );
    } else
      this._renderer = new h1(o), this._store = new l1(o);
    t(this);
  }
  return i.prototype = {
    addData: function() {
      return this._store.addData.apply(this._store, arguments), this;
    },
    removeData: function() {
      return this._store.removeData && this._store.removeData.apply(this._store, arguments), this;
    },
    setData: function() {
      return this._store.setData.apply(this._store, arguments), this;
    },
    setDataMax: function() {
      return this._store.setDataMax.apply(this._store, arguments), this;
    },
    setDataMin: function() {
      return this._store.setDataMin.apply(this._store, arguments), this;
    },
    configure: function(o) {
      return this._config = gc.merge(this._config, o), this._renderer.updateConfig(this._config), this._coordinator.emit("renderall", this._store._getInternalData()), this;
    },
    repaint: function() {
      return this._coordinator.emit("renderall", this._store._getInternalData()), this;
    },
    getData: function() {
      return this._store.getData();
    },
    getDataURL: function() {
      return this._renderer.getDataURL();
    },
    getValueAt: function(o) {
      return this._store.getValueAt ? this._store.getValueAt(o) : this._renderer.getValueAt ? this._renderer.getValueAt(o) : null;
    }
  }, i;
}(), g1 = {
  create: function(n) {
    return new f1(n);
  },
  register: function(n, e) {
    Jn.plugins[n] = e;
  }
};
class d1 {
  constructor(e, t = {}) {
    this.viewer = e, this.config = {
      renderType: "primitive",
      radius: t.radius || 40,
      gradient: t.gradient || {
        0.25: "rgb(0,0,255)",
        0.55: "rgb(0,255,0)",
        0.85: "rgb(255,255,0)",
        1: "rgb(255,0,0)"
      },
      blur: t.blur ?? 0.85,
      maxOpacity: t.maxOpacity ?? 1,
      minOpacity: t.minOpacity ?? 0,
      maxValue: t.maxValue,
      minValue: t.minValue,
      ...t
    }, this.data = [], this.container = null, this.heatmap = null, this.provider = null, this.bounds = null;
  }
  /*----------------------------------*/
  /* 数据接口 */
  /*----------------------------------*/
  setData(e) {
    if (!Array.isArray(e) || e.length === 0) {
      this.clearLayer(), this.data = [];
      return;
    }
    const t = e.filter((o) => o && o.geometry && Array.isArray(o.geometry.coordinates) && o.geometry.coordinates.length >= 2);
    if (t.length === 0) {
      this.clearLayer(), this.data = [];
      return;
    }
    this.data = t;
    const i = t.map((o) => {
      var h;
      const [a, u] = o.geometry.coordinates;
      return {
        x: a,
        y: u,
        value: Number(((h = o.properties) == null ? void 0 : h.value) ?? 1)
      };
    });
    this._createHeatmap(i);
  }
  /*----------------------------------*/
  /* 创建heatmap */
  /*----------------------------------*/
  _createHeatmap(e) {
    this.clearLayer();
    const t = this._getBounds(e);
    this.bounds = t;
    const { container: i, width: o, height: a } = this._createContainer(t);
    this.container = i;
    const u = [], h = [];
    e.forEach((v) => {
      const p = (v.x - t[0]) / (t[2] - t[0]) * o, _ = (t[3] - v.y) / (t[3] - t[1]) * a;
      u.push({
        x: p,
        y: _,
        value: v.value
      }), h.push(v.value);
    });
    const f = this.config.minValue ?? Math.min(...h), g = this.config.maxValue ?? Math.max(...h), m = {
      min: f,
      max: g,
      data: u
    };
    this.heatmap = g1.create({
      container: i,
      radius: this.config.radius,
      blur: this.config.blur,
      gradient: this.config.gradient,
      maxOpacity: this.config.maxOpacity,
      minOpacity: this.config.minOpacity
    }), this.heatmap.setData(m), this._createLayer();
  }
  /*----------------------------------*/
  /* Cesium Layer */
  /*----------------------------------*/
  _createLayer() {
    const e = this.heatmap.getDataURL();
    this.config.renderType === "primitive" ? (this.provider = this.viewer.scene.primitives.add(
      new P.Primitive({
        geometryInstances: new P.GeometryInstance({
          geometry: new P.RectangleGeometry({
            rectangle: P.Rectangle.fromDegrees(...this.bounds),
            vertexFormat: P.EllipsoidSurfaceAppearance.VERTEX_FORMAT
          })
        }),
        appearance: new P.EllipsoidSurfaceAppearance({
          aboveGround: !1
        })
      })
    ), this.provider.appearance.material = new P.Material({
      fabric: {
        type: "Image",
        uniforms: {
          image: e
        }
      }
    })) : this.config.renderType === "imagery" ? this.provider = this.viewer.imageryLayers.addImageryProvider(
      new P.SingleTileImageryProvider({
        url: e,
        rectangle: P.Rectangle.fromDegrees(...this.bounds)
      })
    ) : this.provider = this.viewer.entities.add({
      rectangle: {
        coordinates: P.Rectangle.fromDegrees(...this.bounds),
        material: new P.ImageMaterialProperty({
          image: e
        })
      }
    });
  }
  /*----------------------------------*/
  /* 更新 */
  /*----------------------------------*/
  _updateLayer() {
    const e = this.heatmap.getDataURL();
    this.provider instanceof P.Primitive && (this.provider.appearance.material.uniforms.image = e), this.provider instanceof P.Entity && (this.provider.rectangle.material = new P.ImageMaterialProperty({
      image: e
    })), this.provider instanceof P.ImageryLayer && (this.viewer.imageryLayers.remove(this.provider), this.provider = this.viewer.imageryLayers.addImageryProvider(
      new P.SingleTileImageryProvider({
        url: e,
        rectangle: P.Rectangle.fromDegrees(...this.bounds)
      })
    ));
  }
  /*----------------------------------*/
  /* 显示隐藏 */
  /*----------------------------------*/
  show() {
    this.provider && (this.provider.show = !0);
  }
  hide() {
    this.provider && (this.provider.show = !1);
  }
  /*----------------------------------*/
  /* 清除 */
  /*----------------------------------*/
  clearLayer() {
    this.provider && (this.provider instanceof P.Primitive && this.viewer.scene.primitives.remove(this.provider), this.provider instanceof P.ImageryLayer && this.viewer.imageryLayers.remove(this.provider), this.provider instanceof P.Entity && this.viewer.entities.remove(this.provider), this.provider = null, this.container && (document.body.removeChild(this.container), this.container = null));
  }
  destroy() {
    this.clearLayer(), this.data = [], this.heatmap = null;
  }
  /*----------------------------------*/
  /* utils */
  /*----------------------------------*/
  _getBounds(e) {
    let t = 180, i = -180, o = 90, a = -90;
    e.forEach((f) => {
      t = Math.min(t, f.x), i = Math.max(i, f.x), o = Math.min(o, f.y), a = Math.max(a, f.y);
    });
    const u = i - t || 1, h = a - o || 1;
    return [
      t - u / 10,
      o - h / 10,
      i + u / 10,
      a + h / 10
    ];
  }
  _createContainer(e) {
    const t = document.createElement("div"), i = 1e3, o = parseInt(
      (1e3 / (e[2] - e[0]) * (e[3] - e[1])).toFixed(0)
    );
    return t.style = `
        width:${i}px;
        height:${o}px;
        position:absolute;
        left:-9999px;
        top:-9999px;
        background: transparent
        `, document.body.appendChild(t), { container: t, width: i, height: o };
  }
}
class v1 {
  constructor(e, t = {}) {
    this.viewer = e, this.config = {
      position: [0, 0, 0],
      radius: 1e3,
      color: "rgb(5,251,248)",
      speed: 1,
      hemisphereAlpha: 0.5,
      scanAlpha: 0.6,
      outlineColor: "#f1f105",
      autoStart: !1,
      ...t
    };
    const [i, o, a = 0] = this.config.position;
    this.centerLongitude = i, this.centerLatitude = o, this.centerHeight = a, this.radius = this.config.radius, this.speed = this.config.speed, this.color = this.getColor(this.config.color), this.outlineColor = this.getColor(this.config.outlineColor), this.heading = 0, this.wallPositions = this.calculateScanPane(
      this.centerLongitude,
      this.centerLatitude,
      this.radius,
      this.heading
    ), this.entities = [], this.eventListener = null, this.createRadar(), this.config.autoStart && this.start();
  }
  createRadar() {
    var e, t;
    !this.viewer || (t = (e = this.viewer).isDestroyed) != null && t.call(e) || this.entities.length || (this.createHemisphere(), this.createScanWall());
  }
  start() {
    var e, t;
    !this.viewer || (t = (e = this.viewer).isDestroyed) != null && t.call(e) || this.eventListener || (this.eventListener = () => {
      this.heading = (this.heading + this.speed) % 360, this.wallPositions = this.calculateScanPane(
        this.centerLongitude,
        this.centerLatitude,
        this.radius,
        this.heading
      );
    }, this.viewer.clock.onTick.addEventListener(this.eventListener));
  }
  createHemisphere() {
    const e = this.viewer.entities.add({
      position: P.Cartesian3.fromDegrees(
        this.centerLongitude,
        this.centerLatitude,
        this.centerHeight
      ),
      name: "3D radar scanner",
      ellipsoid: {
        radii: new P.Cartesian3(this.radius, this.radius, this.radius),
        maximumCone: P.Math.toRadians(90),
        material: this.color.withAlpha(this.config.hemisphereAlpha),
        outline: !0,
        outlineColor: this.outlineColor,
        outlineWidth: 1
      }
    });
    return this.entities.push(e), e;
  }
  createScanWall() {
    const e = this.viewer.entities.add({
      wall: {
        positions: new P.CallbackProperty(() => P.Cartesian3.fromDegreesArrayHeights(this.wallPositions), !1),
        material: this.color.withAlpha(this.config.scanAlpha)
      }
    });
    return this.entities.push(e), e;
  }
  calculateScanPane(e, t, i, o) {
    const a = P.Cartesian3.fromDegrees(e, t, this.centerHeight), u = P.Transforms.eastNorthUpToFixedFrame(a), h = P.Math.toRadians(o), f = P.Cartesian3.fromElements(
      i * Math.cos(h),
      i * Math.sin(h),
      0
    ), g = P.Matrix4.multiplyByPoint(
      u,
      f,
      new P.Cartesian3()
    ), m = P.Cartographic.fromCartesian(g);
    return this.calculateScanSector(
      e,
      t,
      P.Math.toDegrees(m.longitude),
      P.Math.toDegrees(m.latitude)
    );
  }
  calculateScanSector(e, t, i, o) {
    const a = [e, t, this.centerHeight], u = P.Cartesian3.distance(
      P.Cartesian3.fromDegrees(e, t, this.centerHeight),
      P.Cartesian3.fromDegrees(i, o, this.centerHeight)
    );
    for (let h = 0; h <= 90; h += 2) {
      const f = P.Math.toRadians(h), g = this.centerHeight + u * Math.sin(f), m = Math.cos(f);
      a.push((i - e) * m + e), a.push((o - t) * m + t), a.push(g);
    }
    return a;
  }
  getColor(e) {
    return e instanceof P.Color ? e : P.Color.fromCssColorString(e || "#05fbf8");
  }
  stop() {
    this.viewer && this.eventListener && this.viewer.clock.onTick.removeEventListener(this.eventListener), this.eventListener = null;
  }
  setVisible(e) {
    this.entities.forEach((t) => {
      t.show = e;
    });
  }
  show() {
    this.setVisible(!0);
  }
  hide() {
    this.setVisible(!1);
  }
  clearLayer() {
    this.stop(), this.viewer && this.entities.forEach((e) => this.viewer.entities.remove(e)), this.entities = [];
  }
  destroy() {
    this.clearLayer(), this.viewer = null;
  }
}
const I1 = {
  BaseMapLayer: zg,
  IconGroupLayer: Dg,
  LabelGroupLayer: Fg,
  LineGroupLayer: Bg,
  LinePrimitiveLayer: Gg,
  Build3DLayer: Yg,
  BubbleLayer: Ug,
  BubbleGroupLayer: Z_,
  CircleGroupLayer: K_,
  CircleWaveLayer: j_,
  CircleExplosionLayer: n1,
  PointRippleLayer: s1,
  PolygonPrimitiveLayer: o1,
  LineMaterialLayer: a1,
  HeatmapLayer: u1,
  HeatmapPrimitiveLayer: d1,
  RadarScanner3DLayer: v1
};
ao.install = (n) => {
  n.component("BMapViewer", ao);
};
const S1 = {
  install(n) {
    n.use(ao);
  }
};
export {
  ao as BMapViewer,
  Rg as EarthColor,
  I1 as MapLayers,
  p1 as PickTools,
  S1 as default,
  C1 as turf,
  Pg as useCesium
};
