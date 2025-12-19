import React from 'react';
import { User } from 'lucide-react';

// Personalized Profile Placeholder Component (like Facebook's default avatar)
export const ProfilePlaceholder = ({ name, position, size = 'large' }) => {
  // Extract initials from name
  const getInitials = (name) => {
    if (!name) return '?';
    
    // Handle both string and object (EN/JP) names
    const displayName = typeof name === 'string' ? name : (name.EN || name.JP || '');
    
    const parts = displayName.split(' ');
    if (parts.length >= 2) {
      // First name + Last name initials
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    } else if (parts.length === 1 && parts[0].length > 0) {
      // Single name - take first character
      return parts[0][0].toUpperCase();
    }
    return '?';
  };

  // Generate a consistent color based on name
  const getColorFromName = (name) => {
    if (!name) return 'from-orange-500 to-orange-600';
    
    const displayName = typeof name === 'string' ? name : (name.EN || name.JP || '');
    const colors = [
      'from-orange-500 to-orange-600',
      'from-orange-400 to-orange-500',
      'from-orange-600 to-orange-700',
      'from-slate-600 to-slate-700',
      'from-slate-500 to-slate-600',
      'from-gray-600 to-gray-700',
    ];
    
    // Simple hash function to consistently pick a color
    let hash = 0;
    for (let i = 0; i < displayName.length; i++) {
      hash = displayName.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const initials = getInitials(name);
  const gradientColor = getColorFromName(name);

  const sizeClasses = {
    small: 'w-16 h-16 text-xl',
    medium: 'w-32 h-32 text-4xl',
    large: 'w-full h-80 text-8xl'
  };

  return (
    <div className={`relative ${sizeClasses[size]} bg-gradient-to-br ${gradientColor} flex items-center justify-center overflow-hidden`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Initials or Icon */}
      <div className="relative z-10 flex flex-col items-center justify-center text-white font-bold">
        {initials !== '?' ? (
          <span className="drop-shadow-lg">{initials}</span>
        ) : (
          <User size={size === 'large' ? 120 : size === 'medium' ? 60 : 30} className="opacity-90" />
        )}
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
    </div>
  );
};
