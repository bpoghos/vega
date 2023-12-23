import { Suspense } from "react";
import  RootRouter  from "./routes/RootRouter";
import { Loading } from "./shared/Loading/Loading";


export const App = () => {

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <RootRouter />
      </Suspense>
    </div>
  );
}

