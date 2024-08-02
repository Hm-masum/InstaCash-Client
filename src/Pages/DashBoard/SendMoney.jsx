import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";

const SendMoney = () => {
    const {user}=useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const donar = form.donar.value;
        const recipient = form.recipient.value;
        const amount = form.amount.value;
        const pin = form.pin.value;
    
        const transactionData = {
          donar,recipient,amount,pin
        };

        if(pin.length !== 5) return toast.error("Incorrect pin")
        if(amount > user.balance || user.balance < 50){
            return toast.error("Insufficient Balance")
        }
        console.log(transactionData,user.balance);
    }

  return (
    <div className="rounded-lg md:p-14">
      <div className="px-2 md:px-24 space-y-4">
        <h2 className="text-4xl font-semibold text-center">Send Money</h2>
         
         <h2 className="py-5 text-xl font-semibold">Your Current Balance : {user.balance} Taka</h2>
         
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div className="flex flex-col md:flex-row gap-5">
              <div className="form-control md:w-1/2">
                <label className="block text-sm">Your Number</label>
                <div className="mt-2 relative">
                  <input
                    type="number"
                    name="donar"
                    required
                    placeholder="Enter Your Number"
                    className="w-full p-3 border rounded-md border-gray-400 text-gray-900"
                  />
                </div>
              </div>

              <div className="form-control md:w-1/2">
                <label className="block text-sm">Recipient Number</label>
                <div className="mt-2 relative">
                  <input
                    type="number"
                    name="recipient"
                    required
                    placeholder="Enter Recipient Number"
                    className="w-full p-3 border rounded-md border-gray-400 text-gray-900"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5">
              <div className="form-control md:w-1/2">
                <label className="block text-sm">Amount</label>
                <div className="mt-2 relative">
                  <input
                    type="number"
                    name="amount"
                    required
                    placeholder="Enter Amount"
                    className="w-full p-3 border rounded-md border-gray-400 text-gray-900"
                  />
                </div>
              </div>

              <div className="form-control md:w-1/2">
                <label className="block text-sm">PIN Number</label>
                <div className="mt-2 relative">
                  <input
                    type="number"
                    name="pin"
                    required
                    placeholder="Enter Pin Number"
                    className="w-full p-3 border rounded-md border-gray-400 text-gray-900"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="bg-purple-700 font-semibold w-full rounded-md text-center py-3 text-white"
              >
                Send Money
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendMoney;
