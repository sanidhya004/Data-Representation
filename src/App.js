import './App.css';
import Map from './Components/Map';

function App() {
  return (
   <> 
     <div className="main">
     <div className='mapcomponent'><Map/></div>
     <div className="menu"><h1>Data Usage Representation</h1> 
     <div className="stat">
         <div className="red">High Data Usage</div>
         <div className="yellow">Medium Data Usage</div>
         <div className="green">Low Data Usage</div>
         
     
     
      </div>
      
      
      </div>
     </div>
  
    
     
         
   </>
  );
}

export default App;
