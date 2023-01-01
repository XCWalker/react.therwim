import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { LogoFacebook, LogoTwitter } from "../components/logo";
import { getRecipe as getCollection, getUserInfo, useAuth } from "../firebase";
import { Error } from "./Error";

import "../style/pages/collection/view.css"

export function CollectionIndex() {
    return <section className="collection">
        <div className="container">
            <h1>Collection (Index)</h1>
        </div>
    </section>
}

export function CollectionNew() {
    return <section className="collection">
        <div className="container">
            <h1>Collection (New)</h1>
        </div>
    </section>
}

export function CollectionView() {
    const currentUser = useAuth();
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [collection, setCollection] = useState({});
    const [date, setDate] = useState();
    const [author, setAuthor] = useState({});

    useEffect(() => {
        setLoading(true)
        getCollection(params.id).then(res => {
            if (res === undefined) {
                setError(404);
            }
            setCollection(res)
            setDate(new Date(res.info.createdAt.toString()))
            getUserInfo(res.info.author).then(res => {
                setAuthor(res)
                setLoading(false)
            })
        })
    }, [params.id])

    return <>
        {error && <Error
            error={{ code: "404", message: "Recipe Not Found" }}
            routes={[{ text: "Back", shortURL: "../" }, { text: "Home", shortURL: "/" }]}
            helmet={{
                title: "Error 404 - Not Found | Therwim",
                description: "Not Found | Error 404 | Therwim"
            }} />}

        {!loading && !error && <>
            <Helmet>
                <title>{collection?.about.title + ' by ' + author?.about.displayname + ' | Rnaxan'}</title>
                <meta property="og:title" name="title" content={collection?.about.title + ' by ' + author?.about.displayname + ' | Rnaxan'} />
                <meta name="description" content={collection?.about.title + " (" + collection?.about.subTitle + ") by " + author?.about.firstname + " " + author?.about.lastname + " | Only On Rnaxan"} />

                <meta property="og:image" content={collection.images?.main} />

                <meta property="og:type" content="article.recipe" />
            </Helmet>
            <section className="collection-view">
                <div className="container">
                    <header>
                        <img src={collection.images?.main} alt="" />
                        <div className="container">
                            <h1>{collection.about?.title}</h1>
                            <span>{collection.about?.subTitle}</span>
                        </div>
                    </header>
                    <main>
                        <div className="container">
                            <div className="sidebar">
                                <Link to={"/user/" + collection.info?.author} className="item" id="author">
                                    <img src={author.images?.photoURL} alt="" />
                                    <div className="container">
                                        <span className="title">{author.about?.firstname} {author.about?.lastname}</span>
                                        <span className="subTitle">{author.about?.displayname}</span>
                                    </div>
                                </Link>
                            </div>
                            <div className="main" data-child-count={collection.images?.other.length}>
                                {collection.images?.other && <>
                                    {collection.images?.other.map((image, index) => {
                                        return <img src={image} key={index} alt="" />
                                    })}
                                </>}
                            </div>
                        </div>
                    </main>
                    <footer></footer>
                </div>
            </section>
        </>}
    </>
}

export function CollectionEdit() {
    return <section className="collection">
        <div className="container">
            <h1>Collection (Edit)</h1>
        </div>
    </section>
}