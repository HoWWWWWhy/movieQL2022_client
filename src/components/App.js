import { BrowserRouter as Rounter, Routes, Route } from "react-router-dom";
import Home from "../routes/Home";
import Details from "../routes/Details";

function App() {
  return (
    <>
      <Rounter>
        <Routes>
          <Route exact path="/" element={<Home />}>
            <Route path="rating/:minimum_rating" element={<Home />}></Route>
            <Route path="sort_by/:option" element={<Home />}></Route>
          </Route>
          <Route path="/details/:id" element={<Details />}></Route>
        </Routes>
      </Rounter>
    </>
  );
}

export default App;
