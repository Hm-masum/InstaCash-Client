import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useBalance from "../../Hooks/useBalance";
import { Helmet } from "react-helmet-async";
import { Typewriter } from "react-simple-typewriter";

const SendMoney = () => {
    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();
    const [balance,refetch] =useBalance()

    const handleSubmit = async (e) => {
      e.preventDefault();
      const form = e.target;
      const donar = form.donar.value;
      const recipient = form.recipient.value;
      let amount = form.amount.value;
      amount=parseFloat(amount)
      const pin = form.pin.value;
      const date = new Date().toLocaleDateString();
      const process= 'Send Money'
    
      const transactionData = {
        donar,recipient,amount,pin,date,process
      };

      if(user.status==='pending') return toast.error("please wait. admin will be activate your account soon!");
      if(user.status==='block') return toast.error("Sorry!.Your account is block!");
      if(pin.length !== 5) return toast.error("Your pin is not correct");
      if(user.mobile !== donar) return toast.error("Incorrect your number.");
      if( donar === recipient  ) return toast.error("Incorrect recipient number.");
      if(amount > user.balance || user.balance < 50){
          return toast.error("Insufficient Balance.")
      }
      if(amount >= 100){
        if((amount+5) > user.balance) return toast.error("Insufficient Balance.");
      }

      try{
        const result =await axiosSecure.post(`/send-money`,transactionData)
        refetch()
        if (result.data.insertedId !== null) {
            Swal.fire({
              title: "Congratulations!",
              text: "Your send money is Successful",
              icon: "success",
              timer: 1500,
            })
        }
        else{
          toast.error(result.data.message)
        }
      }
      catch(err){
        toast.error(err.message)
      }
    }

  return (
    <div className="rounded-lg border-2 p-3 md:p-14 lg:h-[93vh]">
      <Helmet>
          <title>InstaCash | Send Money</title>
      </Helmet>

      <div className="px-2 md:px-24 pt-4 space-y-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-center">
          <Typewriter
            words={['Send Money']}
            loop={20}
            cursor
            cursorStyle=' '
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h2>

        <h2 className="py-3 md:py-5 md:text-xl font-semibold">Your Current Balance : {balance} Taka</h2>
         
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
                    defaultValue={user?.mobile}
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
            <p className="text-purple-700">For every transaction over 100 taka, You have to pay a fee of <span className="text-red-500 font-semibold">5</span> Taka .</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendMoney;
