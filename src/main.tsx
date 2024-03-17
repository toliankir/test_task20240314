import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import UserList from './components/UserList.tsx'
import Nav from './components/Nav.tsx'
import Signin from './components/Signin.tsx'
import Signup from './components/Signup.tsx'
import CurrentUser from './components/CurrentUser.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './style.css'
import { appContext } from './app.context.ts'
import { User } from './types/user.ts'

const MainApp = () => {
  const [user, setUser] = useState<User>({});

  return (
    <appContext.Provider value={{ user, setUser }}>
      <div className="max-w-screen-xl mx-auto">
        <BrowserRouter>
          <Nav />
          <div className="max-w-screen-xl mx-auto p-3">
            <Routes>
              <Route path="/" element={<Signin />} />
              <Route path="/list" element={<UserList />} />
              <Route path="/user" element={<CurrentUser />} />
              <Route path="/sign-up" element={<Signup />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </appContext.Provider>)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MainApp />,
)
