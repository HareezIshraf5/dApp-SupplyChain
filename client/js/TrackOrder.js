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

const showTrackingInfo = async (id) => {
    await contract.methods.trackings(id).call({
        from: account
    }, (error,result) => {
        if(error){
            console.error(error)
        }
        if(result){
            console.log("succeed")
            console.log("Product ID: ", result.id)
            console.log("Location of Receiver: ", result.location)
            console.log("Shop Name: ", result.shopName)
            console.log("Name of Buyer: ", result.buyerName)
            console.log("Time Arrived: ", result.timeArrived)

            // Display the Product created information in the div element
            const id = document.getElementById("statusid");
            id.innerHTML = "Product ID: " + result.id;

            const location = document.getElementById("statuslocation");
            location.innerHTML = "Location: " + result.location;
            
            const shopname = document.getElementById("statusshopname");
            shopname.innerHTML = "Shop Name: " + result.shopName;

            const buyername = document.getElementById("statusbuyername");
            buyername.innerHTML = "Buyer Name: " + result.buyerName;

            const timearrived = document.getElementById("statustimearrived");
            timearrived.innerHTML = "Time Arrived: " + result.timeArrived;

            id.className = "status white-text";
            location.className = "status white-text";
            shopname.className = "status white-text";
            buyername.className = "status white-text";
            timearrived.className = "status white-text";
          

        }else{
            console.log("failed")
        }
    });
}


const printValues = (e) => {
    e.preventDefault();
    const product_id = document.getElementById("Product_ID").value;

    console.log("Product ID: ", product_id);
 
   showTrackingInfo(product_id)
  }
    document.getElementById("form6").addEventListener("submit", showTrackingInfo);
    document.getElementById("form6").addEventListener("submit", printValues);