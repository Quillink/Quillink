function drawLines(info) {
    let linesList = [];
    for (let k = 0, count = 0; k < info.length; k++) // append lines into lineslist
    {
        for (let i = 0; i < info[k].length; i++)
        {
            for (let j = i+1; j < info[k].length; j++)
            {
                linesList.push (
                        <svg key = {++count} style={{position:'absolute'}} height="100%" width="100%" >
                            <line x1={info[k][i].position[0]} y1={info[k][i].position[1]} x2={info[k][j].position[0]} y2={info[k][j].position[1]} stroke="red" strokeWidth="2" />
                        </svg>
                )
            }
        }
    }
    return linesList;
}

export default drawLines