const SearhcBar = ({search, setSearch}: {search: string, setSearch: (search: string) => void}) => {
  return (
    <div className="flex flex-row items-center justify-center w-full max-w-3xl px-4">
        <input 
            type="text"
            placeholder="Search tasks..."
            className="w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-black text-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    </div>
  )
}

export default SearhcBar