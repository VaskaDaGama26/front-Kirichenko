import React, { useEffect, useState } from 'react'
import Card from './Card'
import classes from './css-modules/Card.module.css'


const Blog = ({searchValue}) => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [value, setValue] = useState('');
  const filteredCards = searchValue
    ? data.filter(card => 
      card.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      card.text.toLowerCase().includes(searchValue.toLowerCase())
    )
    : data;

  // fetch
  useEffect(() => {
    fetch('https://cloud.codesupply.co/endpoint/react/data.json')
    .then((response) =>{
      if(!response.ok){
        throw new Error('Data loading error');
      }
      return response.json();
    })
    .then((data) => {
      setData(data);
      setLoading(false);
    })
    .catch((error) => {
      setError(error);
      setLoading(false);
    });
  }, []);

  if(loading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div>Error: {error}</div>
  }

  return ( 
    
    <div className={classes.container}>
      <div className={classes.row}>
        {filteredCards && filteredCards.map((item, index) => (
          <Card 
          key={index}
          title={item.title}
          text={item.text}
          tags={item.tags}
          autor={item.autor}
          img={item.img}
          img_2x={item.img_2x}
          date={item.date}
          views={item.views} />
        ))}
      </div>
    </div>
  )
}

export default Blog