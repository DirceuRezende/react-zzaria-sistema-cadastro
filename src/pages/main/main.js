import React, { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'

const Main = () => (
  <>
    <Suspense fallback={<h1>Loading...</h1>}>
      <Switch>
        <Route>
          <h1>main</h1>
        </Route>
      </Switch>
    </Suspense>

  </>
)

export default Main
