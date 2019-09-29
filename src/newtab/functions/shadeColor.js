export default function shadeColor(color, percent) {
  let f = parseInt(color.slice(1), 16);
  let t = percent < 0 ? 0 : 255;
  let p = percent < 0 ? percent * -1 : percent;
  let R = f >> 16;
  let G = (f >> 8) & 0x00ff;
  let B = f & 0x0000ff;
  return '#' + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
}
