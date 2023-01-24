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

const orderProduct = async (Name, Capacity, Color,  Quantity,  PriceOfProduct) => {
    await contract.methods.orderProduct(Name, Capacity, Color,  Quantity,  PriceOfProduct).send({
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
    const product_name = document.getElementById("product_name").value;
    const product_capacity = document.getElementById("product_capacity").value;
    const product_color = document.getElementById("product_color").value;
    const product_quantity = document.getElementById("product_quantity").value;
    const product_price = document.getElementById("product_price").value;
  
    console.log("Name of Product: ", product_name);
    console.log("Capacity: ", product_capacity);
    console.log("Colour of Product: ", product_color);
    console.log("Quantity of Product: ", product_quantity);
    console.log("Price of Product: ", product_price);
  
    orderProduct(product_name, product_capacity, product_color, product_quantity, product_price)
  }
  
  document.getElementById("form1").addEventListener("submit", printValues);

  
// const main = async () => {
//   const accounts = await web3.eth.requestAccounts();
//   account = accounts[0];
//   await refr17eshTickets();
// };

// main();