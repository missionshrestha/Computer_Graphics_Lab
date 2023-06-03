const canvas = document.querySelector("#glcanvas");

// Initialize the GL context
const gl = canvas.getContext("webgl");


// Only continue if WebGL is available and working
if (gl === null) {
  alert(
    "Unable to initialize WebGL. Your browser or machine may not support it."
  );
}

let tempVertexData;

// View Port
let Xw_min = -0.6;
let Yw_min = -0.4;
let Xw_max = 0.6;
let Yw_max = 0.4;
viewPortVertexData = viewPortVertex(Xw_min, Yw_min, Xw_max, Yw_max);
draw(gl, viewPortVertexData, 'line',`void main(){ gl_FragColor = vec4(0, 0, 0, 1);}`);

// Default - Shown
// let P1 = [0.6, -0.7, 0];
// let P2 = [-0.9, 0.4, 0];
// cohenSutherland(P1, P2, Xw_min, Yw_min, Xw_max, Yw_max);

/* draw(gl, viewPortVertexData, 'line',`void main(){ gl_FragColor = vec4(0, 0, 0, 1);}`);
let P1 = [0.6, -0.7, 0];
let P2 = [-0.9, 0.4, 0];
cohenSutherland(P1, P2, Xw_min, Yw_min, Xw_max, Yw_max); */

 // Draw ViewPort
 draw(gl, viewPortVertexData, 'line',`void main(){ gl_FragColor = vec4(0, 0, 0, 1);}`);
      
 // Draw Polygon
 let P1 = [-0.6, -0.7, 0];
 let P2 = [0.5, 0.7, 0];
 let P3 = [0.5, 0.8, 0];
 let P4 = [-0.2, 0.6, 0];
 let P5 = [0.0, 0.2, 0];
 sutherLandHodgemann(P1, P2, P3, P4, P5, Xw_min, Yw_min, Xw_max, Yw_max);
 function draw(gl, vertexD, drawArraysMode, fragmentShaderGLSL = '' ){
  const vertexData = [
    ...vertexD,
  ];
  
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
  
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(
    vertexShader,
    `
      attribute vec3 position;
      void main() { 
          gl_Position = vec4(position, 1);
          gl_PointSize = 4.0;
      }
  `
  );
  gl.compileShader(vertexShader);
  
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  if(fragmentShaderGLSL == ''){
    gl.shaderSource(fragmentShader, 
    `void main(){
        gl_FragColor = vec4(0, 0, 1, 1);
    }`
    );
  }else{
    gl.shaderSource(fragmentShader, fragmentShaderGLSL);
  }

  gl.compileShader(fragmentShader);
  
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
  
  const positionLocation = gl.getAttribLocation(program, `position`);
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
  gl.useProgram(program);
  
  if(drawArraysMode == 'line'){
    gl.drawArrays(gl.LINES, 0, vertexData.length);
  }else if(drawArraysMode == 'triangle'){
    gl.drawArrays(gl.TRIANGLES, 0, vertexData.length);
  }
}