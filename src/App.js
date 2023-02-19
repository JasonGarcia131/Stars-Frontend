import { Routes, Route } from 'react-router-dom';
import Register from './features/Register';
import Login from './features/Login';
import Home from './pages/Home';
import Layout from './components/Layout';
import Missing from './pages/Missing';
import Unauthorized from './pages/Unauthorized';
import LinkPage from './pages/LinkPage';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import Profile from './pages/profile/Profile';
import PublicProfile from './pages/profile/PublicProfile';
import News from './pages/News';
import Feedback from "./pages/Feedback"
import About from "./pages/About";
import GetFeedBack from './features/Admin/GetFeedBack';
import Admin from './features/Admin/Admin';

const ROLES = {
  'User': 2001,
  'Admin': 1994
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/" element={<LinkPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="users/:id" element={<PublicProfile />} />
        <Route path="about" element={<About />} />

        {/* we want to protect these routes */}

        <Route element={<PersistLogin />}>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="getfeedback" element={<GetFeedBack />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>
            <Route path="home" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="profile" element={<Profile />} />
            <Route path="news" element={<News />} />
            <Route path="feedback" element={<Feedback />} />
          </Route>

        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;