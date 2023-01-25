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

const paymentByBuyer = async (productID, priceToPay) => {
    await contract.methods.paymentByBuyer(productID, priceToPay).send({
        from: account
    }, (error,result) => {
        if(error){
            console.error(error)
        }
        if(result){
          console.log("succeed")
          //alert("Transaction Successful")
          const status = document.getElementById("status");
          status.innerHTML = "Transaction Successful";
      }else{
          console.log("failed")
          //alert("Transaction Failed")
          const status = document.getElementById("status");
          status.innerHTML = "Transaction Failed";
        }
    });
}



const printValues = (e) => {
    e.preventDefault();
    const product_id = document.getElementById("Product_ID").value;
    const product_price = document.getElementById("Price_Pay").value;
  
    console.log("Product ID: ", product_id);
    console.log("Product Price: ", product_price);
 
    paymentByBuyer(product_id, product_price)
  }
  
  document.getElementById("form2").addEventListener("submit", printValues);