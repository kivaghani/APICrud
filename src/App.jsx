import React from 'react'
import { Provider } from 'react-redux'
import store from './Store/store'
import { Bounce, ToastContainer } from 'react-toastify'
import AppRouting from './Routes/AppRouting'

const App = () => {
  return (
    <Provider store={store}>
      <ToastContainer
        limit={3}
        className="toaster"
        closeOnClick
        pauseOnHover
        theme="light"
        newestOnTop
        transition={Bounce}
      />
      <AppRouting />
    </Provider>
  )
}

export default App