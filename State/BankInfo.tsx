import { useState } from 'react';

export interface BankInfoState {
    BankDetails: {
      Provider:string;
      SortCode:number;
      AccountNumber:number;
      AccountName:string;
    };
  }

  export const useBankInfoState = (): [BankInfoState, React.Dispatch<React.SetStateAction<BankInfoState>>] => {
    const [bankInfoObj, setBankInfoObj] = useState<BankInfoState>({
      BankDetails: {
        Provider:'Not specified',
        SortCode:-1,
        AccountNumber:-1,
        AccountName:'Not specified',
      },
    });
  
    return [bankInfoObj, setBankInfoObj];
  };