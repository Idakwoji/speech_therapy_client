import React, {useState} from 'react';
import { useParams } from "react-router-dom";
import {
  useFetchThemePageBlocks,
  useDeleteThemePage,
  useDeleteThemePageBlocks
} from "../../../services/admin/admin.api";
import { useRecoilState } from "recoil";
import { blockForDeleteState } from '../../../state'

export const useThemePage = () => {
  const [isBlockEdited, setIsBlockEdited] = useState(false)
  const [blockIds, setBlockIds] = useRecoilState(blockForDeleteState)
  const { themeId, pageId } = useParams()
  const { data, isLoading, error } = useFetchThemePageBlocks(pageId)
  const { isPending: pageIsDeleting, mutate: deleteThemePage } = useDeleteThemePage({ themeId, pageId })
  const { isPending: blocksIsDeleting, mutate: deleteThemePageBlocks } = useDeleteThemePageBlocks({ pageId, blockIds, themeId })
  
  const handleCancelEdit = () => {
    setBlockIds([])
    setIsBlockEdited(false)
  }

  return {
    data,
    isLoading,
    error,
    pageIsDeleting,
    deleteThemePage,
    setIsBlockEdited,
    isBlockEdited,
    blockIds,
    deleteThemePageBlocks,
    blocksIsDeleting,
    handleCancelEdit
  }
}
