import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import InfiniteScroll from "react-infinite-scroller";
import { Link } from "react-router-dom";
import { getCollectionsInfiniteScroller, getUserInfo } from "../firebase";
import "../style/pages/home/hero.css"
import "../style/pages/home/home.css"

export function Home() {
    return <>
    <Helmet>
        <title>Home | Therwim</title>
        <meta name="description" content="Share your photos and graphical designs on Therwim" />
    </Helmet>
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
                <InfiniteScroller />
            </div>
        </section>
    </>
}

function InfiniteScroller() {
    const [lastKey, setLastKey] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [hasMoreToLoad, setHasMoreToLoad] = useState(true);
    const [fetching, setFetching] = useState(false);

    const fetchRecipes = () => {
        if (fetching) return

        setFetching(true);

        getCollectionsInfiniteScroller(lastKey)
            .then(res => {
                var arr = recipes;

                res.recipes.forEach(recipe => {
                    if (arr.some(x => x.id === recipe.id)) return

                    arr.push(recipe)
                })

                setLastKey(res.lastKey)
                setRecipes(arr)

                if (res.recipes.length < 5) {
                    setHasMoreToLoad(false)
                }
            }).then(() => {
                setFetching(false);
            })
    }

    return <section className="home-recipes" id="content">
        <div className="container">
            <InfiniteScroll
                loadMore={fetchRecipes}
                hasMore={hasMoreToLoad}
                loader={<div className="loading">
                    <span>Loading...</span>
                </div>}
            >
                <ul>
                    {recipes && <>
                        {recipes.map((recipe, index) => {
                            return <ScrollerItem index={index} recipe={recipe} />
                        })}
                    </>}
                </ul>
            </InfiniteScroll>
        </div>
    </section>
}

function ScrollerItem(props) {
    var date = new Date(props.recipe.data.info.createdAt);
    const [author, setAuthor] = useState();

    useEffect(() => {
        getUserInfo(props.recipe.data.info.author)
            .then(res => {
                setAuthor(res);
            })
    }, [props.recipe])

    return <Link key={props.index} to={"/collection/" + props.recipe.id}>
        <div className="image">
            <img src={props.recipe.data.images.main} alt="" />
        </div>
        <div className="about">
            <Link to={"/user/" + props.recipe.data.info.author} className="profilePicture">
                <img src={author?.images.photoURL} alt="" />
            </Link>
            <div className="details">
                <div className="info">
                    {author && <Link to={"/user/" + props.recipe.data.info.author} className="author">{author?.about.firstname} {author?.about.lastname}</Link>}
                    <div className="separator" />
                    <Link to={"/search?date=" + props.recipe.data.info.createdAt}>{new Intl.DateTimeFormat("en-US", { month: "short" }).format(date)}. {date.getDate()}, {date.getFullYear()}</Link>
                </div>
                <span className="title" title={props.recipe.data.about.title}>{props.recipe.data.about.title}</span>
                <span className="subTitle">{props.recipe.data.about.subTitle}</span>
            </div>
        </div>
    </Link>
}