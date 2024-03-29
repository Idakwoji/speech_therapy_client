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
    mutationFn: async () => login(email, password),
    // onSuccess: () =>
    //   userType === 'admin'
    //     ? navigate(`/admin/thema`)
    //     : userType === 'therapist'
    //       ? navigate(`/therapist/`)
    //       : navigate(`/client/`),
  })
}

export const useEnable2fa = ({ user_id }) => {
  console.log(user_id)
  return useMutation({
    mutationKey: ['enable2fa'],
    mutationFn: async () => enable2fa(user_id),
  })
}

export const useVerify2fa = (otp) => {
  return useMutation({
    mutationKey: ['verify2fa'],
    mutationFn: async () => verify2fa(otp),
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
