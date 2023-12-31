import { React, useEffect, useState } from 'react';
import Nodes from './Nodes';
import Lines from './Lines';

function Network(props) {
    return (
        <div>
            <Nodes func={props.func} />
            <Lines />
        </div>
    );
}

export default Network;