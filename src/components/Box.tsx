'use client'

import { useEffect, useState } from 'react'

export function Box() {
  const [lastClaim, setLastClaim] = useState<number | null>(null)
    const [reward, setReward] = useState<number | null>(null)
      const [cooldown, setCooldown] = useState<string>('')

        useEffect(() => {
            const last = localStorage.getItem('lastClaim')
                if (last) {
                      const timestamp = parseInt(last)
                            setLastClaim(timestamp)
                                  updateCooldown(timestamp)
                                      }
                                        }, [])

                                          const updateCooldown = (timestamp: number) => {
                                              const now = Date.now()
                                                  const diff = 24 * 60 * 60 * 1000 - (now - timestamp)

                                                      if (diff > 0) {
                                                            const hours = Math.floor(diff / (1000 * 60 * 60))
                                                                  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
                                                                        setCooldown(`${hours}h ${minutes}m remaining`)
                                                                            } else {
                                                                                  setCooldown('')
                                                                                      }
                                                                                        }

                                                                                          const claimReward = () => {
                                                                                              if (lastClaim && Date.now() - lastClaim < 24 * 60 * 60 * 1000) {
                                                                                                    alert('You can only claim once every 24 hours.')
                                                                                                          return
                                                                                                              }

                                                                                                                  const newReward = Math.floor(Math.random() * 100) + 1
                                                                                                                      setReward(newReward)
                                                                                                                          const now = Date.now()
                                                                                                                              setLastClaim(now)
                                                                                                                                  localStorage.setItem('lastClaim', now.toString())
                                                                                                                                      updateCooldown(now)
                                                                                                                                        }

                                                                                                                                          return (
                                                                                                                                              <div className="text-center">
                                                                                                                                                    <button
                                                                                                                                                            onClick={claimReward}
                                                                                                                                                                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-full shadow-xl transition mb-4"
                                                                                                                                                                          >
                                                                                                                                                                                  🎁 Open Box
                                                                                                                                                                                        </button>

                                                                                                                                                                                              {reward && (
                                                                                                                                                                                                      <div className="text-xl font-semibold text-green-300">
                                                                                                                                                                                                                You received: {reward} MONK!
                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                              )}

                                                                                                                                                                                                                                    {cooldown && (
                                                                                                                                                                                                                                            <div className="text-sm mt-2 text-red-300">
                                                                                                                                                                                                                                                      ⏳ {cooldown}
                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                    )}
                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                          )
                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                                          