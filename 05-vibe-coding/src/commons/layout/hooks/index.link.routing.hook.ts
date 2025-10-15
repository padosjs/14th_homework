import { useRouter, usePathname } from 'next/navigation';
import { URL_PATHS } from '@/commons/constants/url';

export const useLinkRouting = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogoClick = () => {
    router.push(URL_PATHS.diaries.list);
  };

  const handleDiariesClick = () => {
    router.push(URL_PATHS.diaries.list);
  };

  const handlePicturesClick = () => {
    router.push(URL_PATHS.pictures.list);
  };

  const isActiveDiaries = pathname === URL_PATHS.diaries.list || pathname?.startsWith('/diaries/');
  const isActivePictures = pathname === URL_PATHS.pictures.list;

  return {
    handleLogoClick,
    handleDiariesClick,
    handlePicturesClick,
    isActiveDiaries,
    isActivePictures,
  };
};

