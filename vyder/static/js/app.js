class UI {
  constructor() {
    this.incomeFeedback = document.querySelector(".income-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.incomeForm = document.getElementById("income-form");
    this.incomeInput = document.getElementById("income-input");
    this.incomeAmount = document.getElementById("income-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }
	submitIncomeForm(){
	  const value = this.incomeInput.value;
	  if(value==='' || value < 0) {
		  this.incomeFeedback.classList.add('showItem');
		  this.incomeFeedback.innerHTML = '<p>value cannot be empty or negative</p>';
		  const self = this;
		  setTimeout(function(){
		  self.incomeFeedback.classList.remove('showItem');		  },4000);
  }
   else{
	this.incomeAmount.textContent = value;
	this.incomeInput.value = '';
	this.showBalance();
  }
 }
  showBalance(){
	const expense = this.totalExpense();
	const total = parseInt(this.incomeAmount.textContent) - expense;
	this.balanceAmount.textContent = total;
	if (total <0) {
		this.balance.classList.remove("showGreen", "showBlack");
		this.balance.classlist.add("showRed");
   }
	else if (total <0) {
                this.balance.classList.remove("showRed", "showBlack");
                this.balance.classlist.add("showGreen");
   }
	else if (total === 0) {
                this.balance.classList.remove("showRed", "showGreen");
                this.balance.classlist.add("showBlack");
   }
  }

submitExpenseForm(){
const expenseValue = this.expenseInput.value;
const amountValue = this.amountInput.value;

	if(expenseValue === '' || amountValue === ''|| amountValue <0){

	this.expenseFeedback.classList.add('showItem');
	this.expenseFeedback.innerHTML = '<p>values cannot be empty or negative</p>';
	const self = this;
	setTimeout(function(){
	self.expenseFeedback.classList.remove("showItem");
	},4000);
  }
	else {
	let amount = parseInt(amountValue);
	this.expenseInput.value = "";
	this.amountInput.value = "";
	
	let expense = {
	 id:this.itemID,
	 title:expenseValue,
	 amount:amount
  };
	this.itemID++;
	this.itemList.push(expense);
	this.addExpense(expense);
	this.showBalance();
 }
}

  addExpense(expense) {
    const div = document.createElement('div');
    div.classList.add('expense');
    div.innerHTML = `

    <div class="expense-item d-flex justify-content-between align-items-baseline">
         <h6 class="expense-title mb-0 text-uppercase list-item">- ${expense.title}</h6>
         <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>
         <div class="expense-icons list-item">
          <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
           <i class="fas fa-edit"></i>
          </a>
          <a href="#" class="delete-icon" data-id="${expense.id}">
           <i class="fas fa-trash"></i>
          </a>
         </div>
        </div>
	`;
	 this.expenseList.appendChild(div); 
  }
	
  totalExpense(){
	let total = 0;

	if(this.itemList.length>0) {
	total = this.itemList.reduce(function(acc,curr){
	
	acc += curr.amount;
	return acc;
	},0);
      }
	this.expenseAmount.textContent = total;
	return total; 
  }
	editExpense(element) {
let id = parseInt(element.dataset.id);
let parent = element.parentElement.parentElement.parentElement;

this.expenseList.removeChild(parent);

let expense = this.itemList.filter(function(item){
	return item.id === id;		
 });
	this.expenseInput.value = expense[0].title;
	this.amountInput.value = expense[0].amount;
	
	let tempList = this.itemList.filter(function(item){
		return item.id !== id;
 });
	this.itemList = tempList;
	this.showBalance();
 }
	deleteExpense(element){
	let id = parseInt(element.dataset.id);
	let parent = element.parentElement.parentElement.parentElement;

	this.expenseList.removeChild(parent);

	let tempList = this.itemList.filter(function(item){
                return item.id !== id;
 });
        this.itemList = tempList;
        this.showBalance();
 }
}

function eventListeners(){
const incomeForm = document.getElementById('income-form');
const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');

const ui = new UI();

incomeForm.addEventListener('submit',function(event) {
 event.preventDefault();
 ui.submitIncomeForm();	
});

expenseForm.addEventListener('submit',function(event) {
 event.preventDefault();
 ui.submitExpenseForm();
});

expenseList.addEventListener('click',function(event) {	
	if(event.target.parentElement.classList.contains('edit-icon')){
ui.editExpense(event.target.parentElement)
	}
	else if(event.target.parentElement.classList.contains
	('delete-icon')){
ui.deleteExpense(event.target.parentElement)
	}

});

}

document.addEventListener('DOMContentLoaded', function(){
  eventListeners();
});



