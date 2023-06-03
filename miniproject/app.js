const canvas = document.querySelector("#glcanvas");

// Initialize the GL context
const gl = canvas.getContext("webgl");

// Only continue if WebGL is available and working
if (gl === null) {
    alert(
        "Unable to initialize WebGL. Your browser or machine may not support it."
    );
}

let boatX = 0, riverY = 0;

const boatSpeed = document.querySelector("#boatSpeed");
const riverSpeed = document.querySelector("#riverSpeed");
const submitBtn = document.querySelector(".submitBtn");
submitBtn.addEventListener('click', (e) => {
    console.log('Boat Speed', boatSpeed.value);
    boatX = boatSpeed.value * 1 / 10000;
    console.log('River Speed', riverSpeed.value);
    riverY = riverSpeed.value * 1 / 10000;
    animate();

})

// For translation
let translationMatrix = [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
];

function draw(vertexData, drawArraysMode, fragmentShaderGLSL = '') {
    const vertexDatas = [
        ...vertexData,
    ];

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexDatas), gl.STATIC_DRAW);

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
    if (fragmentShaderGLSL == '') {
        gl.shaderSource(fragmentShader,
            `void main(){
        gl_FragColor = vec4(0, 0, 1, 1);
    }`
        );
    } else {
        gl.shaderSource(fragmentShader, fragmentShaderGLSL);
    }

    gl.compileShader(fragmentShader);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexDatas), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, `position`);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
    gl.useProgram(program);

    if (drawArraysMode == 'triangle') {
        gl.drawArrays(gl.TRIANGLES, 0, vertexDatas.length);
    }
}


const triangleData1 = [
    -0.8, -0.7, 1,
    -0.8, -0.9, 1,
    -0.6, -0.8, 1,

];
const triangleData2 = [
    -0.8, -0.7, 1,
    -0.8, - 0.9, 1,
    -1.0, -0.8, 1,

];

function drawInitialTriangle() {
    let vertexData = [
        ...triangleData1,
        ...triangleData2
    ];
    draw(vertexData, 'triangle');
}



function twoDTransformation(transformationMatrix, drawArrayMode, fragmentShaderGLSL) {

    let tempVertexData1 = [];
    tempVertexData1.push(...matrixMultiplication(transformationMatrix, triangleData1.slice(0, 3)));
    tempVertexData1.push(...matrixMultiplication(transformationMatrix, triangleData1.slice(3, 6)));
    tempVertexData1.push(...matrixMultiplication(transformationMatrix, triangleData1.slice(6, 9)));
    draw(tempVertexData1, drawArrayMode, fragmentShaderGLSL);

    let tempVertexData2 = []
    tempVertexData2.push(...matrixMultiplication(transformationMatrix, triangleData2.slice(0, 3)));
    tempVertexData2.push(...matrixMultiplication(transformationMatrix, triangleData2.slice(3, 6)));
    tempVertexData2.push(...matrixMultiplication(transformationMatrix, triangleData2.slice(6, 9)));
    draw(tempVertexData2, drawArrayMode, fragmentShaderGLSL);
}

function matrixMultiplication(transformerMatrix, vertices) {
    let result = [];
    let [a11, a12, a13, a21, a22, a23, a31, a32, a33] = transformerMatrix; // 3 * 3
    let [b1, b2, b3] = vertices; // 3*1
    let c1 = a11 * b1 + a12 * b2 + a13 * b3;
    let c2 = a21 * b1 + a22 * b2 + a23 * b3;
    let c3 = a31 * b1 + a32 * b2 + a33 * b3;
    result.push(...[c1, c2, c3]);
    return result;
}

drawInitialTriangle();

twoDTransformation(translationMatrix, 'triangle', `void main(){gl_FragColor = vec4(0.5, 0.5, 0.5, 0.8);}`);


function animate() {
    let x = 0;
    let y = 0;
    var refreshIntervalId = setInterval(() => {
        translationMatrix = [
            1, 0, x,
            0, 1, y,
            0, 0, 1
        ];
        twoDTransformation(translationMatrix, 'triangle', `void main(){gl_FragColor = vec4(0.5, 0.5, 0.5, 0.8);}`);
        console.log(x, y);
        x = x + boatX;
        y = y + riverY;
        console.log('cccc', y);
        if (y.toFixed(2) >= 1.6 && x.toFixed(1) >= 1.6) {
            clearInterval(refreshIntervalId);
        }

    }, 20)

}
