'use client';

export default function Loader() {
  const phrases = ["Loading", "Preparing", "Almost ready", "Just a moment"];
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <div className="relative h-16 w-16 mb-4">
        <div className="absolute inset-0 border-4 border-green-500 rounded-full animate-spin border-t-transparent"></div>
        <div className="absolute inset-2 border-4 border-green-500 rounded-full animate-spin-reverse border-b-transparent"></div>
      </div>
      <div className="h-8 overflow-hidden">
        <div className="animate-morphText text-xl font-bold bg-gradient-to-r from-green-500 to-green-500 bg-clip-text text-transparent">
          {phrases.map((phrase, i) => (
            <div key={i} className="text-center">{phrase}</div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes morphText {
          0%, 20% { transform: translateY(0); }
          25%, 45% { transform: translateY(-25%); }
          50%, 70% { transform: translateY(-50%); }
          75%, 95% { transform: translateY(-75%); }
          100% { transform: translateY(0); }
        }
        .animate-morphText {
          animation: morphText 6s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}