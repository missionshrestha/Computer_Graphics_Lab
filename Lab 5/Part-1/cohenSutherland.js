function cohenSutherland(P1, P2, Xw_min, Yw_min, Xw_max, Yw_max) {
    let x0 = P1[0];
    let y0 = P1[1];
    let x1 = P2[0];
    let y1 = P2[1];
    let vertexData = [];
    let P1_new = [...P1];
    let P2_new = [...P2];
    let m = (y1 - y0) / (x1 - x0);
  
    let regionCodeP1 = computeRegionCode(x0, y0, Xw_min, Yw_min, Xw_max, Yw_max);
    let regionCodeP2 = computeRegionCode(x1, y1, Xw_min, Yw_min, Xw_max, Yw_max);
    while (true) {
      if ((regionCodeP1 | regionCodeP2) === 0) {
        vertexData.push(...P1_new, ...P2_new);
        draw(gl, vertexData, "line");
        console.log(vertexData);
        vertexData = [];
        vertexData.push(...P1, ...P1_new, ...P2, ...P2_new);
        draw(
          gl,
          vertexData,
          "line",
          `void main(){ gl_FragColor = vec4(1, 0, 0, 1);}`
        );
        break;
      } else if ((regionCodeP1 & regionCodeP2) !== 0) {
        vertexData.push(...P1, ...P2);
        draw(
          gl,
          vertexData,
          "line",
          `void main(){ gl_FragColor = vec4(1, 0, 0, 1);}`
        );
        break;
      } else {
        let x, y;
        let regionCode = regionCodeP1 !== 0 ? regionCodeP1 : regionCodeP2;
        if ((regionCode & 1) !== 0) {
          x = Xw_min;
          y = y1 + m * (x - x1);
        } else if ((regionCode & 2) !== 0) {
          x = Xw_max;
          y = y1 + m * (x - x1);
        } else if ((regionCode & 4) !== 0) {
          y = Yw_min;
          x = x1 + (y - y1) / m;
        } else if ((regionCode & 8) !== 0) {
          y = Yw_max;
          x = x1 + (y - y1) / m;
        }
  
        if (regionCode === regionCodeP1) {
          regionCodeP1 = computeRegionCode(x, y, Xw_min, Yw_min, Xw_max, Yw_max);
          P1_new = [];
          P1_new = [x, y, 0];
        } else {
          regionCodeP2 = computeRegionCode(x, y, Xw_min, Yw_min, Xw_max, Yw_max);
          P2_new = [];
          P2_new = [x, y, 0];
        }
      }
    }
  }
  
  function computeRegionCode(x, y, Xw_min, Yw_min, Xw_max, Yw_max) {
    let code = 0;
    if (x < Xw_min) {
      code |= 1;
    } else if (x > Xw_max) {
      code |= 2;
    }
    if (y < Yw_min) {
      code |= 4;
    } else if (y > Yw_max) {
      code |= 8;
    }
    return code;
  }