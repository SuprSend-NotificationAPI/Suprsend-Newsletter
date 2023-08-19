import React from 'react'
import Navbar from './components/Navbar'
import Allcomp from './components/Allcomp'
import Alert from './components/Alert';

export default function App() {
  const [alert,setAlert] = React.useState(null);
  const showAlert = (message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);
  }
  return (
   <div>
      <Navbar />
      <Alert alert={alert}/>
      <Allcomp showAlert={showAlert} />
   </div>
  )
}
 