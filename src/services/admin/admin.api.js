import { useMutation, useQuery } from '@tanstack/react-query'
import {
  checkThemeExistence,
  deleteTheme,
  fetchAllThemes,
  fetchSubCategoryOrWord,
  fetchThemePages,
  performCategorySearch,
  savePage,
  saveTheme,
  searchText,
  fetchThemePageBlockByID,
  deleteThemePage,
  deleteThemePageBlocks,
} from './admin.fetch'
import { useNavigate } from 'react-router-dom'

export const useFetchAllThemes = () =>
  useQuery({
    queryKey: ['themes'],
    queryFn: fetchAllThemes,
  })

export const useFetchThemePageBlocks = (id) =>
  useQuery({
    queryKey: ['themePageBlocks'],
    queryFn: () => fetchThemePageBlockByID(id),
  })

export const useDeleteThemePage = ({ themeId, pageId }) => {
  const navigate = useNavigate()
  return useMutation({
    mutationKey: ['themes'],
    mutationFn: () => deleteThemePage(pageId),
    onSuccess: () => navigate(`/admin/thema/${themeId}`),
  })
}

export const useDeleteThemePageBlocks = ({ pageId, blockIds, themeId }) => {
  const navigate = useNavigate()
  return useMutation({
    mutationKey: ['themePageBlocks'],
    mutationFn: () => deleteThemePageBlocks({ pageId, blockIds }),
    onSuccess: () => navigate(`/admin/thema/${themeId}`),
  })
}

export const useCheckThemeExistence = (theme) => {
  return useMutation({
    mutationKey: ['themes'],
    mutationFn: () => checkThemeExistence(theme),
  })
}
export const useSaveTheme = (theme, hasSavedTheme) => {
  return useMutation({
    mutationKey: ['themes'],
    mutationFn: () => saveTheme(theme),
    onSuccess: hasSavedTheme,
  })
}
export const useDeleteTheme = (id) => {
  const navigate = useNavigate()
  return useMutation({
    mutationKey: ['themes'],
    mutationFn: () => deleteTheme(id),
    onSuccess: () => navigate('/admin/thema'),
  })
}

export const useFetchThemePages = (id) =>
  useQuery({
    queryKey: ['pages'],
    queryFn: () => fetchThemePages(id),
  })

export const useSavePage = () => {
  return useMutation({
    mutationKey: ['pages'],
    mutationFn: (pageData) => savePage(pageData),
  })
}
export const useSearchText = (text) => {
  return useMutation({
    mutationFn: () => searchText(text),
  })
}
export const usePerformCategorySearch = () => {
  return useMutation({
    mutationKey: ['pages'],
    mutationFn: (text) => performCategorySearch(text),
  })
}
export const useFetchSubCategoryOrWord = () => {
  return useMutation({
    mutationKey: ['pages'],
    mutationFn: (body) => fetchSubCategoryOrWord(body),
  })
}
