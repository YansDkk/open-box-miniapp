import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function claimReward(address: string, amount: number) {
  const { data, error } = await supabase
    .from('claims')
    .insert([{ address, amount }])

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getTotalClaimed() {
  const { data, error } = await supabase
    .from('claims')
    .select('amount')

  if (error) {
    throw new Error(error.message)
  }

  const total = data?.reduce((sum, item) => sum + item.amount, 0) || 0
  return total
}
