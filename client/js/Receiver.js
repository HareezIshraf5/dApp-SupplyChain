import Web3 from 'web3';
import configuration from '../../build/contracts/SupplyChain.json';
import 'bootstrap/dist/css/bootstrap.css';

const createElementFromString = (string) => {
  const el = document.createElement('div');
  el.innerHTML = string;
  return el.firstChild;
};

const CONTRACT_ADDRESS =
  configuration.networks['5777'].address;
const CONTRACT_ABI = configuration.abi;

const web3 = new Web3(
  Web3.givenProvider || 'http://127.0.0.1:7545'
);
const contract = new web3.eth.Contract(
  CONTRACT_ABI,
  CONTRACT_ADDRESS
);

let account = '0x9Df7BfF96E3f4B2E00a502462860f8AfB20b7F7c';

const receiver = async (productId, location, recipientName, timeArrived) => {
    await contract.methods.receiver(productId, location, recipientName, timeArrived).send({
        from: account
    }, (error,result) => {
        if(error){
            console.error(error)
        }
        if(result){
            console.log("succeed")
        }else{
            console.log("failed")
        }
    });
}

const printValues = (e) => {
    e.preventDefault();
    const product_id = document.getElementById("Product_ID").value;
    const location = document.getElementById("Location").value;
    const recipient_name = document.getElementById("Recipient_Name").value;
    const time_arrived = document.getElementById("Time_Arrived").value;


    console.log("Product ID: ", product_id);
    console.log("Location: ", location);
    console.log("Name of Receiver: ", recipient_name);
    console.log("Time Arrived: ", time_arrived);
 
    receiver(product_id, location, recipient_name, time_arrived)
  }
  
  document.getElementById("form5").addEventListener("submit", printValues);