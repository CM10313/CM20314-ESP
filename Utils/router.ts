// router.ts
import { useRouter as useRouterActual } from 'next/router';

export function useRouter() {
  return useRouterActual();
}
