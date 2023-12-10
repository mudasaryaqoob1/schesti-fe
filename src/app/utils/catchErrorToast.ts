import { Toast } from './toast';

export const handleError = () => {
  Toast.fire({
    icon: 'error',
    title: 'Something went wrong!',
  });
};
