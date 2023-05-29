import { Link, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Mockman from 'mockman-js';
import NavigationBar from './components/NavigationBar';
import { Fav } from './pages/Fav';
import { Cart } from './pages/Cart';
import { Shop } from './pages/Shop';
import { Home } from './pages/Home';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { SignOut } from './components/SignOut';
import { RequireAuth } from './components/RequireAuth';
import { UserProfile } from './components/UserProfile';
import { ProductDetail } from './pages/ProductDetail';
import { Icon } from '@iconify/react';

function App() {
  return (
    <div
      className="App"
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <div
        style={{
          backgroundColor: 'black',
          position: 'fixed',
          width: '100%',
          zIndex: 1,
          boxShadow: '0 7px 30px 0 black',
        }}
      >
        <NavigationBar />
      </div>
      <header className="App-header" style={{ color: 'black' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mockman" element={<Mockman />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:productId" element={<ProductDetail />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <UserProfile />
              </RequireAuth>
            }
          />
          <Route
            path="/cart"
            element={
              <RequireAuth>
                <Cart />
              </RequireAuth>
            }
          />
          <Route
            path="/fav"
            element={
              <RequireAuth>
                <Fav />
              </RequireAuth>
            }
          />
        </Routes>
      </header>
      <footer
        style={{
          // position: 'relative',
          margin: 'auto',
          width: '100%',
        }}
      >
        <div
          style={{
            backgroundColor: 'black',
            padding: '2rem 1rem',
            textAlign: 'center',
            color: 'white',

            // position: 'absolute',
            // bottom: 0,
            // height: '2.5rem',
          }}
        >
          <div
            style={{ fontWeight: 'bold', fontSize: 'large', margin: '10px' }}
          >
            Social media
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '300px',
              margin: 'auto',
            }}
          >
            <Link
              className="link"
              style={{ color: 'white' }}
              to="https://github.com/PriyanshuSinghR"
            >
              <Icon
                icon="mingcute:github-fill"
                color="white"
                width="30"
                height="30"
              />
            </Link>
            <Link
              className="link"
              style={{ color: 'white' }}
              to="https://twitter.com/Priyanshu844"
            >
              <Icon icon="bi:twitter" color="white" width="30" height="30" />
            </Link>
            <Link
              className="link"
              style={{ color: 'white' }}
              to="https://www.linkedin.com/in/priyanshu844/"
            >
              <Icon
                icon="cib:linkedin-in"
                color="white"
                width="30"
                height="30"
              />
            </Link>
            <Link className="link" style={{ color: 'white' }}>
              <Icon
                icon="ri:discord-fill"
                color="white"
                width="30"
                height="30"
              />
            </Link>
          </div>
          <p>Copyright &copy; 2022 Priyanshu Singh • Web Developer</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
