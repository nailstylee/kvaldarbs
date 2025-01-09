import { supabase } from './supabase.js'

// Save or update level progress
export const saveLevelProgress = async (userId, levelId, stars, throwsUsed, timeTaken) => {
  const { data, error } = await supabase
    .from('levelprogress')
    .upsert(
      {
        user_id: userId,
        level_id: levelId,
        stars,
        throws_used: throwsUsed,
        time_taken: timeTaken,
        unlocked: true,
      },
      { onConflict: ['user_id', 'level_id'] } // Handle conflicts by updating existing rows
    )

  return { data, error }
}

// Retrieve progress for all levels for a specific user
export const getLevelProgress = async (userId) => {
  const { data, error } = await supabase
    .from('levelprogress')
    .select('*')
    .eq('user_id', userId)
  return { data, error }
}

// Unlock the next level upon completing the current one
export const unlockNextLevel = async (userId, currentLevelId) => {
  const nextLevelId = currentLevelId + 1
  const { data, error } = await supabase
    .from('levelprogress')
    .update({ unlocked: true })
    .eq('user_id', userId)
    .eq('level_id', nextLevelId)
  return { data, error }
}
export const initializeLevelProgress = async (userId, totalLevels) => {
  // Check if progress already exists for this user
  const { data, error: fetchError } = await supabase
    .from('levelprogress')
    .select('*')
    .eq('user_id', userId)

  if (fetchError) {
    console.error('Error checking existing level progress:', fetchError)
    return { data: null, error: fetchError }
  }

  if (data.length > 0) {
    console.log('Level progress already exists for this user.')
    return { data, error: null } 
  }

  // Initialize progress if none exists
  const levelEntries = []

  for (let levelId = 1; levelId <= totalLevels; levelId++) {
    levelEntries.push({
      user_id: userId,
      level_id: levelId,
      unlocked: levelId === 1, // Only Level 1 is unlocked initially
      stars: 0,
      throws_used: 0,
      time_taken: 0,
    })
  }

  const { data: initData, error: initError } = await supabase.from('levelprogress').upsert(levelEntries)

  return { data: initData, error: initError }
}

