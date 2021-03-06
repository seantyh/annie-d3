import * as d3 from "d3";
import {DragView} from './drag-ui';

let setup_drag_view = (node, simulation) => {
  
  let dv = new DragView(simulation);  
  let d3_drag_behavior = d3.drag()
    .on("start", (d)=>dv.dragstarted(d))
    .on("drag", (d)=>dv.dragged(d))
    .on("end", (d)=>dv.dragended(d))

  // install drag behavior
  node.call(d3_drag_behavior);

  node.on("mouseenter", (d)=>dv.mouseenter(d))
      .on("mouseleave", (d)=>dv.mouseout(d));
};

let color = d => {  
  let domain_val = [0,1,2,3,4,5,6,7,8,9,10];
  let domain_str = domain_val.map(String);
  const scale = d3.scaleOrdinal()
      .domain(domain_str)
      .range(d3.schemeCategory10);  
  return scale(d.group);
};

let data_ = d3.json("https://gist.githubusercontent.com/mbostock/4062045/raw/5916d145c8c048a6e3086915a6be464467391c62/miserables.json")

let chart = (data)=>{
  
  const links = data.links.map(d => Object.create(d));
  const nodes = data.nodes.map(d => Object.create(d));
  
  const svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id((d) => d.id))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));
    

  const link = svg.append("g")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke-width", (d) => Math.sqrt(d.value));

  const node = svg.append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", 10)
    .attr("fill", color);
  
  setup_drag_view(node, simulation);
  
  node.append("title")
      .text((d) => d.id);

  simulation.on("tick", () => {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
  });  

  return svg.node();
}

let init_d3 = function(){
  data_.then(chart);
}

export {init_d3};

