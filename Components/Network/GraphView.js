import { useState } from 'react';

import ForceGraph from './ForceGraph';
import fetchData from '../../Hooks/Network/fetchData';

function GraphView(props) {
    const [nodes, setNodes] = useState([]);
    const [links, setLinks] = useState([]);

    fetchData(props.db, setNodes, setLinks);

    return (
        <ForceGraph switchView={props.switchView} nodes={nodes} links={links} />
    );
}

export default GraphView;