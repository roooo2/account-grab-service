
export const FeatureCards = () => {
  const features = [
    {
      icon: "♾️",
      title: "Free Forever",
      description: "We keep our service free for everyone with ads",
      glow: "shadow-blue-500/20"
    },
    {
      icon: "💎",
      title: "Want Premium Gen?",
      description: "Buy premium accounts in our Discord server - Join now for exclusive deals!",
      glow: "shadow-purple-500/20",
      isSpecial: true
    },
    {
      icon: "🚫",
      title: "No Tracking",
      description: "We don't track you or your data, we respect your privacy",
      glow: "shadow-green-500/20"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
      {features.map((feature, index) => (
        <div
          key={index}
          className={`bg-gray-800 rounded-xl p-6 border border-gray-700 text-center hover:bg-gray-750 transition-all duration-300 hover:scale-105 shadow-2xl ${feature.glow} ${feature.isSpecial ? 'ring-2 ring-purple-500/30 shadow-purple-500/40' : ''}`}
        >
          <div className="text-3xl mb-3">{feature.icon}</div>
          <h3 className={`text-lg font-semibold mb-2 ${feature.isSpecial ? 'text-purple-400' : ''}`}>
            {feature.title}
          </h3>
          <p className="text-gray-400 text-sm">{feature.description}</p>
          {feature.isSpecial && (
            <button 
              onClick={() => window.open('https://discord.gg/DZSkGvmebJ', '_blank')}
              className="mt-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 shadow-lg shadow-purple-500/25"
            >
              Join Discord Now
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
