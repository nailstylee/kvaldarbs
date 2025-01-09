import { supabase } from './supabase.js'
import { initializeLevelProgress } from './levelProgress.js'

export const signUpUser = async (username, password) => {
  const { data, error } = await supabase.from('users').insert([
    {
      username,
      password,
    },
  ]);

  if (error) {
    if (error.code === '23505') { // '23505' is the standard code for unique constraint violations
      return { data: null, error: { message: 'This username already exists. Please choose a different one.' } };
    }

    return { data: null, error };
  }

  if (data) {
    const userId = data[0].id 
    const { error: initError } = await initializeLevelProgress(userId, 10)
    if (initError) {
      console.error('Error initializing level progress:', initError)
    }
  }

  return { data: { username }, error: null }
}

export const signInUser = async (username, password) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .eq('password', password)
    .single()

  if (error) {
    return { error }
  }

  if (data) {
    // Save the authenticated user in local storage
    localStorage.setItem('user', JSON.stringify(data))

    // Initialize level progress for the user
    const userId = data.user_id 
    const { error: initError } = await initializeLevelProgress(userId, 10) 
    if (initError) {
      console.error('Error initializing level progress:', initError)
    }

    return { data }
  } else {
    return { error: { message: 'Invalid username or password' } }
  }
}

export const signOutUser = async () => {
  try {
    localStorage.removeItem('user')
    return null
  } catch (error) {
    return { error }
  }
}
