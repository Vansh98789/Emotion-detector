import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";

type EmotionResponse = {
  emotion: string;
  confidence: number;
  emoji: string;
};

const EmotionForm: React.FC = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EmotionResponse | null>(null);
  const [error, setError] = useState("");
  const [isDark, setIsDark] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: EmotionResponse = await response.json();
      setResult(data);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const themeClasses = {
    bg: isDark
      ? "bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
      : "bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100",
    cardBg: isDark
      ? "bg-gray-800/60 backdrop-blur-md border-purple-500/30"
      : "bg-white/70 backdrop-blur-md border-purple-200",
    text: isDark ? "text-purple-100" : "text-purple-900",
    textSecondary: isDark ? "text-purple-300" : "text-purple-700",
    border: isDark ? "border-purple-500/30" : "border-purple-200",
    input: isDark
      ? "bg-gray-700/50 border-purple-500/50 text-purple-100 placeholder-purple-400 focus:border-pink-400 focus:ring-pink-400"
      : "bg-white/80 border-purple-300 text-purple-900 placeholder-purple-500 focus:border-pink-500 focus:ring-pink-500",
    button: isDark
      ? "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
      : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
    themeButton: isDark
      ? "bg-purple-700/50 hover:bg-purple-600/50 text-purple-200"
      : "bg-purple-200 hover:bg-purple-300 text-purple-700",
    resultBg: isDark
      ? "bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-emerald-400/50"
      : "bg-gradient-to-r from-green-100 to-emerald-100 border-emerald-400",
    resultText: isDark ? "text-emerald-200" : "text-emerald-800",
    resultSecondary: isDark ? "text-emerald-300" : "text-emerald-600",
    resultBar: isDark ? "bg-emerald-800/50" : "bg-emerald-200",
    resultBarFill: isDark
      ? "bg-gradient-to-r from-emerald-400 to-green-400"
      : "bg-gradient-to-r from-emerald-500 to-green-500",
    errorBg: isDark
      ? "bg-gradient-to-r from-red-900/40 to-pink-900/40 border-red-400/50 text-red-200"
      : "bg-gradient-to-r from-red-100 to-pink-100 border-red-400 text-red-700",
  };

  return (
    <div
      className={`relative min-h-screen w-full overflow-x-hidden transition-colors duration-200 ${themeClasses.bg}`}
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 blur-3xl animate-pulse" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1
            className={`text-4xl font-bold bg-gradient-to-r ${
              isDark ? "from-pink-400 to-purple-400" : "from-purple-600 to-pink-600"
            } bg-clip-text text-transparent`}
          >
            💫 Emotion Analyzer
          </h1>
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${themeClasses.themeButton}`}
          >
            {isDark ? (
              <Sun className="w-6 h-6 text-yellow-400" />
            ) : (
              <Moon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* main thing */}
        <div className="max-w-2xl mx-auto">
          <div
            className={`rounded-xl shadow-2xl p-6 ${themeClasses.cardBg} border-2 ${themeClasses.border}`}
          >
            <p className={`text-center mb-6 text-lg ${themeClasses.textSecondary}`}>
              🌈 Enter your text below to discover the colorful emotions within it ✨
            </p>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="emotion-text"
                  className={`block text-sm font-medium mb-2 ${themeClasses.text}`}
                >
                  Your text
                </label>
                <textarea
                  id="emotion-text"
                  className={`w-full p-4 rounded-xl border-2 focus:ring-2 focus:ring-offset-2 transition-all duration-300 ${themeClasses.input}`}
                  placeholder="🌟 How are you feeling today? Share your thoughts and let's discover the emotions together! 💭"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading || !text.trim()}
                className={`w-full py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg ${themeClasses.button}`}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>✨ Analyzing your emotions...</span>
                  </div>
                ) : (
                  "🎨 Analyze My Emotions"
                )}
              </button>
            </div>






            {/* error message */}
            {error && (
              <div className={`mt-4 p-3 rounded-md border ${themeClasses.errorBg}`}>
                {error}
              </div>
            )}

            {/* Results */}
            {result && (
              <div className={`mt-6 p-4 border-l-4 rounded-md ${themeClasses.resultBg}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-lg font-semibold ${themeClasses.resultText}`}>
                      <span className="mr-2">{result.emoji}</span>
                      {result.emotion}
                    </p>
                    <p className={`text-sm ${themeClasses.resultSecondary}`}>
                      Confidence: {(result.confidence * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`w-32 rounded-full h-2 ${themeClasses.resultBar}`}>
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${themeClasses.resultBarFill}`}
                        style={{ width: `${result.confidence * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>










          <div className={`text-center mt-8 text-sm ${themeClasses.textSecondary}`}>
            © Vansh's Built 2025
          </div>






        </div>
      </div>
    </div>
  );
};

export default EmotionForm;
