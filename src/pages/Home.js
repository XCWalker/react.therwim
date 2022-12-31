import "../style/pages/home/hero.css"

export function Home() {
    return <>
    <section className="hero">
        <div className="container">
            <h1>The All New Therwim</h1>
            <span>Brought to you by <a href="https://xcwalker.dev">xcwalker</a></span>
        </div>
        <img src="https://xcwalker.dev/Data/Images/20220708_075409.webp" alt="" className="background" />
    </section>
        <section className="home">
            <div className="container">
                <h1>Home</h1>
            </div>
        </section>
    </>
}