import toast from 'react-hot-toast';

const transitionMessageAlert = (
  zilPay,
  transactionId,
  transitionName
) => {
  const transition = new Promise((success, error) => {
    const subscription = zilPay.wallet
      .observableTransaction(transactionId)
      .subscribe(async (hash) => {
        subscription.unsubscribe();
        try {
          const Tx = await zilPay.blockchain.getTransaction(hash)
          const code = Tx.receipt.success
        //   const message = decodeMessage(code);
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