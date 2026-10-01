import type { LucideIcon } from '@/shared/types/icons';
import { Link } from '@tanstack/react-router';
import { cn } from 'cn';
import {
  FolderIcon,
  MessagesCircleIcon,
  SettingsIcon,
  UserRoundSearchIcon,
} from 'lucide-react';
import { useState, type HTMLAttributes } from 'react';
import { ContactSearchDialog } from './ContactSearchDialog';

type NavigationItem = {
  icon: LucideIcon;
  label: string;
  to: string;
  action?: () => void;
  iconClassName?: HTMLAttributes<HTMLLIElement>['className'];
  className?: HTMLAttributes<HTMLLIElement>['className'];
};

export function AsideFolders() {
  const [isShowDialog, setIsShowDialog] = useState(false);

  const NAVIGATION_ITEMS: NavigationItem[] = [
    {
      icon: MessagesCircleIcon,
      label: 'Все',
      to: '/#all',
    },
    {
      icon: FolderIcon,
      label: 'Новые',
      to: '/#news',
    },
    {
      icon: FolderIcon,
      label: 'Каналы',
      to: '/#channels',
    },
    {
      icon: UserRoundSearchIcon,
      label: 'Найти',
      to: '/#search',
      action: () => {
        setIsShowDialog(true);
      },
    },
    {
      icon: SettingsIcon,
      label: 'Настройки',
      to: '/#asd3',
      className: 'mt-auto',
    },
  ];

  return (
    <>
      <div className="z-10 h-full w-25">
        <ul className="flex h-full flex-col gap-2 gap-y-2 p-2 text-xs">
          {NAVIGATION_ITEMS.map((item) => (
            <li key={item.to} className={cn('text-gray-800', item.className)}>
              <Link
                to={item.to}
                className="flex flex-col items-center justify-center rounded p-2 transition-colors hover:bg-blue-500/10"
                onClick={(e) =>
                  item.action ? (e.preventDefault(), item.action()) : null
                }
              >
                <item.icon className={cn('size-6', item.iconClassName)} />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <ContactSearchDialog open={isShowDialog} onOpenChange={setIsShowDialog} />
    </>
  );
}
