export default function Connected(props) {
    return (
        <div className="connected-body">
            <div className="connected-body-address">
                <div><span style={{ color: "orangered" }}>Metamask Account :</span> {props.account}</div>
            </div>
            <div className="connected-body-heading-body">
                <h2 className="connected-body-heading">Cast your vote here</h2>
                <h2 className="connected-body-heading">Cast your vote here</h2>
            </div>
            <div className="connected-body-text">
                {!props.canVote ?
                    (
                        <>
                            <p style={{ fontSize: "1.3em" }}>Enter to choose the candidate name to vote</p>
                            <select className="connected-selector" onChange={props.handleChange} >
                    
                            {props.candidates.map((e) => {
                                 return <option value={e.index}>{e.name}</option>
                            })}

                            </select>
                            <button className="connected-button" onClick={props.addVote}>Vote</button>
                        </>)
                    :
                    (
                        <p style={{ fontSize: "1.3em" }}>You have already voted</p>
                    )

                }
                <h3>Time Remaining: {parseInt(props.remainingTime / 3600)} hours {parseInt((props.remainingTime / 60) % 60)} minutes {props.remainingTime % 60} seconds</h3>
            </div>
            <h1>Candidates</h1>
            <table>
                <tr>
                    <th>Candidate</th>
                    <th>Vote</th>
                </tr>
                {
                    props.candidates.map((e) => {
                        return (
                            <tr>
                                <td>{e.name}</td>
                                <td>{e.voteCount}</td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}