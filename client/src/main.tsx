import { createRoot } from 'react-dom/client'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import '@fontsource/roboto-slab/300.css'
import '@fontsource/roboto-slab/400.css'
import '@fontsource/roboto-slab/500.css'
import '@fontsource/roboto-slab/700.css'

import App from './App'

import './index.css'

const container = document.getElementById('app')

const root = createRoot(container!)
root.render(<App />)
