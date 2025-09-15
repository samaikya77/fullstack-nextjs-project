
import { NextResponse } from 'next/server';

export default withClerkMiddleware(() => {
  // You can add custom logic here if needed
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

function withClerkMiddleware(arg0: () => NextResponse<unknown>) {
  throw new Error('Function not implemented.');
}
