import { CityListItem } from './components/CityListItem'
import { DATA } from './mockData'

function App() {
  return (
    <div className='w-full flex items-center flex-col gap-2 p-8'>
    {DATA.map((city) => <CityListItem {...city} />)}
  </div>
  )
}

export default App
