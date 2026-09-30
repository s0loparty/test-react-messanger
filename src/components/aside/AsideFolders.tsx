import type { LucideIcon } from '@/shared/types/icons';
import { Link } from '@tanstack/react-router';
import { cn } from 'cn';
import { FolderIcon, MessagesCircleIcon, SettingsIcon } from 'lucide-react';
import type { HTMLAttributes } from 'react';

type NavigationItem = {
  icon: LucideIcon;
  label: string;
  to: string;
  iconClassName?: HTMLAttributes<HTMLLIElement>['className'];
  className?: HTMLAttributes<HTMLLIElement>['className'];
};

const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    icon: MessagesCircleIcon,
    label: 'Все',
    to: '/#asd',
  },
  {
    icon: FolderIcon,
    label: 'Новые',
    to: '/#ads1',
  },
  {
    icon: FolderIcon,
    label: 'Каналы',
    to: '/#asd2',
  },
  {
    icon: SettingsIcon,
    label: 'Настройки',
    to: '/#asd3',
    className: 'mt-auto',
  },
];

export function AsideFolders() {
  return (
    <div className="z-10 h-full w-25">
      <ul className="flex h-full flex-col gap-2 gap-y-2 p-2 text-xs">
        {NAVIGATION_ITEMS.map((item) => (
          <li key={item.to} className={cn('text-gray-800', item.className)}>
            <Link
              to={item.to}
              className="flex flex-col items-center justify-center rounded p-2 transition-colors hover:bg-blue-500/10"
            >
              <item.icon className={cn('size-6', item.iconClassName)} />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
