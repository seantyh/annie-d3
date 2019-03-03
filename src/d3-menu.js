import * as d3 from "d3";

export let init_menu = function(){
  const svg = d3.select("svg"),
      width = +svg.attr("width"),
      height = +svg.attr("height");
  let radius = 10;

  let c1 = svg.append("circle")
    .attr("r", radius)
    .attr("class", "fixedCircle")
    .attr("cx", width-radius*2)
    .attr("cy", height-radius*2);
  
    c1.on("click", ()=>{
      console.log(d3.event);
      let elem = d3.select(d3.event.srcElement);
      elem.attr("class", "onfocus");
      elem.transition().attr("transform", "translate(-150,0)");

    });

}
