import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

// onmidimessage
function Key(props) {


  useEffect(() => {

    const svg = d3.select("#" + props.num)
    .append("svg")
    .append("rect")
    .attr("width", 20)
    .attr("height", 40)
    .attr("x", 500);


  }, [])




  return (
    <div id={props.num}>
    </div>
  );
}

export default Key;
