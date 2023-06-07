import ReactLoading from 'react-loading';
import 'react-toastify/dist/ReactToastify.min.css';
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

import { RequireAuth } from './components/RequireAuth';
import { UserProfile } from './components/UserProfile';
import { ProductDetail } from './pages/ProductDetail';
import { Icon } from '@iconify/react';
import { CheckOut } from './pages/CheckOut';
import { ThankYou } from './pages/ThankYou';
import { ToastContainer, toast } from 'react-toastify';
import { useContext, useEffect } from 'react';
import { CartContext } from './context/CartContext';

function App() {
  const { state, dispatch } = useContext(CartContext);
  useEffect(() => {
    // setTimeout(() => {
    // }, 1000);
    dispatch({
      type: 'CHANGE_LOADING',
      payload: false,
    });
  }, []);
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
      />
      {state.isLoading ? (
        <ReactLoading
          type="spinningBubbles"
          style={{
            margin: '300px auto',
            width: '200px',
            height: '200px',
            backgroundColor: 'transparent',
          }}
        />
      ) : (
        <div
          className="App"
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
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
              <Route
                path="/profile"
                element={
                  <RequireAuth>
                    <UserProfile />
                  </RequireAuth>
                }
              />
              <Route
                path="/checkout"
                element={
                  <RequireAuth>
                    <CheckOut />
                  </RequireAuth>
                }
              />
              <Route
                path="/thanks"
                element={
                  <RequireAuth>
                    <ThankYou />
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
                style={{
                  fontWeight: 'bold',
                  fontSize: 'large',
                  margin: '10px',
                }}
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
                  <Icon
                    icon="bi:twitter"
                    color="white"
                    width="30"
                    height="30"
                  />
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

          {/* <div style={{ height: '300px' }}></div> */}
        </div>
      )}
    </div>
  );
}

export default App;
