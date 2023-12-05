
function Error() {
    return (
            <div style={{
                backgroundColor: "#F5FAFE",
                minHeight: `45rem`,
                display: `flex`,
                textAlign: "center",
                justifyContent: `center`,
                alignItems:`center`,
                width:`100%`
            }}>
                <div style={{ height:`15rem`,width:`30rem` }}>
                    <p style={{ color: "#000339", fontSize: "60px", fontWeight: "bold" }}>
                        Error 404
                    </p>
                    <p style={{ color: "#5A6473", fontSize: "16px", marginTop: -10 }}>
                        Page Not Found!
                    </p>
                </div>
            </div>
    )
}

export default Error;
