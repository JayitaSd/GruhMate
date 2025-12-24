import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Dashboard from './components/DashBoard'
import StockForm from './components/StockForm'
import ForgotPassword from './components/ForgotPassword'
import Teams from './components/Teams'
import { AuthProvider } from './context/AuthContext'
import { PublicRoute, PrivateRoute } from './routes/Guards'
import Home from './pages/Home'
import GroceryPage from './pages/GroceryPage'
import { TechPage } from './pages/TechPage'
import BuyList from './components/BuyList'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer
          position="bottom-right"
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
        />

        <Routes>
          <Route path="/" element={<PublicRoute><HomePage /></PublicRoute>} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpwd" element={<ForgotPassword />} />
          <Route path="/grocery" element={<GroceryPage />} />
          <Route path="/tech" element={<TechPage />} />

          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/buylist" element={<BuyList />} />
          <Route path="/stockform" element={<PrivateRoute><StockForm /></PrivateRoute>} />
          <Route path="/compare" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/teams" element={<PrivateRoute><Teams /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
