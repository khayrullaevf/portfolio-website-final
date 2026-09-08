import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  // getSession() reads the session out of the cookie locally and only hits the
  // network when the token has actually expired (to refresh it, which is the
  // other reason this middleware exists — hence returning `response` below).
  // getUser() instead validates against Supabase Auth over HTTPS on *every*
  // request, including every RSC navigation and prefetch under /admin, which
  // put a full round trip in front of each sidebar click.
  //
  // That makes this a routing gate, not the security boundary: enforcement
  // lives in RLS on every table plus requireAdminClient() (which does call
  // getUser()) in front of every mutation. A forged cookie gets the admin
  // shell and nothing else — every read comes back empty, every write fails.
  // Only the session's existence is checked; session.user is deliberately
  // never read, since that getter is the unverified one.
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const isLoginPage = request.nextUrl.pathname === "/admin/login"

  if (!session && !isLoginPage) {
    const loginUrl = new URL("/admin/login", request.url)
    return NextResponse.redirect(loginUrl)
  }

  if (session && isLoginPage) {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  return response
}

export const config = {
  matcher: ["/admin/:path*"],
}
