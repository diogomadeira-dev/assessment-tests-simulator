import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Image from 'next/image'
import { FC } from 'react'

interface UserItemProps {
  user: {
    id: number
    name: string
    image_url: string
  }
}
const UserItem: FC<UserItemProps> = (props) => {
  const { id, name, image_url } = props.option
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex cursor-grab justify-between rounded border-2 border-dashed bg-white p-12"
    >
      <div>
        <Image src={image_url} width={100} height={100} alt={name} />
        {/* <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600">{name}</p> */}
      </div>
      {/* <button {...attributes} {...listeners} className='cursor-move'>
        Drag
      </button> */}
    </div>
  )
}

export default UserItem
