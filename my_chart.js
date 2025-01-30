
const ctx = document.getElementById('barChart');
const pieChart = document.getElementById('pieChart');
const lineChart = document.getElementById('lineChart');
const radarChart=document.getElementById('radarChart');

fetch('mockData.json') // Update the path to your JSON file
      .then(function(response) {
        if (response.ok) {
          return response.json(); // Parse JSON data
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .then(function(data) {
        const bestseller = data.flatMap((pro)=>pro.products.map(product => ({name:product.name,count:product.salesData.reduce((a, b) => a + b, 0)})));
        const bestsellerSorted = bestseller.sort((a, b) => b.count - a.count);

        const bestsellerCat = data.flatMap((pro)=>({cat:pro.category,count:pro.products.map(product => product.salesData.reduce((a, b) => a + b, 0))}));
        const bestsellerCatSorted = bestsellerCat.sort((a, b) => b.count - a.count);


        console.log(bestsellerSorted[0].name);
        const totalsales = data.reduce((acc, pro) => acc + pro.products.reduce((acc, product) => acc + product.salesData.reduce((a, b) => a + b, 0), 0), 0);

        const products = data.flatMap((pro)=>pro.products.map(product => product.name));
        const productDistribution = data.flatMap((pro)=>pro.products.map(product => product.salesData.reduce((a, b) => a + b, 0)));
        const productNames = data.map((pro)=>pro.category);
        const productSales = data.flatMap((pro)=>pro.products.map(product => 
          product.salesData.reduce((a, b) => a + b, 0) 
        ));

        // Render the chart
        const ctx = document.getElementById('barChart').getContext('2d');
         new Chart(ctx, {
          type: 'bar',
          data: {
            labels: productNames, // Product names as labels
            datasets: [{
              label: 'Total Sales',
              data: productSales, // Total sales data
              backgroundColor: [
                'rgba(75, 192, 192, 0.2)', 
                'rgba(255, 99, 132, 0.2)', 
                'rgba(153, 102, 255, 0.2)'
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)', 
                'rgba(255, 99, 132, 1)', 
                'rgba(153, 102, 255, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });


        new Chart(pieChart, {
          type: 'doughnut',
          data: {
            labels: products,
            datasets: [{
              label: 'product sales distribution 9',
              data: productDistribution,
              borderWidth: 1
            }]
          },
          options: {
            responsive:true,
          }
        });


// -------------data cards----------------

const datalist = document.getElementById('cardBox');
const dataItem = document.createElement('div');
dataItem.classList.add('cardBox');
dataItem.innerHTML = `
 <div class="card">
            <div>
              <div class="numbers">${bestsellerSorted[0].name}</div>
              <div class="cardname">BestSeller-Product</div>
            </div>
          <div class="iconbox">
<ion-icon name="disc-outline"></ion-icon>          </div>
          </div>
        
                  <div class="card">
                    <div>
                      <div class="numbers">${totalsales}</div>
                      <div class="cardname">Total Sales</div>
                    </div>
                    <div class="iconbox">
                      <ion-icon name="cart-outline"></ion-icon>
                    </div>
                  </div>
        
                  <div class="card">
                    <div>
                      <div class="numbers">${bestsellerCatSorted[0].cat}</div>
                      <div class="cardname">BestSeller-Category</div>
                    </div>
                    <div class="iconbox">
<ion-icon name="git-compare-outline"></ion-icon>                    </div>
                  </div>
        
                  <div class="card">
                    <div>
                      <div class="numbers">₹3,000</div>
                      <div class="cardname">Earning</div>
                    </div>
                    <div class="iconbox">
                      <ion-icon name="cash-outline"></ion-icon>
                    </div>
                  </div>
`;

datalist.appendChild(dataItem);




      })
      .catch(function(error) {
        console.error('Error fetching data:', error);
      });


// fetch('mockData.json')  

//   .then(function(response){
//     if(response.ok ==true){
//       console.log(response.json());
//       return response.json()
//     }
//   })
//   .then(function(data){


//   })
//   new Chart(ctx, {
//     type: 'bar',
//     data: {
//       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//       datasets: [{
//         label: '# of Votes',
//         data: [12, 19, 3, 5, 2, 3],
//         borderWidth: 1
//       }]
//     },
//     options: {
//       responsive:true,
//     }
//   });

  
  


  new Chart(lineChart, {
    type: 'line',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      responsive:true,
    }
  });

  new Chart(radarChart, {
    type: 'radar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      responsive:true,
    }
  });


  