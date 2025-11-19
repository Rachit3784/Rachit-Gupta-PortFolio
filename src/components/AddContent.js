"use client";
import React, { useState } from "react";

const AddDescription = () => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: description }),
      });

      if (res.ok) {
        setStatus("success");
        setDescription("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(null), 4000);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16 bg-white dark:bg-black transition-colors">
      <div className="w-full max-w-xl p-8 rounded-xl border border-gray-300 dark:border-white/20 bg-white dark:bg-black shadow-lg">

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white text-center mb-6">
          Add Description
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Input */}
          <div>
            <label className="block mb-2 text-sm font-medium text-black dark:text-white">
              Enter Description
            </label>

            <textarea
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="
                w-full rounded-lg p-4 resize-none
                border border-gray-400 dark:border-white
                bg-white dark:bg-black
                text-black dark:text-white
                focus:ring-2 focus:ring-yellow-400 outline-none
              "
              placeholder="Write something..."
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-3 rounded-lg
              bg-yellow-500 hover:bg-yellow-600
              text-black font-medium
              transition-all
              disabled:opacity-60
            "
          >
            {loading ? "Adding..." : "Add Description"}
          </button>

          {/* Status messages */}
          {status === "success" && (
            <p className="text-green-600 dark:text-green-400 text-center">
              Description added successfully!
            </p>
          )}

          {status === "error" && (
            <p className="text-red-600 dark:text-red-400 text-center">
              Something went wrong. Try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default AddDescription;
