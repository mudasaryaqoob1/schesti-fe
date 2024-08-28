import { CurrencyFormat } from '../utils/format';
import { useUser } from './useUser';

export function useCurrencyFormatter() {
  const authUser = useUser();
  return {
    format: (amount: number) => {
      return CurrencyFormat(
        amount,
        authUser?.currency.locale,
        authUser?.currency.code
      );
    },
  };
}
