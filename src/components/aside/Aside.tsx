import { AsideChats } from './AsideChats';
import { AsideFolders } from './AsideFolders';

export function Aside() {
  return (
    <aside className="flex min-h-0 bg-white">
      <AsideFolders />
      <AsideChats />
    </aside>
  );
}
