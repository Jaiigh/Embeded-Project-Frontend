"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

async function fetchTestValue() {
  const response = await fetch("/api/test-firebase");
  if (!response.ok) {
    throw new Error("Failed to fetch test value");
  }
  return response.json();
}

export function FirebaseTest() {
  const [isFetching, setIsFetching] = useState(false);
  const [testValue, setTestValue] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    setIsFetching(true);
    setError(null);
    try {
      const result = await fetchTestValue();
      setTestValue(result.value);
    } catch (err: any) {
      setError(err.message || "Failed to fetch from Firebase");
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Firebase Test
      </h2>

      <button
        onClick={handleFetch}
        disabled={isFetching}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
      >
        {isFetching ? "Fetching..." : "Get Test Value from Firebase"}
      </button>

      {error && (
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 mb-4">
          <p className="text-red-800 font-semibold">Error:</p>
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {testValue !== null && (
        <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
          <p className="text-green-800 font-semibold mb-2">Test Value:</p>
          <pre className="bg-white p-3 rounded border overflow-auto text-sm">
            <div className="text-black">
              {JSON.stringify(testValue, null, 2)}
            </div>
          </pre>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        <p>
          Database URL:
          https://embedproject-ac1d3-default-rtdb.asia-southeast1.firebasedatabase.app/
        </p>
        <p>Path: /test</p>
      </div>
    </div>
  );
}
