import * as d3 from 'd3';

import './Network.css'

function ForceGraph(props) {
    var width = window.innerWidth, height = window.innerHeight

    var nodesData = props.nodes;
    var linksData = props.links;

    var simulation = d3.forceSimulation(nodesData)
        .force('charge', d3.forceManyBody().strength(-30))
        .force("center", d3.forceCenter().x(width / 2).y(height / 2))
        .force('link', d3.forceLink().links(linksData).id(d => d.id))
        .on('tick', ticked);

    const links =
        d3.select('svg')
            .selectAll('line')
            .data(linksData)
            .join('line')
            .classed("link", true);

    const nodes =
        d3.select('svg')
            .selectAll('circle')
            .data(nodesData)
            .join("circle")
            .attr("r", 12)
            .attr("id", d => d.id)
            .on("click", click)
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

    function updateLinks() {
        links.attr('x1', function (d) {
            return d.source.x
        })
            .attr('y1', function (d) {
                return d.source.y
            })
            .attr('x2', function (d) {
                return d.target.x
            })
            .attr('y2', function (d) {
                return d.target.y
            })
    }

    function updateNodes() {
        nodes.attr("cx", d => d.x)
            .attr("cy", d => d.y)
    }

    function ticked() {
        updateNodes();
        updateLinks();
    }

    function click() {
        const id = d3.select(this).attr('id')
        props.switchView(id)
    }

    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    return (
        <svg width={width} height={height}>
        </svg>
    );
}

export default ForceGraph;