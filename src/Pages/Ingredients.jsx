import Fruits from '../FOODS/Fruits.json';



function Ingredients() {
    const [fruits, setFruits] = useState([Fruits]);


    return (
      <div >
        {fruits && fruits.map((fruit, index) => (
    <span key={index}>{fruit}<br /></span>
  
    ))}
  
      </div>
    );
  }
  
  export default Ingredients;
  