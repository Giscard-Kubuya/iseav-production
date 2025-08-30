'use client'

import { useState, useEffect } from 'react'
import { servicesApi } from '@/lib/api-services'
import { useServiceMutations } from '@/hooks/useServices'

export default function ServiceTest() {
  const [testResults, setTestResults] = useState<string[]>([])
  const [testing, setTesting] = useState(false)
  const mutations = useServiceMutations()

  const addResult = (result: string) => {
    setTestResults(prev => [...prev, result])
  }

  const runTests = async () => {
    setTesting(true)
    setTestResults([])

    try {
      addResult('🧪 Starting Services CRUD Tests...')

      // Test 1: Create a service
      addResult('1️⃣ Testing service creation...')
      const testService = {
        title: 'Test Service',
        description: 'A test service for validation',
        detailed_description: 'This is a detailed description of the test service.',
        category: 'test',
        icon: '🧪',
        is_active: true,
        is_featured: false,
        display_order: 999,
        starting_price: 100,
        price_unit: 'per hour',
        features: ['Test feature 1', 'Test feature 2'],
        technologies: ['React', 'TypeScript'],
        deliverables: ['Test deliverable 1', 'Test deliverable 2'],
        duration_estimate: '1-2 weeks'
      }

      let createdService: any = null
      try {
        await mutations.createService(testService, {
          onSuccess: (data: any) => {
            createdService = data
            addResult('✅ Service created successfully')
          },
          onError: (error: any) => {
            addResult(`❌ Service creation failed: ${error.response?.data?.message || error.message}`)
          }
        })
      } catch (error: any) {
        addResult(`❌ Service creation failed: ${error.response?.data?.message || error.message}`)
      }

      // Test 2: Read the service (if creation was successful)
      if (createdService?.id) {
        addResult('2️⃣ Testing service retrieval...')
        try {
          const response = await servicesApi.getById(createdService.id)
          const retrievedService = response.data.data
          if (retrievedService.title === testService.title || retrievedService.name === testService.title) {
            addResult('✅ Service retrieved successfully')
          } else {
            addResult('❌ Service retrieval returned incorrect data')
          }
        } catch (error: any) {
          addResult(`❌ Service retrieval failed: ${error.response?.data?.message || error.message}`)
        }

        // Test 3: Update the service
        addResult('3️⃣ Testing service update...')
        try {
          const updateData = {
            ...testService,
            title: 'Updated Test Service',
            description: 'Updated description'
          }
          
          await mutations.updateService(createdService.id, updateData, {
            onSuccess: () => {
              addResult('✅ Service updated successfully')
            },
            onError: (error: any) => {
              addResult(`❌ Service update failed: ${error.response?.data?.message || error.message}`)
            }
          })
        } catch (error: any) {
          addResult(`❌ Service update failed: ${error.response?.data?.message || error.message}`)
        }

        // Test 4: Toggle active status
        addResult('4️⃣ Testing toggle active...')
        try {
          await mutations.toggleActive(createdService.id, {
            onSuccess: () => {
              addResult('✅ Service toggle active successful')
            },
            onError: (error: any) => {
              addResult(`❌ Service toggle active failed: ${error.response?.data?.message || error.message}`)
            }
          })
        } catch (error: any) {
          addResult(`❌ Service toggle active failed: ${error.response?.data?.message || error.message}`)
        }

        // Test 5: Toggle featured status
        addResult('5️⃣ Testing toggle featured...')
        try {
          await mutations.toggleFeatured(createdService.id, {
            onSuccess: () => {
              addResult('✅ Service toggle featured successful')
            },
            onError: (error: any) => {
              addResult(`❌ Service toggle featured failed: ${error.response?.data?.message || error.message}`)
            }
          })
        } catch (error: any) {
          addResult(`❌ Service toggle featured failed: ${error.response?.data?.message || error.message}`)
        }

        // Test 6: Delete the service (cleanup)
        addResult('6️⃣ Testing service deletion (cleanup)...')
        try {
          await mutations.deleteService(createdService.id, {
            onSuccess: () => {
              addResult('✅ Service deleted successfully (cleanup completed)')
            },
            onError: (error: any) => {
              addResult(`❌ Service deletion failed: ${error.response?.data?.message || error.message}`)
            }
          })
        } catch (error: any) {
          addResult(`❌ Service deletion failed: ${error.response?.data?.message || error.message}`)
        }
      }

      addResult('🏁 Test suite completed!')

    } catch (error: any) {
      addResult(`💥 Test suite failed: ${error.message}`)
    }

    setTesting(false)
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Services CRUD Test Suite</h2>
      
      <button
        onClick={runTests}
        disabled={testing || mutations.loading}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {testing || mutations.loading ? 'Testing...' : 'Run Tests'}
      </button>

      {testResults.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Test Results:</h3>
          <div className="space-y-1">
            {testResults.map((result, index) => (
              <div key={index} className="text-sm font-mono">
                {result}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}