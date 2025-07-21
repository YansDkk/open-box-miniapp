import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    export async function claimReward(address: string) {
      const now = new Date()
        const lastClaim = await supabase
            .from('claims')
                .select('*')
                    .eq('address', address)
                        .order('timestamp', { ascending: false })
                            .limit(1)

                              const canClaim = !lastClaim.data?.length || 
                                  (new Date(lastClaim.data[0].timestamp).getTime() + 24 * 60 * 60 * 1000 < now.getTime())

                                    if (!canClaim) {
                                        return { amount: 0, timestamp: lastClaim.data[0].timestamp, total: await getTotalClaimed() }
                                          }

                                            const amount = Math.floor(Math.random() * 100) + 1

                                              await supabase.from('claims').insert({
                                                  address,
                                                      amount,
                                                          timestamp: now.toISOString(),
                                                            })

                                                              return { amount, timestamp: now.toISOString(), total: await getTotalClaimed() }
                                                              }

                                                              export async function getTotalClaimed() {
                                                                const { data, error } = await supabase.from('claims').select('amount')

                                                                  if (error || !data) return 0

                                                                    return data.reduce((acc, row) => acc + row.amount, 0)
                                                                    }
                                                                    