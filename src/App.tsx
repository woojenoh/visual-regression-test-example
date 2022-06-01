import { Link, Route, Routes } from "react-router-dom";

export const PATH = {
  HOME: "/",
  ABOUT: "/about",
};

function App() {
  return (
    <>
      <div>
        <Link to={PATH.HOME}>Home - Younha</Link>
        {" | "}
        <Link to={PATH.ABOUT}>About Time</Link>
      </div>
      <Routes>
        <Route
          path={PATH.HOME}
          element={<span>Learn React!</span>}
        />
        <Route
          path={PATH.ABOUT}
          element={
            <a
              className="App-link"
              href="https://woojenoh.blog/about"
              target="_blank"
              rel="noopener noreferrer"
            >
              About You
            </a>
          }
        />
      </Routes>
    </>
  );
}

export default App;
