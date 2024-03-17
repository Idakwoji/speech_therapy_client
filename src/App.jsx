import './App.css'
import { Landing } from './views/landing'
// import Onboarding from './components/onboarding/Onboarding'
// import { Admin } from './components/views/admin'

function App() {
  return (
    <div className='w-full max-w-[80rem] h-screen m-auto bg-[#1F2937]'>
      <Landing />
      {/* <Onboarding /> */}
    </div>
  )
}

export default App
