import React, { Component } from 'react';
import { JobList } from './JobList';
import {loadCourses} from './requests'
import Select from 'react-select'

function searchingFor(term){
return function(x){
  return x.title.toLowerCase().includes(term.toLowerCase()) || !term;
}
}


 

export class JobBoard extends Component {

  
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
    this.state.jobs.forEach((i, index)=> {
        
        let item = document.createElement('div');
        item.innerHTML = `
        <div class="product">
        
        <p class="name">Level : ${i.level}</p>
        <p class="price">Start Date : ${i.start_date}</p>
        <p class="price">End Date : ${i.end_date}</p>
        
        <p class="title">Class Name : ${i.title}</p>
        <img src="${i.image}">
        <p>Price:$0</p>
        <br>
        <button class="add">Add to cart</button>
        </div>
        `
        const items = document.getElementById('items');
    
        item.getElementsByClassName('add')[0].addEventListener('click', ()=>{
            this.addTocart(index)
        });
    
        items.append(item)
    });
    }
     addTocart(index){
      this.state.cart.push(index)
      localStorage.setItem('cart', JSON.stringify(this.state.cart))
      alert(`${this.state.jobs[index].title} added to cart`)
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
        <a href="/cart">Go To Shopping Cart</a>
        
        <div id="items"></div>
        {/* <div id="total"></div> */}
        <input type="text" onChange={this.searchHandler} value={term} />
        {
          jobs.filter(searchingFor(term)).map(x=>
            <div key={x.id}>
              <h1>{x.title}</h1>
              <h1>{x.level}</h1>
              <h1>{x.type}</h1>
              {/* <div><button>Add To Basket</button></div> */}
            </div>
            )
            
        }
        <Select
        options={options} 
        value={selectedOption}
        onChange={this.handleChange}
        />
        <h1 className="title">Courses List</h1>
        <JobList jobs={jobs}/>
        

        
      </div>
    );
  }
}
