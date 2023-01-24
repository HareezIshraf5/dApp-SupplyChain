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

const seller = async (productID, location, shopName,  buyerName) => {
    await contract.methods.seller(productID, location, shopName,  buyerName).send({
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
    const shopname = document.getElementById("Shop_Name").value;
    const buyername = document.getElementById("Buyer_Name").value;

    console.log("Product ID: ", product_id);
    console.log("Location: ", location);
    console.log("Shop Name: ", shopname);
    console.log("Buyer Name: ", buyername);
 
    seller(product_id, location, shopname, buyername)
  }
  
  document.getElementById("form3").addEventListener("submit", printValues);