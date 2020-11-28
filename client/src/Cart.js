import React, { Component } from 'react';
import { JobList } from './JobList';
import { Link } from 'react-router-dom';
import {loadCourses} from './requests'


function searchingFor(term){
return function(x){
  return x.title.toLowerCase().includes(term.toLowerCase()) || !term;
}
}


 

export class Cart extends Component {

  
  state = {
    selectedOption: null,
    
  };
  constructor(props){
    super(props);
    this.state={
      jobs:[],
      term:'',
      cart:[]
    }
    this.searchHandler=this.searchHandler.bind(this)
  }

  

  searchHandler(event){
    this.setState({term:event.target.value})
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  async componentDidMount(){
   const jobs=await loadCourses()
   this.setState({jobs})
   this.load()
  }
   load() {
    const cartData = localStorage.getItem('cart');
    console.log('cartData :'+cartData);
    this.state.cart = JSON.parse(cartData)
    console.log('cart items :'+this.state.cart);

    this.state.cart.forEach((i, index)=> {
        
        let item = document.createElement('div');
        item.innerHTML = `
        <div class="product">
        <img src="${this.state.jobs[i].image}">
        <p class="price">Start Date : ${this.state.jobs[i].start_date}</p>
        <p class="price">End Date : ${this.state.jobs[i].end_date}</p>
        <p class="name">Level : ${this.state.jobs[i].level}</p>
        <p class="price">Title : ${this.state.jobs[i].title}</p>
        <p>Price:$0</p>
        <button class="remove">Remove</button>
        </div>
        `
        const items = document.getElementById('items');
    
        item.getElementsByClassName('remove')[0].addEventListener('click', (e)=>{
            this.remove(i, e)
        });
    
        items.append(item)
    });
    this.tot()
    }
    remove(i, e){
        for (let j = 0; j < this.state.cart.length; j++) {
            if(this.state.cart[j] === i){
                this.state.cart.splice(j, 1)
            }
        }
        localStorage.setItem('cart', JSON.stringify(this.state.cart))
        
        e.target.parentElement.remove();
        this.tot();
        alert(`${this.state.jobs[i].name} removed from cart`)
        
    }

    tot(){
        let total = 0;
        this.state.cart.forEach((i)=> {
            total += this.state.jobs[i].price
        });
        document.getElementById('total').innerText = total;
    }


  // loadOptions=async

  render() {
    const {jobs,term}=this.state
    
  const courseList=jobs.filter(searchingFor(this.state.term)).map(x=>({label:x.type,value:x.id,level:x.level}))
  const { selectedOption } = this.state;
  const options=courseList
  
  // const options=[courseList]
    console.log('jobs here :'+JSON.stringify(courseList));
    return (
      
      <div>
          <h1><title>Cart</title></h1>
        <a href="/courses">Go To Courses</a>
        
        <div id="items"></div>
        <div id="total"></div>
        {/* <input type="text" onChange={this.searchHandler} value={term} /> */}
       
        

        
      </div>
    );
  }
}
