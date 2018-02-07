import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

// third part imports
import 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'sweetalert2/dist/sweetalert2.css'
import 'font-awesome/css/font-awesome.css'

import './assets/IceSelect.css'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
