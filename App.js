import HomeScreen from './screens/HomeScreen';
import AuthScreen from './screens/AuthScreen'
import useAuth from './Hooks/Auth/useAuth';

export default function App() {
  
  const {user} = useAuth();

  if (user) return (<HomeScreen user={user} />)
  else return (<AuthScreen />)
}

