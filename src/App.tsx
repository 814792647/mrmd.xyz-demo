import React, { lazy, Suspense } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';

const Index = lazy(() => import('./pages/Index'));
const Animation = lazy(() => import('./pages/Animation'));

interface Props {

}

export const App = (props: Props) => {
  return (
    <Suspense fallback={null}>
      <BrowserRouter basename="/demo/" >
        <Switch>
          <Route path="/flight" component={Index} exact/>
          <Route path="/hi" component={Animation} exact/>
        </Switch>
      </BrowserRouter>
    </Suspense>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
