import { NextResponse } from "next/server";

export async function middleware(request) {
    function getCookie() {
        var cookieArr = request.cookies.getAll();
        for (var i = 0; i < cookieArr.length; i++) {
            if (cookieArr[i].name === "isLogged") {
                return cookieArr[i].value;
            }
        }
        return null;
    }

    const getCurUser = async () => {
        var isLogged = getCookie("isLogged");
        try {
            if (isLogged === "" || isLogged == null) {
                if (request.nextUrl.pathname.startsWith("/")) {
                    const url = request.nextUrl.clone();
                    url.pathname = "/login";
                    return NextResponse.redirect(url);
                }
                if (request.nextUrl.pathname.startsWith("/blog")) {
                    const url = request.nextUrl.clone();
                    url.pathname = "/login";
                    return NextResponse.redirect(url);
                }
                if (request.nextUrl.pathname.startsWith("/profile")) {
                    const url = request.nextUrl.clone();
                    url.pathname = "/login";
                    return NextResponse.redirect(url);
                }
                if (request.nextUrl.pathname.startsWith("/event")) {
                    const url = request.nextUrl.clone();
                    url.pathname = "/login";
                    return NextResponse.redirect(url);
                }
            }
            else {
                if (request.nextUrl.pathname.startsWith("/login")) {
                    const url = request.nextUrl.clone();
                    url.pathname = "/";
                    return NextResponse.redirect(url);
                }
            }
        } catch (error) {
            console.log(error);
        }

        return NextResponse.next(); // Return NextResponse.next() by default
    }

    return await getCurUser(); // Return the result of getCurUser()

}

export const config = {
    matcher: ['/blog/:path*', '/event/:path*', '/profile', '/'],
}