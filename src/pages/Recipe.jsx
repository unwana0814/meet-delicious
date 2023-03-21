import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';


function Recipe() {

  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState('instructions')

  const fetchDetails = async () => {
    const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);

    const detailData = await data.json();
    setDetails(detailData);
  }

  useEffect(() => {
    fetchDetails();
    // console.log(params.name);
  }, [params.name]);

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt="" />
      </div>
      <Info>
        <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab('instructions')}>
          Instructions
          </Button>
        <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab('ingredients')}>
          Ingredients
        </Button>
        {activeTab === 'instructions' && (
           <div>
              <p dangerouslySetInnerHTML={{__html: details.summary}}></p>
              <p dangerouslySetInnerHTML={{__html: details.instructions}}></p>
         </div>
        )}

        {activeTab === 'ingredients' && (
           <ul>
           {details.extendedIngredients.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.original}</li>
           ))}
         </ul>
        )}

      </Info>
    </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 4rem;
  .active{
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }

  h2{
    margin-bottom: 2rem;
  }

  p{
    text-justify: inter-word;
  }

  li{
    font-size: 1.2rem;
    line-height: 2.5rem;
  }

  img{
    ;
    width: 200%;
    height: 50%;
    object-fit: cover;
    border-radius: 2rem;
  }

  ul{
    margin-top: 2rem;
  }
`

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px sold black;
  margin-right: 1rem;
  margin-bottom: 1rem;
  font-weight: 600;
  border-radius: 0.5rem;
`

const Info = styled.div`
  margin-left: 10rem;
`

export default Recipe