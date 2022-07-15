export const SaveButton = ({ onClick }) => {
  return (
    <button
      className='w-24 py-1 rounded-full text-xl font-semibold bg-sky-500 hover:bg-sky-600'
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
