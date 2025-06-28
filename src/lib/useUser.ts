'use client'

import { useEffect, useState } from 'react'
import { supabase } from './supabase'

export const useUser = () => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSessionAndProfile = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session?.user) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('name, email')
          .eq('id', session.user.id)
          .single()

        if (profile && !error) {
          setUser({ ...session.user, ...profile })
        }
      }

      setLoading(false)
    }

    getSessionAndProfile()
  }, [])

  return { user, loading }
}
