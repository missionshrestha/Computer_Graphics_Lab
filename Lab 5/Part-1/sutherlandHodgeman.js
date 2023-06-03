function sutherLandHodgemann(P1, P2, P3, P4, P5, Xw_min, Yw_min, Xw_max, Yw_max) {
    let vertexData = [];
    vertexData.push(
      ...P1,
      ...P2,
      ...P2,
      ...P3,
      ...P3,
      ...P4,
      ...P4,
      ...P5,
      ...P5
    );
    cohenSutherland(P1, P2, Xw_min, Yw_min, Xw_max, Yw_max);
    cohenSutherland(P2, P3, Xw_min, Yw_min, Xw_max, Yw_max);
    cohenSutherland(P3, P4, Xw_min, Yw_min, Xw_max, Yw_max);
    cohenSutherland(P4, P5, Xw_min, Yw_min, Xw_max, Yw_max);
    cohenSutherland(P5, P1, Xw_min, Yw_min, Xw_max, Yw_max);
  }