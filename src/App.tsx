import { Routes, Route } from "react-router-dom";
import classes from "@/styles.module.scss";

const App = () => {
  return (
    <div className={classes["app"]}>
      <Routes>
        <Route path="/" />
      </Routes>
    </div>
  );
};

export default App;
