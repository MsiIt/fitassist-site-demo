import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

function getMobileOperatingSystem(userAgent: string) {
  if (/android/i.test(userAgent)) {
    return 'android'
  }

  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return 'ios'
  }

  return 'unknown'
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const utmSource = searchParams.get('utm_source')

  const headersList = headers()
  const userAgent = headersList.get('user-agent')

  const result = getMobileOperatingSystem(userAgent)

  if (result === 'ios') {
    return redirect(
      `https://apps.apple.com/app/apple-store/id6499576852?pt=126411376&ct=${utmSource}&mt=8`
    )
  } else if (result === 'android') {
    return redirect(
      `https://play.google.com/store/apps/details?id=com.fitnessassist.online&referrer=utm_source%3D${utmSource}`
    )
  } else {
    cookies().set('utm_source', utmSource, { maxAge: 3 * 24 * 3600 })
    return redirect(`/`)
  }
}
