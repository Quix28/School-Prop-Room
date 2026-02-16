// This handles the redirect after Google login

import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    
    await supabase.auth.exchangeCodeForSession(code)
    // Check if user is admin or student
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()
      
      // Redirect based on role
      if (profile?.role === 'admin') {
        return NextResponse.redirect(`${requestUrl.origin}/admin/dashboard`)
      } else {
        return NextResponse.redirect(`${requestUrl.origin}/catalog`)
      }
    }
  }

  // If no code or error, redirect to login
  return NextResponse.redirect(`${requestUrl.origin}/login`)
}
