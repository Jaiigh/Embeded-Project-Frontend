"use client";

import { useState, useEffect } from "react";

export function EmailSettings() {
  const [email, setEmail] = useState<string>("");
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load saved email on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedEmail = localStorage.getItem("plant-watering-email");
      if (savedEmail) {
        setEmail(savedEmail);
        setIsSaved(true);
      }
    }
  }, []);

  const handleSave = () => {
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("plant-watering-email", email);
    }
    setIsSaved(true);
    setIsLoading(false);
    
    // Show confirmation
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  const handleRemove = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("plant-watering-email");
    }
    setEmail("");
    setIsSaved(false);
  };

  const getSavedEmail = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("plant-watering-email");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        📧 Email Alerts
      </h2>
      <p className="text-gray-600 mb-4 text-sm">
        Enter your email to receive alerts when your plant needs water
      </p>

      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setIsSaved(false);
          }}
          placeholder="your.email@example.com"
          className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
        />
        <button
          onClick={handleSave}
          disabled={isLoading || !email}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
        {getSavedEmail() && (
          <button
            onClick={handleRemove}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Remove
          </button>
        )}
      </div>

      {isSaved && (
        <div className="mt-3 text-green-600 text-sm">
          ✅ Email saved! You will receive alerts at {email}
        </div>
      )}

      {getSavedEmail() && !isSaved && (
        <div className="mt-3 text-gray-500 text-sm">
          Current email: {getSavedEmail()}
        </div>
      )}
    </div>
  );
}

