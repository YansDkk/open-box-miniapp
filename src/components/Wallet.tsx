'use client'

import { useAccount, useConnect } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { useEffect, useState } from 'react'

export function Wallet() {
  const [hasMounted, setHasMounted] = useState(false)
    const [hasEthereum, setHasEthereum] = useState(true)

      const { address, isConnected } = useAccount()
        const { connect, isLoading, error } = useConnect({
            connector: injected(),
              })

                useEffect(() => {
                    setHasMounted(true)
                        if (typeof window !== 'undefined' && !window.ethereum) {
                              setHasEthereum(false)
                                  }
                                    }, [])

                                      // Prevent hydration error
                                        if (!hasMounted) return null

                                          if (!hasEthereum) {
                                              return (
                                                    <div className="text-red-500 text-center mt-4">
                                                            ⚠️ Wallet not found. Please open this app inside a wallet browser like Metamask.
                                                                  </div>
                                                                      )
                                                                        }

                                                                          if (isConnected) {
                                                                              return (
                                                                                    <div className="text-center text-white mb-4">
                                                                                            ✅ Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
                                                                                                  </div>
                                                                                                      )
                                                                                                        }

                                                                                                          return (
                                                                                                              <div className="text-center">
                                                                                                                    <button
                                                                                                                            onClick={() => connect()}
                                                                                                                                    disabled={isLoading}
                                                                                                                                            className="bg-fuchsia-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-fuchsia-700 transition"
                                                                                                                                                  >
                                                                                                                                                          {isLoading ? `Connecting...` : `Connect Wallet`}
                                                                                                                                                                </button>
                                                                                                                                                                      {error && (
                                                                                                                                                                              <p className="text-red-500 mt-2 text-sm">
                                                                                                                                                                                        ⚠️ {error.message}
                                                                                                                                                                                                </p>
                                                                                                                                                                                                      )}
                                                                                                                                                                                                          </div>
                                                                                                                                                                                                            )
                                                                                                                                                                                                            }
                                                                                                                                                                                                            