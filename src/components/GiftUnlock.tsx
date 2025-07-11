import React from 'react';

const GiftUnlock: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center p-6">
      <h1 className="text-4xl font-bold mb-4 text-blue-800">🎁 Gift Unlocked!</h1>
      <p className="text-lg text-gray-700 mb-6">This is your secret gift page unlocked via Telegram 🩵</p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
      >
        Go Home
      </a>
    </div>
  );
};

export default GiftUnlock;
