'use client'

import './globals.css'
import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from '../wagmi'

const queryClient = new QueryClient()

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
      <html lang="en">
            <body>
                    <WagmiProvider config={wagmiConfig}>
                              <QueryClientProvider client={queryClient}>
                                          {children}
                                                    </QueryClientProvider>
                                                            </WagmiProvider>
                                                                  </body>
                                                                      </html>
                                                                        )
                                                                        }
                                                                        