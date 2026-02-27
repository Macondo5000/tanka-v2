import type { User } from '@/types/common';

interface AvatarStackProps {
  users: User[];
  max?: number;
  size?: 'sm' | 'md';
}

export function AvatarStack({ users, max = 4, size = 'sm' }: AvatarStackProps) {
  const shown = users.slice(0, max);
  const overflow = users.length - max;
  const px = size === 'sm' ? 'w-6 h-6' : 'w-8 h-8';

  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {shown.map((user, i) => (
          <img
            key={user.id}
            src={user.avatar}
            alt={user.name}
            title={user.name}
            className={`${px} rounded-full border-2 border-white object-cover`}
            style={{ zIndex: shown.length - i }}
          />
        ))}
      </div>
      {overflow > 0 && (
        <span className="text-[11px] font-medium text-gray-400 ml-1.5">+{overflow}</span>
      )}
    </div>
  );
}
