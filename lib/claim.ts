import { supabase } from './supabaseClient'

export async function canClaim(address: string): Promise<boolean> {
  const { data } = await supabase
    .from('claims')
    .select('*')
    .eq('wallet', address)
    .single()

  if (!data) return true

  const lastClaimed = new Date(data.last_claimed)
  const now = new Date()

  const hoursPassed = (now.getTime() - lastClaimed.getTime()) / 1000 / 60 / 60
  return hoursPassed >= 24
}

export async function saveClaim(address: string) {
  const now = new Date().toISOString()

  const { data } = await supabase
    .from('claims')
    .select('*')
    .eq('wallet', address)
    .single()

  if (data) {
    await supabase
      .from('claims')
      .update({ last_claimed: now })
      .eq('wallet', address)
  } else {
    await supabase
      .from('claims')
      .insert([{ wallet: address, last_claimed: now }])
  }
}
