import { useEffect } from 'react';
import { toast } from "react-toastify";
import { parseCookies, destroyCookie } from 'nookies';

export function useToastFromCookie(ctx: any, cookieName: string) {
  useEffect(() => {
    const cookies = parseCookies(ctx);
    const cookieValue = cookies[cookieName];
    if (cookieValue) {
      toast.warning(cookieValue);
      destroyCookie(ctx, cookieName);
    }
  }, [ctx, cookieName]);
}
