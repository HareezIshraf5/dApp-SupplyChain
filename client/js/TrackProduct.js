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

const showProductInfo = async (id) => {
    await contract.methods.products(id).call({
        from: account
    }, (error,result) => {
        if(error){
            console.error(error)
        }
        if(result){
            console.log("succeed")
            console.log("Product ID:", result.id)
            console.log("Product Name:", result.name)
            console.log("Product Capacity:", result.capacity)
            console.log("Product Color:", result.color)
            console.log("Product Quantity:", result.quantity)
            console.log("Product Price:", result.price)

            // Display the Product created information in the div element
            const id = document.getElementById("statusid");
            id.innerHTML = "Product ID: " + result.id;

            const name = document.getElementById("statusname");
            name.innerHTML = "Product Name: " + result.name;

            const capacity = document.getElementById("statuscapacity");
            capacity.innerHTML = "Product Capacity: " + result.capacity;

            const color = document.getElementById("statuscolor");
            color.innerHTML = "Product Color: " + result.color;

            const quantity = document.getElementById("statusquantity");
            quantity.innerHTML = "Product Quantity: " + result.quantity;

            const price = document.getElementById("statusprice");
            price.innerHTML = "Product Price:" + result.price;
            
            id.className = "status white-text";
            name.className = "status white-text";
            capacity.className = "status white-text";
            color.className = "status white-text";
            quantity.className = "status white-text";
            price.className = "status white-text";

        

        }else{
            console.log("failed")
        }
    });
}

// function showTrackingInfo(id) {
//     contract.methods.trackings(id).call().then(function(result) {
//         // Display the tracking information in the div element
//         document.getElementById("tracking-info").innerHTML = 
//         `
//         ID: ${result.id}
//         Location: ${result.location}
//         Shop Name: ${result.shopName}
//         Buyer Name: ${result.buyerName}
//         Time Arrived: ${result.timeArrived}
//         State: ${result.state}
//         `;
//     });
// }


const printValues = (e) => {
    e.preventDefault();
    const product_id = document.getElementById("Product_ID").value;
    // const location = document.getElementById("Location").value;
    // const recipient_name = document.getElementById("Recipient_Name").value;
    // const time_arrived = document.getElementById("Time_Arrived").value;


    console.log("Product ID: ", product_id);
    // console.log("Location: ", location);
    // console.log("Name of Receiver: ", recipient_name);
    // console.log("Time Arrived: ", time_arrived);
 
   showProductInfo(product_id)
  }
    document.getElementById("form7").addEventListener("submit", showProductInfo);
    document.getElementById("form7").addEventListener("submit", printValues);

    