import { useState } from "react";

function Avatar({ src, alt, name, className = "", size = "size-12" }) {
  const [imageError, setImageError] = useState(false);

  // Generate initials from name
  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  // Generate a color based on name for consistent avatar colors
  const getColorFromName = (name) => {
    if (!name) return "bg-slate-600";
    const colors = [
      "bg-cyan-500",
      "bg-pink-500",
      "bg-purple-500",
      "bg-indigo-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-orange-500",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (imageError || !src) {
    return (
      <div
        className={`${size} ${className} rounded-full ${getColorFromName(name)} flex items-center justify-center text-white font-semibold text-sm`}
        title={alt || name}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || name}
      className={`${size} ${className} rounded-full object-cover`}
      onError={handleImageError}
    />
  );
}

export default Avatar;

