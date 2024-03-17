import { Button, Skeleton } from "antd";
import React from 'react'
import { useThemePage } from './useThemePage'
import Loader from '../../../components/Loader'
import MediaBlock from '../../../components/MediaBlock'
import { MdDelete, MdEdit, MdDone, MdCancel } from "react-icons/md";

const ThemePage = () => {
  const {
    data,
    isLoading,
    pageIsDeleting,
    deleteThemePage,
    setIsBlockEdited,
    isBlockEdited,
    blockIds,
    deleteThemePageBlocks,
    blocksIsDeleting,
    handleCancelEdit
  } = useThemePage()

  const isBlocks = blockIds?.length

  const icon = isBlocks ? <MdDone size={24} className="-mb-1" /> : <MdEdit size={24} className="-mb-1" />

  return (
    <div className="mx-auto h-screen w-[80%] pl-8 pt-20">
      <div className="flex justify-between pb-12 pr-20">
        <h1 className="h-[3rem] w-[16rem] bg-[#EBEDEF] text-4xl font-semibold placeholder:text-black focus:outline-none">
          {data?.page_name || <Skeleton active />}
        </h1>
        <div>
          {isBlocks ? (
            <Button
              icon={<MdCancel size={24} className="-mb-1" />}
              onClick={handleCancelEdit}
              type="primary"
              size="large"
              className="h-[2.6rem] bg-blue-500 font-open-sans text-base duration-200 hover:scale-105 hover:!bg-blue-600 mr-2"
            >
              Cancel editing
            </Button>
          ) : null}
        <Button
          loading={blocksIsDeleting}
          icon={icon}
          onClick={() => isBlocks ? deleteThemePageBlocks() : setIsBlockEdited(!isBlockEdited)}
          type="primary"
          size="large"
          className="h-[2.6rem] bg-blue-500 font-open-sans text-base duration-200 hover:scale-105 hover:!bg-blue-600 mr-2"
        >
        {isBlocks ? 'Delete blocks' : 'Edit blocks'}
        </Button>
        <Button
          loading={pageIsDeleting}
          icon={<MdDelete size={24} className="-mb-1" />}
          onClick={deleteThemePage}
          type="primary"
          size="large"
          className="h-[2.6rem] bg-red-500 font-open-sans text-base duration-200 hover:scale-105 hover:!bg-red-600"
        >
          Delete theme page
        </Button>
       </div>
      </div>
      {isLoading && <Loader />}
      <div className={`grid  gap-10 pr-20`} style={{ gridTemplateColumns: `repeat(${data?.columns || 3}, minmax(0, 1fr))`}}>
        {!isLoading && data?.blocks.length && data.blocks.map((block) => (
          <MediaBlock
            key={block.id}
            isBlockEdited={isBlockEdited}
            {...block}
          />
        ))}
      </div>
    </div>
  )
}

export default ThemePage
