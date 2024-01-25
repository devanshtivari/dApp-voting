export default function Results (props) {
    return(
        <div className="connected-body">
            <div className="connected-body-address">
                <div><span style={{ color: "orangered" }}>Metamask Account :</span> {props.account}</div>
            </div>
            <div className="connected-body-heading-body">
                <h2 className="connected-body-heading">Voting has ended</h2>
                <h2 className="connected-body-heading">Voting has ended</h2>
            </div>
            <h1>Results</h1>
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