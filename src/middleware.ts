import { NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest){
    const token = request.cookies.get('@nextauth.token')?.value

    const signInURL = new URL('/', request.url)
    const homeInURL = new URL('/home', request.url)

    if (!token) {
        if (request.nextUrl.pathname === '/') {
            return NextResponse.next()
        }

        const response = NextResponse.redirect(signInURL);
        response.cookies.set('loginToast', 'Faça login para acessar esta página');
        return response;
    }
}

export const config = {
    matcher: ['/create-donation', '/update-donation', '/profile']
}
