export interface GMBReview {
  name: string
  reviewId: string
  reviewer: {
    profilePhotoUrl?: string
    displayName: string
    isAnonymous: boolean
  }
  starRating: 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE'
  comment?: string
  createTime: string
  updateTime: string
  reviewReply?: {
    comment: string
    updateTime: string
  }
}

const STAR_MAP: Record<string, 1 | 2 | 3 | 4 | 5> = {
  ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5,
}

export function starRatingToNumber(star: string): 1 | 2 | 3 | 4 | 5 {
  return STAR_MAP[star] || 3
}

export async function fetchGMBReviews(
  locationId: string,
  accessToken: string
): Promise<GMBReview[]> {
  const url = `https://mybusiness.googleapis.com/v4/${locationId}/reviews?pageSize=50&orderBy=updateTime%20desc`

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(`GMB API error: ${res.status} - ${error}`)
  }

  const data = await res.json()
  return data.reviews || []
}

export async function postGMBReply(
  locationId: string,
  reviewId: string,
  replyText: string,
  accessToken: string
): Promise<void> {
  const url = `https://mybusiness.googleapis.com/v4/${locationId}/reviews/${reviewId}/reply`

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ comment: replyText }),
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(`Failed to post reply: ${res.status} - ${error}`)
  }
}

export async function deleteGMBReply(
  locationId: string,
  reviewId: string,
  accessToken: string
): Promise<void> {
  const url = `https://mybusiness.googleapis.com/v4/${locationId}/reviews/${reviewId}/reply`

  const res = await fetch(url, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!res.ok) {
    throw new Error(`Failed to delete reply: ${res.status}`)
  }
}

export async function fetchGMBLocations(accessToken: string): Promise<any[]> {
  const accountsRes = await fetch(
    'https://mybusiness.googleapis.com/v4/accounts',
    { headers: { Authorization: `Bearer ${accessToken}` } }
  )

  if (!accountsRes.ok) throw new Error('Failed to fetch GMB accounts')
  const { accounts } = await accountsRes.json()
  if (!accounts?.length) return []

  const locationPromises = accounts.map(async (account: any) => {
    const locRes = await fetch(
      `https://mybusiness.googleapis.com/v4/${account.name}/locations?pageSize=100`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    if (!locRes.ok) return []
    const { locations } = await locRes.json()
    return locations || []
  })

  const allLocations = await Promise.all(locationPromises)
  return allLocations.flat()
}

// Refresh Google OAuth token
export async function refreshAccessToken(refreshToken: string): Promise<string> {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  })

  if (!res.ok) throw new Error('Failed to refresh access token')
  const { access_token } = await res.json()
  return access_token
}
