let angle = 0;
let rotSpeed = 0;
let theShader;
let pg;

function preload() {
  // 使用base64编码的内联着色器
  const vertShader = `data:;base64,${btoa(`
    attribute vec3 aPosition;
    attribute vec2 aTexCoord;
    varying vec2 vTexCoord;
    void main() {
      vTexCoord = aTexCoord;
      gl_Position = vec4(aPosition, 1.0);
    }`)}`;

  const fragShader = `data:;base64,${btoa(`
    precision mediump float;
    uniform sampler2D tex;
    uniform float time;
    uniform float rotationSpeed;
    varying vec2 vTexCoord;
    
    void main() {
      vec2 uv = vTexCoord;
      uv.y = 1.0 - uv.y;
      vec2 offset = vec2(sin(time)*0.015, cos(time)*0.015) * rotationSpeed*8.0;
      float r = texture2D(tex, uv + offset).r;
      float g = texture2D(tex, uv).g;
      float b = texture2D(tex, uv - offset).b;
      vec3 color = vec3(r, g, b);
      float luminance = (r + g + b) / 3.0;
      vec3 glow = vec3(1.0, 0.8, 0.5) * pow(luminance, 4.0) * (sin(time*3.0)*0.5+0.5);
      gl_FragColor = vec4(color + glow * rotationSpeed*3.0, 1.0);
    }`)}`;

  theShader = loadShader(vertShader, fragShader);
}

// setup和draw函数保持与之前提供的代码完全一致
// ...
// 其他代码保持不变...

function setup() {
  createCanvas(600, 400, WEBGL);
  pg = createGraphics(width, height);
  pg.ellipseMode(CENTER);
  pg.noStroke();
  angleMode(RADIANS);
}

function draw() {
  // 在离屏画布绘制太极
  pg.background(30);
  pg.push();
  pg.translate(pg.width/2, pg.height/2);
  pg.rotate(angle);
  drawTaijiOnPG(100);
  pg.pop();

  // 应用着色器
  shader(theShader);
  theShader.setUniform('tex', pg);
  theShader.setUniform('time', frameCount * 0.01);
  theShader.setUniform('rotationSpeed', rotSpeed);
  rect(-width/2, -height/2, width, height);

  // 更新旋转逻辑
  if (frameCount <= 300) angle += 0.01;
  else if (frameCount <= 600) angle += 0.02;
  else if (frameCount <= 900) angle += 0.03;
  else if (frameCount <= 1200) angle += 0.05;
  else if (frameCount <= 1800) angle += 0.08;
  else {
    if (frameCount === 1801) rotSpeed = 0.08;
    rotSpeed += 0.0005;
    angle += rotSpeed;
  }

  // 4分钟重置
  if (frameCount > 14400) {
    angle = 0;
    rotSpeed = 0;
    noLoop();
    setTimeout(() => loop(), 10);
  }
}

function drawTaijiOnPG(r) {
  let primaryBlack = mouseIsPressed ? 255 : 0;
  let primaryWhite = 255 - primaryBlack;
  
  pg.fill(primaryBlack);
  pg.ellipse(0, 0, r*2, r*2);
  
  pg.fill(primaryWhite);
  pg.arc(0, 0, r*2, r*2, -HALF_PI, HALF_PI, PIE);
  
  pg.fill(primaryBlack);
  pg.ellipse(0, -r/2, r, r);
  
  pg.fill(primaryWhite);
  pg.ellipse(0, r/2, r, r);
  
  pg.fill(primaryWhite);
  pg.ellipse(0, -r/2, r/3, r/3);
  
  pg.fill(primaryBlack);
  pg.ellipse(0, r/2, r/3, r/3);
}