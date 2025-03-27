let _title =document.getElementById('title');
let _price =document.getElementById('price');
let _tax =document.getElementById('tax');
let _adds =document.getElementById('adds');
let _discount =document.getElementById('discount');
let _total =document.getElementById('total');
let _count =document.getElementById('count');
let _category =document.getElementById('category');
let _submit =document.getElementById('submit');
let _deleteAllDiv = document.getElementById('DeleteAllDiv');
let _deleteAllBtn = document.getElementById('DeleteAllBtn');
let _searchInput =document.getElementById('searchInput');

let _dataRow ='' ;

let _mood ='add' ;
let _prodId;
let _searchMood='Title';



// console.log(_title,_price,_tax,_adds,_discount,_total,_count,_category,_submit)


function SetTotal()
{
    // let _priceValue =price.value;
    // let _taxValue =tax.value;
    // let _addsValue =adds.value;
    // let _discountValue =discount.value;

    if(_price.value !='')
    {
        // console.log('Done')

        let result=(+_price.value + +_tax.value + +_adds.value) - +_discount.value;
        // let result=(parseInt(_priceValue)  +parseInt(_taxValue)  +parseInt(_addsValue)) - parseInt(_discountValue);

        console.log(result);
        _total.innerHTML=result;
        _total.value=result;
        console.log(typeof result);

        _total.style.backgroundColor='green'

    }

    else
    {
        _total.innerHTML='';
        _total.style.backgroundColor='red'
    }
}

// creae product
function FillDataFromOrToLocalStorage()
{
    if(localStorage.ProdList != null)
    {
        ProdList =JSON.parse(localStorage.ProdList);
    }
    else
    {
        ProdList = [];
    }
}

FillDataFromOrToLocalStorage();


function CheckDataValidation(title , price , count)
{
    if(title!='' && price!='' && count<101)
    {        
        console.log('true');   
        return true ;
    }
    else 
    {
        console.log('false');    
        return false;

    }

}

submit.onclick=function()
{
    // creating product object
    let newProd = 
    {
        title:_title.value.toLowerCase(),
        price:_price.value,
        tax:_tax.value,
        adds:_adds.value,
        discount:_discount.value,
        total:_total.value,
        count:_count.value,
        category:_category.value.toLowerCase()
    }

    // Adding operation
    if(_mood==='add')
    {
        // Add Multiple products using count 
        if(CheckDataValidation(newProd.title , newProd.price , newProd.count) == true )
        {
            if(newProd.count > 1)
                {
                    for(let i=0; i<newProd.count; i++)
                    {
                        ProdList.push(newProd);
                    }
                }
                // Add 1 product 
                else
                {
                    ProdList.push(newProd);
                }
        }
        else
        alert('Please Enter Data ');

    }

// Update product 
    else
    {
        ProdList[_prodId] = newProd;
        _mood='add';
        _count.style.display='block';
        _submit.innerHTML='Add';
    }

    //save to localstorg
    localStorage.ProdList =JSON.stringify(ProdList);
    console.log(ProdList);
    // Clear Inputs after adding or update
    ClearInputs();
    // To update total rows to ui
    ViewData();
    // To Recolor total
    SetTotal();


}



 
//clear inputs
function ClearInputs()
{
  _title.value  ='';
  _price.value   ='';
  _tax.value   ='';
  _adds.value='';
  _discount.value='';
  _total.innerHTML='';
  _count.value='';
  _category.value='';
  _submit.value  ='';
}

//read
ViewData();

function ViewData()
{
        //  make validation if (ProdList.length!=null) 
        // Loop on list
        GetProductsFromList();
        document.getElementById('tbody').innerHTML=_dataRow;
        DeleteAllDivDisplay();
}


function GetProductsFromList()
{
    _dataRow='';
    for(let i=0; i< ProdList.length ; i++ )
        {
            // console.log(ProdList[i].title);
            _dataRow +=
               `<tr>
                    <td>${[i+1]} </td>
                    <td>${ProdList[i].title}</td>
                    <td>${ProdList[i].price}</td>
                    <td>${ProdList[i].tax}</td>
                    <td>${ProdList[i].adds}</td>
                    <td>${ProdList[i].discount}</td>
                    <td>${ProdList[i].total}</td>
                    <td>${ProdList[i].category}</td>
                    <td> <button id="update" onclick="UpdateProduct(${i})">update</button> </td>
                    <td> <button id="delete" onclick="DeleteProduct(${i})" >delete</button> </td>
                </tr> `;

        }
}

