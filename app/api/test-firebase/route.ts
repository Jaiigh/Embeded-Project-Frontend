import { NextResponse } from 'next/server'
import { getFirebaseValue } from '@/lib/firebase'

export async function GET() {
  try {
    const testValue = await getFirebaseValue('test')
    return NextResponse.json({ 
      success: true, 
      value: testValue,
      path: 'test'
    })
  } catch (error: any) {
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to fetch from Firebase',
        details: error.toString()
      },
      { status: 500 }
    )
  }
}

