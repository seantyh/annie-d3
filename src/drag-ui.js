import * as d3 from "d3";

export class DragView{
  constructor(simulation){
    this.simulation = simulation;
    this.drag_mode = "link" // "drag"|"link"
    this.temp_links = [];
    this.in_drag = false;
    this.drop_element = null;
  }

  dragstarted(d) {
    this.in_drag = true;
    if (this.drag_mode == "drag"){
      this.dragMode_dragstarted(d);
    } else if (this.drag_mode == "link"){
      this.linkMode_dragstarted(d);
    } else {
      //pass
    }
  }

  dragged(d) {
    console.log("dragged");
    if (this.drag_mode == "drag"){
      this.dragMode_dragged(d);
    } else if (this.drag_mode == "link"){
      this.linkMode_dragged(d);
    } else {
      //pass
    }
  }

  dragended(d) {
    this.in_drag = false;
    if (this.drag_mode == "drag"){
      this.dragMode_dragended(d);
    } else if (this.drag_mode == "link"){
      this.linkMode_dragended(d);
    } else {
      //pass
    }
  }

  mouseenter(d){
    if (!this.in_drag) {
      return;
    }

    if (this.drag_mode == "link"){
      this.linkMode_mouseenter(d);
    } else {
      //pass
    }

    this.drop_element = d3.event.target;
  }

  mouseout(d){
    if (!this.in_drag) {
      return;
    }

    if (this.drag_mode == "link"){
      this.linkMode_mouseout(d);
    } else {
      //pass
    }

    this.drop_element = null;
  }

  linkMode_dragstarted(d) {    
    let elem = d3.select(d3.event.target);        
    let link_added = d3.select("svg").append("line")
        .attr("x1", d.x)
        .attr("y1", d.y)
        .attr("x2", d.x)
        .attr("y2", d.y)
        .attr("stroke-width", 3)
        .attr("stroke", "black")
        .attr("pointer-events", "none");
    this.temp_links.push(link_added);
    
  }

  linkMode_dragged(d) {    
    let container = d3.select("svg");          
    let cursor = d3.mouse(container.node());
    let link_added = this.temp_links[0];        
    link_added.attr("x2", cursor[0])
              .attr("y2", cursor[1]);
              
  }

  linkMode_dragended(d) {        
    let link_added = this.temp_links.pop();
    link_added.remove();
    d3.select(this.drop_element).classed("node-focus", false);
    console.log(this.drop_element);
  }

  linkMode_mouseenter(d){
    d3.select(d3.event.target)
      .classed("node-focus", true);
  }

  linkMode_mouseout(d){
    d3.select(d3.event.target)
      .classed("node-focus", false);
  }

  dragMode_dragstarted(d) {    
    let simulation = this.simulation;
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  dragMode_dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  dragMode_dragended(d) {
    let simulation = this.simulation;
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

}