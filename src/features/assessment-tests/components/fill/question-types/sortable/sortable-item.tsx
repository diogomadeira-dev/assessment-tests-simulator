import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { InitialOptionsProps } from './index'

const SortableItem = ({ id, name, image_url }: InitialOptionsProps) => {
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
        {image_url && (
          <img src={image_url} width={100} height={100} alt={name} />
        )}
        {name && <h3 className="text-lg font-semibold">{name}</h3>}
      </div>
      {/* <button {...attributes} {...listeners} className='cursor-move'>
        Drag
      </button> */}
    </div>
  )
}

export default SortableItem
