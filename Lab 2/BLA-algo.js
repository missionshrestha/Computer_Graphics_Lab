
function BLALine(x1, y1, x2, y2) {
    let tempVertices = [];
    let dx = Math.abs(x2 - x1);
    let dy = Math.abs(y2 - y1);
    let slope = dy / dx;

    let X, Y, stepSize, p;
    if (slope < 1) {
        if (x1 > x2) {
            // swap two endpoints
            [temp1, temp2] = [x1, y1];
            [x1, y1] = [x2, y2];
            [x2, y2] = [temp1, temp2];
        }
        X = x1;
        Y = y1;
        tempVertices.push(X / 600);
        tempVertices.push(Y / 600);
        tempVertices.push(0);

        // console.log(X, Y);
        p = 2 * dy - dx;
        stepSize = x1 < x2 ? x2 - x1 : x1 - x2;
        for (let i = 0; i < stepSize; i++) {
            if (p < 0) {
                p = p + 2 * dy;
            } else {
                Y++;
                p += 2 * dy;
            }
            X++;
            // console.log(X, Y);
            tempVertices.push(X / 600);
            tempVertices.push(Y / 600);
            tempVertices.push(0);
        }
    } 
    
    else {
        // for slope >= 1
        if (y1 > y2) {
            // swap two endpoints
            [temp1, temp2] = [x1, y1];
            [x1, y1] = [x2, y2];
            [x2, y2] = [temp1, temp2];
        }
        X = x1;
        Y = y1;
        // console.log(X, Y);
        tempVertices.push(X / 600);
        tempVertices.push(Y / 600);
        tempVertices.push(0);

        stepSize = y1 < y2 ? y2 - y1 : y1 - y2;
        // steps = y2 - y1;
        p = 2 * dx - dy;
        for (let i = 0; i < stepSize; i++) {
            if (p < 0) {
                p = p + 2 * dy;
                p = p + 2 * dx - 2 * dy;
            } else {
                X++;
                p = p + 2 * dx - 2 * dy;
            }
            Y++;
            // console.log(X, Y);
            tempVertices.push(X / 600);
            tempVertices.push(Y / 600);
            tempVertices.push(0);

        }
    }
    return tempVertices;
}


