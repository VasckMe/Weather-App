import { CityListItem } from './components/CityListItem'
import {DATA} from './mockData'

function App() {

  return ( 
  <div className='w-full flex items-center flex-col gap-2 p-8'>
    <input className="border border-neutral-400 p-2 rounded-md w-full" />
    {DATA.map((city) => <CityListItem {...city} />)}
  </div>
  )
}

export default App
