import TextEditor from './components/TextEditor'
import { BeatSheetProvider } from './context/BeatSheetContext'
import SheetView from './components/SheetView'
import Header from './components/Header'


export default function Home() {

  return (
    <main >
      <div className='md:h-screen flex flex-col'>
        <Header/>
        <BeatSheetProvider>
          <div className='md:flex md:flex-row'>
            <TextEditor className=" md:w-1/3" />
            <SheetView className=" md:w-2/3 md:max-h-screen md:overflow-scroll"/>
          </div>
        </BeatSheetProvider>
      </div>
    </main>
  )
}
