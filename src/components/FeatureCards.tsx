
export const FeatureCards = () => {
  const features = [
    {
      icon: "♾️",
      title: "Free Forever",
      description: "We keep our service free for everyone with ads"
    },
    {
      icon: "💾",
      title: "Save Generated Accounts",
      description: "We automatically save your generated accounts as cookies for later use"
    },
    {
      icon: "🚫",
      title: "No Tracking",
      description: "We don't track you or your data, we respect your privacy"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center hover:bg-gray-750 transition-colors duration-200"
        >
          <div className="text-3xl mb-3">{feature.icon}</div>
          <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-400 text-sm">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};
