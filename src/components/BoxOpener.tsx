'use client'

import { useState, useEffect } from 'react'
import { claimReward } from '@/utils/supabase'
import confetti from 'canvas-confetti'

export function BoxOpener({ address }: { address: string }) {
  const [isClaiming, setIsClaiming] = useState(false)
    const [claimedAmount, setClaimedAmount] = useState<number | null>(null)
      const [totalClaimed, setTotalClaimed] = useState(0)
        const [lastClaimTime, setLastClaimTime] = useState<string | null>(null)

          const handleClaim = async () => {
              if (!address || isClaiming) return

                  setIsClaiming(true)

                      const { amount, timestamp, total } = await claimReward(address)

                          if (amount > 0) {
                                setClaimedAmount(amount)
                                      setLastClaimTime(timestamp)
                                            setTotalClaimed(total)
                                                  confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
                                                      }

                                                          setIsClaiming(false)
                                                            }

                                                              return (
                                                                  <div className="flex flex-col items-center justify-center gap-6">
                                                                        <div className="relative w-48 h-48 bg-yellow-300 border-4 border-yellow-600 rounded-xl shadow-lg flex items-center justify-center transition-all hover:scale-105">
                                                                                <span className="text-3xl font-bold text-white">🎁</span>
                                                                                      </div>

                                                                                            <button
                                                                                                    onClick={handleClaim}
                                                                                                            disabled={isClaiming}
                                                                                                                    className="px-6 py-3 rounded-2xl bg-purple-700 text-white text-lg font-bold shadow-lg hover:bg-purple-800 disabled:opacity-50 transition-all"
                                                                                                                          >
                                                                                                                                  {isClaiming ? 'Claiming...' : 'Open Box'}
                                                                                                                                        </button>

                                                                                                                                              {claimedAmount !== null && (
                                                                                                                                                      <p className="text-xl text-green-600 font-semibold">
                                                                                                                                                                You received {claimedAmount} MONK!
                                                                                                                                                                        </p>
                                                                                                                                                                              )}

                                                                                                                                                                                    {lastClaimTime && (
                                                                                                                                                                                            <p className="text-sm text-gray-500">Last claimed: {lastClaimTime}</p>
                                                                                                                                                                                                  )}

                                                                                                                                                                                                        <p className="text-md text-gray-700 font-medium">
                                                                                                                                                                                                                Total Claimed by All Users: {totalClaimed} MONK
                                                                                                                                                                                                                      </p>
                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                            )
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                            