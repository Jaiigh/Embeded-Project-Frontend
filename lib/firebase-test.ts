/**
 * Test script to fetch 'test' value from Firebase
 * Run this in a Node.js environment or use it in your components
 */

import { getFirebaseValue } from './firebase'

export async function testFirebaseConnection() {
  try {
    console.log('Fetching "test" value from Firebase...')
    const testValue = await getFirebaseValue('test')
    console.log('Test value:', testValue)
    return testValue
  } catch (error) {
    console.error('Error fetching test value:', error)
    throw error
  }
}

