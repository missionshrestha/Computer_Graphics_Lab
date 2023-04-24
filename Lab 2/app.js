const canvas = document.querySelector("#glcanvas");

// Initialize the GL context
const gl = canvas.getContext("webgl");

// Only continue if WebGL is available and working
if (gl === null) {
    alert(
        "Unable to initialize WebGL. Your browser or machine may not support it."
    );
}

let lineVertexData;

//BLA Line
{
    console.log("BLA");
    lineVertexData = BLALine(500, 500, 40, 40);
    draw();
    
}

//DDA Line
{
    console.log("DDA");
    lineVertexData = DDALine(0, 0, -500, -500);
    draw();
}


function draw() {
    const vertexData = [
        ...lineVertexData
    ];

    // console.log(vertexData);

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
          gl_PointSize = 2.0;
      }
  `
    );
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader,
        `void main(){
      gl_FragColor = vec4(1, 0 , 0, 1);
      gl_FragColor = vec4(1, 0 , 0, 1);
  }`
    );
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

    gl.drawArrays(gl.POINTS, 0, vertexData.length);
}
