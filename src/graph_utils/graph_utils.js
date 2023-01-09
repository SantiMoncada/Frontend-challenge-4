/**
 * GRAPH FUNCTIONS.
 */

/**
 * getNodeInputConnections: Get a node input connections.
 *
 * @param {Object} node Node model object.
 * @param {Object} graph Bot model object.
 * @returns {Array} Array of Connection models.
 */
//this is O(N) and it should be 0(1)
export function getNodeInputConnections(node, graph) {
  const currentID = node.id;

  const connections = Object.values(graph.connections);

  return connections.filter(
    (connection) => connection.targetPath === currentID
  );
}

/**
 * getNodeOutputConnections: Get a node output connections.
 *
 * @param {Object} node Node model object.
 * @param {Object} graph Bot model object.
 * @returns {Array} Array of Connection models.
 */

//this is O(N) and it should be 0(1)
export function getNodeOutputConnections(node, graph) {
  const currentID = node.id;

  const connections = Object.values(graph.connections);

  return connections.filter(
    (connection) => connection.sourcePath === currentID
  );
}

/**
 * getNodeConnections: Get a node connections.
 *
 * @param {Object} node Node model object.
 * @param {Object} graph Bot model object.
 * @returns {Array} Array of Connection models.
 */

//this is O(N) and it should be 0(1)
export function getNodeConnections(node, graph) {
  return [
    ...getNodeInputConnections(node, graph),
    ...getNodeOutputConnections(node, graph),
  ];
}

/**
 * getLeafNodes: Get all leaf nodes (no output connections).
 *
 * @param {Object} graph Bot model object.
 * @returns {Array} Array of Node models.
 */

//0(2N)
export function getLeafNodes(graph) {
  const nodesWithOutput = new Set();

  const connections = Object.values(graph.connections);

  connections.forEach((each) => {
    nodesWithOutput.add(each.sourcePath);
  });

  const nodes = Object.values(graph.nodes);

  return nodes.filter((node) => {
    return !nodesWithOutput.has(node.id);
  });
}

/**
 * getRootNodes: Get all root nodes (no input connections).
 *
 * @param {Object} graph Bot model object.
 * @returns {Array} Array of Node models.
 */

//0(2N)
export function getRootNodes(graph) {
  const nodesWithOutput = new Set();

  const connections = Object.values(graph.connections);

  connections.forEach((each) => {
    nodesWithOutput.add(each.targetPath);
  });

  const nodes = Object.values(graph.nodes);

  return nodes.filter((node) => {
    return !nodesWithOutput.has(node.id);
  });
}

/**
 * hasMultipleSources: Determines if a node is reachable from different sources.
 *
 * @param {Object} node Node model object.
 * @param {Object} graph Bot model object.
 * @returns {Boolean} True if a node has different source paths.
 */

export function hasMultipleSources(node, graph) {
  return getNodeInputConnections(node, graph).length > 1;
}
