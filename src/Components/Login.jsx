export default function Login (props) {
    return(
        <div className="login-body">
            <div className="login-heading">
                Welcome to decentralized voting system
            </div>
            <div>
                <button className="login-button" onClick={props.connectWallet}>Connect to wallet</button>
            </div>
        </div>
    )
}