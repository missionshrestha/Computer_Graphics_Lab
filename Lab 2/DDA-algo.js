function DDALine(x1, y1, x2, y2){
    let tempVertices = [];
    let dx = x2 - x1;
    let dy = y2 - y1;

    X = x1;
    Y = y1;

    tempVertices.push(X / 600); // 600 * 600 - size of canvas
    tempVertices.push(Y / 600);
    // console.log(X, Y);
    
    let stepSize;
    if(Math.abs(dx) > Math.abs(dy)){
        stepSize = Map.abs(dx);
    }else{
        stepSize = Math.abs(dy);
    }

    let xinc = dx/stepSize;
    let yinc = dy/stepSize;

    let count = 0;
    while(count != stepSize){
        X = X + xinc;
        Y = Y + yinc;
        tempVertices.push(X / 600);
        tempVertices.push(Y / 600);
        // console.log(X, Y);
        count++;
    }
    return tempVertices;
}

// DDALine(-100, -100, 100, 100);
//  DDALine(100, 100, -100, -100);