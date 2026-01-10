import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAccessToken, saveAccessToken } from '@/lib/auth';
import { envs } from '@/lib/constants';

/**
 * @hook useAuth
 * @description Hook para proteger rutas según el estado de autenticación del usuario.
 *
 * @param {string|null} [redirectIfAuthenticated=null] - Ruta a la que redirigir si el usuario ya está autenticado.
 * @param {string} [redirectIfNotAuthenticated='/login'] - Ruta a la que redirigir si el usuario no está autenticado o el token no es válido.
 */
const useAuth = (redirectIfAuthenticated = null, redirectIfNotAuthenticated = '/login') => {
  const router = useRouter();

  useEffect(() => {
    const verifyAuth = async () => {
      const token = getAccessToken();

      if (!token) {
        if (redirectIfNotAuthenticated) {
          router.push(redirectIfNotAuthenticated);
        }
        return;
      }

      try {
        const res = await fetch(`${envs.DOMAIN_URL}/users/me/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (res.status === 401 || res.status === 403) {
          saveAccessToken('');
          if (redirectIfNotAuthenticated) {
            router.push(redirectIfNotAuthenticated);
          }
        } else if (redirectIfAuthenticated) {
          router.push(redirectIfAuthenticated);
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        if (redirectIfNotAuthenticated) {
          router.push(redirectIfNotAuthenticated);
        }
      }
    };

    verifyAuth();
  }, [redirectIfAuthenticated, redirectIfNotAuthenticated, router]);
};

export default useAuth;