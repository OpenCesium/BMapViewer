var Zg = Object.defineProperty;
var Kg = (n, e, t) => e in n ? Zg(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var le = (n, e, t) => Kg(n, typeof e != "symbol" ? e + "" : e, t);
import { ref as Jg, onMounted as Qg, nextTick as jg, onUnmounted as ed, openBlock as td, createElementBlock as nd, createElementVNode as rd, renderSlot as id } from "vue";
import * as S from "cesium";
const ot = [];
for (let n = 0; n < 256; ++n)
  ot.push((n + 256).toString(16).slice(1));
function sd(n, e = 0) {
  return (ot[n[e + 0]] + ot[n[e + 1]] + ot[n[e + 2]] + ot[n[e + 3]] + "-" + ot[n[e + 4]] + ot[n[e + 5]] + "-" + ot[n[e + 6]] + ot[n[e + 7]] + "-" + ot[n[e + 8]] + ot[n[e + 9]] + "-" + ot[n[e + 10]] + ot[n[e + 11]] + ot[n[e + 12]] + ot[n[e + 13]] + ot[n[e + 14]] + ot[n[e + 15]]).toLowerCase();
}
let Zs;
const od = new Uint8Array(16);
function ad() {
  if (!Zs) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    Zs = crypto.getRandomValues.bind(crypto);
  }
  return Zs(od);
}
const ud = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), _u = { randomUUID: ud };
function ld(n, e, t) {
  var o;
  n = n || {};
  const r = n.random ?? ((o = n.rng) == null ? void 0 : o.call(n)) ?? ad();
  if (r.length < 16)
    throw new Error("Random bytes length must be >= 16");
  return r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, sd(r);
}
function cd(n, e, t) {
  return _u.randomUUID && !n ? _u.randomUUID() : ld(n);
}
const wu = (n) => {
  if (window.Math.abs(n.pitch % 90) === 0)
    return n.lat;
  const t = n.height / Math.tan(n.pitch * Math.PI / 180), r = Number(t / 111e3);
  return n.lat + r;
}, Ft = () => cd();
function xu(n) {
  const {
    title: e = "",
    content: t = [],
    baseColor: r = "#40aee2",
    bodyColor: o = "#11374c",
    showTitle: a = !0,
    headerOpacity: u = 0.8,
    bodyOpacity: c = 0.5,
    scale: f = 1,
    align: g = "left",
    titleFontSize: v = 14,
    contentFontSize: m = 12
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
  }), w = 10 * f, k = a ? 30 * f : 0, L = 8 * f, b = v * f, I = m * f, N = 6 * f, A = 20 * f, Y = document.createElement("canvas").getContext("2d");
  let V = 0;
  if (a) {
    Y.font = `bold ${b}px Arial, sans-serif`;
    const te = Y.measureText(e).width;
    V = Math.max(V, te);
  }
  Y.font = `${I}px Arial, sans-serif`, _.forEach((te) => {
    const se = Y.measureText(te.text).width;
    V = Math.max(V, se);
  });
  const C = V + w * 2.5, M = I + L, T = _.length * M - L + w * 2, D = 20, B = 20 * f, q = C + B * 2, X = k + T + A + B * 2, R = document.createElement("canvas"), U = window.devicePixelRatio || 1;
  R.width = q * U, R.height = X * U, R.style.width = `${q}px`, R.style.height = `${X}px`;
  const G = R.getContext("2d");
  G.scale(U, U);
  const H = q / 2, J = X - B, W = B, j = B, Q = (te, se) => {
    let fe = te;
    te.length === 4 && (fe = `#${te[1]}${te[1]}${te[2]}${te[2]}${te[3]}${te[3]}`);
    const Z = parseInt(fe.slice(1, 3), 16), Fe = parseInt(fe.slice(3, 5), 16), _e = parseInt(fe.slice(5, 7), 16);
    return `rgba(${Z}, ${Fe}, ${_e}, ${se})`;
  };
  G.shadowBlur = 10 * f, G.shadowColor = r, G.lineWidth = 2 * f, G.strokeStyle = Q(r, 0.8), G.beginPath(), G.moveTo(H, j + k + T), G.lineTo(H, J), G.stroke(), G.shadowBlur = D * f, G.shadowColor = r, G.lineWidth = 2 * f, G.strokeStyle = Q(r, 0.9), G.beginPath(), G.roundRect(W, j, C, k + T, N), G.stroke(), G.shadowBlur = 0, G.shadowColor = "transparent", G.save(), G.beginPath(), G.roundRect(W, j, C, k + T, N), G.clip(), a ? (G.fillStyle = Q(r, u), G.fillRect(W, j, C, k), G.fillStyle = Q(o, c), G.fillRect(W, j + k, C, T)) : (G.fillStyle = Q(o, c), G.fillRect(W, j, C, T)), G.restore(), G.shadowBlur = 0, G.shadowColor = "transparent", G.textBaseline = "middle", G.fillStyle = "#ffffff", G.textAlign = g === "center" ? "center" : "left";
  const re = g === "center" ? W + C / 2 : W + w;
  a && (G.shadowBlur = 1 * f, G.shadowColor = "rgba(0, 0, 0, 0.3)", G.shadowOffsetX = 0, G.shadowOffsetY = 0, G.font = `bold ${b}px Arial, sans-serif`, G.fillText(e, re, j + k / 2), G.shadowBlur = 0, G.shadowColor = "transparent"), G.font = `${I}px Arial, sans-serif`;
  const ee = a ? j + k : j;
  return _.forEach((te, se) => {
    G.shadowBlur = 0;
    const fe = ee + w + I / 2 + se * M;
    G.fillStyle = te.color, G.fillText(te.text, re, fe), G.shadowBlur = 0, G.shadowColor = "transparent";
  }), R;
}
let Eu = !1;
function Zt(n) {
  return String.fromCharCode(...n);
}
function hd() {
  return [
    Zt([27426, 36814, 20351, 29992, 32, 66, 77, 97, 112, 86, 105, 101, 119, 101, 114]),
    Zt([20316, 32773, 65306, 98, 97, 110, 121, 97, 110, 54, 54, 54]),
    Zt([37038, 31665, 65306, 49, 53, 48, 50, 57, 50, 57, 54, 50, 57, 51, 64, 49, 54, 51, 46, 99, 111, 109]),
    Zt([22320, 22336, 65306, 104, 116, 116, 112, 115, 58, 47, 47, 98, 97, 110, 121, 97, 110, 54, 54, 54, 46, 103, 105, 116, 104, 117, 98, 46, 105, 111, 47, 66, 77, 97, 112, 86, 105, 101, 119, 101, 114, 47])
  ].join(`
`);
}
function fd() {
  if (typeof globalThis > "u") return null;
  const n = globalThis[Zt([99, 111, 110, 115, 111, 108, 101])], e = n == null ? void 0 : n[Zt([105, 110, 102, 111])];
  return typeof e != "function" ? null : (...t) => Reflect.apply(e, n, t);
}
function gd() {
  if (Eu) return;
  const n = fd();
  if (!n) return;
  Eu = !0;
  const e = Zt([37, 99]), t = Zt([37, 99, 10]);
  n(
    `${e}${hd().replace(`
`, t)}`,
    Zt([112, 97, 100, 100, 105, 110, 103, 58, 32, 52, 112, 120, 32, 56, 112, 120, 59, 32, 99, 111, 108, 111, 114, 58, 32, 35, 48, 54, 49, 53, 49, 100, 59, 32, 98, 97, 99, 107, 103, 114, 111, 117, 110, 100, 58, 32, 35, 52, 53, 101, 97, 100, 102, 59, 32, 102, 111, 110, 116, 45, 119, 101, 105, 103, 104, 116, 58, 32, 55, 48, 48, 59, 32, 102, 111, 110, 116, 45, 115, 105, 122, 101, 58, 32, 49, 52, 112, 120, 59]),
    Zt([99, 111, 108, 111, 114, 58, 32, 35, 54, 57, 98, 57, 102, 102, 59, 32, 102, 111, 110, 116, 45, 115, 105, 122, 101, 58, 32, 49, 50, 112, 120, 59, 32, 108, 105, 110, 101, 45, 104, 101, 105, 103, 104, 116, 58, 32, 49, 46, 55, 59])
  );
}
function dd() {
  let n = null, e = 1, t = 15e5;
  const r = async (v, m) => {
    var p, _;
    gd();
    try {
      n = new S.Viewer(v, {
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
        sceneMode: (m == null ? void 0 : m.sceneMode) === 0 ? S.SceneMode.SCENE2D : S.SceneMode.SCENE3D,
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
        scene3DOnly: (m == null ? void 0 : m.sceneMode) !== 0,
        //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
        orderIndependentTranslucency: !1,
        //是否启用无序透明
        contextOptions: { webgl: { alpha: !0 } },
        skyBox: new S.SkyBox({ show: !1 }),
        baseLayer: !1,
        // 不显示默认图层
        showRenderLoopErrors: !1
      }), m.mapConfig && (console.log("mapConfig", m), e = ((p = m.mapConfig) == null ? void 0 : p.minHeight) || 1, t = ((_ = m.mapConfig) == null ? void 0 : _.maxHeight) || 15e5, a(m.mapConfig)), n.scene.preRender.addEventListener(g), m.baseColor && (n.scene.globe.baseColor = S.Color.fromCssColorString(m.baseColor));
      let w = n.scene.screenSpaceCameraController;
      return w.tiltEventTypes = [
        S.CameraEventType.RIGHT_DRAG,
        // 右键拖动旋转
        S.CameraEventType.PINCH,
        // 保留多点触控旋转
        {
          eventType: S.CameraEventType.LEFT_DRAG,
          modifier: S.KeyboardEventModifier.CTRL
          // 保留Ctrl+左键拖动旋转
        },
        {
          eventType: S.CameraEventType.RIGHT_DRAG,
          modifier: S.KeyboardEventModifier.CTRL
          // 保留Ctrl+右键拖动旋转
        }
      ], w.zoomEventTypes = [
        S.CameraEventType.WHEEL,
        // 保留滚轮缩放
        S.CameraEventType.PINCH
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
  }, a = (v) => {
    let {
      longitude: m = 116.40021930621751,
      latitude: p = 39.89823173640466,
      height: _ = 1e4,
      pitch: w = 0
    } = v;
    n.scene.camera.setView({
      destination: S.Cartesian3.fromDegrees(m, wu({ lat: p, pitch: w, height: _ }), _),
      orientation: {
        heading: S.Math.toRadians(0),
        pitch: S.Math.toRadians(w),
        roll: 0
      }
    });
  }, u = (v, m = 3) => {
    if (!n || (v == null ? void 0 : v.longitude) == null || (v == null ? void 0 : v.latitude) == null) return;
    let p = {
      lon: v.longitude,
      lat: v.latitude,
      height: v.height || 800,
      pitch: v.pitch || -90
    };
    n.camera.flyTo({
      destination: S.Cartesian3.fromDegrees(
        v.longitude,
        wu(p),
        v.height || 800
      ),
      duration: m,
      orientation: v.orientation || {
        heading: S.Math.toRadians(0),
        pitch: S.Math.toRadians(p.pitch),
        roll: 0
      }
    });
  }, c = () => n, f = (v) => {
    n = v;
  }, g = () => {
    let v = n.camera.positionCartographic;
    v.height < e && n.camera.setView({
      destination: S.Cartesian3.fromRadians(v.longitude, v.latitude, e),
      orientation: {
        direction: n.camera.direction,
        up: n.camera.up
      }
    }), v.height >= t && n.camera.setView({
      destination: S.Cartesian3.fromRadians(v.longitude, v.latitude, t),
      orientation: {
        direction: n.camera.direction,
        up: n.camera.up
      }
    });
  };
  return {
    getViewer: c,
    setViewer: f,
    setMapCenter: a,
    initCesium: r,
    destroyCesium: o,
    flyTo: u
  };
}
const md = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [r, o] of e)
    t[r] = o;
  return t;
}, vd = { class: "cesium-container" }, yd = ["id"], pd = {
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
    const r = n, o = t, a = Jg(null);
    let u = null, c = null;
    const {
      initCesium: f,
      destroyCesium: g,
      flyTo: v,
      getViewer: m
    } = dd();
    Qg(async () => {
      await p(r.camera);
    });
    const p = async (L) => {
      try {
        await jg(), k(), g(), c = await f(a.value, { ...r, mapConfig: L }), u = new S.ScreenSpaceEventHandler(c.scene.canvas), c.scene.moon.show = !1, c.scene.fog.enabled = !1, c.scene.sun.show = !1, S.FeatureDetection.supportsImageRenderingPixelated() && (c.resolutionScale = window.devicePixelRatio), _(), o("ready", c);
      } catch (b) {
        o("error", b);
      }
    }, _ = () => {
      !u || u.isDestroyed() || u.setInputAction((L) => {
        const b = c.scene.camera.pickEllipsoid(
          L.position,
          c.scene.globe.ellipsoid
        );
        if (!b) return;
        const I = S.Cartographic.fromCartesian(b), N = c.scene.pick(L.position);
        S.defined(N) ? o("click", {
          lon: S.Math.toDegrees(I.longitude),
          lat: S.Math.toDegrees(I.latitude),
          feature: N
        }) : o("click", { lon: S.Math.toDegrees(I.longitude), lat: S.Math.toDegrees(I.latitude) });
      }, S.ScreenSpaceEventType.LEFT_CLICK);
    }, w = () => {
      !u || u.isDestroyed() || u.removeInputAction(S.ScreenSpaceEventType.LEFT_CLICK);
    }, k = () => {
      u && !u.isDestroyed() && u.destroy(), u = null;
    };
    return ed(() => {
      k(), g(), c = null;
    }), e({
      initMap: p,
      flyTo: v,
      getViewer: m,
      startClick: _,
      stopClick: w
    }), (L, b) => (td(), nd("div", vd, [
      rd("div", {
        ref_key: "cesiumContainer",
        ref: a,
        class: "cesium-viewer",
        id: n.id
      }, null, 8, yd),
      id(L.$slots, "tool", {}, void 0, !0)
    ]));
  }
}, _o = /* @__PURE__ */ md(pd, [["__scopeId", "data-v-83150b8b"]]), _d = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAHdElEQVR4Aexbe2wURRj/5o67QoyJCog87iDKowUCoRIx8R8M1RDkYQgqIg+pwSrFlmL6UpRG0IbWBJtILY0EKcQWG/+AlhIEaU0oQgoSwXJXa4A+ACMa5ZHWu/Zu/M0VynG9u+7M7hYMXObb/Wa+929nZ6d7Vwvd45/7ANzjE4Duz4D7M6APEagfYZvmHmnf4B4ZU9jgtJe5nLYDbqd9D/jtbqftM5fTnuN22Kb2YUrm3wKNI23xDU77OhR62mphR4nT+8T525zoFUYsAcXOAb+UiKUyonXEWB10m90j7VtdjpjnyeSPaWvAaUfME26nbZOPs2MoMAd1TARpbQ7ilMgY3+92xhSdGREzRquhrJ4pAIipbGP8GBFbTUT9QDoaT7JaqbbBYVupw0lEU0tEiaLAjXuaialMNFDRRQ8zzvlgzthmt8O+tYdQ54ChAKD4C8hnDsicxigRt9VBI50bBsCN4ocZmVx4X2wGbrHs8DL5UUMAQPF7ELoPikcUNNxin7gcttfB6m66AUDx3yAL86Y9nIdrjLFtDSNsT4WTyYzpAuCMs794jr8kE9BIXW5hq/T60wWAhfzL9Cag036J7GYpNJ4yADe2rItDHWrpY2MUUBNnQaJz8yx4GcJmSdcsUAYAW9YFMokG62IRC3TFWZDo3DwLXpLmNDrt4yVtutXVASCa3+3lDjOdRC+rpqAEgGtEv+kIaNr+HL6lGopQno2wlYoVUGbMIlb/AH83HLB+TDg5ih4ihY8SAET8YYVY0iYoTLONnWyjNCsHKSoBwIn1CQAyCyPzsb4DgBHddQAQY30HAEnMGxY03cxkGfH+Kv4lSrnlHkX9c6sXnePRxVGl/qjS24WMc805BVsqAcA5UwoWHFgLL5Ocn9RykonRnTOmm2YAWLeVPMMlTCyKF0UJAM7oF625iSL0gKA1jpVbNOcU7FMJAGun9YdgJ73xAoTedHTJGZ0ac6G9VcWHEgAiGGOEt76SIbk5UHDi30tm0q2uBICw9hM/Is5SBNSk9DUqM85+jKTa27gyABYLbYdzD+iONizIB2KbveWqSSgDMO5cx8+c8c2qgY2y85ElX48vZQBE0A5uBQDsT8HfCcLm5/PxzZ4DemLrAmBS879nsQABBD0pqNni0fqb1dcvT836lpUuAISbuGZvDpL5SvB9Sdj5pY2+2N6iN6ZuAEQC1zq9yXhHUC34viDOWHpcs6fSiFiGADD1IrVZGAMIdM6IpKL5YMS+jGvyfBpNR0ZmCAAi4Ngmr8vXBYJf9M0hdriz3ZNmpG/DABBJTWjy7CPOxUwQXYMJTxvuT5twma4b6dhQAERisS0dRdjw5greSOKcp8D3cSN9Cl+GAyCc4snwHjHaJngjCFvdNXEt3lIjfIX6MAUAESS2yZtInPYJXiflj2vxbNLpI6K5aQCIiLEt3lmM6KTgFWlHbLM3Q9FWk5mpAIgMxjV747Em/C54SapA8UslbaTVTQUgPz//gY0bN86tWLVBaqd4beCQS7uT1/8E+2nSFUkaGA5Abm7udBSdk5eXV42V+zpjbDdyyqpY+RF12Oxgo7eLoydS9avvDGWMrYP9Ufj5C7QTYCSBev2tYXTvPaWGAYAk3wQdt1qt1SJ5hBJfoOLU1TheIHyXmEWeBx7sGghzPDvpaTo+c2Go5BEMvAYwikCnAcIexJmNMUOaIQAgIfE7oS3I6ElQxObDDDj2RiZ5Bj/WQ+dSwov0a8L8HuOhAwBB/B6pAkAUh8pU+roBwHT/A4F7/Z3QlClTaPny5bTi3XQav/co9Z84BWZdbeDqtTR96y5KTU2lRYsW0dixY7sEUY4AYgWA1/0HmC4AkMBhTPfBUfIMiGbMmEEJCQk0aNCgQL/fkKE0rKiM7OMmkCh+UNoHgXFxGD58OM2bN48mT54sur1RYL3pTSmaXBkALHaPw/EzoF5bfHx8Dx2bYxQNK/yagosPVoqLiwvuRuRxARZHFGoQKANgs9k0f0N85Ej4F8gxo2PDptje3k4nTpwIKwsdBABDQsdk+soAdHR0nNUaqLa2lkpLS8ntdpPP54toduXKlUDhJSUl1NjYGFEvRHAqpC/VVQYgOzv7b0TSvBK3trZSRUUFFRQUUHl5OVVVVVFNTU2AKisrqaysjIqLi+nQoUN09epVuNbWAGimNs3wWsoACHcZGRlJOEu9nUHCdP78eaqvr6e6uroAuVwuamlRer2XmZWVdRg5KDddAIioACEd50UgbTctFPU23PcVfr9/JmLn6fWlGwCRABIpBYl/dkpCckb8CSzc3kZ47l/GQAloTnp6+lxc+f3gdTdDALiZBUAoRnKzkKwDYysNAOMyfBXias8eMGCAA/6XgQx5G4z8As1QAAIeccjMzGxFol8IMNra2mIAxHMYXohiksF/CL4AtBN9MVuqMLYD/U3orwX/FvgFWCuehY9H4SsZV3tvSkqKKd9DmgIACuhuOTk5XgBxEMXsQjGF4NeDXw1agv4snF/A2FKc16D/Mfgt4L/FU6am24mJjOkAmJi7Ia7/9wDoReE/AAAA///JCpxeAAAABklEQVQDAOWoOZ/unNXTAAAAAElFTkSuQmCC";
class Lw {
  constructor(e, t) {
    var r, o, a, u, c;
    this.viewer = e, this.config = {
      // 几何-边框宽度
      lineWidth: (t == null ? void 0 : t.lineWidth) || 2,
      color: (t == null ? void 0 : t.color) || "#00ffff",
      mouseHints: {
        show: ((r = t == null ? void 0 : t.mouseHints) == null ? void 0 : r.show) || !1,
        text: ((o = t == null ? void 0 : t.mouseHints) == null ? void 0 : o.text) || "左键拾取,双击结束"
      },
      isReserve: (t == null ? void 0 : t.isReserve) || !1,
      pointSize: (t == null ? void 0 : t.pointSize) || 10,
      icon: {
        url: ((a = t == null ? void 0 : t.icon) == null ? void 0 : a.url) || _d,
        width: ((u = t == null ? void 0 : t.icon) == null ? void 0 : u.width) || 32,
        height: ((c = t == null ? void 0 : t.icon) == null ? void 0 : c.height) || 32
      }
    }, this.handler = null, this.label = null, this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(S.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  }
  moveLabel() {
    this.handler && this.config.mouseHints.show && this.handler.setInputAction((e) => {
      const t = this.viewer.scene.camera.pickEllipsoid(e.endPosition), r = S.Cartographic.fromCartesian(t), o = S.Math.toDegrees(r.longitude), a = S.Math.toDegrees(r.latitude);
      this.addLabel(t, [o, a]);
    }, S.ScreenSpaceEventType.MOUSE_MOVE);
  }
  /**
   * 拾取点
   * @param callback
   */
  pickPoint(e, t = []) {
    let r = null, o = t;
    const a = () => {
      r ? r.position = S.Cartesian3.fromDegrees(o[0], o[1]) : r = this.viewer.entities.add({
        position: S.Cartesian3.fromDegrees(o[0], o[1]),
        point: {
          pixelSize: this.config.pointSize,
          color: S.Color.fromCssColorString(this.config.color),
          outlineColor: S.Color.WHITE,
          outlineWidth: 2
        }
      });
    }, u = () => {
      this.handler = new S.ScreenSpaceEventHandler(this.viewer.scene.canvas), this.handler.setInputAction((c) => {
        const f = this.viewer.scene.pick(c.position);
        S.defined(f) && f.id === r && (document.body.style.cursor = "move", this.viewer.scene.screenSpaceCameraController.enableRotate = !1, this.viewer.scene.screenSpaceCameraController.enableTranslate = !1, this.viewer.scene.screenSpaceCameraController.enableZoom = !1, this.handler.setInputAction((g) => {
          const v = this.viewer.scene.camera.pickEllipsoid(g.endPosition);
          if (!v) return;
          const m = S.Cartographic.fromCartesian(v), p = S.Math.toDegrees(m.longitude), _ = S.Math.toDegrees(m.latitude);
          o = [p, _], r.position = S.Cartesian3.fromDegrees(o[0], o[1]);
        }, S.ScreenSpaceEventType.MOUSE_MOVE));
      }, S.ScreenSpaceEventType.LEFT_DOWN), this.handler.setInputAction((c) => {
        this.viewer.scene.screenSpaceCameraController.enableRotate = !0, this.viewer.scene.screenSpaceCameraController.enableTranslate = !0, this.viewer.scene.screenSpaceCameraController.enableZoom = !0, document.body.style.cursor = "default", this.handler.removeInputAction(S.ScreenSpaceEventType.MOUSE_MOVE);
        const f = this.viewer.scene.pick(c.position);
        S.defined(f) && f.id === r && e && e(o);
      }, S.ScreenSpaceEventType.LEFT_UP);
    };
    if (o && o.length) {
      a(), u();
      return;
    }
    this.handler = new S.ScreenSpaceEventHandler(this.viewer.scene.canvas), this.moveLabel(), this.handler.setInputAction((c) => {
      const f = this.viewer.scene.camera.pickEllipsoid(c.position), g = S.Cartographic.fromCartesian(f);
      let v = S.Math.toDegrees(g.longitude), m = S.Math.toDegrees(g.latitude);
      o = [v, m], a(), !this.config.isReserve && this.viewer.entities.remove(r), this.destroy(), this.removeLabel(), v && m && (this.config.isReserve && u(), e && e(o));
    }, S.ScreenSpaceEventType.LEFT_CLICK);
  }
  /**
   * 拾取图标点
   */
  pickPointIcon(e, t = []) {
    let r = null, o = t, a = null;
    const u = () => {
      r ? r.position = S.Cartesian3.fromDegrees(o[0], o[1]) : r = this.viewer.entities.add({
        position: S.Cartesian3.fromDegrees(o[0], o[1]),
        billboard: {
          image: this.config.icon.url,
          scaleByDistance: new S.NearFarScalar(5e5, 1, 1e6, 0.5),
          show: !0,
          horizontalOrigin: S.HorizontalOrigin.CENTER,
          verticalOrigin: S.VerticalOrigin.BOTTOM,
          width: this.config.icon.width,
          height: this.config.icon.height
        }
      });
    }, c = () => {
      this.handler = new S.ScreenSpaceEventHandler(this.viewer.scene.canvas), this.handler.setInputAction((f) => {
        const g = this.viewer.scene.pick(f.position);
        S.defined(g) && g.id === r && (a = g.id, document.body.style.cursor = "move", this.viewer.scene.screenSpaceCameraController.enableRotate = !1, this.viewer.scene.screenSpaceCameraController.enableTranslate = !1, this.viewer.scene.screenSpaceCameraController.enableZoom = !1, this.handler.setInputAction((v) => {
          const m = this.viewer.scene.camera.pickEllipsoid(v.endPosition);
          if (!m) return;
          const p = S.Cartographic.fromCartesian(m), _ = S.Math.toDegrees(p.longitude), w = S.Math.toDegrees(p.latitude);
          o = [_, w], r.position = S.Cartesian3.fromDegrees(o[0], o[1]);
        }, S.ScreenSpaceEventType.MOUSE_MOVE));
      }, S.ScreenSpaceEventType.LEFT_DOWN), this.handler.setInputAction((f) => {
        this.viewer.scene.screenSpaceCameraController.enableRotate = !0, this.viewer.scene.screenSpaceCameraController.enableTranslate = !0, this.viewer.scene.screenSpaceCameraController.enableZoom = !0, document.body.style.cursor = "default", this.handler.removeInputAction(S.ScreenSpaceEventType.MOUSE_MOVE), a === r && e && e(o);
      }, S.ScreenSpaceEventType.LEFT_UP);
    };
    if (o && o.length) {
      u(), c();
      return;
    }
    this.handler = new S.ScreenSpaceEventHandler(this.viewer.scene.canvas), this.moveLabel(), this.handler.setInputAction((f) => {
      const g = this.viewer.scene.camera.pickEllipsoid(f.position), v = S.Cartographic.fromCartesian(g);
      let m = S.Math.toDegrees(v.longitude), p = S.Math.toDegrees(v.latitude);
      o = [m, p], u(), !this.config.isReserve && this.viewer.entities.remove(r), this.destroy(), this.removeLabel(), m && p && (this.config.isReserve && c(), e && e(o));
    }, S.ScreenSpaceEventType.LEFT_CLICK);
  }
  /**
   * 拾取线
   * @param callback
   * @param data
   */
  pickLine(e, t = []) {
    let r = t, o = null, a = null, u = [], c = -1;
    const f = () => {
      r.length > 1 && (o ? o.polyline.positions = new S.CallbackProperty(() => r.map((m) => S.Cartesian3.fromDegrees(m[0], m[1])), !1) : o = this.viewer.entities.add({
        polyline: {
          positions: new S.CallbackProperty(() => r.map((m) => S.Cartesian3.fromDegrees(m[0], m[1])), !1),
          width: this.config.lineWidth,
          material: S.Color.fromCssColorString(this.config.color),
          clampToGround: !0,
          zIndex: 1
        }
      }));
    }, g = (m) => {
      u.push(this.viewer.entities.add({
        position: S.Cartesian3.fromDegrees(m[0], m[1]),
        point: {
          pixelSize: this.config.pointSize,
          color: S.Color.fromCssColorString(this.config.color),
          outlineColor: S.Color.WHITE,
          outlineWidth: 2,
          zIndex: 2,
          disableDepthTestDistance: Number.POSITIVE_INFINITY
        }
      }));
    }, v = () => {
      this.handler = new S.ScreenSpaceEventHandler(this.viewer.scene.canvas), this.handler.setInputAction((m) => {
        const p = this.viewer.scene.pick(m.position);
        if (c = -1, S.defined(p)) {
          let _ = u.findIndex((w) => w === p.id);
          _ !== -1 && (c = _, document.body.style.cursor = "move", this.viewer.scene.screenSpaceCameraController.enableRotate = !1, this.viewer.scene.screenSpaceCameraController.enableTranslate = !1, this.viewer.scene.screenSpaceCameraController.enableZoom = !1, this.handler.setInputAction((w) => {
            const k = this.viewer.scene.camera.pickEllipsoid(w.endPosition);
            if (!k) return;
            const L = S.Cartographic.fromCartesian(k), b = S.Math.toDegrees(L.longitude), I = S.Math.toDegrees(L.latitude);
            r[_] = [b, I], o.polyline.positions = new S.CallbackProperty(() => r.map((N) => S.Cartesian3.fromDegrees(N[0], N[1])), !1), u[_].position.setValue(S.Cartesian3.fromDegrees(b, I));
          }, S.ScreenSpaceEventType.MOUSE_MOVE));
        }
      }, S.ScreenSpaceEventType.LEFT_DOWN), this.handler.setInputAction((m) => {
        this.viewer.scene.screenSpaceCameraController.enableRotate = !0, this.viewer.scene.screenSpaceCameraController.enableTranslate = !0, this.viewer.scene.screenSpaceCameraController.enableZoom = !0, document.body.style.cursor = "default", this.handler.removeInputAction(S.ScreenSpaceEventType.MOUSE_MOVE);
        const p = this.viewer.scene.pick(m.position);
        S.defined(p) && c > -1 && e && e(r);
      }, S.ScreenSpaceEventType.LEFT_UP);
    };
    if (r.length > 1) {
      f(), r.forEach((m) => {
        g(m);
      }), v();
      return;
    }
    this.handler = new S.ScreenSpaceEventHandler(this.viewer.scene.canvas), this.handler.setInputAction((m) => {
      const p = this.viewer.scene.camera.pickEllipsoid(m.endPosition);
      if (!p) return;
      const _ = S.Cartographic.fromCartesian(p), w = S.Math.toDegrees(_.longitude), k = S.Math.toDegrees(_.latitude);
      this.addLabel(p, [w, k]), r.length > 0 && (a ? a.polyline.positions = new S.CallbackProperty(() => {
        let L = r[r.length - 1];
        return [
          S.Cartesian3.fromDegrees(L[0], L[1]),
          S.Cartesian3.fromDegrees(w, k)
        ];
      }, !1) : a = this.viewer.entities.add({
        polyline: {
          positions: new S.CallbackProperty(() => {
            let L = r[r.length - 1];
            return [
              S.Cartesian3.fromDegrees(L[0], L[1]),
              S.Cartesian3.fromDegrees(w, k)
            ];
          }, !1),
          width: this.config.lineWidth,
          material: new S.PolylineDashMaterialProperty({
            color: S.Color.fromCssColorString(this.config.color).withAlpha(0.5),
            // 虚线颜色及透明度
            dashLength: 20
            //短划线长度
          })
        }
      }));
    }, S.ScreenSpaceEventType.MOUSE_MOVE), this.handler.setInputAction((m) => {
      const p = this.viewer.scene.camera.pickEllipsoid(m.position);
      if (!p) return;
      const _ = S.Cartographic.fromCartesian(p), w = S.Math.toDegrees(_.longitude), k = S.Math.toDegrees(_.latitude);
      if (r.length > 0) {
        let L = r[r.length - 1][0], b = r[r.length - 1][1];
        if (L === w && b === k)
          return;
      }
      r.push([w, k]), f(), g([w, k]);
    }, S.ScreenSpaceEventType.LEFT_CLICK), this.handler.setInputAction((m) => {
      this.viewer.entities.remove(a), this.destroy(), r.length < 2 ? (this.viewer.entities.remove(u[0]), console.warn("请至少选择两个点")) : (this.config.isReserve ? v() : (this.viewer.entities.remove(o), u.forEach((p) => {
        this.viewer.entities.remove(p);
      })), e && e(r));
    }, S.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  }
  /**
   * 拾取面
   * @param callback
   */
  pickPolygon(e, t = []) {
    let r = t, o = null, a = null, u = null, c = [], f = -1;
    const g = (_) => {
      _.length > 1 && (o ? o.polyline.positions = new S.CallbackProperty(() => _.map((w) => S.Cartesian3.fromDegrees(w[0], w[1])), !1) : o = this.viewer.entities.add({
        polyline: {
          positions: new S.CallbackProperty(() => _.map((w) => S.Cartesian3.fromDegrees(w[0], w[1])), !1),
          width: this.config.lineWidth,
          material: S.Color.fromCssColorString(this.config.color),
          clampToGround: !0,
          zIndex: 1
        }
      }));
    }, v = () => {
      if (r.length > 2) {
        let _ = [];
        r.forEach((w) => {
          _.push(w[0], w[1]);
        }), a ? a.polygon.hierarchy = new S.CallbackProperty(() => new S.PolygonHierarchy(S.Cartesian3.fromDegreesArray(_)), !1) : a = this.viewer.entities.add({
          polygon: {
            hierarchy: new S.CallbackProperty(() => new S.PolygonHierarchy(S.Cartesian3.fromDegreesArray(_)), !1),
            material: S.Color.fromCssColorString(this.config.color).withAlpha(0.5),
            outline: !1
          }
        });
      }
    }, m = (_) => {
      c.push(this.viewer.entities.add({
        position: S.Cartesian3.fromDegrees(_[0], _[1]),
        point: {
          pixelSize: this.config.pointSize,
          color: S.Color.fromCssColorString(this.config.color),
          outlineColor: S.Color.WHITE,
          outlineWidth: 2,
          zIndex: 2,
          disableDepthTestDistance: Number.POSITIVE_INFINITY
        }
      }));
    }, p = () => {
      this.handler = new S.ScreenSpaceEventHandler(this.viewer.scene.canvas), this.handler.setInputAction((_) => {
        const w = this.viewer.scene.pick(_.position);
        if (f = -1, S.defined(w)) {
          let k = c.findIndex((L) => L === w.id);
          k !== -1 && (f = k, document.body.style.cursor = "move", this.viewer.scene.screenSpaceCameraController.enableRotate = !1, this.viewer.scene.screenSpaceCameraController.enableTranslate = !1, this.viewer.scene.screenSpaceCameraController.enableZoom = !1, this.handler.setInputAction((L) => {
            const b = this.viewer.scene.camera.pickEllipsoid(L.endPosition);
            if (!b) return;
            const I = S.Cartographic.fromCartesian(b), N = S.Math.toDegrees(I.longitude), A = S.Math.toDegrees(I.latitude);
            r[k] = [N, A];
            let O = [...r, r[0]];
            g(O);
            let Y = [];
            r.forEach((V) => {
              Y.push(V[0], V[1]);
            }), a.polygon.hierarchy = new S.CallbackProperty(() => new S.PolygonHierarchy(S.Cartesian3.fromDegreesArray(Y)), !1), c[k].position.setValue(S.Cartesian3.fromDegrees(N, A));
          }, S.ScreenSpaceEventType.MOUSE_MOVE));
        }
      }, S.ScreenSpaceEventType.LEFT_DOWN), this.handler.setInputAction((_) => {
        this.viewer.scene.screenSpaceCameraController.enableRotate = !0, this.viewer.scene.screenSpaceCameraController.enableTranslate = !0, this.viewer.scene.screenSpaceCameraController.enableZoom = !0, document.body.style.cursor = "default", this.handler.removeInputAction(S.ScreenSpaceEventType.MOUSE_MOVE);
        const w = this.viewer.scene.pick(_.position);
        S.defined(w) && f > -1 && e && e(r);
      }, S.ScreenSpaceEventType.LEFT_UP);
    };
    if (r.length > 1) {
      let _ = [...r, r[0]];
      g(_), v(), r.forEach((w) => {
        m(w);
      }), p();
      return;
    }
    this.handler = new S.ScreenSpaceEventHandler(this.viewer.scene.canvas), this.handler.setInputAction((_) => {
      const w = this.viewer.scene.camera.pickEllipsoid(_.endPosition);
      if (!w) return;
      const k = S.Cartographic.fromCartesian(w), L = S.Math.toDegrees(k.longitude), b = S.Math.toDegrees(k.latitude);
      if (this.addLabel(w, [L, b]), r.length > 0 && (u ? u.polyline.positions = new S.CallbackProperty(() => {
        let I = r[r.length - 1], N = r[0];
        return [
          S.Cartesian3.fromDegrees(I[0], I[1]),
          S.Cartesian3.fromDegrees(L, b),
          S.Cartesian3.fromDegrees(N[0], N[1])
        ];
      }, !1) : u = this.viewer.entities.add({
        polyline: {
          positions: new S.CallbackProperty(() => {
            let I = r[0], N = r[r.length - 1];
            return [
              S.Cartesian3.fromDegrees(N[0], N[1]),
              S.Cartesian3.fromDegrees(L, b),
              S.Cartesian3.fromDegrees(I[0], I[1])
            ];
          }, !1),
          width: this.config.lineWidth,
          material: new S.PolylineDashMaterialProperty({
            color: S.Color.fromCssColorString(this.config.color).withAlpha(0.5),
            // 虚线颜色及透明度
            dashLength: 20
            //短划线长度
          })
        }
      })), r.length > 1) {
        let I = [];
        r.forEach((N) => {
          I.push(N[0], N[1]);
        }), a ? a.polygon.hierarchy = new S.CallbackProperty(() => {
          let N = I[I.length - 2], A = I[I.length - 1];
          return N !== L && A !== b && I.push(L, b), new S.PolygonHierarchy(S.Cartesian3.fromDegreesArray(I));
        }, !1) : a = this.viewer.entities.add({
          polygon: {
            hierarchy: new S.CallbackProperty(() => {
              let N = I[I.length - 2], A = I[I.length - 1];
              return N !== L && A !== b && I.push(L, b), new S.PolygonHierarchy(S.Cartesian3.fromDegreesArray(I));
            }, !1),
            material: S.Color.fromCssColorString(this.config.color).withAlpha(0.5),
            outline: !1
          }
        });
      }
    }, S.ScreenSpaceEventType.MOUSE_MOVE), this.handler.setInputAction((_) => {
      const w = this.viewer.scene.camera.pickEllipsoid(_.position);
      if (!w) return;
      const k = S.Cartographic.fromCartesian(w), L = S.Math.toDegrees(k.longitude), b = S.Math.toDegrees(k.latitude);
      if (r.length > 0) {
        let I = r[r.length - 1][0], N = r[r.length - 1][1];
        if (I === L && N === b)
          return;
      }
      r.push([L, b]), g(r), m([L, b]);
    }, S.ScreenSpaceEventType.LEFT_CLICK), this.handler.setInputAction((_) => {
      if (this.viewer.entities.remove(u), this.destroy(), r.length < 3)
        c.forEach((w) => {
          this.viewer.entities.remove(w);
        }), this.viewer.entities.remove(o), console.warn("请至少选择三个点");
      else {
        if (!this.config.isReserve)
          this.viewer.entities.remove(o), this.viewer.entities.remove(a), c.forEach((w) => {
            this.viewer.entities.remove(w);
          });
        else {
          let w = [];
          r.forEach((k) => {
            w.push([k[0], k[1]]);
          }), w.push([r[0][0], r[0][1]]), g(w), p();
        }
        e && e(r);
      }
    }, S.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  }
  addLabel(e, t) {
    this.label || (this.label = this.viewer.entities.add({
      label: {
        text: "",
        showBackground: !0,
        font: "14px sans-serif",
        horizontalOrigin: S.HorizontalOrigin.LEFT,
        verticalOrigin: S.VerticalOrigin.TOP,
        pixelOffset: new S.Cartesian2(10, 10),
        fillColor: S.Color.WHITE,
        outlineColor: S.Color.BLACK,
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
class wd {
  constructor(e) {
    this.viewModelBefore = {}, this.beforeColorStr = [], this.viewer = e;
  }
  addColor(e) {
    const t = this.viewer.imageryLayers.get(0);
    this.viewModelBefore.brightness = t.brightness, this.viewModelBefore.contrast = t.contrast, this.viewModelBefore.hue = t.hue, this.viewModelBefore.saturation = t.saturation, this.viewModelBefore.gamma = t.gamma, t.brightness = e.brightness || 0.6, t.contrast = e.contrast || 1.8, t.gamma = e.gamma || 0.3, t.hue = e.hue || 1, t.saturation = e.saturation || 0;
    const r = this.viewer.scene.globe._surfaceShaderSet.baseFragmentShaderSource.sources, o = this.hexColorToRgba(e.filterRGB);
    for (let a = 0; a < r.length; a++) {
      const u = `color = czm_saturation(color, textureSaturation);
#endif
`;
      let c = `color = czm_saturation(color, textureSaturation);
#endif
`;
      e.invertColor && (c += `
                    color.r = 1.0 - color.r;
                    color.g = 1.0 - color.g;
                    color.b = 1.0 - color.b;
                    `), e.filterRGB.length > 0 && (c += `
                    color.r = color.r * ${o.red}.0/255.0;
                    color.g = color.g * ${o.green}.0/255.0;
                    color.b = color.b * ${o.blue}.0/255.0;
                    `), this.beforeColorStr.push(r[a]), r[a] = r[a].replace(u, c);
    }
  }
  restore() {
    const e = this.viewer.scene.globe._surfaceShaderSet.baseFragmentShaderSource.sources, t = this.viewer.imageryLayers.get(0);
    for (let r = 0; r < e.length; r++)
      e[r] = this.beforeColorStr[r], t.brightness = this.viewModelBefore.brightness, t.contrast = this.viewModelBefore.contrast, t.gamma = this.viewModelBefore.gamma, t.hue = this.viewModelBefore.hue, t.saturation = this.viewModelBefore.saturation;
  }
  hexColorToRgba(e) {
    if (!e.startsWith("#"))
      throw new Error('Invalid hex color format. Color should start with "#".');
    const t = e.slice(1), r = t.length === 8;
    if (t.length !== 6 && t.length !== 8)
      throw new Error(`Invalid hex color length. Expected 6 or 8 characters, got ${t.length}.`);
    const o = (p) => parseInt(p, 16), a = t.substring(0, 2), u = t.substring(2, 4), c = t.substring(4, 6), f = o(a), g = o(u), v = o(c);
    let m = 1;
    if (r) {
      const p = t.substring(6, 8);
      m = o(p);
    }
    return {
      red: f,
      green: g,
      blue: v,
      alpha: m
    };
  }
}
class xd {
  constructor(e, t) {
    this.viewer = e, this.config = {
      width: 60,
      height: 60,
      ...t
    }, this.billboardCollection = new S.BillboardCollection(), this.layer = this.viewer.scene.primitives.add(this.billboardCollection), this.data = [];
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
    let t = e.geometry.coordinates[0], r = e.geometry.coordinates[1], o = e.geometry.coordinates[2] || 0;
    const a = {
      ...this.config,
      scaleByDistance: new S.NearFarScalar(15e4, 1, 4e5, 0.5),
      position: S.Cartesian3.fromDegrees(t, r, o),
      image: e.properties.icon || e.icon || this.config.icon,
      width: this.config.width || 60,
      // 默认宽度
      height: this.config.height || 60,
      // 默认高度
      verticalOrigin: S.VerticalOrigin.BOTTOM,
      // 从底部锚定
      id: e.properties.id || Ft(),
      // 确保有唯一的标识符
      disableDepthTestDistance: this.config.disableDepthTestDistance || 100,
      // 在相机100米时进行深度测试
      color: e.properties.color ? new S.Color.fromCssColorString(e.properties.color) : this.config.color ? new S.Color.fromCssColorString(this.config.color) : new S.Color.fromCssColorString("#ffffff")
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
      const r = this.billboardCollection.get(t);
      if (r.id === e)
        return r;
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
      const r = this.billboardCollection.get(t);
      if (r.id === e) {
        this.billboardCollection.remove(r);
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
class Ed {
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
    }, this.labelCollection = new S.LabelCollection(), this.layer = this.viewer.scene.primitives.add(this.labelCollection);
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
    let t = e.geometry.coordinates[0], r = e.geometry.coordinates[1], o = e.geometry.coordinates[2] || 0;
    const a = {
      scaleByDistance: new S.NearFarScalar(5e5, 1, 1e6, 0.5),
      position: S.Cartesian3.fromDegrees(t, r, o),
      text: e.properties.text || e.text || this.config.text,
      font: this.config.fontSize || "12px",
      horizontalOrigin: S.HorizontalOrigin.CENTER,
      verticalOrigin: S.VerticalOrigin.BOTTOM,
      // 从底部锚定
      pixelOffset: new S.Cartesian2(this.config.offsetZ || 0, this.config.offsetY || 0),
      backgroundColor: this.config.backgroundColor ? new S.Color.fromCssColorString(this.config.backgroundColor) : S.Color(0, 0, 0, 0.5),
      showBackground: this.config.showBackground || !1,
      fillColor: this.config.color ? new S.Color.fromCssColorString(this.config.color) : S.Color.WHITE,
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
      const r = this.labelCollection.get(t);
      if (r.id === e)
        return r;
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
      const r = this.labelCollection.get(t);
      if (r.id === e) {
        this.labelCollection.remove(r);
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
class Cd {
  constructor(e, t) {
    this.viewer = e, this.config = {
      type: "default",
      color: "#ffffff",
      width: 2,
      ...t
    }, this.polylineCollection = new S.PolylineCollection(), this.layer = this.viewer.scene.primitives.add(this.polylineCollection);
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
    var o, a, u, c, f, g, v, m;
    const r = t.color ? S.Color.fromCssColorString(t.color) : S.Color.fromCssColorString(this.config.color);
    switch (e) {
      case "default":
        return S.Material.fromType("Color", {
          color: r
        });
      case "dash":
        return S.Material.fromType("PolylineDash", {
          color: r,
          dashLength: (t == null ? void 0 : t.dashLength) || ((o = this.config) == null ? void 0 : o.dashLength) || 16,
          gapColor: t != null && t.gapColor ? new S.Color.fromCssColorString(t == null ? void 0 : t.gapColor) : (a = this.config) != null && a.gapColor ? new S.Color.fromCssColorString((u = this.config) == null ? void 0 : u.gapColor) : S.Color.TRANSPARENT
        });
      case "glow":
        return S.Material.fromType("PolylineGlow", {
          glowPower: t.glowPower || ((c = this.config) == null ? void 0 : c.glowPower) || 0.25,
          taperPower: t.taperPower || ((f = this.config) == null ? void 0 : f.taperPower) || 1,
          color: r
        });
      case "outline":
        return S.Material.fromType("PolylineOutline", {
          color: r,
          outlineColor: t.outlineColor ? S.Color.fromCssColorString(t.outlineColor) : (g = this.config) != null && g.outlineColor ? new S.Color.fromCssColorString((v = this.config) == null ? void 0 : v.outlineColor) : new S.Color.fromCssColorString("#ff0000"),
          outlineWidth: t.outlineWidth || ((m = this.config) == null ? void 0 : m.outlineWidth) || 1
        });
      case "arrow":
        return S.Material.fromType("PolylineArrow", {
          color: r
        });
      default:
        return S.Material.fromType("Color", {
          color: r
        });
    }
  }
  /**
   * 添加线
   */
  addLayer(e) {
    var c, f, g, v;
    if (!((c = e == null ? void 0 : e.geometry) != null && c.coordinates)) {
      console.error("缺少coordinates字段");
      return;
    }
    const t = e.geometry.coordinates, r = [];
    t.forEach((m) => {
      r.push(m[0], m[1]);
    });
    const o = ((f = e.properties) == null ? void 0 : f.type) || this.config.type, a = this.getMaterial(o, e.properties), u = this.polylineCollection.add({
      positions: S.Cartesian3.fromDegreesArray(r),
      width: ((g = e == null ? void 0 : e.properties) == null ? void 0 : g.width) || this.config.width,
      material: a,
      id: ((v = e.properties) == null ? void 0 : v.id) || Ft()
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
    for (let r = 0; r < t.length; r++)
      if (t[r].id === e) {
        this.polylineCollection.remove(t[r]);
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
class kd {
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
      let u = a.geometry.coordinates, c = [];
      u.forEach((v) => {
        c.push(v[0], v[1]);
      });
      const f = new S.PolylineGeometry({
        positions: S.Cartesian3.fromDegreesArray(c),
        width: ((g = a == null ? void 0 : a.properties) == null ? void 0 : g.width) || this.config.width,
        vertexFormat: S.PolylineMaterialAppearance.VERTEX_FORMAT
      });
      f.properties = {
        ...a.properties
      }, t.push(
        new S.GeometryInstance({
          geometry: f,
          id: a.properties.id || Ft(),
          attributes: {
            color: S.ColorGeometryInstanceAttribute.fromColor(
              a.properties.color ? new S.Color.fromCssColorString(a.properties.color) : new S.Color.fromCssColorString(this.config.color)
            )
          }
        })
      );
    });
    const r = new S.PolylineColorAppearance(
      {
        translucent: !1,
        renderState: S.RenderState.fromCache({
          depthTest: { enabled: !0 },
          depthMask: !0,
          //写入深度，防止颜色污染
          blending: S.BlendingState.ALPHA_BLEND
        })
      }
    ), o = new S.Primitive({
      geometryInstances: t,
      appearance: r,
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
    return t = this.data.find((r) => r.properties.id === e), t;
  }
  /**
   * 销毁
   */
  destroy() {
    this.clearLayer();
  }
}
class Id {
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
      this.tileset = await S.Cesium3DTileset.fromUrl(e || this.config.url, {
        show: this.config.show || !0,
        ...this.config.options
        // 允许传入其他Cesium3DTileset选项
      }), this.tileset.tileLoad.addEventListener((r) => {
        var u;
        const o = (u = r.content) == null ? void 0 : u.batchTable;
        if (!o) return;
        const a = o.featuresLength;
        for (let c = 0; c < a; c++) {
          const f = o.getProperty(c, "id");
          if (this.config.alertList && this.config.alertList.length > 0 && this.config.alertKey) {
            let g = {};
            this.config.alertList.some((v) => {
              if (f === String(v.id))
                return g = v, !0;
            }) && o.setProperty(c, this.config.alertKey, g[this.config.alertKey]);
          }
        }
      }), console.log(this.tileset, "this.tileset"), this.viewer.scene.primitives.add(this.tileset);
      let t = new S.CustomShader({
        // 不考虑光照模型
        lightingModel: S.LightingModel.UNLIT,
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
    this.tileset && (this.tileset.style = new S.Cesium3DTileStyle({
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
    }, r = {
      u_sweep_color: { value: S.Color.fromCssColorString(t.sweepColor), type: S.UniformType.VEC3 },
      u_mix_color1: { value: S.Color.fromCssColorString(t.minColor), type: S.UniformType.VEC3 },
      u_mix_color2: { value: S.Color.fromCssColorString(t.maxColor), type: S.UniformType.VEC3 },
      u_sweep_width: { value: t.sweepWidth, type: S.UniformType.FLOAT },
      u_time: { value: 0, type: S.UniformType.FLOAT },
      u_model_height: { value: t.modelHeight, type: S.UniformType.FLOAT },
      u_height_offset: { value: t.heightOffset, type: S.UniformType.FLOAT },
      u_min_interval: { value: t.minInterval, type: S.UniformType.FLOAT },
      u_max_interval: { value: t.maxInterval, type: S.UniformType.FLOAT },
      u_speed: { value: t.speed, type: S.UniformType.FLOAT }
    }, o = new S.CustomShader({
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
      uniforms: r,
      varyings: { v_uv: S.VaryingType.VEC2 }
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
class Sd {
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
    var f, g, v;
    const t = (f = e.geometry) == null ? void 0 : f.coordinates;
    if (!t) {
      console.error("coordinates is required.");
      return;
    }
    const r = S.Cartesian3.fromDegrees(t[0], t[1]), o = ((g = e == null ? void 0 : e.properties) == null ? void 0 : g.id) || Ft(), a = document.createElement("div");
    a.className = e.className || this.className || "bx-popup-ctn0", a.id = o, document.getElementById(this.viewer.container.id).appendChild(a);
    let u = e.content || ((v = e == null ? void 0 : e.properties) == null ? void 0 : v.content);
    const c = (m) => {
      if (u = m, a.innerHTML = this.createHtml(u.header, u.body, e.isClose), e.isClose === !0) {
        const p = a.querySelector(".bx-popup-close");
        p && (p.onclick = () => this.close(o));
      }
      this.render();
    };
    if (c(u), this.ctnList[o] = {
      geometry: r,
      dom: a,
      visible: !0,
      updateContent: c
    }, e.isClose === !0) {
      const m = a.querySelector(".bx-popup-close");
      m && (m.onclick = () => this.close(o));
    }
    return typeof this.eventListener != "function" && (this.eventListener = () => this.render(), this.viewer.clock.onTick.addEventListener(this.eventListener)), { id: o, element: a, updateContent: c };
  }
  render() {
    const e = [];
    if (Object.keys(this.ctnList).forEach((r) => {
      const o = this.ctnList[r], a = S.SceneTransforms.wgs84ToWindowCoordinates(
        this.viewer.scene,
        o.geometry
      );
      if (!a) {
        o.dom.style.display = "none";
        return;
      }
      o.dom.style.left = a.x + "px", o.dom.style.top = a.y + "px", o.dom.style.display = o.visible && this.allVisible ? "" : "none", o.visible && this.allVisible && e.push({
        id: r,
        dom: o.dom,
        rect: o.dom.getBoundingClientRect()
      });
    }), !e.length) return;
    const t = [];
    e.forEach((r) => {
      let o = !1;
      for (const a of t)
        if (this.checkOverlap(r.rect, a.rect, this.collisionThreshold)) {
          o = !0;
          break;
        }
      r.dom.style.display = o ? "none" : "", o || t.push(r);
    });
  }
  checkOverlap(e, t, r = 0.5) {
    const o = Math.max(
      0,
      Math.min(e.right, t.right) - Math.max(e.left, t.left)
    ), a = Math.max(
      0,
      Math.min(e.bottom, t.bottom) - Math.max(e.top, t.top)
    ), u = o * a, c = Math.min(e.width * e.height, t.width * t.height);
    return u / c > r;
  }
  updateContent(e, t) {
    const r = this.ctnList[e];
    r != null && r.updateContent && r.updateContent(t);
  }
  setPopupVisible(e, t) {
    const r = this.ctnList[e];
    r && (r.visible = t, this.render());
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
  createHtml(e, t, r) {
    return this.html ? this.html(e, t) : `
            ${r ? '<div class="bx-popup-close">×</div>' : ""}
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
var Be = 63710088e-1, hs = {
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
}, Zi = {
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
function Je(n, e, t = {}) {
  const r = { type: "Feature" };
  return (t.id === 0 || t.id) && (r.id = t.id), t.bbox && (r.bbox = t.bbox), r.properties = e || {}, r.geometry = n, r;
}
function Rc(n, e, t = {}) {
  switch (n) {
    case "Point":
      return de(e).geometry;
    case "LineString":
      return Se(e).geometry;
    case "Polygon":
      return ye(e).geometry;
    case "MultiPoint":
      return ri(e).geometry;
    case "MultiLineString":
      return xn(e).geometry;
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
  return Je({
    type: "Point",
    coordinates: n
  }, e, t);
}
function Ac(n, e, t = {}) {
  return ce(
    n.map((r) => de(r, e)),
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
  return Je({
    type: "Polygon",
    coordinates: n
  }, e, t);
}
function Oc(n, e, t = {}) {
  return ce(
    n.map((r) => ye(r, e)),
    t
  );
}
function Se(n, e, t = {}) {
  if (n.length < 2)
    throw new Error("coordinates must be an array of two or more positions");
  return Je({
    type: "LineString",
    coordinates: n
  }, e, t);
}
function Dc(n, e, t = {}) {
  return ce(
    n.map((r) => Se(r, e)),
    t
  );
}
function ce(n, e = {}) {
  const t = { type: "FeatureCollection" };
  return e.id && (t.id = e.id), e.bbox && (t.bbox = e.bbox), t.features = n, t;
}
function xn(n, e, t = {}) {
  return Je({
    type: "MultiLineString",
    coordinates: n
  }, e, t);
}
function ri(n, e, t = {}) {
  return Je({
    type: "MultiPoint",
    coordinates: n
  }, e, t);
}
function wt(n, e, t = {}) {
  return Je({
    type: "MultiPolygon",
    coordinates: n
  }, e, t);
}
function $o(n, e, t = {}) {
  return Je({
    type: "GeometryCollection",
    geometries: n
  }, e, t);
}
function Fc(n, e = 0) {
  if (e && !(e >= 0))
    throw new Error("precision must be a positive number");
  const t = Math.pow(10, e || 0);
  return Math.round(n * t) / t;
}
function ii(n, e = "kilometers") {
  const t = hs[e];
  if (!t)
    throw new Error(e + " units is invalid");
  return n * t;
}
function mr(n, e = "kilometers") {
  const t = hs[e];
  if (!t)
    throw new Error(e + " units is invalid");
  return n / t;
}
function si(n, e) {
  return Qt(mr(n, e));
}
function ur(n) {
  let e = n % 360;
  return e < 0 && (e += 360), e;
}
function Bc(n) {
  return n = n % 360, n > 180 ? n - 360 : n < -180 ? n + 360 : n;
}
function Qt(n) {
  return n % (2 * Math.PI) * 180 / Math.PI;
}
function Qe(n) {
  return n % 360 * Math.PI / 180;
}
function On(n, e = "kilometers", t = "kilometers") {
  if (!(n >= 0))
    throw new Error("length must be a positive number");
  return ii(mr(n, e), t);
}
function Zo(n, e = "meters", t = "kilometers") {
  if (!(n >= 0))
    throw new Error("area must be a positive number");
  const r = Zi[e];
  if (!r)
    throw new Error("invalid original units");
  const o = Zi[t];
  if (!o)
    throw new Error("invalid final units");
  return n / r * o;
}
function et(n) {
  return !isNaN(n) && n !== null && !Array.isArray(n);
}
function Oe(n) {
  return n !== null && typeof n == "object" && !Array.isArray(n);
}
function _n(n) {
  delete n.bbox, n.type === "Feature" ? n.geometry && _n(n.geometry) : n.type === "FeatureCollection" ? n.features.forEach(_n) : n.type === "GeometryCollection" && n.geometries.forEach(_n);
}
function Hr(n) {
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
function Gc(n) {
  if (!n)
    throw new Error("id is required");
  if (["string", "number"].indexOf(typeof n) === -1)
    throw new Error("id must be a number or a string");
}
const bd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  areaFactors: Zi,
  azimuthToBearing: Bc,
  bearingToAzimuth: ur,
  convertArea: Zo,
  convertLength: On,
  degreesToRadians: Qe,
  earthRadius: Be,
  factors: hs,
  feature: Je,
  featureCollection: ce,
  geometry: Rc,
  geometryCollection: $o,
  isNumber: et,
  isObject: Oe,
  lengthToDegrees: si,
  lengthToRadians: mr,
  lineString: Se,
  lineStrings: Dc,
  multiLineString: xn,
  multiPoint: ri,
  multiPolygon: wt,
  point: de,
  points: Ac,
  polygon: ye,
  polygons: Oc,
  radiansToDegrees: Qt,
  radiansToLength: ii,
  removeBbox: _n,
  round: Fc,
  validateBBox: Hr,
  validateId: Gc
}, Symbol.toStringTag, { value: "Module" }));
function Me(n) {
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
function me(n) {
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
function Ko(n) {
  if (n.length > 1 && et(n[0]) && et(n[1]))
    return !0;
  if (Array.isArray(n[0]) && n[0].length)
    return Ko(n[0]);
  throw new Error("coordinates must only contain numbers");
}
function qc(n, e, t) {
  if (!e || !t)
    throw new Error("type and name required");
  if (!n || n.type !== e)
    throw new Error(
      "Invalid input to " + t + ": must be a " + e + ", given " + n.type
    );
}
function Wr(n, e, t) {
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
function gn(n, e, t) {
  if (!n)
    throw new Error("No featureCollection passed");
  if (!t)
    throw new Error(".collectionOf() requires a name");
  if (!n || n.type !== "FeatureCollection")
    throw new Error(
      "Invalid input to " + t + ", FeatureCollection required"
    );
  for (const r of n.features) {
    if (!r || r.type !== "Feature" || !r.geometry)
      throw new Error(
        "Invalid input to " + t + ", Feature with geometry required"
      );
    if (!r.geometry || r.geometry.type !== e)
      throw new Error(
        "Invalid input to " + t + ": must be a " + e + ", given " + r.geometry.type
      );
  }
}
function Ye(n) {
  return n.type === "Feature" ? n.geometry : n;
}
function xt(n, e) {
  return n.type === "FeatureCollection" ? "FeatureCollection" : n.type === "GeometryCollection" ? "GeometryCollection" : n.type === "Feature" && n.geometry !== null ? n.geometry.type : n.type;
}
const Md = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  collectionOf: gn,
  containsNumber: Ko,
  featureOf: Wr,
  geojsonType: qc,
  getCoord: Me,
  getCoords: me,
  getGeom: Ye,
  getType: xt
}, Symbol.toStringTag, { value: "Module" }));
function hn(n, e, t = {}) {
  if (t.final === !0)
    return Ld(n, e);
  const r = Me(n), o = Me(e), a = Qe(r[0]), u = Qe(o[0]), c = Qe(r[1]), f = Qe(o[1]), g = Math.sin(u - a) * Math.cos(f), v = Math.cos(c) * Math.sin(f) - Math.sin(c) * Math.cos(f) * Math.cos(u - a);
  return Qt(Math.atan2(g, v));
}
function Ld(n, e) {
  let t = hn(e, n);
  return t = (t + 180) % 360, t > 180 ? t - 360 : t;
}
function jt(n, e, t, r = {}) {
  const o = Me(n), a = Qe(o[0]), u = Qe(o[1]), c = Qe(t), f = mr(e, r.units), g = Math.asin(
    Math.sin(u) * Math.cos(f) + Math.cos(u) * Math.sin(f) * Math.cos(c)
  ), v = a + Math.atan2(
    Math.sin(c) * Math.sin(f) * Math.cos(u),
    Math.cos(f) - Math.sin(u) * Math.sin(g)
  ), m = Qt(v), p = Qt(g);
  return o[2] !== void 0 ? de([m, p, o[2]], r.properties) : de([m, p], r.properties);
}
function qe(n, e, t = {}) {
  var r = Me(n), o = Me(e), a = Qe(o[1] - r[1]), u = Qe(o[0] - r[0]), c = Qe(r[1]), f = Qe(o[1]), g = Math.pow(Math.sin(a / 2), 2) + Math.pow(Math.sin(u / 2), 2) * Math.cos(c) * Math.cos(f);
  return ii(
    2 * Math.atan2(Math.sqrt(g), Math.sqrt(1 - g)),
    t.units
  );
}
function Pd(n, e, t = {}) {
  const o = Ye(n).coordinates;
  let a = 0;
  for (let u = 0; u < o.length && !(e >= a && u === o.length - 1); u++)
    if (a >= e) {
      const c = e - a;
      if (c) {
        const f = hn(o[u], o[u - 1]) - 180;
        return jt(
          o[u],
          c,
          f,
          t
        );
      } else
        return de(o[u]);
    } else
      a += qe(o[u], o[u + 1], t);
  return de(o[o.length - 1]);
}
function Dn(n, e, t = {}) {
  let r;
  return t.final ? r = Cu(Me(e), Me(n)) : r = Cu(Me(n), Me(e)), r > 180 ? -(360 - r) : r;
}
function Cu(n, e) {
  const t = Qe(n[1]), r = Qe(e[1]);
  let o = Qe(e[0] - n[0]);
  o > Math.PI && (o -= 2 * Math.PI), o < -Math.PI && (o += 2 * Math.PI);
  const a = Math.log(
    Math.tan(r / 2 + Math.PI / 4) / Math.tan(t / 2 + Math.PI / 4)
  ), u = Math.atan2(o, a);
  return (Qt(u) + 360) % 360;
}
function Nd(n, e, t, r = {}) {
  if (!Oe(r))
    throw new Error("options is invalid");
  if (!n)
    throw new Error("startPoint is required");
  if (!e)
    throw new Error("midPoint is required");
  if (!t)
    throw new Error("endPoint is required");
  const o = n, a = e, u = t, c = ur(
    r.mercator !== !0 ? hn(a, o) : Dn(a, o)
  );
  let f = ur(
    r.mercator !== !0 ? hn(a, u) : Dn(a, u)
  );
  f < c && (f = f + 360);
  const g = f - c;
  return r.explementary === !0 ? 360 - g : g;
}
function He(n, e, t) {
  if (n !== null)
    for (var r, o, a, u, c, f, g, v = 0, m = 0, p, _ = n.type, w = _ === "FeatureCollection", k = _ === "Feature", L = w ? n.features.length : 1, b = 0; b < L; b++) {
      g = w ? (
        // @ts-expect-error: Known type conflict
        n.features[b].geometry
      ) : k ? (
        // @ts-expect-error: Known type conflict
        n.geometry
      ) : n, p = g ? g.type === "GeometryCollection" : !1, c = p ? g.geometries.length : 1;
      for (var I = 0; I < c; I++) {
        var N = 0, A = 0;
        if (u = p ? g.geometries[I] : g, u !== null) {
          f = u.coordinates;
          var O = u.type;
          switch (v = t && (O === "Polygon" || O === "MultiPolygon") ? 1 : 0, O) {
            case null:
              break;
            case "Point":
              if (
                // @ts-expect-error: Known type conflict
                e(
                  f,
                  m,
                  b,
                  N,
                  A
                ) === !1
              )
                return !1;
              m++, N++;
              break;
            case "LineString":
            case "MultiPoint":
              for (r = 0; r < f.length; r++) {
                if (
                  // @ts-expect-error: Known type conflict
                  e(
                    f[r],
                    m,
                    b,
                    N,
                    A
                  ) === !1
                )
                  return !1;
                m++, O === "MultiPoint" && N++;
              }
              O === "LineString" && N++;
              break;
            case "Polygon":
            case "MultiLineString":
              for (r = 0; r < f.length; r++) {
                for (o = 0; o < f[r].length - v; o++) {
                  if (
                    // @ts-expect-error: Known type conflict
                    e(
                      f[r][o],
                      m,
                      b,
                      N,
                      A
                    ) === !1
                  )
                    return !1;
                  m++;
                }
                O === "MultiLineString" && N++, O === "Polygon" && A++;
              }
              O === "Polygon" && N++;
              break;
            case "MultiPolygon":
              for (r = 0; r < f.length; r++) {
                for (A = 0, o = 0; o < f[r].length; o++) {
                  for (a = 0; a < f[r][o].length - v; a++) {
                    if (
                      // @ts-expect-error: Known type conflict
                      e(
                        f[r][o][a],
                        m,
                        b,
                        N,
                        A
                      ) === !1
                    )
                      return !1;
                    m++;
                  }
                  A++;
                }
                N++;
              }
              break;
            case "GeometryCollection":
              for (r = 0; r < u.geometries.length; r++)
                if (
                  // @ts-expect-error: Known type conflict
                  He(u.geometries[r], e, t) === !1
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
function Jo(n, e, t, r) {
  var o = t;
  return He(
    n,
    function(a, u, c, f, g) {
      u === 0 && t === void 0 ? o = a : o = e(
        // @ts-expect-error: Known type conflict
        o,
        a,
        u,
        c,
        f,
        g
      );
    },
    r
  ), o;
}
function Qo(n, e) {
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
function zc(n, e, t) {
  var r = t;
  return Qo(n, function(o, a) {
    a === 0 && t === void 0 ? r = o : r = e(r, o, a);
  }), r;
}
function Le(n, e) {
  if (n.type === "Feature")
    e(n, 0);
  else if (n.type === "FeatureCollection")
    for (var t = 0; t < n.features.length && e(n.features[t], t) !== !1; t++)
      ;
}
function jo(n, e, t) {
  var r = t;
  return Le(n, function(o, a) {
    a === 0 && t === void 0 ? r = o : r = e(r, o, a);
  }), r;
}
function $r(n) {
  var e = [];
  return He(n, function(t) {
    e.push(t);
  }), e;
}
function at(n, e) {
  var t, r, o, a, u, c, f, g, v, m, p = 0, _ = n.type === "FeatureCollection", w = n.type === "Feature", k = _ ? n.features.length : 1;
  for (t = 0; t < k; t++) {
    for (c = _ ? (
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
    ) : {}, v = _ ? (
      // @ts-expect-error: Known type conflict
      n.features[t].bbox
    ) : w ? (
      // @ts-expect-error: Known type conflict
      n.bbox
    ) : void 0, m = _ ? (
      // @ts-expect-error: Known type conflict
      n.features[t].id
    ) : w ? (
      // @ts-expect-error: Known type conflict
      n.id
    ) : void 0, f = c ? c.type === "GeometryCollection" : !1, u = f ? c.geometries.length : 1, o = 0; o < u; o++) {
      if (a = f ? c.geometries[o] : c, a === null) {
        if (
          // @ts-expect-error: Known type conflict
          e(
            // @ts-expect-error: Known type conflict
            null,
            p,
            g,
            v,
            m
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
              v,
              m
            ) === !1
          )
            return !1;
          break;
        }
        case "GeometryCollection": {
          for (r = 0; r < a.geometries.length; r++)
            if (
              // @ts-expect-error: Known type conflict
              e(
                a.geometries[r],
                p,
                g,
                v,
                m
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
function ea(n, e, t) {
  var r = t;
  return at(
    n,
    function(o, a, u, c, f) {
      a === 0 && t === void 0 ? r = o : r = e(
        // @ts-expect-error: Known type conflict
        r,
        o,
        a,
        u,
        c,
        f
      );
    }
  ), r;
}
function it(n, e) {
  at(n, function(t, r, o, a, u) {
    var c = t === null ? null : t.type;
    switch (c) {
      case null:
      case "Point":
      case "LineString":
      case "Polygon":
        return (
          // @ts-expect-error: Known type conflict
          e(
            Je(t, o, { bbox: a, id: u }),
            r,
            0
          ) === !1 ? !1 : void 0
        );
    }
    var f;
    switch (c) {
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
      var v = t.coordinates[g], m = {
        type: f,
        coordinates: v
      };
      if (
        // @ts-expect-error: Known type conflict
        e(Je(m, o), r, g) === !1
      )
        return !1;
    }
  });
}
function Uc(n, e, t) {
  var r = t;
  return it(
    n,
    function(o, a, u) {
      a === 0 && u === 0 && t === void 0 ? r = o : r = e(
        // @ts-expect-error: Known type conflict
        r,
        o,
        a,
        u
      );
    }
  ), r;
}
function Kt(n, e) {
  it(n, function(t, r, o) {
    var a = 0;
    if (t.geometry) {
      var u = t.geometry.type;
      if (!(u === "Point" || u === "MultiPoint")) {
        var c, f = 0, g = 0, v = 0;
        if (
          // @ts-expect-error: Known type conflict
          He(
            t,
            function(m, p, _, w, k) {
              if (
                // @ts-expect-error: Known type conflict
                c === void 0 || r > f || w > g || k > v
              ) {
                c = m, f = r, g = w, v = k, a = 0;
                return;
              }
              var L = Se(
                // @ts-expect-error: Known type conflict
                [c, m],
                t.properties
              );
              if (
                // @ts-expect-error: Known type conflict
                e(
                  // @ts-expect-error: Known type conflict
                  L,
                  r,
                  o,
                  k,
                  a
                ) === !1
              )
                return !1;
              a++, c = m;
            }
          ) === !1
        )
          return !1;
      }
    }
  });
}
function fs(n, e, t) {
  var r = t, o = !1;
  return Kt(
    n,
    function(a, u, c, f, g) {
      o === !1 && t === void 0 ? r = a : r = e(
        r,
        // @ts-expect-error: Known type conflict
        a,
        u,
        c,
        f,
        g
      ), o = !0;
    }
  ), r;
}
function ta(n, e) {
  if (!n) throw new Error("geojson is required");
  it(n, function(t, r, o) {
    if (t.geometry !== null) {
      var a = t.geometry.type, u = t.geometry.coordinates;
      switch (a) {
        case "LineString":
          if (e(t, r, o, 0, 0) === !1)
            return !1;
          break;
        case "Polygon":
          for (var c = 0; c < u.length; c++)
            if (
              // @ts-expect-error: Known type conflict
              e(
                // @ts-expect-error: Known type conflict
                Se(u[c], t.properties),
                r,
                o,
                c
              ) === !1
            )
              return !1;
          break;
      }
    }
  });
}
function na(n, e, t) {
  var r = t;
  return ta(
    n,
    function(o, a, u, c) {
      a === 0 && t === void 0 ? r = o : r = e(
        r,
        o,
        a,
        u,
        c
      );
    }
  ), r;
}
function Yc(n, e) {
  if (e = e || {}, !Oe(e)) throw new Error("options is invalid");
  var t = e.featureIndex || 0, r = e.multiFeatureIndex || 0, o = e.geometryIndex || 0, a = e.segmentIndex || 0, u = e.properties, c;
  switch (n.type) {
    case "FeatureCollection":
      t < 0 && (t = n.features.length + t), u = u || n.features[t].properties, c = n.features[t].geometry;
      break;
    case "Feature":
      u = u || n.properties, c = n.geometry;
      break;
    case "Point":
    case "MultiPoint":
      return null;
    case "LineString":
    case "Polygon":
    case "MultiLineString":
    case "MultiPolygon":
      c = n;
      break;
    default:
      throw new Error("geojson is invalid");
  }
  if (c === null) return null;
  var f = c.coordinates;
  switch (c.type) {
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
      return r < 0 && (r = f.length + r), a < 0 && (a = f[r].length + a - 1), Se(
        [
          // @ts-expect-error: Known type conflict
          f[r][a],
          // @ts-expect-error: Known type conflict
          f[r][a + 1]
        ],
        u,
        e
      );
    case "MultiPolygon":
      return r < 0 && (r = f.length + r), o < 0 && (o = f[r].length + o), a < 0 && (a = // @ts-expect-error: Known type conflict
      f[r][o].length - a - 1), Se(
        [
          // @ts-expect-error: Known type conflict
          f[r][o][a],
          // @ts-expect-error: Known type conflict
          f[r][o][a + 1]
        ],
        u,
        e
      );
  }
  throw new Error("geojson is invalid");
}
function Xc(n, e) {
  if (e = e || {}, !Oe(e)) throw new Error("options is invalid");
  var t = e.featureIndex || 0, r = e.multiFeatureIndex || 0, o = e.geometryIndex || 0, a = e.coordIndex || 0, u = e.properties, c;
  switch (n.type) {
    case "FeatureCollection":
      t < 0 && (t = n.features.length + t), u = u || n.features[t].properties, c = n.features[t].geometry;
      break;
    case "Feature":
      u = u || n.properties, c = n.geometry;
      break;
    case "Point":
    case "MultiPoint":
      return null;
    case "LineString":
    case "Polygon":
    case "MultiLineString":
    case "MultiPolygon":
      c = n;
      break;
    default:
      throw new Error("geojson is invalid");
  }
  if (c === null) return null;
  var f = c.coordinates;
  switch (c.type) {
    case "Point":
      return de(f, u, e);
    case "MultiPoint":
      return r < 0 && (r = f.length + r), de(f[r], u, e);
    case "LineString":
      return a < 0 && (a = f.length + a), de(f[a], u, e);
    case "Polygon":
      return o < 0 && (o = f.length + o), a < 0 && (a = f[o].length + a), de(f[o][a], u, e);
    case "MultiLineString":
      return r < 0 && (r = f.length + r), a < 0 && (a = f[r].length + a), de(f[r][a], u, e);
    case "MultiPolygon":
      return r < 0 && (r = f.length + r), o < 0 && (o = f[r].length + o), a < 0 && (a = f[r][o].length - a), de(
        f[r][o][a],
        u,
        e
      );
  }
  throw new Error("geojson is invalid");
}
const Td = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  coordAll: $r,
  coordEach: He,
  coordReduce: Jo,
  featureEach: Le,
  featureReduce: jo,
  findPoint: Xc,
  findSegment: Yc,
  flattenEach: it,
  flattenReduce: Uc,
  geomEach: at,
  geomReduce: ea,
  lineEach: ta,
  lineReduce: na,
  propEach: Qo,
  propReduce: zc,
  segmentEach: Kt,
  segmentReduce: fs
}, Symbol.toStringTag, { value: "Module" }));
function oi(n) {
  return ea(
    n,
    (e, t) => e + Rd(t),
    0
  );
}
function Rd(n) {
  let e = 0, t;
  switch (n.type) {
    case "Polygon":
      return ku(n.coordinates);
    case "MultiPolygon":
      for (t = 0; t < n.coordinates.length; t++)
        e += ku(n.coordinates[t]);
      return e;
    case "Point":
    case "MultiPoint":
    case "LineString":
    case "MultiLineString":
      return 0;
  }
  return 0;
}
function ku(n) {
  let e = 0;
  if (n && n.length > 0) {
    e += Math.abs(Iu(n[0]));
    for (let t = 1; t < n.length; t++)
      e -= Math.abs(Iu(n[t]));
  }
  return e;
}
var Ad = Be * Be / 2, Ks = Math.PI / 180;
function Iu(n) {
  const e = n.length - 1;
  if (e <= 2) return 0;
  let t = 0, r = 0;
  for (; r < e; ) {
    const o = n[r], a = n[r + 1 === e ? 0 : r + 1], u = n[r + 2 >= e ? (r + 2) % e : r + 2], c = o[0] * Ks, f = a[1] * Ks, g = u[0] * Ks;
    t += (g - c) * Math.sin(f), r++;
  }
  return t * Ad;
}
function ze(n, e = {}) {
  if (n.bbox != null && e.recompute !== !0)
    return n.bbox;
  const t = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
  return He(n, (r) => {
    t[0] > r[0] && (t[0] = r[0]), t[1] > r[1] && (t[1] = r[1]), t[2] < r[0] && (t[2] = r[0]), t[3] < r[1] && (t[3] = r[1]);
  }), t;
}
function Od(n, e, t) {
  var r = n.length, o = jn(n[0], e), a = [], u, c, f;
  let g, v;
  for (t || (t = []), u = 1; u < r; u++) {
    for (g = n[u - 1], v = n[u], c = f = jn(v, e); ; )
      if (o | c) {
        if (o & c)
          break;
        o ? (g = wo(g, v, o, e), o = jn(g, e)) : (v = wo(g, v, c, e), c = jn(v, e));
      } else {
        a.push(g), c !== f ? (a.push(v), u < r - 1 && (t.push(a), a = [])) : u === r - 1 && a.push(v);
        break;
      }
    o = f;
  }
  return a.length && t.push(a), t;
}
function Dd(n, e) {
  var t, r, o, a, u, c, f;
  for (r = 1; r <= 8; r *= 2) {
    for (t = [], o = n[n.length - 1], a = !(jn(o, e) & r), u = 0; u < n.length; u++)
      c = n[u], f = !(jn(c, e) & r), f !== a && t.push(wo(o, c, r, e)), f && t.push(c), o = c, a = f;
    if (n = t, !n.length) break;
  }
  return t;
}
function wo(n, e, t, r) {
  return t & 8 ? [n[0] + (e[0] - n[0]) * (r[3] - n[1]) / (e[1] - n[1]), r[3]] : t & 4 ? [n[0] + (e[0] - n[0]) * (r[1] - n[1]) / (e[1] - n[1]), r[1]] : t & 2 ? [r[2], n[1] + (e[1] - n[1]) * (r[2] - n[0]) / (e[0] - n[0])] : t & 1 ? [r[0], n[1] + (e[1] - n[1]) * (r[0] - n[0]) / (e[0] - n[0])] : null;
}
function jn(n, e) {
  var t = 0;
  return n[0] < e[0] ? t |= 1 : n[0] > e[2] && (t |= 2), n[1] < e[1] ? t |= 4 : n[1] > e[3] && (t |= 8), t;
}
function Fd(n, e) {
  const t = Ye(n), r = t.type, o = n.type === "Feature" ? n.properties : {};
  let a = t.coordinates;
  switch (r) {
    case "LineString":
    case "MultiLineString": {
      const u = [];
      return r === "LineString" && (a = [a]), a.forEach((c) => {
        Od(c, e, u);
      }), u.length === 1 ? Se(u[0], o) : xn(u, o);
    }
    case "Polygon":
      return ye(Su(a, e), o);
    case "MultiPolygon":
      return wt(
        a.map((u) => Su(u, e)),
        o
      );
    default:
      throw new Error("geometry " + r + " not supported");
  }
}
function Su(n, e) {
  const t = [];
  for (const r of n) {
    const o = Dd(r, e);
    o.length > 0 && ((o[0][0] !== o[o.length - 1][0] || o[0][1] !== o[o.length - 1][1]) && o.push(o[0]), o.length >= 4 && t.push(o));
  }
  return t;
}
function ai(n, e = {}) {
  const t = Number(n[0]), r = Number(n[1]), o = Number(n[2]), a = Number(n[3]);
  if (n.length === 6)
    throw new Error(
      "@turf/bbox-polygon does not support BBox with 6 positions"
    );
  const u = [t, r];
  return ye(
    [[u, [o, r], [o, a], [t, a], u]],
    e.properties,
    { bbox: n, id: e.id }
  );
}
var Bd = class {
  constructor(n) {
    this.points = n.points || [], this.duration = n.duration || 1e4, this.sharpness = n.sharpness || 0.85, this.centers = [], this.controls = [], this.stepLength = n.stepLength || 60, this.length = this.points.length, this.delay = 0;
    for (let e = 0; e < this.length; e++)
      this.points[e].z = this.points[e].z || 0;
    for (let e = 0; e < this.length - 1; e++) {
      const t = this.points[e], r = this.points[e + 1];
      this.centers.push({
        x: (t.x + r.x) / 2,
        y: (t.y + r.y) / 2,
        z: (t.z + r.z) / 2
      });
    }
    this.controls.push([this.points[0], this.points[0]]);
    for (let e = 0; e < this.centers.length - 1; e++) {
      const t = this.points[e + 1].x - (this.centers[e].x + this.centers[e + 1].x) / 2, r = this.points[e + 1].y - (this.centers[e].y + this.centers[e + 1].y) / 2, o = this.points[e + 1].z - (this.centers[e].z + this.centers[e + 1].z) / 2;
      this.controls.push([
        {
          x: (1 - this.sharpness) * this.points[e + 1].x + this.sharpness * (this.centers[e].x + t),
          y: (1 - this.sharpness) * this.points[e + 1].y + this.sharpness * (this.centers[e].y + r),
          z: (1 - this.sharpness) * this.points[e + 1].z + this.sharpness * (this.centers[e].z + o)
        },
        {
          x: (1 - this.sharpness) * this.points[e + 1].x + this.sharpness * (this.centers[e + 1].x + t),
          y: (1 - this.sharpness) * this.points[e + 1].y + this.sharpness * (this.centers[e + 1].y + r),
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
    for (let r = 0; r < this.duration; r += 10) {
      const o = this.pos(r);
      Math.sqrt(
        (o.x - t.x) * (o.x - t.x) + (o.y - t.y) * (o.y - t.y) + (o.z - t.z) * (o.z - t.z)
      ) > n && (e.push(r), t = o);
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
    const r = Math.floor((this.points.length - 1) * t), o = (this.length - 1) * t - r;
    return Gd(
      o,
      this.points[r],
      this.controls[r][1],
      this.controls[r + 1][0],
      this.points[r + 1]
    );
  }
};
function Gd(n, e, t, r, o) {
  const a = qd(n);
  return {
    x: o.x * a[0] + r.x * a[1] + t.x * a[2] + e.x * a[3],
    y: o.y * a[0] + r.y * a[1] + t.y * a[2] + e.y * a[3],
    z: o.z * a[0] + r.z * a[1] + t.z * a[2] + e.z * a[3]
  };
}
function qd(n) {
  const e = n * n;
  return [
    e * n,
    3 * e * (1 - n),
    3 * n * (1 - n) * (1 - n),
    (1 - n) * (1 - n) * (1 - n)
  ];
}
function zd(n, e = {}) {
  const t = e.resolution || 1e4, r = e.sharpness || 0.85, o = [], a = Ye(n).coordinates.map((g) => ({ x: g[0], y: g[1] })), u = new Bd({
    duration: t,
    points: a,
    sharpness: r
  }), c = (g) => {
    var v = u.pos(g);
    Math.floor(g / 100) % 2 === 0 && o.push([v.x, v.y]);
  };
  for (var f = 0; f < u.duration; f += 10)
    c(f);
  return c(u.duration), Se(o, e.properties);
}
function Ki(n) {
  const e = me(n);
  let t = 0, r = 1, o, a;
  for (; r < e.length; )
    o = a || e[0], a = e[r], t += (a[0] - o[0]) * (a[1] + o[1]), r++;
  return t > 0;
}
function Ud(n) {
  const e = Ye(n).coordinates;
  if (e[0].length <= 4)
    return !1;
  let t = !1;
  const r = e[0].length - 1;
  for (let o = 0; o < r; o++) {
    const a = e[0][(o + 2) % r][0] - e[0][(o + 1) % r][0], u = e[0][(o + 2) % r][1] - e[0][(o + 1) % r][1], c = e[0][o][0] - e[0][(o + 1) % r][0], f = e[0][o][1] - e[0][(o + 1) % r][1], g = a * f - u * c;
    if (o === 0)
      t = g > 0;
    else if (t !== g > 0)
      return !0;
  }
  return !1;
}
const ln = 11102230246251565e-32, lt = 134217729, Yd = (3 + 8 * ln) * ln;
function Js(n, e, t, r, o) {
  let a, u, c, f, g = e[0], v = r[0], m = 0, p = 0;
  v > g == v > -g ? (a = g, g = e[++m]) : (a = v, v = r[++p]);
  let _ = 0;
  if (m < n && p < t)
    for (v > g == v > -g ? (u = g + a, c = a - (u - g), g = e[++m]) : (u = v + a, c = a - (u - v), v = r[++p]), a = u, c !== 0 && (o[_++] = c); m < n && p < t; )
      v > g == v > -g ? (u = a + g, f = u - a, c = a - (u - f) + (g - f), g = e[++m]) : (u = a + v, f = u - a, c = a - (u - f) + (v - f), v = r[++p]), a = u, c !== 0 && (o[_++] = c);
  for (; m < n; )
    u = a + g, f = u - a, c = a - (u - f) + (g - f), g = e[++m], a = u, c !== 0 && (o[_++] = c);
  for (; p < t; )
    u = a + v, f = u - a, c = a - (u - f) + (v - f), v = r[++p], a = u, c !== 0 && (o[_++] = c);
  return (a !== 0 || _ === 0) && (o[_++] = a), _;
}
function Xd(n, e) {
  let t = e[0];
  for (let r = 1; r < n; r++) t += e[r];
  return t;
}
function ui(n) {
  return new Float64Array(n);
}
const Vd = (3 + 16 * ln) * ln, Hd = (2 + 12 * ln) * ln, Wd = (9 + 64 * ln) * ln * ln, Wn = ui(4), bu = ui(8), Mu = ui(12), Lu = ui(16), mt = ui(4);
function $d(n, e, t, r, o, a, u) {
  let c, f, g, v, m, p, _, w, k, L, b, I, N, A, O, Y, V, C;
  const M = n - o, T = t - o, D = e - a, B = r - a;
  A = M * B, p = lt * M, _ = p - (p - M), w = M - _, p = lt * B, k = p - (p - B), L = B - k, O = w * L - (A - _ * k - w * k - _ * L), Y = D * T, p = lt * D, _ = p - (p - D), w = D - _, p = lt * T, k = p - (p - T), L = T - k, V = w * L - (Y - _ * k - w * k - _ * L), b = O - V, m = O - b, Wn[0] = O - (b + m) + (m - V), I = A + b, m = I - A, N = A - (I - m) + (b - m), b = N - Y, m = N - b, Wn[1] = N - (b + m) + (m - Y), C = I + b, m = C - I, Wn[2] = I - (C - m) + (b - m), Wn[3] = C;
  let q = Xd(4, Wn), X = Hd * u;
  if (q >= X || -q >= X || (m = n - M, c = n - (M + m) + (m - o), m = t - T, g = t - (T + m) + (m - o), m = e - D, f = e - (D + m) + (m - a), m = r - B, v = r - (B + m) + (m - a), c === 0 && f === 0 && g === 0 && v === 0) || (X = Wd * u + Yd * Math.abs(q), q += M * v + B * c - (D * g + T * f), q >= X || -q >= X)) return q;
  A = c * B, p = lt * c, _ = p - (p - c), w = c - _, p = lt * B, k = p - (p - B), L = B - k, O = w * L - (A - _ * k - w * k - _ * L), Y = f * T, p = lt * f, _ = p - (p - f), w = f - _, p = lt * T, k = p - (p - T), L = T - k, V = w * L - (Y - _ * k - w * k - _ * L), b = O - V, m = O - b, mt[0] = O - (b + m) + (m - V), I = A + b, m = I - A, N = A - (I - m) + (b - m), b = N - Y, m = N - b, mt[1] = N - (b + m) + (m - Y), C = I + b, m = C - I, mt[2] = I - (C - m) + (b - m), mt[3] = C;
  const R = Js(4, Wn, 4, mt, bu);
  A = M * v, p = lt * M, _ = p - (p - M), w = M - _, p = lt * v, k = p - (p - v), L = v - k, O = w * L - (A - _ * k - w * k - _ * L), Y = D * g, p = lt * D, _ = p - (p - D), w = D - _, p = lt * g, k = p - (p - g), L = g - k, V = w * L - (Y - _ * k - w * k - _ * L), b = O - V, m = O - b, mt[0] = O - (b + m) + (m - V), I = A + b, m = I - A, N = A - (I - m) + (b - m), b = N - Y, m = N - b, mt[1] = N - (b + m) + (m - Y), C = I + b, m = C - I, mt[2] = I - (C - m) + (b - m), mt[3] = C;
  const U = Js(R, bu, 4, mt, Mu);
  A = c * v, p = lt * c, _ = p - (p - c), w = c - _, p = lt * v, k = p - (p - v), L = v - k, O = w * L - (A - _ * k - w * k - _ * L), Y = f * g, p = lt * f, _ = p - (p - f), w = f - _, p = lt * g, k = p - (p - g), L = g - k, V = w * L - (Y - _ * k - w * k - _ * L), b = O - V, m = O - b, mt[0] = O - (b + m) + (m - V), I = A + b, m = I - A, N = A - (I - m) + (b - m), b = N - Y, m = N - b, mt[1] = N - (b + m) + (m - Y), C = I + b, m = C - I, mt[2] = I - (C - m) + (b - m), mt[3] = C;
  const G = Js(U, Mu, 4, mt, Lu);
  return Lu[G - 1];
}
function Zd(n, e, t, r, o, a) {
  const u = (e - a) * (t - o), c = (n - o) * (r - a), f = u - c, g = Math.abs(u + c);
  return Math.abs(f) >= Vd * g ? f : -$d(n, e, t, r, o, a, g);
}
function Kd(n, e) {
  var t, r, o = 0, a, u, c, f, g, v, m, p = n[0], _ = n[1], w = e.length;
  for (t = 0; t < w; t++) {
    r = 0;
    var k = e[t], L = k.length - 1;
    if (v = k[0], v[0] !== k[L][0] && v[1] !== k[L][1])
      throw new Error("First and last coordinates in a ring must be the same");
    for (u = v[0] - p, c = v[1] - _, r; r < L; r++) {
      if (m = k[r + 1], f = m[0] - p, g = m[1] - _, c === 0 && g === 0) {
        if (f <= 0 && u >= 0 || u <= 0 && f >= 0)
          return 0;
      } else if (g >= 0 && c <= 0 || g <= 0 && c >= 0) {
        if (a = Zd(u, f, c, g, 0, 0), a === 0)
          return 0;
        (a > 0 && g > 0 && c <= 0 || a < 0 && g <= 0 && c > 0) && o++;
      }
      v = m, c = g, u = f;
    }
  }
  return o % 2 !== 0;
}
function xe(n, e, t = {}) {
  if (!n)
    throw new Error("point is required");
  if (!e)
    throw new Error("polygon is required");
  const r = Me(n), o = Ye(e), a = o.type, u = e.bbox;
  let c = o.coordinates;
  if (u && Jd(r, u) === !1)
    return !1;
  a === "Polygon" && (c = [c]);
  for (var f = 0; f < c.length; ++f) {
    const g = Kd(r, c[f]);
    if (g === 0 && !t.ignoreBoundary) return !0;
    if (g) return !0;
  }
  return !1;
}
function Jd(n, e) {
  return e[0] <= n[0] && e[1] <= n[1] && e[2] >= n[0] && e[3] >= n[1];
}
function Ie(n, e, t = {}) {
  const r = Me(n), o = me(e);
  for (let a = 0; a < o.length - 1; a++) {
    let u = !1;
    if (t.ignoreEndVertices && (a === 0 && (u = "start"), a === o.length - 2 && (u = "end"), a === 0 && a + 1 === o.length - 1 && (u = "both")), Qd(
      o[a],
      o[a + 1],
      r,
      u,
      typeof t.epsilon > "u" ? null : t.epsilon
    ))
      return !0;
  }
  return !1;
}
function Qd(n, e, t, r, o) {
  const a = t[0], u = t[1], c = n[0], f = n[1], g = e[0], v = e[1], m = t[0] - c, p = t[1] - f, _ = g - c, w = v - f, k = m * w - p * _;
  if (o !== null) {
    if (Math.abs(k) > o)
      return !1;
  } else if (k !== 0)
    return !1;
  if (Math.abs(_) === Math.abs(w) && Math.abs(_) === 0)
    return r ? !1 : t[0] === n[0] && t[1] === n[1];
  if (r) {
    if (r === "start")
      return Math.abs(_) >= Math.abs(w) ? _ > 0 ? c < a && a <= g : g <= a && a < c : w > 0 ? f < u && u <= v : v <= u && u < f;
    if (r === "end")
      return Math.abs(_) >= Math.abs(w) ? _ > 0 ? c <= a && a < g : g < a && a <= c : w > 0 ? f <= u && u < v : v < u && u <= f;
    if (r === "both")
      return Math.abs(_) >= Math.abs(w) ? _ > 0 ? c < a && a < g : g < a && a < c : w > 0 ? f < u && u < v : v < u && u < f;
  } else return Math.abs(_) >= Math.abs(w) ? _ > 0 ? c <= a && a <= g : g <= a && a <= c : w > 0 ? f <= u && u <= v : v <= u && u <= f;
  return !1;
}
function jd(n, e, t, r, o) {
  Vc(n, e, t || 0, r || n.length - 1, o || em);
}
function Vc(n, e, t, r, o) {
  for (; r > t; ) {
    if (r - t > 600) {
      var a = r - t + 1, u = e - t + 1, c = Math.log(a), f = 0.5 * Math.exp(2 * c / 3), g = 0.5 * Math.sqrt(c * f * (a - f) / a) * (u - a / 2 < 0 ? -1 : 1), v = Math.max(t, Math.floor(e - u * f / a + g)), m = Math.min(r, Math.floor(e + (a - u) * f / a + g));
      Vc(n, e, v, m, o);
    }
    var p = n[e], _ = t, w = r;
    for (br(n, t, e), o(n[r], p) > 0 && br(n, t, r); _ < w; ) {
      for (br(n, _, w), _++, w--; o(n[_], p) < 0; ) _++;
      for (; o(n[w], p) > 0; ) w--;
    }
    o(n[t], p) === 0 ? br(n, t, w) : (w++, br(n, w, r)), w <= e && (t = w + 1), e <= w && (r = w - 1);
  }
}
function br(n, e, t) {
  var r = n[e];
  n[e] = n[t], n[t] = r;
}
function em(n, e) {
  return n < e ? -1 : n > e ? 1 : 0;
}
let vr = class {
  constructor(e = 9) {
    this._maxEntries = Math.max(4, e), this._minEntries = Math.max(2, Math.ceil(this._maxEntries * 0.4)), this.clear();
  }
  all() {
    return this._all(this.data, []);
  }
  search(e) {
    let t = this.data;
    const r = [];
    if (!Ii(e, t)) return r;
    const o = this.toBBox, a = [];
    for (; t; ) {
      for (let u = 0; u < t.children.length; u++) {
        const c = t.children[u], f = t.leaf ? o(c) : c;
        Ii(e, f) && (t.leaf ? r.push(c) : js(e, f) ? this._all(c, r) : a.push(c));
      }
      t = a.pop();
    }
    return r;
  }
  collides(e) {
    let t = this.data;
    if (!Ii(e, t)) return !1;
    const r = [];
    for (; t; ) {
      for (let o = 0; o < t.children.length; o++) {
        const a = t.children[o], u = t.leaf ? this.toBBox(a) : a;
        if (Ii(e, u)) {
          if (t.leaf || js(e, u)) return !0;
          r.push(a);
        }
      }
      t = r.pop();
    }
    return !1;
  }
  load(e) {
    if (!(e && e.length)) return this;
    if (e.length < this._minEntries) {
      for (let r = 0; r < e.length; r++)
        this.insert(e[r]);
      return this;
    }
    let t = this._build(e.slice(), 0, e.length - 1, 0);
    if (!this.data.children.length)
      this.data = t;
    else if (this.data.height === t.height)
      this._splitRoot(this.data, t);
    else {
      if (this.data.height < t.height) {
        const r = this.data;
        this.data = t, t = r;
      }
      this._insert(t, this.data.height - t.height - 1, !0);
    }
    return this;
  }
  insert(e) {
    return e && this._insert(e, this.data.height - 1), this;
  }
  clear() {
    return this.data = Qn([]), this;
  }
  remove(e, t) {
    if (!e) return this;
    let r = this.data;
    const o = this.toBBox(e), a = [], u = [];
    let c, f, g;
    for (; r || a.length; ) {
      if (r || (r = a.pop(), f = a[a.length - 1], c = u.pop(), g = !0), r.leaf) {
        const v = tm(e, r.children, t);
        if (v !== -1)
          return r.children.splice(v, 1), a.push(r), this._condense(a), this;
      }
      !g && !r.leaf && js(r, o) ? (a.push(r), u.push(c), c = 0, f = r, r = r.children[0]) : f ? (c++, r = f.children[c], g = !1) : r = null;
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
    const r = [];
    for (; e; )
      e.leaf ? t.push(...e.children) : r.push(...e.children), e = r.pop();
    return t;
  }
  _build(e, t, r, o) {
    const a = r - t + 1;
    let u = this._maxEntries, c;
    if (a <= u)
      return c = Qn(e.slice(t, r + 1)), $n(c, this.toBBox), c;
    o || (o = Math.ceil(Math.log(a) / Math.log(u)), u = Math.ceil(a / Math.pow(u, o - 1))), c = Qn([]), c.leaf = !1, c.height = o;
    const f = Math.ceil(a / u), g = f * Math.ceil(Math.sqrt(u));
    Pu(e, t, r, g, this.compareMinX);
    for (let v = t; v <= r; v += g) {
      const m = Math.min(v + g - 1, r);
      Pu(e, v, m, f, this.compareMinY);
      for (let p = v; p <= m; p += f) {
        const _ = Math.min(p + f - 1, m);
        c.children.push(this._build(e, p, _, o - 1));
      }
    }
    return $n(c, this.toBBox), c;
  }
  _chooseSubtree(e, t, r, o) {
    for (; o.push(t), !(t.leaf || o.length - 1 === r); ) {
      let a = 1 / 0, u = 1 / 0, c;
      for (let f = 0; f < t.children.length; f++) {
        const g = t.children[f], v = Qs(g), m = im(e, g) - v;
        m < u ? (u = m, a = v < a ? v : a, c = g) : m === u && v < a && (a = v, c = g);
      }
      t = c || t.children[0];
    }
    return t;
  }
  _insert(e, t, r) {
    const o = r ? e : this.toBBox(e), a = [], u = this._chooseSubtree(o, this.data, t, a);
    for (u.children.push(e), Or(u, o); t >= 0 && a[t].children.length > this._maxEntries; )
      this._split(a, t), t--;
    this._adjustParentBBoxes(o, a, t);
  }
  // split overflowed node into two
  _split(e, t) {
    const r = e[t], o = r.children.length, a = this._minEntries;
    this._chooseSplitAxis(r, a, o);
    const u = this._chooseSplitIndex(r, a, o), c = Qn(r.children.splice(u, r.children.length - u));
    c.height = r.height, c.leaf = r.leaf, $n(r, this.toBBox), $n(c, this.toBBox), t ? e[t - 1].children.push(c) : this._splitRoot(r, c);
  }
  _splitRoot(e, t) {
    this.data = Qn([e, t]), this.data.height = e.height + 1, this.data.leaf = !1, $n(this.data, this.toBBox);
  }
  _chooseSplitIndex(e, t, r) {
    let o, a = 1 / 0, u = 1 / 0;
    for (let c = t; c <= r - t; c++) {
      const f = Ar(e, 0, c, this.toBBox), g = Ar(e, c, r, this.toBBox), v = sm(f, g), m = Qs(f) + Qs(g);
      v < a ? (a = v, o = c, u = m < u ? m : u) : v === a && m < u && (u = m, o = c);
    }
    return o || r - t;
  }
  // sorts node children by the best axis for split
  _chooseSplitAxis(e, t, r) {
    const o = e.leaf ? this.compareMinX : nm, a = e.leaf ? this.compareMinY : rm, u = this._allDistMargin(e, t, r, o), c = this._allDistMargin(e, t, r, a);
    u < c && e.children.sort(o);
  }
  // total margin of all possible split distributions where each node is at least m full
  _allDistMargin(e, t, r, o) {
    e.children.sort(o);
    const a = this.toBBox, u = Ar(e, 0, t, a), c = Ar(e, r - t, r, a);
    let f = ki(u) + ki(c);
    for (let g = t; g < r - t; g++) {
      const v = e.children[g];
      Or(u, e.leaf ? a(v) : v), f += ki(u);
    }
    for (let g = r - t - 1; g >= t; g--) {
      const v = e.children[g];
      Or(c, e.leaf ? a(v) : v), f += ki(c);
    }
    return f;
  }
  _adjustParentBBoxes(e, t, r) {
    for (let o = r; o >= 0; o--)
      Or(t[o], e);
  }
  _condense(e) {
    for (let t = e.length - 1, r; t >= 0; t--)
      e[t].children.length === 0 ? t > 0 ? (r = e[t - 1].children, r.splice(r.indexOf(e[t]), 1)) : this.clear() : $n(e[t], this.toBBox);
  }
};
function tm(n, e, t) {
  if (!t) return e.indexOf(n);
  for (let r = 0; r < e.length; r++)
    if (t(n, e[r])) return r;
  return -1;
}
function $n(n, e) {
  Ar(n, 0, n.children.length, e, n);
}
function Ar(n, e, t, r, o) {
  o || (o = Qn(null)), o.minX = 1 / 0, o.minY = 1 / 0, o.maxX = -1 / 0, o.maxY = -1 / 0;
  for (let a = e; a < t; a++) {
    const u = n.children[a];
    Or(o, n.leaf ? r(u) : u);
  }
  return o;
}
function Or(n, e) {
  return n.minX = Math.min(n.minX, e.minX), n.minY = Math.min(n.minY, e.minY), n.maxX = Math.max(n.maxX, e.maxX), n.maxY = Math.max(n.maxY, e.maxY), n;
}
function nm(n, e) {
  return n.minX - e.minX;
}
function rm(n, e) {
  return n.minY - e.minY;
}
function Qs(n) {
  return (n.maxX - n.minX) * (n.maxY - n.minY);
}
function ki(n) {
  return n.maxX - n.minX + (n.maxY - n.minY);
}
function im(n, e) {
  return (Math.max(e.maxX, n.maxX) - Math.min(e.minX, n.minX)) * (Math.max(e.maxY, n.maxY) - Math.min(e.minY, n.minY));
}
function sm(n, e) {
  const t = Math.max(n.minX, e.minX), r = Math.max(n.minY, e.minY), o = Math.min(n.maxX, e.maxX), a = Math.min(n.maxY, e.maxY);
  return Math.max(0, o - t) * Math.max(0, a - r);
}
function js(n, e) {
  return n.minX <= e.minX && n.minY <= e.minY && e.maxX <= n.maxX && e.maxY <= n.maxY;
}
function Ii(n, e) {
  return e.minX <= n.maxX && e.minY <= n.maxY && e.maxX >= n.minX && e.maxY >= n.minY;
}
function Qn(n) {
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
function Pu(n, e, t, r, o) {
  const a = [e, t];
  for (; a.length; ) {
    if (t = a.pop(), e = a.pop(), t - e <= r) continue;
    const u = e + Math.ceil((t - e) / r / 2) * r;
    jd(n, u, e, t, o), a.push(e, u, u, t);
  }
}
const om = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: vr
}, Symbol.toStringTag, { value: "Module" }));
function eo(n) {
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
var am = class {
  constructor(e = 9) {
    this.tree = new vr(e), this.tree.toBBox = eo;
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
    return Array.isArray(e) ? e.forEach(function(r) {
      if (r.type !== "Feature") throw new Error("invalid features");
      r.bbox = r.bbox ? r.bbox : ze(r), t.push(r);
    }) : Le(e, function(r) {
      if (r.type !== "Feature") throw new Error("invalid features");
      r.bbox = r.bbox ? r.bbox : ze(r), t.push(r);
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
    var t = this.tree.search(eo(e));
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
    return this.tree.collides(eo(e));
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
function gs(n) {
  return new am(n);
}
function Hc(n, e) {
  if (e = e ?? {}, !Oe(e)) throw new Error("options is invalid");
  var t = e.precision, r = e.coordinates, o = e.mutate;
  if (t = t == null || isNaN(t) ? 6 : t, r = r == null || isNaN(r) ? 3 : r, !n) throw new Error("<geojson> is required");
  if (typeof t != "number")
    throw new Error("<precision> must be a number");
  if (typeof r != "number")
    throw new Error("<coordinates> must be a number");
  (o === !1 || o === void 0) && (n = JSON.parse(JSON.stringify(n)));
  var a = Math.pow(10, t);
  return He(n, function(u) {
    um(u, a, r);
  }), n;
}
function um(n, e, t) {
  n.length > t && n.splice(t, n.length);
  for (var r = 0; r < n.length; r++)
    n[r] = Math.round(n[r] * e) / e;
  return n;
}
function Zr(n) {
  if (!n)
    throw new Error("geojson is required");
  const e = [];
  return it(n, (t) => {
    lm(t, e);
  }), ce(e);
}
function lm(n, e) {
  let t = [];
  const r = n.geometry;
  if (r !== null) {
    switch (r.type) {
      case "Polygon":
        t = me(r);
        break;
      case "LineString":
        t = [me(r)];
    }
    t.forEach((o) => {
      cm(o, n.properties).forEach((u) => {
        u.id = e.length, e.push(u);
      });
    });
  }
}
function cm(n, e) {
  const t = [];
  return n.reduce((r, o) => {
    const a = Se([r, o], e);
    return a.bbox = hm(r, o), t.push(a), o;
  }), t;
}
function hm(n, e) {
  const t = n[0], r = n[1], o = e[0], a = e[1], u = t < o ? t : o, c = r < a ? r : a, f = t > o ? t : o, g = r > a ? r : a;
  return [u, c, f, g];
}
class ra {
  constructor(e = [], t = fm) {
    if (this.data = e, this.length = this.data.length, this.compare = t, this.length > 0)
      for (let r = (this.length >> 1) - 1; r >= 0; r--) this._down(r);
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
    const { data: t, compare: r } = this, o = t[e];
    for (; e > 0; ) {
      const a = e - 1 >> 1, u = t[a];
      if (r(o, u) >= 0) break;
      t[e] = u, e = a;
    }
    t[e] = o;
  }
  _down(e) {
    const { data: t, compare: r } = this, o = this.length >> 1, a = t[e];
    for (; e < o; ) {
      let u = (e << 1) + 1, c = t[u];
      const f = u + 1;
      if (f < this.length && r(t[f], c) < 0 && (u = f, c = t[f]), r(c, a) >= 0) break;
      t[e] = c, e = u;
    }
    t[e] = a;
  }
}
function fm(n, e) {
  return n < e ? -1 : n > e ? 1 : 0;
}
const gm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ra
}, Symbol.toStringTag, { value: "Module" })), cn = 11102230246251565e-32, ct = 134217729, dm = (3 + 8 * cn) * cn;
function to(n, e, t, r, o) {
  let a, u, c, f, g = e[0], v = r[0], m = 0, p = 0;
  v > g == v > -g ? (a = g, g = e[++m]) : (a = v, v = r[++p]);
  let _ = 0;
  if (m < n && p < t)
    for (v > g == v > -g ? (u = g + a, c = a - (u - g), g = e[++m]) : (u = v + a, c = a - (u - v), v = r[++p]), a = u, c !== 0 && (o[_++] = c); m < n && p < t; )
      v > g == v > -g ? (u = a + g, f = u - a, c = a - (u - f) + (g - f), g = e[++m]) : (u = a + v, f = u - a, c = a - (u - f) + (v - f), v = r[++p]), a = u, c !== 0 && (o[_++] = c);
  for (; m < n; )
    u = a + g, f = u - a, c = a - (u - f) + (g - f), g = e[++m], a = u, c !== 0 && (o[_++] = c);
  for (; p < t; )
    u = a + v, f = u - a, c = a - (u - f) + (v - f), v = r[++p], a = u, c !== 0 && (o[_++] = c);
  return (a !== 0 || _ === 0) && (o[_++] = a), _;
}
function mm(n, e) {
  let t = e[0];
  for (let r = 1; r < n; r++) t += e[r];
  return t;
}
function li(n) {
  return new Float64Array(n);
}
const vm = (3 + 16 * cn) * cn, ym = (2 + 12 * cn) * cn, pm = (9 + 64 * cn) * cn * cn, Zn = li(4), Nu = li(8), Tu = li(12), Ru = li(16), vt = li(4);
function _m(n, e, t, r, o, a, u) {
  let c, f, g, v, m, p, _, w, k, L, b, I, N, A, O, Y, V, C;
  const M = n - o, T = t - o, D = e - a, B = r - a;
  A = M * B, p = ct * M, _ = p - (p - M), w = M - _, p = ct * B, k = p - (p - B), L = B - k, O = w * L - (A - _ * k - w * k - _ * L), Y = D * T, p = ct * D, _ = p - (p - D), w = D - _, p = ct * T, k = p - (p - T), L = T - k, V = w * L - (Y - _ * k - w * k - _ * L), b = O - V, m = O - b, Zn[0] = O - (b + m) + (m - V), I = A + b, m = I - A, N = A - (I - m) + (b - m), b = N - Y, m = N - b, Zn[1] = N - (b + m) + (m - Y), C = I + b, m = C - I, Zn[2] = I - (C - m) + (b - m), Zn[3] = C;
  let q = mm(4, Zn), X = ym * u;
  if (q >= X || -q >= X || (m = n - M, c = n - (M + m) + (m - o), m = t - T, g = t - (T + m) + (m - o), m = e - D, f = e - (D + m) + (m - a), m = r - B, v = r - (B + m) + (m - a), c === 0 && f === 0 && g === 0 && v === 0) || (X = pm * u + dm * Math.abs(q), q += M * v + B * c - (D * g + T * f), q >= X || -q >= X)) return q;
  A = c * B, p = ct * c, _ = p - (p - c), w = c - _, p = ct * B, k = p - (p - B), L = B - k, O = w * L - (A - _ * k - w * k - _ * L), Y = f * T, p = ct * f, _ = p - (p - f), w = f - _, p = ct * T, k = p - (p - T), L = T - k, V = w * L - (Y - _ * k - w * k - _ * L), b = O - V, m = O - b, vt[0] = O - (b + m) + (m - V), I = A + b, m = I - A, N = A - (I - m) + (b - m), b = N - Y, m = N - b, vt[1] = N - (b + m) + (m - Y), C = I + b, m = C - I, vt[2] = I - (C - m) + (b - m), vt[3] = C;
  const R = to(4, Zn, 4, vt, Nu);
  A = M * v, p = ct * M, _ = p - (p - M), w = M - _, p = ct * v, k = p - (p - v), L = v - k, O = w * L - (A - _ * k - w * k - _ * L), Y = D * g, p = ct * D, _ = p - (p - D), w = D - _, p = ct * g, k = p - (p - g), L = g - k, V = w * L - (Y - _ * k - w * k - _ * L), b = O - V, m = O - b, vt[0] = O - (b + m) + (m - V), I = A + b, m = I - A, N = A - (I - m) + (b - m), b = N - Y, m = N - b, vt[1] = N - (b + m) + (m - Y), C = I + b, m = C - I, vt[2] = I - (C - m) + (b - m), vt[3] = C;
  const U = to(R, Nu, 4, vt, Tu);
  A = c * v, p = ct * c, _ = p - (p - c), w = c - _, p = ct * v, k = p - (p - v), L = v - k, O = w * L - (A - _ * k - w * k - _ * L), Y = f * g, p = ct * f, _ = p - (p - f), w = f - _, p = ct * g, k = p - (p - g), L = g - k, V = w * L - (Y - _ * k - w * k - _ * L), b = O - V, m = O - b, vt[0] = O - (b + m) + (m - V), I = A + b, m = I - A, N = A - (I - m) + (b - m), b = N - Y, m = N - b, vt[1] = N - (b + m) + (m - Y), C = I + b, m = C - I, vt[2] = I - (C - m) + (b - m), vt[3] = C;
  const G = to(U, Tu, 4, vt, Ru);
  return Ru[G - 1];
}
function Au(n, e, t, r, o, a) {
  const u = (e - a) * (t - o), c = (n - o) * (r - a), f = u - c;
  if (u === 0 || c === 0 || u > 0 != c > 0) return f;
  const g = Math.abs(u + c);
  return Math.abs(f) >= vm * g ? f : -_m(n, e, t, r, o, a, g);
}
function wm(n, e) {
  const t = new ra([], Wc);
  return Em(n, t), Cm(t, e);
}
function Wc(n, e) {
  return n.p.x > e.p.x ? 1 : n.p.x < e.p.x || n.p.x === e.p.x && (n.featureId !== e.featureId || n.ringId !== e.ringId) && n.isLeftEndpoint && !e.isLeftEndpoint ? -1 : n.p.y !== e.p.y ? n.p.y > e.p.y ? 1 : -1 : 1;
}
function xm(n, e) {
  return n.rightSweepEvent.p.x > e.rightSweepEvent.p.x ? 1 : n.rightSweepEvent.p.x < e.rightSweepEvent.p.x ? -1 : n.rightSweepEvent.p.y !== e.rightSweepEvent.p.y ? n.rightSweepEvent.p.y < e.rightSweepEvent.p.y ? 1 : -1 : 1;
}
function Em(n, e) {
  if (n.type === "FeatureCollection") {
    const t = n.features;
    for (let r = 0; r < t.length; r++)
      Ou(t[r], e);
  } else
    Ou(n, e);
}
var Si = 0, bi = 0, Mi = 0;
function Ou(n, e) {
  const t = n.type === "Feature" ? n.geometry : n;
  let r = t.coordinates;
  (t.type === "Polygon" || t.type === "MultiLineString") && (r = [r]), t.type === "LineString" && (r = [[r]]);
  for (let o = 0; o < r.length; o++)
    for (let a = 0; a < r[o].length; a++) {
      let u = r[o][a][0], c = null;
      bi = bi + 1;
      for (let f = 0; f < r[o][a].length - 1; f++) {
        c = r[o][a][f + 1];
        const g = new Du(u, Si, bi, Mi), v = new Du(c, Si, bi, Mi + 1);
        g.otherEvent = v, v.otherEvent = g, Wc(g, v) > 0 ? (v.isLeftEndpoint = !0, g.isLeftEndpoint = !1) : (g.isLeftEndpoint = !0, v.isLeftEndpoint = !1), e.push(g), e.push(v), u = c, Mi = Mi + 1;
      }
    }
  Si = Si + 1;
}
var Du = class {
  constructor(n, e, t, r) {
    this.p = {
      x: n[0],
      y: n[1]
    }, this.featureId = e, this.ringId = t, this.eventId = r, this.otherEvent = null, this.isLeftEndpoint = null;
  }
  isSamePoint(n) {
    return this.p.x === n.p.x && this.p.y === n.p.y;
  }
  asNewXY() {
    return [this.p.x, this.p.y];
  }
};
function Cm(n, e = !1) {
  const t = [], r = new ra([], xm);
  for (; n.length; ) {
    const o = n.pop();
    if (o.isLeftEndpoint) {
      const a = new km(o);
      for (let u = 0; u < r.data.length; u++) {
        const c = r.data[u];
        if (e && c.leftSweepEvent.featureId === o.featureId)
          continue;
        const f = Im(a, c);
        f !== !1 && t.push(f);
      }
      r.push(a);
    } else o.isLeftEndpoint === !1 && r.pop();
  }
  return t;
}
var km = class {
  /** @param event must have otherEvent non-null */
  constructor(e) {
    this.leftSweepEvent = e, this.rightSweepEvent = e.otherEvent;
  }
};
function Im(n, e) {
  if (n === null || e === null) return !1;
  const t = n.leftSweepEvent.p.x, r = n.leftSweepEvent.p.y, o = n.rightSweepEvent.p.x, a = n.rightSweepEvent.p.y, u = e.leftSweepEvent.p.x, c = e.leftSweepEvent.p.y, f = e.rightSweepEvent.p.x, g = e.rightSweepEvent.p.y, v = Au(t, r, o, a, u, c), m = Au(t, r, o, a, f, g);
  if (v > 0 && m > 0) return !1;
  if (v < 0 && m < 0) return !1;
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
  const p = (g - c) * (o - t) - (f - u) * (a - r), _ = (f - u) * (r - c) - (g - c) * (t - u), w = (o - t) * (r - c) - (a - r) * (t - u);
  if (p === 0)
    return !1;
  const k = _ / p, L = w / p;
  if (k >= 0 && k <= 1 && L >= 0 && L <= 1) {
    const b = t + k * (o - t), I = r + k * (a - r);
    return [b, I];
  }
  return !1;
}
function en(n, e, t = {}) {
  const { removeDuplicates: r = !0, ignoreSelfIntersections: o = !0 } = t;
  let a = [];
  n.type === "FeatureCollection" ? a = a.concat(n.features) : n.type === "Feature" ? a.push(n) : (n.type === "LineString" || n.type === "Polygon" || n.type === "MultiLineString" || n.type === "MultiPolygon") && a.push(Je(n)), e.type === "FeatureCollection" ? a = a.concat(e.features) : e.type === "Feature" ? a.push(e) : (e.type === "LineString" || e.type === "Polygon" || e.type === "MultiLineString" || e.type === "MultiPolygon") && a.push(Je(e));
  const u = wm(
    ce(a),
    o
  );
  let c = [];
  if (r) {
    const f = {};
    u.forEach((g) => {
      const v = g.join(",");
      f[v] || (f[v] = !0, c.push(g));
    });
  } else
    c = u;
  return ce(c.map((f) => de(f)));
}
var Sm = Object.defineProperty, bm = Object.defineProperties, Mm = Object.getOwnPropertyDescriptors, Fu = Object.getOwnPropertySymbols, Lm = Object.prototype.hasOwnProperty, Pm = Object.prototype.propertyIsEnumerable, Bu = (n, e, t) => e in n ? Sm(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Nm = (n, e) => {
  for (var t in e || (e = {}))
    Lm.call(e, t) && Bu(n, t, e[t]);
  if (Fu)
    for (var t of Fu(e))
      Pm.call(e, t) && Bu(n, t, e[t]);
  return n;
}, Tm = (n, e) => bm(n, Mm(e));
function un(n, e, t = {}) {
  if (!n || !e)
    throw new Error("lines and inputPoint are required arguments");
  const r = Me(e);
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
  }), a = 0, u = 0, c = -1;
  return it(
    n,
    function(f, g, v) {
      c !== v && (c = v, u = 0);
      const m = me(f);
      for (let p = 0; p < m.length - 1; p++) {
        const _ = de(m[p]), w = Me(_), k = de(m[p + 1]), L = Me(k), b = qe(_, k, t);
        let I, N;
        L[0] === r[0] && L[1] === r[1] ? [I, N] = [L, !0] : w[0] === r[0] && w[1] === r[1] ? [I, N] = [w, !1] : [I, N] = Om(
          w,
          L,
          r
        );
        const A = qe(e, I, t);
        if (A < o.properties.pointDistance) {
          const O = qe(_, I, t);
          o = de(I, {
            lineStringIndex: v,
            // Legacy behaviour where index progresses to next segment # if we
            // went with the end point this iteration.
            segmentIndex: N ? p + 1 : p,
            totalDistance: a + O,
            lineDistance: u + O,
            segmentDistance: O,
            pointDistance: A,
            // deprecated properties START
            multiFeatureIndex: -1,
            index: -1,
            location: -1,
            dist: 1 / 0
            // deprecated properties END
          }), o.properties = Tm(Nm({}, o.properties), {
            multiFeatureIndex: o.properties.lineStringIndex,
            index: o.properties.segmentIndex,
            location: o.properties.totalDistance,
            dist: o.properties.pointDistance
            // deprecated properties END
          });
        }
        a += b, u += b;
      }
    }
  ), o;
}
function Ln(n, e) {
  const [t, r, o] = n, [a, u, c] = e;
  return t * a + r * u + o * c;
}
function Mr(n, e) {
  const [t, r, o] = n, [a, u, c] = e;
  return [r * c - o * u, o * a - t * c, t * u - r * a];
}
function Rm(n) {
  return Math.sqrt(Math.pow(n[0], 2) + Math.pow(n[1], 2) + Math.pow(n[2], 2));
}
function Gu(n) {
  const e = Rm(n);
  return [n[0] / e, n[1] / e, n[2] / e];
}
function no(n) {
  const e = Qe(n[1]), t = Qe(n[0]);
  return [
    Math.cos(e) * Math.cos(t),
    Math.cos(e) * Math.sin(t),
    Math.sin(e)
  ];
}
function Am(n) {
  const [e, t, r] = n, o = Math.min(Math.max(r, -1), 1), a = Qt(Math.asin(o));
  return [Qt(Math.atan2(t, e)), a];
}
function Om(n, e, t) {
  const r = no(n), o = no(e), a = no(t), u = Mr(r, o);
  if (u[0] === 0 && u[1] === 0 && u[2] === 0)
    return Ln(r, o) > 0 ? [[...e], !0] : [[...t], !1];
  const c = Mr(u, a);
  if (c[0] === 0 && c[1] === 0 && c[2] === 0)
    return [[...e], !0];
  const f = Mr(c, u), g = Gu(f), v = [-g[0], -g[1], -g[2]], m = Ln(a, g) > Ln(a, v) ? g : v, p = Gu(u), _ = Ln(Mr(r, m), p), w = Ln(Mr(m, o), p);
  return _ >= 0 && w >= 0 ? [Am(m), !1] : Ln(r, a) > Ln(o, a) ? [[...n], !1] : [[...e], !0];
}
function $c(n, e) {
  if (!n) throw new Error("line is required");
  if (!e) throw new Error("splitter is required");
  const t = xt(n), r = xt(e);
  if (t !== "LineString") throw new Error("line must be LineString");
  if (r === "FeatureCollection")
    throw new Error("splitter cannot be a FeatureCollection");
  if (r === "GeometryCollection")
    throw new Error("splitter cannot be a GeometryCollection");
  var o = Hc(e, { precision: 7 });
  switch (n.type !== "Feature" && (n = Je(n)), r) {
    case "Point":
      return xo(
        n,
        o
      );
    case "MultiPoint":
      return qu(
        n,
        o
      );
    case "LineString":
    case "MultiLineString":
    case "Polygon":
    case "MultiPolygon":
      return qu(
        n,
        en(
          n,
          o,
          {
            ignoreSelfIntersections: !0
          }
        )
      );
  }
}
function qu(n, e) {
  var t = [], r = gs();
  return it(
    e,
    // this cast should be unnecessary (and is wrong, it could contain MultiPoints), but is a workaround for bad flattenEach typings
    function(o) {
      if (t.forEach(function(c, f) {
        c.id = f;
      }), !t.length)
        t = xo(n, o).features, r.load(ce(t));
      else {
        var a = r.search(o);
        if (a.features.length) {
          var u = Zc(o, a);
          t = t.filter(function(c) {
            return c.id !== u.id;
          }), r.remove(u), Le(xo(u, o), function(c) {
            t.push(c), r.insert(c);
          });
        }
      }
    }
  ), ce(t);
}
function xo(n, e) {
  var t = [], r = me(n)[0], o = me(n)[n.geometry.coordinates.length - 1];
  if (ro(r, Me(e)) || ro(o, Me(e)))
    return ce([n]);
  var a = gs(), u = Zr(n);
  a.load(u);
  var c = a.search(e);
  if (!c.features.length) return ce([n]);
  var f = Zc(e, c), g = [r], v = jo(
    u,
    function(m, p, _) {
      var w = me(p)[1], k = Me(e);
      return _ === f.id ? (m.push(k), t.push(Se(m)), ro(k, w) ? [k] : [k, w]) : (m.push(w), m);
    },
    g
  );
  return v.length > 1 && t.push(Se(v)), ce(t);
}
function Zc(n, e) {
  if (!e.features.length) throw new Error("lines must contain features");
  if (e.features.length === 1) return e.features[0];
  var t, r = 1 / 0;
  return Le(e, function(o) {
    var a = un(o, n), u = a.properties.pointDistance;
    u < r && (t = o, r = u);
  }), t;
}
function ro(n, e) {
  return n[0] === e[0] && n[1] === e[1];
}
function Kc(n, e) {
  const t = Ye(n), r = Ye(e), o = t.type, a = r.type, u = t.coordinates, c = r.coordinates;
  switch (o) {
    case "Point":
      switch (a) {
        case "Point":
          return ia(u, c);
        default:
          throw new Error("feature2 " + a + " geometry not supported");
      }
    case "MultiPoint":
      switch (a) {
        case "Point":
          return Ym(t, r);
        case "MultiPoint":
          return Xm(t, r);
        default:
          throw new Error("feature2 " + a + " geometry not supported");
      }
    case "LineString":
      switch (a) {
        case "Point":
          return Ie(r, t, { ignoreEndVertices: !0 });
        case "LineString":
          return Wm(t, r);
        case "MultiPoint":
          return Vm(t, r);
        default:
          throw new Error("feature2 " + a + " geometry not supported");
      }
    case "Polygon":
      switch (a) {
        case "Point":
          return xe(r, t, { ignoreBoundary: !0 });
        case "LineString":
          return Qc(t, r);
        case "Polygon":
          return ds(t, r);
        case "MultiPoint":
          return Hm(t, r);
        case "MultiPolygon":
          return Um(t, r);
        default:
          throw new Error("feature2 " + a + " geometry not supported");
      }
    case "MultiPolygon":
      switch (a) {
        case "Point":
          return Fm(t, r);
        case "MultiPoint":
          return Bm(t, r);
        case "LineString":
          return Gm(t, r);
        case "MultiLineString":
          return qm(t, r);
        case "Polygon":
          return Dm(t, r);
        case "MultiPolygon":
          return zm(t, r);
        default:
          throw new Error("feature2 " + a + " geometry not supported");
      }
    default:
      throw new Error("feature1 " + o + " geometry not supported");
  }
}
function Dm(n, e) {
  const t = ze(e);
  return n.coordinates.some(
    (r) => ds({ type: "Polygon", coordinates: r }, e, t)
  );
}
function Fm(n, e) {
  return xe(e, n, { ignoreBoundary: !0 });
}
function Bm(n, e) {
  let t = !1;
  for (const r of e.coordinates) {
    if (!xe(r, n))
      return !1;
    t || (t = xe(r, n, {
      ignoreBoundary: !0
    }));
  }
  return t;
}
function Gm(n, e) {
  return n.coordinates.some(
    (t) => Qc({ type: "Polygon", coordinates: t }, e)
  );
}
function qm(n, e) {
  let t = !1;
  for (const r of e.coordinates) {
    const o = { type: "LineString", coordinates: r };
    let a = "outside";
    for (const u of n.coordinates) {
      const c = jc(
        { type: "Polygon", coordinates: u },
        o
      );
      if (c === "interior") {
        a = c;
        break;
      }
      c === "boundary" && (a = c);
    }
    if (a === "outside")
      return !1;
    a === "interior" && (t = !0);
  }
  return t;
}
function zm(n, e) {
  for (const t of e.coordinates) {
    const r = { type: "Polygon", coordinates: t }, o = ze(r);
    if (!n.coordinates.some(
      (u) => ds(
        { type: "Polygon", coordinates: u },
        r,
        o
      )
    ))
      return !1;
  }
  return !0;
}
function Um(n, e) {
  return e.coordinates.every(
    (t) => ds(n, { type: "Polygon", coordinates: t })
  );
}
function Ym(n, e) {
  let t, r = !1;
  for (t = 0; t < n.coordinates.length; t++)
    if (ia(n.coordinates[t], e.coordinates)) {
      r = !0;
      break;
    }
  return r;
}
function Xm(n, e) {
  for (const t of e.coordinates) {
    let r = !1;
    for (const o of n.coordinates)
      if (ia(t, o)) {
        r = !0;
        break;
      }
    if (!r)
      return !1;
  }
  return !0;
}
function Vm(n, e) {
  let t = !1;
  for (const r of e.coordinates) {
    if (!Ie(r, n))
      return !1;
    !t && Ie(r, n, { ignoreEndVertices: !0 }) && (t = !0);
  }
  return t;
}
function Hm(n, e) {
  let t = !1;
  for (const r of e.coordinates) {
    if (!xe(r, n))
      return !1;
    t || (t = xe(r, n, {
      ignoreBoundary: !0
    }));
  }
  return t;
}
function Wm(n, e) {
  let t = !1;
  const r = e.coordinates;
  for (let o = 0; o < r.length; o++) {
    const a = r[o];
    if (!Ie(a, n))
      return !1;
    if (!t) {
      if (Ie(a, n, { ignoreEndVertices: !0 }))
        t = !0;
      else if (o > 0) {
        const u = [
          (r[o - 1][0] + a[0]) / 2,
          (r[o - 1][1] + a[1]) / 2
        ];
        Ie(u, n, { ignoreEndVertices: !0 }) && (t = !0);
      }
    }
  }
  return t;
}
function Jc(n, e) {
  const t = n.coordinates, r = [];
  for (let o = 0; o < t.length - 1; o++) {
    const a = Se([t[o], t[o + 1]]), u = $c(a, Je(e));
    u.features.length === 0 ? r.push(a) : r.push(...u.features);
  }
  return ce(r);
}
function Qc(n, e) {
  return jc(n, e) === "interior";
}
function jc(n, e) {
  const t = ze(n), r = ze(e);
  if (!eh(t, r))
    return "outside";
  for (const u of e.coordinates)
    if (!xe(u, n))
      return "outside";
  let o = !1;
  const a = Jc(e, n);
  for (const u of a.features) {
    const c = th(
      u.geometry.coordinates[0],
      u.geometry.coordinates[1]
    );
    if (!xe(c, n))
      return "outside";
    !o && xe(c, n, { ignoreBoundary: !0 }) && (o = !0);
  }
  return o ? "interior" : "boundary";
}
function ds(n, e, t) {
  if (n.type === "Feature" && n.geometry === null || e.type === "Feature" && e.geometry === null)
    return !1;
  const r = ze(n), o = t ?? ze(e);
  if (!eh(r, o))
    return !1;
  const a = Ye(n), u = Ye(e).coordinates;
  for (const c of u) {
    for (const g of c)
      if (!xe(g, n))
        return !1;
    const f = Jc(
      { coordinates: c },
      a
    );
    for (const g of f.features) {
      const v = th(
        g.geometry.coordinates[0],
        g.geometry.coordinates[1]
      );
      if (!xe(v, n) && !Km(v, a))
        return !1;
    }
  }
  return !0;
}
var $m = 1e-6;
function Zm(n, e, t) {
  const r = t[0] - e[0], o = t[1] - e[1], a = r * r + o * o;
  let u = 0;
  a > 0 && (u = ((n[0] - e[0]) * r + (n[1] - e[1]) * o) / a, u = Math.max(0, Math.min(1, u)));
  const c = e[0] + u * r, f = e[1] + u * o, g = n[0] - c, v = n[1] - f;
  return Math.sqrt(g * g + v * v);
}
function Km(n, e) {
  return e.coordinates.some((t) => {
    for (let r = 0; r < t.length - 1; r++)
      if (Zm(n, t[r], t[r + 1]) <= $m)
        return !0;
    return !1;
  });
}
function eh(n, e) {
  return !(n[0] > e[0] || n[2] < e[2] || n[1] > e[1] || n[3] < e[3]);
}
function ia(n, e) {
  return n[0] === e[0] && n[1] === e[1];
}
function th(n, e) {
  return [(n[0] + e[0]) / 2, (n[1] + e[1]) / 2];
}
function lr(n, e = {}) {
  const t = Ye(n);
  switch (!e.properties && n.type === "Feature" && (e.properties = n.properties), t.type) {
    case "Polygon":
      return Jm(t, e);
    case "MultiPolygon":
      return Qm(t, e);
    default:
      throw new Error("invalid poly");
  }
}
function Jm(n, e = {}) {
  const r = Ye(n).coordinates, o = e.properties ? e.properties : n.type === "Feature" ? n.properties : {};
  return nh(r, o);
}
function Qm(n, e = {}) {
  const r = Ye(n).coordinates, o = e.properties ? e.properties : n.type === "Feature" ? n.properties : {}, a = [];
  return r.forEach((u) => {
    a.push(nh(u, o));
  }), ce(a);
}
function nh(n, e) {
  return n.length > 1 ? xn(n, e) : Se(n[0], e);
}
var jm = Object.defineProperty, yr = (n, e) => jm(n, "name", { value: e, configurable: !0 }), rh = class {
  constructor(e) {
    this.direction = !1, this.compareProperties = !0;
    var t, r, o;
    this.precision = 10 ** -((t = e == null ? void 0 : e.precision) != null ? t : 17), this.direction = (r = e == null ? void 0 : e.direction) != null ? r : !1, this.compareProperties = (o = e == null ? void 0 : e.compareProperties) != null ? o : !0;
  }
  compare(e, t) {
    if (e.type !== t.type || !Dr(e, t))
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
          const r = Eo(e), o = Eo(
            t
          );
          return r.every(
            (a) => o.some((u) => this.compare(a, u))
          );
        }
    }
    return !1;
  }
  compareCoord(e, t) {
    return e.length === t.length && e.every((r, o) => Math.abs(r - t[o]) < this.precision);
  }
  compareLine(e, t, r = 0, o = !1) {
    if (!Dr(e, t))
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
    const c = this.compareCoord(a[r], u[r]);
    return this.direction || c ? this.comparePath(a, u) : this.compareCoord(a[r], u[u.length - (1 + r)]) ? this.comparePath(a.slice().reverse(), u) : !1;
  }
  fixStartIndex(e, t) {
    let r, o = -1;
    for (let a = 0; a < e.length; a++)
      if (this.compareCoord(e[a], t[0])) {
        o = a;
        break;
      }
    return o >= 0 && (r = [].concat(
      e.slice(o, e.length),
      e.slice(1, o + 1)
    )), r;
  }
  comparePath(e, t) {
    return e.every((r, o) => this.compareCoord(r, t[o]));
  }
  comparePolygon(e, t) {
    if (this.compareLine(e.coordinates[0], t.coordinates[0], 1, !0)) {
      const r = e.coordinates.slice(1, e.coordinates.length), o = t.coordinates.slice(1, t.coordinates.length);
      return r.every(
        (a) => o.some((u) => this.compareLine(a, u, 1, !0))
      );
    }
    return !1;
  }
  compareGeometryCollection(e, t) {
    return Dr(e.geometries, t.geometries) && this.compareBBox(e, t) && e.geometries.every((r, o) => this.compare(r, t.geometries[o]));
  }
  compareFeature(e, t) {
    return e.id === t.id && (this.compareProperties ? oa(e.properties, t.properties) : !0) && this.compareBBox(e, t) && this.compare(e.geometry, t.geometry);
  }
  compareFeatureCollection(e, t) {
    return Dr(e.features, t.features) && this.compareBBox(e, t) && e.features.every((r, o) => this.compare(r, t.features[o]));
  }
  compareBBox(e, t) {
    return !e.bbox && !t.bbox || (e.bbox && t.bbox ? this.compareCoord(e.bbox, t.bbox) : !1);
  }
};
yr(rh, "GeojsonEquality");
var ev = rh;
function Dr(n, e) {
  return n.coordinates ? n.coordinates.length === e.coordinates.length : n.length === e.length;
}
yr(Dr, "sameLength");
function Eo(n) {
  return n.coordinates.map((e) => ({
    type: n.type.replace("Multi", ""),
    coordinates: e
  }));
}
yr(Eo, "explode");
function sa(n, e, t) {
  return new ev(t).compare(n, e);
}
yr(sa, "geojsonEquality");
function oa(n, e) {
  if (n === null && e === null)
    return !0;
  if (n === null || e === null)
    return !1;
  const t = Object.keys(n), r = Object.keys(e);
  if (t.length !== r.length) return !1;
  for (var o of t) {
    const a = n[o], u = e[o], c = zu(a) && zu(u);
    if (c && !oa(a, u) || !c && a !== u)
      return !1;
  }
  return !0;
}
yr(oa, "equal");
var zu = /* @__PURE__ */ yr((n) => n != null && typeof n == "object", "isObject");
function Fn(n, e = {}) {
  var t = typeof e == "object" ? e.mutate : e;
  if (!n) throw new Error("geojson is required");
  var r = xt(n), o = [];
  switch (r) {
    case "LineString":
      o = io(n, r);
      break;
    case "MultiLineString":
    case "Polygon":
      me(n).forEach(function(u) {
        o.push(io(u, r));
      });
      break;
    case "MultiPolygon":
      me(n).forEach(function(u) {
        var c = [];
        u.forEach(function(f) {
          c.push(io(f, r));
        }), o.push(c);
      });
      break;
    case "Point":
      return n;
    case "MultiPoint":
      var a = {};
      me(n).forEach(function(u) {
        var c = u.join("-");
        Object.prototype.hasOwnProperty.call(a, c) || (o.push(u), a[c] = !0);
      });
      break;
    default:
      throw new Error(r + " geometry not supported");
  }
  return n.coordinates ? t === !0 ? (n.coordinates = o, n) : { type: r, coordinates: o } : t === !0 ? (n.geometry.coordinates = o, n) : Je({ type: r, coordinates: o }, n.properties, {
    bbox: n.bbox,
    id: n.id
  });
}
function io(n, e) {
  const t = me(n);
  if (t.length === 2 && !Uu(t[0], t[1])) return t;
  const r = [];
  let o = 0, a = 1, u = 2;
  for (r.push(t[o]); u < t.length; )
    Ie(t[a], Se([t[o], t[u]])) ? a = u : (r.push(t[a]), o = a, a++, u = a), u++;
  if (r.push(t[a]), e === "Polygon" || e === "MultiPolygon") {
    if (Ie(
      r[0],
      Se([r[1], r[r.length - 2]])
    ) && (r.shift(), r.pop(), r.push(r[0])), r.length < 4)
      throw new Error("invalid polygon, fewer than 4 points");
    if (!Uu(r[0], r[r.length - 1]))
      throw new Error("invalid polygon, first and last points not equal");
  }
  return r;
}
function Uu(n, e) {
  return n[0] === e[0] && n[1] === e[1];
}
function Fr(n, e, t = {}) {
  let r = t.precision;
  if (r = r == null || isNaN(r) ? 6 : r, typeof r != "number" || !(r >= 0))
    throw new Error("precision must be a positive number");
  const o = Ye(n).type, a = Ye(e).type;
  return o !== a ? !1 : sa(Fn(n), Fn(e), {
    precision: r
  });
}
function ih(n, e) {
  var t = Ye(n), r = Ye(e), o = t.type, a = r.type;
  switch (o) {
    case "MultiPoint":
      switch (a) {
        case "LineString":
          return Yu(t, r);
        case "Polygon":
          return Vu(t, r);
        default:
          throw new Error("feature2 " + a + " geometry not supported");
      }
    case "LineString":
      switch (a) {
        case "MultiPoint":
          return Yu(r, t);
        case "LineString":
          return tv(t, r);
        case "Polygon":
          return Xu(t, r);
        default:
          throw new Error("feature2 " + a + " geometry not supported");
      }
    case "Polygon":
      switch (a) {
        case "MultiPoint":
          return Vu(r, t);
        case "LineString":
          return Xu(r, t);
        default:
          throw new Error("feature2 " + a + " geometry not supported");
      }
    default:
      throw new Error("feature1 " + o + " geometry not supported");
  }
}
function Yu(n, e) {
  for (var t = !1, r = !1, o = n.coordinates.length, a = 0; a < o && (!t || !r); a++) {
    for (var u = !1, c = 0; c < e.coordinates.length - 1; c++) {
      var f = !0;
      if ((c === 0 || c === e.coordinates.length - 2) && (f = !1), nv(
        e.coordinates[c],
        e.coordinates[c + 1],
        n.coordinates[a],
        f
      )) {
        u = !0;
        break;
      }
    }
    u ? t = !0 : r = !0;
  }
  return t && r;
}
function tv(n, e) {
  const t = en(n, e);
  if (t.features.length === 0) return !1;
  for (const r of t.features)
    if (!Fr(r, de(n.coordinates[0])) && !Fr(
      r,
      de(n.coordinates[n.coordinates.length - 1])
    ) && !Fr(r, de(e.coordinates[0])) && !Fr(
      r,
      de(e.coordinates[e.coordinates.length - 1])
    ))
      return !0;
  return !1;
}
function Xu(n, e) {
  const t = lr(e);
  return en(n, t).features.length > 0;
}
function Vu(n, e) {
  var t = !1, r = !1, o = n.coordinates.length;
  for (let a = 0; a < o && (!t || !r); a++)
    xe(de(n.coordinates[a]), e) ? t = !0 : r = !0;
  return r && t;
}
function nv(n, e, t, r) {
  var o = t[0] - n[0], a = t[1] - n[1], u = e[0] - n[0], c = e[1] - n[1], f = o * c - a * u;
  return f !== 0 ? !1 : r ? Math.abs(u) >= Math.abs(c) ? u > 0 ? n[0] <= t[0] && t[0] <= e[0] : e[0] <= t[0] && t[0] <= n[0] : c > 0 ? n[1] <= t[1] && t[1] <= e[1] : e[1] <= t[1] && t[1] <= n[1] : Math.abs(u) >= Math.abs(c) ? u > 0 ? n[0] < t[0] && t[0] < e[0] : e[0] < t[0] && t[0] < n[0] : c > 0 ? n[1] < t[1] && t[1] < e[1] : e[1] < t[1] && t[1] < n[1];
}
function aa(n, e, {
  ignoreSelfIntersections: t = !0
} = { ignoreSelfIntersections: !0 }) {
  let r = !0;
  return it(n, (o) => {
    it(e, (a) => {
      if (r === !1)
        return !1;
      r = rv(
        o.geometry,
        a.geometry,
        t
      );
    });
  }), r;
}
function rv(n, e, t) {
  switch (n.type) {
    case "Point":
      switch (e.type) {
        case "Point":
          return !av(n.coordinates, e.coordinates);
        case "LineString":
          return !Ji(e, n);
        case "Polygon":
          return !xe(n, e);
      }
      break;
    case "LineString":
      switch (e.type) {
        case "Point":
          return !Ji(n, e);
        case "LineString":
          return !iv(n, e, t);
        case "Polygon":
          return !Hu(e, n, t);
      }
      break;
    case "Polygon":
      switch (e.type) {
        case "Point":
          return !xe(e, n);
        case "LineString":
          return !Hu(n, e, t);
        case "Polygon":
          return !sv(e, n, t);
      }
  }
  return !1;
}
function Ji(n, e) {
  for (let t = 0; t < n.coordinates.length - 1; t++)
    if (ov(
      n.coordinates[t],
      n.coordinates[t + 1],
      e.coordinates
    ))
      return !0;
  return !1;
}
function iv(n, e, t) {
  if (en(n, e, {
    ignoreSelfIntersections: t
  }).features.length > 0)
    return !0;
  for (const o of n.coordinates)
    if (Ji(e, { coordinates: o }))
      return !0;
  for (const o of e.coordinates)
    if (Ji(n, { coordinates: o }))
      return !0;
  return !1;
}
function Hu(n, e, t) {
  for (const o of e.coordinates)
    if (xe(o, n))
      return !0;
  return en(e, lr(n), {
    ignoreSelfIntersections: t
  }).features.length > 0;
}
function sv(n, e, t) {
  for (const o of n.coordinates[0])
    if (xe(o, e))
      return !0;
  for (const o of e.coordinates[0])
    if (xe(o, n))
      return !0;
  return en(
    lr(n),
    lr(e),
    { ignoreSelfIntersections: t }
  ).features.length > 0;
}
function ov(n, e, t) {
  const r = t[0] - n[0], o = t[1] - n[1], a = e[0] - n[0], u = e[1] - n[1];
  return r * u - o * a !== 0 ? !1 : Math.abs(a) >= Math.abs(u) ? a > 0 ? n[0] <= t[0] && t[0] <= e[0] : e[0] <= t[0] && t[0] <= n[0] : u > 0 ? n[1] <= t[1] && t[1] <= e[1] : e[1] <= t[1] && t[1] <= n[1];
}
function av(n, e) {
  return n[0] === e[0] && n[1] === e[1];
}
function sh(n, e, {
  ignoreSelfIntersections: t = !0
} = {}) {
  return !aa(n, e, { ignoreSelfIntersections: t });
}
var oh = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ci(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
function ah(n) {
  if (n.__esModule) return n;
  var e = n.default;
  if (typeof e == "function") {
    var t = function r() {
      return this instanceof r ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(n).forEach(function(r) {
    var o = Object.getOwnPropertyDescriptor(n, r);
    Object.defineProperty(t, r, o.get ? o : {
      enumerable: !0,
      get: function() {
        return n[r];
      }
    });
  }), t;
}
var uv = function n(e, t) {
  if (e === t) return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor) return !1;
    var r, o, a;
    if (Array.isArray(e)) {
      if (r = e.length, r != t.length) return !1;
      for (o = r; o-- !== 0; )
        if (!n(e[o], t[o])) return !1;
      return !0;
    }
    if (e.constructor === RegExp) return e.source === t.source && e.flags === t.flags;
    if (e.valueOf !== Object.prototype.valueOf) return e.valueOf() === t.valueOf();
    if (e.toString !== Object.prototype.toString) return e.toString() === t.toString();
    if (a = Object.keys(e), r = a.length, r !== Object.keys(t).length) return !1;
    for (o = r; o-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(t, a[o])) return !1;
    for (o = r; o-- !== 0; ) {
      var u = a[o];
      if (!n(e[u], t[u])) return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
};
const Br = /* @__PURE__ */ ci(uv);
function uh(n, e, t = {}) {
  if (t = t || {}, !Oe(t)) throw new Error("options is invalid");
  var r = t.tolerance || 0, o = [], a = gs();
  const u = Zr(n);
  a.load(u);
  var c;
  let f = [];
  return Kt(e, function(g) {
    var v = !1;
    if (!g)
      return;
    let m = g;
    if (r !== 0) {
      const p = si(r, "kilometers"), _ = ze(g);
      m = [
        _[0] - p,
        _[1] - p,
        _[2] + p,
        _[3] + p
      ];
    }
    Le(a.search(m), function(p) {
      if (v === !1) {
        var _ = me(g).sort(), w = me(p).sort();
        if (Br(_, w))
          v = !0, c ? c = so(c, g) || c : c = g;
        else if (r === 0 ? Ie(_[0], p) && Ie(_[1], p) : un(p, _[0]).properties.pointDistance <= r && un(p, _[1]).properties.pointDistance <= r)
          v = !0, c ? c = so(c, g) || c : c = g;
        else if (r === 0 ? Ie(w[0], g) && Ie(w[1], g) : un(g, w[0]).properties.pointDistance <= r && un(g, w[1]).properties.pointDistance <= r)
          if (c) {
            const k = so(c, p);
            k ? c = k : f.push(p);
          } else c = p;
      }
    }), v === !1 && c && (o.push(c), f.length && (o = o.concat(f), f = []), c = void 0);
  }), c && o.push(c), ce(o);
}
function so(n, e) {
  var t = me(e), r = me(n), o = r[0], a = r[r.length - 1], u = n.geometry.coordinates;
  if (Br(t[0], o)) u.unshift(t[1]);
  else if (Br(t[0], a)) u.push(t[1]);
  else if (Br(t[1], o)) u.unshift(t[0]);
  else if (Br(t[1], a)) u.push(t[0]);
  else return;
  return n;
}
function lv(n, e) {
  const t = Ye(n), r = Ye(e), o = t.type, a = r.type;
  if (o === "MultiPoint" && a !== "MultiPoint" || (o === "LineString" || o === "MultiLineString") && a !== "LineString" && a !== "MultiLineString" || (o === "Polygon" || o === "MultiPolygon") && a !== "Polygon" && a !== "MultiPolygon")
    throw new Error("features must be of the same type");
  if (o === "Point") throw new Error("Point geometry not supported");
  if (sa(n, e, { precision: 6 }))
    return !1;
  let u = 0;
  switch (o) {
    case "MultiPoint":
      for (var c = 0; c < t.coordinates.length; c++)
        for (var f = 0; f < r.coordinates.length; f++) {
          var g = t.coordinates[c], v = r.coordinates[f];
          if (g[0] === v[0] && g[1] === v[1])
            return !0;
        }
      return !1;
    case "LineString":
    case "MultiLineString":
      Kt(n, (m) => {
        Kt(e, (p) => {
          uh(m, p).features.length && u++;
        });
      });
      break;
    case "Polygon":
    case "MultiPolygon":
      Kt(n, (m) => {
        Kt(e, (p) => {
          en(m, p).features.length && u++;
        });
      });
      break;
  }
  return u > 0;
}
function cv(n, e) {
  if (!n) throw new Error("line1 is required");
  if (!e) throw new Error("line2 is required");
  var t = Wu(n, "line1");
  if (t !== "LineString") throw new Error("line1 must be a LineString");
  var r = Wu(e, "line2");
  if (r !== "LineString") throw new Error("line2 must be a LineString");
  for (var o = Zr(Fn(n)).features, a = Zr(Fn(e)).features, u = 0; u < o.length; u++) {
    var c = o[u].geometry.coordinates;
    if (!a[u]) break;
    var f = a[u].geometry.coordinates;
    if (!hv(c, f)) return !1;
  }
  return !0;
}
function hv(n, e) {
  var t = ur(Dn(n[0], n[1])), r = ur(Dn(e[0], e[1]));
  return t === r || (r - t) % 180 === 0;
}
function Wu(n, e) {
  if (n.geometry && n.geometry.type)
    return n.geometry.type;
  if (n.type) return n.type;
  throw new Error("Invalid GeoJSON object for " + e);
}
function fv(n, e) {
  var t = Ye(n), r = Ye(e), o = t.type, a = r.type;
  switch (o) {
    case "Point":
      switch (a) {
        case "LineString":
          return ht(t, r);
        case "MultiLineString":
          for (var u = !1, c = 0; c < r.coordinates.length; c++)
            ht(t, {
              coordinates: r.coordinates[c]
            }) && (u = !0);
          return u;
        case "Polygon":
          for (var f = 0; f < r.coordinates.length; f++)
            if (Ie(t, {
              type: "LineString",
              coordinates: r.coordinates[f]
            }))
              return !0;
          return !1;
        case "MultiPolygon":
          for (var f = 0; f < r.coordinates.length; f++)
            for (var c = 0; c < r.coordinates[f].length; c++)
              if (Ie(t, {
                type: "LineString",
                coordinates: r.coordinates[f][c]
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
              r
            ) && (u = !0), Ie(
              { type: "Point", coordinates: t.coordinates[f] },
              r,
              { ignoreEndVertices: !0 }
            ))
              return !1;
          return u;
        case "MultiLineString":
          for (var u = !1, f = 0; f < t.coordinates.length; f++)
            for (var c = 0; c < r.coordinates.length; c++)
              if (u || ht(
                { coordinates: t.coordinates[f] },
                { coordinates: r.coordinates[c] }
              ) && (u = !0), Ie(
                { type: "Point", coordinates: t.coordinates[f] },
                { type: "LineString", coordinates: r.coordinates[c] },
                { ignoreEndVertices: !0 }
              ))
                return !1;
          return u;
        case "Polygon":
          for (var u = !1, f = 0; f < t.coordinates.length; f++)
            if (u || Ie(
              { type: "Point", coordinates: t.coordinates[f] },
              { type: "LineString", coordinates: r.coordinates[0] }
            ) && (u = !0), xe(
              { type: "Point", coordinates: t.coordinates[f] },
              r,
              { ignoreBoundary: !0 }
            ))
              return !1;
          return u;
        case "MultiPolygon":
          for (var u = !1, f = 0; f < t.coordinates.length; f++)
            for (var c = 0; c < r.coordinates.length; c++)
              if (u || Ie(
                { type: "Point", coordinates: t.coordinates[f] },
                {
                  type: "LineString",
                  coordinates: r.coordinates[c][0]
                }
              ) && (u = !0), xe(
                { type: "Point", coordinates: t.coordinates[f] },
                { type: "Polygon", coordinates: r.coordinates[c] },
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
          return ht(r, t);
        case "MultiPoint":
          for (var u = !1, f = 0; f < r.coordinates.length; f++)
            if (u || ht(
              { coordinates: r.coordinates[f] },
              t
            ) && (u = !0), Ie(
              { type: "Point", coordinates: r.coordinates[f] },
              t,
              { ignoreEndVertices: !0 }
            ))
              return !1;
          return u;
        case "LineString":
          var g = !1;
          if (ht(
            { coordinates: t.coordinates[0] },
            r
          ) && (g = !0), ht(
            {
              coordinates: t.coordinates[t.coordinates.length - 1]
            },
            r
          ) && (g = !0), g === !1) return !1;
          for (var f = 0; f < t.coordinates.length; f++)
            if (Ie(
              { type: "Point", coordinates: t.coordinates[f] },
              r,
              { ignoreEndVertices: !0 }
            ))
              return !1;
          return g;
        case "MultiLineString":
          for (var g = !1, f = 0; f < r.coordinates.length; f++) {
            ht(
              { coordinates: t.coordinates[0] },
              { coordinates: r.coordinates[f] }
            ) && (g = !0), ht(
              {
                coordinates: t.coordinates[t.coordinates.length - 1]
              },
              { coordinates: r.coordinates[f] }
            ) && (g = !0);
            for (var c = 0; c < t.coordinates[f].length; c++)
              if (Ie(
                { type: "Point", coordinates: t.coordinates[c] },
                { type: "LineString", coordinates: r.coordinates[f] },
                { ignoreEndVertices: !0 }
              ))
                return !1;
          }
          return g;
        case "Polygon":
          for (var u = !1, f = 0; f < t.coordinates.length; f++)
            if (u || Ie(
              { type: "Point", coordinates: t.coordinates[f] },
              { type: "LineString", coordinates: r.coordinates[0] }
            ) && (u = !0), xe(
              { type: "Point", coordinates: t.coordinates[f] },
              r,
              { ignoreBoundary: !0 }
            ))
              return !1;
          return u;
        case "MultiPolygon":
          for (var u = !1, f = 0; f < t.coordinates.length; f++) {
            for (var c = 0; c < r.coordinates.length; c++)
              u || Ie(
                { type: "Point", coordinates: t.coordinates[f] },
                {
                  type: "LineString",
                  coordinates: r.coordinates[c][0]
                }
              ) && (u = !0);
            if (xe(
              { type: "Point", coordinates: t.coordinates[f] },
              r,
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
            if (ht(r, {
              coordinates: t.coordinates[f]
            }))
              return !0;
          return !1;
        case "MultiPoint":
          for (var u = !1, f = 0; f < t.coordinates.length; f++)
            for (var c = 0; c < r.coordinates.length; c++)
              if (u || ht(
                { coordinates: r.coordinates[c] },
                { coordinates: t.coordinates[c] }
              ) && (u = !0), Ie(
                { type: "Point", coordinates: r.coordinates[c] },
                { type: "LineString", coordinates: t.coordinates[c] },
                { ignoreEndVertices: !0 }
              ))
                return !1;
          return u;
        case "LineString":
          for (var g = !1, f = 0; f < t.coordinates.length; f++) {
            ht(
              { coordinates: t.coordinates[f][0] },
              r
            ) && (g = !0), ht(
              {
                coordinates: t.coordinates[f][t.coordinates[f].length - 1]
              },
              r
            ) && (g = !0);
            for (var c = 0; c < r.coordinates.length; c++)
              if (Ie(
                { type: "Point", coordinates: r.coordinates[c] },
                { type: "LineString", coordinates: t.coordinates[f] },
                { ignoreEndVertices: !0 }
              ))
                return !1;
          }
          return g;
        case "MultiLineString":
          for (var g = !1, f = 0; f < t.coordinates.length; f++)
            for (var c = 0; c < r.coordinates.length; c++) {
              ht(
                { coordinates: t.coordinates[f][0] },
                { coordinates: r.coordinates[c] }
              ) && (g = !0), ht(
                {
                  coordinates: t.coordinates[f][t.coordinates[f].length - 1]
                },
                { coordinates: r.coordinates[c] }
              ) && (g = !0);
              for (var v = 0; v < t.coordinates[f].length; v++)
                if (Ie(
                  { type: "Point", coordinates: t.coordinates[f][v] },
                  { type: "LineString", coordinates: r.coordinates[c] },
                  { ignoreEndVertices: !0 }
                ))
                  return !1;
            }
          return g;
        case "Polygon":
          for (var u = !1, f = 0; f < t.coordinates.length; f++)
            for (var c = 0; c < t.coordinates.length; c++)
              if (u || Ie(
                { type: "Point", coordinates: t.coordinates[f][c] },
                { type: "LineString", coordinates: r.coordinates[0] }
              ) && (u = !0), xe(
                { type: "Point", coordinates: t.coordinates[f][c] },
                r,
                { ignoreBoundary: !0 }
              ))
                return !1;
          return u;
        case "MultiPolygon":
          for (var u = !1, f = 0; f < r.coordinates[0].length; f++)
            for (var c = 0; c < t.coordinates.length; c++)
              for (var v = 0; v < t.coordinates[c].length; v++)
                if (u || Ie(
                  {
                    type: "Point",
                    coordinates: t.coordinates[c][v]
                  },
                  {
                    type: "LineString",
                    coordinates: r.coordinates[0][f]
                  }
                ) && (u = !0), xe(
                  { type: "Point", coordinates: t.coordinates[c][v] },
                  { type: "Polygon", coordinates: [r.coordinates[0][f]] },
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
            if (Ie(r, {
              type: "LineString",
              coordinates: t.coordinates[f]
            }))
              return !0;
          return !1;
        case "MultiPoint":
          for (var u = !1, f = 0; f < r.coordinates.length; f++)
            if (u || Ie(
              { type: "Point", coordinates: r.coordinates[f] },
              { type: "LineString", coordinates: t.coordinates[0] }
            ) && (u = !0), xe(
              { type: "Point", coordinates: r.coordinates[f] },
              t,
              { ignoreBoundary: !0 }
            ))
              return !1;
          return u;
        case "LineString":
          for (var u = !1, f = 0; f < r.coordinates.length; f++)
            if (u || Ie(
              { type: "Point", coordinates: r.coordinates[f] },
              { type: "LineString", coordinates: t.coordinates[0] }
            ) && (u = !0), xe(
              { type: "Point", coordinates: r.coordinates[f] },
              t,
              { ignoreBoundary: !0 }
            ))
              return !1;
          return u;
        case "MultiLineString":
          for (var u = !1, f = 0; f < r.coordinates.length; f++)
            for (var c = 0; c < r.coordinates[f].length; c++)
              if (u || Ie(
                { type: "Point", coordinates: r.coordinates[f][c] },
                { type: "LineString", coordinates: t.coordinates[0] }
              ) && (u = !0), xe(
                { type: "Point", coordinates: r.coordinates[f][c] },
                t,
                { ignoreBoundary: !0 }
              ))
                return !1;
          return u;
        case "Polygon":
          for (var u = !1, f = 0; f < t.coordinates[0].length; f++)
            if (u || Ie(
              { type: "Point", coordinates: t.coordinates[0][f] },
              { type: "LineString", coordinates: r.coordinates[0] }
            ) && (u = !0), xe(
              { type: "Point", coordinates: t.coordinates[0][f] },
              r,
              { ignoreBoundary: !0 }
            ))
              return !1;
          return u;
        case "MultiPolygon":
          for (var u = !1, f = 0; f < r.coordinates[0].length; f++)
            for (var c = 0; c < t.coordinates[0].length; c++)
              if (u || Ie(
                { type: "Point", coordinates: t.coordinates[0][c] },
                { type: "LineString", coordinates: r.coordinates[0][f] }
              ) && (u = !0), xe(
                { type: "Point", coordinates: t.coordinates[0][c] },
                { type: "Polygon", coordinates: r.coordinates[0][f] },
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
            if (Ie(r, {
              type: "LineString",
              coordinates: t.coordinates[0][f]
            }))
              return !0;
          return !1;
        case "MultiPoint":
          for (var u = !1, f = 0; f < t.coordinates[0].length; f++)
            for (var c = 0; c < r.coordinates.length; c++)
              if (u || Ie(
                { type: "Point", coordinates: r.coordinates[c] },
                { type: "LineString", coordinates: t.coordinates[0][f] }
              ) && (u = !0), xe(
                { type: "Point", coordinates: r.coordinates[c] },
                { type: "Polygon", coordinates: t.coordinates[0][f] },
                { ignoreBoundary: !0 }
              ))
                return !1;
          return u;
        case "LineString":
          for (var u = !1, f = 0; f < t.coordinates[0].length; f++)
            for (var c = 0; c < r.coordinates.length; c++)
              if (u || Ie(
                { type: "Point", coordinates: r.coordinates[c] },
                { type: "LineString", coordinates: t.coordinates[0][f] }
              ) && (u = !0), xe(
                { type: "Point", coordinates: r.coordinates[c] },
                { type: "Polygon", coordinates: t.coordinates[0][f] },
                { ignoreBoundary: !0 }
              ))
                return !1;
          return u;
        case "MultiLineString":
          for (var u = !1, f = 0; f < t.coordinates.length; f++)
            for (var c = 0; c < r.coordinates.length; c++)
              for (var v = 0; v < r.coordinates[c].length; v++)
                if (u || Ie(
                  {
                    type: "Point",
                    coordinates: r.coordinates[c][v]
                  },
                  {
                    type: "LineString",
                    coordinates: t.coordinates[f][0]
                  }
                ) && (u = !0), xe(
                  { type: "Point", coordinates: r.coordinates[c][v] },
                  { type: "Polygon", coordinates: [t.coordinates[f][0]] },
                  { ignoreBoundary: !0 }
                ))
                  return !1;
          return u;
        case "Polygon":
          for (var u = !1, f = 0; f < t.coordinates[0].length; f++)
            for (var c = 0; c < t.coordinates[0][f].length; c++)
              if (u || Ie(
                { type: "Point", coordinates: t.coordinates[0][f][c] },
                { type: "LineString", coordinates: r.coordinates[0] }
              ) && (u = !0), xe(
                { type: "Point", coordinates: t.coordinates[0][f][c] },
                r,
                { ignoreBoundary: !0 }
              ))
                return !1;
          return u;
        case "MultiPolygon":
          for (var u = !1, f = 0; f < t.coordinates[0].length; f++)
            for (var c = 0; c < r.coordinates[0].length; c++)
              for (var v = 0; v < t.coordinates[0].length; v++)
                if (u || Ie(
                  {
                    type: "Point",
                    coordinates: t.coordinates[0][f][v]
                  },
                  {
                    type: "LineString",
                    coordinates: r.coordinates[0][c]
                  }
                ) && (u = !0), xe(
                  {
                    type: "Point",
                    coordinates: t.coordinates[0][f][v]
                  },
                  { type: "Polygon", coordinates: r.coordinates[0][c] },
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
  return !!($u(e.coordinates[0], n.coordinates) || $u(
    e.coordinates[e.coordinates.length - 1],
    n.coordinates
  ));
}
function $u(n, e) {
  return n[0] === e[0] && n[1] === e[1];
}
var gv = /* @__PURE__ */ new Set([
  "Point",
  "LineString",
  "MultiLineString",
  "MultiPoint",
  "Polygon",
  "MultiPolygon"
]);
function lh(n) {
  if (!n.type) return !1;
  const e = Ye(n), t = e.type, r = e.coordinates;
  switch (t) {
    case "Point":
      return r.length > 1;
    case "MultiPoint":
      for (var o = 0; o < r.length; o++)
        if (r[o].length < 2) return !1;
      return !0;
    case "LineString":
      if (r.length < 2) return !1;
      for (var o = 0; o < r.length; o++)
        if (r[o].length < 2) return !1;
      return !0;
    case "MultiLineString":
      if (r.length < 1) return !1;
      for (var o = 0; o < r.length; o++)
        if (r[o].length < 2) return !1;
      return !0;
    case "Polygon":
      for (var o = 0; o < e.coordinates.length; o++)
        if (r[o].length < 4 || !Zu(r[o]) || Ku(r[o]) || o > 0 && en(ye([r[0]]), ye([r[o]])).features.length > 1)
          return !1;
      return !0;
    case "MultiPolygon":
      for (var o = 0; o < e.coordinates.length; o++)
        for (var a = e.coordinates[o], u = 0; u < a.length; u++)
          if (a[u].length < 4 || !Zu(a[u]) || Ku(a[u]) || u === 0 && !dv(a, e.coordinates, o) || u > 0 && en(ye([a[0]]), ye([a[u]])).features.length > 1)
            return !1;
      return !0;
    case "GeometryCollection":
      return e.geometries ? Array.isArray(e.geometries) && e.geometries.length > 0 && e.geometries.every(
        (c) => gv.has(c.type) && lh(c)
      ) : !1;
    default:
      return !1;
  }
}
function Zu(n) {
  return n[0][0] === n[n.length - 1][0] && n[0][1] === n[n.length - 1][1];
}
function Ku(n) {
  for (var e = 0; e < n.length - 1; e++)
    for (var t = n[e], r = e + 1; r < n.length - 2; r++) {
      var o = [n[r], n[r + 1]];
      if (Ie(t, Se(o))) return !0;
    }
  return !1;
}
function dv(n, e, t) {
  for (var r = ye(n), o = t + 1; o < e.length; o++)
    if (!aa(r, ye(e[o])) && ih(r, Se(e[o][0])))
      return !1;
  return !0;
}
function ua(n, e) {
  return Kc(e, n);
}
function ms(n, e = {}) {
  const t = ze(n), r = (t[0] + t[2]) / 2, o = (t[1] + t[3]) / 2;
  return de([r, o], e.properties, e);
}
var ch = { exports: {} };
(function(n, e) {
  (function(t, r) {
    n.exports = r();
  })(oh, function() {
    function t(h, i) {
      (i == null || i > h.length) && (i = h.length);
      for (var s = 0, l = Array(i); s < i; s++) l[s] = h[s];
      return l;
    }
    function r(h, i, s) {
      return i = v(i), function(l, d) {
        if (d && (typeof d == "object" || typeof d == "function")) return d;
        if (d !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
        return function(y) {
          if (y === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return y;
        }(l);
      }(h, p() ? Reflect.construct(i, s || [], v(h).constructor) : i.apply(h, s));
    }
    function o(h, i) {
      if (!(h instanceof i)) throw new TypeError("Cannot call a class as a function");
    }
    function a(h, i, s) {
      if (p()) return Reflect.construct.apply(null, arguments);
      var l = [null];
      l.push.apply(l, i);
      var d = new (h.bind.apply(h, l))();
      return s && _(d, s.prototype), d;
    }
    function u(h, i) {
      for (var s = 0; s < i.length; s++) {
        var l = i[s];
        l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(h, L(l.key), l);
      }
    }
    function c(h, i, s) {
      return i && u(h.prototype, i), s && u(h, s), Object.defineProperty(h, "prototype", { writable: !1 }), h;
    }
    function f(h, i) {
      var s = typeof Symbol < "u" && h[Symbol.iterator] || h["@@iterator"];
      if (!s) {
        if (Array.isArray(h) || (s = b(h)) || i) {
          s && (h = s);
          var l = 0, d = function() {
          };
          return { s: d, n: function() {
            return l >= h.length ? { done: !0 } : { done: !1, value: h[l++] };
          }, e: function(P) {
            throw P;
          }, f: d };
        }
        throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      var y, x = !0, E = !1;
      return { s: function() {
        s = s.call(h);
      }, n: function() {
        var P = s.next();
        return x = P.done, P;
      }, e: function(P) {
        E = !0, y = P;
      }, f: function() {
        try {
          x || s.return == null || s.return();
        } finally {
          if (E) throw y;
        }
      } };
    }
    function g() {
      return g = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(h, i, s) {
        var l = function(y, x) {
          for (; !{}.hasOwnProperty.call(y, x) && (y = v(y)) !== null; ) ;
          return y;
        }(h, i);
        if (l) {
          var d = Object.getOwnPropertyDescriptor(l, i);
          return d.get ? d.get.call(arguments.length < 3 ? h : s) : d.value;
        }
      }, g.apply(null, arguments);
    }
    function v(h) {
      return v = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(i) {
        return i.__proto__ || Object.getPrototypeOf(i);
      }, v(h);
    }
    function m(h, i) {
      if (typeof i != "function" && i !== null) throw new TypeError("Super expression must either be null or a function");
      h.prototype = Object.create(i && i.prototype, { constructor: { value: h, writable: !0, configurable: !0 } }), Object.defineProperty(h, "prototype", { writable: !1 }), i && _(h, i);
    }
    function p() {
      try {
        var h = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
        }));
      } catch {
      }
      return (p = function() {
        return !!h;
      })();
    }
    function _(h, i) {
      return _ = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(s, l) {
        return s.__proto__ = l, s;
      }, _(h, i);
    }
    function w(h, i, s, l) {
      var d = g(v(1 & l ? h.prototype : h), i, s);
      return 2 & l && typeof d == "function" ? function(y) {
        return d.apply(s, y);
      } : d;
    }
    function k(h) {
      return function(i) {
        if (Array.isArray(i)) return t(i);
      }(h) || function(i) {
        if (typeof Symbol < "u" && i[Symbol.iterator] != null || i["@@iterator"] != null) return Array.from(i);
      }(h) || b(h) || function() {
        throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }();
    }
    function L(h) {
      var i = function(s, l) {
        if (typeof s != "object" || !s) return s;
        var d = s[Symbol.toPrimitive];
        if (d !== void 0) {
          var y = d.call(s, l);
          if (typeof y != "object") return y;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return String(s);
      }(h, "string");
      return typeof i == "symbol" ? i : i + "";
    }
    function b(h, i) {
      if (h) {
        if (typeof h == "string") return t(h, i);
        var s = {}.toString.call(h).slice(8, -1);
        return s === "Object" && h.constructor && (s = h.constructor.name), s === "Map" || s === "Set" ? Array.from(h) : s === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s) ? t(h, i) : void 0;
      }
    }
    function I(h) {
      var i = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
      return I = function(s) {
        if (s === null || !function(d) {
          try {
            return Function.toString.call(d).indexOf("[native code]") !== -1;
          } catch {
            return typeof d == "function";
          }
        }(s)) return s;
        if (typeof s != "function") throw new TypeError("Super expression must either be null or a function");
        if (i !== void 0) {
          if (i.has(s)) return i.get(s);
          i.set(s, l);
        }
        function l() {
          return a(s, arguments, v(this).constructor);
        }
        return l.prototype = Object.create(s.prototype, { constructor: { value: l, enumerable: !1, writable: !0, configurable: !0 } }), _(l, s);
      }, I(h);
    }
    var N = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "getEndCapStyle", value: function() {
        return this._endCapStyle;
      } }, { key: "isSingleSided", value: function() {
        return this._isSingleSided;
      } }, { key: "setQuadrantSegments", value: function(i) {
        this._quadrantSegments = i, this._quadrantSegments === 0 && (this._joinStyle = h.JOIN_BEVEL), this._quadrantSegments < 0 && (this._joinStyle = h.JOIN_MITRE, this._mitreLimit = Math.abs(this._quadrantSegments)), i <= 0 && (this._quadrantSegments = 1), this._joinStyle !== h.JOIN_ROUND && (this._quadrantSegments = h.DEFAULT_QUADRANT_SEGMENTS);
      } }, { key: "getJoinStyle", value: function() {
        return this._joinStyle;
      } }, { key: "setJoinStyle", value: function(i) {
        this._joinStyle = i;
      } }, { key: "setSimplifyFactor", value: function(i) {
        this._simplifyFactor = i < 0 ? 0 : i;
      } }, { key: "getSimplifyFactor", value: function() {
        return this._simplifyFactor;
      } }, { key: "getQuadrantSegments", value: function() {
        return this._quadrantSegments;
      } }, { key: "setEndCapStyle", value: function(i) {
        this._endCapStyle = i;
      } }, { key: "getMitreLimit", value: function() {
        return this._mitreLimit;
      } }, { key: "setMitreLimit", value: function(i) {
        this._mitreLimit = i;
      } }, { key: "setSingleSided", value: function(i) {
        this._isSingleSided = i;
      } }], [{ key: "constructor_", value: function() {
        if (this._quadrantSegments = h.DEFAULT_QUADRANT_SEGMENTS, this._endCapStyle = h.CAP_ROUND, this._joinStyle = h.JOIN_ROUND, this._mitreLimit = h.DEFAULT_MITRE_LIMIT, this._isSingleSided = !1, this._simplifyFactor = h.DEFAULT_SIMPLIFY_FACTOR, arguments.length !== 0) {
          if (arguments.length === 1) {
            var i = arguments[0];
            this.setQuadrantSegments(i);
          } else if (arguments.length === 2) {
            var s = arguments[0], l = arguments[1];
            this.setQuadrantSegments(s), this.setEndCapStyle(l);
          } else if (arguments.length === 4) {
            var d = arguments[0], y = arguments[1], x = arguments[2], E = arguments[3];
            this.setQuadrantSegments(d), this.setEndCapStyle(y), this.setJoinStyle(x), this.setMitreLimit(E);
          }
        }
      } }, { key: "bufferDistanceError", value: function(i) {
        var s = Math.PI / 2 / i;
        return 1 - Math.cos(s / 2);
      } }]);
    }();
    N.CAP_ROUND = 1, N.CAP_FLAT = 2, N.CAP_SQUARE = 3, N.JOIN_ROUND = 1, N.JOIN_MITRE = 2, N.JOIN_BEVEL = 3, N.DEFAULT_QUADRANT_SEGMENTS = 8, N.DEFAULT_MITRE_LIMIT = 5, N.DEFAULT_SIMPLIFY_FACTOR = 0.01;
    var A = function(h) {
      function i(s) {
        var l;
        return o(this, i), (l = r(this, i, [s])).name = Object.keys({ Exception: i })[0], l;
      }
      return m(i, h), c(i, [{ key: "toString", value: function() {
        return this.message;
      } }]);
    }(I(Error)), O = function(h) {
      function i(s) {
        var l;
        return o(this, i), (l = r(this, i, [s])).name = Object.keys({ IllegalArgumentException: i })[0], l;
      }
      return m(i, h), c(i);
    }(A), Y = function() {
      return c(function h() {
        o(this, h);
      }, [{ key: "filter", value: function(h) {
      } }]);
    }();
    function V() {
    }
    function C() {
    }
    function M() {
    }
    var T, D, B, q, X, R, U, G, H = function() {
      return c(function h() {
        o(this, h);
      }, null, [{ key: "equalsWithTolerance", value: function(h, i, s) {
        return Math.abs(h - i) <= s;
      } }]);
    }(), J = function() {
      return c(function h(i, s) {
        o(this, h), this.low = s || 0, this.high = i || 0;
      }, null, [{ key: "toBinaryString", value: function(h) {
        var i, s = "";
        for (i = 2147483648; i > 0; i >>>= 1) s += (h.high & i) === i ? "1" : "0";
        for (i = 2147483648; i > 0; i >>>= 1) s += (h.low & i) === i ? "1" : "0";
        return s;
      } }]);
    }();
    function W() {
    }
    function j() {
    }
    W.NaN = NaN, W.isNaN = function(h) {
      return Number.isNaN(h);
    }, W.isInfinite = function(h) {
      return !Number.isFinite(h);
    }, W.MAX_VALUE = Number.MAX_VALUE, W.POSITIVE_INFINITY = Number.POSITIVE_INFINITY, W.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY, typeof Float64Array == "function" && typeof Int32Array == "function" ? (R = 2146435072, U = new Float64Array(1), G = new Int32Array(U.buffer), W.doubleToLongBits = function(h) {
      U[0] = h;
      var i = 0 | G[0], s = 0 | G[1];
      return (s & R) === R && 1048575 & s && i !== 0 && (i = 0, s = 2146959360), new J(s, i);
    }, W.longBitsToDouble = function(h) {
      return G[0] = h.low, G[1] = h.high, U[0];
    }) : (T = 1023, D = Math.log2, B = Math.floor, q = Math.pow, X = function() {
      for (var h = 53; h > 0; h--) {
        var i = q(2, h) - 1;
        if (B(D(i)) + 1 === h) return i;
      }
      return 0;
    }(), W.doubleToLongBits = function(h) {
      var i, s, l, d, y, x, E, P, F;
      if (h < 0 || 1 / h === Number.NEGATIVE_INFINITY ? (x = 1 << 31, h = -h) : x = 0, h === 0) return new J(P = x, F = 0);
      if (h === 1 / 0) return new J(P = 2146435072 | x, F = 0);
      if (h != h) return new J(P = 2146959360, F = 0);
      if (d = 0, F = 0, (i = B(h)) > 1) if (i <= X) (d = B(D(i))) <= 20 ? (F = 0, P = i << 20 - d & 1048575) : (F = i % (s = q(2, l = d - 20)) << 32 - l, P = i / s & 1048575);
      else for (l = i, F = 0; (l = B(s = l / 2)) !== 0; ) d++, F >>>= 1, F |= (1 & P) << 31, P >>>= 1, s !== l && (P |= 524288);
      if (E = d + T, y = i === 0, i = h - i, d < 52 && i !== 0) for (l = 0; ; ) {
        if ((s = 2 * i) >= 1 ? (i = s - 1, y ? (E--, y = !1) : (l <<= 1, l |= 1, d++)) : (i = s, y ? --E == 0 && (d++, y = !1) : (l <<= 1, d++)), d === 20) P |= l, l = 0;
        else if (d === 52) {
          F |= l;
          break;
        }
        if (s === 1) {
          d < 20 ? P |= l << 20 - d : d < 52 && (F |= l << 52 - d);
          break;
        }
      }
      return P |= E << 20, new J(P |= x, F);
    }, W.longBitsToDouble = function(h) {
      var i, s, l, d, y = h.high, x = h.low, E = y & 1 << 31 ? -1 : 1;
      for (l = ((2146435072 & y) >> 20) - T, d = 0, s = 1 << 19, i = 1; i <= 20; i++) y & s && (d += q(2, -i)), s >>>= 1;
      for (s = 1 << 31, i = 21; i <= 52; i++) x & s && (d += q(2, -i)), s >>>= 1;
      if (l === -1023) {
        if (d === 0) return 0 * E;
        l = -1022;
      } else {
        if (l === 1024) return d === 0 ? E / 0 : NaN;
        d += 1;
      }
      return E * d * q(2, l);
    });
    var Q = function(h) {
      function i(s) {
        var l;
        return o(this, i), (l = r(this, i, [s])).name = Object.keys({ RuntimeException: i })[0], l;
      }
      return m(i, h), c(i);
    }(A), re = function(h) {
      function i() {
        var s;
        return o(this, i), s = r(this, i), i.constructor_.apply(s, arguments), s;
      }
      return m(i, h), c(i, null, [{ key: "constructor_", value: function() {
        if (arguments.length === 0) Q.constructor_.call(this);
        else if (arguments.length === 1) {
          var s = arguments[0];
          Q.constructor_.call(this, s);
        }
      } }]);
    }(Q), ee = function() {
      function h() {
        o(this, h);
      }
      return c(h, null, [{ key: "shouldNeverReachHere", value: function() {
        if (arguments.length === 0) h.shouldNeverReachHere(null);
        else if (arguments.length === 1) {
          var i = arguments[0];
          throw new re("Should never reach here" + (i !== null ? ": " + i : ""));
        }
      } }, { key: "isTrue", value: function() {
        if (arguments.length === 1) {
          var i = arguments[0];
          h.isTrue(i, null);
        } else if (arguments.length === 2) {
          var s = arguments[1];
          if (!arguments[0]) throw s === null ? new re() : new re(s);
        }
      } }, { key: "equals", value: function() {
        if (arguments.length === 2) {
          var i = arguments[0], s = arguments[1];
          h.equals(i, s, null);
        } else if (arguments.length === 3) {
          var l = arguments[0], d = arguments[1], y = arguments[2];
          if (!d.equals(l)) throw new re("Expected " + l + " but encountered " + d + (y !== null ? ": " + y : ""));
        }
      } }]);
    }(), te = new ArrayBuffer(8), se = new Float64Array(te), fe = new Int32Array(te), Z = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "getM", value: function() {
        return W.NaN;
      } }, { key: "setOrdinate", value: function(i, s) {
        switch (i) {
          case h.X:
            this.x = s;
            break;
          case h.Y:
            this.y = s;
            break;
          case h.Z:
            this.setZ(s);
            break;
          default:
            throw new O("Invalid ordinate index: " + i);
        }
      } }, { key: "equals2D", value: function() {
        if (arguments.length === 1) {
          var i = arguments[0];
          return this.x === i.x && this.y === i.y;
        }
        if (arguments.length === 2) {
          var s = arguments[0], l = arguments[1];
          return !!H.equalsWithTolerance(this.x, s.x, l) && !!H.equalsWithTolerance(this.y, s.y, l);
        }
      } }, { key: "setM", value: function(i) {
        throw new O("Invalid ordinate index: " + h.M);
      } }, { key: "getZ", value: function() {
        return this.z;
      } }, { key: "getOrdinate", value: function(i) {
        switch (i) {
          case h.X:
            return this.x;
          case h.Y:
            return this.y;
          case h.Z:
            return this.getZ();
        }
        throw new O("Invalid ordinate index: " + i);
      } }, { key: "equals3D", value: function(i) {
        return this.x === i.x && this.y === i.y && (this.getZ() === i.getZ() || W.isNaN(this.getZ()) && W.isNaN(i.getZ()));
      } }, { key: "equals", value: function(i) {
        return i instanceof h && this.equals2D(i);
      } }, { key: "equalInZ", value: function(i, s) {
        return H.equalsWithTolerance(this.getZ(), i.getZ(), s);
      } }, { key: "setX", value: function(i) {
        this.x = i;
      } }, { key: "compareTo", value: function(i) {
        var s = i;
        return this.x < s.x ? -1 : this.x > s.x ? 1 : this.y < s.y ? -1 : this.y > s.y ? 1 : 0;
      } }, { key: "getX", value: function() {
        return this.x;
      } }, { key: "setZ", value: function(i) {
        this.z = i;
      } }, { key: "clone", value: function() {
        try {
          return null;
        } catch (i) {
          if (i instanceof CloneNotSupportedException) return ee.shouldNeverReachHere("this shouldn't happen because this class is Cloneable"), null;
          throw i;
        }
      } }, { key: "copy", value: function() {
        return new h(this);
      } }, { key: "toString", value: function() {
        return "(" + this.x + ", " + this.y + ", " + this.getZ() + ")";
      } }, { key: "distance3D", value: function(i) {
        var s = this.x - i.x, l = this.y - i.y, d = this.getZ() - i.getZ();
        return Math.sqrt(s * s + l * l + d * d);
      } }, { key: "getY", value: function() {
        return this.y;
      } }, { key: "setY", value: function(i) {
        this.y = i;
      } }, { key: "distance", value: function(i) {
        var s = this.x - i.x, l = this.y - i.y;
        return Math.sqrt(s * s + l * l);
      } }, { key: "hashCode", value: function() {
        var i = 17;
        return i = 37 * (i = 37 * i + h.hashCode(this.x)) + h.hashCode(this.y);
      } }, { key: "setCoordinate", value: function(i) {
        this.x = i.x, this.y = i.y, this.z = i.getZ();
      } }, { key: "interfaces_", get: function() {
        return [V, C, M];
      } }], [{ key: "constructor_", value: function() {
        if (this.x = null, this.y = null, this.z = null, arguments.length === 0) h.constructor_.call(this, 0, 0);
        else if (arguments.length === 1) {
          var i = arguments[0];
          h.constructor_.call(this, i.x, i.y, i.getZ());
        } else if (arguments.length === 2) {
          var s = arguments[0], l = arguments[1];
          h.constructor_.call(this, s, l, h.NULL_ORDINATE);
        } else if (arguments.length === 3) {
          var d = arguments[0], y = arguments[1], x = arguments[2];
          this.x = d, this.y = y, this.z = x;
        }
      } }, { key: "hashCode", value: function(i) {
        return se[0] = i, fe[0] ^ fe[1];
      } }]);
    }(), Fe = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "compare", value: function(i, s) {
        var l = h.compare(i.x, s.x);
        if (l !== 0) return l;
        var d = h.compare(i.y, s.y);
        return d !== 0 ? d : this._dimensionsToTest <= 2 ? 0 : h.compare(i.getZ(), s.getZ());
      } }, { key: "interfaces_", get: function() {
        return [j];
      } }], [{ key: "constructor_", value: function() {
        if (this._dimensionsToTest = 2, arguments.length === 0) h.constructor_.call(this, 2);
        else if (arguments.length === 1) {
          var i = arguments[0];
          if (i !== 2 && i !== 3) throw new O("only 2 or 3 dimensions may be specified");
          this._dimensionsToTest = i;
        }
      } }, { key: "compare", value: function(i, s) {
        return i < s ? -1 : i > s ? 1 : W.isNaN(i) ? W.isNaN(s) ? 0 : -1 : W.isNaN(s) ? 1 : 0;
      } }]);
    }();
    Z.DimensionalComparator = Fe, Z.NULL_ORDINATE = W.NaN, Z.X = 0, Z.Y = 1, Z.Z = 2, Z.M = 3;
    var _e = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "getArea", value: function() {
        return this.getWidth() * this.getHeight();
      } }, { key: "equals", value: function(i) {
        if (!(i instanceof h)) return !1;
        var s = i;
        return this.isNull() ? s.isNull() : this._maxx === s.getMaxX() && this._maxy === s.getMaxY() && this._minx === s.getMinX() && this._miny === s.getMinY();
      } }, { key: "intersection", value: function(i) {
        if (this.isNull() || i.isNull() || !this.intersects(i)) return new h();
        var s = this._minx > i._minx ? this._minx : i._minx, l = this._miny > i._miny ? this._miny : i._miny;
        return new h(s, this._maxx < i._maxx ? this._maxx : i._maxx, l, this._maxy < i._maxy ? this._maxy : i._maxy);
      } }, { key: "isNull", value: function() {
        return this._maxx < this._minx;
      } }, { key: "getMaxX", value: function() {
        return this._maxx;
      } }, { key: "covers", value: function() {
        if (arguments.length === 1) {
          if (arguments[0] instanceof Z) {
            var i = arguments[0];
            return this.covers(i.x, i.y);
          }
          if (arguments[0] instanceof h) {
            var s = arguments[0];
            return !this.isNull() && !s.isNull() && s.getMinX() >= this._minx && s.getMaxX() <= this._maxx && s.getMinY() >= this._miny && s.getMaxY() <= this._maxy;
          }
        } else if (arguments.length === 2) {
          var l = arguments[0], d = arguments[1];
          return !this.isNull() && l >= this._minx && l <= this._maxx && d >= this._miny && d <= this._maxy;
        }
      } }, { key: "intersects", value: function() {
        if (arguments.length === 1) {
          if (arguments[0] instanceof h) {
            var i = arguments[0];
            return !this.isNull() && !i.isNull() && !(i._minx > this._maxx || i._maxx < this._minx || i._miny > this._maxy || i._maxy < this._miny);
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
        var i = this.getWidth(), s = this.getHeight();
        return Math.sqrt(i * i + s * s);
      } }, { key: "getMinX", value: function() {
        return this._minx;
      } }, { key: "expandToInclude", value: function() {
        if (arguments.length === 1) {
          if (arguments[0] instanceof Z) {
            var i = arguments[0];
            this.expandToInclude(i.x, i.y);
          } else if (arguments[0] instanceof h) {
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
        var i = this.getWidth(), s = this.getHeight();
        return i < s ? i : s;
      } }, { key: "getWidth", value: function() {
        return this.isNull() ? 0 : this._maxx - this._minx;
      } }, { key: "compareTo", value: function(i) {
        var s = i;
        return this.isNull() ? s.isNull() ? 0 : -1 : s.isNull() ? 1 : this._minx < s._minx ? -1 : this._minx > s._minx ? 1 : this._miny < s._miny ? -1 : this._miny > s._miny ? 1 : this._maxx < s._maxx ? -1 : this._maxx > s._maxx ? 1 : this._maxy < s._maxy ? -1 : this._maxy > s._maxy ? 1 : 0;
      } }, { key: "translate", value: function(i, s) {
        if (this.isNull()) return null;
        this.init(this.getMinX() + i, this.getMaxX() + i, this.getMinY() + s, this.getMaxY() + s);
      } }, { key: "copy", value: function() {
        return new h(this);
      } }, { key: "toString", value: function() {
        return "Env[" + this._minx + " : " + this._maxx + ", " + this._miny + " : " + this._maxy + "]";
      } }, { key: "setToNull", value: function() {
        this._minx = 0, this._maxx = -1, this._miny = 0, this._maxy = -1;
      } }, { key: "disjoint", value: function(i) {
        return !(!this.isNull() && !i.isNull()) || i._minx > this._maxx || i._maxx < this._minx || i._miny > this._maxy || i._maxy < this._miny;
      } }, { key: "getHeight", value: function() {
        return this.isNull() ? 0 : this._maxy - this._miny;
      } }, { key: "maxExtent", value: function() {
        if (this.isNull()) return 0;
        var i = this.getWidth(), s = this.getHeight();
        return i > s ? i : s;
      } }, { key: "expandBy", value: function() {
        if (arguments.length === 1) {
          var i = arguments[0];
          this.expandBy(i, i);
        } else if (arguments.length === 2) {
          var s = arguments[0], l = arguments[1];
          if (this.isNull()) return null;
          this._minx -= s, this._maxx += s, this._miny -= l, this._maxy += l, (this._minx > this._maxx || this._miny > this._maxy) && this.setToNull();
        }
      } }, { key: "contains", value: function() {
        if (arguments.length === 1) {
          if (arguments[0] instanceof h) {
            var i = arguments[0];
            return this.covers(i);
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
            var i = arguments[0];
            this.init(i.x, i.x, i.y, i.y);
          } else if (arguments[0] instanceof h) {
            var s = arguments[0];
            this._minx = s._minx, this._maxx = s._maxx, this._miny = s._miny, this._maxy = s._maxy;
          }
        } else if (arguments.length === 2) {
          var l = arguments[0], d = arguments[1];
          this.init(l.x, d.x, l.y, d.y);
        } else if (arguments.length === 4) {
          var y = arguments[0], x = arguments[1], E = arguments[2], P = arguments[3];
          y < x ? (this._minx = y, this._maxx = x) : (this._minx = x, this._maxx = y), E < P ? (this._miny = E, this._maxy = P) : (this._miny = P, this._maxy = E);
        }
      } }, { key: "getMaxY", value: function() {
        return this._maxy;
      } }, { key: "distance", value: function(i) {
        if (this.intersects(i)) return 0;
        var s = 0;
        this._maxx < i._minx ? s = i._minx - this._maxx : this._minx > i._maxx && (s = this._minx - i._maxx);
        var l = 0;
        return this._maxy < i._miny ? l = i._miny - this._maxy : this._miny > i._maxy && (l = this._miny - i._maxy), s === 0 ? l : l === 0 ? s : Math.sqrt(s * s + l * l);
      } }, { key: "hashCode", value: function() {
        var i = 17;
        return i = 37 * (i = 37 * (i = 37 * (i = 37 * i + Z.hashCode(this._minx)) + Z.hashCode(this._maxx)) + Z.hashCode(this._miny)) + Z.hashCode(this._maxy);
      } }, { key: "interfaces_", get: function() {
        return [V, M];
      } }], [{ key: "constructor_", value: function() {
        if (this._minx = null, this._maxx = null, this._miny = null, this._maxy = null, arguments.length === 0) this.init();
        else if (arguments.length === 1) {
          if (arguments[0] instanceof Z) {
            var i = arguments[0];
            this.init(i.x, i.x, i.y, i.y);
          } else if (arguments[0] instanceof h) {
            var s = arguments[0];
            this.init(s);
          }
        } else if (arguments.length === 2) {
          var l = arguments[0], d = arguments[1];
          this.init(l.x, d.x, l.y, d.y);
        } else if (arguments.length === 4) {
          var y = arguments[0], x = arguments[1], E = arguments[2], P = arguments[3];
          this.init(y, x, E, P);
        }
      } }, { key: "intersects", value: function() {
        if (arguments.length === 3) {
          var i = arguments[0], s = arguments[1], l = arguments[2];
          return l.x >= (i.x < s.x ? i.x : s.x) && l.x <= (i.x > s.x ? i.x : s.x) && l.y >= (i.y < s.y ? i.y : s.y) && l.y <= (i.y > s.y ? i.y : s.y);
        }
        if (arguments.length === 4) {
          var d = arguments[0], y = arguments[1], x = arguments[2], E = arguments[3], P = Math.min(x.x, E.x), F = Math.max(x.x, E.x), $ = Math.min(d.x, y.x), K = Math.max(d.x, y.x);
          return !($ > F) && !(K < P) && (P = Math.min(x.y, E.y), F = Math.max(x.y, E.y), $ = Math.min(d.y, y.y), K = Math.max(d.y, y.y), !($ > F) && !(K < P));
        }
      } }]);
    }(), ae = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "isGeometryCollection", value: function() {
        return this.getTypeCode() === h.TYPECODE_GEOMETRYCOLLECTION;
      } }, { key: "getFactory", value: function() {
        return this._factory;
      } }, { key: "getGeometryN", value: function(i) {
        return this;
      } }, { key: "getArea", value: function() {
        return 0;
      } }, { key: "isRectangle", value: function() {
        return !1;
      } }, { key: "equalsExact", value: function(i) {
        return this === i || this.equalsExact(i, 0);
      } }, { key: "geometryChanged", value: function() {
        this.apply(h.geometryChangedFilter);
      } }, { key: "geometryChangedAction", value: function() {
        this._envelope = null;
      } }, { key: "equalsNorm", value: function(i) {
        return i !== null && this.norm().equalsExact(i.norm());
      } }, { key: "getLength", value: function() {
        return 0;
      } }, { key: "getNumGeometries", value: function() {
        return 1;
      } }, { key: "compareTo", value: function() {
        var i;
        if (arguments.length === 1) {
          var s = arguments[0];
          return i = s, this.getTypeCode() !== i.getTypeCode() ? this.getTypeCode() - i.getTypeCode() : this.isEmpty() && i.isEmpty() ? 0 : this.isEmpty() ? -1 : i.isEmpty() ? 1 : this.compareToSameClass(s);
        }
        if (arguments.length === 2) {
          var l = arguments[0], d = arguments[1];
          return i = l, this.getTypeCode() !== i.getTypeCode() ? this.getTypeCode() - i.getTypeCode() : this.isEmpty() && i.isEmpty() ? 0 : this.isEmpty() ? -1 : i.isEmpty() ? 1 : this.compareToSameClass(l, d);
        }
      } }, { key: "getUserData", value: function() {
        return this._userData;
      } }, { key: "getSRID", value: function() {
        return this._SRID;
      } }, { key: "getEnvelope", value: function() {
        return this.getFactory().toGeometry(this.getEnvelopeInternal());
      } }, { key: "checkNotGeometryCollection", value: function(i) {
        if (i.getTypeCode() === h.TYPECODE_GEOMETRYCOLLECTION) throw new O("This method does not support GeometryCollection arguments");
      } }, { key: "equal", value: function(i, s, l) {
        return l === 0 ? i.equals(s) : i.distance(s) <= l;
      } }, { key: "norm", value: function() {
        var i = this.copy();
        return i.normalize(), i;
      } }, { key: "reverse", value: function() {
        var i = this.reverseInternal();
        return this.envelope != null && (i.envelope = this.envelope.copy()), i.setSRID(this.getSRID()), i;
      } }, { key: "copy", value: function() {
        var i = this.copyInternal();
        return i.envelope = this._envelope == null ? null : this._envelope.copy(), i._SRID = this._SRID, i._userData = this._userData, i;
      } }, { key: "getPrecisionModel", value: function() {
        return this._factory.getPrecisionModel();
      } }, { key: "getEnvelopeInternal", value: function() {
        return this._envelope === null && (this._envelope = this.computeEnvelopeInternal()), new _e(this._envelope);
      } }, { key: "setSRID", value: function(i) {
        this._SRID = i;
      } }, { key: "setUserData", value: function(i) {
        this._userData = i;
      } }, { key: "compare", value: function(i, s) {
        for (var l = i.iterator(), d = s.iterator(); l.hasNext() && d.hasNext(); ) {
          var y = l.next(), x = d.next(), E = y.compareTo(x);
          if (E !== 0) return E;
        }
        return l.hasNext() ? 1 : d.hasNext() ? -1 : 0;
      } }, { key: "hashCode", value: function() {
        return this.getEnvelopeInternal().hashCode();
      } }, { key: "isEquivalentClass", value: function(i) {
        return this.getClass() === i.getClass();
      } }, { key: "isGeometryCollectionOrDerived", value: function() {
        return this.getTypeCode() === h.TYPECODE_GEOMETRYCOLLECTION || this.getTypeCode() === h.TYPECODE_MULTIPOINT || this.getTypeCode() === h.TYPECODE_MULTILINESTRING || this.getTypeCode() === h.TYPECODE_MULTIPOLYGON;
      } }, { key: "interfaces_", get: function() {
        return [C, V, M];
      } }, { key: "getClass", value: function() {
        return h;
      } }], [{ key: "hasNonEmptyElements", value: function(i) {
        for (var s = 0; s < i.length; s++) if (!i[s].isEmpty()) return !0;
        return !1;
      } }, { key: "hasNullElements", value: function(i) {
        for (var s = 0; s < i.length; s++) if (i[s] === null) return !0;
        return !1;
      } }]);
    }();
    ae.constructor_ = function(h) {
      h && (this._envelope = null, this._userData = null, this._factory = h, this._SRID = h.getSRID());
    }, ae.TYPECODE_POINT = 0, ae.TYPECODE_MULTIPOINT = 1, ae.TYPECODE_LINESTRING = 2, ae.TYPECODE_LINEARRING = 3, ae.TYPECODE_MULTILINESTRING = 4, ae.TYPECODE_POLYGON = 5, ae.TYPECODE_MULTIPOLYGON = 6, ae.TYPECODE_GEOMETRYCOLLECTION = 7, ae.TYPENAME_POINT = "Point", ae.TYPENAME_MULTIPOINT = "MultiPoint", ae.TYPENAME_LINESTRING = "LineString", ae.TYPENAME_LINEARRING = "LinearRing", ae.TYPENAME_MULTILINESTRING = "MultiLineString", ae.TYPENAME_POLYGON = "Polygon", ae.TYPENAME_MULTIPOLYGON = "MultiPolygon", ae.TYPENAME_GEOMETRYCOLLECTION = "GeometryCollection", ae.geometryChangedFilter = { get interfaces_() {
      return [Y];
    }, filter: function(h) {
      h.geometryChangedAction();
    } };
    var z = function() {
      function h() {
        o(this, h);
      }
      return c(h, null, [{ key: "toLocationSymbol", value: function(i) {
        switch (i) {
          case h.EXTERIOR:
            return "e";
          case h.BOUNDARY:
            return "b";
          case h.INTERIOR:
            return "i";
          case h.NONE:
            return "-";
        }
        throw new O("Unknown location value: " + i);
      } }]);
    }();
    z.INTERIOR = 0, z.BOUNDARY = 1, z.EXTERIOR = 2, z.NONE = -1;
    var be = function() {
      return c(function h() {
        o(this, h);
      }, [{ key: "add", value: function() {
      } }, { key: "addAll", value: function() {
      } }, { key: "isEmpty", value: function() {
      } }, { key: "iterator", value: function() {
      } }, { key: "size", value: function() {
      } }, { key: "toArray", value: function() {
      } }, { key: "remove", value: function() {
      } }]);
    }(), Ne = function(h) {
      function i(s) {
        var l;
        return o(this, i), (l = r(this, i, [s])).name = Object.keys({ NoSuchElementException: i })[0], l;
      }
      return m(i, h), c(i);
    }(A), Ce = function(h) {
      function i(s) {
        var l;
        return o(this, i), (l = r(this, i, [s])).name = Object.keys({ UnsupportedOperationException: i })[0], l;
      }
      return m(i, h), c(i);
    }(A), pt = function(h) {
      function i() {
        return o(this, i), r(this, i, arguments);
      }
      return m(i, h), c(i, [{ key: "contains", value: function() {
      } }]);
    }(be), gt = function(h) {
      function i(s) {
        var l;
        return o(this, i), (l = r(this, i)).map = /* @__PURE__ */ new Map(), s instanceof be && l.addAll(s), l;
      }
      return m(i, h), c(i, [{ key: "contains", value: function(s) {
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
        throw new Ce();
      } }, { key: "size", value: function() {
        return this.map.size;
      } }, { key: "isEmpty", value: function() {
        return this.map.size === 0;
      } }, { key: "toArray", value: function() {
        return Array.from(this.map.values());
      } }, { key: "iterator", value: function() {
        return new Ut(this.map);
      } }, { key: Symbol.iterator, value: function() {
        return this.map;
      } }]);
    }(pt), Ut = function() {
      return c(function h(i) {
        o(this, h), this.iterator = i.values();
        var s = this.iterator.next(), l = s.done, d = s.value;
        this.done = l, this.value = d;
      }, [{ key: "next", value: function() {
        if (this.done) throw new Ne();
        var h = this.value, i = this.iterator.next(), s = i.done, l = i.value;
        return this.done = s, this.value = l, h;
      } }, { key: "hasNext", value: function() {
        return !this.done;
      } }, { key: "remove", value: function() {
        throw new Ce();
      } }]);
    }(), ie = function() {
      function h() {
        o(this, h);
      }
      return c(h, null, [{ key: "opposite", value: function(i) {
        return i === h.LEFT ? h.RIGHT : i === h.RIGHT ? h.LEFT : i;
      } }]);
    }();
    ie.ON = 0, ie.LEFT = 1, ie.RIGHT = 2;
    var fi = function(h) {
      function i(s) {
        var l;
        return o(this, i), (l = r(this, i, [s])).name = Object.keys({ EmptyStackException: i })[0], l;
      }
      return m(i, h), c(i);
    }(A), gi = function(h) {
      function i(s) {
        var l;
        return o(this, i), (l = r(this, i, [s])).name = Object.keys({ IndexOutOfBoundsException: i })[0], l;
      }
      return m(i, h), c(i);
    }(A), tn = function(h) {
      function i() {
        return o(this, i), r(this, i, arguments);
      }
      return m(i, h), c(i, [{ key: "get", value: function() {
      } }, { key: "set", value: function() {
      } }, { key: "isEmpty", value: function() {
      } }]);
    }(be), Ms = function(h) {
      function i() {
        var s;
        return o(this, i), (s = r(this, i)).array = [], s;
      }
      return m(i, h), c(i, [{ key: "add", value: function(s) {
        return this.array.push(s), !0;
      } }, { key: "get", value: function(s) {
        if (s < 0 || s >= this.size()) throw new gi();
        return this.array[s];
      } }, { key: "push", value: function(s) {
        return this.array.push(s), s;
      } }, { key: "pop", value: function() {
        if (this.array.length === 0) throw new fi();
        return this.array.pop();
      } }, { key: "peek", value: function() {
        if (this.array.length === 0) throw new fi();
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
    }(tn);
    function Ee(h, i) {
      return h.interfaces_ && h.interfaces_.indexOf(i) > -1;
    }
    var dn = function() {
      return c(function h(i) {
        o(this, h), this.str = i;
      }, [{ key: "append", value: function(h) {
        this.str += h;
      } }, { key: "setCharAt", value: function(h, i) {
        this.str = this.str.substr(0, h) + i + this.str.substr(h + 1);
      } }, { key: "toString", value: function() {
        return this.str;
      } }]);
    }(), mn = function() {
      function h(i) {
        o(this, h), this.value = i;
      }
      return c(h, [{ key: "intValue", value: function() {
        return this.value;
      } }, { key: "compareTo", value: function(i) {
        return this.value < i ? -1 : this.value > i ? 1 : 0;
      } }], [{ key: "compare", value: function(i, s) {
        return i < s ? -1 : i > s ? 1 : 0;
      } }, { key: "isNan", value: function(i) {
        return Number.isNaN(i);
      } }, { key: "valueOf", value: function(i) {
        return new h(i);
      } }]);
    }(), Ls = function() {
      return c(function h() {
        o(this, h);
      }, null, [{ key: "isWhitespace", value: function(h) {
        return h <= 32 && h >= 0 || h === 127;
      } }, { key: "toUpperCase", value: function(h) {
        return h.toUpperCase();
      } }]);
    }(), pe = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "le", value: function(i) {
        return this._hi < i._hi || this._hi === i._hi && this._lo <= i._lo;
      } }, { key: "extractSignificantDigits", value: function(i, s) {
        var l = this.abs(), d = h.magnitude(l._hi), y = h.TEN.pow(d);
        (l = l.divide(y)).gt(h.TEN) ? (l = l.divide(h.TEN), d += 1) : l.lt(h.ONE) && (l = l.multiply(h.TEN), d -= 1);
        for (var x = d + 1, E = new dn(), P = h.MAX_PRINT_DIGITS - 1, F = 0; F <= P; F++) {
          i && F === x && E.append(".");
          var $ = Math.trunc(l._hi);
          if ($ < 0) break;
          var K = !1, ne = 0;
          $ > 9 ? (K = !0, ne = "9") : ne = "0" + $, E.append(ne), l = l.subtract(h.valueOf($)).multiply(h.TEN), K && l.selfAdd(h.TEN);
          var ue = !0, he = h.magnitude(l._hi);
          if (he < 0 && Math.abs(he) >= P - F && (ue = !1), !ue) break;
        }
        return s[0] = d, E.toString();
      } }, { key: "sqr", value: function() {
        return this.multiply(this);
      } }, { key: "doubleValue", value: function() {
        return this._hi + this._lo;
      } }, { key: "subtract", value: function() {
        if (arguments[0] instanceof h) {
          var i = arguments[0];
          return this.add(i.negate());
        }
        if (typeof arguments[0] == "number") {
          var s = arguments[0];
          return this.add(-s);
        }
      } }, { key: "equals", value: function() {
        if (arguments.length === 1 && arguments[0] instanceof h) {
          var i = arguments[0];
          return this._hi === i._hi && this._lo === i._lo;
        }
      } }, { key: "isZero", value: function() {
        return this._hi === 0 && this._lo === 0;
      } }, { key: "selfSubtract", value: function() {
        if (arguments[0] instanceof h) {
          var i = arguments[0];
          return this.isNaN() ? this : this.selfAdd(-i._hi, -i._lo);
        }
        if (typeof arguments[0] == "number") {
          var s = arguments[0];
          return this.isNaN() ? this : this.selfAdd(-s, 0);
        }
      } }, { key: "getSpecialNumberString", value: function() {
        return this.isZero() ? "0.0" : this.isNaN() ? "NaN " : null;
      } }, { key: "min", value: function(i) {
        return this.le(i) ? this : i;
      } }, { key: "selfDivide", value: function() {
        if (arguments.length === 1) {
          if (arguments[0] instanceof h) {
            var i = arguments[0];
            return this.selfDivide(i._hi, i._lo);
          }
          if (typeof arguments[0] == "number") {
            var s = arguments[0];
            return this.selfDivide(s, 0);
          }
        } else if (arguments.length === 2) {
          var l, d, y, x, E = arguments[0], P = arguments[1], F = null, $ = null, K = null, ne = null;
          return y = this._hi / E, ne = (F = (K = h.SPLIT * y) - (F = K - y)) * ($ = (ne = h.SPLIT * E) - ($ = ne - E)) - (x = y * E) + F * (d = E - $) + (l = y - F) * $ + l * d, ne = y + (K = (this._hi - x - ne + this._lo - y * P) / E), this._hi = ne, this._lo = y - ne + K, this;
        }
      } }, { key: "dump", value: function() {
        return "DD<" + this._hi + ", " + this._lo + ">";
      } }, { key: "divide", value: function() {
        if (arguments[0] instanceof h) {
          var i, s, l, d, y = arguments[0], x = null, E = null, P = null, F = null;
          return i = (l = this._hi / y._hi) - (x = (P = h.SPLIT * l) - (x = P - l)), F = x * (E = (F = h.SPLIT * y._hi) - (E = F - y._hi)) - (d = l * y._hi) + x * (s = y._hi - E) + i * E + i * s, new h(F = l + (P = (this._hi - d - F + this._lo - l * y._lo) / y._hi), l - F + P);
        }
        if (typeof arguments[0] == "number") {
          var $ = arguments[0];
          return W.isNaN($) ? h.createNaN() : h.copy(this).selfDivide($, 0);
        }
      } }, { key: "ge", value: function(i) {
        return this._hi > i._hi || this._hi === i._hi && this._lo >= i._lo;
      } }, { key: "pow", value: function(i) {
        if (i === 0) return h.valueOf(1);
        var s = new h(this), l = h.valueOf(1), d = Math.abs(i);
        if (d > 1) for (; d > 0; ) d % 2 == 1 && l.selfMultiply(s), (d /= 2) > 0 && (s = s.sqr());
        else l = s;
        return i < 0 ? l.reciprocal() : l;
      } }, { key: "ceil", value: function() {
        if (this.isNaN()) return h.NaN;
        var i = Math.ceil(this._hi), s = 0;
        return i === this._hi && (s = Math.ceil(this._lo)), new h(i, s);
      } }, { key: "compareTo", value: function(i) {
        var s = i;
        return this._hi < s._hi ? -1 : this._hi > s._hi ? 1 : this._lo < s._lo ? -1 : this._lo > s._lo ? 1 : 0;
      } }, { key: "rint", value: function() {
        return this.isNaN() ? this : this.add(0.5).floor();
      } }, { key: "setValue", value: function() {
        if (arguments[0] instanceof h) {
          var i = arguments[0];
          return this.init(i), this;
        }
        if (typeof arguments[0] == "number") {
          var s = arguments[0];
          return this.init(s), this;
        }
      } }, { key: "max", value: function(i) {
        return this.ge(i) ? this : i;
      } }, { key: "sqrt", value: function() {
        if (this.isZero()) return h.valueOf(0);
        if (this.isNegative()) return h.NaN;
        var i = 1 / Math.sqrt(this._hi), s = this._hi * i, l = h.valueOf(s), d = this.subtract(l.sqr())._hi * (0.5 * i);
        return l.add(d);
      } }, { key: "selfAdd", value: function() {
        if (arguments.length === 1) {
          if (arguments[0] instanceof h) {
            var i = arguments[0];
            return this.selfAdd(i._hi, i._lo);
          }
          if (typeof arguments[0] == "number") {
            var s, l, d, y, x, E = arguments[0], P = null;
            return P = (d = this._hi + E) - (y = d - this._hi), l = (x = (P = E - y + (this._hi - P)) + this._lo) + (d - (s = d + x)), this._hi = s + l, this._lo = l + (s - this._hi), this;
          }
        } else if (arguments.length === 2) {
          var F, $, K, ne, ue = arguments[0], he = arguments[1], ge = null, Re = null, Pe = null;
          K = this._hi + ue, $ = this._lo + he, Re = K - (Pe = K - this._hi), ge = $ - (ne = $ - this._lo);
          var Ue = (F = K + (Pe = (Re = ue - Pe + (this._hi - Re)) + $)) + (Pe = (ge = he - ne + (this._lo - ge)) + (Pe + (K - F))), st = Pe + (F - Ue);
          return this._hi = Ue, this._lo = st, this;
        }
      } }, { key: "selfMultiply", value: function() {
        if (arguments.length === 1) {
          if (arguments[0] instanceof h) {
            var i = arguments[0];
            return this.selfMultiply(i._hi, i._lo);
          }
          if (typeof arguments[0] == "number") {
            var s = arguments[0];
            return this.selfMultiply(s, 0);
          }
        } else if (arguments.length === 2) {
          var l, d, y = arguments[0], x = arguments[1], E = null, P = null, F = null, $ = null;
          E = (F = h.SPLIT * this._hi) - this._hi, $ = h.SPLIT * y, E = F - E, l = this._hi - E, P = $ - y;
          var K = (F = this._hi * y) + ($ = E * (P = $ - P) - F + E * (d = y - P) + l * P + l * d + (this._hi * x + this._lo * y)), ne = $ + (E = F - K);
          return this._hi = K, this._lo = ne, this;
        }
      } }, { key: "selfSqr", value: function() {
        return this.selfMultiply(this);
      } }, { key: "floor", value: function() {
        if (this.isNaN()) return h.NaN;
        var i = Math.floor(this._hi), s = 0;
        return i === this._hi && (s = Math.floor(this._lo)), new h(i, s);
      } }, { key: "negate", value: function() {
        return this.isNaN() ? this : new h(-this._hi, -this._lo);
      } }, { key: "clone", value: function() {
        try {
          return null;
        } catch (i) {
          if (i instanceof CloneNotSupportedException) return null;
          throw i;
        }
      } }, { key: "multiply", value: function() {
        if (arguments[0] instanceof h) {
          var i = arguments[0];
          return i.isNaN() ? h.createNaN() : h.copy(this).selfMultiply(i);
        }
        if (typeof arguments[0] == "number") {
          var s = arguments[0];
          return W.isNaN(s) ? h.createNaN() : h.copy(this).selfMultiply(s, 0);
        }
      } }, { key: "isNaN", value: function() {
        return W.isNaN(this._hi);
      } }, { key: "intValue", value: function() {
        return Math.trunc(this._hi);
      } }, { key: "toString", value: function() {
        var i = h.magnitude(this._hi);
        return i >= -3 && i <= 20 ? this.toStandardNotation() : this.toSciNotation();
      } }, { key: "toStandardNotation", value: function() {
        var i = this.getSpecialNumberString();
        if (i !== null) return i;
        var s = new Array(1).fill(null), l = this.extractSignificantDigits(!0, s), d = s[0] + 1, y = l;
        if (l.charAt(0) === ".") y = "0" + l;
        else if (d < 0) y = "0." + h.stringOfChar("0", -d) + l;
        else if (l.indexOf(".") === -1) {
          var x = d - l.length;
          y = l + h.stringOfChar("0", x) + ".0";
        }
        return this.isNegative() ? "-" + y : y;
      } }, { key: "reciprocal", value: function() {
        var i, s, l, d, y = null, x = null, E = null, P = null;
        i = (l = 1 / this._hi) - (y = (E = h.SPLIT * l) - (y = E - l)), x = (P = h.SPLIT * this._hi) - this._hi;
        var F = l + (E = (1 - (d = l * this._hi) - (P = y * (x = P - x) - d + y * (s = this._hi - x) + i * x + i * s) - l * this._lo) / this._hi);
        return new h(F, l - F + E);
      } }, { key: "toSciNotation", value: function() {
        if (this.isZero()) return h.SCI_NOT_ZERO;
        var i = this.getSpecialNumberString();
        if (i !== null) return i;
        var s = new Array(1).fill(null), l = this.extractSignificantDigits(!1, s), d = h.SCI_NOT_EXPONENT_CHAR + s[0];
        if (l.charAt(0) === "0") throw new IllegalStateException("Found leading zero: " + l);
        var y = "";
        l.length > 1 && (y = l.substring(1));
        var x = l.charAt(0) + "." + y;
        return this.isNegative() ? "-" + x + d : x + d;
      } }, { key: "abs", value: function() {
        return this.isNaN() ? h.NaN : this.isNegative() ? this.negate() : new h(this);
      } }, { key: "isPositive", value: function() {
        return this._hi > 0 || this._hi === 0 && this._lo > 0;
      } }, { key: "lt", value: function(i) {
        return this._hi < i._hi || this._hi === i._hi && this._lo < i._lo;
      } }, { key: "add", value: function() {
        if (arguments[0] instanceof h) {
          var i = arguments[0];
          return h.copy(this).selfAdd(i);
        }
        if (typeof arguments[0] == "number") {
          var s = arguments[0];
          return h.copy(this).selfAdd(s);
        }
      } }, { key: "init", value: function() {
        if (arguments.length === 1) {
          if (typeof arguments[0] == "number") {
            var i = arguments[0];
            this._hi = i, this._lo = 0;
          } else if (arguments[0] instanceof h) {
            var s = arguments[0];
            this._hi = s._hi, this._lo = s._lo;
          }
        } else if (arguments.length === 2) {
          var l = arguments[0], d = arguments[1];
          this._hi = l, this._lo = d;
        }
      } }, { key: "gt", value: function(i) {
        return this._hi > i._hi || this._hi === i._hi && this._lo > i._lo;
      } }, { key: "isNegative", value: function() {
        return this._hi < 0 || this._hi === 0 && this._lo < 0;
      } }, { key: "trunc", value: function() {
        return this.isNaN() ? h.NaN : this.isPositive() ? this.floor() : this.ceil();
      } }, { key: "signum", value: function() {
        return this._hi > 0 ? 1 : this._hi < 0 ? -1 : this._lo > 0 ? 1 : this._lo < 0 ? -1 : 0;
      } }, { key: "interfaces_", get: function() {
        return [M, V, C];
      } }], [{ key: "constructor_", value: function() {
        if (this._hi = 0, this._lo = 0, arguments.length === 0) this.init(0);
        else if (arguments.length === 1) {
          if (typeof arguments[0] == "number") {
            var i = arguments[0];
            this.init(i);
          } else if (arguments[0] instanceof h) {
            var s = arguments[0];
            this.init(s);
          } else if (typeof arguments[0] == "string") {
            var l = arguments[0];
            h.constructor_.call(this, h.parse(l));
          }
        } else if (arguments.length === 2) {
          var d = arguments[0], y = arguments[1];
          this.init(d, y);
        }
      } }, { key: "determinant", value: function() {
        if (typeof arguments[3] == "number" && typeof arguments[2] == "number" && typeof arguments[0] == "number" && typeof arguments[1] == "number") {
          var i = arguments[0], s = arguments[1], l = arguments[2], d = arguments[3];
          return h.determinant(h.valueOf(i), h.valueOf(s), h.valueOf(l), h.valueOf(d));
        }
        if (arguments[3] instanceof h && arguments[2] instanceof h && arguments[0] instanceof h && arguments[1] instanceof h) {
          var y = arguments[1], x = arguments[2], E = arguments[3];
          return arguments[0].multiply(E).selfSubtract(y.multiply(x));
        }
      } }, { key: "sqr", value: function(i) {
        return h.valueOf(i).selfMultiply(i);
      } }, { key: "valueOf", value: function() {
        if (typeof arguments[0] == "string") {
          var i = arguments[0];
          return h.parse(i);
        }
        if (typeof arguments[0] == "number") return new h(arguments[0]);
      } }, { key: "sqrt", value: function(i) {
        return h.valueOf(i).sqrt();
      } }, { key: "parse", value: function(i) {
        for (var s = 0, l = i.length; Ls.isWhitespace(i.charAt(s)); ) s++;
        var d = !1;
        if (s < l) {
          var y = i.charAt(s);
          y !== "-" && y !== "+" || (s++, y === "-" && (d = !0));
        }
        for (var x = new h(), E = 0, P = 0, F = 0, $ = !1; !(s >= l); ) {
          var K = i.charAt(s);
          if (s++, Ls.isDigit(K)) {
            var ne = K - "0";
            x.selfMultiply(h.TEN), x.selfAdd(ne), E++;
          } else {
            if (K !== ".") {
              if (K === "e" || K === "E") {
                var ue = i.substring(s);
                try {
                  F = mn.parseInt(ue);
                } catch (Ue) {
                  throw Ue instanceof NumberFormatException ? new NumberFormatException("Invalid exponent " + ue + " in string " + i) : Ue;
                }
                break;
              }
              throw new NumberFormatException("Unexpected character '" + K + "' at position " + s + " in string " + i);
            }
            P = E, $ = !0;
          }
        }
        var he = x;
        $ || (P = E);
        var ge = E - P - F;
        if (ge === 0) he = x;
        else if (ge > 0) {
          var Re = h.TEN.pow(ge);
          he = x.divide(Re);
        } else if (ge < 0) {
          var Pe = h.TEN.pow(-ge);
          he = x.multiply(Pe);
        }
        return d ? he.negate() : he;
      } }, { key: "createNaN", value: function() {
        return new h(W.NaN, W.NaN);
      } }, { key: "copy", value: function(i) {
        return new h(i);
      } }, { key: "magnitude", value: function(i) {
        var s = Math.abs(i), l = Math.log(s) / Math.log(10), d = Math.trunc(Math.floor(l));
        return 10 * Math.pow(10, d) <= s && (d += 1), d;
      } }, { key: "stringOfChar", value: function(i, s) {
        for (var l = new dn(), d = 0; d < s; d++) l.append(i);
        return l.toString();
      } }]);
    }();
    pe.PI = new pe(3.141592653589793, 12246467991473532e-32), pe.TWO_PI = new pe(6.283185307179586, 24492935982947064e-32), pe.PI_2 = new pe(1.5707963267948966, 6123233995736766e-32), pe.E = new pe(2.718281828459045, 14456468917292502e-32), pe.NaN = new pe(W.NaN, W.NaN), pe.EPS = 123259516440783e-46, pe.SPLIT = 134217729, pe.MAX_PRINT_DIGITS = 32, pe.TEN = pe.valueOf(10), pe.ONE = pe.valueOf(1), pe.SCI_NOT_EXPONENT_CHAR = "E", pe.SCI_NOT_ZERO = "0.0E0";
    var Ps = function() {
      function h() {
        o(this, h);
      }
      return c(h, null, [{ key: "orientationIndex", value: function(i, s, l) {
        var d = h.orientationIndexFilter(i, s, l);
        if (d <= 1) return d;
        var y = pe.valueOf(s.x).selfAdd(-i.x), x = pe.valueOf(s.y).selfAdd(-i.y), E = pe.valueOf(l.x).selfAdd(-s.x), P = pe.valueOf(l.y).selfAdd(-s.y);
        return y.selfMultiply(P).selfSubtract(x.selfMultiply(E)).signum();
      } }, { key: "signOfDet2x2", value: function() {
        if (arguments[3] instanceof pe && arguments[2] instanceof pe && arguments[0] instanceof pe && arguments[1] instanceof pe) {
          var i = arguments[1], s = arguments[2], l = arguments[3];
          return arguments[0].multiply(l).selfSubtract(i.multiply(s)).signum();
        }
        if (typeof arguments[3] == "number" && typeof arguments[2] == "number" && typeof arguments[0] == "number" && typeof arguments[1] == "number") {
          var d = arguments[0], y = arguments[1], x = arguments[2], E = arguments[3], P = pe.valueOf(d), F = pe.valueOf(y), $ = pe.valueOf(x), K = pe.valueOf(E);
          return P.multiply(K).selfSubtract(F.multiply($)).signum();
        }
      } }, { key: "intersection", value: function(i, s, l, d) {
        var y = new pe(i.y).selfSubtract(s.y), x = new pe(s.x).selfSubtract(i.x), E = new pe(i.x).selfMultiply(s.y).selfSubtract(new pe(s.x).selfMultiply(i.y)), P = new pe(l.y).selfSubtract(d.y), F = new pe(d.x).selfSubtract(l.x), $ = new pe(l.x).selfMultiply(d.y).selfSubtract(new pe(d.x).selfMultiply(l.y)), K = x.multiply($).selfSubtract(F.multiply(E)), ne = P.multiply(E).selfSubtract(y.multiply($)), ue = y.multiply(F).selfSubtract(P.multiply(x)), he = K.selfDivide(ue).doubleValue(), ge = ne.selfDivide(ue).doubleValue();
        return W.isNaN(he) || W.isInfinite(he) || W.isNaN(ge) || W.isInfinite(ge) ? null : new Z(he, ge);
      } }, { key: "orientationIndexFilter", value: function(i, s, l) {
        var d = null, y = (i.x - l.x) * (s.y - l.y), x = (i.y - l.y) * (s.x - l.x), E = y - x;
        if (y > 0) {
          if (x <= 0) return h.signum(E);
          d = y + x;
        } else {
          if (!(y < 0) || x >= 0) return h.signum(E);
          d = -y - x;
        }
        var P = h.DP_SAFE_EPSILON * d;
        return E >= P || -E >= P ? h.signum(E) : 2;
      } }, { key: "signum", value: function(i) {
        return i > 0 ? 1 : i < 0 ? -1 : 0;
      } }]);
    }();
    Ps.DP_SAFE_EPSILON = 1e-15;
    var Te = function() {
      return c(function h() {
        o(this, h);
      }, [{ key: "getM", value: function(h) {
        if (this.hasM()) {
          var i = this.getDimension() - this.getMeasures();
          return this.getOrdinate(h, i);
        }
        return W.NaN;
      } }, { key: "setOrdinate", value: function(h, i, s) {
      } }, { key: "getZ", value: function(h) {
        return this.hasZ() ? this.getOrdinate(h, 2) : W.NaN;
      } }, { key: "size", value: function() {
      } }, { key: "getOrdinate", value: function(h, i) {
      } }, { key: "getCoordinate", value: function() {
      } }, { key: "getCoordinateCopy", value: function(h) {
      } }, { key: "createCoordinate", value: function() {
      } }, { key: "getDimension", value: function() {
      } }, { key: "hasM", value: function() {
        return this.getMeasures() > 0;
      } }, { key: "getX", value: function(h) {
      } }, { key: "hasZ", value: function() {
        return this.getDimension() - this.getMeasures() > 2;
      } }, { key: "getMeasures", value: function() {
        return 0;
      } }, { key: "expandEnvelope", value: function(h) {
      } }, { key: "copy", value: function() {
      } }, { key: "getY", value: function(h) {
      } }, { key: "toCoordinateArray", value: function() {
      } }, { key: "interfaces_", get: function() {
        return [C];
      } }]);
    }();
    Te.X = 0, Te.Y = 1, Te.Z = 2, Te.M = 3;
    var we = function() {
      function h() {
        o(this, h);
      }
      return c(h, null, [{ key: "index", value: function(i, s, l) {
        return Ps.orientationIndex(i, s, l);
      } }, { key: "isCCW", value: function() {
        if (arguments[0] instanceof Array) {
          var i = arguments[0], s = i.length - 1;
          if (s < 3) throw new O("Ring has fewer than 4 points, so orientation cannot be determined");
          for (var l = i[0], d = 0, y = 1; y <= s; y++) {
            var x = i[y];
            x.y > l.y && (l = x, d = y);
          }
          var E = d;
          do
            (E -= 1) < 0 && (E = s);
          while (i[E].equals2D(l) && E !== d);
          var P = d;
          do
            P = (P + 1) % s;
          while (i[P].equals2D(l) && P !== d);
          var F = i[E], $ = i[P];
          if (F.equals2D(l) || $.equals2D(l) || F.equals2D($)) return !1;
          var K = h.index(F, l, $);
          return K === 0 ? F.x > $.x : K > 0;
        }
        if (Ee(arguments[0], Te)) {
          var ne = arguments[0], ue = ne.size() - 1;
          if (ue < 3) throw new O("Ring has fewer than 4 points, so orientation cannot be determined");
          for (var he = ne.getCoordinate(0), ge = 0, Re = 1; Re <= ue; Re++) {
            var Pe = ne.getCoordinate(Re);
            Pe.y > he.y && (he = Pe, ge = Re);
          }
          var Ue = null, st = ge;
          do
            (st -= 1) < 0 && (st = ue), Ue = ne.getCoordinate(st);
          while (Ue.equals2D(he) && st !== ge);
          var ut = null, Mn = ge;
          do
            Mn = (Mn + 1) % ue, ut = ne.getCoordinate(Mn);
          while (ut.equals2D(he) && Mn !== ge);
          if (Ue.equals2D(he) || ut.equals2D(he) || Ue.equals2D(ut)) return !1;
          var Sr = h.index(Ue, he, ut);
          return Sr === 0 ? Ue.x > ut.x : Sr > 0;
        }
      } }]);
    }();
    we.CLOCKWISE = -1, we.RIGHT = we.CLOCKWISE, we.COUNTERCLOCKWISE = 1, we.LEFT = we.COUNTERCLOCKWISE, we.COLLINEAR = 0, we.STRAIGHT = we.COLLINEAR;
    var Vf = function() {
      return c(function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }, [{ key: "getCoordinate", value: function() {
        return this._minCoord;
      } }, { key: "getRightmostSide", value: function(h, i) {
        var s = this.getRightmostSideOfSegment(h, i);
        return s < 0 && (s = this.getRightmostSideOfSegment(h, i - 1)), s < 0 && (this._minCoord = null, this.checkForRightmostCoordinate(h)), s;
      } }, { key: "findRightmostEdgeAtVertex", value: function() {
        var h = this._minDe.getEdge().getCoordinates();
        ee.isTrue(this._minIndex > 0 && this._minIndex < h.length, "rightmost point expected to be interior vertex of edge");
        var i = h[this._minIndex - 1], s = h[this._minIndex + 1], l = we.index(this._minCoord, s, i), d = !1;
        (i.y < this._minCoord.y && s.y < this._minCoord.y && l === we.COUNTERCLOCKWISE || i.y > this._minCoord.y && s.y > this._minCoord.y && l === we.CLOCKWISE) && (d = !0), d && (this._minIndex = this._minIndex - 1);
      } }, { key: "getRightmostSideOfSegment", value: function(h, i) {
        var s = h.getEdge().getCoordinates();
        if (i < 0 || i + 1 >= s.length || s[i].y === s[i + 1].y) return -1;
        var l = ie.LEFT;
        return s[i].y < s[i + 1].y && (l = ie.RIGHT), l;
      } }, { key: "getEdge", value: function() {
        return this._orientedDe;
      } }, { key: "checkForRightmostCoordinate", value: function(h) {
        for (var i = h.getEdge().getCoordinates(), s = 0; s < i.length - 1; s++) (this._minCoord === null || i[s].x > this._minCoord.x) && (this._minDe = h, this._minIndex = s, this._minCoord = i[s]);
      } }, { key: "findRightmostEdgeAtNode", value: function() {
        var h = this._minDe.getNode().getEdges();
        this._minDe = h.getRightmostEdge(), this._minDe.isForward() || (this._minDe = this._minDe.getSym(), this._minIndex = this._minDe.getEdge().getCoordinates().length - 1);
      } }, { key: "findEdge", value: function(h) {
        for (var i = h.iterator(); i.hasNext(); ) {
          var s = i.next();
          s.isForward() && this.checkForRightmostCoordinate(s);
        }
        ee.isTrue(this._minIndex !== 0 || this._minCoord.equals(this._minDe.getCoordinate()), "inconsistency in rightmost processing"), this._minIndex === 0 ? this.findRightmostEdgeAtNode() : this.findRightmostEdgeAtVertex(), this._orientedDe = this._minDe, this.getRightmostSide(this._minDe, this._minIndex) === ie.LEFT && (this._orientedDe = this._minDe.getSym());
      } }], [{ key: "constructor_", value: function() {
        this._minIndex = -1, this._minCoord = null, this._minDe = null, this._orientedDe = null;
      } }]);
    }(), nn = function(h) {
      function i(s, l) {
        var d;
        return o(this, i), (d = r(this, i, [l ? s + " [ " + l + " ]" : s])).pt = l ? new Z(l) : void 0, d.name = Object.keys({ TopologyException: i })[0], d;
      }
      return m(i, h), c(i, [{ key: "getCoordinate", value: function() {
        return this.pt;
      } }]);
    }(Q), Hf = function() {
      return c(function h() {
        o(this, h), this.array = [];
      }, [{ key: "addLast", value: function(h) {
        this.array.push(h);
      } }, { key: "removeFirst", value: function() {
        return this.array.shift();
      } }, { key: "isEmpty", value: function() {
        return this.array.length === 0;
      } }]);
    }(), ve = function(h) {
      function i(s) {
        var l;
        return o(this, i), (l = r(this, i)).array = [], s instanceof be && l.addAll(s), l;
      }
      return m(i, h), c(i, [{ key: "interfaces_", get: function() {
        return [tn, be];
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
        return new Wf(this);
      } }, { key: "get", value: function(s) {
        if (s < 0 || s >= this.size()) throw new gi();
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
    }(tn), Wf = function() {
      return c(function h(i) {
        o(this, h), this.arrayList = i, this.position = 0;
      }, [{ key: "next", value: function() {
        if (this.position === this.arrayList.size()) throw new Ne();
        return this.arrayList.get(this.position++);
      } }, { key: "hasNext", value: function() {
        return this.position < this.arrayList.size();
      } }, { key: "set", value: function(h) {
        return this.arrayList.set(this.position - 1, h);
      } }, { key: "remove", value: function() {
        this.arrayList.remove(this.arrayList.get(this.position));
      } }]);
    }(), $f = function() {
      return c(function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }, [{ key: "clearVisitedEdges", value: function() {
        for (var h = this._dirEdgeList.iterator(); h.hasNext(); )
          h.next().setVisited(!1);
      } }, { key: "getRightmostCoordinate", value: function() {
        return this._rightMostCoord;
      } }, { key: "computeNodeDepth", value: function(h) {
        for (var i = null, s = h.getEdges().iterator(); s.hasNext(); ) {
          var l = s.next();
          if (l.isVisited() || l.getSym().isVisited()) {
            i = l;
            break;
          }
        }
        if (i === null) throw new nn("unable to find edge to compute depths at " + h.getCoordinate());
        h.getEdges().computeDepths(i);
        for (var d = h.getEdges().iterator(); d.hasNext(); ) {
          var y = d.next();
          y.setVisited(!0), this.copySymDepths(y);
        }
      } }, { key: "computeDepth", value: function(h) {
        this.clearVisitedEdges();
        var i = this._finder.getEdge();
        i.getNode(), i.getLabel(), i.setEdgeDepths(ie.RIGHT, h), this.copySymDepths(i), this.computeDepths(i);
      } }, { key: "create", value: function(h) {
        this.addReachable(h), this._finder.findEdge(this._dirEdgeList), this._rightMostCoord = this._finder.getCoordinate();
      } }, { key: "findResultEdges", value: function() {
        for (var h = this._dirEdgeList.iterator(); h.hasNext(); ) {
          var i = h.next();
          i.getDepth(ie.RIGHT) >= 1 && i.getDepth(ie.LEFT) <= 0 && !i.isInteriorAreaEdge() && i.setInResult(!0);
        }
      } }, { key: "computeDepths", value: function(h) {
        var i = new gt(), s = new Hf(), l = h.getNode();
        for (s.addLast(l), i.add(l), h.setVisited(!0); !s.isEmpty(); ) {
          var d = s.removeFirst();
          i.add(d), this.computeNodeDepth(d);
          for (var y = d.getEdges().iterator(); y.hasNext(); ) {
            var x = y.next().getSym();
            if (!x.isVisited()) {
              var E = x.getNode();
              i.contains(E) || (s.addLast(E), i.add(E));
            }
          }
        }
      } }, { key: "compareTo", value: function(h) {
        var i = h;
        return this._rightMostCoord.x < i._rightMostCoord.x ? -1 : this._rightMostCoord.x > i._rightMostCoord.x ? 1 : 0;
      } }, { key: "getEnvelope", value: function() {
        if (this._env === null) {
          for (var h = new _e(), i = this._dirEdgeList.iterator(); i.hasNext(); ) for (var s = i.next().getEdge().getCoordinates(), l = 0; l < s.length - 1; l++) h.expandToInclude(s[l]);
          this._env = h;
        }
        return this._env;
      } }, { key: "addReachable", value: function(h) {
        var i = new Ms();
        for (i.add(h); !i.empty(); ) {
          var s = i.pop();
          this.add(s, i);
        }
      } }, { key: "copySymDepths", value: function(h) {
        var i = h.getSym();
        i.setDepth(ie.LEFT, h.getDepth(ie.RIGHT)), i.setDepth(ie.RIGHT, h.getDepth(ie.LEFT));
      } }, { key: "add", value: function(h, i) {
        h.setVisited(!0), this._nodes.add(h);
        for (var s = h.getEdges().iterator(); s.hasNext(); ) {
          var l = s.next();
          this._dirEdgeList.add(l);
          var d = l.getSym().getNode();
          d.isVisited() || i.push(d);
        }
      } }, { key: "getNodes", value: function() {
        return this._nodes;
      } }, { key: "getDirectedEdges", value: function() {
        return this._dirEdgeList;
      } }, { key: "interfaces_", get: function() {
        return [V];
      } }], [{ key: "constructor_", value: function() {
        this._finder = null, this._dirEdgeList = new ve(), this._nodes = new ve(), this._rightMostCoord = null, this._env = null, this._finder = new Vf();
      } }]);
    }(), Ns = function() {
      return c(function h() {
        o(this, h);
      }, null, [{ key: "intersection", value: function(h, i, s, l) {
        var d = h.x < i.x ? h.x : i.x, y = h.y < i.y ? h.y : i.y, x = h.x > i.x ? h.x : i.x, E = h.y > i.y ? h.y : i.y, P = s.x < l.x ? s.x : l.x, F = s.y < l.y ? s.y : l.y, $ = s.x > l.x ? s.x : l.x, K = s.y > l.y ? s.y : l.y, ne = ((d > P ? d : P) + (x < $ ? x : $)) / 2, ue = ((y > F ? y : F) + (E < K ? E : K)) / 2, he = h.x - ne, ge = h.y - ue, Re = i.x - ne, Pe = i.y - ue, Ue = s.x - ne, st = s.y - ue, ut = l.x - ne, Mn = l.y - ue, Sr = ge - Pe, gu = Re - he, du = he * Pe - Re * ge, mu = st - Mn, vu = ut - Ue, yu = Ue * Mn - ut * st, pu = Sr * vu - mu * gu, Ws = (gu * yu - vu * du) / pu, $s = (mu * du - Sr * yu) / pu;
        return W.isNaN(Ws) || W.isInfinite(Ws) || W.isNaN($s) || W.isInfinite($s) ? null : new Z(Ws + ne, $s + ue);
      } }]);
    }(), bt = function() {
      return c(function h() {
        o(this, h);
      }, null, [{ key: "arraycopy", value: function(h, i, s, l, d) {
        for (var y = 0, x = i; x < i + d; x++) s[l + y] = h[x], y++;
      } }, { key: "getProperty", value: function(h) {
        return { "line.separator": `
` }[h];
      } }]);
    }(), pr = function() {
      function h() {
        o(this, h);
      }
      return c(h, null, [{ key: "log10", value: function(i) {
        var s = Math.log(i);
        return W.isInfinite(s) || W.isNaN(s) ? s : s / h.LOG_10;
      } }, { key: "min", value: function(i, s, l, d) {
        var y = i;
        return s < y && (y = s), l < y && (y = l), d < y && (y = d), y;
      } }, { key: "clamp", value: function() {
        if (typeof arguments[2] == "number" && typeof arguments[0] == "number" && typeof arguments[1] == "number") {
          var i = arguments[0], s = arguments[1], l = arguments[2];
          return i < s ? s : i > l ? l : i;
        }
        if (Number.isInteger(arguments[2]) && Number.isInteger(arguments[0]) && Number.isInteger(arguments[1])) {
          var d = arguments[0], y = arguments[1], x = arguments[2];
          return d < y ? y : d > x ? x : d;
        }
      } }, { key: "wrap", value: function(i, s) {
        return i < 0 ? s - -i % s : i % s;
      } }, { key: "max", value: function() {
        if (arguments.length === 3) {
          var i = arguments[1], s = arguments[2], l = arguments[0];
          return i > l && (l = i), s > l && (l = s), l;
        }
        if (arguments.length === 4) {
          var d = arguments[1], y = arguments[2], x = arguments[3], E = arguments[0];
          return d > E && (E = d), y > E && (E = y), x > E && (E = x), E;
        }
      } }, { key: "average", value: function(i, s) {
        return (i + s) / 2;
      } }]);
    }();
    pr.LOG_10 = Math.log(10);
    var Yt = function() {
      function h() {
        o(this, h);
      }
      return c(h, null, [{ key: "segmentToSegment", value: function(i, s, l, d) {
        if (i.equals(s)) return h.pointToSegment(i, l, d);
        if (l.equals(d)) return h.pointToSegment(d, i, s);
        var y = !1;
        if (_e.intersects(i, s, l, d)) {
          var x = (s.x - i.x) * (d.y - l.y) - (s.y - i.y) * (d.x - l.x);
          if (x === 0) y = !0;
          else {
            var E = (i.y - l.y) * (d.x - l.x) - (i.x - l.x) * (d.y - l.y), P = ((i.y - l.y) * (s.x - i.x) - (i.x - l.x) * (s.y - i.y)) / x, F = E / x;
            (F < 0 || F > 1 || P < 0 || P > 1) && (y = !0);
          }
        } else y = !0;
        return y ? pr.min(h.pointToSegment(i, l, d), h.pointToSegment(s, l, d), h.pointToSegment(l, i, s), h.pointToSegment(d, i, s)) : 0;
      } }, { key: "pointToSegment", value: function(i, s, l) {
        if (s.x === l.x && s.y === l.y) return i.distance(s);
        var d = (l.x - s.x) * (l.x - s.x) + (l.y - s.y) * (l.y - s.y), y = ((i.x - s.x) * (l.x - s.x) + (i.y - s.y) * (l.y - s.y)) / d;
        if (y <= 0) return i.distance(s);
        if (y >= 1) return i.distance(l);
        var x = ((s.y - i.y) * (l.x - s.x) - (s.x - i.x) * (l.y - s.y)) / d;
        return Math.abs(x) * Math.sqrt(d);
      } }, { key: "pointToLinePerpendicular", value: function(i, s, l) {
        var d = (l.x - s.x) * (l.x - s.x) + (l.y - s.y) * (l.y - s.y), y = ((s.y - i.y) * (l.x - s.x) - (s.x - i.x) * (l.y - s.y)) / d;
        return Math.abs(y) * Math.sqrt(d);
      } }, { key: "pointToSegmentString", value: function(i, s) {
        if (s.length === 0) throw new O("Line array must contain at least one vertex");
        for (var l = i.distance(s[0]), d = 0; d < s.length - 1; d++) {
          var y = h.pointToSegment(i, s[d], s[d + 1]);
          y < l && (l = y);
        }
        return l;
      } }]);
    }(), Ma = function() {
      return c(function h() {
        o(this, h);
      }, [{ key: "create", value: function() {
        if (arguments.length === 1) arguments[0] instanceof Array || Ee(arguments[0], Te);
        else if (arguments.length !== 2) {
          if (arguments.length === 3) {
            var h = arguments[0], i = arguments[1];
            return this.create(h, i);
          }
        }
      } }]);
    }(), di = function() {
      return c(function h() {
        o(this, h);
      }, [{ key: "filter", value: function(h) {
      } }]);
    }(), Zf = function() {
      return c(function h() {
        o(this, h);
      }, null, [{ key: "ofLine", value: function(h) {
        var i = h.size();
        if (i <= 1) return 0;
        var s = 0, l = new Z();
        h.getCoordinate(0, l);
        for (var d = l.x, y = l.y, x = 1; x < i; x++) {
          h.getCoordinate(x, l);
          var E = l.x, P = l.y, F = E - d, $ = P - y;
          s += Math.sqrt(F * F + $ * $), d = E, y = P;
        }
        return s;
      } }]);
    }(), La = c(function h() {
      o(this, h);
    }), En = function() {
      function h() {
        o(this, h);
      }
      return c(h, null, [{ key: "copyCoord", value: function(i, s, l, d) {
        for (var y = Math.min(i.getDimension(), l.getDimension()), x = 0; x < y; x++) l.setOrdinate(d, x, i.getOrdinate(s, x));
      } }, { key: "isRing", value: function(i) {
        var s = i.size();
        return s === 0 || !(s <= 3) && i.getOrdinate(0, Te.X) === i.getOrdinate(s - 1, Te.X) && i.getOrdinate(0, Te.Y) === i.getOrdinate(s - 1, Te.Y);
      } }, { key: "scroll", value: function() {
        if (arguments.length === 2) {
          if (Ee(arguments[0], Te) && Number.isInteger(arguments[1])) {
            var i = arguments[0], s = arguments[1];
            h.scroll(i, s, h.isRing(i));
          } else if (Ee(arguments[0], Te) && arguments[1] instanceof Z) {
            var l = arguments[0], d = arguments[1], y = h.indexOf(d, l);
            if (y <= 0) return null;
            h.scroll(l, y);
          }
        } else if (arguments.length === 3) {
          var x = arguments[0], E = arguments[1], P = arguments[2];
          if (E <= 0) return null;
          for (var F = x.copy(), $ = P ? x.size() - 1 : x.size(), K = 0; K < $; K++) for (var ne = 0; ne < x.getDimension(); ne++) x.setOrdinate(K, ne, F.getOrdinate((E + K) % $, ne));
          if (P) for (var ue = 0; ue < x.getDimension(); ue++) x.setOrdinate($, ue, x.getOrdinate(0, ue));
        }
      } }, { key: "isEqual", value: function(i, s) {
        var l = i.size();
        if (l !== s.size()) return !1;
        for (var d = Math.min(i.getDimension(), s.getDimension()), y = 0; y < l; y++) for (var x = 0; x < d; x++) {
          var E = i.getOrdinate(y, x), P = s.getOrdinate(y, x);
          if (i.getOrdinate(y, x) !== s.getOrdinate(y, x) && (!W.isNaN(E) || !W.isNaN(P))) return !1;
        }
        return !0;
      } }, { key: "minCoordinateIndex", value: function() {
        if (arguments.length === 1) {
          var i = arguments[0];
          return h.minCoordinateIndex(i, 0, i.size() - 1);
        }
        if (arguments.length === 3) {
          for (var s = arguments[0], l = arguments[2], d = -1, y = null, x = arguments[1]; x <= l; x++) {
            var E = s.getCoordinate(x);
            (y === null || y.compareTo(E) > 0) && (y = E, d = x);
          }
          return d;
        }
      } }, { key: "extend", value: function(i, s, l) {
        var d = i.create(l, s.getDimension()), y = s.size();
        if (h.copy(s, 0, d, 0, y), y > 0) for (var x = y; x < l; x++) h.copy(s, y - 1, d, x, 1);
        return d;
      } }, { key: "reverse", value: function(i) {
        for (var s = i.size() - 1, l = Math.trunc(s / 2), d = 0; d <= l; d++) h.swap(i, d, s - d);
      } }, { key: "swap", value: function(i, s, l) {
        if (s === l) return null;
        for (var d = 0; d < i.getDimension(); d++) {
          var y = i.getOrdinate(s, d);
          i.setOrdinate(s, d, i.getOrdinate(l, d)), i.setOrdinate(l, d, y);
        }
      } }, { key: "copy", value: function(i, s, l, d, y) {
        for (var x = 0; x < y; x++) h.copyCoord(i, s + x, l, d + x);
      } }, { key: "ensureValidRing", value: function(i, s) {
        var l = s.size();
        return l === 0 ? s : l <= 3 ? h.createClosedRing(i, s, 4) : s.getOrdinate(0, Te.X) === s.getOrdinate(l - 1, Te.X) && s.getOrdinate(0, Te.Y) === s.getOrdinate(l - 1, Te.Y) ? s : h.createClosedRing(i, s, l + 1);
      } }, { key: "indexOf", value: function(i, s) {
        for (var l = 0; l < s.size(); l++) if (i.x === s.getOrdinate(l, Te.X) && i.y === s.getOrdinate(l, Te.Y)) return l;
        return -1;
      } }, { key: "createClosedRing", value: function(i, s, l) {
        var d = i.create(l, s.getDimension()), y = s.size();
        h.copy(s, 0, d, 0, y);
        for (var x = y; x < l; x++) h.copy(s, 0, d, x, 1);
        return d;
      } }, { key: "minCoordinate", value: function(i) {
        for (var s = null, l = 0; l < i.size(); l++) {
          var d = i.getCoordinate(l);
          (s === null || s.compareTo(d) > 0) && (s = d);
        }
        return s;
      } }]);
    }(), oe = function() {
      function h() {
        o(this, h);
      }
      return c(h, null, [{ key: "toDimensionSymbol", value: function(i) {
        switch (i) {
          case h.FALSE:
            return h.SYM_FALSE;
          case h.TRUE:
            return h.SYM_TRUE;
          case h.DONTCARE:
            return h.SYM_DONTCARE;
          case h.P:
            return h.SYM_P;
          case h.L:
            return h.SYM_L;
          case h.A:
            return h.SYM_A;
        }
        throw new O("Unknown dimension value: " + i);
      } }, { key: "toDimensionValue", value: function(i) {
        switch (Ls.toUpperCase(i)) {
          case h.SYM_FALSE:
            return h.FALSE;
          case h.SYM_TRUE:
            return h.TRUE;
          case h.SYM_DONTCARE:
            return h.DONTCARE;
          case h.SYM_P:
            return h.P;
          case h.SYM_L:
            return h.L;
          case h.SYM_A:
            return h.A;
        }
        throw new O("Unknown dimension symbol: " + i);
      } }]);
    }();
    oe.P = 0, oe.L = 1, oe.A = 2, oe.FALSE = -1, oe.TRUE = -2, oe.DONTCARE = -3, oe.SYM_FALSE = "F", oe.SYM_TRUE = "T", oe.SYM_DONTCARE = "*", oe.SYM_P = "0", oe.SYM_L = "1", oe.SYM_A = "2";
    var mi = function() {
      return c(function h() {
        o(this, h);
      }, [{ key: "filter", value: function(h) {
      } }]);
    }(), vi = function() {
      return c(function h() {
        o(this, h);
      }, [{ key: "filter", value: function(h, i) {
      } }, { key: "isDone", value: function() {
      } }, { key: "isGeometryChanged", value: function() {
      } }]);
    }(), _r = function(h) {
      function i() {
        var s;
        return o(this, i), s = r(this, i), i.constructor_.apply(s, arguments), s;
      }
      return m(i, h), c(i, [{ key: "computeEnvelopeInternal", value: function() {
        return this.isEmpty() ? new _e() : this._points.expandEnvelope(new _e());
      } }, { key: "isRing", value: function() {
        return this.isClosed() && this.isSimple();
      } }, { key: "getCoordinates", value: function() {
        return this._points.toCoordinateArray();
      } }, { key: "copyInternal", value: function() {
        return new i(this._points.copy(), this._factory);
      } }, { key: "equalsExact", value: function() {
        if (arguments.length === 2 && typeof arguments[1] == "number" && arguments[0] instanceof ae) {
          var s = arguments[0], l = arguments[1];
          if (!this.isEquivalentClass(s)) return !1;
          var d = s;
          if (this._points.size() !== d._points.size()) return !1;
          for (var y = 0; y < this._points.size(); y++) if (!this.equal(this._points.getCoordinate(y), d._points.getCoordinate(y), l)) return !1;
          return !0;
        }
        return w(i, "equalsExact", this, 1).apply(this, arguments);
      } }, { key: "normalize", value: function() {
        for (var s = 0; s < Math.trunc(this._points.size() / 2); s++) {
          var l = this._points.size() - 1 - s;
          if (!this._points.getCoordinate(s).equals(this._points.getCoordinate(l))) {
            if (this._points.getCoordinate(s).compareTo(this._points.getCoordinate(l)) > 0) {
              var d = this._points.copy();
              En.reverse(d), this._points = d;
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
        return En.reverse(s), this.getFactory().createLineString(s);
      } }, { key: "getEndPoint", value: function() {
        return this.isEmpty() ? null : this.getPointN(this.getNumPoints() - 1);
      } }, { key: "getTypeCode", value: function() {
        return ae.TYPECODE_LINESTRING;
      } }, { key: "getDimension", value: function() {
        return 1;
      } }, { key: "getLength", value: function() {
        return Zf.ofLine(this._points);
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
        if (Ee(arguments[0], di)) for (var s = arguments[0], l = 0; l < this._points.size(); l++) s.filter(this._points.getCoordinate(l));
        else if (Ee(arguments[0], vi)) {
          var d = arguments[0];
          if (this._points.size() === 0) return null;
          for (var y = 0; y < this._points.size() && (d.filter(this._points, y), !d.isDone()); y++) ;
          d.isGeometryChanged() && this.geometryChanged();
        } else Ee(arguments[0], mi) ? arguments[0].filter(this) : Ee(arguments[0], Y) && arguments[0].filter(this);
      } }, { key: "getBoundary", value: function() {
        throw new Ce();
      } }, { key: "isEquivalentClass", value: function(s) {
        return s instanceof i;
      } }, { key: "getCoordinateN", value: function(s) {
        return this._points.getCoordinate(s);
      } }, { key: "getGeometryType", value: function() {
        return ae.TYPENAME_LINESTRING;
      } }, { key: "getCoordinateSequence", value: function() {
        return this._points;
      } }, { key: "isEmpty", value: function() {
        return this._points.size() === 0;
      } }, { key: "init", value: function(s) {
        if (s === null && (s = this.getFactory().getCoordinateSequenceFactory().create([])), s.size() === 1) throw new O("Invalid number of points in LineString (found " + s.size() + " - must be 0 or >= 2)");
        this._points = s;
      } }, { key: "isCoordinate", value: function(s) {
        for (var l = 0; l < this._points.size(); l++) if (this._points.getCoordinate(l).equals(s)) return !0;
        return !1;
      } }, { key: "getStartPoint", value: function() {
        return this.isEmpty() ? null : this.getPointN(0);
      } }, { key: "getPointN", value: function(s) {
        return this.getFactory().createPoint(this._points.getCoordinate(s));
      } }, { key: "interfaces_", get: function() {
        return [La];
      } }], [{ key: "constructor_", value: function() {
        if (this._points = null, arguments.length !== 0) {
          if (arguments.length === 2) {
            var s = arguments[0], l = arguments[1];
            ae.constructor_.call(this, l), this.init(s);
          }
        }
      } }]);
    }(ae), Pa = c(function h() {
      o(this, h);
    }), Ts = function(h) {
      function i() {
        var s;
        return o(this, i), s = r(this, i), i.constructor_.apply(s, arguments), s;
      }
      return m(i, h), c(i, [{ key: "computeEnvelopeInternal", value: function() {
        if (this.isEmpty()) return new _e();
        var s = new _e();
        return s.expandToInclude(this._coordinates.getX(0), this._coordinates.getY(0)), s;
      } }, { key: "getCoordinates", value: function() {
        return this.isEmpty() ? [] : [this.getCoordinate()];
      } }, { key: "copyInternal", value: function() {
        return new i(this._coordinates.copy(), this._factory);
      } }, { key: "equalsExact", value: function() {
        if (arguments.length === 2 && typeof arguments[1] == "number" && arguments[0] instanceof ae) {
          var s = arguments[0], l = arguments[1];
          return !!this.isEquivalentClass(s) && (!(!this.isEmpty() || !s.isEmpty()) || this.isEmpty() === s.isEmpty() && this.equal(s.getCoordinate(), this.getCoordinate(), l));
        }
        return w(i, "equalsExact", this, 1).apply(this, arguments);
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
        if (Ee(arguments[0], di)) {
          var s = arguments[0];
          if (this.isEmpty()) return null;
          s.filter(this.getCoordinate());
        } else if (Ee(arguments[0], vi)) {
          var l = arguments[0];
          if (this.isEmpty()) return null;
          l.filter(this._coordinates, 0), l.isGeometryChanged() && this.geometryChanged();
        } else Ee(arguments[0], mi) ? arguments[0].filter(this) : Ee(arguments[0], Y) && arguments[0].filter(this);
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
        return [Pa];
      } }], [{ key: "constructor_", value: function() {
        this._coordinates = null;
        var s = arguments[0], l = arguments[1];
        ae.constructor_.call(this, l), this.init(s);
      } }]);
    }(ae), Na = function() {
      function h() {
        o(this, h);
      }
      return c(h, null, [{ key: "ofRing", value: function() {
        if (arguments[0] instanceof Array) {
          var i = arguments[0];
          return Math.abs(h.ofRingSigned(i));
        }
        if (Ee(arguments[0], Te)) {
          var s = arguments[0];
          return Math.abs(h.ofRingSigned(s));
        }
      } }, { key: "ofRingSigned", value: function() {
        if (arguments[0] instanceof Array) {
          var i = arguments[0];
          if (i.length < 3) return 0;
          for (var s = 0, l = i[0].x, d = 1; d < i.length - 1; d++) {
            var y = i[d].x - l, x = i[d + 1].y;
            s += y * (i[d - 1].y - x);
          }
          return s / 2;
        }
        if (Ee(arguments[0], Te)) {
          var E = arguments[0], P = E.size();
          if (P < 3) return 0;
          var F = new Z(), $ = new Z(), K = new Z();
          E.getCoordinate(0, $), E.getCoordinate(1, K);
          var ne = $.x;
          K.x -= ne;
          for (var ue = 0, he = 1; he < P - 1; he++) F.y = $.y, $.x = K.x, $.y = K.y, E.getCoordinate(he + 1, K), K.x -= ne, ue += $.x * (F.y - K.y);
          return ue / 2;
        }
      } }]);
    }(), Cn = function() {
      return c(function h() {
        o(this, h);
      }, null, [{ key: "sort", value: function() {
        var h = arguments, i = arguments[0];
        if (arguments.length === 1) i.sort(function(ne, ue) {
          return ne.compareTo(ue);
        });
        else if (arguments.length === 2) i.sort(function(ne, ue) {
          return h[1].compare(ne, ue);
        });
        else if (arguments.length === 3) {
          var s = i.slice(arguments[1], arguments[2]);
          s.sort();
          var l = i.slice(0, arguments[1]).concat(s, i.slice(arguments[2], i.length));
          i.splice(0, i.length);
          var d, y = f(l);
          try {
            for (y.s(); !(d = y.n()).done; ) {
              var x = d.value;
              i.push(x);
            }
          } catch (ne) {
            y.e(ne);
          } finally {
            y.f();
          }
        } else if (arguments.length === 4) {
          var E = i.slice(arguments[1], arguments[2]);
          E.sort(function(ne, ue) {
            return h[3].compare(ne, ue);
          });
          var P = i.slice(0, arguments[1]).concat(E, i.slice(arguments[2], i.length));
          i.splice(0, i.length);
          var F, $ = f(P);
          try {
            for ($.s(); !(F = $.n()).done; ) {
              var K = F.value;
              i.push(K);
            }
          } catch (ne) {
            $.e(ne);
          } finally {
            $.f();
          }
        }
      } }, { key: "asList", value: function(h) {
        var i, s = new ve(), l = f(h);
        try {
          for (l.s(); !(i = l.n()).done; ) {
            var d = i.value;
            s.add(d);
          }
        } catch (y) {
          l.e(y);
        } finally {
          l.f();
        }
        return s;
      } }, { key: "copyOf", value: function(h, i) {
        return h.slice(0, i);
      } }]);
    }(), Ta = c(function h() {
      o(this, h);
    }), yi = function(h) {
      function i() {
        var s;
        return o(this, i), s = r(this, i), i.constructor_.apply(s, arguments), s;
      }
      return m(i, h), c(i, [{ key: "computeEnvelopeInternal", value: function() {
        return this._shell.getEnvelopeInternal();
      } }, { key: "getCoordinates", value: function() {
        if (this.isEmpty()) return [];
        for (var s = new Array(this.getNumPoints()).fill(null), l = -1, d = this._shell.getCoordinates(), y = 0; y < d.length; y++) s[++l] = d[y];
        for (var x = 0; x < this._holes.length; x++) for (var E = this._holes[x].getCoordinates(), P = 0; P < E.length; P++) s[++l] = E[P];
        return s;
      } }, { key: "getArea", value: function() {
        var s = 0;
        s += Na.ofRing(this._shell.getCoordinateSequence());
        for (var l = 0; l < this._holes.length; l++) s -= Na.ofRing(this._holes[l].getCoordinateSequence());
        return s;
      } }, { key: "copyInternal", value: function() {
        for (var s = this._shell.copy(), l = new Array(this._holes.length).fill(null), d = 0; d < this._holes.length; d++) l[d] = this._holes[d].copy();
        return new i(s, l, this._factory);
      } }, { key: "isRectangle", value: function() {
        if (this.getNumInteriorRing() !== 0 || this._shell === null || this._shell.getNumPoints() !== 5) return !1;
        for (var s = this._shell.getCoordinateSequence(), l = this.getEnvelopeInternal(), d = 0; d < 5; d++) {
          var y = s.getX(d);
          if (y !== l.getMinX() && y !== l.getMaxX()) return !1;
          var x = s.getY(d);
          if (x !== l.getMinY() && x !== l.getMaxY()) return !1;
        }
        for (var E = s.getX(0), P = s.getY(0), F = 1; F <= 4; F++) {
          var $ = s.getX(F), K = s.getY(F);
          if ($ !== E == (K !== P)) return !1;
          E = $, P = K;
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
        return w(i, "equalsExact", this, 1).apply(this, arguments);
      } }, { key: "normalize", value: function() {
        if (arguments.length === 0) {
          this._shell = this.normalized(this._shell, !0);
          for (var s = 0; s < this._holes.length; s++) this._holes[s] = this.normalized(this._holes[s], !1);
          Cn.sort(this._holes);
        } else if (arguments.length === 2) {
          var l = arguments[0], d = arguments[1];
          if (l.isEmpty()) return null;
          var y = l.getCoordinateSequence(), x = En.minCoordinateIndex(y, 0, y.size() - 2);
          En.scroll(y, x, !0), we.isCCW(y) === d && En.reverse(y);
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
          var y = arguments[1], x = arguments[0], E = this._shell, P = x._shell, F = E.compareToSameClass(P, y);
          if (F !== 0) return F;
          for (var $ = this.getNumInteriorRing(), K = x.getNumInteriorRing(), ne = 0; ne < $ && ne < K; ) {
            var ue = this.getInteriorRingN(ne), he = x.getInteriorRingN(ne), ge = ue.compareToSameClass(he, y);
            if (ge !== 0) return ge;
            ne++;
          }
          return ne < $ ? 1 : ne < K ? -1 : 0;
        }
      } }, { key: "apply", value: function() {
        if (Ee(arguments[0], di)) {
          var s = arguments[0];
          this._shell.apply(s);
          for (var l = 0; l < this._holes.length; l++) this._holes[l].apply(s);
        } else if (Ee(arguments[0], vi)) {
          var d = arguments[0];
          if (this._shell.apply(d), !d.isDone()) for (var y = 0; y < this._holes.length && (this._holes[y].apply(d), !d.isDone()); y++) ;
          d.isGeometryChanged() && this.geometryChanged();
        } else if (Ee(arguments[0], mi))
          arguments[0].filter(this);
        else if (Ee(arguments[0], Y)) {
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
        return [Ta];
      } }], [{ key: "constructor_", value: function() {
        this._shell = null, this._holes = null;
        var s = arguments[0], l = arguments[1], d = arguments[2];
        if (ae.constructor_.call(this, d), s === null && (s = this.getFactory().createLinearRing()), l === null && (l = []), ae.hasNullElements(l)) throw new O("holes must not contain null elements");
        if (s.isEmpty() && ae.hasNonEmptyElements(l)) throw new O("shell is empty but holes are not");
        this._shell = s, this._holes = l;
      } }]);
    }(ae), Kf = function(h) {
      function i() {
        return o(this, i), r(this, i, arguments);
      }
      return m(i, h), c(i);
    }(pt), Ra = function(h) {
      function i(s) {
        var l;
        return o(this, i), (l = r(this, i)).array = [], s instanceof be && l.addAll(s), l;
      }
      return m(i, h), c(i, [{ key: "contains", value: function(s) {
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
        throw new Ce();
      } }, { key: "size", value: function() {
        return this.array.length;
      } }, { key: "isEmpty", value: function() {
        return this.array.length === 0;
      } }, { key: "toArray", value: function() {
        return this.array.slice();
      } }, { key: "iterator", value: function() {
        return new Jf(this.array);
      } }]);
    }(Kf), Jf = function() {
      return c(function h(i) {
        o(this, h), this.array = i, this.position = 0;
      }, [{ key: "next", value: function() {
        if (this.position === this.array.length) throw new Ne();
        return this.array[this.position++];
      } }, { key: "hasNext", value: function() {
        return this.position < this.array.length;
      } }, { key: "remove", value: function() {
        throw new Ce();
      } }]);
    }(), Et = function(h) {
      function i() {
        var s;
        return o(this, i), s = r(this, i), i.constructor_.apply(s, arguments), s;
      }
      return m(i, h), c(i, [{ key: "computeEnvelopeInternal", value: function() {
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
        return new i(s, this._factory);
      } }, { key: "equalsExact", value: function() {
        if (arguments.length === 2 && typeof arguments[1] == "number" && arguments[0] instanceof ae) {
          var s = arguments[0], l = arguments[1];
          if (!this.isEquivalentClass(s)) return !1;
          var d = s;
          if (this._geometries.length !== d._geometries.length) return !1;
          for (var y = 0; y < this._geometries.length; y++) if (!this._geometries[y].equalsExact(d._geometries[y], l)) return !1;
          return !0;
        }
        return w(i, "equalsExact", this, 1).apply(this, arguments);
      } }, { key: "normalize", value: function() {
        for (var s = 0; s < this._geometries.length; s++) this._geometries[s].normalize();
        Cn.sort(this._geometries);
      } }, { key: "getCoordinate", value: function() {
        return this.isEmpty() ? null : this._geometries[0].getCoordinate();
      } }, { key: "getBoundaryDimension", value: function() {
        for (var s = oe.FALSE, l = 0; l < this._geometries.length; l++) s = Math.max(s, this._geometries[l].getBoundaryDimension());
        return s;
      } }, { key: "reverseInternal", value: function() {
        for (var s = this._geometries.length, l = new ve(s), d = 0; d < s; d++) l.add(this._geometries[d].reverse());
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
          var s = arguments[0], l = new Ra(Cn.asList(this._geometries)), d = new Ra(Cn.asList(s._geometries));
          return this.compare(l, d);
        }
        if (arguments.length === 2) {
          for (var y = arguments[1], x = arguments[0], E = this.getNumGeometries(), P = x.getNumGeometries(), F = 0; F < E && F < P; ) {
            var $ = this.getGeometryN(F), K = x.getGeometryN(F), ne = $.compareToSameClass(K, y);
            if (ne !== 0) return ne;
            F++;
          }
          return F < E ? 1 : F < P ? -1 : 0;
        }
      } }, { key: "apply", value: function() {
        if (Ee(arguments[0], di)) for (var s = arguments[0], l = 0; l < this._geometries.length; l++) this._geometries[l].apply(s);
        else if (Ee(arguments[0], vi)) {
          var d = arguments[0];
          if (this._geometries.length === 0) return null;
          for (var y = 0; y < this._geometries.length && (this._geometries[y].apply(d), !d.isDone()); y++) ;
          d.isGeometryChanged() && this.geometryChanged();
        } else if (Ee(arguments[0], mi)) {
          var x = arguments[0];
          x.filter(this);
          for (var E = 0; E < this._geometries.length; E++) this._geometries[E].apply(x);
        } else if (Ee(arguments[0], Y)) {
          var P = arguments[0];
          P.filter(this);
          for (var F = 0; F < this._geometries.length; F++) this._geometries[F].apply(P);
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
            if (ae.constructor_.call(this, l), s === null && (s = []), ae.hasNullElements(s)) throw new O("geometries must not contain null elements");
            this._geometries = s;
          }
        }
      } }]);
    }(ae), Rs = function(h) {
      function i() {
        var s;
        return o(this, i), s = r(this, i), i.constructor_.apply(s, arguments), s;
      }
      return m(i, h), c(i, [{ key: "copyInternal", value: function() {
        for (var s = new Array(this._geometries.length).fill(null), l = 0; l < s.length; l++) s[l] = this._geometries[l].copy();
        return new i(s, this._factory);
      } }, { key: "isValid", value: function() {
        return !0;
      } }, { key: "equalsExact", value: function() {
        if (arguments.length === 2 && typeof arguments[1] == "number" && arguments[0] instanceof ae) {
          var s = arguments[0], l = arguments[1];
          return !!this.isEquivalentClass(s) && w(i, "equalsExact", this, 1).call(this, s, l);
        }
        return w(i, "equalsExact", this, 1).apply(this, arguments);
      } }, { key: "getCoordinate", value: function() {
        if (arguments.length === 1 && Number.isInteger(arguments[0])) {
          var s = arguments[0];
          return this._geometries[s].getCoordinate();
        }
        return w(i, "getCoordinate", this, 1).apply(this, arguments);
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
        return [Pa];
      } }], [{ key: "constructor_", value: function() {
        var s = arguments[0], l = arguments[1];
        Et.constructor_.call(this, s, l);
      } }]);
    }(Et), wr = function(h) {
      function i() {
        var s;
        return o(this, i), s = r(this, i), i.constructor_.apply(s, arguments), s;
      }
      return m(i, h), c(i, [{ key: "copyInternal", value: function() {
        return new i(this._points.copy(), this._factory);
      } }, { key: "getBoundaryDimension", value: function() {
        return oe.FALSE;
      } }, { key: "isClosed", value: function() {
        return !!this.isEmpty() || w(i, "isClosed", this, 1).call(this);
      } }, { key: "reverseInternal", value: function() {
        var s = this._points.copy();
        return En.reverse(s), this.getFactory().createLinearRing(s);
      } }, { key: "getTypeCode", value: function() {
        return ae.TYPECODE_LINEARRING;
      } }, { key: "validateConstruction", value: function() {
        if (!this.isEmpty() && !w(i, "isClosed", this, 1).call(this)) throw new O("Points of LinearRing do not form a closed linestring");
        if (this.getCoordinateSequence().size() >= 1 && this.getCoordinateSequence().size() < i.MINIMUM_VALID_SIZE) throw new O("Invalid number of points in LinearRing (found " + this.getCoordinateSequence().size() + " - must be 0 or >= 4)");
      } }, { key: "getGeometryType", value: function() {
        return ae.TYPENAME_LINEARRING;
      } }], [{ key: "constructor_", value: function() {
        var s = arguments[0], l = arguments[1];
        _r.constructor_.call(this, s, l), this.validateConstruction();
      } }]);
    }(_r);
    wr.MINIMUM_VALID_SIZE = 4;
    var kn = function(h) {
      function i() {
        var s;
        return o(this, i), s = r(this, i), i.constructor_.apply(s, arguments), s;
      }
      return m(i, h), c(i, [{ key: "setOrdinate", value: function(s, l) {
        switch (s) {
          case i.X:
            this.x = l;
            break;
          case i.Y:
            this.y = l;
            break;
          default:
            throw new O("Invalid ordinate index: " + s);
        }
      } }, { key: "getZ", value: function() {
        return Z.NULL_ORDINATE;
      } }, { key: "getOrdinate", value: function(s) {
        switch (s) {
          case i.X:
            return this.x;
          case i.Y:
            return this.y;
        }
        throw new O("Invalid ordinate index: " + s);
      } }, { key: "setZ", value: function(s) {
        throw new O("CoordinateXY dimension 2 does not support z-ordinate");
      } }, { key: "copy", value: function() {
        return new i(this);
      } }, { key: "toString", value: function() {
        return "(" + this.x + ", " + this.y + ")";
      } }, { key: "setCoordinate", value: function(s) {
        this.x = s.x, this.y = s.y, this.z = s.getZ();
      } }], [{ key: "constructor_", value: function() {
        if (arguments.length === 0) Z.constructor_.call(this);
        else if (arguments.length === 1) {
          if (arguments[0] instanceof i) {
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
    kn.X = 0, kn.Y = 1, kn.Z = -1, kn.M = -1;
    var In = function(h) {
      function i() {
        var s;
        return o(this, i), s = r(this, i), i.constructor_.apply(s, arguments), s;
      }
      return m(i, h), c(i, [{ key: "getM", value: function() {
        return this._m;
      } }, { key: "setOrdinate", value: function(s, l) {
        switch (s) {
          case i.X:
            this.x = l;
            break;
          case i.Y:
            this.y = l;
            break;
          case i.M:
            this._m = l;
            break;
          default:
            throw new O("Invalid ordinate index: " + s);
        }
      } }, { key: "setM", value: function(s) {
        this._m = s;
      } }, { key: "getZ", value: function() {
        return Z.NULL_ORDINATE;
      } }, { key: "getOrdinate", value: function(s) {
        switch (s) {
          case i.X:
            return this.x;
          case i.Y:
            return this.y;
          case i.M:
            return this._m;
        }
        throw new O("Invalid ordinate index: " + s);
      } }, { key: "setZ", value: function(s) {
        throw new O("CoordinateXY dimension 2 does not support z-ordinate");
      } }, { key: "copy", value: function() {
        return new i(this);
      } }, { key: "toString", value: function() {
        return "(" + this.x + ", " + this.y + " m=" + this.getM() + ")";
      } }, { key: "setCoordinate", value: function(s) {
        this.x = s.x, this.y = s.y, this.z = s.getZ(), this._m = s.getM();
      } }], [{ key: "constructor_", value: function() {
        if (this._m = null, arguments.length === 0) Z.constructor_.call(this), this._m = 0;
        else if (arguments.length === 1) {
          if (arguments[0] instanceof i) {
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
    In.X = 0, In.Y = 1, In.Z = -1, In.M = 2;
    var As = function(h) {
      function i() {
        var s;
        return o(this, i), s = r(this, i), i.constructor_.apply(s, arguments), s;
      }
      return m(i, h), c(i, [{ key: "getM", value: function() {
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
            throw new O("Invalid ordinate index: " + s);
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
        throw new O("Invalid ordinate index: " + s);
      } }, { key: "copy", value: function() {
        return new i(this);
      } }, { key: "toString", value: function() {
        return "(" + this.x + ", " + this.y + ", " + this.getZ() + " m=" + this.getM() + ")";
      } }, { key: "setCoordinate", value: function(s) {
        this.x = s.x, this.y = s.y, this.z = s.getZ(), this._m = s.getM();
      } }], [{ key: "constructor_", value: function() {
        if (this._m = null, arguments.length === 0) Z.constructor_.call(this), this._m = 0;
        else if (arguments.length === 1) {
          if (arguments[0] instanceof i) {
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
    }(Z), pi = function() {
      function h() {
        o(this, h);
      }
      return c(h, null, [{ key: "measures", value: function(i) {
        return i instanceof kn ? 0 : i instanceof In || i instanceof As ? 1 : 0;
      } }, { key: "dimension", value: function(i) {
        return i instanceof kn ? 2 : i instanceof In ? 3 : i instanceof As ? 4 : 3;
      } }, { key: "create", value: function() {
        if (arguments.length === 1) {
          var i = arguments[0];
          return h.create(i, 0);
        }
        if (arguments.length === 2) {
          var s = arguments[0], l = arguments[1];
          return s === 2 ? new kn() : s === 3 && l === 0 ? new Z() : s === 3 && l === 1 ? new In() : s === 4 && l === 1 ? new As() : new Z();
        }
      } }]);
    }(), xr = function(h) {
      function i() {
        var s;
        return o(this, i), s = r(this, i), i.constructor_.apply(s, arguments), s;
      }
      return m(i, h), c(i, [{ key: "getCoordinate", value: function(s) {
        return this.get(s);
      } }, { key: "addAll", value: function() {
        if (arguments.length === 2 && typeof arguments[1] == "boolean" && Ee(arguments[0], be)) {
          for (var s = arguments[1], l = !1, d = arguments[0].iterator(); d.hasNext(); ) this.add(d.next(), s), l = !0;
          return l;
        }
        return w(i, "addAll", this, 1).apply(this, arguments);
      } }, { key: "clone", value: function() {
        for (var s = w(i, "clone", this, 1).call(this), l = 0; l < this.size(); l++) s.add(l, this.get(l).clone());
        return s;
      } }, { key: "toCoordinateArray", value: function() {
        if (arguments.length === 0) return this.toArray(i.coordArrayType);
        if (arguments.length === 1) {
          if (arguments[0]) return this.toArray(i.coordArrayType);
          for (var s = this.size(), l = new Array(s).fill(null), d = 0; d < s; d++) l[d] = this.get(s - d - 1);
          return l;
        }
      } }, { key: "add", value: function() {
        if (arguments.length === 1) {
          var s = arguments[0];
          return w(i, "add", this, 1).call(this, s);
        }
        if (arguments.length === 2) {
          if (arguments[0] instanceof Array && typeof arguments[1] == "boolean") {
            var l = arguments[0], d = arguments[1];
            return this.add(l, d, !0), !0;
          }
          if (arguments[0] instanceof Z && typeof arguments[1] == "boolean") {
            var y = arguments[0];
            if (!arguments[1] && this.size() >= 1 && this.get(this.size() - 1).equals2D(y)) return null;
            w(i, "add", this, 1).call(this, y);
          } else if (arguments[0] instanceof Object && typeof arguments[1] == "boolean") {
            var x = arguments[0], E = arguments[1];
            return this.add(x, E), !0;
          }
        } else if (arguments.length === 3) {
          if (typeof arguments[2] == "boolean" && arguments[0] instanceof Array && typeof arguments[1] == "boolean") {
            var P = arguments[0], F = arguments[1];
            if (arguments[2]) for (var $ = 0; $ < P.length; $++) this.add(P[$], F);
            else for (var K = P.length - 1; K >= 0; K--) this.add(P[K], F);
            return !0;
          }
          if (typeof arguments[2] == "boolean" && Number.isInteger(arguments[0]) && arguments[1] instanceof Z) {
            var ne = arguments[0], ue = arguments[1];
            if (!arguments[2]) {
              var he = this.size();
              if (he > 0 && (ne > 0 && this.get(ne - 1).equals2D(ue) || ne < he && this.get(ne).equals2D(ue)))
                return null;
            }
            w(i, "add", this, 1).call(this, ne, ue);
          }
        } else if (arguments.length === 4) {
          var ge = arguments[0], Re = arguments[1], Pe = arguments[2], Ue = arguments[3], st = 1;
          Pe > Ue && (st = -1);
          for (var ut = Pe; ut !== Ue; ut += st) this.add(ge[ut], Re);
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
    }(ve);
    xr.coordArrayType = new Array(0).fill(null);
    var tt = function() {
      function h() {
        o(this, h);
      }
      return c(h, null, [{ key: "isRing", value: function(i) {
        return !(i.length < 4) && !!i[0].equals2D(i[i.length - 1]);
      } }, { key: "ptNotInList", value: function(i, s) {
        for (var l = 0; l < i.length; l++) {
          var d = i[l];
          if (h.indexOf(d, s) < 0) return d;
        }
        return null;
      } }, { key: "scroll", value: function(i, s) {
        var l = h.indexOf(s, i);
        if (l < 0) return null;
        var d = new Array(i.length).fill(null);
        bt.arraycopy(i, l, d, 0, i.length - l), bt.arraycopy(i, 0, d, i.length - l, l), bt.arraycopy(d, 0, i, 0, i.length);
      } }, { key: "equals", value: function() {
        if (arguments.length === 2) {
          var i = arguments[0], s = arguments[1];
          if (i === s) return !0;
          if (i === null || s === null || i.length !== s.length) return !1;
          for (var l = 0; l < i.length; l++) if (!i[l].equals(s[l])) return !1;
          return !0;
        }
        if (arguments.length === 3) {
          var d = arguments[0], y = arguments[1], x = arguments[2];
          if (d === y) return !0;
          if (d === null || y === null || d.length !== y.length) return !1;
          for (var E = 0; E < d.length; E++) if (x.compare(d[E], y[E]) !== 0) return !1;
          return !0;
        }
      } }, { key: "intersection", value: function(i, s) {
        for (var l = new xr(), d = 0; d < i.length; d++) s.intersects(i[d]) && l.add(i[d], !0);
        return l.toCoordinateArray();
      } }, { key: "measures", value: function(i) {
        if (i === null || i.length === 0) return 0;
        var s, l = 0, d = f(i);
        try {
          for (d.s(); !(s = d.n()).done; ) {
            var y = s.value;
            l = Math.max(l, pi.measures(y));
          }
        } catch (x) {
          d.e(x);
        } finally {
          d.f();
        }
        return l;
      } }, { key: "hasRepeatedPoints", value: function(i) {
        for (var s = 1; s < i.length; s++) if (i[s - 1].equals(i[s])) return !0;
        return !1;
      } }, { key: "removeRepeatedPoints", value: function(i) {
        return h.hasRepeatedPoints(i) ? new xr(i, !1).toCoordinateArray() : i;
      } }, { key: "reverse", value: function(i) {
        for (var s = i.length - 1, l = Math.trunc(s / 2), d = 0; d <= l; d++) {
          var y = i[d];
          i[d] = i[s - d], i[s - d] = y;
        }
      } }, { key: "removeNull", value: function(i) {
        for (var s = 0, l = 0; l < i.length; l++) i[l] !== null && s++;
        var d = new Array(s).fill(null);
        if (s === 0) return d;
        for (var y = 0, x = 0; x < i.length; x++) i[x] !== null && (d[y++] = i[x]);
        return d;
      } }, { key: "copyDeep", value: function() {
        if (arguments.length === 1) {
          for (var i = arguments[0], s = new Array(i.length).fill(null), l = 0; l < i.length; l++) s[l] = i[l].copy();
          return s;
        }
        if (arguments.length === 5) for (var d = arguments[0], y = arguments[1], x = arguments[2], E = arguments[3], P = arguments[4], F = 0; F < P; F++) x[E + F] = d[y + F].copy();
      } }, { key: "isEqualReversed", value: function(i, s) {
        for (var l = 0; l < i.length; l++) {
          var d = i[l], y = s[i.length - l - 1];
          if (d.compareTo(y) !== 0) return !1;
        }
        return !0;
      } }, { key: "envelope", value: function(i) {
        for (var s = new _e(), l = 0; l < i.length; l++) s.expandToInclude(i[l]);
        return s;
      } }, { key: "toCoordinateArray", value: function(i) {
        return i.toArray(h.coordArrayType);
      } }, { key: "dimension", value: function(i) {
        if (i === null || i.length === 0) return 3;
        var s, l = 0, d = f(i);
        try {
          for (d.s(); !(s = d.n()).done; ) {
            var y = s.value;
            l = Math.max(l, pi.dimension(y));
          }
        } catch (x) {
          d.e(x);
        } finally {
          d.f();
        }
        return l;
      } }, { key: "atLeastNCoordinatesOrNothing", value: function(i, s) {
        return s.length >= i ? s : [];
      } }, { key: "indexOf", value: function(i, s) {
        for (var l = 0; l < s.length; l++) if (i.equals(s[l])) return l;
        return -1;
      } }, { key: "increasingDirection", value: function(i) {
        for (var s = 0; s < Math.trunc(i.length / 2); s++) {
          var l = i.length - 1 - s, d = i[s].compareTo(i[l]);
          if (d !== 0) return d;
        }
        return 1;
      } }, { key: "compare", value: function(i, s) {
        for (var l = 0; l < i.length && l < s.length; ) {
          var d = i[l].compareTo(s[l]);
          if (d !== 0) return d;
          l++;
        }
        return l < s.length ? -1 : l < i.length ? 1 : 0;
      } }, { key: "minCoordinate", value: function(i) {
        for (var s = null, l = 0; l < i.length; l++) (s === null || s.compareTo(i[l]) > 0) && (s = i[l]);
        return s;
      } }, { key: "extract", value: function(i, s, l) {
        s = pr.clamp(s, 0, i.length);
        var d = (l = pr.clamp(l, -1, i.length)) - s + 1;
        l < 0 && (d = 0), s >= i.length && (d = 0), l < s && (d = 0);
        var y = new Array(d).fill(null);
        if (d === 0) return y;
        for (var x = 0, E = s; E <= l; E++) y[x++] = i[E];
        return y;
      } }]);
    }(), Qf = function() {
      return c(function h() {
        o(this, h);
      }, [{ key: "compare", value: function(h, i) {
        var s = h, l = i;
        return tt.compare(s, l);
      } }, { key: "interfaces_", get: function() {
        return [j];
      } }]);
    }(), jf = function() {
      return c(function h() {
        o(this, h);
      }, [{ key: "compare", value: function(h, i) {
        var s = h, l = i;
        if (s.length < l.length) return -1;
        if (s.length > l.length) return 1;
        if (s.length === 0) return 0;
        var d = tt.compare(s, l);
        return tt.isEqualReversed(s, l) ? 0 : d;
      } }, { key: "OLDcompare", value: function(h, i) {
        var s = h, l = i;
        if (s.length < l.length) return -1;
        if (s.length > l.length) return 1;
        if (s.length === 0) return 0;
        for (var d = tt.increasingDirection(s), y = tt.increasingDirection(l), x = d > 0 ? 0 : s.length - 1, E = y > 0 ? 0 : s.length - 1, P = 0; P < s.length; P++) {
          var F = s[x].compareTo(l[E]);
          if (F !== 0) return F;
          x += d, E += y;
        }
        return 0;
      } }, { key: "interfaces_", get: function() {
        return [j];
      } }]);
    }();
    tt.ForwardComparator = Qf, tt.BidirectionalComparator = jf, tt.coordArrayType = new Array(0).fill(null);
    var _i = function() {
      return c(function h(i) {
        o(this, h), this.str = i;
      }, [{ key: "append", value: function(h) {
        this.str += h;
      } }, { key: "setCharAt", value: function(h, i) {
        this.str = this.str.substr(0, h) + i + this.str.substr(h + 1);
      } }, { key: "toString", value: function() {
        return this.str;
      } }]);
    }(), Er = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "getM", value: function(i) {
        return this.hasM() ? this._coordinates[i].getM() : W.NaN;
      } }, { key: "setOrdinate", value: function(i, s, l) {
        switch (s) {
          case Te.X:
            this._coordinates[i].x = l;
            break;
          case Te.Y:
            this._coordinates[i].y = l;
            break;
          default:
            this._coordinates[i].setOrdinate(s, l);
        }
      } }, { key: "getZ", value: function(i) {
        return this.hasZ() ? this._coordinates[i].getZ() : W.NaN;
      } }, { key: "size", value: function() {
        return this._coordinates.length;
      } }, { key: "getOrdinate", value: function(i, s) {
        switch (s) {
          case Te.X:
            return this._coordinates[i].x;
          case Te.Y:
            return this._coordinates[i].y;
          default:
            return this._coordinates[i].getOrdinate(s);
        }
      } }, { key: "getCoordinate", value: function() {
        if (arguments.length === 1) {
          var i = arguments[0];
          return this._coordinates[i];
        }
        if (arguments.length === 2) {
          var s = arguments[0];
          arguments[1].setCoordinate(this._coordinates[s]);
        }
      } }, { key: "getCoordinateCopy", value: function(i) {
        var s = this.createCoordinate();
        return s.setCoordinate(this._coordinates[i]), s;
      } }, { key: "createCoordinate", value: function() {
        return pi.create(this.getDimension(), this.getMeasures());
      } }, { key: "getDimension", value: function() {
        return this._dimension;
      } }, { key: "getX", value: function(i) {
        return this._coordinates[i].x;
      } }, { key: "getMeasures", value: function() {
        return this._measures;
      } }, { key: "expandEnvelope", value: function(i) {
        for (var s = 0; s < this._coordinates.length; s++) i.expandToInclude(this._coordinates[s]);
        return i;
      } }, { key: "copy", value: function() {
        for (var i = new Array(this.size()).fill(null), s = 0; s < this._coordinates.length; s++) {
          var l = this.createCoordinate();
          l.setCoordinate(this._coordinates[s]), i[s] = l;
        }
        return new h(i, this._dimension, this._measures);
      } }, { key: "toString", value: function() {
        if (this._coordinates.length > 0) {
          var i = new _i(17 * this._coordinates.length);
          i.append("("), i.append(this._coordinates[0]);
          for (var s = 1; s < this._coordinates.length; s++) i.append(", "), i.append(this._coordinates[s]);
          return i.append(")"), i.toString();
        }
        return "()";
      } }, { key: "getY", value: function(i) {
        return this._coordinates[i].y;
      } }, { key: "toCoordinateArray", value: function() {
        return this._coordinates;
      } }, { key: "interfaces_", get: function() {
        return [Te, M];
      } }], [{ key: "constructor_", value: function() {
        if (this._dimension = 3, this._measures = 0, this._coordinates = null, arguments.length === 1) {
          if (arguments[0] instanceof Array) {
            var i = arguments[0];
            h.constructor_.call(this, i, tt.dimension(i), tt.measures(i));
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
            h.constructor_.call(this, x, E, tt.measures(x));
          } else if (Number.isInteger(arguments[0]) && Number.isInteger(arguments[1])) {
            var P = arguments[0], F = arguments[1];
            this._coordinates = new Array(P).fill(null), this._dimension = F;
            for (var $ = 0; $ < P; $++) this._coordinates[$] = pi.create(F);
          }
        } else if (arguments.length === 3) {
          if (Number.isInteger(arguments[2]) && arguments[0] instanceof Array && Number.isInteger(arguments[1])) {
            var K = arguments[0], ne = arguments[1], ue = arguments[2];
            this._dimension = ne, this._measures = ue, this._coordinates = K === null ? new Array(0).fill(null) : K;
          } else if (Number.isInteger(arguments[2]) && Number.isInteger(arguments[0]) && Number.isInteger(arguments[1])) {
            var he = arguments[0], ge = arguments[1], Re = arguments[2];
            this._coordinates = new Array(he).fill(null), this._dimension = ge, this._measures = Re;
            for (var Pe = 0; Pe < he; Pe++) this._coordinates[Pe] = this.createCoordinate();
          }
        }
      } }]);
    }(), Os = function() {
      function h() {
        o(this, h);
      }
      return c(h, [{ key: "readResolve", value: function() {
        return h.instance();
      } }, { key: "create", value: function() {
        if (arguments.length === 1) {
          if (arguments[0] instanceof Array) return new Er(arguments[0]);
          if (Ee(arguments[0], Te)) return new Er(arguments[0]);
        } else {
          if (arguments.length === 2) {
            var i = arguments[1];
            return i > 3 && (i = 3), i < 2 && (i = 2), new Er(arguments[0], i);
          }
          if (arguments.length === 3) {
            var s = arguments[2], l = arguments[1] - s;
            return s > 1 && (s = 1), l > 3 && (l = 3), l < 2 && (l = 2), new Er(arguments[0], l + s, s);
          }
        }
      } }, { key: "interfaces_", get: function() {
        return [Ma, M];
      } }], [{ key: "instance", value: function() {
        return h.instanceObject;
      } }]);
    }();
    Os.instanceObject = new Os();
    var Ds = function(h) {
      function i() {
        var s;
        return o(this, i), s = r(this, i), i.constructor_.apply(s, arguments), s;
      }
      return m(i, h), c(i, [{ key: "copyInternal", value: function() {
        for (var s = new Array(this._geometries.length).fill(null), l = 0; l < s.length; l++) s[l] = this._geometries[l].copy();
        return new i(s, this._factory);
      } }, { key: "equalsExact", value: function() {
        if (arguments.length === 2 && typeof arguments[1] == "number" && arguments[0] instanceof ae) {
          var s = arguments[0], l = arguments[1];
          return !!this.isEquivalentClass(s) && w(i, "equalsExact", this, 1).call(this, s, l);
        }
        return w(i, "equalsExact", this, 1).apply(this, arguments);
      } }, { key: "getBoundaryDimension", value: function() {
        return 1;
      } }, { key: "getTypeCode", value: function() {
        return ae.TYPECODE_MULTIPOLYGON;
      } }, { key: "getDimension", value: function() {
        return 2;
      } }, { key: "getBoundary", value: function() {
        if (this.isEmpty()) return this.getFactory().createMultiLineString();
        for (var s = new ve(), l = 0; l < this._geometries.length; l++) for (var d = this._geometries[l].getBoundary(), y = 0; y < d.getNumGeometries(); y++) s.add(d.getGeometryN(y));
        var x = new Array(s.size()).fill(null);
        return this.getFactory().createMultiLineString(s.toArray(x));
      } }, { key: "getGeometryType", value: function() {
        return ae.TYPENAME_MULTIPOLYGON;
      } }, { key: "interfaces_", get: function() {
        return [Ta];
      } }], [{ key: "constructor_", value: function() {
        var s = arguments[0], l = arguments[1];
        Et.constructor_.call(this, s, l);
      } }]);
    }(Et), Aa = function() {
      return c(function h() {
        o(this, h);
      }, [{ key: "get", value: function() {
      } }, { key: "put", value: function() {
      } }, { key: "size", value: function() {
      } }, { key: "values", value: function() {
      } }, { key: "entrySet", value: function() {
      } }]);
    }(), eg = function(h) {
      function i() {
        var s;
        return o(this, i), (s = r(this, i)).map = /* @__PURE__ */ new Map(), s;
      }
      return m(i, h), c(i, [{ key: "get", value: function(s) {
        return this.map.get(s) || null;
      } }, { key: "put", value: function(s, l) {
        return this.map.set(s, l), l;
      } }, { key: "values", value: function() {
        for (var s = new ve(), l = this.map.values(), d = l.next(); !d.done; ) s.add(d.value), d = l.next();
        return s;
      } }, { key: "entrySet", value: function() {
        var s = new gt();
        return this.map.entries().forEach(function(l) {
          return s.add(l);
        }), s;
      } }, { key: "size", value: function() {
        return this.map.size();
      } }]);
    }(Aa), Bt = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "equals", value: function(i) {
        if (!(i instanceof h)) return !1;
        var s = i;
        return this._modelType === s._modelType && this._scale === s._scale;
      } }, { key: "compareTo", value: function(i) {
        var s = i, l = this.getMaximumSignificantDigits(), d = s.getMaximumSignificantDigits();
        return mn.compare(l, d);
      } }, { key: "getScale", value: function() {
        return this._scale;
      } }, { key: "isFloating", value: function() {
        return this._modelType === h.FLOATING || this._modelType === h.FLOATING_SINGLE;
      } }, { key: "getType", value: function() {
        return this._modelType;
      } }, { key: "toString", value: function() {
        var i = "UNKNOWN";
        return this._modelType === h.FLOATING ? i = "Floating" : this._modelType === h.FLOATING_SINGLE ? i = "Floating-Single" : this._modelType === h.FIXED && (i = "Fixed (Scale=" + this.getScale() + ")"), i;
      } }, { key: "makePrecise", value: function() {
        if (typeof arguments[0] == "number") {
          var i = arguments[0];
          return W.isNaN(i) || this._modelType === h.FLOATING_SINGLE ? i : this._modelType === h.FIXED ? Math.round(i * this._scale) / this._scale : i;
        }
        if (arguments[0] instanceof Z) {
          var s = arguments[0];
          if (this._modelType === h.FLOATING) return null;
          s.x = this.makePrecise(s.x), s.y = this.makePrecise(s.y);
        }
      } }, { key: "getMaximumSignificantDigits", value: function() {
        var i = 16;
        return this._modelType === h.FLOATING ? i = 16 : this._modelType === h.FLOATING_SINGLE ? i = 6 : this._modelType === h.FIXED && (i = 1 + Math.trunc(Math.ceil(Math.log(this.getScale()) / Math.log(10)))), i;
      } }, { key: "setScale", value: function(i) {
        this._scale = Math.abs(i);
      } }, { key: "interfaces_", get: function() {
        return [M, V];
      } }], [{ key: "constructor_", value: function() {
        if (this._modelType = null, this._scale = null, arguments.length === 0) this._modelType = h.FLOATING;
        else if (arguments.length === 1) {
          if (arguments[0] instanceof qn) {
            var i = arguments[0];
            this._modelType = i, i === h.FIXED && this.setScale(1);
          } else if (typeof arguments[0] == "number") {
            var s = arguments[0];
            this._modelType = h.FIXED, this.setScale(s);
          } else if (arguments[0] instanceof h) {
            var l = arguments[0];
            this._modelType = l._modelType, this._scale = l._scale;
          }
        }
      } }, { key: "mostPrecise", value: function(i, s) {
        return i.compareTo(s) >= 0 ? i : s;
      } }]);
    }(), qn = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "readResolve", value: function() {
        return h.nameToTypeMap.get(this._name);
      } }, { key: "toString", value: function() {
        return this._name;
      } }, { key: "interfaces_", get: function() {
        return [M];
      } }], [{ key: "constructor_", value: function() {
        this._name = null;
        var i = arguments[0];
        this._name = i, h.nameToTypeMap.put(i, this);
      } }]);
    }();
    qn.nameToTypeMap = new eg(), Bt.Type = qn, Bt.FIXED = new qn("FIXED"), Bt.FLOATING = new qn("FLOATING"), Bt.FLOATING_SINGLE = new qn("FLOATING SINGLE"), Bt.maximumPreciseValue = 9007199254740992;
    var Fs = function(h) {
      function i() {
        var s;
        return o(this, i), s = r(this, i), i.constructor_.apply(s, arguments), s;
      }
      return m(i, h), c(i, [{ key: "copyInternal", value: function() {
        for (var s = new Array(this._geometries.length).fill(null), l = 0; l < s.length; l++) s[l] = this._geometries[l].copy();
        return new i(s, this._factory);
      } }, { key: "equalsExact", value: function() {
        if (arguments.length === 2 && typeof arguments[1] == "number" && arguments[0] instanceof ae) {
          var s = arguments[0], l = arguments[1];
          return !!this.isEquivalentClass(s) && w(i, "equalsExact", this, 1).call(this, s, l);
        }
        return w(i, "equalsExact", this, 1).apply(this, arguments);
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
        throw new Ce();
      } }, { key: "getGeometryType", value: function() {
        return ae.TYPENAME_MULTILINESTRING;
      } }, { key: "interfaces_", get: function() {
        return [La];
      } }], [{ key: "constructor_", value: function() {
        var s = arguments[0], l = arguments[1];
        Et.constructor_.call(this, s, l);
      } }]);
    }(Et), zn = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "createEmpty", value: function(i) {
        switch (i) {
          case -1:
            return this.createGeometryCollection();
          case 0:
            return this.createPoint();
          case 1:
            return this.createLineString();
          case 2:
            return this.createPolygon();
          default:
            throw new O("Invalid dimension: " + i);
        }
      } }, { key: "toGeometry", value: function(i) {
        return i.isNull() ? this.createPoint() : i.getMinX() === i.getMaxX() && i.getMinY() === i.getMaxY() ? this.createPoint(new Z(i.getMinX(), i.getMinY())) : i.getMinX() === i.getMaxX() || i.getMinY() === i.getMaxY() ? this.createLineString([new Z(i.getMinX(), i.getMinY()), new Z(i.getMaxX(), i.getMaxY())]) : this.createPolygon(this.createLinearRing([new Z(i.getMinX(), i.getMinY()), new Z(i.getMinX(), i.getMaxY()), new Z(i.getMaxX(), i.getMaxY()), new Z(i.getMaxX(), i.getMinY()), new Z(i.getMinX(), i.getMinY())]), null);
      } }, { key: "createLineString", value: function() {
        if (arguments.length === 0) return this.createLineString(this.getCoordinateSequenceFactory().create([]));
        if (arguments.length === 1) {
          if (arguments[0] instanceof Array) {
            var i = arguments[0];
            return this.createLineString(i !== null ? this.getCoordinateSequenceFactory().create(i) : null);
          }
          if (Ee(arguments[0], Te)) return new _r(arguments[0], this);
        }
      } }, { key: "createMultiLineString", value: function() {
        return arguments.length === 0 ? new Fs(null, this) : arguments.length === 1 ? new Fs(arguments[0], this) : void 0;
      } }, { key: "buildGeometry", value: function(i) {
        for (var s = null, l = !1, d = !1, y = i.iterator(); y.hasNext(); ) {
          var x = y.next(), E = x.getTypeCode();
          s === null && (s = E), E !== s && (l = !0), x instanceof Et && (d = !0);
        }
        if (s === null) return this.createGeometryCollection();
        if (l || d) return this.createGeometryCollection(h.toGeometryArray(i));
        var P = i.iterator().next();
        if (i.size() > 1) {
          if (P instanceof yi) return this.createMultiPolygon(h.toPolygonArray(i));
          if (P instanceof _r) return this.createMultiLineString(h.toLineStringArray(i));
          if (P instanceof Ts) return this.createMultiPoint(h.toPointArray(i));
          ee.shouldNeverReachHere("Unhandled geometry type: " + P.getGeometryType());
        }
        return P;
      } }, { key: "createMultiPointFromCoords", value: function(i) {
        return this.createMultiPoint(i !== null ? this.getCoordinateSequenceFactory().create(i) : null);
      } }, { key: "createPoint", value: function() {
        if (arguments.length === 0) return this.createPoint(this.getCoordinateSequenceFactory().create([]));
        if (arguments.length === 1) {
          if (arguments[0] instanceof Z) {
            var i = arguments[0];
            return this.createPoint(i !== null ? this.getCoordinateSequenceFactory().create([i]) : null);
          }
          if (Ee(arguments[0], Te)) return new Ts(arguments[0], this);
        }
      } }, { key: "getCoordinateSequenceFactory", value: function() {
        return this._coordinateSequenceFactory;
      } }, { key: "createPolygon", value: function() {
        if (arguments.length === 0) return this.createPolygon(null, null);
        if (arguments.length === 1) {
          if (Ee(arguments[0], Te)) {
            var i = arguments[0];
            return this.createPolygon(this.createLinearRing(i));
          }
          if (arguments[0] instanceof Array) {
            var s = arguments[0];
            return this.createPolygon(this.createLinearRing(s));
          }
          if (arguments[0] instanceof wr) {
            var l = arguments[0];
            return this.createPolygon(l, null);
          }
        } else if (arguments.length === 2)
          return new yi(arguments[0], arguments[1], this);
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
            var i = arguments[0];
            return this.createLinearRing(i !== null ? this.getCoordinateSequenceFactory().create(i) : null);
          }
          if (Ee(arguments[0], Te)) return new wr(arguments[0], this);
        }
      } }, { key: "createMultiPolygon", value: function() {
        return arguments.length === 0 ? new Ds(null, this) : arguments.length === 1 ? new Ds(arguments[0], this) : void 0;
      } }, { key: "createMultiPoint", value: function() {
        if (arguments.length === 0) return new Rs(null, this);
        if (arguments.length === 1) {
          if (arguments[0] instanceof Array) return new Rs(arguments[0], this);
          if (Ee(arguments[0], Te)) {
            var i = arguments[0];
            if (i === null) return this.createMultiPoint(new Array(0).fill(null));
            for (var s = new Array(i.size()).fill(null), l = 0; l < i.size(); l++) {
              var d = this.getCoordinateSequenceFactory().create(1, i.getDimension(), i.getMeasures());
              En.copy(i, l, d, 0, 1), s[l] = this.createPoint(d);
            }
            return this.createMultiPoint(s);
          }
        }
      } }, { key: "interfaces_", get: function() {
        return [M];
      } }], [{ key: "constructor_", value: function() {
        if (this._precisionModel = null, this._coordinateSequenceFactory = null, this._SRID = null, arguments.length === 0) h.constructor_.call(this, new Bt(), 0);
        else if (arguments.length === 1) {
          if (Ee(arguments[0], Ma)) {
            var i = arguments[0];
            h.constructor_.call(this, new Bt(), 0, i);
          } else if (arguments[0] instanceof Bt) {
            var s = arguments[0];
            h.constructor_.call(this, s, 0, h.getDefaultCoordinateSequenceFactory());
          }
        } else if (arguments.length === 2) {
          var l = arguments[0], d = arguments[1];
          h.constructor_.call(this, l, d, h.getDefaultCoordinateSequenceFactory());
        } else if (arguments.length === 3) {
          var y = arguments[0], x = arguments[1], E = arguments[2];
          this._precisionModel = y, this._coordinateSequenceFactory = E, this._SRID = x;
        }
      } }, { key: "toMultiPolygonArray", value: function(i) {
        var s = new Array(i.size()).fill(null);
        return i.toArray(s);
      } }, { key: "toGeometryArray", value: function(i) {
        if (i === null) return null;
        var s = new Array(i.size()).fill(null);
        return i.toArray(s);
      } }, { key: "getDefaultCoordinateSequenceFactory", value: function() {
        return Os.instance();
      } }, { key: "toMultiLineStringArray", value: function(i) {
        var s = new Array(i.size()).fill(null);
        return i.toArray(s);
      } }, { key: "toLineStringArray", value: function(i) {
        var s = new Array(i.size()).fill(null);
        return i.toArray(s);
      } }, { key: "toMultiPointArray", value: function(i) {
        var s = new Array(i.size()).fill(null);
        return i.toArray(s);
      } }, { key: "toLinearRingArray", value: function(i) {
        var s = new Array(i.size()).fill(null);
        return i.toArray(s);
      } }, { key: "toPointArray", value: function(i) {
        var s = new Array(i.size()).fill(null);
        return i.toArray(s);
      } }, { key: "toPolygonArray", value: function(i) {
        var s = new Array(i.size()).fill(null);
        return i.toArray(s);
      } }, { key: "createPointFromInternalCoord", value: function(i, s) {
        return s.getPrecisionModel().makePrecise(i), s.getFactory().createPoint(i);
      } }]);
    }(), Bs = "XY", tg = "XYZ", ng = "XYM", rg = "XYZM", Oa = { POINT: "Point", LINE_STRING: "LineString", LINEAR_RING: "LinearRing", POLYGON: "Polygon", MULTI_POINT: "MultiPoint", MULTI_LINE_STRING: "MultiLineString", MULTI_POLYGON: "MultiPolygon", GEOMETRY_COLLECTION: "GeometryCollection", CIRCLE: "Circle" }, Da = "EMPTY", wi = 1, rn = 2, vn = 3, Fa = 4, Un = 5, ig = 6;
    for (var sg in Oa) Oa[sg].toUpperCase();
    var og = function() {
      return c(function h(i) {
        o(this, h), this.wkt = i, this.index_ = -1;
      }, [{ key: "isAlpha_", value: function(h) {
        return h >= "a" && h <= "z" || h >= "A" && h <= "Z";
      } }, { key: "isNumeric_", value: function(h, i) {
        return h >= "0" && h <= "9" || h == "." && !(i !== void 0 && i);
      } }, { key: "isWhiteSpace_", value: function(h) {
        return h == " " || h == "	" || h == "\r" || h == `
`;
      } }, { key: "nextChar_", value: function() {
        return this.wkt.charAt(++this.index_);
      } }, { key: "nextToken", value: function() {
        var h, i = this.nextChar_(), s = this.index_, l = i;
        if (i == "(") h = rn;
        else if (i == ",") h = Un;
        else if (i == ")") h = vn;
        else if (this.isNumeric_(i) || i == "-") h = Fa, l = this.readNumber_();
        else if (this.isAlpha_(i)) h = wi, l = this.readText_();
        else {
          if (this.isWhiteSpace_(i)) return this.nextToken();
          if (i !== "") throw new Error("Unexpected character: " + i);
          h = ig;
        }
        return { position: s, value: l, type: h };
      } }, { key: "readNumber_", value: function() {
        var h, i = this.index_, s = !1, l = !1;
        do
          h == "." ? s = !0 : h != "e" && h != "E" || (l = !0), h = this.nextChar_();
        while (this.isNumeric_(h, s) || !l && (h == "e" || h == "E") || l && (h == "-" || h == "+"));
        return parseFloat(this.wkt.substring(i, this.index_--));
      } }, { key: "readText_", value: function() {
        var h, i = this.index_;
        do
          h = this.nextChar_();
        while (this.isAlpha_(h));
        return this.wkt.substring(i, this.index_--).toUpperCase();
      } }]);
    }(), ag = function() {
      return c(function h(i, s) {
        o(this, h), this.lexer_ = i, this.token_, this.layout_ = Bs, this.factory = s;
      }, [{ key: "consume_", value: function() {
        this.token_ = this.lexer_.nextToken();
      } }, { key: "isTokenType", value: function(h) {
        return this.token_.type == h;
      } }, { key: "match", value: function(h) {
        var i = this.isTokenType(h);
        return i && this.consume_(), i;
      } }, { key: "parse", value: function() {
        return this.consume_(), this.parseGeometry_();
      } }, { key: "parseGeometryLayout_", value: function() {
        var h = Bs, i = this.token_;
        if (this.isTokenType(wi)) {
          var s = i.value;
          s === "Z" ? h = tg : s === "M" ? h = ng : s === "ZM" && (h = rg), h !== Bs && this.consume_();
        }
        return h;
      } }, { key: "parseGeometryCollectionText_", value: function() {
        if (this.match(rn)) {
          var h = [];
          do
            h.push(this.parseGeometry_());
          while (this.match(Un));
          if (this.match(vn)) return h;
        } else if (this.isEmptyGeometry_()) return [];
        throw new Error(this.formatErrorMessage_());
      } }, { key: "parsePointText_", value: function() {
        if (this.match(rn)) {
          var h = this.parsePoint_();
          if (this.match(vn)) return h;
        } else if (this.isEmptyGeometry_()) return null;
        throw new Error(this.formatErrorMessage_());
      } }, { key: "parseLineStringText_", value: function() {
        if (this.match(rn)) {
          var h = this.parsePointList_();
          if (this.match(vn)) return h;
        } else if (this.isEmptyGeometry_()) return [];
        throw new Error(this.formatErrorMessage_());
      } }, { key: "parsePolygonText_", value: function() {
        if (this.match(rn)) {
          var h = this.parseLineStringTextList_();
          if (this.match(vn)) return h;
        } else if (this.isEmptyGeometry_()) return [];
        throw new Error(this.formatErrorMessage_());
      } }, { key: "parseMultiPointText_", value: function() {
        var h;
        if (this.match(rn)) {
          if (h = this.token_.type == rn ? this.parsePointTextList_() : this.parsePointList_(), this.match(vn)) return h;
        } else if (this.isEmptyGeometry_()) return [];
        throw new Error(this.formatErrorMessage_());
      } }, { key: "parseMultiLineStringText_", value: function() {
        if (this.match(rn)) {
          var h = this.parseLineStringTextList_();
          if (this.match(vn)) return h;
        } else if (this.isEmptyGeometry_()) return [];
        throw new Error(this.formatErrorMessage_());
      } }, { key: "parseMultiPolygonText_", value: function() {
        if (this.match(rn)) {
          var h = this.parsePolygonTextList_();
          if (this.match(vn)) return h;
        } else if (this.isEmptyGeometry_()) return [];
        throw new Error(this.formatErrorMessage_());
      } }, { key: "parsePoint_", value: function() {
        for (var h = [], i = this.layout_.length, s = 0; s < i; ++s) {
          var l = this.token_;
          if (!this.match(Fa)) break;
          h.push(l.value);
        }
        if (h.length == i) return h;
        throw new Error(this.formatErrorMessage_());
      } }, { key: "parsePointList_", value: function() {
        for (var h = [this.parsePoint_()]; this.match(Un); ) h.push(this.parsePoint_());
        return h;
      } }, { key: "parsePointTextList_", value: function() {
        for (var h = [this.parsePointText_()]; this.match(Un); ) h.push(this.parsePointText_());
        return h;
      } }, { key: "parseLineStringTextList_", value: function() {
        for (var h = [this.parseLineStringText_()]; this.match(Un); ) h.push(this.parseLineStringText_());
        return h;
      } }, { key: "parsePolygonTextList_", value: function() {
        for (var h = [this.parsePolygonText_()]; this.match(Un); ) h.push(this.parsePolygonText_());
        return h;
      } }, { key: "isEmptyGeometry_", value: function() {
        var h = this.isTokenType(wi) && this.token_.value == Da;
        return h && this.consume_(), h;
      } }, { key: "formatErrorMessage_", value: function() {
        return "Unexpected `" + this.token_.value + "` at position " + this.token_.position + " in `" + this.lexer_.wkt + "`";
      } }, { key: "parseGeometry_", value: function() {
        var h = this.factory, i = function(ge) {
          return a(Z, k(ge));
        }, s = function(ge) {
          var Re = ge.map(function(Pe) {
            return h.createLinearRing(Pe.map(i));
          });
          return Re.length > 1 ? h.createPolygon(Re[0], Re.slice(1)) : h.createPolygon(Re[0]);
        }, l = this.token_;
        if (this.match(wi)) {
          var d = l.value;
          if (this.layout_ = this.parseGeometryLayout_(), d == "GEOMETRYCOLLECTION") {
            var y = this.parseGeometryCollectionText_();
            return h.createGeometryCollection(y);
          }
          switch (d) {
            case "POINT":
              var x = this.parsePointText_();
              return x ? h.createPoint(a(Z, k(x))) : h.createPoint();
            case "LINESTRING":
              var E = this.parseLineStringText_().map(i);
              return h.createLineString(E);
            case "LINEARRING":
              var P = this.parseLineStringText_().map(i);
              return h.createLinearRing(P);
            case "POLYGON":
              var F = this.parsePolygonText_();
              return F && F.length !== 0 ? s(F) : h.createPolygon();
            case "MULTIPOINT":
              var $ = this.parseMultiPointText_();
              if (!$ || $.length === 0) return h.createMultiPoint();
              var K = $.map(i).map(function(ge) {
                return h.createPoint(ge);
              });
              return h.createMultiPoint(K);
            case "MULTILINESTRING":
              var ne = this.parseMultiLineStringText_().map(function(ge) {
                return h.createLineString(ge.map(i));
              });
              return h.createMultiLineString(ne);
            case "MULTIPOLYGON":
              var ue = this.parseMultiPolygonText_();
              if (!ue || ue.length === 0) return h.createMultiPolygon();
              var he = ue.map(s);
              return h.createMultiPolygon(he);
            default:
              throw new Error("Invalid geometry type: " + d);
          }
        }
        throw new Error(this.formatErrorMessage_());
      } }]);
    }();
    function Ba(h) {
      if (h.isEmpty()) return "";
      var i = h.getCoordinate(), s = [i.x, i.y];
      return i.z === void 0 || Number.isNaN(i.z) || s.push(i.z), i.m === void 0 || Number.isNaN(i.m) || s.push(i.m), s.join(" ");
    }
    function Cr(h) {
      for (var i = h.getCoordinates().map(function(y) {
        var x = [y.x, y.y];
        return y.z === void 0 || Number.isNaN(y.z) || x.push(y.z), y.m === void 0 || Number.isNaN(y.m) || x.push(y.m), x;
      }), s = [], l = 0, d = i.length; l < d; ++l) s.push(i[l].join(" "));
      return s.join(", ");
    }
    function Ga(h) {
      var i = [];
      i.push("(" + Cr(h.getExteriorRing()) + ")");
      for (var s = 0, l = h.getNumInteriorRing(); s < l; ++s) i.push("(" + Cr(h.getInteriorRingN(s)) + ")");
      return i.join(", ");
    }
    var ug = { Point: Ba, LineString: Cr, LinearRing: Cr, Polygon: Ga, MultiPoint: function(h) {
      for (var i = [], s = 0, l = h.getNumGeometries(); s < l; ++s) i.push("(" + Ba(h.getGeometryN(s)) + ")");
      return i.join(", ");
    }, MultiLineString: function(h) {
      for (var i = [], s = 0, l = h.getNumGeometries(); s < l; ++s) i.push("(" + Cr(h.getGeometryN(s)) + ")");
      return i.join(", ");
    }, MultiPolygon: function(h) {
      for (var i = [], s = 0, l = h.getNumGeometries(); s < l; ++s) i.push("(" + Ga(h.getGeometryN(s)) + ")");
      return i.join(", ");
    }, GeometryCollection: function(h) {
      for (var i = [], s = 0, l = h.getNumGeometries(); s < l; ++s) i.push(qa(h.getGeometryN(s)));
      return i.join(", ");
    } };
    function qa(h) {
      var i = h.getGeometryType(), s = ug[i];
      i = i.toUpperCase();
      var l = function(d) {
        var y = "";
        if (d.isEmpty()) return y;
        var x = d.getCoordinate();
        return x.z === void 0 || Number.isNaN(x.z) || (y += "Z"), x.m === void 0 || Number.isNaN(x.m) || (y += "M"), y;
      }(h);
      return l.length > 0 && (i += " " + l), h.isEmpty() ? i + " " + Da : i + " (" + s(h) + ")";
    }
    var lg = function() {
      return c(function h(i) {
        o(this, h), this.geometryFactory = i || new zn(), this.precisionModel = this.geometryFactory.getPrecisionModel();
      }, [{ key: "read", value: function(h) {
        var i = new og(h);
        return new ag(i, this.geometryFactory).parse();
      } }, { key: "write", value: function(h) {
        return qa(h);
      } }]);
    }(), Gs = function() {
      return c(function h(i) {
        o(this, h), this.parser = new lg(i);
      }, [{ key: "write", value: function(h) {
        return this.parser.write(h);
      } }], [{ key: "toLineString", value: function(h, i) {
        if (arguments.length !== 2) throw new Error("Not implemented");
        return "LINESTRING ( " + h.x + " " + h.y + ", " + i.x + " " + i.y + " )";
      } }]);
    }(), We = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "getIndexAlongSegment", value: function(i, s) {
        return this.computeIntLineIndex(), this._intLineIndex[i][s];
      } }, { key: "getTopologySummary", value: function() {
        var i = new _i();
        return this.isEndPoint() && i.append(" endpoint"), this._isProper && i.append(" proper"), this.isCollinear() && i.append(" collinear"), i.toString();
      } }, { key: "computeIntersection", value: function(i, s, l, d) {
        this._inputLines[0][0] = i, this._inputLines[0][1] = s, this._inputLines[1][0] = l, this._inputLines[1][1] = d, this._result = this.computeIntersect(i, s, l, d);
      } }, { key: "getIntersectionNum", value: function() {
        return this._result;
      } }, { key: "computeIntLineIndex", value: function() {
        if (arguments.length === 0) this._intLineIndex === null && (this._intLineIndex = Array(2).fill().map(function() {
          return Array(2);
        }), this.computeIntLineIndex(0), this.computeIntLineIndex(1));
        else if (arguments.length === 1) {
          var i = arguments[0];
          this.getEdgeDistance(i, 0) > this.getEdgeDistance(i, 1) ? (this._intLineIndex[i][0] = 0, this._intLineIndex[i][1] = 1) : (this._intLineIndex[i][0] = 1, this._intLineIndex[i][1] = 0);
        }
      } }, { key: "isProper", value: function() {
        return this.hasIntersection() && this._isProper;
      } }, { key: "setPrecisionModel", value: function(i) {
        this._precisionModel = i;
      } }, { key: "isInteriorIntersection", value: function() {
        if (arguments.length === 0) return !!this.isInteriorIntersection(0) || !!this.isInteriorIntersection(1);
        if (arguments.length === 1) {
          for (var i = arguments[0], s = 0; s < this._result; s++) if (!this._intPt[s].equals2D(this._inputLines[i][0]) && !this._intPt[s].equals2D(this._inputLines[i][1])) return !0;
          return !1;
        }
      } }, { key: "getIntersection", value: function(i) {
        return this._intPt[i];
      } }, { key: "isEndPoint", value: function() {
        return this.hasIntersection() && !this._isProper;
      } }, { key: "hasIntersection", value: function() {
        return this._result !== h.NO_INTERSECTION;
      } }, { key: "getEdgeDistance", value: function(i, s) {
        return h.computeEdgeDistance(this._intPt[s], this._inputLines[i][0], this._inputLines[i][1]);
      } }, { key: "isCollinear", value: function() {
        return this._result === h.COLLINEAR_INTERSECTION;
      } }, { key: "toString", value: function() {
        return Gs.toLineString(this._inputLines[0][0], this._inputLines[0][1]) + " - " + Gs.toLineString(this._inputLines[1][0], this._inputLines[1][1]) + this.getTopologySummary();
      } }, { key: "getEndpoint", value: function(i, s) {
        return this._inputLines[i][s];
      } }, { key: "isIntersection", value: function(i) {
        for (var s = 0; s < this._result; s++) if (this._intPt[s].equals2D(i)) return !0;
        return !1;
      } }, { key: "getIntersectionAlongSegment", value: function(i, s) {
        return this.computeIntLineIndex(), this._intPt[this._intLineIndex[i][s]];
      } }], [{ key: "constructor_", value: function() {
        this._result = null, this._inputLines = Array(2).fill().map(function() {
          return Array(2);
        }), this._intPt = new Array(2).fill(null), this._intLineIndex = null, this._isProper = null, this._pa = null, this._pb = null, this._precisionModel = null, this._intPt[0] = new Z(), this._intPt[1] = new Z(), this._pa = this._intPt[0], this._pb = this._intPt[1], this._result = 0;
      } }, { key: "computeEdgeDistance", value: function(i, s, l) {
        var d = Math.abs(l.x - s.x), y = Math.abs(l.y - s.y), x = -1;
        if (i.equals(s)) x = 0;
        else if (i.equals(l)) x = d > y ? d : y;
        else {
          var E = Math.abs(i.x - s.x), P = Math.abs(i.y - s.y);
          (x = d > y ? E : P) !== 0 || i.equals(s) || (x = Math.max(E, P));
        }
        return ee.isTrue(!(x === 0 && !i.equals(s)), "Bad distance calculation"), x;
      } }, { key: "nonRobustComputeEdgeDistance", value: function(i, s, l) {
        var d = i.x - s.x, y = i.y - s.y, x = Math.sqrt(d * d + y * y);
        return ee.isTrue(!(x === 0 && !i.equals(s)), "Invalid distance calculation"), x;
      } }]);
    }();
    We.DONT_INTERSECT = 0, We.DO_INTERSECT = 1, We.COLLINEAR = 2, We.NO_INTERSECTION = 0, We.POINT_INTERSECTION = 1, We.COLLINEAR_INTERSECTION = 2;
    var Sn = function(h) {
      function i() {
        return o(this, i), r(this, i);
      }
      return m(i, h), c(i, [{ key: "isInSegmentEnvelopes", value: function(s) {
        var l = new _e(this._inputLines[0][0], this._inputLines[0][1]), d = new _e(this._inputLines[1][0], this._inputLines[1][1]);
        return l.contains(s) && d.contains(s);
      } }, { key: "computeIntersection", value: function() {
        if (arguments.length !== 3) return w(i, "computeIntersection", this, 1).apply(this, arguments);
        var s = arguments[0], l = arguments[1], d = arguments[2];
        if (this._isProper = !1, _e.intersects(l, d, s) && we.index(l, d, s) === 0 && we.index(d, l, s) === 0) return this._isProper = !0, (s.equals(l) || s.equals(d)) && (this._isProper = !1), this._result = We.POINT_INTERSECTION, null;
        this._result = We.NO_INTERSECTION;
      } }, { key: "intersection", value: function(s, l, d, y) {
        var x = this.intersectionSafe(s, l, d, y);
        return this.isInSegmentEnvelopes(x) || (x = new Z(i.nearestEndpoint(s, l, d, y))), this._precisionModel !== null && this._precisionModel.makePrecise(x), x;
      } }, { key: "checkDD", value: function(s, l, d, y, x) {
        var E = Ps.intersection(s, l, d, y), P = this.isInSegmentEnvelopes(E);
        bt.out.println("DD in env = " + P + "  --------------------- " + E), x.distance(E) > 1e-4 && bt.out.println("Distance = " + x.distance(E));
      } }, { key: "intersectionSafe", value: function(s, l, d, y) {
        var x = Ns.intersection(s, l, d, y);
        return x === null && (x = i.nearestEndpoint(s, l, d, y)), x;
      } }, { key: "computeCollinearIntersection", value: function(s, l, d, y) {
        var x = _e.intersects(s, l, d), E = _e.intersects(s, l, y), P = _e.intersects(d, y, s), F = _e.intersects(d, y, l);
        return x && E ? (this._intPt[0] = d, this._intPt[1] = y, We.COLLINEAR_INTERSECTION) : P && F ? (this._intPt[0] = s, this._intPt[1] = l, We.COLLINEAR_INTERSECTION) : x && P ? (this._intPt[0] = d, this._intPt[1] = s, !d.equals(s) || E || F ? We.COLLINEAR_INTERSECTION : We.POINT_INTERSECTION) : x && F ? (this._intPt[0] = d, this._intPt[1] = l, !d.equals(l) || E || P ? We.COLLINEAR_INTERSECTION : We.POINT_INTERSECTION) : E && P ? (this._intPt[0] = y, this._intPt[1] = s, !y.equals(s) || x || F ? We.COLLINEAR_INTERSECTION : We.POINT_INTERSECTION) : E && F ? (this._intPt[0] = y, this._intPt[1] = l, !y.equals(l) || x || P ? We.COLLINEAR_INTERSECTION : We.POINT_INTERSECTION) : We.NO_INTERSECTION;
      } }, { key: "computeIntersect", value: function(s, l, d, y) {
        if (this._isProper = !1, !_e.intersects(s, l, d, y)) return We.NO_INTERSECTION;
        var x = we.index(s, l, d), E = we.index(s, l, y);
        if (x > 0 && E > 0 || x < 0 && E < 0) return We.NO_INTERSECTION;
        var P = we.index(d, y, s), F = we.index(d, y, l);
        return P > 0 && F > 0 || P < 0 && F < 0 ? We.NO_INTERSECTION : x === 0 && E === 0 && P === 0 && F === 0 ? this.computeCollinearIntersection(s, l, d, y) : (x === 0 || E === 0 || P === 0 || F === 0 ? (this._isProper = !1, s.equals2D(d) || s.equals2D(y) ? this._intPt[0] = s : l.equals2D(d) || l.equals2D(y) ? this._intPt[0] = l : x === 0 ? this._intPt[0] = new Z(d) : E === 0 ? this._intPt[0] = new Z(y) : P === 0 ? this._intPt[0] = new Z(s) : F === 0 && (this._intPt[0] = new Z(l))) : (this._isProper = !0, this._intPt[0] = this.intersection(s, l, d, y)), We.POINT_INTERSECTION);
      } }], [{ key: "nearestEndpoint", value: function(s, l, d, y) {
        var x = s, E = Yt.pointToSegment(s, d, y), P = Yt.pointToSegment(l, d, y);
        return P < E && (E = P, x = l), (P = Yt.pointToSegment(d, s, l)) < E && (E = P, x = d), (P = Yt.pointToSegment(y, s, l)) < E && (E = P, x = y), x;
      } }]);
    }(We), cg = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "countSegment", value: function(i, s) {
        if (i.x < this._p.x && s.x < this._p.x) return null;
        if (this._p.x === s.x && this._p.y === s.y) return this._isPointOnSegment = !0, null;
        if (i.y === this._p.y && s.y === this._p.y) {
          var l = i.x, d = s.x;
          return l > d && (l = s.x, d = i.x), this._p.x >= l && this._p.x <= d && (this._isPointOnSegment = !0), null;
        }
        if (i.y > this._p.y && s.y <= this._p.y || s.y > this._p.y && i.y <= this._p.y) {
          var y = we.index(i, s, this._p);
          if (y === we.COLLINEAR) return this._isPointOnSegment = !0, null;
          s.y < i.y && (y = -y), y === we.LEFT && this._crossingCount++;
        }
      } }, { key: "isPointInPolygon", value: function() {
        return this.getLocation() !== z.EXTERIOR;
      } }, { key: "getLocation", value: function() {
        return this._isPointOnSegment ? z.BOUNDARY : this._crossingCount % 2 == 1 ? z.INTERIOR : z.EXTERIOR;
      } }, { key: "isOnSegment", value: function() {
        return this._isPointOnSegment;
      } }], [{ key: "constructor_", value: function() {
        this._p = null, this._crossingCount = 0, this._isPointOnSegment = !1;
        var i = arguments[0];
        this._p = i;
      } }, { key: "locatePointInRing", value: function() {
        if (arguments[0] instanceof Z && Ee(arguments[1], Te)) {
          for (var i = arguments[1], s = new h(arguments[0]), l = new Z(), d = new Z(), y = 1; y < i.size(); y++) if (i.getCoordinate(y, l), i.getCoordinate(y - 1, d), s.countSegment(l, d), s.isOnSegment()) return s.getLocation();
          return s.getLocation();
        }
        if (arguments[0] instanceof Z && arguments[1] instanceof Array) {
          for (var x = arguments[1], E = new h(arguments[0]), P = 1; P < x.length; P++) {
            var F = x[P], $ = x[P - 1];
            if (E.countSegment(F, $), E.isOnSegment()) return E.getLocation();
          }
          return E.getLocation();
        }
      } }]);
    }(), qs = function() {
      function h() {
        o(this, h);
      }
      return c(h, null, [{ key: "isOnLine", value: function() {
        if (arguments[0] instanceof Z && Ee(arguments[1], Te)) {
          for (var i = arguments[0], s = arguments[1], l = new Sn(), d = new Z(), y = new Z(), x = s.size(), E = 1; E < x; E++) if (s.getCoordinate(E - 1, d), s.getCoordinate(E, y), l.computeIntersection(i, d, y), l.hasIntersection()) return !0;
          return !1;
        }
        if (arguments[0] instanceof Z && arguments[1] instanceof Array) {
          for (var P = arguments[0], F = arguments[1], $ = new Sn(), K = 1; K < F.length; K++) {
            var ne = F[K - 1], ue = F[K];
            if ($.computeIntersection(P, ne, ue), $.hasIntersection()) return !0;
          }
          return !1;
        }
      } }, { key: "locateInRing", value: function(i, s) {
        return cg.locatePointInRing(i, s);
      } }, { key: "isInRing", value: function(i, s) {
        return h.locateInRing(i, s) !== z.EXTERIOR;
      } }]);
    }(), Mt = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "setAllLocations", value: function(i) {
        for (var s = 0; s < this.location.length; s++) this.location[s] = i;
      } }, { key: "isNull", value: function() {
        for (var i = 0; i < this.location.length; i++) if (this.location[i] !== z.NONE) return !1;
        return !0;
      } }, { key: "setAllLocationsIfNull", value: function(i) {
        for (var s = 0; s < this.location.length; s++) this.location[s] === z.NONE && (this.location[s] = i);
      } }, { key: "isLine", value: function() {
        return this.location.length === 1;
      } }, { key: "merge", value: function(i) {
        if (i.location.length > this.location.length) {
          var s = new Array(3).fill(null);
          s[ie.ON] = this.location[ie.ON], s[ie.LEFT] = z.NONE, s[ie.RIGHT] = z.NONE, this.location = s;
        }
        for (var l = 0; l < this.location.length; l++) this.location[l] === z.NONE && l < i.location.length && (this.location[l] = i.location[l]);
      } }, { key: "getLocations", value: function() {
        return this.location;
      } }, { key: "flip", value: function() {
        if (this.location.length <= 1) return null;
        var i = this.location[ie.LEFT];
        this.location[ie.LEFT] = this.location[ie.RIGHT], this.location[ie.RIGHT] = i;
      } }, { key: "toString", value: function() {
        var i = new dn();
        return this.location.length > 1 && i.append(z.toLocationSymbol(this.location[ie.LEFT])), i.append(z.toLocationSymbol(this.location[ie.ON])), this.location.length > 1 && i.append(z.toLocationSymbol(this.location[ie.RIGHT])), i.toString();
      } }, { key: "setLocations", value: function(i, s, l) {
        this.location[ie.ON] = i, this.location[ie.LEFT] = s, this.location[ie.RIGHT] = l;
      } }, { key: "get", value: function(i) {
        return i < this.location.length ? this.location[i] : z.NONE;
      } }, { key: "isArea", value: function() {
        return this.location.length > 1;
      } }, { key: "isAnyNull", value: function() {
        for (var i = 0; i < this.location.length; i++) if (this.location[i] === z.NONE) return !0;
        return !1;
      } }, { key: "setLocation", value: function() {
        if (arguments.length === 1) {
          var i = arguments[0];
          this.setLocation(ie.ON, i);
        } else if (arguments.length === 2) {
          var s = arguments[0], l = arguments[1];
          this.location[s] = l;
        }
      } }, { key: "init", value: function(i) {
        this.location = new Array(i).fill(null), this.setAllLocations(z.NONE);
      } }, { key: "isEqualOnSide", value: function(i, s) {
        return this.location[s] === i.location[s];
      } }, { key: "allPositionsEqual", value: function(i) {
        for (var s = 0; s < this.location.length; s++) if (this.location[s] !== i) return !1;
        return !0;
      } }], [{ key: "constructor_", value: function() {
        if (this.location = null, arguments.length === 1) {
          if (arguments[0] instanceof Array) {
            var i = arguments[0];
            this.init(i.length);
          } else if (Number.isInteger(arguments[0])) {
            var s = arguments[0];
            this.init(1), this.location[ie.ON] = s;
          } else if (arguments[0] instanceof h) {
            var l = arguments[0];
            if (this.init(l.location.length), l !== null) for (var d = 0; d < this.location.length; d++) this.location[d] = l.location[d];
          }
        } else if (arguments.length === 3) {
          var y = arguments[0], x = arguments[1], E = arguments[2];
          this.init(3), this.location[ie.ON] = y, this.location[ie.LEFT] = x, this.location[ie.RIGHT] = E;
        }
      } }]);
    }(), Lt = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "getGeometryCount", value: function() {
        var i = 0;
        return this.elt[0].isNull() || i++, this.elt[1].isNull() || i++, i;
      } }, { key: "setAllLocations", value: function(i, s) {
        this.elt[i].setAllLocations(s);
      } }, { key: "isNull", value: function(i) {
        return this.elt[i].isNull();
      } }, { key: "setAllLocationsIfNull", value: function() {
        if (arguments.length === 1) {
          var i = arguments[0];
          this.setAllLocationsIfNull(0, i), this.setAllLocationsIfNull(1, i);
        } else if (arguments.length === 2) {
          var s = arguments[0], l = arguments[1];
          this.elt[s].setAllLocationsIfNull(l);
        }
      } }, { key: "isLine", value: function(i) {
        return this.elt[i].isLine();
      } }, { key: "merge", value: function(i) {
        for (var s = 0; s < 2; s++) this.elt[s] === null && i.elt[s] !== null ? this.elt[s] = new Mt(i.elt[s]) : this.elt[s].merge(i.elt[s]);
      } }, { key: "flip", value: function() {
        this.elt[0].flip(), this.elt[1].flip();
      } }, { key: "getLocation", value: function() {
        if (arguments.length === 1) {
          var i = arguments[0];
          return this.elt[i].get(ie.ON);
        }
        if (arguments.length === 2) {
          var s = arguments[0], l = arguments[1];
          return this.elt[s].get(l);
        }
      } }, { key: "toString", value: function() {
        var i = new dn();
        return this.elt[0] !== null && (i.append("A:"), i.append(this.elt[0].toString())), this.elt[1] !== null && (i.append(" B:"), i.append(this.elt[1].toString())), i.toString();
      } }, { key: "isArea", value: function() {
        if (arguments.length === 0) return this.elt[0].isArea() || this.elt[1].isArea();
        if (arguments.length === 1) {
          var i = arguments[0];
          return this.elt[i].isArea();
        }
      } }, { key: "isAnyNull", value: function(i) {
        return this.elt[i].isAnyNull();
      } }, { key: "setLocation", value: function() {
        if (arguments.length === 2) {
          var i = arguments[0], s = arguments[1];
          this.elt[i].setLocation(ie.ON, s);
        } else if (arguments.length === 3) {
          var l = arguments[0], d = arguments[1], y = arguments[2];
          this.elt[l].setLocation(d, y);
        }
      } }, { key: "isEqualOnSide", value: function(i, s) {
        return this.elt[0].isEqualOnSide(i.elt[0], s) && this.elt[1].isEqualOnSide(i.elt[1], s);
      } }, { key: "allPositionsEqual", value: function(i, s) {
        return this.elt[i].allPositionsEqual(s);
      } }, { key: "toLine", value: function(i) {
        this.elt[i].isArea() && (this.elt[i] = new Mt(this.elt[i].location[0]));
      } }], [{ key: "constructor_", value: function() {
        if (this.elt = new Array(2).fill(null), arguments.length === 1) {
          if (Number.isInteger(arguments[0])) {
            var i = arguments[0];
            this.elt[0] = new Mt(i), this.elt[1] = new Mt(i);
          } else if (arguments[0] instanceof h) {
            var s = arguments[0];
            this.elt[0] = new Mt(s.elt[0]), this.elt[1] = new Mt(s.elt[1]);
          }
        } else if (arguments.length === 2) {
          var l = arguments[0], d = arguments[1];
          this.elt[0] = new Mt(z.NONE), this.elt[1] = new Mt(z.NONE), this.elt[l].setLocation(d);
        } else if (arguments.length === 3) {
          var y = arguments[0], x = arguments[1], E = arguments[2];
          this.elt[0] = new Mt(y, x, E), this.elt[1] = new Mt(y, x, E);
        } else if (arguments.length === 4) {
          var P = arguments[0], F = arguments[1], $ = arguments[2], K = arguments[3];
          this.elt[0] = new Mt(z.NONE, z.NONE, z.NONE), this.elt[1] = new Mt(z.NONE, z.NONE, z.NONE), this.elt[P].setLocations(F, $, K);
        }
      } }, { key: "toLineLabel", value: function(i) {
        for (var s = new h(z.NONE), l = 0; l < 2; l++) s.setLocation(l, i.getLocation(l));
        return s;
      } }]);
    }(), xi = function() {
      return c(function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }, [{ key: "computeRing", value: function() {
        if (this._ring !== null) return null;
        for (var h = new Array(this._pts.size()).fill(null), i = 0; i < this._pts.size(); i++) h[i] = this._pts.get(i);
        this._ring = this._geometryFactory.createLinearRing(h), this._isHole = we.isCCW(this._ring.getCoordinates());
      } }, { key: "isIsolated", value: function() {
        return this._label.getGeometryCount() === 1;
      } }, { key: "computePoints", value: function(h) {
        this._startDe = h;
        var i = h, s = !0;
        do {
          if (i === null) throw new nn("Found null DirectedEdge");
          if (i.getEdgeRing() === this) throw new nn("Directed Edge visited twice during ring-building at " + i.getCoordinate());
          this._edges.add(i);
          var l = i.getLabel();
          ee.isTrue(l.isArea()), this.mergeLabel(l), this.addPoints(i.getEdge(), i.isForward(), s), s = !1, this.setEdgeRing(i, this), i = this.getNext(i);
        } while (i !== this._startDe);
      } }, { key: "getLinearRing", value: function() {
        return this._ring;
      } }, { key: "getCoordinate", value: function(h) {
        return this._pts.get(h);
      } }, { key: "computeMaxNodeDegree", value: function() {
        this._maxNodeDegree = 0;
        var h = this._startDe;
        do {
          var i = h.getNode().getEdges().getOutgoingDegree(this);
          i > this._maxNodeDegree && (this._maxNodeDegree = i), h = this.getNext(h);
        } while (h !== this._startDe);
        this._maxNodeDegree *= 2;
      } }, { key: "addPoints", value: function(h, i, s) {
        var l = h.getCoordinates();
        if (i) {
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
        var h = this._startDe;
        do
          h.getEdge().setInResult(!0), h = h.getNext();
        while (h !== this._startDe);
      } }, { key: "containsPoint", value: function(h) {
        var i = this.getLinearRing();
        if (!i.getEnvelopeInternal().contains(h) || !qs.isInRing(h, i.getCoordinates())) return !1;
        for (var s = this._holes.iterator(); s.hasNext(); )
          if (s.next().containsPoint(h)) return !1;
        return !0;
      } }, { key: "addHole", value: function(h) {
        this._holes.add(h);
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
          var h = arguments[0];
          this.mergeLabel(h, 0), this.mergeLabel(h, 1);
        } else if (arguments.length === 2) {
          var i = arguments[1], s = arguments[0].getLocation(i, ie.RIGHT);
          if (s === z.NONE) return null;
          if (this._label.getLocation(i) === z.NONE) return this._label.setLocation(i, s), null;
        }
      } }, { key: "setShell", value: function(h) {
        this._shell = h, h !== null && h.addHole(this);
      } }, { key: "toPolygon", value: function(h) {
        for (var i = new Array(this._holes.size()).fill(null), s = 0; s < this._holes.size(); s++) i[s] = this._holes.get(s).getLinearRing();
        return h.createPolygon(this.getLinearRing(), i);
      } }], [{ key: "constructor_", value: function() {
        if (this._startDe = null, this._maxNodeDegree = -1, this._edges = new ve(), this._pts = new ve(), this._label = new Lt(z.NONE), this._ring = null, this._isHole = null, this._shell = null, this._holes = new ve(), this._geometryFactory = null, arguments.length !== 0) {
          if (arguments.length === 2) {
            var h = arguments[0], i = arguments[1];
            this._geometryFactory = i, this.computePoints(h), this.computeRing();
          }
        }
      } }]);
    }(), hg = function(h) {
      function i() {
        var s;
        return o(this, i), s = r(this, i), i.constructor_.apply(s, arguments), s;
      }
      return m(i, h), c(i, [{ key: "setEdgeRing", value: function(s, l) {
        s.setMinEdgeRing(l);
      } }, { key: "getNext", value: function(s) {
        return s.getNextMin();
      } }], [{ key: "constructor_", value: function() {
        var s = arguments[0], l = arguments[1];
        xi.constructor_.call(this, s, l);
      } }]);
    }(xi), fg = function(h) {
      function i() {
        var s;
        return o(this, i), s = r(this, i), i.constructor_.apply(s, arguments), s;
      }
      return m(i, h), c(i, [{ key: "buildMinimalRings", value: function() {
        var s = new ve(), l = this._startDe;
        do {
          if (l.getMinEdgeRing() === null) {
            var d = new hg(l, this._geometryFactory);
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
        xi.constructor_.call(this, s, l);
      } }]);
    }(xi), za = function() {
      return c(function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }, [{ key: "setVisited", value: function(h) {
        this._isVisited = h;
      } }, { key: "setInResult", value: function(h) {
        this._isInResult = h;
      } }, { key: "isCovered", value: function() {
        return this._isCovered;
      } }, { key: "isCoveredSet", value: function() {
        return this._isCoveredSet;
      } }, { key: "setLabel", value: function(h) {
        this._label = h;
      } }, { key: "getLabel", value: function() {
        return this._label;
      } }, { key: "setCovered", value: function(h) {
        this._isCovered = h, this._isCoveredSet = !0;
      } }, { key: "updateIM", value: function(h) {
        ee.isTrue(this._label.getGeometryCount() >= 2, "found partial label"), this.computeIM(h);
      } }, { key: "isInResult", value: function() {
        return this._isInResult;
      } }, { key: "isVisited", value: function() {
        return this._isVisited;
      } }], [{ key: "constructor_", value: function() {
        if (this._label = null, this._isInResult = !1, this._isCovered = !1, this._isCoveredSet = !1, this._isVisited = !1, arguments.length !== 0) {
          if (arguments.length === 1) {
            var h = arguments[0];
            this._label = h;
          }
        }
      } }]);
    }(), Ei = function(h) {
      function i() {
        var s;
        return o(this, i), s = r(this, i), i.constructor_.apply(s, arguments), s;
      }
      return m(i, h), c(i, [{ key: "isIncidentEdgeInResult", value: function() {
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
        if (arguments.length !== 2 || !Number.isInteger(arguments[1]) || !Number.isInteger(arguments[0])) return w(i, "setLabel", this, 1).apply(this, arguments);
        var s = arguments[0], l = arguments[1];
        this._label === null ? this._label = new Lt(s, l) : this._label.setLocation(s, l);
      } }, { key: "getEdges", value: function() {
        return this._edges;
      } }, { key: "mergeLabel", value: function() {
        if (arguments[0] instanceof i) {
          var s = arguments[0];
          this.mergeLabel(s._label);
        } else if (arguments[0] instanceof Lt) for (var l = arguments[0], d = 0; d < 2; d++) {
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
        this._coord = s, this._edges = l, this._label = new Lt(0, z.NONE);
      } }]);
    }(za), gg = function(h) {
      function i() {
        return o(this, i), r(this, i, arguments);
      }
      return m(i, h), c(i);
    }(Aa);
    function Ua(h) {
      return h == null ? 0 : h.color;
    }
    function De(h) {
      return h == null ? null : h.parent;
    }
    function Xt(h, i) {
      h !== null && (h.color = i);
    }
    function zs(h) {
      return h == null ? null : h.left;
    }
    function Ya(h) {
      return h == null ? null : h.right;
    }
    var kr = function(h) {
      function i() {
        var s;
        return o(this, i), (s = r(this, i)).root_ = null, s.size_ = 0, s;
      }
      return m(i, h), c(i, [{ key: "get", value: function(s) {
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
        var P = { key: s, left: null, right: null, value: l, parent: d, color: 0, getValue: function() {
          return this.value;
        }, getKey: function() {
          return this.key;
        } };
        return y < 0 ? d.left = P : d.right = P, this.fixAfterInsertion(P), this.size_++, null;
      } }, { key: "fixAfterInsertion", value: function(s) {
        var l;
        for (s.color = 1; s != null && s !== this.root_ && s.parent.color === 1; ) De(s) === zs(De(De(s))) ? Ua(l = Ya(De(De(s)))) === 1 ? (Xt(De(s), 0), Xt(l, 0), Xt(De(De(s)), 1), s = De(De(s))) : (s === Ya(De(s)) && (s = De(s), this.rotateLeft(s)), Xt(De(s), 0), Xt(De(De(s)), 1), this.rotateRight(De(De(s)))) : Ua(l = zs(De(De(s)))) === 1 ? (Xt(De(s), 0), Xt(l, 0), Xt(De(De(s)), 1), s = De(De(s))) : (s === zs(De(s)) && (s = De(s), this.rotateRight(s)), Xt(De(s), 0), Xt(De(De(s)), 1), this.rotateLeft(De(De(s))));
        this.root_.color = 0;
      } }, { key: "values", value: function() {
        var s = new ve(), l = this.getFirstEntry();
        if (l !== null) for (s.add(l.value); (l = i.successor(l)) !== null; ) s.add(l.value);
        return s;
      } }, { key: "entrySet", value: function() {
        var s = new gt(), l = this.getFirstEntry();
        if (l !== null) for (s.add(l); (l = i.successor(l)) !== null; ) s.add(l);
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
    }(gg), Xa = function() {
      return c(function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }, [{ key: "find", value: function(h) {
        return this.nodeMap.get(h);
      } }, { key: "addNode", value: function() {
        if (arguments[0] instanceof Z) {
          var h = arguments[0], i = this.nodeMap.get(h);
          return i === null && (i = this.nodeFact.createNode(h), this.nodeMap.put(h, i)), i;
        }
        if (arguments[0] instanceof Ei) {
          var s = arguments[0], l = this.nodeMap.get(s.getCoordinate());
          return l === null ? (this.nodeMap.put(s.getCoordinate(), s), s) : (l.mergeLabel(s), l);
        }
      } }, { key: "print", value: function(h) {
        for (var i = this.iterator(); i.hasNext(); )
          i.next().print(h);
      } }, { key: "iterator", value: function() {
        return this.nodeMap.values().iterator();
      } }, { key: "values", value: function() {
        return this.nodeMap.values();
      } }, { key: "getBoundaryNodes", value: function(h) {
        for (var i = new ve(), s = this.iterator(); s.hasNext(); ) {
          var l = s.next();
          l.getLabel().getLocation(h) === z.BOUNDARY && i.add(l);
        }
        return i;
      } }, { key: "add", value: function(h) {
        var i = h.getCoordinate();
        this.addNode(i).add(h);
      } }], [{ key: "constructor_", value: function() {
        this.nodeMap = new kr(), this.nodeFact = null;
        var h = arguments[0];
        this.nodeFact = h;
      } }]);
    }(), dt = function() {
      function h() {
        o(this, h);
      }
      return c(h, null, [{ key: "isNorthern", value: function(i) {
        return i === h.NE || i === h.NW;
      } }, { key: "isOpposite", value: function(i, s) {
        return i !== s && (i - s + 4) % 4 === 2;
      } }, { key: "commonHalfPlane", value: function(i, s) {
        if (i === s) return i;
        if ((i - s + 4) % 4 === 2) return -1;
        var l = i < s ? i : s;
        return l === 0 && (i > s ? i : s) === 3 ? 3 : l;
      } }, { key: "isInHalfPlane", value: function(i, s) {
        return s === h.SE ? i === h.SE || i === h.SW : i === s || i === s + 1;
      } }, { key: "quadrant", value: function() {
        if (typeof arguments[0] == "number" && typeof arguments[1] == "number") {
          var i = arguments[0], s = arguments[1];
          if (i === 0 && s === 0) throw new O("Cannot compute the quadrant for point ( " + i + ", " + s + " )");
          return i >= 0 ? s >= 0 ? h.NE : h.SE : s >= 0 ? h.NW : h.SW;
        }
        if (arguments[0] instanceof Z && arguments[1] instanceof Z) {
          var l = arguments[0], d = arguments[1];
          if (d.x === l.x && d.y === l.y) throw new O("Cannot compute the quadrant for two identical points " + l);
          return d.x >= l.x ? d.y >= l.y ? h.NE : h.SE : d.y >= l.y ? h.NW : h.SW;
        }
      } }]);
    }();
    dt.NE = 0, dt.NW = 1, dt.SW = 2, dt.SE = 3;
    var Va = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "compareDirection", value: function(i) {
        return this._dx === i._dx && this._dy === i._dy ? 0 : this._quadrant > i._quadrant ? 1 : this._quadrant < i._quadrant ? -1 : we.index(i._p0, i._p1, this._p1);
      } }, { key: "getDy", value: function() {
        return this._dy;
      } }, { key: "getCoordinate", value: function() {
        return this._p0;
      } }, { key: "setNode", value: function(i) {
        this._node = i;
      } }, { key: "print", value: function(i) {
        var s = Math.atan2(this._dy, this._dx), l = this.getClass().getName(), d = l.lastIndexOf("."), y = l.substring(d + 1);
        i.print("  " + y + ": " + this._p0 + " - " + this._p1 + " " + this._quadrant + ":" + s + "   " + this._label);
      } }, { key: "compareTo", value: function(i) {
        var s = i;
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
        var i = Math.atan2(this._dy, this._dx), s = this.getClass().getName(), l = s.lastIndexOf(".");
        return "  " + s.substring(l + 1) + ": " + this._p0 + " - " + this._p1 + " " + this._quadrant + ":" + i + "   " + this._label;
      } }, { key: "computeLabel", value: function(i) {
      } }, { key: "init", value: function(i, s) {
        this._p0 = i, this._p1 = s, this._dx = s.x - i.x, this._dy = s.y - i.y, this._quadrant = dt.quadrant(this._dx, this._dy), ee.isTrue(!(this._dx === 0 && this._dy === 0), "EdgeEnd with identical endpoints found");
      } }, { key: "interfaces_", get: function() {
        return [V];
      } }], [{ key: "constructor_", value: function() {
        if (this._edge = null, this._label = null, this._node = null, this._p0 = null, this._p1 = null, this._dx = null, this._dy = null, this._quadrant = null, arguments.length === 1) {
          var i = arguments[0];
          this._edge = i;
        } else if (arguments.length === 3) {
          var s = arguments[0], l = arguments[1], d = arguments[2];
          h.constructor_.call(this, s, l, d, null);
        } else if (arguments.length === 4) {
          var y = arguments[0], x = arguments[1], E = arguments[2], P = arguments[3];
          h.constructor_.call(this, y), this.init(x, E), this._label = P;
        }
      } }]);
    }(), Us = function(h) {
      function i() {
        var s;
        return o(this, i), s = r(this, i), i.constructor_.apply(s, arguments), s;
      }
      return m(i, h), c(i, [{ key: "getNextMin", value: function() {
        return this._nextMin;
      } }, { key: "getDepth", value: function(s) {
        return this._depth[s];
      } }, { key: "setVisited", value: function(s) {
        this._isVisited = s;
      } }, { key: "computeDirectedLabel", value: function() {
        this._label = new Lt(this._edge.getLabel()), this._isForward || this._label.flip();
      } }, { key: "getNext", value: function() {
        return this._next;
      } }, { key: "setDepth", value: function(s, l) {
        if (this._depth[s] !== -999 && this._depth[s] !== l) throw new nn("assigned depths do not match", this.getCoordinate());
        this._depth[s] = l;
      } }, { key: "isInteriorAreaEdge", value: function() {
        for (var s = !0, l = 0; l < 2; l++) this._label.isArea(l) && this._label.getLocation(l, ie.LEFT) === z.INTERIOR && this._label.getLocation(l, ie.RIGHT) === z.INTERIOR || (s = !1);
        return s;
      } }, { key: "setNextMin", value: function(s) {
        this._nextMin = s;
      } }, { key: "print", value: function(s) {
        w(i, "print", this, 1).call(this, s), s.print(" " + this._depth[ie.LEFT] + "/" + this._depth[ie.RIGHT]), s.print(" (" + this.getDepthDelta() + ")"), this._isInResult && s.print(" inResult");
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
        if (Va.constructor_.call(this, s), this._isForward = l, l) this.init(s.getCoordinate(0), s.getCoordinate(1));
        else {
          var d = s.getNumPoints() - 1;
          this.init(s.getCoordinate(d), s.getCoordinate(d - 1));
        }
        this.computeDirectedLabel();
      } }, { key: "depthFactor", value: function(s, l) {
        return s === z.EXTERIOR && l === z.INTERIOR ? 1 : s === z.INTERIOR && l === z.EXTERIOR ? -1 : 0;
      } }]);
    }(Va), Ha = function() {
      return c(function h() {
        o(this, h);
      }, [{ key: "createNode", value: function(h) {
        return new Ei(h, null);
      } }]);
    }(), Wa = function() {
      return c(function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }, [{ key: "printEdges", value: function(h) {
        h.println("Edges:");
        for (var i = 0; i < this._edges.size(); i++) {
          h.println("edge " + i + ":");
          var s = this._edges.get(i);
          s.print(h), s.eiList.print(h);
        }
      } }, { key: "find", value: function(h) {
        return this._nodes.find(h);
      } }, { key: "addNode", value: function() {
        if (arguments[0] instanceof Ei) {
          var h = arguments[0];
          return this._nodes.addNode(h);
        }
        if (arguments[0] instanceof Z) {
          var i = arguments[0];
          return this._nodes.addNode(i);
        }
      } }, { key: "getNodeIterator", value: function() {
        return this._nodes.iterator();
      } }, { key: "linkResultDirectedEdges", value: function() {
        for (var h = this._nodes.iterator(); h.hasNext(); )
          h.next().getEdges().linkResultDirectedEdges();
      } }, { key: "debugPrintln", value: function(h) {
        bt.out.println(h);
      } }, { key: "isBoundaryNode", value: function(h, i) {
        var s = this._nodes.find(i);
        if (s === null) return !1;
        var l = s.getLabel();
        return l !== null && l.getLocation(h) === z.BOUNDARY;
      } }, { key: "linkAllDirectedEdges", value: function() {
        for (var h = this._nodes.iterator(); h.hasNext(); )
          h.next().getEdges().linkAllDirectedEdges();
      } }, { key: "matchInSameDirection", value: function(h, i, s, l) {
        return !!h.equals(s) && we.index(h, i, l) === we.COLLINEAR && dt.quadrant(h, i) === dt.quadrant(s, l);
      } }, { key: "getEdgeEnds", value: function() {
        return this._edgeEndList;
      } }, { key: "debugPrint", value: function(h) {
        bt.out.print(h);
      } }, { key: "getEdgeIterator", value: function() {
        return this._edges.iterator();
      } }, { key: "findEdgeInSameDirection", value: function(h, i) {
        for (var s = 0; s < this._edges.size(); s++) {
          var l = this._edges.get(s), d = l.getCoordinates();
          if (this.matchInSameDirection(h, i, d[0], d[1]) || this.matchInSameDirection(h, i, d[d.length - 1], d[d.length - 2])) return l;
        }
        return null;
      } }, { key: "insertEdge", value: function(h) {
        this._edges.add(h);
      } }, { key: "findEdgeEnd", value: function(h) {
        for (var i = this.getEdgeEnds().iterator(); i.hasNext(); ) {
          var s = i.next();
          if (s.getEdge() === h) return s;
        }
        return null;
      } }, { key: "addEdges", value: function(h) {
        for (var i = h.iterator(); i.hasNext(); ) {
          var s = i.next();
          this._edges.add(s);
          var l = new Us(s, !0), d = new Us(s, !1);
          l.setSym(d), d.setSym(l), this.add(l), this.add(d);
        }
      } }, { key: "add", value: function(h) {
        this._nodes.add(h), this._edgeEndList.add(h);
      } }, { key: "getNodes", value: function() {
        return this._nodes.values();
      } }, { key: "findEdge", value: function(h, i) {
        for (var s = 0; s < this._edges.size(); s++) {
          var l = this._edges.get(s), d = l.getCoordinates();
          if (h.equals(d[0]) && i.equals(d[1])) return l;
        }
        return null;
      } }], [{ key: "constructor_", value: function() {
        if (this._edges = new ve(), this._nodes = null, this._edgeEndList = new ve(), arguments.length === 0) this._nodes = new Xa(new Ha());
        else if (arguments.length === 1) {
          var h = arguments[0];
          this._nodes = new Xa(h);
        }
      } }, { key: "linkResultDirectedEdges", value: function(h) {
        for (var i = h.iterator(); i.hasNext(); )
          i.next().getEdges().linkResultDirectedEdges();
      } }]);
    }(), dg = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "sortShellsAndHoles", value: function(i, s, l) {
        for (var d = i.iterator(); d.hasNext(); ) {
          var y = d.next();
          y.isHole() ? l.add(y) : s.add(y);
        }
      } }, { key: "computePolygons", value: function(i) {
        for (var s = new ve(), l = i.iterator(); l.hasNext(); ) {
          var d = l.next().toPolygon(this._geometryFactory);
          s.add(d);
        }
        return s;
      } }, { key: "placeFreeHoles", value: function(i, s) {
        for (var l = s.iterator(); l.hasNext(); ) {
          var d = l.next();
          if (d.getShell() === null) {
            var y = h.findEdgeRingContaining(d, i);
            if (y === null) throw new nn("unable to assign hole to a shell", d.getCoordinate(0));
            d.setShell(y);
          }
        }
      } }, { key: "buildMinimalEdgeRings", value: function(i, s, l) {
        for (var d = new ve(), y = i.iterator(); y.hasNext(); ) {
          var x = y.next();
          if (x.getMaxNodeDegree() > 2) {
            x.linkDirectedEdgesForMinimalEdgeRings();
            var E = x.buildMinimalRings(), P = this.findShell(E);
            P !== null ? (this.placePolygonHoles(P, E), s.add(P)) : l.addAll(E);
          } else d.add(x);
        }
        return d;
      } }, { key: "buildMaximalEdgeRings", value: function(i) {
        for (var s = new ve(), l = i.iterator(); l.hasNext(); ) {
          var d = l.next();
          if (d.isInResult() && d.getLabel().isArea() && d.getEdgeRing() === null) {
            var y = new fg(d, this._geometryFactory);
            s.add(y), y.setInResult();
          }
        }
        return s;
      } }, { key: "placePolygonHoles", value: function(i, s) {
        for (var l = s.iterator(); l.hasNext(); ) {
          var d = l.next();
          d.isHole() && d.setShell(i);
        }
      } }, { key: "getPolygons", value: function() {
        return this.computePolygons(this._shellList);
      } }, { key: "findShell", value: function(i) {
        for (var s = 0, l = null, d = i.iterator(); d.hasNext(); ) {
          var y = d.next();
          y.isHole() || (l = y, s++);
        }
        return ee.isTrue(s <= 1, "found two shells in MinimalEdgeRing list"), l;
      } }, { key: "add", value: function() {
        if (arguments.length === 1) {
          var i = arguments[0];
          this.add(i.getEdgeEnds(), i.getNodes());
        } else if (arguments.length === 2) {
          var s = arguments[0], l = arguments[1];
          Wa.linkResultDirectedEdges(l);
          var d = this.buildMaximalEdgeRings(s), y = new ve(), x = this.buildMinimalEdgeRings(d, this._shellList, y);
          this.sortShellsAndHoles(x, this._shellList, y), this.placeFreeHoles(this._shellList, y);
        }
      } }], [{ key: "constructor_", value: function() {
        this._geometryFactory = null, this._shellList = new ve();
        var i = arguments[0];
        this._geometryFactory = i;
      } }, { key: "findEdgeRingContaining", value: function(i, s) {
        for (var l = i.getLinearRing(), d = l.getEnvelopeInternal(), y = l.getCoordinateN(0), x = null, E = null, P = s.iterator(); P.hasNext(); ) {
          var F = P.next(), $ = F.getLinearRing(), K = $.getEnvelopeInternal();
          if (!K.equals(d) && K.contains(d)) {
            y = tt.ptNotInList(l.getCoordinates(), $.getCoordinates());
            var ne = !1;
            qs.isInRing(y, $.getCoordinates()) && (ne = !0), ne && (x === null || E.contains(K)) && (E = (x = F).getLinearRing().getEnvelopeInternal());
          }
        }
        return x;
      } }]);
    }(), $a = function() {
      return c(function h() {
        o(this, h);
      }, [{ key: "getBounds", value: function() {
      } }]);
    }(), sn = function() {
      return c(function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }, [{ key: "getItem", value: function() {
        return this._item;
      } }, { key: "getBounds", value: function() {
        return this._bounds;
      } }, { key: "interfaces_", get: function() {
        return [$a, M];
      } }], [{ key: "constructor_", value: function() {
        this._bounds = null, this._item = null;
        var h = arguments[0], i = arguments[1];
        this._bounds = h, this._item = i;
      } }]);
    }(), Ci = function() {
      return c(function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }, [{ key: "poll", value: function() {
        if (this.isEmpty()) return null;
        var h = this._items.get(1);
        return this._items.set(1, this._items.get(this._size)), this._size -= 1, this.reorder(1), h;
      } }, { key: "size", value: function() {
        return this._size;
      } }, { key: "reorder", value: function(h) {
        for (var i = null, s = this._items.get(h); 2 * h <= this._size && ((i = 2 * h) !== this._size && this._items.get(i + 1).compareTo(this._items.get(i)) < 0 && i++, this._items.get(i).compareTo(s) < 0); h = i) this._items.set(h, this._items.get(i));
        this._items.set(h, s);
      } }, { key: "clear", value: function() {
        this._size = 0, this._items.clear();
      } }, { key: "peek", value: function() {
        return this.isEmpty() ? null : this._items.get(1);
      } }, { key: "isEmpty", value: function() {
        return this._size === 0;
      } }, { key: "add", value: function(h) {
        this._items.add(null), this._size += 1;
        var i = this._size;
        for (this._items.set(0, h); h.compareTo(this._items.get(Math.trunc(i / 2))) < 0; i /= 2) this._items.set(i, this._items.get(Math.trunc(i / 2)));
        this._items.set(i, h);
      } }], [{ key: "constructor_", value: function() {
        this._size = null, this._items = null, this._size = 0, this._items = new ve(), this._items.add(null);
      } }]);
    }(), mg = function() {
      return c(function h() {
        o(this, h);
      }, [{ key: "insert", value: function(h, i) {
      } }, { key: "remove", value: function(h, i) {
      } }, { key: "query", value: function() {
      } }]);
    }(), Pt = function() {
      return c(function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }, [{ key: "getLevel", value: function() {
        return this._level;
      } }, { key: "size", value: function() {
        return this._childBoundables.size();
      } }, { key: "getChildBoundables", value: function() {
        return this._childBoundables;
      } }, { key: "addChildBoundable", value: function(h) {
        ee.isTrue(this._bounds === null), this._childBoundables.add(h);
      } }, { key: "isEmpty", value: function() {
        return this._childBoundables.isEmpty();
      } }, { key: "getBounds", value: function() {
        return this._bounds === null && (this._bounds = this.computeBounds()), this._bounds;
      } }, { key: "interfaces_", get: function() {
        return [$a, M];
      } }], [{ key: "constructor_", value: function() {
        if (this._childBoundables = new ve(), this._bounds = null, this._level = null, arguments.length !== 0) {
          if (arguments.length === 1) {
            var h = arguments[0];
            this._level = h;
          }
        }
      } }]);
    }(), Yn = { reverseOrder: function() {
      return { compare: function(h, i) {
        return i.compareTo(h);
      } };
    }, min: function(h) {
      return Yn.sort(h), h.get(0);
    }, sort: function(h, i) {
      var s = h.toArray();
      i ? Cn.sort(s, i) : Cn.sort(s);
      for (var l = h.iterator(), d = 0, y = s.length; d < y; d++) l.next(), l.set(s[d]);
    }, singletonList: function(h) {
      var i = new ve();
      return i.add(h), i;
    } }, vg = function() {
      function h() {
        o(this, h);
      }
      return c(h, null, [{ key: "maxDistance", value: function(i, s, l, d, y, x, E, P) {
        var F = h.distance(i, s, y, x);
        return F = Math.max(F, h.distance(i, s, E, P)), F = Math.max(F, h.distance(l, d, y, x)), F = Math.max(F, h.distance(l, d, E, P));
      } }, { key: "distance", value: function(i, s, l, d) {
        var y = l - i, x = d - s;
        return Math.sqrt(y * y + x * x);
      } }, { key: "maximumDistance", value: function(i, s) {
        var l = Math.min(i.getMinX(), s.getMinX()), d = Math.min(i.getMinY(), s.getMinY()), y = Math.max(i.getMaxX(), s.getMaxX()), x = Math.max(i.getMaxY(), s.getMaxY());
        return h.distance(l, d, y, x);
      } }, { key: "minMaxDistance", value: function(i, s) {
        var l = i.getMinX(), d = i.getMinY(), y = i.getMaxX(), x = i.getMaxY(), E = s.getMinX(), P = s.getMinY(), F = s.getMaxX(), $ = s.getMaxY(), K = h.maxDistance(l, d, l, x, E, P, E, $);
        return K = Math.min(K, h.maxDistance(l, d, l, x, E, P, F, P)), K = Math.min(K, h.maxDistance(l, d, l, x, F, $, E, $)), K = Math.min(K, h.maxDistance(l, d, l, x, F, $, F, P)), K = Math.min(K, h.maxDistance(l, d, y, d, E, P, E, $)), K = Math.min(K, h.maxDistance(l, d, y, d, E, P, F, P)), K = Math.min(K, h.maxDistance(l, d, y, d, F, $, E, $)), K = Math.min(K, h.maxDistance(l, d, y, d, F, $, F, P)), K = Math.min(K, h.maxDistance(y, x, l, x, E, P, E, $)), K = Math.min(K, h.maxDistance(y, x, l, x, E, P, F, P)), K = Math.min(K, h.maxDistance(y, x, l, x, F, $, E, $)), K = Math.min(K, h.maxDistance(y, x, l, x, F, $, F, P)), K = Math.min(K, h.maxDistance(y, x, y, d, E, P, E, $)), K = Math.min(K, h.maxDistance(y, x, y, d, E, P, F, P)), K = Math.min(K, h.maxDistance(y, x, y, d, F, $, E, $)), K = Math.min(K, h.maxDistance(y, x, y, d, F, $, F, P));
      } }]);
    }(), Xn = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "maximumDistance", value: function() {
        return vg.maximumDistance(this._boundable1.getBounds(), this._boundable2.getBounds());
      } }, { key: "expandToQueue", value: function(i, s) {
        var l = h.isComposite(this._boundable1), d = h.isComposite(this._boundable2);
        if (l && d) return h.area(this._boundable1) > h.area(this._boundable2) ? (this.expand(this._boundable1, this._boundable2, !1, i, s), null) : (this.expand(this._boundable2, this._boundable1, !0, i, s), null);
        if (l) return this.expand(this._boundable1, this._boundable2, !1, i, s), null;
        if (d) return this.expand(this._boundable2, this._boundable1, !0, i, s), null;
        throw new O("neither boundable is composite");
      } }, { key: "isLeaves", value: function() {
        return !(h.isComposite(this._boundable1) || h.isComposite(this._boundable2));
      } }, { key: "compareTo", value: function(i) {
        var s = i;
        return this._distance < s._distance ? -1 : this._distance > s._distance ? 1 : 0;
      } }, { key: "expand", value: function(i, s, l, d, y) {
        for (var x = i.getChildBoundables().iterator(); x.hasNext(); ) {
          var E = x.next(), P = null;
          (P = l ? new h(s, E, this._itemDistance) : new h(E, s, this._itemDistance)).getDistance() < y && d.add(P);
        }
      } }, { key: "getBoundable", value: function(i) {
        return i === 0 ? this._boundable1 : this._boundable2;
      } }, { key: "getDistance", value: function() {
        return this._distance;
      } }, { key: "distance", value: function() {
        return this.isLeaves() ? this._itemDistance.distance(this._boundable1, this._boundable2) : this._boundable1.getBounds().distance(this._boundable2.getBounds());
      } }, { key: "interfaces_", get: function() {
        return [V];
      } }], [{ key: "constructor_", value: function() {
        this._boundable1 = null, this._boundable2 = null, this._distance = null, this._itemDistance = null;
        var i = arguments[0], s = arguments[1], l = arguments[2];
        this._boundable1 = i, this._boundable2 = s, this._itemDistance = l, this._distance = this.distance();
      } }, { key: "area", value: function(i) {
        return i.getBounds().getArea();
      } }, { key: "isComposite", value: function(i) {
        return i instanceof Pt;
      } }]);
    }(), Za = function() {
      return c(function h() {
        o(this, h);
      }, [{ key: "visitItem", value: function(h) {
      } }]);
    }(), Vn = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "queryInternal", value: function() {
        if (Ee(arguments[2], Za) && arguments[0] instanceof Object && arguments[1] instanceof Pt) for (var i = arguments[0], s = arguments[2], l = arguments[1].getChildBoundables(), d = 0; d < l.size(); d++) {
          var y = l.get(d);
          this.getIntersectsOp().intersects(y.getBounds(), i) && (y instanceof Pt ? this.queryInternal(i, y, s) : y instanceof sn ? s.visitItem(y.getItem()) : ee.shouldNeverReachHere());
        }
        else if (Ee(arguments[2], tn) && arguments[0] instanceof Object && arguments[1] instanceof Pt) for (var x = arguments[0], E = arguments[2], P = arguments[1].getChildBoundables(), F = 0; F < P.size(); F++) {
          var $ = P.get(F);
          this.getIntersectsOp().intersects($.getBounds(), x) && ($ instanceof Pt ? this.queryInternal(x, $, E) : $ instanceof sn ? E.add($.getItem()) : ee.shouldNeverReachHere());
        }
      } }, { key: "getNodeCapacity", value: function() {
        return this._nodeCapacity;
      } }, { key: "lastNode", value: function(i) {
        return i.get(i.size() - 1);
      } }, { key: "size", value: function() {
        if (arguments.length === 0) return this.isEmpty() ? 0 : (this.build(), this.size(this._root));
        if (arguments.length === 1) {
          for (var i = 0, s = arguments[0].getChildBoundables().iterator(); s.hasNext(); ) {
            var l = s.next();
            l instanceof Pt ? i += this.size(l) : l instanceof sn && (i += 1);
          }
          return i;
        }
      } }, { key: "removeItem", value: function(i, s) {
        for (var l = null, d = i.getChildBoundables().iterator(); d.hasNext(); ) {
          var y = d.next();
          y instanceof sn && y.getItem() === s && (l = y);
        }
        return l !== null && (i.getChildBoundables().remove(l), !0);
      } }, { key: "itemsTree", value: function() {
        if (arguments.length === 0) {
          this.build();
          var i = this.itemsTree(this._root);
          return i === null ? new ve() : i;
        }
        if (arguments.length === 1) {
          for (var s = arguments[0], l = new ve(), d = s.getChildBoundables().iterator(); d.hasNext(); ) {
            var y = d.next();
            if (y instanceof Pt) {
              var x = this.itemsTree(y);
              x !== null && l.add(x);
            } else y instanceof sn ? l.add(y.getItem()) : ee.shouldNeverReachHere();
          }
          return l.size() <= 0 ? null : l;
        }
      } }, { key: "insert", value: function(i, s) {
        ee.isTrue(!this._built, "Cannot insert items into an STR packed R-tree after it has been built."), this._itemBoundables.add(new sn(i, s));
      } }, { key: "boundablesAtLevel", value: function() {
        if (arguments.length === 1) {
          var i = arguments[0], s = new ve();
          return this.boundablesAtLevel(i, this._root, s), s;
        }
        if (arguments.length === 3) {
          var l = arguments[0], d = arguments[1], y = arguments[2];
          if (ee.isTrue(l > -2), d.getLevel() === l) return y.add(d), null;
          for (var x = d.getChildBoundables().iterator(); x.hasNext(); ) {
            var E = x.next();
            E instanceof Pt ? this.boundablesAtLevel(l, E, y) : (ee.isTrue(E instanceof sn), l === -1 && y.add(E));
          }
          return null;
        }
      } }, { key: "query", value: function() {
        if (arguments.length === 1) {
          var i = arguments[0];
          this.build();
          var s = new ve();
          return this.isEmpty() || this.getIntersectsOp().intersects(this._root.getBounds(), i) && this.queryInternal(i, this._root, s), s;
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
          var i = arguments[0], s = arguments[1];
          return this.build(), !!this.getIntersectsOp().intersects(this._root.getBounds(), i) && this.remove(i, this._root, s);
        }
        if (arguments.length === 3) {
          var l = arguments[0], d = arguments[1], y = arguments[2], x = this.removeItem(d, y);
          if (x) return !0;
          for (var E = null, P = d.getChildBoundables().iterator(); P.hasNext(); ) {
            var F = P.next();
            if (this.getIntersectsOp().intersects(F.getBounds(), l) && F instanceof Pt && (x = this.remove(l, F, y))) {
              E = F;
              break;
            }
          }
          return E !== null && E.getChildBoundables().isEmpty() && d.getChildBoundables().remove(E), x;
        }
      } }, { key: "createHigherLevels", value: function(i, s) {
        ee.isTrue(!i.isEmpty());
        var l = this.createParentBoundables(i, s + 1);
        return l.size() === 1 ? l.get(0) : this.createHigherLevels(l, s + 1);
      } }, { key: "depth", value: function() {
        if (arguments.length === 0) return this.isEmpty() ? 0 : (this.build(), this.depth(this._root));
        if (arguments.length === 1) {
          for (var i = 0, s = arguments[0].getChildBoundables().iterator(); s.hasNext(); ) {
            var l = s.next();
            if (l instanceof Pt) {
              var d = this.depth(l);
              d > i && (i = d);
            }
          }
          return i + 1;
        }
      } }, { key: "createParentBoundables", value: function(i, s) {
        ee.isTrue(!i.isEmpty());
        var l = new ve();
        l.add(this.createNode(s));
        var d = new ve(i);
        Yn.sort(d, this.getComparator());
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
        if (this._root = null, this._built = !1, this._itemBoundables = new ve(), this._nodeCapacity = null, arguments.length === 0) h.constructor_.call(this, h.DEFAULT_NODE_CAPACITY);
        else if (arguments.length === 1) {
          var i = arguments[0];
          ee.isTrue(i > 1, "Node capacity must be greater than 1"), this._nodeCapacity = i;
        }
      } }, { key: "compareDoubles", value: function(i, s) {
        return i > s ? 1 : i < s ? -1 : 0;
      } }]);
    }();
    Vn.IntersectsOp = function() {
    }, Vn.DEFAULT_NODE_CAPACITY = 10;
    var yg = function() {
      return c(function h() {
        o(this, h);
      }, [{ key: "distance", value: function(h, i) {
      } }]);
    }(), Vt = function(h) {
      function i() {
        var s;
        return o(this, i), s = r(this, i), i.constructor_.apply(s, arguments), s;
      }
      return m(i, h), c(i, [{ key: "createParentBoundablesFromVerticalSlices", value: function(s, l) {
        ee.isTrue(s.length > 0);
        for (var d = new ve(), y = 0; y < s.length; y++) d.addAll(this.createParentBoundablesFromVerticalSlice(s[y], l));
        return d;
      } }, { key: "nearestNeighbourK", value: function() {
        if (arguments.length === 2) {
          var s = arguments[0], l = arguments[1];
          return this.nearestNeighbourK(s, W.POSITIVE_INFINITY, l);
        }
        if (arguments.length === 3) {
          var d = arguments[0], y = arguments[2], x = arguments[1], E = new Ci();
          E.add(d);
          for (var P = new Ci(); !E.isEmpty() && x >= 0; ) {
            var F = E.poll(), $ = F.getDistance();
            if ($ >= x) break;
            F.isLeaves() ? P.size() < y ? P.add(F) : (P.peek().getDistance() > $ && (P.poll(), P.add(F)), x = P.peek().getDistance()) : F.expandToQueue(E, x);
          }
          return i.getItems(P);
        }
      } }, { key: "createNode", value: function(s) {
        return new Ka(s);
      } }, { key: "size", value: function() {
        return arguments.length === 0 ? w(i, "size", this, 1).call(this) : w(i, "size", this, 1).apply(this, arguments);
      } }, { key: "insert", value: function() {
        if (!(arguments.length === 2 && arguments[1] instanceof Object && arguments[0] instanceof _e)) return w(i, "insert", this, 1).apply(this, arguments);
        var s = arguments[0], l = arguments[1];
        if (s.isNull()) return null;
        w(i, "insert", this, 1).call(this, s, l);
      } }, { key: "getIntersectsOp", value: function() {
        return i.intersectsOp;
      } }, { key: "verticalSlices", value: function(s, l) {
        for (var d = Math.trunc(Math.ceil(s.size() / l)), y = new Array(l).fill(null), x = s.iterator(), E = 0; E < l; E++) {
          y[E] = new ve();
          for (var P = 0; x.hasNext() && P < d; ) {
            var F = x.next();
            y[E].add(F), P++;
          }
        }
        return y;
      } }, { key: "query", value: function() {
        if (arguments.length === 1) {
          var s = arguments[0];
          return w(i, "query", this, 1).call(this, s);
        }
        if (arguments.length === 2) {
          var l = arguments[0], d = arguments[1];
          w(i, "query", this, 1).call(this, l, d);
        }
      } }, { key: "getComparator", value: function() {
        return i.yComparator;
      } }, { key: "createParentBoundablesFromVerticalSlice", value: function(s, l) {
        return w(i, "createParentBoundables", this, 1).call(this, s, l);
      } }, { key: "remove", value: function() {
        if (arguments.length === 2 && arguments[1] instanceof Object && arguments[0] instanceof _e) {
          var s = arguments[0], l = arguments[1];
          return w(i, "remove", this, 1).call(this, s, l);
        }
        return w(i, "remove", this, 1).apply(this, arguments);
      } }, { key: "depth", value: function() {
        return arguments.length === 0 ? w(i, "depth", this, 1).call(this) : w(i, "depth", this, 1).apply(this, arguments);
      } }, { key: "createParentBoundables", value: function(s, l) {
        ee.isTrue(!s.isEmpty());
        var d = Math.trunc(Math.ceil(s.size() / this.getNodeCapacity())), y = new ve(s);
        Yn.sort(y, i.xComparator);
        var x = this.verticalSlices(y, Math.trunc(Math.ceil(Math.sqrt(d))));
        return this.createParentBoundablesFromVerticalSlices(x, l);
      } }, { key: "nearestNeighbour", value: function() {
        if (arguments.length === 1) {
          if (Ee(arguments[0], yg)) {
            var s = arguments[0];
            if (this.isEmpty()) return null;
            var l = new Xn(this.getRoot(), this.getRoot(), s);
            return this.nearestNeighbour(l);
          }
          if (arguments[0] instanceof Xn) {
            var d = arguments[0], y = W.POSITIVE_INFINITY, x = null, E = new Ci();
            for (E.add(d); !E.isEmpty() && y > 0; ) {
              var P = E.poll(), F = P.getDistance();
              if (F >= y) break;
              P.isLeaves() ? (y = F, x = P) : P.expandToQueue(E, y);
            }
            return x === null ? null : [x.getBoundable(0).getItem(), x.getBoundable(1).getItem()];
          }
        } else {
          if (arguments.length === 2) {
            var $ = arguments[0], K = arguments[1];
            if (this.isEmpty() || $.isEmpty()) return null;
            var ne = new Xn(this.getRoot(), $.getRoot(), K);
            return this.nearestNeighbour(ne);
          }
          if (arguments.length === 3) {
            var ue = arguments[2], he = new sn(arguments[0], arguments[1]), ge = new Xn(this.getRoot(), he, ue);
            return this.nearestNeighbour(ge)[0];
          }
          if (arguments.length === 4) {
            var Re = arguments[2], Pe = arguments[3], Ue = new sn(arguments[0], arguments[1]), st = new Xn(this.getRoot(), Ue, Re);
            return this.nearestNeighbourK(st, Pe);
          }
        }
      } }, { key: "isWithinDistance", value: function() {
        if (arguments.length === 2) {
          var s = arguments[0], l = arguments[1], d = W.POSITIVE_INFINITY, y = new Ci();
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
          var P = arguments[0], F = arguments[1], $ = arguments[2], K = new Xn(this.getRoot(), P.getRoot(), F);
          return this.isWithinDistance(K, $);
        }
      } }, { key: "interfaces_", get: function() {
        return [mg, M];
      } }], [{ key: "constructor_", value: function() {
        if (arguments.length === 0) i.constructor_.call(this, i.DEFAULT_NODE_CAPACITY);
        else if (arguments.length === 1) {
          var s = arguments[0];
          Vn.constructor_.call(this, s);
        }
      } }, { key: "centreX", value: function(s) {
        return i.avg(s.getMinX(), s.getMaxX());
      } }, { key: "avg", value: function(s, l) {
        return (s + l) / 2;
      } }, { key: "getItems", value: function(s) {
        for (var l = new Array(s.size()).fill(null), d = 0; !s.isEmpty(); ) {
          var y = s.poll();
          l[d] = y.getBoundable(0).getItem(), d++;
        }
        return l;
      } }, { key: "centreY", value: function(s) {
        return i.avg(s.getMinY(), s.getMaxY());
      } }]);
    }(Vn), Ka = function(h) {
      function i() {
        var s;
        return o(this, i), s = r(this, i), i.constructor_.apply(s, arguments), s;
      }
      return m(i, h), c(i, [{ key: "computeBounds", value: function() {
        for (var s = null, l = this.getChildBoundables().iterator(); l.hasNext(); ) {
          var d = l.next();
          s === null ? s = new _e(d.getBounds()) : s.expandToInclude(d.getBounds());
        }
        return s;
      } }], [{ key: "constructor_", value: function() {
        var s = arguments[0];
        Pt.constructor_.call(this, s);
      } }]);
    }(Pt);
    Vt.STRtreeNode = Ka, Vt.xComparator = new (function() {
      return c(function h() {
        o(this, h);
      }, [{ key: "interfaces_", get: function() {
        return [j];
      } }, { key: "compare", value: function(h, i) {
        return Vn.compareDoubles(Vt.centreX(h.getBounds()), Vt.centreX(i.getBounds()));
      } }]);
    }())(), Vt.yComparator = new (function() {
      return c(function h() {
        o(this, h);
      }, [{ key: "interfaces_", get: function() {
        return [j];
      } }, { key: "compare", value: function(h, i) {
        return Vn.compareDoubles(Vt.centreY(h.getBounds()), Vt.centreY(i.getBounds()));
      } }]);
    }())(), Vt.intersectsOp = new (function() {
      return c(function h() {
        o(this, h);
      }, [{ key: "interfaces_", get: function() {
        return [IntersectsOp];
      } }, { key: "intersects", value: function(h, i) {
        return h.intersects(i);
      } }]);
    }())(), Vt.DEFAULT_NODE_CAPACITY = 10;
    var pg = function() {
      function h() {
        o(this, h);
      }
      return c(h, null, [{ key: "relativeSign", value: function(i, s) {
        return i < s ? -1 : i > s ? 1 : 0;
      } }, { key: "compare", value: function(i, s, l) {
        if (s.equals2D(l)) return 0;
        var d = h.relativeSign(s.x, l.x), y = h.relativeSign(s.y, l.y);
        switch (i) {
          case 0:
            return h.compareValue(d, y);
          case 1:
            return h.compareValue(y, d);
          case 2:
            return h.compareValue(y, -d);
          case 3:
            return h.compareValue(-d, y);
          case 4:
            return h.compareValue(-d, -y);
          case 5:
            return h.compareValue(-y, -d);
          case 6:
            return h.compareValue(-y, d);
          case 7:
            return h.compareValue(d, -y);
        }
        return ee.shouldNeverReachHere("invalid octant value"), 0;
      } }, { key: "compareValue", value: function(i, s) {
        return i < 0 ? -1 : i > 0 ? 1 : s < 0 ? -1 : s > 0 ? 1 : 0;
      } }]);
    }(), _g = function() {
      return c(function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }, [{ key: "getCoordinate", value: function() {
        return this.coord;
      } }, { key: "print", value: function(h) {
        h.print(this.coord), h.print(" seg # = " + this.segmentIndex);
      } }, { key: "compareTo", value: function(h) {
        var i = h;
        return this.segmentIndex < i.segmentIndex ? -1 : this.segmentIndex > i.segmentIndex ? 1 : this.coord.equals2D(i.coord) ? 0 : this._isInterior ? i._isInterior ? pg.compare(this._segmentOctant, this.coord, i.coord) : 1 : -1;
      } }, { key: "isEndPoint", value: function(h) {
        return this.segmentIndex === 0 && !this._isInterior || this.segmentIndex === h;
      } }, { key: "toString", value: function() {
        return this.segmentIndex + ":" + this.coord.toString();
      } }, { key: "isInterior", value: function() {
        return this._isInterior;
      } }, { key: "interfaces_", get: function() {
        return [V];
      } }], [{ key: "constructor_", value: function() {
        this._segString = null, this.coord = null, this.segmentIndex = null, this._segmentOctant = null, this._isInterior = null;
        var h = arguments[0], i = arguments[1], s = arguments[2], l = arguments[3];
        this._segString = h, this.coord = new Z(i), this.segmentIndex = s, this._segmentOctant = l, this._isInterior = !i.equals2D(h.getCoordinate(s));
      } }]);
    }(), wg = function() {
      return c(function h() {
        o(this, h);
      }, [{ key: "hasNext", value: function() {
      } }, { key: "next", value: function() {
      } }, { key: "remove", value: function() {
      } }]);
    }(), xg = function() {
      return c(function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }, [{ key: "getSplitCoordinates", value: function() {
        var h = new xr();
        this.addEndpoints();
        for (var i = this.iterator(), s = i.next(); i.hasNext(); ) {
          var l = i.next();
          this.addEdgeCoordinates(s, l, h), s = l;
        }
        return h.toCoordinateArray();
      } }, { key: "addCollapsedNodes", value: function() {
        var h = new ve();
        this.findCollapsesFromInsertedNodes(h), this.findCollapsesFromExistingVertices(h);
        for (var i = h.iterator(); i.hasNext(); ) {
          var s = i.next().intValue();
          this.add(this._edge.getCoordinate(s), s);
        }
      } }, { key: "createSplitEdgePts", value: function(h, i) {
        var s = i.segmentIndex - h.segmentIndex + 2;
        if (s === 2) return [new Z(h.coord), new Z(i.coord)];
        var l = this._edge.getCoordinate(i.segmentIndex), d = i.isInterior() || !i.coord.equals2D(l);
        d || s--;
        var y = new Array(s).fill(null), x = 0;
        y[x++] = new Z(h.coord);
        for (var E = h.segmentIndex + 1; E <= i.segmentIndex; E++) y[x++] = this._edge.getCoordinate(E);
        return d && (y[x] = new Z(i.coord)), y;
      } }, { key: "print", value: function(h) {
        h.println("Intersections:");
        for (var i = this.iterator(); i.hasNext(); )
          i.next().print(h);
      } }, { key: "findCollapsesFromExistingVertices", value: function(h) {
        for (var i = 0; i < this._edge.size() - 2; i++) {
          var s = this._edge.getCoordinate(i);
          this._edge.getCoordinate(i + 1);
          var l = this._edge.getCoordinate(i + 2);
          s.equals2D(l) && h.add(mn.valueOf(i + 1));
        }
      } }, { key: "addEdgeCoordinates", value: function(h, i, s) {
        var l = this.createSplitEdgePts(h, i);
        s.add(l, !1);
      } }, { key: "iterator", value: function() {
        return this._nodeMap.values().iterator();
      } }, { key: "addSplitEdges", value: function(h) {
        this.addEndpoints(), this.addCollapsedNodes();
        for (var i = this.iterator(), s = i.next(); i.hasNext(); ) {
          var l = i.next(), d = this.createSplitEdge(s, l);
          h.add(d), s = l;
        }
      } }, { key: "findCollapseIndex", value: function(h, i, s) {
        if (!h.coord.equals2D(i.coord)) return !1;
        var l = i.segmentIndex - h.segmentIndex;
        return i.isInterior() || l--, l === 1 && (s[0] = h.segmentIndex + 1, !0);
      } }, { key: "findCollapsesFromInsertedNodes", value: function(h) {
        for (var i = new Array(1).fill(null), s = this.iterator(), l = s.next(); s.hasNext(); ) {
          var d = s.next();
          this.findCollapseIndex(l, d, i) && h.add(mn.valueOf(i[0])), l = d;
        }
      } }, { key: "getEdge", value: function() {
        return this._edge;
      } }, { key: "addEndpoints", value: function() {
        var h = this._edge.size() - 1;
        this.add(this._edge.getCoordinate(0), 0), this.add(this._edge.getCoordinate(h), h);
      } }, { key: "createSplitEdge", value: function(h, i) {
        var s = this.createSplitEdgePts(h, i);
        return new bn(s, this._edge.getData());
      } }, { key: "add", value: function(h, i) {
        var s = new _g(this._edge, h, i, this._edge.getSegmentOctant(i)), l = this._nodeMap.get(s);
        return l !== null ? (ee.isTrue(l.coord.equals2D(h), "Found equal nodes with different coordinates"), l) : (this._nodeMap.put(s, s), s);
      } }, { key: "checkSplitEdgesCorrectness", value: function(h) {
        var i = this._edge.getCoordinates(), s = h.get(0).getCoordinate(0);
        if (!s.equals2D(i[0])) throw new Q("bad split edge start point at " + s);
        var l = h.get(h.size() - 1).getCoordinates(), d = l[l.length - 1];
        if (!d.equals2D(i[i.length - 1])) throw new Q("bad split edge end point at " + d);
      } }], [{ key: "constructor_", value: function() {
        this._nodeMap = new kr(), this._edge = null;
        var h = arguments[0];
        this._edge = h;
      } }]);
    }(), Eg = function() {
      function h() {
        o(this, h);
      }
      return c(h, null, [{ key: "octant", value: function() {
        if (typeof arguments[0] == "number" && typeof arguments[1] == "number") {
          var i = arguments[0], s = arguments[1];
          if (i === 0 && s === 0) throw new O("Cannot compute the octant for point ( " + i + ", " + s + " )");
          var l = Math.abs(i), d = Math.abs(s);
          return i >= 0 ? s >= 0 ? l >= d ? 0 : 1 : l >= d ? 7 : 6 : s >= 0 ? l >= d ? 3 : 2 : l >= d ? 4 : 5;
        }
        if (arguments[0] instanceof Z && arguments[1] instanceof Z) {
          var y = arguments[0], x = arguments[1], E = x.x - y.x, P = x.y - y.y;
          if (E === 0 && P === 0) throw new O("Cannot compute the octant for two identical points " + y);
          return h.octant(E, P);
        }
      } }]);
    }(), Cg = function() {
      return c(function h() {
        o(this, h);
      }, [{ key: "getCoordinates", value: function() {
      } }, { key: "size", value: function() {
      } }, { key: "getCoordinate", value: function(h) {
      } }, { key: "isClosed", value: function() {
      } }, { key: "setData", value: function(h) {
      } }, { key: "getData", value: function() {
      } }]);
    }(), kg = function() {
      return c(function h() {
        o(this, h);
      }, [{ key: "addIntersection", value: function(h, i) {
      } }, { key: "interfaces_", get: function() {
        return [Cg];
      } }]);
    }(), bn = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "getCoordinates", value: function() {
        return this._pts;
      } }, { key: "size", value: function() {
        return this._pts.length;
      } }, { key: "getCoordinate", value: function(i) {
        return this._pts[i];
      } }, { key: "isClosed", value: function() {
        return this._pts[0].equals(this._pts[this._pts.length - 1]);
      } }, { key: "getSegmentOctant", value: function(i) {
        return i === this._pts.length - 1 ? -1 : this.safeOctant(this.getCoordinate(i), this.getCoordinate(i + 1));
      } }, { key: "setData", value: function(i) {
        this._data = i;
      } }, { key: "safeOctant", value: function(i, s) {
        return i.equals2D(s) ? 0 : Eg.octant(i, s);
      } }, { key: "getData", value: function() {
        return this._data;
      } }, { key: "addIntersection", value: function() {
        if (arguments.length === 2) {
          var i = arguments[0], s = arguments[1];
          this.addIntersectionNode(i, s);
        } else if (arguments.length === 4) {
          var l = arguments[1], d = arguments[3], y = new Z(arguments[0].getIntersection(d));
          this.addIntersection(y, l);
        }
      } }, { key: "toString", value: function() {
        return Gs.toLineString(new Er(this._pts));
      } }, { key: "getNodeList", value: function() {
        return this._nodeList;
      } }, { key: "addIntersectionNode", value: function(i, s) {
        var l = s, d = l + 1;
        if (d < this._pts.length) {
          var y = this._pts[d];
          i.equals2D(y) && (l = d);
        }
        return this._nodeList.add(i, l);
      } }, { key: "addIntersections", value: function(i, s, l) {
        for (var d = 0; d < i.getIntersectionNum(); d++) this.addIntersection(i, s, l, d);
      } }, { key: "interfaces_", get: function() {
        return [kg];
      } }], [{ key: "constructor_", value: function() {
        this._nodeList = new xg(this), this._pts = null, this._data = null;
        var i = arguments[0], s = arguments[1];
        this._pts = i, this._data = s;
      } }, { key: "getNodedSubstrings", value: function() {
        if (arguments.length === 1) {
          var i = arguments[0], s = new ve();
          return h.getNodedSubstrings(i, s), s;
        }
        if (arguments.length === 2) for (var l = arguments[1], d = arguments[0].iterator(); d.hasNext(); )
          d.next().getNodeList().addSplitEdges(l);
      } }]);
    }(), Ct = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "minX", value: function() {
        return Math.min(this.p0.x, this.p1.x);
      } }, { key: "orientationIndex", value: function() {
        if (arguments[0] instanceof h) {
          var i = arguments[0], s = we.index(this.p0, this.p1, i.p0), l = we.index(this.p0, this.p1, i.p1);
          return s >= 0 && l >= 0 || s <= 0 && l <= 0 ? Math.max(s, l) : 0;
        }
        if (arguments[0] instanceof Z) {
          var d = arguments[0];
          return we.index(this.p0, this.p1, d);
        }
      } }, { key: "toGeometry", value: function(i) {
        return i.createLineString([this.p0, this.p1]);
      } }, { key: "isVertical", value: function() {
        return this.p0.x === this.p1.x;
      } }, { key: "equals", value: function(i) {
        if (!(i instanceof h)) return !1;
        var s = i;
        return this.p0.equals(s.p0) && this.p1.equals(s.p1);
      } }, { key: "intersection", value: function(i) {
        var s = new Sn();
        return s.computeIntersection(this.p0, this.p1, i.p0, i.p1), s.hasIntersection() ? s.getIntersection(0) : null;
      } }, { key: "project", value: function() {
        if (arguments[0] instanceof Z) {
          var i = arguments[0];
          if (i.equals(this.p0) || i.equals(this.p1)) return new Z(i);
          var s = this.projectionFactor(i), l = new Z();
          return l.x = this.p0.x + s * (this.p1.x - this.p0.x), l.y = this.p0.y + s * (this.p1.y - this.p0.y), l;
        }
        if (arguments[0] instanceof h) {
          var d = arguments[0], y = this.projectionFactor(d.p0), x = this.projectionFactor(d.p1);
          if (y >= 1 && x >= 1 || y <= 0 && x <= 0) return null;
          var E = this.project(d.p0);
          y < 0 && (E = this.p0), y > 1 && (E = this.p1);
          var P = this.project(d.p1);
          return x < 0 && (P = this.p0), x > 1 && (P = this.p1), new h(E, P);
        }
      } }, { key: "normalize", value: function() {
        this.p1.compareTo(this.p0) < 0 && this.reverse();
      } }, { key: "angle", value: function() {
        return Math.atan2(this.p1.y - this.p0.y, this.p1.x - this.p0.x);
      } }, { key: "getCoordinate", value: function(i) {
        return i === 0 ? this.p0 : this.p1;
      } }, { key: "distancePerpendicular", value: function(i) {
        return Yt.pointToLinePerpendicular(i, this.p0, this.p1);
      } }, { key: "minY", value: function() {
        return Math.min(this.p0.y, this.p1.y);
      } }, { key: "midPoint", value: function() {
        return h.midPoint(this.p0, this.p1);
      } }, { key: "projectionFactor", value: function(i) {
        if (i.equals(this.p0)) return 0;
        if (i.equals(this.p1)) return 1;
        var s = this.p1.x - this.p0.x, l = this.p1.y - this.p0.y, d = s * s + l * l;
        return d <= 0 ? W.NaN : ((i.x - this.p0.x) * s + (i.y - this.p0.y) * l) / d;
      } }, { key: "closestPoints", value: function(i) {
        var s = this.intersection(i);
        if (s !== null) return [s, s];
        var l = new Array(2).fill(null), d = W.MAX_VALUE, y = null, x = this.closestPoint(i.p0);
        d = x.distance(i.p0), l[0] = x, l[1] = i.p0;
        var E = this.closestPoint(i.p1);
        (y = E.distance(i.p1)) < d && (d = y, l[0] = E, l[1] = i.p1);
        var P = i.closestPoint(this.p0);
        (y = P.distance(this.p0)) < d && (d = y, l[0] = this.p0, l[1] = P);
        var F = i.closestPoint(this.p1);
        return (y = F.distance(this.p1)) < d && (d = y, l[0] = this.p1, l[1] = F), l;
      } }, { key: "closestPoint", value: function(i) {
        var s = this.projectionFactor(i);
        return s > 0 && s < 1 ? this.project(i) : this.p0.distance(i) < this.p1.distance(i) ? this.p0 : this.p1;
      } }, { key: "maxX", value: function() {
        return Math.max(this.p0.x, this.p1.x);
      } }, { key: "getLength", value: function() {
        return this.p0.distance(this.p1);
      } }, { key: "compareTo", value: function(i) {
        var s = i, l = this.p0.compareTo(s.p0);
        return l !== 0 ? l : this.p1.compareTo(s.p1);
      } }, { key: "reverse", value: function() {
        var i = this.p0;
        this.p0 = this.p1, this.p1 = i;
      } }, { key: "equalsTopo", value: function(i) {
        return this.p0.equals(i.p0) && this.p1.equals(i.p1) || this.p0.equals(i.p1) && this.p1.equals(i.p0);
      } }, { key: "lineIntersection", value: function(i) {
        return Ns.intersection(this.p0, this.p1, i.p0, i.p1);
      } }, { key: "maxY", value: function() {
        return Math.max(this.p0.y, this.p1.y);
      } }, { key: "pointAlongOffset", value: function(i, s) {
        var l = this.p0.x + i * (this.p1.x - this.p0.x), d = this.p0.y + i * (this.p1.y - this.p0.y), y = this.p1.x - this.p0.x, x = this.p1.y - this.p0.y, E = Math.sqrt(y * y + x * x), P = 0, F = 0;
        if (s !== 0) {
          if (E <= 0) throw new IllegalStateException("Cannot compute offset from zero-length line segment");
          P = s * y / E, F = s * x / E;
        }
        return new Z(l - F, d + P);
      } }, { key: "setCoordinates", value: function() {
        if (arguments.length === 1) {
          var i = arguments[0];
          this.setCoordinates(i.p0, i.p1);
        } else if (arguments.length === 2) {
          var s = arguments[0], l = arguments[1];
          this.p0.x = s.x, this.p0.y = s.y, this.p1.x = l.x, this.p1.y = l.y;
        }
      } }, { key: "segmentFraction", value: function(i) {
        var s = this.projectionFactor(i);
        return s < 0 ? s = 0 : (s > 1 || W.isNaN(s)) && (s = 1), s;
      } }, { key: "toString", value: function() {
        return "LINESTRING( " + this.p0.x + " " + this.p0.y + ", " + this.p1.x + " " + this.p1.y + ")";
      } }, { key: "isHorizontal", value: function() {
        return this.p0.y === this.p1.y;
      } }, { key: "reflect", value: function(i) {
        var s = this.p1.getY() - this.p0.getY(), l = this.p0.getX() - this.p1.getX(), d = this.p0.getY() * (this.p1.getX() - this.p0.getX()) - this.p0.getX() * (this.p1.getY() - this.p0.getY()), y = s * s + l * l, x = s * s - l * l, E = i.getX(), P = i.getY();
        return new Z((-x * E - 2 * s * l * P - 2 * s * d) / y, (x * P - 2 * s * l * E - 2 * l * d) / y);
      } }, { key: "distance", value: function() {
        if (arguments[0] instanceof h) {
          var i = arguments[0];
          return Yt.segmentToSegment(this.p0, this.p1, i.p0, i.p1);
        }
        if (arguments[0] instanceof Z) {
          var s = arguments[0];
          return Yt.pointToSegment(s, this.p0, this.p1);
        }
      } }, { key: "pointAlong", value: function(i) {
        var s = new Z();
        return s.x = this.p0.x + i * (this.p1.x - this.p0.x), s.y = this.p0.y + i * (this.p1.y - this.p0.y), s;
      } }, { key: "hashCode", value: function() {
        var i = W.doubleToLongBits(this.p0.x);
        i ^= 31 * W.doubleToLongBits(this.p0.y);
        var s = Math.trunc(i) ^ Math.trunc(i >> 32), l = W.doubleToLongBits(this.p1.x);
        return l ^= 31 * W.doubleToLongBits(this.p1.y), s ^ (Math.trunc(l) ^ Math.trunc(l >> 32));
      } }, { key: "interfaces_", get: function() {
        return [V, M];
      } }], [{ key: "constructor_", value: function() {
        if (this.p0 = null, this.p1 = null, arguments.length === 0) h.constructor_.call(this, new Z(), new Z());
        else if (arguments.length === 1) {
          var i = arguments[0];
          h.constructor_.call(this, i.p0, i.p1);
        } else if (arguments.length === 2) {
          var s = arguments[0], l = arguments[1];
          this.p0 = s, this.p1 = l;
        } else if (arguments.length === 4) {
          var d = arguments[0], y = arguments[1], x = arguments[2], E = arguments[3];
          h.constructor_.call(this, new Z(d, y), new Z(x, E));
        }
      } }, { key: "midPoint", value: function(i, s) {
        return new Z((i.x + s.x) / 2, (i.y + s.y) / 2);
      } }]);
    }(), Ig = function() {
      return c(function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }, [{ key: "overlap", value: function() {
        if (arguments.length !== 2) {
          if (arguments.length === 4) {
            var h = arguments[1], i = arguments[2], s = arguments[3];
            arguments[0].getLineSegment(h, this._overlapSeg1), i.getLineSegment(s, this._overlapSeg2), this.overlap(this._overlapSeg1, this._overlapSeg2);
          }
        }
      } }], [{ key: "constructor_", value: function() {
        this._overlapSeg1 = new Ct(), this._overlapSeg2 = new Ct();
      } }]);
    }(), Ja = function() {
      return c(function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }, [{ key: "getLineSegment", value: function(h, i) {
        i.p0 = this._pts[h], i.p1 = this._pts[h + 1];
      } }, { key: "computeSelect", value: function(h, i, s, l) {
        var d = this._pts[i], y = this._pts[s];
        if (s - i == 1) return l.select(this, i), null;
        if (!h.intersects(d, y)) return null;
        var x = Math.trunc((i + s) / 2);
        i < x && this.computeSelect(h, i, x, l), x < s && this.computeSelect(h, x, s, l);
      } }, { key: "getCoordinates", value: function() {
        for (var h = new Array(this._end - this._start + 1).fill(null), i = 0, s = this._start; s <= this._end; s++) h[i++] = this._pts[s];
        return h;
      } }, { key: "computeOverlaps", value: function() {
        if (arguments.length === 2) {
          var h = arguments[0], i = arguments[1];
          this.computeOverlaps(this._start, this._end, h, h._start, h._end, i);
        } else if (arguments.length === 6) {
          var s = arguments[0], l = arguments[1], d = arguments[2], y = arguments[3], x = arguments[4], E = arguments[5];
          if (l - s == 1 && x - y == 1) return E.overlap(this, s, d, y), null;
          if (!this.overlaps(s, l, d, y, x)) return null;
          var P = Math.trunc((s + l) / 2), F = Math.trunc((y + x) / 2);
          s < P && (y < F && this.computeOverlaps(s, P, d, y, F, E), F < x && this.computeOverlaps(s, P, d, F, x, E)), P < l && (y < F && this.computeOverlaps(P, l, d, y, F, E), F < x && this.computeOverlaps(P, l, d, F, x, E));
        }
      } }, { key: "setId", value: function(h) {
        this._id = h;
      } }, { key: "select", value: function(h, i) {
        this.computeSelect(h, this._start, this._end, i);
      } }, { key: "getEnvelope", value: function() {
        if (this._env === null) {
          var h = this._pts[this._start], i = this._pts[this._end];
          this._env = new _e(h, i);
        }
        return this._env;
      } }, { key: "overlaps", value: function(h, i, s, l, d) {
        return _e.intersects(this._pts[h], this._pts[i], s._pts[l], s._pts[d]);
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
        var h = arguments[0], i = arguments[1], s = arguments[2], l = arguments[3];
        this._pts = h, this._start = i, this._end = s, this._context = l;
      } }]);
    }(), Sg = function() {
      function h() {
        o(this, h);
      }
      return c(h, null, [{ key: "findChainEnd", value: function(i, s) {
        for (var l = s; l < i.length - 1 && i[l].equals2D(i[l + 1]); ) l++;
        if (l >= i.length - 1) return i.length - 1;
        for (var d = dt.quadrant(i[l], i[l + 1]), y = s + 1; y < i.length && !(!i[y - 1].equals2D(i[y]) && dt.quadrant(i[y - 1], i[y]) !== d); )
          y++;
        return y - 1;
      } }, { key: "getChains", value: function() {
        if (arguments.length === 1) {
          var i = arguments[0];
          return h.getChains(i, null);
        }
        if (arguments.length === 2) {
          var s = arguments[0], l = arguments[1], d = new ve(), y = 0;
          do {
            var x = h.findChainEnd(s, y), E = new Ja(s, y, x, l);
            d.add(E), y = x;
          } while (y < s.length - 1);
          return d;
        }
      } }]);
    }(), Ys = function() {
      return c(function h() {
        o(this, h);
      }, [{ key: "computeNodes", value: function(h) {
      } }, { key: "getNodedSubstrings", value: function() {
      } }]);
    }(), Qa = function() {
      return c(function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }, [{ key: "setSegmentIntersector", value: function(h) {
        this._segInt = h;
      } }, { key: "interfaces_", get: function() {
        return [Ys];
      } }], [{ key: "constructor_", value: function() {
        if (this._segInt = null, arguments.length !== 0) {
          if (arguments.length === 1) {
            var h = arguments[0];
            this.setSegmentIntersector(h);
          }
        }
      } }]);
    }(), Xs = function(h) {
      function i() {
        var s;
        return o(this, i), s = r(this, i), i.constructor_.apply(s, arguments), s;
      }
      return m(i, h), c(i, [{ key: "getMonotoneChains", value: function() {
        return this._monoChains;
      } }, { key: "getNodedSubstrings", value: function() {
        return bn.getNodedSubstrings(this._nodedSegStrings);
      } }, { key: "getIndex", value: function() {
        return this._index;
      } }, { key: "add", value: function(s) {
        for (var l = Sg.getChains(s.getCoordinates(), s).iterator(); l.hasNext(); ) {
          var d = l.next();
          d.setId(this._idCounter++), this._index.insert(d.getEnvelope(), d), this._monoChains.add(d);
        }
      } }, { key: "computeNodes", value: function(s) {
        this._nodedSegStrings = s;
        for (var l = s.iterator(); l.hasNext(); ) this.add(l.next());
        this.intersectChains();
      } }, { key: "intersectChains", value: function() {
        for (var s = new ja(this._segInt), l = this._monoChains.iterator(); l.hasNext(); ) for (var d = l.next(), y = this._index.query(d.getEnvelope()).iterator(); y.hasNext(); ) {
          var x = y.next();
          if (x.getId() > d.getId() && (d.computeOverlaps(x, s), this._nOverlaps++), this._segInt.isDone()) return null;
        }
      } }], [{ key: "constructor_", value: function() {
        if (this._monoChains = new ve(), this._index = new Vt(), this._idCounter = 0, this._nodedSegStrings = null, this._nOverlaps = 0, arguments.length !== 0) {
          if (arguments.length === 1) {
            var s = arguments[0];
            Qa.constructor_.call(this, s);
          }
        }
      } }]);
    }(Qa), ja = function(h) {
      function i() {
        var s;
        return o(this, i), s = r(this, i), i.constructor_.apply(s, arguments), s;
      }
      return m(i, h), c(i, [{ key: "overlap", value: function() {
        if (arguments.length !== 4) return w(i, "overlap", this, 1).apply(this, arguments);
        var s = arguments[1], l = arguments[2], d = arguments[3], y = arguments[0].getContext(), x = l.getContext();
        this._si.processIntersections(y, s, x, d);
      } }], [{ key: "constructor_", value: function() {
        this._si = null;
        var s = arguments[0];
        this._si = s;
      } }]);
    }(Ig);
    Xs.SegmentOverlapAction = ja;
    var Gt = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "isDeletable", value: function(i, s, l, d) {
        var y = this._inputLine[i], x = this._inputLine[s], E = this._inputLine[l];
        return !!this.isConcave(y, x, E) && !!this.isShallow(y, x, E, d) && this.isShallowSampled(y, x, i, l, d);
      } }, { key: "deleteShallowConcavities", value: function() {
        for (var i = 1, s = this.findNextNonDeletedIndex(i), l = this.findNextNonDeletedIndex(s), d = !1; l < this._inputLine.length; ) {
          var y = !1;
          this.isDeletable(i, s, l, this._distanceTol) && (this._isDeleted[s] = h.DELETE, y = !0, d = !0), i = y ? l : s, s = this.findNextNonDeletedIndex(i), l = this.findNextNonDeletedIndex(s);
        }
        return d;
      } }, { key: "isShallowConcavity", value: function(i, s, l, d) {
        return we.index(i, s, l) === this._angleOrientation && Yt.pointToSegment(s, i, l) < d;
      } }, { key: "isShallowSampled", value: function(i, s, l, d, y) {
        var x = Math.trunc((d - l) / h.NUM_PTS_TO_CHECK);
        x <= 0 && (x = 1);
        for (var E = l; E < d; E += x) if (!this.isShallow(i, s, this._inputLine[E], y)) return !1;
        return !0;
      } }, { key: "isConcave", value: function(i, s, l) {
        var d = we.index(i, s, l) === this._angleOrientation;
        return d;
      } }, { key: "simplify", value: function(i) {
        this._distanceTol = Math.abs(i), i < 0 && (this._angleOrientation = we.CLOCKWISE), this._isDeleted = new Array(this._inputLine.length).fill(null);
        var s = !1;
        do
          s = this.deleteShallowConcavities();
        while (s);
        return this.collapseLine();
      } }, { key: "findNextNonDeletedIndex", value: function(i) {
        for (var s = i + 1; s < this._inputLine.length && this._isDeleted[s] === h.DELETE; ) s++;
        return s;
      } }, { key: "isShallow", value: function(i, s, l, d) {
        return Yt.pointToSegment(s, i, l) < d;
      } }, { key: "collapseLine", value: function() {
        for (var i = new xr(), s = 0; s < this._inputLine.length; s++) this._isDeleted[s] !== h.DELETE && i.add(this._inputLine[s]);
        return i.toCoordinateArray();
      } }], [{ key: "constructor_", value: function() {
        this._inputLine = null, this._distanceTol = null, this._isDeleted = null, this._angleOrientation = we.COUNTERCLOCKWISE;
        var i = arguments[0];
        this._inputLine = i;
      } }, { key: "simplify", value: function(i, s) {
        return new h(i).simplify(s);
      } }]);
    }();
    Gt.INIT = 0, Gt.DELETE = 1, Gt.KEEP = 1, Gt.NUM_PTS_TO_CHECK = 10;
    var eu = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "getCoordinates", value: function() {
        return this._ptList.toArray(h.COORDINATE_ARRAY_TYPE);
      } }, { key: "setPrecisionModel", value: function(i) {
        this._precisionModel = i;
      } }, { key: "addPt", value: function(i) {
        var s = new Z(i);
        if (this._precisionModel.makePrecise(s), this.isRedundant(s)) return null;
        this._ptList.add(s);
      } }, { key: "reverse", value: function() {
      } }, { key: "addPts", value: function(i, s) {
        if (s) for (var l = 0; l < i.length; l++) this.addPt(i[l]);
        else for (var d = i.length - 1; d >= 0; d--) this.addPt(i[d]);
      } }, { key: "isRedundant", value: function(i) {
        if (this._ptList.size() < 1) return !1;
        var s = this._ptList.get(this._ptList.size() - 1);
        return i.distance(s) < this._minimimVertexDistance;
      } }, { key: "toString", value: function() {
        return new zn().createLineString(this.getCoordinates()).toString();
      } }, { key: "closeRing", value: function() {
        if (this._ptList.size() < 1) return null;
        var i = new Z(this._ptList.get(0)), s = this._ptList.get(this._ptList.size() - 1);
        if (i.equals(s)) return null;
        this._ptList.add(i);
      } }, { key: "setMinimumVertexDistance", value: function(i) {
        this._minimimVertexDistance = i;
      } }], [{ key: "constructor_", value: function() {
        this._ptList = null, this._precisionModel = null, this._minimimVertexDistance = 0, this._ptList = new ve();
      } }]);
    }();
    eu.COORDINATE_ARRAY_TYPE = new Array(0).fill(null);
    var kt = function() {
      function h() {
        o(this, h);
      }
      return c(h, null, [{ key: "toDegrees", value: function(i) {
        return 180 * i / Math.PI;
      } }, { key: "normalize", value: function(i) {
        for (; i > Math.PI; ) i -= h.PI_TIMES_2;
        for (; i <= -Math.PI; ) i += h.PI_TIMES_2;
        return i;
      } }, { key: "angle", value: function() {
        if (arguments.length === 1) {
          var i = arguments[0];
          return Math.atan2(i.y, i.x);
        }
        if (arguments.length === 2) {
          var s = arguments[0], l = arguments[1], d = l.x - s.x, y = l.y - s.y;
          return Math.atan2(y, d);
        }
      } }, { key: "isAcute", value: function(i, s, l) {
        var d = i.x - s.x, y = i.y - s.y;
        return d * (l.x - s.x) + y * (l.y - s.y) > 0;
      } }, { key: "isObtuse", value: function(i, s, l) {
        var d = i.x - s.x, y = i.y - s.y;
        return d * (l.x - s.x) + y * (l.y - s.y) < 0;
      } }, { key: "interiorAngle", value: function(i, s, l) {
        var d = h.angle(s, i), y = h.angle(s, l);
        return Math.abs(y - d);
      } }, { key: "normalizePositive", value: function(i) {
        if (i < 0) {
          for (; i < 0; ) i += h.PI_TIMES_2;
          i >= h.PI_TIMES_2 && (i = 0);
        } else {
          for (; i >= h.PI_TIMES_2; ) i -= h.PI_TIMES_2;
          i < 0 && (i = 0);
        }
        return i;
      } }, { key: "angleBetween", value: function(i, s, l) {
        var d = h.angle(s, i), y = h.angle(s, l);
        return h.diff(d, y);
      } }, { key: "diff", value: function(i, s) {
        var l = null;
        return (l = i < s ? s - i : i - s) > Math.PI && (l = 2 * Math.PI - l), l;
      } }, { key: "toRadians", value: function(i) {
        return i * Math.PI / 180;
      } }, { key: "getTurn", value: function(i, s) {
        var l = Math.sin(s - i);
        return l > 0 ? h.COUNTERCLOCKWISE : l < 0 ? h.CLOCKWISE : h.NONE;
      } }, { key: "angleBetweenOriented", value: function(i, s, l) {
        var d = h.angle(s, i), y = h.angle(s, l) - d;
        return y <= -Math.PI ? y + h.PI_TIMES_2 : y > Math.PI ? y - h.PI_TIMES_2 : y;
      } }]);
    }();
    kt.PI_TIMES_2 = 2 * Math.PI, kt.PI_OVER_2 = Math.PI / 2, kt.PI_OVER_4 = Math.PI / 4, kt.COUNTERCLOCKWISE = we.COUNTERCLOCKWISE, kt.CLOCKWISE = we.CLOCKWISE, kt.NONE = we.COLLINEAR;
    var Ir = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "addNextSegment", value: function(i, s) {
        if (this._s0 = this._s1, this._s1 = this._s2, this._s2 = i, this._seg0.setCoordinates(this._s0, this._s1), this.computeOffsetSegment(this._seg0, this._side, this._distance, this._offset0), this._seg1.setCoordinates(this._s1, this._s2), this.computeOffsetSegment(this._seg1, this._side, this._distance, this._offset1), this._s1.equals(this._s2)) return null;
        var l = we.index(this._s0, this._s1, this._s2), d = l === we.CLOCKWISE && this._side === ie.LEFT || l === we.COUNTERCLOCKWISE && this._side === ie.RIGHT;
        l === 0 ? this.addCollinear(s) : d ? this.addOutsideTurn(l, s) : this.addInsideTurn(l, s);
      } }, { key: "addLineEndCap", value: function(i, s) {
        var l = new Ct(i, s), d = new Ct();
        this.computeOffsetSegment(l, ie.LEFT, this._distance, d);
        var y = new Ct();
        this.computeOffsetSegment(l, ie.RIGHT, this._distance, y);
        var x = s.x - i.x, E = s.y - i.y, P = Math.atan2(E, x);
        switch (this._bufParams.getEndCapStyle()) {
          case N.CAP_ROUND:
            this._segList.addPt(d.p1), this.addDirectedFillet(s, P + Math.PI / 2, P - Math.PI / 2, we.CLOCKWISE, this._distance), this._segList.addPt(y.p1);
            break;
          case N.CAP_FLAT:
            this._segList.addPt(d.p1), this._segList.addPt(y.p1);
            break;
          case N.CAP_SQUARE:
            var F = new Z();
            F.x = Math.abs(this._distance) * Math.cos(P), F.y = Math.abs(this._distance) * Math.sin(P);
            var $ = new Z(d.p1.x + F.x, d.p1.y + F.y), K = new Z(y.p1.x + F.x, y.p1.y + F.y);
            this._segList.addPt($), this._segList.addPt(K);
        }
      } }, { key: "getCoordinates", value: function() {
        return this._segList.getCoordinates();
      } }, { key: "addMitreJoin", value: function(i, s, l, d) {
        var y = Ns.intersection(s.p0, s.p1, l.p0, l.p1);
        if (y !== null && (d <= 0 ? 1 : y.distance(i) / Math.abs(d)) <= this._bufParams.getMitreLimit()) return this._segList.addPt(y), null;
        this.addLimitedMitreJoin(s, l, d, this._bufParams.getMitreLimit());
      } }, { key: "addOutsideTurn", value: function(i, s) {
        if (this._offset0.p1.distance(this._offset1.p0) < this._distance * h.OFFSET_SEGMENT_SEPARATION_FACTOR) return this._segList.addPt(this._offset0.p1), null;
        this._bufParams.getJoinStyle() === N.JOIN_MITRE ? this.addMitreJoin(this._s1, this._offset0, this._offset1, this._distance) : this._bufParams.getJoinStyle() === N.JOIN_BEVEL ? this.addBevelJoin(this._offset0, this._offset1) : (s && this._segList.addPt(this._offset0.p1), this.addCornerFillet(this._s1, this._offset0.p1, this._offset1.p0, i, this._distance), this._segList.addPt(this._offset1.p0));
      } }, { key: "createSquare", value: function(i) {
        this._segList.addPt(new Z(i.x + this._distance, i.y + this._distance)), this._segList.addPt(new Z(i.x + this._distance, i.y - this._distance)), this._segList.addPt(new Z(i.x - this._distance, i.y - this._distance)), this._segList.addPt(new Z(i.x - this._distance, i.y + this._distance)), this._segList.closeRing();
      } }, { key: "addSegments", value: function(i, s) {
        this._segList.addPts(i, s);
      } }, { key: "addFirstSegment", value: function() {
        this._segList.addPt(this._offset1.p0);
      } }, { key: "addCornerFillet", value: function(i, s, l, d, y) {
        var x = s.x - i.x, E = s.y - i.y, P = Math.atan2(E, x), F = l.x - i.x, $ = l.y - i.y, K = Math.atan2($, F);
        d === we.CLOCKWISE ? P <= K && (P += 2 * Math.PI) : P >= K && (P -= 2 * Math.PI), this._segList.addPt(s), this.addDirectedFillet(i, P, K, d, y), this._segList.addPt(l);
      } }, { key: "addLastSegment", value: function() {
        this._segList.addPt(this._offset1.p1);
      } }, { key: "initSideSegments", value: function(i, s, l) {
        this._s1 = i, this._s2 = s, this._side = l, this._seg1.setCoordinates(i, s), this.computeOffsetSegment(this._seg1, l, this._distance, this._offset1);
      } }, { key: "addLimitedMitreJoin", value: function(i, s, l, d) {
        var y = this._seg0.p1, x = kt.angle(y, this._seg0.p0), E = kt.angleBetweenOriented(this._seg0.p0, y, this._seg1.p1) / 2, P = kt.normalize(x + E), F = kt.normalize(P + Math.PI), $ = d * l, K = l - $ * Math.abs(Math.sin(E)), ne = y.x + $ * Math.cos(F), ue = y.y + $ * Math.sin(F), he = new Z(ne, ue), ge = new Ct(y, he), Re = ge.pointAlongOffset(1, K), Pe = ge.pointAlongOffset(1, -K);
        this._side === ie.LEFT ? (this._segList.addPt(Re), this._segList.addPt(Pe)) : (this._segList.addPt(Pe), this._segList.addPt(Re));
      } }, { key: "addDirectedFillet", value: function(i, s, l, d, y) {
        var x = d === we.CLOCKWISE ? -1 : 1, E = Math.abs(s - l), P = Math.trunc(E / this._filletAngleQuantum + 0.5);
        if (P < 1) return null;
        for (var F = E / P, $ = new Z(), K = 0; K < P; K++) {
          var ne = s + x * K * F;
          $.x = i.x + y * Math.cos(ne), $.y = i.y + y * Math.sin(ne), this._segList.addPt($);
        }
      } }, { key: "computeOffsetSegment", value: function(i, s, l, d) {
        var y = s === ie.LEFT ? 1 : -1, x = i.p1.x - i.p0.x, E = i.p1.y - i.p0.y, P = Math.sqrt(x * x + E * E), F = y * l * x / P, $ = y * l * E / P;
        d.p0.x = i.p0.x - $, d.p0.y = i.p0.y + F, d.p1.x = i.p1.x - $, d.p1.y = i.p1.y + F;
      } }, { key: "addInsideTurn", value: function(i, s) {
        if (this._li.computeIntersection(this._offset0.p0, this._offset0.p1, this._offset1.p0, this._offset1.p1), this._li.hasIntersection()) this._segList.addPt(this._li.getIntersection(0));
        else if (this._hasNarrowConcaveAngle = !0, this._offset0.p1.distance(this._offset1.p0) < this._distance * h.INSIDE_TURN_VERTEX_SNAP_DISTANCE_FACTOR) this._segList.addPt(this._offset0.p1);
        else {
          if (this._segList.addPt(this._offset0.p1), this._closingSegLengthFactor > 0) {
            var l = new Z((this._closingSegLengthFactor * this._offset0.p1.x + this._s1.x) / (this._closingSegLengthFactor + 1), (this._closingSegLengthFactor * this._offset0.p1.y + this._s1.y) / (this._closingSegLengthFactor + 1));
            this._segList.addPt(l);
            var d = new Z((this._closingSegLengthFactor * this._offset1.p0.x + this._s1.x) / (this._closingSegLengthFactor + 1), (this._closingSegLengthFactor * this._offset1.p0.y + this._s1.y) / (this._closingSegLengthFactor + 1));
            this._segList.addPt(d);
          } else this._segList.addPt(this._s1);
          this._segList.addPt(this._offset1.p0);
        }
      } }, { key: "createCircle", value: function(i) {
        var s = new Z(i.x + this._distance, i.y);
        this._segList.addPt(s), this.addDirectedFillet(i, 0, 2 * Math.PI, -1, this._distance), this._segList.closeRing();
      } }, { key: "addBevelJoin", value: function(i, s) {
        this._segList.addPt(i.p1), this._segList.addPt(s.p0);
      } }, { key: "init", value: function(i) {
        this._distance = i, this._maxCurveSegmentError = i * (1 - Math.cos(this._filletAngleQuantum / 2)), this._segList = new eu(), this._segList.setPrecisionModel(this._precisionModel), this._segList.setMinimumVertexDistance(i * h.CURVE_VERTEX_SNAP_DISTANCE_FACTOR);
      } }, { key: "addCollinear", value: function(i) {
        this._li.computeIntersection(this._s0, this._s1, this._s1, this._s2), this._li.getIntersectionNum() >= 2 && (this._bufParams.getJoinStyle() === N.JOIN_BEVEL || this._bufParams.getJoinStyle() === N.JOIN_MITRE ? (i && this._segList.addPt(this._offset0.p1), this._segList.addPt(this._offset1.p0)) : this.addCornerFillet(this._s1, this._offset0.p1, this._offset1.p0, we.CLOCKWISE, this._distance));
      } }, { key: "closeRing", value: function() {
        this._segList.closeRing();
      } }, { key: "hasNarrowConcaveAngle", value: function() {
        return this._hasNarrowConcaveAngle;
      } }], [{ key: "constructor_", value: function() {
        this._maxCurveSegmentError = 0, this._filletAngleQuantum = null, this._closingSegLengthFactor = 1, this._segList = null, this._distance = 0, this._precisionModel = null, this._bufParams = null, this._li = null, this._s0 = null, this._s1 = null, this._s2 = null, this._seg0 = new Ct(), this._seg1 = new Ct(), this._offset0 = new Ct(), this._offset1 = new Ct(), this._side = 0, this._hasNarrowConcaveAngle = !1;
        var i = arguments[0], s = arguments[1], l = arguments[2];
        this._precisionModel = i, this._bufParams = s, this._li = new Sn(), this._filletAngleQuantum = Math.PI / 2 / s.getQuadrantSegments(), s.getQuadrantSegments() >= 8 && s.getJoinStyle() === N.JOIN_ROUND && (this._closingSegLengthFactor = h.MAX_CLOSING_SEG_LEN_FACTOR), this.init(l);
      } }]);
    }();
    Ir.OFFSET_SEGMENT_SEPARATION_FACTOR = 1e-3, Ir.INSIDE_TURN_VERTEX_SNAP_DISTANCE_FACTOR = 1e-3, Ir.CURVE_VERTEX_SNAP_DISTANCE_FACTOR = 1e-6, Ir.MAX_CLOSING_SEG_LEN_FACTOR = 80;
    var bg = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "getOffsetCurve", value: function(i, s) {
        if (this._distance = s, s === 0) return null;
        var l = s < 0, d = Math.abs(s), y = this.getSegGen(d);
        i.length <= 1 ? this.computePointCurve(i[0], y) : this.computeOffsetCurve(i, l, y);
        var x = y.getCoordinates();
        return l && tt.reverse(x), x;
      } }, { key: "computeSingleSidedBufferCurve", value: function(i, s, l) {
        var d = this.simplifyTolerance(this._distance);
        if (s) {
          l.addSegments(i, !0);
          var y = Gt.simplify(i, -d), x = y.length - 1;
          l.initSideSegments(y[x], y[x - 1], ie.LEFT), l.addFirstSegment();
          for (var E = x - 2; E >= 0; E--) l.addNextSegment(y[E], !0);
        } else {
          l.addSegments(i, !1);
          var P = Gt.simplify(i, d), F = P.length - 1;
          l.initSideSegments(P[0], P[1], ie.LEFT), l.addFirstSegment();
          for (var $ = 2; $ <= F; $++) l.addNextSegment(P[$], !0);
        }
        l.addLastSegment(), l.closeRing();
      } }, { key: "computeRingBufferCurve", value: function(i, s, l) {
        var d = this.simplifyTolerance(this._distance);
        s === ie.RIGHT && (d = -d);
        var y = Gt.simplify(i, d), x = y.length - 1;
        l.initSideSegments(y[x - 1], y[0], s);
        for (var E = 1; E <= x; E++) {
          var P = E !== 1;
          l.addNextSegment(y[E], P);
        }
        l.closeRing();
      } }, { key: "computeLineBufferCurve", value: function(i, s) {
        var l = this.simplifyTolerance(this._distance), d = Gt.simplify(i, l), y = d.length - 1;
        s.initSideSegments(d[0], d[1], ie.LEFT);
        for (var x = 2; x <= y; x++) s.addNextSegment(d[x], !0);
        s.addLastSegment(), s.addLineEndCap(d[y - 1], d[y]);
        var E = Gt.simplify(i, -l), P = E.length - 1;
        s.initSideSegments(E[P], E[P - 1], ie.LEFT);
        for (var F = P - 2; F >= 0; F--) s.addNextSegment(E[F], !0);
        s.addLastSegment(), s.addLineEndCap(E[1], E[0]), s.closeRing();
      } }, { key: "computePointCurve", value: function(i, s) {
        switch (this._bufParams.getEndCapStyle()) {
          case N.CAP_ROUND:
            s.createCircle(i);
            break;
          case N.CAP_SQUARE:
            s.createSquare(i);
        }
      } }, { key: "getLineCurve", value: function(i, s) {
        if (this._distance = s, this.isLineOffsetEmpty(s)) return null;
        var l = Math.abs(s), d = this.getSegGen(l);
        if (i.length <= 1) this.computePointCurve(i[0], d);
        else if (this._bufParams.isSingleSided()) {
          var y = s < 0;
          this.computeSingleSidedBufferCurve(i, y, d);
        } else this.computeLineBufferCurve(i, d);
        return d.getCoordinates();
      } }, { key: "getBufferParameters", value: function() {
        return this._bufParams;
      } }, { key: "simplifyTolerance", value: function(i) {
        return i * this._bufParams.getSimplifyFactor();
      } }, { key: "getRingCurve", value: function(i, s, l) {
        if (this._distance = l, i.length <= 2) return this.getLineCurve(i, l);
        if (l === 0) return h.copyCoordinates(i);
        var d = this.getSegGen(l);
        return this.computeRingBufferCurve(i, s, d), d.getCoordinates();
      } }, { key: "computeOffsetCurve", value: function(i, s, l) {
        var d = this.simplifyTolerance(this._distance);
        if (s) {
          var y = Gt.simplify(i, -d), x = y.length - 1;
          l.initSideSegments(y[x], y[x - 1], ie.LEFT), l.addFirstSegment();
          for (var E = x - 2; E >= 0; E--) l.addNextSegment(y[E], !0);
        } else {
          var P = Gt.simplify(i, d), F = P.length - 1;
          l.initSideSegments(P[0], P[1], ie.LEFT), l.addFirstSegment();
          for (var $ = 2; $ <= F; $++) l.addNextSegment(P[$], !0);
        }
        l.addLastSegment();
      } }, { key: "isLineOffsetEmpty", value: function(i) {
        return i === 0 || i < 0 && !this._bufParams.isSingleSided();
      } }, { key: "getSegGen", value: function(i) {
        return new Ir(this._precisionModel, this._bufParams, i);
      } }], [{ key: "constructor_", value: function() {
        this._distance = 0, this._precisionModel = null, this._bufParams = null;
        var i = arguments[0], s = arguments[1];
        this._precisionModel = i, this._bufParams = s;
      } }, { key: "copyCoordinates", value: function(i) {
        for (var s = new Array(i.length).fill(null), l = 0; l < s.length; l++) s[l] = new Z(i[l]);
        return s;
      } }]);
    }(), tu = function() {
      return c(function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }, [{ key: "findStabbedSegments", value: function() {
        if (arguments.length === 1) {
          for (var h = arguments[0], i = new ve(), s = this._subgraphs.iterator(); s.hasNext(); ) {
            var l = s.next(), d = l.getEnvelope();
            h.y < d.getMinY() || h.y > d.getMaxY() || this.findStabbedSegments(h, l.getDirectedEdges(), i);
          }
          return i;
        }
        if (arguments.length === 3) {
          if (Ee(arguments[2], tn) && arguments[0] instanceof Z && arguments[1] instanceof Us) {
            for (var y = arguments[0], x = arguments[1], E = arguments[2], P = x.getEdge().getCoordinates(), F = 0; F < P.length - 1; F++)
              if (this._seg.p0 = P[F], this._seg.p1 = P[F + 1], this._seg.p0.y > this._seg.p1.y && this._seg.reverse(), !(Math.max(this._seg.p0.x, this._seg.p1.x) < y.x || this._seg.isHorizontal() || y.y < this._seg.p0.y || y.y > this._seg.p1.y || we.index(this._seg.p0, this._seg.p1, y) === we.RIGHT)) {
                var $ = x.getDepth(ie.LEFT);
                this._seg.p0.equals(P[F]) || ($ = x.getDepth(ie.RIGHT));
                var K = new nu(this._seg, $);
                E.add(K);
              }
          } else if (Ee(arguments[2], tn) && arguments[0] instanceof Z && Ee(arguments[1], tn)) for (var ne = arguments[0], ue = arguments[2], he = arguments[1].iterator(); he.hasNext(); ) {
            var ge = he.next();
            ge.isForward() && this.findStabbedSegments(ne, ge, ue);
          }
        }
      } }, { key: "getDepth", value: function(h) {
        var i = this.findStabbedSegments(h);
        return i.size() === 0 ? 0 : Yn.min(i)._leftDepth;
      } }], [{ key: "constructor_", value: function() {
        this._subgraphs = null, this._seg = new Ct();
        var h = arguments[0];
        this._subgraphs = h;
      } }]);
    }(), nu = function() {
      return c(function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }, [{ key: "compareTo", value: function(h) {
        var i = h;
        if (this._upwardSeg.minX() >= i._upwardSeg.maxX()) return 1;
        if (this._upwardSeg.maxX() <= i._upwardSeg.minX()) return -1;
        var s = this._upwardSeg.orientationIndex(i._upwardSeg);
        return s !== 0 || (s = -1 * i._upwardSeg.orientationIndex(this._upwardSeg)) !== 0 ? s : this._upwardSeg.compareTo(i._upwardSeg);
      } }, { key: "compareX", value: function(h, i) {
        var s = h.p0.compareTo(i.p0);
        return s !== 0 ? s : h.p1.compareTo(i.p1);
      } }, { key: "toString", value: function() {
        return this._upwardSeg.toString();
      } }, { key: "interfaces_", get: function() {
        return [V];
      } }], [{ key: "constructor_", value: function() {
        this._upwardSeg = null, this._leftDepth = null;
        var h = arguments[0], i = arguments[1];
        this._upwardSeg = new Ct(h), this._leftDepth = i;
      } }]);
    }();
    tu.DepthSegment = nu;
    var ru = function(h) {
      function i() {
        var s;
        return o(this, i), s = r(this, i), i.constructor_.apply(s, arguments), s;
      }
      return m(i, h), c(i, null, [{ key: "constructor_", value: function() {
        A.constructor_.call(this, "Projective point not representable on the Cartesian plane.");
      } }]);
    }(A), Vs = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "getY", value: function() {
        var i = this.y / this.w;
        if (W.isNaN(i) || W.isInfinite(i)) throw new ru();
        return i;
      } }, { key: "getX", value: function() {
        var i = this.x / this.w;
        if (W.isNaN(i) || W.isInfinite(i)) throw new ru();
        return i;
      } }, { key: "getCoordinate", value: function() {
        var i = new Z();
        return i.x = this.getX(), i.y = this.getY(), i;
      } }], [{ key: "constructor_", value: function() {
        if (this.x = null, this.y = null, this.w = null, arguments.length === 0) this.x = 0, this.y = 0, this.w = 1;
        else if (arguments.length === 1) {
          var i = arguments[0];
          this.x = i.x, this.y = i.y, this.w = 1;
        } else if (arguments.length === 2) {
          if (typeof arguments[0] == "number" && typeof arguments[1] == "number") {
            var s = arguments[0], l = arguments[1];
            this.x = s, this.y = l, this.w = 1;
          } else if (arguments[0] instanceof h && arguments[1] instanceof h) {
            var d = arguments[0], y = arguments[1];
            this.x = d.y * y.w - y.y * d.w, this.y = y.x * d.w - d.x * y.w, this.w = d.x * y.y - y.x * d.y;
          } else if (arguments[0] instanceof Z && arguments[1] instanceof Z) {
            var x = arguments[0], E = arguments[1];
            this.x = x.y - E.y, this.y = E.x - x.x, this.w = x.x * E.y - E.x * x.y;
          }
        } else if (arguments.length === 3) {
          var P = arguments[0], F = arguments[1], $ = arguments[2];
          this.x = P, this.y = F, this.w = $;
        } else if (arguments.length === 4) {
          var K = arguments[0], ne = arguments[1], ue = arguments[2], he = arguments[3], ge = K.y - ne.y, Re = ne.x - K.x, Pe = K.x * ne.y - ne.x * K.y, Ue = ue.y - he.y, st = he.x - ue.x, ut = ue.x * he.y - he.x * ue.y;
          this.x = Re * ut - st * Pe, this.y = Ue * Pe - ge * ut, this.w = ge * st - Ue * Re;
        }
      } }]);
    }(), Mg = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "area", value: function() {
        return h.area(this.p0, this.p1, this.p2);
      } }, { key: "signedArea", value: function() {
        return h.signedArea(this.p0, this.p1, this.p2);
      } }, { key: "interpolateZ", value: function(i) {
        if (i === null) throw new O("Supplied point is null.");
        return h.interpolateZ(i, this.p0, this.p1, this.p2);
      } }, { key: "longestSideLength", value: function() {
        return h.longestSideLength(this.p0, this.p1, this.p2);
      } }, { key: "isAcute", value: function() {
        return h.isAcute(this.p0, this.p1, this.p2);
      } }, { key: "circumcentre", value: function() {
        return h.circumcentre(this.p0, this.p1, this.p2);
      } }, { key: "area3D", value: function() {
        return h.area3D(this.p0, this.p1, this.p2);
      } }, { key: "centroid", value: function() {
        return h.centroid(this.p0, this.p1, this.p2);
      } }, { key: "inCentre", value: function() {
        return h.inCentre(this.p0, this.p1, this.p2);
      } }], [{ key: "constructor_", value: function() {
        this.p0 = null, this.p1 = null, this.p2 = null;
        var i = arguments[0], s = arguments[1], l = arguments[2];
        this.p0 = i, this.p1 = s, this.p2 = l;
      } }, { key: "area", value: function(i, s, l) {
        return Math.abs(((l.x - i.x) * (s.y - i.y) - (s.x - i.x) * (l.y - i.y)) / 2);
      } }, { key: "signedArea", value: function(i, s, l) {
        return ((l.x - i.x) * (s.y - i.y) - (s.x - i.x) * (l.y - i.y)) / 2;
      } }, { key: "det", value: function(i, s, l, d) {
        return i * d - s * l;
      } }, { key: "interpolateZ", value: function(i, s, l, d) {
        var y = s.x, x = s.y, E = l.x - y, P = d.x - y, F = l.y - x, $ = d.y - x, K = E * $ - P * F, ne = i.x - y, ue = i.y - x, he = ($ * ne - P * ue) / K, ge = (-F * ne + E * ue) / K;
        return s.getZ() + he * (l.getZ() - s.getZ()) + ge * (d.getZ() - s.getZ());
      } }, { key: "longestSideLength", value: function(i, s, l) {
        var d = i.distance(s), y = s.distance(l), x = l.distance(i), E = d;
        return y > E && (E = y), x > E && (E = x), E;
      } }, { key: "circumcentreDD", value: function(i, s, l) {
        var d = pe.valueOf(i.x).subtract(l.x), y = pe.valueOf(i.y).subtract(l.y), x = pe.valueOf(s.x).subtract(l.x), E = pe.valueOf(s.y).subtract(l.y), P = pe.determinant(d, y, x, E).multiply(2), F = d.sqr().add(y.sqr()), $ = x.sqr().add(E.sqr()), K = pe.determinant(y, F, E, $), ne = pe.determinant(d, F, x, $), ue = pe.valueOf(l.x).subtract(K.divide(P)).doubleValue(), he = pe.valueOf(l.y).add(ne.divide(P)).doubleValue();
        return new Z(ue, he);
      } }, { key: "isAcute", value: function(i, s, l) {
        return !!kt.isAcute(i, s, l) && !!kt.isAcute(s, l, i) && !!kt.isAcute(l, i, s);
      } }, { key: "circumcentre", value: function(i, s, l) {
        var d = l.x, y = l.y, x = i.x - d, E = i.y - y, P = s.x - d, F = s.y - y, $ = 2 * h.det(x, E, P, F), K = h.det(E, x * x + E * E, F, P * P + F * F), ne = h.det(x, x * x + E * E, P, P * P + F * F);
        return new Z(d - K / $, y + ne / $);
      } }, { key: "perpendicularBisector", value: function(i, s) {
        var l = s.x - i.x, d = s.y - i.y, y = new Vs(i.x + l / 2, i.y + d / 2, 1), x = new Vs(i.x - d + l / 2, i.y + l + d / 2, 1);
        return new Vs(y, x);
      } }, { key: "angleBisector", value: function(i, s, l) {
        var d = s.distance(i), y = d / (d + s.distance(l)), x = l.x - i.x, E = l.y - i.y;
        return new Z(i.x + y * x, i.y + y * E);
      } }, { key: "area3D", value: function(i, s, l) {
        var d = s.x - i.x, y = s.y - i.y, x = s.getZ() - i.getZ(), E = l.x - i.x, P = l.y - i.y, F = l.getZ() - i.getZ(), $ = y * F - x * P, K = x * E - d * F, ne = d * P - y * E, ue = $ * $ + K * K + ne * ne, he = Math.sqrt(ue) / 2;
        return he;
      } }, { key: "centroid", value: function(i, s, l) {
        var d = (i.x + s.x + l.x) / 3, y = (i.y + s.y + l.y) / 3;
        return new Z(d, y);
      } }, { key: "inCentre", value: function(i, s, l) {
        var d = s.distance(l), y = i.distance(l), x = i.distance(s), E = d + y + x, P = (d * i.x + y * s.x + x * l.x) / E, F = (d * i.y + y * s.y + x * l.y) / E;
        return new Z(P, F);
      } }]);
    }(), Lg = function() {
      return c(function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }, [{ key: "addRingSide", value: function(h, i, s, l, d) {
        if (i === 0 && h.length < wr.MINIMUM_VALID_SIZE) return null;
        var y = l, x = d;
        h.length >= wr.MINIMUM_VALID_SIZE && we.isCCW(h) && (y = d, x = l, s = ie.opposite(s));
        var E = this._curveBuilder.getRingCurve(h, s, i);
        this.addCurve(E, y, x);
      } }, { key: "addRingBothSides", value: function(h, i) {
        this.addRingSide(h, i, ie.LEFT, z.EXTERIOR, z.INTERIOR), this.addRingSide(h, i, ie.RIGHT, z.INTERIOR, z.EXTERIOR);
      } }, { key: "addPoint", value: function(h) {
        if (this._distance <= 0) return null;
        var i = h.getCoordinates(), s = this._curveBuilder.getLineCurve(i, this._distance);
        this.addCurve(s, z.EXTERIOR, z.INTERIOR);
      } }, { key: "addPolygon", value: function(h) {
        var i = this._distance, s = ie.LEFT;
        this._distance < 0 && (i = -this._distance, s = ie.RIGHT);
        var l = h.getExteriorRing(), d = tt.removeRepeatedPoints(l.getCoordinates());
        if (this._distance < 0 && this.isErodedCompletely(l, this._distance) || this._distance <= 0 && d.length < 3) return null;
        this.addRingSide(d, i, s, z.EXTERIOR, z.INTERIOR);
        for (var y = 0; y < h.getNumInteriorRing(); y++) {
          var x = h.getInteriorRingN(y), E = tt.removeRepeatedPoints(x.getCoordinates());
          this._distance > 0 && this.isErodedCompletely(x, -this._distance) || this.addRingSide(E, i, ie.opposite(s), z.INTERIOR, z.EXTERIOR);
        }
      } }, { key: "isTriangleErodedCompletely", value: function(h, i) {
        var s = new Mg(h[0], h[1], h[2]), l = s.inCentre();
        return Yt.pointToSegment(l, s.p0, s.p1) < Math.abs(i);
      } }, { key: "addLineString", value: function(h) {
        if (this._curveBuilder.isLineOffsetEmpty(this._distance)) return null;
        var i = tt.removeRepeatedPoints(h.getCoordinates());
        if (tt.isRing(i) && !this._curveBuilder.getBufferParameters().isSingleSided()) this.addRingBothSides(i, this._distance);
        else {
          var s = this._curveBuilder.getLineCurve(i, this._distance);
          this.addCurve(s, z.EXTERIOR, z.INTERIOR);
        }
      } }, { key: "addCurve", value: function(h, i, s) {
        if (h === null || h.length < 2) return null;
        var l = new bn(h, new Lt(0, z.BOUNDARY, i, s));
        this._curveList.add(l);
      } }, { key: "getCurves", value: function() {
        return this.add(this._inputGeom), this._curveList;
      } }, { key: "add", value: function(h) {
        if (h.isEmpty()) return null;
        if (h instanceof yi) this.addPolygon(h);
        else if (h instanceof _r) this.addLineString(h);
        else if (h instanceof Ts) this.addPoint(h);
        else if (h instanceof Rs) this.addCollection(h);
        else if (h instanceof Fs) this.addCollection(h);
        else if (h instanceof Ds) this.addCollection(h);
        else {
          if (!(h instanceof Et)) throw new Ce(h.getGeometryType());
          this.addCollection(h);
        }
      } }, { key: "isErodedCompletely", value: function(h, i) {
        var s = h.getCoordinates();
        if (s.length < 4) return i < 0;
        if (s.length === 4) return this.isTriangleErodedCompletely(s, i);
        var l = h.getEnvelopeInternal(), d = Math.min(l.getHeight(), l.getWidth());
        return i < 0 && 2 * Math.abs(i) > d;
      } }, { key: "addCollection", value: function(h) {
        for (var i = 0; i < h.getNumGeometries(); i++) {
          var s = h.getGeometryN(i);
          this.add(s);
        }
      } }], [{ key: "constructor_", value: function() {
        this._inputGeom = null, this._distance = null, this._curveBuilder = null, this._curveList = new ve();
        var h = arguments[0], i = arguments[1], s = arguments[2];
        this._inputGeom = h, this._distance = i, this._curveBuilder = s;
      } }]);
    }(), Pg = function() {
      return c(function h() {
        o(this, h);
      }, [{ key: "locate", value: function(h) {
      } }]);
    }(), Ng = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "next", value: function() {
        if (this._atStart) return this._atStart = !1, h.isAtomic(this._parent) && this._index++, this._parent;
        if (this._subcollectionIterator !== null) {
          if (this._subcollectionIterator.hasNext()) return this._subcollectionIterator.next();
          this._subcollectionIterator = null;
        }
        if (this._index >= this._max) throw new Ne();
        var i = this._parent.getGeometryN(this._index++);
        return i instanceof Et ? (this._subcollectionIterator = new h(i), this._subcollectionIterator.next()) : i;
      } }, { key: "remove", value: function() {
        throw new Ce(this.getClass().getName());
      } }, { key: "hasNext", value: function() {
        if (this._atStart) return !0;
        if (this._subcollectionIterator !== null) {
          if (this._subcollectionIterator.hasNext()) return !0;
          this._subcollectionIterator = null;
        }
        return !(this._index >= this._max);
      } }, { key: "interfaces_", get: function() {
        return [wg];
      } }], [{ key: "constructor_", value: function() {
        this._parent = null, this._atStart = null, this._max = null, this._index = null, this._subcollectionIterator = null;
        var i = arguments[0];
        this._parent = i, this._atStart = !0, this._index = 0, this._max = i.getNumGeometries();
      } }, { key: "isAtomic", value: function(i) {
        return !(i instanceof Et);
      } }]);
    }(), Tg = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "locate", value: function(i) {
        return h.locate(i, this._geom);
      } }, { key: "interfaces_", get: function() {
        return [Pg];
      } }], [{ key: "constructor_", value: function() {
        this._geom = null;
        var i = arguments[0];
        this._geom = i;
      } }, { key: "locatePointInPolygon", value: function(i, s) {
        if (s.isEmpty()) return z.EXTERIOR;
        var l = s.getExteriorRing(), d = h.locatePointInRing(i, l);
        if (d !== z.INTERIOR) return d;
        for (var y = 0; y < s.getNumInteriorRing(); y++) {
          var x = s.getInteriorRingN(y), E = h.locatePointInRing(i, x);
          if (E === z.BOUNDARY) return z.BOUNDARY;
          if (E === z.INTERIOR) return z.EXTERIOR;
        }
        return z.INTERIOR;
      } }, { key: "locatePointInRing", value: function(i, s) {
        return s.getEnvelopeInternal().intersects(i) ? qs.locateInRing(i, s.getCoordinates()) : z.EXTERIOR;
      } }, { key: "containsPointInPolygon", value: function(i, s) {
        return z.EXTERIOR !== h.locatePointInPolygon(i, s);
      } }, { key: "locateInGeometry", value: function(i, s) {
        if (s instanceof yi) return h.locatePointInPolygon(i, s);
        if (s instanceof Et) for (var l = new Ng(s); l.hasNext(); ) {
          var d = l.next();
          if (d !== s) {
            var y = h.locateInGeometry(i, d);
            if (y !== z.EXTERIOR) return y;
          }
        }
        return z.EXTERIOR;
      } }, { key: "isContained", value: function(i, s) {
        return z.EXTERIOR !== h.locate(i, s);
      } }, { key: "locate", value: function(i, s) {
        return s.isEmpty() ? z.EXTERIOR : s.getEnvelopeInternal().intersects(i) ? h.locateInGeometry(i, s) : z.EXTERIOR;
      } }]);
    }(), Rg = function() {
      return c(function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }, [{ key: "getNextCW", value: function(h) {
        this.getEdges();
        var i = this._edgeList.indexOf(h), s = i - 1;
        return i === 0 && (s = this._edgeList.size() - 1), this._edgeList.get(s);
      } }, { key: "propagateSideLabels", value: function(h) {
        for (var i = z.NONE, s = this.iterator(); s.hasNext(); ) {
          var l = s.next().getLabel();
          l.isArea(h) && l.getLocation(h, ie.LEFT) !== z.NONE && (i = l.getLocation(h, ie.LEFT));
        }
        if (i === z.NONE) return null;
        for (var d = i, y = this.iterator(); y.hasNext(); ) {
          var x = y.next(), E = x.getLabel();
          if (E.getLocation(h, ie.ON) === z.NONE && E.setLocation(h, ie.ON, d), E.isArea(h)) {
            var P = E.getLocation(h, ie.LEFT), F = E.getLocation(h, ie.RIGHT);
            if (F !== z.NONE) {
              if (F !== d) throw new nn("side location conflict", x.getCoordinate());
              P === z.NONE && ee.shouldNeverReachHere("found single null side (at " + x.getCoordinate() + ")"), d = P;
            } else ee.isTrue(E.getLocation(h, ie.LEFT) === z.NONE, "found single null side"), E.setLocation(h, ie.RIGHT, d), E.setLocation(h, ie.LEFT, d);
          }
        }
      } }, { key: "getCoordinate", value: function() {
        var h = this.iterator();
        return h.hasNext() ? h.next().getCoordinate() : null;
      } }, { key: "print", value: function(h) {
        bt.out.println("EdgeEndStar:   " + this.getCoordinate());
        for (var i = this.iterator(); i.hasNext(); )
          i.next().print(h);
      } }, { key: "isAreaLabelsConsistent", value: function(h) {
        return this.computeEdgeEndLabels(h.getBoundaryNodeRule()), this.checkAreaLabelsConsistent(0);
      } }, { key: "checkAreaLabelsConsistent", value: function(h) {
        var i = this.getEdges();
        if (i.size() <= 0) return !0;
        var s = i.size() - 1, l = i.get(s).getLabel().getLocation(h, ie.LEFT);
        ee.isTrue(l !== z.NONE, "Found unlabelled area edge");
        for (var d = l, y = this.iterator(); y.hasNext(); ) {
          var x = y.next().getLabel();
          ee.isTrue(x.isArea(h), "Found non-area edge");
          var E = x.getLocation(h, ie.LEFT), P = x.getLocation(h, ie.RIGHT);
          if (E === P || P !== d) return !1;
          d = E;
        }
        return !0;
      } }, { key: "findIndex", value: function(h) {
        this.iterator();
        for (var i = 0; i < this._edgeList.size(); i++)
          if (this._edgeList.get(i) === h) return i;
        return -1;
      } }, { key: "iterator", value: function() {
        return this.getEdges().iterator();
      } }, { key: "getEdges", value: function() {
        return this._edgeList === null && (this._edgeList = new ve(this._edgeMap.values())), this._edgeList;
      } }, { key: "getLocation", value: function(h, i, s) {
        return this._ptInAreaLocation[h] === z.NONE && (this._ptInAreaLocation[h] = Tg.locate(i, s[h].getGeometry())), this._ptInAreaLocation[h];
      } }, { key: "toString", value: function() {
        var h = new dn();
        h.append("EdgeEndStar:   " + this.getCoordinate()), h.append(`
`);
        for (var i = this.iterator(); i.hasNext(); ) {
          var s = i.next();
          h.append(s), h.append(`
`);
        }
        return h.toString();
      } }, { key: "computeEdgeEndLabels", value: function(h) {
        for (var i = this.iterator(); i.hasNext(); )
          i.next().computeLabel(h);
      } }, { key: "computeLabelling", value: function(h) {
        this.computeEdgeEndLabels(h[0].getBoundaryNodeRule()), this.propagateSideLabels(0), this.propagateSideLabels(1);
        for (var i = [!1, !1], s = this.iterator(); s.hasNext(); ) for (var l = s.next().getLabel(), d = 0; d < 2; d++) l.isLine(d) && l.getLocation(d) === z.BOUNDARY && (i[d] = !0);
        for (var y = this.iterator(); y.hasNext(); ) for (var x = y.next(), E = x.getLabel(), P = 0; P < 2; P++) if (E.isAnyNull(P)) {
          var F = z.NONE;
          if (i[P]) F = z.EXTERIOR;
          else {
            var $ = x.getCoordinate();
            F = this.getLocation(P, $, h);
          }
          E.setAllLocationsIfNull(P, F);
        }
      } }, { key: "getDegree", value: function() {
        return this._edgeMap.size();
      } }, { key: "insertEdgeEnd", value: function(h, i) {
        this._edgeMap.put(h, i), this._edgeList = null;
      } }], [{ key: "constructor_", value: function() {
        this._edgeMap = new kr(), this._edgeList = null, this._ptInAreaLocation = [z.NONE, z.NONE];
      } }]);
    }(), Ag = function(h) {
      function i() {
        var s;
        return o(this, i), s = r(this, i), i.constructor_.apply(s, arguments), s;
      }
      return m(i, h), c(i, [{ key: "linkResultDirectedEdges", value: function() {
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
          if (s === null) throw new nn("no outgoing dirEdge found", this.getCoordinate());
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
        bt.out.println("DirectedEdgeStar: " + this.getCoordinate());
        for (var l = this.iterator(); l.hasNext(); ) {
          var d = l.next();
          s.print("out "), d.print(s), s.println(), s.print("in "), d.getSym().print(s), s.println();
        }
      } }, { key: "getResultAreaEdges", value: function() {
        if (this._resultAreaEdgeList !== null) return this._resultAreaEdgeList;
        this._resultAreaEdgeList = new ve();
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
          if (this.computeDepths(0, l, x) !== y) throw new nn("depth mismatch at " + s.getCoordinate());
        } else if (arguments.length === 3) {
          for (var E = arguments[1], P = arguments[2], F = arguments[0]; F < E; F++) {
            var $ = this._edgeList.get(F);
            $.setEdgeDepths(ie.RIGHT, P), P = $.getDepth(ie.LEFT);
          }
          return P;
        }
      } }, { key: "mergeSymLabels", value: function() {
        for (var s = this.iterator(); s.hasNext(); ) {
          var l = s.next();
          l.getLabel().merge(l.getSym().getLabel());
        }
      } }, { key: "linkMinimalDirectedEdges", value: function(s) {
        for (var l = null, d = null, y = this._SCANNING_FOR_INCOMING, x = this._resultAreaEdgeList.size() - 1; x >= 0; x--) {
          var E = this._resultAreaEdgeList.get(x), P = E.getSym();
          switch (l === null && E.getEdgeRing() === s && (l = E), y) {
            case this._SCANNING_FOR_INCOMING:
              if (P.getEdgeRing() !== s) continue;
              d = P, y = this._LINKING_TO_OUTGOING;
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
          var P = E.next(), F = P.getSym();
          P.isLineEdge() ? P.getEdge().setCovered(x === z.INTERIOR) : (P.isInResult() && (x = z.EXTERIOR), F.isInResult() && (x = z.INTERIOR));
        }
      } }, { key: "computeLabelling", value: function(s) {
        w(i, "computeLabelling", this, 1).call(this, s), this._label = new Lt(z.NONE);
        for (var l = this.iterator(); l.hasNext(); ) for (var d = l.next().getEdge().getLabel(), y = 0; y < 2; y++) {
          var x = d.getLocation(y);
          x !== z.INTERIOR && x !== z.BOUNDARY || this._label.setLocation(y, z.INTERIOR);
        }
      } }], [{ key: "constructor_", value: function() {
        this._resultAreaEdgeList = null, this._label = null, this._SCANNING_FOR_INCOMING = 1, this._LINKING_TO_OUTGOING = 2;
      } }]);
    }(Rg), Og = function(h) {
      function i() {
        return o(this, i), r(this, i);
      }
      return m(i, h), c(i, [{ key: "createNode", value: function(s) {
        return new Ei(s, new Ag());
      } }]);
    }(Ha), iu = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "compareTo", value: function(i) {
        var s = i;
        return h.compareOriented(this._pts, this._orientation, s._pts, s._orientation);
      } }, { key: "interfaces_", get: function() {
        return [V];
      } }], [{ key: "constructor_", value: function() {
        this._pts = null, this._orientation = null;
        var i = arguments[0];
        this._pts = i, this._orientation = h.orientation(i);
      } }, { key: "orientation", value: function(i) {
        return tt.increasingDirection(i) === 1;
      } }, { key: "compareOriented", value: function(i, s, l, d) {
        for (var y = s ? 1 : -1, x = d ? 1 : -1, E = s ? i.length : -1, P = d ? l.length : -1, F = s ? 0 : i.length - 1, $ = d ? 0 : l.length - 1; ; ) {
          var K = i[F].compareTo(l[$]);
          if (K !== 0) return K;
          var ne = (F += y) === E, ue = ($ += x) === P;
          if (ne && !ue) return -1;
          if (!ne && ue) return 1;
          if (ne && ue) return 0;
        }
      } }]);
    }(), Dg = function() {
      return c(function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }, [{ key: "print", value: function(h) {
        h.print("MULTILINESTRING ( ");
        for (var i = 0; i < this._edges.size(); i++) {
          var s = this._edges.get(i);
          i > 0 && h.print(","), h.print("(");
          for (var l = s.getCoordinates(), d = 0; d < l.length; d++) d > 0 && h.print(","), h.print(l[d].x + " " + l[d].y);
          h.println(")");
        }
        h.print(")  ");
      } }, { key: "addAll", value: function(h) {
        for (var i = h.iterator(); i.hasNext(); ) this.add(i.next());
      } }, { key: "findEdgeIndex", value: function(h) {
        for (var i = 0; i < this._edges.size(); i++) if (this._edges.get(i).equals(h)) return i;
        return -1;
      } }, { key: "iterator", value: function() {
        return this._edges.iterator();
      } }, { key: "getEdges", value: function() {
        return this._edges;
      } }, { key: "get", value: function(h) {
        return this._edges.get(h);
      } }, { key: "findEqualEdge", value: function(h) {
        var i = new iu(h.getCoordinates());
        return this._ocaMap.get(i);
      } }, { key: "add", value: function(h) {
        this._edges.add(h);
        var i = new iu(h.getCoordinates());
        this._ocaMap.put(i, h);
      } }], [{ key: "constructor_", value: function() {
        this._edges = new ve(), this._ocaMap = new kr();
      } }]);
    }(), su = function() {
      return c(function h() {
        o(this, h);
      }, [{ key: "processIntersections", value: function(h, i, s, l) {
      } }, { key: "isDone", value: function() {
      } }]);
    }(), Fg = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "isTrivialIntersection", value: function(i, s, l, d) {
        if (i === l && this._li.getIntersectionNum() === 1) {
          if (h.isAdjacentSegments(s, d)) return !0;
          if (i.isClosed()) {
            var y = i.size() - 1;
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
      } }, { key: "processIntersections", value: function(i, s, l, d) {
        if (i === l && s === d) return null;
        this.numTests++;
        var y = i.getCoordinates()[s], x = i.getCoordinates()[s + 1], E = l.getCoordinates()[d], P = l.getCoordinates()[d + 1];
        this._li.computeIntersection(y, x, E, P), this._li.hasIntersection() && (this.numIntersections++, this._li.isInteriorIntersection() && (this.numInteriorIntersections++, this._hasInterior = !0), this.isTrivialIntersection(i, s, l, d) || (this._hasIntersection = !0, i.addIntersections(this._li, s, 0), l.addIntersections(this._li, d, 1), this._li.isProper() && (this.numProperIntersections++, this._hasProper = !0, this._hasProperInterior = !0)));
      } }, { key: "hasIntersection", value: function() {
        return this._hasIntersection;
      } }, { key: "isDone", value: function() {
        return !1;
      } }, { key: "hasInteriorIntersection", value: function() {
        return this._hasInterior;
      } }, { key: "interfaces_", get: function() {
        return [su];
      } }], [{ key: "constructor_", value: function() {
        this._hasIntersection = !1, this._hasProper = !1, this._hasProperInterior = !1, this._hasInterior = !1, this._properIntersectionPoint = null, this._li = null, this._isSelfIntersection = null, this.numIntersections = 0, this.numInteriorIntersections = 0, this.numProperIntersections = 0, this.numTests = 0;
        var i = arguments[0];
        this._li = i;
      } }, { key: "isAdjacentSegments", value: function(i, s) {
        return Math.abs(i - s) === 1;
      } }]);
    }(), Bg = function() {
      return c(function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }, [{ key: "getSegmentIndex", value: function() {
        return this.segmentIndex;
      } }, { key: "getCoordinate", value: function() {
        return this.coord;
      } }, { key: "print", value: function(h) {
        h.print(this.coord), h.print(" seg # = " + this.segmentIndex), h.println(" dist = " + this.dist);
      } }, { key: "compareTo", value: function(h) {
        var i = h;
        return this.compare(i.segmentIndex, i.dist);
      } }, { key: "isEndPoint", value: function(h) {
        return this.segmentIndex === 0 && this.dist === 0 || this.segmentIndex === h;
      } }, { key: "toString", value: function() {
        return this.coord + " seg # = " + this.segmentIndex + " dist = " + this.dist;
      } }, { key: "getDistance", value: function() {
        return this.dist;
      } }, { key: "compare", value: function(h, i) {
        return this.segmentIndex < h ? -1 : this.segmentIndex > h ? 1 : this.dist < i ? -1 : this.dist > i ? 1 : 0;
      } }, { key: "interfaces_", get: function() {
        return [V];
      } }], [{ key: "constructor_", value: function() {
        this.coord = null, this.segmentIndex = null, this.dist = null;
        var h = arguments[0], i = arguments[1], s = arguments[2];
        this.coord = new Z(h), this.segmentIndex = i, this.dist = s;
      } }]);
    }(), Gg = function() {
      return c(function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }, [{ key: "print", value: function(h) {
        h.println("Intersections:");
        for (var i = this.iterator(); i.hasNext(); )
          i.next().print(h);
      } }, { key: "iterator", value: function() {
        return this._nodeMap.values().iterator();
      } }, { key: "addSplitEdges", value: function(h) {
        this.addEndpoints();
        for (var i = this.iterator(), s = i.next(); i.hasNext(); ) {
          var l = i.next(), d = this.createSplitEdge(s, l);
          h.add(d), s = l;
        }
      } }, { key: "addEndpoints", value: function() {
        var h = this.edge.pts.length - 1;
        this.add(this.edge.pts[0], 0, 0), this.add(this.edge.pts[h], h, 0);
      } }, { key: "createSplitEdge", value: function(h, i) {
        var s = i.segmentIndex - h.segmentIndex + 2, l = this.edge.pts[i.segmentIndex], d = i.dist > 0 || !i.coord.equals2D(l);
        d || s--;
        var y = new Array(s).fill(null), x = 0;
        y[x++] = new Z(h.coord);
        for (var E = h.segmentIndex + 1; E <= i.segmentIndex; E++) y[x++] = this.edge.pts[E];
        return d && (y[x] = i.coord), new au(y, new Lt(this.edge._label));
      } }, { key: "add", value: function(h, i, s) {
        var l = new Bg(h, i, s), d = this._nodeMap.get(l);
        return d !== null ? d : (this._nodeMap.put(l, l), l);
      } }, { key: "isIntersection", value: function(h) {
        for (var i = this.iterator(); i.hasNext(); )
          if (i.next().coord.equals(h)) return !0;
        return !1;
      } }], [{ key: "constructor_", value: function() {
        this._nodeMap = new kr(), this.edge = null;
        var h = arguments[0];
        this.edge = h;
      } }]);
    }(), qg = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "isIntersects", value: function() {
        return !this.isDisjoint();
      } }, { key: "isCovers", value: function() {
        return (h.isTrue(this._matrix[z.INTERIOR][z.INTERIOR]) || h.isTrue(this._matrix[z.INTERIOR][z.BOUNDARY]) || h.isTrue(this._matrix[z.BOUNDARY][z.INTERIOR]) || h.isTrue(this._matrix[z.BOUNDARY][z.BOUNDARY])) && this._matrix[z.EXTERIOR][z.INTERIOR] === oe.FALSE && this._matrix[z.EXTERIOR][z.BOUNDARY] === oe.FALSE;
      } }, { key: "isCoveredBy", value: function() {
        return (h.isTrue(this._matrix[z.INTERIOR][z.INTERIOR]) || h.isTrue(this._matrix[z.INTERIOR][z.BOUNDARY]) || h.isTrue(this._matrix[z.BOUNDARY][z.INTERIOR]) || h.isTrue(this._matrix[z.BOUNDARY][z.BOUNDARY])) && this._matrix[z.INTERIOR][z.EXTERIOR] === oe.FALSE && this._matrix[z.BOUNDARY][z.EXTERIOR] === oe.FALSE;
      } }, { key: "set", value: function() {
        if (arguments.length === 1) for (var i = arguments[0], s = 0; s < i.length; s++) {
          var l = Math.trunc(s / 3), d = s % 3;
          this._matrix[l][d] = oe.toDimensionValue(i.charAt(s));
        }
        else if (arguments.length === 3) {
          var y = arguments[0], x = arguments[1], E = arguments[2];
          this._matrix[y][x] = E;
        }
      } }, { key: "isContains", value: function() {
        return h.isTrue(this._matrix[z.INTERIOR][z.INTERIOR]) && this._matrix[z.EXTERIOR][z.INTERIOR] === oe.FALSE && this._matrix[z.EXTERIOR][z.BOUNDARY] === oe.FALSE;
      } }, { key: "setAtLeast", value: function() {
        if (arguments.length === 1) for (var i = arguments[0], s = 0; s < i.length; s++) {
          var l = Math.trunc(s / 3), d = s % 3;
          this.setAtLeast(l, d, oe.toDimensionValue(i.charAt(s)));
        }
        else if (arguments.length === 3) {
          var y = arguments[0], x = arguments[1], E = arguments[2];
          this._matrix[y][x] < E && (this._matrix[y][x] = E);
        }
      } }, { key: "setAtLeastIfValid", value: function(i, s, l) {
        i >= 0 && s >= 0 && this.setAtLeast(i, s, l);
      } }, { key: "isWithin", value: function() {
        return h.isTrue(this._matrix[z.INTERIOR][z.INTERIOR]) && this._matrix[z.INTERIOR][z.EXTERIOR] === oe.FALSE && this._matrix[z.BOUNDARY][z.EXTERIOR] === oe.FALSE;
      } }, { key: "isTouches", value: function(i, s) {
        return i > s ? this.isTouches(s, i) : (i === oe.A && s === oe.A || i === oe.L && s === oe.L || i === oe.L && s === oe.A || i === oe.P && s === oe.A || i === oe.P && s === oe.L) && this._matrix[z.INTERIOR][z.INTERIOR] === oe.FALSE && (h.isTrue(this._matrix[z.INTERIOR][z.BOUNDARY]) || h.isTrue(this._matrix[z.BOUNDARY][z.INTERIOR]) || h.isTrue(this._matrix[z.BOUNDARY][z.BOUNDARY]));
      } }, { key: "isOverlaps", value: function(i, s) {
        return i === oe.P && s === oe.P || i === oe.A && s === oe.A ? h.isTrue(this._matrix[z.INTERIOR][z.INTERIOR]) && h.isTrue(this._matrix[z.INTERIOR][z.EXTERIOR]) && h.isTrue(this._matrix[z.EXTERIOR][z.INTERIOR]) : i === oe.L && s === oe.L && this._matrix[z.INTERIOR][z.INTERIOR] === 1 && h.isTrue(this._matrix[z.INTERIOR][z.EXTERIOR]) && h.isTrue(this._matrix[z.EXTERIOR][z.INTERIOR]);
      } }, { key: "isEquals", value: function(i, s) {
        return i === s && h.isTrue(this._matrix[z.INTERIOR][z.INTERIOR]) && this._matrix[z.INTERIOR][z.EXTERIOR] === oe.FALSE && this._matrix[z.BOUNDARY][z.EXTERIOR] === oe.FALSE && this._matrix[z.EXTERIOR][z.INTERIOR] === oe.FALSE && this._matrix[z.EXTERIOR][z.BOUNDARY] === oe.FALSE;
      } }, { key: "toString", value: function() {
        for (var i = new _i("123456789"), s = 0; s < 3; s++) for (var l = 0; l < 3; l++) i.setCharAt(3 * s + l, oe.toDimensionSymbol(this._matrix[s][l]));
        return i.toString();
      } }, { key: "setAll", value: function(i) {
        for (var s = 0; s < 3; s++) for (var l = 0; l < 3; l++) this._matrix[s][l] = i;
      } }, { key: "get", value: function(i, s) {
        return this._matrix[i][s];
      } }, { key: "transpose", value: function() {
        var i = this._matrix[1][0];
        return this._matrix[1][0] = this._matrix[0][1], this._matrix[0][1] = i, i = this._matrix[2][0], this._matrix[2][0] = this._matrix[0][2], this._matrix[0][2] = i, i = this._matrix[2][1], this._matrix[2][1] = this._matrix[1][2], this._matrix[1][2] = i, this;
      } }, { key: "matches", value: function(i) {
        if (i.length !== 9) throw new O("Should be length 9: " + i);
        for (var s = 0; s < 3; s++) for (var l = 0; l < 3; l++) if (!h.matches(this._matrix[s][l], i.charAt(3 * s + l))) return !1;
        return !0;
      } }, { key: "add", value: function(i) {
        for (var s = 0; s < 3; s++) for (var l = 0; l < 3; l++) this.setAtLeast(s, l, i.get(s, l));
      } }, { key: "isDisjoint", value: function() {
        return this._matrix[z.INTERIOR][z.INTERIOR] === oe.FALSE && this._matrix[z.INTERIOR][z.BOUNDARY] === oe.FALSE && this._matrix[z.BOUNDARY][z.INTERIOR] === oe.FALSE && this._matrix[z.BOUNDARY][z.BOUNDARY] === oe.FALSE;
      } }, { key: "isCrosses", value: function(i, s) {
        return i === oe.P && s === oe.L || i === oe.P && s === oe.A || i === oe.L && s === oe.A ? h.isTrue(this._matrix[z.INTERIOR][z.INTERIOR]) && h.isTrue(this._matrix[z.INTERIOR][z.EXTERIOR]) : i === oe.L && s === oe.P || i === oe.A && s === oe.P || i === oe.A && s === oe.L ? h.isTrue(this._matrix[z.INTERIOR][z.INTERIOR]) && h.isTrue(this._matrix[z.EXTERIOR][z.INTERIOR]) : i === oe.L && s === oe.L && this._matrix[z.INTERIOR][z.INTERIOR] === 0;
      } }, { key: "interfaces_", get: function() {
        return [C];
      } }], [{ key: "constructor_", value: function() {
        if (this._matrix = null, arguments.length === 0) this._matrix = Array(3).fill().map(function() {
          return Array(3);
        }), this.setAll(oe.FALSE);
        else if (arguments.length === 1) {
          if (typeof arguments[0] == "string") {
            var i = arguments[0];
            h.constructor_.call(this), this.set(i);
          } else if (arguments[0] instanceof h) {
            var s = arguments[0];
            h.constructor_.call(this), this._matrix[z.INTERIOR][z.INTERIOR] = s._matrix[z.INTERIOR][z.INTERIOR], this._matrix[z.INTERIOR][z.BOUNDARY] = s._matrix[z.INTERIOR][z.BOUNDARY], this._matrix[z.INTERIOR][z.EXTERIOR] = s._matrix[z.INTERIOR][z.EXTERIOR], this._matrix[z.BOUNDARY][z.INTERIOR] = s._matrix[z.BOUNDARY][z.INTERIOR], this._matrix[z.BOUNDARY][z.BOUNDARY] = s._matrix[z.BOUNDARY][z.BOUNDARY], this._matrix[z.BOUNDARY][z.EXTERIOR] = s._matrix[z.BOUNDARY][z.EXTERIOR], this._matrix[z.EXTERIOR][z.INTERIOR] = s._matrix[z.EXTERIOR][z.INTERIOR], this._matrix[z.EXTERIOR][z.BOUNDARY] = s._matrix[z.EXTERIOR][z.BOUNDARY], this._matrix[z.EXTERIOR][z.EXTERIOR] = s._matrix[z.EXTERIOR][z.EXTERIOR];
          }
        }
      } }, { key: "matches", value: function() {
        if (Number.isInteger(arguments[0]) && typeof arguments[1] == "string") {
          var i = arguments[0], s = arguments[1];
          return s === oe.SYM_DONTCARE || s === oe.SYM_TRUE && (i >= 0 || i === oe.TRUE) || s === oe.SYM_FALSE && i === oe.FALSE || s === oe.SYM_P && i === oe.P || s === oe.SYM_L && i === oe.L || s === oe.SYM_A && i === oe.A;
        }
        if (typeof arguments[0] == "string" && typeof arguments[1] == "string") {
          var l = arguments[1];
          return new h(arguments[0]).matches(l);
        }
      } }, { key: "isTrue", value: function(i) {
        return i >= 0 || i === oe.TRUE;
      } }]);
    }(), zg = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "size", value: function() {
        return this._size;
      } }, { key: "addAll", value: function(i) {
        return i === null || i.length === 0 ? null : (this.ensureCapacity(this._size + i.length), bt.arraycopy(i, 0, this._data, this._size, i.length), void (this._size += i.length));
      } }, { key: "ensureCapacity", value: function(i) {
        if (i <= this._data.length) return null;
        var s = Math.max(i, 2 * this._data.length);
        this._data = Cn.copyOf(this._data, s);
      } }, { key: "toArray", value: function() {
        var i = new Array(this._size).fill(null);
        return bt.arraycopy(this._data, 0, i, 0, this._size), i;
      } }, { key: "add", value: function(i) {
        this.ensureCapacity(this._size + 1), this._data[this._size] = i, ++this._size;
      } }], [{ key: "constructor_", value: function() {
        if (this._data = null, this._size = 0, arguments.length === 0) h.constructor_.call(this, 10);
        else if (arguments.length === 1) {
          var i = arguments[0];
          this._data = new Array(i).fill(null);
        }
      } }]);
    }(), Ug = function() {
      function h() {
        o(this, h);
      }
      return c(h, [{ key: "getChainStartIndices", value: function(i) {
        var s = 0, l = new zg(Math.trunc(i.length / 2));
        l.add(s);
        do {
          var d = this.findChainEnd(i, s);
          l.add(d), s = d;
        } while (s < i.length - 1);
        return l.toArray();
      } }, { key: "findChainEnd", value: function(i, s) {
        for (var l = dt.quadrant(i[s], i[s + 1]), d = s + 1; d < i.length && dt.quadrant(i[d - 1], i[d]) === l; )
          d++;
        return d - 1;
      } }, { key: "OLDgetChainStartIndices", value: function(i) {
        var s = 0, l = new ve();
        l.add(s);
        do {
          var d = this.findChainEnd(i, s);
          l.add(d), s = d;
        } while (s < i.length - 1);
        return h.toIntArray(l);
      } }], [{ key: "toIntArray", value: function(i) {
        for (var s = new Array(i.size()).fill(null), l = 0; l < s.length; l++) s[l] = i.get(l).intValue();
        return s;
      } }]);
    }(), Yg = function() {
      return c(function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }, [{ key: "getCoordinates", value: function() {
        return this.pts;
      } }, { key: "getMaxX", value: function(h) {
        var i = this.pts[this.startIndex[h]].x, s = this.pts[this.startIndex[h + 1]].x;
        return i > s ? i : s;
      } }, { key: "getMinX", value: function(h) {
        var i = this.pts[this.startIndex[h]].x, s = this.pts[this.startIndex[h + 1]].x;
        return i < s ? i : s;
      } }, { key: "computeIntersectsForChain", value: function() {
        if (arguments.length === 4) {
          var h = arguments[0], i = arguments[1], s = arguments[2], l = arguments[3];
          this.computeIntersectsForChain(this.startIndex[h], this.startIndex[h + 1], i, i.startIndex[s], i.startIndex[s + 1], l);
        } else if (arguments.length === 6) {
          var d = arguments[0], y = arguments[1], x = arguments[2], E = arguments[3], P = arguments[4], F = arguments[5];
          if (y - d == 1 && P - E == 1) return F.addIntersections(this.e, d, x.e, E), null;
          if (!this.overlaps(d, y, x, E, P)) return null;
          var $ = Math.trunc((d + y) / 2), K = Math.trunc((E + P) / 2);
          d < $ && (E < K && this.computeIntersectsForChain(d, $, x, E, K, F), K < P && this.computeIntersectsForChain(d, $, x, K, P, F)), $ < y && (E < K && this.computeIntersectsForChain($, y, x, E, K, F), K < P && this.computeIntersectsForChain($, y, x, K, P, F));
        }
      } }, { key: "overlaps", value: function(h, i, s, l, d) {
        return _e.intersects(this.pts[h], this.pts[i], s.pts[l], s.pts[d]);
      } }, { key: "getStartIndexes", value: function() {
        return this.startIndex;
      } }, { key: "computeIntersects", value: function(h, i) {
        for (var s = 0; s < this.startIndex.length - 1; s++) for (var l = 0; l < h.startIndex.length - 1; l++) this.computeIntersectsForChain(s, h, l, i);
      } }], [{ key: "constructor_", value: function() {
        this.e = null, this.pts = null, this.startIndex = null;
        var h = arguments[0];
        this.e = h, this.pts = h.getCoordinates();
        var i = new Ug();
        this.startIndex = i.getChainStartIndices(this.pts);
      } }]);
    }(), ou = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "getDepth", value: function(i, s) {
        return this._depth[i][s];
      } }, { key: "setDepth", value: function(i, s, l) {
        this._depth[i][s] = l;
      } }, { key: "isNull", value: function() {
        if (arguments.length === 0) {
          for (var i = 0; i < 2; i++) for (var s = 0; s < 3; s++) if (this._depth[i][s] !== h.NULL_VALUE) return !1;
          return !0;
        }
        if (arguments.length === 1) {
          var l = arguments[0];
          return this._depth[l][1] === h.NULL_VALUE;
        }
        if (arguments.length === 2) {
          var d = arguments[0], y = arguments[1];
          return this._depth[d][y] === h.NULL_VALUE;
        }
      } }, { key: "normalize", value: function() {
        for (var i = 0; i < 2; i++) if (!this.isNull(i)) {
          var s = this._depth[i][1];
          this._depth[i][2] < s && (s = this._depth[i][2]), s < 0 && (s = 0);
          for (var l = 1; l < 3; l++) {
            var d = 0;
            this._depth[i][l] > s && (d = 1), this._depth[i][l] = d;
          }
        }
      } }, { key: "getDelta", value: function(i) {
        return this._depth[i][ie.RIGHT] - this._depth[i][ie.LEFT];
      } }, { key: "getLocation", value: function(i, s) {
        return this._depth[i][s] <= 0 ? z.EXTERIOR : z.INTERIOR;
      } }, { key: "toString", value: function() {
        return "A: " + this._depth[0][1] + "," + this._depth[0][2] + " B: " + this._depth[1][1] + "," + this._depth[1][2];
      } }, { key: "add", value: function() {
        if (arguments.length === 1) for (var i = arguments[0], s = 0; s < 2; s++) for (var l = 1; l < 3; l++) {
          var d = i.getLocation(s, l);
          d !== z.EXTERIOR && d !== z.INTERIOR || (this.isNull(s, l) ? this._depth[s][l] = h.depthAtLocation(d) : this._depth[s][l] += h.depthAtLocation(d));
        }
        else if (arguments.length === 3) {
          var y = arguments[0], x = arguments[1];
          arguments[2] === z.INTERIOR && this._depth[y][x]++;
        }
      } }], [{ key: "constructor_", value: function() {
        this._depth = Array(2).fill().map(function() {
          return Array(3);
        });
        for (var i = 0; i < 2; i++) for (var s = 0; s < 3; s++) this._depth[i][s] = h.NULL_VALUE;
      } }, { key: "depthAtLocation", value: function(i) {
        return i === z.EXTERIOR ? 0 : i === z.INTERIOR ? 1 : h.NULL_VALUE;
      } }]);
    }();
    ou.NULL_VALUE = -1;
    var au = function(h) {
      function i() {
        var s;
        return o(this, i), s = r(this, i), i.constructor_.apply(s, arguments), s;
      }
      return m(i, h), c(i, [{ key: "getDepth", value: function() {
        return this._depth;
      } }, { key: "getCollapsedEdge", value: function() {
        var s = new Array(2).fill(null);
        return s[0] = this.pts[0], s[1] = this.pts[1], new i(s, Lt.toLineLabel(this._label));
      } }, { key: "isIsolated", value: function() {
        return this._isIsolated;
      } }, { key: "getCoordinates", value: function() {
        return this.pts;
      } }, { key: "setIsolated", value: function(s) {
        this._isIsolated = s;
      } }, { key: "setName", value: function(s) {
        this._name = s;
      } }, { key: "equals", value: function(s) {
        if (!(s instanceof i)) return !1;
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
        i.updateIM(this._label, s);
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
        return this._mce === null && (this._mce = new Yg(this)), this._mce;
      } }, { key: "getEnvelope", value: function() {
        if (this._env === null) {
          this._env = new _e();
          for (var s = 0; s < this.pts.length; s++) this._env.expandToInclude(this.pts[s]);
        }
        return this._env;
      } }, { key: "addIntersection", value: function(s, l, d, y) {
        var x = new Z(s.getIntersection(y)), E = l, P = s.getEdgeDistance(d, y), F = E + 1;
        if (F < this.pts.length) {
          var $ = this.pts[F];
          x.equals2D($) && (E = F, P = 0);
        }
        this.eiList.add(x, E, P);
      } }, { key: "toString", value: function() {
        var s = new _i();
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
        if (this.pts = null, this._env = null, this.eiList = new Gg(this), this._name = null, this._mce = null, this._isIsolated = !0, this._depth = new ou(), this._depthDelta = 0, arguments.length === 1) {
          var s = arguments[0];
          i.constructor_.call(this, s, null);
        } else if (arguments.length === 2) {
          var l = arguments[0], d = arguments[1];
          this.pts = l, this._label = d;
        }
      } }, { key: "updateIM", value: function() {
        if (!(arguments.length === 2 && arguments[1] instanceof qg && arguments[0] instanceof Lt)) return w(i, "updateIM", this).apply(this, arguments);
        var s = arguments[0], l = arguments[1];
        l.setAtLeastIfValid(s.getLocation(0, ie.ON), s.getLocation(1, ie.ON), 1), s.isArea() && (l.setAtLeastIfValid(s.getLocation(0, ie.LEFT), s.getLocation(1, ie.LEFT), 2), l.setAtLeastIfValid(s.getLocation(0, ie.RIGHT), s.getLocation(1, ie.RIGHT), 2));
      } }]);
    }(za), uu = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "setWorkingPrecisionModel", value: function(i) {
        this._workingPrecisionModel = i;
      } }, { key: "insertUniqueEdge", value: function(i) {
        var s = this._edgeList.findEqualEdge(i);
        if (s !== null) {
          var l = s.getLabel(), d = i.getLabel();
          s.isPointwiseEqual(i) || (d = new Lt(i.getLabel())).flip(), l.merge(d);
          var y = h.depthDelta(d), x = s.getDepthDelta() + y;
          s.setDepthDelta(x);
        } else this._edgeList.add(i), i.setDepthDelta(h.depthDelta(i.getLabel()));
      } }, { key: "buildSubgraphs", value: function(i, s) {
        for (var l = new ve(), d = i.iterator(); d.hasNext(); ) {
          var y = d.next(), x = y.getRightmostCoordinate(), E = new tu(l).getDepth(x);
          y.computeDepth(E), y.findResultEdges(), l.add(y), s.add(y.getDirectedEdges(), y.getNodes());
        }
      } }, { key: "createSubgraphs", value: function(i) {
        for (var s = new ve(), l = i.getNodes().iterator(); l.hasNext(); ) {
          var d = l.next();
          if (!d.isVisited()) {
            var y = new $f();
            y.create(d), s.add(y);
          }
        }
        return Yn.sort(s, Yn.reverseOrder()), s;
      } }, { key: "createEmptyResultGeometry", value: function() {
        return this._geomFact.createPolygon();
      } }, { key: "getNoder", value: function(i) {
        if (this._workingNoder !== null) return this._workingNoder;
        var s = new Xs(), l = new Sn();
        return l.setPrecisionModel(i), s.setSegmentIntersector(new Fg(l)), s;
      } }, { key: "buffer", value: function(i, s) {
        var l = this._workingPrecisionModel;
        l === null && (l = i.getPrecisionModel()), this._geomFact = i.getFactory();
        var d = new bg(l, this._bufParams), y = new Lg(i, s, d).getCurves();
        if (y.size() <= 0) return this.createEmptyResultGeometry();
        this.computeNodedEdges(y, l), this._graph = new Wa(new Og()), this._graph.addEdges(this._edgeList.getEdges());
        var x = this.createSubgraphs(this._graph), E = new dg(this._geomFact);
        this.buildSubgraphs(x, E);
        var P = E.getPolygons();
        return P.size() <= 0 ? this.createEmptyResultGeometry() : this._geomFact.buildGeometry(P);
      } }, { key: "computeNodedEdges", value: function(i, s) {
        var l = this.getNoder(s);
        l.computeNodes(i);
        for (var d = l.getNodedSubstrings().iterator(); d.hasNext(); ) {
          var y = d.next(), x = y.getCoordinates();
          if (x.length !== 2 || !x[0].equals2D(x[1])) {
            var E = y.getData(), P = new au(y.getCoordinates(), new Lt(E));
            this.insertUniqueEdge(P);
          }
        }
      } }, { key: "setNoder", value: function(i) {
        this._workingNoder = i;
      } }], [{ key: "constructor_", value: function() {
        this._bufParams = null, this._workingPrecisionModel = null, this._workingNoder = null, this._geomFact = null, this._graph = null, this._edgeList = new Dg();
        var i = arguments[0];
        this._bufParams = i;
      } }, { key: "depthDelta", value: function(i) {
        var s = i.getLocation(0, ie.LEFT), l = i.getLocation(0, ie.RIGHT);
        return s === z.INTERIOR && l === z.EXTERIOR ? 1 : s === z.EXTERIOR && l === z.INTERIOR ? -1 : 0;
      } }, { key: "convertSegStrings", value: function(i) {
        for (var s = new zn(), l = new ve(); i.hasNext(); ) {
          var d = i.next(), y = s.createLineString(d.getCoordinates());
          l.add(y);
        }
        return s.buildGeometry(l);
      } }]);
    }(), Xg = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "rescale", value: function() {
        if (Ee(arguments[0], be)) for (var i = arguments[0].iterator(); i.hasNext(); ) {
          var s = i.next();
          this.rescale(s.getCoordinates());
        }
        else if (arguments[0] instanceof Array) {
          for (var l = arguments[0], d = 0; d < l.length; d++) l[d].x = l[d].x / this._scaleFactor + this._offsetX, l[d].y = l[d].y / this._scaleFactor + this._offsetY;
          l.length === 2 && l[0].equals2D(l[1]) && bt.out.println(l);
        }
      } }, { key: "scale", value: function() {
        if (Ee(arguments[0], be)) {
          for (var i = arguments[0], s = new ve(i.size()), l = i.iterator(); l.hasNext(); ) {
            var d = l.next();
            s.add(new bn(this.scale(d.getCoordinates()), d.getData()));
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
        var i = this._noder.getNodedSubstrings();
        return this._isScaled && this.rescale(i), i;
      } }, { key: "computeNodes", value: function(i) {
        var s = i;
        this._isScaled && (s = this.scale(i)), this._noder.computeNodes(s);
      } }, { key: "interfaces_", get: function() {
        return [Ys];
      } }], [{ key: "constructor_", value: function() {
        if (this._noder = null, this._scaleFactor = null, this._offsetX = null, this._offsetY = null, this._isScaled = !1, arguments.length === 2) {
          var i = arguments[0], s = arguments[1];
          h.constructor_.call(this, i, s, 0, 0);
        } else if (arguments.length === 4) {
          var l = arguments[0], d = arguments[1];
          this._noder = l, this._scaleFactor = d, this._isScaled = !this.isIntegerPrecision();
        }
      } }]);
    }(), lu = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "checkEndPtVertexIntersections", value: function() {
        if (arguments.length === 0) for (var i = this._segStrings.iterator(); i.hasNext(); ) {
          var s = i.next().getCoordinates();
          this.checkEndPtVertexIntersections(s[0], this._segStrings), this.checkEndPtVertexIntersections(s[s.length - 1], this._segStrings);
        }
        else if (arguments.length === 2) {
          for (var l = arguments[0], d = arguments[1].iterator(); d.hasNext(); ) for (var y = d.next().getCoordinates(), x = 1; x < y.length - 1; x++) if (y[x].equals(l)) throw new Q("found endpt/interior pt intersection at index " + x + " :pt " + l);
        }
      } }, { key: "checkInteriorIntersections", value: function() {
        if (arguments.length === 0) for (var i = this._segStrings.iterator(); i.hasNext(); ) for (var s = i.next(), l = this._segStrings.iterator(); l.hasNext(); ) {
          var d = l.next();
          this.checkInteriorIntersections(s, d);
        }
        else if (arguments.length === 2) for (var y = arguments[0], x = arguments[1], E = y.getCoordinates(), P = x.getCoordinates(), F = 0; F < E.length - 1; F++) for (var $ = 0; $ < P.length - 1; $++) this.checkInteriorIntersections(y, F, x, $);
        else if (arguments.length === 4) {
          var K = arguments[0], ne = arguments[1], ue = arguments[2], he = arguments[3];
          if (K === ue && ne === he) return null;
          var ge = K.getCoordinates()[ne], Re = K.getCoordinates()[ne + 1], Pe = ue.getCoordinates()[he], Ue = ue.getCoordinates()[he + 1];
          if (this._li.computeIntersection(ge, Re, Pe, Ue), this._li.hasIntersection() && (this._li.isProper() || this.hasInteriorIntersection(this._li, ge, Re) || this.hasInteriorIntersection(this._li, Pe, Ue))) throw new Q("found non-noded intersection at " + ge + "-" + Re + " and " + Pe + "-" + Ue);
        }
      } }, { key: "checkValid", value: function() {
        this.checkEndPtVertexIntersections(), this.checkInteriorIntersections(), this.checkCollapses();
      } }, { key: "checkCollapses", value: function() {
        if (arguments.length === 0) for (var i = this._segStrings.iterator(); i.hasNext(); ) {
          var s = i.next();
          this.checkCollapses(s);
        }
        else if (arguments.length === 1) for (var l = arguments[0].getCoordinates(), d = 0; d < l.length - 2; d++) this.checkCollapse(l[d], l[d + 1], l[d + 2]);
      } }, { key: "hasInteriorIntersection", value: function(i, s, l) {
        for (var d = 0; d < i.getIntersectionNum(); d++) {
          var y = i.getIntersection(d);
          if (!y.equals(s) && !y.equals(l)) return !0;
        }
        return !1;
      } }, { key: "checkCollapse", value: function(i, s, l) {
        if (i.equals(l)) throw new Q("found non-noded collapse at " + h.fact.createLineString([i, s, l]));
      } }], [{ key: "constructor_", value: function() {
        this._li = new Sn(), this._segStrings = null;
        var i = arguments[0];
        this._segStrings = i;
      } }]);
    }();
    lu.fact = new zn();
    var Hs = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "intersectsScaled", value: function(i, s) {
        var l = Math.min(i.x, s.x), d = Math.max(i.x, s.x), y = Math.min(i.y, s.y), x = Math.max(i.y, s.y), E = this._maxx < l || this._minx > d || this._maxy < y || this._miny > x;
        if (E) return !1;
        var P = this.intersectsToleranceSquare(i, s);
        return ee.isTrue(!(E && P), "Found bad envelope test"), P;
      } }, { key: "initCorners", value: function(i) {
        var s = 0.5;
        this._minx = i.x - s, this._maxx = i.x + s, this._miny = i.y - s, this._maxy = i.y + s, this._corner[0] = new Z(this._maxx, this._maxy), this._corner[1] = new Z(this._minx, this._maxy), this._corner[2] = new Z(this._minx, this._miny), this._corner[3] = new Z(this._maxx, this._miny);
      } }, { key: "intersects", value: function(i, s) {
        return this._scaleFactor === 1 ? this.intersectsScaled(i, s) : (this.copyScaled(i, this._p0Scaled), this.copyScaled(s, this._p1Scaled), this.intersectsScaled(this._p0Scaled, this._p1Scaled));
      } }, { key: "scale", value: function(i) {
        return Math.round(i * this._scaleFactor);
      } }, { key: "getCoordinate", value: function() {
        return this._originalPt;
      } }, { key: "copyScaled", value: function(i, s) {
        s.x = this.scale(i.x), s.y = this.scale(i.y);
      } }, { key: "getSafeEnvelope", value: function() {
        if (this._safeEnv === null) {
          var i = h.SAFE_ENV_EXPANSION_FACTOR / this._scaleFactor;
          this._safeEnv = new _e(this._originalPt.x - i, this._originalPt.x + i, this._originalPt.y - i, this._originalPt.y + i);
        }
        return this._safeEnv;
      } }, { key: "intersectsPixelClosure", value: function(i, s) {
        return this._li.computeIntersection(i, s, this._corner[0], this._corner[1]), !!this._li.hasIntersection() || (this._li.computeIntersection(i, s, this._corner[1], this._corner[2]), !!this._li.hasIntersection() || (this._li.computeIntersection(i, s, this._corner[2], this._corner[3]), !!this._li.hasIntersection() || (this._li.computeIntersection(i, s, this._corner[3], this._corner[0]), !!this._li.hasIntersection())));
      } }, { key: "intersectsToleranceSquare", value: function(i, s) {
        var l = !1, d = !1;
        return this._li.computeIntersection(i, s, this._corner[0], this._corner[1]), !!this._li.isProper() || (this._li.computeIntersection(i, s, this._corner[1], this._corner[2]), !!this._li.isProper() || (this._li.hasIntersection() && (l = !0), this._li.computeIntersection(i, s, this._corner[2], this._corner[3]), !!this._li.isProper() || (this._li.hasIntersection() && (d = !0), this._li.computeIntersection(i, s, this._corner[3], this._corner[0]), !!this._li.isProper() || !(!l || !d) || !!i.equals(this._pt) || !!s.equals(this._pt))));
      } }, { key: "addSnappedNode", value: function(i, s) {
        var l = i.getCoordinate(s), d = i.getCoordinate(s + 1);
        return !!this.intersects(l, d) && (i.addIntersection(this.getCoordinate(), s), !0);
      } }], [{ key: "constructor_", value: function() {
        this._li = null, this._pt = null, this._originalPt = null, this._ptScaled = null, this._p0Scaled = null, this._p1Scaled = null, this._scaleFactor = null, this._minx = null, this._maxx = null, this._miny = null, this._maxy = null, this._corner = new Array(4).fill(null), this._safeEnv = null;
        var i = arguments[0], s = arguments[1], l = arguments[2];
        if (this._originalPt = i, this._pt = i, this._scaleFactor = s, this._li = l, s <= 0) throw new O("Scale factor must be non-zero");
        s !== 1 && (this._pt = new Z(this.scale(i.x), this.scale(i.y)), this._p0Scaled = new Z(), this._p1Scaled = new Z()), this.initCorners(this._pt);
      } }]);
    }();
    Hs.SAFE_ENV_EXPANSION_FACTOR = 0.75;
    var Vg = function() {
      return c(function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }, [{ key: "select", value: function() {
        if (arguments.length !== 1) {
          if (arguments.length === 2) {
            var h = arguments[1];
            arguments[0].getLineSegment(h, this.selectedSegment), this.select(this.selectedSegment);
          }
        }
      } }], [{ key: "constructor_", value: function() {
        this.selectedSegment = new Ct();
      } }]);
    }(), cu = function() {
      return c(function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }, [{ key: "snap", value: function() {
        if (arguments.length === 1) {
          var h = arguments[0];
          return this.snap(h, null, -1);
        }
        if (arguments.length === 3) {
          var i = arguments[0], s = arguments[1], l = arguments[2], d = i.getSafeEnvelope(), y = new hu(i, s, l);
          return this._index.query(d, new (function() {
            return c(function x() {
              o(this, x);
            }, [{ key: "interfaces_", get: function() {
              return [Za];
            } }, { key: "visitItem", value: function(x) {
              x.select(d, y);
            } }]);
          }())()), y.isNodeAdded();
        }
      } }], [{ key: "constructor_", value: function() {
        this._index = null;
        var h = arguments[0];
        this._index = h;
      } }]);
    }(), hu = function(h) {
      function i() {
        var s;
        return o(this, i), s = r(this, i), i.constructor_.apply(s, arguments), s;
      }
      return m(i, h), c(i, [{ key: "isNodeAdded", value: function() {
        return this._isNodeAdded;
      } }, { key: "select", value: function() {
        if (!(arguments.length === 2 && Number.isInteger(arguments[1]) && arguments[0] instanceof Ja)) return w(i, "select", this, 1).apply(this, arguments);
        var s = arguments[1], l = arguments[0].getContext();
        if (this._parentEdge === l && (s === this._hotPixelVertexIndex || s + 1 === this._hotPixelVertexIndex)) return null;
        this._isNodeAdded |= this._hotPixel.addSnappedNode(l, s);
      } }], [{ key: "constructor_", value: function() {
        this._hotPixel = null, this._parentEdge = null, this._hotPixelVertexIndex = null, this._isNodeAdded = !1;
        var s = arguments[0], l = arguments[1], d = arguments[2];
        this._hotPixel = s, this._parentEdge = l, this._hotPixelVertexIndex = d;
      } }]);
    }(Vg);
    cu.HotPixelSnapAction = hu;
    var Hg = function() {
      return c(function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }, [{ key: "processIntersections", value: function(h, i, s, l) {
        if (h === s && i === l) return null;
        var d = h.getCoordinates()[i], y = h.getCoordinates()[i + 1], x = s.getCoordinates()[l], E = s.getCoordinates()[l + 1];
        if (this._li.computeIntersection(d, y, x, E), this._li.hasIntersection() && this._li.isInteriorIntersection()) {
          for (var P = 0; P < this._li.getIntersectionNum(); P++) this._interiorIntersections.add(this._li.getIntersection(P));
          h.addIntersections(this._li, i, 0), s.addIntersections(this._li, l, 1);
        }
      } }, { key: "isDone", value: function() {
        return !1;
      } }, { key: "getInteriorIntersections", value: function() {
        return this._interiorIntersections;
      } }, { key: "interfaces_", get: function() {
        return [su];
      } }], [{ key: "constructor_", value: function() {
        this._li = null, this._interiorIntersections = null;
        var h = arguments[0];
        this._li = h, this._interiorIntersections = new ve();
      } }]);
    }(), Wg = function() {
      return c(function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }, [{ key: "checkCorrectness", value: function(h) {
        var i = bn.getNodedSubstrings(h), s = new lu(i);
        try {
          s.checkValid();
        } catch (l) {
          if (!(l instanceof A)) throw l;
          l.printStackTrace();
        }
      } }, { key: "getNodedSubstrings", value: function() {
        return bn.getNodedSubstrings(this._nodedSegStrings);
      } }, { key: "snapRound", value: function(h, i) {
        var s = this.findInteriorIntersections(h, i);
        this.computeIntersectionSnaps(s), this.computeVertexSnaps(h);
      } }, { key: "findInteriorIntersections", value: function(h, i) {
        var s = new Hg(i);
        return this._noder.setSegmentIntersector(s), this._noder.computeNodes(h), s.getInteriorIntersections();
      } }, { key: "computeVertexSnaps", value: function() {
        if (Ee(arguments[0], be)) for (var h = arguments[0].iterator(); h.hasNext(); ) {
          var i = h.next();
          this.computeVertexSnaps(i);
        }
        else if (arguments[0] instanceof bn) for (var s = arguments[0], l = s.getCoordinates(), d = 0; d < l.length; d++) {
          var y = new Hs(l[d], this._scaleFactor, this._li);
          this._pointSnapper.snap(y, s, d) && s.addIntersection(l[d], d);
        }
      } }, { key: "computeNodes", value: function(h) {
        this._nodedSegStrings = h, this._noder = new Xs(), this._pointSnapper = new cu(this._noder.getIndex()), this.snapRound(h, this._li);
      } }, { key: "computeIntersectionSnaps", value: function(h) {
        for (var i = h.iterator(); i.hasNext(); ) {
          var s = i.next(), l = new Hs(s, this._scaleFactor, this._li);
          this._pointSnapper.snap(l);
        }
      } }, { key: "interfaces_", get: function() {
        return [Ys];
      } }], [{ key: "constructor_", value: function() {
        this._pm = null, this._li = null, this._scaleFactor = null, this._noder = null, this._pointSnapper = null, this._nodedSegStrings = null;
        var h = arguments[0];
        this._pm = h, this._li = new Sn(), this._li.setPrecisionModel(h), this._scaleFactor = h.getScale();
      } }]);
    }(), Hn = function() {
      function h() {
        o(this, h), h.constructor_.apply(this, arguments);
      }
      return c(h, [{ key: "bufferFixedPrecision", value: function(i) {
        var s = new Xg(new Wg(new Bt(1)), i.getScale()), l = new uu(this._bufParams);
        l.setWorkingPrecisionModel(i), l.setNoder(s), this._resultGeometry = l.buffer(this._argGeom, this._distance);
      } }, { key: "bufferReducedPrecision", value: function() {
        if (arguments.length === 0) {
          for (var i = h.MAX_PRECISION_DIGITS; i >= 0; i--) {
            try {
              this.bufferReducedPrecision(i);
            } catch (y) {
              if (!(y instanceof nn)) throw y;
              this._saveException = y;
            }
            if (this._resultGeometry !== null) return null;
          }
          throw this._saveException;
        }
        if (arguments.length === 1) {
          var s = arguments[0], l = h.precisionScaleFactor(this._argGeom, this._distance, s), d = new Bt(l);
          this.bufferFixedPrecision(d);
        }
      } }, { key: "computeGeometry", value: function() {
        if (this.bufferOriginalPrecision(), this._resultGeometry !== null) return null;
        var i = this._argGeom.getFactory().getPrecisionModel();
        i.getType() === Bt.FIXED ? this.bufferFixedPrecision(i) : this.bufferReducedPrecision();
      } }, { key: "setQuadrantSegments", value: function(i) {
        this._bufParams.setQuadrantSegments(i);
      } }, { key: "bufferOriginalPrecision", value: function() {
        try {
          var i = new uu(this._bufParams);
          this._resultGeometry = i.buffer(this._argGeom, this._distance);
        } catch (s) {
          if (!(s instanceof Q)) throw s;
          this._saveException = s;
        }
      } }, { key: "getResultGeometry", value: function(i) {
        return this._distance = i, this.computeGeometry(), this._resultGeometry;
      } }, { key: "setEndCapStyle", value: function(i) {
        this._bufParams.setEndCapStyle(i);
      } }], [{ key: "constructor_", value: function() {
        if (this._argGeom = null, this._distance = null, this._bufParams = new N(), this._resultGeometry = null, this._saveException = null, arguments.length === 1) {
          var i = arguments[0];
          this._argGeom = i;
        } else if (arguments.length === 2) {
          var s = arguments[0], l = arguments[1];
          this._argGeom = s, this._bufParams = l;
        }
      } }, { key: "bufferOp", value: function() {
        if (arguments.length === 2) {
          var i = arguments[1];
          return new h(arguments[0]).getResultGeometry(i);
        }
        if (arguments.length === 3) {
          if (Number.isInteger(arguments[2]) && arguments[0] instanceof ae && typeof arguments[1] == "number") {
            var s = arguments[1], l = arguments[2], d = new h(arguments[0]);
            return d.setQuadrantSegments(l), d.getResultGeometry(s);
          }
          if (arguments[2] instanceof N && arguments[0] instanceof ae && typeof arguments[1] == "number") {
            var y = arguments[1];
            return new h(arguments[0], arguments[2]).getResultGeometry(y);
          }
        } else if (arguments.length === 4) {
          var x = arguments[1], E = arguments[2], P = arguments[3], F = new h(arguments[0]);
          return F.setQuadrantSegments(E), F.setEndCapStyle(P), F.getResultGeometry(x);
        }
      } }, { key: "precisionScaleFactor", value: function(i, s, l) {
        var d = i.getEnvelopeInternal(), y = pr.max(Math.abs(d.getMaxX()), Math.abs(d.getMaxY()), Math.abs(d.getMinX()), Math.abs(d.getMinY())) + 2 * (s > 0 ? s : 0), x = l - Math.trunc(Math.log(y) / Math.log(10) + 1);
        return Math.pow(10, x);
      } }]);
    }();
    Hn.CAP_ROUND = N.CAP_ROUND, Hn.CAP_BUTT = N.CAP_FLAT, Hn.CAP_FLAT = N.CAP_FLAT, Hn.CAP_SQUARE = N.CAP_SQUARE, Hn.MAX_PRECISION_DIGITS = 12;
    var $g = ["Point", "MultiPoint", "LineString", "MultiLineString", "Polygon", "MultiPolygon"], fu = function() {
      return c(function h(i) {
        o(this, h), this.geometryFactory = i || new zn();
      }, [{ key: "read", value: function(h) {
        var i, s = (i = typeof h == "string" ? JSON.parse(h) : h).type;
        if (!Nt[s]) throw new Error("Unknown GeoJSON type: " + i.type);
        return $g.indexOf(s) !== -1 ? Nt[s].call(this, i.coordinates) : s === "GeometryCollection" ? Nt[s].call(this, i.geometries) : Nt[s].call(this, i);
      } }, { key: "write", value: function(h) {
        var i = h.getGeometryType();
        if (!Ht[i]) throw new Error("Geometry is not supported");
        return Ht[i].call(this, h);
      } }]);
    }(), Nt = { Feature: function(h) {
      var i = {};
      for (var s in h) i[s] = h[s];
      if (h.geometry) {
        var l = h.geometry.type;
        if (!Nt[l]) throw new Error("Unknown GeoJSON type: " + h.type);
        i.geometry = this.read(h.geometry);
      }
      return h.bbox && (i.bbox = Nt.bbox.call(this, h.bbox)), i;
    }, FeatureCollection: function(h) {
      var i = {};
      if (h.features) {
        i.features = [];
        for (var s = 0; s < h.features.length; ++s) i.features.push(this.read(h.features[s]));
      }
      return h.bbox && (i.bbox = this.parse.bbox.call(this, h.bbox)), i;
    }, coordinates: function(h) {
      for (var i = [], s = 0; s < h.length; ++s) {
        var l = h[s];
        i.push(a(Z, k(l)));
      }
      return i;
    }, bbox: function(h) {
      return this.geometryFactory.createLinearRing([new Z(h[0], h[1]), new Z(h[2], h[1]), new Z(h[2], h[3]), new Z(h[0], h[3]), new Z(h[0], h[1])]);
    }, Point: function(h) {
      var i = a(Z, k(h));
      return this.geometryFactory.createPoint(i);
    }, MultiPoint: function(h) {
      for (var i = [], s = 0; s < h.length; ++s) i.push(Nt.Point.call(this, h[s]));
      return this.geometryFactory.createMultiPoint(i);
    }, LineString: function(h) {
      var i = Nt.coordinates.call(this, h);
      return this.geometryFactory.createLineString(i);
    }, MultiLineString: function(h) {
      for (var i = [], s = 0; s < h.length; ++s) i.push(Nt.LineString.call(this, h[s]));
      return this.geometryFactory.createMultiLineString(i);
    }, Polygon: function(h) {
      for (var i = Nt.coordinates.call(this, h[0]), s = this.geometryFactory.createLinearRing(i), l = [], d = 1; d < h.length; ++d) {
        var y = h[d], x = Nt.coordinates.call(this, y), E = this.geometryFactory.createLinearRing(x);
        l.push(E);
      }
      return this.geometryFactory.createPolygon(s, l);
    }, MultiPolygon: function(h) {
      for (var i = [], s = 0; s < h.length; ++s) {
        var l = h[s];
        i.push(Nt.Polygon.call(this, l));
      }
      return this.geometryFactory.createMultiPolygon(i);
    }, GeometryCollection: function(h) {
      for (var i = [], s = 0; s < h.length; ++s) {
        var l = h[s];
        i.push(this.read(l));
      }
      return this.geometryFactory.createGeometryCollection(i);
    } }, Ht = { coordinate: function(h) {
      var i = [h.x, h.y];
      return h.z && i.push(h.z), h.m && i.push(h.m), i;
    }, Point: function(h) {
      return { type: "Point", coordinates: Ht.coordinate.call(this, h.getCoordinate()) };
    }, MultiPoint: function(h) {
      for (var i = [], s = 0; s < h._geometries.length; ++s) {
        var l = h._geometries[s], d = Ht.Point.call(this, l);
        i.push(d.coordinates);
      }
      return { type: "MultiPoint", coordinates: i };
    }, LineString: function(h) {
      for (var i = [], s = h.getCoordinates(), l = 0; l < s.length; ++l) {
        var d = s[l];
        i.push(Ht.coordinate.call(this, d));
      }
      return { type: "LineString", coordinates: i };
    }, MultiLineString: function(h) {
      for (var i = [], s = 0; s < h._geometries.length; ++s) {
        var l = h._geometries[s], d = Ht.LineString.call(this, l);
        i.push(d.coordinates);
      }
      return { type: "MultiLineString", coordinates: i };
    }, Polygon: function(h) {
      var i = [], s = Ht.LineString.call(this, h._shell);
      i.push(s.coordinates);
      for (var l = 0; l < h._holes.length; ++l) {
        var d = h._holes[l], y = Ht.LineString.call(this, d);
        i.push(y.coordinates);
      }
      return { type: "Polygon", coordinates: i };
    }, MultiPolygon: function(h) {
      for (var i = [], s = 0; s < h._geometries.length; ++s) {
        var l = h._geometries[s], d = Ht.Polygon.call(this, l);
        i.push(d.coordinates);
      }
      return { type: "MultiPolygon", coordinates: i };
    }, GeometryCollection: function(h) {
      for (var i = [], s = 0; s < h._geometries.length; ++s) {
        var l = h._geometries[s], d = l.getGeometryType();
        i.push(Ht[d].call(this, l));
      }
      return { type: "GeometryCollection", geometries: i };
    } };
    return { BufferOp: Hn, GeoJSONReader: function() {
      return c(function h(i) {
        o(this, h), this.parser = new fu(i || new zn());
      }, [{ key: "read", value: function(h) {
        return this.parser.read(h);
      } }]);
    }(), GeoJSONWriter: function() {
      return c(function h() {
        o(this, h), this.parser = new fu(this.geometryFactory);
      }, [{ key: "write", value: function(h) {
        return this.parser.write(h);
      } }]);
    }() };
  });
})(ch);
var mv = ch.exports;
const vv = /* @__PURE__ */ ci(mv);
class yv {
  constructor() {
    this._partials = new Float64Array(32), this._n = 0;
  }
  add(e) {
    const t = this._partials;
    let r = 0;
    for (let o = 0; o < this._n && o < 32; o++) {
      const a = t[o], u = e + a, c = Math.abs(e) < Math.abs(a) ? e - (u - a) : a - (u - e);
      c && (t[r++] = c), e = u;
    }
    return t[r] = e, this._n = r + 1, this;
  }
  valueOf() {
    const e = this._partials;
    let t = this._n, r, o, a, u = 0;
    if (t > 0) {
      for (u = e[--t]; t > 0 && (r = u, o = e[--t], u = r + o, a = o - (u - r), !a); )
        ;
      t > 0 && (a < 0 && e[t - 1] < 0 || a > 0 && e[t - 1] > 0) && (o = a * 2, r = u + o, o == r - u && (u = r));
    }
    return u;
  }
}
function* pv(n) {
  for (const e of n)
    yield* e;
}
function hh(n) {
  return Array.from(pv(n));
}
var Xe = 1e-6, Ae = Math.PI, Ot = Ae / 2, Ju = Ae / 4, zt = Ae * 2, on = 180 / Ae, It = Ae / 180, je = Math.abs, _v = Math.atan, cr = Math.atan2, $e = Math.cos, Ve = Math.sin, wv = Math.sign || function(n) {
  return n > 0 ? 1 : n < 0 ? -1 : 0;
}, hi = Math.sqrt;
function fh(n) {
  return n > 1 ? 0 : n < -1 ? Ae : Math.acos(n);
}
function hr(n) {
  return n > 1 ? Ot : n < -1 ? -Ot : Math.asin(n);
}
function Gr() {
}
function Qi(n, e) {
  n && ju.hasOwnProperty(n.type) && ju[n.type](n, e);
}
var Qu = {
  Feature: function(n, e) {
    Qi(n.geometry, e);
  },
  FeatureCollection: function(n, e) {
    for (var t = n.features, r = -1, o = t.length; ++r < o; ) Qi(t[r].geometry, e);
  }
}, ju = {
  Sphere: function(n, e) {
    e.sphere();
  },
  Point: function(n, e) {
    n = n.coordinates, e.point(n[0], n[1], n[2]);
  },
  MultiPoint: function(n, e) {
    for (var t = n.coordinates, r = -1, o = t.length; ++r < o; ) n = t[r], e.point(n[0], n[1], n[2]);
  },
  LineString: function(n, e) {
    Co(n.coordinates, e, 0);
  },
  MultiLineString: function(n, e) {
    for (var t = n.coordinates, r = -1, o = t.length; ++r < o; ) Co(t[r], e, 0);
  },
  Polygon: function(n, e) {
    el(n.coordinates, e);
  },
  MultiPolygon: function(n, e) {
    for (var t = n.coordinates, r = -1, o = t.length; ++r < o; ) el(t[r], e);
  },
  GeometryCollection: function(n, e) {
    for (var t = n.geometries, r = -1, o = t.length; ++r < o; ) Qi(t[r], e);
  }
};
function Co(n, e, t) {
  var r = -1, o = n.length - t, a;
  for (e.lineStart(); ++r < o; ) a = n[r], e.point(a[0], a[1], a[2]);
  e.lineEnd();
}
function el(n, e) {
  var t = -1, r = n.length;
  for (e.polygonStart(); ++t < r; ) Co(n[t], e, 1);
  e.polygonEnd();
}
function xv(n, e) {
  n && Qu.hasOwnProperty(n.type) ? Qu[n.type](n, e) : Qi(n, e);
}
function ko(n) {
  return [cr(n[1], n[0]), hr(n[2])];
}
function fr(n) {
  var e = n[0], t = n[1], r = $e(t);
  return [r * $e(e), r * Ve(e), Ve(t)];
}
function Li(n, e) {
  return n[0] * e[0] + n[1] * e[1] + n[2] * e[2];
}
function ji(n, e) {
  return [n[1] * e[2] - n[2] * e[1], n[2] * e[0] - n[0] * e[2], n[0] * e[1] - n[1] * e[0]];
}
function oo(n, e) {
  n[0] += e[0], n[1] += e[1], n[2] += e[2];
}
function Pi(n, e) {
  return [n[0] * e, n[1] * e, n[2] * e];
}
function Io(n) {
  var e = hi(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]);
  n[0] /= e, n[1] /= e, n[2] /= e;
}
function So(n, e) {
  function t(r, o) {
    return r = n(r, o), e(r[0], r[1]);
  }
  return n.invert && e.invert && (t.invert = function(r, o) {
    return r = e.invert(r, o), r && n.invert(r[0], r[1]);
  }), t;
}
function bo(n, e) {
  return [je(n) > Ae ? n + Math.round(-n / zt) * zt : n, e];
}
bo.invert = bo;
function Ev(n, e, t) {
  return (n %= zt) ? e || t ? So(nl(n), rl(e, t)) : nl(n) : e || t ? rl(e, t) : bo;
}
function tl(n) {
  return function(e, t) {
    return e += n, [e > Ae ? e - zt : e < -Ae ? e + zt : e, t];
  };
}
function nl(n) {
  var e = tl(n);
  return e.invert = tl(-n), e;
}
function rl(n, e) {
  var t = $e(n), r = Ve(n), o = $e(e), a = Ve(e);
  function u(c, f) {
    var g = $e(f), v = $e(c) * g, m = Ve(c) * g, p = Ve(f), _ = p * t + v * r;
    return [
      cr(m * o - _ * a, v * t - p * r),
      hr(_ * o + m * a)
    ];
  }
  return u.invert = function(c, f) {
    var g = $e(f), v = $e(c) * g, m = Ve(c) * g, p = Ve(f), _ = p * o - m * a;
    return [
      cr(m * o + p * a, v * t + _ * r),
      hr(_ * t - v * r)
    ];
  }, u;
}
function Cv(n, e, t, r, o, a) {
  if (t) {
    var u = $e(e), c = Ve(e), f = r * t;
    o == null ? (o = e + r * zt, a = e - f / 2) : (o = il(u, o), a = il(u, a), (r > 0 ? o < a : o > a) && (o += r * zt));
    for (var g, v = o; r > 0 ? v > a : v < a; v -= f)
      g = ko([u, -c * $e(v), -c * Ve(v)]), n.point(g[0], g[1]);
  }
}
function il(n, e) {
  e = fr(e), e[0] -= n, Io(e);
  var t = fh(-e[1]);
  return ((-e[2] < 0 ? -t : t) + zt - Xe) % zt;
}
function gh() {
  var n = [], e;
  return {
    point: function(t, r, o) {
      e.push([t, r, o]);
    },
    lineStart: function() {
      n.push(e = []);
    },
    lineEnd: Gr,
    rejoin: function() {
      n.length > 1 && n.push(n.pop().concat(n.shift()));
    },
    result: function() {
      var t = n;
      return n = [], e = null, t;
    }
  };
}
function Ui(n, e) {
  return je(n[0] - e[0]) < Xe && je(n[1] - e[1]) < Xe;
}
function Ni(n, e, t, r) {
  this.x = n, this.z = e, this.o = t, this.e = r, this.v = !1, this.n = this.p = null;
}
function dh(n, e, t, r, o) {
  var a = [], u = [], c, f;
  if (n.forEach(function(w) {
    if (!((k = w.length - 1) <= 0)) {
      var k, L = w[0], b = w[k], I;
      if (Ui(L, b)) {
        if (!L[2] && !b[2]) {
          for (o.lineStart(), c = 0; c < k; ++c) o.point((L = w[c])[0], L[1]);
          o.lineEnd();
          return;
        }
        b[0] += 2 * Xe;
      }
      a.push(I = new Ni(L, w, null, !0)), u.push(I.o = new Ni(L, null, I, !1)), a.push(I = new Ni(b, w, null, !1)), u.push(I.o = new Ni(b, null, I, !0));
    }
  }), !!a.length) {
    for (u.sort(e), sl(a), sl(u), c = 0, f = u.length; c < f; ++c)
      u[c].e = t = !t;
    for (var g = a[0], v, m; ; ) {
      for (var p = g, _ = !0; p.v; ) if ((p = p.n) === g) return;
      v = p.z, o.lineStart();
      do {
        if (p.v = p.o.v = !0, p.e) {
          if (_)
            for (c = 0, f = v.length; c < f; ++c) o.point((m = v[c])[0], m[1]);
          else
            r(p.x, p.n.x, 1, o);
          p = p.n;
        } else {
          if (_)
            for (v = p.p.z, c = v.length - 1; c >= 0; --c) o.point((m = v[c])[0], m[1]);
          else
            r(p.x, p.p.x, -1, o);
          p = p.p;
        }
        p = p.o, v = p.z, _ = !_;
      } while (!p.v);
      o.lineEnd();
    }
  }
}
function sl(n) {
  if (e = n.length) {
    for (var e, t = 0, r = n[0], o; ++t < e; )
      r.n = o = n[t], o.p = r, r = o;
    r.n = o = n[0], o.p = r;
  }
}
function ao(n) {
  return je(n[0]) <= Ae ? n[0] : wv(n[0]) * ((je(n[0]) + Ae) % zt - Ae);
}
function kv(n, e) {
  var t = ao(e), r = e[1], o = Ve(r), a = [Ve(t), -$e(t), 0], u = 0, c = 0, f = new yv();
  o === 1 ? r = Ot + Xe : o === -1 && (r = -Ot - Xe);
  for (var g = 0, v = n.length; g < v; ++g)
    if (p = (m = n[g]).length)
      for (var m, p, _ = m[p - 1], w = ao(_), k = _[1] / 2 + Ju, L = Ve(k), b = $e(k), I = 0; I < p; ++I, w = A, L = Y, b = V, _ = N) {
        var N = m[I], A = ao(N), O = N[1] / 2 + Ju, Y = Ve(O), V = $e(O), C = A - w, M = C >= 0 ? 1 : -1, T = M * C, D = T > Ae, B = L * Y;
        if (f.add(cr(B * M * Ve(T), b * V + B * $e(T))), u += D ? C + M * zt : C, D ^ w >= t ^ A >= t) {
          var q = ji(fr(_), fr(N));
          Io(q);
          var X = ji(a, q);
          Io(X);
          var R = (D ^ C >= 0 ? -1 : 1) * hr(X[2]);
          (r > R || r === R && (q[0] || q[1])) && (c += D ^ C >= 0 ? 1 : -1);
        }
      }
  return (u < -Xe || u < Xe && f < -1e-12) ^ c & 1;
}
function mh(n, e, t, r) {
  return function(o) {
    var a = e(o), u = gh(), c = e(u), f = !1, g, v, m, p = {
      point: _,
      lineStart: k,
      lineEnd: L,
      polygonStart: function() {
        p.point = b, p.lineStart = I, p.lineEnd = N, v = [], g = [];
      },
      polygonEnd: function() {
        p.point = _, p.lineStart = k, p.lineEnd = L, v = hh(v);
        var A = kv(g, r);
        v.length ? (f || (o.polygonStart(), f = !0), dh(v, Sv, A, t, o)) : A && (f || (o.polygonStart(), f = !0), o.lineStart(), t(null, null, 1, o), o.lineEnd()), f && (o.polygonEnd(), f = !1), v = g = null;
      },
      sphere: function() {
        o.polygonStart(), o.lineStart(), t(null, null, 1, o), o.lineEnd(), o.polygonEnd();
      }
    };
    function _(A, O) {
      n(A, O) && o.point(A, O);
    }
    function w(A, O) {
      a.point(A, O);
    }
    function k() {
      p.point = w, a.lineStart();
    }
    function L() {
      p.point = _, a.lineEnd();
    }
    function b(A, O) {
      m.push([A, O]), c.point(A, O);
    }
    function I() {
      c.lineStart(), m = [];
    }
    function N() {
      b(m[0][0], m[0][1]), c.lineEnd();
      var A = c.clean(), O = u.result(), Y, V = O.length, C, M, T;
      if (m.pop(), g.push(m), m = null, !!V) {
        if (A & 1) {
          if (M = O[0], (C = M.length - 1) > 0) {
            for (f || (o.polygonStart(), f = !0), o.lineStart(), Y = 0; Y < C; ++Y) o.point((T = M[Y])[0], T[1]);
            o.lineEnd();
          }
          return;
        }
        V > 1 && A & 2 && O.push(O.pop().concat(O.shift())), v.push(O.filter(Iv));
      }
    }
    return p;
  };
}
function Iv(n) {
  return n.length > 1;
}
function Sv(n, e) {
  return ((n = n.x)[0] < 0 ? n[1] - Ot - Xe : Ot - n[1]) - ((e = e.x)[0] < 0 ? e[1] - Ot - Xe : Ot - e[1]);
}
const ol = mh(
  function() {
    return !0;
  },
  bv,
  Lv,
  [-Ae, -Ot]
);
function bv(n) {
  var e = NaN, t = NaN, r = NaN, o;
  return {
    lineStart: function() {
      n.lineStart(), o = 1;
    },
    point: function(a, u) {
      var c = a > 0 ? Ae : -Ae, f = je(a - e);
      je(f - Ae) < Xe ? (n.point(e, t = (t + u) / 2 > 0 ? Ot : -Ot), n.point(r, t), n.lineEnd(), n.lineStart(), n.point(c, t), n.point(a, t), o = 0) : r !== c && f >= Ae && (je(e - r) < Xe && (e -= r * Xe), je(a - c) < Xe && (a -= c * Xe), t = Mv(e, t, a, u), n.point(r, t), n.lineEnd(), n.lineStart(), n.point(c, t), o = 0), n.point(e = a, t = u), r = c;
    },
    lineEnd: function() {
      n.lineEnd(), e = t = NaN;
    },
    clean: function() {
      return 2 - o;
    }
  };
}
function Mv(n, e, t, r) {
  var o, a, u = Ve(n - t);
  return je(u) > Xe ? _v((Ve(e) * (a = $e(r)) * Ve(t) - Ve(r) * (o = $e(e)) * Ve(n)) / (o * a * u)) : (e + r) / 2;
}
function Lv(n, e, t, r) {
  var o;
  if (n == null)
    o = t * Ot, r.point(-Ae, o), r.point(0, o), r.point(Ae, o), r.point(Ae, 0), r.point(Ae, -o), r.point(0, -o), r.point(-Ae, -o), r.point(-Ae, 0), r.point(-Ae, o);
  else if (je(n[0] - e[0]) > Xe) {
    var a = n[0] < e[0] ? Ae : -Ae;
    o = t * a / 2, r.point(-a, o), r.point(0, o), r.point(a, o);
  } else
    r.point(e[0], e[1]);
}
function Pv(n) {
  var e = $e(n), t = 6 * It, r = e > 0, o = je(e) > Xe;
  function a(v, m, p, _) {
    Cv(_, n, t, p, v, m);
  }
  function u(v, m) {
    return $e(v) * $e(m) > e;
  }
  function c(v) {
    var m, p, _, w, k;
    return {
      lineStart: function() {
        w = _ = !1, k = 1;
      },
      point: function(L, b) {
        var I = [L, b], N, A = u(L, b), O = r ? A ? 0 : g(L, b) : A ? g(L + (L < 0 ? Ae : -Ae), b) : 0;
        if (!m && (w = _ = A) && v.lineStart(), A !== _ && (N = f(m, I), (!N || Ui(m, N) || Ui(I, N)) && (I[2] = 1)), A !== _)
          k = 0, A ? (v.lineStart(), N = f(I, m), v.point(N[0], N[1])) : (N = f(m, I), v.point(N[0], N[1], 2), v.lineEnd()), m = N;
        else if (o && m && r ^ A) {
          var Y;
          !(O & p) && (Y = f(I, m, !0)) && (k = 0, r ? (v.lineStart(), v.point(Y[0][0], Y[0][1]), v.point(Y[1][0], Y[1][1]), v.lineEnd()) : (v.point(Y[1][0], Y[1][1]), v.lineEnd(), v.lineStart(), v.point(Y[0][0], Y[0][1], 3)));
        }
        A && (!m || !Ui(m, I)) && v.point(I[0], I[1]), m = I, _ = A, p = O;
      },
      lineEnd: function() {
        _ && v.lineEnd(), m = null;
      },
      // Rejoin first and last segments if there were intersections and the first
      // and last points were visible.
      clean: function() {
        return k | (w && _) << 1;
      }
    };
  }
  function f(v, m, p) {
    var _ = fr(v), w = fr(m), k = [1, 0, 0], L = ji(_, w), b = Li(L, L), I = L[0], N = b - I * I;
    if (!N) return !p && v;
    var A = e * b / N, O = -e * I / N, Y = ji(k, L), V = Pi(k, A), C = Pi(L, O);
    oo(V, C);
    var M = Y, T = Li(V, M), D = Li(M, M), B = T * T - D * (Li(V, V) - 1);
    if (!(B < 0)) {
      var q = hi(B), X = Pi(M, (-T - q) / D);
      if (oo(X, V), X = ko(X), !p) return X;
      var R = v[0], U = m[0], G = v[1], H = m[1], J;
      U < R && (J = R, R = U, U = J);
      var W = U - R, j = je(W - Ae) < Xe, Q = j || W < Xe;
      if (!j && H < G && (J = G, G = H, H = J), Q ? j ? G + H > 0 ^ X[1] < (je(X[0] - R) < Xe ? G : H) : G <= X[1] && X[1] <= H : W > Ae ^ (R <= X[0] && X[0] <= U)) {
        var re = Pi(M, (-T + q) / D);
        return oo(re, V), [X, ko(re)];
      }
    }
  }
  function g(v, m) {
    var p = r ? n : Ae - n, _ = 0;
    return v < -p ? _ |= 1 : v > p && (_ |= 2), m < -p ? _ |= 4 : m > p && (_ |= 8), _;
  }
  return mh(u, c, a, r ? [0, -n] : [-Ae, n - Ae]);
}
function Nv(n, e, t, r, o, a) {
  var u = n[0], c = n[1], f = e[0], g = e[1], v = 0, m = 1, p = f - u, _ = g - c, w;
  if (w = t - u, !(!p && w > 0)) {
    if (w /= p, p < 0) {
      if (w < v) return;
      w < m && (m = w);
    } else if (p > 0) {
      if (w > m) return;
      w > v && (v = w);
    }
    if (w = o - u, !(!p && w < 0)) {
      if (w /= p, p < 0) {
        if (w > m) return;
        w > v && (v = w);
      } else if (p > 0) {
        if (w < v) return;
        w < m && (m = w);
      }
      if (w = r - c, !(!_ && w > 0)) {
        if (w /= _, _ < 0) {
          if (w < v) return;
          w < m && (m = w);
        } else if (_ > 0) {
          if (w > m) return;
          w > v && (v = w);
        }
        if (w = a - c, !(!_ && w < 0)) {
          if (w /= _, _ < 0) {
            if (w > m) return;
            w > v && (v = w);
          } else if (_ > 0) {
            if (w < v) return;
            w < m && (m = w);
          }
          return v > 0 && (n[0] = u + v * p, n[1] = c + v * _), m < 1 && (e[0] = u + m * p, e[1] = c + m * _), !0;
        }
      }
    }
  }
}
var qr = 1e9, Ti = -qr;
function Tv(n, e, t, r) {
  function o(g, v) {
    return n <= g && g <= t && e <= v && v <= r;
  }
  function a(g, v, m, p) {
    var _ = 0, w = 0;
    if (g == null || (_ = u(g, m)) !== (w = u(v, m)) || f(g, v) < 0 ^ m > 0)
      do
        p.point(_ === 0 || _ === 3 ? n : t, _ > 1 ? r : e);
      while ((_ = (_ + m + 4) % 4) !== w);
    else
      p.point(v[0], v[1]);
  }
  function u(g, v) {
    return je(g[0] - n) < Xe ? v > 0 ? 0 : 3 : je(g[0] - t) < Xe ? v > 0 ? 2 : 1 : je(g[1] - e) < Xe ? v > 0 ? 1 : 0 : v > 0 ? 3 : 2;
  }
  function c(g, v) {
    return f(g.x, v.x);
  }
  function f(g, v) {
    var m = u(g, 1), p = u(v, 1);
    return m !== p ? m - p : m === 0 ? v[1] - g[1] : m === 1 ? g[0] - v[0] : m === 2 ? g[1] - v[1] : v[0] - g[0];
  }
  return function(g) {
    var v = g, m = gh(), p, _, w, k, L, b, I, N, A, O, Y, V = {
      point: C,
      lineStart: B,
      lineEnd: q,
      polygonStart: T,
      polygonEnd: D
    };
    function C(R, U) {
      o(R, U) && v.point(R, U);
    }
    function M() {
      for (var R = 0, U = 0, G = _.length; U < G; ++U)
        for (var H = _[U], J = 1, W = H.length, j = H[0], Q, re, ee = j[0], te = j[1]; J < W; ++J)
          Q = ee, re = te, j = H[J], ee = j[0], te = j[1], re <= r ? te > r && (ee - Q) * (r - re) > (te - re) * (n - Q) && ++R : te <= r && (ee - Q) * (r - re) < (te - re) * (n - Q) && --R;
      return R;
    }
    function T() {
      v = m, p = [], _ = [], Y = !0;
    }
    function D() {
      var R = M(), U = Y && R, G = (p = hh(p)).length;
      (U || G) && (g.polygonStart(), U && (g.lineStart(), a(null, null, 1, g), g.lineEnd()), G && dh(p, c, R, a, g), g.polygonEnd()), v = g, p = _ = w = null;
    }
    function B() {
      V.point = X, _ && _.push(w = []), O = !0, A = !1, I = N = NaN;
    }
    function q() {
      p && (X(k, L), b && A && m.rejoin(), p.push(m.result())), V.point = C, A && v.lineEnd();
    }
    function X(R, U) {
      var G = o(R, U);
      if (_ && w.push([R, U]), O)
        k = R, L = U, b = G, O = !1, G && (v.lineStart(), v.point(R, U));
      else if (G && A) v.point(R, U);
      else {
        var H = [I = Math.max(Ti, Math.min(qr, I)), N = Math.max(Ti, Math.min(qr, N))], J = [R = Math.max(Ti, Math.min(qr, R)), U = Math.max(Ti, Math.min(qr, U))];
        Nv(H, J, n, e, t, r) ? (A || (v.lineStart(), v.point(H[0], H[1])), v.point(J[0], J[1]), G || v.lineEnd(), Y = !1) : G && (v.lineStart(), v.point(R, U), Y = !1);
      }
      I = R, N = U, A = G;
    }
    return V;
  };
}
const al = (n) => n;
var gr = 1 / 0, es = gr, Kr = -gr, ts = Kr, ul = {
  point: Rv,
  lineStart: Gr,
  lineEnd: Gr,
  polygonStart: Gr,
  polygonEnd: Gr,
  result: function() {
    var n = [[gr, es], [Kr, ts]];
    return Kr = ts = -(es = gr = 1 / 0), n;
  }
};
function Rv(n, e) {
  n < gr && (gr = n), n > Kr && (Kr = n), e < es && (es = e), e > ts && (ts = e);
}
function la(n) {
  return function(e) {
    var t = new Mo();
    for (var r in n) t[r] = n[r];
    return t.stream = e, t;
  };
}
function Mo() {
}
Mo.prototype = {
  constructor: Mo,
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
function ca(n, e, t) {
  var r = n.clipExtent && n.clipExtent();
  return n.scale(150).translate([0, 0]), r != null && n.clipExtent(null), xv(t, n.stream(ul)), e(ul.result()), r != null && n.clipExtent(r), n;
}
function vh(n, e, t) {
  return ca(n, function(r) {
    var o = e[1][0] - e[0][0], a = e[1][1] - e[0][1], u = Math.min(o / (r[1][0] - r[0][0]), a / (r[1][1] - r[0][1])), c = +e[0][0] + (o - u * (r[1][0] + r[0][0])) / 2, f = +e[0][1] + (a - u * (r[1][1] + r[0][1])) / 2;
    n.scale(150 * u).translate([c, f]);
  }, t);
}
function Av(n, e, t) {
  return vh(n, [[0, 0], e], t);
}
function Ov(n, e, t) {
  return ca(n, function(r) {
    var o = +e, a = o / (r[1][0] - r[0][0]), u = (o - a * (r[1][0] + r[0][0])) / 2, c = -a * r[0][1];
    n.scale(150 * a).translate([u, c]);
  }, t);
}
function Dv(n, e, t) {
  return ca(n, function(r) {
    var o = +e, a = o / (r[1][1] - r[0][1]), u = -a * r[0][0], c = (o - a * (r[1][1] + r[0][1])) / 2;
    n.scale(150 * a).translate([u, c]);
  }, t);
}
var ll = 16, Fv = $e(30 * It);
function cl(n, e) {
  return +e ? Gv(n, e) : Bv(n);
}
function Bv(n) {
  return la({
    point: function(e, t) {
      e = n(e, t), this.stream.point(e[0], e[1]);
    }
  });
}
function Gv(n, e) {
  function t(r, o, a, u, c, f, g, v, m, p, _, w, k, L) {
    var b = g - r, I = v - o, N = b * b + I * I;
    if (N > 4 * e && k--) {
      var A = u + p, O = c + _, Y = f + w, V = hi(A * A + O * O + Y * Y), C = hr(Y /= V), M = je(je(Y) - 1) < Xe || je(a - m) < Xe ? (a + m) / 2 : cr(O, A), T = n(M, C), D = T[0], B = T[1], q = D - r, X = B - o, R = I * q - b * X;
      (R * R / N > e || je((b * q + I * X) / N - 0.5) > 0.3 || u * p + c * _ + f * w < Fv) && (t(r, o, a, u, c, f, D, B, M, A /= V, O /= V, Y, k, L), L.point(D, B), t(D, B, M, A, O, Y, g, v, m, p, _, w, k, L));
    }
  }
  return function(r) {
    var o, a, u, c, f, g, v, m, p, _, w, k, L = {
      point: b,
      lineStart: I,
      lineEnd: A,
      polygonStart: function() {
        r.polygonStart(), L.lineStart = O;
      },
      polygonEnd: function() {
        r.polygonEnd(), L.lineStart = I;
      }
    };
    function b(C, M) {
      C = n(C, M), r.point(C[0], C[1]);
    }
    function I() {
      m = NaN, L.point = N, r.lineStart();
    }
    function N(C, M) {
      var T = fr([C, M]), D = n(C, M);
      t(m, p, v, _, w, k, m = D[0], p = D[1], v = C, _ = T[0], w = T[1], k = T[2], ll, r), r.point(m, p);
    }
    function A() {
      L.point = b, r.lineEnd();
    }
    function O() {
      I(), L.point = Y, L.lineEnd = V;
    }
    function Y(C, M) {
      N(o = C, M), a = m, u = p, c = _, f = w, g = k, L.point = N;
    }
    function V() {
      t(m, p, v, _, w, k, a, u, o, c, f, g, ll, r), L.lineEnd = A, A();
    }
    return L;
  };
}
var qv = la({
  point: function(n, e) {
    this.stream.point(n * It, e * It);
  }
});
function zv(n) {
  return la({
    point: function(e, t) {
      var r = n(e, t);
      return this.stream.point(r[0], r[1]);
    }
  });
}
function Uv(n, e, t, r, o) {
  function a(u, c) {
    return u *= r, c *= o, [e + n * u, t - n * c];
  }
  return a.invert = function(u, c) {
    return [(u - e) / n * r, (t - c) / n * o];
  }, a;
}
function hl(n, e, t, r, o, a) {
  if (!a) return Uv(n, e, t, r, o);
  var u = $e(a), c = Ve(a), f = u * n, g = c * n, v = u / n, m = c / n, p = (c * t - u * e) / n, _ = (c * e + u * t) / n;
  function w(k, L) {
    return k *= r, L *= o, [f * k - g * L + e, t - g * k - f * L];
  }
  return w.invert = function(k, L) {
    return [r * (v * k - m * L + p), o * (_ - m * k - v * L)];
  }, w;
}
function Yv(n) {
  return Xv(function() {
    return n;
  })();
}
function Xv(n) {
  var e, t = 150, r = 480, o = 250, a = 0, u = 0, c = 0, f = 0, g = 0, v, m = 0, p = 1, _ = 1, w = null, k = ol, L = null, b, I, N, A = al, O = 0.5, Y, V, C, M, T;
  function D(R) {
    return C(R[0] * It, R[1] * It);
  }
  function B(R) {
    return R = C.invert(R[0], R[1]), R && [R[0] * on, R[1] * on];
  }
  D.stream = function(R) {
    return M && T === R ? M : M = qv(zv(v)(k(Y(A(T = R)))));
  }, D.preclip = function(R) {
    return arguments.length ? (k = R, w = void 0, X()) : k;
  }, D.postclip = function(R) {
    return arguments.length ? (A = R, L = b = I = N = null, X()) : A;
  }, D.clipAngle = function(R) {
    return arguments.length ? (k = +R ? Pv(w = R * It) : (w = null, ol), X()) : w * on;
  }, D.clipExtent = function(R) {
    return arguments.length ? (A = R == null ? (L = b = I = N = null, al) : Tv(L = +R[0][0], b = +R[0][1], I = +R[1][0], N = +R[1][1]), X()) : L == null ? null : [[L, b], [I, N]];
  }, D.scale = function(R) {
    return arguments.length ? (t = +R, q()) : t;
  }, D.translate = function(R) {
    return arguments.length ? (r = +R[0], o = +R[1], q()) : [r, o];
  }, D.center = function(R) {
    return arguments.length ? (a = R[0] % 360 * It, u = R[1] % 360 * It, q()) : [a * on, u * on];
  }, D.rotate = function(R) {
    return arguments.length ? (c = R[0] % 360 * It, f = R[1] % 360 * It, g = R.length > 2 ? R[2] % 360 * It : 0, q()) : [c * on, f * on, g * on];
  }, D.angle = function(R) {
    return arguments.length ? (m = R % 360 * It, q()) : m * on;
  }, D.reflectX = function(R) {
    return arguments.length ? (p = R ? -1 : 1, q()) : p < 0;
  }, D.reflectY = function(R) {
    return arguments.length ? (_ = R ? -1 : 1, q()) : _ < 0;
  }, D.precision = function(R) {
    return arguments.length ? (Y = cl(V, O = R * R), X()) : hi(O);
  }, D.fitExtent = function(R, U) {
    return vh(D, R, U);
  }, D.fitSize = function(R, U) {
    return Av(D, R, U);
  }, D.fitWidth = function(R, U) {
    return Ov(D, R, U);
  }, D.fitHeight = function(R, U) {
    return Dv(D, R, U);
  };
  function q() {
    var R = hl(t, 0, 0, p, _, m).apply(null, e(a, u)), U = hl(t, r - R[0], o - R[1], p, _, m);
    return v = Ev(c, f, g), V = So(e, U), C = So(v, V), Y = cl(V, O), X();
  }
  function X() {
    return M = T = null, D;
  }
  return function() {
    return e = n.apply(this, arguments), D.invert = e.invert && B, q();
  };
}
function Vv(n) {
  return function(e, t) {
    var r = $e(e), o = $e(t), a = n(r * o);
    return a === 1 / 0 ? [2, 0] : [
      a * o * Ve(e),
      a * Ve(t)
    ];
  };
}
function Hv(n) {
  return function(e, t) {
    var r = hi(e * e + t * t), o = n(r), a = Ve(o), u = $e(o);
    return [
      cr(e * a, r * u),
      hr(r && t * a / r)
    ];
  };
}
var yh = Vv(function(n) {
  return (n = fh(n)) && n / Ve(n);
});
yh.invert = Hv(function(n) {
  return n;
});
function Wv() {
  return Yv(yh).scale(79.4188).clipAngle(180 - 1e-3);
}
var { BufferOp: $v, GeoJSONReader: Zv, GeoJSONWriter: Kv } = vv;
function Jv(n, e, t) {
  t = t || {};
  var r = t.units || "kilometers", o = t.steps || 8;
  if (!n) throw new Error("geojson is required");
  if (typeof t != "object") throw new Error("options must be an object");
  if (typeof o != "number") throw new Error("steps must be an number");
  if (e === void 0) throw new Error("radius is required");
  if (o <= 0) throw new Error("steps must be greater than 0");
  var a = [];
  switch (n.type) {
    case "GeometryCollection":
      return at(n, function(u) {
        var c = Yi(u, e, r, o);
        c && a.push(c);
      }), ce(a);
    case "FeatureCollection":
      return Le(n, function(u) {
        var c = Yi(u, e, r, o);
        c && Le(c, function(f) {
          f && a.push(f);
        });
      }), ce(a);
  }
  return Yi(n, e, r, o);
}
function Yi(n, e, t, r) {
  var o = n.properties || {}, a = n.type === "Feature" ? n.geometry : n;
  if (a.type === "GeometryCollection") {
    var u = [];
    return at(n, function(k) {
      var L = Yi(k, e, t, r);
      L && u.push(L);
    }), ce(u);
  }
  var c = Qv(a), f = {
    type: a.type,
    coordinates: _h(a.coordinates, c)
  }, g = new Zv(), v = g.read(f), m = ii(mr(e, t), "meters"), p = $v.bufferOp(v, m, r), _ = new Kv();
  if (p = _.write(p), !ph(p.coordinates)) {
    var w = {
      type: p.type,
      coordinates: wh(p.coordinates, c)
    };
    return Je(w, o);
  }
}
function ph(n) {
  return Array.isArray(n[0]) ? ph(n[0]) : isNaN(n[0]);
}
function _h(n, e) {
  return typeof n[0] != "object" ? e(n) : n.map(function(t) {
    return _h(t, e);
  });
}
function wh(n, e) {
  return typeof n[0] != "object" ? e.invert(n) : n.map(function(t) {
    return wh(t, e);
  });
}
function Qv(n) {
  var e = ms(n).geometry.coordinates, t = [-e[0], -e[1]];
  return Wv().rotate(t).scale(Be);
}
function ha(n, e = {}) {
  let t = 0, r = 0, o = 0;
  return at(n, function(a, u, c) {
    let f = e.weight ? c == null ? void 0 : c[e.weight] : void 0;
    if (f = f ?? 1, !et(f))
      throw new Error(
        "weight value must be a number for feature index " + u
      );
    f = Number(f), f > 0 && He(a, function(g) {
      t += g[0] * f, r += g[1] * f, o += f;
    });
  }), de([t / o, r / o], e.properties, e);
}
function Dt(n, e = {}) {
  let t = 0, r = 0, o = 0;
  return He(
    n,
    function(a) {
      t += a[0], r += a[1], o++;
    },
    !0
  ), de([t / o, r / o], e.properties);
}
function jv(n, e = {}) {
  if (e = e || {}, !Oe(e)) throw new Error("options is invalid");
  var t = e.counter || 10;
  if (!et(t)) throw new Error("counter must be a number");
  var r = e.weight, o = ha(n, { weight: e.weight }), a = ce([]);
  Le(n, function(c) {
    var f;
    a.features.push(
      Dt(c, {
        properties: { weight: (f = c.properties) == null ? void 0 : f[r] }
      })
    );
  });
  const u = {
    tolerance: e.tolerance,
    medianCandidates: []
  };
  return xh(
    o.geometry.coordinates,
    [0, 0],
    a,
    u,
    t
  );
}
function xh(n, e, t, r, o) {
  var a = r.tolerance || 1e-3, u = 0, c = 0, f = 0, g = 0;
  if (Le(t, function(p) {
    var _, w = (_ = p.properties) == null ? void 0 : _.weight, k = w ?? 1;
    if (k = Number(k), !et(k)) throw new Error("weight value must be a number");
    if (k > 0) {
      g += 1;
      var L = k * qe(p, n);
      L === 0 && (L = 1);
      var b = k / L;
      u += p.geometry.coordinates[0] * b, c += p.geometry.coordinates[1] * b, f += b;
    }
  }), g < 1) throw new Error("no features to measure");
  var v = u / f, m = c / f;
  return g === 1 || o === 0 || Math.abs(v - e[0]) < a && Math.abs(m - e[1]) < a ? de([v, m], {
    medianCandidates: r.medianCandidates
  }) : (r.medianCandidates.push([v, m]), xh(
    [v, m],
    n,
    t,
    r,
    o - 1
  ));
}
var fa = { exports: {} };
const e0 = /* @__PURE__ */ ah(om), t0 = /* @__PURE__ */ ah(gm);
var vs = { exports: {} }, n0 = function(e, t, r, o) {
  var a = e[0], u = e[1], c = !1;
  r === void 0 && (r = 0), o === void 0 && (o = t.length);
  for (var f = (o - r) / 2, g = 0, v = f - 1; g < f; v = g++) {
    var m = t[r + g * 2 + 0], p = t[r + g * 2 + 1], _ = t[r + v * 2 + 0], w = t[r + v * 2 + 1], k = p > u != w > u && a < (_ - m) * (u - p) / (w - p) + m;
    k && (c = !c);
  }
  return c;
}, r0 = function(e, t, r, o) {
  var a = e[0], u = e[1], c = !1;
  r === void 0 && (r = 0), o === void 0 && (o = t.length);
  for (var f = o - r, g = 0, v = f - 1; g < f; v = g++) {
    var m = t[g + r][0], p = t[g + r][1], _ = t[v + r][0], w = t[v + r][1], k = p > u != w > u && a < (_ - m) * (u - p) / (w - p) + m;
    k && (c = !c);
  }
  return c;
}, Eh = n0, Ch = r0;
vs.exports = function(e, t, r, o) {
  return t.length > 0 && Array.isArray(t[0]) ? Ch(e, t, r, o) : Eh(e, t, r, o);
};
vs.exports.nested = Ch;
vs.exports.flat = Eh;
var i0 = vs.exports, Lo = { exports: {} };
(function(n, e) {
  (function(t, r) {
    r(e);
  })(oh, function(t) {
    const o = 33306690738754706e-32;
    function a(k, L, b, I, N) {
      let A, O, Y, V, C = L[0], M = I[0], T = 0, D = 0;
      M > C == M > -C ? (A = C, C = L[++T]) : (A = M, M = I[++D]);
      let B = 0;
      if (T < k && D < b) for (M > C == M > -C ? (Y = A - ((O = C + A) - C), C = L[++T]) : (Y = A - ((O = M + A) - M), M = I[++D]), A = O, Y !== 0 && (N[B++] = Y); T < k && D < b; ) M > C == M > -C ? (Y = A - ((O = A + C) - (V = O - A)) + (C - V), C = L[++T]) : (Y = A - ((O = A + M) - (V = O - A)) + (M - V), M = I[++D]), A = O, Y !== 0 && (N[B++] = Y);
      for (; T < k; ) Y = A - ((O = A + C) - (V = O - A)) + (C - V), C = L[++T], A = O, Y !== 0 && (N[B++] = Y);
      for (; D < b; ) Y = A - ((O = A + M) - (V = O - A)) + (M - V), M = I[++D], A = O, Y !== 0 && (N[B++] = Y);
      return A === 0 && B !== 0 || (N[B++] = A), B;
    }
    function u(k) {
      return new Float64Array(k);
    }
    const c = 33306690738754716e-32, f = 22204460492503146e-32, g = 11093356479670487e-47, v = u(4), m = u(8), p = u(12), _ = u(16), w = u(4);
    t.orient2d = function(k, L, b, I, N, A) {
      const O = (L - A) * (b - N), Y = (k - N) * (I - A), V = O - Y;
      if (O === 0 || Y === 0 || O > 0 != Y > 0) return V;
      const C = Math.abs(O + Y);
      return Math.abs(V) >= c * C ? V : -function(M, T, D, B, q, X, R) {
        let U, G, H, J, W, j, Q, re, ee, te, se, fe, Z, Fe, _e, ae, z, be;
        const Ne = M - q, Ce = D - q, pt = T - X, gt = B - X;
        W = (_e = (re = Ne - (Q = (j = 134217729 * Ne) - (j - Ne))) * (te = gt - (ee = (j = 134217729 * gt) - (j - gt))) - ((Fe = Ne * gt) - Q * ee - re * ee - Q * te)) - (se = _e - (z = (re = pt - (Q = (j = 134217729 * pt) - (j - pt))) * (te = Ce - (ee = (j = 134217729 * Ce) - (j - Ce))) - ((ae = pt * Ce) - Q * ee - re * ee - Q * te))), v[0] = _e - (se + W) + (W - z), W = (Z = Fe - ((fe = Fe + se) - (W = fe - Fe)) + (se - W)) - (se = Z - ae), v[1] = Z - (se + W) + (W - ae), W = (be = fe + se) - fe, v[2] = fe - (be - W) + (se - W), v[3] = be;
        let Ut = function(Ms, Ee) {
          let dn = Ee[0];
          for (let mn = 1; mn < Ms; mn++) dn += Ee[mn];
          return dn;
        }(4, v), ie = f * R;
        if (Ut >= ie || -Ut >= ie || (U = M - (Ne + (W = M - Ne)) + (W - q), H = D - (Ce + (W = D - Ce)) + (W - q), G = T - (pt + (W = T - pt)) + (W - X), J = B - (gt + (W = B - gt)) + (W - X), U === 0 && G === 0 && H === 0 && J === 0) || (ie = g * R + o * Math.abs(Ut), (Ut += Ne * J + gt * U - (pt * H + Ce * G)) >= ie || -Ut >= ie)) return Ut;
        W = (_e = (re = U - (Q = (j = 134217729 * U) - (j - U))) * (te = gt - (ee = (j = 134217729 * gt) - (j - gt))) - ((Fe = U * gt) - Q * ee - re * ee - Q * te)) - (se = _e - (z = (re = G - (Q = (j = 134217729 * G) - (j - G))) * (te = Ce - (ee = (j = 134217729 * Ce) - (j - Ce))) - ((ae = G * Ce) - Q * ee - re * ee - Q * te))), w[0] = _e - (se + W) + (W - z), W = (Z = Fe - ((fe = Fe + se) - (W = fe - Fe)) + (se - W)) - (se = Z - ae), w[1] = Z - (se + W) + (W - ae), W = (be = fe + se) - fe, w[2] = fe - (be - W) + (se - W), w[3] = be;
        const fi = a(4, v, 4, w, m);
        W = (_e = (re = Ne - (Q = (j = 134217729 * Ne) - (j - Ne))) * (te = J - (ee = (j = 134217729 * J) - (j - J))) - ((Fe = Ne * J) - Q * ee - re * ee - Q * te)) - (se = _e - (z = (re = pt - (Q = (j = 134217729 * pt) - (j - pt))) * (te = H - (ee = (j = 134217729 * H) - (j - H))) - ((ae = pt * H) - Q * ee - re * ee - Q * te))), w[0] = _e - (se + W) + (W - z), W = (Z = Fe - ((fe = Fe + se) - (W = fe - Fe)) + (se - W)) - (se = Z - ae), w[1] = Z - (se + W) + (W - ae), W = (be = fe + se) - fe, w[2] = fe - (be - W) + (se - W), w[3] = be;
        const gi = a(fi, m, 4, w, p);
        W = (_e = (re = U - (Q = (j = 134217729 * U) - (j - U))) * (te = J - (ee = (j = 134217729 * J) - (j - J))) - ((Fe = U * J) - Q * ee - re * ee - Q * te)) - (se = _e - (z = (re = G - (Q = (j = 134217729 * G) - (j - G))) * (te = H - (ee = (j = 134217729 * H) - (j - H))) - ((ae = G * H) - Q * ee - re * ee - Q * te))), w[0] = _e - (se + W) + (W - z), W = (Z = Fe - ((fe = Fe + se) - (W = fe - Fe)) + (se - W)) - (se = Z - ae), w[1] = Z - (se + W) + (W - ae), W = (be = fe + se) - fe, w[2] = fe - (be - W) + (se - W), w[3] = be;
        const tn = a(gi, p, 4, w, _);
        return _[tn - 1];
      }(k, L, b, I, N, A, C);
    }, t.orient2dfast = function(k, L, b, I, N, A) {
      return (L - A) * (b - N) - (k - N) * (I - A);
    }, Object.defineProperty(t, "__esModule", { value: !0 });
  });
})(Lo, Lo.exports);
var s0 = Lo.exports, fl = e0, Xi = t0, o0 = i0, a0 = s0.orient2d;
Xi.default && (Xi = Xi.default);
fa.exports = kh;
fa.exports.default = kh;
function kh(n, e, t) {
  e = Math.max(0, e === void 0 ? 2 : e), t = t || 0;
  var r = f0(n), o = new fl(16);
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
  for (var a = [], u = 0, c; u < r.length; u++) {
    var f = r[u];
    o.remove(f), c = ml(f, c), a.push(c);
  }
  var g = new fl(16);
  for (u = 0; u < a.length; u++) g.insert(uo(a[u]));
  for (var v = e * e, m = t * t; a.length; ) {
    var p = a.shift(), _ = p.p, w = p.next.p, k = lo(_, w);
    if (!(k < m)) {
      var L = k / v;
      f = u0(o, p.prev.p, _, w, p.next.next.p, L, g), f && Math.min(lo(f, _), lo(f, w)) <= L && (a.push(p), a.push(ml(f, p)), o.remove(f), g.remove(p), g.insert(uo(p)), g.insert(uo(p.next)));
    }
  }
  p = c;
  var b = [];
  do
    b.push(p.p), p = p.next;
  while (p !== c);
  return b.push(p.p), b;
}
function u0(n, e, t, r, o, a, u) {
  for (var c = new Xi([], l0), f = n.data; f; ) {
    for (var g = 0; g < f.children.length; g++) {
      var v = f.children[g], m = f.leaf ? co(v, t, r) : c0(t, r, v);
      m > a || c.push({
        node: v,
        dist: m
      });
    }
    for (; c.length && !c.peek().node.children; ) {
      var p = c.pop(), _ = p.node, w = co(_, e, t), k = co(_, r, o);
      if (p.dist < w && p.dist < k && dl(t, _, u) && dl(r, _, u)) return _;
    }
    f = c.pop(), f && (f = f.node);
  }
  return null;
}
function l0(n, e) {
  return n.dist - e.dist;
}
function c0(n, e, t) {
  if (gl(n, t) || gl(e, t)) return 0;
  var r = Ri(n[0], n[1], e[0], e[1], t.minX, t.minY, t.maxX, t.minY);
  if (r === 0) return 0;
  var o = Ri(n[0], n[1], e[0], e[1], t.minX, t.minY, t.minX, t.maxY);
  if (o === 0) return 0;
  var a = Ri(n[0], n[1], e[0], e[1], t.maxX, t.minY, t.maxX, t.maxY);
  if (a === 0) return 0;
  var u = Ri(n[0], n[1], e[0], e[1], t.minX, t.maxY, t.maxX, t.maxY);
  return u === 0 ? 0 : Math.min(r, o, a, u);
}
function gl(n, e) {
  return n[0] >= e.minX && n[0] <= e.maxX && n[1] >= e.minY && n[1] <= e.maxY;
}
function dl(n, e, t) {
  for (var r = Math.min(n[0], e[0]), o = Math.min(n[1], e[1]), a = Math.max(n[0], e[0]), u = Math.max(n[1], e[1]), c = t.search({ minX: r, minY: o, maxX: a, maxY: u }), f = 0; f < c.length; f++)
    if (h0(c[f].p, c[f].next.p, n, e)) return !1;
  return !0;
}
function er(n, e, t) {
  return a0(n[0], n[1], e[0], e[1], t[0], t[1]);
}
function h0(n, e, t, r) {
  return n !== r && e !== t && er(n, e, t) > 0 != er(n, e, r) > 0 && er(t, r, n) > 0 != er(t, r, e) > 0;
}
function uo(n) {
  var e = n.p, t = n.next.p;
  return n.minX = Math.min(e[0], t[0]), n.minY = Math.min(e[1], t[1]), n.maxX = Math.max(e[0], t[0]), n.maxY = Math.max(e[1], t[1]), n;
}
function f0(n) {
  for (var e = n[0], t = n[0], r = n[0], o = n[0], a = 0; a < n.length; a++) {
    var u = n[a];
    u[0] < e[0] && (e = u), u[0] > r[0] && (r = u), u[1] < t[1] && (t = u), u[1] > o[1] && (o = u);
  }
  var c = [e, t, r, o], f = c.slice();
  for (a = 0; a < n.length; a++)
    o0(n[a], c) || f.push(n[a]);
  return d0(f);
}
function ml(n, e) {
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
function lo(n, e) {
  var t = n[0] - e[0], r = n[1] - e[1];
  return t * t + r * r;
}
function co(n, e, t) {
  var r = e[0], o = e[1], a = t[0] - r, u = t[1] - o;
  if (a !== 0 || u !== 0) {
    var c = ((n[0] - r) * a + (n[1] - o) * u) / (a * a + u * u);
    c > 1 ? (r = t[0], o = t[1]) : c > 0 && (r += a * c, o += u * c);
  }
  return a = n[0] - r, u = n[1] - o, a * a + u * u;
}
function Ri(n, e, t, r, o, a, u, c) {
  var f = t - n, g = r - e, v = u - o, m = c - a, p = n - o, _ = e - a, w = f * f + g * g, k = f * v + g * m, L = v * v + m * m, b = f * p + g * _, I = v * p + m * _, N = w * L - k * k, A, O, Y, V, C = N, M = N;
  N === 0 ? (O = 0, C = 1, V = I, M = L) : (O = k * I - L * b, V = w * I - k * b, O < 0 ? (O = 0, V = I, M = L) : O > C && (O = C, V = I + k, M = L)), V < 0 ? (V = 0, -b < 0 ? O = 0 : -b > w ? O = C : (O = -b, C = w)) : V > M && (V = M, -b + k < 0 ? O = 0 : -b + k > w ? O = C : (O = -b + k, C = w)), A = O === 0 ? 0 : O / C, Y = V === 0 ? 0 : V / M;
  var T = (1 - A) * n + A * t, D = (1 - A) * e + A * r, B = (1 - Y) * o + Y * u, q = (1 - Y) * a + Y * c, X = B - T, R = q - D;
  return X * X + R * R;
}
function g0(n, e) {
  return n[0] === e[0] ? n[1] - e[1] : n[0] - e[0];
}
function d0(n) {
  n.sort(g0);
  for (var e = [], t = 0; t < n.length; t++) {
    for (; e.length >= 2 && er(e[e.length - 2], e[e.length - 1], n[t]) <= 0; )
      e.pop();
    e.push(n[t]);
  }
  for (var r = [], o = n.length - 1; o >= 0; o--) {
    for (; r.length >= 2 && er(r[r.length - 2], r[r.length - 1], n[o]) <= 0; )
      r.pop();
    r.push(n[o]);
  }
  return r.pop(), e.pop(), e.concat(r);
}
var m0 = fa.exports;
const v0 = /* @__PURE__ */ ci(m0);
function Ih(n, e = {}) {
  e.concavity = e.concavity || 1 / 0;
  const t = [];
  if (He(n, (o) => {
    t.push([o[0], o[1]]);
  }), !t.length)
    return null;
  const r = v0(t, e.concavity);
  return r.length > 3 ? ye([r], e.properties) : null;
}
function Sh(n, e = {}) {
  switch (xt(n)) {
    case "Point":
      return de(Me(n), e.properties);
    case "Polygon":
      var t = [];
      He(n, function(A) {
        t.push(A);
      });
      var r = Dt(n, { properties: e.properties }), o = r.geometry.coordinates, a = 0, u = 0, c = 0, f, g, v, m, p, _, w, k, L = t.map(function(A) {
        return [A[0] - o[0], A[1] - o[1]];
      });
      for (f = 0; f < t.length - 1; f++)
        g = L[f], m = g[0], _ = g[1], v = L[f + 1], p = v[0], w = v[1], k = m * w - p * _, c += k, a += (m + p) * k, u += (_ + w) * k;
      if (c === 0)
        return r;
      var b = c * 0.5, I = 1 / (6 * b);
      return de(
        [o[0] + I * a, o[1] + I * u],
        e.properties
      );
    default:
      var N = Ih(n);
      return N ? Sh(N, { properties: e.properties }) : Dt(n, { properties: e.properties });
  }
}
function ga(n, e, t = {}) {
  const r = t.steps || 64, o = t.properties ? t.properties : !Array.isArray(n) && n.type === "Feature" && n.properties ? n.properties : {}, a = [];
  for (let u = 0; u < r; u++)
    a.push(
      jt(n, e, u * -360 / r, t).geometry.coordinates
    );
  return a.push(a[0]), ye([a], o);
}
function nt(n) {
  if (!n)
    throw new Error("geojson is required");
  switch (n.type) {
    case "Feature":
      return bh(n);
    case "FeatureCollection":
      return y0(n);
    case "Point":
    case "LineString":
    case "Polygon":
    case "MultiPoint":
    case "MultiLineString":
    case "MultiPolygon":
    case "GeometryCollection":
      return da(n);
    default:
      throw new Error("unknown GeoJSON type");
  }
}
function bh(n) {
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
  }), e.properties = ys(n.properties), n.geometry == null ? e.geometry = null : e.geometry = da(n.geometry), e;
}
function ys(n) {
  const e = {};
  return n && Object.keys(n).forEach((t) => {
    const r = n[t];
    typeof r == "object" ? r === null ? e[t] = null : Array.isArray(r) ? e[t] = r.map((o) => o) : e[t] = ys(r) : e[t] = r;
  }), e;
}
function y0(n) {
  const e = { type: "FeatureCollection" };
  return Object.keys(n).forEach((t) => {
    switch (t) {
      case "type":
      case "features":
        return;
      default:
        e[t] = n[t];
    }
  }), e.features = n.features.map((t) => bh(t)), e;
}
function da(n) {
  const e = { type: n.type };
  return n.bbox && (e.bbox = n.bbox), n.type === "GeometryCollection" ? (e.geometries = n.geometries.map((t) => da(t)), e) : (e.coordinates = Mh(n.coordinates), e);
}
function Mh(n) {
  const e = n;
  return typeof e[0] != "object" ? e.slice() : e.map((t) => Mh(t));
}
function Lh(n, e) {
  if (!n) throw new Error("geojson is required");
  if (n.type !== "FeatureCollection")
    throw new Error("geojson must be a FeatureCollection");
  if (e == null)
    throw new Error("filter is required");
  var t = [];
  return Le(n, function(r) {
    ps(r.properties, e) && t.push(r);
  }), ce(t);
}
function ma(n, e, t) {
  if (!n) throw new Error("geojson is required");
  if (n.type !== "FeatureCollection")
    throw new Error("geojson must be a FeatureCollection");
  if (e == null)
    throw new Error("property is required");
  for (var r = va(n, e), o = Object.keys(r), a = 0; a < o.length; a++) {
    for (var u = o[a], c = r[u], f = [], g = 0; g < c.length; g++)
      f.push(n.features[c[g]]);
    t(ce(f), u, a);
  }
}
function Ph(n, e, t, r) {
  var o = r;
  return ma(
    n,
    e,
    function(a, u, c) {
      c === 0 && r === void 0 ? o = a : o = t(
        o,
        a,
        u,
        c
      );
    }
  ), o;
}
function va(n, e) {
  var t = {};
  return Le(n, function(r, o) {
    var a = r.properties || {};
    if (Object.prototype.hasOwnProperty.call(a, String(e))) {
      var u = a[e];
      Object.prototype.hasOwnProperty.call(t, u) ? t[u].push(o) : t[u] = [o];
    }
  }), t;
}
function ps(n, e) {
  if (n === void 0) return !1;
  var t = typeof e;
  if (t === "number" || t === "string")
    return Object.prototype.hasOwnProperty.call(n, e);
  if (Array.isArray(e)) {
    for (var r = 0; r < e.length; r++)
      if (!ps(n, e[r])) return !1;
    return !0;
  } else
    return ya(n, e);
}
function ya(n, e) {
  for (var t = Object.keys(e), r = 0; r < t.length; r++) {
    var o = t[r];
    if (n[o] !== e[o]) return !1;
  }
  return !0;
}
function Nh(n, e) {
  if (!e) return {};
  if (!e.length) return {};
  for (var t = {}, r = 0; r < e.length; r++) {
    var o = e[r];
    Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
  }
  return t;
}
const p0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyFilter: ps,
  clusterEach: ma,
  clusterReduce: Ph,
  createBins: va,
  filterProperties: Nh,
  getCluster: Lh,
  propertiesContainsFilter: ya
}, Symbol.toStringTag, { value: "Module" }));
function _0(n, e, t = {}) {
  t.mutate !== !0 && (n = nt(n));
  const r = t.minPoints || 3, o = si(e, t.units);
  var a = new vr(n.features.length), u = n.features.map((_) => !1), c = n.features.map((_) => !1), f = n.features.map((_) => !1), g = n.features.map((_) => -1);
  a.load(
    n.features.map((_, w) => {
      var [k, L] = _.geometry.coordinates;
      return {
        minX: k,
        minY: L,
        maxX: k,
        maxY: L,
        index: w
      };
    })
  );
  const v = (_) => {
    const w = n.features[_], [k, L] = w.geometry.coordinates, b = Math.max(L - o, -90), I = Math.min(L + o, 90), N = function() {
      return b < 0 && I > 0 ? o : Math.abs(b) < Math.abs(I) ? o / Math.cos(Qe(I)) : o / Math.cos(Qe(b));
    }(), A = Math.max(k - N, -360), O = Math.min(k + N, 360), Y = { minX: A, minY: b, maxX: O, maxY: I };
    return a.search(Y).filter(
      (V) => {
        const C = V.index, M = n.features[C];
        return qe(w, M, {
          units: t.units
        }) <= e;
      }
    );
  }, m = (_, w) => {
    for (var k = 0; k < w.length; k++) {
      var L = w[k];
      const b = L.index;
      if (!u[b]) {
        u[b] = !0;
        const I = v(b);
        I.length >= r && w.push(...I);
      }
      c[b] || (c[b] = !0, g[b] = _);
    }
  };
  var p = 0;
  return n.features.forEach((_, w) => {
    if (u[w]) return;
    const k = v(w);
    if (k.length >= r) {
      const L = p;
      p++, u[w] = !0, m(L, k);
    } else
      f[w] = !0;
  }), n.features.forEach((_, w) => {
    var k = n.features[w];
    k.properties || (k.properties = {}), g[w] >= 0 ? (k.properties.dbscan = f[w] ? "edge" : "core", k.properties.cluster = g[w]) : k.properties.dbscan = "noise";
  }), n;
}
var Th = {
  /**
   * Euclidean distance
   */
  eudist: function(e, t, r) {
    for (var o = e.length, a = 0, u = 0; u < o; u++) {
      var c = (e[u] || 0) - (t[u] || 0);
      a += c * c;
    }
    return r ? Math.sqrt(a) : a;
  },
  mandist: function(e, t, r) {
    for (var o = e.length, a = 0, u = 0; u < o; u++)
      a += Math.abs((e[u] || 0) - (t[u] || 0));
    return r ? Math.sqrt(a) : a;
  },
  /**
   * Unidimensional distance
   */
  dist: function(e, t, r) {
    var o = Math.abs(e - t);
    return r ? o : o * o;
  }
}, Rh = Th, w0 = Rh.eudist, x0 = Rh.dist, E0 = {
  kmrand: function(e, t) {
    for (var r = {}, o = [], a = t << 2, u = e.length, c = e[0].length > 0; o.length < t && a-- > 0; ) {
      var f = e[Math.floor(Math.random() * u)], g = c ? f.join("_") : "" + f;
      r[g] || (r[g] = !0, o.push(f));
    }
    if (o.length < t) throw new Error("Error initializating clusters");
    return o;
  },
  /**
   * K-means++ initial centroid selection
   */
  kmpp: function(e, t) {
    var r = e[0].length ? w0 : x0, o = [], a = e.length, u = e[0].length > 0, c = e[Math.floor(Math.random() * a)];
    for (u ? c.join("_") : "" + c, o.push(c); o.length < t; ) {
      for (var f = [], g = o.length, v = 0, m = [], p = 0; p < a; p++) {
        for (var _ = 1 / 0, w = 0; w < g; w++) {
          var k = r(e[p], o[w]);
          k <= _ && (_ = k);
        }
        f[p] = _;
      }
      for (var L = 0; L < a; L++)
        v += f[L];
      for (var b = 0; b < a; b++)
        m[b] = { i: b, v: e[b], pr: f[b] / v, cs: 0 };
      m.sort(function(O, Y) {
        return O.pr - Y.pr;
      }), m[0].cs = m[0].pr;
      for (var I = 1; I < a; I++)
        m[I].cs = m[I - 1].cs + m[I].pr;
      for (var N = Math.random(), A = 0; A < a - 1 && m[A++].cs < N; )
        ;
      o.push(m[A - 1].v);
    }
    return o;
  }
}, pa = Th, Ah = E0, C0 = pa.eudist;
pa.mandist;
pa.dist;
var k0 = Ah.kmrand, I0 = Ah.kmpp, vl = 1e4;
function yl(n, e, t) {
  t = t || [];
  for (var r = 0; r < n; r++)
    t[r] = e;
  return t;
}
function S0(n, e, t, r) {
  var o = [], a = [], u = [], c = [], f = !1, g = r || vl, v = n.length, m = n[0].length, p = m > 0, _ = [];
  if (t)
    t == "kmrand" ? o = k0(n, e) : t == "kmpp" ? o = I0(n, e) : o = t;
  else for (var w = {}; o.length < e; ) {
    var k = Math.floor(Math.random() * v);
    w[k] || (w[k] = !0, o.push(n[k]));
  }
  do {
    yl(e, 0, _);
    for (var L = 0; L < v; L++) {
      for (var b = 1 / 0, I = 0, N = 0; N < e; N++) {
        var c = p ? C0(n[L], o[N]) : Math.abs(n[L] - o[N]);
        c <= b && (b = c, I = N);
      }
      u[L] = I, _[I]++;
    }
    for (var A = [], a = [], O = 0; O < e; O++)
      A[O] = p ? yl(m, 0, A[O]) : 0, a[O] = o[O];
    if (p) {
      for (var Y = 0; Y < e; Y++)
        o[Y] = [];
      for (var V = 0; V < v; V++)
        for (var C = u[V], M = A[C], T = n[V], D = 0; D < m; D++)
          M[D] += T[D];
      f = !0;
      for (var B = 0; B < e; B++) {
        for (var q = o[B], X = A[B], R = a[B], U = _[B], G = 0; G < m; G++)
          q[G] = X[G] / U || 0;
        if (f) {
          for (var H = 0; H < m; H++)
            if (R[H] != q[H]) {
              f = !1;
              break;
            }
        }
      }
    } else {
      for (var J = 0; J < v; J++) {
        var W = u[J];
        A[W] += n[J];
      }
      for (var j = 0; j < e; j++)
        o[j] = A[j] / _[j] || 0;
      f = !0;
      for (var Q = 0; Q < e; Q++)
        if (a[Q] != o[Q]) {
          f = !1;
          break;
        }
    }
    f = f || --g <= 0;
  } while (!f);
  return {
    it: vl - g,
    k: e,
    idxs: u,
    centroids: o
  };
}
var b0 = S0;
const M0 = /* @__PURE__ */ ci(b0);
function L0(n, e = {}) {
  var t = n.features.length;
  e.numberOfClusters = e.numberOfClusters || Math.round(Math.sqrt(t / 2)), e.numberOfClusters > t && (e.numberOfClusters = t), e.mutate !== !0 && (n = nt(n));
  var r = $r(n), o = r.slice(0, e.numberOfClusters), a = M0(r, e.numberOfClusters, o), u = {};
  return a.centroids.forEach(function(c, f) {
    u[f] = c;
  }), Le(n, function(c, f) {
    var g = a.idxs[f];
    c.properties.cluster = g, c.properties.centroid = u[g];
  }), n;
}
function P0(n, e, t, r) {
  var o = new vr(6), a = e.features.map(function(u) {
    var c;
    return {
      minX: u.geometry.coordinates[0],
      minY: u.geometry.coordinates[1],
      maxX: u.geometry.coordinates[0],
      maxY: u.geometry.coordinates[1],
      property: (c = u.properties) == null ? void 0 : c[t]
    };
  });
  return o.load(a), n.features.forEach(function(u) {
    u.properties || (u.properties = {});
    var c = ze(u), f = o.search({
      minX: c[0],
      minY: c[1],
      maxX: c[2],
      maxY: c[3]
    }), g = [];
    f.forEach(function(v) {
      xe([v.minX, v.minY], u) && g.push(v.property);
    }), u.properties[r] = g;
  }), n;
}
function N0(n) {
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
  return Le(n, (t) => {
    var r;
    switch ((r = t.geometry) == null ? void 0 : r.type) {
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
      var r = { type: t, coordinates: e[t].coordinates }, o = { collectedProperties: e[t].properties };
      return Je(r, o);
    })
  );
}
function Oh(n, e) {
  let t = !1;
  return ce(
    A0(
      n.features.map((r) => {
        const o = {
          x: r.geometry.coordinates[0],
          y: r.geometry.coordinates[1]
        };
        return e ? o.z = r.properties[e] : r.geometry.coordinates.length === 3 && (t = !0, o.z = r.geometry.coordinates[2]), o;
      })
    ).map((r) => {
      const o = [r.a.x, r.a.y], a = [r.b.x, r.b.y], u = [r.c.x, r.c.y];
      let c = {};
      return t ? (o.push(r.a.z), a.push(r.b.z), u.push(r.c.z)) : c = {
        a: r.a.z,
        b: r.b.z,
        c: r.c.z
      }, ye([[o, a, u, o]], c);
    })
  );
}
var pl = class {
  constructor(n, e, t) {
    this.a = n, this.b = e, this.c = t;
    const r = e.x - n.x, o = e.y - n.y, a = t.x - n.x, u = t.y - n.y, c = r * (n.x + e.x) + o * (n.y + e.y), f = a * (n.x + t.x) + u * (n.y + t.y), g = 2 * (r * (t.y - e.y) - o * (t.x - e.x));
    let v, m;
    this.x = (u * c - o * f) / g, this.y = (r * f - a * c) / g, v = this.x - n.x, m = this.y - n.y, this.r = v * v + m * m;
  }
};
function T0(n, e) {
  return e.x - n.x;
}
function R0(n) {
  let e = n.length, t, r, o, a, u;
  e: for (; e; )
    for (r = n[--e], t = n[--e], o = e; o; )
      if (u = n[--o], a = n[--o], t === a && r === u || t === u && r === a) {
        n.splice(e, 2), n.splice(o, 2), e -= 2;
        continue e;
      }
}
function A0(n) {
  if (n.length < 3)
    return [];
  n.sort(T0);
  let e = n.length - 1;
  const t = n[e].x, r = n[0].x;
  let o = n[e].y, a = o;
  const u = 1e-12;
  let c, f, g, v, m, p;
  for (; e--; )
    n[e].y < o && (o = n[e].y), n[e].y > a && (a = n[e].y);
  let _ = r - t, w = a - o;
  const k = _ > w ? _ : w, L = (r + t) * 0.5, b = (a + o) * 0.5, I = [
    new pl(
      {
        __sentinel: !0,
        x: L - 20 * k,
        y: b - k
      },
      {
        __sentinel: !0,
        x: L,
        y: b + 20 * k
      },
      {
        __sentinel: !0,
        x: L + 20 * k,
        y: b - k
      }
    )
  ], N = [], A = [];
  let O;
  for (e = n.length; e--; ) {
    for (A.length = 0, O = I.length; O--; ) {
      if (_ = n[e].x - I[O].x, _ > 0 && _ * _ > I[O].r) {
        N.push(I[O]), I.splice(O, 1);
        continue;
      }
      w = n[e].y - I[O].y, !(_ * _ + w * w > I[O].r) && (A.push(
        I[O].a,
        I[O].b,
        I[O].b,
        I[O].c,
        I[O].c,
        I[O].a
      ), I.splice(O, 1));
    }
    for (R0(A), O = A.length; O; )
      f = A[--O], c = A[--O], g = n[e], v = f.x - c.x, m = f.y - c.y, p = 2 * (v * (g.y - f.y) - m * (g.x - f.x)), Math.abs(p) > u && I.push(new pl(c, f, g));
  }
  for (Array.prototype.push.apply(N, I), e = N.length; e--; )
    (N[e].a.__sentinel || N[e].b.__sentinel || N[e].c.__sentinel) && N.splice(e, 1);
  return N;
}
function O0(n) {
  return n;
}
function D0(n) {
  if (n == null) return O0;
  var e, t, r = n.scale[0], o = n.scale[1], a = n.translate[0], u = n.translate[1];
  return function(c, f) {
    f || (e = t = 0);
    var g = 2, v = c.length, m = new Array(v);
    for (m[0] = (e += c[0]) * r + a, m[1] = (t += c[1]) * o + u; g < v; ) m[g] = c[g], ++g;
    return m;
  };
}
function F0(n, e) {
  for (var t, r = n.length, o = r - e; o < --r; ) t = n[o], n[o++] = n[r], n[r] = t;
}
function Dh(n, e) {
  var t = D0(n.transform), r = n.arcs;
  function o(v, m) {
    m.length && m.pop();
    for (var p = r[v < 0 ? ~v : v], _ = 0, w = p.length; _ < w; ++_)
      m.push(t(p[_], _));
    v < 0 && F0(m, w);
  }
  function a(v) {
    return t(v);
  }
  function u(v) {
    for (var m = [], p = 0, _ = v.length; p < _; ++p) o(v[p], m);
    return m.length < 2 && m.push(m[0]), m;
  }
  function c(v) {
    for (var m = u(v); m.length < 4; ) m.push(m[0]);
    return m;
  }
  function f(v) {
    return v.map(c);
  }
  function g(v) {
    var m = v.type, p;
    switch (m) {
      case "GeometryCollection":
        return { type: m, geometries: v.geometries.map(g) };
      case "Point":
        p = a(v.coordinates);
        break;
      case "MultiPoint":
        p = v.coordinates.map(a);
        break;
      case "LineString":
        p = u(v.arcs);
        break;
      case "MultiLineString":
        p = v.arcs.map(u);
        break;
      case "Polygon":
        p = f(v.arcs);
        break;
      case "MultiPolygon":
        p = v.arcs.map(f);
        break;
      default:
        return null;
    }
    return { type: m, coordinates: p };
  }
  return g(e);
}
function B0(n, e) {
  var t = {}, r = {}, o = {}, a = [], u = -1;
  e.forEach(function(g, v) {
    var m = n.arcs[g < 0 ? ~g : g], p;
    m.length < 3 && !m[1][0] && !m[1][1] && (p = e[++u], e[u] = g, e[v] = p);
  }), e.forEach(function(g) {
    var v = c(g), m = v[0], p = v[1], _, w;
    if (_ = o[m])
      if (delete o[_.end], _.push(g), _.end = p, w = r[p]) {
        delete r[w.start];
        var k = w === _ ? _ : _.concat(w);
        r[k.start = _.start] = o[k.end = w.end] = k;
      } else
        r[_.start] = o[_.end] = _;
    else if (_ = r[p])
      if (delete r[_.start], _.unshift(g), _.start = m, w = o[m]) {
        delete o[w.end];
        var L = w === _ ? _ : w.concat(_);
        r[L.start = w.start] = o[L.end = _.end] = L;
      } else
        r[_.start] = o[_.end] = _;
    else
      _ = [g], r[_.start = m] = o[_.end = p] = _;
  });
  function c(g) {
    var v = n.arcs[g < 0 ? ~g : g], m = v[0], p;
    return n.transform ? (p = [0, 0], v.forEach(function(_) {
      p[0] += _[0], p[1] += _[1];
    })) : p = v[v.length - 1], g < 0 ? [p, m] : [m, p];
  }
  function f(g, v) {
    for (var m in g) {
      var p = g[m];
      delete v[p.start], delete p.start, delete p.end, p.forEach(function(_) {
        t[_ < 0 ? ~_ : _] = 1;
      }), a.push(p);
    }
  }
  return f(o, r), f(r, o), e.forEach(function(g) {
    t[g < 0 ? ~g : g] || a.push([g]);
  }), a;
}
function G0(n) {
  for (var e = -1, t = n.length, r, o = n[t - 1], a = 0; ++e < t; ) r = o, o = n[e], a += r[0] * o[1] - r[1] * o[0];
  return Math.abs(a);
}
function q0(n) {
  return Dh(n, z0.apply(this, arguments));
}
function z0(n, e) {
  var t = {}, r = [], o = [];
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
      g.forEach(function(v) {
        (t[v = v < 0 ? ~v : v] || (t[v] = [])).push(f);
      });
    }), r.push(f);
  }
  function c(f) {
    return G0(Dh(n, { type: "Polygon", arcs: [f] }).coordinates[0]);
  }
  return r.forEach(function(f) {
    if (!f._) {
      var g = [], v = [f];
      for (f._ = 1, o.push(g); f = v.pop(); )
        g.push(f), f.forEach(function(m) {
          m.forEach(function(p) {
            t[p < 0 ? ~p : p].forEach(function(_) {
              _._ || (_._ = 1, v.push(_));
            });
          });
        });
    }
  }), r.forEach(function(f) {
    delete f._;
  }), {
    type: "MultiPolygon",
    arcs: o.map(function(f) {
      var g = [], v;
      if (f.forEach(function(k) {
        k.forEach(function(L) {
          L.forEach(function(b) {
            t[b < 0 ? ~b : b].length < 2 && g.push(b);
          });
        });
      }), g = B0(n, g), (v = g.length) > 1)
        for (var m = 1, p = c(g[0]), _, w; m < v; ++m)
          (_ = c(g[m])) > p && (w = g[0], g[0] = g[m], g[m] = w, p = _);
      return g;
    }).filter(function(f) {
      return f.length > 0;
    })
  };
}
var _a = Object.prototype.hasOwnProperty;
function U0(n) {
  var e = 1 / 0, t = 1 / 0, r = -1 / 0, o = -1 / 0;
  function a(m) {
    m != null && _a.call(u, m.type) && u[m.type](m);
  }
  var u = {
    GeometryCollection: function(m) {
      m.geometries.forEach(a);
    },
    Point: function(m) {
      c(m.coordinates);
    },
    MultiPoint: function(m) {
      m.coordinates.forEach(c);
    },
    LineString: function(m) {
      f(m.arcs);
    },
    MultiLineString: function(m) {
      m.arcs.forEach(f);
    },
    Polygon: function(m) {
      m.arcs.forEach(f);
    },
    MultiPolygon: function(m) {
      m.arcs.forEach(g);
    }
  };
  function c(m) {
    var p = m[0], _ = m[1];
    p < e && (e = p), p > r && (r = p), _ < t && (t = _), _ > o && (o = _);
  }
  function f(m) {
    m.forEach(c);
  }
  function g(m) {
    m.forEach(f);
  }
  for (var v in n)
    a(n[v]);
  return r >= e && o >= t ? [e, t, r, o] : void 0;
}
function Y0(n, e, t, r, o) {
  arguments.length === 3 && (r = Array, o = null);
  for (var a = new r(n = 1 << Math.max(4, Math.ceil(Math.log(n) / Math.LN2))), u = n - 1, c = 0; c < n; ++c)
    a[c] = o;
  function f(m) {
    for (var p = e(m) & u, _ = a[p], w = 0; _ != o; ) {
      if (t(_, m)) return !0;
      if (++w >= n) throw new Error("full hashset");
      _ = a[p = p + 1 & u];
    }
    return a[p] = m, !0;
  }
  function g(m) {
    for (var p = e(m) & u, _ = a[p], w = 0; _ != o; ) {
      if (t(_, m)) return !0;
      if (++w >= n) break;
      _ = a[p = p + 1 & u];
    }
    return !1;
  }
  function v() {
    for (var m = [], p = 0, _ = a.length; p < _; ++p) {
      var w = a[p];
      w != o && m.push(w);
    }
    return m;
  }
  return {
    add: f,
    has: g,
    values: v
  };
}
function wa(n, e, t, r, o, a) {
  arguments.length === 3 && (r = a = Array, o = null);
  for (var u = new r(n = 1 << Math.max(4, Math.ceil(Math.log(n) / Math.LN2))), c = new a(n), f = n - 1, g = 0; g < n; ++g)
    u[g] = o;
  function v(w, k) {
    for (var L = e(w) & f, b = u[L], I = 0; b != o; ) {
      if (t(b, w)) return c[L] = k;
      if (++I >= n) throw new Error("full hashmap");
      b = u[L = L + 1 & f];
    }
    return u[L] = w, c[L] = k, k;
  }
  function m(w, k) {
    for (var L = e(w) & f, b = u[L], I = 0; b != o; ) {
      if (t(b, w)) return c[L];
      if (++I >= n) throw new Error("full hashmap");
      b = u[L = L + 1 & f];
    }
    return u[L] = w, c[L] = k, k;
  }
  function p(w, k) {
    for (var L = e(w) & f, b = u[L], I = 0; b != o; ) {
      if (t(b, w)) return c[L];
      if (++I >= n) break;
      b = u[L = L + 1 & f];
    }
    return k;
  }
  function _() {
    for (var w = [], k = 0, L = u.length; k < L; ++k) {
      var b = u[k];
      b != o && w.push(b);
    }
    return w;
  }
  return {
    set: v,
    maybeSet: m,
    // set if unset
    get: p,
    keys: _
  };
}
function Rn(n, e) {
  return n[0] === e[0] && n[1] === e[1];
}
var Fh = new ArrayBuffer(16), _l = new Float64Array(Fh), Ai = new Uint32Array(Fh);
function Po(n) {
  _l[0] = n[0], _l[1] = n[1];
  var e = Ai[0] ^ Ai[1];
  return e = e << 5 ^ e >> 7 ^ Ai[2] ^ Ai[3], e & 2147483647;
}
function X0(n) {
  var e = n.coordinates, t = n.lines, r = n.rings, o = Y(), a = new Int32Array(e.length), u = new Int32Array(e.length), c = new Int32Array(e.length), f = new Int8Array(e.length), g = 0, v, m, p, _, w;
  for (v = 0, m = e.length; v < m; ++v)
    a[v] = u[v] = c[v] = -1;
  for (v = 0, m = t.length; v < m; ++v) {
    var k = t[v], L = k[0], b = k[1];
    for (_ = o[L], w = o[++L], ++g, f[_] = 1; ++L <= b; )
      O(v, p = _, _ = w, w = o[L]);
    ++g, f[w] = 1;
  }
  for (v = 0, m = e.length; v < m; ++v)
    a[v] = -1;
  for (v = 0, m = r.length; v < m; ++v) {
    var I = r[v], N = I[0] + 1, A = I[1];
    for (p = o[A - 1], _ = o[N - 1], w = o[N], O(v, p, _, w); ++N <= A; )
      O(v, p = _, _ = w, w = o[N]);
  }
  function O(D, B, q, X) {
    if (a[q] !== D) {
      a[q] = D;
      var R = u[q];
      if (R >= 0) {
        var U = c[q];
        (R !== B || U !== X) && (R !== X || U !== B) && (++g, f[q] = 1);
      } else
        u[q] = B, c[q] = X;
    }
  }
  function Y() {
    for (var D = wa(e.length * 1.4, V, C, Int32Array, -1, Int32Array), B = new Int32Array(e.length), q = 0, X = e.length; q < X; ++q)
      B[q] = D.maybeSet(q, q);
    return B;
  }
  function V(D) {
    return Po(e[D]);
  }
  function C(D, B) {
    return Rn(e[D], e[B]);
  }
  a = u = c = null;
  var M = Y0(g * 1.4, Po, Rn), T;
  for (v = 0, m = e.length; v < m; ++v)
    f[T = o[v]] && M.add(e[T]);
  return M;
}
function V0(n) {
  var e = X0(n), t = n.coordinates, r = n.lines, o = n.rings, a, u, c;
  for (u = 0, c = r.length; u < c; ++u)
    for (var f = r[u], g = f[0], v = f[1]; ++g < v; )
      e.has(t[g]) && (a = { 0: g, 1: f[1] }, f[1] = g, f = f.next = a);
  for (u = 0, c = o.length; u < c; ++u)
    for (var m = o[u], p = m[0], _ = p, w = m[1], k = e.has(t[p]); ++_ < w; )
      e.has(t[_]) && (k ? (a = { 0: _, 1: m[1] }, m[1] = _, m = m.next = a) : (H0(t, p, w, w - _), t[w] = t[p], k = !0, _ = p));
  return n;
}
function H0(n, e, t, r) {
  ho(n, e, t), ho(n, e, e + r), ho(n, e + r, t);
}
function ho(n, e, t) {
  for (var r = e + (t-- - e >> 1), o; e < r; ++e, --t)
    o = n[e], n[e] = n[t], n[t] = o;
}
function W0(n) {
  var e = n.coordinates, t = n.lines, r, o = n.rings, a, u = t.length + o.length, c, f;
  for (delete n.lines, delete n.rings, c = 0, f = t.length; c < f; ++c)
    for (r = t[c]; r = r.next; ) ++u;
  for (c = 0, f = o.length; c < f; ++c)
    for (a = o[c]; a = a.next; ) ++u;
  var g = wa(u * 2 * 1.4, Po, Rn), v = n.arcs = [];
  for (c = 0, f = t.length; c < f; ++c) {
    r = t[c];
    do
      m(r);
    while (r = r.next);
  }
  for (c = 0, f = o.length; c < f; ++c)
    if (a = o[c], a.next)
      do
        m(a);
      while (a = a.next);
    else
      p(a);
  function m(I) {
    var N, A, O, Y, V, C, M, T;
    if (O = g.get(N = e[I[0]])) {
      for (M = 0, T = O.length; M < T; ++M)
        if (Y = O[M], _(Y, I)) {
          I[0] = Y[0], I[1] = Y[1];
          return;
        }
    }
    if (V = g.get(A = e[I[1]])) {
      for (M = 0, T = V.length; M < T; ++M)
        if (C = V[M], w(C, I)) {
          I[1] = C[0], I[0] = C[1];
          return;
        }
    }
    O ? O.push(I) : g.set(N, [I]), V ? V.push(I) : g.set(A, [I]), v.push(I);
  }
  function p(I) {
    var N, A, O, Y, V;
    if (A = g.get(N = e[I[0]]))
      for (Y = 0, V = A.length; Y < V; ++Y) {
        if (O = A[Y], k(O, I)) {
          I[0] = O[0], I[1] = O[1];
          return;
        }
        if (L(O, I)) {
          I[0] = O[1], I[1] = O[0];
          return;
        }
      }
    if (A = g.get(N = e[I[0] + b(I)]))
      for (Y = 0, V = A.length; Y < V; ++Y) {
        if (O = A[Y], k(O, I)) {
          I[0] = O[0], I[1] = O[1];
          return;
        }
        if (L(O, I)) {
          I[0] = O[1], I[1] = O[0];
          return;
        }
      }
    A ? A.push(I) : g.set(N, [I]), v.push(I);
  }
  function _(I, N) {
    var A = I[0], O = N[0], Y = I[1], V = N[1];
    if (A - Y !== O - V) return !1;
    for (; A <= Y; ++A, ++O) if (!Rn(e[A], e[O])) return !1;
    return !0;
  }
  function w(I, N) {
    var A = I[0], O = N[0], Y = I[1], V = N[1];
    if (A - Y !== O - V) return !1;
    for (; A <= Y; ++A, --V) if (!Rn(e[A], e[V])) return !1;
    return !0;
  }
  function k(I, N) {
    var A = I[0], O = N[0], Y = I[1], V = N[1], C = Y - A;
    if (C !== V - O) return !1;
    for (var M = b(I), T = b(N), D = 0; D < C; ++D)
      if (!Rn(e[A + (D + M) % C], e[O + (D + T) % C])) return !1;
    return !0;
  }
  function L(I, N) {
    var A = I[0], O = N[0], Y = I[1], V = N[1], C = Y - A;
    if (C !== V - O) return !1;
    for (var M = b(I), T = C - b(N), D = 0; D < C; ++D)
      if (!Rn(e[A + (D + M) % C], e[V - (D + T) % C])) return !1;
    return !0;
  }
  function b(I) {
    for (var N = I[0], A = I[1], O = N, Y = O, V = e[O]; ++O < A; ) {
      var C = e[O];
      (C[0] < V[0] || C[0] === V[0] && C[1] < V[1]) && (Y = O, V = C);
    }
    return Y - N;
  }
  return n;
}
function $0(n) {
  var e = -1, t = [], r = [], o = [];
  function a(m) {
    m && _a.call(u, m.type) && u[m.type](m);
  }
  var u = {
    GeometryCollection: function(m) {
      m.geometries.forEach(a);
    },
    LineString: function(m) {
      m.arcs = c(m.arcs);
    },
    MultiLineString: function(m) {
      m.arcs = m.arcs.map(c);
    },
    Polygon: function(m) {
      m.arcs = m.arcs.map(f);
    },
    MultiPolygon: function(m) {
      m.arcs = m.arcs.map(g);
    }
  };
  function c(m) {
    for (var p = 0, _ = m.length; p < _; ++p) o[++e] = m[p];
    var w = { 0: e - _ + 1, 1: e };
    return t.push(w), w;
  }
  function f(m) {
    for (var p = 0, _ = m.length; p < _; ++p) o[++e] = m[p];
    var w = { 0: e - _ + 1, 1: e };
    return r.push(w), w;
  }
  function g(m) {
    return m.map(f);
  }
  for (var v in n)
    a(n[v]);
  return {
    type: "Topology",
    coordinates: o,
    lines: t,
    rings: r,
    objects: n
  };
}
function Z0(n) {
  var e = {}, t;
  for (t in n) e[t] = K0(n[t]);
  return e;
}
function K0(n) {
  return n == null ? { type: null } : (n.type === "FeatureCollection" ? J0 : n.type === "Feature" ? Bh : xa)(n);
}
function J0(n) {
  var e = { type: "GeometryCollection", geometries: n.features.map(Bh) };
  return n.bbox != null && (e.bbox = n.bbox), e;
}
function Bh(n) {
  var e = xa(n.geometry), t;
  n.id != null && (e.id = n.id), n.bbox != null && (e.bbox = n.bbox);
  for (t in n.properties) {
    e.properties = n.properties;
    break;
  }
  return e;
}
function xa(n) {
  if (n == null) return { type: null };
  var e = n.type === "GeometryCollection" ? { type: "GeometryCollection", geometries: n.geometries.map(xa) } : n.type === "Point" || n.type === "MultiPoint" ? { type: n.type, coordinates: n.coordinates } : { type: n.type, arcs: n.coordinates };
  return n.bbox != null && (e.bbox = n.bbox), e;
}
function Q0(n, e) {
  var t = U0(n = Z0(n)), r = W0(V0($0(n))), o = r.coordinates, a = wa(r.arcs.length * 1.4, j0, ey);
  n = r.objects, r.bbox = t, r.arcs = r.arcs.map(function(m, p) {
    return a.set(m, p), o.slice(m[0], m[1] + 1);
  }), delete r.coordinates, o = null;
  function u(m) {
    m && _a.call(c, m.type) && c[m.type](m);
  }
  var c = {
    GeometryCollection: function(m) {
      m.geometries.forEach(u);
    },
    LineString: function(m) {
      m.arcs = f(m.arcs);
    },
    MultiLineString: function(m) {
      m.arcs = m.arcs.map(f);
    },
    Polygon: function(m) {
      m.arcs = m.arcs.map(f);
    },
    MultiPolygon: function(m) {
      m.arcs = m.arcs.map(g);
    }
  };
  function f(m) {
    var p = [];
    do {
      var _ = a.get(m);
      p.push(m[0] < m[1] ? _ : ~_);
    } while (m = m.next);
    return p;
  }
  function g(m) {
    return m.map(f);
  }
  for (var v in n)
    u(n[v]);
  return r;
}
function j0(n) {
  var e = n[0], t = n[1], r;
  return t < e && (r = e, e = t, t = r), e + 31 * t;
}
function ey(n, e) {
  var t = n[0], r = n[1], o = e[0], a = e[1], u;
  return r < t && (u = t, t = r, r = u), a < o && (u = o, o = a, a = u), t === o && r === a;
}
function ty(n, e = {}) {
  if (e = e || {}, !Oe(e))
    throw new Error("options is invalid");
  const t = e.mutate;
  if (xt(n) !== "FeatureCollection")
    throw new Error("geojson must be a FeatureCollection");
  if (!n.features.length)
    throw new Error("geojson is empty");
  (t === !1 || t === void 0) && (n = nt(n));
  const r = [], o = na(
    n,
    (a, u) => {
      const c = ny(a, u);
      return c || (r.push(a), u);
    }
  );
  return o && r.push(o), r.length ? r.length === 1 ? r[0] : xn(
    r.map((a) => a.coordinates)
  ) : null;
}
function Oi(n) {
  return n[0].toString() + "," + n[1].toString();
}
function ny(n, e) {
  const t = n.geometry.coordinates, r = e.geometry.coordinates, o = Oi(t[0]), a = Oi(t[t.length - 1]), u = Oi(r[0]), c = Oi(r[r.length - 1]);
  let f;
  if (o === c)
    f = r.concat(t.slice(1));
  else if (u === a)
    f = t.concat(r.slice(1));
  else if (o === u)
    f = t.slice(1).reverse().concat(r);
  else if (a === c)
    f = t.concat(r.reverse().slice(1));
  else
    return null;
  return Se(f);
}
function ry(n, e = {}) {
  if (xt(n) !== "FeatureCollection")
    throw new Error("geojson must be a FeatureCollection");
  if (!n.features.length)
    throw new Error("geojson is empty");
  (e.mutate === !1 || e.mutate === void 0) && (n = nt(n));
  const t = [];
  it(n, (a) => {
    t.push(a.geometry);
  });
  const r = Q0({ geoms: $o(t).geometry });
  return q0(r, r.objects.geoms.geometries);
}
function iy(n, e = {}) {
  if (e = e || {}, !Oe(e))
    throw new Error("options is invalid");
  const t = e.mutate;
  if (xt(n) !== "FeatureCollection")
    throw new Error("geojson must be a FeatureCollection");
  if (!n.features.length)
    throw new Error("geojson is empty");
  (t === !1 || t === void 0) && (n = nt(n));
  const r = sy(n);
  if (!r)
    throw new Error("geojson must be homogenous");
  const o = n;
  switch (r) {
    case "LineString":
      return ty(o, e);
    case "Polygon":
      return ry(o, e);
    default:
      throw new Error(r + " is not supported");
  }
}
function sy(n) {
  const e = {};
  it(n, (r) => {
    e[r.geometry.type] = !0;
  });
  const t = Object.keys(e);
  return t.length === 1 ? t[0] : null;
}
function oy(n, e = {}) {
  const t = e.maxEdge || 1 / 0, r = ay(n), o = Oh(r);
  if (o.features = o.features.filter((u) => {
    const c = u.geometry.coordinates[0][0], f = u.geometry.coordinates[0][1], g = u.geometry.coordinates[0][2], v = qe(c, f, e), m = qe(f, g, e), p = qe(c, g, e);
    return v <= t && m <= t && p <= t;
  }), o.features.length < 1)
    return null;
  const a = iy(o);
  return a.coordinates.length === 1 && (a.coordinates = a.coordinates[0], a.type = "Polygon"), Je(a);
}
function ay(n) {
  const e = [], t = {};
  return Le(n, (r) => {
    if (!r.geometry)
      return;
    const o = r.geometry.coordinates.join("-");
    Object.prototype.hasOwnProperty.call(t, o) || (e.push(r), t[o] = !0);
  }), ce(e);
}
var uy = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, fo = Math.ceil, Rt = Math.floor, _t = "[BigNumber Error] ", wl = _t + "Number primitive has more than 15 significant digits: ", qt = 1e14, ke = 14, go = 9007199254740991, mo = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], yn = 1e7, rt = 1e9;
function Gh(n) {
  var e, t, r, o = I.prototype = { constructor: I, toString: null, valueOf: null }, a = new I(1), u = 20, c = 4, f = -7, g = 21, v = -1e7, m = 1e7, p = !1, _ = 1, w = 0, k = {
    prefix: "",
    groupSize: 3,
    secondaryGroupSize: 0,
    groupSeparator: ",",
    decimalSeparator: ".",
    fractionGroupSize: 0,
    fractionGroupSeparator: " ",
    // non-breaking space
    suffix: ""
  }, L = "0123456789abcdefghijklmnopqrstuvwxyz", b = !0;
  function I(C, M) {
    var T, D, B, q, X, R, U, G, H = this;
    if (!(H instanceof I)) return new I(C, M);
    if (M == null) {
      if (C && C._isBigNumber === !0) {
        H.s = C.s, !C.c || C.e > m ? H.c = H.e = null : C.e < v ? H.c = [H.e = 0] : (H.e = C.e, H.c = C.c.slice());
        return;
      }
      if ((R = typeof C == "number") && C * 0 == 0) {
        if (H.s = 1 / C < 0 ? (C = -C, -1) : 1, C === ~~C) {
          for (q = 0, X = C; X >= 10; X /= 10, q++) ;
          q > m ? H.c = H.e = null : (H.e = q, H.c = [C]);
          return;
        }
        G = String(C);
      } else {
        if (!uy.test(G = String(C))) return r(H, G, R);
        H.s = G.charCodeAt(0) == 45 ? (G = G.slice(1), -1) : 1;
      }
      (q = G.indexOf(".")) > -1 && (G = G.replace(".", "")), (X = G.search(/e/i)) > 0 ? (q < 0 && (q = X), q += +G.slice(X + 1), G = G.substring(0, X)) : q < 0 && (q = G.length);
    } else {
      if (Ze(M, 2, L.length, "Base"), M == 10 && b)
        return H = new I(C), Y(H, u + H.e + 1, c);
      if (G = String(C), R = typeof C == "number") {
        if (C * 0 != 0) return r(H, G, R, M);
        if (H.s = 1 / C < 0 ? (G = G.slice(1), -1) : 1, I.DEBUG && G.replace(/^0\.0*|\./, "").length > 15)
          throw Error(wl + C);
      } else
        H.s = G.charCodeAt(0) === 45 ? (G = G.slice(1), -1) : 1;
      for (T = L.slice(0, M), q = X = 0, U = G.length; X < U; X++)
        if (T.indexOf(D = G.charAt(X)) < 0) {
          if (D == ".") {
            if (X > q) {
              q = U;
              continue;
            }
          } else if (!B && (G == G.toUpperCase() && (G = G.toLowerCase()) || G == G.toLowerCase() && (G = G.toUpperCase()))) {
            B = !0, X = -1, q = 0;
            continue;
          }
          return r(H, String(C), R, M);
        }
      R = !1, G = t(G, M, 10, H.s), (q = G.indexOf(".")) > -1 ? G = G.replace(".", "") : q = G.length;
    }
    for (X = 0; G.charCodeAt(X) === 48; X++) ;
    for (U = G.length; G.charCodeAt(--U) === 48; ) ;
    if (G = G.slice(X, ++U)) {
      if (U -= X, R && I.DEBUG && U > 15 && (C > go || C !== Rt(C)))
        throw Error(wl + H.s * C);
      if ((q = q - X - 1) > m)
        H.c = H.e = null;
      else if (q < v)
        H.c = [H.e = 0];
      else {
        if (H.e = q, H.c = [], X = (q + 1) % ke, q < 0 && (X += ke), X < U) {
          for (X && H.c.push(+G.slice(0, X)), U -= ke; X < U; )
            H.c.push(+G.slice(X, X += ke));
          X = ke - (G = G.slice(X)).length;
        } else
          X -= U;
        for (; X--; G += "0") ;
        H.c.push(+G);
      }
    } else
      H.c = [H.e = 0];
  }
  I.clone = Gh, I.ROUND_UP = 0, I.ROUND_DOWN = 1, I.ROUND_CEIL = 2, I.ROUND_FLOOR = 3, I.ROUND_HALF_UP = 4, I.ROUND_HALF_DOWN = 5, I.ROUND_HALF_EVEN = 6, I.ROUND_HALF_CEIL = 7, I.ROUND_HALF_FLOOR = 8, I.EUCLID = 9, I.config = I.set = function(C) {
    var M, T;
    if (C != null)
      if (typeof C == "object") {
        if (C.hasOwnProperty(M = "DECIMAL_PLACES") && (T = C[M], Ze(T, 0, rt, M), u = T), C.hasOwnProperty(M = "ROUNDING_MODE") && (T = C[M], Ze(T, 0, 8, M), c = T), C.hasOwnProperty(M = "EXPONENTIAL_AT") && (T = C[M], T && T.pop ? (Ze(T[0], -rt, 0, M), Ze(T[1], 0, rt, M), f = T[0], g = T[1]) : (Ze(T, -rt, rt, M), f = -(g = T < 0 ? -T : T))), C.hasOwnProperty(M = "RANGE"))
          if (T = C[M], T && T.pop)
            Ze(T[0], -rt, -1, M), Ze(T[1], 1, rt, M), v = T[0], m = T[1];
          else if (Ze(T, -rt, rt, M), T)
            v = -(m = T < 0 ? -T : T);
          else
            throw Error(_t + M + " cannot be zero: " + T);
        if (C.hasOwnProperty(M = "CRYPTO"))
          if (T = C[M], T === !!T)
            if (T)
              if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes))
                p = T;
              else
                throw p = !T, Error(_t + "crypto unavailable");
            else
              p = T;
          else
            throw Error(_t + M + " not true or false: " + T);
        if (C.hasOwnProperty(M = "MODULO_MODE") && (T = C[M], Ze(T, 0, 9, M), _ = T), C.hasOwnProperty(M = "POW_PRECISION") && (T = C[M], Ze(T, 0, rt, M), w = T), C.hasOwnProperty(M = "FORMAT"))
          if (T = C[M], typeof T == "object") k = T;
          else throw Error(_t + M + " not an object: " + T);
        if (C.hasOwnProperty(M = "ALPHABET"))
          if (T = C[M], typeof T == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(T))
            b = T.slice(0, 10) == "0123456789", L = T;
          else
            throw Error(_t + M + " invalid: " + T);
      } else
        throw Error(_t + "Object expected: " + C);
    return {
      DECIMAL_PLACES: u,
      ROUNDING_MODE: c,
      EXPONENTIAL_AT: [f, g],
      RANGE: [v, m],
      CRYPTO: p,
      MODULO_MODE: _,
      POW_PRECISION: w,
      FORMAT: k,
      ALPHABET: L
    };
  }, I.isBigNumber = function(C) {
    if (!C || C._isBigNumber !== !0) return !1;
    if (!I.DEBUG) return !0;
    var M, T, D = C.c, B = C.e, q = C.s;
    e: if ({}.toString.call(D) == "[object Array]") {
      if ((q === 1 || q === -1) && B >= -rt && B <= rt && B === Rt(B)) {
        if (D[0] === 0) {
          if (B === 0 && D.length === 1) return !0;
          break e;
        }
        if (M = (B + 1) % ke, M < 1 && (M += ke), String(D[0]).length == M) {
          for (M = 0; M < D.length; M++)
            if (T = D[M], T < 0 || T >= qt || T !== Rt(T)) break e;
          if (T !== 0) return !0;
        }
      }
    } else if (D === null && B === null && (q === null || q === 1 || q === -1))
      return !0;
    throw Error(_t + "Invalid BigNumber: " + C);
  }, I.maximum = I.max = function() {
    return A(arguments, -1);
  }, I.minimum = I.min = function() {
    return A(arguments, 1);
  }, I.random = function() {
    var C = 9007199254740992, M = Math.random() * C & 2097151 ? function() {
      return Rt(Math.random() * C);
    } : function() {
      return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
    };
    return function(T) {
      var D, B, q, X, R, U = 0, G = [], H = new I(a);
      if (T == null ? T = u : Ze(T, 0, rt), X = fo(T / ke), p)
        if (crypto.getRandomValues) {
          for (D = crypto.getRandomValues(new Uint32Array(X *= 2)); U < X; )
            R = D[U] * 131072 + (D[U + 1] >>> 11), R >= 9e15 ? (B = crypto.getRandomValues(new Uint32Array(2)), D[U] = B[0], D[U + 1] = B[1]) : (G.push(R % 1e14), U += 2);
          U = X / 2;
        } else if (crypto.randomBytes) {
          for (D = crypto.randomBytes(X *= 7); U < X; )
            R = (D[U] & 31) * 281474976710656 + D[U + 1] * 1099511627776 + D[U + 2] * 4294967296 + D[U + 3] * 16777216 + (D[U + 4] << 16) + (D[U + 5] << 8) + D[U + 6], R >= 9e15 ? crypto.randomBytes(7).copy(D, U) : (G.push(R % 1e14), U += 7);
          U = X / 7;
        } else
          throw p = !1, Error(_t + "crypto unavailable");
      if (!p)
        for (; U < X; )
          R = M(), R < 9e15 && (G[U++] = R % 1e14);
      for (X = G[--U], T %= ke, X && T && (R = mo[ke - T], G[U] = Rt(X / R) * R); G[U] === 0; G.pop(), U--) ;
      if (U < 0)
        G = [q = 0];
      else {
        for (q = -1; G[0] === 0; G.splice(0, 1), q -= ke) ;
        for (U = 1, R = G[0]; R >= 10; R /= 10, U++) ;
        U < ke && (q -= ke - U);
      }
      return H.e = q, H.c = G, H;
    };
  }(), I.sum = function() {
    for (var C = 1, M = arguments, T = new I(M[0]); C < M.length; ) T = T.plus(M[C++]);
    return T;
  }, t = /* @__PURE__ */ function() {
    var C = "0123456789";
    function M(T, D, B, q) {
      for (var X, R = [0], U, G = 0, H = T.length; G < H; ) {
        for (U = R.length; U--; R[U] *= D) ;
        for (R[0] += q.indexOf(T.charAt(G++)), X = 0; X < R.length; X++)
          R[X] > B - 1 && (R[X + 1] == null && (R[X + 1] = 0), R[X + 1] += R[X] / B | 0, R[X] %= B);
      }
      return R.reverse();
    }
    return function(T, D, B, q, X) {
      var R, U, G, H, J, W, j, Q, re = T.indexOf("."), ee = u, te = c;
      for (re >= 0 && (H = w, w = 0, T = T.replace(".", ""), Q = new I(D), W = Q.pow(T.length - re), w = H, Q.c = M(
        an(Tt(W.c), W.e, "0"),
        10,
        B,
        C
      ), Q.e = Q.c.length), j = M(T, D, B, X ? (R = L, C) : (R = C, L)), G = H = j.length; j[--H] == 0; j.pop()) ;
      if (!j[0]) return R.charAt(0);
      if (re < 0 ? --G : (W.c = j, W.e = G, W.s = q, W = e(W, Q, ee, te, B), j = W.c, J = W.r, G = W.e), U = G + ee + 1, re = j[U], H = B / 2, J = J || U < 0 || j[U + 1] != null, J = te < 4 ? (re != null || J) && (te == 0 || te == (W.s < 0 ? 3 : 2)) : re > H || re == H && (te == 4 || J || te == 6 && j[U - 1] & 1 || te == (W.s < 0 ? 8 : 7)), U < 1 || !j[0])
        T = J ? an(R.charAt(1), -ee, R.charAt(0)) : R.charAt(0);
      else {
        if (j.length = U, J)
          for (--B; ++j[--U] > B; )
            j[U] = 0, U || (++G, j = [1].concat(j));
        for (H = j.length; !j[--H]; ) ;
        for (re = 0, T = ""; re <= H; T += R.charAt(j[re++])) ;
        T = an(T, G, R.charAt(0));
      }
      return T;
    };
  }(), e = /* @__PURE__ */ function() {
    function C(D, B, q) {
      var X, R, U, G, H = 0, J = D.length, W = B % yn, j = B / yn | 0;
      for (D = D.slice(); J--; )
        U = D[J] % yn, G = D[J] / yn | 0, X = j * U + G * W, R = W * U + X % yn * yn + H, H = (R / q | 0) + (X / yn | 0) + j * G, D[J] = R % q;
      return H && (D = [H].concat(D)), D;
    }
    function M(D, B, q, X) {
      var R, U;
      if (q != X)
        U = q > X ? 1 : -1;
      else
        for (R = U = 0; R < q; R++)
          if (D[R] != B[R]) {
            U = D[R] > B[R] ? 1 : -1;
            break;
          }
      return U;
    }
    function T(D, B, q, X) {
      for (var R = 0; q--; )
        D[q] -= R, R = D[q] < B[q] ? 1 : 0, D[q] = R * X + D[q] - B[q];
      for (; !D[0] && D.length > 1; D.splice(0, 1)) ;
    }
    return function(D, B, q, X, R) {
      var U, G, H, J, W, j, Q, re, ee, te, se, fe, Z, Fe, _e, ae, z, be = D.s == B.s ? 1 : -1, Ne = D.c, Ce = B.c;
      if (!Ne || !Ne[0] || !Ce || !Ce[0])
        return new I(
          // Return NaN if either NaN, or both Infinity or 0.
          !D.s || !B.s || (Ne ? Ce && Ne[0] == Ce[0] : !Ce) ? NaN : (
            // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
            Ne && Ne[0] == 0 || !Ce ? be * 0 : be / 0
          )
        );
      for (re = new I(be), ee = re.c = [], G = D.e - B.e, be = q + G + 1, R || (R = qt, G = At(D.e / ke) - At(B.e / ke), be = be / ke | 0), H = 0; Ce[H] == (Ne[H] || 0); H++) ;
      if (Ce[H] > (Ne[H] || 0) && G--, be < 0)
        ee.push(1), J = !0;
      else {
        for (Fe = Ne.length, ae = Ce.length, H = 0, be += 2, W = Rt(R / (Ce[0] + 1)), W > 1 && (Ce = C(Ce, W, R), Ne = C(Ne, W, R), ae = Ce.length, Fe = Ne.length), Z = ae, te = Ne.slice(0, ae), se = te.length; se < ae; te[se++] = 0) ;
        z = Ce.slice(), z = [0].concat(z), _e = Ce[0], Ce[1] >= R / 2 && _e++;
        do {
          if (W = 0, U = M(Ce, te, ae, se), U < 0) {
            if (fe = te[0], ae != se && (fe = fe * R + (te[1] || 0)), W = Rt(fe / _e), W > 1)
              for (W >= R && (W = R - 1), j = C(Ce, W, R), Q = j.length, se = te.length; M(j, te, Q, se) == 1; )
                W--, T(j, ae < Q ? z : Ce, Q, R), Q = j.length, U = 1;
            else
              W == 0 && (U = W = 1), j = Ce.slice(), Q = j.length;
            if (Q < se && (j = [0].concat(j)), T(te, j, se, R), se = te.length, U == -1)
              for (; M(Ce, te, ae, se) < 1; )
                W++, T(te, ae < se ? z : Ce, se, R), se = te.length;
          } else U === 0 && (W++, te = [0]);
          ee[H++] = W, te[0] ? te[se++] = Ne[Z] || 0 : (te = [Ne[Z]], se = 1);
        } while ((Z++ < Fe || te[0] != null) && be--);
        J = te[0] != null, ee[0] || ee.splice(0, 1);
      }
      if (R == qt) {
        for (H = 1, be = ee[0]; be >= 10; be /= 10, H++) ;
        Y(re, q + (re.e = H + G * ke - 1) + 1, X, J);
      } else
        re.e = G, re.r = +J;
      return re;
    };
  }();
  function N(C, M, T, D) {
    var B, q, X, R, U;
    if (T == null ? T = c : Ze(T, 0, 8), !C.c) return C.toString();
    if (B = C.c[0], X = C.e, M == null)
      U = Tt(C.c), U = D == 1 || D == 2 && (X <= f || X >= g) ? Fi(U, X) : an(U, X, "0");
    else if (C = Y(new I(C), M, T), q = C.e, U = Tt(C.c), R = U.length, D == 1 || D == 2 && (M <= q || q <= f)) {
      for (; R < M; U += "0", R++) ;
      U = Fi(U, q);
    } else if (M -= X + (D === 2 && q > X), U = an(U, q, "0"), q + 1 > R) {
      if (--M > 0) for (U += "."; M--; U += "0") ;
    } else if (M += q - R, M > 0)
      for (q + 1 == R && (U += "."); M--; U += "0") ;
    return C.s < 0 && B ? "-" + U : U;
  }
  function A(C, M) {
    for (var T, D, B = 1, q = new I(C[0]); B < C.length; B++)
      D = new I(C[B]), (!D.s || (T = Pn(q, D)) === M || T === 0 && q.s === M) && (q = D);
    return q;
  }
  function O(C, M, T) {
    for (var D = 1, B = M.length; !M[--B]; M.pop()) ;
    for (B = M[0]; B >= 10; B /= 10, D++) ;
    return (T = D + T * ke - 1) > m ? C.c = C.e = null : T < v ? C.c = [C.e = 0] : (C.e = T, C.c = M), C;
  }
  r = /* @__PURE__ */ function() {
    var C = /^(-?)0([xbo])(?=\w[\w.]*$)/i, M = /^([^.]+)\.$/, T = /^\.([^.]+)$/, D = /^-?(Infinity|NaN)$/, B = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
    return function(q, X, R, U) {
      var G, H = R ? X : X.replace(B, "");
      if (D.test(H))
        q.s = isNaN(H) ? null : H < 0 ? -1 : 1;
      else {
        if (!R && (H = H.replace(C, function(J, W, j) {
          return G = (j = j.toLowerCase()) == "x" ? 16 : j == "b" ? 2 : 8, !U || U == G ? W : J;
        }), U && (G = U, H = H.replace(M, "$1").replace(T, "0.$1")), X != H))
          return new I(H, G);
        if (I.DEBUG)
          throw Error(_t + "Not a" + (U ? " base " + U : "") + " number: " + X);
        q.s = null;
      }
      q.c = q.e = null;
    };
  }();
  function Y(C, M, T, D) {
    var B, q, X, R, U, G, H, J = C.c, W = mo;
    if (J) {
      e: {
        for (B = 1, R = J[0]; R >= 10; R /= 10, B++) ;
        if (q = M - B, q < 0)
          q += ke, X = M, U = J[G = 0], H = Rt(U / W[B - X - 1] % 10);
        else if (G = fo((q + 1) / ke), G >= J.length)
          if (D) {
            for (; J.length <= G; J.push(0)) ;
            U = H = 0, B = 1, q %= ke, X = q - ke + 1;
          } else
            break e;
        else {
          for (U = R = J[G], B = 1; R >= 10; R /= 10, B++) ;
          q %= ke, X = q - ke + B, H = X < 0 ? 0 : Rt(U / W[B - X - 1] % 10);
        }
        if (D = D || M < 0 || // Are there any non-zero digits after the rounding digit?
        // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
        // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
        J[G + 1] != null || (X < 0 ? U : U % W[B - X - 1]), D = T < 4 ? (H || D) && (T == 0 || T == (C.s < 0 ? 3 : 2)) : H > 5 || H == 5 && (T == 4 || D || T == 6 && // Check whether the digit to the left of the rounding digit is odd.
        (q > 0 ? X > 0 ? U / W[B - X] : 0 : J[G - 1]) % 10 & 1 || T == (C.s < 0 ? 8 : 7)), M < 1 || !J[0])
          return J.length = 0, D ? (M -= C.e + 1, J[0] = W[(ke - M % ke) % ke], C.e = -M || 0) : J[0] = C.e = 0, C;
        if (q == 0 ? (J.length = G, R = 1, G--) : (J.length = G + 1, R = W[ke - q], J[G] = X > 0 ? Rt(U / W[B - X] % W[X]) * R : 0), D)
          for (; ; )
            if (G == 0) {
              for (q = 1, X = J[0]; X >= 10; X /= 10, q++) ;
              for (X = J[0] += R, R = 1; X >= 10; X /= 10, R++) ;
              q != R && (C.e++, J[0] == qt && (J[0] = 1));
              break;
            } else {
              if (J[G] += R, J[G] != qt) break;
              J[G--] = 0, R = 1;
            }
        for (q = J.length; J[--q] === 0; J.pop()) ;
      }
      C.e > m ? C.c = C.e = null : C.e < v && (C.c = [C.e = 0]);
    }
    return C;
  }
  function V(C) {
    var M, T = C.e;
    return T === null ? C.toString() : (M = Tt(C.c), M = T <= f || T >= g ? Fi(M, T) : an(M, T, "0"), C.s < 0 ? "-" + M : M);
  }
  return o.absoluteValue = o.abs = function() {
    var C = new I(this);
    return C.s < 0 && (C.s = 1), C;
  }, o.comparedTo = function(C, M) {
    return Pn(this, new I(C, M));
  }, o.decimalPlaces = o.dp = function(C, M) {
    var T, D, B, q = this;
    if (C != null)
      return Ze(C, 0, rt), M == null ? M = c : Ze(M, 0, 8), Y(new I(q), C + q.e + 1, M);
    if (!(T = q.c)) return null;
    if (D = ((B = T.length - 1) - At(this.e / ke)) * ke, B = T[B]) for (; B % 10 == 0; B /= 10, D--) ;
    return D < 0 && (D = 0), D;
  }, o.dividedBy = o.div = function(C, M) {
    return e(this, new I(C, M), u, c);
  }, o.dividedToIntegerBy = o.idiv = function(C, M) {
    return e(this, new I(C, M), 0, 1);
  }, o.exponentiatedBy = o.pow = function(C, M) {
    var T, D, B, q, X, R, U, G, H, J = this;
    if (C = new I(C), C.c && !C.isInteger())
      throw Error(_t + "Exponent not an integer: " + V(C));
    if (M != null && (M = new I(M)), R = C.e > 14, !J.c || !J.c[0] || J.c[0] == 1 && !J.e && J.c.length == 1 || !C.c || !C.c[0])
      return H = new I(Math.pow(+V(J), R ? C.s * (2 - Di(C)) : +V(C))), M ? H.mod(M) : H;
    if (U = C.s < 0, M) {
      if (M.c ? !M.c[0] : !M.s) return new I(NaN);
      D = !U && J.isInteger() && M.isInteger(), D && (J = J.mod(M));
    } else {
      if (C.e > 9 && (J.e > 0 || J.e < -1 || (J.e == 0 ? J.c[0] > 1 || R && J.c[1] >= 24e7 : J.c[0] < 8e13 || R && J.c[0] <= 9999975e7)))
        return q = J.s < 0 && Di(C) ? -0 : 0, J.e > -1 && (q = 1 / q), new I(U ? 1 / q : q);
      w && (q = fo(w / ke + 2));
    }
    for (R ? (T = new I(0.5), U && (C.s = 1), G = Di(C)) : (B = Math.abs(+V(C)), G = B % 2), H = new I(a); ; ) {
      if (G) {
        if (H = H.times(J), !H.c) break;
        q ? H.c.length > q && (H.c.length = q) : D && (H = H.mod(M));
      }
      if (B) {
        if (B = Rt(B / 2), B === 0) break;
        G = B % 2;
      } else if (C = C.times(T), Y(C, C.e + 1, 1), C.e > 14)
        G = Di(C);
      else {
        if (B = +V(C), B === 0) break;
        G = B % 2;
      }
      J = J.times(J), q ? J.c && J.c.length > q && (J.c.length = q) : D && (J = J.mod(M));
    }
    return D ? H : (U && (H = a.div(H)), M ? H.mod(M) : q ? Y(H, w, c, X) : H);
  }, o.integerValue = function(C) {
    var M = new I(this);
    return C == null ? C = c : Ze(C, 0, 8), Y(M, M.e + 1, C);
  }, o.isEqualTo = o.eq = function(C, M) {
    return Pn(this, new I(C, M)) === 0;
  }, o.isFinite = function() {
    return !!this.c;
  }, o.isGreaterThan = o.gt = function(C, M) {
    return Pn(this, new I(C, M)) > 0;
  }, o.isGreaterThanOrEqualTo = o.gte = function(C, M) {
    return (M = Pn(this, new I(C, M))) === 1 || M === 0;
  }, o.isInteger = function() {
    return !!this.c && At(this.e / ke) > this.c.length - 2;
  }, o.isLessThan = o.lt = function(C, M) {
    return Pn(this, new I(C, M)) < 0;
  }, o.isLessThanOrEqualTo = o.lte = function(C, M) {
    return (M = Pn(this, new I(C, M))) === -1 || M === 0;
  }, o.isNaN = function() {
    return !this.s;
  }, o.isNegative = function() {
    return this.s < 0;
  }, o.isPositive = function() {
    return this.s > 0;
  }, o.isZero = function() {
    return !!this.c && this.c[0] == 0;
  }, o.minus = function(C, M) {
    var T, D, B, q, X = this, R = X.s;
    if (C = new I(C, M), M = C.s, !R || !M) return new I(NaN);
    if (R != M)
      return C.s = -M, X.plus(C);
    var U = X.e / ke, G = C.e / ke, H = X.c, J = C.c;
    if (!U || !G) {
      if (!H || !J) return H ? (C.s = -M, C) : new I(J ? X : NaN);
      if (!H[0] || !J[0])
        return J[0] ? (C.s = -M, C) : new I(H[0] ? X : (
          // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
          c == 3 ? -0 : 0
        ));
    }
    if (U = At(U), G = At(G), H = H.slice(), R = U - G) {
      for ((q = R < 0) ? (R = -R, B = H) : (G = U, B = J), B.reverse(), M = R; M--; B.push(0)) ;
      B.reverse();
    } else
      for (D = (q = (R = H.length) < (M = J.length)) ? R : M, R = M = 0; M < D; M++)
        if (H[M] != J[M]) {
          q = H[M] < J[M];
          break;
        }
    if (q && (B = H, H = J, J = B, C.s = -C.s), M = (D = J.length) - (T = H.length), M > 0) for (; M--; H[T++] = 0) ;
    for (M = qt - 1; D > R; ) {
      if (H[--D] < J[D]) {
        for (T = D; T && !H[--T]; H[T] = M) ;
        --H[T], H[D] += qt;
      }
      H[D] -= J[D];
    }
    for (; H[0] == 0; H.splice(0, 1), --G) ;
    return H[0] ? O(C, H, G) : (C.s = c == 3 ? -1 : 1, C.c = [C.e = 0], C);
  }, o.modulo = o.mod = function(C, M) {
    var T, D, B = this;
    return C = new I(C, M), !B.c || !C.s || C.c && !C.c[0] ? new I(NaN) : !C.c || B.c && !B.c[0] ? new I(B) : (_ == 9 ? (D = C.s, C.s = 1, T = e(B, C, 0, 3), C.s = D, T.s *= D) : T = e(B, C, 0, _), C = B.minus(T.times(C)), !C.c[0] && _ == 1 && (C.s = B.s), C);
  }, o.multipliedBy = o.times = function(C, M) {
    var T, D, B, q, X, R, U, G, H, J, W, j, Q, re, ee, te = this, se = te.c, fe = (C = new I(C, M)).c;
    if (!se || !fe || !se[0] || !fe[0])
      return !te.s || !C.s || se && !se[0] && !fe || fe && !fe[0] && !se ? C.c = C.e = C.s = null : (C.s *= te.s, !se || !fe ? C.c = C.e = null : (C.c = [0], C.e = 0)), C;
    for (D = At(te.e / ke) + At(C.e / ke), C.s *= te.s, U = se.length, J = fe.length, U < J && (Q = se, se = fe, fe = Q, B = U, U = J, J = B), B = U + J, Q = []; B--; Q.push(0)) ;
    for (re = qt, ee = yn, B = J; --B >= 0; ) {
      for (T = 0, W = fe[B] % ee, j = fe[B] / ee | 0, X = U, q = B + X; q > B; )
        G = se[--X] % ee, H = se[X] / ee | 0, R = j * G + H * W, G = W * G + R % ee * ee + Q[q] + T, T = (G / re | 0) + (R / ee | 0) + j * H, Q[q--] = G % re;
      Q[q] = T;
    }
    return T ? ++D : Q.splice(0, 1), O(C, Q, D);
  }, o.negated = function() {
    var C = new I(this);
    return C.s = -C.s || null, C;
  }, o.plus = function(C, M) {
    var T, D = this, B = D.s;
    if (C = new I(C, M), M = C.s, !B || !M) return new I(NaN);
    if (B != M)
      return C.s = -M, D.minus(C);
    var q = D.e / ke, X = C.e / ke, R = D.c, U = C.c;
    if (!q || !X) {
      if (!R || !U) return new I(B / 0);
      if (!R[0] || !U[0]) return U[0] ? C : new I(R[0] ? D : B * 0);
    }
    if (q = At(q), X = At(X), R = R.slice(), B = q - X) {
      for (B > 0 ? (X = q, T = U) : (B = -B, T = R), T.reverse(); B--; T.push(0)) ;
      T.reverse();
    }
    for (B = R.length, M = U.length, B - M < 0 && (T = U, U = R, R = T, M = B), B = 0; M; )
      B = (R[--M] = R[M] + U[M] + B) / qt | 0, R[M] = qt === R[M] ? 0 : R[M] % qt;
    return B && (R = [B].concat(R), ++X), O(C, R, X);
  }, o.precision = o.sd = function(C, M) {
    var T, D, B, q = this;
    if (C != null && C !== !!C)
      return Ze(C, 1, rt), M == null ? M = c : Ze(M, 0, 8), Y(new I(q), C, M);
    if (!(T = q.c)) return null;
    if (B = T.length - 1, D = B * ke + 1, B = T[B]) {
      for (; B % 10 == 0; B /= 10, D--) ;
      for (B = T[0]; B >= 10; B /= 10, D++) ;
    }
    return C && q.e + 1 > D && (D = q.e + 1), D;
  }, o.shiftedBy = function(C) {
    return Ze(C, -go, go), this.times("1e" + C);
  }, o.squareRoot = o.sqrt = function() {
    var C, M, T, D, B, q = this, X = q.c, R = q.s, U = q.e, G = u + 4, H = new I("0.5");
    if (R !== 1 || !X || !X[0])
      return new I(!R || R < 0 && (!X || X[0]) ? NaN : X ? q : 1 / 0);
    if (R = Math.sqrt(+V(q)), R == 0 || R == 1 / 0 ? (M = Tt(X), (M.length + U) % 2 == 0 && (M += "0"), R = Math.sqrt(+M), U = At((U + 1) / 2) - (U < 0 || U % 2), R == 1 / 0 ? M = "5e" + U : (M = R.toExponential(), M = M.slice(0, M.indexOf("e") + 1) + U), T = new I(M)) : T = new I(R + ""), T.c[0]) {
      for (U = T.e, R = U + G, R < 3 && (R = 0); ; )
        if (B = T, T = H.times(B.plus(e(q, B, G, 1))), Tt(B.c).slice(0, R) === (M = Tt(T.c)).slice(0, R))
          if (T.e < U && --R, M = M.slice(R - 3, R + 1), M == "9999" || !D && M == "4999") {
            if (!D && (Y(B, B.e + u + 2, 0), B.times(B).eq(q))) {
              T = B;
              break;
            }
            G += 4, R += 4, D = 1;
          } else {
            (!+M || !+M.slice(1) && M.charAt(0) == "5") && (Y(T, T.e + u + 2, 1), C = !T.times(T).eq(q));
            break;
          }
    }
    return Y(T, T.e + u + 1, c, C);
  }, o.toExponential = function(C, M) {
    return C != null && (Ze(C, 0, rt), C++), N(this, C, M, 1);
  }, o.toFixed = function(C, M) {
    return C != null && (Ze(C, 0, rt), C = C + this.e + 1), N(this, C, M);
  }, o.toFormat = function(C, M, T) {
    var D, B = this;
    if (T == null)
      C != null && M && typeof M == "object" ? (T = M, M = null) : C && typeof C == "object" ? (T = C, C = M = null) : T = k;
    else if (typeof T != "object")
      throw Error(_t + "Argument not an object: " + T);
    if (D = B.toFixed(C, M), B.c) {
      var q, X = D.split("."), R = +T.groupSize, U = +T.secondaryGroupSize, G = T.groupSeparator || "", H = X[0], J = X[1], W = B.s < 0, j = W ? H.slice(1) : H, Q = j.length;
      if (U && (q = R, R = U, U = q, Q -= q), R > 0 && Q > 0) {
        for (q = Q % R || R, H = j.substr(0, q); q < Q; q += R) H += G + j.substr(q, R);
        U > 0 && (H += G + j.slice(q)), W && (H = "-" + H);
      }
      D = J ? H + (T.decimalSeparator || "") + ((U = +T.fractionGroupSize) ? J.replace(
        new RegExp("\\d{" + U + "}\\B", "g"),
        "$&" + (T.fractionGroupSeparator || "")
      ) : J) : H;
    }
    return (T.prefix || "") + D + (T.suffix || "");
  }, o.toFraction = function(C) {
    var M, T, D, B, q, X, R, U, G, H, J, W, j = this, Q = j.c;
    if (C != null && (R = new I(C), !R.isInteger() && (R.c || R.s !== 1) || R.lt(a)))
      throw Error(_t + "Argument " + (R.isInteger() ? "out of range: " : "not an integer: ") + V(R));
    if (!Q) return new I(j);
    for (M = new I(a), G = T = new I(a), D = U = new I(a), W = Tt(Q), q = M.e = W.length - j.e - 1, M.c[0] = mo[(X = q % ke) < 0 ? ke + X : X], C = !C || R.comparedTo(M) > 0 ? q > 0 ? M : G : R, X = m, m = 1 / 0, R = new I(W), U.c[0] = 0; H = e(R, M, 0, 1), B = T.plus(H.times(D)), B.comparedTo(C) != 1; )
      T = D, D = B, G = U.plus(H.times(B = G)), U = B, M = R.minus(H.times(B = M)), R = B;
    return B = e(C.minus(T), D, 0, 1), U = U.plus(B.times(G)), T = T.plus(B.times(D)), U.s = G.s = j.s, q = q * 2, J = e(G, D, q, c).minus(j).abs().comparedTo(
      e(U, T, q, c).minus(j).abs()
    ) < 1 ? [G, D] : [U, T], m = X, J;
  }, o.toNumber = function() {
    return +V(this);
  }, o.toPrecision = function(C, M) {
    return C != null && Ze(C, 1, rt), N(this, C, M, 2);
  }, o.toString = function(C) {
    var M, T = this, D = T.s, B = T.e;
    return B === null ? D ? (M = "Infinity", D < 0 && (M = "-" + M)) : M = "NaN" : (C == null ? M = B <= f || B >= g ? Fi(Tt(T.c), B) : an(Tt(T.c), B, "0") : C === 10 && b ? (T = Y(new I(T), u + B + 1, c), M = an(Tt(T.c), T.e, "0")) : (Ze(C, 2, L.length, "Base"), M = t(an(Tt(T.c), B, "0"), 10, C, D, !0)), D < 0 && T.c[0] && (M = "-" + M)), M;
  }, o.valueOf = o.toJSON = function() {
    return V(this);
  }, o._isBigNumber = !0, o[Symbol.toStringTag] = "BigNumber", o[Symbol.for("nodejs.util.inspect.custom")] = o.valueOf, n != null && I.set(n), I;
}
function At(n) {
  var e = n | 0;
  return n > 0 || n === e ? e : e - 1;
}
function Tt(n) {
  for (var e, t, r = 1, o = n.length, a = n[0] + ""; r < o; ) {
    for (e = n[r++] + "", t = ke - e.length; t--; e = "0" + e) ;
    a += e;
  }
  for (o = a.length; a.charCodeAt(--o) === 48; ) ;
  return a.slice(0, o + 1 || 1);
}
function Pn(n, e) {
  var t, r, o = n.c, a = e.c, u = n.s, c = e.s, f = n.e, g = e.e;
  if (!u || !c) return null;
  if (t = o && !o[0], r = a && !a[0], t || r) return t ? r ? 0 : -c : u;
  if (u != c) return u;
  if (t = u < 0, r = f == g, !o || !a) return r ? 0 : !o ^ t ? 1 : -1;
  if (!r) return f > g ^ t ? 1 : -1;
  for (c = (f = o.length) < (g = a.length) ? f : g, u = 0; u < c; u++) if (o[u] != a[u]) return o[u] > a[u] ^ t ? 1 : -1;
  return f == g ? 0 : f > g ^ t ? 1 : -1;
}
function Ze(n, e, t, r) {
  if (n < e || n > t || n !== Rt(n))
    throw Error(_t + (r || "Argument") + (typeof n == "number" ? n < e || n > t ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(n));
}
function Di(n) {
  var e = n.c.length - 1;
  return At(n.e / ke) == e && n.c[e] % 2 != 0;
}
function Fi(n, e) {
  return (n.length > 1 ? n.charAt(0) + "." + n.slice(1) : n) + (e < 0 ? "e" : "e+") + e;
}
function an(n, e, t) {
  var r, o;
  if (e < 0) {
    for (o = t + "."; ++e; o += t) ;
    n = o + n;
  } else if (r = n.length, ++e > r) {
    for (o = t, e -= r; --e; o += t) ;
    n += o;
  } else e < r && (n = n.slice(0, e) + "." + n.slice(e));
  return n;
}
var Jt = Gh(), ly = class {
  constructor(n) {
    le(this, "key");
    le(this, "left", null);
    le(this, "right", null);
    this.key = n;
  }
}, Lr = class extends ly {
  constructor(n) {
    super(n);
  }
}, cy = class {
  constructor() {
    le(this, "size", 0);
    le(this, "modificationCount", 0);
    le(this, "splayCount", 0);
  }
  splay(n) {
    const e = this.root;
    if (e == null)
      return this.compare(n, n), -1;
    let t = null, r = null, o = null, a = null, u = e;
    const c = this.compare;
    let f;
    for (; ; )
      if (f = c(u.key, n), f > 0) {
        let g = u.left;
        if (g == null || (f = c(g.key, n), f > 0 && (u.left = g.right, g.right = u, u = g, g = u.left, g == null)))
          break;
        t == null ? r = u : t.left = u, t = u, u = g;
      } else if (f < 0) {
        let g = u.right;
        if (g == null || (f = c(g.key, n), f < 0 && (u.right = g.left, g.left = u, u = g, g = u.right, g == null)))
          break;
        o == null ? a = u : o.right = u, o = u, u = g;
      } else
        break;
    return o != null && (o.right = u.left, u.left = a), t != null && (t.left = u.right, u.right = r), this.root !== u && (this.root = u, this.splayCount++), f;
  }
  splayMin(n) {
    let e = n, t = e.left;
    for (; t != null; ) {
      const r = t;
      e.left = r.right, r.right = e, e = r, t = e.left;
    }
    return e;
  }
  splayMax(n) {
    let e = n, t = e.right;
    for (; t != null; ) {
      const r = t;
      e.right = r.left, r.left = e, e = r, t = e.right;
    }
    return e;
  }
  _delete(n) {
    if (this.root == null || this.splay(n) != 0) return null;
    let t = this.root;
    const r = t, o = t.left;
    if (this.size--, o == null)
      this.root = t.right;
    else {
      const a = t.right;
      t = this.splayMax(o), t.right = a, this.root = t;
    }
    return this.modificationCount++, r;
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
}, Nc, Tc, ns = class zr extends cy {
  constructor(t, r) {
    super();
    le(this, "root", null);
    le(this, "compare");
    le(this, "validKey");
    le(this, Nc, "[object Set]");
    this.compare = t ?? this.defaultCompare(), this.validKey = r ?? ((o) => o != null && o != null);
  }
  delete(t) {
    return this.validKey(t) ? this._delete(t) != null : !1;
  }
  deleteAll(t) {
    for (const r of t)
      this.delete(r);
  }
  forEach(t) {
    const r = this[Symbol.iterator]();
    let o;
    for (; o = r.next(), !o.done; )
      t(o.value, o.value, this);
  }
  add(t) {
    const r = this.splay(t);
    return r != 0 && this.addNewRoot(new Lr(t), r), this;
  }
  addAndReturn(t) {
    const r = this.splay(t);
    return r != 0 && this.addNewRoot(new Lr(t), r), this.root.key;
  }
  addAll(t) {
    for (const r of t)
      this.add(r);
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
    const r = new zr(this.compare, this.validKey), o = this.modificationCount;
    for (const a of t) {
      if (o != this.modificationCount)
        throw "Concurrent modification during iteration.";
      this.validKey(a) && this.splay(a) == 0 && r.add(this.root.key);
    }
    r.size != this.size && (this.root = r.root, this.size = r.size, this.modificationCount++);
  }
  lookup(t) {
    return !this.validKey(t) || this.splay(t) != 0 ? null : this.root.key;
  }
  intersection(t) {
    const r = new zr(this.compare, this.validKey);
    for (const o of this)
      t.has(o) && r.add(o);
    return r;
  }
  difference(t) {
    const r = new zr(this.compare, this.validKey);
    for (const o of this)
      t.has(o) || r.add(o);
    return r;
  }
  union(t) {
    const r = this.clone();
    return r.addAll(t), r;
  }
  clone() {
    const t = new zr(this.compare, this.validKey);
    return t.size = this.size, t.root = this.copyNode(this.root), t;
  }
  copyNode(t) {
    if (t == null) return null;
    function r(a, u) {
      let c, f;
      do {
        if (c = a.left, f = a.right, c != null) {
          const g = new Lr(c.key);
          u.left = g, r(c, g);
        }
        if (f != null) {
          const g = new Lr(f.key);
          u.right = g, a = f, u = g;
        }
      } while (f != null);
    }
    const o = new Lr(t.key);
    return r(t, o), o;
  }
  toSet() {
    return this.clone();
  }
  entries() {
    return new fy(this.wrap());
  }
  keys() {
    return this[Symbol.iterator]();
  }
  values() {
    return this[Symbol.iterator]();
  }
  [(Tc = Symbol.iterator, Nc = Symbol.toStringTag, Tc)]() {
    return new hy(this.wrap());
  }
}, qh = class {
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
}, hy = class extends qh {
  getValue(n) {
    return n.key;
  }
}, fy = class extends qh {
  getValue(n) {
    return [n.key, n.key];
  }
}, zh = (n) => () => n, No = (n) => {
  const e = n ? (t, r) => r.minus(t).abs().isLessThanOrEqualTo(n) : zh(!1);
  return (t, r) => e(t, r) ? 0 : t.comparedTo(r);
};
function gy(n) {
  const e = n ? (t, r, o, a, u) => t.exponentiatedBy(2).isLessThanOrEqualTo(
    a.minus(r).exponentiatedBy(2).plus(u.minus(o).exponentiatedBy(2)).times(n)
  ) : zh(!1);
  return (t, r, o) => {
    const a = t.x, u = t.y, c = o.x, f = o.y, g = u.minus(f).times(r.x.minus(c)).minus(a.minus(c).times(r.y.minus(f)));
    return e(g, a, u, c, f) ? 0 : g.comparedTo(0);
  };
}
var dy = (n) => n, my = (n) => {
  if (n) {
    const e = new ns(No(n)), t = new ns(No(n)), r = (a, u) => u.addAndReturn(a), o = (a) => ({
      x: r(a.x, e),
      y: r(a.y, t)
    });
    return o({ x: new Jt(0), y: new Jt(0) }), o;
  }
  return dy;
}, To = (n) => ({
  set: (e) => {
    fn = To(e);
  },
  reset: () => To(n),
  compare: No(n),
  snap: my(n),
  orient: gy(n)
}), fn = To(), Pr = (n, e) => n.ll.x.isLessThanOrEqualTo(e.x) && e.x.isLessThanOrEqualTo(n.ur.x) && n.ll.y.isLessThanOrEqualTo(e.y) && e.y.isLessThanOrEqualTo(n.ur.y), Ro = (n, e) => {
  if (e.ur.x.isLessThan(n.ll.x) || n.ur.x.isLessThan(e.ll.x) || e.ur.y.isLessThan(n.ll.y) || n.ur.y.isLessThan(e.ll.y))
    return null;
  const t = n.ll.x.isLessThan(e.ll.x) ? e.ll.x : n.ll.x, r = n.ur.x.isLessThan(e.ur.x) ? n.ur.x : e.ur.x, o = n.ll.y.isLessThan(e.ll.y) ? e.ll.y : n.ll.y, a = n.ur.y.isLessThan(e.ur.y) ? n.ur.y : e.ur.y;
  return { ll: { x: t, y: o }, ur: { x: r, y: a } };
}, Vi = (n, e) => n.x.times(e.y).minus(n.y.times(e.x)), Uh = (n, e) => n.x.times(e.x).plus(n.y.times(e.y)), rs = (n) => Uh(n, n).sqrt(), vy = (n, e, t) => {
  const r = { x: e.x.minus(n.x), y: e.y.minus(n.y) }, o = { x: t.x.minus(n.x), y: t.y.minus(n.y) };
  return Vi(o, r).div(rs(o)).div(rs(r));
}, yy = (n, e, t) => {
  const r = { x: e.x.minus(n.x), y: e.y.minus(n.y) }, o = { x: t.x.minus(n.x), y: t.y.minus(n.y) };
  return Uh(o, r).div(rs(o)).div(rs(r));
}, xl = (n, e, t) => e.y.isZero() ? null : { x: n.x.plus(e.x.div(e.y).times(t.minus(n.y))), y: t }, El = (n, e, t) => e.x.isZero() ? null : { x: t, y: n.y.plus(e.y.div(e.x).times(t.minus(n.x))) }, py = (n, e, t, r) => {
  if (e.x.isZero()) return El(t, r, n.x);
  if (r.x.isZero()) return El(n, e, t.x);
  if (e.y.isZero()) return xl(t, r, n.y);
  if (r.y.isZero()) return xl(n, e, t.y);
  const o = Vi(e, r);
  if (o.isZero()) return null;
  const a = { x: t.x.minus(n.x), y: t.y.minus(n.y) }, u = Vi(a, e).div(o), c = Vi(a, r).div(o), f = n.x.plus(c.times(e.x)), g = t.x.plus(u.times(r.x)), v = n.y.plus(c.times(e.y)), m = t.y.plus(u.times(r.y)), p = f.plus(g).div(2), _ = v.plus(m).div(2);
  return { x: p, y: _ };
}, $t = class Yh {
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
    const r = Yh.comparePoints(e.point, t.point);
    return r !== 0 ? r : (e.point !== t.point && e.link(t), e.isLeft !== t.isLeft ? e.isLeft ? 1 : -1 : is.compare(e.segment, t.segment));
  }
  // for ordering points in sweep line order
  static comparePoints(e, t) {
    return e.x.isLessThan(t.x) ? -1 : e.x.isGreaterThan(t.x) ? 1 : e.y.isLessThan(t.y) ? -1 : e.y.isGreaterThan(t.y) ? 1 : 0;
  }
  link(e) {
    if (e.point === this.point)
      throw new Error("Tried to link already linked events");
    const t = e.point.events;
    for (let r = 0, o = t.length; r < o; r++) {
      const a = t[r];
      this.point.events.push(a), a.point = this.point;
    }
    this.checkForConsuming();
  }
  /* Do a pass over our linked events and check to see if any pair
   * of segments match, and should be consumed. */
  checkForConsuming() {
    const e = this.point.events.length;
    for (let t = 0; t < e; t++) {
      const r = this.point.events[t];
      if (r.segment.consumedBy === void 0)
        for (let o = t + 1; o < e; o++) {
          const a = this.point.events[o];
          a.consumedBy === void 0 && r.otherSE.point.events === a.otherSE.point.events && r.segment.consume(a.segment);
        }
    }
  }
  getAvailableLinkedEvents() {
    const e = [];
    for (let t = 0, r = this.point.events.length; t < r; t++) {
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
    const t = /* @__PURE__ */ new Map(), r = (o) => {
      const a = o.otherSE;
      t.set(o, {
        sine: vy(this.point, e.point, a.point),
        cosine: yy(this.point, e.point, a.point)
      });
    };
    return (o, a) => {
      t.has(o) || r(o), t.has(a) || r(a);
      const { sine: u, cosine: c } = t.get(o), { sine: f, cosine: g } = t.get(a);
      return u.isGreaterThanOrEqualTo(0) && f.isGreaterThanOrEqualTo(0) ? c.isLessThan(g) ? 1 : c.isGreaterThan(g) ? -1 : 0 : u.isLessThan(0) && f.isLessThan(0) ? c.isLessThan(g) ? -1 : c.isGreaterThan(g) ? 1 : 0 : f.isLessThan(u) ? -1 : f.isGreaterThan(u) ? 1 : 0;
    };
  }
}, _y = class Ao {
  constructor(e) {
    le(this, "events");
    le(this, "poly");
    le(this, "_isExteriorRing");
    le(this, "_enclosingRing");
    this.events = e;
    for (let t = 0, r = e.length; t < r; t++)
      e[t].segment.ringOut = this;
    this.poly = null;
  }
  /* Given the segments from the sweep line pass, compute & return a series
   * of closed rings from all the segments marked to be part of the result */
  static factory(e) {
    const t = [];
    for (let r = 0, o = e.length; r < o; r++) {
      const a = e[r];
      if (!a.isInResult() || a.ringOut) continue;
      let u = null, c = a.leftSE, f = a.rightSE;
      const g = [c], v = c.point, m = [];
      for (; u = c, c = f, g.push(c), c.point !== v; )
        for (; ; ) {
          const p = c.getAvailableLinkedEvents();
          if (p.length === 0) {
            const k = g[0].point, L = g[g.length - 1].point;
            throw new Error(
              `Unable to complete output ring starting at [${k.x}, ${k.y}]. Last matching segment found ends at [${L.x}, ${L.y}].`
            );
          }
          if (p.length === 1) {
            f = p[0].otherSE;
            break;
          }
          let _ = null;
          for (let k = 0, L = m.length; k < L; k++)
            if (m[k].point === c.point) {
              _ = k;
              break;
            }
          if (_ !== null) {
            const k = m.splice(_)[0], L = g.splice(k.index);
            L.unshift(L[0].otherSE), t.push(new Ao(L.reverse()));
            continue;
          }
          m.push({
            index: g.length,
            point: c.point
          });
          const w = c.getLeftmostComparator(u);
          f = p.sort(w)[0].otherSE;
          break;
        }
      t.push(new Ao(g));
    }
    return t;
  }
  getGeom() {
    let e = this.events[0].point;
    const t = [e];
    for (let g = 1, v = this.events.length - 1; g < v; g++) {
      const m = this.events[g].point, p = this.events[g + 1].point;
      fn.orient(m, e, p) !== 0 && (t.push(m), e = m);
    }
    if (t.length === 1) return null;
    const r = t[0], o = t[1];
    fn.orient(r, e, o) === 0 && t.shift(), t.push(t[0]);
    const a = this.isExteriorRing() ? 1 : -1, u = this.isExteriorRing() ? 0 : t.length - 1, c = this.isExteriorRing() ? t.length : -1, f = [];
    for (let g = u; g != c; g += a)
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
    for (let u = 1, c = this.events.length; u < c; u++) {
      const f = this.events[u];
      $t.compare(e, f) > 0 && (e = f);
    }
    let t = e.segment.prevInResult(), r = t ? t.prevInResult() : null;
    for (; ; ) {
      if (!t) return null;
      if (!r) return t.ringOut;
      if (r.ringOut !== t.ringOut)
        return ((o = r.ringOut) == null ? void 0 : o.enclosingRing()) !== t.ringOut ? t.ringOut : (a = t.ringOut) == null ? void 0 : a.enclosingRing();
      t = r.prevInResult(), r = t ? t.prevInResult() : null;
    }
  }
}, Cl = class {
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
    for (let t = 0, r = this.interiorRings.length; t < r; t++) {
      const o = this.interiorRings[t].getGeom();
      o !== null && e.push(o);
    }
    return e;
  }
}, wy = class {
  constructor(n) {
    le(this, "rings");
    le(this, "polys");
    this.rings = n, this.polys = this._composePolys(n);
  }
  getGeom() {
    const n = [];
    for (let e = 0, t = this.polys.length; e < t; e++) {
      const r = this.polys[e].getGeom();
      r !== null && n.push(r);
    }
    return n;
  }
  _composePolys(n) {
    var t;
    const e = [];
    for (let r = 0, o = n.length; r < o; r++) {
      const a = n[r];
      if (!a.poly)
        if (a.isExteriorRing()) e.push(new Cl(a));
        else {
          const u = a.enclosingRing();
          u != null && u.poly || e.push(new Cl(u)), (t = u == null ? void 0 : u.poly) == null || t.addInterior(a);
        }
    }
    return e;
  }
}, xy = class {
  constructor(n, e = is.compare) {
    le(this, "queue");
    le(this, "tree");
    le(this, "segments");
    this.queue = n, this.tree = new ns(e), this.segments = [];
  }
  process(n) {
    const e = n.segment, t = [];
    if (n.consumedBy)
      return n.isLeft ? this.queue.delete(n.otherSE) : this.tree.delete(e), t;
    n.isLeft && this.tree.add(e);
    let r = e, o = e;
    do
      r = this.tree.lastBefore(r);
    while (r != null && r.consumedBy != null);
    do
      o = this.tree.firstAfter(o);
    while (o != null && o.consumedBy != null);
    if (n.isLeft) {
      let a = null;
      if (r) {
        const c = r.getIntersection(e);
        if (c !== null && (e.isAnEndpoint(c) || (a = c), !r.isAnEndpoint(c))) {
          const f = this._splitSafely(r, c);
          for (let g = 0, v = f.length; g < v; g++)
            t.push(f[g]);
        }
      }
      let u = null;
      if (o) {
        const c = o.getIntersection(e);
        if (c !== null && (e.isAnEndpoint(c) || (u = c), !o.isAnEndpoint(c))) {
          const f = this._splitSafely(o, c);
          for (let g = 0, v = f.length; g < v; g++)
            t.push(f[g]);
        }
      }
      if (a !== null || u !== null) {
        let c = null;
        a === null ? c = u : u === null ? c = a : c = $t.comparePoints(
          a,
          u
        ) <= 0 ? a : u, this.queue.delete(e.rightSE), t.push(e.rightSE);
        const f = e.split(c);
        for (let g = 0, v = f.length; g < v; g++)
          t.push(f[g]);
      }
      t.length > 0 ? (this.tree.delete(e), t.push(n)) : (this.segments.push(e), e.prev = r);
    } else {
      if (r && o) {
        const a = r.getIntersection(o);
        if (a !== null) {
          if (!r.isAnEndpoint(a)) {
            const u = this._splitSafely(r, a);
            for (let c = 0, f = u.length; c < f; c++)
              t.push(u[c]);
          }
          if (!o.isAnEndpoint(a)) {
            const u = this._splitSafely(o, a);
            for (let c = 0, f = u.length; c < f; c++)
              t.push(u[c]);
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
    const r = n.split(e);
    return r.push(t), n.consumedBy === void 0 && this.tree.add(n), r;
  }
}, Ey = class {
  constructor() {
    le(this, "type");
    le(this, "numMultiPolys");
  }
  run(n, e, t) {
    Ur.type = n;
    const r = [new Il(e, !0)];
    for (let g = 0, v = t.length; g < v; g++)
      r.push(new Il(t[g], !1));
    if (Ur.numMultiPolys = r.length, Ur.type === "difference") {
      const g = r[0];
      let v = 1;
      for (; v < r.length; )
        Ro(r[v].bbox, g.bbox) !== null ? v++ : r.splice(v, 1);
    }
    if (Ur.type === "intersection")
      for (let g = 0, v = r.length; g < v; g++) {
        const m = r[g];
        for (let p = g + 1, _ = r.length; p < _; p++)
          if (Ro(m.bbox, r[p].bbox) === null) return [];
      }
    const o = new ns($t.compare);
    for (let g = 0, v = r.length; g < v; g++) {
      const m = r[g].getSweepEvents();
      for (let p = 0, _ = m.length; p < _; p++)
        o.add(m[p]);
    }
    const a = new xy(o);
    let u = null;
    for (o.size != 0 && (u = o.first(), o.delete(u)); u; ) {
      const g = a.process(u);
      for (let v = 0, m = g.length; v < m; v++) {
        const p = g[v];
        p.consumedBy === void 0 && o.add(p);
      }
      o.size != 0 ? (u = o.first(), o.delete(u)) : u = null;
    }
    fn.reset();
    const c = _y.factory(a.segments);
    return new wy(c).getGeom();
  }
}, Ur = new Ey(), dr = Ur, Cy = 0, is = class Hi {
  /* Warning: a reference to ringWindings input will be stored,
   *  and possibly will be later modified */
  constructor(e, t, r, o) {
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
    this.id = ++Cy, this.leftSE = e, e.segment = this, e.otherSE = t, this.rightSE = t, t.segment = this, t.otherSE = e, this.rings = r, this.windings = o;
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
    const r = e.leftSE.point.x, o = t.leftSE.point.x, a = e.rightSE.point.x, u = t.rightSE.point.x;
    if (u.isLessThan(r)) return 1;
    if (a.isLessThan(o)) return -1;
    const c = e.leftSE.point.y, f = t.leftSE.point.y, g = e.rightSE.point.y, v = t.rightSE.point.y;
    if (r.isLessThan(o)) {
      if (f.isLessThan(c) && f.isLessThan(g)) return 1;
      if (f.isGreaterThan(c) && f.isGreaterThan(g)) return -1;
      const m = e.comparePoint(t.leftSE.point);
      if (m < 0) return 1;
      if (m > 0) return -1;
      const p = t.comparePoint(e.rightSE.point);
      return p !== 0 ? p : -1;
    }
    if (r.isGreaterThan(o)) {
      if (c.isLessThan(f) && c.isLessThan(v)) return -1;
      if (c.isGreaterThan(f) && c.isGreaterThan(v)) return 1;
      const m = t.comparePoint(e.leftSE.point);
      if (m !== 0) return m;
      const p = e.comparePoint(t.rightSE.point);
      return p < 0 ? 1 : p > 0 ? -1 : 1;
    }
    if (c.isLessThan(f)) return -1;
    if (c.isGreaterThan(f)) return 1;
    if (a.isLessThan(u)) {
      const m = t.comparePoint(e.rightSE.point);
      if (m !== 0) return m;
    }
    if (a.isGreaterThan(u)) {
      const m = e.comparePoint(t.rightSE.point);
      if (m < 0) return 1;
      if (m > 0) return -1;
    }
    if (!a.eq(u)) {
      const m = g.minus(c), p = a.minus(r), _ = v.minus(f), w = u.minus(o);
      if (m.isGreaterThan(p) && _.isLessThan(w)) return 1;
      if (m.isLessThan(p) && _.isGreaterThan(w)) return -1;
    }
    return a.isGreaterThan(u) ? 1 : a.isLessThan(u) || g.isLessThan(v) ? -1 : g.isGreaterThan(v) ? 1 : e.id < t.id ? -1 : e.id > t.id ? 1 : 0;
  }
  static fromRing(e, t, r) {
    let o, a, u;
    const c = $t.comparePoints(e, t);
    if (c < 0)
      o = e, a = t, u = 1;
    else if (c > 0)
      o = t, a = e, u = -1;
    else
      throw new Error(
        `Tried to create degenerate segment at [${e.x}, ${e.y}]`
      );
    const f = new $t(o, !0), g = new $t(a, !1);
    return new Hi(f, g, [r], [u]);
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
    return fn.orient(this.leftSE.point, e, this.rightSE.point);
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
    const t = this.bbox(), r = e.bbox(), o = Ro(t, r);
    if (o === null) return null;
    const a = this.leftSE.point, u = this.rightSE.point, c = e.leftSE.point, f = e.rightSE.point, g = Pr(t, c) && this.comparePoint(c) === 0, v = Pr(r, a) && e.comparePoint(a) === 0, m = Pr(t, f) && this.comparePoint(f) === 0, p = Pr(r, u) && e.comparePoint(u) === 0;
    if (v && g)
      return p && !m ? u : !p && m ? f : null;
    if (v)
      return m && a.x.eq(f.x) && a.y.eq(f.y) ? null : a;
    if (g)
      return p && u.x.eq(c.x) && u.y.eq(c.y) ? null : c;
    if (p && m) return null;
    if (p) return u;
    if (m) return f;
    const _ = py(a, this.vector(), c, e.vector());
    return _ === null || !Pr(o, _) ? null : fn.snap(_);
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
    const t = [], r = e.events !== void 0, o = new $t(e, !0), a = new $t(e, !1), u = this.rightSE;
    this.replaceRightSE(a), t.push(a), t.push(o);
    const c = new Hi(
      o,
      u,
      this.rings.slice(),
      this.windings.slice()
    );
    return $t.comparePoints(c.leftSE.point, c.rightSE.point) > 0 && c.swapEvents(), $t.comparePoints(this.leftSE.point, this.rightSE.point) > 0 && this.swapEvents(), r && (o.checkForConsuming(), a.checkForConsuming()), t;
  }
  /* Swap which event is left and right */
  swapEvents() {
    const e = this.rightSE;
    this.rightSE = this.leftSE, this.leftSE = e, this.leftSE.isLeft = !0, this.rightSE.isLeft = !1;
    for (let t = 0, r = this.windings.length; t < r; t++)
      this.windings[t] *= -1;
  }
  /* Consume another segment. We take their rings under our wing
   * and mark them as consumed. Use for perfectly overlapping segments */
  consume(e) {
    let t = this, r = e;
    for (; t.consumedBy; ) t = t.consumedBy;
    for (; r.consumedBy; ) r = r.consumedBy;
    const o = Hi.compare(t, r);
    if (o !== 0) {
      if (o > 0) {
        const a = t;
        t = r, r = a;
      }
      if (t.prev === r) {
        const a = t;
        t = r, r = a;
      }
      for (let a = 0, u = r.rings.length; a < u; a++) {
        const c = r.rings[a], f = r.windings[a], g = t.rings.indexOf(c);
        g === -1 ? (t.rings.push(c), t.windings.push(f)) : t.windings[g] += f;
      }
      r.rings = null, r.windings = null, r.consumedBy = t, r.leftSE.consumedBy = t.leftSE, r.rightSE.consumedBy = t.rightSE;
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
    const t = this._afterState.rings, r = this._afterState.windings, o = this._afterState.multiPolys;
    for (let c = 0, f = this.rings.length; c < f; c++) {
      const g = this.rings[c], v = this.windings[c], m = t.indexOf(g);
      m === -1 ? (t.push(g), r.push(v)) : r[m] += v;
    }
    const a = [], u = [];
    for (let c = 0, f = t.length; c < f; c++) {
      if (r[c] === 0) continue;
      const g = t[c], v = g.poly;
      if (u.indexOf(v) === -1)
        if (g.isExterior) a.push(v);
        else {
          u.indexOf(v) === -1 && u.push(v);
          const m = a.indexOf(g.poly);
          m !== -1 && a.splice(m, 1);
        }
    }
    for (let c = 0, f = a.length; c < f; c++) {
      const g = a[c].multiPoly;
      o.indexOf(g) === -1 && o.push(g);
    }
    return this._afterState;
  }
  /* Is this segment part of the final result? */
  isInResult() {
    if (this.consumedBy) return !1;
    if (this._isInResult !== void 0) return this._isInResult;
    const e = this.beforeState().multiPolys, t = this.afterState().multiPolys;
    switch (dr.type) {
      case "union": {
        const r = e.length === 0, o = t.length === 0;
        this._isInResult = r !== o;
        break;
      }
      case "intersection": {
        let r, o;
        e.length < t.length ? (r = e.length, o = t.length) : (r = t.length, o = e.length), this._isInResult = o === dr.numMultiPolys && r < o;
        break;
      }
      case "xor": {
        const r = Math.abs(e.length - t.length);
        this._isInResult = r % 2 === 1;
        break;
      }
      case "difference": {
        const r = (o) => o.length === 1 && o[0].isSubject;
        this._isInResult = r(e) !== r(t);
        break;
      }
    }
    return this._isInResult;
  }
}, kl = class {
  constructor(n, e, t) {
    le(this, "poly");
    le(this, "isExterior");
    le(this, "segments");
    le(this, "bbox");
    if (!Array.isArray(n) || n.length === 0)
      throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
    if (this.poly = e, this.isExterior = t, this.segments = [], typeof n[0][0] != "number" || typeof n[0][1] != "number")
      throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
    const r = fn.snap({ x: new Jt(n[0][0]), y: new Jt(n[0][1]) });
    this.bbox = {
      ll: { x: r.x, y: r.y },
      ur: { x: r.x, y: r.y }
    };
    let o = r;
    for (let a = 1, u = n.length; a < u; a++) {
      if (typeof n[a][0] != "number" || typeof n[a][1] != "number")
        throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
      const c = fn.snap({ x: new Jt(n[a][0]), y: new Jt(n[a][1]) });
      c.x.eq(o.x) && c.y.eq(o.y) || (this.segments.push(is.fromRing(o, c, this)), c.x.isLessThan(this.bbox.ll.x) && (this.bbox.ll.x = c.x), c.y.isLessThan(this.bbox.ll.y) && (this.bbox.ll.y = c.y), c.x.isGreaterThan(this.bbox.ur.x) && (this.bbox.ur.x = c.x), c.y.isGreaterThan(this.bbox.ur.y) && (this.bbox.ur.y = c.y), o = c);
    }
    (!r.x.eq(o.x) || !r.y.eq(o.y)) && this.segments.push(is.fromRing(o, r, this));
  }
  getSweepEvents() {
    const n = [];
    for (let e = 0, t = this.segments.length; e < t; e++) {
      const r = this.segments[e];
      n.push(r.leftSE), n.push(r.rightSE);
    }
    return n;
  }
}, ky = class {
  constructor(n, e) {
    le(this, "multiPoly");
    le(this, "exteriorRing");
    le(this, "interiorRings");
    le(this, "bbox");
    if (!Array.isArray(n))
      throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
    this.exteriorRing = new kl(n[0], this, !0), this.bbox = {
      ll: { x: this.exteriorRing.bbox.ll.x, y: this.exteriorRing.bbox.ll.y },
      ur: { x: this.exteriorRing.bbox.ur.x, y: this.exteriorRing.bbox.ur.y }
    }, this.interiorRings = [];
    for (let t = 1, r = n.length; t < r; t++) {
      const o = new kl(n[t], this, !1);
      o.bbox.ll.x.isLessThan(this.bbox.ll.x) && (this.bbox.ll.x = o.bbox.ll.x), o.bbox.ll.y.isLessThan(this.bbox.ll.y) && (this.bbox.ll.y = o.bbox.ll.y), o.bbox.ur.x.isGreaterThan(this.bbox.ur.x) && (this.bbox.ur.x = o.bbox.ur.x), o.bbox.ur.y.isGreaterThan(this.bbox.ur.y) && (this.bbox.ur.y = o.bbox.ur.y), this.interiorRings.push(o);
    }
    this.multiPoly = e;
  }
  getSweepEvents() {
    const n = this.exteriorRing.getSweepEvents();
    for (let e = 0, t = this.interiorRings.length; e < t; e++) {
      const r = this.interiorRings[e].getSweepEvents();
      for (let o = 0, a = r.length; o < a; o++)
        n.push(r[o]);
    }
    return n;
  }
}, Il = class {
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
      ll: { x: new Jt(Number.POSITIVE_INFINITY), y: new Jt(Number.POSITIVE_INFINITY) },
      ur: { x: new Jt(Number.NEGATIVE_INFINITY), y: new Jt(Number.NEGATIVE_INFINITY) }
    };
    for (let t = 0, r = n.length; t < r; t++) {
      const o = new ky(n[t], this);
      o.bbox.ll.x.isLessThan(this.bbox.ll.x) && (this.bbox.ll.x = o.bbox.ll.x), o.bbox.ll.y.isLessThan(this.bbox.ll.y) && (this.bbox.ll.y = o.bbox.ll.y), o.bbox.ur.x.isGreaterThan(this.bbox.ur.x) && (this.bbox.ur.x = o.bbox.ur.x), o.bbox.ur.y.isGreaterThan(this.bbox.ur.y) && (this.bbox.ur.y = o.bbox.ur.y), this.polys.push(o);
    }
    this.isSubject = e;
  }
  getSweepEvents() {
    const n = [];
    for (let e = 0, t = this.polys.length; e < t; e++) {
      const r = this.polys[e].getSweepEvents();
      for (let o = 0, a = r.length; o < a; o++)
        n.push(r[o]);
    }
    return n;
  }
}, wn = (n, ...e) => dr.run("union", n, e), Xh = (n, ...e) => dr.run("intersection", n, e), Iy = (n, ...e) => dr.run("xor", n, e), Vh = (n, ...e) => dr.run("difference", n, e), Sy = fn.set;
const by = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  difference: Vh,
  intersection: Xh,
  setPrecision: Sy,
  union: wn,
  xor: Iy
}, Symbol.toStringTag, { value: "Module" }));
function My(n) {
  const e = [];
  if (at(n, (o) => {
    e.push(o.coordinates);
  }), e.length < 2)
    throw new Error("Must have at least two features");
  const t = n.features[0].properties || {}, r = Vh(e[0], ...e.slice(1));
  return r.length === 0 ? null : r.length === 1 ? ye(r[0], t) : wt(r, t);
}
function Oo(n) {
  if (!n) throw new Error("geojson is required");
  var e = [];
  return it(n, function(t) {
    e.push(t);
  }), ce(e);
}
function Ly(n, e = {}) {
  if (e = e || {}, !Oe(e)) throw new Error("options is invalid");
  const { propertyName: t } = e;
  gn(n, "Polygon", "dissolve");
  const r = [];
  if (t) {
    const o = {};
    Le(n, function(u) {
      u.properties && (Object.prototype.hasOwnProperty.call(
        o,
        u.properties[t]
      ) || (o[u.properties[t]] = []), o[u.properties[t]].push(u));
    });
    const a = Object.keys(o);
    for (let u = 0; u < a.length; u++) {
      const c = wt(
        wn.apply(
          null,
          // List of polygons expressed as Position[][][] a.k.a. Geom[]
          o[a[u]].map(function(f) {
            return f.geometry.coordinates;
          })
        )
      );
      c && c.properties && (c.properties[t] = a[u], r.push(c));
    }
  } else
    return Oo(
      wt(
        wn.apply(
          null,
          // List of polygons expressed as Position[][][] a.k.a. Geom[]
          n.features.map(function(o) {
            return o.geometry.coordinates;
          })
        )
      )
    );
  return Oo(ce(r));
}
function Py(n, e, t = 2) {
  const r = Me(n), o = Me(e), a = r[0] - o[0], u = r[1] - o[1];
  return t === 1 ? Math.abs(a) + Math.abs(u) : Math.pow(Math.pow(a, t) + Math.pow(u, t), 1 / t);
}
function Hh(n, e) {
  var t, r;
  e = e || {};
  const o = e.threshold || 1e4, a = e.p || 2, u = (t = e.binary) != null ? t : !1, c = e.alpha || -1, f = (r = e.standardization) != null ? r : !1, g = [];
  Le(n, (m) => {
    g.push(Dt(m));
  });
  const v = [];
  for (let m = 0; m < g.length; m++)
    v[m] = [];
  for (let m = 0; m < g.length; m++)
    for (let p = m; p < g.length; p++) {
      m === p && (v[m][p] = 0);
      const _ = Py(g[m], g[p], a);
      v[m][p] = _, v[p][m] = _;
    }
  for (let m = 0; m < g.length; m++)
    for (let p = 0; p < g.length; p++) {
      const _ = v[m][p];
      _ !== 0 && (u ? _ <= o ? v[m][p] = 1 : v[m][p] = 0 : _ <= o ? v[m][p] = Math.pow(_, c) : v[m][p] = 0);
    }
  if (f)
    for (let m = 0; m < g.length; m++) {
      const p = v[m].reduce((_, w) => _ + w, 0);
      for (let _ = 0; _ < g.length; _++)
        v[m][_] = v[m][_] / p;
    }
  return v;
}
function ir(n, e, t = {}) {
  const r = Me(n), o = Me(e);
  o[0] += o[0] - r[0] > 180 ? -360 : r[0] - o[0] > 180 ? 360 : 0;
  const a = Ny(r, o);
  return On(a, "meters", t.units);
}
function Ny(n, e, t) {
  t = t === void 0 ? Be : Number(t);
  const r = t, o = n[1] * Math.PI / 180, a = e[1] * Math.PI / 180, u = a - o;
  let c = Math.abs(e[0] - n[0]) * Math.PI / 180;
  c > Math.PI && (c -= 2 * Math.PI);
  const f = Math.log(
    Math.tan(a / 2 + Math.PI / 4) / Math.tan(o / 2 + Math.PI / 4)
  ), g = Math.abs(f) > 1e-11 ? u / f : Math.cos(o);
  return Math.sqrt(
    u * u + g * g * c * c
  ) * r;
}
function _s(n, e, t, r = {}) {
  const o = e < 0;
  let a = On(
    Math.abs(e),
    r.units,
    "meters"
  );
  o && (a = -Math.abs(a));
  const u = Me(n), c = Ty(
    u,
    a,
    t
  );
  return c[0] += c[0] - u[0] > 180 ? -360 : u[0] - c[0] > 180 ? 360 : 0, de(c, r.properties);
}
function Ty(n, e, t, r) {
  r = r === void 0 ? Be : Number(r);
  const o = e / r, a = n[0] * Math.PI / 180, u = Qe(n[1]), c = Qe(t), f = o * Math.cos(c);
  let g = u + f;
  Math.abs(g) > Math.PI / 2 && (g = g > 0 ? Math.PI - g : -Math.PI - g);
  const v = Math.log(
    Math.tan(g / 2 + Math.PI / 4) / Math.tan(u / 2 + Math.PI / 4)
  ), m = Math.abs(v) > 1e-11 ? f / v : Math.cos(u), p = o * Math.sin(c) / m;
  return [
    ((a + p) * 180 / Math.PI + 540) % 360 - 180,
    g * 180 / Math.PI
  ];
}
function Wh(n, e, t) {
  if (t = t || {}, !Oe(t)) throw new Error("options is invalid");
  const r = t.pivot, o = t.mutate;
  if (!n) throw new Error("geojson is required");
  if (e == null || isNaN(e))
    throw new Error("angle is required");
  if (e === 0) return n;
  const a = r ?? Dt(n);
  return (o === !1 || o === void 0) && (n = nt(n)), He(n, function(u) {
    const f = Dn(a, u) + e, g = ir(a, u), v = me(
      _s(a, g, f)
    );
    u[0] = v[0], u[1] = v[1];
  }), _n(n), n;
}
function $h(n, e, t, r) {
  r = r || {};
  let o = r.steps || 64;
  const a = r.units || "kilometers";
  let u = r.angle || 0;
  const c = r.pivot || n, f = r.properties || {};
  if (!n) throw new Error("center is required");
  if (!e) throw new Error("xSemiAxis is required");
  if (!t) throw new Error("ySemiAxis is required");
  if (!Oe(r)) throw new Error("options must be an object");
  if (!et(o)) throw new Error("steps must be a number");
  if (!et(u)) throw new Error("angle must be a number");
  const g = Me(
    Wh(de(Me(n)), u, { pivot: c })
  );
  u = -90 + u, o = Math.ceil(o / 4);
  let v = [], m = [];
  const p = e, _ = t, w = _, k = (p - _) / (Math.PI / 2), L = (p + _) * Math.PI / 4, b = 0.5, I = o;
  let N = 0, A = 0;
  for (let Y = 0; Y < o; Y++)
    A += N, k === 0 ? N = L / I / w : N = (-(k * A + w) + Math.sqrt(Math.pow(k * A + w, 2) - 4 * (b * k) * -(L / I))) / (2 * (b * k)), A != 0 && v.push(A);
  m.push(0);
  for (let Y = 0; Y < v.length; Y++)
    m.push(v[Y]);
  m.push(Math.PI / 2);
  for (let Y = 0; Y < v.length; Y++)
    m.push(
      Math.PI - v[v.length - Y - 1]
    );
  m.push(Math.PI);
  for (let Y = 0; Y < v.length; Y++)
    m.push(Math.PI + v[Y]);
  m.push(3 * Math.PI / 2);
  for (let Y = 0; Y < v.length; Y++)
    m.push(
      2 * Math.PI - v[v.length - Y - 1]
    );
  m.push(0);
  const O = [];
  for (const Y of m) {
    const V = Math.atan2(_ * Math.sin(Y), p * Math.cos(Y)), C = Math.sqrt(
      Math.pow(p, 2) * Math.pow(_, 2) / (Math.pow(p * Math.sin(V), 2) + Math.pow(_ * Math.cos(V), 2))
    );
    O.push(
      jt(g, C, u + Qt(V), {
        units: a
      }).geometry.coordinates
    );
  }
  return ye([O], f);
}
function Zh(n) {
  return ai(ze(n));
}
function ws(n) {
  const e = [];
  return n.type === "FeatureCollection" ? Le(n, function(t) {
    He(t, function(r) {
      e.push(de(r, t.properties));
    });
  }) : n.type === "Feature" ? He(n, function(t) {
    e.push(de(t, n.properties));
  }) : He(n, function(t) {
    e.push(de(t));
  }), ce(e);
}
function Ry(n, e) {
  var t;
  if (e = e || {}, !Oe(e)) throw new Error("options is invalid");
  const r = (t = e.mutate) != null ? t : !1;
  if (!n) throw new Error("geojson is required");
  return (r === !1 || r === void 0) && (n = nt(n)), He(n, function(o) {
    var a = o[0], u = o[1];
    o[0] = u, o[1] = a;
  }), n;
}
function Ay(n) {
  const t = Math.pow(10, 6), r = [];
  for (let o = 0; o < n.length; o++) {
    const a = n[o];
    a !== void 0 && (r[o] = Math.round((a + Number.EPSILON) * t) / t);
  }
  return r;
}
const Sl = Math.PI / 180, bl = 180 / Math.PI;
class ss {
  constructor(e, t) {
    le(this, "lon");
    le(this, "lat");
    le(this, "x");
    le(this, "y");
    this.lon = e, this.lat = t, this.x = Sl * e, this.y = Sl * t;
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
    return new ss(t, e);
  }
}
class Oy {
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
      const r = t.coords.filter((o) => o !== void 0).map((o) => {
        const a = o[0] ?? 0, u = o[1] ?? 0;
        return `${a} ${u}`;
      });
      r.length === 0 ? e.push("LINESTRING EMPTY") : e.push(`LINESTRING(${r.join(",")})`);
    }
    return e.join("; ");
  }
}
class Dy {
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
class Fy {
  constructor(e, t, r) {
    le(this, "start");
    le(this, "end");
    le(this, "properties");
    le(this, "g");
    if (!e || e.x === void 0 || e.y === void 0)
      throw new Error("GreatCircle constructor expects two args: start and end objects with x and y properties");
    if (!t || t.x === void 0 || t.y === void 0)
      throw new Error("GreatCircle constructor expects two args: start and end objects with x and y properties");
    this.start = new ss(e.x, e.y), this.end = new ss(t.x, t.y), this.properties = r || {};
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
    const t = Math.sin((1 - e) * this.g) / Math.sin(this.g), r = Math.sin(e * this.g) / Math.sin(this.g), o = t * Math.cos(this.start.y) * Math.cos(this.start.x) + r * Math.cos(this.end.y) * Math.cos(this.end.x), a = t * Math.cos(this.start.y) * Math.sin(this.start.x) + r * Math.cos(this.end.y) * Math.sin(this.end.x), u = t * Math.sin(this.start.y) + r * Math.sin(this.end.y), c = bl * Math.atan2(u, Math.sqrt(Math.pow(o, 2) + Math.pow(a, 2)));
    return [bl * Math.atan2(a, o), c];
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
    var p, _, w, k, L, b, I, N, A, O, Y, V, C, M, T, D, B, q, X, R, U, G, H, J, W;
    let r = [];
    if (!e || e <= 2)
      r.push([this.start.lon, this.start.lat]), r.push([this.end.lon, this.end.lat]);
    else {
      const j = 1 / (e - 1);
      for (let Q = 0; Q < e; ++Q) {
        const re = j * Q, ee = this.interpolate(re);
        r.push(ee);
      }
    }
    let o = !1, a = 0;
    const u = (t == null ? void 0 : t.offset) ?? 10, c = 180 - u, f = -180 + u, g = 360 - u;
    for (let j = 1; j < r.length; ++j) {
      const Q = ((p = r[j - 1]) == null ? void 0 : p[0]) ?? 0, re = ((_ = r[j]) == null ? void 0 : _[0]) ?? 0, ee = Math.abs(re - Q);
      ee > g && (re > c && Q < f || Q > c && re < f) ? o = !0 : ee > a && (a = ee);
    }
    const v = [];
    if (o && a < u) {
      let j = [];
      v.push(j);
      for (let Q = 0; Q < r.length; ++Q) {
        const re = parseFloat((((w = r[Q]) == null ? void 0 : w[0]) ?? 0).toString());
        if (Q > 0 && Math.abs(re - (((k = r[Q - 1]) == null ? void 0 : k[0]) ?? 0)) > g) {
          const ee = parseFloat((((L = r[Q - 1]) == null ? void 0 : L[0]) ?? 0).toString()), te = parseFloat((((b = r[Q - 1]) == null ? void 0 : b[1]) ?? 0).toString()), se = parseFloat((((I = r[Q]) == null ? void 0 : I[0]) ?? 0).toString()), fe = parseFloat((((N = r[Q]) == null ? void 0 : N[1]) ?? 0).toString());
          if (ee > -180 && ee < f && se === 180 && Q + 1 < r.length && (((A = r[Q - 1]) == null ? void 0 : A[0]) ?? 0) > -180 && (((O = r[Q - 1]) == null ? void 0 : O[0]) ?? 0) < f) {
            j.push([-180, ((Y = r[Q]) == null ? void 0 : Y[1]) ?? 0]), Q++, j.push([((V = r[Q]) == null ? void 0 : V[0]) ?? 0, ((C = r[Q]) == null ? void 0 : C[1]) ?? 0]);
            continue;
          } else if (ee > c && ee < 180 && se === -180 && Q + 1 < r.length && (((M = r[Q - 1]) == null ? void 0 : M[0]) ?? 0) > c && (((T = r[Q - 1]) == null ? void 0 : T[0]) ?? 0) < 180) {
            j.push([180, ((D = r[Q]) == null ? void 0 : D[1]) ?? 0]), Q++, j.push([((B = r[Q]) == null ? void 0 : B[0]) ?? 0, ((q = r[Q]) == null ? void 0 : q[1]) ?? 0]);
            continue;
          }
          if (ee <= 180 && se >= 180 && ee < se) {
            const Z = (180 - ee) / (se - ee), Fe = Z * fe + (1 - Z) * te;
            j.push([(((X = r[Q - 1]) == null ? void 0 : X[0]) ?? 0) > c ? 180 : -180, Fe]), j = [], j.push([(((R = r[Q - 1]) == null ? void 0 : R[0]) ?? 0) > c ? -180 : 180, Fe]), v.push(j);
          } else
            j = [], v.push(j);
          j.push([re, ((U = r[Q]) == null ? void 0 : U[1]) ?? 0]);
        } else
          j.push([((G = r[Q]) == null ? void 0 : G[0]) ?? 0, ((H = r[Q]) == null ? void 0 : H[1]) ?? 0]);
      }
    } else {
      const j = [];
      v.push(j);
      for (let Q = 0; Q < r.length; ++Q)
        j.push([((J = r[Q]) == null ? void 0 : J[0]) ?? 0, ((W = r[Q]) == null ? void 0 : W[1]) ?? 0]);
    }
    const m = new Oy(this.properties);
    for (let j = 0; j < v.length; ++j) {
      const Q = new Dy();
      m.geometries.push(Q);
      const re = v[j];
      if (re)
        for (let ee = 0; ee < re.length; ++ee) {
          const te = re[ee];
          te && Q.move_to(Ay([te[0], te[1]]));
        }
    }
    return m;
  }
}
function By(n, e, t = {}) {
  if (typeof t != "object") throw new Error("options is invalid");
  const { properties: r = {}, npoints: o = 100, offset: a = 10 } = t, u = Me(n), c = Me(e);
  if (u[0] === c[0] && u[1] === c[1]) {
    const v = Array(o).fill([u[0], u[1]]);
    return Se(v, r);
  }
  return new Fy(
    { x: u[0], y: u[1] },
    { x: c[0], y: c[1] },
    r || {}
  ).Arc(o, { offset: a }).json();
}
function Jr(n, e = {}) {
  const t = [];
  if (at(n, (o) => {
    t.push(o.coordinates);
  }), t.length < 2)
    throw new Error("Must specify at least 2 geometries");
  const r = Xh(t[0], ...t.slice(1));
  return r.length === 0 ? null : r.length === 1 ? ye(r[0], e.properties) : wt(r, e.properties);
}
function Kh(n, e, t = {}) {
  const r = JSON.stringify(t.properties || {}), [o, a, u, c] = n, f = (a + c) / 2, g = (o + u) / 2, m = e * 2 / qe([o, f], [u, f], t) * (u - o), _ = e * 2 / qe([g, a], [g, c], t) * (c - a), w = m / 2, k = w * 2, L = Math.sqrt(3) / 2 * _, b = u - o, I = c - a, N = 3 / 4 * k, A = L, O = (b - k) / (k - w / 2), Y = Math.floor(O), V = (Y * N - w / 2 - b) / 2 - w / 2 + N / 2, C = Math.floor((I - L) / L);
  let M = (I - C * L) / 2;
  const T = C * L - I > L / 2;
  T && (M -= L / 4);
  const D = [], B = [];
  for (let X = 0; X < 6; X++) {
    const R = 2 * Math.PI / 6 * X;
    D.push(Math.cos(R)), B.push(Math.sin(R));
  }
  const q = [];
  for (let X = 0; X <= Y; X++)
    for (let R = 0; R <= C; R++) {
      const U = X % 2 === 1;
      if (R === 0 && U || R === 0 && T) continue;
      const G = X * N + o - V;
      let H = R * A + a + M;
      if (U && (H -= L / 2), t.triangles === !0)
        qy(
          [G, H],
          m / 2,
          _ / 2,
          JSON.parse(r),
          D,
          B
        ).forEach(function(J) {
          t.mask ? Jr(ce([t.mask, J])) && q.push(J) : q.push(J);
        });
      else {
        const J = Gy(
          [G, H],
          m / 2,
          _ / 2,
          JSON.parse(r),
          D,
          B
        );
        t.mask ? Jr(ce([t.mask, J])) && q.push(J) : q.push(J);
      }
    }
  return ce(q);
}
function Gy(n, e, t, r, o, a) {
  const u = [];
  for (let c = 0; c < 6; c++) {
    const f = n[0] + e * o[c], g = n[1] + t * a[c];
    u.push([f, g]);
  }
  return u.push(u[0].slice()), ye([u], r);
}
function qy(n, e, t, r, o, a) {
  const u = [];
  for (let c = 0; c < 6; c++) {
    const f = [];
    f.push(n), f.push([n[0] + e * o[c], n[1] + t * a[c]]), f.push([
      n[0] + e * o[(c + 1) % 6],
      n[1] + t * a[(c + 1) % 6]
    ]), f.push(n), u.push(ye([f], r));
  }
  return u;
}
function Jh(n, e, t = {}) {
  t.mask && !t.units && (t.units = "kilometers");
  for (var r = [], o = n[0], a = n[1], u = n[2], c = n[3], f = e / qe([o, a], [u, a], t), g = f * (u - o), v = e / qe([o, a], [o, c], t), m = v * (c - a), p = u - o, _ = c - a, w = Math.floor(p / g), k = Math.floor(_ / m), L = (p - w * g) / 2, b = (_ - k * m) / 2, I = o + L; I <= u; ) {
    for (var N = a + b; N <= c; ) {
      var A = de([I, N], t.properties);
      t.mask ? ua(A, t.mask) && r.push(A) : r.push(A), N += m;
    }
    I += g;
  }
  return ce(r);
}
function Qh(n, e, t, r = {}) {
  const o = [], a = n[0], u = n[1], c = n[2], f = n[3], g = c - a, v = On(e, r.units, "degrees"), m = f - u, p = On(t, r.units, "degrees"), _ = Math.floor(Math.abs(g) / v), w = Math.floor(Math.abs(m) / p), k = (g - _ * v) / 2, L = (m - w * p) / 2;
  let b = a + k;
  for (let I = 0; I < _; I++) {
    let N = u + L;
    for (let A = 0; A < w; A++) {
      const O = ye(
        [
          [
            [b, N],
            [b, N + p],
            [b + v, N + p],
            [b + v, N],
            [b, N]
          ]
        ],
        r.properties
      );
      r.mask ? sh(r.mask, O) && o.push(O) : o.push(O), N += p;
    }
    b += v;
  }
  return ce(o);
}
function Ea(n, e, t = {}) {
  return Qh(n, e, e, t);
}
function jh(n, e, t = {}) {
  for (var r = [], o = e / qe([n[0], n[1]], [n[2], n[1]], t), a = o * (n[2] - n[0]), u = e / qe([n[0], n[1]], [n[0], n[3]], t), c = u * (n[3] - n[1]), f = 0, g = n[0]; g <= n[2]; ) {
    for (var v = 0, m = n[1]; m <= n[3]; ) {
      var p = null, _ = null;
      f % 2 === 0 && v % 2 === 0 ? (p = ye(
        [
          [
            [g, m],
            [g, m + c],
            [g + a, m],
            [g, m]
          ]
        ],
        t.properties
      ), _ = ye(
        [
          [
            [g, m + c],
            [g + a, m + c],
            [g + a, m],
            [g, m + c]
          ]
        ],
        t.properties
      )) : f % 2 === 0 && v % 2 === 1 ? (p = ye(
        [
          [
            [g, m],
            [g + a, m + c],
            [g + a, m],
            [g, m]
          ]
        ],
        t.properties
      ), _ = ye(
        [
          [
            [g, m],
            [g, m + c],
            [g + a, m + c],
            [g, m]
          ]
        ],
        t.properties
      )) : v % 2 === 0 && f % 2 === 1 ? (p = ye(
        [
          [
            [g, m],
            [g, m + c],
            [g + a, m + c],
            [g, m]
          ]
        ],
        t.properties
      ), _ = ye(
        [
          [
            [g, m],
            [g + a, m + c],
            [g + a, m],
            [g, m]
          ]
        ],
        t.properties
      )) : v % 2 === 1 && f % 2 === 1 && (p = ye(
        [
          [
            [g, m],
            [g, m + c],
            [g + a, m],
            [g, m]
          ]
        ],
        t.properties
      ), _ = ye(
        [
          [
            [g, m + c],
            [g + a, m + c],
            [g + a, m],
            [g, m + c]
          ]
        ],
        t.properties
      )), t.mask ? (Jr(ce([t.mask, p])) && r.push(p), Jr(ce([t.mask, _])) && r.push(_)) : (r.push(p), r.push(_)), m += c, v++;
    }
    f++, g += a;
  }
  return ce(r);
}
function zy(n, e, t) {
  var r, o, a, u;
  if (t = t || {}, typeof t != "object")
    throw new Error("options is invalid");
  if (!n)
    throw new Error("points is required");
  if (gn(n, "Point", "input must contain Points"), !e)
    throw new Error("cellSize is required");
  var c = (r = t.gridType) != null ? r : "square", f = (o = t.property) != null ? o : "elevation", g = (a = t.weight) != null ? a : 1, v = (u = t.bbox) != null ? u : ze(n);
  if (g !== void 0 && typeof g != "number")
    throw new Error("weight must be a number");
  Hr(v);
  var m;
  switch (c) {
    case "point":
    case "points":
      m = Jh(v, e, t);
      break;
    case "square":
    case "squares":
      m = Ea(v, e, t);
      break;
    case "hex":
    case "hexes":
      m = Kh(v, e, t);
      break;
    case "triangle":
    case "triangles":
      m = jh(v, e, t);
      break;
    default:
      throw new Error("invalid gridType");
  }
  var p = [];
  return Le(m, function(_) {
    var w, k = 0, L = 0;
    Le(n, function(I) {
      var N, A = c === "point" ? _ : Dt(_), O = qe(A, I, t), Y;
      if (f !== void 0 && (Y = (N = I.properties) == null ? void 0 : N[f]), Y === void 0 && (Y = I.geometry.coordinates[2]), Y === void 0)
        throw new Error("zValue is missing");
      O === 0 && (k = Y);
      var V = 1 / Math.pow(O, g);
      L += V, k += V * Y;
    });
    var b = nt(_);
    (w = b.properties) != null || (b.properties = {}), b.properties[f] = k / L, p.push(b);
  }), ce(p);
}
var Uy = Object.defineProperty, Ml = Object.getOwnPropertySymbols, Yy = Object.prototype.hasOwnProperty, Xy = Object.prototype.propertyIsEnumerable, Ll = (n, e, t) => e in n ? Uy(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Pl = (n, e) => {
  for (var t in e || (e = {}))
    Yy.call(e, t) && Ll(n, t, e[t]);
  if (Ml)
    for (var t of Ml(e))
      Xy.call(e, t) && Ll(n, t, e[t]);
  return n;
};
function Vy(n, e = {}) {
  if (!Oe(e)) throw new Error("options is invalid");
  const { zProperty: t = "elevation", flip: r = !1, flags: o = !1 } = e;
  gn(n, "Point", "input must contain Points");
  for (var a = Hy(n, r), u = [], c = 0; c < a.length; c++) {
    for (var f = a[c], g = [], v = 0; v < f.length; v++) {
      var m = f[v];
      m.properties == null && (m.properties = {}), m.properties[t] ? g.push(m.properties[t]) : g.push(0), o === !0 && (m.properties.matrixPosition = [c, v]);
    }
    u.push(g);
  }
  return u;
}
function Hy(n, e) {
  var t = {};
  Le(n, (o) => {
    var a = me(o)[1];
    t[a] || (t[a] = []), t[a].push(o);
  });
  const r = [];
  for (const o of Object.values(t))
    r.push(o.sort((a, u) => me(a)[0] - me(u)[0]));
  return r.sort(
    e ? (o, a) => me(o[0])[1] - me(a[0])[1] : (o, a) => me(a[0])[1] - me(o[0])[1]
  ), r;
}
function Wy(n, e, t) {
  if (t = t || {}, !Oe(t)) throw new Error("options is invalid");
  const r = t.zProperty || "elevation", o = t.commonProperties || {}, a = t.breaksProperties || [];
  if (gn(n, "Point", "Input must contain Points"), !e) throw new Error("breaks is required");
  if (!Array.isArray(e)) throw new Error("breaks is not an Array");
  if (!Oe(o))
    throw new Error("commonProperties is not an Object");
  if (!Array.isArray(a))
    throw new Error("breaksProperties is not an Array");
  const u = Vy(n, { zProperty: r, flip: !0 }), c = u[0].length;
  if (u.length < 2 || c < 2)
    throw new Error("Matrix of points must be at least 2x2");
  for (let v = 1; v < u.length; v++)
    if (u[v].length !== c)
      throw new Error("Matrix of points is not uniform in the x dimension");
  let f = $y(u, e, r);
  f = Ky(f, u, n);
  const g = f.map((v, m) => {
    if (a[m] && !Oe(a[m]))
      throw new Error("Each mappedProperty is required to be an Object");
    const p = Pl(Pl({}, o), a[m]);
    return p[r] = v[r], wt(
      v.groupedRings,
      p
    );
  });
  return ce(g);
}
function $y(n, e, t) {
  const r = [];
  let o;
  for (let a = 1; a < e.length; a++) {
    a === 1 && (o = Nl(n, +e[0]));
    const u = +e[a], c = +e[a - 1], f = Nl(n, u), g = f.map(
      (_) => (
        // note that we (in-place) reverse the array result of .map and not the original segment itself.
        _.map((w) => [w[0], w[1]]).reverse()
      )
    ), v = Zy(o.concat(g), n), m = Jy(v), p = Qy(m);
    if (p.length === 0 && n[0][0] < u && n[0][0] >= c) {
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
    r.push({
      groupedRings: p,
      [t]: c + "-" + u
    }), o = f;
  }
  return r;
}
function Nl(n, e) {
  const t = [], r = n[0].length, o = n.length;
  for (let u = 0; u < o - 1; u++)
    for (let c = 0; c < r - 1; c++) {
      const f = n[u + 1][c + 1], g = n[u][c + 1], v = n[u][c], m = n[u + 1][c];
      switch ((m >= e ? 8 : 0) | (f >= e ? 4 : 0) | (g >= e ? 2 : 0) | (v >= e ? 1 : 0)) {
        case 0:
          continue;
        case 1:
          t.push([
            [c + a(v, g), u],
            [c, u + a(v, m)]
          ]);
          break;
        case 2:
          t.push([
            [c + 1, u + a(g, f)],
            [c + a(v, g), u]
          ]);
          break;
        case 3:
          t.push([
            [c + 1, u + a(g, f)],
            [c, u + a(v, m)]
          ]);
          break;
        case 4:
          t.push([
            [c + a(m, f), u + 1],
            [c + 1, u + a(g, f)]
          ]);
          break;
        case 5: {
          (m + f + g + v) / 4 >= e ? t.push(
            [
              [c + a(m, f), u + 1],
              [c, u + a(v, m)]
            ],
            [
              [c + a(v, g), u],
              [c + 1, u + a(g, f)]
            ]
          ) : t.push(
            [
              [c + a(m, f), u + 1],
              [c + 1, u + a(g, f)]
            ],
            [
              [c + a(v, g), u],
              [c, u + a(v, m)]
            ]
          );
          break;
        }
        case 6:
          t.push([
            [c + a(m, f), u + 1],
            [c + a(v, g), u]
          ]);
          break;
        case 7:
          t.push([
            [c + a(m, f), u + 1],
            [c, u + a(v, m)]
          ]);
          break;
        case 8:
          t.push([
            [c, u + a(v, m)],
            [c + a(m, f), u + 1]
          ]);
          break;
        case 9:
          t.push([
            [c + a(v, g), u],
            [c + a(m, f), u + 1]
          ]);
          break;
        case 10: {
          (m + f + g + v) / 4 >= e ? t.push(
            [
              [c, u + a(v, m)],
              [c + a(v, g), u]
            ],
            [
              [c + 1, u + a(g, f)],
              [c + a(m, f), u + 1]
            ]
          ) : t.push(
            [
              [c, u + a(v, m)],
              [c + a(m, f), u + 1]
            ],
            [
              [c + 1, u + a(g, f)],
              [c + a(v, g), u]
            ]
          );
          break;
        }
        case 11:
          t.push([
            [c + 1, u + a(g, f)],
            [c + a(m, f), u + 1]
          ]);
          break;
        case 12:
          t.push([
            [c, u + a(v, m)],
            [c + 1, u + a(g, f)]
          ]);
          break;
        case 13:
          t.push([
            [c + a(v, g), u],
            [c + 1, u + a(g, f)]
          ]);
          break;
        case 14:
          t.push([
            [c, u + a(v, m)],
            [c + a(v, g), u]
          ]);
          break;
        case 15:
          continue;
      }
    }
  return t;
  function a(u, c) {
    if (u === c)
      return 0.5;
    let f = (e - u) / (c - u);
    return f > 1 ? 1 : f < 0 ? 0 : f;
  }
}
function Zy(n, e) {
  const t = e.length, r = e[0].length, o = [], a = [];
  for (; n.length > 0; ) {
    const u = [...n.shift()];
    o.push(u);
    let c;
    do {
      c = !1;
      for (let f = 0; f < n.length; f++) {
        const g = n[f];
        if (g[0][0] === u[u.length - 1][0] && g[0][1] === u[u.length - 1][1]) {
          c = !0, u.push(g[1]), n.splice(f, 1);
          break;
        }
        if (g[1][0] === u[0][0] && g[1][1] === u[0][1]) {
          c = !0, u.unshift(g[0]), n.splice(f, 1);
          break;
        }
      }
    } while (c);
  }
  for (; o.length > 0; ) {
    const u = o[0];
    if (u[0][0] === u[u.length - 1][0] && u[0][1] === u[u.length - 1][1]) {
      a.push(u), o.shift();
      continue;
    }
    const c = u[u.length - 1];
    let f, g;
    if (c[0] === 0 && c[1] !== 0)
      f = Bi(
        o,
        (v) => v[0][0] === 0 && v[0][1] < c[1],
        // left side, below end
        (v, m) => m[0][1] - v[0][1]
        // prefer positions to the top
      ), g = [0, 0];
    else if (c[1] === 0 && c[0] !== r - 1)
      f = Bi(
        o,
        (v) => v[0][1] === 0 && v[0][0] > c[0],
        // bottom side, right of end
        (v, m) => v[0][0] - m[0][0]
        // prefer positions to the left
      ), g = [r - 1, 0];
    else if (c[0] === r - 1 && c[1] !== t - 1)
      f = Bi(
        o,
        (v) => v[0][0] === r - 1 && v[0][1] > c[1],
        // right side, above end
        (v, m) => v[0][1] - m[0][1]
        // prefer positions to the bottom
      ), g = [r - 1, t - 1];
    else if (c[1] === t - 1 && c[0] !== 0)
      f = Bi(
        o,
        (v) => v[0][1] === t - 1 && v[0][0] < c[0],
        // top side, left of end
        (v, m) => m[0][0] - v[0][0]
        // prefer positions to the right
      ), g = [0, t - 1];
    else
      throw new Error("Contour not closed but is not along an edge");
    if (f === -1)
      u.push(g);
    else if (f === 0)
      u.push([u[0][0], u[0][1]]), a.push(u), o.shift();
    else {
      const v = o[f];
      o.splice(f, 1);
      for (const m of v)
        u.push(m);
    }
  }
  for (let u = 0; u < a.length; u++)
    a[u].length < 4 && (a.splice(u, 1), u--);
  return a;
}
function Ky(n, e, t) {
  const r = ze(t), o = r[2] - r[0], a = r[3] - r[1], u = r[0], c = r[1], f = e[0].length - 1, g = e.length - 1, v = o / f, m = a / g;
  return n.map(function(p) {
    return p.groupedRings = p.groupedRings.map(
      function(_) {
        return _.map(function(w) {
          return w.map((k) => [
            k[0] * v + u,
            k[1] * m + c
          ]);
        });
      }
    ), p;
  });
}
function Jy(n) {
  const e = n.map(function(t) {
    return { ring: t, area: oi(ye([t])) };
  });
  return e.sort(function(t, r) {
    return r.area - t.area;
  }), e.map(function(t) {
    return t.ring;
  });
}
function Qy(n) {
  const e = n.map((r) => ({ lrCoordinates: r, grouped: !1 })), t = [];
  for (; !jy(e); )
    for (let r = 0; r < e.length; r++)
      if (!e[r].grouped) {
        const o = [];
        o.push(e[r].lrCoordinates), e[r].grouped = !0;
        const a = ye([e[r].lrCoordinates]);
        e: for (let u = r + 1; u < e.length; u++)
          if (!e[u].grouped) {
            const c = ye([e[u].lrCoordinates]);
            if (Tl(c, a)) {
              for (let f = 1; f < o.length; f++)
                if (Tl(c, ye([o[f]])))
                  continue e;
              o.push(e[u].lrCoordinates), e[u].grouped = !0;
            }
          }
        t.push(o);
      }
  return t;
}
function Tl(n, e) {
  const t = ws(n);
  for (let r = 0; r < t.features.length; r++)
    if (!xe(t.features[r], e))
      return !1;
  return !0;
}
function jy(n) {
  for (let e = 0; e < n.length; e++)
    if (n[e].grouped === !1)
      return !1;
  return !0;
}
function Bi(n, e, t) {
  let r = -1;
  for (let o = 0; o < n.length; o++)
    e(n[o]) && (r === -1 || t(n[r], n[o]) > 0) && (r = o);
  return r;
}
var ep = Object.defineProperty, Rl = Object.getOwnPropertySymbols, tp = Object.prototype.hasOwnProperty, np = Object.prototype.propertyIsEnumerable, Al = (n, e, t) => e in n ? ep(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Ol = (n, e) => {
  for (var t in e || (e = {}))
    tp.call(e, t) && Al(n, t, e[t]);
  if (Rl)
    for (var t of Rl(e))
      np.call(e, t) && Al(n, t, e[t]);
  return n;
};
function rp(n, e = {}) {
  if (!Oe(e)) throw new Error("options is invalid");
  const { zProperty: t = "elevation", flip: r = !1, flags: o = !1 } = e;
  gn(n, "Point", "input must contain Points");
  for (var a = ip(n, r), u = [], c = 0; c < a.length; c++) {
    for (var f = a[c], g = [], v = 0; v < f.length; v++) {
      var m = f[v];
      m.properties == null && (m.properties = {}), m.properties[t] ? g.push(m.properties[t]) : g.push(0), o === !0 && (m.properties.matrixPosition = [c, v]);
    }
    u.push(g);
  }
  return u;
}
function ip(n, e) {
  var t = {};
  Le(n, (o) => {
    var a = me(o)[1];
    t[a] || (t[a] = []), t[a].push(o);
  });
  const r = [];
  for (const o of Object.values(t))
    r.push(o.sort((a, u) => me(a)[0] - me(u)[0]));
  return r.sort(
    e ? (o, a) => me(o[0])[1] - me(a[0])[1] : (o, a) => me(a[0])[1] - me(o[0])[1]
  ), r;
}
function sp(n, e, t) {
  if (t = t || {}, !Oe(t)) throw new Error("options is invalid");
  const r = t.zProperty || "elevation", o = t.commonProperties || {}, a = t.breaksProperties || [];
  if (gn(n, "Point", "Input must contain Points"), !e) throw new Error("breaks is required");
  if (!Array.isArray(e)) throw new Error("breaks must be an Array");
  if (!Oe(o))
    throw new Error("commonProperties must be an Object");
  if (!Array.isArray(a))
    throw new Error("breaksProperties must be an Array");
  const u = rp(n, { zProperty: r, flip: !0 }), c = u[0].length;
  if (u.length < 2 || c < 2)
    throw new Error("Matrix of points must be at least 2x2");
  for (let v = 1; v < u.length; v++)
    if (u[v].length !== c)
      throw new Error("Matrix of points is not uniform in the x dimension");
  const f = op(
    u,
    e,
    r,
    o,
    a
  ), g = up(f, u, n);
  return ce(g);
}
function op(n, e, t, r, o) {
  const a = [];
  for (let u = 0; u < e.length; u++) {
    const c = +e[u], f = Ol(Ol({}, r), o[u]);
    f[t] = c;
    const g = xn(ap(n, c), f);
    a.push(g);
  }
  return a;
}
function ap(n, e) {
  const t = [], r = n.length, o = n[0].length;
  for (let c = 0; c < r - 1; c++)
    for (let f = 0; f < o - 1; f++) {
      const g = n[c + 1][f + 1], v = n[c][f + 1], m = n[c][f], p = n[c + 1][f];
      switch ((p >= e ? 8 : 0) | (g >= e ? 4 : 0) | (v >= e ? 2 : 0) | (m >= e ? 1 : 0)) {
        case 0:
          continue;
        case 1:
          t.push([
            [f + u(m, v), c],
            [f, c + u(m, p)]
          ]);
          break;
        case 2:
          t.push([
            [f + 1, c + u(v, g)],
            [f + u(m, v), c]
          ]);
          break;
        case 3:
          t.push([
            [f + 1, c + u(v, g)],
            [f, c + u(m, p)]
          ]);
          break;
        case 4:
          t.push([
            [f + u(p, g), c + 1],
            [f + 1, c + u(v, g)]
          ]);
          break;
        case 5: {
          (p + g + v + m) / 4 >= e ? t.push(
            [
              [f + u(p, g), c + 1],
              [f, c + u(m, p)]
            ],
            [
              [f + u(m, v), c],
              [f + 1, c + u(v, g)]
            ]
          ) : t.push(
            [
              [f + u(p, g), c + 1],
              [f + 1, c + u(v, g)]
            ],
            [
              [f + u(m, v), c],
              [f, c + u(m, p)]
            ]
          );
          break;
        }
        case 6:
          t.push([
            [f + u(p, g), c + 1],
            [f + u(m, v), c]
          ]);
          break;
        case 7:
          t.push([
            [f + u(p, g), c + 1],
            [f, c + u(m, p)]
          ]);
          break;
        case 8:
          t.push([
            [f, c + u(m, p)],
            [f + u(p, g), c + 1]
          ]);
          break;
        case 9:
          t.push([
            [f + u(m, v), c],
            [f + u(p, g), c + 1]
          ]);
          break;
        case 10: {
          (p + g + v + m) / 4 >= e ? t.push(
            [
              [f, c + u(m, p)],
              [f + u(m, v), c]
            ],
            [
              [f + 1, c + u(v, g)],
              [f + u(p, g), c + 1]
            ]
          ) : t.push(
            [
              [f, c + u(m, p)],
              [f + u(p, g), c + 1]
            ],
            [
              [f + 1, c + u(v, g)],
              [f + u(m, v), c]
            ]
          );
          break;
        }
        case 11:
          t.push([
            [f + 1, c + u(v, g)],
            [f + u(p, g), c + 1]
          ]);
          break;
        case 12:
          t.push([
            [f, c + u(m, p)],
            [f + 1, c + u(v, g)]
          ]);
          break;
        case 13:
          t.push([
            [f + u(m, v), c],
            [f + 1, c + u(v, g)]
          ]);
          break;
        case 14:
          t.push([
            [f, c + u(m, p)],
            [f + u(m, v), c]
          ]);
          break;
        case 15:
          continue;
      }
    }
  const a = [];
  for (; t.length > 0; ) {
    const c = [...t.shift()];
    a.push(c);
    let f;
    do {
      f = !1;
      for (let g = 0; g < t.length; g++) {
        const v = t[g];
        if (v[0][0] === c[c.length - 1][0] && v[0][1] === c[c.length - 1][1]) {
          f = !0, c.push(v[1]), t.splice(g, 1);
          break;
        }
        if (v[1][0] === c[0][0] && v[1][1] === c[0][1]) {
          f = !0, c.unshift(v[0]), t.splice(g, 1);
          break;
        }
      }
    } while (f);
  }
  return a;
  function u(c, f) {
    if (c === f)
      return 0.5;
    let g = (e - c) / (f - c);
    return g > 1 ? 1 : g < 0 ? 0 : g;
  }
}
function up(n, e, t) {
  const r = ze(t), o = r[2] - r[0], a = r[3] - r[1], u = r[0], c = r[1], f = e[0].length - 1, g = e.length - 1, v = o / f, m = a / g, p = (_) => {
    _[0] = _[0] * v + u, _[1] = _[1] * m + c;
  };
  return n.forEach((_) => {
    He(_, p);
  }), n;
}
function lp(n) {
  let e, t;
  const r = {
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
        for (let c = u; c < a.length - 1; c++) {
          if (o === a && (Math.abs(u - c) === 1 || // segments are first and last segment of lineString
          u === 0 && c === o.length - 2 && // lineString is closed
          o[u][0] === o[o.length - 1][0] && o[u][1] === o[o.length - 1][1]))
            continue;
          const f = cp(
            o[u][0],
            o[u][1],
            o[u + 1][0],
            o[u + 1][1],
            a[c][0],
            a[c][1],
            a[c + 1][0],
            a[c + 1][1]
          );
          f && r.features.push(de([f[0], f[1]]));
        }
    });
  }), r;
}
function cp(n, e, t, r, o, a, u, c) {
  let f, g, v, m, p;
  const _ = {
    x: null,
    y: null,
    onLine1: !1,
    onLine2: !1
  };
  return f = (c - a) * (t - n) - (u - o) * (r - e), f === 0 ? _.x !== null && _.y !== null ? _ : !1 : (g = e - a, v = n - o, m = (u - o) * g - (c - a) * v, p = (t - n) * g - (r - e) * v, g = m / f, v = p / f, _.x = n + g * (t - n), _.y = e + g * (r - e), g >= 0 && g <= 1 && (_.onLine1 = !0), v >= 0 && v <= 1 && (_.onLine2 = !0), _.onLine1 && _.onLine2 ? [_.x, _.y] : !1);
}
function Ca(n, e = {}) {
  return fs(
    n,
    (t, r) => {
      const o = r.geometry.coordinates;
      return t + qe(o[0], o[1], e);
    },
    0
  );
}
function ef(n, e, t, r, o = {}) {
  const a = o.steps || 64, u = Dl(t), c = Dl(r), f = !Array.isArray(n) && n.type === "Feature" ? n.properties : {};
  if (u === c)
    return Se(
      ga(n, e, o).geometry.coordinates[0],
      f
    );
  const g = u, v = u < c ? c : c + 360, m = [], p = (v - g) / a;
  for (let _ = 0; _ <= a; _++) {
    const w = _ === a ? v : g + _ * p;
    m.push(
      jt(n, e, w, o).geometry.coordinates
    );
  }
  return Se(m, f);
}
function Dl(n) {
  let e = n % 360;
  return e < 0 && (e += 360), e;
}
function tf(n, e, t, r = {}) {
  if (!Oe(r)) throw new Error("options is invalid");
  const { units: o = "kilometers" } = r;
  var a, u = [];
  if (n.type === "Feature") a = n.geometry.coordinates;
  else if (n.type === "LineString") a = n.coordinates;
  else throw new Error("input must be a LineString Feature or Geometry");
  const c = a.length;
  let f = 0, g, v, m;
  for (let _ = 0; _ < a.length && !(e >= f && _ === a.length - 1); _++) {
    if (f > e && u.length === 0) {
      let w = e - f;
      if (!w)
        return u.push(a[_]), Se(u);
      v = hn(a[_], a[_ - 1]) - 180, m = jt(a[_], w, v, { units: o }), u.push(m.geometry.coordinates);
    }
    if (f >= t)
      return g = t - f, g ? (v = hn(a[_], a[_ - 1]) - 180, m = jt(a[_], g, v, { units: o }), u.push(m.geometry.coordinates), Se(u)) : (u.push(a[_]), Se(u));
    if (f >= e && u.push(a[_]), _ === a.length - 1)
      return Se(u);
    f += qe(a[_], a[_ + 1], { units: o });
  }
  if (f < e && a.length === c)
    throw new Error("Start position is beyond line");
  var p = a[a.length - 1];
  return Se([p, p]);
}
function hp(n, e, t = {}) {
  if (!Oe(t)) throw new Error("options is invalid");
  const { units: r = "kilometers", reverse: o = !1 } = t;
  if (!n) throw new Error("geojson is required");
  if (e <= 0)
    throw new Error("segmentLength must be greater than 0");
  const a = [];
  return it(n, (u) => {
    o && (u.geometry.coordinates = u.geometry.coordinates.reverse()), fp(
      u,
      e,
      r,
      (c) => {
        a.push(c);
      }
    );
  }), ce(a);
}
function fp(n, e, t, r) {
  var o = Ca(n, { units: t });
  if (o <= e)
    return r(n);
  var a = o / e;
  Number.isInteger(a) || (a = Math.floor(a) + 1);
  for (var u = 0; u < a; u++) {
    var c = tf(
      n,
      e * u,
      e * (u + 1),
      { units: t }
    );
    r(c);
  }
}
function os(n) {
  var e = n[0], t = n[1];
  return [t[0] - e[0], t[1] - e[1]];
}
function Do(n, e) {
  return n[0] * e[1] - e[0] * n[1];
}
function gp(n, e) {
  return [n[0] + e[0], n[1] + e[1]];
}
function dp(n, e) {
  return [n[0] - e[0], n[1] - e[1]];
}
function mp(n, e) {
  return [n * e[0], n * e[1]];
}
function vp(n, e) {
  var t = n[0], r = os(n), o = e[0], a = os(e), u = Do(r, a), c = dp(o, t), f = Do(c, a), g = f / u, v = gp(t, mp(g, r));
  return v;
}
function yp(n, e) {
  var t = os(n), r = os(e);
  return Do(t, r) === 0;
}
function pp(n, e) {
  return yp(n, e) ? !1 : vp(n, e);
}
function _p(n, e, t = {}) {
  if (t = t || {}, !Oe(t)) throw new Error("options is invalid");
  const { units: r = "kilometers" } = t;
  if (!n) throw new Error("geojson is required");
  if (e == null || isNaN(e))
    throw new Error("distance is required");
  var o = xt(n), a = n.type === "Feature" ? n.properties : {};
  switch (o) {
    case "LineString":
      return Fl(n, e, r);
    case "MultiLineString":
      var u = [];
      return it(n, function(c) {
        u.push(
          Fl(c, e, r).geometry.coordinates
        );
      }), xn(u, a);
    default:
      throw new Error("geometry " + o + " is not supported");
  }
}
function Fl(n, e, t) {
  var r = [], o = si(e, t), a = me(n), u = [];
  return a.forEach(function(c, f) {
    if (f !== a.length - 1) {
      var g = wp(
        c,
        a[f + 1],
        o
      );
      if (r.push(g), f > 0) {
        var v = r[f - 1], m = pp(g, v);
        m !== !1 && (v[1] = m, g[0] = m), u.push(v[0]), f === a.length - 2 && (u.push(g[0]), u.push(g[1]));
      }
      a.length === 2 && (u.push(g[0]), u.push(g[1]));
    }
  }), Se(
    u,
    n.type === "Feature" ? n.properties : {}
  );
}
function wp(n, e, t) {
  var r = Math.sqrt(
    (n[0] - e[0]) * (n[0] - e[0]) + (n[1] - e[1]) * (n[1] - e[1])
  ), o = n[0] + t * (e[1] - n[1]) / r, a = e[0] + t * (e[1] - n[1]) / r, u = n[1] + t * (n[0] - e[0]) / r, c = e[1] + t * (n[0] - e[0]) / r;
  return [
    [o, u],
    [a, c]
  ];
}
function xp(n, e, t) {
  const r = me(t);
  if (xt(t) !== "LineString")
    throw new Error("line must be a LineString");
  const o = un(t, n), a = un(t, e);
  Bl(t, o), Bl(t, a);
  const u = o.properties.segmentIndex <= a.properties.segmentIndex ? [o, a] : [a, o], c = [u[0].geometry.coordinates];
  for (let f = u[0].properties.segmentIndex + 1; f < u[1].properties.segmentIndex + 1; f++)
    c.push(r[f]);
  return c.push(u[1].geometry.coordinates), Se(c, t.type === "Feature" ? t.properties : {});
}
function Bl(n, e) {
  let t = n.type === "Feature" ? n.geometry : n;
  e.properties.segmentIndex >= t.coordinates.length - 1 && (e.properties.segmentIndex = t.coordinates.length - 2);
}
function Ep(n, e = {}) {
  var t, r, o, a = e.properties, u = (t = e.autoComplete) != null ? t : !0, c = (r = e.orderCoords) != null ? r : !0, f = (o = e.mutate) != null ? o : !1;
  switch (f || (n = nt(n)), n.type) {
    case "FeatureCollection":
      var g = [];
      return n.features.forEach(function(v) {
        g.push(
          me(Gl(v, {}, u, c))
        );
      }), wt(g, a);
    default:
      return Gl(n, a, u, c);
  }
}
function Gl(n, e, t, r) {
  e = e || (n.type === "Feature" ? n.properties : {});
  var o = Ye(n), a = o.coordinates, u = o.type;
  if (!a.length) throw new Error("line must contain coordinates");
  switch (u) {
    case "LineString":
      return t && (a = ql(a)), ye([a], e);
    case "MultiLineString":
      var c = [], f = 0;
      return a.forEach(function(g) {
        if (t && (g = ql(g)), r) {
          var v = Cp(ze(Se(g)));
          v > f ? (c.unshift(g), f = v) : c.push(g);
        } else
          c.push(g);
      }), ye(c, e);
    default:
      throw new Error("geometry type " + u + " is not supported");
  }
}
function ql(n) {
  var e = n[0], t = e[0], r = e[1], o = n[n.length - 1], a = o[0], u = o[1];
  return (t !== a || r !== u) && n.push(e), n;
}
function Cp(n) {
  var e = n[0], t = n[1], r = n[2], o = n[3];
  return Math.abs(e - r) * Math.abs(t - o);
}
function kp(n, e, t) {
  var r;
  const o = (r = t == null ? void 0 : t.mutate) != null ? r : !1;
  let a = e;
  e && o === !1 && (a = nt(e));
  const u = Sp(a);
  let c = null;
  return n.type === "FeatureCollection" ? c = Ip(n) : n.type === "Feature" ? c = Fo(
    wn(n.geometry.coordinates)
  ) : c = Fo(
    wn(n.coordinates)
  ), c.geometry.coordinates.forEach(function(f) {
    u.geometry.coordinates.push(f[0]);
  }), u;
}
function Ip(n) {
  const e = n.features.length === 2 ? wn(
    n.features[0].geometry.coordinates,
    n.features[1].geometry.coordinates
  ) : wn.apply(
    by,
    n.features.map(function(t) {
      return t.geometry.coordinates;
    })
  );
  return Fo(e);
}
function Fo(n) {
  return wt(n);
}
function Sp(n) {
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
function bp(n, e) {
  const t = qe(n, e), r = hn(n, e);
  return jt(n, t / 2, r);
}
function Mp(n, e) {
  var t, r;
  const o = e.inputField, a = e.threshold || 1e5, u = e.p || 2, c = (t = e.binary) != null ? t : !1, f = e.alpha || -1, g = (r = e.standardization) != null ? r : !0, v = Hh(n, {
    alpha: f,
    binary: c,
    p: u,
    standardization: g,
    threshold: a
  }), m = [];
  Le(n, (T) => {
    const D = T.properties || {};
    m.push(D[o]);
  });
  const p = nf(m), _ = Lp(m);
  let w = 0, k = 0, L = 0, b = 0;
  const I = v.length;
  for (let T = 0; T < I; T++) {
    let D = 0;
    for (let B = 0; B < I; B++)
      w += v[T][B] * (m[T] - p) * (m[B] - p), k += v[T][B], L += Math.pow(v[T][B] + v[B][T], 2), D += v[T][B] + v[B][T];
    b += Math.pow(D, 2);
  }
  L = 0.5 * L;
  const N = w / k / _, A = -1 / (I - 1), O = I * I * L - I * b + 3 * (k * k), Y = (I - 1) * (I + 1) * (k * k), V = O / Y - A * A, C = Math.sqrt(V), M = (N - A) / C;
  return {
    expectedMoranIndex: A,
    moranIndex: N,
    stdNorm: C,
    zNorm: M
  };
}
function nf(n) {
  let e = 0;
  for (const t of n)
    e += t;
  return e / n.length;
}
function Lp(n) {
  const e = nf(n);
  let t = 0;
  for (const r of n)
    t += Math.pow(r - e, 2);
  return t / n.length;
}
var Pp = Object.defineProperty, Np = Object.defineProperties, Tp = Object.getOwnPropertyDescriptors, zl = Object.getOwnPropertySymbols, Rp = Object.prototype.hasOwnProperty, Ap = Object.prototype.propertyIsEnumerable, Ul = (n, e, t) => e in n ? Pp(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Yl = (n, e) => {
  for (var t in e || (e = {}))
    Rp.call(e, t) && Ul(n, t, e[t]);
  if (zl)
    for (var t of zl(e))
      Ap.call(e, t) && Ul(n, t, e[t]);
  return n;
}, Xl = (n, e) => Np(n, Tp(e));
function xs(n, e, t = {}) {
  if (!n) throw new Error("targetPoint is required");
  if (!e) throw new Error("points is required");
  let r = 1 / 0, o = 0;
  Le(e, (u, c) => {
    const f = qe(n, u, t);
    f < r && (o = c, r = f);
  });
  const a = nt(e.features[o]);
  return Xl(Yl({}, a), {
    properties: Xl(Yl({}, a.properties), {
      featureIndex: o,
      distanceToPoint: r
    })
  });
}
function Op(n, e) {
  e = e || {};
  const t = e.studyArea || ai(ze(n)), r = e.properties || {}, o = e.units || "kilometers", a = [];
  Le(n, (m) => {
    a.push(Dt(m));
  });
  const u = a.length, c = a.map((m, p) => {
    const _ = ce(
      a.filter((w, k) => k !== p)
    );
    return qe(
      m,
      xs(m, _).geometry.coordinates,
      { units: o }
    );
  }).reduce((m, p) => m + p, 0) / u, f = u / Zo(oi(t), "meters", o), g = 1 / (2 * Math.sqrt(f)), v = 0.26136 / Math.sqrt(u * f);
  return r.nearestNeighborAnalysis = {
    units: o,
    arealUnits: o + "²",
    observedMeanDistance: c,
    expectedMeanDistance: g,
    nearestNeighborIndex: c / g,
    numberOfPoints: u,
    zScore: (c - g) / v
  }, t.properties = r, t;
}
function ka(n, e, t = {}) {
  var r, o;
  const a = (r = t.method) != null ? r : "geodesic", u = (o = t.units) != null ? o : "kilometers";
  if (!n)
    throw new Error("pt is required");
  if (Array.isArray(n) ? n = de(n) : n.type === "Point" ? n = Je(n) : Wr(n, "Point", "point"), !e)
    throw new Error("line is required");
  Array.isArray(e) ? e = Se(e) : e.type === "LineString" ? e = Je(e) : Wr(e, "LineString", "line");
  let c = 1 / 0;
  const f = n.geometry.coordinates;
  return Kt(e, (g) => {
    if (g) {
      const v = g.geometry.coordinates[0], m = g.geometry.coordinates[1], p = Dp(f, v, m, { method: a });
      p < c && (c = p);
    }
  }), On(c, "degrees", u);
}
function Dp(n, e, t, r) {
  if (r.method === "geodesic")
    return un(Se([e, t]).geometry, n, {
      units: "degrees"
    }).properties.pointDistance;
  const o = [t[0] - e[0], t[1] - e[1]], a = [n[0] - e[0], n[1] - e[1]], u = Vl(a, o);
  if (u <= 0)
    return ir(n, e, { units: "degrees" });
  const c = Vl(o, o);
  if (c <= u)
    return ir(n, t, { units: "degrees" });
  const f = u / c, g = [e[0] + f * o[0], e[1] + f * o[1]];
  return ir(n, g, { units: "degrees" });
}
function Vl(n, e) {
  return n[0] * e[0] + n[1] * e[1];
}
var Fp = Object.defineProperty, Hl = Object.getOwnPropertySymbols, Bp = Object.prototype.hasOwnProperty, Gp = Object.prototype.propertyIsEnumerable, Wl = (n, e, t) => e in n ? Fp(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, vo = (n, e) => {
  for (var t in e || (e = {}))
    Bp.call(e, t) && Wl(n, t, e[t]);
  if (Hl)
    for (var t of Hl(e))
      Gp.call(e, t) && Wl(n, t, e[t]);
  return n;
};
function qp(n, e, t = {}) {
  const r = t.units, o = t.properties || {}, a = zp(n);
  if (!a.features.length)
    throw new Error("points must contain features");
  if (!e)
    throw new Error("line is required");
  if (xt(e) !== "LineString")
    throw new Error("line must be a LineString");
  let u = 1 / 0, c = null;
  return Le(a, (f) => {
    const g = ka(f, e, { units: r });
    g < u && (u = g, c = f);
  }), c && (c.properties = vo(vo(vo({}, { dist: u }), c.properties), o)), c;
}
function zp(n) {
  const e = [];
  switch (n.geometry ? n.geometry.type : n.type) {
    case "GeometryCollection":
      return at(n, (r) => {
        r.type === "Point" && e.push({ type: "Feature", properties: {}, geometry: r });
      }), { type: "FeatureCollection", features: e };
    case "FeatureCollection":
      return n.features = n.features.filter((r) => r.geometry.type === "Point"), n;
    default:
      throw new Error("points must be a Point Collection");
  }
}
function Up(n, e) {
  const t = Me(n), a = Ye(e).coordinates[0];
  if (a.length < 4)
    throw new Error("OuterRing of a Polygon must have 4 or more Positions.");
  const u = e.type === "Feature" && e.properties || {}, c = u.a, f = u.b, g = u.c, v = t[0], m = t[1], p = a[0][0], _ = a[0][1], w = c !== void 0 ? c : a[0][2], k = a[1][0], L = a[1][1], b = f !== void 0 ? f : a[1][2], I = a[2][0], N = a[2][1], A = g !== void 0 ? g : a[2][2];
  return (A * (v - p) * (m - L) + w * (v - k) * (m - N) + b * (v - I) * (m - _) - b * (v - p) * (m - N) - A * (v - k) * (m - _) - w * (v - I) * (m - L)) / ((v - p) * (m - L) + (v - k) * (m - N) + (v - I) * (m - _) - (v - p) * (m - N) - (v - k) * (m - _) - (v - I) * (m - L));
}
function Yp(n) {
  const e = Xp(n), t = ms(e);
  let r = !1, o = 0;
  for (; !r && o < e.features.length; ) {
    const a = e.features[o].geometry;
    let u, c, f, g, v, m, p = !1;
    if (a.type === "Point")
      t.geometry.coordinates[0] === a.coordinates[0] && t.geometry.coordinates[1] === a.coordinates[1] && (r = !0);
    else if (a.type === "MultiPoint") {
      let _ = !1, w = 0;
      for (; !_ && w < a.coordinates.length; )
        t.geometry.coordinates[0] === a.coordinates[w][0] && t.geometry.coordinates[1] === a.coordinates[w][1] && (r = !0, _ = !0), w++;
    } else if (a.type === "LineString") {
      let _ = 0;
      for (; !p && _ < a.coordinates.length - 1; )
        u = t.geometry.coordinates[0], c = t.geometry.coordinates[1], f = a.coordinates[_][0], g = a.coordinates[_][1], v = a.coordinates[_ + 1][0], m = a.coordinates[_ + 1][1], $l(u, c, f, g, v, m) && (p = !0, r = !0), _++;
    } else if (a.type === "MultiLineString") {
      let _ = 0;
      for (; _ < a.coordinates.length; ) {
        p = !1;
        let w = 0;
        const k = a.coordinates[_];
        for (; !p && w < k.length - 1; )
          u = t.geometry.coordinates[0], c = t.geometry.coordinates[1], f = k[w][0], g = k[w][1], v = k[w + 1][0], m = k[w + 1][1], $l(u, c, f, g, v, m) && (p = !0, r = !0), w++;
        _++;
      }
    } else (a.type === "Polygon" || a.type === "MultiPolygon") && xe(t, a) && (r = !0);
    o++;
  }
  if (r)
    return t;
  {
    const a = ce([]);
    for (let u = 0; u < e.features.length; u++)
      a.features = a.features.concat(
        ws(e.features[u]).features
      );
    return de(xs(t, a).geometry.coordinates);
  }
}
function Xp(n) {
  return n.type !== "FeatureCollection" ? n.type !== "Feature" ? ce([Je(n)]) : ce([n]) : n;
}
function $l(n, e, t, r, o, a) {
  const u = Math.sqrt((o - t) * (o - t) + (a - r) * (a - r)), c = Math.sqrt((n - t) * (n - t) + (e - r) * (e - r)), f = Math.sqrt((o - n) * (o - n) + (a - e) * (a - e));
  return u === c + f;
}
function rf(n, e) {
  const t = [];
  return Le(n, function(r) {
    let o = !1;
    if (r.geometry.type === "Point")
      at(e, function(u) {
        xe(r, u) && (o = !0);
      }), o && t.push(r);
    else if (r.geometry.type === "MultiPoint") {
      var a = [];
      at(e, function(u) {
        He(r, function(c) {
          xe(c, u) && (o = !0, a.push(c));
        });
      }), o && t.push(
        ri(a, r.properties)
      );
    } else
      throw new Error("Input geometry must be a Point or MultiPoint");
  }), ce(t);
}
function Bo(n, e, t = {}) {
  var r, o;
  const a = (r = t.method) != null ? r : "geodesic", u = (o = t.units) != null ? o : "kilometers";
  if (!n) throw new Error("point is required");
  if (!e)
    throw new Error("polygon or multi-polygon is required");
  const c = Ye(e);
  if (c.type === "MultiPolygon") {
    const v = c.coordinates.map(
      (m) => Bo(n, ye(m), { method: a, units: u })
    );
    return Math.min(...v.map(Math.abs)) * (xe(n, e) ? -1 : 1);
  }
  if (c.coordinates.length > 1) {
    const [v, ...m] = c.coordinates.map(
      (_) => Bo(n, ye([_]), { method: a, units: u })
    );
    if (v >= 0) return v;
    const p = Math.min(...m);
    return p < 0 ? Math.abs(p) : Math.max(p * -1, v);
  }
  const f = lr(c);
  let g = 1 / 0;
  return it(f, (v) => {
    g = Math.min(
      g,
      ka(n, v, {
        method: a,
        units: u
      })
    );
  }), xe(n, c) ? -g : g;
}
function Vp(n) {
  return (n > 0) - (n < 0) || +n;
}
function Ia(n, e, t) {
  const r = e[0] - n[0], o = e[1] - n[1], a = t[0] - e[0], u = t[1] - e[1];
  return Vp(r * u - a * o);
}
function Hp(n, e) {
  const t = n.geometry.coordinates[0].map((u) => u[0]), r = n.geometry.coordinates[0].map((u) => u[1]), o = e.geometry.coordinates[0].map((u) => u[0]), a = e.geometry.coordinates[0].map((u) => u[1]);
  return Math.max.apply(null, t) === Math.max.apply(null, o) && Math.max.apply(null, r) === Math.max.apply(null, a) && Math.min.apply(null, t) === Math.min.apply(null, o) && Math.min.apply(null, r) === Math.min.apply(null, a);
}
function Zl(n, e) {
  return e.geometry.coordinates[0].every(
    (t) => xe(de(t), n)
  );
}
function Wp(n, e) {
  return n[0] === e[0] && n[1] === e[1];
}
var $p = class {
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
      const r = e.to, o = t.to;
      if (r.coordinates[0] - this.coordinates[0] >= 0 && o.coordinates[0] - this.coordinates[0] < 0)
        return 1;
      if (r.coordinates[0] - this.coordinates[0] < 0 && o.coordinates[0] - this.coordinates[0] >= 0)
        return -1;
      if (r.coordinates[0] - this.coordinates[0] === 0 && o.coordinates[0] - this.coordinates[0] === 0)
        return r.coordinates[1] - this.coordinates[1] >= 0 || o.coordinates[1] - this.coordinates[1] >= 0 ? r.coordinates[1] - o.coordinates[1] : o.coordinates[1] - r.coordinates[1];
      const a = Ia(
        this.coordinates,
        r.coordinates,
        o.coordinates
      );
      if (a < 0) return 1;
      if (a > 0) return -1;
      const u = Math.pow(r.coordinates[0] - this.coordinates[0], 2) + Math.pow(r.coordinates[1] - this.coordinates[1], 2), c = Math.pow(o.coordinates[0] - this.coordinates[0], 2) + Math.pow(o.coordinates[1] - this.coordinates[1], 2);
      return u - c;
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
}, Zp = class sf {
  /**
   * Creates or get the symetric Edge.
   *
   * @returns {Edge} - Symetric Edge.
   */
  getSymetric() {
    return this.symetric || (this.symetric = new sf(this.to, this.from), this.symetric.symetric = this), this.symetric;
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
    return Ia(
      e.from.coordinates,
      e.to.coordinates,
      this.to.coordinates
    );
  }
}, of = class {
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
    const n = this.edges.reduce((o, a, u) => (a.from.coordinates[1] > this.edges[o].from.coordinates[1] && (o = u), o), 0), e = (n === 0 ? this.length : n) - 1, t = (n + 1) % this.length, r = Ia(
      this.edges[e].from.coordinates,
      this.edges[n].from.coordinates,
      this.edges[t].from.coordinates
    );
    return r === 0 ? this.edges[e].from.coordinates[0] > this.edges[t].from.coordinates[0] : r > 0;
  }
  /**
   * Creates a MultiPoint representing the EdgeRing (discarts edges directions).
   *
   * @memberof EdgeRing
   * @returns {Feature<MultiPoint>} - Multipoint representation of the EdgeRing
   */
  toMultiPoint() {
    return ri(this.edges.map((n) => n.from.coordinates));
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
    return this.envelope ? this.envelope : this.envelope = Zh(this.toPolygon());
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
    let r, o;
    return e.forEach((a) => {
      const u = a.getEnvelope();
      if (o && (r = o.getEnvelope()), !Hp(u, t) && Zl(u, t)) {
        const c = n.map(
          (g) => g.from.coordinates
        );
        let f;
        for (const g of c)
          a.some((v) => Wp(g, v.from.coordinates)) || (f = g);
        f && a.inside(de(f)) && (!o || Zl(r, u)) && (o = a);
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
function Kp(n) {
  if (!n) throw new Error("No geojson passed");
  if (n.type !== "FeatureCollection" && n.type !== "GeometryCollection" && n.type !== "MultiLineString" && n.type !== "LineString" && n.type !== "Feature")
    throw new Error(
      `Invalid input type '${n.type}'. Geojson must be FeatureCollection, GeometryCollection, LineString, MultiLineString or Feature`
    );
}
var Jp = class af {
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
    Kp(e);
    const t = new af();
    return it(e, (r) => {
      Wr(r, "LineString", "Graph::fromGeoJson"), Jo(r, (o, a) => {
        if (o) {
          const u = t.getNode(o), c = t.getNode(a);
          t.addEdge(u, c);
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
    let r = (t = this.nodes.get(e[0])) == null ? void 0 : t.get(e[1]);
    if (r == null) {
      const o = new $p(this.nodeId++, e);
      let a = this.nodes.get(e[0]);
      return a == null && (a = /* @__PURE__ */ new Map(), this.nodes.set(e[0], a)), a.set(e[1], o), o;
    }
    return r;
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
    var r;
    if ((r = this.edges.get(e)) != null && r.has(t))
      return;
    const o = new Zp(e, t), a = o.getSymetric();
    let u = this.edges.get(e);
    u == null && (u = /* @__PURE__ */ new Map(), this.edges.set(e, u)), u.set(t, o);
    let c = this.edges.get(t);
    c == null && (c = /* @__PURE__ */ new Map(), this.edges.set(t, c)), c.set(e, a);
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
      const t = e.getOuterEdges().map((r) => r.to);
      this.removeNode(e), t.forEach((r) => this._removeIfDangle(r));
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
    e == null ? this._forEachNode((t) => this._computeNextCWEdges(t)) : e.getOuterEdges().forEach((t, r) => {
      e.getOuterEdge(
        (r === 0 ? e.getOuterEdges().length : r) - 1
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
    const r = e.getOuterEdges();
    let o, a;
    for (let u = r.length - 1; u >= 0; --u) {
      let c = r[u], f = c.symetric, g, v;
      c.label === t && (g = c), f.label === t && (v = f), !(!g || !v) && (v && (a = v), g && (a && (a.next = g, a = void 0), o || (o = g)));
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
    return this._forEachEdge((r) => {
      if (r.label >= 0) return;
      e.push(r);
      let o = r;
      do
        o.label = t, o = o.next;
      while (!r.isEqual(o));
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
      this._findIntersectionNodes(t).forEach((r) => {
        this._computeNextCCWEdges(r, t.label);
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
    let r = e;
    do {
      let o = 0;
      r.from.getOuterEdges().forEach((a) => {
        a.label === e.label && ++o;
      }), o > 1 && t.push(r.from), r = r.next;
    } while (!e.isEqual(r));
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
    const r = new of();
    do
      r.push(t), t.ring = r, t = t.next;
    while (!e.isEqual(t));
    return r;
  }
  /**
   * Removes a node from the Graph.
   *
   * It also removes edges asociated to that node
   * @param {Node} node - Node to be removed
   */
  removeNode(e) {
    var t;
    e.getOuterEdges().forEach((r) => this.removeEdge(r)), e.innerEdges.forEach((r) => this.removeEdge(r)), (t = this.nodes.get(e.coordinates[0])) == null || t.delete(e.coordinates[1]);
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
      for (const r of t.values())
        e(r);
  }
  _forEachEdge(e) {
    for (const t of this.edges.values())
      for (const r of t.values())
        e(r);
  }
};
function Qp(n) {
  const e = Jp.fromGeoJson(n);
  e.deleteDangles(), e.deleteCutEdges();
  const t = [], r = [];
  return e.getEdgeRings().filter((o) => o.isValid()).forEach((o) => {
    o.isHole() ? t.push(o) : r.push(o);
  }), t.forEach((o) => {
    of.findEdgeRingContaining(o, r) && r.push(o);
  }), ce(r.map((o) => o.toPolygon()));
}
function jp(n, e) {
  e = e || {}, e.iterations = e.iterations || 1;
  const { iterations: t } = e, r = [];
  if (!n) throw new Error("inputPolys is required");
  return at(n, function(o, a, u) {
    if (o.type === "Polygon") {
      let c = [[]];
      for (let f = 0; f < t; f++) {
        let g = [], v = o;
        f > 0 && (v = ye(c).geometry), e1(v, g), c = g.slice(0);
      }
      r.push(ye(c, u));
    } else if (o.type === "MultiPolygon") {
      let c = [[[]]];
      for (let f = 0; f < t; f++) {
        let g = [], v = o;
        f > 0 && (v = wt(c).geometry), t1(v, g), c = g.slice(0);
      }
      r.push(wt(c, u));
    } else
      throw new Error("geometry is invalid, must be Polygon or MultiPolygon");
  }), ce(r);
}
function e1(n, e) {
  var t, r;
  He(
    n,
    function(o, a, u, c, f) {
      if (r !== f)
        e.push([]);
      else {
        var g = t[0], v = t[1], m = o[0], p = o[1];
        e[f].push([
          0.75 * g + 0.25 * m,
          0.75 * v + 0.25 * p
        ]), e[f].push([
          0.25 * g + 0.75 * m,
          0.25 * v + 0.75 * p
        ]);
      }
      t = o, r = f;
    },
    !1
  ), e.forEach(function(o) {
    o.push(o[0]);
  });
}
function t1(n, e) {
  let t, r, o;
  He(
    n,
    function(a, u, c, f, g) {
      if (r !== f)
        e.push([[]]);
      else if (o !== g)
        e[f].push([]);
      else {
        var v = t[0], m = t[1], p = a[0], _ = a[1];
        e[f][g].push([
          0.75 * v + 0.25 * p,
          0.75 * m + 0.25 * _
        ]), e[f][g].push([
          0.25 * v + 0.75 * p,
          0.25 * m + 0.75 * _
        ]);
      }
      t = a, r = f, o = g;
    },
    !1
  ), e.forEach(function(a) {
    a.forEach(function(u) {
      u.push(u[0]);
    });
  });
}
function n1(n, e) {
  const t = me(n), r = me(e);
  let o = [], a = [], u;
  const c = ze(e);
  let f = 0, g = null;
  switch (t[0] > c[0] && t[0] < c[2] && t[1] > c[1] && t[1] < c[3] && (g = xs(n, ws(e)), f = g.properties.featureIndex), xt(e)) {
    case "Polygon":
      o = r[0][f], a = r[0][0], g !== null && g.geometry.coordinates[1] < t[1] && (a = r[0][f]), u = Qr(
        r[0][0],
        r[0][r[0].length - 1],
        t
      ), [o, a] = Kl(
        r[0],
        t,
        u,
        o,
        a
      );
      break;
    case "MultiPolygon":
      for (var m = 0, p = 0, _ = 0, w = 0; w < r[0].length; w++) {
        m = w;
        for (var k = !1, L = 0; L < r[0][w].length; L++) {
          if (p = L, _ === f) {
            k = !0;
            break;
          }
          _++;
        }
        if (k) break;
      }
      o = r[0][m][p], a = r[0][m][p], u = Qr(
        r[0][0][0],
        r[0][0][r[0][0].length - 1],
        t
      ), r.forEach(function(b) {
        [o, a] = Kl(b[0], t, u, o, a);
      });
      break;
  }
  return ce([de(o), de(a)]);
}
function Kl(n, e, t, r, o) {
  for (let a = 0; a < n.length; a++) {
    const u = n[a];
    let c = n[a + 1];
    a === n.length - 1 && (c = n[0]);
    const f = Qr(u, c, e);
    t <= 0 && f > 0 ? i1(e, u, r) || (r = u) : t > 0 && f <= 0 && (r1(e, u, o) || (o = u)), t = f;
  }
  return [r, o];
}
function r1(n, e, t) {
  return Qr(n, e, t) > 0;
}
function i1(n, e, t) {
  return Qr(n, e, t) < 0;
}
function Qr(n, e, t) {
  return (e[0] - n[0]) * (t[1] - n[1]) - (t[0] - n[0]) * (e[1] - n[1]);
}
function uf(n, e = {}) {
  return cf(n, "mercator", e);
}
function lf(n, e = {}) {
  return cf(n, "wgs84", e);
}
function cf(n, e, t = {}) {
  t = t || {};
  var r = t.mutate;
  if (!n) throw new Error("geojson is required");
  return Array.isArray(n) && et(n[0]) ? n = e === "mercator" ? Jl(n) : Ql(n) : (r !== !0 && (n = nt(n)), He(n, function(o) {
    var a = e === "mercator" ? Jl(o) : Ql(o);
    o[0] = a[0], o[1] = a[1];
  })), n;
}
function Jl(n) {
  var e = Math.PI / 180, t = 6378137, r = 20037508342789244e-9, o = Math.abs(n[0]) <= 180 ? n[0] : n[0] - s1(n[0]) * 360, a = [
    t * o * e,
    t * Math.log(Math.tan(Math.PI * 0.25 + 0.5 * n[1] * e))
  ];
  return a[0] > r && (a[0] = r), a[0] < -r && (a[0] = -r), a[1] > r && (a[1] = r), a[1] < -r && (a[1] = -r), a;
}
function Ql(n) {
  var e = 180 / Math.PI, t = 6378137;
  return [
    n[0] * e / t,
    (Math.PI * 0.5 - 2 * Math.atan(Math.exp(-n[1] / t))) * e
  ];
}
function s1(n) {
  return n < 0 ? -1 : n > 0 ? 1 : 0;
}
const o1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  toMercator: uf,
  toWgs84: lf
}, Symbol.toStringTag, { value: "Module" }));
function a1(n, e) {
  e = e || {};
  const t = e.studyBbox || ze(n), r = e.confidenceLevel || 20, o = n.features, a = o.length, u = oi(ai(t)), c = Math.sqrt(u / a * 2), g = Ea(t, c, {
    units: "meters"
  }).features, v = {};
  for (let V = 0; V < g.length; V++)
    v[V] = {
      box: ze(g[V]),
      cnt: 0
    };
  let m = 0;
  for (const V of o)
    for (const C of Object.keys(v)) {
      const M = v[C].box;
      if (l1(Me(V), M)) {
        v[C].cnt += 1, m += 1;
        break;
      }
    }
  let p = 0;
  for (const V of Object.keys(v)) {
    const C = v[V].cnt;
    C > p && (p = C);
  }
  const _ = [], w = Object.keys(v).length, k = m / w;
  let L = 0;
  for (let V = 0; V < p + 1; V++)
    L += Math.exp(-k) * Math.pow(k, V) / c1(V), _.push(L);
  const b = [];
  let I = 0;
  for (let V = 0; V < p + 1; V++) {
    for (const M of Object.keys(v))
      v[M].cnt === V && (I += 1);
    const C = I / w;
    b.push(C);
  }
  let N = 0;
  for (let V = 0; V < p + 1; V++) {
    const C = Math.abs(
      _[V] - b[V]
    );
    C > N && (N = C);
  }
  const O = u1[r] / Math.sqrt(w), Y = {
    criticalValue: O,
    isRandom: !0,
    maxAbsoluteDifference: N,
    observedDistribution: b
  };
  return N > O && (Y.isRandom = !1), Y;
}
var u1 = {
  20: 1.07275,
  15: 1.13795,
  10: 1.22385,
  5: 1.3581,
  2: 1.51743,
  1: 1.62762
};
function l1(n, e) {
  return e[0] <= n[0] && e[1] <= n[1] && e[2] >= n[0] && e[3] >= n[1];
}
function c1(n) {
  const e = [];
  function t(r) {
    return r === 0 || r === 1 ? 1 : e[r] > 0 ? e[r] : e[r] = t(r - 1) * r;
  }
  return t(n);
}
function hf(n) {
  return Cs(n), Es(n);
}
function Es(n) {
  return Array.isArray(n) ? jl(n) : n && n.bbox ? jl(n.bbox) : [f1(), g1()];
}
function Cs(n) {
  n != null && (Array.isArray(n) ? Hr(n) : n.bbox != null && Hr(n.bbox));
}
function ff(n, e = {}) {
  Cs(e.bbox), n == null && (n = 1);
  const t = [];
  for (let r = 0; r < n; r++)
    t.push(de(Es(e.bbox)));
  return ce(t);
}
function gf(n, e = {}) {
  Cs(e.bbox), n == null && (n = 1), (e.bbox === void 0 || e.bbox === null) && (e.bbox = [-180, -90, 180, 90]), (!et(e.num_vertices) || e.num_vertices === void 0) && (e.num_vertices = 10), (!et(e.max_radial_length) || e.max_radial_length === void 0) && (e.max_radial_length = 10);
  const t = Math.abs(e.bbox[0] - e.bbox[2]), r = Math.abs(e.bbox[1] - e.bbox[3]), o = Math.min(t / 2, r / 2);
  if (e.max_radial_length > o)
    throw new Error("max_radial_length is greater than the radius of the bbox");
  const a = [
    e.bbox[0] + e.max_radial_length,
    e.bbox[1] + e.max_radial_length,
    e.bbox[2] - e.max_radial_length,
    e.bbox[3] - e.max_radial_length
  ], u = [];
  for (let c = 0; c < n; c++) {
    let f = [];
    const g = [...Array(e.num_vertices + 1)].map(Math.random);
    g.forEach((v, m, p) => {
      p[m] = m > 0 ? v + p[m - 1] : v;
    }), g.forEach((v) => {
      v = v * 2 * Math.PI / g[g.length - 1];
      const m = Math.random();
      f.push([
        m * (e.max_radial_length || 10) * Math.sin(v),
        m * (e.max_radial_length || 10) * Math.cos(v)
      ]);
    }), f[f.length - 1] = f[0], f = f.reverse().map(h1(Es(a))), u.push(ye([f]));
  }
  return ce(u);
}
function df(n, e = {}) {
  if (e = e || {}, !Oe(e))
    throw new Error("options is invalid");
  const t = e.bbox;
  Cs(t);
  let r = e.num_vertices, o = e.max_length, a = e.max_rotation;
  n == null && (n = 1), (!et(r) || r === void 0 || r < 2) && (r = 10), (!et(o) || o === void 0) && (o = 1e-4), (!et(a) || a === void 0) && (a = Math.PI / 8);
  const u = [];
  for (let c = 0; c < n; c++) {
    const g = [Es(t)];
    for (let v = 0; v < r - 1; v++) {
      const p = (v === 0 ? Math.random() * 2 * Math.PI : Math.tan(
        (g[v][1] - g[v - 1][1]) / (g[v][0] - g[v - 1][0])
      )) + (Math.random() - 0.5) * a * 2, _ = Math.random() * o;
      g.push([
        g[v][0] + _ * Math.cos(p),
        g[v][1] + _ * Math.sin(p)
      ]);
    }
    u.push(Se(g));
  }
  return ce(u);
}
function h1(n) {
  return (e) => [e[0] + n[0], e[1] + n[1]];
}
function mf() {
  return Math.random() - 0.5;
}
function f1() {
  return mf() * 360;
}
function g1() {
  return mf() * 180;
}
function jl(n) {
  return [
    Math.random() * (n[2] - n[0]) + n[0],
    Math.random() * (n[3] - n[1]) + n[1]
  ];
}
const d1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  randomLineString: df,
  randomPoint: ff,
  randomPolygon: gf,
  randomPosition: hf
}, Symbol.toStringTag, { value: "Module" }));
function m1(n, e = {}) {
  var t, r;
  if (e = e || {}, !Oe(e)) throw new Error("options is invalid");
  const o = (t = e.mutate) != null ? t : !1, a = (r = e.reverse) != null ? r : !1;
  if (!n) throw new Error("<geojson> is required");
  if (typeof a != "boolean")
    throw new Error("<reverse> must be a boolean");
  if (typeof o != "boolean")
    throw new Error("<mutate> must be a boolean");
  !o && n.type !== "Point" && n.type !== "MultiPoint" && (n = nt(n));
  const u = [];
  switch (n.type) {
    case "GeometryCollection":
      return at(n, function(c) {
        Wi(c, a);
      }), n;
    case "FeatureCollection":
      return Le(n, function(c) {
        const f = Wi(c, a);
        Le(f, function(g) {
          u.push(g);
        });
      }), ce(u);
  }
  return Wi(n, a);
}
function Wi(n, e) {
  switch (n.type === "Feature" ? n.geometry.type : n.type) {
    case "GeometryCollection":
      return at(n, function(r) {
        Wi(r, e);
      }), n;
    case "LineString":
      return ec(me(n), e), n;
    case "Polygon":
      return tc(me(n), e), n;
    case "MultiLineString":
      return me(n).forEach(function(r) {
        ec(r, e);
      }), n;
    case "MultiPolygon":
      return me(n).forEach(function(r) {
        tc(r, e);
      }), n;
    case "Point":
    case "MultiPoint":
      return n;
  }
}
function ec(n, e) {
  Ki(n) === e && n.reverse();
}
function tc(n, e) {
  Ki(n[0]) !== e && n[0].reverse();
  for (let t = 1; t < n.length; t++)
    Ki(n[t]) === e && n[t].reverse();
}
function v1(n, e) {
  if (!n) throw new Error("fc is required");
  if (e == null) throw new Error("num is required");
  if (typeof e != "number") throw new Error("num must be a number");
  var t = ce(y1(n.features, e));
  return t;
}
function y1(n, e) {
  for (var t = n.slice(0), r = n.length, o = r - e, a, u; r-- > o; )
    u = Math.floor((r + 1) * Math.random()), a = t[u], t[u] = t[r], t[r] = a;
  return t.slice(o);
}
function p1(n, e, t, r, o = {}) {
  if (o = o || {}, !Oe(o)) throw new Error("options is invalid");
  const a = o.properties;
  if (!n) throw new Error("center is required");
  if (t == null)
    throw new Error("bearing1 is required");
  if (r == null)
    throw new Error("bearing2 is required");
  if (!e) throw new Error("radius is required");
  if (typeof o != "object") throw new Error("options must be an object");
  if (nc(t) === nc(r))
    return ga(n, e, o);
  const u = me(n), c = ef(n, e, t, r, o), f = [[u]];
  return He(c, function(g) {
    f[0].push(g);
  }), f[0].push(u), ye(f, a);
}
function nc(n) {
  let e = n % 360;
  return e < 0 && (e += 360), e;
}
function vf(n, e, t) {
  if (t = t || {}, !Oe(t)) throw new Error("options is invalid");
  const r = t.origin || "centroid", o = t.mutate || !1;
  if (!n) throw new Error("geojson required");
  if (typeof e != "number" || e <= 0)
    throw new Error("invalid factor");
  const a = Array.isArray(r) || typeof r == "object";
  return o !== !0 && (n = nt(n)), n.type === "FeatureCollection" && !a ? (Le(n, function(u, c) {
    n.features[c] = rc(
      u,
      e,
      r
    );
  }), e !== 1 && delete n.bbox, n) : rc(n, e, r);
}
function rc(n, e, t) {
  const r = xt(n) === "Point", o = _1(n, t);
  return e === 1 || r || (He(n, function(a) {
    const u = ir(o, a), c = Dn(o, a), f = u * e, g = me(
      _s(o, f, c)
    );
    a[0] = g[0], a[1] = g[1], a.length === 3 && (a[2] *= e);
  }), _n(n)), n;
}
function _1(n, e) {
  if (e == null && (e = "centroid"), Array.isArray(e) || typeof e == "object")
    return Me(e);
  const t = n.bbox ? n.bbox : ze(n, { recompute: !0 }), r = t[0], o = t[1], a = t[2], u = t[3];
  switch (e) {
    case "sw":
    case "southwest":
    case "westsouth":
    case "bottomleft":
      return de([r, o]);
    case "se":
    case "southeast":
    case "eastsouth":
    case "bottomright":
      return de([a, o]);
    case "nw":
    case "northwest":
    case "westnorth":
    case "topleft":
      return de([r, u]);
    case "ne":
    case "northeast":
    case "eastnorth":
    case "topright":
      return de([a, u]);
    case "center":
      return ms(n);
    case void 0:
    case null:
    case "centroid":
      return Dt(n);
    default:
      throw new Error("invalid origin");
  }
}
function ic(n) {
  for (var e = n, t = []; e.parent; )
    t.unshift(e), e = e.parent;
  return t;
}
function w1() {
  return new C1(function(n) {
    return n.f;
  });
}
var as = {
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
  search: function(n, e, t, r = {}) {
    var o;
    n.cleanDirty(), r = r || {};
    var a = as.heuristics.manhattan, u = (o = r.closest) != null ? o : !1, c = w1(), f = e;
    for (e.h = a(e, t), c.push(e); c.size() > 0; ) {
      var g = c.pop();
      if (g === t)
        return ic(g);
      g.closed = !0;
      for (var v = n.neighbors(g), m = 0, p = v.length; m < p; ++m) {
        var _ = v[m];
        if (!(_.closed || _.isWall())) {
          var w = g.g + _.getCost(g), k = _.visited;
          (!k || w < _.g) && (_.visited = !0, _.parent = g, _.h = _.h || a(_, t), _.g = w, _.f = _.g + _.h, n.markDirty(_), u && (_.h < f.h || _.h === f.h && _.g < f.g) && (f = _), k ? c.rescoreElement(_) : c.push(_));
        }
      }
    }
    return u ? ic(f) : [];
  },
  // See list of heuristics: http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
  heuristics: {
    manhattan: function(n, e) {
      var t = Math.abs(e.x - n.x), r = Math.abs(e.y - n.y);
      return t + r;
    },
    diagonal: function(n, e) {
      var t = 1, r = Math.sqrt(2), o = Math.abs(e.x - n.x), a = Math.abs(e.y - n.y);
      return t * (o + a) + (r - 2 * t) * Math.min(o, a);
    }
  },
  cleanNode: function(n) {
    n.f = 0, n.g = 0, n.h = 0, n.visited = !1, n.closed = !1, n.parent = void 0;
  }
}, x1 = class {
  constructor(n, e = {}) {
    this.nodes = [], this.grid = [], this.dirtyNodes = [], this.diagonal = !!e.diagonal;
    for (var t = 0; t < n.length; t++) {
      this.grid[t] = [];
      for (var r = 0, o = n[t]; r < o.length; r++) {
        var a = new E1(t, r, o[r]);
        this.grid[t][r] = a, this.nodes.push(a);
      }
    }
    this.init();
  }
  init() {
    this.dirtyNodes = [];
    for (var n = 0; n < this.nodes.length; n++)
      as.cleanNode(this.nodes[n]);
  }
  cleanDirty() {
    for (var n = 0; n < this.dirtyNodes.length; n++)
      as.cleanNode(this.dirtyNodes[n]);
    this.dirtyNodes = [];
  }
  markDirty(n) {
    this.dirtyNodes.push(n);
  }
  neighbors(n) {
    var e = [], t = n.x, r = n.y, o = this.grid;
    return o[t - 1] && o[t - 1][r] && e.push(o[t - 1][r]), o[t + 1] && o[t + 1][r] && e.push(o[t + 1][r]), o[t] && o[t][r - 1] && e.push(o[t][r - 1]), o[t] && o[t][r + 1] && e.push(o[t][r + 1]), this.diagonal && (o[t - 1] && o[t - 1][r - 1] && e.push(o[t - 1][r - 1]), o[t + 1] && o[t + 1][r - 1] && e.push(o[t + 1][r - 1]), o[t - 1] && o[t - 1][r + 1] && e.push(o[t - 1][r + 1]), o[t + 1] && o[t + 1][r + 1] && e.push(o[t + 1][r + 1])), e;
  }
  toString() {
    for (var n = [], e = this.grid, t, r, o, a, u = 0, c = e.length; u < c; u++) {
      for (t = [], r = e[u], o = 0, a = r.length; o < a; o++)
        t.push(r[o].weight);
      n.push(t.join(" "));
    }
    return n.join(`
`);
  }
}, E1 = class {
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
}, C1 = class {
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
      var t = (n + 1 >> 1) - 1, r = this.content[t];
      if (this.scoreFunction(e) < this.scoreFunction(r))
        this.content[t] = e, this.content[n] = r, n = t;
      else
        break;
    }
  }
  bubbleUp(n) {
    for (var e = this.content.length, t = this.content[n], r = this.scoreFunction(t); ; ) {
      var o = n + 1 << 1, a = o - 1, u = null, c;
      if (a < e) {
        var f = this.content[a];
        c = this.scoreFunction(f), c < r && (u = a);
      }
      if (o < e) {
        var g = this.content[o], v = this.scoreFunction(g);
        v < (u === null ? r : c) && (u = o);
      }
      if (u !== null)
        this.content[n] = this.content[u], this.content[u] = t, n = u;
      else
        break;
    }
  }
};
function k1(n, e, t = {}) {
  if (t = t || {}, !Oe(t)) throw new Error("options is invalid");
  let r = t.obstacles || ce([]), o = t.resolution || 100;
  if (!n) throw new Error("start is required");
  if (!e) throw new Error("end is required");
  if (!et(o) || o <= 0)
    throw new Error("options.resolution must be a number, greater than 0");
  const a = Me(n), u = Me(e);
  if (n = de(a), e = de(u), r.type === "FeatureCollection") {
    if (r.features.length === 0)
      return Se([a, u]);
  } else if (r.type === "Feature" && r.geometry.type === "Polygon")
    r = ce([r]);
  else if (r.type === "Polygon")
    r = ce([Je(Ye(r))]);
  else
    throw new Error("invalid obstacles");
  const c = r;
  c.features.push(n), c.features.push(e);
  const f = ze(vf(ai(ze(c)), 1.15)), [g, v, m, p] = f;
  c.features.pop(), c.features.pop();
  const _ = qe([g, v], [m, v], t) / o, w = (m - g) / _, k = qe([g, v], [g, p], t) / o, L = (p - v) / k, b = _ % 1 * w / 2, I = k % 1 * L / 2, N = [], A = [];
  let O, Y, V = 1 / 0, C = 1 / 0, M = p - I, T = 0;
  for (; M >= v; ) {
    const U = [], G = [];
    let H = g + b, J = 0;
    for (; H <= m; ) {
      const W = de([H, M]), j = I1(W, r);
      U.push(j ? 0 : 1), G.push(H + "|" + M);
      const Q = qe(W, n);
      !j && Q < V && (V = Q, O = { x: J, y: T });
      const re = qe(W, e);
      !j && re < C && (C = re, Y = { x: J, y: T }), H += w, J++;
    }
    A.push(U), N.push(G), M -= L, T++;
  }
  const D = new x1(A, { diagonal: !0 }), B = D.grid[O.y][O.x], q = D.grid[Y.y][Y.x], X = as.search(D, B, q), R = [a];
  return X.forEach(function(U) {
    const G = N[U.x][U.y].split("|");
    R.push([+G[0], +G[1]]);
  }), R.push(u), Fn(Se(R));
}
function I1(n, e) {
  for (let t = 0; t < e.features.length; t++)
    if (xe(n, e.features[t]))
      return !0;
  return !1;
}
function S1(n, e) {
  var t = n[0] - e[0], r = n[1] - e[1];
  return t * t + r * r;
}
function b1(n, e, t) {
  var r = e[0], o = e[1], a = t[0] - r, u = t[1] - o;
  if (a !== 0 || u !== 0) {
    var c = ((n[0] - r) * a + (n[1] - o) * u) / (a * a + u * u);
    c > 1 ? (r = t[0], o = t[1]) : c > 0 && (r += a * c, o += u * c);
  }
  return a = n[0] - r, u = n[1] - o, a * a + u * u;
}
function M1(n, e) {
  for (var t = n[0], r = [t], o, a = 1, u = n.length; a < u; a++)
    o = n[a], S1(o, t) > e && (r.push(o), t = o);
  return t !== o && r.push(o), r;
}
function Go(n, e, t, r, o) {
  for (var a = r, u, c = e + 1; c < t; c++) {
    var f = b1(n[c], n[e], n[t]);
    f > a && (u = c, a = f);
  }
  a > r && (u - e > 1 && Go(n, e, u, r, o), o.push(n[u]), t - u > 1 && Go(n, u, t, r, o));
}
function L1(n, e) {
  var t = n.length - 1, r = [n[0]];
  return Go(n, 0, t, e, r), r.push(n[t]), r;
}
function us(n, e, t) {
  if (n.length <= 2) return n;
  var r = e !== void 0 ? e * e : 1;
  return n = t ? n : M1(n, r), n = L1(n, r), n;
}
function P1(n, e = {}) {
  var t, r, o;
  if (e = e ?? {}, !Oe(e)) throw new Error("options is invalid");
  const a = (t = e.tolerance) != null ? t : 1, u = (r = e.highQuality) != null ? r : !1, c = (o = e.mutate) != null ? o : !1;
  if (!n) throw new Error("geojson is required");
  if (a && a < 0) throw new Error("invalid tolerance");
  return c !== !0 && (n = nt(n)), at(n, function(f) {
    N1(f, a, u);
  }), n;
}
function N1(n, e, t) {
  const r = n.type;
  if (r === "Point" || r === "MultiPoint") return n;
  if (Fn(n, { mutate: !0 }), r !== "GeometryCollection")
    switch (r) {
      case "LineString":
        n.coordinates = us(
          n.coordinates,
          e,
          t
        );
        break;
      case "MultiLineString":
        n.coordinates = n.coordinates.map(
          (o) => us(o, e, t)
        );
        break;
      case "Polygon":
        n.coordinates = sc(
          n.coordinates,
          e,
          t
        );
        break;
      case "MultiPolygon":
        n.coordinates = n.coordinates.map(
          (o) => sc(o, e, t)
        );
    }
  return n;
}
function sc(n, e, t) {
  return n.map(function(r) {
    if (r.length < 4)
      throw new Error("invalid polygon");
    let o = e, a = us(r, o, t);
    for (; !oc(a) && o >= Number.EPSILON; )
      o -= o * 0.01, a = us(r, o, t);
    return oc(a) ? ((a[a.length - 1][0] !== a[0][0] || a[a.length - 1][1] !== a[0][1]) && a.push(a[0]), a) : r;
  });
}
function oc(n) {
  return n.length < 3 ? !1 : !(n.length === 3 && n[2][0] === n[0][0] && n[2][1] === n[0][1]);
}
function T1(n) {
  var e = n[0], t = n[1], r = n[2], o = n[3], a = qe(n.slice(0, 2), [r, t]), u = qe(n.slice(0, 2), [e, o]);
  if (a >= u) {
    var c = (t + o) / 2;
    return [
      e,
      c - (r - e) / 2,
      r,
      c + (r - e) / 2
    ];
  } else {
    var f = (e + r) / 2;
    return [
      f - (o - t) / 2,
      t,
      f + (o - t) / 2,
      o
    ];
  }
}
function R1(n, e) {
  var t;
  if (e = e || {}, !Oe(e)) throw new Error("options is invalid");
  const r = e.steps || 64, o = e.weight, a = e.properties || {};
  if (!et(r)) throw new Error("steps must be a number");
  if (!Oe(a)) throw new Error("properties must be a number");
  const u = $r(n).length, c = ha(n, { weight: o });
  let f = 0, g = 0, v = 0;
  Le(n, function(C) {
    var M;
    const T = o && ((M = C.properties) == null ? void 0 : M[o]) || 1, D = ac(me(C), me(c));
    f += Math.pow(D.x, 2) * T, g += Math.pow(D.y, 2) * T, v += D.x * D.y * T;
  });
  const m = f - g, p = Math.sqrt(Math.pow(m, 2) + 4 * Math.pow(v, 2)), _ = 2 * v, w = Math.atan((m + p) / _), k = w * 180 / Math.PI;
  let L = 0, b = 0, I = 0;
  Le(n, function(C) {
    var M;
    const T = o && ((M = C.properties) == null ? void 0 : M[o]) || 1, D = ac(me(C), me(c));
    L += Math.pow(
      D.x * Math.cos(w) - D.y * Math.sin(w),
      2
    ) * T, b += Math.pow(
      D.x * Math.sin(w) + D.y * Math.cos(w),
      2
    ) * T, I += T;
  });
  const N = Math.sqrt(2 * L / I), A = Math.sqrt(2 * b / I), O = $h(c, N, A, {
    units: "degrees",
    angle: k,
    steps: r,
    properties: a
  }), Y = rf(
    n,
    ce([O])
  ), V = {
    meanCenterCoordinates: me(c),
    semiMajorAxis: N,
    semiMinorAxis: A,
    numberOfFeatures: u,
    angle: k,
    percentageWithinEllipse: 100 * $r(Y).length / u
  };
  return O.properties = (t = O.properties) != null ? t : {}, O.properties.standardDeviationalEllipse = V, O;
}
function ac(n, e) {
  return {
    x: n[0] - e[0],
    y: n[1] - e[1]
  };
}
function A1(n, e, t, r) {
  return n = nt(n), e = nt(e), Le(n, function(o) {
    o.properties || (o.properties = {}), Le(e, function(a) {
      o.properties && a.properties && o.properties[r] === void 0 && xe(o, a) && (o.properties[r] = a.properties[t]);
    });
  }), n;
}
var Sa = { exports: {} };
Sa.exports = ks;
Sa.exports.default = ks;
function ks(n, e, t) {
  t = t || 2;
  var r = e && e.length, o = r ? e[0] * t : n.length, a = yf(n, 0, o, t, !0), u = [];
  if (!a || a.next === a.prev) return u;
  var c, f, g, v, m, p, _;
  if (r && (a = G1(n, e, a, t)), n.length > 80 * t) {
    c = g = n[0], f = v = n[1];
    for (var w = t; w < o; w += t)
      m = n[w], p = n[w + 1], m < c && (c = m), p < f && (f = p), m > g && (g = m), p > v && (v = p);
    _ = Math.max(g - c, v - f), _ = _ !== 0 ? 32767 / _ : 0;
  }
  return jr(a, u, t, c, f, _, 0), u;
}
function yf(n, e, t, r, o) {
  var a, u;
  if (o === Uo(n, e, t, r) > 0)
    for (a = e; a < t; a += r) u = uc(a, n[a], n[a + 1], u);
  else
    for (a = t - r; a >= e; a -= r) u = uc(a, n[a], n[a + 1], u);
  return u && Is(u, u.next) && (ti(u), u = u.next), u;
}
function Bn(n, e) {
  if (!n) return n;
  e || (e = n);
  var t = n, r;
  do
    if (r = !1, !t.steiner && (Is(t, t.next) || Ke(t.prev, t, t.next) === 0)) {
      if (ti(t), t = e = t.prev, t === t.next) break;
      r = !0;
    } else
      t = t.next;
  while (r || t !== e);
  return e;
}
function jr(n, e, t, r, o, a, u) {
  if (n) {
    !u && a && X1(n, r, o, a);
    for (var c = n, f, g; n.prev !== n.next; ) {
      if (f = n.prev, g = n.next, a ? D1(n, r, o, a) : O1(n)) {
        e.push(f.i / t | 0), e.push(n.i / t | 0), e.push(g.i / t | 0), ti(n), n = g.next, c = g.next;
        continue;
      }
      if (n = g, n === c) {
        u ? u === 1 ? (n = F1(Bn(n), e, t), jr(n, e, t, r, o, a, 2)) : u === 2 && B1(n, e, t, r, o, a) : jr(Bn(n), e, t, r, o, a, 1);
        break;
      }
    }
  }
}
function O1(n) {
  var e = n.prev, t = n, r = n.next;
  if (Ke(e, t, r) >= 0) return !1;
  for (var o = e.x, a = t.x, u = r.x, c = e.y, f = t.y, g = r.y, v = o < a ? o < u ? o : u : a < u ? a : u, m = c < f ? c < g ? c : g : f < g ? f : g, p = o > a ? o > u ? o : u : a > u ? a : u, _ = c > f ? c > g ? c : g : f > g ? f : g, w = r.next; w !== e; ) {
    if (w.x >= v && w.x <= p && w.y >= m && w.y <= _ && tr(o, c, a, f, u, g, w.x, w.y) && Ke(w.prev, w, w.next) >= 0) return !1;
    w = w.next;
  }
  return !0;
}
function D1(n, e, t, r) {
  var o = n.prev, a = n, u = n.next;
  if (Ke(o, a, u) >= 0) return !1;
  for (var c = o.x, f = a.x, g = u.x, v = o.y, m = a.y, p = u.y, _ = c < f ? c < g ? c : g : f < g ? f : g, w = v < m ? v < p ? v : p : m < p ? m : p, k = c > f ? c > g ? c : g : f > g ? f : g, L = v > m ? v > p ? v : p : m > p ? m : p, b = qo(_, w, e, t, r), I = qo(k, L, e, t, r), N = n.prevZ, A = n.nextZ; N && N.z >= b && A && A.z <= I; ) {
    if (N.x >= _ && N.x <= k && N.y >= w && N.y <= L && N !== o && N !== u && tr(c, v, f, m, g, p, N.x, N.y) && Ke(N.prev, N, N.next) >= 0 || (N = N.prevZ, A.x >= _ && A.x <= k && A.y >= w && A.y <= L && A !== o && A !== u && tr(c, v, f, m, g, p, A.x, A.y) && Ke(A.prev, A, A.next) >= 0)) return !1;
    A = A.nextZ;
  }
  for (; N && N.z >= b; ) {
    if (N.x >= _ && N.x <= k && N.y >= w && N.y <= L && N !== o && N !== u && tr(c, v, f, m, g, p, N.x, N.y) && Ke(N.prev, N, N.next) >= 0) return !1;
    N = N.prevZ;
  }
  for (; A && A.z <= I; ) {
    if (A.x >= _ && A.x <= k && A.y >= w && A.y <= L && A !== o && A !== u && tr(c, v, f, m, g, p, A.x, A.y) && Ke(A.prev, A, A.next) >= 0) return !1;
    A = A.nextZ;
  }
  return !0;
}
function F1(n, e, t) {
  var r = n;
  do {
    var o = r.prev, a = r.next.next;
    !Is(o, a) && pf(o, r, r.next, a) && ei(o, a) && ei(a, o) && (e.push(o.i / t | 0), e.push(r.i / t | 0), e.push(a.i / t | 0), ti(r), ti(r.next), r = n = a), r = r.next;
  } while (r !== n);
  return Bn(r);
}
function B1(n, e, t, r, o, a) {
  var u = n;
  do {
    for (var c = u.next.next; c !== u.prev; ) {
      if (u.i !== c.i && W1(u, c)) {
        var f = _f(u, c);
        u = Bn(u, u.next), f = Bn(f, f.next), jr(u, e, t, r, o, a, 0), jr(f, e, t, r, o, a, 0);
        return;
      }
      c = c.next;
    }
    u = u.next;
  } while (u !== n);
}
function G1(n, e, t, r) {
  var o = [], a, u, c, f, g;
  for (a = 0, u = e.length; a < u; a++)
    c = e[a] * r, f = a < u - 1 ? e[a + 1] * r : n.length, g = yf(n, c, f, r, !1), g === g.next && (g.steiner = !0), o.push(H1(g));
  for (o.sort(q1), a = 0; a < o.length; a++)
    t = z1(o[a], t);
  return t;
}
function q1(n, e) {
  return n.x - e.x;
}
function z1(n, e) {
  var t = U1(n, e);
  if (!t)
    return e;
  var r = _f(t, n);
  return Bn(r, r.next), Bn(t, t.next);
}
function U1(n, e) {
  var t = e, r = n.x, o = n.y, a = -1 / 0, u;
  do {
    if (o <= t.y && o >= t.next.y && t.next.y !== t.y) {
      var c = t.x + (o - t.y) * (t.next.x - t.x) / (t.next.y - t.y);
      if (c <= r && c > a && (a = c, u = t.x < t.next.x ? t : t.next, c === r))
        return u;
    }
    t = t.next;
  } while (t !== e);
  if (!u) return null;
  var f = u, g = u.x, v = u.y, m = 1 / 0, p;
  t = u;
  do
    r >= t.x && t.x >= g && r !== t.x && tr(o < v ? r : a, o, g, v, o < v ? a : r, o, t.x, t.y) && (p = Math.abs(o - t.y) / (r - t.x), ei(t, n) && (p < m || p === m && (t.x > u.x || t.x === u.x && Y1(u, t))) && (u = t, m = p)), t = t.next;
  while (t !== f);
  return u;
}
function Y1(n, e) {
  return Ke(n.prev, n, e.prev) < 0 && Ke(e.next, n, n.next) < 0;
}
function X1(n, e, t, r) {
  var o = n;
  do
    o.z === 0 && (o.z = qo(o.x, o.y, e, t, r)), o.prevZ = o.prev, o.nextZ = o.next, o = o.next;
  while (o !== n);
  o.prevZ.nextZ = null, o.prevZ = null, V1(o);
}
function V1(n) {
  var e, t, r, o, a, u, c, f, g = 1;
  do {
    for (t = n, n = null, a = null, u = 0; t; ) {
      for (u++, r = t, c = 0, e = 0; e < g && (c++, r = r.nextZ, !!r); e++)
        ;
      for (f = g; c > 0 || f > 0 && r; )
        c !== 0 && (f === 0 || !r || t.z <= r.z) ? (o = t, t = t.nextZ, c--) : (o = r, r = r.nextZ, f--), a ? a.nextZ = o : n = o, o.prevZ = a, a = o;
      t = r;
    }
    a.nextZ = null, g *= 2;
  } while (u > 1);
  return n;
}
function qo(n, e, t, r, o) {
  return n = (n - t) * o | 0, e = (e - r) * o | 0, n = (n | n << 8) & 16711935, n = (n | n << 4) & 252645135, n = (n | n << 2) & 858993459, n = (n | n << 1) & 1431655765, e = (e | e << 8) & 16711935, e = (e | e << 4) & 252645135, e = (e | e << 2) & 858993459, e = (e | e << 1) & 1431655765, n | e << 1;
}
function H1(n) {
  var e = n, t = n;
  do
    (e.x < t.x || e.x === t.x && e.y < t.y) && (t = e), e = e.next;
  while (e !== n);
  return t;
}
function tr(n, e, t, r, o, a, u, c) {
  return (o - u) * (e - c) >= (n - u) * (a - c) && (n - u) * (r - c) >= (t - u) * (e - c) && (t - u) * (a - c) >= (o - u) * (r - c);
}
function W1(n, e) {
  return n.next.i !== e.i && n.prev.i !== e.i && !$1(n, e) && // dones't intersect other edges
  (ei(n, e) && ei(e, n) && Z1(n, e) && // locally visible
  (Ke(n.prev, n, e.prev) || Ke(n, e.prev, e)) || // does not create opposite-facing sectors
  Is(n, e) && Ke(n.prev, n, n.next) > 0 && Ke(e.prev, e, e.next) > 0);
}
function Ke(n, e, t) {
  return (e.y - n.y) * (t.x - e.x) - (e.x - n.x) * (t.y - e.y);
}
function Is(n, e) {
  return n.x === e.x && n.y === e.y;
}
function pf(n, e, t, r) {
  var o = qi(Ke(n, e, t)), a = qi(Ke(n, e, r)), u = qi(Ke(t, r, n)), c = qi(Ke(t, r, e));
  return !!(o !== a && u !== c || o === 0 && Gi(n, t, e) || a === 0 && Gi(n, r, e) || u === 0 && Gi(t, n, r) || c === 0 && Gi(t, e, r));
}
function Gi(n, e, t) {
  return e.x <= Math.max(n.x, t.x) && e.x >= Math.min(n.x, t.x) && e.y <= Math.max(n.y, t.y) && e.y >= Math.min(n.y, t.y);
}
function qi(n) {
  return n > 0 ? 1 : n < 0 ? -1 : 0;
}
function $1(n, e) {
  var t = n;
  do {
    if (t.i !== n.i && t.next.i !== n.i && t.i !== e.i && t.next.i !== e.i && pf(t, t.next, n, e)) return !0;
    t = t.next;
  } while (t !== n);
  return !1;
}
function ei(n, e) {
  return Ke(n.prev, n, n.next) < 0 ? Ke(n, e, n.next) >= 0 && Ke(n, n.prev, e) >= 0 : Ke(n, e, n.prev) < 0 || Ke(n, n.next, e) < 0;
}
function Z1(n, e) {
  var t = n, r = !1, o = (n.x + e.x) / 2, a = (n.y + e.y) / 2;
  do
    t.y > a != t.next.y > a && t.next.y !== t.y && o < (t.next.x - t.x) * (a - t.y) / (t.next.y - t.y) + t.x && (r = !r), t = t.next;
  while (t !== n);
  return r;
}
function _f(n, e) {
  var t = new zo(n.i, n.x, n.y), r = new zo(e.i, e.x, e.y), o = n.next, a = e.prev;
  return n.next = e, e.prev = n, t.next = o, o.prev = t, r.next = t, t.prev = r, a.next = r, r.prev = a, r;
}
function uc(n, e, t, r) {
  var o = new zo(n, e, t);
  return r ? (o.next = r.next, o.prev = r, r.next.prev = o, r.next = o) : (o.prev = o, o.next = o), o;
}
function ti(n) {
  n.next.prev = n.prev, n.prev.next = n.next, n.prevZ && (n.prevZ.nextZ = n.nextZ), n.nextZ && (n.nextZ.prevZ = n.prevZ);
}
function zo(n, e, t) {
  this.i = n, this.x = e, this.y = t, this.prev = null, this.next = null, this.z = 0, this.prevZ = null, this.nextZ = null, this.steiner = !1;
}
ks.deviation = function(n, e, t, r) {
  var o = e && e.length, a = o ? e[0] * t : n.length, u = Math.abs(Uo(n, 0, a, t));
  if (o)
    for (var c = 0, f = e.length; c < f; c++) {
      var g = e[c] * t, v = c < f - 1 ? e[c + 1] * t : n.length;
      u -= Math.abs(Uo(n, g, v, t));
    }
  var m = 0;
  for (c = 0; c < r.length; c += 3) {
    var p = r[c] * t, _ = r[c + 1] * t, w = r[c + 2] * t;
    m += Math.abs(
      (n[p] - n[w]) * (n[_ + 1] - n[p + 1]) - (n[p] - n[_]) * (n[w + 1] - n[p + 1])
    );
  }
  return u === 0 && m === 0 ? 0 : Math.abs((m - u) / u);
};
function Uo(n, e, t, r) {
  for (var o = 0, a = e, u = t - r; a < t; a += r)
    o += (n[u] - n[a]) * (n[a + 1] + n[u + 1]), u = a;
  return o;
}
ks.flatten = function(n) {
  for (var e = n[0][0].length, t = { vertices: [], holes: [], dimensions: e }, r = 0, o = 0; o < n.length; o++) {
    for (var a = 0; a < n[o].length; a++)
      for (var u = 0; u < e; u++) t.vertices.push(n[o][a][u]);
    o > 0 && (r += n[o - 1].length, t.holes.push(r));
  }
  return t;
};
var K1 = Sa.exports;
const J1 = /* @__PURE__ */ ci(K1);
function Q1(n) {
  if (!n.geometry || n.geometry.type !== "Polygon" && n.geometry.type !== "MultiPolygon")
    throw new Error("input must be a Polygon or MultiPolygon");
  const e = {
    type: "FeatureCollection",
    features: []
  };
  return n.geometry.type === "Polygon" ? e.features = lc(n.geometry.coordinates) : n.geometry.coordinates.forEach(function(t) {
    e.features = e.features.concat(lc(t));
  }), e;
}
function lc(n) {
  const e = j1(n), t = 3, r = J1(e.vertices, e.holes, t), o = [], a = [];
  r.forEach(function(c, f) {
    const g = r[f];
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
    const c = a.slice(u, u + 3);
    c.push(a[u]), o.push(ye([c]));
  }
  return o;
}
function j1(n) {
  const t = {
    vertices: [],
    holes: [],
    dimensions: 3
  };
  let r = 0;
  for (let o = 0; o < n.length; o++) {
    for (let a = 0; a < n[o].length; a++)
      for (let u = 0; u < 3; u++) t.vertices.push(n[o][a][u]);
    o > 0 && (r += n[o - 1].length, t.holes.push(r));
  }
  return t;
}
function e_(n, e, t, r) {
  if (r = r || {}, !Oe(r)) throw new Error("options is invalid");
  var o = r.units, a = r.zTranslation, u = r.mutate;
  if (!n) throw new Error("geojson is required");
  if (e == null || isNaN(e))
    throw new Error("distance is required");
  if (a && typeof a != "number" && isNaN(a))
    throw new Error("zTranslation is not a number");
  if (a = a !== void 0 ? a : 0, e === 0 && a === 0) return n;
  if (t == null || isNaN(t))
    throw new Error("direction is required");
  return e < 0 && (e = -e, t = t + 180), (u === !1 || u === void 0) && (n = nt(n)), He(n, function(c) {
    var f = me(
      _s(c, e, t, { units: o })
    );
    c[0] = f[0], c[1] = f[1], a && c.length === 3 && (c[2] += a);
  }), _n(n), n;
}
function t_(n, e = {}) {
  const t = [];
  if (at(n, (o) => {
    t.push(o.coordinates);
  }), t.length < 2)
    throw new Error("Must have at least 2 geometries");
  const r = wn(t[0], ...t.slice(1));
  return r.length === 0 ? null : r.length === 1 ? ye(r[0], e.properties) : wt(r, e.properties);
}
function n_(n, e) {
  if (n.geometry.type !== "Polygon")
    throw new Error("The input feature must be a Polygon");
  for (var t = n.geometry.coordinates, r = [], o = {}, a = [], u = 0; u < t.length; u++)
    for (var c = 0; c < t[u].length - 1; c++)
      a.push(_(u, c));
  var f = new vr();
  f.load(a);
  for (var g = 0; g < t.length; g++)
    for (var v = 0; v < t[g].length - 1; v++) {
      var m = f.search(_(g, v));
      m.forEach(function(w) {
        var k = w.ring, L = w.edge;
        p(g, v, k, L);
      });
    }
  return r;
  function p(w, k, L, b) {
    var I = t[w][k], N = t[w][k + 1], A = t[L][b], O = t[L][b + 1], Y = r_(I, N, A, O);
    if (Y !== null) {
      var V, C;
      if (N[0] !== I[0] ? V = (Y[0] - I[0]) / (N[0] - I[0]) : V = (Y[1] - I[1]) / (N[1] - I[1]), O[0] !== A[0] ? C = (Y[0] - A[0]) / (O[0] - A[0]) : C = (Y[1] - A[1]) / (O[1] - A[1]), !(V >= 1 || V <= 0 || C >= 1 || C <= 0)) {
        var M = Y, T = !o[M.toString()];
        T && (o[M.toString()] = !0), e && r.push(
          e(
            Y,
            w,
            k,
            I,
            N,
            V,
            L,
            b,
            A,
            O,
            C,
            T
          )
        );
      }
    }
  }
  function _(w, k) {
    var L = t[w][k], b = t[w][k + 1], I, N, A, O;
    return L[0] < b[0] ? (I = L[0], N = b[0]) : (I = b[0], N = L[0]), L[1] < b[1] ? (A = L[1], O = b[1]) : (A = b[1], O = L[1]), {
      minX: I,
      minY: A,
      maxX: N,
      maxY: O,
      ring: w,
      edge: k
    };
  }
}
function r_(n, e, t, r) {
  if (Yr(n, t) || Yr(n, r) || Yr(e, t) || Yr(r, t))
    return null;
  var o = n[0], a = n[1], u = e[0], c = e[1], f = t[0], g = t[1], v = r[0], m = r[1], p = (o - u) * (g - m) - (a - c) * (f - v);
  if (p === 0) return null;
  var _ = ((o * c - a * u) * (f - v) - (o - u) * (f * m - g * v)) / p, w = ((o * c - a * u) * (g - m) - (a - c) * (f * m - g * v)) / p;
  return [_, w];
}
function Yr(n, e) {
  if (!n || !e || n.length !== e.length) return !1;
  for (var t = 0, r = n.length; t < r; t++)
    if (n[t] instanceof Array && e[t] instanceof Array) {
      if (!Yr(n[t], e[t])) return !1;
    } else if (n[t] !== e[t])
      return !1;
  return !0;
}
function i_(n) {
  if (n.type != "Feature")
    throw new Error("The input must a geojson object of type Feature");
  if (n.geometry === void 0 || n.geometry == null)
    throw new Error(
      "The input must a geojson object with a non-empty geometry"
    );
  if (n.geometry.type != "Polygon")
    throw new Error("The input must be a geojson Polygon");
  for (var e = n.geometry.coordinates.length, t = [], b = 0; b < e; b++) {
    var r = n.geometry.coordinates[b];
    Xr(r[0], r[r.length - 1]) || r.push(r[0]);
    for (var o = 0; o < r.length - 1; o++)
      t.push(r[o]);
  }
  if (!o_(t))
    throw new Error(
      "The input polygon may not have duplicate vertices (except for the first and last vertex of each ring)"
    );
  var a = t.length, u = n_(
    n,
    function(re, ee, te, se, fe, Z, Fe, _e, ae, z, be, Ne) {
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
        be,
        Ne
      ];
    }
  ), c = u.length;
  if (c == 0) {
    for (var Y = [], b = 0; b < e; b++)
      Y.push(
        ye([n.geometry.coordinates[b]], {
          parent: -1,
          winding: s_(n.geometry.coordinates[b])
        })
      );
    let re = ce(Y);
    return J(re), W(re), re;
  }
  for (var f = [], g = [], b = 0; b < e; b++) {
    f.push([]);
    for (var o = 0; o < n.geometry.coordinates[b].length - 1; o++)
      f[b].push([
        new cc(
          n.geometry.coordinates[b][nr(o + 1, n.geometry.coordinates[b].length - 1)],
          1,
          [b, o],
          [b, nr(o + 1, n.geometry.coordinates[b].length - 1)],
          void 0
        )
      ]), g.push(
        new hc(
          n.geometry.coordinates[b][o],
          [b, nr(o - 1, n.geometry.coordinates[b].length - 1)],
          [b, o],
          void 0,
          void 0,
          !1,
          !0
        )
      );
  }
  for (var b = 0; b < c; b++)
    f[u[b][1]][u[b][2]].push(
      new cc(
        u[b][0],
        u[b][5],
        [u[b][1], u[b][2]],
        [u[b][6], u[b][7]],
        void 0
      )
    ), u[b][11] && g.push(
      new hc(
        u[b][0],
        [u[b][1], u[b][2]],
        [u[b][6], u[b][7]],
        void 0,
        void 0,
        !0,
        !0
      )
    );
  for (var v = g.length, b = 0; b < f.length; b++)
    for (var o = 0; o < f[b].length; o++)
      f[b][o].sort(function(ee, te) {
        return ee.param < te.param ? -1 : 1;
      });
  for (var m = [], b = 0; b < v; b++)
    m.push({
      minX: g[b].coord[0],
      minY: g[b].coord[1],
      maxX: g[b].coord[0],
      maxY: g[b].coord[1],
      index: b
    });
  var p = new vr();
  p.load(m);
  for (var b = 0; b < f.length; b++)
    for (var o = 0; o < f[b].length; o++)
      for (var _ = 0; _ < f[b][o].length; _++) {
        let ee;
        _ == f[b][o].length - 1 ? ee = f[b][nr(o + 1, n.geometry.coordinates[b].length - 1)][0].coord : ee = f[b][o][_ + 1].coord;
        var w = p.search({
          minX: ee[0],
          minY: ee[1],
          maxX: ee[0],
          maxY: ee[1]
        })[0];
        f[b][o][_].nxtIsectAlongEdgeIn = w.index;
      }
  for (var b = 0; b < f.length; b++)
    for (var o = 0; o < f[b].length; o++)
      for (var _ = 0; _ < f[b][o].length; _++) {
        let te = f[b][o][_].coord;
        var w = p.search({
          minX: te[0],
          minY: te[1],
          maxX: te[0],
          maxY: te[1]
        })[0], k = w.index;
        k < a ? g[k].nxtIsectAlongRingAndEdge2 = f[b][o][_].nxtIsectAlongEdgeIn : Xr(
          g[k].ringAndEdge1,
          f[b][o][_].ringAndEdgeIn
        ) ? g[k].nxtIsectAlongRingAndEdge1 = f[b][o][_].nxtIsectAlongEdgeIn : g[k].nxtIsectAlongRingAndEdge2 = f[b][o][_].nxtIsectAlongEdgeIn;
      }
  for (var L = [], b = 0, o = 0; o < e; o++) {
    for (var I = b, _ = 0; _ < n.geometry.coordinates[o].length - 1; _++)
      g[b].coord[0] < g[I].coord[0] && (I = b), b++;
    for (var N = g[I].nxtIsectAlongRingAndEdge2, _ = 0; _ < g.length; _++)
      if (g[_].nxtIsectAlongRingAndEdge1 == I || g[_].nxtIsectAlongRingAndEdge2 == I) {
        var A = _;
        break;
      }
    var O = $i(
      [
        g[A].coord,
        g[I].coord,
        g[N].coord
      ],
      !0
    ) ? 1 : -1;
    L.push({ isect: I, parent: -1, winding: O });
  }
  L.sort(function(Q, re) {
    return g[Q.isect].coord > g[re.isect].coord ? -1 : 1;
  });
  for (var Y = []; L.length > 0; ) {
    var V = L.pop(), C = V.isect, M = V.parent, T = V.winding, D = Y.length, B = [g[C].coord], q = C;
    if (g[C].ringAndEdge1Walkable)
      var X = g[C].ringAndEdge1, R = g[C].nxtIsectAlongRingAndEdge1;
    else
      var X = g[C].ringAndEdge2, R = g[C].nxtIsectAlongRingAndEdge2;
    for (; !Xr(g[C].coord, g[R].coord); ) {
      B.push(g[R].coord);
      for (var U = void 0, b = 0; b < L.length; b++)
        if (L[b].isect == R) {
          U = b;
          break;
        }
      if (U != null && L.splice(U, 1), Xr(X, g[R].ringAndEdge1)) {
        if (X = g[R].ringAndEdge2, g[R].ringAndEdge2Walkable = !1, g[R].ringAndEdge1Walkable) {
          var G = {
            isect: R
          };
          $i(
            [
              g[q].coord,
              g[R].coord,
              g[g[R].nxtIsectAlongRingAndEdge2].coord
            ],
            T == 1
          ) ? (G.parent = M, G.winding = -T) : (G.parent = D, G.winding = T), L.push(G);
        }
        q = R, R = g[R].nxtIsectAlongRingAndEdge2;
      } else {
        if (X = g[R].ringAndEdge1, g[R].ringAndEdge1Walkable = !1, g[R].ringAndEdge2Walkable) {
          var G = {
            isect: R
          };
          $i(
            [
              g[q].coord,
              g[R].coord,
              g[g[R].nxtIsectAlongRingAndEdge1].coord
            ],
            T == 1
          ) ? (G.parent = M, G.winding = -T) : (G.parent = D, G.winding = T), L.push(G);
        }
        q = R, R = g[R].nxtIsectAlongRingAndEdge1;
      }
    }
    B.push(g[R].coord), Y.push(
      ye([B], {
        index: D,
        parent: M,
        winding: T,
        netWinding: void 0
      })
    );
  }
  let H = ce(Y);
  J(H), W(H);
  function J(Q) {
    for (var re = [], ee = 0; ee < Q.features.length; ee++)
      Q.features[ee].properties.parent == -1 && re.push(ee);
    if (re.length > 1)
      for (var ee = 0; ee < re.length; ee++) {
        for (var te = -1, se = 1 / 0, fe = 0; fe < Q.features.length; fe++)
          re[ee] != fe && xe(
            Q.features[re[ee]].geometry.coordinates[0][0],
            Q.features[fe],
            { ignoreBoundary: !0 }
          ) && oi(Q.features[fe]) < se && (te = fe);
        Q.features[re[ee]].properties.parent = te;
      }
  }
  function W(Q) {
    for (var re = 0; re < Q.features.length; re++)
      if (Q.features[re].properties.parent == -1) {
        var ee = Q.features[re].properties.winding;
        Q.features[re].properties.netWinding = ee, j(Q, re, ee);
      }
  }
  function j(Q, re, ee) {
    for (var te = 0; te < Q.features.length; te++)
      if (Q.features[te].properties.parent == re) {
        var se = ee + Q.features[te].properties.winding;
        Q.features[te].properties.netWinding = se, j(Q, te, se);
      }
  }
  return H;
}
var cc = class {
  // The next intersection when following the incomming edge (so not when following ringAndEdgeOut!)
  // Constructor for (ring- or intersection-) pseudo-vertices.
  constructor(n, e, t, r, o) {
    this.coord = n, this.param = e, this.ringAndEdgeIn = t, this.ringAndEdgeOut = r, this.nxtIsectAlongEdgeIn = o;
  }
}, hc = class {
  // Constructor for an intersection. There are two intersection-pseudo-vertices per self-intersection and one ring-pseudo-vertex per ring-vertex-intersection. Their labels 1 and 2 are not assigned a particular meaning but are permanent once given.
  constructor(n, e, t, r, o, a, u) {
    this.coord = n, this.ringAndEdge1 = e, this.ringAndEdge2 = t, this.nxtIsectAlongRingAndEdge1 = r, this.nxtIsectAlongRingAndEdge2 = o, this.ringAndEdge1Walkable = a, this.ringAndEdge2Walkable = u;
  }
};
function $i(n, e) {
  if (typeof e > "u" && (e = !0), n.length != 3)
    throw new Error("This function requires an array of three points [x,y]");
  var t = (n[1][0] - n[0][0]) * (n[2][1] - n[0][1]) - (n[1][1] - n[0][1]) * (n[2][0] - n[0][0]);
  return t >= 0 == e;
}
function s_(n) {
  for (var e = 0, t = 0; t < n.length - 1; t++)
    n[t][0] < n[e][0] && (e = t);
  if ($i(
    [
      n[nr(e - 1, n.length - 1)],
      n[e],
      n[nr(e + 1, n.length - 1)]
    ],
    !0
  ))
    var r = 1;
  else
    var r = -1;
  return r;
}
function Xr(n, e) {
  if (!n || !e || n.length != e.length) return !1;
  for (var t = 0, r = n.length; t < r; t++)
    if (n[t] instanceof Array && e[t] instanceof Array) {
      if (!Xr(n[t], e[t])) return !1;
    } else if (n[t] != e[t])
      return !1;
  return !0;
}
function nr(n, e) {
  return (n % e + e) % e;
}
function o_(n) {
  for (var e = {}, t = 1, r = 0, o = n.length; r < o; ++r) {
    if (Object.prototype.hasOwnProperty.call(e, n[r].toString())) {
      t = 0;
      break;
    }
    e[n[r].toString()] = 1;
  }
  return t;
}
function a_(n) {
  var e = [];
  return it(n, function(t) {
    t.geometry.type === "Polygon" && Le(i_(t), function(r) {
      e.push(ye(r.geometry.coordinates, t.properties));
    });
  }), ce(e);
}
function fc(n) {
  return function() {
    return n;
  };
}
function u_(n) {
  return n[0];
}
function l_(n) {
  return n[1];
}
function ls() {
  this._ = null;
}
function Ss(n) {
  n.U = // parent node
  n.C = // color - true for red, false for black
  n.L = // left node
  n.R = // right node
  n.P = // previous node
  n.N = null;
}
ls.prototype = {
  constructor: ls,
  insert: function(n, e) {
    var t, r, o;
    if (n) {
      if (e.P = n, e.N = n.N, n.N && (n.N.P = e), n.N = e, n.R) {
        for (n = n.R; n.L; ) n = n.L;
        n.L = e;
      } else
        n.R = e;
      t = n;
    } else this._ ? (n = gc(this._), e.P = null, e.N = n, n.P = n.L = e, t = n) : (e.P = e.N = null, this._ = e, t = null);
    for (e.L = e.R = null, e.U = t, e.C = !0, n = e; t && t.C; )
      r = t.U, t === r.L ? (o = r.R, o && o.C ? (t.C = o.C = !1, r.C = !0, n = r) : (n === t.R && (Nr(this, t), n = t, t = n.U), t.C = !1, r.C = !0, Tr(this, r))) : (o = r.L, o && o.C ? (t.C = o.C = !1, r.C = !0, n = r) : (n === t.L && (Tr(this, t), n = t, t = n.U), t.C = !1, r.C = !0, Nr(this, r))), t = n.U;
    this._.C = !1;
  },
  remove: function(n) {
    n.N && (n.N.P = n.P), n.P && (n.P.N = n.N), n.N = n.P = null;
    var e = n.U, t, r = n.L, o = n.R, a, u;
    if (r ? o ? a = gc(o) : a = r : a = o, e ? e.L === n ? e.L = a : e.R = a : this._ = a, r && o ? (u = a.C, a.C = n.C, a.L = r, r.U = a, a !== o ? (e = a.U, a.U = n.U, n = a.R, e.L = n, a.R = o, o.U = a) : (a.U = e, e = a, n = a.R)) : (u = n.C, n = a), n && (n.U = e), !u) {
      if (n && n.C) {
        n.C = !1;
        return;
      }
      do {
        if (n === this._) break;
        if (n === e.L) {
          if (t = e.R, t.C && (t.C = !1, e.C = !0, Nr(this, e), t = e.R), t.L && t.L.C || t.R && t.R.C) {
            (!t.R || !t.R.C) && (t.L.C = !1, t.C = !0, Tr(this, t), t = e.R), t.C = e.C, e.C = t.R.C = !1, Nr(this, e), n = this._;
            break;
          }
        } else if (t = e.L, t.C && (t.C = !1, e.C = !0, Tr(this, e), t = e.L), t.L && t.L.C || t.R && t.R.C) {
          (!t.L || !t.L.C) && (t.R.C = !1, t.C = !0, Nr(this, t), t = e.L), t.C = e.C, e.C = t.L.C = !1, Tr(this, e), n = this._;
          break;
        }
        t.C = !0, n = e, e = e.U;
      } while (!n.C);
      n && (n.C = !1);
    }
  }
};
function Nr(n, e) {
  var t = e, r = e.R, o = t.U;
  o ? o.L === t ? o.L = r : o.R = r : n._ = r, r.U = o, t.U = r, t.R = r.L, t.R && (t.R.U = t), r.L = t;
}
function Tr(n, e) {
  var t = e, r = e.L, o = t.U;
  o ? o.L === t ? o.L = r : o.R = r : n._ = r, r.U = o, t.U = r, t.L = r.R, t.L && (t.L.U = t), r.R = t;
}
function gc(n) {
  for (; n.L; ) n = n.L;
  return n;
}
function Vr(n, e, t, r) {
  var o = [null, null], a = ft.push(o) - 1;
  return o.left = n, o.right = e, t && cs(o, n, e, t), r && cs(o, e, n, r), St[n.index].halfedges.push(a), St[e.index].halfedges.push(a), o;
}
function Rr(n, e, t) {
  var r = [e, t];
  return r.left = n, r;
}
function cs(n, e, t, r) {
  !n[0] && !n[1] ? (n[0] = r, n.left = e, n.right = t) : n.left === t ? n[1] = r : n[0] = r;
}
function c_(n, e, t, r, o) {
  var a = n[0], u = n[1], c = a[0], f = a[1], g = u[0], v = u[1], m = 0, p = 1, _ = g - c, w = v - f, k;
  if (k = e - c, !(!_ && k > 0)) {
    if (k /= _, _ < 0) {
      if (k < m) return;
      k < p && (p = k);
    } else if (_ > 0) {
      if (k > p) return;
      k > m && (m = k);
    }
    if (k = r - c, !(!_ && k < 0)) {
      if (k /= _, _ < 0) {
        if (k > p) return;
        k > m && (m = k);
      } else if (_ > 0) {
        if (k < m) return;
        k < p && (p = k);
      }
      if (k = t - f, !(!w && k > 0)) {
        if (k /= w, w < 0) {
          if (k < m) return;
          k < p && (p = k);
        } else if (w > 0) {
          if (k > p) return;
          k > m && (m = k);
        }
        if (k = o - f, !(!w && k < 0)) {
          if (k /= w, w < 0) {
            if (k > p) return;
            k > m && (m = k);
          } else if (w > 0) {
            if (k < m) return;
            k < p && (p = k);
          }
          return !(m > 0) && !(p < 1) || (m > 0 && (n[0] = [c + m * _, f + m * w]), p < 1 && (n[1] = [c + p * _, f + p * w])), !0;
        }
      }
    }
  }
}
function h_(n, e, t, r, o) {
  var a = n[1];
  if (a) return !0;
  var u = n[0], c = n.left, f = n.right, g = c[0], v = c[1], m = f[0], p = f[1], _ = (g + m) / 2, w = (v + p) / 2, k, L;
  if (p === v) {
    if (_ < e || _ >= r) return;
    if (g > m) {
      if (!u) u = [_, t];
      else if (u[1] >= o) return;
      a = [_, o];
    } else {
      if (!u) u = [_, o];
      else if (u[1] < t) return;
      a = [_, t];
    }
  } else if (k = (g - m) / (p - v), L = w - k * _, k < -1 || k > 1)
    if (g > m) {
      if (!u) u = [(t - L) / k, t];
      else if (u[1] >= o) return;
      a = [(o - L) / k, o];
    } else {
      if (!u) u = [(o - L) / k, o];
      else if (u[1] < t) return;
      a = [(t - L) / k, t];
    }
  else if (v < p) {
    if (!u) u = [e, k * e + L];
    else if (u[0] >= r) return;
    a = [r, k * r + L];
  } else {
    if (!u) u = [r, k * r + L];
    else if (u[0] < e) return;
    a = [e, k * e + L];
  }
  return n[0] = u, n[1] = a, !0;
}
function f_(n, e, t, r) {
  for (var o = ft.length, a; o--; )
    (!h_(a = ft[o], n, e, t, r) || !c_(a, n, e, t, r) || !(Math.abs(a[0][0] - a[1][0]) > Ge || Math.abs(a[0][1] - a[1][1]) > Ge)) && delete ft[o];
}
function g_(n) {
  return St[n.index] = {
    site: n,
    halfedges: []
  };
}
function d_(n, e) {
  var t = n.site, r = e.left, o = e.right;
  return t === o && (o = r, r = t), o ? Math.atan2(o[1] - r[1], o[0] - r[0]) : (t === r ? (r = e[1], o = e[0]) : (r = e[0], o = e[1]), Math.atan2(r[0] - o[0], o[1] - r[1]));
}
function wf(n, e) {
  return e[+(e.left !== n.site)];
}
function m_(n, e) {
  return e[+(e.left === n.site)];
}
function v_() {
  for (var n = 0, e = St.length, t, r, o, a; n < e; ++n)
    if ((t = St[n]) && (a = (r = t.halfedges).length)) {
      var u = new Array(a), c = new Array(a);
      for (o = 0; o < a; ++o) u[o] = o, c[o] = d_(t, ft[r[o]]);
      for (u.sort(function(f, g) {
        return c[g] - c[f];
      }), o = 0; o < a; ++o) c[o] = r[u[o]];
      for (o = 0; o < a; ++o) r[o] = c[o];
    }
}
function y_(n, e, t, r) {
  var o = St.length, a, u, c, f, g, v, m, p, _, w, k, L, b = !0;
  for (a = 0; a < o; ++a)
    if (u = St[a]) {
      for (c = u.site, g = u.halfedges, f = g.length; f--; )
        ft[g[f]] || g.splice(f, 1);
      for (f = 0, v = g.length; f < v; )
        w = m_(u, ft[g[f]]), k = w[0], L = w[1], m = wf(u, ft[g[++f % v]]), p = m[0], _ = m[1], (Math.abs(k - p) > Ge || Math.abs(L - _) > Ge) && (g.splice(f, 0, ft.push(Rr(
          c,
          w,
          Math.abs(k - n) < Ge && r - L > Ge ? [n, Math.abs(p - n) < Ge ? _ : r] : Math.abs(L - r) < Ge && t - k > Ge ? [Math.abs(_ - r) < Ge ? p : t, r] : Math.abs(k - t) < Ge && L - e > Ge ? [t, Math.abs(p - t) < Ge ? _ : e] : Math.abs(L - e) < Ge && k - n > Ge ? [Math.abs(_ - e) < Ge ? p : n, e] : null
        )) - 1), ++v);
      v && (b = !1);
    }
  if (b) {
    var I, N, A, O = 1 / 0;
    for (a = 0, b = null; a < o; ++a)
      (u = St[a]) && (c = u.site, I = c[0] - n, N = c[1] - e, A = I * I + N * N, A < O && (O = A, b = u));
    if (b) {
      var Y = [n, e], V = [n, r], C = [t, r], M = [t, e];
      b.halfedges.push(
        ft.push(Rr(c = b.site, Y, V)) - 1,
        ft.push(Rr(c, V, C)) - 1,
        ft.push(Rr(c, C, M)) - 1,
        ft.push(Rr(c, M, Y)) - 1
      );
    }
  }
  for (a = 0; a < o; ++a)
    (u = St[a]) && (u.halfedges.length || delete St[a]);
}
var xf = [], ba;
function p_() {
  Ss(this), this.x = this.y = this.arc = this.site = this.cy = null;
}
function rr(n) {
  var e = n.P, t = n.N;
  if (!(!e || !t)) {
    var r = e.site, o = n.site, a = t.site;
    if (r !== a) {
      var u = o[0], c = o[1], f = r[0] - u, g = r[1] - c, v = a[0] - u, m = a[1] - c, p = 2 * (f * m - g * v);
      if (!(p >= -1e-12)) {
        var _ = f * f + g * g, w = v * v + m * m, k = (m * _ - g * w) / p, L = (f * w - v * _) / p, b = xf.pop() || new p_();
        b.arc = n, b.site = o, b.x = k + u, b.y = (b.cy = L + c) + Math.sqrt(k * k + L * L), n.circle = b;
        for (var I = null, N = ni._; N; )
          if (b.y < N.y || b.y === N.y && b.x <= N.x)
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
        ni.insert(I, b), I || (ba = b);
      }
    }
  }
}
function sr(n) {
  var e = n.circle;
  e && (e.P || (ba = e.N), ni.remove(e), xf.push(e), Ss(e), n.circle = null);
}
var Ef = [];
function __() {
  Ss(this), this.edge = this.site = this.circle = null;
}
function dc(n) {
  var e = Ef.pop() || new __();
  return e.site = n, e;
}
function yo(n) {
  sr(n), or.remove(n), Ef.push(n), Ss(n);
}
function w_(n) {
  var e = n.circle, t = e.x, r = e.cy, o = [t, r], a = n.P, u = n.N, c = [n];
  yo(n);
  for (var f = a; f.circle && Math.abs(t - f.circle.x) < Ge && Math.abs(r - f.circle.cy) < Ge; )
    a = f.P, c.unshift(f), yo(f), f = a;
  c.unshift(f), sr(f);
  for (var g = u; g.circle && Math.abs(t - g.circle.x) < Ge && Math.abs(r - g.circle.cy) < Ge; )
    u = g.N, c.push(g), yo(g), g = u;
  c.push(g), sr(g);
  var v = c.length, m;
  for (m = 1; m < v; ++m)
    g = c[m], f = c[m - 1], cs(g.edge, f.site, g.site, o);
  f = c[0], g = c[v - 1], g.edge = Vr(f.site, g.site, null, o), rr(f), rr(g);
}
function x_(n) {
  for (var e = n[0], t = n[1], r, o, a, u, c = or._; c; )
    if (a = Cf(c, t) - e, a > Ge) c = c.L;
    else if (u = e - E_(c, t), u > Ge) {
      if (!c.R) {
        r = c;
        break;
      }
      c = c.R;
    } else {
      a > -Ge ? (r = c.P, o = c) : u > -Ge ? (r = c, o = c.N) : r = o = c;
      break;
    }
  g_(n);
  var f = dc(n);
  if (or.insert(r, f), !(!r && !o)) {
    if (r === o) {
      sr(r), o = dc(r.site), or.insert(f, o), f.edge = o.edge = Vr(r.site, f.site), rr(r), rr(o);
      return;
    }
    if (!o) {
      f.edge = Vr(r.site, f.site);
      return;
    }
    sr(r), sr(o);
    var g = r.site, v = g[0], m = g[1], p = n[0] - v, _ = n[1] - m, w = o.site, k = w[0] - v, L = w[1] - m, b = 2 * (p * L - _ * k), I = p * p + _ * _, N = k * k + L * L, A = [(L * I - _ * N) / b + v, (p * N - k * I) / b + m];
    cs(o.edge, g, w, A), f.edge = Vr(g, n, null, A), o.edge = Vr(n, w, null, A), rr(r), rr(o);
  }
}
function Cf(n, e) {
  var t = n.site, r = t[0], o = t[1], a = o - e;
  if (!a) return r;
  var u = n.P;
  if (!u) return -1 / 0;
  t = u.site;
  var c = t[0], f = t[1], g = f - e;
  if (!g) return c;
  var v = c - r, m = 1 / a - 1 / g, p = v / g;
  return m ? (-p + Math.sqrt(p * p - 2 * m * (v * v / (-2 * g) - f + g / 2 + o - a / 2))) / m + r : (r + c) / 2;
}
function E_(n, e) {
  var t = n.N;
  if (t) return Cf(t, e);
  var r = n.site;
  return r[1] === e ? r[0] : 1 / 0;
}
var Ge = 1e-6, or, St, ni, ft;
function C_(n, e, t) {
  return (n[0] - t[0]) * (e[1] - n[1]) - (n[0] - e[0]) * (t[1] - n[1]);
}
function k_(n, e) {
  return e[1] - n[1] || e[0] - n[0];
}
function Yo(n, e) {
  var t = n.sort(k_).pop(), r, o, a;
  for (ft = [], St = new Array(n.length), or = new ls(), ni = new ls(); ; )
    if (a = ba, t && (!a || t[1] < a.y || t[1] === a.y && t[0] < a.x))
      (t[0] !== r || t[1] !== o) && (x_(t), r = t[0], o = t[1]), t = n.pop();
    else if (a)
      w_(a.arc);
    else
      break;
  if (v_(), e) {
    var u = +e[0][0], c = +e[0][1], f = +e[1][0], g = +e[1][1];
    f_(u, c, f, g), y_(u, c, f, g);
  }
  this.edges = ft, this.cells = St, or = ni = ft = St = null;
}
Yo.prototype = {
  constructor: Yo,
  polygons: function() {
    var n = this.edges;
    return this.cells.map(function(e) {
      var t = e.halfedges.map(function(r) {
        return wf(e, n[r]);
      });
      return t.data = e.site.data, t;
    });
  },
  triangles: function() {
    var n = [], e = this.edges;
    return this.cells.forEach(function(t, r) {
      if (c = (a = t.halfedges).length)
        for (var o = t.site, a, u = -1, c, f, g = e[a[c - 1]], v = g.left === o ? g.right : g.left; ++u < c; )
          f = v, g = e[a[u]], v = g.left === o ? g.right : g.left, f && v && r < f.index && r < v.index && C_(o, f, v) < 0 && n.push([o.data, f.data, v.data]);
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
    for (var r = this, o, a = r._found || 0, u = r.cells.length, c; !(c = r.cells[a]); ) if (++a >= u) return null;
    var f = n - c.site[0], g = e - c.site[1], v = f * f + g * g;
    do
      c = r.cells[o = a], a = null, c.halfedges.forEach(function(m) {
        var p = r.edges[m], _ = p.left;
        if (!((_ === c.site || !_) && !(_ = p.right))) {
          var w = n - _[0], k = e - _[1], L = w * w + k * k;
          L < v && (v = L, a = _.index);
        }
      });
    while (a !== null);
    return r._found = o, t == null || v <= t * t ? c.site : null;
  }
};
function I_() {
  var n = u_, e = l_, t = null;
  function r(o) {
    return new Yo(o.map(function(a, u) {
      var c = [Math.round(n(a, u, o) / Ge) * Ge, Math.round(e(a, u, o) / Ge) * Ge];
      return c.index = u, c.data = a, c;
    }), t);
  }
  return r.polygons = function(o) {
    return r(o).polygons();
  }, r.links = function(o) {
    return r(o).links();
  }, r.triangles = function(o) {
    return r(o).triangles();
  }, r.x = function(o) {
    return arguments.length ? (n = typeof o == "function" ? o : fc(+o), r) : n;
  }, r.y = function(o) {
    return arguments.length ? (e = typeof o == "function" ? o : fc(+o), r) : e;
  }, r.extent = function(o) {
    return arguments.length ? (t = o == null ? null : [[+o[0][0], +o[0][1]], [+o[1][0], +o[1][1]]], r) : t && [[t[0][0], t[0][1]], [t[1][0], t[1][1]]];
  }, r.size = function(o) {
    return arguments.length ? (t = o == null ? null : [[0, 0], [+o[0], +o[1]]], r) : t && [t[1][0] - t[0][0], t[1][1] - t[0][1]];
  }, r;
}
function S_(n) {
  return n = n.slice(), n.push(n[0]), ye([n]);
}
function b_(n, e) {
  if (e = e || {}, !Oe(e)) throw new Error("options is invalid");
  const t = e.bbox || [-180, -85, 180, 85];
  if (!n) throw new Error("points is required");
  if (!Array.isArray(t)) throw new Error("bbox is invalid");
  return gn(n, "Point", "points"), ce(
    I_().x((r) => r.geometry.coordinates[0]).y((r) => r.geometry.coordinates[1]).extent([
      [t[0], t[1]],
      [t[2], t[3]]
    ]).polygons(n.features).map(function(r, o) {
      return Object.assign(S_(r), {
        properties: ys(n.features[o].properties)
      });
    })
  );
}
function M_(n, e = {}) {
  var t;
  const r = !!e.planar, o = (t = e.segment) != null ? t : !1;
  let a = 0, u = 0, c = 0, f = 0;
  const g = [];
  o ? Kt(n, (I) => {
    const [N, A] = vc(
      I.geometry.coordinates,
      r
    ), O = mc(I, r);
    isNaN(N) || isNaN(A) || (a += N, u += A, c += 1, f += O, g.push(Dt(I)));
  }) : Le(n, (I) => {
    if (I.geometry.type !== "LineString")
      throw new Error("shold to support MultiLineString?");
    const [N, A] = vc(
      I.geometry.coordinates,
      r
    ), O = mc(I, r);
    isNaN(N) || isNaN(A) || (a += N, u += A, c += 1, f += O, g.push(Dt(I)));
  });
  const v = P_(a, u), m = kf(v), p = N_(
    a,
    u,
    c
  ), _ = f / c, w = Dt(ce(g)), [k, L] = Me(w);
  let b;
  return r ? b = yc(
    [k, L],
    v,
    _,
    r
  ) : b = yc(
    [k, L],
    m,
    _,
    r
  ), Se(b, {
    averageLength: _,
    averageX: k,
    averageY: L,
    bearingAngle: m,
    cartesianAngle: v,
    circularVariance: p,
    countOfLines: c
  });
}
function L_(n) {
  const [e, t] = n[0], [r, o] = n[1], a = r - e, u = o - t;
  return Math.sqrt(Math.pow(a, 2) + Math.pow(u, 2));
}
function mc(n, e) {
  return e ? fs(
    n,
    (t, r) => {
      const o = r.geometry.coordinates;
      return t + L_(o);
    },
    0
  ) : Ca(n, {
    units: "meters"
  });
}
function kf(n) {
  let e = 90 - n;
  return e > 180 && (e -= 360), e;
}
function vc(n, e) {
  const t = n[0], r = n[n.length - 1];
  if (e) {
    const [o, a] = t, [u, c] = r, f = u - o, g = c - a, v = Math.sqrt(Math.pow(f, 2) + Math.pow(g, 2));
    if (v < 1e-9)
      return [NaN, NaN];
    const m = g / v, p = f / v;
    return [m, p];
  } else {
    const a = kf(hn(t, r)) * Math.PI / 180;
    return [Math.sin(a), Math.cos(a)];
  }
}
function P_(n, e) {
  let t = 0;
  return Math.abs(e) < 1e-9 ? t = 90 : t = Math.atan2(n, e) * 180 / Math.PI, n >= 0 ? e < 0 && (t += 180) : e < 0 && (t -= 180), t;
}
function N_(n, e, t) {
  if (t === 0)
    throw new Error("the size of the features set must be greater than 0");
  return 1 - Math.sqrt(Math.pow(n, 2) + Math.pow(e, 2)) / t;
}
function yc(n, e, t, r) {
  if (r) {
    const [o, a] = n;
    let u, c, f, g;
    const v = e * Math.PI / 180, m = Math.sin(v), p = Math.cos(v);
    return u = o - t / 2 * p, c = a - t / 2 * m, f = o + t / 2 * p, g = a + t / 2 * m, [
      [u, c],
      [f, g]
    ];
  } else {
    const o = jt(de(n), t / 2, e, {
      units: "meters"
    }), a = jt(de(n), -t / 2, e, {
      units: "meters"
    });
    return [Me(a), Me(o)];
  }
}
const Ow = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  along: Pd,
  angle: Nd,
  applyFilter: ps,
  area: oi,
  areaFactors: Zi,
  azimuthToBearing: Bc,
  bbox: ze,
  bboxClip: Fd,
  bboxPolygon: ai,
  bearing: hn,
  bearingToAzimuth: ur,
  bezierSpline: zd,
  booleanClockwise: Ki,
  booleanConcave: Ud,
  booleanContains: Kc,
  booleanCrosses: ih,
  booleanDisjoint: aa,
  booleanEqual: Fr,
  booleanIntersects: sh,
  booleanOverlap: lv,
  booleanParallel: cv,
  booleanPointInPolygon: xe,
  booleanPointOnLine: Ie,
  booleanTouches: fv,
  booleanValid: lh,
  booleanWithin: ua,
  buffer: Jv,
  center: ms,
  centerMean: ha,
  centerMedian: jv,
  centerOfMass: Sh,
  centroid: Dt,
  circle: ga,
  cleanCoords: Fn,
  clone: nt,
  cloneProperties: ys,
  clusterEach: ma,
  clusterReduce: Ph,
  clusters: p0,
  clustersDbscan: _0,
  clustersKmeans: L0,
  collect: P0,
  collectionOf: gn,
  combine: N0,
  concave: oy,
  containsNumber: Ko,
  convertArea: Zo,
  convertLength: On,
  convex: Ih,
  coordAll: $r,
  coordEach: He,
  coordReduce: Jo,
  createBins: va,
  degreesToRadians: Qe,
  destination: jt,
  difference: My,
  directionalMean: M_,
  dissolve: Ly,
  distance: qe,
  distanceWeight: Hh,
  earthRadius: Be,
  ellipse: $h,
  envelope: Zh,
  explode: ws,
  factors: hs,
  feature: Je,
  featureCollection: ce,
  featureEach: Le,
  featureOf: Wr,
  featureReduce: jo,
  filterProperties: Nh,
  findPoint: Xc,
  findSegment: Yc,
  flatten: Oo,
  flattenEach: it,
  flattenReduce: Uc,
  flip: Ry,
  geojsonRbush: gs,
  geojsonType: qc,
  geomEach: at,
  geomReduce: ea,
  geometry: Rc,
  geometryCollection: $o,
  getCluster: Lh,
  getCoord: Me,
  getCoords: me,
  getGeom: Ye,
  getType: xt,
  greatCircle: By,
  helpers: bd,
  hexGrid: Kh,
  interpolate: zy,
  intersect: Jr,
  invariant: Md,
  isNumber: et,
  isObject: Oe,
  isobands: Wy,
  isolines: sp,
  kinks: lp,
  length: Ca,
  lengthToDegrees: si,
  lengthToRadians: mr,
  lineArc: ef,
  lineChunk: hp,
  lineEach: ta,
  lineIntersect: en,
  lineOffset: _p,
  lineOverlap: uh,
  lineReduce: na,
  lineSegment: Zr,
  lineSlice: xp,
  lineSliceAlong: tf,
  lineSplit: $c,
  lineString: Se,
  lineStrings: Dc,
  lineToPolygon: Ep,
  mask: kp,
  meta: Td,
  midpoint: bp,
  moranIndex: Mp,
  multiLineString: xn,
  multiPoint: ri,
  multiPolygon: wt,
  nearestNeighborAnalysis: Op,
  nearestPoint: xs,
  nearestPointOnLine: un,
  nearestPointToLine: qp,
  planepoint: Up,
  point: de,
  pointGrid: Jh,
  pointOnFeature: Yp,
  pointToLineDistance: ka,
  pointToPolygonDistance: Bo,
  points: Ac,
  pointsWithinPolygon: rf,
  polygon: ye,
  polygonSmooth: jp,
  polygonTangents: n1,
  polygonToLine: lr,
  polygonize: Qp,
  polygons: Oc,
  projection: o1,
  propEach: Qo,
  propReduce: zc,
  propertiesContainsFilter: ya,
  quadratAnalysis: a1,
  radiansToDegrees: Qt,
  radiansToLength: ii,
  random: d1,
  randomLineString: df,
  randomPoint: ff,
  randomPolygon: gf,
  randomPosition: hf,
  rectangleGrid: Qh,
  removeBbox: _n,
  rewind: m1,
  rhumbBearing: Dn,
  rhumbDestination: _s,
  rhumbDistance: ir,
  round: Fc,
  sample: v1,
  sector: p1,
  segmentEach: Kt,
  segmentReduce: fs,
  shortestPath: k1,
  simplify: P1,
  square: T1,
  squareGrid: Ea,
  standardDeviationalEllipse: R1,
  tag: A1,
  tesselate: Q1,
  tin: Oh,
  toMercator: uf,
  toWgs84: lf,
  transformRotate: Wh,
  transformScale: vf,
  transformTranslate: e_,
  triangleGrid: jh,
  truncate: Hc,
  union: t_,
  unkinkPolygon: a_,
  validateBBox: Hr,
  validateId: Gc,
  voronoi: b_
}, Symbol.toStringTag, { value: "Module" }));
class T_ {
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
    }, this.billboardCollection = new S.BillboardCollection(), this.layer = this.viewer.scene.primitives.add(this.billboardCollection), this.data = [], this.bubbleSizes = /* @__PURE__ */ new Map(), this.eventListener = null, this.customVisibleArea = null, this.visibleAreaMode = "screen";
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
    var g, v, m, p, _, w, k, L;
    if (!e || !e.geometry || !e.geometry.coordinates) {
      console.error("缺少coordinates字段");
      return;
    }
    let t = e.geometry.coordinates[0], r = e.geometry.coordinates[1], o = e.geometry.coordinates[2] || 0;
    const a = xu({
      title: e.properties.title || (e == null ? void 0 : e.title) || "",
      showTitle: ((g = this.config) == null ? void 0 : g.showTitle) || !1,
      content: ((v = e == null ? void 0 : e.properties) == null ? void 0 : v.content) || (e == null ? void 0 : e.content) || [],
      baseColor: (m = this.config) == null ? void 0 : m.baseColor,
      bodyColor: (p = this.config) == null ? void 0 : p.bodyColor,
      headerOpacity: (_ = this.config) == null ? void 0 : _.headerOpacity,
      bodyOpacity: (w = this.config) == null ? void 0 : w.bodyOpacity,
      align: this.config.align,
      // 注意这里应该是contentAlign，不是algin
      scale: 1,
      titleFontSize: (k = this.config) == null ? void 0 : k.titleFontSize,
      contentFontSize: (L = this.config) == null ? void 0 : L.contentFontSize
    });
    if (a.width > 1920 || a.height > 1080) {
      console.warn("Canvas size too large, skipping...");
      return;
    }
    const u = e.properties.id || Ft(), c = {
      position: S.Cartesian3.fromDegrees(t, r, o),
      image: a,
      verticalOrigin: S.VerticalOrigin.BOTTOM,
      id: u,
      disableDepthTestDistance: Number.POSITIVE_INFINITY,
      scale: 1,
      scaleByDistance: new S.NearFarScalar(15e4, 1, 4e5, 0.5),
      pixelOffset: new S.Cartesian2(this.config.offset[0], this.config.offset[1]),
      pixelOffsetScaleByDistance: new S.NearFarScalar(15e4, 1, 4e5, 0.5)
    }, f = this.billboardCollection.add(c);
    return f.properties = {
      ...e.properties
    }, this.bubbleSizes.set(u, {
      width: a.width,
      height: a.height,
      createdTime: Date.now()
      // 记录创建时间，用于按时间隐藏策略
    }), this.eventListener || (this.eventListener = (b) => this.render(), this.viewer.clock.onTick.addEventListener(this.eventListener)), this.config.allowClick || (f.pickPrimitive = this.config.allowClick), f;
  }
  /**
   * 渲染和碰撞检测
   */
  render() {
    const e = [], t = /* @__PURE__ */ new Map();
    this.billboardCollection._billboards.forEach((r) => {
      const o = S.SceneTransforms.wgs84ToWindowCoordinates(
        this.viewer.scene,
        r.position
      ), a = S.Cartographic.fromCartesian(r.position);
      let u = !1;
      if (this.visibleAreaMode === "custom" && this.customVisibleArea) {
        if (u = this.isPointInVisibleArea(a), !u) {
          r.show = !1;
          return;
        }
        u = o && o.x && o.y;
      } else if (o && o.x && o.y)
        if (Math.abs(o.x) > window.innerWidth || Math.abs(o.y) > window.innerHeight) {
          r.show = !1;
          return;
        } else
          u = !0;
      if (u) {
        r.show = !0;
        const c = this.bubbleSizes.get(r.id);
        if (!c) return;
        const f = c.width * r.scale, g = c.height * r.scale, v = r.pixelOffset ? r.pixelOffset.x : 0, m = r.pixelOffset ? r.pixelOffset.y : 0, p = {
          id: r.id,
          billboard: r,
          left: o.x + v - f / 2,
          right: o.x + v + f / 2,
          top: o.y + m - g,
          bottom: o.y + m,
          width: f,
          height: g,
          area: f * g,
          createdTime: c.createdTime,
          screenPosition: o
        };
        t.set(r.id, p), e.push(p);
      } else
        r.show = !1;
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
      const t = S.Math.toDegrees(e.longitude), r = S.Math.toDegrees(e.latitude), o = de([t, r]);
      return ua(o, this.customVisibleArea);
    }
    return !0;
  }
  /**
   * 执行碰撞检测
   */
  performCollisionDetection(e, t) {
    let r;
    switch (this.config.hideStrategy) {
      case "smaller":
        r = [...e].sort((a, u) => u.area - a.area);
        break;
      case "newer":
        r = [...e].sort((a, u) => a.createdTime - u.createdTime);
        break;
      case "distance":
        r = [...e].sort((a, u) => {
          const c = this.calculateDistanceToScreenCenter(a.screenPosition), f = this.calculateDistanceToScreenCenter(u.screenPosition);
          return c - f;
        });
        break;
      default:
        r = [...e].sort((a, u) => u.area - a.area);
    }
    const o = /* @__PURE__ */ new Set();
    for (const a of r) {
      let u = !0;
      for (const c of o) {
        const f = t.get(c);
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
    const r = Math.max(e.left, t.left), o = Math.min(e.right, t.right), a = Math.max(e.top, t.top), u = Math.min(e.bottom, t.bottom);
    if (r >= o || a >= u)
      return !1;
    const c = (o - r) * (u - a), f = Math.min(e.area, t.area);
    return c / f > this.config.collisionThreshold;
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
        const r = this.calculateDistanceToScreenCenter(e.screenPosition), o = this.calculateDistanceToScreenCenter(t.screenPosition);
        return r <= o;
      default:
        return e.area >= t.area;
    }
  }
  /**
   * 计算到屏幕中心的距离
   */
  calculateDistanceToScreenCenter(e) {
    const t = this.viewer.scene.canvas, r = t.width / 2, o = t.height / 2, a = e.x - r, u = e.y - o;
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
    let r = this.billboardCollection._billboards.findIndex((u) => u.id === e);
    if (r !== -1) {
      const u = this.billboardCollection.get(r), c = xu({
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
      u.setImage("", c), this.bubbleSizes.set(e, {
        width: c.width,
        height: c.height,
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
      const r = this.billboardCollection.get(t);
      if (r.id === e)
        return r;
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
      const r = this.billboardCollection.get(t);
      if (r.id === e) {
        this.billboardCollection.remove(r);
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
class R_ {
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
    }, this.layer = new S.CustomDataSource("circle-group-layer"), this.viewer.dataSources.add(this.layer);
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
    var L, b, I, N, A, O, Y, V, C, M;
    if (!e || !e.geometry || !e.geometry.coordinates) {
      console.error("缺少coordinates字段");
      return;
    }
    let t = e.geometry.coordinates[0], r = e.geometry.coordinates[1], o = e.geometry.coordinates[2] || this.config.height;
    const a = ((L = e.properties) == null ? void 0 : L.xRadius) || this.config.xRadius || this.config.radius, u = ((b = e.properties) == null ? void 0 : b.yRadius) || this.config.yRadius || this.config.radius, c = ((I = e.properties) == null ? void 0 : I.fillColor) || this.config.fillColor, f = ((N = e.properties) == null ? void 0 : N.outline) || this.config.outline || !1, g = ((A = e.properties) == null ? void 0 : A.outlineColor) || this.config.outlineColor, v = ((O = e.properties) == null ? void 0 : O.outlineWidth) || this.config.outlineWidth, m = ((Y = e.properties) == null ? void 0 : Y.extrudedHeight) || this.config.extrudedHeight, p = ((V = e.properties) == null ? void 0 : V.rotation) || this.config.rotation || 0, _ = ((C = e.properties) == null ? void 0 : C.opacity) || this.config.opacity, w = ((M = e.properties) == null ? void 0 : M.id) || Ft(), k = this.layer.entities.add({
      id: w,
      position: S.Cartesian3.fromDegrees(t, r, o),
      ellipse: {
        semiMajorAxis: a,
        semiMinorAxis: u,
        height: o,
        extrudedHeight: m,
        material: S.Color.fromCssColorString(c).withAlpha(_),
        outline: f,
        outlineColor: S.Color.fromCssColorString(g),
        outlineWidth: v,
        numberOfVerticalLines: 32,
        rotation: p
      }
    });
    return k.properties = {
      ...e.properties,
      center: [t, r, o]
    }, k;
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
const Xo = "CircleWaveMaterial";
let pc = !1;
function A_() {
  pc || !S.Material || !S.Material._materialCache || (S.Material._materialCache.addMaterial(Xo, {
    fabric: {
      type: Xo,
      uniforms: {
        color: S.Color.YELLOW.clone(),
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
  }), pc = !0);
}
class O_ {
  constructor(e = {}) {
    this._definitionChanged = new S.Event(), this.color = S.Color.fromCssColorString(e.color || "#FFCB33"), this.duration = e.duration || 3e3, this.count = e.count || 3, this.gradient = e.gradient ?? 0.1, this._startTime = Date.now();
  }
  get isConstant() {
    return !1;
  }
  get definitionChanged() {
    return this._definitionChanged;
  }
  getType() {
    return Xo;
  }
  getValue(e, t = {}) {
    return t.color = S.Color.clone(this.color, t.color), t.time = (Date.now() - this._startTime) % this.duration / this.duration, t.count = this.count, t.gradient = 1 + 10 * (1 - this.gradient), t;
  }
  equals(e) {
    return this === e;
  }
}
class D_ {
  constructor(e, t) {
    this.viewer = e, this.config = {
      color: "#fbad06",
      radius: 1e3,
      duration: 3e3,
      count: 5,
      ...t
    }, this.layer = new S.CustomDataSource("circle-wave-layer"), this.viewer.dataSources.add(this.layer), A_();
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
    const [t, r, o = 0] = e.geometry.coordinates, a = e.properties || {}, u = a.id || Ft(), c = this.layer.entities.add({
      id: u,
      position: S.Cartesian3.fromDegrees(t, r, o),
      ellipse: {
        semiMajorAxis: a.radius || this.config.radius,
        semiMinorAxis: a.radius || this.config.radius,
        material: new O_({
          color: a.color || this.config.color,
          duration: a.duration || this.config.duration,
          count: a.count || this.config.count,
          gradient: 0
        })
      }
    });
    return c.properties = {
      ...a,
      center: [t, r, o]
    }, c;
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
const Vo = "CircleExplosionMaterial";
let _c = !1;
function F_() {
  _c || !S.Material || !S.Material._materialCache || (S.Material._materialCache.addMaterial(Vo, {
    fabric: {
      type: Vo,
      uniforms: {
        color: S.Color.RED.clone(),
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
  }), _c = !0);
}
class B_ {
  constructor(e = {}) {
    this._definitionChanged = new S.Event(), this.color = S.Color.fromCssColorString(e.color || "#ff0000"), this.duration = e.duration || 2e3, this.speed = e.speed || 1, this.fillAlpha = e.fillAlpha ?? 0.25, this.edgeWidth = e.edgeWidth ?? 0.03, this.waveWidth = e.waveWidth ?? 0.05, this._startTime = Date.now();
  }
  get isConstant() {
    return !1;
  }
  get definitionChanged() {
    return this._definitionChanged;
  }
  getType() {
    return Vo;
  }
  getValue(e, t = {}) {
    return t.color = S.Color.clone(this.color, t.color), t.time = (Date.now() - this._startTime) % this.duration / this.duration, t.speed = this.speed, t.fillAlpha = this.fillAlpha, t.edgeWidth = this.edgeWidth, t.waveWidth = this.waveWidth, t;
  }
  equals(e) {
    return this === e;
  }
}
class G_ {
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
    }, this.layer = new S.CustomDataSource("circle-explosion-layer"), this.viewer.dataSources.add(this.layer), F_();
  }
  setData(e = []) {
    this.clearLayer(), Array.isArray(e) && e.forEach((t) => this.addLayer(t));
  }
  addLayer(e) {
    var f;
    if (!this.viewer || this.viewer.isDestroyed() || !((f = e == null ? void 0 : e.geometry) != null && f.coordinates)) return;
    const [t, r, o = this.config.height] = e.geometry.coordinates, a = e.properties || {}, u = a.id || Ft(), c = this.layer.entities.add({
      id: u,
      position: S.Cartesian3.fromDegrees(t, r, o),
      ellipse: {
        semiMajorAxis: a.radius || this.config.radius,
        semiMinorAxis: a.radius || this.config.radius,
        material: new B_({
          color: a.color || this.config.color,
          duration: a.duration || this.config.duration,
          speed: a.speed ?? this.config.speed,
          fillAlpha: a.fillAlpha ?? this.config.fillAlpha,
          edgeWidth: a.edgeWidth ?? this.config.edgeWidth,
          waveWidth: a.waveWidth ?? this.config.waveWidth
        })
      }
    });
    return c.properties = {
      ...a,
      center: [t, r, o]
    }, c;
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
const Ho = "PointRippleMaterial";
let wc = !1;
function q_() {
  wc || !S.Material || !S.Material._materialCache || (S.Material._materialCache.addMaterial(Ho, {
    fabric: {
      type: Ho,
      uniforms: {
        color: new S.Color(1, 0, 0, 1),
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
  }), wc = !0);
}
class z_ {
  constructor(e = {}) {
    this._definitionChanged = new S.Event(), this.color = S.Color.fromCssColorString(e.color || "#ff3b30"), this.duration = e.duration || 2e3, this.speed = e.speed ?? 1, this.innerFade = e.innerFade ?? 1.5, this.ringWidth = e.ringWidth ?? 0.06, this._startTime = Date.now();
  }
  get isConstant() {
    return !1;
  }
  get definitionChanged() {
    return this._definitionChanged;
  }
  getType() {
    return Ho;
  }
  getValue(e, t = {}) {
    return t.color = this.color, t.time = (Date.now() - this._startTime) % this.duration / this.duration, t.speed = this.speed, t.innerFade = this.innerFade, t.ringWidth = this.ringWidth, t;
  }
  equals(e) {
    return this === e;
  }
}
class U_ {
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
    }, this.layer = new S.CustomDataSource("point-ripple-layer"), this.viewer.dataSources.add(this.layer), q_();
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
    const [t, r, o = this.config.height] = e.geometry.coordinates, a = e.properties || {}, u = a.id || Ft(), c = this.layer.entities.add({
      id: u,
      position: S.Cartesian3.fromDegrees(t, r, o),
      ellipse: {
        semiMajorAxis: a.radius || this.config.radius,
        semiMinorAxis: a.radius || this.config.radius,
        // height,
        // 🔥 关键
        // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        // classificationType: Cesium.ClassificationType.BOTH,
        material: new z_({
          color: a.color || this.config.color,
          duration: a.duration || this.config.duration,
          speed: a.speed ?? this.config.speed,
          innerFade: a.innerFade ?? this.config.innerFade,
          ringWidth: a.ringWidth ?? this.config.ringWidth
        })
      }
    });
    return c.properties = {
      ...a,
      center: [t, r, o]
    }, c;
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
class Y_ {
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
    let t = [], r = [];
    e.forEach((u) => {
      var v, m;
      const c = (v = u.geometry) == null ? void 0 : v.coordinates, f = ((m = u.geometry) == null ? void 0 : m.type) || "Polygon";
      if (!c || !c.length) return;
      const g = (p) => {
        var A, O, Y;
        const _ = p[0], w = p.slice(1), k = [];
        _.forEach((V) => k.push(V[0], V[1]));
        const L = w.map((V) => {
          const C = [];
          return V.forEach((M) => C.push(M[0], M[1])), new S.PolygonHierarchy(
            S.Cartesian3.fromDegreesArray(C)
          );
        }), b = new S.PolygonGeometry({
          polygonHierarchy: new S.PolygonHierarchy(
            S.Cartesian3.fromDegreesArray(k),
            L
          ),
          vertexFormat: S.PerInstanceColorAppearance.VERTEX_FORMAT
        }), I = ((A = u.properties) == null ? void 0 : A.id) || Ft();
        t.push(new S.GeometryInstance({
          geometry: b,
          id: I,
          attributes: {
            color: S.ColorGeometryInstanceAttribute.fromColor(
              S.Color.fromCssColorString(((O = u.properties) == null ? void 0 : O.color) || this.config.color).withAlpha(this.config.opacity)
            )
          }
        }));
        const N = (V) => {
          const C = [];
          return V.forEach((M) => C.push(M[0], M[1])), C.push(V[0][0], V[0][1]), S.Cartesian3.fromDegreesArray(C);
        };
        r.push(new S.GeometryInstance({
          geometry: new S.PolylineGeometry({
            positions: N(_),
            width: this.config.lineWidth || 2
          }),
          id: I,
          attributes: {
            color: S.ColorGeometryInstanceAttribute.fromColor(
              S.Color.fromCssColorString(((Y = u.properties) == null ? void 0 : Y.color) || this.config.color)
            )
          }
        })), w.forEach((V) => {
          var C;
          r.push(new S.GeometryInstance({
            geometry: new S.PolylineGeometry({
              positions: N(V),
              width: this.config.lineWidth || 2
            }),
            id: I,
            attributes: {
              color: S.ColorGeometryInstanceAttribute.fromColor(
                S.Color.fromCssColorString(((C = u.properties) == null ? void 0 : C.color) || this.config.color)
              )
            }
          }));
        });
      };
      f === "Polygon" && g(c), f === "MultiPolygon" && c.forEach((p) => {
        g(p);
      });
    });
    const o = new S.PerInstanceColorAppearance({
      translucent: !1,
      closed: !0,
      faceForward: !0,
      renderState: S.RenderState.fromCache({
        depthTest: { enabled: !0 },
        depthMask: !0,
        //写入深度，防止颜色污染
        blending: S.BlendingState.ALPHA_BLEND
      })
    });
    this.polygonPrimitive = this.viewer.scene.primitives.add(
      new S.Primitive({
        geometryInstances: t,
        appearance: o,
        asynchronous: !1
      })
    );
    const a = new S.PolylineColorAppearance({ translucent: !1 });
    this.linePrimitive = this.viewer.scene.primitives.add(
      new S.Primitive({
        geometryInstances: r,
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
      var r;
      return ((r = t.properties) == null ? void 0 : r.id) === e;
    });
  }
  /**
   * 销毁
   */
  destroy() {
    this.clearLayer(), this.viewer = null, this.data = [];
  }
}
class X_ {
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
    var r, o, a, u, c, f, g;
    const t = S.Color.fromCssColorString(this.config.color);
    switch (e) {
      case "dash":
        return new S.PolylineMaterialAppearance({
          material: S.Material.fromType(S.Material.PolylineDashType, {
            color: t,
            //颜色
            gapColor: (r = this.config) != null && r.gapColor ? new S.Color.fromCssColorString((o = this.config) == null ? void 0 : o.gapColor) : S.Color.TRANSPARENT,
            //间隙颜色
            dashLength: ((a = this.config) == null ? void 0 : a.dashLength) || 16
            //虚线长度
          }),
          translucent: !1
        });
      case "glow":
        return new S.PolylineMaterialAppearance({
          material: S.Material.fromType(S.Material.PolylineGlowType, {
            color: t,
            glowPower: ((u = this.config) == null ? void 0 : u.glowPower) || 0.25,
            taperPower: ((c = this.config) == null ? void 0 : c.taperPower) || 1
          }),
          translucent: !1
        });
      case "outline":
        return new S.PolylineMaterialAppearance({
          material: S.Material.fromType(S.Material.PolylineOutlineType, {
            color: t,
            outlineWidth: ((f = this.config) == null ? void 0 : f.outlineWidth) || 1,
            outlineColor: new S.Color.fromCssColorString((g = this.config) == null ? void 0 : g.outlineColor)
          }),
          translucent: !1
        });
      case "arrow":
        return new S.PolylineMaterialAppearance({
          material: S.Material.fromType(S.Material.PolylineArrowType, {
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
      let u = a.geometry.coordinates, c = [];
      u.forEach((v) => {
        c.push(v[0], v[1]);
      });
      const f = new S.PolylineGeometry({
        positions: S.Cartesian3.fromDegreesArray(c),
        width: ((g = a == null ? void 0 : a.properties) == null ? void 0 : g.width) || this.config.width,
        vertexFormat: S.PolylineMaterialAppearance.VERTEX_FORMAT
      });
      f.properties = {
        ...a.properties
      }, t.push(
        new S.GeometryInstance({
          geometry: f,
          id: a.properties.id || Ft(),
          attributes: {
            color: S.ColorGeometryInstanceAttribute.fromColor(
              a.properties.color ? new S.Color.fromCssColorString(a.properties.color) : new S.Color.fromCssColorString(this.config.color)
            )
          }
        })
      );
    });
    const r = this.getAppearance(this.config.type), o = new S.Primitive({
      geometryInstances: t,
      appearance: r,
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
    return t = this.data.find((r) => r.properties.id === e), t;
  }
  /**
   * 销毁
   */
  destroy() {
    this.clearLayer();
  }
}
function xc(n, e) {
  return Number.isFinite(n) ? n : e;
}
class V_ {
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
        coordinates: S.Rectangle.fromDegrees(0, 0, 0, 0),
        material: new S.ImageMaterialProperty({
          image: this._canvas,
          transparent: !0
        })
      }
    }), this._points = [], this._rect = null;
  }
  _createGradientMap() {
    const e = document.createElement("canvas");
    e.width = 256, e.height = 1;
    const t = e.getContext("2d"), r = t.createLinearGradient(0, 0, 256, 0), o = this.config.gradient;
    Object.keys(o).forEach((a) => {
      r.addColorStop(Number(a), o[a]);
    }), t.fillStyle = r, t.fillRect(0, 0, 256, 1), this._gradientData = t.getImageData(0, 0, 256, 1).data;
  }
  _calcBounds(e) {
    let t = 180, r = 90, o = -180, a = -90;
    e.forEach((c) => {
      t = Math.min(t, c.lon), r = Math.min(r, c.lat), o = Math.max(o, c.lon), a = Math.max(a, c.lat);
    });
    const u = 0.01;
    return S.Rectangle.fromDegrees(
      t - u,
      r - u,
      o + u,
      a + u
    );
  }
  setData(e = []) {
    if (this._points = [], !!Array.isArray(e)) {
      if (e.forEach((t) => {
        var u, c;
        if (!((u = t == null ? void 0 : t.geometry) != null && u.coordinates)) return;
        const [r, o] = t.geometry.coordinates, a = xc((c = t.properties) == null ? void 0 : c.value, 50);
        Number.isFinite(r) && Number.isFinite(o) && this._points.push({ lon: r, lat: o, value: a });
      }), !this._points.length)
        return this.clearLayer();
      this._rect = this._calcBounds(this._points), this._layer.rectangle.coordinates = this._rect, this._draw();
    }
  }
  _draw() {
    const e = this._ctx, t = this._canvasSize;
    if (e.clearRect(0, 0, t, t), !this._rect) return;
    const r = this._rect, o = S.Math.toDegrees(r.west), a = S.Math.toDegrees(r.south), u = S.Math.toDegrees(r.east), c = S.Math.toDegrees(r.north), f = u - o || 1e-6, g = c - a || 1e-6;
    this._points.forEach((v) => {
      const m = (v.lon - o) / f * t, p = (c - v.lat) / g * t;
      if (!Number.isFinite(m) || !Number.isFinite(p)) return;
      const _ = Math.max(1, xc(this.config.radius, 50)), w = e.createRadialGradient(m, p, 0, m, p, _), k = Math.min(v.value / this.config.maxValue, 1);
      w.addColorStop(0, `rgba(0,0,0,${k})`), w.addColorStop(1, "rgba(0,0,0,0)"), e.fillStyle = w, e.beginPath(), e.arc(m, p, _, 0, Math.PI * 2), e.fill();
    }), this._applyGradient();
  }
  _applyGradient() {
    const e = this._ctx, t = this._canvasSize, r = e.getImageData(0, 0, t, t), o = r.data, a = this._gradientData;
    for (let u = 0; u < o.length; u += 4) {
      const c = o[u + 3];
      if (c === 0) continue;
      const f = Math.min(255, c);
      o[u] = a[f * 4], o[u + 1] = a[f * 4 + 1], o[u + 2] = a[f * 4 + 2];
    }
    e.putImageData(r, 0, 0);
  }
  clearLayer() {
    this._points = [];
    const e = this._canvasSize;
    this._ctx.clearRect(0, 0, e, e);
    const t = this._layer.rectangle, r = t.material;
    t.material = new S.ImageMaterialProperty({
      image: this._canvas,
      transparent: !0
    }), t.material = r;
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
var ar = {
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
}, H_ = function() {
  var e = function(o) {
    this._coordinator = {}, this._data = [], this._radi = [], this._min = 0, this._max = 1, this._xField = o.xField || o.defaultXField, this._yField = o.yField || o.defaultYField, this._valueField = o.valueField || o.defaultValueField, o.radius && (this._cfgRadius = o.radius);
  }, t = ar.defaultRadius;
  return e.prototype = {
    // when forceRender = false -> called from setData, omits renderall event
    _organiseData: function(r, o) {
      var a = r[this._xField], u = r[this._yField], c = this._radi, f = this._data, g = this._max, v = this._min, m = r[this._valueField] || 1, p = r.radius || this._cfgRadius || t;
      return f[a] || (f[a] = [], c[a] = []), f[a][u] ? f[a][u] += m : (f[a][u] = m, c[a][u] = p), f[a][u] > g ? (o ? this.setDataMax(f[a][u]) : this._max = f[a][u], !1) : {
        x: a,
        y: u,
        value: m,
        radius: p,
        min: v,
        max: g
      };
    },
    _unOrganizeData: function() {
      var r = [], o = this._data, a = this._radi;
      for (var u in o)
        for (var c in o[u])
          r.push({
            x: u,
            y: c,
            radius: a[u][c],
            value: o[u][c]
          });
      return {
        min: this._min,
        max: this._max,
        data: r
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
        for (var r = arguments[0], o = r.length; o--; )
          this.addData.call(this, r[o]);
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
    setData: function(r) {
      var o = r.data, a = o.length;
      this._data = [], this._radi = [];
      for (var u = 0; u < a; u++)
        this._organiseData(o[u], !1);
      return this._max = r.max, this._min = r.min || 0, this._onExtremaChange(), this._coordinator.emit("renderall", this._getInternalData()), this;
    },
    removeData: function() {
    },
    setDataMax: function(r) {
      return this._max = r, this._onExtremaChange(), this._coordinator.emit("renderall", this._getInternalData()), this;
    },
    setDataMin: function(r) {
      return this._min = r, this._onExtremaChange(), this._coordinator.emit("renderall", this._getInternalData()), this;
    },
    setCoordinator: function(r) {
      this._coordinator = r;
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
}(), W_ = function() {
  var e = function(a) {
    var u = a.gradient || a.defaultGradient, c = document.createElement("canvas"), f = c.getContext("2d");
    c.width = 256, c.height = 1;
    var g = f.createLinearGradient(0, 0, 256, 1);
    for (var v in u)
      g.addColorStop(v, u[v]);
    return f.fillStyle = g, f.fillRect(0, 0, 256, 1), f.getImageData(0, 0, 256, 1).data;
  }, t = function(a, u) {
    var c = document.createElement("canvas"), f = c.getContext("2d"), g = a, v = a;
    if (c.width = c.height = a * 2, u == 1)
      f.beginPath(), f.arc(g, v, a, 0, 2 * Math.PI, !1), f.fillStyle = "rgba(0,0,0,1)", f.fill();
    else {
      var m = f.createRadialGradient(
        g,
        v,
        a * u,
        g,
        v,
        a
      );
      m.addColorStop(0, "rgba(0,0,0,1)"), m.addColorStop(1, "rgba(0,0,0,0)"), f.fillStyle = m, f.fillRect(0, 0, 2 * a, 2 * a);
    }
    return c;
  }, r = function(v) {
    for (var u = [], c = v.min, f = v.max, g = v.radi, v = v.data, m = Object.keys(v), p = m.length; p--; )
      for (var _ = m[p], w = Object.keys(v[_]), k = w.length; k--; ) {
        var L = w[k], b = v[_][L], I = g[_][L];
        u.push({
          x: _,
          y: L,
          value: b,
          radius: I
        });
      }
    return {
      min: c,
      max: f,
      data: u
    };
  };
  function o(a) {
    var u = a.container, c = this.shadowCanvas = document.createElement("canvas"), f = this.canvas = a.canvas || document.createElement("canvas");
    this._renderBoundaries = [1e4, 1e4, 0, 0];
    var g = getComputedStyle(a.container) || {};
    f.className = "heatmap-canvas", this._width = f.width = c.width = +g.width.replace(/px/, ""), this._height = f.height = c.height = +g.height.replace(/px/, ""), this.shadowCtx = c.getContext("2d"), this.ctx = f.getContext("2d"), f.style.cssText = c.style.cssText = "position:absolute;left:0;top:0;", u.style.position = "relative", u.appendChild(f), this._palette = e(a), this._templates = {}, this._setStyles(a);
  }
  return o.prototype = {
    renderPartial: function(a) {
      this._drawAlpha(a), this._colorize();
    },
    renderAll: function(a) {
      this._clear(), this._drawAlpha(r(a)), this._colorize();
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
      for (var u = this._min = f.min, c = this._max = f.max, f = f.data || [], g = f.length, v = 1 - this._blur; g--; ) {
        var m = f[g], p = m.x, _ = m.y, w = m.radius, k = Math.min(m.value, c), L = p - w, b = _ - w, I = this.shadowCtx, N;
        this._templates[w] ? N = this._templates[w] : this._templates[w] = N = t(w, v), I.globalAlpha = (k - u) / (c - u), I.drawImage(N, L, b), L < this._renderBoundaries[0] && (this._renderBoundaries[0] = L), b < this._renderBoundaries[1] && (this._renderBoundaries[1] = b), L + 2 * w > this._renderBoundaries[2] && (this._renderBoundaries[2] = L + 2 * w), b + 2 * w > this._renderBoundaries[3] && (this._renderBoundaries[3] = b + 2 * w);
      }
    },
    _colorize: function() {
      var a = this._renderBoundaries[0], u = this._renderBoundaries[1], c = this._renderBoundaries[2] - a, f = this._renderBoundaries[3] - u, g = this._width, v = this._height, m = this._opacity, p = this._maxOpacity, _ = this._minOpacity, w = this._useGradientOpacity;
      a < 0 && (a = 0), u < 0 && (u = 0), a + c > g && (c = g - a), u + f > v && (f = v - u);
      for (var k = this.shadowCtx.getImageData(a, u, c, f), L = k.data, b = L.length, I = this._palette, N = 3; N < b; N += 4) {
        var A = L[N], O = A * 4;
        if (O) {
          var Y;
          m > 0 ? Y = m : A < p ? A < _ ? Y = _ : Y = A : Y = p, L[N - 3] = I[O], L[N - 2] = I[O + 1], L[N - 1] = I[O + 2], L[N] = w ? I[O + 3] : Y;
        }
      }
      Object.defineProperty(k, "data", {
        value: L,
        writable: !0,
        configurable: !0,
        enumerable: !0
      }), this.ctx.putImageData(k, a, u), this._renderBoundaries = [1e3, 1e3, 0, 0];
    },
    getValueAt: function(a) {
      var u, c = this.shadowCtx, f = c.getImageData(a.x, a.y, 1, 1), g = f.data[3], v = this._max, m = this._min;
      return u = Math.abs(v - m) * (g / 255) >> 0, u;
    },
    getDataURL: function() {
      return this.canvas.toDataURL();
    }
  }, o;
}(), $_ = function() {
  var e = !1;
  return ar.defaultRenderer === "canvas2d" && (e = W_), e;
}(), Ec = {
  merge: function() {
    for (var n = {}, e = arguments.length, t = 0; t < e; t++) {
      var r = arguments[t];
      for (var o in r)
        n[o] = r[o];
    }
    return n;
  }
}, Z_ = function() {
  var e = function() {
    function a() {
      this.cStore = {};
    }
    return a.prototype = {
      on: function(u, c, f) {
        var g = this.cStore;
        g[u] || (g[u] = []), g[u].push(function(v) {
          return c.call(f, v);
        });
      },
      emit: function(u, c) {
        var f = this.cStore;
        if (f[u])
          for (var g = f[u].length, v = 0; v < g; v++) {
            var m = f[u][v];
            m(c);
          }
      }
    }, a;
  }(), t = function(o) {
    var a = o._renderer, u = o._coordinator, c = o._store;
    u.on("renderpartial", a.renderPartial, a), u.on("renderall", a.renderAll, a), u.on("extremachange", function(f) {
      o._config.onExtremaChange && o._config.onExtremaChange({
        min: f.min,
        max: f.max,
        gradient: o._config.gradient || o._config.defaultGradient
      });
    }), c.setCoordinator(u);
  };
  function r() {
    var o = this._config = Ec.merge(ar, arguments[0] || {});
    if (this._coordinator = new e(), o.plugin) {
      var a = o.plugin;
      if (ar.plugins[a]) {
        var u = ar.plugins[a];
        this._renderer = new u.renderer(o), this._store = new u.store(o);
      } else
        throw new Error(
          "Plugin '" + a + "' not found. Maybe it was not registered."
        );
    } else
      this._renderer = new $_(o), this._store = new H_(o);
    t(this);
  }
  return r.prototype = {
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
      return this._config = Ec.merge(this._config, o), this._renderer.updateConfig(this._config), this._coordinator.emit("renderall", this._store._getInternalData()), this;
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
  }, r;
}(), K_ = {
  create: function(n) {
    return new Z_(n);
  },
  register: function(n, e) {
    ar.plugins[n] = e;
  }
};
class J_ {
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
    const r = t.map((o) => {
      var c;
      const [a, u] = o.geometry.coordinates;
      return {
        x: a,
        y: u,
        value: Number(((c = o.properties) == null ? void 0 : c.value) ?? 1)
      };
    });
    this._createHeatmap(r);
  }
  /*----------------------------------*/
  /* 创建heatmap */
  /*----------------------------------*/
  _createHeatmap(e) {
    this.clearLayer();
    const t = this._getBounds(e);
    this.bounds = t;
    const { container: r, width: o, height: a } = this._createContainer(t);
    this.container = r;
    const u = [], c = [];
    e.forEach((m) => {
      const p = (m.x - t[0]) / (t[2] - t[0]) * o, _ = (t[3] - m.y) / (t[3] - t[1]) * a;
      u.push({
        x: p,
        y: _,
        value: m.value
      }), c.push(m.value);
    });
    const f = this.config.minValue ?? Math.min(...c), g = this.config.maxValue ?? Math.max(...c), v = {
      min: f,
      max: g,
      data: u
    };
    this.heatmap = K_.create({
      container: r,
      radius: this.config.radius,
      blur: this.config.blur,
      gradient: this.config.gradient,
      maxOpacity: this.config.maxOpacity,
      minOpacity: this.config.minOpacity
    }), this.heatmap.setData(v), this._createLayer();
  }
  /*----------------------------------*/
  /* Cesium Layer */
  /*----------------------------------*/
  _createLayer() {
    const e = this.heatmap.getDataURL();
    this.config.renderType === "primitive" ? (this.provider = this.viewer.scene.primitives.add(
      new S.Primitive({
        geometryInstances: new S.GeometryInstance({
          geometry: new S.RectangleGeometry({
            rectangle: S.Rectangle.fromDegrees(...this.bounds),
            vertexFormat: S.EllipsoidSurfaceAppearance.VERTEX_FORMAT
          })
        }),
        appearance: new S.EllipsoidSurfaceAppearance({
          aboveGround: !1
        })
      })
    ), this.provider.appearance.material = new S.Material({
      fabric: {
        type: "Image",
        uniforms: {
          image: e
        }
      }
    })) : this.config.renderType === "imagery" ? this.provider = this.viewer.imageryLayers.addImageryProvider(
      new S.SingleTileImageryProvider({
        url: e,
        rectangle: S.Rectangle.fromDegrees(...this.bounds)
      })
    ) : this.provider = this.viewer.entities.add({
      rectangle: {
        coordinates: S.Rectangle.fromDegrees(...this.bounds),
        material: new S.ImageMaterialProperty({
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
    this.provider instanceof S.Primitive && (this.provider.appearance.material.uniforms.image = e), this.provider instanceof S.Entity && (this.provider.rectangle.material = new S.ImageMaterialProperty({
      image: e
    })), this.provider instanceof S.ImageryLayer && (this.viewer.imageryLayers.remove(this.provider), this.provider = this.viewer.imageryLayers.addImageryProvider(
      new S.SingleTileImageryProvider({
        url: e,
        rectangle: S.Rectangle.fromDegrees(...this.bounds)
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
    this.provider && (this.provider instanceof S.Primitive && this.viewer.scene.primitives.remove(this.provider), this.provider instanceof S.ImageryLayer && this.viewer.imageryLayers.remove(this.provider), this.provider instanceof S.Entity && this.viewer.entities.remove(this.provider), this.provider = null, this.container && (document.body.removeChild(this.container), this.container = null));
  }
  destroy() {
    this.clearLayer(), this.data = [], this.heatmap = null;
  }
  /*----------------------------------*/
  /* utils */
  /*----------------------------------*/
  _getBounds(e) {
    let t = 180, r = -180, o = 90, a = -90;
    e.forEach((f) => {
      t = Math.min(t, f.x), r = Math.max(r, f.x), o = Math.min(o, f.y), a = Math.max(a, f.y);
    });
    const u = r - t || 1, c = a - o || 1;
    return [
      t - u / 10,
      o - c / 10,
      r + u / 10,
      a + c / 10
    ];
  }
  _createContainer(e) {
    const t = document.createElement("div"), r = 1e3, o = parseInt(
      (1e3 / (e[2] - e[0]) * (e[3] - e[1])).toFixed(0)
    );
    return t.style = `
        width:${r}px;
        height:${o}px;
        position:absolute;
        left:-9999px;
        top:-9999px;
        background: transparent
        `, document.body.appendChild(t), { container: t, width: r, height: o };
  }
}
class Q_ {
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
    const [r, o, a = 0] = this.config.position;
    this.centerLongitude = r, this.centerLatitude = o, this.centerHeight = a, this.radius = this.config.radius, this.speed = this.config.speed, this.color = this.getColor(this.config.color), this.outlineColor = this.getColor(this.config.outlineColor), this.heading = 0, this.wallPositions = this.calculateScanPane(
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
      position: S.Cartesian3.fromDegrees(
        this.centerLongitude,
        this.centerLatitude,
        this.centerHeight
      ),
      name: "3D radar scanner",
      ellipsoid: {
        radii: new S.Cartesian3(this.radius, this.radius, this.radius),
        maximumCone: S.Math.toRadians(90),
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
        positions: new S.CallbackProperty(() => S.Cartesian3.fromDegreesArrayHeights(this.wallPositions), !1),
        material: this.color.withAlpha(this.config.scanAlpha)
      }
    });
    return this.entities.push(e), e;
  }
  calculateScanPane(e, t, r, o) {
    const a = S.Cartesian3.fromDegrees(e, t, this.centerHeight), u = S.Transforms.eastNorthUpToFixedFrame(a), c = S.Math.toRadians(o), f = S.Cartesian3.fromElements(
      r * Math.cos(c),
      r * Math.sin(c),
      0
    ), g = S.Matrix4.multiplyByPoint(
      u,
      f,
      new S.Cartesian3()
    ), v = S.Cartographic.fromCartesian(g);
    return this.calculateScanSector(
      e,
      t,
      S.Math.toDegrees(v.longitude),
      S.Math.toDegrees(v.latitude)
    );
  }
  calculateScanSector(e, t, r, o) {
    const a = [e, t, this.centerHeight], u = S.Cartesian3.distance(
      S.Cartesian3.fromDegrees(e, t, this.centerHeight),
      S.Cartesian3.fromDegrees(r, o, this.centerHeight)
    );
    for (let c = 0; c <= 90; c += 2) {
      const f = S.Math.toRadians(c), g = this.centerHeight + u * Math.sin(f), v = Math.cos(f);
      a.push((r - e) * v + e), a.push((o - t) * v + t), a.push(g);
    }
    return a;
  }
  getColor(e) {
    return e instanceof S.Color ? e : S.Color.fromCssColorString(e || "#05fbf8");
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
const Dw = {
  IconGroupLayer: xd,
  LabelGroupLayer: Ed,
  LineGroupLayer: Cd,
  LinePrimitiveLayer: kd,
  Build3DLayer: Id,
  BubbleLayer: Sd,
  BubbleGroupLayer: T_,
  CircleGroupLayer: R_,
  CircleWaveLayer: D_,
  CircleExplosionLayer: G_,
  PointRippleLayer: U_,
  PolygonPrimitiveLayer: Y_,
  LineMaterialLayer: X_,
  HeatmapLayer: V_,
  HeatmapPrimitiveLayer: J_,
  RadarScanner3DLayer: Q_
}, zi = 3.141592653589793 * 3e3 / 180, yt = 3.141592653589793, Cc = 6378245, kc = 0.006693421622965943;
class An {
  static BD09ToGCJ02(e, t) {
    const r = Number(e) - 65e-4, o = Number(t) - 6e-3, a = Math.sqrt(r * r + o * o) - 2e-5 * Math.sin(o * zi), u = Math.atan2(o, r) - 3e-6 * Math.cos(r * zi);
    return [a * Math.cos(u), a * Math.sin(u)];
  }
  static GCJ02ToBD09(e, t) {
    const r = Number(e), o = Number(t), a = Math.sqrt(r ** 2 + o ** 2) + 2e-5 * Math.sin(o * zi), u = Math.atan2(o, r) + 3e-6 * Math.cos(r * zi);
    return [a * Math.cos(u) + 65e-4, a * Math.sin(u) + 6e-3];
  }
  static WGS84ToGCJ02(e, t) {
    const r = Number(e), o = Number(t);
    if (this.outOfChina(r, o)) return [r, o];
    const [a, u] = this.delta(r, o);
    return [r + a, o + u];
  }
  static GCJ02ToWGS84(e, t) {
    const r = Number(e), o = Number(t);
    if (this.outOfChina(r, o)) return [r, o];
    const [a, u] = this.delta(r, o);
    return [r - a, o - u];
  }
  static delta(e, t) {
    let r = this.transformLng(e - 105, t - 35), o = this.transformLat(e - 105, t - 35);
    const a = t / 180 * yt;
    let u = Math.sin(a);
    u = 1 - kc * u * u;
    const c = Math.sqrt(u);
    return r = r * 180 / (Cc / c * Math.cos(a) * yt), o = o * 180 / (Cc * (1 - kc) / (u * c) * yt), [r, o];
  }
  static transformLng(e, t) {
    let r = 300 + e + 2 * t + 0.1 * e ** 2 + 0.1 * e * t + 0.1 * Math.sqrt(Math.abs(e));
    return r += (20 * Math.sin(6 * e * yt) + 20 * Math.sin(2 * e * yt)) * 2 / 3, r += (20 * Math.sin(e * yt) + 40 * Math.sin(e / 3 * yt)) * 2 / 3, r += (150 * Math.sin(e / 12 * yt) + 300 * Math.sin(e / 30 * yt)) * 2 / 3, r;
  }
  static transformLat(e, t) {
    let r = -100 + 2 * e + 3 * t + 0.2 * t ** 2 + 0.1 * e * t + 0.2 * Math.sqrt(Math.abs(e));
    return r += (20 * Math.sin(6 * e * yt) + 20 * Math.sin(2 * e * yt)) * 2 / 3, r += (20 * Math.sin(t * yt) + 40 * Math.sin(t / 3 * yt)) * 2 / 3, r += (160 * Math.sin(t / 12 * yt) + 320 * Math.sin(t * yt / 30)) * 2 / 3, r;
  }
  static outOfChina(e, t) {
    return !(e > 73.66 && e < 135.05 && t > 3.86 && t < 53.55);
  }
  // 兼容旧版 API 命名。
  static out_of_china(e, t) {
    return this.outOfChina(e, t);
  }
}
class bs extends S.WebMercatorTilingScheme {
  constructor(e = {}) {
    super(e);
    const t = new S.WebMercatorProjection();
    this._projection.project = (r) => {
      const [o, a] = An.WGS84ToGCJ02(
        S.Math.toDegrees(r.longitude),
        S.Math.toDegrees(r.latitude)
      ), u = t.project(new S.Cartographic(
        S.Math.toRadians(o),
        S.Math.toRadians(a)
      ));
      return new S.Cartesian2(u.x, u.y);
    }, this._projection.unproject = (r) => {
      const o = t.unproject(r), [a, u] = An.GCJ02ToWGS84(
        S.Math.toDegrees(o.longitude),
        S.Math.toDegrees(o.latitude)
      );
      return new S.Cartographic(
        S.Math.toRadians(a),
        S.Math.toRadians(u)
      );
    };
  }
}
const Ic = {
  img: "//webst{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
  elec: "//webrd{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
  cva: "//webst{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"
};
class If extends S.UrlTemplateImageryProvider {
  constructor(e = {}) {
    var r;
    const t = {
      ...e,
      url: e.url || `${e.protocol || ""}${Ic[e.style] || Ic.elec}`,
      subdomains: (r = e.subdomains) != null && r.length ? e.subdomains : ["01", "02", "03", "04"]
    };
    e.crs === "WGS84" && !e.tilingScheme && (t.tilingScheme = new bs()), super(t);
  }
}
const Sf = "https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer";
function j_(n, e) {
  const t = String(n).replace(/\/$/, ""), o = t.includes("{z}") && t.includes("{x}") && (t.includes("{y}") || t.includes("{reverseY}")) ? t : `${t}/tile/{z}/{y}/{x}`;
  if (!e) return o;
  const a = o.includes("?") ? "&" : "?";
  return `${o}${a}token=${encodeURIComponent(e)}`;
}
class bf extends S.UrlTemplateImageryProvider {
  constructor(e = {}) {
    const t = e.url || Sf;
    super({
      ...e,
      url: j_(t, e.accessToken),
      minimumLevel: e.minimumLevel ?? 0,
      maximumLevel: e.maximumLevel ?? 23,
      credit: e.credit || new S.Credit("© Esri World Imagery")
    }), this._serviceUrl = t;
  }
  get serviceUrl() {
    return this._serviceUrl;
  }
}
const ew = 637099681e-2, tw = [1289059486e-2, 836237787e-2, 5591021, 348198983e-2, 167804312e-2, 0], Sc = [75, 60, 45, 30, 15, 0], bc = [
  [1410526172116255e-23, 898305509648872e-20, -1.9939833816331, 200.9824383106796, -187.2403703815547, 91.6087516669843, -23.38765649603339, 2.57121317296198, -0.03801003308653, 173379812e-1],
  [-7435856389565537e-24, 8983055097726239e-21, -0.78625201886289, 96.32687599759846, -1.85204757529826, -59.36935905485877, 47.40033549296737, -16.50741931063887, 2.28786674699375, 1026014486e-2],
  [-3030883460898826e-23, 898305509983578e-20, 0.30071316287616, 59.74293618442277, 7.357984074871, -25.38371002664745, 13.45380521110908, -3.29883767235584, 0.32710905363475, 685681737e-2],
  [-1981981304930552e-23, 8983055099779535e-21, 0.03278182852591, 40.31678527705744, 0.65659298677277, -4.44255534477492, 0.85341911805263, 0.12923347998204, -0.04625736007561, 448277706e-2],
  [309191371068437e-23, 8983055096812155e-21, 6995724062e-14, 23.10934304144901, -23663490511e-14, -0.6321817810242, -0.00663494467273, 0.03430082397953, -0.00466043876332, 25551644e-1],
  [2890871144776878e-24, 8983055095805407e-21, -3068298e-14, 7.47137025468032, -353937994e-14, -0.02145144861037, -1234426596e-14, 10322952773e-14, -323890364e-14, 826088.5]
], Mc = [
  [-0.0015702102444, 111320.7020616939, 1704480524535203, -10338987376042340, 26112667856603880, -35149665666353700, 26595700718403920, -10725012458148240, 1800819912950474, 82.5],
  [8277824516172526e-19, 111320.7020463578, 6477955746671607e-7, -4082003173641316e-6, 1077490566351142e-5, -1517187553151559e-5, 1205306533862167e-5, -5124939663577472e-6, 9133119352032032e-7, 67.5],
  [0.00337398766765, 111320.7020202162, 4481351045890365e-9, -2339375119931662e-8, 79682215475871e-6, -1159649932795258e-7, 9723671115621457e-8, -4366194367355427e-8, 8477230501135234e-9, 52.5],
  [0.00220636496208, 111320.7020209128, 51751.86112841131, 3796836975426176e-9, 992013.7397791013, -122195221711287e-8, 1340652697009075e-9, -620943.6990984312, 144416.3844131725, 37.5],
  [-3441963504388392e-19, 111320.7020576856, 278.2353398772752, 2485758690035394e-9, 6070.750963243378, 54821.18355235118, 9540.606633304236, -2710.55326745, 1405.483844121726, 22.5],
  [-3218135878613132e-19, 111320.7020701615, 0.00369383431289, 823725.6402795718, 0.46104986909093, 2351.343141331292, 1.58060784298199, 8.77738589078284, 0.37238884252424, 7.45]
];
class Mf {
  constructor(e = {}) {
    this.isWgs84 = !!e.isWgs84;
  }
  convertMC2LL(e) {
    if (!e) return { lng: 0, lat: 0 };
    if (this.isWgs84) {
      const a = e.lng / 2003750834e-2 * 180, u = e.lat / 2003750834e-2 * 180, c = 180 / Math.PI * (2 * Math.atan(Math.exp(u * Math.PI / 180)) - Math.PI / 2);
      return { lng: Number(a.toFixed(6)), lat: Number(c.toFixed(6)) };
    }
    const t = Math.abs(e.lat), r = bc[tw.findIndex((a) => t >= a)] || bc.at(-1), o = this.convertor(e, r);
    return { lng: Number(o.lng.toFixed(6)), lat: Number(o.lat.toFixed(6)) };
  }
  convertLL2MC(e) {
    if (!e) return { lng: 0, lat: 0 };
    if (e.lng > 180 || e.lng < -180 || e.lat > 90 || e.lat < -90) return e;
    if (this.isWgs84) {
      const u = e.lng * Math.PI / 180 * 6378137, c = e.lat * Math.PI / 180, f = 6378137 / 2 * Math.log((1 + Math.sin(c)) / (1 - Math.sin(c)));
      return { lng: Number(u.toFixed(2)), lat: Number(f.toFixed(2)) };
    }
    const t = {
      lng: this.getLoop(e.lng, -180, 180),
      lat: this.getRange(e.lat, -74, 74)
    };
    let r = Sc.findIndex((a) => t.lat >= a);
    r < 0 && (r = Sc.findIndex((a) => t.lat <= -a));
    const o = this.convertor(t, Mc[r < 0 ? Mc.length - 1 : r]);
    return { lng: Number(o.lng.toFixed(2)), lat: Number(o.lat.toFixed(2)) };
  }
  convertor(e, t) {
    if (!e || !t) return { lng: 0, lat: 0 };
    let r = t[0] + t[1] * Math.abs(e.lng);
    const o = Math.abs(e.lat) / t[9];
    let a = t[2];
    for (let u = 1; u <= 6; u += 1) a += t[u + 2] * o ** u;
    return r *= e.lng < 0 ? -1 : 1, a *= e.lat < 0 ? -1 : 1, { lng: r, lat: a };
  }
  getDistanceByMC(e, t) {
    return this.getDistanceByLL(this.convertMC2LL(e), this.convertMC2LL(t));
  }
  getDistanceByLL(e, t) {
    if (!e || !t) return 0;
    const r = {
      lng: this.getLoop(e.lng, -180, 180),
      lat: this.getRange(e.lat, -74, 74)
    }, o = {
      lng: this.getLoop(t.lng, -180, 180),
      lat: this.getRange(t.lat, -74, 74)
    };
    return this.getDistance(
      this.toRadians(r.lng),
      this.toRadians(o.lng),
      this.toRadians(r.lat),
      this.toRadians(o.lat)
    );
  }
  getDistance(e, t, r, o) {
    return ew * Math.acos(Math.sin(r) * Math.sin(o) + Math.cos(r) * Math.cos(o) * Math.cos(t - e));
  }
  toRadians(e) {
    return Math.PI * e / 180;
  }
  toDegrees(e) {
    return 180 * e / Math.PI;
  }
  getRange(e, t, r) {
    return Math.min(r ?? e, Math.max(t ?? e, e));
  }
  getLoop(e, t, r) {
    const o = r - t;
    for (; e > r; ) e -= o;
    for (; e < t; ) e += o;
    return e;
  }
  lngLatToMercator(e) {
    return this.convertLL2MC(e);
  }
  lngLatToPoint(e) {
    const t = this.convertLL2MC(e);
    return { x: t.lng, y: t.lat };
  }
  mercatorToLngLat(e) {
    return this.convertMC2LL(e);
  }
  pointToLngLat(e) {
    return this.convertMC2LL({ lng: e.x, lat: e.y });
  }
  pointToPixel(e, t, r, o) {
    if (!e) return;
    const a = this.lngLatToMercator(e), u = this.getZoomUnits(t);
    return {
      x: Math.round((a.lng - r.lng) / u + o.width / 2),
      y: Math.round((r.lat - a.lat) / u + o.height / 2)
    };
  }
  pixelToPoint(e, t, r, o) {
    if (!e) return;
    const a = this.getZoomUnits(t);
    return this.mercatorToLngLat({
      lng: r.lng + a * (e.x - o.width / 2),
      lat: r.lat - a * (e.y - o.height / 2)
    });
  }
  getZoomUnits(e) {
    return 2 ** (18 - e);
  }
}
class Lf extends S.WebMercatorTilingScheme {
  constructor(e = {}) {
    super(e);
    const t = new Mf();
    this._projection.project = (r) => {
      let o = An.WGS84ToGCJ02(
        S.Math.toDegrees(r.longitude),
        S.Math.toDegrees(r.latitude)
      );
      o = An.GCJ02ToBD09(o[0], o[1]), o[0] = Math.min(180, Math.max(-180, o[0])), o[1] = Math.min(74.000022, Math.max(-71.988531, o[1]));
      const a = t.lngLatToPoint({ lng: o[0], lat: o[1] });
      return new S.Cartesian2(a.x, a.y);
    }, this._projection.unproject = (r) => {
      let o = t.mercatorToLngLat({ lng: r.x, lat: r.y });
      return o = An.BD09ToGCJ02(o.lng, o.lat), o = An.GCJ02ToWGS84(o[0], o[1]), new S.Cartographic(
        S.Math.toRadians(o[0]),
        S.Math.toRadians(o[1])
      );
    }, this.resolutions = e.resolutions || [];
  }
  tileXYToNativeRectangle(e, t, r, o) {
    const a = this.resolutions[r], u = e * a, c = (e + 1) * a, f = (-t + 1) * a, g = -t * a;
    return S.defined(o) ? (o.west = u, o.south = g, o.east = c, o.north = f, o) : new S.Rectangle(u, g, c, f);
  }
  positionToTileXY(e, t, r) {
    if (!S.Rectangle.contains(this._rectangle, e)) return;
    const o = this._projection.project(e);
    if (!S.defined(o)) return;
    const a = this.resolutions[t], u = Math.floor(o.x / a), c = -Math.floor(o.y / a);
    return S.defined(r) ? (r.x = u, r.y = c, r) : new S.Cartesian2(u, c);
  }
}
const nw = {
  vec: "https://maponline0.bdimg.com/tile/?qt=vtile&x={x}&y={y}&z={z}&styles=pl&scaler=1&udt=20210709",
  img: "https://maponline{s}.bdimg.com/starpic/?qt=satepc&u=x={x};y={y};z={z};v=009;type=sate&fm=46"
}, Pf = Object.freeze({
  normal: "vec",
  vec: "vec",
  vector: "vec",
  elec: "vec",
  img: "img",
  image: "img",
  imagery: "img",
  satellite: "img",
  custom: "custom"
});
function rw(n = "normal") {
  return Pf[String(n).toLowerCase()];
}
function iw(n, e) {
  if (!e) return n;
  const t = String(e).replace(/:\/\/$/, "").replace(/:$/, "");
  return n.replace(/^https?:/, `${t}:`);
}
class Nf extends S.UrlTemplateImageryProvider {
  constructor(e = {}) {
    const t = rw(e.style);
    if (!e.url && !t)
      throw new Error(`Unsupported Baidu map style: ${e.style}`);
    if (!e.url && t === "custom")
      throw new Error("Baidu custom map style requires an authorized custom url.");
    const r = e.url || nw[t], o = e.customId || e.style || "", a = iw(r, e.protocol).replaceAll("{customId}", encodeURIComponent(o)).replaceAll("{style}", encodeURIComponent(o));
    let u = e.tilingScheme;
    if (!u && e.crs === "WGS84") {
      const f = Array.from({ length: 19 }, (g, v) => 256 * 2 ** (18 - v));
      u = new Lf({
        resolutions: f,
        rectangleSouthwestInMeters: new S.Cartesian2(-2003772637e-2, -1247410417e-2),
        rectangleNortheastInMeters: new S.Cartesian2(2003772637e-2, 1247410417e-2)
      });
    } else u || (u = new S.WebMercatorTilingScheme({
      rectangleSouthwestInMeters: new S.Cartesian2(-33554054, -33746824),
      rectangleNortheastInMeters: new S.Cartesian2(33554054, 33746824)
    }));
    const c = e.subdomains || ["0", "1", "2", "3"];
    super({
      ...e,
      url: a,
      subdomains: c,
      tilingScheme: u,
      maximumLevel: e.maximumLevel ?? 18,
      credit: e.credit || new S.Credit("© Baidu Maps")
    }), this._url = a, this._crs = e.crs || "BD09", this._style = t || "custom", this._subdomains = Array.isArray(c) ? c : String(c).split(""), this._rectangle = this._tilingScheme.rectangle;
  }
  requestImage(e, t, r) {
    const o = this._tilingScheme.getNumberOfXTilesAtLevel(r), a = this._tilingScheme.getNumberOfYTilesAtLevel(r), u = this._subdomains[Math.abs(e + t + r) % this._subdomains.length] || "0";
    let c = this._url.replaceAll("{z}", String(r)).replaceAll("{s}", u);
    return this._crs === "WGS84" ? c = c.replaceAll("{x}", String(e)).replaceAll("{y}", String(-t)) : c = c.replaceAll("{x}", String(e - o / 2)).replaceAll("{y}", String(a / 2 - t - 1)), S.ImageryProvider.loadImage(this, c);
  }
}
const sw = "//tiles{s}.geovisearth.com/base/v1/{style}/{z}/{x}/{y}?format={format}&tmsIds=w&token={key}";
class Tf extends S.UrlTemplateImageryProvider {
  constructor(e = {}) {
    const t = e.url || `${e.protocol || ""}${sw.replaceAll("{style}", e.style || "vec").replaceAll("{format}", e.format || "png").replaceAll("{key}", e.key || "")}`;
    super({
      ...e,
      url: t,
      subdomains: e.subdomains || ["1", "2", "3"]
    });
  }
}
const Rf = Object.freeze({
  normal: "m",
  vec: "m",
  vector: "m",
  elec: "m",
  roadmap: "m",
  img: "s",
  image: "s",
  imagery: "s",
  satellite: "s",
  cva: "h",
  label: "h",
  labels: "h",
  ter: "p",
  terrain: "p",
  img_cva: "y",
  hybrid: "y"
}), ow = "https://mt{s}.google.com/vt/lyrs={style}&hl={language}&gl={region}&x={x}&y={y}&z={z}", aw = "https://tile.googleapis.com/v1/2dtiles/{z}/{x}/{y}?session={sessionToken}&key={key}";
function uw(n, e) {
  if (n.url) return n.url;
  if (n.key || n.sessionToken) {
    if (!n.key || !n.sessionToken)
      throw new Error("Google Maps Tile API requires both key and sessionToken.");
    return aw.replace("{key}", encodeURIComponent(n.key)).replace("{sessionToken}", encodeURIComponent(n.sessionToken));
  }
  return ow.replace("{style}", e).replace("{language}", encodeURIComponent(n.language || "zh-CN")).replace("{region}", encodeURIComponent(n.region || "cn"));
}
class Af extends S.UrlTemplateImageryProvider {
  constructor(e = {}) {
    const t = String(e.style || "normal").toLowerCase(), r = Rf[t];
    if (!e.url && !r)
      throw new Error(`Unsupported Google map style: ${e.style}`);
    const o = {
      ...e,
      url: uw(e, r),
      subdomains: e.subdomains || ["0", "1", "2", "3"],
      maximumLevel: e.maximumLevel ?? 22,
      credit: e.credit || new S.Credit("© Google")
    };
    e.crs === "WGS84" && !e.tilingScheme && !(e.key && e.sessionToken) && (o.tilingScheme = new bs()), super(o), this._style = t;
  }
}
const lw = "//t{s}.tianditu.gov.cn/DataServer?T={style}_w&x={x}&y={y}&l={z}&tk={key}";
class Of extends S.UrlTemplateImageryProvider {
  constructor(e = {}) {
    const t = e.url || `${e.protocol || ""}${lw.replaceAll("{style}", e.style || "vec").replaceAll("{key}", e.key || "")}`;
    super({
      ...e,
      url: t,
      subdomains: e.subdomains || ["0", "1", "2", "3", "4", "5", "6", "7"],
      maximumLevel: e.maximumLevel ?? 18
    });
  }
}
const Lc = {
  img: "//p{s}.map.gtimg.com/sateTiles/{z}/{sx}/{sy}/{x}_{reverseY}.jpg?version=400",
  elec: "//rt{s}.map.gtimg.com/tile?z={z}&x={x}&y={reverseY}&styleid={style}&scene=0&version=347"
};
class Df extends S.UrlTemplateImageryProvider {
  constructor(e = {}) {
    var a;
    const t = e.style || "1", r = (e.url || `${e.protocol || ""}${Lc[e.style] || Lc.elec}`).replace("{style}", t), o = {
      ...e,
      url: r,
      subdomains: (a = e.subdomains) != null && a.length ? e.subdomains : ["0", "1", "2"]
    };
    e.style === "img" && (o.customTags = {
      ...e.customTags || {},
      sx: (u, c) => c >> 4,
      sy: (u, c, f, g) => (1 << g) - f >> 4
    }), super(o);
  }
}
const Ff = {
  amap: If,
  arcgis: bf,
  baidu: Nf,
  geovis: Tf,
  google: Af,
  tdt: Of,
  tencent: Df
}, cw = /* @__PURE__ */ new Set([
  "type",
  "provider",
  "providerOptions",
  "index",
  "show",
  "themeColor",
  "layerOptions",
  "coordinateSystem",
  "token"
]);
function hw(n) {
  const e = { ...n, ...n.providerOptions || {} };
  return cw.forEach((t) => delete e[t]), e;
}
function Bf(n = {}) {
  if (n.provider) return n.provider;
  const e = String(n.type || "url-template").toLowerCase(), t = hw(n);
  if (e === "url-template" || e === "offline") {
    if (!t.url) throw new Error("Base map URL is required.");
    return n.token && (t.url = new S.Resource({
      url: t.url,
      headers: { Authorization: n.token }
    })), !t.tilingScheme && n.coordinateSystem === "GCJ02" && (t.tilingScheme = new bs()), new S.UrlTemplateImageryProvider(t);
  }
  const r = Ff[e];
  if (!r)
    throw new Error(`Unsupported base map type: ${e}`);
  return new r(t);
}
const fw = Object.freeze([
  "url-template",
  ...Object.keys(Ff)
]);
class gw {
  constructor(e, t = {}) {
    if (!e) throw new Error("Viewer is required.");
    this.viewer = e, this.config = {}, this.imageryLayer = null, this.theme = null, this.destroyed = !1, this.load(t);
  }
  load(e = {}) {
    this.ensureUsable(), this.remove(), this.config = {
      type: "url-template",
      index: 0,
      show: !0,
      ...e
    };
    const t = Bf(this.config), r = {
      show: this.config.show,
      ...this.config.layerOptions || {}
    };
    this.imageryLayer = new S.ImageryLayer(t, r);
    const o = this.viewer.imageryLayers, a = Math.max(0, Math.min(this.config.index, o.length));
    return o.add(this.imageryLayer, a), this.config.themeColor && this.setTheme(this.config.themeColor), this.imageryLayer;
  }
  switch(e = {}) {
    return this.load({ ...this.config, ...e });
  }
  getImageryLayer() {
    return this.imageryLayer;
  }
  getProvider() {
    var e;
    return ((e = this.imageryLayer) == null ? void 0 : e.imageryProvider) || null;
  }
  setTheme(e) {
    this.ensureUsable(), this.removeColor(), e && (this.theme = new wd(this.viewer), this.theme.addColor({ invertColor: !0, filterRGB: e }));
  }
  removeColor() {
    var e;
    (e = this.theme) == null || e.restore(), this.theme = null;
  }
  show() {
    this.imageryLayer && (this.imageryLayer.show = !0);
  }
  hide() {
    this.imageryLayer && (this.imageryLayer.show = !1);
  }
  remove() {
    this.removeColor(), this.imageryLayer && this.viewer && !this.viewer.isDestroyed() && this.viewer.imageryLayers.contains(this.imageryLayer) && this.viewer.imageryLayers.remove(this.imageryLayer, !0), this.imageryLayer = null;
  }
  destroy() {
    this.destroyed || (this.remove(), this.destroyed = !0, this.viewer = null, this.config = null);
  }
  isDestroyed() {
    return this.destroyed;
  }
  ensureUsable() {
    if (this.destroyed) throw new Error("BaseMap has been destroyed.");
    if (!this.viewer || this.viewer.isDestroyed())
      throw new Error("Viewer is unavailable.");
  }
}
class dw extends S.GeographicTilingScheme {
  constructor(e = {}) {
    super(e), this._origin = e.origin || [-180, 90], this._zoomOffset = e.zoomOffset || 0, this._tileSize = e.tileSize || 256, this._resolutions = e.resolutions || [];
  }
  get zoomOffset() {
    return this._zoomOffset;
  }
  tileXYToRectangle(e, t, r, o) {
    const a = this._resolutions[r + this._zoomOffset];
    if (!a) return S.Rectangle.MAX_VALUE;
    const u = a * this._tileSize, c = S.Math.toRadians(this._origin[0] + e * u), f = S.Math.toRadians(this._origin[1] - (t + 1) * u), g = S.Math.toRadians(this._origin[0] + (e + 1) * u), v = S.Math.toRadians(this._origin[1] - t * u);
    return S.defined(o) ? (o.west = c, o.south = f, o.east = g, o.north = v, o) : new S.Rectangle(c, f, g, v);
  }
  positionToTileXY(e, t, r) {
    const o = this._resolutions[t + this._zoomOffset];
    if (!o) return new S.Cartesian2();
    const a = o * this._tileSize, u = S.Math.toDegrees(e.longitude), c = S.Math.toDegrees(e.latitude), f = Math.floor((u - this._origin[0]) / a), g = Math.floor((this._origin[1] - c) / a);
    return S.defined(r) ? (r.x = f, r.y = g, r) : new S.Cartesian2(Math.max(0, f), Math.max(0, g));
  }
}
class mw extends S.WebMercatorTilingScheme {
  constructor(e = {}) {
    super(e), this._origin = e.origin || [-200375083427892e-7, 200375083427892e-7], this._zoomOffset = e.zoomOffset || 0, this._tileSize = e.tileSize || 256, this._resolutions = e.resolutions || [];
  }
  get zoomOffset() {
    return this._zoomOffset;
  }
  tileXYToNativeRectangle(e, t, r, o) {
    const a = this._resolutions[r + this._zoomOffset];
    if (!a || e < 0 || t < 0) return S.Rectangle.MAX_VALUE;
    const u = a * this._tileSize, c = this._origin[0] + e * u, f = this._origin[1] - (t + 1) * u, g = this._origin[0] + (e + 1) * u, v = this._origin[1] - t * u;
    return S.defined(o) ? (o.west = c, o.south = f, o.east = g, o.north = v, o) : new S.Rectangle(c, f, g, v);
  }
  positionToTileXY(e, t, r) {
    if (!S.Rectangle.contains(this._rectangle, e)) return;
    const o = this._resolutions[t + this._zoomOffset];
    if (!o) return new S.Cartesian2();
    const a = o * this._tileSize, u = this._projection.project(e), c = Math.floor((u.x - this._origin[0]) / a), f = Math.floor((this._origin[1] - u.y) / a);
    return S.defined(r) ? (r.x = c, r.y = f, r) : new S.Cartesian2(Math.max(0, c), Math.max(0, f));
  }
}
const Fw = {
  BaseMap: gw,
  createImageryProvider: Bf,
  imageryProviderTypes: fw,
  AMapImageryProvider: If,
  ArcGISImageryProvider: bf,
  arcgisWorldImageryUrl: Sf,
  BaiduImageryProvider: Nf,
  baiduImageryStyles: Pf,
  TencentImageryProvider: Df,
  TdtImageryProvider: Of,
  GoogleImageryProvider: Af,
  googleImageryStyles: Rf,
  GeoVisImageryProvider: Tf,
  GCJ02TilingScheme: bs,
  BD09TilingScheme: Lf,
  CustomGeographicTilingScheme: dw,
  CustomMercatorTilingScheme: mw,
  BD09Projection: Mf,
  CoordTransform: An
};
let Pc = 0;
function vw(n) {
  return Pc += 1, `bmap-viewer-weather-${n}-${Pc}`;
}
class Gn {
  constructor(e, t, r = {}, o = {}) {
    var a;
    if (!((a = e == null ? void 0 : e.scene) != null && a.postProcessStages))
      throw new Error("A Cesium Viewer with postProcessStages is required.");
    this.viewer = e, this.type = t, this.defaults = { ...r }, this.config = { ...r, ...o }, this.stage = null, this.destroyed = !1, this.colorCache = /* @__PURE__ */ new Map();
  }
  load(e = {}) {
    return this.ensureUsable(), this.remove(), this.config = { ...this.defaults, ...this.config, ...e }, this.colorCache.clear(), this.stage = this.createStage(vw(this.type)), this.viewer.scene.postProcessStages.add(this.stage), this.viewer.scene.requestRender(), this.stage;
  }
  createStage() {
    throw new Error("createStage must be implemented by the weather effect.");
  }
  setOptions(e = {}) {
    return this.ensureUsable(), this.config = { ...this.config, ...e }, this.colorCache.clear(), this.viewer.scene.requestRender(), this;
  }
  getOptions() {
    return { ...this.config };
  }
  getStage() {
    return this.stage;
  }
  getColor(e, t) {
    const r = this.config[e] ?? t, o = `${e}:${String(r)}`;
    if (!this.colorCache.has(o)) {
      const a = r instanceof S.Color ? S.Color.clone(r) : S.Color.fromCssColorString(String(r));
      if (!a) throw new Error(`Invalid weather color: ${r}`);
      this.colorCache.set(o, a);
    }
    return this.colorCache.get(o);
  }
  getNumber(e, t, r = -1 / 0, o = 1 / 0) {
    const a = Number(this.config[e] ?? t);
    return Number.isFinite(a) ? Math.min(o, Math.max(r, a)) : t;
  }
  show() {
    return this.ensureUsable(), this.stage && (this.stage.enabled = !0), this.viewer.scene.requestRender(), this;
  }
  hide() {
    return this.ensureUsable(), this.stage && (this.stage.enabled = !1), this.viewer.scene.requestRender(), this;
  }
  start() {
    return this.show();
  }
  stop() {
    return this.hide();
  }
  remove() {
    var t, r;
    const e = (r = (t = this.viewer) == null ? void 0 : t.scene) == null ? void 0 : r.postProcessStages;
    this.stage && (e != null && e.contains(this.stage)) && e.remove(this.stage), this.stage = null;
  }
  destroy() {
    this.destroyed || (this.remove(), this.destroyed = !0, this.colorCache.clear(), this.viewer = null, this.config = null, this.defaults = null);
  }
  isDestroyed() {
    return this.destroyed;
  }
  ensureUsable() {
    if (this.destroyed) throw new Error(`${this.constructor.name} has been destroyed.`);
    if (!this.viewer || this.viewer.isDestroyed())
      throw new Error("Viewer is unavailable.");
  }
}
const yw = (
  /* glsl */
  `
uniform sampler2D colorTexture;
uniform float intensity;
uniform float density;
uniform float speed;
uniform float size;
uniform float angle;
uniform float wind;
uniform vec4 tint;
in vec2 v_textureCoordinates;

float bmvRainHash(float value) {
  return fract(sin(value * 133.3) * 13.13);
}

void main() {
  vec4 sceneColor = texture(colorTexture, v_textureCoordinates);
  float time = float(czm_frameNumber) / 60.0 * speed;
  vec2 resolution = czm_viewport.zw;
  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  float radiansAngle = radians(angle);
  float sineAngle = sin(radiansAngle);
  float cosineAngle = cos(radiansAngle);
  uv *= mat2(cosineAngle, -sineAngle, sineAngle, cosineAngle);
  uv.x += time * wind * 0.05;
  uv *= length(uv + vec2(0.0, 4.9)) * 0.3 + 1.0;
  float velocity = 1.0 - sin(bmvRainHash(floor(uv.x * 100.0 * density)) * 2.0);
  float width = clamp(size, 0.1, 3.0) * 0.05;
  float threshold = 1.0 - width;
  float streak = clamp(
    abs(sin(20.0 * time * velocity + uv.y * (5.0 / (2.0 + velocity)))) - threshold,
    0.0,
    1.0
  ) / max(width, 0.0001);
  vec3 rainColor = tint.rgb * velocity * streak;
  float blend = clamp(intensity, 0.0, 1.0) * tint.a;
  out_FragColor = vec4(mix(sceneColor.rgb, rainColor, blend), sceneColor.a);
}
`
), pw = (
  /* glsl */
  `
uniform sampler2D colorTexture;
uniform float enabled;
uniform float fallInterval;
uniform float mixFactor;
in vec2 v_textureCoordinates;

float bmvLightningHash(float value) {
  return fract(21654.6512 * sin(385.51 * value));
}

float bmvLightningHash(vec2 point) {
  return fract(1654.65157 * sin(15.5134763 * point.x + 45.5173247 * point.y + 5.21789));
}

vec2 bmvLightningHash2(vec2 point) {
  return vec2(
    bmvLightningHash(point * 0.754),
    bmvLightningHash(1.5743 * point + 4.5476351)
  );
}

vec2 bmvLightningNoise2(vec2 position) {
  const vec2 add = vec2(1.0, 0.0);
  vec2 cell = floor(position);
  vec2 local = fract(position);
  local = local * local * (3.0 - 2.0 * local);
  return mix(
    mix(bmvLightningHash2(cell), bmvLightningHash2(cell + add.xy), local.x),
    mix(bmvLightningHash2(cell + add.yx), bmvLightningHash2(cell + add.xx), local.x),
    local.y
  );
}

vec2 bmvLightningFbm2(vec2 position) {
  vec2 result = vec2(0.0);
  float amplitude = 1.0;
  for (int index = 0; index < 8; index++) {
    result += bmvLightningNoise2(position) * amplitude;
    position *= 2.0;
    amplitude *= 0.5;
  }
  return result;
}

float bmvLightningSegmentDistance(vec2 segment, vec2 point) {
  float divisor = max(dot(segment, segment), 0.000001);
  float projection = clamp(dot(point, segment) / divisor, -0.2, 1.0);
  return length(point - segment * projection);
}

void main() {
  vec4 sceneColor = texture(colorTexture, v_textureCoordinates);
  if (enabled < 0.5) {
    out_FragColor = sceneColor;
    return;
  }

  vec2 pixel = gl_FragCoord.xy;
  float interval = clamp(fallInterval, 0.01, 1.0);
  float time = float(czm_frameNumber) * interval * clamp(interval * 0.1, 0.01, 0.1);
  vec2 point = pixel / czm_viewport.zw;
  vec2 direction;
  vec2 target = vec2(1.0, -1.0);
  float cloud = 0.0;

  if (point.y >= 0.0) {
    cloud = (1.0 - bmvLightningFbm2((point + 0.2) * point.y + 0.1 * time).x) * point.y;
  } else {
    cloud = (1.0 - bmvLightningFbm2(point + 0.2 + 0.1 * time).x) * point.y * point.y;
  }

  vec3 lightningColor = vec3(0.0);
  vec3 cloudColor = cloud * vec3(0.3, 0.5, 1.0);
  float minimumDistance = 100000.0;
  float eventSeed = bmvLightningHash(floor(5.0 * time));
  target += 4.0 * bmvLightningHash2(target + eventSeed) - 1.5;

  if (bmvLightningHash(eventSeed + 2.3) > 0.6) {
    for (int index = 0; index < 100; index++) {
      vec2 targetDelta = target - point;
      direction = 0.05 * (vec2(-0.5, -1.0) + bmvLightningHash2(vec2(float(index), eventSeed)));
      float distanceToSegment = bmvLightningSegmentDistance(direction, targetDelta);
      minimumDistance = min(minimumDistance, distanceToSegment);
      target -= direction;
      float glow = exp(-1.2 * distanceToSegment) + exp(-55.0 * minimumDistance);
      lightningColor = glow * vec3(0.7, 0.8, 1.0);
    }
  }

  lightningColor += cloudColor;
  float blend = clamp(mixFactor, 0.0, 1.0);
  out_FragColor = vec4(mix(sceneColor.rgb, lightningColor, blend), sceneColor.a);
}
`
), _w = (
  /* glsl */
  `
uniform sampler2D colorTexture;
uniform float intensity;
uniform float density;
uniform float speed;
uniform float size;
uniform float angle;
uniform float drift;
uniform vec4 tint;
in vec2 v_textureCoordinates;

float bmvSnow(vec2 uv, float scale, float time, vec2 direction) {
  float layerScale = scale * density;
  float verticalFade = 1.0 - smoothstep(0.0, 1.0, -uv.y * (layerScale / 10.0));
  if (verticalFade < 0.1) return 0.0;

  uv += direction * time * 3.16227766 / layerScale;
  uv.x += sin(uv.y + time * 0.5) * drift / layerScale;
  uv *= layerScale;

  vec2 cell = floor(uv);
  vec2 local = fract(uv);
  vec2 point = vec2(0.0);
  point = 0.5 + 0.35 * sin(
    11.0 * fract(sin((cell + point + layerScale) * mat2(7.0, 3.0, 6.0, 5.0)) * 5.0)
  ) - local;
  float distanceToFlake = length(point);
  float flake = smoothstep(
    0.0,
    distanceToFlake,
    sin(local.x + local.y) * 0.01 * size
  );
  return flake * verticalFade;
}

void main() {
  vec4 sceneColor = texture(colorTexture, v_textureCoordinates);
  vec2 resolution = czm_viewport.zw;
  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  float radiansAngle = radians(angle);
  vec2 direction = vec2(sin(radiansAngle), cos(radiansAngle));
  float time = float(czm_frameNumber) / 60.0 * speed;
  float snow = 0.0;
  snow += bmvSnow(uv, 10.0, time, direction);
  snow += bmvSnow(uv, 8.0, time, direction);
  snow += bmvSnow(uv, 6.0, time, direction);
  snow += bmvSnow(uv, 5.0, time, direction);
  vec3 snowColor = tint.rgb * snow;
  float blend = clamp(intensity, 0.0, 1.0) * tint.a;
  out_FragColor = vec4(mix(sceneColor.rgb, snowColor, blend), sceneColor.a);
}
`
), ww = (
  /* glsl */
  `
uniform sampler2D colorTexture;
uniform sampler2D depthTexture;
uniform float intensity;
uniform float nearDistance;
uniform float farDistance;
uniform float density;
uniform float skyAmount;
uniform vec4 fogColor;
in vec2 v_textureCoordinates;

void main() {
  vec4 sceneColor = texture(colorTexture, v_textureCoordinates);
  float depth = czm_readDepth(depthTexture, v_textureCoordinates);
  float fogFactor = skyAmount;
  if (depth < 0.999999) {
    vec4 eyePosition = czm_windowToEyeCoordinates(gl_FragCoord.xy, depth);
    float distanceToCamera = length(eyePosition.xyz);
    float rangeFog = smoothstep(nearDistance, max(farDistance, nearDistance + 1.0), distanceToCamera);
    fogFactor = 1.0 - exp(-rangeFog * density * 2.0);
  }
  fogFactor = clamp(fogFactor * intensity, 0.0, fogColor.a);
  out_FragColor = vec4(mix(sceneColor.rgb, fogColor.rgb, fogFactor), sceneColor.a);
}
`
), xw = (
  /* glsl */
  `
uniform sampler2D colorTexture;
uniform float intensity;
uniform float density;
uniform float speed;
uniform float wind;
uniform vec4 sandColor;
in vec2 v_textureCoordinates;

float bmvHash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

float bmvNoise(vec2 p) {
  vec2 cell = floor(p);
  vec2 local = fract(p);
  local = local * local * (3.0 - 2.0 * local);
  float a = bmvHash(cell);
  float b = bmvHash(cell + vec2(1.0, 0.0));
  float c = bmvHash(cell + vec2(0.0, 1.0));
  float d = bmvHash(cell + vec2(1.0, 1.0));
  return mix(mix(a, b, local.x), mix(c, d, local.x), local.y);
}

void main() {
  vec4 sceneColor = texture(colorTexture, v_textureCoordinates);
  float time = float(czm_frameNumber) / 60.0;
  vec2 uv = v_textureCoordinates;
  vec2 flow = vec2(time * speed * (0.12 + wind * 0.08), time * speed * 0.025);
  float haze = bmvNoise(uv * 4.0 + flow);
  haze += bmvNoise(uv * 13.0 + flow * 2.7) * 0.45;
  float grain = bmvHash(gl_FragCoord.xy + time * 37.0);
  float dust = clamp((haze * 0.68 + grain * 0.32) * density, 0.0, 1.0);
  float mixAmount = clamp(intensity * (0.38 + dust * 0.42), 0.0, sandColor.a);
  vec3 desaturated = mix(sceneColor.rgb, vec3(dot(sceneColor.rgb, vec3(0.299, 0.587, 0.114))), intensity * 0.32);
  out_FragColor = vec4(mix(desaturated, sandColor.rgb, mixAmount), sceneColor.a);
}
`
), Ew = (
  /* glsl */
  `
uniform sampler2D colorTexture;
uniform float intensity;
uniform float coverage;
uniform float scale;
uniform float speed;
uniform float altitude;
uniform vec4 cloudColor;
in vec2 v_textureCoordinates;

float bmvHash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float bmvNoise(vec2 p) {
  vec2 cell = floor(p);
  vec2 local = fract(p);
  local = local * local * (3.0 - 2.0 * local);
  return mix(
    mix(bmvHash(cell), bmvHash(cell + vec2(1.0, 0.0)), local.x),
    mix(bmvHash(cell + vec2(0.0, 1.0)), bmvHash(cell + vec2(1.0, 1.0)), local.x),
    local.y
  );
}

float bmvFbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.55;
  for (int index = 0; index < 5; index++) {
    value += amplitude * bmvNoise(p);
    p = p * 2.03 + vec2(7.1, 3.7);
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec4 sceneColor = texture(colorTexture, v_textureCoordinates);
  float time = float(czm_frameNumber) / 60.0;
  float aspect = czm_viewport.z / max(czm_viewport.w, 1.0);
  vec2 uv = v_textureCoordinates * vec2(aspect, 1.0);
  vec2 flow = vec2(time * speed * 0.025, time * speed * 0.006);
  float field = bmvFbm(uv * scale + flow);
  float threshold = mix(0.82, 0.28, coverage);
  float cloud = smoothstep(threshold, threshold + 0.22, field);
  float center = clamp(altitude, 0.15, 0.92);
  float band = 1.0 - smoothstep(0.28, 0.64, abs(v_textureCoordinates.y - center));
  cloud *= band * intensity * cloudColor.a;
  vec3 shadowed = sceneColor.rgb * (1.0 - cloud * 0.18);
  out_FragColor = vec4(mix(shadowed, cloudColor.rgb, cloud), sceneColor.a);
}
`
), Cw = (
  /* glsl */
  `
uniform sampler2D colorTexture;
uniform float intensity;
uniform float frequency;
uniform float brightness;
uniform float width;
uniform vec4 flashColor;
in vec2 v_textureCoordinates;

float bmvHash(vec2 p) {
  return fract(sin(dot(p, vec2(91.7, 137.3))) * 43758.5453);
}

void main() {
  vec4 sceneColor = texture(colorTexture, v_textureCoordinates);
  float time = float(czm_frameNumber) / 60.0;
  float eventTime = time * max(frequency, 0.01);
  float eventId = floor(eventTime);
  float phase = fract(eventTime);
  float chance = step(0.38, bmvHash(vec2(eventId, 4.7)));
  float pulse = exp(-phase * 22.0) + exp(-abs(phase - 0.18) * 42.0) * 0.55;
  pulse *= chance * intensity;

  vec2 uv = v_textureCoordinates;
  float origin = 0.25 + bmvHash(vec2(eventId, 9.2)) * 0.5;
  float path = origin
    + sin(uv.y * 25.0 + eventId) * 0.025
    + sin(uv.y * 63.0 + eventId * 2.3) * 0.012;
  float bolt = 1.0 - smoothstep(width * 0.25, width, abs(uv.x - path));
  bolt *= smoothstep(0.08, 0.28, uv.y) * (1.0 - smoothstep(0.72, 1.0, uv.y));
  float branchPath = path + (0.58 - uv.y) * 0.22;
  float branch = 1.0 - smoothstep(width * 0.18, width * 0.65, abs(uv.x - branchPath));
  branch *= smoothstep(0.34, 0.5, uv.y) * (1.0 - smoothstep(0.56, 0.72, uv.y));
  float lightning = clamp((bolt + branch * 0.55) * pulse * brightness, 0.0, 1.0);
  float flash = clamp(pulse * brightness * 0.22, 0.0, 0.82);
  vec3 flashed = mix(sceneColor.rgb, flashColor.rgb, flash * flashColor.a);
  out_FragColor = vec4(mix(flashed, flashColor.rgb, lightning), sceneColor.a);
}
`
), Wt = {
  intensity: 0.5,
  density: 1,
  speed: 1,
  size: 1,
  angle: -22.9183,
  wind: 0,
  color: "#99b3ccff",
  lightning: !1,
  lightningMixFactor: 0.35,
  lightningFallInterval: 0.8
};
class Gf extends Gn {
  constructor(e, t = {}) {
    super(e, "rain", Wt, t), this.rainStage = null, this.lightningStage = null, this.load();
  }
  createStage(e) {
    return this.rainStage = new S.PostProcessStage({
      name: `${e}-rain`,
      fragmentShader: yw,
      uniforms: {
        intensity: () => this.getNumber("intensity", Wt.intensity, 0, 1),
        density: () => this.getNumber("density", Wt.density, 0.1, 3),
        speed: () => this.getNumber("speed", Wt.speed, 0.05, 5),
        size: () => this.getNumber("size", Wt.size, 0.1, 3),
        angle: () => this.getNumber("angle", Wt.angle, -180, 180),
        wind: () => this.getNumber("wind", Wt.wind, -2, 2),
        tint: () => this.getColor("color", Wt.color)
      }
    }), this.lightningStage = new S.PostProcessStage({
      name: `${e}-lightning`,
      fragmentShader: pw,
      uniforms: {
        enabled: () => this.config.lightning ? 1 : 0,
        mixFactor: () => this.getNumber(
          "lightningMixFactor",
          Wt.lightningMixFactor,
          0,
          1
        ),
        fallInterval: () => this.getNumber(
          "lightningFallInterval",
          Wt.lightningFallInterval,
          0.01,
          1
        )
      }
    }), new S.PostProcessStageComposite({
      name: e,
      stages: [this.rainStage, this.lightningStage],
      inputPreviousStageTexture: !0
    });
  }
  remove() {
    super.remove(), this.rainStage = null, this.lightningStage = null;
  }
}
const pn = {
  intensity: 0.5,
  density: 1,
  speed: 1,
  size: 1,
  angle: 18.4349,
  drift: 1,
  color: "#ffffffff"
};
class qf extends Gn {
  constructor(e, t = {}) {
    super(e, "snow", pn, t), this.load();
  }
  createStage(e) {
    return new S.PostProcessStage({
      name: e,
      fragmentShader: _w,
      uniforms: {
        intensity: () => this.getNumber("intensity", pn.intensity, 0, 1),
        density: () => this.getNumber("density", pn.density, 0.1, 3),
        speed: () => this.getNumber("speed", pn.speed, 0.05, 5),
        size: () => this.getNumber("size", pn.size, 0.1, 3),
        angle: () => this.getNumber("angle", pn.angle, -180, 180),
        drift: () => this.getNumber("drift", pn.drift, -2, 2),
        tint: () => this.getColor("color", pn.color)
      }
    });
  }
}
const Nn = {
  intensity: 0.78,
  near: 500,
  far: 12e3,
  density: 1.15,
  skyAmount: 0.22,
  color: "#b9c7cddd"
};
function po(n = {}) {
  const e = { ...n };
  return e.far == null && e.visibility != null && (e.far = e.visibility), delete e.visibility, e;
}
class zf extends Gn {
  constructor(e, t = {}) {
    super(e, "fog", Nn, po(t)), this.load();
  }
  load(e = {}) {
    return super.load(po(e));
  }
  setOptions(e = {}) {
    return super.setOptions(po(e));
  }
  createStage(e) {
    return new S.PostProcessStage({
      name: e,
      fragmentShader: ww,
      uniforms: {
        intensity: () => this.getNumber("intensity", Nn.intensity, 0, 2),
        nearDistance: () => this.getNumber("near", Nn.near, 0, 1e7),
        farDistance: () => this.getNumber("far", Nn.far, 1, 1e7),
        density: () => this.getNumber("density", Nn.density, 0.01, 10),
        skyAmount: () => this.getNumber("skyAmount", Nn.skyAmount, 0, 1),
        fogColor: () => this.getColor("color", Nn.color)
      }
    });
  }
}
const Kn = {
  intensity: 0.72,
  density: 0.9,
  speed: 1,
  wind: 0.8,
  color: "#c8894de6"
};
class Wo extends Gn {
  constructor(e, t = {}) {
    super(e, "sandstorm", Kn, t), this.load();
  }
  createStage(e) {
    return new S.PostProcessStage({
      name: e,
      fragmentShader: xw,
      uniforms: {
        intensity: () => this.getNumber("intensity", Kn.intensity, 0, 2),
        density: () => this.getNumber("density", Kn.density, 0.05, 2.5),
        speed: () => this.getNumber("speed", Kn.speed, 0.01, 5),
        wind: () => this.getNumber("wind", Kn.wind, -2, 2),
        sandColor: () => this.getColor("color", Kn.color)
      }
    });
  }
}
const Tn = {
  intensity: 0.75,
  coverage: 0.58,
  scale: 3.8,
  speed: 0.65,
  altitude: 0.66,
  color: "#d7e0e6cc"
};
class Uf extends Gn {
  constructor(e, t = {}) {
    super(e, "cloud", Tn, t), this.load();
  }
  createStage(e) {
    return new S.PostProcessStage({
      name: e,
      fragmentShader: Ew,
      uniforms: {
        intensity: () => this.getNumber("intensity", Tn.intensity, 0, 2),
        coverage: () => this.getNumber("coverage", Tn.coverage, 0, 1),
        scale: () => this.getNumber("scale", Tn.scale, 0.25, 20),
        speed: () => this.getNumber("speed", Tn.speed, -5, 5),
        altitude: () => this.getNumber("altitude", Tn.altitude, 0, 1),
        cloudColor: () => this.getColor("color", Tn.color)
      }
    });
  }
}
const Jn = {
  intensity: 1,
  frequency: 0.42,
  brightness: 1.15,
  width: 0.012,
  color: "#e7edffff"
};
class Yf extends Gn {
  constructor(e, t = {}) {
    super(e, "lightning", Jn, t), this.load();
  }
  createStage(e) {
    return new S.PostProcessStage({
      name: e,
      fragmentShader: Cw,
      uniforms: {
        intensity: () => this.getNumber("intensity", Jn.intensity, 0, 2),
        frequency: () => this.getNumber("frequency", Jn.frequency, 0.01, 5),
        brightness: () => this.getNumber("brightness", Jn.brightness, 0, 3),
        width: () => this.getNumber("width", Jn.width, 1e-3, 0.08),
        flashColor: () => this.getColor("color", Jn.color)
      }
    });
  }
}
const kw = Object.freeze({
  rain: Gf,
  snow: qf,
  fog: zf,
  sandstorm: Wo,
  sand: Wo,
  cloud: Uf,
  lightning: Yf
});
function Xf(n, e, t = {}) {
  let r = e, o = t;
  e && typeof e == "object" && (r = e.type, o = { ...e }, delete o.type);
  const a = String(r || "").toLowerCase(), u = kw[a];
  if (!u)
    throw new Error(`Unsupported weather effect type: ${r}`);
  return new u(n, o);
}
const Iw = Object.freeze([
  "rain",
  "snow",
  "fog",
  "sandstorm",
  "cloud",
  "lightning"
]);
class Sw {
  constructor(e, t = {}) {
    if (!e) throw new Error("Viewer is required.");
    this.viewer = e, this.effect = null, this.type = null, this.config = null, this.destroyed = !1, t.type && this.load(t.type, t);
  }
  load(e, t = {}) {
    this.ensureUsable(), this.remove();
    const r = { ...t };
    return delete r.type, this.type = String(e).toLowerCase(), this.config = { ...r }, this.effect = Xf(this.viewer, this.type, r), this.effect;
  }
  switch(e, t = {}) {
    return this.load(e, t);
  }
  setOptions(e = {}) {
    if (this.ensureUsable(), !this.effect) throw new Error("No weather effect is loaded.");
    return this.config = { ...this.config, ...e }, this.effect.setOptions(e), this;
  }
  getEffect() {
    return this.effect;
  }
  show() {
    var e;
    return (e = this.effect) == null || e.show(), this;
  }
  hide() {
    var e;
    return (e = this.effect) == null || e.hide(), this;
  }
  remove() {
    var e;
    (e = this.effect) == null || e.destroy(), this.effect = null, this.type = null, this.config = null;
  }
  destroy() {
    this.destroyed || (this.remove(), this.destroyed = !0, this.viewer = null);
  }
  isDestroyed() {
    return this.destroyed;
  }
  ensureUsable() {
    if (this.destroyed) throw new Error("WeatherSystem has been destroyed.");
    if (!this.viewer || this.viewer.isDestroyed())
      throw new Error("Viewer is unavailable.");
  }
}
const Bw = {
  WeatherSystem: Sw,
  createWeatherEffect: Xf,
  weatherEffectTypes: Iw,
  BaseWeatherEffect: Gn,
  RainEffect: Gf,
  SnowEffect: qf,
  FogEffect: zf,
  SandstormEffect: Wo,
  CloudEffect: Uf,
  LightningEffect: Yf
};
_o.install = (n) => {
  n.component("BMapViewer", _o);
};
const Gw = {
  install(n) {
    n.use(_o);
  }
};
export {
  If as AMapImageryProvider,
  bf as ArcGISImageryProvider,
  Mf as BD09Projection,
  Lf as BD09TilingScheme,
  _o as BMapViewer,
  Nf as BaiduImageryProvider,
  gw as BaseMap,
  Fw as BaseMaps,
  Gn as BaseWeatherEffect,
  Uf as CloudEffect,
  An as CoordTransform,
  dw as CustomGeographicTilingScheme,
  mw as CustomMercatorTilingScheme,
  wd as EarthColor,
  zf as FogEffect,
  bs as GCJ02TilingScheme,
  Tf as GeoVisImageryProvider,
  Af as GoogleImageryProvider,
  Yf as LightningEffect,
  Dw as MapLayers,
  Lw as PickTools,
  Gf as RainEffect,
  Wo as SandstormEffect,
  qf as SnowEffect,
  Of as TdtImageryProvider,
  Df as TencentImageryProvider,
  Bw as WeatherEffects,
  Sw as WeatherSystem,
  Sf as arcgisWorldImageryUrl,
  Pf as baiduImageryStyles,
  Bf as createImageryProvider,
  Xf as createWeatherEffect,
  Gw as default,
  Rf as googleImageryStyles,
  fw as imageryProviderTypes,
  Ow as turf,
  dd as useCesium,
  Iw as weatherEffectTypes
};
