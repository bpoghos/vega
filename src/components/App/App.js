import React, { Suspense } from "react";
import RootRouter from "../RootRouter";


const App = () => {


  return (
    <div>
      <Suspense fallback='loading...........'>
        <RootRouter />
      </Suspense>
    </div>
  );
}

export default App;
