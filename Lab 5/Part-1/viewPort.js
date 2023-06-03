function viewPortVertex(Xw_min, Yw_min, Xw_max, Yw_max) {
    const vertexData = [];
    let bottomLeft = [Xw_min, Yw_min, 0];
    let topLeft = [Xw_min, Yw_max, 0];
    let topRight = [Xw_max, Yw_max, 0];
    let bottomRight = [Xw_max, Yw_min, 0];
    vertexData.push(
      ...bottomLeft,
      ...topLeft,
      ...topLeft,
      ...topRight,
      ...topRight,
      ...bottomRight,
      ...bottomRight,
      ...bottomLeft
    );
    return vertexData;
  }