//delete

function DeleteProduct(id)  
{
    console.log(id);
    ProdList.splice(id,1)
    localStorage.ProdList=JSON.stringify(ProdList);
    ViewData();
    DeleteAllDivDisplay();


}

function CheckProdListIfEmpty()
{
    console.log('exist');

    if(ProdList.length<=1)
        return true
    else
        return false;
}

function DeleteAllDivDisplay()
{
    if(CheckProdListIfEmpty()==false)
    {
        _deleteAllDiv.style.display='block';

        _deleteAllBtn.innerHTML=`Delete All (${ProdList.length}) `
    }
    else
    {
        _deleteAllDiv.style.display='none';
    }
}

//Delete All
function DeleteAll()
{
    // let x = window.alert('Are u sure u want to delete all');
    localStorage.clear();
    ProdList.splice(0);
    ViewData();

}

//update
function UpdateProduct(i)
{
    console.log(i);
    
    _prodId=i;
    _mood='update';
    _title.value=ProdList[i].title;
    _price.value=ProdList[i].price;
    _tax.value=ProdList[i].tax;
    _adds.value=ProdList[i].adds;
    _discount.value=ProdList[i].discount;
    _category.value=ProdList[i].category;

    SetTotal();
    
    _count.style.display='none';
    _submit.innerHTML='Update'

    scroll({
        top:0,left:0,behavior:"smooth"
    })
   




    
}

//search

function SearchMood(id)
{   
    if(id=='searchByCategory')
    {
        _searchMood='Category';
    }
    else
    {
        _searchMood='Title';
    }
    _searchInput.placeholder='Search By '+_searchMood;

    _searchInput.focus();
    console.log(_searchMood);

    _searchInput.value='';
    ViewData();
}

function Search(input)
{
    // GetProductsFromList();
    console.log(input);

    if(_searchMood=='Title')
    {
        _dataRow='';
        for(let i=0; i< ProdList.length ; i++ )
            {
               
                if(ProdList[i].title.includes(input.toLowerCase()))
                {
                    // console.log(i)
                    _dataRow +=
                   `<tr>
                        <td>${[i+1]} </td>
                        <td>${ProdList[i].title}</td>
                        <td>${ProdList[i].price}</td>
                        <td>${ProdList[i].tax}</td>
                        <td>${ProdList[i].adds}</td>
                        <td>${ProdList[i].discount}</td>
                        <td>${ProdList[i].total}</td>
                        <td>${ProdList[i].category}</td>
                        <td> <button id="update" onclick="UpdateProduct(${i})">update</button> </td>
                        <td> <button id="delete" onclick="DeleteProduct(${i})" >delete</button> </td>
                    </tr> `;
                }
                
            }

            



    }
    else
    {
        _dataRow='';
        for(let i=0; i< ProdList.length ; i++ )
        {
           if(ProdList[i].category.includes(input.toLowerCase()))
            {
                _dataRow +=
               `<tr>
                    <td>${[i]} </td>
                    <td>${ProdList[i].title}</td>
                    <td>${ProdList[i].price}</td>
                    <td>${ProdList[i].tax}</td>
                    <td>${ProdList[i].adds}</td>
                    <td>${ProdList[i].discount}</td>
                    <td>${ProdList[i].total}</td>
                    <td>${ProdList[i].category}</td>
                    <td> <button id="update" onclick="UpdateProduct(${i})">update</button> </td>
                    <td> <button id="delete" onclick="DeleteProduct(${i})" >delete</button> </td>
                </tr> `;
            }
        }
    }

    document.getElementById('tbody').innerHTML=_dataRow;

}






//validation


// To Do List

// make themes
// change delete button to  red 
// change update button to green 
// shodow for th table 
// make code as senior 
// Apply solid and design patterns
// best alernate for <smal> total 
// show by category 

