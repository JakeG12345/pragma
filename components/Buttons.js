import Image from 'next/image'
import openseaLogo from "../images/openseaLogo.png"

export const SaveButton = ({ onClick }) => {
  return (
    <button
      className='py-1 w-24 rounded-full text-xl font-semibold bg-sky-500 hover:bg-sky-600'
      onClick={onClick}
    >
      Save
    </button>
  )
}

export const IndigoButton = ({ onClick, text, extraStyles }) => {
  return (
    <button
      className={`py-1 px-4 rounded-full bg-indigo-500 hover:bg-indigo-600 text-lg ${extraStyles}`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export const OpenseaButton = () => {
  return (
    <button className='mr-5 py-1 pl-2 pr-5 rounded-full bg-sky-500 hover:bg-sky-600 text-lg font-bold'>
      <span className='flex items-center space-x-2'>
        <Image src={openseaLogo} alt='opensea logo' width={25} height={25} />
        <h4>Opensea</h4>
      </span>
    </button>
  )
}
