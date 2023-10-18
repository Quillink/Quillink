import React from 'react';
import Nodes from './Nodes';
import Lines from './Lines';

function Network(props) {
    return (
        <div>
            <Nodes />
            <Lines />
        </div>
    );
}

export default Network;