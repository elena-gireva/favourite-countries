import React from 'react';
import { useState } from 'react';
import { data } from './data';
import { topCities } from './topCities';
import { people } from './famousPeople'; 
import './App.css';


function App() {
  const [countries, setCountries] = useState(0);
  const { name, image, description, showMore} = data[countries];
  
  const [cities, setCity] = useState(topCities.filter(town => town.country === data[countries].name));

  const [names, setPeople] = useState(people);

  const [showText, setShowText] = useState(false);
  const showTextClick = (item)=>{
    item.showMore = !item.showMore;
    setShowText(!showText);
  }

  const previousCountry = () =>{
    setCountries((country => {
      country --;
      if (country < 0){
        return data.length-1;
      }
      return country;
    }))
  }

  const nextCountry = () =>{
    setCountries((country => {
      country ++;
      
      if (country > data.length-1){
        country = 0;
      }
      return country;
    }))
    
  }
 
    const nextCity = () => {
    let newCities = cities.filter(town => town.country === data[countries].name);
    setCity(newCities);
  }

    const removePeople = (name) =>{
    
    let newPeople = names.filter(man => man.name !== name);
    setPeople(newPeople);
  }
  
  return (
    <div>
    <div className='container'>
        <div className="container">
          <div className="vertical">
              <h1>{name}</h1>  
              <img src={image} alt = "country" width="150px" height="130px"/> 
              <div className="container">
                <button onClick={() => { previousCountry(); nextCity();}}>👈 Previous</button>
                <button onClick={() => { nextCountry(); nextCity();}}>👉 Next</button> 
              </div>          
          </div>
        
        </div>
      
      <div className="container">
        <p>{showMore ? description : description.substring(0,280)+"..."}
        <button onClick = {()=> showTextClick(data[countries])} className="btn">{showMore ? "Show less" : "Show more"}</button>

        </p>        
      </div>
      
    </div>

      <div className='container'>
        <h2>List of TOP {topCities.filter(item => item.country === data[countries].name).length} sities of {data[countries].name}</h2>
      </div>

      <div  className='vertical'>
      <div className='container'>

        {topCities.filter(item => item.country === data[countries].name).map(element => {
            const{cityName, image} = element;
              return(
                <div key = {cityName} className='vertical'>
                  <div>
                    <h3>{cityName}</h3>
                  </div>
                  <div className='container'>
                    <img src={image} alt="sity" width="170px" height="180px"/>
                  </div>
                </div>
              )
            })}
        
        </div>
        
      </div>
      {names.filter(town => town.country === data[countries].name).map(person => {
            const{country, name} = person;
            
              return(
                <div  className='vertical'>
                  <div className='container'>
                    <ul>
                      <li>{country}. {name}</li>
                    </ul>
                  <button onClick = {()=> removePeople(name)}>REMOVE</button>
                  </div>
                </div> 
  
              )
            })}
      
            <div className='btnBorder'>
              <button onClick = {()=> setPeople([])}>DELETE ALL</button>
            </div> 
    </div>
    
  );
}

export default App;