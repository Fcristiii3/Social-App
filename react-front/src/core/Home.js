import Posts from "../post/Posts";
const Home = () => (
    <div>

        <div className="jumbotron">
            <h2>Home</h2>
            <p className="lead">Welcome to social app </p>
        </div>
        <div className="container">

            <Posts></Posts>
        </div>
    </div>

)

export default Home;
