import { Link } from 'react-router-dom';
import { appContext } from '../app.context';
import { useContext } from 'react';
import { AppContextType } from '../types/app-context.type';

function Nav() {
  const { user } = useContext<AppContextType>(appContext);

  return (
    <header className="px-2 border-b flex items-center justify-between h-14">
      <span className="uppercase font-bold text-purple-500">Test task</span>
      <div>
        <Link className="uppercase font-bold mx-3 text-purple-500 hover:text-purple-600 hover:cursor-pointer hover:underline" to="/list">User list</Link>
        { user.userData?.email 
          ? <>
              <Link className="mr-3 text-purple-500 hover:text-purple-600 hover:cursor-pointer hover:underline font-semibold" to="/user">{ user.userData?.email }</Link>
            </>
          : <>
              <Link className="uppercase font-bold ml-10 pr-3 text-purple-500 hover:text-purple-600 hover:cursor-pointer hover:underline" to="/sign-up">Sign up</Link>
              <Link className="uppercase font-bold px-3 text-purple-500 hover:text-purple-600 hover:cursor-pointer hover:underline" to="/">Sign in</Link>
            </>
        }
       
      </div>
    </header>
  )
}

export default Nav
