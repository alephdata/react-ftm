var network = {
    width: 960,
    height: 540,
    graph: {
        nodes: [],
        links: []
    },
    lines: {
        stroke: {
            color: '#ccc',
            thickness: 2
        },
    },
    nodes: {
        stroke: {
            color: '#fff',
            thickness: 4
        },
        sizeRange: [16, 64]
    },
    setup: function () {

        /* 	For large networks (>1000) rendering an SVG would be too heavy for mobile devices */
        this.canvas = document.getElementById('network');
        this.context = this.canvas.getContext('2d');

        /* 	D3 part setup */
        let manyBody = d3.forceManyBody()
                .strength((d) => d.force)
                .distanceMax(this.width / 2),
            forceCollide = d3.forceCollide()
                .radius((d) => d.collisionRadius)
                .iterations(2),
            forceCenter = d3.forceCenter();

        this.simulation = d3.forceSimulation()
            .stop() // we want to control the runs
            .force("link", d3.forceLink().id((d) => d.id))
            .force("change", manyBody)
            .force("center", forceCenter)
            .force("collide", forceCollide)
            .on("tick", () => {
                this.tick();
            });

        this.getData(data).then((nodes) => {
            this.drawTree(nodes);
        });
    },
    /* 	Insert async data request of choice here.
            Test data is found in the HTML file */
    getData: (data) => {
        return new Promise((resolve, reject) => {

            /* 	For BFS we want to start with the node with the most
                     children first. */
            data.nodes.sort((a, b) => {
                if (a.links.length > b.links.length) {
                    return 1;
                }
                if (a.links.length < b.links.length) {
                    return -1;
                }
                return 0;
            });

            resolve(data.nodes);

        });
    },
    /* 	We draw nodes as we discover them in a Breadth-First Search fashion.
            Of course, a force graph isn't necessarily shaped like a tree,
            but we do the same for the sake of more fun visualisation and a slightly more efficient program */
    drawTree: function (nodes) {

        let stack = [],
        drawNodes = (waitUntilDone) => {
            return new Promise((resolve, reject) => {

                /* 	It takes a while for the graph to reach equilibrium,
                        so we want to cut this sort until the very last node */
                if (waitUntilDone) {
                    this.simulation.on("end", () => {
                        resolve();
                    });
                } else {
                    setTimeout(() => {
                        this.simulation.stop();
                        resolve();
                    }, 600);
                }

                this.plotData();
            });
        },
        /* 	Count links already in graph for each node */
        updateConnections = () => {

            this.graph.nodes.forEach((node, index) => {

                let connectedIds = [],
                    numConnections = this.graph.links.filter((link) => {

                        let hasConnection = false;

                        if (link.source.id == node.id && connectedIds.indexOf(link.target.id) < 0) {
                            connectedIds.push(link.target.id);
                            hasConnection = true;
                        }

                        if (link.target.id == node.id && connectedIds.indexOf(link.source.id) < 0) {
                            connectedIds.push(link.source.id);
                            hasConnection = true;
                        }

                        return hasConnection;

                    });

                node.connections = numConnections.length;
            });

        },
        findNewLinks = (node) => {
            let newLinks = [];

            if (!node.connections) {
                node.connections = 0; // can't add 1 to null
            }

            node.links.forEach((link) => {
                if (this.findNodeInGraph(link) < 0) {
                    /* 	New node! */
                    newLinks.push(link);
                } else if (this.findLinkInGraph(link, node.id) < 0) {
                    /* 	Not new node, but don't have the link yet! */
                    this.graph.links.push({source: node.id, target: link});
                }
            });

            /* 	Turn list of IDs to real node data */
            let neighbours = newLinks.filter((link) => {
                return this.getNode(link, nodes);
            }).map((neighbourId) => {
                return this.getNode(neighbourId, nodes);
            });

            /* 	We didn't discover any new nodes, so we'll add the next unvisisted node to the stack */
            if (neighbours.length < 1) {
                let newItem = nodes.pop();
                if (newItem) {
                    stack.push(newItem);
                }
                /* 	Add the new newighbour nodes to stack */
            } else {
                stack.push(...neighbours);
            }

        },
        nextNode = () => {

            if (stack.length > 0) {

                let node = stack.shift(),
                    existinNodeIndex = this.findNodeInGraph(node.id);

                /* 	Node doesn't exist in graph... add it then! */
                if (existinNodeIndex < 0) {

                    findNewLinks(node);
                    updateConnections();
                    this.graph.nodes.push(node);
                    drawNodes().then(() => {
                        nextNode();
                    });

                    /* 	Node exists, buy its connections might not! */
                } else {
                    findNewLinks(node);
                    updateConnections();
                    nextNode();
                }

            } else {
                console.info("Graph done! :D");

                drawNodes(true);
            }

        };

        /* 	Start with last node in list. We know it's ordered to have the highest number of neighbours */
        stack.push(nodes.pop());
        nextNode();

    },
    /* 	This is where we set up fun data for D3 */
    plotData: function () {
        let countExtent = d3.extent(this.graph.nodes, (d) => {
                return d.connections ? d.connections : 1
            }),
            radiusScale = d3.scalePow().exponent(2).domain(countExtent).range(this.nodes.sizeRange),
            forceScale = d3.scalePow().exponent(2).domain(countExtent).range([-50, 0]);

        forceScale.clamp(true);
        //radiusScale.clamp(true); leave this on if you feel D3 takes too many liberties. I believe in freedom!

        this.graph.nodes.forEach((node) => {
            /* 	The more connections, the larger the node */
            node.r = radiusScale(node.connections);
            /* 	Make sure no node goes too close - also uses the minimum node size as margin */
            node.collisionRadius = node.r * 1.2;
            /* 	Keep weaker nodes a further away */
            node.force = forceScale(node.connections);
        });

        /* 	Hey D3! Catch! */
        this.simulation
            .nodes(this.graph.nodes);

        this.simulation.force("link")
            .links(this.graph.links);

        this.simulation.alpha(0.2).restart();
    },
    /* 	Draw onto canvas, or SVG, or whatever else */
    tick: function () {

        this.context.clearRect(0, 0, this.width, this.height);

        this.context.save();

        this.context.translate(this.width / 2, this.height / 2);

        this.context.beginPath();
        this.graph.links.forEach((link) => {

            this.context.moveTo(link.source.x, link.source.y);
            this.context.lineTo(link.target.x, link.target.y);

        });
        this.context.strokeStyle = this.lines.stroke.color;
        this.context.lineWidth = this.lines.stroke.thickness;
        this.context.stroke();

        this.graph.nodes.forEach((node) => {

            this.context.beginPath();

            this.context.arc(node.x, node.y, node.r, 0, 2 * Math.PI);
            this.context.fillStyle = node.colour;
            this.context.strokeStyle = this.nodes.stroke.color;
            this.context.lineWidth = this.nodes.stroke.thickness;
            this.context.fill();
            this.context.stroke();

        });

        this.context.restore();

    },
    findNodeInGraph: function (id) {
        var result = -1;
        this.graph.nodes.forEach((node, index) => {
            if (node.id == id) {
                result = index;
                return false;
            }
        });
        return result;
    },
    getNode: function (id, nodes) {
        result = null;
        nodes.forEach((node, index) => {
            if (node.id == id) {
                result = node;
                return false;
            }
        });
        return result;
    },
    findLinkInGraph: function (source, target) {
        var result = -1;
        this.graph.links.forEach((link, index) => {
            if (
                link.source.id == source && link.target.id == target ||
                link.source.id == target && link.target.id == source
            ) {
                result = index;
                return false;
            }
        });
        return result;
    }
};

network.setup();