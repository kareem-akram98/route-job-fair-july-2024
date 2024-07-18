
let customers = []
let transactions =[]
let transactionsList =[]
let finalData =[]

fetch( 'db.json').then((data)=>{
    return data.json()
}
).then((data)=>{
    customers= data.customers
    transactions= data.transactions
    // console.table(customers)
    // console.table(transactions)

    let cartona =''
    let maxValue =-Infinity
    let minValue =+Infinity
    for (let i = 0; i < transactions.length; i++) {
        let customer = customers.find((customer)=>{
            return customer.id===transactions[i].customer_id
        })
        let customerName = customer.name 
        // console.log(customerName)

        cartona+=`
        
             <tr class='py-3 my-2'>
                <td class="py-3 my3">${transactions[i].id}</td>
                <td class="py-3 my3">${customerName}</td>
                <td class="py-3 my3">${transactions[i].date}</td>
                <td class="py-3 my3">${transactions[i].amount}</td>
            </tr>
        `
        finalData.push({
            transactionId : transactions[i].id,
            customerId : customer.id,
            customerName : customer.name,
            transactionDate : transactions[i].date,
            transactionAmount : transactions[i].amount,
        })


        maxValue=Math.max(maxValue,transactions[i].amount)
        minValue=Math.min(minValue,transactions[i].amount)


    }
    // console.table(finalData)
    $('tbody').html(cartona)


    $('#min').val(minValue)
    $('#max').val(maxValue)
    
    


    filterByName()
    filterByMin()
    filterByMax()

    let    customersCartona=``
    for (let i = 0; i < customers.length; i++) {
        customersCartona+=`
        
          <option value='${customers[i].name}'> ${customers[i].name}</option>
        
        `
        

    }

$('#selectedUser').html($('#selectedUser').html()+customersCartona)
$('#selectedUser').on('input',function () {
    let customerName = $(this).val()
    let chartResult = finalData.filter((t)=>{
        return t.customerName===customerName
      })

      let chartDate=[]
      let chartAmount=[]
for (let i = 0; i < chartResult.length; i++) {

    chartDate.push(chartResult[i].transactionDate)
    chartAmount.push(chartResult[i].transactionAmount)

}

addChart(chartDate,chartAmount)


})

}).catch((error)=>{
    console.error(error);
}
)


function filterByName(){

$('#searchName').on('input', function(){
    let filterName =$(this).val()
    // console.log(filterName)
    let nameResult = finalData.filter((t)=>{
        return t.customerName.toLowerCase().includes(filterName.toLowerCase())
    })
    // console.table(nameResult)
    displayData(nameResult)
})
}





function displayData (list){
    // console.log(list)
    // console.table(list)
let cartona =``
for (let i = 0; i < list.length; i++) {
    cartona+=`
    <tr class='py-3 my-2'>
                <td class="py-3 my3">${list[i].transactionId}</td>
                <td class="py-3 my3">${list[i].customerName}</td>
                <td class="py-3 my3">${list[i].transactionDate}</td>
                <td class="py-3 my3">${list[i].transactionAmount}</td>
                
            </tr>
    
    
    `
}
// console.log(cartona)
$('tbody').html(cartona)
}


function filterByMin(){
 
    $('#min').on("input", function(){
    let filterMin=$(this).val()
    filterMin= parseFloat(filterMin)
let     filterMax= parseFloat($("#max").val())
    let minResult = finalData.filter((t)=>{
        return t.transactionAmount>= filterMin && t.transactionAmount<=filterMax
      })
    displayData(minResult)
    } )
}




function filterByMax(){
    $('#max').on("input", function(){
        let filterMax=$(this).val()
        filterMax= parseFloat(filterMax)
        let filterMin= parseFloat($('#min').val())
        let maxResult = finalData.filter((t)=>{
            return t.transactionAmount<= filterMax && t.transactionAmount>=filterMin
          })
        displayData(maxResult)
        } )
}





let instance
function addChart(label,data){

    const ctx = document.getElementById('myChart');
if (instance) {
    instance.destroy()
}
    instance= new Chart(ctx, {
      type: 'bar',
      data: {
        labels: label,
        datasets: [{
          label: '',
          data: data,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });



}


addChart(["jun","Jul","aug"])