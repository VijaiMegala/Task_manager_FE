const ListItem = ({title, status, onView, onEdit, onDelete}: {title: string, status: string, onView: () => void, onEdit: () => void, onDelete: () => void}) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-5 w-full max-w-3xl p-4 rounded-md md:justify-center bg-white border border-gray-300 ">
    <span className="text-black w-[70%] text-center md:text-left ">{title}</span>
    <span className="text-black w-[30%] text-center md:text-left ">{status.toLocaleUpperCase()}</span>
    <div className="flex flex-row items-center justify-center gap-2"> 
        <div className="px-5 py-2 rounded-md cursor-pointer text-black" onClick={onView}>View</div>
        <div className="px-5 py-2 rounded-md cursor-pointer text-black" onClick={onEdit}>Edit</div>
        <div className="px-5 py-2 rounded-md cursor-pointer text-white bg-black" onClick={onDelete}>Delete</div>
    </div>
    </div>
  )
}

export default ListItem