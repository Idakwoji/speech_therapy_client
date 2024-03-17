import { useMutation, useQuery } from '@tanstack/react-query'
import { login, verify2fa, enable2fa } from './fetch'
import { useNavigate } from 'react-router-dom'

// export const useFetchAllThemes = () =>
//   useQuery({
//     queryKey: ['themes'],
//     queryFn: fetchAllThemes,
//   })

// export const useFetchThemePageBlocks = (id) =>
//   useQuery({
//     queryKey: ['themePageBlocks'],
//     queryFn: () => fetchThemePageBlockByID(id),
//   })

export const useLogin = ({ email, password, slug }) => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: () => login(email, password),
    // onSuccess: () =>
    //   userType === 'admin'
    //     ? navigate(`/admin/thema`)
    //     : userType === 'therapist'
    //       ? navigate(`/therapist/`)
    //       : navigate(`/client/`),
  })
}

export const useEnable2fa = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: () => enable2fa(),
  })
}

export const useVerify2fa = (otp) => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: () => verify2fa(otp),
  })
}

// export const useCheckThemeExistence = (theme) => {
//   return useMutation({
//     mutationKey: ['themes'],
//     mutationFn: () => checkThemeExistence(theme),
//   })
// }
// export const useSaveTheme = (theme, hasSavedTheme) => {
//   return useMutation({
//     mutationKey: ['themes'],
//     mutationFn: () => saveTheme(theme),
//     onSuccess: hasSavedTheme,
//   })
// }
// export const useDeleteTheme = (id) => {
//   const navigate = useNavigate()
//   return useMutation({
//     mutationKey: ['themes'],
//     mutationFn: () => deleteTheme(id),
//     onSuccess: () => navigate('/admin/thema'),
//   })
// }

// export const useFetchThemePages = (id) =>
//   useQuery({
//     queryKey: ['pages'],
//     queryFn: () => fetchThemePages(id),
//   })

// export const useSavePage = () => {
//   return useMutation({
//     mutationKey: ['pages'],
//     mutationFn: (pageData) => savePage(pageData),
//   })
// }
// export const useSearchText = (text) => {
//   return useMutation({
//     mutationFn: () => searchText(text),
//   })
// }
// export const usePerformCategorySearch = () => {
//   return useMutation({
//     mutationKey: ['pages'],
//     mutationFn: (text) => performCategorySearch(text),
//   })
// }
