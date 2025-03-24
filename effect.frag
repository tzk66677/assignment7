precision mediump float;
uniform sampler2D tex;
uniform float time;
uniform float rotationSpeed;
varying vec2 vTexCoord;

void main() {
  // 颜色通道偏移
  vec2 offset = vec2(sin(time)*0.01, cos(time)*0.01) * rotationSpeed*10.0;
  float r = texture2D(tex, vTexCoord + offset).r;
  float g = texture2D(tex, vTexCoord).g;
  float b = texture2D(tex, vTexCoord - offset).b;
  
  // 动态发光效果
  vec3 color = vec3(r, g, b);
  float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
  vec3 glow = vec3(1.0, 0.8, 0.5) * pow(luminance, 4.0) * (1.0 + sin(time*2.0));
  
  gl_FragColor = vec4(color + glow * rotationSpeed*2.0, 1.0);
}