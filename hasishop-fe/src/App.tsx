import './App.css'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShoppingListItems from './components/shoppinglistitem/ShoppingListItems';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<ShoppingListItems />} />
      </Routes>
    </Router>
  )
}

export default App