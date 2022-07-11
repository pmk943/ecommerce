import toast from 'react-hot-toast';
import decodeMessage from './decodeMessage';

const transitionMessageAlert = (
  zilPay,
  transactionId,
  transitionName
) => {
  const transition = new Promise((success, error) => {
    console.log("transsuc&er", success, error)
    const subscription = zilPay.wallet
      .observableTransaction(transactionId)
      .subscribe(async (hash) => {
        subscription.unsubscribe();
        try {
        console.log("transHash", hash)
          const Tx = await zilPay.blockchain.getTransaction(hash);
          console.log("transTx", Tx)
          const code = Tx.receipt.success
        //   const message = decodeMessage(code);
          console.log("transMessage")
          if (code) success("success");
          error("failed");
        } catch (err) {
            console.log("transerr", err)
          error('Transaction error');
        }
      });
  });
  toast.promise(transition, {
    loading: `${transitionName}`,
    success: (message) => message,
    error: (message) => message,
  });
};

export default transitionMessageAlert;