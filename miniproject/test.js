
// 54 Mission Shrestha

// we select the canvas element from the HTML document
const canvas = document.querySelector("#glcanvas");

//  create a WebGL context for rendering
const gl = canvas.getContext("webgl");

// If WebGL is not available, alert the user and stop execution
if (!gl) {
    alert(
        "Unable to initialize WebGL. Your browser or machine may not support it."
    );
}


const vertexData = [

    //boat part 1st
    -0.8, 0.7, 0, // (a,b)
    -0.8, 0.9, 0, //(a,b')
    -0.6, .8, 0,  //(a',b)

    //boat part 2nd
    -0.8, 0.7, 0, // (a,b)
    -0.8, 0.9, 0, //(a,b')
    -1, .8, 0,  //(a',b)
];


// create a buffer to store vertex data
const buffer = gl.createBuffer();

// bind the buffer to the ARRAY_BUFFER target
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

// fill the buffer with vertex data and set it as static (doesn't change often)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

// create a new vertex shader
const vertexShader = gl.createShader(gl.VERTEX_SHADER);

// specify the position attribute for each vertex
gl.shaderSource(
    vertexShader,
    `
    attribute vec3 position;
    void main() { 
        gl_Position = vec4(position, 1);
    }
`
);

// compile the vertex shader
gl.compileShader(vertexShader);

// define a function to draw a triangle using a fragment shader
function drawBoatTriangle(fragmentShaderGLSL, start, end) {
    // create a new fragment shader using the provided GLSL code
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderGLSL);

    // compile the fragment shader
    gl.compileShader(fragmentShader);

    // create a new program and attach the vertex and fragment shaders
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    // link the program
    gl.linkProgram(program);

    // get the location of the position attribute in the program
    const positionLocation = gl.getAttribLocation(program, `position`);

    // enable the position attribute array
    gl.enableVertexAttribArray(positionLocation);

    // associate the position attribute with the vertex buffer
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

    // use the program for rendering
    gl.useProgram(program);

    // draw a triangle using the current program and vertex buffer, starting at the specified index and ending at the specified index
    gl.drawArrays(gl.TRIANGLES, start, end);
}


// upper blue border
drawBoatTriangle(
    `void main(){
        gl_FragColor = vec4(0.2, 0.4, 0.8, 1.0);
    }`,
    0, // start positon of vertexData array
    3 // end position of vertexData Array
);

// lower blue border
drawBoatTriangle(
    `void main(){
        gl_FragColor = vec4(0.1, 0.7, 0.6, 1.0);

        }`,
    3, // start positon of vertexData array
    6 // end position of vertexData Array
);

// 54 Mission Shrestha

