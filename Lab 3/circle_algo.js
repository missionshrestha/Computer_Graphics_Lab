// This function takes three parameters: the radius of the circle, and the x and y coordinates of the circle's center.
function midPointCircle(radius, xc, yc) {
    let tempVertices = [];

    // Initialize the current point on the circumference to (0, radius).
    let x = 0;
    let y = radius;

    // Calculate the initial value of p, which is used in the algorithm to determine the next point on the circumference.
    p = 5 / 4 - radius;

    tempVertices = [...tempVertices, ...otherVertices(x, y, xc, yc)];

    // Continue calculating points until the entire circumference has been calculated.
    while (x < y) {
        // If p is less than 0, the next point should be to the right of the current point.
        if (p < 0) {
            x = x + 1;
            y = y;
            p = p + 2 * x + 1;
        } else {
            // Otherwise, the next point should be to the lower-right of the current point.
            x = x + 1;
            y = y - 1;
            p = p + 2 * x + 1 - 2 * y;
        }

        tempVertices = [...tempVertices, ...otherVertices(x, y, xc, yc)];
    }

    return tempVertices;
}

// This is a helper function that calculates the remaining vertices of the circle given the current point and the center.
function otherVertices(x, y, xc, yc) {
    let tempVertices = [];

    // Calculate each vertex and store it in the array.
    tempVertices.push((x + xc) / 600);
    tempVertices.push((y + yc) / 600);
    tempVertices.push(0);

    tempVertices.push((y + xc) / 600);
    tempVertices.push((x + yc) / 600);
    tempVertices.push(0);

    tempVertices.push((xc - x) / 600);
    tempVertices.push((yc + y) / 600);
    tempVertices.push(0);

    tempVertices.push((xc + y) / 600);
    tempVertices.push((yc - x) / 600);
    tempVertices.push(0);

    tempVertices.push((xc - x) / 600);
    tempVertices.push((yc - y) / 600);
    tempVertices.push(0);

    tempVertices.push((xc - y) / 600);
    tempVertices.push((yc - x) / 600);
    tempVertices.push(0);

    tempVertices.push((xc - y) / 600);
    tempVertices.push((yc + x) / 600);
    tempVertices.push(0);

    tempVertices.push((xc + x) / 600);
    tempVertices.push((yc - y) / 600);
    tempVertices.push(0);

    return tempVertices;
}
